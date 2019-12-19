import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd';
import RouterView from '../../router/RouterView';
import http from '../../utils/request';
import { NavLink } from 'react-router-dom'
const { Header, Sider, Content } = Layout;


export default class Home extends Component {
    state = {
        collapsed: false,
        url:[],
        roleId:'',
        username:''
      };
    
      toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      };
    
      render() {
        return (
            <div className="home-wrap">
                <header>
                    <span>成绩后台管理系统</span>
                    <span>欢迎，{this.state.username}{this.state.roleId==1?'讲师':'同学'}</span>
                </header>
                <Layout>                    
                    <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                        <div className="logo" />
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        {
                            this.state.url&&this.state.url.map((v,i)=>{
                                return  <Menu.Item key={v.id}>
                                            <NavLink to={"/home"+v.munuapi}>
                                            <Icon type="smile" rotate={180} />                                       
                                            <span>{v.menuname}</span>
                                            </NavLink>
                                        </Menu.Item>
                            })
                        }
                        <Menu.Item onClick={this.quit}>
                            <NavLink to="">
                                <Icon type="close-circle" rotate={180} />                                       
                                <span>退出</span>
                            </NavLink>
                        </Menu.Item>                
                    </Menu>
                    </Sider>
                    <Layout>               
                        <Content
                            style={{
                            margin: '24px 16px',
                            padding: 24,
                            background: '#fff',
                            minHeight: 280,
                            }}
                        >
                            <RouterView routes={this.props.routes}/>
                        </Content>
                    </Layout>
                 </Layout>
            </div>
        );
      }
      quit = () => {
        localStorage.clear();
        this.props.history.push('/login')
    }

      componentDidMount(){
        if(!localStorage.getItem('info')){
            //没有登录
            this.props.history.push('/login');
        }else{
            http.get('/api/menu').then(res=>{               
               if(res.data.code===2){
                    let {username,roleId}=JSON.parse(localStorage.getItem('info'))
                    this.setState({
                        url:res.data.router,
                        username:username,
                        roleId:roleId
                    })
               }else{
                   alert(res.data.msg)
               }
            })
      }
    }      
}
