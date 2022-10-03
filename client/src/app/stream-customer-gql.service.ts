import { Injectable } from '@angular/core';
import { gql, Subscription } from 'apollo-angular';

@Injectable({
    providedIn: 'root',
})
export class StreamCustomerGQL extends Subscription<any> {
    override document = gql`
        subscription streamCustomer {
            streamCustomer {
                customerId
                name
            }
        }
    `;
}
