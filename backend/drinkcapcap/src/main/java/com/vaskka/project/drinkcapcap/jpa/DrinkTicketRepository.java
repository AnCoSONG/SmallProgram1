package com.vaskka.project.drinkcapcap.jpa;

import com.vaskka.project.drinkcapcap.entity.DrinkTicket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DrinkTicketRepository extends JpaRepository<DrinkTicket, Integer> {
}
