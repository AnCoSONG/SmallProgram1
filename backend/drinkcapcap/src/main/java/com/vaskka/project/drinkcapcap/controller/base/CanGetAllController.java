package com.vaskka.project.drinkcapcap.controller.base;

import com.vaskka.project.drinkcapcap.entity.base.BaseEntity;
import com.vaskka.project.drinkcapcap.service.base.CanGetAllPageableService;
import com.vaskka.project.drinkcapcap.service.base.CanGetAllService;
import com.vaskka.project.drinkcapcap.service.base.GetAllPageable;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public abstract class CanGetAllController extends BaseController {

    /**
     * 获取全部接口
     * @return HashMap
     */
    public abstract Map<String, Object> getAll(Boolean done, Integer page, Integer size);


    /**
     * 获取全部Item
     * @return HashMap => json
     */
    protected Map<String , Object> innerGetAllPageable(CanGetAllPageableService service, int page, int size, Boolean done) {
        Map<String, Object> res = new HashMap<>();

        res.put("code", 0);

        List<BaseEntity> list = service.innerGetAllPageable(page, size, done);

        res.put("data", list);

        return res;
    }
}
