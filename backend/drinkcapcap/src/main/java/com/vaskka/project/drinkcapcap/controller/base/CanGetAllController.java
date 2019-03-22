package com.vaskka.project.drinkcapcap.controller.base;

import com.vaskka.project.drinkcapcap.entity.base.BaseEntity;
import com.vaskka.project.drinkcapcap.service.base.CanGetAllService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public abstract class CanGetAllController {

    /**
     * 获取全部接口
     * @return HashMap
     */
    public abstract Map<String, Object> getAll();

    /**
     * 获取全部Item
     * @return HashMap => json
     */
    protected Map<String , Object> innerGetAll(CanGetAllService service) {
        Map<String, Object> res = new HashMap<>();

        res.put("code", 0);

        List<BaseEntity> list = service.getAll();

        res.put("data", list);

        return res;
    }

}
