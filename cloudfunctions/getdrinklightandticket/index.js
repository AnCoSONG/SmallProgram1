/**
 * 
 * 获取奶茶券和全部商家的奶茶积分
 * 
 */

// moment
const moment = require("moment");

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// database

const db = cloud.database({
  env: "anco001-ba193c"
})

const light_coll = db.collection("drinkLight");

const ticket_coll = db.collection("drinkTicket");

const shop_coll = db.collection("shop");

const control_coll = db.collection("drinkControl");

const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let result = {
    serv_time: moment().format("YYYY-MM-DD HH:mm:SS"),
    drink: {},
    tickets: []
  };

  // 处理奶茶积分
  let light_promise = light_coll.where({
    openid: _.eq(wxContext.OPENID)
  }).get().then(async function (res) {
    let result_list = [];
    for (let it of res.data[0].shop_and_light) {

      // 根据shopid得到具体的shop信息
      await shop_coll.where({
        _id: _.eq(it.shop_id)
      }).get().then(function(res) {
        result_list.push({
          number: it.number,
          shop: {
            _id: res.data[0]._id,
            name: res.data[0].name,
            other_name: res.data[0].other_name
          }
        });
      });


    }
    result.drink.lights = result_list;
  }, function(res) {});

  // 处理奶茶券
  let tickets_promise = ticket_coll.where({
    openid: _.eq(wxContext.OPENID)
  }).get().then(async function(res) {

    let ticket_list_result = [];

    // 根据control_id 定位shop和item
    for (let contr of res.data[0].control_list) {
      let item_result = {
        _id: contr.control_id,
        create_time: contr.create_time,
        effect_time: contr.effect_time,
        shop: {},
        item: {}
      };
      
      // 获取shop_id和item信息
      await control_coll.where({
        _id: _.eq(contr.control_id)
      }).get().then(async function(res) {
        // 拿到item全部信息
        item_result.item.type = res.data[0].item.type;
        item_result.item.name = res.data[0].item.name;

        // 拿到shop_id
        let _sid = res.data[0].shop_id;

        // 定位shop的具体信息
        await shop_coll.where({
          _id: _.eq(_sid)
        }).get().then(function(res) {
          item_result.shop._id = res.data[0]._id;
          item_result.shop.name = res.data[0].name;
          item_result.shop.other_name = res.data[0].other_name;
        });
      });

      // 整理信息
      ticket_list_result.push(item_result);
    }

    // 存入结果中
    result.tickets = ticket_list_result;
  }, function(res) {});

  // 等待前两个异步任务结束
  await Promise.all([light_promise, tickets_promise]);
  
  return result;
  

}