package com.simrahfashion.lightinventory.controller.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
public class ProductDTO {
    private String id;
    @NotEmpty
    private String name;
    private String description;
    @NotNull
    private Long quantity;
    @NotNull
    private BigDecimal price;
}
