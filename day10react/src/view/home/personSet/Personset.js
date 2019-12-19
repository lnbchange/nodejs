import React, { Component } from 'react'


export default class Personset extends Component {
    state={
        username:'',
        password:'',
        student_number:''
    }
    render() {
        return (
            <div className="person">
                <div>
                    <p><span>姓名：</span><span>{this.state.username}</span></p>
                    <p><span>学号：</span><span>{this.state.student_number}</span></p>
                    <p><span>密码：</span><span>{this.state.password}</span></p>
                </div>
            </div>
        )
    }
    componentDidMount(){
        let {username,password,student_number}=JSON.parse(localStorage.getItem('info'));
        this.setState({
            username:username,
            password:password,
            student_number:student_number
        })
    }
}
