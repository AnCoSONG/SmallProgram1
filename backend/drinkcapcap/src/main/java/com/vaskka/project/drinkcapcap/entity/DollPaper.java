package com.vaskka.project.drinkcapcap.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Timestamp;

@Entity
public class DollPaper {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public DollPaper() {
    }

    public String getOpenid() {
        return openid;
    }

    public DollPaper(String openid, Integer doll_paper_val, Timestamp create_time, Integer effect_time, Boolean valid) {
        this.openid = openid;
        this.doll_paper_val = doll_paper_val;
        this.create_time = create_time;
        this.effect_time = effect_time;
        this.valid = valid;
    }

    public void setOpenid(String openid) {
        this.openid = openid;
    }

    public Integer getDoll_paper_val() {
        return doll_paper_val;
    }

    public void setDoll_paper_val(Integer doll_paper_val) {
        this.doll_paper_val = doll_paper_val;
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

    public Boolean getValid() {
        return valid;
    }

    public void setValid(Boolean valid) {
        this.valid = valid;
    }

    private String openid;

    private Integer doll_paper_val;

    private Timestamp create_time;

    private Integer effect_time;

    private Boolean valid;

}
