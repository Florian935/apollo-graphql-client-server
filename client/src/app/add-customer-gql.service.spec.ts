import { TestBed } from '@angular/core/testing';

import { AddCustomerGQL } from './add-customer-gql.service';

describe('AddCustomerGQL', () => {
    let service: AddCustomerGQL;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AddCustomerGQL);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
