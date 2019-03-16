package com.vaskka.project.drinkcapcap.entity;


import com.vaskka.project.drinkcapcap.entity.base.BaseEntity;

import javax.persistence.*;


@Table(name = "shop")
@Entity
public class Shop extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String shop_name;

    public Shop() {
    }

    public Shop(String shop_name, String other_name) {
        this.shop_name = shop_name;
        this.other_name = other_name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getShop_name() {
        return shop_name;
    }

    public void setShop_name(String shop_name) {
        this.shop_name = shop_name;
    }

    public String getOther_name() {
        return other_name;
    }

    public void setOther_name(String other_name) {
        this.other_name = other_name;
    }

    private String other_name;
}
