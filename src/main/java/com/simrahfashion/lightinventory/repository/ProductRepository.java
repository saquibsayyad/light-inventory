package com.simrahfashion.lightinventory.repository;

import com.simrahfashion.lightinventory.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, String> {
    List<Product> findAllByName(final String name);

    @Query("SELECT * FROM product p WHERE p.name LIKE '%name%'")
    List<Product> findAllWhichHasName(final String name);
}
