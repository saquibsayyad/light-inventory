package com.simrahfashion.lightinventory.repository;

import com.simrahfashion.lightinventory.entity.Tax;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaxRepository extends JpaRepository<Tax, Integer> {
}
