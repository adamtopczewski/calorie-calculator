import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanMealComponent } from './plan-meal.component';

describe('PlanMealComponent', () => {
  let component: PlanMealComponent;
  let fixture: ComponentFixture<PlanMealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanMealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
