package com.simrahfashion.lightinventory.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
public class Sale {

    @Id
    private Integer id;

    @Column
    private BigDecimal totalAmount;

    @Column
    private BigDecimal totalTax;

    @Column
    private BigDecimal salesAmount;

    @Column
    private Date timeCreated;

    @OneToMany(mappedBy = "sale", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<ProductSale> productSale;
}
