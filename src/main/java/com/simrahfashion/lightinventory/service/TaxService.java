package com.simrahfashion.lightinventory.service;

import com.simrahfashion.lightinventory.entity.Tax;
import com.simrahfashion.lightinventory.repository.TaxRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@AllArgsConstructor
public class TaxService {

    private TaxRepository taxRepository;

    public Flux<Tax> getAllTaxes() {
        return Flux.defer(() -> Flux.fromIterable(taxRepository.findAll()));
    }

    public Mono<Tax> addTax(Tax tax) {
        return Mono.defer(() -> Mono.fromSupplier(() -> taxRepository.save(tax)));
    }

    public Mono<Tax> updateTax(Tax tax) {
        return Mono.defer(() -> Mono.fromSupplier(() -> taxRepository.save(tax)));
    }

    public Mono<Void> deleteTax(Integer id) {
        return Mono.defer(() -> Mono.fromRunnable(() -> taxRepository.deleteById(id)));
    }
}
