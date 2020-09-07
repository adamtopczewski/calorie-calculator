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
  @Output() foodObject= new EventEmitter;
  mealId;

  constructor(
    public dialogRef : MatDialogRef<AddMealDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : DialogData,
    private foodDb : FoodDbService
  ) { }

  ngOnInit(): void {
    this.mealId = this.data
  }

  addNewItem(food, quantity, nutrients) {
    let combined = {
      food: food.food,
      quantity: quantity,
      nutrients: nutrients,
      mealId: this.mealId
    }
    this.foodObject.emit(combined)
  }
  
  searchFood(query:string): void{
    this.foodDb.searchFood(query).subscribe( results => this.queryResults = results)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  chooseItem(query, measure, quantity): void {
    let id = query.food.foodId
    this.foodDb.chooseFood(measure, id, quantity).subscribe(nutrients => {
      this.addNewItem(query, quantity, nutrients);
    })
  }

  logIt(...items): void {
    console.log(items)
  }
}
