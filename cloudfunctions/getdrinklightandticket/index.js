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
  };

  // 获取全部shop信息
  let resp = await got('http://129.204.216.249:8080/shop/all', {
    method: 'GET',
    headers: {
      accept: "*/*"
    },
  });

  let all_shops = JSON.parse(resp.body).data;


  // 获取全部shop信息
  resp = await got('http://129.204.216.249:8080/item/all', {
    method: 'GET',
    headers: {
      accept: "*/*"
    },
  });

  let all_items = JSON.parse(resp.body).data;

  // 并发查找相应数据
  let light_list = [];

  // 奶茶积分
  let pro_resp_point = got('http://129.204.216.249:8080/drinkpoint/get/' + wxContext.OPENID, {
    method: 'GET',
    headers: {
      accept: "*/*"
    },

  }).then(function (res) {

    // console.log(res.body);

    let data = JSON.parse(res.body);

    for (let obj of data.data) {
      let _shop_id = obj.shop_id;

      let model_shop = null;
      for (let _shop of all_shops) {
        if (_shop.id == _shop_id) {
          model_shop = _shop;
          break;
        }
      }

      // 存储结果
      light_list.push({
        number: obj.point,
        shop: model_shop
      });
    }

  });

  // 查找奶茶券数据
  let ticket_list = [];
  let pro_resp_ticket = got('http://129.204.216.249:8080/drinkticket/get/openid/' + wxContext.OPENID, {
    method: 'GET',
    headers: {
      accept: "*/*"
    },

  }).then(function (res) {

    let data = JSON.parse(res.body);

    for (let obj of data.data) {
      
      let shopid = obj.shop_id;
      let itemid = obj.item_id;

      console.log(shopid);
      console.log(itemid);

      let _shop_model = null;
      let _item_model = null;

      for (let __item of all_items) {
        if (__item.id == itemid) {
          _item_model = __item;
          break;
        }
      }
    
      for (let __shop of all_shops) {
        if (__shop.id == shopid) {
          _shop_model = __shop;
          break;
        }
      }

      console.log(_shop_model);
      console.log(_item_model);

      ticket_list.push({
        id: obj.id,
        create_time: obj.createTime,
        effect_time: obj.effect_time,
        item: _item_model,
        shop: _shop_model,
        done: obj.done,
        valid: obj.valid
      });

    }

  });

  let all = [pro_resp_point, pro_resp_ticket];

  await Promise.all(all);
  
  result.drink.lights = light_list;
  result.drink.tickets = ticket_list;
  result.status = "SUCCESS";
  reason = "success";

  return result;
  
}