const got = require("got");
const moment = require("moment-timezone");

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let result = { serv_time: moment.tz("Asia/Shanghai").format("YYYY-MM-DD HH:mm:SS") };

  let tid = parseInt(event.ticket_id);

  await got('http://129.204.216.249:8080/drinkticket/change/' + tid + "/" + "true", {
    method: 'PUT',
    headers: {
      accept: "*/*"
    }
  }).then(function (res) {
    result.status = "SUCCESS";
    result.reason = "success";
  }, function (rej) {
    result.status = "FAILURE";
    result.reason = rej.toString();
  }).catch(function (err) {

    result.status = "FAILURE";
    result.reason = err.message;
  });

  return result;

}