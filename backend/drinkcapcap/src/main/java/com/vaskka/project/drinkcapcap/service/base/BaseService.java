package com.vaskka.project.drinkcapcap.service.base;

import com.vaskka.project.drinkcapcap.entity.base.BaseEntity;
import com.vaskka.project.drinkcapcap.exceptions.DrinkCapcapBaseException;

public interface BaseService {

    /**
     * 创建record
     * @param entity 实体对象
     */
    BaseEntity create(BaseEntity entity) throws DrinkCapcapBaseException;


    /**
     * 根据id查找实体
     * @param id 实体引用的id
     * @return
     */
    BaseEntity getById(Integer id);


    /**
     * 改变某个实体的属性
     * @param entity 新的实体should be
     */
    void change(BaseEntity entity);


}
