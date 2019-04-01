package com.vaskka.project.drinkcapcap.controller;

import com.vaskka.project.drinkcapcap.controller.base.BaseController;
import com.vaskka.project.drinkcapcap.entity.DrinkControl;
import com.vaskka.project.drinkcapcap.service.DrinkControlService;
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


@Api(description = "奶茶数量约束接口")
@Controller
public class DrinkControlController extends BaseController {

    @Autowired
    private DrinkControlService service;

    @ApiOperation(value = "创建一条新约束" ,  notes="插入一条新奶茶券约束记录")
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
    @ApiOperation(value = "获取全部娃娃券记录" ,  notes="获取全部娃娃券数据记录")
    @RequestMapping(value = "/drinkcontrol/all", method = RequestMethod.GET)
    @ResponseBody
    public Map<String , Object> getAll() {
        return this.fromObjectToMapping(service.getAll());
    }

}
