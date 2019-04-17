'use strict';
const { CarDispatchForm, User, Car, sequelize } = require('../db');
const crypto = require('crypto');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Controller = require('egg').Controller;

class CaruseformController extends Controller {
  // 用车人员获取用车信息
  async userGetCaruseform() {
    const { ctx } = this;
    // useraccount, isback = null
    const data = ctx.request.body;
    //  console.log(data);
    let cuf = await CarDispatchForm.findOne({
      where: {
        useraccount: data.useraccount,
        isback: false
      }
    });

    if (cuf) {
      let r = cuf.get({ plain: true });

      if (r.useraccount) {
        let u = await User.findOne({
          where: {
            account: r.useraccount
          }
        });
        r.user = u.get({ plain: true });
      }

      if (r.driveraccount) {
        let u = await User.findOne({
          where: {
            account: r.driveraccount
          }
        });
        r.driver = u.get({ plain: true });
      }

      if (r.yuanlingdao) {
        let u = await User.findOne({
          where: {
            account: r.yuanlingdao
          }
        });
        r.yld = u.get({ plain: true });
      }

      ctx.body = { code: 0, msg: r };
    } else {
      ctx.body = { code: 1, msg: '当前没有用车！' };
    }
  }
  // 司机获取用车信息
  async driverGetCaruseform() {
    const { ctx } = this;
    // useraccount, isback = null
    const data = ctx.request.body;
    console.log(data);
    let cuf = await CarDispatchForm.findOne({
      where: {
        driveraccount: data.driveraccount,
        isback: false
      }
    });

    if (cuf) {
      let r = cuf.get({ plain: true });

      if (r.useraccount) {
        let u = await User.findOne({
          where: {
            account: r.useraccount
          }
        });
        r.user = u.get({ plain: true });
      }

      if (r.driveraccount) {
        let u = await User.findOne({
          where: {
            account: r.driveraccount
          }
        });
        r.driver = u.get({ plain: true });
      }

      if (r.yuanlingdao) {
        let u = await User.findOne({
          where: {
            account: r.yuanlingdao
          }
        });
        r.yld = u.get({ plain: true });
      }

      ctx.body = { code: 0, msg: r };
    } else {
      ctx.body = { code: 1, msg: '没有未完成的用车申请' };
    }
  }
  // 部门主任、主管领导获取用车信息
  async dmGetCaruseform() { 
    const { ctx } = this;
    // useraccount, isback = null
    const data = ctx.request.body;
    let where = {};
    console.log(data);
    if (data.department) {
      where.department = data.department;
      where.isdmagree = false;
    }

    if (data.isshengwai) {
      where.isshengwai = data.isshengwai;
      where.isdmagree = true;
      where.yldagree = false;
    }

    let cufs = await CarDispatchForm.findAll({
      where: where
    });
    console.log(cufs.length);
    if (cufs.length) {
      var rs = [];
      for (let i = 0; i < cufs.length; i++) {
        let cuf = cufs[i];
        let r = cuf.get({ plain: true });

        if (r.useraccount) {
          let u = await User.findOne({
            where: {
              account: r.useraccount
            }
          });
          r.user = u.get({ plain: true });
        }

        if (r.driveraccount) {
          let u = await User.findOne({
            where: {
              account: r.driveraccount
            }
          });
          r.driver = u.get({ plain: true });
        }

        if (r.yuanlingdao) {
          let u = await User.findOne({
            where: {
              account: r.yuanlingdao
            }
          });
          r.yld = u.get({ plain: true });
        }

        rs.push(r);
      }

      ctx.body = { code: 0, msg: rs };
    } else {
      ctx.body = { code: 1, msg: '您没有未完成的用车申请' };
    }
  }
  // 管理员获取用车信息
  async adminGetCaruseform()  { 
    const { ctx } = this;
    // useraccount, isback = null
    let where = {
      isreceived: false,
      [Op.or]: [
        { isshengwai: false, isdmagree: true },
        { isshengwai: true, yldagree: true }
      ]
    };

    let cufs = await CarDispatchForm.findAll({
      where: where
    });

    console.log(cufs.length);
    if (cufs.length) {
      var rs = [];
      for (let i = 0; i < cufs.length; i++) {
        let cuf = cufs[i];
        let r = cuf.get({ plain: true });

        if (r.useraccount) {
          let u = await User.findOne({
            where: {
              account: r.useraccount
            }
          });
          r.user = u.get({ plain: true });
        }

        if (r.driveraccount) {
          let u = await User.findOne({
            where: {
              account: r.driveraccount
            }
          });
          r.driver = u.get({ plain: true });
        }

        if (r.yuanlingdao) {
          let u = await User.findOne({
            where: {
              account: r.yuanlingdao
            }
          });
          r.yld = u.get({ plain: true });
        }

        rs.push(r);
      }

      ctx.body = { code: 0, msg: rs };
    } else {
      ctx.body = { code: 1, msg: '您没有未完成的用车申请' };
    }
  }
  // 用车人填写车辆申请信息
  async userAddCaruseform() {
    const { ctx } = this;
    const data = ctx.request.body;
    let r = null;

    try {
      let result = await sequelize.transaction(function(t) {
        return CarDispatchForm.create(data, { transaction: t });
      });
      r = result; // cardispatchform
    } catch (err) {
      r = err; // [Function: UniqueConstraintError]
    }
    //  console.log(typeof r.constructor.name);
    if ('cardispatchform' == r.constructor.name) {
      ctx.body = { code: 0, msg: '车辆申请添加成功！' };
    } else {
      ctx.body = { code: 1, msg: '车辆申请添加失败！' };
    }
  }

  // 修改车辆申请信息
  async upsertCaruseform() {
     const { ctx } = this;
    const data = ctx.request.body;
    console.log(data);
    try {
      await sequelize.transaction(function(t) {
        let tasks = [];
        tasks.push(CarDispatchForm.upsert(data, { transaction: t }));
        if (data.isback) {
          console.log('come back');
          tasks.push(
            User.upsert(
              { account: data.driveraccount, state: false },
              { transaction: t }
            )
          );

          tasks.push(
            Car.upsert(
              { number: data.carnumber, state: false },
              { transaction: t }
            )
          );
        } else {
          if (data.driveraccount) {
            tasks.push(
              User.upsert(
                { account: data.driveraccount, state: true },
                { transaction: t }
              )
            );
          }
          if (data.carnumber) {
            tasks.push(
              Car.upsert(
                { number: data.carnumber, state: true },
                { transaction: t }
              )
            );
          }
        }

        return Promise.all(tasks);
      });
      ctx.body = { code: 0, msg: '用车信息修改成功！' };
    } catch (err) {
      ctx.body = { code: 1, msg: '用车信息修改失败！' };
    }
  }
}

module.exports = CaruseformController;
