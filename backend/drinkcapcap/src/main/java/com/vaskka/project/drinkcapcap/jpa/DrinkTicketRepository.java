package com.vaskka.project.drinkcapcap.jpa;

import com.vaskka.project.drinkcapcap.entity.DrinkTicket;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;


@Repository
public interface DrinkTicketRepository extends CrudRepository<DrinkTicket, Integer> {

    /**
     * 根据openid筛选
     * @param openid openid
     * @return 实体引用
     */
    List<DrinkTicket> findByOpenid(String openid);


    /**
     * 根据openid 筛选出指定完成性的订单
     * @param openid openid
     * @param done 是否完成
     * @return BaseEntity
     */
    List<DrinkTicket> findByOpenidAndDone(String openid, Boolean done);


}
