'use strict';
const { User, Role } = require('./index');
const crypto = require('crypto');

async function add() {
  // await Role.create({
  //   rolename: '超级管理员',
  //   accesses: '1,2,3,4,5,6,7,8,9'
  // });
  const hash = crypto.createHash('md5');
  await User.create({
    account: 'superadmin',
    name: '超级管理员',
    token: hash.update('superadmin123').digest('hex'),
    rolename:'超级管理员'

  })
} 


add()