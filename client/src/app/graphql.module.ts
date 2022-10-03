import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, split, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getOperationAST } from 'graphql';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

const httpUri = 'http://localhost:8080/graphql';
const wsUri = 'ws://localhost:8080/graphql';
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
    // Create an http link:
    const http = httpLink.create({
        uri: httpUri,
    });

    // Create a WebSocket link:
    const ws = new GraphQLWsLink(
        createClient({
            url: wsUri,
        })
    );

    // using the ability to split links, you can send data to each link
    // depending on what kind of operation is being sent
    const link = split(
        // 3
        (operation) => {
            const operationAST = getOperationAST(
                operation.query,
                operation.operationName
            );
            return !!operationAST && operationAST.operation === 'subscription';
        },
        ws,
        http
    );

    return {
        link,
        cache: new InMemoryCache(),
    };
}

@NgModule({
    exports: [ApolloModule],
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory: createApollo,
            deps: [HttpLink],
        },
    ],
})
export class GraphQLModule {}
