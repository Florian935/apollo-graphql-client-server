import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';

@Injectable({
    providedIn: 'root',
})
export class CustomerByIdGQL extends Query<any> {
    override document = gql`
        query customerById($customerId: ID!) {
            customerById(customerId: $customerId) {
                customerId
                name
            }
        }
    `;
}
