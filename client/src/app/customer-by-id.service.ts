import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';

@Injectable({
    providedIn: 'root',
})
export class CustomerById extends Query<any> {
    override document = gql`
        query customerById($customerId: ID!) {
            customerById(customerId: $customerId) {
                customerId
                name
            }
        }
    `;
}
