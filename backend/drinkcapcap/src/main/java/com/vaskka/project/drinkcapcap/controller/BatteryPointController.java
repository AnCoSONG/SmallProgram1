package com.vaskka.project.drinkcapcap.controller;


import com.vaskka.project.drinkcapcap.controller.base.BaseController;
import com.vaskka.project.drinkcapcap.controller.base.CanGetAllController;
import com.vaskka.project.drinkcapcap.entity.BatteryPoint;
import com.vaskka.project.drinkcapcap.service.BatteryPointService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;


@Api(description = "电池积分接口")
@Controller
public class BatteryPointController extends BaseController {

    @Autowired
    private BatteryPointService service;

    @ApiOperation(value = "获取指定openid的电池积分信息" ,  notes="不存在新建一条")
    @RequestMapping(value = "/batterypoint/get/{openid}", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> getByOpenid(@PathVariable String openid) {

        Map<String, Object> map = new HashMap<>();

        map.put("code", 0);

        map.put("data", service.findByOpenid(openid));


        return map;
    }

    @ApiOperation(value = "更改积分" ,  notes="更改积分数值")
    @RequestMapping(value = "/batterypoint/change/{openid}/{number}", method = RequestMethod.PUT)
    @ResponseBody
    public Map<String, Object> changeNumber(@PathVariable String openid, @PathVariable Integer number) {

        Map<String, Object> map = new HashMap<>();

        map.put("code", 0);

        BatteryPoint point = service.findByOpenid(openid);

        point.setBattery_val(number);

        service.change(point);

        return map;
    }

    @ApiOperation(value = "查找全部积分记录" ,  notes="查找全部积分记录")
    @RequestMapping(value = "/batterypoint/get/all", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> getAll() {
        return this.fromObjectToMapping(service.getAll());
    }
}
