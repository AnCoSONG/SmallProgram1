/**
 * 提交废电池订单
 * 
 */


// 时间库
const moment = require('moment');

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 数据库引用

const db = cloud.database({ env: "anco001-ba193c"});

// collection 引用
const collection = db.collection("batteryOrder");


// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event);

  const wxContext = cloud.getWXContext();

  let num = event.battery.num;
  let result = {};

  await collection.add({
    data: {
      openid: wxContext.OPENID,
      raw_location: {
        place_name: event.raw_location.place_name,
        longitude: event.raw_location.longitude,
        latitude: event.raw_location.latitude
      }, 
      user_location: {
        school: "Default",
        building: event.user_location.building,
        unit: event.user_location.unit,
        room: event.user_location.room
      },
      rest_time: event.rest_time,
      battery : event.battery

    }
  }).then(res => {
    result.reason = "success";
    result.status = "SUCCESS";
    result.battery = {};
    result.battery.num = num;
  }).catch(function() {
    result.reason = "failure";
    result.status = "FAILURE";
    result.battery = {};
    result.battery.num = 0;
  });

  result.serv_time = moment().format("YYYY-MM-DD HH:mm:SS");
  return await result;

}