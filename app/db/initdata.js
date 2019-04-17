const fs = require("fs");
const xlsx = require("node-xlsx");
const crypto = require("crypto");
const LOG = require("../libs/util").LOG(false);

var { User, Role, Car } = require("./index");

async function initdata() {
  //读取数据
  var list = xlsx.parse(__dirname + "/data.xlsx"); //读取excel
  var users, roles, cars;

  //   LOG(list);
  //解析数据
  list.forEach(item => {
    switch (item.name) {
      case "users":
        users = item.data;
        break;
      case "roles":
        roles = item.data;
        break;
      case "cars":
        cars = item.data;
        break;
    }
  });
  //   LOG(roles);
  /*********添加角色roles******/
  var keys = roles[0];
  for (let i = 1; i < roles.length; i++) {
    //判断是否已经存在
    //判断该用户的account是否已经存在
    let u = await Role.findOne({
      where: {
        rolename: roles[i][0] //rolename
      }
    });
    if (u) continue;

    var obj = {};
    for (let j = 0; j < keys.length; j++) {
      obj[keys[j]] = roles[i][j];
    }

    LOG(obj);
    Role.create(obj);
  }

  /*********添加用户users******/
  keys = users[0];
  LOG(keys);

  for (let i = 1; i < users.length; i++) {
    //判断是否已经存在
    //判断该用户的account是否已经存在
    let u = await User.findOne({
      where: {
        account: users[i][0] //account
      }
    });
    if (u) continue;

    var obj = {};
    for (let j = 0; j < keys.length; j++) {
      obj[keys[j]] = users[i][j];
    }

    //计算并设置token
    let hash = crypto.createHash("md5");
    obj.token = hash.update(obj.account + obj.password).digest("hex");
    LOG(obj);
    User.create(obj);
  }

  /*********添加车辆cars******/
  keys = cars[0];
  for (let i = 1; i < cars.length; i++) {
    //判断是否已经存在
    //判断该用户的account是否已经存在
    let u = await Car.findOne({
      where: {
        number: cars[i][0] //number
      }
    });
    if (u) continue;

    var obj = {};
    for (let j = 0; j < keys.length; j++) {
      obj[keys[j]] = cars[i][j];
    }

    LOG(obj);
    Car.create(obj);
  }
}

//例子
//var datas = [];
// var data = [1, 2, 3];
// var data1 = [4, 5, 6];
// datas.push(data); //一行一行添加的 不是一列一列
// datas.push(data1);
// writeXls(datas);
// function writeXls(datas) {
//   var buffer = xlsx.build([
//     {
//       name: "sheet1",
//       data: datas
//     }
//   ]);
//   fs.writeFileSync(__dirname + "/test1.xlsx", buffer, { flag: "w" }); //生成excel
// }

LOG("init db data start...");
initdata();
LOG("init db data done...");
