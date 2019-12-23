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
  //投票
  router.post('/api/addvote',controller.vote.addvote);
  //获取投票列表
  router.get('/api/getvote',controller.vote.getvote);
  //获取选项
  router.get('/api/getitems',controller.vote.getitems);
  //投票
  router.post('/api/vote',controller.vote.vote);
  //获取我发起的投票
  router.get('/api/getMyVote',controller.vote.getMyVote);
};
