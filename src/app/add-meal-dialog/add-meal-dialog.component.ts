import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FoodDbService } from '../services/food-db.service';

export interface DialogData {
  queryResults: any;
}

@Component({
  selector: 'app-add-meal-dialog',
  templateUrl: './add-meal-dialog.component.html',
  styleUrls: ['./add-meal-dialog.component.css'],
})
export class AddMealDialogComponent implements OnInit {
  queryResults: any;
  mealId;
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<AddMealDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private foodDb: FoodDbService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.mealId = this.data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  searchFood(query: string): void {
    this.loading = true;
    this.foodDb.searchFoods(query).subscribe((results) => {
      this.queryResults = results;
      this.loading = false;
    });
  }

  chooseItem(query, measure, quantity, mealId): void {
    let id = query.food.foodId;
    this.foodDb.chooseFood(query, measure, id, quantity, mealId).subscribe(_ => {
      this._snackBar.open('Food has been added', '🍌' , {duration: 2000});
    });
  }
}
