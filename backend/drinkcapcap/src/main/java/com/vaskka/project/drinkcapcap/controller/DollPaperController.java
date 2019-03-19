package com.vaskka.project.drinkcapcap.controller;

import java.util.List;
import com.vaskka.project.drinkcapcap.entity.DollPaper;
import com.vaskka.project.drinkcapcap.service.DollPaperService;
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


@Controller
public class DollPaperController {

    @Autowired
    DollPaperService service;


    @ResponseBody
    @RequestMapping(value = "/dollpaper/create", method = RequestMethod.POST)
    public Map<String, Object> create(@RequestBody DollPaper entity) {
        Map<String , Object> map = new HashMap<>();

        service.create(entity);
        map.put("code", 0);

        return map;
    }


    @ResponseBody
    @RequestMapping(value = "dollpaper/get/{openid}")
    public Map<String, Object> getByOpenid(@PathVariable String openid) {

        List<DollPaper> list = service.getDollPaperByOpenid(openid);

        Map<String , Object> map = new HashMap<>();

        map.put("code", 0);
        map.put("data", list);

        return map;
    }

    @ResponseBody
    @RequestMapping(value = "dollpaper/get/id/{id}")
    public Map<String, Object> getById(@PathVariable Integer id) {
        Map<String , Object> map = new HashMap<>();

        DollPaper entity  = (DollPaper) service.getById(id);

        map.put("code", 0);
        map.put("date", entity);

        return map;
    }
}
