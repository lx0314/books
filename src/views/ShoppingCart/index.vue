<template>
  <van-nav-bar
      title="购物车"
  />
  <van-notice-bar mode="link" left-icon="volume-o" scrollable>
    开通会员可打9.5折优惠！还可以包邮哦
  </van-notice-bar>
  <commodity></commodity>
  <submitbar></submitbar>
  <boottomnav></boottomnav>
</template>

<script>
import {ref} from "vue";
import { Toast } from 'vant';
import submitbar from "@/views/ShoppingCart/children/submitbar";
import boottomnav from "@/components/private/boottomnav";
import commodity from "@/views/ShoppingCart/children/commodity";
export default {
  name: "index",
  setup() {
    return {

    };
  },
  components:{
    submitbar,
    boottomnav,
    commodity
  }
}
</script>

<style scoped>

</style>
