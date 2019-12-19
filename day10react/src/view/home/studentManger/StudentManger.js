import React, { Component } from 'react'
import { Row, Col , Button , Table, Divider, Tag,Radio,Modal,Input,Select,Pagination} from 'antd';
import http from '../../../utils/request'
const { Column, ColumnGroup } = Table;
const { Option } = Select;
export default class StudentManger extends Component {
    state={
        data:[],
        visible: false,  //控制弹窗显示隐藏
        username:'',
        student_number:'',
        id:'',
        role:'',
        rolelist:['2','3']
    }
    componentDidMount(){
        this.getlist();
    }
    getlist = () => {
        http.get('/api/students').then(res => {
            if(res.data.code === 2){
                this.setState({
                    data:res.data.data
                })
               
            }else{
                alert(res.data.msg)
            }
        })
    }
    render() {
        let {data,role,rolelist}=this.state;
        let i=1;
        return (
            <div className="studentManger">
                    {/* 表格 */}
                    <Table 
                            dataSource={data} 
                            pagination={{
                                total:data.length,
                                pageSize:4,
                                defaultCurrent:1
                            }}
                    >
                            <Column title="序号" key="firstName" 
                            render={(item)=><span>{i++}</span>}
                            />
                            <Column title="姓名" dataIndex="username" key="username" />
                            <Column title="学号" dataIndex="student_number" key="student_number" />
                            <Column title="身份"  key="address" 
                            render={(item)=>{return <span>{item.role==3?'学生':'学委'}</span>}}
                            />                        
                            <Column
                            title="操作"
                            key="action"
                            render={(text, record) => (
                                <span className="btn">
                                    <a onClick={() => {this.delete(text)}}>删除</a>
                                    <Divider type="vertical" />
                                    <a onClick={() => {this.edit(text)}}>修改</a>
                                    <Divider type="vertical" />
                                    <a onClick={()=>{this.history(text)}}>查看详情</a>
                                </span>
                            )}
                            />                        
                    </Table> 
                    {/*遮罩 */}
                     <Modal
                        title="修改学生信息"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        >                       
                        <Input placeholder="姓名" name="username" value={this.state.username} onChange={this.setIpt}/>
                        <Input placeholder="学号" name="student_number" value={this.state.student_number}  onChange={this.setIpt}/>
                        <Select
                                showSearch
                                style={{ width: 472 }}
                                placeholder="请选择学生身份"
                                optionFilterProp="children"
                                onChange={this.onChange}                               
                                filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                             {rolelist.map((v,i)=> { return <Option value={v} key={i}>{v==3?'学生':'学委'}</Option>})}  
                        </Select>
                    </Modal>
            </div>
        )
    }
    handleOk=e=>{//点击确定    
        let {username,role,student_number,id}=this.state;
        http.post('/api/editstudent',{username,role,student_number,id}).then(res=>{
            if(res.data.code===2){
                alert(res.data.msg);
                this.getlist();
            }else{
                alert(res.data.msg)
            }
            this.reset()
        })
    }
    reset=()=>{//重置
        this.setState({
            visible: false,
            username:'',
            student_number:'',
            id:'',
            role:''
        })
    }
    handleCancel = e => {//关闭遮罩
        this.setState({
          visible: false,
        });
    };
    setIpt = (e) => {//设置input的值
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    onChange = (value)=>{  //选择学生/学委
        this.setState({
            role:value
        })
    }
    edit=(item)=>{//修改
        this.setState({
            visible: true,
            username:item.username,
            student_number:item.student_number,
            id:item.id,
            role:item.role
        })
    }
    delete=(item)=>{//删除学生
        http.post('/api/remove',{student_number:item.student_number}).then(res=>{           
            if(res.data.code===2){
                alert(res.data.msg);
                this.getlist();
            }else{
                alert(res.data.msg);
            }
        })
    }
    history=(item)=>{//跳转学生页面
        this.props.history.push({pathname:'/home/studentIndex',state:{student_number:item.student_number}})
    }
}
