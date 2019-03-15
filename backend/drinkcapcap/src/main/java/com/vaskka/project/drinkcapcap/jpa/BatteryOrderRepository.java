package com.vaskka.project.drinkcapcap.jpa;

import com.vaskka.project.drinkcapcap.entity.BatteryOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BatteryOrderRepository extends JpaRepository<BatteryOrder, Integer> {
}
