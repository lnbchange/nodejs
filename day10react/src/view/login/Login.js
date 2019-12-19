import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import axios from 'axios';


 class Login extends Component {
    handleSubmit = e => {//点击提交
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {            
            axios.post('/api/login',values).then(res=>{
                if(res.data.code===2){                                      
                    let {token,roleId,username,msg}=res.data;
                    localStorage.setItem('info',JSON.stringify({token,roleId,username,...values}));
                    alert(msg);
                    roleId==1?this.props.history.push('/home/teacherIndex'):this.props.history.push('/home/studentIndex')
                }else{
                    alert('学号输入有误')
                }
            })
          }
        });
      };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
          <div className="login-wrap">
              <div className="content">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <h2 className="login-title">请登陆</h2>
                    <Form.Item>
                    {getFieldDecorator('student_number', {
                        rules: [{ required: true, message: 'Please input your number!' }],
                    })(
                        <Input
                        prefix={<Icon type="smile" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="number"
                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox>Remember me</Checkbox>)}                    
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登陆
                    </Button>
                    Or <a href="/registry">register now!</a>
                    </Form.Item>
                </Form>
              </div>
          </div>
        )
      }
}


const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);
export default WrappedNormalLoginForm