/**
 * 电池积分换取抓娃娃券
 * 
 * 
 */
// 规定娃娃券的有效时间
const DOLLPAPER_EFFECT = "48";

// moment
const moment = require('moment');

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// db refer
const db = cloud.database({
  env: "anco001-ba193c"
});

// collection refer
const battery_coll = db.collection("batteryLight");
const doll_coll = db.collection("dollPaper");
const rule_coll = db.collection("rule");

// command
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let result = {serv_time: moment().format("YYYY-MM-DD HH:mm:ss")};

  // 花费的积分
  let cost_light = parseInt(event.cost_light);

  // 判断积分是否足够

  let role = (await rule_coll.where({type: 0}).get()).data;
  let role_list = [];
  let curr_light = (await battery_coll.where({openid: wxContext.OPENID}).get()).data;
  let light_num = 0;

  // 取得规则文本，不存在返回fail、
  if (role.length == 0) {
    result.status = "FAILURE";
    result.reason = "未指定兑换规则，请联系管理员。";
    result.result = {
      left_light_num: 0,
      left_doll: []
    }
    return result;
  }
  else {
    role_list = role[0].inner_text.match("(.*),(.*)").slice(1, 3);
  }

  // 取得全部积分，无记录创建新纪录
  if (curr_light.length == 0) {
    battery_coll.add({
      data: {
        battery_light: 0,
        openid: wxContext.OPENID
      }
    });

  }
  else {
    light_num = curr_light[0].battery_light;
  }

  // 判断积分是否足够
  if (cost_light > light_num) {
    result.status = "FAILURE";
    result.reason = "积分不足。";
    result.result = {
      left_light_num: 0,
      left_doll: []
    };

    return result;
  }

  // 积分足够根据rule进行兑换
  // 格式化rule
  let true_rule = []
  for (let inner_rule_text of role_list) {
    let _first = inner_rule_text.match("(\\d)-.*")[1];
    let _cost = inner_rule_text.match("\\d+-(\\d+):\\d+")[1];
    let _getsome = inner_rule_text.match("\\d+-\\d+:(\\d+)")[1];

    true_rule.push({
      first: parseInt(_first),
      cost: parseInt(_cost),
      getsome: parseInt(_getsome)
    });
  }

  // 判断使用那个rule
  let rule_index = null;
  if (cost_light >= true_rule[1].first) {
    rule_index = 1;
  }  
  else {
    rule_index = 0;
  }

  // 减扣and获得
  await battery_coll.where({
    openid: _.eq(wxContext.OPENID)
  }).update({
    data: {
      battery_light: _.inc(cost_light * (-1))
    },
  });

  for (let i = 0; i < true_rule[rule_index].getsome * cost_light; i++) {
    await doll_coll.add({
      data: {
        owner: wxContext.OPENID,
        create_time: moment().format("YYYY-MM-DD HH:mm:ss"),
        effect_time: DOLLPAPER_EFFECT
      }
    });
  }

  // 查询全部剩余

  let left_light_number = (await battery_coll.where({ openid: _.eq(wxContext.OPENID) }).get()).data[0].battery_light;
  let left_doll_list = (await doll_coll.where({ owner: _.eq(wxContext.OPENID) }).get()).data;

  result.status = "SUCCESS";
  result.reason = "success";
  result.result = {}
  result.result.left_light_num = left_light_number;
  result.result.left_doll = left_doll_list;

  return result;

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}