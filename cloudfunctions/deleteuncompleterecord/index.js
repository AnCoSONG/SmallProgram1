// 云函数入口文件
const got = require('got');
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let type = event.type == 'battery' ? true : false;

  if (type) {
    await got('http://129.204.216.249:8080/batteryorder/delete/' + String(event.id), {
      method: 'DELETE',
      headers: {
        accept: "*/*"
      }
    });
  }
  else {
    await got('http://129.204.216.249:8080/drinkorder/delete/' + String(event.id), {
      method: 'DELETE',
      headers: {
        accept: "*/*"
      }
    });
  }

  return {
    status: 'success',
    reason: 'success'
  }
}