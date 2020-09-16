import { Component, OnInit } from '@angular/core';
import { CaloriesCalcService } from '../services/calories-calc.service';
import { IntakeCalcService } from '../services/intake-calc.service';

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

  constructor(private calculate: CaloriesCalcService, private intakeCalc: IntakeCalcService) {}

  ngOnInit(): void {
    this.intakeCalc.getData().subscribe(val => this.caloriesIntake = val);
    this.calculate.dailyNutrienDataSource.subscribe((val) => {
      this.carbs = val.carbs;
      this.protein = val.protein;
      this.fat = val.fat;
      this.totalCalories = val.calories;
    });
  }
}
