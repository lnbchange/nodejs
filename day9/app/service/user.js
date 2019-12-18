const Service = require('egg').Service;

class UserService extends Service {
  async register(user,hexpwd,role,num){//注册
    let listdata=await this.app.mysql.query('insert into userlist (user,pwd,role,num) values (?,?,?,?)',[user,hexpwd,role,num])
  }
  async login(user,pwd){//登录
    let data=await this.app.mysql.query('select * from userlist where user=? and pwd=?',[user,pwd]);
    return data;
  }
  async find(user){//查找
    let data=await this.app.mysql.query('select * from userlist where user=?',[user]);
    return data;
  }
  async remove(id){//删除
    await this.app.mysql.query('delete from userlist where id=?',[id])
  }
}

module.exports = UserService;