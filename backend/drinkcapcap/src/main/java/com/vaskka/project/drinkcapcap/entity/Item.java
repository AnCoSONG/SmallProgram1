package com.vaskka.project.drinkcapcap.entity;


import com.vaskka.project.drinkcapcap.entity.base.BaseEntity;

import javax.persistence.*;


@Table(name = "item")
@Entity
public class Item extends BaseEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String item_name;

    private Integer shop_id;

    public Item(String item_name, Integer shop_id) {
        this.item_name = item_name;
        this.shop_id = shop_id;
    }

    public Item() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getItem_name() {
        return item_name;
    }

    public void setItem_name(String item_name) {
        this.item_name = item_name;
    }

    public Integer getShop_id() {
        return shop_id;
    }

    public void setShop_id(Integer shop_id) {
        this.shop_id = shop_id;
    }
}
