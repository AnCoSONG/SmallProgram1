package com.vaskka.project.drinkcapcap.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

/**
 * @program: drinkcapcap
 * @description: HelloWorld
 * @author: Vaskka
 * @create: 2019/3/12 5:47 PM
 **/


@Controller
public class HelloWorld {

    @RequestMapping("/hello")
    @ResponseBody
    public Map<String, Object> hello () {
        Map<String , Object> map = new HashMap<>();
        map.put("Hello", 2);
        return map;
    }
}
