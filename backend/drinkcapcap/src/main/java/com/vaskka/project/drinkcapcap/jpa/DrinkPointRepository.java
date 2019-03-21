package com.vaskka.project.drinkcapcap.jpa;

import com.vaskka.project.drinkcapcap.entity.DrinkPoint;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface DrinkPointRepository extends CrudRepository<DrinkPoint, Integer> {


    /**
     * 根据openid和shop_id筛选某个用户全部商家的积分情况
     * @param openid openid
     * @param shop_id shop_id
     * @return Optional&lt;DrinkPoint&gt;
     */
    Optional<DrinkPoint> findByOpenidAndShopId(String openid, Integer shop_id);

    /**
     * 查找一个用户全部的商家积分
     * @param openid openid
     * @return List&lt;DrinkPoint&gt;
     */
    List<DrinkPoint> findByOpenid(String openid);
}
