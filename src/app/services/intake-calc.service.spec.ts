import { TestBed } from '@angular/core/testing';

import { IntakeCalcService } from './intake-calc.service';

describe('IntakeCalcService', () => {
  let service: IntakeCalcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntakeCalcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
