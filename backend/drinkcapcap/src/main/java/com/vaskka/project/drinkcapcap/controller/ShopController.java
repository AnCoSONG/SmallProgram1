package com.vaskka.project.drinkcapcap.controller;

import com.vaskka.project.drinkcapcap.controller.base.BaseController;
import com.vaskka.project.drinkcapcap.controller.base.CanGetAllController;
import com.vaskka.project.drinkcapcap.entity.Shop;
import com.vaskka.project.drinkcapcap.service.ShopService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;


@Api(description = "商家接口")
@Controller
public class ShopController extends BaseController {

    @Autowired
    private ShopService shopService;

    @ApiOperation(value = "新增一条商家记录" ,  notes="新家一个商家信息")
    @RequestMapping(value = "/shop", method = RequestMethod.POST)
    @ResponseBody
    public Map<String , Object> create(@RequestBody Shop shop) {


        Map<String, Object> res = new HashMap<>();

        res.put("code", 0);

        shopService.create(shop);

        return res;
    }

    @ApiOperation(value = "获取全部商家记录" ,  notes="获取全部商家信息")
    @RequestMapping(value = "/shop/all", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> getAll() {

        return this.fromObjectToMapping(shopService.getAll());

    }
}
