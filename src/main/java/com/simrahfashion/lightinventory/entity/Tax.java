package com.simrahfashion.lightinventory.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.math.BigDecimal;

@Entity
@Data
@NoArgsConstructor
public class Tax {
    @Id
    private Integer id;

    @Column
    private String name;

    @Column
    private BigDecimal rate;
}
