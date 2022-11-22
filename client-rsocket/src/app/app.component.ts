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
            variables: { customerId: '19a3ffe5-2eed-4ca8-93d3-6ad5e11cee9a' },
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
                        customerId
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

        const subscriptionWithArgument = JSON.stringify({
            query: `subscription addCustomers($customersInput: [CustomerInput]!) {
                        addCustomers(customersInput: $customersInput) {
                            customerId
                            name
                        }
                    }
                    `,
            variables: {
                customersInput: [
                    { name: 'Customer 1' },
                    { name: 'Customer 2' },
                    { name: 'Customer 3' },
                    { name: 'Customer 4' },
                    { name: 'Customer 5' },
                ],
            },
            operationName: 'addCustomers',
        });

        this._rsocketService
            .requestStream(subscriptionWithArgument, 'graphql')
            .subscribe(console.log);
    }
}
