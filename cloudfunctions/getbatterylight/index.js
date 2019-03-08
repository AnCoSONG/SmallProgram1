/**
 * 获取电池积分的接口
 * 
 * 
 */

const moment = require('moment');

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 数据库
const db = cloud.database({
  env: "anco001-ba193c"
});

// 集合引用
const coll = db.collection("batteryLight");

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let resu = {
    serv_datetime: moment().format("YYYY-MM-DD HH:mm:ss")
  };

  await coll.where({openid: wxContext.OPENID}).get().then(async function(result) {
    if (result.data.length == 0) {
      resu.status = "SUCCESS";
      resu.reason = "success";

      resu.battery_light = 0;

      // 数据库未查询到说明用户第一次使用，此时新建一条记录
      await coll.add({
        data: {
          openid: wxContext.OPENID,
          battery_light: 0
        }
      });

    }
    else {
      // 正常情况
      

      resu.status = "SUCCESS";
      resu.reason = "success";

      resu.battery_light = result.data[0].battery_light;

    }
  },
  function(result) {
    resu.status = "FAILURE";
    resu.reason = result.errMsg;

    resu.battery_light = 0;

  });

  return await resu;

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}