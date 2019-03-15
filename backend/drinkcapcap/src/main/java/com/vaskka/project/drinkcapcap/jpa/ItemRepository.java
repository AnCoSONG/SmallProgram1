package com.vaskka.project.drinkcapcap.jpa;

import com.vaskka.project.drinkcapcap.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Integer> {
}
