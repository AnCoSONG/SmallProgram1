package com.vaskka.project.drinkcapcap.jpa;

import com.vaskka.project.drinkcapcap.entity.BatteryOrder;
import com.vaskka.project.drinkcapcap.entity.base.BaseEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public interface BatteryOrderRepository extends JpaRepository<BatteryOrder, Integer> {

    /**
     * 根据openid筛选
     * @param openid openid
     * @return 实体引用
     */
    List<BatteryOrder> findByOpenid(String openid);


    /**
     * 根据openid 筛选出指定完成性的订单
     * @param openid openid
     * @param done 是否完成
     * @return BaseEntity
     */
    List<BatteryOrder> findByOpenidAndDone(String openid, Boolean done);

    /**
     * 筛选指定创建日期的订单
     * @param start 开始时间
     * @param end 结束时间
     * @return list
     */
    List<BatteryOrder> findByCreateTimeBetween(Timestamp start, Timestamp end);


    List<BaseEntity> findByDone(Boolean done, Pageable pageable);

    List<BatteryOrder> findByDone(Boolean done);
}
