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
    raw_location: {                             // 由gps设备得到的地理信息，用于鉴别用户输入真实性
        place_name: "成都市双流区四川大学西园七舍", // 由微信地理定位组建得到的地点全名  
        longitude: "235.4234",                 // 由微信地理定位组件生成的经度数据
        latitude: "998.5234"                   // 由微信地理定位组件生成的纬度数据
    },
    user_location: {                  // 用户输入地理位置
        school: "Default",            // 固定参数，用于后期扩展功能
        building: 7,                  // 楼栋数，Number类型
        unit: 2,                      // 单元数，Number类型
        room: "201-a"                 // 具体寝室号，String类型
    },
    rest_time: [
        "13:00-14:00",                // 可上门时间，可为多个时间段
        "15:00-17:30"
    ],
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
            id: "abx5c78",                           // 娃娃券id
            create_time: "2019-03-02 17:30:21",      // 创建时间
            effect_time: "32"                        // 有效时间（单位:小时）
        },
        {
            id: "jx7dfcbx",                          // 娃娃券id
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
    role_text: "1-1:2,5-1:3"                       // 抓娃娃券的兑换规则，每个规则的构成为%d-%d:%d。第一个数字为积分基本线，第二个%d表示花费的积分数，第三个%d表示获得的成果数，不同的规则用英文逗号分隔。示例中的规则表示超过1个积分1：2兑换，超过5个积分1：3兑换
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
            id: "abx5c78",                           // 娃娃券id
            create_time: "2019-03-02 17:30:21",      // 创建时间
            effect_time: "32",                       // 有效时间（单位:小时）
            owner: "saxc76tf"                        // 持有者的openid
        },
        {
            id: "jx7dfcbx",                          // 娃娃券id
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
    shop_id: "1001"                             // 该奶茶的商家id
    raw_location: {                             // 由gps设备得到的地理信息，用于鉴别用户输入真实性 
        longitude: "235.4234",                  // 由微信地理定位组件生成的经度数据
        latitude: "998.5234"                    // 由微信地理定位组件生成的纬度数据
    },
    user_data: {
        drink_number: "xoxo123456",       // 奶茶杯上编码
        drink_pic:  {
            raw_b64: "hscxjb3=="          // 拍摄图片的base64
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
        id: "1001",
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
                    id: "1001",                      // 商家唯一id
                    name: "益禾堂",                   // 商家名称
                    other_name: "中南大学店"           // 上架分店名称
                }
            }
        ],
        tickets: [                               // 奶茶券列表
            {
                ticket_id: "21jws7dfdc",             // id
                create_time: "2018-12-30 13:30:34",  // 创建时间
                effect_time: "48",                   // 有效时间（单位：小时）
                shop: {
                    id: "1001",                      // 商家唯一id
                    name: "益禾堂",                   // 商家名称
                    other_name: "中南大学店"           // 上架分店名称
                },
                item: {
                    item_type: 0,                    // 商品类型：0-一般商品，1-每月推荐商品
                    cost: "12.5",                    // 商品价格
                    name: "__any__"                  // 商品名称：__any__表示任意商品 其他为某个特定商品
                }
            },
            {
                ticket_id: "dcdu33as9c",             // id
                create_time: "2019-01-30 12:20:20",  // 创建时间
                effect_time: "24",                   // 有效时间（单位：小时）
                shop: {
                    id: "1002",                      // 上架唯一id
                    name: "书亦烧仙草",                // 商家名称
                    other_name: "中南大学店"           // 上架分店名称
                },
                item: {
                    item_type: 1,                    // 商品类型：0-一般商品，1-每月推荐商品
                    cost: "15",                      // 商品价格
                    name: "小芋圆烧仙草"               // 商品名称：__any__表示任意单品 其他为某个特定商品
                }
            },
            ...
        ]
    }
}
```

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
            id: "1001",                      // 商家唯一id
            name: "益禾堂",                   // 商家名称
            other_name: "中南大学店"           // 上架分店名称
        },
        {
            id: "1002",                      // 上架唯一id
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
    openid: "asdf43fdsx",          // 用户的已鉴权id
    ticket: {                                // 正在尝试消费的券
        ticket_id: "dcdu33as9c",             // id
        create_time: "2019-01-30 12:20:20",  // 创建时间
        effect_time: "24",                   // 有效时间（单位：小时）
        shop: {
            id: "1002",                      // 上架唯一id
            name: "书亦烧仙草",                // 商家名称
            other_name: "中南大学店"           // 上架分店名称
        },
        item: {
            item_type: 1,                    // 商品类型：0-一般商品，1-每月推荐商品
            cost: "15",                      // 商品价格
            name: "小芋圆烧仙草"               // 商品名称：__any__表示任意单品 其他为某个特定商品
        }
    },
    main_shop: {
        id: "1002",                           // 正在进行消费的商家
        name: "书亦烧仙草",
        other_name: "中南大学店"
    }
}
```

### 返回参数

```javascript
{
    serv_datetime: "2019-03-07 12:30:34",       // 服务器时间
    status: "SUCCESS",                          // 是否成功，成功返回"SUCCESS", 失败返回"FAILURE"
    reason: "success",                          // 返回结果的原因，提交失败返回失败原因，成功返回"success"
    main_shop: {
        id: "1002",                             // 成功返回正在进行消费的商家的id，失败返回 "0"
        name: "书亦烧仙草",                       // 成功返回正在进行消费的商家的名称，失败返回 ""
        other_name: "中南大学店"                  // 成功返回正在进行消费的商家的分店名，失败返回 ""
    }
}
```