package com.vaskka.project.drinkcapcap.service;


import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import com.vaskka.project.drinkcapcap.entity.DrinkControl;
import com.vaskka.project.drinkcapcap.entity.DrinkOrder;
import com.vaskka.project.drinkcapcap.entity.DrinkTicket;
import com.vaskka.project.drinkcapcap.entity.base.BaseEntity;
import com.vaskka.project.drinkcapcap.exceptions.ItemShopCombineNotExistException;
import com.vaskka.project.drinkcapcap.exceptions.TicketNotExistExcrption;
import com.vaskka.project.drinkcapcap.exceptions.TicketNumberNotEnoughException;
import com.vaskka.project.drinkcapcap.jpa.DrinkControlRepository;
import com.vaskka.project.drinkcapcap.jpa.DrinkTicketRepository;
import com.vaskka.project.drinkcapcap.service.base.BaseService;
import com.vaskka.project.drinkcapcap.service.base.CanGetAllService;
import com.vaskka.project.drinkcapcap.utils.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * @program: drinkcapcap
 * @description: DrinkTicketService
 * @author: Vaskka
 * @create: 2019/3/19 2:23 PM
 **/


@Service
public class DrinkTicketService extends CanGetAllService implements BaseService {

    @Autowired
    DrinkTicketRepository repository;


    @Autowired
    DrinkControlRepository controlRepository;

    @Override
    public List<BaseEntity> getAll() {
        return this.innerGetAll(repository);
    }

    @Override
    public BaseEntity create(BaseEntity entity) throws TicketNumberNotEnoughException, ItemShopCombineNotExistException {

        DrinkTicket ticket = (DrinkTicket) entity;
        Optional<DrinkControl> control = controlRepository.findByShopIdAndItemId(ticket.getShop_id(), ticket.getItem_id());

        // 检查奶茶券数量情况
        if (control.isPresent()) {
            DrinkControl controlInner = control.get();
            if (controlInner.getNumber() <= 0) {
                throw new TicketNumberNotEnoughException("奶茶券剩余不足", ticket.getShop_id(), ticket.getItem_id());
            }
            else {
                Integer num = controlInner.getNumber();
                num --;
                controlInner.setNumber(num);

                controlRepository.save(controlInner);
            }
        }
        else {
            throw new ItemShopCombineNotExistException("商品与商家不匹配", ticket.getShop_id(), ticket.getItem_id());
        }

        ticket.setDone(false);
        return repository.save(ticket);
    }

    @Override
    public BaseEntity getById(Integer id) {
        DrinkTicket ticket = repository.findById(id).orElse(null);

        ticket.setValid(Util.checkIfValid(ticket.getCreate_time(), ticket.getEffect_time()));

        return ticket;
    }

    @Override
    @Deprecated
    public void change(BaseEntity entity) {

    }

    /**
     * 获取某个openid全部Ticket
     * @param openid oepnid
     * @return List&lt;DrinkTicket&rt;
     */
    public List<DrinkTicket> getByOpenid(String openid) {

        List<DrinkTicket> list = repository.findByOpenid(openid);

        for (DrinkTicket item : list) {
            item.setValid(Util.checkIfValid(item.getCreate_time(), item.getEffect_time()));
        }

        return list;
    }


    /**
     * 获取某个openid并制定完成状态的全部ticket
     * @param openid openid
     * @param done done
     * @return List&lt;DrinkTicket&rt;
     */
    public List<DrinkTicket> getByOpenidAndDone(String openid, Boolean done) {

        List<DrinkTicket> list = repository.findByOpenidAndDone(openid, done);

        for (DrinkTicket item : list) {
            item.setValid(Util.checkIfValid(item.getCreate_time(), item.getEffect_time()));
        }

        return list;
    }

    /**
     * 改变某个奶茶券的完成状态
     * @param id id
     * @param done 是否完成
     */
    public void changeDone(Integer id, Boolean done) throws TicketNotExistExcrption {

        DrinkTicket ticket = repository.findById(id).orElseThrow(() -> new TicketNotExistExcrption("奶茶券id不存在", id));
        ticket.setDone(done);

        repository.save(ticket);
    }
}
