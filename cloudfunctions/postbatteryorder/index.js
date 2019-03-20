/**
 * 提交废电池订单
 * 
 */

// wx
const got = require('got');

// 时间库
const moment = require('moment');

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event);

  const wxContext = cloud.getWXContext();

  let num = event.battery.num;
  let result = {};
  result.battery = {};

  await request.get('http://localhost:8080/shop/all',await function (error, response, body) {
     result.error = error;
     result.response = response;
     result.body = body;
  });

  result.serv_time = moment().format("YYYY-MM-DD HH:mm:SS");
  return result;

}