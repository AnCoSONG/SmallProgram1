package com.vaskka.project.drinkcapcap.controller;

import com.vaskka.project.drinkcapcap.controller.base.CanGetAllController;
import com.vaskka.project.drinkcapcap.entity.DrinkControl;
import com.vaskka.project.drinkcapcap.service.DrinkControlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@Controller
public class DrinkControlController extends CanGetAllController {

    @Autowired
    private DrinkControlService service;

    @RequestMapping(method = RequestMethod.POST, value = "/drinkcontrol")
    @ResponseBody
    public Map<String, Object> create(@RequestBody DrinkControl drinkControl) {

        service.create(drinkControl);

        Map<String, Object> res = new HashMap<>();

        res.put("code", 0);

        service.create(drinkControl);

        return res;

    }

    /**
     * 获取全部Item
     * @return HashMap => json
     */
    @RequestMapping(value = "/drinkcontrol/all", method = RequestMethod.GET)
    @ResponseBody
    public Map<String , Object> getAll() {
        return this.innerGetAll(service);
    }

}
