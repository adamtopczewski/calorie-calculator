import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plan-meal',
  templateUrl: './plan-meal.component.html',
  styleUrls: ['./plan-meal.component.css']
})
export class PlanMealComponent implements OnInit {

  panelOpenState = false;
  constructor() { }

  ngOnInit(): void {
  }

}
