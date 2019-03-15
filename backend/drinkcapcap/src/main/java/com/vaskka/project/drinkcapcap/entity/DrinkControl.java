package com.vaskka.project.drinkcapcap.entity;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class DrinkControl {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private Integer shop_id;

    private Integer item_id;

    private Integer number;

    public DrinkControl() {
    }

    public Integer getId() {
        return id;
    }

    public DrinkControl(Integer shop_id, Integer item_id, Integer number) {
        this.shop_id = shop_id;
        this.item_id = item_id;
        this.number = number;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getShop_id() {
        return shop_id;
    }

    public void setShop_id(Integer shop_id) {
        this.shop_id = shop_id;
    }

    public Integer getItem_id() {
        return item_id;
    }

    public void setItem_id(Integer item_id) {
        this.item_id = item_id;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }
}
