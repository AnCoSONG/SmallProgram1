package com.vaskka.project.drinkcapcap.service;

import com.vaskka.project.drinkcapcap.entity.DrinkPoint;
import com.vaskka.project.drinkcapcap.entity.base.BaseEntity;
import com.vaskka.project.drinkcapcap.jpa.DrinkPointRepository;
import com.vaskka.project.drinkcapcap.service.base.CanGetAllService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DrinkPointService extends CanGetAllService {

    @Autowired
    private DrinkPointRepository repository;

    @Deprecated
    @Override
    public BaseEntity create(BaseEntity entity) {
        return null;
    }

    @Override
    public BaseEntity getById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public void change(BaseEntity entity) {

        repository.save((DrinkPoint) entity);
    }

    /**
     * (管理员方法) 获取全部用户全部积分
     * @return List&lt;DrinkPoint&gt;
     */
    @Override
    public List<BaseEntity> getAll() {
        return innerGetAll(repository);
    }


    /**
     * 为某个用户添加一个商家的积分
     * @param openid openid
     * @param shop_id shop_id
     */
    public void addShopPointWithOpenid(String openid, Integer shop_id) {
        Optional<DrinkPoint> res = repository.findByOpenidAndShopId(openid, shop_id);

        if (res.isPresent()) {
            res.get().setPoint(res.get().getPoint() + 1);
            repository.save(res.get());
        }
        else {
            repository.save(new DrinkPoint(openid, shop_id, 1));
        }
    }

    /**
     * 获取某个用户全部的商家积分
     * @param openid openid
     * @return List&lt;DrinkPoint&gt;
     */
    public List<DrinkPoint> getByOpenid(String openid) {
        return repository.findByOpenid(openid);
    }

    public DrinkPoint getByOpenidAndShopid(String openid, int shop_id) {

        return  repository.findByOpenidAndShopId(openid, shop_id).orElse(null);

    }

}
