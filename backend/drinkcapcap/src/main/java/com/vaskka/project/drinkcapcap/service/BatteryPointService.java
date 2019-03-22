package com.vaskka.project.drinkcapcap.service;

import com.vaskka.project.drinkcapcap.entity.BatteryPoint;
import com.vaskka.project.drinkcapcap.entity.base.BaseEntity;
import com.vaskka.project.drinkcapcap.jpa.BatteryPointRepository;
import com.vaskka.project.drinkcapcap.service.base.BaseService;
import com.vaskka.project.drinkcapcap.service.base.CanGetAllService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BatteryPointService extends CanGetAllService implements  BaseService {

    @Autowired
    private BatteryPointRepository repository;

    @Override
    public List<BaseEntity> getAll() {
        return this.innerGetAll(repository);
    }

    @Override
    public BaseEntity create(BaseEntity entity) {
        return repository.save((BatteryPoint) entity);
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
