<template>
  <van-nav-bar
      title="个人详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
<div>
  <p>名称：{{data.name}}</p>
  <p  @click="$router.push('/email')">邮箱：{{data.email}}</p>
  <p v-if="data.phone">电话：{{data.phone}}</p>
  <p v-else @click="$router.push('/phone')">还没有绑定电话哟,快去绑定吧</p>
  <p>创建时间：{{data.created_at}}</p>
  <p @click="$router.push('/uploader')">头像：<img :src="data.avatar_url" alt=""></p>
  <button @click="$router.push('/setpassword')">修改密码</button>
</div>
</template>

<script>
import {adduser} from '@/network/user'
import {onMounted,ref} from "vue";

export default {
  name: "userxq",
  setup(){
    const onClickLeft = () => history.back();
    const data=ref({})
    onMounted(()=>{
      adduser().then(res=>{
        console.log(res);
        data.value=res
      })
    })
    return {
      data,
    onClickLeft
    }
  }
}
</script>

<style scoped>

</style>
