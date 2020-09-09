import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root',
})
export class FoodDbService {
  private mealId;
  @Output() foodItem: EventEmitter<any> = new EventEmitter();

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private foodSearchUrl: string = `https://api.edamam.com/api/food-database/v2/parser?ingr=`;
  private itemNutriensUrl: string = `https://api.edamam.com/api/food-database/v2/nutrients?`;
  private apiId: string = environment.API_ID;
  private apiKey: string = environment.API_KEY;

  constructor(private http: HttpClient) {}

  searchFood(food: string): Observable<any> {
    food.trim();
    if (!food) {
      return;
    }
    return this.http.get(
      `${this.foodSearchUrl}${food}&${this.apiId}&${this.apiKey}`
    );
  }

  chooseFood(choosenItem, url, id, quantity, mealId): Observable<any> {
    this.mealId = mealId;
    return this.http
      .post(
        `${this.itemNutriensUrl}${this.apiId}&${this.apiKey}`,
        {
          ingredients: [
            {
              quantity: quantity,
              measureURI: url,
              foodId: id,
            },
          ],
        },
        this.httpOptions
      )
      .pipe(
        tap((res) => {
          this.addFood(choosenItem, quantity, res);
        })
      );
  }

  addFood(food, quantity, nutrients): void {
    let data = {
      food: food.food,
      quantity: quantity,
      nutrients: nutrients,
      mealId: this.mealId,
    };
    this.foodItem.emit(data);
  }
}
