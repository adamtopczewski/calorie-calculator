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

  constructor(
    private foodDb: FoodDbService,
    private calculate: CaloriesCalcService,
    private _snackBar: MatSnackBar
   ) {
    this.init();
    this.foodDb.foodItem.subscribe((value) => {
      this.calculate.setDailyNutrients(value.nutrients);
      this.meals.forEach((element) => {
        if (element.mealId == value.mealId) {
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
    localStorage.setItem('mealsHistory', JSON.stringify(this.mealsHistory));
    this.getMonthlyNutrients();
    this.calculate.resetDaily();
    this.getDailyNutrients();
  }

  update(meals) {
    this.meals = meals;
    let prevMeals = JSON.parse(localStorage.getItem('mealsHistory'));
    for (let i = 0; i < prevMeals.length; i++) {
      if (prevMeals[i].date === this.todayString) {
        prevMeals[i].meals = meals;
      }
    }
    localStorage.setItem('mealsHistory', JSON.stringify(prevMeals));
    this.getDailyNutrients();
    this.getMonthlyNutrients();
  }

  getDailyNutrients() {
    this.calculate.calculateNutriens();
  }

  getMonthlyNutrients() {
    let monthlyNutrients = [];
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
      let past30Days = new Date();
      let tempArray = [];
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
      localStorage.setItem('mealsHistory', JSON.stringify(this.mealsHistory));
    }
    this.getMonthlyNutrients();
  }

  init() {
    //Empty Local Storage
    if (
      localStorage.getItem('mealsHistory') === null ||
      localStorage.getItem('mealsHistory') == undefined
    ) {
      this.mealsHistory.push({
        date: this.todayString,
        meals: meals,
      });
      localStorage.setItem('mealsHistory', JSON.stringify(this.mealsHistory));
      return;
    }
    this.mealsHistory = JSON.parse(localStorage.getItem('mealsHistory'));
    //Checks for a new day and mealsHistory length (up to 30 entries)
    if (
      this.mealsHistory[this.mealsHistory.length - 1].date !== this.todayString
    ) {
      this.mealsHistory.push({
        date: this.todayString,
        meals: meals,
      });
      localStorage.setItem('mealsHistory', JSON.stringify(this.mealsHistory));
    } else if (this.mealsHistory.length > 30) {
      let lastMonth = this.mealsHistory.slice(-30);
      localStorage.setItem('mealsHistory', JSON.stringify(lastMonth));
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
