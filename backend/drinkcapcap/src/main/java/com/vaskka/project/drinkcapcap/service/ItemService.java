package com.vaskka.project.drinkcapcap.service;

import com.vaskka.project.drinkcapcap.entity.base.BaseEntity;
import com.vaskka.project.drinkcapcap.entity.Item;
import com.vaskka.project.drinkcapcap.jpa.ItemRepository;
import com.vaskka.project.drinkcapcap.service.base.CanGetAllService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService extends CanGetAllService {

    @Autowired
    private ItemRepository repository;

    @Override
    public BaseEntity create(BaseEntity entity) {

        return repository.save((Item) entity);

    }

    @Override
    public BaseEntity getById(Integer id) {
        Optional<Item> result = repository.findById(id);

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
