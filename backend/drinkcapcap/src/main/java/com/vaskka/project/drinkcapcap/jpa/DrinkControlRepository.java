package com.vaskka.project.drinkcapcap.jpa;

import com.vaskka.project.drinkcapcap.entity.DrinkControl;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DrinkControlRepository extends JpaRepository<DrinkControl, Integer> {
}
