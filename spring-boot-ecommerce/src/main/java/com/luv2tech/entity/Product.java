package com.luv2tech.entity;

import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "product")
@Data
public class Product extends BaseAudit {

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private ProductCategory category;


    @Column(name = "sku")
    private String sku;
    @Column(name = "name")
    private String name;
    @Column(name = "description")
    private String description;
    @Column(name = "unit_price")
    private BigDecimal unitPrice;
    @Column(name = "image_url")
    private String imageUrl;
    @Column(name = "units_in_stock")
    private int unitsInStock;

}
