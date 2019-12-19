import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import routes from './router/router.config'
import RouterView from './router/RouterView'
import 'antd/dist/antd.css';
import './scss/App.scss'

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
               <RouterView routes={routes}/>
            </BrowserRouter>
        )
    }
    
}
