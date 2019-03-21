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

  // 获取全部shop信息
  let resp = await got('http://129.204.216.249:8080/shop/all', {
    method: 'GET',
    headers: {
      accept: "*/*"
    },
  });

  let all_shops = JSON.parse(resp.body).data;


  // 并发查找相应数据
  let light_list = [];

  // 奶茶积分
  let pro_resp_point = got('http://129.204.216.249:8080/drinkpoint/get/' + wxContext.OPENID, {
    method: 'GET',
    headers: {
      accept: "*/*"
    },

  }).then(function (res) {

    let data = JSON.parse(res.body);

    for (let obj of data) {
      let _shop_id = obj.shop_id;

      let model_shop = null;
      for (let _shop of shop_list) {
        if (_shop.shop_id == _shop_id) {
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

  let pro_resp_ticket = got('http://129.204.216.249:8080/drinkpoint/get/' + wxContext.OPENID, {
    method: 'GET',
    headers: {
      accept: "*/*"
    },

  }).then(function (res) {

    let data = JSON.parse(res.body);

    for (let obj of data) {
      

    
    }

  });
  
  return result;
  
}