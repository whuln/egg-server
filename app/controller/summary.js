'use strict';
const { Car, CarDispatchForm, Summary } = require('../db');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Controller = require('egg').Controller;

class SummaryController extends Controller {
  async getSummary() {
    const { ctx } = this;
    const data = ctx.request.body;
    const d_min = data.d_min, d_max = data.d_max;
    const id = d_min +"-"+ d_max;

    console.log(d_min);
    const minDate = d_min.split('/'),
      maxDate = d_max.split('/');

    let result = null;

    console.log(minDate);
    // 缓存
    result = await Summary.findOne({
      where: {
        id: id
      }
    });

    if (!result) {
      console.log("执行统计")
      // 无缓存
      result = await _sum();
      console.log(result);
      result[0].data[0].key = id;
      result = JSON.stringify(result)

      await Summary.upsert({ id: id, data: result })
    }

    ctx.body = result;


    async function _sum() {
      try {
        let srZongji = {},
          srCar = {},
          srDriver = {},
          srDepartment = {};

        srZongji.distance = 0.0;
        srZongji.times = 0;
        srZongji.places = '';

        let rs = await CarDispatchForm.findAll({
          where: {
            actualtime1: {
              [Op.gte]: new Date(d_min)
            },
            actualtime2: {
              [Op.lte]: new Date(d_max)
            }
          }
        });
        console.log('--------caruseform-length------------' + rs.length);

        rs.forEach(el => {
          // 总计汇总
          srZongji.distance += parseFloat(el.kilometres2) - parseFloat(el.kilometres1);
          srZongji.times += 1;
          srZongji.places += el.places + ',';

          // 汇总车辆
          if (!srCar.hasOwnProperty(el.carnumber)) {
            srCar[el.carnumber] = {}
            srCar[el.carnumber].distance = 0.0;
            srCar[el.carnumber].times = 0;
            srCar[el.carnumber].places = '';
          }
          srCar[el.carnumber].distance += parseFloat(el.kilometres2) - parseFloat(el.kilometres1);
          srCar[el.carnumber].times += 1;
          srCar[el.carnumber].places += el.places + ',';

          // 汇总司机
          if (!srDriver.hasOwnProperty(el.driveraccount)) {
            srDriver[el.driveraccount] = {}
            srDriver[el.driveraccount].distance = 0.0;
            srDriver[el.driveraccount].times = 0;
            srDriver[el.driveraccount].places = '';
          }
          srDriver[el.driveraccount].distance += parseFloat(el.kilometres2) - parseFloat(el.kilometres1);
          srDriver[el.driveraccount].times += 1;
          srDriver[el.driveraccount].places += el.places + ',';

          // 汇总部门
          if (!srDepartment.hasOwnProperty(el.department)) {
            srDepartment[el.department] = {}
            srDepartment[el.department].distance = 0.0;
            srDepartment[el.department].times = 0;
            srDepartment[el.department].places = '';
          }
          srDepartment[el.department].distance += parseFloat(el.kilometres2) - parseFloat(el.kilometres1);
          srDepartment[el.department].times += 1;
          srDepartment[el.department].places += el.places + ',';
        });
        //  console.log(srZongji)
        //  console.log(srCar)
        //  console.log(srDepartment)
        //  console.log(srDriver)

        // 组织数据
        let r = [];
        srZongji.distance = srZongji.distance.toFixed(2);
        r[0] = {
          type: '总计',
          data: [srZongji]
        };

        r[1] = {
          type: '车辆',
          data: []
        }
        for (let val of Object.keys(srCar)) {
          let _item = srCar[val]

          r[1].data.push({
            key: val,
            distance: _item.distance.toFixed(2),
            times: _item.times,
            places: _item.places
          });
        }

        r[2] = {
          type: '部门',
          data: []
        }
        for (let val of Object.keys(srDepartment)) {
          let _item = srDepartment[val]
          r[2].data.push({
            key: val,
            distance: _item.distance.toFixed(2),
            times: _item.times,
            places: _item.places
          });
        }

        r[3] = {
          type: '司机',
          data: []
        }
        for (let val of Object.keys(srDriver)) {
          let _item = srDriver[val]
          r[3].data.push({
            key: val,
            distance: _item.distance.toFixed(2),
            times: _item.times,
            places: _item.places
          });
        }

        // console.log(JSON.stringify(r));
        return r;
      } catch (error) {
        console.log(error);
        return '';
      }
    }

  }
}

module.exports = SummaryController;
