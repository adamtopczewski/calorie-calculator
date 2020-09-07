import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// Material components
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Routing
import { AppRoutingModule } from './app-routing.module';
//Components
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { SummaryComponent } from './summary/summary.component';
import { PlanMealComponent } from './plan-meal/plan-meal.component';
import { NutritionInfoComponent } from './nutrition-info/nutrition-info.component';
import { CalculateMealsComponent } from './calculate-meals/calculate-meals.component';
import { AddMealDialogComponent } from './add-meal-dialog/add-meal-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    SummaryComponent,
    PlanMealComponent,
    NutritionInfoComponent,
    CalculateMealsComponent,
    AddMealDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatDividerModule,
    MatListModule,
    BrowserAnimationsModule
  ],
  providers: [],
  entryComponents: [
    AddMealDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
