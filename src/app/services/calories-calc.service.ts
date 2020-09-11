import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CaloriesCalcService {
  totalDailyNutrients = [];
  caloriesIntake = new BehaviorSubject(0);
  dailyNutrienData = this.calculateNutriens();
  dailyNutrienDataSource = new BehaviorSubject(this.dailyNutrienData);
  monthlyNutrienData = this.calculateNutriens();
  monthlyNutrienDataSource = new BehaviorSubject(this.monthlyNutrienData);
  constructor() {}

  setDailyNutrients(nutrients) {
    this.totalDailyNutrients.push(nutrients);
  }
  // Formula from: https://www.calculator.net/calorie-calculator.html
  calculateDailyIntake(formValues) {
    const W = +formValues.wieght;
    const H = +formValues.height;
    const A = +formValues.age;
    let BMR;
    let intake;

    if (formValues.gender == 'male') {
      BMR = 10 * W + 6.25 * H - 5 * A + 5;
    } else {
      BMR = 10 * W + 6.25 * H - 5 * A - 161;
    }
    intake = BMR * +formValues.activity;
    this.caloriesIntake.next(+intake);
  }
  // Calculate specific nutriens for all meals
  calculateNutriens(totalNutrients = this.totalDailyNutrients) {
    let nutrientsNames = ['CA', 'CHOCDF', 'CHOLE', 'ENERC_KCAL', 'FAMS',
      'FAPU', 'FASAT', 'FAT', 'FE', 'FIBTG', 'FOLAC', 'FOLDFE', 'FOLFD',
      'K', 'MG', 'NA', 'NIA', 'P', 'PROCNT', 'RIBF', 'SUGAR', 'THIA',
      'TOCPHA', 'VITA_RAE', 'VITB6A', 'VITB12', 'VITC', 'VITD', 'VITK1',
      'WATER', 'ZN' ];


    if (totalNutrients.length){
      let data = {};
      nutrientsNames.map((name) => {
        let val = this.totalDailyNutrients
          .map((a) => a[name].quantity)
          .reduce((ac, a) => (ac += a))
          .toFixed(1);
        Object.defineProperty(data, `${name}`, {
          value: val,
        });
      });
      console.log(data);
    }


    // let nutrientsNames2 = totalNutrients.keys()
    if (totalNutrients.length) {
      let sugar = totalNutrients
        .map((a) => a.SUGAR.quantity)
        .reduce((ac, a) => (ac += a))
        .toFixed(1);
      let protein = totalNutrients
        .map((a) => a.PROCNT.quantity)
        .reduce((ac, a) => (ac += a))
        .toFixed(1);
      let fat = totalNutrients
        .map((a) => a.FAT.quantity)
        .reduce((ac, a) => (ac += a))
        .toFixed(1);
      let calories = totalNutrients
        .map((a) => a.ENERC_KCAL.quantity)
        .reduce((ac, a) => (ac += a))
        .toFixed(0);
      this.dailyNutrienData = {
        sugar,
        protein,
        fat,
        calories,
      };
      this.dailyNutrienDataSource.next(this.dailyNutrienData);
    }
    return {
      sugar: 0,
      protein: 0,
      fat: 0,
      calories: 0,
    };
  }
}
