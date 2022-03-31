import {request} from "@/network/index";
export function getgoodsshow(ids){
    return request({
        url:'api/goods/'+ids
    })
}

export function collects(goods){
    return request({
        url:`api/collects/goods/${goods}`,
        method:'POST'
    })
}

export function collectslist(page=1){
    return request({
        url:'api/collects',
        data:{
            page
        }
    })
}
