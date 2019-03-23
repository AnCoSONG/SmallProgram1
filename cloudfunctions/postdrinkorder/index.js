/**
 * 提交奶茶订单
 */

// got
const got = require("got");

// moment
const moment = require("moment-timezone");

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let result = {
    shop: {},
    serv_time: moment.tz("Asia/Shanghai").format("YYYY-MM-DD HH:mm:SS")
  };

  // 检查shop_id的合法性
  let shop_list = null;

  let resp = await got('http://129.204.216.249:8080/shop/all', {
    method: 'GET',
    headers: {
      accept: "*/*"
    },

  });
 
  let resp_obj = JSON.parse(resp.body);

  shop_list = resp_obj.data;

  let shop_obj = null;

  for (let shop of shop_list) {
    if (shop.id == parseInt(event.shop_id)) {
      shop_obj = shop;
     break; 
    }
  }

  if (shop_obj == null) {
    result.status = "FAILURE";
    result.reason = "商家不存在，请检查参数";
    result.shop = {};

    return result;
  }


  // 提交奶茶订单
  await got('http://129.204.216.249:8080/drinkorder/create', {
    method: 'POST',
    headers: {
      accept: "*/*"
    },
    json: true,
    body: {
      createTime: moment().tz("Asia/Shanghai").format("YYYY-MM-DD HH:mm:SS"),
      cup_id: event.user_data.drink_number,
      img_url: event.user_data.drink_pic.fileID,
      openid: wxContext.OPENID,
      shop_id: shop_obj.id
    }

  });

  result.status = "SUCCESS";
  result.reason = "success";
  result.shop = shop_obj;

  return result;

}