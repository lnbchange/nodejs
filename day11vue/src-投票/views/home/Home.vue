<template>
    <div class="home">
        <header>
            <span @click="$router.go(-1)">&lt;</span>
            <span>所有投票</span>
            <span @click="$router.push('/publish')">发起投票</span>
        </header>
        <nav>
            <span v-for="(item,index) in datalist" :key="index" @click="tab(item.type)">{{item.title}}</span>
        </nav>
        <main>
            <p v-for="item in votelist" :key="item.id" @click="$router.push({name:'detail',query:{id:item.id,list:item}})">
                {{item.id}}
                <span>截止时间{{item.end_time}}</span>
                <span>{{item.title}}</span>
                <span v-if="item.choiceType==='2'">多选</span>
                <span v-else>单选</span>
            </p>
        </main>
        <a href="/myvote">我的投票</a>
    </div>
</template>

<script>
import http from '../../utils/request.js'
export default {
    data(){
        return {
            datalist:[
                {
                    title:'全部',
                    type:0
                },
                {
                    title:'正在进行中',
                    type:1
                },
                {
                    title:'已结束',
                    type:2
                }
            ],
            votelist:[],
            total:''
        }
    },
    created(){
        http.get('/api/getvote').then(res=>{           
           this.votelist=res.data.votelist;
           this.total=res.data.total;
        })
    },
    methods:{
        tab(type){
            http.get('/api/getvote',{type:type}).then(res=>{
                this.votelist=res.data.votelist;
                this.total=res.data.total;
            })
        }
    }
}
</script>

<style lang='scss' scoped>
    .home{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    header{
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background: skyblue;
        color: #fff;
        font-size: 20px;
    }
    nav{
        width: 100%;
        height: 45px;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    main{
        width: 100%;
        flex: 1;
        overflow: auto;
    }
</style>
