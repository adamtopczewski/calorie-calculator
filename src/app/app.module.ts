import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// Angular material
import { AngularMaterialModule } from './angular-material.module';
//Routing
import { AppRoutingModule } from './app-routing.module';
//Components
import { AppComponent } from './app.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SummaryComponent } from './pages/summary/summary.component';
import { PlanMealComponent } from './pages/plan-meal/plan-meal.component';
import { NutritionInfoComponent } from './nutrition-info/nutrition-info.component';
import { CalculateMealsComponent } from './calculate-meals/calculate-meals.component';
import { AddMealDialogComponent } from './add-meal-dialog/add-meal-dialog.component';
//Services
import { LocalstorageCrudService } from './services/localstorage-crud.service'
import { CaloriesCalcService } from './services/calories-calc.service'

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
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularMaterialModule
  ],
  providers: [ LocalstorageCrudService, CaloriesCalcService ],
  entryComponents: [AddMealDialogComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
