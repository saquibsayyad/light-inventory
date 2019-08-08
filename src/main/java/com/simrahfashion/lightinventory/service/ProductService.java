package com.simrahfashion.lightinventory.service;

import com.simrahfashion.lightinventory.entity.Product;
import com.simrahfashion.lightinventory.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Optional;

@Service
@AllArgsConstructor
public class ProductService {
    private ProductRepository productRepository;


    public Flux<Product> findAllProducts(){
        return Flux.defer(() -> Flux.fromIterable(productRepository.findAll()));
    }

    public Flux<Product> findAllProductsByName(final String name){
        return Flux.defer(() -> Flux.fromIterable(productRepository.findAllByName(name)));
    }

    public Mono<Optional<Product>> findProduct(final String id){
        return Mono.defer(() -> Mono.fromSupplier(() -> productRepository.findById(id)));
    }

    public Flux<Product> findAllHavingName(final String _name){
        return Flux.defer(() -> Flux.fromIterable(productRepository.findAllWhichHasName(_name)));
    }

    public Mono<Product> addProduct(Product product) {
        return Mono.defer(() -> Mono.fromSupplier(() -> productRepository.save(product)));
    }

    public Mono<Product> updateProduct(Product product) {
        return Mono.defer(() -> Mono.fromSupplier(() -> productRepository.save(product)));
    }
}
