package com.vaskka.project.drinkcapcap.controller;


import com.vaskka.project.drinkcapcap.controller.base.CanGetAllController;
import com.vaskka.project.drinkcapcap.entity.DrinkOrder;
import com.vaskka.project.drinkcapcap.service.DrinkOrderService;
import com.vaskka.project.drinkcapcap.service.DrinkPointService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
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


@Api(description = "奶茶订单接口")
@Controller
public class DrinkOrderController extends CanGetAllController {

    @Autowired
    private DrinkPointService pointService;

    @Autowired
    private DrinkOrderService service;

    @ApiOperation(value = "创建一条奶茶订单" ,  notes="插入一条新奶茶订单记录")
    @ResponseBody
    @RequestMapping(value = "/drinkorder/create", method = RequestMethod.POST)
    public Map<String, Object> create(@RequestBody DrinkOrder drinkOrder) {
        service.create(drinkOrder);

        Map<String, Object> map = new HashMap<>();
        map.put("code", 0);

        return map;
    }


    @ApiOperation(value = "获取指定id的订单记录" ,  notes="根据id筛选订单信息")
    @ResponseBody
    @RequestMapping(value = "/drinkorder/get/id/{id}", method = RequestMethod.GET)
    public Map<String, Object> getById(@PathVariable Integer id) {
        DrinkOrder order = (DrinkOrder) service.getById(id);

        Map<String, Object> map = new HashMap<>();
        map.put("code", 0);
        map.put("data", order);

        return map;
    }


    @ApiOperation(value = "获取指定的openid的订单记录集合" ,  notes="根据openid筛选订单信息")
    @ResponseBody
    @RequestMapping(value = "/drinkorder/get/{openid}", method = RequestMethod.GET)
    public Map<String, Object> getByOpenid(@PathVariable String openid) {
        List<DrinkOrder> list = service.getOrderByOpenid(openid);

        Map<String, Object> map = new HashMap<>();
        map.put("code", 0);
        map.put("data", list);

        return map;
    }

    @ApiOperation(value = "获取指定openid和指定完成度的记录集合" ,  notes="根据openid和完成度筛选订单信息集合")
    @ResponseBody
    @RequestMapping(value = "/drinkorder/get/done/{openid}/{done}", method = RequestMethod.GET)
    public Map<String, Object> getByOpenidAndDone(@PathVariable String openid, @PathVariable Boolean done) {
        List<DrinkOrder> list = service.getOrderByOpenidAndDone(openid, done);

        Map<String, Object> map = new HashMap<>();
        map.put("code", 0);
        map.put("data", list);

        return map;
    }

    @ApiOperation(value = "获取今天的奶茶订单" ,  notes="获取今日全部订单信息")
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

    @ApiOperation(value = "更改某id订单的完成情况" ,  notes="更改订单为完成")
    @RequestMapping(value = "/drinkorder/change/{id}", method = RequestMethod.PUT)
    @ResponseBody
    public Map<String, Object> changeToComplete(@PathVariable Integer id) {

        Map<String, Object> map = new HashMap<>();

        try {
            service.changeOrderToComplete(id);

            DrinkOrder order = (DrinkOrder) service.getById(id);
            pointService.addShopPointWithOpenid(order.getOpenid(), order.getShop_id());
            map.put("code", 0);
        }catch (NullPointerException | ParseException e) {
            map.put("code", 1);
            map.put("info", e.getStackTrace());
        }

        return map;
    }

    @Override
    @ApiOperation(value = "获取全部" ,  notes="获取全部order")
    @RequestMapping(value = "/drinkorder/get/all/{done}/{page}/{size}", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> getAll(@PathVariable Boolean done, @PathVariable  Integer page, @PathVariable Integer size) {
        return this.innerGetAllPageable(service, page, size, done);
    }


    @ApiOperation(value = "删除某个order" ,  notes="根据id删除某个order")
    @RequestMapping(value = "/drinkorder/delete/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public Map<String, Object> del(@PathVariable Integer id) {
        service.del(id);
        return this.fromObjectToMapping(null);
    }

    @ApiOperation(value = "查找全部未完成order" ,  notes="查找全部")
    @RequestMapping(value = "/drinkorder/get/all/uncompleted", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> alphaGetAllUncompleted() {
        return this.fromObjectToMapping(service.alpthGetAllUncompleted());
    }

    @ApiOperation(value = "查找全部已完成order" ,  notes="查找全部")
    @RequestMapping(value = "/drinkorder/get/all/completed", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> alphaGetAllCompleted() {
        return this.fromObjectToMapping(service.alpthGetAllCompleted());
    }

}
