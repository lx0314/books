import {request} from "@/network/index";
export function getcarts(goods_id=0,num=1){
    console.log(goods_id);
    console.log(num);
    return request({
        url:'api/carts',
        method:'post',
        data:{
            goods_id,
            num
        }
    })
}
export function getcartslist(){
    return request({
        url:'api/carts?include=goods',
        method:'get'
    })
}
export function deletecarts(cart){
    return request({
        url:`api/carts/ ${cart}`,
        method:'delete'
    })
}
export function numcatrs(cart,num){
    return request({
        url:`api/carts/ ${cart}`,
        method:'put',
        data:{
            num
        }
    })
}

export function checkedcatrs(data){
    return request({
        url:'api/carts/checked',
        method:'patch',
        data
    })
}
