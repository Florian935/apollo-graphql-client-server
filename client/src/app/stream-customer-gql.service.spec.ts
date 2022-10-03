import { TestBed } from '@angular/core/testing';

import { StreamCustomerGQLService } from './stream-customer-gql.service';

describe('StreamCustomerGQLService', () => {
  let service: StreamCustomerGQLService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StreamCustomerGQLService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
