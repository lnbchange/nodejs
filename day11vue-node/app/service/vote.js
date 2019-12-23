const Service = require('egg').Service;

class VoteService extends Service {
    /**
     * 投票
     */
    async addvote(title,descri,type,isit,end,uid,create){
       return await this.app.mysql.query('insert into addvote (title,descri,choiceType,isitanonymous,end_time,uid,create_time) values (?,?,?,?,?,?,?)',[title,descri,type,isit,end,uid,create])
    }
    /**
     * 选项
     */
    async addItems(text,uid){
       return await this.app.mysql.query('insert into voteitems (text,uid,count) values (?,?,?)',[text,uid,0])
    }
    /**
     * 获取投票数据
     */
    async getvote(type,pageNum,limit){
        let startIndex=(pageNum-1)*limit;//起始页码
        let sql='select * from addvote ';//做条件判断
        if(type==='1'){//进行中
            sql+='where (select CURDATE())<end_time '
        }else if(type==='2'){//已截止
            sql+='where (select CURDATE())>=end_time '
        }
        sql+=`limit ${startIndex},${limit}`//分页
        return await this.app.mysql.query(sql)
    }
    /**
     * 获取总条数
     */
    async total(type){
        let sql='select count(*) from addvote ';
        if(type==='1'){//进行中
            sql+='where (select CURDATE())<end_time '
        }else if(type==='2'){//结束
            sql+='where (select CURDATE())>=end_time '
        }
        return await this.app.mysql.query(sql)
    }
    /**
     * 获取选项
     */
    async getitems(uid){
        return await this.app.mysql.query('select * from voteitems where uid=?',[uid])
    }
    /**
     * 投票
     */
    async vote(id){
        await this.app.mysql.query('update voteitems set count=count+1 where id=?',[id])
    }
    /**
     * 获取我发起的投票
     */
    async getMyVote(uid){
        return await this.app.mysql.query('select * from addvote where uid=?',[uid])
    }
}

module.exports = VoteService;