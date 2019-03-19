package com.vaskka.project.drinkcapcap.exceptions;

import java.util.function.Supplier;

/**
 * @program: drinkcapcap
 * @description: TicketNotExistExcrption 奶茶券不存在异常
 * @author: Vaskka
 * @create: 2019/3/19 3:07 PM
 **/

public class TicketNotExistExcrption extends DrinkCapcapBaseException {

    private Integer notExistId;

    public TicketNotExistExcrption(String message, Integer id) {
        super(message);
        this.notExistId = id;
    }

    public Integer getNotExistId() {
        return notExistId;
    }

    public void setNotExistId(Integer id) {
        this.notExistId = id;
    }

}
