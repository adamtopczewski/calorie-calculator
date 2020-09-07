import { TestBed } from '@angular/core/testing';

import { FoodDbService } from './food-db.service';

describe('FoodDbService', () => {
  let service: FoodDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
