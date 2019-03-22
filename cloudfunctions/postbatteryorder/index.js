/**
 * 提交废电池订单
 * over
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

  // 电池个数
  let num = event.battery.num;
  let result = {};
  result.battery = {};
  result.battery.num = num;
  result.serv_time = moment().format("YYYY-MM-DD HH:mm:SS");

  let lo = event.user_location.school + "-" + event.user_location.building + "-" + event.user_location.room;

  let resp = await got('http://129.204.216.249:8080/batteryorder/create', {
    method: 'POST',
    headers: {
      accept: "*/*" 
    },
    json: true,
    body: {
      battery_num: 0,
      free_time: event.rest_time,
      openid: wxContext.OPENID,
      realLocation: "",
      userLocation: lo,
      note: event.note == null ? "" : event.note,
      tel: event.tel
    }

  });

  // console.log(resp.body.data);

  // let resp_obj = JSON.parse(resp.body);

  result.battery.order_id = resp.body.data.id;

  return result;

}