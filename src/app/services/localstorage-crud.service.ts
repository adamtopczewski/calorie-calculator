import { Injectable } from '@angular/core';
import { appleBreakfast } from '../applebreakfast';
import { meals } from '../meals';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageCrudService {
  emptyMeals = meals;
  meals = new BehaviorSubject(this.emptyMeals);
  meals$ = this.meals.asObservable();

  mealsHistory = [];
  localStorageKey: string = 'mealsHistory';

  today = new Date();
  todayString = this.today.toDateString();

  constructor() {
    this.init();
  }

  getMeals(): Observable<any> {
    return this.meals$;
  }

  setMeals(meals) {
    this.meals.next(meals);
  }

  getMealsHistory() {
    return JSON.parse(localStorage.getItem(this.localStorageKey));
  }

  setMealsHistory(items) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(items));
  }

  getMonthlyNutrients(){
    const historyMap = this.mealsHistory.map(a => a.meals).flat()
    const mappedMeals = historyMap.map(meal => meal.items).filter(item => item.length > 0).map(item => item[0].nutrients).flat()
    return mappedMeals.length > 0 ? mappedMeals : [{}];
  }

  clear() {
    localStorage.clear();
    this.init();
  }

  update(meals) {
    this.setMeals(meals);
    const prevMeals = this.getMealsHistory();
    for (let i = 0; i < prevMeals.length; i++) {
      if (prevMeals[i].date === this.todayString) {
        prevMeals[i].meals = meals;
      }
    }
    this.setMealsHistory(prevMeals);
    this.mealsHistory = [...this.getMealsHistory()];
  }

  populateLocalStorage() {
      let past30Days = new Date();
      const tempArray = [];
      past30Days.setDate(past30Days.getDate() - 29);
      for (let i = 0; +past30Days < +this.today; i++) {
        let dayString = past30Days.toDateString();
        tempArray.push({
          date: dayString,
          ...appleBreakfast,
        });
        past30Days.setDate(past30Days.getDate() + 1);
      }
      this.mealsHistory= [...tempArray, ...this.mealsHistory];
      this.setMealsHistory(this.mealsHistory);
  }

  init() {
    let history = this.getMealsHistory();
    if (!history) {
      const firstEntry = [{ date: this.todayString, meals: this.emptyMeals }];
      history = firstEntry;
    } else if (history[history.length - 1].date !== this.todayString) {
      const newHistory = [
        ...history,
        { date: this.todayString, meals: this.emptyMeals },
      ];
      history = newHistory;
    } else if (history.length > 30) {
      const lastMonth = history.slice(-30);
      history = lastMonth;
    }
    this.setMealsHistory(history);
    this.mealsHistory = this.getMealsHistory();
    this.setMeals(history[history.length - 1].meals);
  }
}
