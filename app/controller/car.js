'use strict';
const { Car } = require('../db');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Controller = require('egg').Controller;

class CarController extends Controller {
   async addCar() {
    const { ctx } = this;
    const data = ctx.request.body;

    let r = await Car.create(data);
    if (r) {
      ctx.body = { code: 0, msg: '车辆添加成功！' };
    } else {
      ctx.body = { code: 1, msg: '车辆添加失败！' };
    }
  }

   async updateCar() {
    const { ctx } = this;
    const data = ctx.request.body;
    let r;
    try {
      await Car.upsert(data);
      r = { code: 0, msg: '车辆修改成功！' };
    } catch (err) {
      r = { code: 1, msg: '车辆修改失败！' };
    }

    ctx.body = r;
  }

   async deleteCar() {
    const { ctx } = this;
    const data = ctx.request.body;
    // console.log(data);
    let r;
    try {
      await Car.destroy({ where: { number: { [Op.eq]: data.carnumber } } }); //将表内userId等于23的元组删除
      r = { code: 0, msg: '车辆删除成功！' };
    } catch (err) {
      r = { code: 1, msg: '车辆删除失败！' };
    }
    ctx.body = r;
  }
   async findOne() {
    const { ctx } = this;
    const data = ctx.request.body;
    let where = {};
    if (data.carnumber) {
      where.number = {
        [Op.eq]: data.carnumber
      };
    } else {
      where.number = null;
    }

    let u = await Car.findOne({
      where: where
    });

    if (u) {
      ctx.body = { code: 0, msg: u.get({ plain: true }) };
    } else {
      ctx.body = { code: 1, msg: '没有此车辆！' };
    }
  }
   async findcars() {
    const { ctx } = this;
    const data = ctx.request.body;
    let where = {}, cars;
    if (data) {
      if (data.number) {
        where.number = {
          [Op.like]: '%' + data.number + '%'
        };
      }

      if (data.state) {
        where.state = {
          [Op.eq]: data.state
        };
      }
      if (data.nofp) {
        where.nofp = {
          [Op.eq]: data.nofp
        };
      }

      cars = await Car.findAll({
        where: where
      });
    } else {
      cars = await Car.findAll();
    }

    if (cars.length) {
      ctx.body = { code: 0, msg: JSON.stringify(cars) };
    } else {
      ctx.body = { code: 1, msg: '没有车辆！' };
    }
  }
}

module.exports = CarController;
