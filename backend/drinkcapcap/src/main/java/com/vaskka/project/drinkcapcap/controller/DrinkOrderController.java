package com.vaskka.project.drinkcapcap.controller;


import com.vaskka.project.drinkcapcap.entity.BatteryOrder;
import com.vaskka.project.drinkcapcap.entity.DrinkOrder;
import com.vaskka.project.drinkcapcap.service.DrinkOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

/**
 * @program: drinkcapcap
 * @description: DrinkOrderController
 * @author: Vaskka
 * @create: 2019/3/19 1:55 PM
 **/


@Controller
public class DrinkOrderController {

    @Autowired
    DrinkOrderService service;

    @ResponseBody
    @RequestMapping(value = "/drinkorder/create", method = RequestMethod.POST)
    public Map<String, Object> create(@RequestBody DrinkOrder drinkOrder) {
        service.create(drinkOrder);

        Map<String, Object> map = new HashMap<>();
        map.put("code", 0);

        return map;
    }


    @ResponseBody
    @RequestMapping(value = "/drinkorder/get/id/{id}", method = RequestMethod.GET)
    public Map<String, Object> getById(@PathVariable Integer id) {
        DrinkOrder order = (DrinkOrder) service.getById(id);

        Map<String, Object> map = new HashMap<>();
        map.put("code", 0);
        map.put("data", order);

        return map;
    }


    @ResponseBody
    @RequestMapping(value = "/drinkorder/get/{openid}", method = RequestMethod.GET)
    public Map<String, Object> getByOpenid(@PathVariable String openid) {
        List<DrinkOrder> list = service.getOrderByOpenid(openid);

        Map<String, Object> map = new HashMap<>();
        map.put("code", 0);
        map.put("data", list);

        return map;
    }

    @ResponseBody
    @RequestMapping(value = "/drinkorder/get/done/{openid}/{done}", method = RequestMethod.GET)
    public Map<String, Object> getByOpenidAndDone(@PathVariable String openid, @PathVariable Boolean done) {
        List<DrinkOrder> list = service.getOrderByOpenidAndDone(openid, done);

        Map<String, Object> map = new HashMap<>();
        map.put("code", 0);
        map.put("data", list);

        return map;
    }

    @ResponseBody
    @RequestMapping(value = "/drinkorder/get/today", method = RequestMethod.GET)
    public Map<String, Object> getTodayOrder() {
        List<DrinkOrder> list;

        Map<String, Object> map = new HashMap<>();
        try {
            list = service.getTodayOrder();
            map.put("code", 0);
            map.put("data", list);
        } catch (ParseException e) {
            map.put("code", 1);
            map.put("data", new ArrayList<>());
            map.put("info", e.getStackTrace());
        }

        return map;
    }

    @RequestMapping(value = "/drinkorder/change/{id}", method = RequestMethod.PUT)
    @ResponseBody
    public Map<String, Object> changeToComplete(@PathVariable Integer id) {

        Map<String, Object> map = new HashMap<>();

        try {
            service.changeOrderToComplete(id);

            map.put("code", 0);
        }catch (NullPointerException | ParseException e) {
            map.put("code", 1);
            map.put("info", e.getStackTrace());
        }

        return map;
    }
}
