import { Injectable } from '@angular/core';
import { meals } from '../meals';
import { appleBreakfast } from '../applebreakfast';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageCrudService {
  today = new Date();
  todayString = this.today.toDateString();
  mealsHistory = [];
  meals;

  constructor() {
    this.meals = meals;
    this.init();
    this.populateLocalStorage();
    // this.getMonthlyNutriens();
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
  }

  getMonthlyNutriens() {
    let data = [];
    let combinedData = {
      ENERC_KCAL: { label: 'Energy', quantity: null, unit: 'kcal' },
      FAT: { label: 'Fat', quantity: null, unit: 'g' },
      PROCNT: { label: 'Protein', quantity: null, unit: 'g' },
      SUGAR: { label: 'Sugars', quantity: null, unit: 'g' },
    };

    for(let i = 0; i < this.mealsHistory.length; i++) {
      for(let j = 0; j < this.mealsHistory[i].meals.length; j++){
        console.log('inner loop')
        if(this.mealsHistory[i].meals[j].items.length){
          for(let g = 0; g < this.mealsHistory[i].meals[j].items.length; g++){
            data.push(this.mealsHistory[i].meals[j].items[g].nutrients.totalNutrients)
          }
        }
      }
    }
    // this.mealsHistory.forEach((a) =>
    //   data.push(a.meals[0].items[0].nutrients.totalNutrients)
    // );
    console.log(data)
    for (let i = 0; i < data.length; i++) {
      combinedData.ENERC_KCAL.quantity += +data[i].ENERC_KCAL.quantity.toFixed();
      combinedData.FAT.quantity += +data[i].FAT.quantity.toFixed();
      combinedData.PROCNT.quantity += +data[i].PROCNT.quantity.toFixed();
      combinedData.SUGAR.quantity += +data[i].SUGAR.quantity.toFixed();
    }
    console.log(combinedData);
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
  }

  init() {
    if (
      localStorage.getItem('mealsHistory') === null ||
      localStorage.getItem('mealsHistory') == undefined
    ) {
      this.mealsHistory.push({
        date: this.todayString,
        meals: this.meals,
      });
      localStorage.setItem('mealsHistory', JSON.stringify(this.mealsHistory));
      return;
    } else {
      this.mealsHistory = JSON.parse(localStorage.getItem('mealsHistory'));
      if (
        this.mealsHistory[this.mealsHistory.length - 1].date !==
        this.todayString
      ) {
        console.log('error found', this.mealsHistory);
        this.mealsHistory.push({
          date: this.todayString,
          meals: this.meals,
        });
        localStorage.setItem('mealsHistory', JSON.stringify(this.mealsHistory));
      } else {
        console.log('its fine');
        return;
      }
    }
  }
}
