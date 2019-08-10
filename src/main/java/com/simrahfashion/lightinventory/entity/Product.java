package com.simrahfashion.lightinventory.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@Entity
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Product {

    @Id
    @GeneratedValue
    private Integer id;

    @Column
    private String name;

    @Column
    private String description;

    @Column
    private Long quantity;

    @Column
    private BigDecimal price;
}
