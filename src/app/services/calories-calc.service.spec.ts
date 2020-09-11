import { TestBed } from '@angular/core/testing';

import { CaloriesCalcService } from './calories-calc.service';

describe('CaloriesCalcService', () => {
  let service: CaloriesCalcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaloriesCalcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
