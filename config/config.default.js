/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');
const ip = require('ip');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1554193925650_6190';

  // add your middleware config here
  config.middleware = [];

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  config.static = {
    prefix: '/caradmin/',
    dynamic: true,
  };

  config.view = {
    root: path.join(appInfo.baseDir, 'app/view'),
    mapping: {
      '.ejs': 'ejs',
    },
  };

  config.security = {
    csrf: {
      enable: false,
      // useSession: false,
      // ignoreJSON: true,
      // cookieName: 'csrfToken',
      // sessionName: 'csrfToken',
      // headerName: 'x-csrf-token',
    },
    xframe: {
      enable: false,
    },
    domainWhiteList: [
      // 'http://localhost:8080',
      // 'http://127.0.0.1:8080',
      // 'http://localhost:7001',
      // 'http://127.0.0.1:7001',
      // 'http://10.4.148.155:8080',
    ],
  };


  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
