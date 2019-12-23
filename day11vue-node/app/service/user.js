const Service = require('egg').Service;

class UserService extends Service {
  /**
   * 查找用户
   */
  async selectUser(user,pwd){
      return await this.app.mysql.query('select * from user where username=? and password=?',[user,pwd])
  }
  /**
   * 注册用户
   */
  async registry(user,pwd){
      await this.app.mysql.query('insert into user (username,password) values (?,?)',[user,pwd])
  }
  /**
   * 登录
   */
  async login(user,pwd){
      return await this.app.mysql.query('select * from user where username=? and password=?',[user,pwd])
  }
}

module.exports = UserService;