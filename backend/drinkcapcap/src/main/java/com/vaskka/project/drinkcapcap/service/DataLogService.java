package com.vaskka.project.drinkcapcap.service;

import com.vaskka.project.drinkcapcap.entity.DataLog;
import com.vaskka.project.drinkcapcap.entity.base.BaseEntity;
import com.vaskka.project.drinkcapcap.exceptions.DrinkCapcapBaseException;
import com.vaskka.project.drinkcapcap.jpa.DataLogRepository;
import com.vaskka.project.drinkcapcap.service.base.BaseService;
import com.vaskka.project.drinkcapcap.service.base.CanGetAllService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @program: drinkcapcap
 * @description: DataLogService
 * @author: Vaskka
 * @create: 2019/3/19 3:25 PM
 **/

@Service
public class DataLogService extends CanGetAllService implements BaseService {


    @Autowired
    private DataLogRepository repository;

    @Override
    public List<BaseEntity> getAll() {
        return this.innerGetAll(repository);
    }

    @Override
    public BaseEntity create(BaseEntity entity) {
        return repository.save((DataLog) entity);
    }

    @Override
    public BaseEntity getById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public void change(BaseEntity entity) {
        this.create(entity);
    }
}
