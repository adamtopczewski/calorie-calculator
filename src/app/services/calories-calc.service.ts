import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Nutrients } from '../nutrients';

@Injectable({
  providedIn: 'root',
})
export class CaloriesCalcService {
  totalDailyNutrients: Nutrients[] = [];
  totalMonthlyNutrients: Nutrients[] = [];
  defultDailyNutriens = {
    carbs: {
      quantity: 0,
    },
    protein: {
      quantity: 0,
    },
    fat: {
      quantity: 0,
    },
    calories: {
      quantity: 0,
    },
  };

  dailyNutrienDataSource = new BehaviorSubject(this.defultDailyNutriens);
  monthlyNutrienDataSource = new BehaviorSubject({});

  constructor() {}

  setDailyNutrients(nutrients: Nutrients[]) {
    this.totalDailyNutrients = [...nutrients];
    this.calculateNutriens();
  }

  setMonthlyNutrients(nutrients: Nutrients[]) {
    this.totalMonthlyNutrients = [...nutrients];
    this.calculateNutriens(this.totalMonthlyNutrients, 'monthly');
  }

  removeItem(item: any) {
    const index = this.totalDailyNutrients.indexOf(item);
    this.totalDailyNutrients.splice(index, 1);
    this.calculateNutriens();
    this.calculateNutriens(this.totalMonthlyNutrients, 'monthly');
  }
  // Calculate nutrients based on operation = 'daily' || 'monthly'
  calculateNutriens(
    totalNutrients: Nutrients[] = this.totalDailyNutrients,
    operation = 'daily'
  ) {
    if (totalNutrients.length > 0) {
      const result: any = totalNutrients.reduce((result, list) => {
        const item = Object.entries(list).map(([key, values]) => {
          const { quantity = 0 } = result[key] || {};
          return [key, { ...values, quantity: values.quantity + quantity }];
        });
        const newItem = item.reduce((res, [key, val]) => {
          res[key] = val;
          return res;
        }, {});
        return {
          ...result,
          ...newItem,
        };
      }, {});
      if (operation === 'daily') {
        this.dailyNutrienDataSource.next({
          carbs: result.CHOCDF,
          protein: result.PROCNT,
          fat: result.FAT,
          calories: result.ENERC_KCAL,
        });
      } else if (operation === 'monthly') {
        this.monthlyNutrienDataSource.next(result);
      }
    } else {
      this.dailyNutrienDataSource.next(this.defultDailyNutriens);
    }
  }
}
