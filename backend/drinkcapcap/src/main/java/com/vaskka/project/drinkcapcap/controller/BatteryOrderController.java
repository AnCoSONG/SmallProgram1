package com.vaskka.project.drinkcapcap.controller;

import com.vaskka.project.drinkcapcap.entity.BatteryOrder;
import com.vaskka.project.drinkcapcap.entity.base.BaseEntity;
import com.vaskka.project.drinkcapcap.service.BatteryOrderService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Api(description = "电池订单接口")
@Controller
public class BatteryOrderController {

    @Autowired
    private BatteryOrderService service;

    @ApiOperation(value = "新增电池订单" ,  notes="插入新电池订单")
    @RequestMapping(value = "/batteryorder/create", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> create(@RequestBody BatteryOrder order) {

        service.create(order);

        Map<String, Object> map = new HashMap<>();

        map.put("code", 0);

        return map;
    }


    @ApiOperation(value = "查找全部openid相关的电池订单" ,  notes="根据openid查找电池订单")
    @RequestMapping(value = "/batteryorder/get/{openid}", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> getByAllOpenid(@PathVariable String openid) {

        List<BatteryOrder> list = service.getOrderByOpenid(openid);

        Map<String, Object> map = new HashMap<>();

        map.put("code", 0);
        map.put("data", list);

        return map;
    }

    @ApiOperation(value = "查找制定完成度和openid的电池订单" ,  notes="根据电池完成度筛选指定openid的电池订单")
    @RequestMapping(value = "/batteryorder/get/{openid}/{done}", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> getByOpenidAndDone(@PathVariable String openid, @PathVariable Boolean done) {

        List<BatteryOrder> list = service.getOrderByOpenidAndDone(openid, done);

        Map<String, Object> map = new HashMap<>();

        map.put("code", 0);
        map.put("data", list);

        return map;
    }

    @ApiOperation(value = "查找今天全部订单" ,  notes="筛选今天全部订单")
    @RequestMapping(value = "/batteryorder/get/today", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> getTodayOrder() {

        List<BatteryOrder> list;

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

    @ApiOperation(value = "更改订单状态" ,  notes="订单完成时调用")
    @RequestMapping(value = "/batteryorder/change/{id}", method = RequestMethod.PUT)
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
