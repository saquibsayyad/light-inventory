package com.simrahfashion.lightinventory.controller;

import com.simrahfashion.lightinventory.entity.Sale;
import com.simrahfashion.lightinventory.service.SaleService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import javax.transaction.Transactional;
import java.util.Optional;

@RestController
@RequestMapping("/sales")
@AllArgsConstructor
public class SalesController {

    private SaleService saleService;

    @GetMapping
    @Transactional
    public Flux<Sale> list() {
        return saleService.getAllSales();
    }

    @GetMapping("/{id}")
    public Mono<Optional<Sale>> get(@PathVariable final Integer id) {
        return saleService.getSale(id);
    }

    @PostMapping
    public Mono<Sale> add(@RequestBody final Sale sale) {
        return saleService.addSale(sale);
    }

}
