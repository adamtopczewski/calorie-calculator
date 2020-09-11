import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// Animations and angular material
import { AngularMaterialModule } from './angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    SummaryComponent,
    PlanMealComponent,
    NutritionInfoComponent,
    CalculateMealsComponent,
    AddMealDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
  ],
  providers: [ LocalstorageCrudService ],
  entryComponents: [AddMealDialogComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
