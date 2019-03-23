package com.vaskka.project.drinkcapcap.service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import com.vaskka.project.drinkcapcap.entity.DollPaper;
import com.vaskka.project.drinkcapcap.entity.base.BaseEntity;
import com.vaskka.project.drinkcapcap.jpa.DollPaperRepository;
import com.vaskka.project.drinkcapcap.service.base.BaseService;
import com.vaskka.project.drinkcapcap.service.base.CanGetAllService;
import com.vaskka.project.drinkcapcap.utils.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


/**
 * @program: drinkcapcap
 * @description: DollPaperService
 * @author: Vaskka
 * @create: 2019/3/19 1:04 PM
 **/

@Service
public class DollPaperService extends CanGetAllService implements BaseService {

    @Autowired
    DollPaperRepository repository;


    @Override
    public List<BaseEntity> getAll() {
        return this.innerGetAll(repository);
    }

    @Override
    public BaseEntity create(BaseEntity entity) {

        DollPaper paper = (DollPaper) entity;
        paper.setValid(true);
        paper.setDone(false);
        return repository.save((DollPaper) entity);
    }

    @Override
    public BaseEntity getById(Integer id) {


        DollPaper paper =  repository.findById(id).orElse(null);
        if (paper == null) {
            return null;
        }

        paper.setValid(Util.checkIfValid(paper.getCreate_time(), paper.getEffect_time()));

        return paper;
    }

    @Override
    public void change(BaseEntity entity) {

        repository.save((DollPaper) entity);
    }


    /**
     * 根据openid 获取全部娃娃券列表
     * @param openid String openid
     * @return List&lt;DollPaper&gt;
     */
    public List<DollPaper> getDollPaperByOpenid(String openid) {

        List<DollPaper> list = repository.findByOpenid(openid);

        // 标记过期的娃娃券
        for (DollPaper item : list) {
            item.setValid(Util.checkIfValid(item.getCreate_time(), item.getEffect_time()));
        }

        return list;

    }
}
