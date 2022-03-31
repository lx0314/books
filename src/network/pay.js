import {request} from "@/network/index";
export function payorder(order,types){
    return request({
        url:`api/orders/${order}/pay?type=${types}`
    })
}
