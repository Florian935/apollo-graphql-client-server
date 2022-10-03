import { Component, OnInit } from '@angular/core';
import { CustomerInput } from './customer.input';
import { RsocketService } from './rsocket.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(private readonly _rsocketService: RsocketService) {}

    ngOnInit(): void {
        const query = JSON.stringify({
            query: `query allCustomers {
                allCustomers {
                    customerId
                    name
                }
            }`,
            variables: {},
            operationName: 'allCustomers',
        });

        this._rsocketService
            .requestResponse(query, 'graphql')
            .subscribe(console.log);

        const queryWithArgument = JSON.stringify({
            query: `query customerById($customerId: ID!) {
                customerById(customerId: $customerId) {
                    customerId
                    name
                }
            }`,
            variables: { customerId: '4b18f8c6-32ba-4c66-a86e-4f6349496e23' },
            operationName: 'customerById',
        });

        this._rsocketService
            .requestResponse(queryWithArgument, 'graphql')
            .subscribe(console.log);

        const mutation = JSON.stringify({
            query: `mutation addCustomer($customerInput: CustomerInput!) {
                addCustomer(customerInput: $customerInput) {
                    customerId
                    name
                }
            }`,
            variables: {
                customerInput: { name: 'Customer created' },
            },
            operationName: 'addCustomer',
        });

        this._rsocketService
            .requestResponse(mutation, 'graphql')
            .subscribe(console.log);

        const subscription = JSON.stringify({
            query: `subscription streamCustomer {
                    streamCustomer {
                        name
                    }
                }
                `,
            variables: {},
            operationName: 'streamCustomer',
        });

        this._rsocketService
            .requestStream(subscription, 'graphql')
            .subscribe(console.log);
    }
}
