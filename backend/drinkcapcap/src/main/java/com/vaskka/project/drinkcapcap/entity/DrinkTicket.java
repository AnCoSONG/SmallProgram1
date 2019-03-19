package com.vaskka.project.drinkcapcap.entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.vaskka.project.drinkcapcap.entity.base.BaseEntity;

import javax.persistence.*;
import java.sql.Timestamp;


@Table(name = "drink_ticket")
@Entity
public class DrinkTicket extends BaseEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public DrinkTicket() {
    }

    public DrinkTicket(Integer shop_id, Integer item_id, String openid, Timestamp create_time, Integer effect_time, Boolean done, Boolean valid) {
        this.shop_id = shop_id;
        this.item_id = item_id;
        this.openid = openid;
        this.createTime = create_time;
        this.effect_time = effect_time;
        this.done = done;
        this.valid = valid;
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

    public String getOpenid() {
        return openid;
    }

    public void setOpenid(String openid) {
        this.openid = openid;
    }

    public Timestamp getCreate_time() {
        return createTime;
    }

    public void setCreate_time(Timestamp create_time) {
        this.createTime = create_time;
    }

    public Integer getEffect_time() {
        return effect_time;
    }

    public void setEffect_time(Integer effect_time) {
        this.effect_time = effect_time;
    }

    public Boolean getDone() {
        return done;
    }

    public void setDone(Boolean done) {
        this.done = done;
    }

    public Boolean getValid() {
        return valid;
    }

    public void setValid(Boolean valid) {
        this.valid = valid;
    }

    private Integer shop_id;

    private Integer item_id;

    private String openid;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @Column(name = "create_time")
    private Timestamp createTime;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Integer effect_time;

    private Boolean done;

    private Boolean valid;

}
