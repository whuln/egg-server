'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('index.ejs');
  }

  async login() {
    const { ctx } = this;

    ctx.body = { username: '嬴政' };
  }
}

module.exports = HomeController;
