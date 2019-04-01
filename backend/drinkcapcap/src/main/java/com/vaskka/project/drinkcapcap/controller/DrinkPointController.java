package com.vaskka.project.drinkcapcap.controller;

import com.vaskka.project.drinkcapcap.controller.base.BaseController;
import com.vaskka.project.drinkcapcap.controller.base.CanGetAllController;
import com.vaskka.project.drinkcapcap.entity.BatteryPoint;
import com.vaskka.project.drinkcapcap.entity.DrinkPoint;
import com.vaskka.project.drinkcapcap.entity.base.BaseEntity;
import com.vaskka.project.drinkcapcap.service.DrinkPointService;
import com.vaskka.project.drinkcapcap.service.base.CanGetAllService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Api(description = "奶茶商家积分接口")
@Controller
public class DrinkPointController extends BaseController {

    @Autowired
    private DrinkPointService service;


    @ApiOperation(value = "增加某个商家的奶茶积分" ,  notes="增加某个用户的某个商家的奶茶积分")
    @ResponseBody
    @RequestMapping(value = "/drinkpoint/add/{openid}/{shop_id}", method = RequestMethod.GET)
    public Map<String, Object> addPoint(@PathVariable String openid, @PathVariable Integer shop_id) {

        Map<String, Object > map = new HashMap<>();

        service.addShopPointWithOpenid(openid, shop_id);

        map.put("code", 0);


        return map;

    }


    @ApiOperation(value = "获取某个用户的奶茶积分" ,  notes="获取某个用户的全部商家的奶茶积分")
    @ResponseBody
    @RequestMapping(value = "/drinkpoint/get/{openid}", method = RequestMethod.GET)
    public Map<String, Object> getByOpenid(@PathVariable String openid) {

        Map<String, Object > map = new HashMap<>();

        List<DrinkPoint> list = service.getByOpenid(openid);

        map.put("code", 0);
        map.put("data", list);

        return map;

    }


    @ApiOperation(value = "获取全部用户的奶茶积分（管理员方法）" ,  notes="获取全部用户的全部商家的奶茶积分")
    @ResponseBody
    @RequestMapping(value = "/drinkpoint/all", method = RequestMethod.GET)
    public Map<String, Object> getAll() {
        return this.fromObjectToMapping(service.getAll());
    }


    @ApiOperation(value = "更改积分" ,  notes="更改积分数值")
    @RequestMapping(value = "/drinkpoint/change/{openid}/{shop_id}/{number}", method = RequestMethod.PUT)
    @ResponseBody
    public Map<String, Object> changeNumber(@PathVariable String openid,  @PathVariable Integer shop_id, @PathVariable Integer number) {

        Map<String, Object> map = new HashMap<>();

        map.put("code", 0);

        DrinkPoint point = service.getByOpenidAndShopid(openid, shop_id);

        point.setPoint(number);

        map.put("data", point);
        service.change(point);

        return map;
    }
}
