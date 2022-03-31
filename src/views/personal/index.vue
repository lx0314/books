<template>
  <van-nav-bar
      title="个人中心"
  />
  <div class="user" @click="$router.push('/userxq')">
    <van-image
        round
        fit="cover"
        width="5rem"
        height="5rem"
        :src="user.avatar_url"
    />
    <div><br>
      <span>用户名:{{user.name}}</span><br><br>
      <span>email:{{user.email}}</span>
    </div>
  </div>

  <van-cell title="我的收藏" is-link  to="/Mycollects"/>
  <van-cell title="我的订单" is-link to="/order"/>
  <van-cell title="账号管理" is-link />
  <van-cell title="地址管理" is-link to="/address" />
  <van-cell title="关于我们" is-link />
  <div @click="logout" style="text-align: center;margin-top: 20px">退出登录</div>
  <boottomnav></boottomnav>
</template>

<script>
import boottomnav from "@/components/private/boottomnav";
import {useRouter} from "vue-router";
import {loginout} from "@/network/UserRegister";
import {Toast} from "vant";
import {onMounted,ref} from "vue";
import {adduser} from "@/network/user";

export default {
  name: "index",
  components:{
    boottomnav
  },
  setup() {
    const router=useRouter()
    const logout=()=>{
      loginout().then(res=>{
        if(res.status===204){
          window.localStorage.setItem('token','')
          Toast.success("退出成功")
          router.push({path:'/login'})
        }
      })
    }
    const user=ref({})
    onMounted(()=>{
      adduser().then(res=>{
        console.log(res)
        user.value=res
      })
    })
    return {logout,user}
  },
}
</script>

<style scoped>
.user{
  margin: 20px;
  border-radius: 10px;
  background-color: #16cb8a;
  padding: 20px 10px;
  display: flex;
  justify-content: space-around;
}
</style>
