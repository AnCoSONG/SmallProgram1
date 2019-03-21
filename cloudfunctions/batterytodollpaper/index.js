/**
 * 电池积分换取抓娃娃券
 * over
 * 
 */
// 规定娃娃券的有效时间
const DOLLPAPER_EFFECT = "48";

// got
const got = require('got');

// moment
const moment = require('moment');

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database({ env: "anco001-ba193c"});

const coll = db.collection("battery_rule");

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let result = {serv_time: moment().format("YYYY-MM-DD HH:mm:ss")};

  // 花费的积分
  let cost_light = parseInt(event.cost_light);

  // 获取当前积分数
  let resp = await got('http://129.204.216.249:8080/batterypoint/get/' + wxContext.OPENID, {
    method: 'GET',
    headers: {
      accept: "*/*"
    }
  });

  let resp_obj = JSON.parse(resp.body);

  let current_point = resp_obj.data.battery_val;

  // 检查积分个数
  if (current_point < cost_light) {
    result.status = "FAILURE";
    result.reason = "积分不足";
    result.result = {}
    result.result.left_light_num = current_point;
    result.result.left_doll = [];

    return result;
  }


  let rule_list = null;

  // 获取兑换规则
  await coll.get().then(function (res) {
    rule_list = res.data;
  });

  let rule = null;

  // 判断应该使用那种规则
  for (let r of rule_list) {
    if (r.down == -1 && cost_light >= r.over) {
      rule = r;
      break;
    }
    else {
      if (r.over <= cost_light && r.down > cost_light) {
        rule = r;
        break;
      }

    }
  }

  // 检查是否满足当前全部现有规则
  if (rule == null) {
    result.status = "FAILURE";
    result.reason = "没有满足的积分兑换规则，请检查参数";
    result.result = {}
    result.result.left_light_num = current_point;
    result.result.left_doll = [];

    return resul;
  }

  // 根据规则向内部后端提交数据
  let promise_list = []
  let new_number = current_point - cost_light;

  // 更新积分数据
  let pro_change = got('http://129.204.216.249:8080/batterypoint/change/' + wxContext.OPENID + '/' + new_number, {
    method: 'PUT',
    headers: {
      accept: "*/*"
    }
  });

  promise_list.push(pro_change);

  // 根据规则新建娃娃券
  for (let i = 0; i < rule.get * cost_light; i++) {
    let pro_item = got('http://129.204.216.249:8080/dollpaper/create', {
      method: 'POST',
      headers: {
        accept: "*/*"
      },
      json: true,
      body: {
        effect_time: DOLLPAPER_EFFECT,
        openid: wxContext.OPENID
      }
    });

    promise_list.push(pro_item); 
  }

  await Promise.all(promise_list);

  let left_doll_list = null;

  // 获取当前全部娃娃券
  resp = await got('http://129.204.216.249:8080/dollpaper/get/' + wxContext.OPENID, {
    method: 'GET',
    headers: {
      accept: "*/*"
    },

  });

  resp_obj = JSON.parse(resp.body);
  left_doll_list = resp_obj.data;

  result.status = "SUCCESS";
  result.reason = "success";
  result.result = {}
  result.result.left_light_num = new_number;
  result.result.left_doll = left_doll_list;
  result.a = rule;

  return result;

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}