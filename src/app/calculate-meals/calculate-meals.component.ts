import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddMealDialogComponent } from '../add-meal-dialog/add-meal-dialog.component';
import { FoodDbService } from '../services/food-db.service';
import { LocalstorageCrudService } from '../services/localstorage-crud.service';

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
    public localStorage: LocalstorageCrudService
  ) {}

  ngOnInit(): void {
    this.meals = this.localStorage.meals;
  }

  openDialog(id): void {
    const dialogRef = this.dialog.open(AddMealDialogComponent, {
      data: id,
      maxWidth: '1000px',
      width: '90%',
    });
    dialogRef.afterClosed().subscribe();
  }

  save(): void {
    this.localStorage.update(this.meals);
  }

  delete(item, mealId):void {
    this.localStorage.deleteItem(item, mealId)
  }
}
