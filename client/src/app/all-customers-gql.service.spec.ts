import { TestBed } from '@angular/core/testing';

import { AllCustomersGQLService } from './all-customers-gql.service';

describe('AllCustomersGQLService', () => {
  let service: AllCustomersGQLService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllCustomersGQLService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
