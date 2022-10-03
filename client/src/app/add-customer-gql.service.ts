import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';

@Injectable({
    providedIn: 'root',
})
export class AddCustomerGQL extends Mutation<any> {
    override document = gql`
        mutation addCustomer($customerInput: CustomerInput!) {
            addCustomer(customerInput: $customerInput) {
                customerId
                name
            }
        }
    `;
}
