package com.vaskka.project.drinkcapcap.service;

import com.vaskka.project.drinkcapcap.entity.base.BaseEntity;
import com.vaskka.project.drinkcapcap.entity.DrinkControl;
import com.vaskka.project.drinkcapcap.jpa.DrinkControlRepository;
import com.vaskka.project.drinkcapcap.service.base.CanGetAllService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DrinkControlService extends CanGetAllService {

    @Autowired
    private DrinkControlRepository repository;


    @Override
    public BaseEntity create(BaseEntity entity) {

        DrinkControl control = (DrinkControl) entity;

        Optional<DrinkControl> res = repository.findByShopIdAndItemId(control.getShop_id(), control.getItem_id());

        // 保证同一item_id和shop_id返回唯一结果
        if (res.isPresent()) {
            DrinkControl controlInner = res.get();
            controlInner.setNumber(control.getNumber());
            return repository.save(controlInner);
        }
        else {
            return repository.save(control);
        }

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
