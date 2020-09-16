import { Injectable } from '@angular/core';
import { CaloriesCalcService } from '../services/calories-calc.service';
import { FoodDbService } from './food-db.service';
import { LocalstorageCrudService } from '../services/localstorage-crud.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { appleBreakfast } from '../applebreakfast';
import { Nutrients } from '../nutrients';


@Injectable({
  providedIn: 'root',
})
export class PlanMealsService {
  meals;
  nutriensDaily;

  constructor(
    private foodDb: FoodDbService,
    private calculate: CaloriesCalcService,
    public local: LocalstorageCrudService,
    private _snackBar: MatSnackBar
  ) {
    this.local.getMeals().subscribe(val => {
      this.meals = val
      this.setDailyNutrients(val)
      this.setMonthlyNutrients()
    });
    this.foodDb.foodItem.subscribe((value) => {
      this.meals.forEach((element) => {
        if (element.mealId === value.mealId) {
          element.items.push(value);
          element.totalCal += value.calories;
        }
      });
      this.local.update(this.meals)
    });
  }

  getMeals(){
    return this.meals
  }

  setDailyNutrients(meals){
    const mappedMeals = meals.map(meal => meal.items).filter(item => item.length > 0).map(item => item[0].nutrients).flat()
    if(mappedMeals.length > 0){
      this.calculate.setDailyNutrients(mappedMeals)
    }
  }

  setMonthlyNutrients(){
    const monthly = this.local.getMonthlyNutrients();
    this.calculate.setMonthlyNutrients(monthly)
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
    this.local.update(this.meals)
    this.setMonthlyNutrients()
    this._snackBar.open('Food has deleted', '🦴' , {duration: 2000});
  }
}
