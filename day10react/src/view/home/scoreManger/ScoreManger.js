import React, { Component } from 'react'
import { Row, Col , Button , Table, Divider, Tag,Radio,Modal,Input,Select} from 'antd';
import http from '../../../utils/request'
const { Column, ColumnGroup } = Table;
const { Option } = Select;

export default class ScoreManger extends Component {   
    state = {
        data:[],  //成绩列表
        visible: false,  //控制弹窗显示隐藏
        userinfo:'',
        theory:0,
        skill:0,
        userlist:[],  //没有录入成绩的人员列表
        student_number:null,
        editName:'',
        id:"",
        keyword:'',
        current:3
    }
    componentDidMount(){
        this.getlist();
    }

    getlist = () => {//所有学生当天成绩
        http.get('/api/gradeslist').then(res => {
            if(res.data.code === 2){
                this.setState({
                    data:res.data.list
                })               
            }else{
                alert(res.data.msg)
            }
        })
    }

    render() {       
        let {data,theory,skill,userlist,student_number,editName,keyword} = this.state;
        let i=1;
        return (
            <div className="scoremanger">
                <Row>
                    <Col span={6} push={18}>
                        <Button type="primary" onClick={this.showModal}>添加</Button>
                    </Col>
                    <Col span={18} pull={6}>
                        <p>姓名</p>
                        <p><input type="text" placeholder="请输入名字查询" name="keyword" value={keyword}  onChange={this.setIpt}/></p>
                        <p> 
                           <Button type="primary" icon="search" onClick={() => {this.search(keyword)}}>Search</Button>
                        </p>
                    </Col>
                </Row>
                <div>
                    {/* 表格 */}
                    <Table 
                        dataSource={data}
                        pagination={{
                            total:data.length,
                            pageSize:4,
                            defaultCurrent:1
                        }}
                    >
                        <Column title="序号" key="firstName" render={(item)=><span>{i++}</span>}/>
                        <Column title="姓名" key="username" render={(item) => <span>{item.username}-{item.student_number}</span>}/>
                        <Column title="理论成绩" dataIndex="theory" key="theory" />
                        <Column title="技能成绩" dataIndex="skill" key="skill" />                        
                        <Column
                            title="操作"
                            key="action"
                            render={(text, record) => (
                                <span className="btn">
                                    <a onClick={() => {this.delete(text)}}>删除</a>
                                    <Divider type="vertical" />
                                    <a onClick={() => {this.edit(text)}}>修改</a>
                                </span>
                            )}
                        />
                    </Table> 
                    {/* 遮罩 */}
                     <Modal
                        title="Basic Modal"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        >
                        {student_number ? editName:<Select
                            showSearch
                            style={{ width: 472 , height: 45 }}
                            placeholder="Select a person"
                            optionFilterProp="children"
                            onChange={this.onChange}
                            notFoundContent='添加完成'
                        >{userlist.length && userlist.map((item,i) => <Option key={item.student_number} value={`${item.username}-${item.student_number}`}>{item.username}-{item.student_number}</Option>)}
                        </Select>}
                        <Input placeholder="理论" name="theory" value={theory} onChange={this.setIpt}/>
                        <Input placeholder="技能" name="skill" value={skill}  onChange={this.setIpt}/>
                    </Modal>
                </div>
            </div>
        )
    }

    onChange = page => {//分页
        this.setState({
          current: page,
        });
    }

    showModal = () => { //查询没有录入成绩的人员列表
        http.get('/api/noevery').then(res => {
            if(res.data.code === 2){
                this.setState({
                    userlist:res.data.data
                },() => {
                    this.setState({
                        visible: true,
                    });
                })
            }else{
                alert(res.data.msg)
            }
        })
    }
   
    handleOk = e => {  //录入成绩
        let {theory,skill,userinfo,id} = this.state;        
        let student_number = userinfo.split('-')[1];
        let username = userinfo.split('-')[0];
       if(theory>=0&&theory<=100&&skill>=0&&skill<=100){
        let url='';
        if(!id){
            url+='/api/schoolgrades'
        }else{
            url+='/api/gradesedit'
        }
        http.post(url,{username,theory,skill,student_number}).then(res => {
            if(res.data.code === 2){
                alert("成功")
                this.getlist();
            }else{
                alert("失败")
            }
            this.setState({
                visible: false,
            });
            this.reset();
            })
        }else{
           alert('理论技能均不得超过最大值100')
        }
    }

    handleCancel = e => {//关闭遮罩
        this.setState({
          visible: false,
        });
        this.reset();
    }

   
    reset = () => { //重置
        this.setState({
            student_number:null,
            exitName:'',
            theory:0,
            skill:0,
            id:'',
            userlist:[]
        })
    }
   
    onChange = (value)=>{  //选择人名
        this.setState({
            userinfo:value
        })
    }
    
    setIpt = (e) => {//设置input的值
        this.setState({
            [e.target.name]:e.target.value
        })
        if(!e.target.value){
            this.getlist();
        }
    }
    
    edit = (item) => {//修改
        this.setState({
            visible: true,
            student_number:item.student_number,
            editName:item.username,
            theory:item.theory,
            skill:item.skill,
            userinfo:item.username+"-"+item.student_number,
            id:1,
            userlist:[]
        });
    }

    delete=(item)=>{//删除
        http.post('/api/delete',{student_number:item.student_number}).then(res=>{
            if(res.data.code===2){
                alert(res.data.msg);
                this.getlist();
            }else{
                alert(res.data.msg);
            }
        })
    }

    search=(keyword)=>{//模糊搜索
       if(keyword.trim()){
            http.get('/api/search',{keyword}).then(res=>{
                if(res.data.code===2){
                    this.setState({
                        data:res.data.searchdata
                    })
                }
            })
       }else{
           alert('不能为空！')
       }
    }
}
