package com.vaskka.project.drinkcapcap.entity;

import com.vaskka.project.drinkcapcap.entity.base.BaseEntity;

import javax.persistence.*;
import java.sql.Timestamp;


@Table(name = "data_log")
@Entity
public class DataLog extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private Timestamp do_time;

    private String do_name;

    private String do_type;

    public Integer getId() {
        return id;
    }

    public DataLog() {
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public DataLog(Timestamp do_time, String do_name, String do_type, String interface_id, Boolean do_result) {
        this.do_time = do_time;
        this.do_name = do_name;
        this.do_type = do_type;
        this.interface_id = interface_id;
        this.do_result = do_result;
    }

    public Timestamp getDo_time() {
        return do_time;
    }

    public void setDo_time(Timestamp do_time) {
        this.do_time = do_time;
    }

    public String getDo_name() {
        return do_name;
    }

    public void setDo_name(String do_name) {
        this.do_name = do_name;
    }

    public String getDo_type() {
        return do_type;
    }

    public void setDo_type(String do_type) {
        this.do_type = do_type;
    }

    public String getInterface_id() {
        return interface_id;
    }

    public void setInterface_id(String interface_id) {
        this.interface_id = interface_id;
    }

    public Boolean getDo_result() {
        return do_result;
    }

    public void setDo_result(Boolean do_result) {
        this.do_result = do_result;
    }

    private String interface_id;

    private Boolean do_result;

}
