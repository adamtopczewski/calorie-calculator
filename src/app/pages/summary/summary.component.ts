import { DataSource } from '@angular/cdk/table';
import { Component, OnInit } from '@angular/core';
import { LocalstorageCrudService } from 'src/app/services/localstorage-crud.service';
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
    private local: LocalstorageCrudService
  ) {}

  ngOnInit(): void {
    this.calculate.monthlyNutrienDataSource.subscribe((a) => {
      this.monthlyNutrienData = a;
    });

  }

  populateData() {
    this.local.populateLocalStorage();
  }

  clearStorage() {
    this.local.clear();
  }
}
