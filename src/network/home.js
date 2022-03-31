import {request} from "@/network/index";

export function gethome(){
    return request({
        url:'api/index'
    })
}
export function getsort(types="recommend"){
    return request({
        url:'api/index?'+types+'=1&page=1'
    })
}
export function getcategory(){
    return request({
        url:'api/goods'
    })
}
export function getcategorys(ids=0,sort='recommend',page=1){
    return request({
        url:'api/goods?category_id='+ids+'&'+sort+'=1&page='+page
    })
}
