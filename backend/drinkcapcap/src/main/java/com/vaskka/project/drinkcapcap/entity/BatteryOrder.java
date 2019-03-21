package com.vaskka.project.drinkcapcap.entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.vaskka.project.drinkcapcap.entity.base.BaseEntity;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Timestamp;


@Table(name = "battery_order")
@Entity
public class BatteryOrder extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @Column(name = "create_time")
    private Timestamp createTime;

    private String free_time;

    private String tel;

    private String user_location;

    private  String real_location;

    public BatteryOrder(Timestamp createTime, String free_time, String tel, String user_location, String real_location, String note, Integer battery_num, String openid, Boolean done, Timestamp done_time) {
        this.createTime = createTime;
        this.free_time = free_time;
        this.tel = tel;
        this.user_location = user_location;
        this.real_location = real_location;
        this.note = note;
        this.battery_num = battery_num;
        this.openid = openid;
        this.done = done;
        this.done_time = done_time;
    }


    @Lob
    @Column(columnDefinition = "text")
    private String note;

    public String getFreeTime() {
        return free_time;
    }

    public void setFreeTime(String freeTime) {
        this.free_time = freeTime;
    }

    public String getUserLocation() {
        return user_location;
    }

    public void setUserLocation(String userLocation) {
        this.user_location = userLocation;
    }

    public String getRealLocation() {
        return real_location;
    }

    public void setRealLocation(String realLocation) {
        this.real_location = realLocation;
    }

    public void setDone(Boolean done) {
        this.done = done;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }


    public String getFree_time() {
        return free_time;
    }

    public void setFree_time(String free_time) {
        this.free_time = free_time;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getUser_location() {
        return user_location;
    }

    public void setUser_location(String user_location) {
        this.user_location = user_location;
    }

    public String getReal_location() {
        return real_location;
    }

    public void setReal_location(String real_location) {
        this.real_location = real_location;
    }

    private Integer battery_num;

    private String openid;

    private Boolean done;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Timestamp done_time;

    public BatteryOrder() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Timestamp getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Timestamp create_time) {
        this.createTime = create_time;
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

    public void setDone(boolean done) {
        this.done = done;
    }

    public Timestamp getDone_time() {
        return done_time;
    }

    public void setDone_time(Timestamp done_time) {
        this.done_time = done_time;
    }
}
