package com.vaskka.project.drinkcapcap.controller;

import java.util.List;

import com.vaskka.project.drinkcapcap.entity.DrinkTicket;
import com.vaskka.project.drinkcapcap.exceptions.TicketNotExistExcrption;
import com.vaskka.project.drinkcapcap.service.DrinkTicketService;
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


@Controller
public class DrinkTicketController {

    @Autowired
    DrinkTicketService service;

    @ResponseBody
    @RequestMapping(value = "/drinkticket/create", method = RequestMethod.POST)
    public Map<String, Object> create(@RequestBody DrinkTicket entity) {

        service.create(entity);

        Map<String, Object> map = new HashMap<>();

        map.put("code", 0);

        return map;
    }


    @ResponseBody
    @RequestMapping(value = "/drinkticket/get/id/{id}", method = RequestMethod.GET)
    public Map<String, Object> getById(@PathVariable Integer id) {

        DrinkTicket ticket = (DrinkTicket) service.getById(id);

        Map<String, Object> map = new HashMap<>();

        map.put("code", 0);
        map.put("data", ticket);

        return map;
    }

    @ResponseBody
    @RequestMapping(value = "/drinkticket/get/openid/{opendid}", method = RequestMethod.GET)
    public Map<String, Object> getById(@PathVariable String openid) {

        List<DrinkTicket> ticket = service.getByOpenid(openid);

        Map<String, Object> map = new HashMap<>();

        map.put("code", 0);
        map.put("data", ticket);

        return map;
    }

    @ResponseBody
    @RequestMapping(value = "/drinkticket/get/openid/done/{opendid}/{done}", method = RequestMethod.GET)
    public Map<String, Object> getById(@PathVariable String openid, @PathVariable Boolean done) {

        List<DrinkTicket> ticket = service.getByOpenidAndDone(openid, done);

        Map<String, Object> map = new HashMap<>();

        map.put("code", 0);
        map.put("data", ticket);

        return map;
    }

    @ResponseBody
    @RequestMapping(value = "/drinkticket/change", method = RequestMethod.PUT)
    public Map<String, Object> getById(@RequestBody DrinkTicket ticket) {


        Map<String, Object> map = new HashMap<>();
        try {
            service.changeDone(ticket.getId(), ticket.getDone());

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
