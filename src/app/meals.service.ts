import { Injectable, Output, EventEmitter } from '@angular/core';
import { FoodDbService } from './food-db.service';
import { meals } from './meals';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MealsService {
  public meals = meals;

  totalNutrients = [
    {
      SUGAR: { quantity: 0 },
      PROCNT: { quantity: 0 },
      FAT: { quantity: 0 },
      ENERC_KCAL: { quantity: 0 },
    },
  ];

  @Output() nutrienInfo = new EventEmitter();

  constructor(private foodDb: FoodDbService) {
    this.foodDb.foodItem.subscribe((value) => {
      this.totalNutrients.push(value.nutrients.totalNutrients);
      this.meals.forEach((element) => {
        if (element.mealId == value.mealId) {
          element.items.push(value);
          element.totalCal += value.nutrients.calories;
        }
      });
      this.getData();
    });
  }

  getNutr() {
    let sugar = this.totalNutrients
      .map((a) => a.SUGAR.quantity)
      .reduce((ac, a) => (ac += a))
      .toFixed();
    let protein = this.totalNutrients
      .map((a) => a.PROCNT.quantity)
      .reduce((ac, a) => (ac += a))
      .toFixed();
    let fat = this.totalNutrients
      .map((a) => a.FAT.quantity)
      .reduce((ac, a) => (ac += a))
      .toFixed();
    let calories = this.totalNutrients
      .map((a) => a.ENERC_KCAL.quantity)
      .reduce((ac, a) => (ac += a))
      .toFixed();
    return {
      sugar,
      protein,
      fat,
      calories,
    };
  }

  getData(): void {
    this.nutrienInfo.emit(this.getNutr());
  }

  save(): void {
    // this.meals this.totalNutrients
    console.log('saving data TBD');
  }
}
