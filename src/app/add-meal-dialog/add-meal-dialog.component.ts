import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FoodDbService } from '../food-db.service'

export interface DialogData {
  queryResults: any;
}

@Component({
  selector: 'app-add-meal-dialog',
  templateUrl: './add-meal-dialog.component.html',
  styleUrls: ['./add-meal-dialog.component.css']
})

export class AddMealDialogComponent implements OnInit {
  queryResults: any;
  mealId;

  constructor(
    public dialogRef : MatDialogRef<AddMealDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : DialogData,
    private foodDb : FoodDbService
  ) { }

  ngOnInit(): void {
    this.mealId = this.data
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  searchFood(query:string): void{
    this.foodDb.searchFood(query).subscribe( results => this.queryResults = results)
  }

  chooseItem(query, measure, quantity, mealId): void {
    let id = query.food.foodId
    this.foodDb.chooseFood(query, measure, id, quantity, mealId).subscribe()
  }
}
