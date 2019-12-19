import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';
import http from '../../../utils/request'

export default class StudentIndex extends Component {
    state = {
        optionLine : {},  //折线图
        optionBar:{},     //柱状图
        data:[],          //学生当天成绩
        id:null           //个人学号
    }
    componentDidMount(){       
        if(!this.props.location.state){
           let {student_number} = JSON.parse(localStorage.getItem('info'));
            this.setState({
                id:student_number
            },()=>{
                this.getdata()
            })          
        }else{
             this.setState({
                id:this.props.location.state.student_number
            },()=>{
                this.getdata()
            })
        }    
    }
    getdata=()=>{
         http.get('/api/personslist',{student_number:this.state.id}).then(res => {
            if(res.data.code === 2){
                this.setState({
                    optionLine:{
                        title: {
                            text: '本月成绩曲线'
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data:['理论','技能']
                        },
                        xAxis:  {
                            type: 'category',
                            name:'日期',
                            boundaryGap: false,
                            data: res.data.data.timeArr  //日期的修改
                        },
                        yAxis: {
                            type: 'value',
                            name:'分数'
                        },
                        series: [
                            {
                                name:'理论',
                                type:'line',
                                data:res.data.data.theoryArr, //理论的成绩
                                markPoint: {
                                    data: [
                                        {type: 'max', name: '最大值'},
                                        {type: 'min', name: '最小值'}
                                    ]
                                },
                                markLine: {
                                    data: [
                                        {type: 'average', name: '平均值'}
                                    ]
                                }
                            },
                            {
                                name:'技能',
                                type:'line',
                                data:res.data.data.skillArr, //技能的成绩
                                markPoint: {
                                    data: [
                                        {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                                    ]
                                },
                                markLine: {
                                    data: [
                                        {type: 'average', name: '平均值'},
                                        [{
                                            symbol: 'none',
                                            x: '90%',
                                            yAxis: 'max'
                                        }, {
                                            symbol: 'circle',
                                            label: {
                                                normal: {
                                                    position: 'start',
                                                    formatter: '最大值'
                                                }
                                            },
                                            type: 'max',
                                            name: '最高点'
                                        }]
                                    ]
                                }
                            }
                        ]
                    }
                })
            }
        })
        http.get('/api/distribution').then(res => {
            if(res.data.code === 2){
                this.setState({
                    optionBar:{
                        title: {
                            text: '今日班级成绩分布图'
                        },
                        legend: {},
                        tooltip: {},
                        dataset: {
                            source: [ ['product', '理论', '技能'],...res.data.data]
                        },
                        xAxis: {
                            type: 'category',
                            name:'分数区间'
                        },
                        yAxis: {
                            name:'人数'
                        },
                        series: [
                            {type: 'bar'},
                            {type: 'bar'}
                        ]
                    }
                })
            }
        })     
        http.get('/api/student',{student_number:this.state.id}).then(res=>{
            if(res.data.code===2){
                this.setState({
                    data:res.data.data[0]
                })
            }            
        })  
    }
    render() {
        let {optionLine,optionBar,data} = this.state;    
        return (
            <div className="studentIndex">
                <div className="top">
                    {data?<h2>今日成绩：理论<span>{data.theory&&data.theory} </span>技能<span> {data.skill&&data.skill}</span></h2>:<h2>暂无数据</h2>}
                    {data&&data.theory>=90&&data.skill>=90?<p>今日成才，给自己点个赞❤</p>:<p>别灰心，加油!</p>}
                </div>

                <div className="bottom">
                    <div className="left">
                        <ReactEcharts
                            option={optionLine}
                            style={{height: '450px'}}
                            className='react_for_echarts' />
                    </div>
                    
                    <div className="right">
                        <ReactEcharts
                            option={optionBar}
                            style={{height: '450px'}}
                            className='react_for_echarts' />
                    </div>  
                </div>                 
               
            </div>
        )
    }
}
