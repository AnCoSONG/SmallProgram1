package com.vaskka.project.drinkcapcap.entity;

import com.vaskka.project.drinkcapcap.entity.base.BaseEntity;

import javax.persistence.*;

@Table(name = "battery_point")
@Entity
public class BatteryPoint extends BaseEntity {

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
