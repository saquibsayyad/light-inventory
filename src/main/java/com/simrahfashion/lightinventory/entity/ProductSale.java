package com.simrahfashion.lightinventory.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
public class ProductSale implements Serializable {

    @Id
    @ManyToOne
    @JoinColumn
    private Sale sale;

    @Id
    @ManyToOne
    @JoinColumn
    private Product product;

    @Column
    private Integer saleQuantity;

    @Column
    private Integer salePrice;

}
