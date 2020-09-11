import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddMealDialogComponent } from '../add-meal-dialog/add-meal-dialog.component';
import { FoodDbService } from '../services/food-db.service';
// import { meals } from '../meals';
import { MealsService } from '../services/meals.service';
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
    public mealsService: MealsService,
    public localStorage: LocalstorageCrudService
  ) {}

  ngOnInit(): void {
    this.meals = this.mealsService.meals;
  }

  openDialog(id): void {
    const dialogRef = this.dialog.open(AddMealDialogComponent, {
      data: id,
    });
    dialogRef.afterClosed().subscribe();
  }

  save(): void {
    this.localStorage.update(this.meals);
  }
}
