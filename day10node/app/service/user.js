const Service = require('egg').Service;

class UserService extends Service {
    /**
     * 查找学号存不存在
     */
  async selectUser(number) {
    let num = await this.app.mysql.query('select * from userinfo where student_number= ?', [number]);
    return num;
  }
  /**
   * 注册
   */
  async register(username,password,role,student_number){
      this.app.mysql.query('insert into userinfo (username,password,role,student_number) values (?,?,?,?)',[username,password,role,student_number])
  }
  /**
   * 登录
   */
  async login(student_number,password){
      let data=this.app.mysql.query('select * from userinfo where student_number=? and password=?',[student_number,password]);
      return data;
  }
  /**
   * 获取所有学生
   */
  async students(){//除了老师的，全返回来
    return this.app.mysql.query('select * from userinfo where role not in (1)')
  }
  /**
   * 获取当天所有没有录入成绩的学生
   */
  async noevery(time){//两表联查 在用户表里用学号判断，成绩单上对应学号当天不在成绩单里的
    return this.app.mysql.query('select * from userinfo where userinfo.student_number not in (select student_number from gradetable where date_format(gradetable.time,"%Y-%m-%d")=?) and userinfo.role not in (1)',[time]);
  }
  /**
   * 删除学生
   */
  async remove(student_number){
    this.app.mysql.query('delete from userinfo where student_number=?',[student_number])
  }  
  /**
   * 修改学生信息
   */
  async editstudent(username,role,student_number,id){
    this.app.mysql.query('update userinfo set username=?,role=?,student_number=? where id=?',[username,role,student_number,id])
  }
  /**
   * 获取菜单
   */
  async menu(roleId){
    return this.app.mysql.query(`select id,menuname,munuapi from router where power like "%${roleId}%"`);
  }
}

module.exports = UserService;