package com.simrahfashion.lightinventory.controller;

import com.simrahfashion.lightinventory.controller.dto.ProductDTO;
import com.simrahfashion.lightinventory.entity.Product;
import com.simrahfashion.lightinventory.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Optional;

@RestController
@RequestMapping("/products")
@AllArgsConstructor
public class ProductController {

    private ProductService service;

    @GetMapping
    public Flux<Product> list(){
        return service.findAllProducts();
    }

    @GetMapping("/{id}")
    public Mono<Optional<Product>> getProduct(@PathVariable final Integer id){
        return service.findProduct(id);
    }

    @PostMapping
    public Mono<Product> addProduct(@RequestBody final Product product) {
        return service.addProduct(product);
    }

    @PutMapping
    public Mono<Product> updateProduct(@RequestBody final Product product) {
        return service.updateProduct(product);
    }

    @DeleteMapping("/{id}")
    public Mono<Void> deleteProduct(@PathVariable final Integer id) {
        return service.deleteProduct(id);
    }
}
