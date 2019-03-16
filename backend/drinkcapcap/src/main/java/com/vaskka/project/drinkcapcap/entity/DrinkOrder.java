package com.vaskka.project.drinkcapcap.entity;


import com.vaskka.project.drinkcapcap.entity.base.BaseEntity;

import javax.persistence.*;
import java.sql.Timestamp;

@Table(name = "drink_order")
@Entity
public class DrinkOrder extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private Integer cup_id;

    public Integer getId() {
        return id;
    }

    public DrinkOrder() {
    }

    public DrinkOrder(Integer cup_id, String openid, Timestamp create_time, String img_url, Integer shop_id, Boolean done, Timestamp done_time) {
        this.cup_id = cup_id;
        this.openid = openid;
        this.create_time = create_time;
        this.img_url = img_url;
        this.shop_id = shop_id;
        this.done = done;
        this.done_time = done_time;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getCup_id() {
        return cup_id;
    }

    public void setCup_id(Integer cup_id) {
        this.cup_id = cup_id;
    }

    public String getOpenid() {
        return openid;
    }

    public void setOpenid(String openid) {
        this.openid = openid;
    }

    public Timestamp getCreate_time() {
        return create_time;
    }

    public void setCreate_time(Timestamp create_time) {
        this.create_time = create_time;
    }

    public String getImg_url() {
        return img_url;
    }

    public void setImg_url(String img_url) {
        this.img_url = img_url;
    }

    public Integer getShop_id() {
        return shop_id;
    }

    public void setShop_id(Integer shop_id) {
        this.shop_id = shop_id;
    }

    public Boolean getDone() {
        return done;
    }

    public void setDone(Boolean done) {
        this.done = done;
    }

    public Timestamp getDone_time() {
        return done_time;
    }

    public void setDone_time(Timestamp done_time) {
        this.done_time = done_time;
    }

    private String openid;

    private Timestamp create_time;

    private String img_url;

    private Integer shop_id;

    private Boolean done;

    private Timestamp done_time;
}
