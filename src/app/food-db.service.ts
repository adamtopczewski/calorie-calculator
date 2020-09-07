import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})

export class FoodDbService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };    

  private foodSearchUrl:string = `https://api.edamam.com/api/food-database/v2/parser?ingr=`;
  private itemNutriensUrl:string = `https://api.edamam.com/api/food-database/v2/nutrients?`;
  private apiId:string = environment.API_ID;
  private apiKey:string = environment.API_KEY;

  constructor(private http: HttpClient) { }

  searchFood(food:string):Observable<any> {
    food.trim()
    if(!food){return;}
    return this.http.get(`${this.foodSearchUrl}${food}&${this.apiId}&${this.apiKey}`)
  }

  chooseFood(url, id, quantity):Observable<any>{
    console.log(url,id)
    return this.http.post(`${this.itemNutriensUrl}${this.apiId}&${this.apiKey}`, {
      "ingredients": [
      {
          "quantity": quantity,
          "measureURI": url,
          "foodId": id
          }
      ]
    }, this.httpOptions)
  }
}
