import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlanMealComponent } from './pages/plan-meal/plan-meal.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SummaryComponent } from './pages/summary/summary.component';

const routes: Routes = [
  { path: 'plan', component: PlanMealComponent },
  { path: 'summary', component: SummaryComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: '/plan', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
