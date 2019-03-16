package com.vaskka.project.drinkcapcap.controller;

import com.vaskka.project.drinkcapcap.controller.base.CanGetAllController;
import com.vaskka.project.drinkcapcap.entity.Shop;
import com.vaskka.project.drinkcapcap.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@Controller
public class ShopController extends CanGetAllController {

    @Autowired
    private ShopService shopService;


    @RequestMapping(value = "/shop", method = RequestMethod.POST)
    @ResponseBody
    public Map<String , Object> create(@RequestBody Shop shop) {


        Map<String, Object> res = new HashMap<>();

        res.put("code", 0);

        shopService.create(shop);

        return res;
    }


    @RequestMapping(value = "/shop/all", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> getAll() {

        return this.innerGetAll(shopService);

    }
}
