import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';
import http from '../../../utils/request'
export default class TeacherIndex extends Component {
    state={
        optionBar:{},    //柱状图
        optionCircle:{},  //柄图
        optionLine : {} //折线
    }
    componentDidMount(){
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
                            name:'人数',
                            type:'value',
                            max:5,
                            min:0,
                            splitNumber:5
                        },
                        series: [
                            {type: 'bar'},
                            {type: 'bar'}
                        ]
                    }
                })
            }
        }) 

        let arrC=[],arrB=[]
        http.get("/api/success").then(res=>{
            res.data.list.forEach(item => {
                if(item.theory>=90){
                    arrC.push(`{Sunny|${item.username}}{value|${item.theory}}{rate|${item.skill}}`)
                }else{
                    arrB.push(`{Sunny|${item.username}}{value|${item.theory}}{rate|${item.skill}}`)
                }
            });
            this.setState({
                optionCircle:{
                title: {
                    text: '今日成才情况',
                    left: 'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    // orient: 'vertical',
                    // top: 'middle',
                    bottom: 10,
                    left: 'center',
                    data: ['未成才','成才']
                },
                series : [
                    {
                        type: 'pie',
                        radius : '65%',
                        center: ['50%', '50%'],
                        selectedMode: 'single',
                        data:[
                            {
                                value:arrC.length,
                                name: '成才',
                                label: {
                                    normal: {
                                        formatter: [
                                            '{title|{b}}{abg|}',
                                            '  {weatherHead|姓名}{weatherHead|理论}{weatherHead|技能}',
                                            '{hr|}',
                                            ...arrC
                                        ].join('\n'),
                                        backgroundColor: '#eee',
                                        borderColor: '#777',
                                        borderWidth: 1,
                                        borderRadius: 4,
                                        rich: {
                                            title: {
                                                color: '#eee',
                                                align: 'center'
                                            },
                                            abg: {
                                                backgroundColor: '#333',
                                                width: '100%',
                                                align: 'right',
                                                height: 25,
                                                borderRadius: [4, 4, 0, 0]
                                            },
                                            Sunny: {
                                                height: 30,
                                                align: 'left',
                                                backgroundColor: {
                                                    // image: weatherIcons.Sunny
                                                }
                                            },
                                            weatherHead: {
                                                color: '#333',
                                                height: 24,
                                                align: 'left',
                                                padding: [0, 10, 0, 10]
                                            },
                                            hr: {
                                                borderColor: '#777',
                                                width: '100%',
                                                borderWidth: 0.5,
                                                height: 0
                                            },
                                            value: {
                                                width: 20,
                                                padding: [0, 20, 0, 30],
                                                align: 'left'
                                            },
                                            rate: {
                                                width: 40,
                                                align: 'right',
                                                padding: [0, 10, 0, 0]
                                            }
                                        }
                                    }
                                }
                            },
                            {
                                value:arrB.length,
                                name: '未成才',
                                label: {
                                    normal: {
                                        formatter: [
                                            '{title|{b}}{abg|}',
                                            '  {weatherHead|姓名}{weatherHead|理论}{weatherHead|技能}',
                                            '{hr|}',
                                            ...arrB
                                        ].join('\n'),
                                        backgroundColor: '#eee',
                                        borderColor: '#777',
                                        borderWidth: 1,
                                        borderRadius: 4,
                                        rich: {
                                            title: {
                                                color: '#eee',
                                                align: 'center'
                                            },
                                            abg: {
                                                backgroundColor: '#333',
                                                width: '100%',
                                                align: 'right',
                                                height: 25,
                                                borderRadius: [4, 4, 0, 0]
                                            },
                                            Sunny: {
                                                height: 30,
                                                align: 'left'
                                            },
                                            weatherHead: {
                                                color: '#333',
                                                height: 24,
                                                align: 'left',
                                                padding: [0, 10, 0, 10]
                                            },
                                            hr: {
                                                borderColor: '#777',
                                                width: '100%',
                                                borderWidth: 0.5,
                                                height: 0
                                            },
                                            value: {
                                                width: 20,
                                                padding: [0, 20, 0, 30],
                                                align: 'left'
                                            },
                                            rate: {
                                                width: 40,
                                                align: 'right',
                                                padding: [0, 10, 0, 0]
                                            }
                                        }
                                    }
                                }
                            },
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }
        })
        })

        http.get("/api/monthsuccess").then(res => {
           if(res.data.code===2){               
                let theory= [];
                let skill=[];
                res.data.theory.map((item, index) => {
                    theory.push(item[0]["count(*)"] / res.data.count * 100);
                });
                res.data.skill.map((item, index) => {
                    skill.push(item[0]["count(*)"] / res.data.count * 100);
                });
    
                this.setState({
                    optionLine:{
                        title: {
                            text: '本月班级成才率'
                        },
                        tooltip: {
                            trigger: 'axis',
                            formatter: "{a} <br/>{b} : {c}%"
                        },
                        legend: {
                            data:['理论','技能']
                        },
                        xAxis:  {
                            type: 'category',
                            name:'日期',
                            boundaryGap: false,
                            data: res.data.time  //日期的修改
                        },
                        yAxis: {
                            type: 'value',
                            name:'分数'
                        },
                        series: [
                            {
                                name:'理论',
                                type:'line',
                                data:theory, //理论的成绩
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
                                data:skill, //技能的成绩
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
     
    }
    render() {
        let {optionBar,optionCircle,optionLine}=this.state;
        return (
            <div className="teacherIndex">                    
                      <div className="top">
                        <ReactEcharts
                                option={optionCircle}
                                style={{height: '400px'}}
                            />
                      </div>
                      <div className="bottom">
                        <ReactEcharts
                                option={optionBar}
                                style={{height: '450px',width:'50%'}}
                                className='react_for_echarts' /> 
                        <ReactEcharts
                            option={optionLine}
                            style={{height: '450px',width:'50%'}}
                            className='react_for_echarts' />   
                      </div>                                              
                    
            </div>
        )
    }
}
