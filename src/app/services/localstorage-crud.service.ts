import { Injectable } from '@angular/core';
import { meals } from '../meals';
import { appleBreakfast } from '../applebreakfast';
import { CaloriesCalcService } from '../services/calories-calc.service';
import { FoodDbService } from './food-db.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root',
})
export class LocalstorageCrudService {
  public meals;
  mealsHistory = [];

  today = new Date();
  todayString = this.today.toDateString();

  localStorageKey:string = 'mealsHistory'

  constructor(
    private foodDb: FoodDbService,
    private calculate: CaloriesCalcService,
    private _snackBar: MatSnackBar
   ) {
    this.init();
    this.foodDb.foodItem.subscribe((value) => {
      this.calculate.setDailyNutrients(value.nutrients);
      this.meals.forEach((element) => {
        if (element.mealId === value.mealId) {
          element.items.push(value);
          element.totalCal += value.calories;
        }
      });
      this.update(this.meals)
    });
  }

  clear(){
    localStorage.clear();
    this.mealsHistory = [];
    this.meals = meals
    this.mealsHistory.push({
      date: this.todayString,
      meals: this.meals,
    });
    this.setItem(this.localStorageKey, this.stringify(this.mealsHistory));
    // localStorage.setItem(this.localStorageKey, JSON.stringify(this.mealsHistory));
    this.getMonthlyNutrients();
    this.calculate.resetDaily();
    this.getDailyNutrients();
  }

  update(meals) {
    this.meals = meals;
    const prevMeals = JSON.parse(localStorage.getItem(this.localStorageKey));
    for (let i = 0; i < prevMeals.length; i++) {
      if (prevMeals[i].date === this.todayString) {
        prevMeals[i].meals = meals;
      }
    }
    this.setItem(this.localStorageKey, this.stringify(prevMeals));
    // localStorage.setItem(this.localStorageKey, JSON.stringify(prevMeals));
    this.getDailyNutrients();
    this.getMonthlyNutrients();
  }

  getDailyNutrients() {
    this.calculate.calculateNutriens();
  }

  getMonthlyNutrients() {
    const monthlyNutrients = [];
    this.mealsHistory.forEach(a => {
      a.meals.forEach(a =>{
        if(a.items.length > 0){
          a.items.forEach(item => monthlyNutrients.push(item.nutrients))
        }
      })
    })
    this.calculate.calculateNutriens(monthlyNutrients, 'monthly')
  }

  deleteItem(item, mealId) {
    this.meals.forEach(element => {
      if(element.mealId === mealId){
        element.totalCal = null
        for(let i = 0; i < element.items.length; i++){
          if(element.items[i] === item){
            this.calculate.removeItem(element.items[i].nutrients)
            element.items.splice(i,1)
          }
        }
      }
    });
    this.update(this.meals)
    this._snackBar.open('Food has deleted', '🦴' , {duration: 2000});
  }

  populateLocalStorage() {
    if (this.mealsHistory.length <= 1) {
      const past30Days = new Date();
      const tempArray = [];
      past30Days.setDate(past30Days.getDate() - 30);
      for (let i = 0; +past30Days < +this.today; i++) {
        let dayString = past30Days.toDateString();
        tempArray.push({
          date: dayString,
          ...appleBreakfast,
        });
        past30Days.setDate(past30Days.getDate() + 1);
      }
      this.mealsHistory.unshift(...tempArray);
      this.setItem(this.localStorageKey, this.stringify(this.mealsHistory));
      // localStorage.setItem(this.localStorageKey, JSON.stringify(this.mealsHistory));

    }
    this.getMonthlyNutrients();
  }
    //Helper functions
    stringify(obj:object) {
      return JSON.stringify(this.mealsHistory)
    }

    parse(json:string){
      return JSON.parse(json)
    }
    getLocal(key:string) {
      return localStorage.getItem(key)
    }

    setItem(key:string, json:string){
      localStorage.setItem(key, json);
    }

  init() {
    //Empty Local Storage
    if (
      localStorage.getItem(this.localStorageKey) === null ||
      localStorage.getItem(this.localStorageKey) == undefined
    ) {
      this.mealsHistory.push({
        date: this.todayString,
        meals: meals,
      });
      this.setItem(this.localStorageKey, this.stringify(this.mealsHistory));
      // localStorage.setItem(this.localStorageKey, JSON.stringify(this.mealsHistory));
      return;
    }
    this.mealsHistory = this.parse(this.getLocal(this.localStorageKey));
    // this.mealsHistory = JSON.parse(localStorage.getItem(this.localStorageKey));
    //Checks for a new day and mealsHistory length (up to 30 entries)
    if (
      this.mealsHistory[this.mealsHistory.length - 1].date !== this.todayString
    ) {
      this.mealsHistory.push({
        date: this.todayString,
        meals: meals,
      });
      this.setItem(this.localStorageKey, this.stringify(this.mealsHistory));
      // localStorage.setItem(this.localStorageKey, JSON.stringify(this.mealsHistory));
    } else if (this.mealsHistory.length > 30) {
      const lastMonth = this.mealsHistory.slice(-30);
      this.setItem(this.localStorageKey, this.stringify(lastMonth));
      // localStorage.setItem(this.localStorageKey, JSON.stringify(lastMonth));
      this.mealsHistory = lastMonth;
    }
    // Updating local meals and daily nutrients
    this.meals = this.mealsHistory[this.mealsHistory.length - 1].meals
    this.meals.forEach(element => {
      if(element.items.length > 0){
        element.items.forEach(a => this.calculate.setDailyNutrients(a.nutrients))
      }
      this.getDailyNutrients();
    });
    this.getMonthlyNutrients();
  }
}
