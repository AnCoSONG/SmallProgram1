/**
 * 
 * 获取奶茶券和全部商家的奶茶积分
 * 
 */
// got
const got = require("got");

// moment
const moment = require("moment");

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let result = {
    serv_time: moment().format("YYYY-MM-DD HH:mm:SS"),
    drink: {},
    tickets: []
  };

  let pro_resp_ = got
  
  return result;
  
}