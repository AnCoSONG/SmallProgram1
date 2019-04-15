package com.vaskka.project.drinkcapcap.service;

import com.vaskka.project.drinkcapcap.entity.BatteryOrder;
import com.vaskka.project.drinkcapcap.entity.base.BaseEntity;
import com.vaskka.project.drinkcapcap.exceptions.OrderNotExistException;
import com.vaskka.project.drinkcapcap.jpa.BatteryOrderRepository;
import com.vaskka.project.drinkcapcap.service.base.CanGetAllPageableService;
import com.vaskka.project.drinkcapcap.utils.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;


import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class BatteryOrderService extends CanGetAllPageableService {
    @Autowired
    private BatteryOrderRepository repository;



    @Override
    public List<BaseEntity> innerGetAllPageable(int page, int size, boolean done) {
        return repository.findByDone(done, PageRequest.of(page, size));
    }

    @Override
    public BatteryOrder create(BaseEntity entity) {

        ((BatteryOrder) entity).setDone(false);
        return repository.save((BatteryOrder) entity);


    }

    @Override
    public BaseEntity getById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public void change(BaseEntity entity) {
        repository.save((BatteryOrder) entity);
    }




    /**
     * 根据openid获取订单
     * @param openid openid
     * @return BaseEntity
     */
    public List<BatteryOrder> getOrderByOpenid(String openid) {

        return repository.findByOpenid(openid);
    }


    /**
     * 根据openid筛选未完成订单
     * @param openid openid
     * @return list
     */
    public List<BatteryOrder> getOrderByOpenidAndDone(String openid, Boolean done) {
        return repository.findByOpenidAndDone(openid, done);
    }

    /**
     * 筛选今日全部订单
     * @return list
     */
    public List<BatteryOrder> getTodayOrder() throws ParseException {

        Timestamp sp1 = Util.getTodayDawn();
        Timestamp sp2 = Util.getTommorrowDawn();

        return repository.findByCreateTimeBetween(sp1, sp2);

    }


    /**
     * 改变一个订单的状态
     * @param id 订单id
     */
    public void changeOrderToComplete(Integer id) throws NullPointerException, ParseException {

        BatteryOrder order = repository.findById(id).orElseThrow(NullPointerException::new);

        order.setDone(true);
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        order.setDone_time(new Timestamp(sf.parse(sf.format(new Date())).getTime()));

        repository.save(order);
    }

    @Override
    public List<BaseEntity> getAllPageable(JpaRepository repository, int page, int size) {
        return null;
    }


    public void del(int id) {
        this.repository.delete(repository.findById(id).orElseThrow(new OrderNotExistException("订单号不存在", id)));
    }

    public List<BatteryOrder> alpthGetAllUncomleted() {
        return repository.findByDone(false);
    }
    public List<BatteryOrder> alpthGetAllComleted() {
        return repository.findByDone(true);
    }
}
