package com.vaskka.project.drinkcapcap.jpa;

import com.vaskka.project.drinkcapcap.entity.BatteryPoint;
import com.vaskka.project.drinkcapcap.entity.base.BaseEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BatteryPointRepository extends CrudRepository<BatteryPoint, Integer> {


    /**
     * ref openid 查询积分记录
     * @param openid openid
     * @return record
     */
    Optional<BatteryPoint> findByOpenid(String openid);



}
