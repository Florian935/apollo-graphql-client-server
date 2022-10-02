package com.florian935.graphql.server.controller;

import com.florian935.graphql.server.domain.Customer;
import com.florian935.graphql.server.domain.CustomerInput;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.UUID;
import java.util.concurrent.ConcurrentMap;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Controller
public class CustomerGraphqlController {

    final ConcurrentMap<String, Customer> customers = Stream.iterate(1, n -> n + 1)
            .limit(10)
            .map(index -> UUID.randomUUID().toString())
            .collect(Collectors.toConcurrentMap(
                    uuid -> uuid,
                    uuid -> new Customer(uuid, String.format("Customer %s", uuid)))
            );

    @QueryMapping
    Flux<Customer> allCustomers() {
        final var customersAsList = customers.values();

        return Flux.fromIterable(customersAsList);
    }

    @QueryMapping
    Mono<Customer> customerById(@Argument String customerId) {
        final var customer = customers.getOrDefault(customerId, null);

        return Mono.just(customer);
    }

    @MutationMapping
    Mono<Customer> addCustomer(@Argument CustomerInput customerInput) {
        final var uuid = UUID.randomUUID().toString();
        this.customers.put(uuid, new Customer(uuid, customerInput.name()));

        return Mono.just(new Customer(uuid, customerInput.name()));
    }
}
