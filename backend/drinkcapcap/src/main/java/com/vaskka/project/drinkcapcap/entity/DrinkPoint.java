package com.vaskka.project.drinkcapcap.entity;


import com.vaskka.project.drinkcapcap.entity.base.BaseEntity;

import javax.persistence.*;

@Table(name = "drink_point")
@Entity
public class DrinkPoint extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String openid;

    @Column(name = "shop_id")
    private int shopId;

    private int point;

    public DrinkPoint(String openid, int shop_id, int point) {
        this.openid = openid;
        this.shopId = shop_id;
        this.point = point;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getOpenid() {
        return openid;
    }

    public void setOpenid(String openid) {
        this.openid = openid;
    }

    public int getShop_id() {
        return shopId;
    }

    public void setShop_id(int shop_id) {
        this.shopId = shop_id;
    }

    public DrinkPoint() {
    }

    public int getPoint() {
        return point;
    }

    public void setPoint(int point) {
        this.point = point;
    }
}
