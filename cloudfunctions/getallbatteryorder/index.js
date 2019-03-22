// 云函数入口文件

const got = require('got');

const moment = require('moment');

const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let result = {
    serv_time: moment().format("YYYY-MM-DD HH:mm:SS"),
    orders : null
  }

  await got('http://129.204.216.249:8080/batteryorder/get/' + wxContext.OPENID, {
    method: 'GET'
  }).then(function (resolve) {
    let list = JSON.parse(resolve.body).data;

    result.orders = list;
  });

  return result;

}