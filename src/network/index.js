import axios from "axios";
import { Notify } from "vant";
import store from "@/store";

export function request(config){
    const instance =axios.create({
        baseURL:"https://api.shop.eduwork.cn/"
    })
    //添加请求拦截器
    instance.interceptors.request.use(config=>{
        //在发送请求前做什么
        let token=window.localStorage.getItem('token')
        if(token){
            config.headers.Authorization='Bearer '+token
        }
        return config
    },error =>{
        console.log(error);
        })
    //添加响应拦截器
    instance.interceptors.response.use(reponse=>{
        store.state.loadings=true
        return reponse.data?reponse.data:reponse;
    },error=>{
        console.log(error);
        let err=error.response.data.errors[Object.keys(error.response.data.errors)[0]][0];
        Notify({ type: 'danger', message: err });
    })
    return instance(config)
}
