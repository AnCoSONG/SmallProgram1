package com.vaskka.project.drinkcapcap.jpa;

import com.vaskka.project.drinkcapcap.entity.DataLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DataLogRepository extends JpaRepository<DataLog, Integer> {
}
