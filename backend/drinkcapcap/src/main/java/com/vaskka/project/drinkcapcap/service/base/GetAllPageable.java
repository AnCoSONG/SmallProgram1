package com.vaskka.project.drinkcapcap.service.base;

import java.util.List;
import com.vaskka.project.drinkcapcap.entity.base.BaseEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GetAllPageable extends BaseService {

    List<BaseEntity> getAllPageable(JpaRepository repository, int page, int size);
}
