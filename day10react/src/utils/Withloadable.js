import loadable from 'react-loadable';
import React from 'react'
let Loading=()=>{
    return <span>加载中</span>
};

export default function Withloadable (loader,loading=Loading){
    return loadable({
        loader,
        loading
    })
}

