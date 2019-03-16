package com.vaskka.project.drinkcapcap.controller;

import com.vaskka.project.drinkcapcap.controller.base.CanGetAllController;
import com.vaskka.project.drinkcapcap.entity.Item;
import com.vaskka.project.drinkcapcap.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Controller
public class ItemController extends CanGetAllController {

    @Autowired
    private ItemService service;

    @RequestMapping(value = "/item", method = RequestMethod.POST)
    @ResponseBody
    public Map<String , Object> create(@RequestBody Item item) {
        Map<String, Object> map = new HashMap<>();

//        System.out.println(item.getItem_name());
//        System.out.println(item.getShop_id());

        service.create(item);
        map.put("code", 0);

        return map;
    }



    /**
     * 获取全部Item
     * @return HashMap => json
     */
    @RequestMapping(value = "/item/all", method = RequestMethod.GET)
    @ResponseBody
    public Map<String , Object> getAll() {
        return this.innerGetAll(service);
    }



}
