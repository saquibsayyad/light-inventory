package com.simrahfashion.lightinventory.entity;

import lombok.*;
import org.springframework.data.annotation.Id;

import javax.persistence.Column;
import java.math.BigDecimal;


@Data
@NoArgsConstructor
public class Product {

    @Id
    private String id;

    @Column
    private String name;

    @Column
    private String description;

    @Column
    private Long quantity;

    @Column
    private BigDecimal price;
}
