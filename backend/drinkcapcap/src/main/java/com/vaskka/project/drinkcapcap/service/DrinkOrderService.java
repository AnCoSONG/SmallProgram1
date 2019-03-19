package com.vaskka.project.drinkcapcap.service;


import com.vaskka.project.drinkcapcap.entity.DrinkOrder;
import com.vaskka.project.drinkcapcap.entity.base.BaseEntity;
import com.vaskka.project.drinkcapcap.jpa.DrinkOrderRepository;
import com.vaskka.project.drinkcapcap.service.base.BaseService;
import com.vaskka.project.drinkcapcap.utils.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * @program: drinkcapcap
 * @description: DrinkOrderService
 * @author: Vaskka
 * @create: 2019/3/19 1:41 PM
 **/

@Service
public class DrinkOrderService implements BaseService {

    @Autowired
    DrinkOrderRepository repository;

    @Override
    public void create(BaseEntity entity) {
        repository.save((DrinkOrder) entity);
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
     * 根据openid获取订单
     * @param openid openid
     * @return BaseEntity
     */
    public List<DrinkOrder> getOrderByOpenid(String openid) {

        return repository.findByOpenid(openid);
    }


    /**
     * 根据openid筛选未完成订单
     * @param openid openid
     * @return list
     */
    public List<DrinkOrder> getOrderByOpenidAndDone(String openid, Boolean done) {
        return repository.findByOpenidAndDone(openid, done);
    }

    /**
     * 筛选今日全部订单
     * @return list
     */
    public List<DrinkOrder> getTodayOrder() throws ParseException {

        Timestamp sp1 = Util.getTodayDawn();
        Timestamp sp2 = Util.getTommorrowDawn();


        return repository.findByCreateTimeBetween(sp1, sp2);

    }


    /**
     * 改变一个订单的状态
     * @param id 订单id
     */
    public void changeOrderToComplete(Integer id) throws NullPointerException, ParseException {

        DrinkOrder order = repository.findById(id).orElseThrow(NullPointerException::new);

        order.setDone(true);

        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        order.setDone_time(new Timestamp(sf.parse(sf.format(new Date())).getTime()));

        repository.save(order);
    }
}
