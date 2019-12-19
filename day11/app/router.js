'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  //注册
  router.post('/api/registry',controller.user.registry);
  //登录
  router.post('/api/login',controller.user.login);
};
