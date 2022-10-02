import { TestBed } from '@angular/core/testing';

import { CustomerByIdService } from './customer-by-id.service';

describe('CustomerByIdService', () => {
  let service: CustomerByIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerByIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
