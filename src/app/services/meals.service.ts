import { Injectable } from '@angular/core';
import { FoodDbService } from '../services/food-db.service';
import { meals } from '../meals';
import { CaloriesCalcService } from './calories-calc.service';

@Injectable({
  providedIn: 'root',
})
export class MealsService {
  public meals = meals;

  constructor(
    private foodDb: FoodDbService,
    private calculate: CaloriesCalcService
  ) {
    this.foodDb.foodItem.subscribe((value) => {
      this.calculate.setDailyNutrients(value.nutrients);
      this.meals.forEach((element) => {
        if (element.mealId == value.mealId) {
          element.items.push(value);
          element.totalCal += value.calories;
        }
      });
      this.setData();
    });
  }

  setData() {
    this.calculate.calculateNutriens();
  }

  save(): void {
    console.log(localStorage);
  }
}
