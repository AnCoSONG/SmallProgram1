package com.vaskka.project.drinkcapcap.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.vaskka.project.drinkcapcap.entity.base.BaseEntity;

import javax.persistence.*;
import java.sql.Timestamp;


@Table(name = "doll_paper")
@Entity
public class DollPaper extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private Boolean done;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public DollPaper() {
    }

    public Boolean getDone() {
        return done;
    }

    public void setDone(Boolean done) {
        this.done = done;
    }

    public String getOpenid() {
        return openid;
    }

    public DollPaper(Boolean done, String openid, Integer doll_paper_val, Timestamp create_time, Integer effect_time, Boolean valid) {
        this.done = done;
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

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Timestamp create_time;

    private Integer effect_time;

    private Boolean valid;

}
