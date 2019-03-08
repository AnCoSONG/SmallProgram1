/**
 * 获取电池的兑换规则接口
 * 
 * 
 */

// moment
const moment = require("moment");


// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database({ env: "anco001-ba193c"});

const coll = db.collection("rule");

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()


  let result = {serv_time: moment().format("YYYY-MM-DD HH:mm:ss")};

  // 获取rule, 过滤type==0
  await coll.where({type: 0}).get().then(function (res) {

    result.status = "SUCCESS";
    result.resson = "success";
    result.role_text = res.data[0].inner_text;
  }, function (res) {
    result.status = "FAILURE";
    result.reason = res.errMsg;
    result.role_text = "";
  });

  return result;

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}