'use strict';
const egg = require('egg');
const Collection = require('../lib/db/collection');
const Query = require('../lib/db/query');
module.exports = class ArticeService extends egg.Service {
  constructor(ctx) {
    super(ctx);
    this.ctx = ctx;
    this.colllection = new Collection(ctx.db, 'user');
  }
  getUserList(json = {}) {
    const { username } = json;
    const query = new Query();
    query.where.username = username;  
    query.pageIndex = pageIndex;
    query.pageSize = pageSize;
    return this.colllection.getPager(query);
  }
  saveUser(json) {
    if (json.id) {
      return this.colllection.update({ id: json.id }, json);
    }
    json.id = this.ctx.db.getUniqueId();
    this.colllection.add(json);
    return json.id;
  }
  deleteUser(id) {
    return this.colllection.delete({ id });
  }
};