# 内部api

> 2019/03/12
> 内部业务逻辑api文档

# orm

## 数据流水

+ id 唯一id
+ do_time 操作时间
+ name 操作名称
+ type 操作类型
+ interface_id 接口id
+ result 操作结果

## 电池订单

+ id 订单id
+ create_time 创建时间
+ battery_num 电池个数
+ openid 用户id
+ done 是否完成
+ done_time 完成时间

## 电池积分

+ id 唯一id
+ openid 用户id
+ battery_val 电池积分

## 娃娃券

+ id 唯一id
+ openid 用户id
+ doll_paper_val 娃娃券
+ create_time 创建时间
+ effect_time 有效时间

## 奶茶订单

+ id 订单id
+ cap_id 奶茶杯编号
+ openid 关联用户
+ create_time 创建时间
+ img_url 奶茶杯照片地址
+ shop_id 商店id
+ done 是否完成
+ done_time 完成时间

## 商家

+ id 商家id
+ name 商家名称
+ other_name 商家别名

## 商品

+ id 商品id
+ name 商品名称
+ shop_id 关联商家

## 奶茶券

+ id 奶茶券id
+ shop_id 关联商家
+ item_id 关联商品
+ openid 关联用户
+ create_time 创建时间
+ effect_time 有效时间
+ done 是否有效

## 奶茶券数量控制规则

+ id 规则id
+ shop_id 商家id
+ item_id 商品id
+ number 剩余数量


