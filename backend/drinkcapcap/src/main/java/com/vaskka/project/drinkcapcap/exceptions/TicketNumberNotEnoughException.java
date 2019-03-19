package com.vaskka.project.drinkcapcap.exceptions;

/**
 * @program: drinkcapcap
 * @description: TicketNumberNotEnoughException 奶茶券不足异常
 * @author: Vaskka
 * @create: 2019/3/19 2:31 PM
 **/

public class TicketNumberNotEnoughException extends DrinkCapcapBaseException {
    private Integer shopId;

    private Integer itemId;

    public TicketNumberNotEnoughException(String message, Integer shopId, Integer itemId) {
        super(message);
        this.shopId = shopId;
        this.itemId = itemId;
    }

    public Integer getShopId() {
        return shopId;
    }

    public void setShopId(Integer shopId) {
        this.shopId = shopId;
    }

    public Integer getItemId() {
        return itemId;
    }

    public void setItemId(Integer itemId) {
        this.itemId = itemId;
    }
}
