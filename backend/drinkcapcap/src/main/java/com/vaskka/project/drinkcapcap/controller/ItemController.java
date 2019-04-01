package com.vaskka.project.drinkcapcap.controller;

import com.vaskka.project.drinkcapcap.controller.base.BaseController;
import com.vaskka.project.drinkcapcap.controller.base.CanGetAllController;
import com.vaskka.project.drinkcapcap.entity.Item;
import com.vaskka.project.drinkcapcap.service.ItemService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Api(description = "商品接口")
@Controller
public class ItemController extends BaseController {

    @Autowired
    private ItemService service;

    @ApiOperation(value = "创建一条商品记录" ,  notes="插入一条新商品记录")
    @RequestMapping(value = "/item", method = RequestMethod.POST)
    @ResponseBody
    public Map<String , Object> create(@RequestBody Item item) {
        Map<String, Object> map = new HashMap<>();

        service.create(item);
        map.put("code", 0);

        return map;
    }



    /**
     * 获取全部Item
     * @return HashMap => json
     */
    @ApiOperation(value = "获取全部商品记录" ,  notes="获取全部商品信息")
    @RequestMapping(value = "/item/all", method = RequestMethod.GET)
    @ResponseBody
    public Map<String , Object> getAll() {
        return this.fromObjectToMapping(service.getAll());
    }



}
