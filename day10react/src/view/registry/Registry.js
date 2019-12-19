import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import axios from 'axios'

class Registry extends Component {
    handleSubmit = e => {//提交
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {           
            axios.post('/api/register',values).then(res=>{
                if(res.data.code===2){              
                    alert(res.data.msg);
                    this.props.history.push('/login');
                }else{
                    alert(res.data.msg)
                }
            })
          }
        });
      };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
          <div className="registry-wrap">
              <div className="content">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <h2 className="registry-title">请注册</h2>
                    <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
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
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        注册
                    </Button>
                      Or <a href="/login">login now!</a>
                    </Form.Item>
                </Form>
              </div>
          </div>
        )
      }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Registry);
export default WrappedNormalLoginForm;

