import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class FoodDbService {
  //API
  private foodSearchUrl: string = `https://api.edamam.com/api/food-database/v2/parser?ingr=`;
  private itemNutriensUrl: string = `https://api.edamam.com/api/food-database/v2/nutrients?`;
  private apiId: string = environment.API_ID;
  private apiKey: string = environment.API_KEY;
  //Config
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  //Food response
  private foodItemSource = new Subject<any>();
  public foodItem = this.foodItemSource.asObservable();
  private mealId;

  constructor(private http: HttpClient) {}

  searchFoods(food: string): Observable<any> {
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

  addFood(food, quantity, nutrients) {
    this.foodItemSource.next({
      foodName: food.food.label,
      foodImage: food.food.image,
      quantity: quantity,
      calories: nutrients.calories,
      nutrients: nutrients.totalNutrients,
      weight: nutrients.totalWeight,
      mealId: this.mealId,
    })
  }
}
