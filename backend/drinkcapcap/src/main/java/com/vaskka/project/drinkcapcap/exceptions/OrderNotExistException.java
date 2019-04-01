package com.vaskka.project.drinkcapcap.exceptions;

import java.util.function.Supplier;

/**
 * @program: drinkcapcap
 * @description: OrderNotExistException
 * @author: Vaskka
 * @create: 2019/4/1 3:35 PM
 **/

public class OrderNotExistException extends NotExistException implements Supplier<OrderNotExistException> {

    public OrderNotExistException(String message) {
        super(message);
    }

    public OrderNotExistException(String message, Integer id) {
        super(message, id);
    }

    @Override
    public OrderNotExistException get() {
        return new OrderNotExistException(this.getMessage(), (Integer) this.getNotExistReference());
    }
}
