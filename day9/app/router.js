'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;  
  //登录
  router.post('/api/login',controller.user.login);
  //注册
  router.post('/api/register',controller.user.register); 
  //删除
  // router.post('/api/remove',controller.user.remove);  
};
