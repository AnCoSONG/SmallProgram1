/**
 * 获去抓娃娃券的信息
 * 
 */
// 云函数入口文件
const moment = require('moment');

const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database({
  env: "anco001-ba193c"
});

const coll = db.collection("dollPaper");


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let result = {
    serv_time: moment().format("YYYY-MM-DD HH:mm:ss")
  }

  await coll.where({ owner: wxContext.OPENID }).get().then(function(res) {
    result.doll_paper = res.data;

    result.status = "SUCCESS";
    result.reason = "success";
  }, function(res) {
    result.doll_paper = [];

    result.status = "FAILURE";
    result.reason = res.errMsg;
  } );



  return result;
  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}