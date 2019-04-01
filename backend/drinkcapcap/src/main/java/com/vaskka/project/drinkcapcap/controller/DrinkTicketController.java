package com.vaskka.project.drinkcapcap.controller;

import java.util.List;

import com.vaskka.project.drinkcapcap.controller.base.BaseController;
import com.vaskka.project.drinkcapcap.controller.base.CanGetAllController;
import com.vaskka.project.drinkcapcap.entity.DrinkTicket;
import com.vaskka.project.drinkcapcap.exceptions.TicketNotExistExcrption;
import com.vaskka.project.drinkcapcap.service.DrinkTicketService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * @program: drinkcapcap
 * @description: DrinkTicketController
 * @author: Vaskka
 * @create: 2019/3/19 3:15 PM
 **/


@Api(description = "奶茶券接口")
@Controller
public class DrinkTicketController extends BaseController {

    @Autowired
    DrinkTicketService service;

    @ApiOperation(value = "创建一条奶茶券记录" ,  notes="插入一条新奶茶券记录")
    @ResponseBody
    @RequestMapping(value = "/drinkticket/create", method = RequestMethod.POST)
    public Map<String, Object> create(@RequestBody DrinkTicket entity) {

        service.create(entity);

        Map<String, Object> map = new HashMap<>();

        map.put("code", 0);

        map.put("data", entity);
        return map;
    }


    @ApiOperation(value = "查找某个奶茶券的信息" ,  notes="根据id筛选奶茶券")
    @ResponseBody
    @RequestMapping(value = "/drinkticket/get/id/{id}", method = RequestMethod.GET)
    public Map<String, Object> getById(@PathVariable Integer id) {

        DrinkTicket ticket = (DrinkTicket) service.getById(id);

        Map<String, Object> map = new HashMap<>();

        map.put("code", 0);
        map.put("data", ticket);

        return map;
    }

    @ApiOperation(value = "查找某个openid的奶茶券集合" ,  notes="根据oepnid获取奶茶券信息集合")
    @ResponseBody
    @RequestMapping(value = "/drinkticket/get/openid/{openid}", method = RequestMethod.GET)
    public Map<String, Object> getByOpenid(@PathVariable String openid) {

        List<DrinkTicket> ticket = service.getByOpenid(openid);

        Map<String, Object> map = new HashMap<>();

        map.put("code", 0);
        map.put("data", ticket);

        return map;
    }

    @ApiOperation(value = "根据openid和完成度获取奶茶券信息集合" ,  notes="根据订单完成度筛选openid的奶茶券的信息集合")
    @ResponseBody
    @RequestMapping(value = "/drinkticket/get/openid/done/{openid}/{done}", method = RequestMethod.GET)
    public Map<String, Object> getByOpenidAndDone(@PathVariable String openid, @PathVariable Boolean done) {

        List<DrinkTicket> ticket = service.getByOpenidAndDone(openid, done);

        Map<String, Object> map = new HashMap<>();

        map.put("code", 0);
        map.put("data", ticket);

        return map;
    }

    @ApiOperation(value = "更改某个奶茶券的完成情况" ,  notes="更改某个id的奶茶券的使用情况")
    @ResponseBody
    @RequestMapping(value = "/drinkticket/change/{id}/{done}", method = RequestMethod.PUT)
    public Map<String, Object> change(@PathVariable Integer id, @PathVariable Boolean done) {


        Map<String, Object> map = new HashMap<>();
        try {
            service.changeDone(id, done);

            map.put("code", 0);
        }
        catch (TicketNotExistExcrption e) {

            map.put("code", 1);
            map.put("data", e.getNotExistId());
            map.put("msg", e.getMessage());
        }




        return map;
    }

}
