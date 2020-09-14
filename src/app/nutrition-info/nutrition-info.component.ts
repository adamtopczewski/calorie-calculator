import { Component, OnInit } from '@angular/core';
import { CaloriesCalcService } from '../services/calories-calc.service';
@Component({
  selector: 'app-nutrition-info',
  templateUrl: './nutrition-info.component.html',
  styleUrls: ['./nutrition-info.component.css'],
})
export class NutritionInfoComponent implements OnInit {
  totalCalories;
  carbs;
  protein;
  fat;
  caloriesIntake;

  constructor(private calculate: CaloriesCalcService) {}

  ngOnInit(): void {
    this.getdata();
  }

  getdata(): void {
    this.calculate.dailyNutrienDataSource.subscribe((val) => {
      this.carbs = val.carbs;
      this.protein = val.protein;
      this.fat = val.fat;
      this.totalCalories = val.calories;
    });
    this.calculate.caloriesIntake.subscribe((val) => {
      this.caloriesIntake = val;
    });
    this.calculate.calculateNutriens();
  }
}
