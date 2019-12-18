/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1575880668048_3770';

  // add your middleware config here
  config.middleware = ['authentication'];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    security :{
      csrf: {
        enable: false
      }
    }
   
  };
  config.mysql={//创建数据库
    client:{
      host:'localhost',
      port:'3306',
      user:'root',
      password:'root',
      database:'eggdemo'
    },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false
  }
 

  return {
    ...config,
    ...userConfig,
  };
};
