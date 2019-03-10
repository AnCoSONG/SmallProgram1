/**
 * 
 * 商家完成奶茶券消费
 * 
 */

// moment
const moment = require('moment');

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// database
const db = cloud.database({ env: "anco001-ba193c"});

// collection
const ticket_coll = db.collection("drinkTicket");

// command
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let result = {serv_time: moment().format("YYYY-MM-DD HH:mm:SS")};

  let t = null;
  let flag = true;

  await ticket_coll.where({
    openid: _.eq(wxContext.OPENID)
  }).get().then(function(res) {
    if (res.data.length == 0) {
      result.status = "FAILURE";
      result.reason = "该用户不存在";
      return;
    }

    result.status = "SUCCESS";
    result.reason = "success";

    // 过滤list中花费掉的奶茶券
    let n_list = [];

    for (let i of res.data[0].control_list) {
      if (i._id != event.ticket_id) {
        n_list.push(i);
      }
      else {
        flag = !flag;
      }
    }

    t = n_list;

  }, function(res) {
    result.status = "FAILURE";
    result.reason = res.errMsg;

  });

  if (flag) {
    result.status = "FAILURE";
    result.reason = "该用户不存在此奶茶券";
    return result;
  }

  await ticket_coll.where({ openid: _.eq(wxContext.OPENID) }).update({
    data: {
      control_list: t
    }
  }).catch(function (e) {
    result.status = "FAILURE";
    result.reason = e.toString();
  });

  return result;
}