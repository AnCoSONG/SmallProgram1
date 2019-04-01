package com.vaskka.project.drinkcapcap.controller;

import java.util.List;

import com.vaskka.project.drinkcapcap.controller.base.BaseController;
import com.vaskka.project.drinkcapcap.controller.base.CanGetAllController;
import com.vaskka.project.drinkcapcap.entity.DollPaper;
import com.vaskka.project.drinkcapcap.service.DollPaperService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * @program: drinkcapcap
 * @description: DollPaperController
 * @author: Vaskka
 * @create: 2019/3/19 1:08 PM
 **/


@Api(description = "娃娃券接口")
@Controller
public class DollPaperController extends BaseController {

    @Autowired
    DollPaperService service;


    @ApiOperation(value = "创建娃娃券" ,  notes="插入一条新娃娃券记录")
    @ResponseBody
    @RequestMapping(value = "/dollpaper/create", method = RequestMethod.POST)
    public Map<String, Object> create(@RequestBody DollPaper entity) {
        Map<String , Object> map = new HashMap<>();

        service.create(entity);
        map.put("code", 0);

        return map;
    }


    @ApiOperation(value = "获取某个openid的全部娃娃券" ,  notes="根据openid筛选全部娃娃券")
    @ResponseBody
    @RequestMapping(value = "/dollpaper/get/{openid}", method = RequestMethod.GET)
    public Map<String, Object> getByOpenid(@PathVariable String openid) {

        List<DollPaper> list = service.getDollPaperByOpenid(openid);

        Map<String , Object> map = new HashMap<>();

        map.put("code", 0);
        map.put("data", list);

        return map;
    }


    @ApiOperation(value = "获取某个id的娃娃券" ,  notes="根据id筛选娃娃券")
    @ResponseBody
    @RequestMapping(value = "/dollpaper/{id}", method = RequestMethod.GET)
    public Map<String, Object> getById(@PathVariable Integer id) {
        Map<String , Object> map = new HashMap<>();

        DollPaper entity  = (DollPaper) service.getById(id);

        map.put("code", 0);
        map.put("date", entity);

        return map;
    }

    @ApiOperation(value = "获取全部娃娃券" ,  notes="获取全部娃娃券")
    @ResponseBody
    @RequestMapping(value = "/dollpaper/get/all", method = RequestMethod.GET)
    public Map<String, Object> getAll() {
        return this.fromObjectToMapping(service.getAll());
    }


    @ApiOperation(value = "使用一个娃娃券" ,  notes="使用一个娃娃券")
    @ResponseBody
    @RequestMapping(value = "/dollpaper/change/{id}", method = RequestMethod.PUT)
    public Map<String, Object> complete(@PathVariable Integer id) {
        Map<String , Object> map = new HashMap<>();

        DollPaper paper = (DollPaper) service.getById(id);
        if (paper == null) {
            map.put("code", 1);
            map.put("date", null);
            return map;
        }

        paper.setDone(true);

        service.change(paper);

        map.put("code", 0);
        map.put("date", paper);

        return map;
    }


}
