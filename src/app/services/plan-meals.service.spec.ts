import { TestBed } from '@angular/core/testing';

import { PlanMealsService } from './plan-meals.service';

describe('PlanMealsService', () => {
  let service: PlanMealsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanMealsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
