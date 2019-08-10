package com.simrahfashion.lightinventory.service;

import com.simrahfashion.lightinventory.entity.Sale;
import com.simrahfashion.lightinventory.repository.SaleRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Optional;

@Service
@AllArgsConstructor
public class SaleService {
    private SaleRepository saleRepository;

    public Flux<Sale> getAllSales() {
        return Flux.defer(() -> Flux.fromIterable(saleRepository.findAll()));
    }

    public Mono<Optional<Sale>> getSale(final Integer id) {
        return Mono.defer(() -> Mono.fromSupplier(() -> saleRepository.findById(id)));
    }

    public Mono<Sale> addSale(final Sale sale) {
        return Mono.defer(() -> Mono.fromSupplier(() -> saleRepository.save(sale)));
    }

    public Mono<Sale> updateSale(final Sale sale) {
        return Mono.defer(() -> Mono.fromSupplier(() -> saleRepository.save(sale)));
    }

    public Mono<Void> deleteSale(final Integer id) {
        return Mono.defer(() -> Mono.fromRunnable(() -> saleRepository.deleteById(id)));
    }
}
