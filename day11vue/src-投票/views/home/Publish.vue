<template>
    <div class="publish">
        <header>
            <span>&lt;</span>
            <span>发起投票</span>
        </header>
        <main>
            标题：<input type="text" v-model="text"><br />
            描述：<input type="text" v-model="descri"><br />
           <ul>
                <li v-for="(item,ind) in option" :key="ind">
                    {{item}}
                    <button @click="removeItem(ind)">-</button>
                </li>
            </ul>
            选项：<input type="text" v-model="list"> <button @click="addoption">+</button> <br />
            请选择单选多选：<select v-model="opt">
                <option value="1">单选</option>
                <option value="2">多选</option>
            </select>
            是否匿名：<select v-model="isit">
                <option value="1">是</option>
                <option value="2">否</option>
            </select><br />
             截止日期：<el-date-picker
                v-model="value1"
                type="date"
                placeholder="选择日期">
            </el-date-picker><br />
            <el-time-select
                v-model="value"
                :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30'
                }"
                placeholder="选择时间">
            </el-time-select><br />
            {{text}}{{descri}}{{option}}{{opt}}{{isit}}
            <button @click="pub">发布</button>
        </main>
    </div>
</template>

<script>
import http from '../../utils/request.js'
import moment from 'moment'
export default {
    data(){
        return{
            text:'',
            descri:'',
            value1: '',
            list:'',
            option:[],
            opt:1,
            value:'',
            isit:1
        }
    },
    methods:{
        addoption(){
            this.option.push(this.list);
            this.list=''
        },
        removeItem(ind){
            this.option.splice(ind,1)
        },
        pub(){
            let {uid}=JSON.parse(localStorage.getItem('userinfo'));
            let end_time = moment(this.value1).format('YYYY-MM-DD')+' '+this.value;
            console.log(end_time)
            http.post('/api/addvote',{
                title:this.text,
                uid,
                descri:this.descri,
                choiceType:this.opt,
                isitanonymous:this.isit,
                end_time,
                voteitems:this.option.join(',')
                }).then(res=>{
                if(res.data.code===2){
                    alert(res.data.msg);
                    this.$router.back();
                }
            })
        }
    },
   
}
</script>

<style lang="scss" scoped>
.publish{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
header{
    width:100%;
    height:50px;
    display:flex;
    background:skyblue;
    color:#fff;
    font-size:20px;
    span:nth-child(1){
        flex:1;
        display:flex;
        justify-content:center;
         align-items: center;
    }
    span:nth-child(2){
        flex:9;
        display:flex;
        justify-content:center;
         align-items: center;
    }
}

</style>
