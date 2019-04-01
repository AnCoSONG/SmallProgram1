package com.vaskka.project.drinkcapcap.service.base;

import com.vaskka.project.drinkcapcap.entity.base.BaseEntity;
import com.vaskka.project.drinkcapcap.exceptions.DrinkCapcapBaseException;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @program: drinkcapcap
 * @description: CanGetAllPageableService
 * @author: Vaskka
 * @create: 2019/4/1 2:44 PM
 **/

public abstract class CanGetAllPageableService implements GetAllPageable {
    public abstract List<BaseEntity> innerGetAllPageable(int page, int size, boolean done);


    @Override
    public BaseEntity create(BaseEntity entity) throws DrinkCapcapBaseException {
        return null;
    }

    @Override
    public BaseEntity getById(Integer id) {
        return null;
    }

    @Override
    public void change(BaseEntity entity) {

    }


}
