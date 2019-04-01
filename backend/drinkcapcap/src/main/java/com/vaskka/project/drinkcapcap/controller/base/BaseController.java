package com.vaskka.project.drinkcapcap.controller.base;


import java.util.HashMap;
import java.util.Map;

/**
 * @program: drinkcapcap
 * @description: BaseController
 * @author: Vaskka
 * @create: 2019/4/1 2:56 PM
 **/

public class BaseController {



    protected Map<String, Object> fromObjectToMapping(Object obj) {

        Map<String, Object> map = new HashMap<>();

        try {

            map.put("code", 0);
            map.put("data", obj);

        } catch (NullPointerException e) {
            map.put("code", 1);
            map.put("info", e.getStackTrace());
        }

        return map;
    }

}
