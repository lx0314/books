import {request} from "@/network/index";
//提交订单
export function addorder(address_id){
    return request({
        url:'api/orders',
        method:'post',
        data:{
            address_id
        }
    })
}
//订单详情
export function orderxq(order){
    return request({
        url:`api/orders/${order}?include=goods,user,orderDetails`
    })
}
//订单列表
export function orderlist(page=1,status=1){
    return request({
        url:`api/orders?page=${page}&status=${status}&include=goods,user,orderDetails`
    })
}
//订单预览
export function preview(){
    return request({
        url:'api/orders/preview',
        method:'get'
    })
}
//物流详情
export function express(order){
    return request({
        url:`api/orders/${order}/express`,
        method:'get'
    })
}
//确认收货
export function confirm(order){
    return request({
        url:`api/orders/${order}/confirm`,
        method:'PATCH'
    })
}
//评价商品
export function commen(order){
    return request({
        url:`api/orders/${order}/commen`,
        method:'post'
    })
}
