import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddMealDialogComponent } from '../add-meal-dialog/add-meal-dialog.component';
import { FoodDbService } from '../food-db.service';
import { meals } from '../meals';


@Component({
  selector: 'app-calculate-meals',
  templateUrl: './calculate-meals.component.html',
  styleUrls: ['./calculate-meals.component.css']
})
export class CalculateMealsComponent implements OnInit {
  itemsArr = [];
  meals;

  constructor(
    public dialog : MatDialog,
    public foodDb: FoodDbService
  ) { }

  ngOnInit(): void {
    this.meals = meals
  }  

  openDialog(id): void {
    const dialogRef = 
    this.dialog.open(AddMealDialogComponent, {
      data: id
    });

    dialogRef.componentInstance.foodObject.subscribe(value => {
      this.meals.forEach(element => {
        if(element.mealId == value.mealId){
          element.items.push(value);
          element.totalCal += value.nutrients.calories
        }
      });
    });

    dialogRef.afterClosed().subscribe()
  }
}
