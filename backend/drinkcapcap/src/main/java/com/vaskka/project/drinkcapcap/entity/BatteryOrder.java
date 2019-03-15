package com.vaskka.project.drinkcapcap.entity;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Timestamp;

@Entity
public class BatteryOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private Timestamp create_time;

    private Integer battery_num;

    private String openid;

    private Boolean done;

    private Timestamp done_time;

    public BatteryOrder() {
    }

    public BatteryOrder(Timestamp create_time, Integer battery_num, String openid, Boolean done, Timestamp done_time) {
        this.create_time = create_time;
        this.battery_num = battery_num;
        this.openid = openid;
        this.done = done;
        this.done_time = done_time;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Timestamp getCreate_time() {
        return create_time;
    }

    public void setCreate_time(Timestamp create_time) {
        this.create_time = create_time;
    }

    public Integer getBattery_num() {
        return battery_num;
    }

    public void setBattery_num(Integer battery_num) {
        this.battery_num = battery_num;
    }

    public String getOpenid() {
        return openid;
    }

    public void setOpenid(String openid) {
        this.openid = openid;
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
}
