# 后台管理需要的功能

* 拿到已完成的记录(按量)

* 拿到未完成的记录(按量)

* 通过未完成的记录

* 取消并删除未完成的记录

## getuncompleterecord — 拿到未成的记录

### 提交参数

```json
{
    openid: 'woqwejqwopd'
}
```

### 返回参数

```json
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
              contactNumber: '18512855406',
              submitTime: '2019-03-31 12:22:33',
              shopId: 2,
              cupId: 10,
              status: false
        }
    ],
    more: false //是否还有更多记录，false说明没有更多，true说明有更多
}
```

> 限制一次最多获取10个（即uncompleteRecord最长为10），前端不会限制需要后端限制，通过more属性实现加载更多

## getcompleterecord — 拿到已完成的记录

### 提交参数

```json
{
    openid: 'sdjaodjqdqwhdioqwhiod' //二次验证用户管理员身份
}
```

### 返回参数

```JSON
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
         contactNumber: '18512855406',
         submitTime: '2019-03-31 12:22:33',
         shopId: 2,
         cupId: 10,
         status: true
         }
    ],
    more: false //false说明没有了，true说明还有，还可以再次加载
}
```

> 限制一次最多获取10个（即completeRecord最长为10），前端不会限制需要后端限制，通过more属性实现加载更多

## passuncompleterecord — 通过未完成的记录

> 一次只能/只会通过一个

具体实现没有限制，只要可以实现数据库里status变true就可以

### 提交参数

```json
{
    openid: 'ssdasdwdqwdqwd'
    type: 'battery' //或者'teacup'
    id: 10 //对应编号
}
```

### 返回参数

```json
{
    status: 'success',
    reason: 'success'
}
```

## deleteuncompleterecord — 删除未完成的记录并取消

后台从数据库删除单个被选中记录，用户将无法获取到这个记录

### 提交参数

```json
{
    openid: 'sdadadwdqdqwd',
    type: 'battery', //或者'teacup'
    id: 20
}
```

### 返回参数

```json
{
    status: 'success',
    reason: 'success'
}
```
