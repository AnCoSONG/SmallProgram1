package com.vaskka.project.drinkcapcap.jpa;

import com.vaskka.project.drinkcapcap.entity.BatteryPoint;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BatteryPointRepository extends JpaRepository<BatteryPoint, Integer> {
}
