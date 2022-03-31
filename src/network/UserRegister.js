import {request} from "@/network/index";
export function getregister(data){
    return request({
        url:'api/auth/register',
        method:'post',
        data
    })
}
export function getlogin(data){
    return request({
        url:'api/auth/login',
        method:'post',
        data
    })
}

export function loginout(){
    return request({
        url:'api/auth/logout',
        method:'post',
    })
}
