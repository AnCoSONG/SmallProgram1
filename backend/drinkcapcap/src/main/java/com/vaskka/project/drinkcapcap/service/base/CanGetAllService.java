package com.vaskka.project.drinkcapcap.service.base;

import com.vaskka.project.drinkcapcap.entity.base.BaseEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public abstract class CanGetAllService implements BaseService {

    public abstract List<BaseEntity> getAll();

    @Override
    public void create(BaseEntity entity) {

    }

    @Override
    public BaseEntity getById(Integer id) {
        return null;
    }

    @Override
    public void change(BaseEntity entity) {

    }

    /**
     * 获取全部
     * @return List&lt;BaseEntity&gt;
     */
     protected List<BaseEntity> innerGetAll(CrudRepository repository) {
        Iterator iterator = repository.findAll().iterator();

        List<BaseEntity> list = new ArrayList<>();

        while (iterator.hasNext()) {
            list.add((BaseEntity) iterator.next());
        }

        return list;
    }

}
