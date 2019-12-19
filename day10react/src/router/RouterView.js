import React, { Component } from 'react'
import { Switch , Redirect , Route } from 'react-router-dom'

export default class RouterView extends Component {
    render() {
        let {routes}=this.props;
        let router=routes.filter(v=>!v.redirect);
        let redirect=routes.filter(v=>v.redirect);
        return (
            <Switch>
                {
                    router.map((v,i)=>{
                        return <Route path={v.path} key={i} render={(props)=>{
                            if(v.children){
                                return <v.component {...props} routes={v.children}></v.component>
                            }else{
                                return <v.component {...props}></v.component>
                            }
                        }}></Route>
                    })
                }
                {
                    redirect.map((v,i)=>{
                        return <Redirect from={v.path} to={v.redirect} key={i}/>
                    })
                }
            </Switch>
        )
    }
}
