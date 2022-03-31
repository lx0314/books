import {request} from "@/network/index";
export function adduser(){
    return request({
        url:'api/user',
        method:'get'
    })
}

export function addphone(code,phone){
    return request({
        url:'api/auth/phone/update',
        method:'PATCH',
        data:{
            code,
            phone
        }

    })
}
export function addphonecode(phone){
    return request({
        url:'api/auth/phone/code',
        method:'POST',
        data:{
            phone
        }

    })
}

export function addavatar(avatar){
    return request({
        url:'api/user/avatar',
        method:'PATCH',
        data:{
            avatar
        }

    })
}

export function addemailcode(email){
    return request({
        url:'api/auth/email/code',
        method:'POST',
        data:{
            email
        }

    })
}
export function addemail(codes,emails){
    return request({
        url:'api/auth/email/update',
        method:'PATCH',
        data:{
            code:codes,
            email:emails
        }
    })
}

export function setpassword(old_password,password,password_confirmation){
    return request({
        url:'api/auth/password/update',
        method:'POST',
        data:{
            old_password,
            password,
            password_confirmation
        }
    })
}
