import { Component, OnInit } from '@angular/core';
import { AddCustomerGQL } from './add-customer-gql.service';
import { AllCustomersGQL } from './all-customers-gql.service';
import { CustomerByIdGQL } from './customer-by-id-gql.service';
import { CustomerInput } from './customer.input';
import { StreamCustomerGQL } from './stream-customer-gql.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(
        private readonly _allCustomersGQL: AllCustomersGQL,
        private readonly _customerByIdGQL: CustomerByIdGQL,
        private readonly _streamCustomerGQL: StreamCustomerGQL,
        private readonly _addCustomerGQL: AddCustomerGQL
    ) {}

    ngOnInit(): void {
        // Query
        this._allCustomersGQL.watch().valueChanges.subscribe(console.log);

        // Query with variable
        this._customerByIdGQL
            .watch({ customerId: 'e6cfa210-31bf-4136-ad4b-eb890f22694d' })
            .valueChanges.subscribe(console.log);

        // Subscription (stream)
        this._streamCustomerGQL.subscribe().subscribe((result) => {
            console.log(result);
        });

        // Mutation
        const a = this._addCustomerGQL
            .mutate({ customerInput: new CustomerInput('A customer') })
            .subscribe(console.log);
    }
}
