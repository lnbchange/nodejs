<template>
    <div>
        详情
             <ul>
            <li v-for="item in data" :key="item.id">
                <input type="radio" name="radio" v-if="$route.query.list.choiceType === '1'" :value="item.id" v-model="checkValue">
                <input type="checkbox" v-else :value="item.id" v-model="checkboxVal"/>
                {{item.text}}
            </li>
            {{checkboxVal}}{{checkValue}}
        </ul>
        <button @click="submit">提交</button>
    </div>
</template>

<script>
import http from '../utils/request.js'
export default {
    data(){
        return {
            data:[],
            checkValue:'',  //单选
            checkboxVal:[],  //多选
            type:this.$route.query.list.choiceType
        }
    },
    created(){
        http.get('/api/getitems',{uid:this.$route.query.id}).then(res=>{
            console.log(res.data);
            this.data=res.data.items
        })
    },
    methods:{
        submit(){
             let ids = this.$route.query.list.choiceType === '2' ? this.checkboxVal.join(',') : this.checkValue;
                http.post('/api/vote',{ids}).then(res => {
                    if(res.data.code === 2){
                        alert("投票成功");
                        this.$router.push('/home');
                    }
                })
        }
    }
}
</script>

<style>

</style>
