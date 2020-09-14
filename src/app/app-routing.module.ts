import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PlanMealComponent } from './pages/plan-meal/plan-meal.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SummaryComponent } from './pages/summary/summary.component';

const routes: Routes = [
  { path: 'plan', component: PlanMealComponent, data: { animation: 'PlanMealPage' } },
  { path: 'summary', component: SummaryComponent, data: { animation: 'SummaryPage' } },
  { path: 'profile', component: ProfileComponent, data: { animation: 'ProfilePage' } },
  { path: '', redirectTo: '/plan', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserAnimationsModule],
  exports: [RouterModule, BrowserAnimationsModule],
})
export class AppRoutingModule {}
