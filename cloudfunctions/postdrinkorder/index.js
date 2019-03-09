/**
 * 提交奶茶订单
 */

// moment
const moment = require("moment");

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database({
  env: "anco001-ba193c"
});

const collection =  db.collection("drinkOrder");

const shop_coll = db.collection("shop");

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let result = {serv_time: moment().format("YYYY-MM-DD HH:mm:SS")};

  let flag = true;

  await shop_coll.where({
    _id: event.shop_id
  }).get().then(function (res) {
    // 处理商家不存在的情况
    if (res.data.length == 0) {
      result.status = "FAILURE";
      result.reason = "该商家不存在";
      result.shop = {};

      flag = !flag;
    }
    else {
      result.shop = res.data[0];
    }
    
  });

  // 商家不存在提前返回
  if (!flag) {
    return result;
  }

  // 商家合理增加此订单
  await collection.add({
    data: {
      openid: wxContext.OPENID,
      shop_id: event.shop_id,
      raw_location: {
        longitude: event.raw_location.longitude,
        latitude: event.raw_location.latitude
      },
      user_data: {
        drink_number: event.user_data.drink_number,
        drink_pic: {
          raw_b64: event.user_data.drink_pic
        }
      }
    }
  }).then(async function(res) {
    result.status = "SUCCESS";
    result.reason = "success";

  });

  return result;

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}