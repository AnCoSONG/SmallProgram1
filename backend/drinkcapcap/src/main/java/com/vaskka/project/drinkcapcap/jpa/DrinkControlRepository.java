package com.vaskka.project.drinkcapcap.jpa;

import com.vaskka.project.drinkcapcap.entity.DrinkControl;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface DrinkControlRepository extends CrudRepository<DrinkControl, Integer> {

    Optional<DrinkControl> findByShopIdAndItemId(Integer shop_id, Integer item_id);

}
