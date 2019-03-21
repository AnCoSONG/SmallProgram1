# 接口文档

> 2019/03/07

# 相关接口

## login

> 进行登陆获取微信身份权限

### 传入参数

```javascript
```

### 返回参数

```javascript
{
    "openid": "asdjei2edczzx", // 已鉴权openid
    "appid": "sade2esc",
    "unionid": "23jedsix"      // 可用可不用，只在满足条件下返回
}
```

## 废电池回收提交订单

> 提交废电池回收的订单，共后台人员查看回收

### 传入参数

```javascript
{
    user_location: {                  // 用户输入地理位置
        school: "Default",            // 固定参数，用于后期扩展功能
        building: 7,                  // 楼栋数，Number类型
        room: "201"                 // 具体寝室号，String类型
    },
    rest_time: "2019-02-04 16-18",
    battery: {
        num: 13                       // 电池个数
    }

}
```

### 返回参数

```javascript
{
    serv_datetime: "2019-03-07 12:30:34",       // 服务器时间
    status: "SUCCESS",                          // 是否成功，成功返回"SUCCESS", 失败返回"FAILURE"
    reason: "success",                          // 返回结果的原因，提交失败返回失败原因，成功返回"success"
    battery: {
        num: 13                                 // 提交成功的电池个数，失败返回0
    }
}
```

## 获取电池积分

> 点击我的 -> 电池积分调用的接口

### 传入参数

```javascript
```

### 返回参数

```javascript
{
    serv_datetime: "2019-03-07 12:30:34",       // 服务器时间
    status: "SUCCESS",                          // 是否成功，成功返回"SUCCESS", 失败返回"FAILURE"
    reason: "success",                          // 返回结果的原因，提交失败返回失败原因，成功返回"success"
    battery_light: 233                          // 当前电池积分数        
}
```

## 获取抓娃娃券信息

> 点击我的 -> 我的抓娃娃券调用的接口

### 传入参数

```javascript
```

### 返回参数

```javascript
{
    serv_datetime: "2019-03-07 12:30:34",       // 服务器时间
    status: "SUCCESS",                          // 是否成功，成功返回"SUCCESS", 失败返回"FAILURE"
    reason: "success",                          // 返回结果的原因，提交失败返回失败原因，成功返回"success"
    doll_paper: [                               // 当前抓娃娃券的数目
        {
            _id: "abx5c78",                           // 娃娃券id
            create_time: "2019-03-02 17:30:21",      // 创建时间
            effect_time: "32"                        // 有效时间（单位:小时）
        },
        {
            _id: "jx7dfcbx",                          // 娃娃券id
            create_time: "2019-04-05 12:30:33",      // 创建时间
            effect_time: "48"                        // 有效时间（单位:小时）
        }
    ]
}
```

## 获取电池积分兑换娃娃券的规则

> 返回当前规则信息

### 传入参数

```javascript
```

### 返回参数

```javascript
{
    serv_datetime: "2019-03-07 12:30:34",          // 服务器时间
    status: "SUCCESS",                             // 是否成功，成功返回"SUCCESS", 失败返回"FAILURE"
    reason: "success",                             // 返回结果的原因，提交失败返回失败原因，成功返回"success"
    rule: [
        {
            over: 1,                                   // 超过1个（包括）
            down: 5,                                   // 5个以下
            cost: 1,                                   // 花费一个
            get: 2                                     // 获得2个
        },
        {
            over: 5,                                   // 超过5个（包括）
            down: -1,                                  // 上不封顶
            cost: 1,                                   // 花费1个
            get: 3                                     // 获得3个
        }
    ]

}
```

## 使用电池积分兑换抓娃娃券

> 调用此接口将电池积分换成抓娃娃券
> 只需提供花费多少电池积分，具体判断由后端完成

### 传入参数

```javascript
{
    cost_light: "20"               // 花费的积分数，
}
```

### 返回参数

```javascript
{
    serv_datetime: "2019-03-07 12:30:34",       // 服务器时间
    status: "SUCCESS",                          // 是否成功，成功返回"SUCCESS", 失败返回"FAILURE"
    reason: "success",                          // 返回结果的原因，提交失败返回失败原因，成功返回"success"
    result: {
        left_light_num: 13,                         // 剩余的电池积分数，失败返回0
        left_doll: [                                // 当前抓娃娃券具体信息,失败返回[]
        {
            _id: "abx5c78",                           // 娃娃券id
            create_time: "2019-03-02 17:30:21",      // 创建时间
            effect_time: "32",                       // 有效时间（单位:小时）
            owner: "saxc76tf"                        // 持有者的openid
        },
        {
            _id: "jx7dfcbx",                          // 娃娃券id
            create_time: "2019-04-05 12:30:33",      // 创建时间
            effect_time: "48",                       // 有效时间（单位:小时）
            owner: "saxc76tf"                        // 持有者的openid
        }
    ]                         
    }
}
```

## 提交奶茶信息

> 上传奶茶杯上贴纸编码和照片

### 传入参数

```javascript
{
    shop_id: 1,                                 // 该奶茶的商家id(改为Number类型)
    user_data: {
        drink_number: 123456,                   // 奶茶杯上编码 (改为Number类型)
        drink_pic:  {
            fileID: "hscxjb3"                   // 拍摄图片的唯一ID（需要提前上传图片拿到id）
        }
    }
}
```

### 返回参数

```javascript
{
    serv_datetime: "2019-03-07 12:30:34",       // 服务器时间
    status: "SUCCESS",                          // 是否成功，成功返回"SUCCESS", 失败返回"FAILURE"
    reason: "success",                          // 返回结果的原因，提交失败返回失败原因，成功返回"success"
    shop: {
        _id: "1001",
        name: "益禾堂",
        other_name: "中南大学店"
    }
}
```

## 获取奶茶杯积分和奶茶券数据

> 查询奶茶杯积分情况和奶茶券的数据情况

### 传入参数

```javascript
```

### 返回参数

```javascript
{
    serv_datetime: "2019-03-07 12:30:34",       // 服务器时间
    status: "SUCCESS",                          // 是否成功，成功返回"SUCCESS", 失败返回"FAILURE"
    reason: "success",                          // 返回结果的原因，提交失败返回失败原因，成功返回"success"
    drink: {
        lights: [                               // 奶茶杯积分数
            {
                number: 20,
                shop: {
                    _id: "0001",                      // 商家唯一id
                    name: "益禾堂",                   // 商家名称
                    other_name: "中南大学店"           // 上架分店名称
                }
            }
        ],
        tickets: [                               // 奶茶券列表
            {
                _id: "21jws7dfdc",             // id
                create_time: "2018-12-30 13:30:34",  // 创建时间
                effect_time: "48",                   // 有效时间（单位：小时）
                shop: {
                    _id: "0001",                      // 商家唯一id
                    name: "益禾堂",                   // 商家名称
                    other_name: "中南大学店"           // 上架分店名称
                },
                item: {
                    item_type: 0,                    // 商品类型
                    name: "__any__"                  // 商品名称：__any__表示任意商品 其他为某个特定商品
                }
            },
            {
                _id: "dcdu33as9c",             // id
                create_time: "2019-01-30 12:20:20",  // 创建时间
                effect_time: "24",                   // 有效时间（单位：小时）
                shop: {
                    _id: "0001",                      // 上架唯一id
                    name: "书亦烧仙草",                // 商家名称
                    other_name: "中南大学店"           // 上架分店名称
                },
                item: {
                    item_type: 1,                    // 商品类型
                    name: "小芋圆烧仙草"               // 商品名称：__any__表示任意单品 其他为某个特定商品
                }
            },
            ...
        ]
    }
}
```

### 商店对照表

+ _id: 0001, name: 益禾堂-中南大学店
+ _id: 0002, name: 益禾堂-后湖小区店
+ _id: 0003, name: 书亦烧仙草-中南大学店
+ _id: 0004, name: 蜜雪冰城-中南大学店
+ _id：0005，name: 茶颜悦色-青年路步行街店
+ _id: 0006, name: 阿里山贡茶-中南大学店
+ _id: 0007, name: 甘茗城-后湖小区店

### 商品对照表

+ id: 1, name: \_\_any\_\_
+ id: 2, name: 四季奶青
+ id: 3, name: 牛奶烧仙草
+ id: 4, name: 小芋圆烧仙草
+ id: 5, name: 蜂蜜柚子茶
+ id: 6, name: 幽兰拿铁
+ id: 7, name: 熊猫奶盖茶

## 获取全部可用的奶茶店列表

> 返回全部奶茶店列表

### 传入参数

```javascript
```

### 接受参数

```javascript
{
    serv_datetime: "2019-03-07 12:30:34",       // 服务器时间
    status: "SUCCESS",                          // 是否成功，成功返回"SUCCESS", 失败返回"FAILURE"
    reason: "success",                          // 返回结果的原因，提交失败返回失败原因，成功返回"success"
    shops: [
        {
            _id: "1001",                      // 商家唯一id
            name: "益禾堂",                   // 商家名称
            other_name: "中南大学店"           // 上架分店名称
        },
        {
            _id: "1002",                      // 上架唯一id
            name: "书亦烧仙草",                // 商家名称
            other_name: "中南大学店"           // 上架分店名称
        },
        ...
    ]
}
```

## 获取全部奶茶券兑换规则

> 返回全部奶茶券兑换规则

### 传入参数

```javascript
```

### 接受参数

```javascript
{
    serv_datetime: "2019-03-07 12:30:34",       // 服务器时间
    status: "SUCCESS",                          // 是否成功，成功返回"SUCCESS", 失败返回"FAILURE"
    reason: "success",                          // 返回结果的原因，提交失败返回失败原因，成功返回"success"
    roles: {
        single: "8:1",                          // 一般商品
        recommand: "6:1"                        // 每月推荐单品
    }
}
```

## 商家确认奶茶券支付

> 由商家点击确认按钮完成支付

### 传入参数

```javascript
{
    ticket_id: "dcdu33as9c"             // 奶茶券id
}
```

### 返回参数

```javascript
{
    serv_datetime: "2019-03-07 12:30:34",       // 服务器时间
    status: "SUCCESS",                          // 是否成功，成功返回"SUCCESS", 失败返回"FAILURE"
    reason: "success"                          // 返回结果的原因，提交失败返回失败原因，成功返回"success"
}
```