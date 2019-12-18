const Service = require('egg').Service;

class ScoreService extends Service {
    /**
     * 录入成绩
     */
    async schoolgrades(username,theory,skill,time,student_number){
        await this.app.mysql.query('insert into gradetable (username,theory,skill,time,student_number) values (?,?,?,?,?)',[username,theory,skill,time,student_number])
    }
    /**
     * 获取当天成绩列表
     */
    async gradeslist(time){
        return this.app.mysql.query('select * from gradetable where date_format(time,"%Y-%m-%d")=?',[time])        
    }
    /**
     * 修改个人成绩
     */
    async gradesedit(students_number,theory,skill,time){
        await this.app.mysql.query('update gradetable set theory=?,skill=? where student_number=? and date_format(time,"%Y-%m-%d")=?',[theory,skill,students_number,time])
    }
    /**
     * 模糊搜索
     */
    async search(keyword,time){       
        return this.app.mysql.query(`select * from gradetable where username like "%${keyword}%" and date_format(time,"%Y-%m-%d")="${time}"`)
    }
    /**
     * 删除学生当天成绩
     */
    async delete(student_number,time){
        this.app.mysql.query('delete from gradetable where student_number=? and date_format(time,"%Y-%m-%d")=?',[student_number,time])
    }
    /**
     * 获取个人本月理论技能成绩
     */
    async personslist(student_number){
        return this.app.mysql.query('select * from gradetable where student_number=?',[student_number])
    }
    /**
     * 获取当天成绩分布
     */     
     async distribution(type,item){
        let {ctx} = this;
        let time = ctx.helper.timer();
        let big = item.split('-')[1];
        let small = item.split('-')[0];
        //0-70  71-80  理论  技能

        let sql = 'select count(*) from gradetable where date_format(time,"%Y-%m-%d")=? and (';

        sql += `${type}<=${big} and ${type}>=${small})`;

        console.log(sql);

        return this.app.mysql.query(sql,[time])
    }
    /**
     * 获取学生当天的成绩
     */
    async student(student_number,time){
        return this.app.mysql.query('select * from gradetable where student_number=? and date_format(time,"%Y-%m-%d")=?',[student_number,time])
    }
    /**
     * 柄图
     */
    async success(){
        let {ctx}=this;
        let time=ctx.helper.timer();
       return await this.app.mysql.query('select * from gradetable where date_format(time,"%Y-%m-%d")=?',[time])
      }
}

module.exports=ScoreService;