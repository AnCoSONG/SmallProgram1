// 云函数入口文件
const got = require('got');

const cloud = require('wx-server-sdk');

cloud.init();

const moment = require('moment');

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let iid = parseInt(event.item_id);

  let sid = parseInt(event.shop_id);

  let cost = parseInt(event.cost);

  if (cost != 6 && cost != 8) {
    result.status = "FAILURE";
    result.reason = "积分不足";

    return result;
  }

  let result = {
    serv_time: moment().format("YYYY-MM-DD HH:mm:ss"),
  }

  let resp = await got('http://129.204.216.249:8080/drinkpoint/get/' + wxContext.OPENID, {
    method: 'GET',
    json: true
  });

  let resp_obj = JSON.parse(resp.body);

  let flag = false;

  for (let i of resp_obj.data) {
    if (sid == i.shop_id) {
      if (cost >= i.point) {
        flag = true;
        
      }

      break;
    }
  }

  if (!flag) {
    result.status = "FAILURE";
    result.reason = "积分不足";

    return result;
  }

  await got('http://129.204.216.249:8080/drinkticket/create', {
    method: 'POST',
    json: true,
    body: {
      effect_time: 48,
      item_id: iid,
      openid: wxContext.OPENID,
      shop_id: sid
    }
  });



}