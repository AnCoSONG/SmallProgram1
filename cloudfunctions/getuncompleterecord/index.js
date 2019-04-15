// 云函数入口文件

const got = require('got');

const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let d_resp = await got('http://129.204.216.249:8080/drinkorder/get/all/uncompleted', {
    method: 'GET',
    headers: {
      accept: "*/*"
    }
  });

  let b_resp = await got('http://129.204.216.249:8080/batteryorder/get/all/uncompleted', {
    method: 'GET',
    headers: {
      accept: "*/*"
    }
  });


  let drink_orders = JSON.parse(d_resp.body).data;
  let battery_orders = JSON.parse(b_resp.body).data;

  let d_num = drink_orders.length;
  let b_num = battery_orders.length;

  let result_list = [];

  while (drink_orders.length > 0) {
    let obj = drink_orders.pop();
    result_list.push({
      type: 'teacup',
      dataset: {
        id: obj.id,
        submitTime: obj.createTime,
        shopId: obj.shop_id,
        cupId: obj.cup_id,
        status: obj.done
      }
    });
  } 

  while (battery_orders.length > 0) {
    let obj = battery_orders.pop();
    result_list.push({
      type: 'battery',
      dataset: {
        id: obj.id,
        contactNumber: obj.tel,
        submitTime: obj.createTime,
        pickedPlace: obj.userLocation,
        batteryNum: obj.battery_num,
        pickedTime: obj.freeTime,
        status: obj.done,
        note: obj.note
      }
    });
  }

  return {
    status: 'success',
    reason: 'success',
    battery_num: b_num,
    tea_num: d_num,
    uncompleteRecord: result_list,
    more: false //是否还有更多记录，false说明没有更多，true说明有更多
  }
}