import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddMealDialogComponent } from '../add-meal-dialog/add-meal-dialog.component';
import { FoodDbService } from '../services/food-db.service';
import { LocalstorageCrudService } from '../services/localstorage-crud.service';
import { PlanMealsService } from '../services/plan-meals.service'

@Component({
  selector: 'app-calculate-meals',
  templateUrl: './calculate-meals.component.html',
  styleUrls: ['./calculate-meals.component.css'],
})
export class CalculateMealsComponent implements OnInit {
  meals;

  constructor(
    public dialog: MatDialog,
    public foodDb: FoodDbService,
    public localStorage: LocalstorageCrudService,
    public planMeals: PlanMealsService
  ) {}

  ngOnInit(): void {
    this.meals = this.planMeals.getMeals();
  }
  save(): void {
    this.localStorage.update(this.meals);
  }

  delete(item, mealId):void {
    this.planMeals.deleteItem(item, mealId)
  }

  openDialog(id): void {
    const dialogRef = this.dialog.open(AddMealDialogComponent, {
      data: id,
      maxWidth: '1000px',
      width: '90%',
    });
    dialogRef.afterClosed().subscribe();
  }
}
