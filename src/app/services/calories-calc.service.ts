import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CaloriesCalcService {
  totalDailyNutrients = [];
  totalMonthlyNutrients = {};
  caloriesIntake = new BehaviorSubject(0);

  dailyNutrienData = {
    carbs: {
      val: 0,
    },
    protein: {
      val: 0,
    },
    fat: {
      val: 0,
    },
    calories: {
      val: 0,
    },
  };

  dailyNutrienDataSource = new BehaviorSubject(this.dailyNutrienData);
  monthlyNutrienDataSource = new BehaviorSubject({});

  constructor() {}

  setDailyNutrients(nutrients) {
    this.totalDailyNutrients.push(nutrients);
  }

  removeItem(item: any) {
    const index = this.totalDailyNutrients.indexOf(item);
    this.totalDailyNutrients.splice(index, 1);
    this.calculateNutriens();
    this.calculateNutriens(this.totalDailyNutrients, 'monthly');
  }
  // Calculate nutrients based on operation = 'daily' || 'monthly'
  calculateNutriens(
    totalNutrients = this.totalDailyNutrients,
    operation = 'daily'
  ) {
    const dataArray = [];
    if (!totalNutrients.length) {
      this.dailyNutrienData = {
        carbs: {
          val: 0,
        },
        protein: {
          val: 0,
        },
        fat: {
          val: 0,
        },
        calories: {
          val: 0,
        }
      }
      this.dailyNutrienDataSource.next(this.dailyNutrienData);
      this.monthlyNutrienDataSource.next({});
    } else {
      const nutrientsNames = Object.keys(totalNutrients[0]);
      let data = {};
      //Reducing data to one object containg all the values
      nutrientsNames.map((name) => {
        let val = totalNutrients
          .map((a) => a[name].quantity)
          .reduce((ac, a) => (ac += a))
          .toFixed(1);
        Object.defineProperties(data, {
          val: {
            value: val,
          },
          label: {
            value: totalNutrients[0][name].label,
          },
          unit: {
            value: totalNutrients[0][name].unit,
          },
        });
        dataArray.push(data);
        data = {};
      });
      if (operation === 'daily') {
        this.dailyNutrienData = {
          carbs: dataArray.find((a) => a.label == 'Carbs'),
          protein: dataArray.find((a) => a.label == 'Protein'),
          fat: dataArray.find((a) => a.label == 'Fat'),
          calories: dataArray.find((a) => a.label == 'Energy'),
        };
        this.dailyNutrienDataSource.next(this.dailyNutrienData);
      } else if (operation === 'monthly') {
        this.monthlyNutrienDataSource.next(dataArray);
      }
    }
  }

  resetDaily(){
    this.dailyNutrienData = {
      carbs: {
        val: 0,
      },
      protein: {
        val: 0,
      },
      fat: {
        val: 0,
      },
      calories: {
        val: 0,
      }
    }
    this.dailyNutrienDataSource.next(this.dailyNutrienData);
  }
  // Calculating Daily calorie intake
  // Formula from: https://www.calculator.net/calorie-calculator.html
  calculateDailyIntake(formValues) {
    const WEIGHT = +formValues.weight;
    const HEIGHT = +formValues.height;
    const AGE = +formValues.age;
    const ACTIVITY = +formValues.activity;
    let bmr; //basal metabolic rate
    let intake;
    if (formValues.gender == 'male') {
      bmr = 10 * WEIGHT + 6.25 * HEIGHT - 5 * AGE + 5;
    } else {
      bmr = 10 * WEIGHT + 6.25 * HEIGHT - 5 * AGE - 161;
    }
    intake = bmr * ACTIVITY;
    this.caloriesIntake.next(+intake);
  }
}
