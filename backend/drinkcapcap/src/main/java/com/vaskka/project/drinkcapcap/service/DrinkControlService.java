package com.vaskka.project.drinkcapcap.service;

import com.vaskka.project.drinkcapcap.entity.base.BaseEntity;
import com.vaskka.project.drinkcapcap.entity.DrinkControl;
import com.vaskka.project.drinkcapcap.jpa.DrinkControlRepository;
import com.vaskka.project.drinkcapcap.service.base.CanGetAllService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DrinkControlService extends CanGetAllService {

    @Autowired
    private DrinkControlRepository repository;


    @Override
    public void create(BaseEntity entity) {
        repository.save((DrinkControl) entity);
    }

    @Override
    public BaseEntity getById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public void change(BaseEntity entity) {
        this.create(entity);
    }


    @Override
    public List<BaseEntity> getAll() {

        return this.innerGetAll(repository);
    }

}
