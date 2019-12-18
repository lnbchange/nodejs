'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  //注册
  router.post('/api/register',controller.user.register);
  //登录
  router.post('/api/login',controller.user.login);
  //获取所有的学生
  router.get('/api/students',controller.user.students);
  //获取当天所有没有录入成绩的学生
   router.get('/api/noevery',controller.user.noevery);
  //删除学生
  router.post('/api/remove',controller.user.remove);
  //修改学生信息
  router.post('/api/editstudent',controller.user.editstudent);
  //录入成绩
  router.post('/api/schoolgrades',controller.score.schoolgrades);
  //获取当天成绩列表
  router.get('/api/gradeslist',controller.score.gradeslist);
  //修改个人成绩
  router.post('/api/gradesedit',controller.score.gradesedit);
  //模糊搜索
  router.get('/api/search',controller.score.search);
  //删除学生当天成绩
  router.post('/api/delete',controller.score.delete);
  //返回页面
  router.get('/api/menu',controller.user.menu);
  //获取个人本月理论技能成绩
  router.get('/api/personslist',controller.score.personslist);
  //获取当天成绩分布图
  router.get('/api/distribution',controller.score.distribution);
  //获取学生当天的成绩
  router.get('/api/student',controller.score.student);
  //柄图
  router.get('/api/success',controller.score.success);
};
