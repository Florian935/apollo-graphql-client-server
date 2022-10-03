import { TestBed } from '@angular/core/testing';

import { CustomerByIdGQL } from './customer-by-id-gql.service';

describe('CustomerByIdGql', () => {
    let service: CustomerByIdGQL;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CustomerByIdGQL);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
