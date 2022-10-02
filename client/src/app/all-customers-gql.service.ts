import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';

@Injectable({
    providedIn: 'root',
})
export class AllCustomersGQL extends Query<any> {
    override document = gql`
        query allCustomers {
            allCustomers {
                customerId
                name
            }
        }
    `;
}
