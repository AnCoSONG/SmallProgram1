// 云函数入口文件
const got = require('got');

const cloud = require('wx-server-sdk');

cloud.init();

const moment = require('moment-timezone');

function getTrueItemId(shop_id, item_type) {
  if (shop_id == 0 && item_type == 0) {
    return 1;
  }
  if (shop_id == 0 && item_type == 1) {
    return 2;
  }
  if (shop_id == 1 && item_type == 0) {
    return 3;
  }
  if (shop_id == 1 && item_type == 1) {
    return 4;
  }
  if (shop_id == 2 && item_type == 0) {
    return 5;
  }
  if (shop_id == 2 && item_type == 1) {
    return 6;
  }
  if (shop_id == 3 && item_type == 0) {
    return 7;
  }
  if (shop_id == 3 && item_type == 1) {
    return 8;
  }
  if (shop_id == 4 && item_type == 0) {
    return 9;
  }
  if (shop_id == 4 && item_type == 1) {
    return 10;
  }
  if (shop_id == 5 && item_type == 0) {
    return 11;
  }
  if (shop_id == 5 && item_type == 1) {
    return 12;
  }
  if (shop_id == 6 && item_type == 0) {
    return 13;
  }

  return null;
}

function getFrontItemIdFromZero(item_id) {

  switch (item_id) {
    case 1:
      return 0;
    case 2:
      return 1;
    case 3:
      return 0;
    case 4:
      return 2;
    case 5:
      return 0;
    case 6:
      return 3;
    case 7:
      return 0;
    case 8:
      return 4;
    case 9:
      return 0;
    case 10:
      return 5;
    case 11:
      return 0;
    case 12:
      return 6;
    case 13:
      return 0;
  }

}


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let sid = parseInt(event.shop_id) + 1;

  let iid = getTrueItemId(event.shop_id, event.item_type);

  let cost = parseInt(event.cost);

  let result = {
    serv_time: moment.tz("Asia/Shanghai").format("YYYY-MM-DD HH:mm:SS"),
  }


  if (cost != 6 && cost != 8) {
    result.status = "FAILURE";
    result.reason = "积分规则不匹配";

    return result;
  }


  let resp = await got('http://129.204.216.249:8080/drinkpoint/get/' + wxContext.OPENID, {
    method: 'GET',
    json: true
  });

  let resp_obj = resp.body;


  // 检查积分是否充足
  let flag = false;
  let curr_num = 0;

  for (let i of resp_obj.data) {
    if (sid == i.shop_id) {
      if (cost <= i.point) {
        flag = true;
        curr_num = i.point;
      }

      break;
    }
  }

  if (!flag) {
    result.status = "FAILURE";
    result.reason = "积分不足";

    return result;
  }

  // 扣除奶茶积分
  let ticket = null;
  let url = 'http://129.204.216.249:8080/drinkpoint/change/' + wxContext.OPENID + '/' + sid + '/' + (curr_num - cost);

  console.log(url);

  let pro_point = got(url, {
    method: "PUT"
  }).then(function(res) {
    let obj = JSON.parse(res.body);
    result.left_point = obj.data;
    result.left_point.shop_id = result.left_point.shop_id - 1;
  });


  let pro_ticket = got('http://129.204.216.249:8080/drinkticket/create', {
    method: 'POST',
    json: true,
    body: {
      createTime: moment.tz("Asia/Shanghai").format("YYYY-MM-DD HH:mm:SS"),
      effect_time: 48,
      item_id: iid,
      openid: wxContext.OPENID,
      shop_id: sid
    }
  }).then(function (res) {
    let obj = res.body;
    ticket = obj.data;
  });

  
  await Promise.all([pro_point, pro_ticket]).then(function (res) {
    result.status = "SUCCESS";
    result.reason = "success";

    result.ticket = ticket;
    result.ticket.shop_id = result.ticket.shop_id - 1;
    result.ticket.item_id = getFrontItemIdFromZero(result.ticket.item_id);
  });

  return result;

}