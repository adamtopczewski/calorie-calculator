import { IfStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntakeCalcService {
  caloriesIntake = new BehaviorSubject(null);
  caloriesIntake$:number;
  localStorageKey:string = 'profile'
  constructor() { }

  setData(formValues){
    this.calculateDailyIntake(formValues)
    this.caloriesIntake.next(this.caloriesIntake$)
    this.saveIntakeToLocal(this.caloriesIntake$)
  }

  getData():Observable<number>{
    if(!this.getIntakeFromLocal()){
      return this.caloriesIntake
    }
    this.caloriesIntake$ = this.getIntakeFromLocal()
    this.caloriesIntake.next(this.caloriesIntake$)
    return this.caloriesIntake
  }

  getIntakeFromLocal() {
    return JSON.parse(localStorage.getItem(this.localStorageKey)) || null;
  }

  saveIntakeToLocal(intake) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(intake));
  }

  // Calculating Daily calorie intake
  // Formula from: https://www.calculator.net/calorie-calculator.html
  calculateDailyIntake(formValues) {
    const weight:number = +formValues.weight;
    const height:number = +formValues.height;
    const age:number = +formValues.age;
    const activity:number = +formValues.activity;
    let bmr; //basal metabolic rate
    if (formValues.gender == 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    return this.caloriesIntake$ = (bmr * activity);
  }
}
