package com.simrahfashion.lightinventory.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name="ProductSales")
@EqualsAndHashCode(exclude = {"sale", "product"})
public class ProductSale implements Serializable {
    private static final long serialVersionUID = 210416633855792364L;

    @Id
    private Integer id;

    @ManyToOne
    @JsonIgnore
    private Sale sale;

    @ManyToOne
    private Product product;

    @Column
    private Integer saleQuantity;

    @Column
    private Integer salePrice;

}
