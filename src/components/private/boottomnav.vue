<template>
  <van-tabbar route>
    <van-tabbar-item name="home" to="/" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item name="sort" to="/sort" icon="apps-o">分类</van-tabbar-item>
    <van-tabbar-item name="ShoppingCart" to="/ShoppingCart/" icon="cart" :badge="numstatus">购物车</van-tabbar-item>
    <van-tabbar-item name="personal" to="/personal" icon="manager">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import {useStore} from 'vuex'
import {ref,onMounted} from "vue";

export default {
  name: "boottomnav",
  setup(){
    const store=useStore()
    const numstatus=ref(0)
    onMounted(()=>{
      store.dispatch('getcartsNum')
    })
    numstatus.value=store.state.status
    return {numstatus}
  }
}
</script>

<style scoped>

</style>
