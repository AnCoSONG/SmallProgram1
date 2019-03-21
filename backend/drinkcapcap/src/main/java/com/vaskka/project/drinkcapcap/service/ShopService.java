package com.vaskka.project.drinkcapcap.service;

import com.vaskka.project.drinkcapcap.entity.base.BaseEntity;
import com.vaskka.project.drinkcapcap.entity.Shop;
import com.vaskka.project.drinkcapcap.jpa.ShopRepository;
import com.vaskka.project.drinkcapcap.service.base.CanGetAllService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShopService extends CanGetAllService {

    @Autowired
    private ShopRepository repository;


    @Override
    public BaseEntity create(BaseEntity entity) {

        return repository.save((Shop) entity);

    }

    @Override
    public Shop getById(Integer id) {
        Optional<Shop> result = repository.findById(id);

        return result.orElse(null);
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
