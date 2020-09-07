import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlanMealComponent } from './plan-meal/plan-meal.component';
import { ProfileComponent } from './profile/profile.component';
import { SummaryComponent } from './summary/summary.component';

const routes: Routes = [  
  {path: 'plan', component: PlanMealComponent},
  {path: 'summary', component: SummaryComponent},
  {path: 'profile', component: ProfileComponent},
  {path: '', redirectTo: '/plan', pathMatch: 'full'}
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
