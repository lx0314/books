import {request} from "@/network/index";
export function addreslist(){
    return request({
        url:'api/address'
    })
}
export function addaddres(data){
    return request({
        url:'api/address',
        method:'post',
        data
    })
}
export function getaddressinfo(address){
    return request({
        url:`api/address/${address}`,

    })
}

export function updataaddress(address,data){
    return request({
        url:`api/address/${address}`,
        method:'put',
        data
    })
}

export function deleteaddress(address){
    return request({
        url:`api/address/${address}`,
        method:'DELETE'
    })
}

export function defaultaddress(address){
    return request({
        url:`api/address/${address}/default`,
        method:'PATCH'
    })
}
