package com.simrahfashion.lightinventory.controller;

import com.simrahfashion.lightinventory.entity.Tax;
import com.simrahfashion.lightinventory.service.TaxService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@AllArgsConstructor
@RestController
@RequestMapping("/tax")
public class TaxController {

    private TaxService taxService;

    @GetMapping
    public Flux<Tax> list() {
        return taxService.getAllTaxes();
    }

    @PostMapping
    public Mono<Tax> addTax(@RequestBody final Tax tax) {
        return taxService.addTax(tax);
    }

    @PutMapping
    public Mono<Tax> updateTax(@RequestBody final Tax tax) {
        return taxService.updateTax(tax);
    }

    @DeleteMapping("/{id}")
    public Mono<Void> deleteTax(@PathVariable final Integer id) {
        return taxService.deleteTax(id);
    }
}
