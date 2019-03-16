package com.vaskka.project.drinkcapcap.service;

import com.vaskka.project.drinkcapcap.entity.BatteryPoint;
import com.vaskka.project.drinkcapcap.entity.base.BaseEntity;
import com.vaskka.project.drinkcapcap.jpa.BatteryPointRepository;
import com.vaskka.project.drinkcapcap.service.base.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BatteryPointService implements  BaseService {

    @Autowired
    private BatteryPointRepository repository;

    @Override
    public void create(BaseEntity entity) {
        repository.save((BatteryPoint) entity);
    }

    @Override
    public BaseEntity getById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public void change(BaseEntity entity) {
        this.create(entity);
    }


    /**
     * 利用openid 查询记录，新用户创建
     * @param openid openid
     * @return BatteryPoint
     */
    public BatteryPoint findByOpenid(String openid) {
        Optional<BatteryPoint> record = repository.findByOpenid(openid);

        if (!record.isPresent()) {
            BatteryPoint point = new BatteryPoint(openid, 0);
            repository.save(point);

            return point;
        }
        else {
            return record.get();
        }

    }

}
