import { Component, OnInit } from '@angular/core';
import { AllCustomersGQL } from './all-customers-gql.service';
import { CustomerById } from './customer-by-id.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(
        private readonly _allCustomersGQL: AllCustomersGQL,
        private readonly _customerById: CustomerById
    ) {}

    ngOnInit(): void {
        this._allCustomersGQL.watch().valueChanges.subscribe(console.log);
        this._customerById
            .watch({ customerId: '458c41c1-d38b-4be8-9741-07d05cfaf631' })
            .valueChanges.subscribe(console.log);
    }
}
