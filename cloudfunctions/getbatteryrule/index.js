/**
 * 获取电池的兑换规则接口
 * over
 * 
 */

// moment
const moment = require("moment-timezone");


// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database({ env: "anco001-ba193c"});

const coll = db.collection("battery_rule");

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()


  let result = {
    serv_time: moment.tz("Asia/Shanghai").format("YYYY-MM-DD HH:mm:SS"),
    status: "SUCCESS",                            
    reason: "success",                  
  };

  await coll.get().then(function(res)  {
    result.rule = res.data;
  });


  return result;

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}