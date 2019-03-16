package com.vaskka.project.drinkcapcap.controller;


import com.vaskka.project.drinkcapcap.entity.BatteryPoint;
import com.vaskka.project.drinkcapcap.service.BatteryPointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@Controller
public class BatteryPointController {

    @Autowired
    private BatteryPointService service;


    @RequestMapping(value = "/batterypoint/get/{openid}", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> getByOpenid(@PathVariable String openid) {

        Map<String, Object> map = new HashMap<>();

        map.put("code", 0);

        map.put("data", service.findByOpenid(openid));


        return map;
    }

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

}
