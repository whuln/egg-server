'use strict';
const { User, Role } = require('../db');
const crypto = require('crypto');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Controller = require('egg').Controller;

class UserController extends Controller {
  async login() {
    const { ctx } = this ;
    const data = ctx.request.body;
    // let data = ctx.request.query,
      
    const hash = crypto.createHash('md5');
    const token = hash.update(data.account + data.password).digest('hex');   

    //  根据用户名密码，获取用户所有信息，用户的access信息。
    // let req = JSON.parse(ctx.req.body)
    const user = await User.findOne({     
      where: {
        token,
      }
    });

    // console.log(user);

    if (!user) {
      ctx.body = { code: 1, msg: '用户名或密码不正确！' };
    } else {
      ctx.body = { code: 0, msg: { token } };
    }
  }

  async getUserinfo() {
    const { ctx } = this ;
    const data = ctx.request.body;
    // let data = ctx.request.query,
    const token = data.token;
    //  根据用户名密码，获取用户所有信息，用户的access信息。 
    // let req = JSON.parse(ctx.req.body)
    const user = await User.findOne({
      include: [
        {
          model: Role
        }
      ],
      where: {
        token,
      }
    });

    // console.log(user);

    if (!user) {
      ctx.body = { code: 1, msg: '用户不存在！' };
    } else {
      ctx.body = { code: 0, msg: user.get({ plain: true }) };
    }
  }

  async addUser() {
    const { ctx } = this ;
    const data = ctx.request.body;
    //console.log(data);
    const hash = crypto.createHash('md5');
    const token = hash.update(data.account + data.password).digest('hex');
    data.token = token;

    let r = await User.create(data);
    if (r) {
      ctx.body = { code: 0, msg: '用户添加成功！' };
    } else {
      ctx.body = { code: 1, msg: '用户添加失败！' };
    }
  }

  async updateUser() {
    const { ctx } = this ;
    const data = ctx.request.body;
    if (data.password) {
      const hash = crypto.createHash('md5');
      data.token = hash.update(data.account + data.password).digest('hex');
      delete data.password;
    }
    let r;
    try {
      await User.upsert(data);
      r = { code: 0, msg: '修改成功！' };
    } catch (err) {
      r = { code: 1, msg: '修改失败！' };
    }
    ctx.body = r;
  }

  async deleteUser() {
    const { ctx } = this ;
    const data = ctx.request.body;
    // console.log(data);
    let r;
    try {
      await User.destroy({ where: { account: { [Op.eq]: data.account } } });
      r = { code: 0, msg: '删除成功！' };
    } catch (err) {
      r = { code: 1, msg: '删除失败！' };
    }
    ctx.body = r;
  }

  async findOne() {
    const { ctx } = this;
    const data = ctx.request.body;
    let where = {};

    if (data.account) {
      where.account = {
        [Op.eq]: data.account
      };
    }

    if (data.rolename) {
      where.rolename = {
        [Op.eq]: data.rolename
      };
    }

    if (data.department) {
      where.department = {
        [Op.eq]: data.department
      };
    }
    if (data.state) {
      where.state = {
        [Op.eq]: data.state
      };
    }
    let u = await User.findOne({
      where: where
    });

    if (u) {
      ctx.body = { code: 0, msg: u.get({ plain: true }) };
    } else {
      ctx.body = { code: 1, msg: '没有此用户！' };
    }
  }

  async findUsers() {
    const { ctx } = this;
    const data = ctx.request.body;
    let users;
    if (data) {
      let where = {};
      if (data.account) {
        where.account = {
          [Op.like]: '%' + data.account + '%'
        };
      }

      if (data.rolename) {
        where.rolename = {
          [Op.eq]: data.rolename
        };
      }

      if (data.department) {
        where.department = {
          [Op.eq]: data.department
        };
      }
      if (data.state) {
        where.state = {
          [Op.eq]: data.state
        };
      }
      users = await User.findAll({
        where: where
      });
    } else {
      users = await User.findAll();
    }

    if (users) {
      ctx.body = { code: 0, msg: JSON.stringify(users) };
    } else {
      ctx.body = { code: 1, msg: '没有用户！' };
    }
  }
  // async saveUser() {
  //   const { ctx } = this ;
  //   ctx.body = this.service.user.saveUser(ctx.request.body);  
  //   // ctx.body = 'post';
  // }
}

module.exports = UserController;
