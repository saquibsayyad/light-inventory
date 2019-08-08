package com.simrahfashion.lightinventory.controller;


import com.simrahfashion.lightinventory.controller.dto.ProductDTO;
import com.simrahfashion.lightinventory.entity.Product;
import com.simrahfashion.lightinventory.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Optional;

@RestController("/product")
@AllArgsConstructor
public class ProductController {

    private ProductService service;

    @GetMapping
    public Flux<Product> list(){
        return service.findAllProducts();
    }

    @GetMapping("{productId}")
    public Mono<Optional<Product>> getProduct(final String id){
        return service.findProduct(id);
    }

    @PostMapping
    public Mono<Product> addProduct(@RequestBody Product product) {
        return service.addProduct(product);
    }

    @PutMapping
    public Mono<Product> updateProduct(@RequestBody Product product) {
        return service.updateProduct(product);
    }
}
