package com.vaskka.project.drinkcapcap.entity;

import org.springframework.boot.autoconfigure.web.ResourceProperties;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class BatteryPoint {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String openid;

    private Integer battery_val;

    public BatteryPoint(String openid, Integer battery_val) {
        this.openid = openid;
        this.battery_val = battery_val;
    }

    public BatteryPoint() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getOpenid() {
        return openid;
    }

    public void setOpenid(String openid) {
        this.openid = openid;
    }

    public Integer getBattery_val() {
        return battery_val;
    }

    public void setBattery_val(Integer battery_val) {
        this.battery_val = battery_val;
    }
}
