/**
 * 
 * 
 * 获取奶茶兑换规则
 */
// moment
const moment = require("moment");

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// database
const db = cloud.database({ env: "anco001-ba193c"});

// collection
const coll = db.collection("rule");

// command
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let result = {serv_time: moment().format("YYYY-MM-DD HH:mm:SS")};

  await coll.where({type: _.eq("1")}).get().then(
    function(res) {
      result.status = "SUCCESS";
      result.reason = "success";

      result.rules = {};

      let inner_text = res.data[0].inner_text;

      let raw_list = inner_text.match(/(.*),(.*)/);

      result.rules.single = raw_list[1].substr(2);
      result.rules.recommand = raw_list[2].substr(2);

    },
    function(res) {
      result.status = "FAILURE";
      result.reason = res.errMsg;
      result.rules = {};
      result.rules.single = "";
      result.rules.recommand = "";
    } 
  );

  return result;

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}