package com.vaskka.project.drinkcapcap.entity;


import com.vaskka.project.drinkcapcap.entity.base.BaseEntity;

import javax.persistence.*;

@Table(name = "drink_control")
@Entity
public class DrinkControl extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "shop_id")
    private Integer shopId;

    @Column(name = "item_id")
    private Integer itemId;

    private Integer number;

    public DrinkControl() {
    }

    public Integer getId() {
        return id;
    }

    public DrinkControl(Integer shop_id, Integer item_id, Integer number) {
        this.shopId = shop_id;
        this.itemId = item_id;
        this.number = number;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getShop_id() {
        return shopId;
    }

    public void setShop_id(Integer shop_id) {
        this.shopId = shop_id;
    }

    public Integer getItem_id() {
        return itemId;
    }

    public void setItem_id(Integer item_id) {
        this.itemId = item_id;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }
}
