<template>
    <div>
        我的投票
       <p v-for="i in listdata" :key="i.id">
            <v-chart :options="{
            color: ['#00f'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : i.textArr,
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'直接访问',
                    type:'bar',
                    barWidth: '60%',
                    data:i.items.map((v,i)=>v.count)
                }
            ]
        }"/>
       </p>
    </div>
</template>

<script>
import ECharts from 'vue-echarts'
import http from '../utils/request.js'
import 'echarts'
export default {
    components:{
         'v-chart': ECharts
    },
    created(){
        http.get('/api/getMyVote').then(res=>{
            console.log(res.data);
            this.listdata=res.data.data
        })
    },
    data(){
        return {
            listdata:[]
        }
    }

}
</script>

<style lang="scss" scoped>
.echarts {
    width:90%;
    height: 200px;
    margin:0 auto;
}
</style>
