import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateMealsComponent } from './calculate-meals.component';

describe('CalculateMealsComponent', () => {
  let component: CalculateMealsComponent;
  let fixture: ComponentFixture<CalculateMealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculateMealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculateMealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
