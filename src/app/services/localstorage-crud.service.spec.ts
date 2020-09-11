import { TestBed } from '@angular/core/testing';

import { LocalstorageCrudService } from './localstorage-crud.service';

describe('LocalstorageCrudService', () => {
  let service: LocalstorageCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalstorageCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
