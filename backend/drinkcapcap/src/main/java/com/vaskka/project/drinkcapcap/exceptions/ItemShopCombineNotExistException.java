package com.vaskka.project.drinkcapcap.exceptions;

/**
 * @program: drinkcapcap
 * @description: ItemShopCombineNotExistException 商品与商家组合不存在异常
 * @author: Vaskka
 * @create: 2019/3/19 2:45 PM
 **/

public class ItemShopCombineNotExistException extends NotExistException {
    private Integer shopId;

    private Integer itemId;

    public ItemShopCombineNotExistException(String message, Integer shopId, Integer itemId) {
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
