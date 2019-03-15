package com.vaskka.project.drinkcapcap.entity;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Timestamp;

@Entity
public class DrinkTicket {


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
        this.create_time = create_time;
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
        return create_time;
    }

    public void setCreate_time(Timestamp create_time) {
        this.create_time = create_time;
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

    private Timestamp create_time;

    private Integer effect_time;

    private Boolean done;

    private Boolean valid;

}
