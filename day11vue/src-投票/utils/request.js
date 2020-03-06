import axios from 'axios';
let instance = axios.create();

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // console.log(config)
    let writeArr=['/api/login','/api/registry'];
    if(!writeArr.includes(config.url)){//携带头信息      
        config.headers.token=localStorage.getItem('token')
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    console.log(error)
    if(error.response.status===401){
        localStorage.clear();
        window.location.replace('/login')
    }else if(error.response.status===500){
        alert('服务器故障')
    }
    return Promise.reject(error);
  });


export default {
    get(url,params){
       return instance.get(url,{params})
    },
    post(url,params){
       return instance.post(url,params)
    }
}