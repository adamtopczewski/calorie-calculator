import { Component, OnInit } from '@angular/core';
import { MealsService } from '../meals.service';

@Component({
  selector: 'app-nutrition-info',
  templateUrl: './nutrition-info.component.html',
  styleUrls: ['./nutrition-info.component.css']
})
export class NutritionInfoComponent implements OnInit {
  totalCalories = 0;
  sugar = 0;
  protein = 0;
  fat = 0;

  constructor(private meals: MealsService) { }

  ngOnInit(): void {
    this.getdata()
  }

  getdata(): void {
    this.meals.nutrienInfo.subscribe(val => {
      this.sugar = val.sugar
      this.protein = val.protein
      this.fat = val.fat
      this.totalCalories = val.calories
    })
  }
}
