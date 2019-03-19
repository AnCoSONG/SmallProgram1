package com.vaskka.project.drinkcapcap.jpa;

import java.util.List;
import com.vaskka.project.drinkcapcap.entity.DollPaper;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface DollPaperRepository extends CrudRepository<DollPaper, Integer> {

    List<DollPaper> findByOpenid(String openid);
}
