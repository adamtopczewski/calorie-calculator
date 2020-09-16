import { Component, OnInit } from '@angular/core';
import { LocalstorageCrudService } from 'src/app/services/localstorage-crud.service';
import { PlanMealsService } from 'src/app/services/plan-meals.service';
import { CaloriesCalcService } from '../../services/calories-calc.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  monthlyNutrienData;
  constructor(
    private calculate: CaloriesCalcService,
    private plan: PlanMealsService,
    private local: LocalstorageCrudService
  ) {}

  ngOnInit(): void {
    this.plan.setMonthlyNutrients()
    this.calculate.monthlyNutrienDataSource.subscribe((val) => {
      this.monthlyNutrienData = val;
    });
  }

  populateData() {
    this.local.populateLocalStorage();
    this.plan.setMonthlyNutrients();
  }

  clearStorage() {
    this.local.clear();
  }
}
