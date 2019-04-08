# 后台管理需要的功能

- 拿到已完成的记录(按量)

- 拿到未完成的记录(按量)

- 通过未完成的记录

- 取消并删除未完成的记录

## getuncompleterecord — 拿到未成的记录

### 提交参数

```json
{
  "openid": "woqwejqwopd", //用于后端验证是否是管理员，是: 执行后端管理员接口,否: 返回相关错误信息。
  "battery_already_show": 5, // 这两个和是10的倍数
  "drink_already_show": 5
}
```

### 返回参数

```js
{
    status: 'success',
    reason: 'success',
    uncompleteRecord: [ //所有用户的未完成记录，只要是未完成的不分类别直接传
        {
            type: 'battery',
            dataset: {
              id: 2,
              contactNumber: '18512855406',
              submitTime: '2019-03-31 12:22:33',
              pickedPlace: '四川大学江安校区',
              batteryNum: 10,
              pickedTime: '2019-04-02 18-20',
              status: false,

              note: '搞快点'
        },
        {
            type: 'teacup',
            dataset: {
              id: 3,
              submitTime: '2019-03-31 12:22:33',
              shopId: 2,
              cupId: 10,
              status: false
        }
    ],
    more: false //是否还有更多记录，false说明没有更多，true说明有更多
}
```

> 限制一次最多获取 10 个（即 uncompleteRecord 最长为 10），前端不会限制需要后端限制，通过 more 属性实现加载更多

## getcompleterecord — 拿到已完成的记录

### 提交参数

```json
{
  "openid": "sdjaodjqdqwhdioqwhiod", //用于后端验证是否是管理员，是: 执行后端管理员接口,否: 返回相关错误信息。
  "num_already": 10, // 在获取完之前都是10的倍数
  "battery_already_show": 5, // 这两个和是10的倍数
  "drink_already_show": 5
}
```

### 返回参数

```JS
{
    status: 'success',
    reason: 'success',
    completeRecord: [ //所有用户的完成记录，只要是完成的不分类别直接传
        {
         type: 'battery',
         dataset: {
         id: 2,
         contactNumber: '18512855406',
         submitTime: '2019-03-31 12:22:33',
         pickedPlace: '四川大学江安校区',
         batteryNum: 10,
         pickedTime: '2019-04-02 18-20',
         status: true, //和uncomplete唯一的区别在于status未true
         note: '搞快点'
        },
        {
         type: 'teacup',
         dataset: {
         id: 3,
         submitTime: '2019-03-31 12:22:33',
         shopId: 2,
         cupId: 10,
         status: true
         }
    ],
    more: false //false说明没有了，true说明还有，还可以再次加载
}
```

> 限制一次最多获取 10 个（即 completeRecord 最长为 10），前端不会限制需要后端限制，通过 more 属性实现加载更多

## passuncompleterecord — 通过未完成的记录

> 一次只能/只会通过一个

具体实现没有限制，只要可以实现数据库里 status 变 true 就可以

### 提交参数

```json
{
  "openid": "ssdasdwdqwdqwd", //用于后端验证是否是管理员，是: 执行后端管理员接口,否: 返回相关错误信息。
  "type": "battery", //或者'teacup'
  "id": 10 //对应编号
}
```

### 返回参数

```json
{
  "status": "success",
  "reason": "success"
}
```

## deleteuncompleterecord — 删除未完成的记录并取消

后台从数据库删除单个被选中记录，用户将无法获取到这个记录

### 提交参数

```json
{
  "openid": "sdadadwdqdqwd",
  "type": "battery", //或者'teacup'
  "id": 20
}
```

### 返回参数

```json
{
  "status": "success",
  "reason": "success"
}
```
