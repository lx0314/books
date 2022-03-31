<template>
  <van-nav-bar title="首页" />
  <Swiper :slides="slidess"></Swiper>
  <grid :slidess="sort"></grid>
  <SecondPurchase :slidess="second"></SecondPurchase>
  <div class="homesort">
    <sort :good="goods"></sort>
  </div>
  <boottomnav></boottomnav>
</template>

<script>
import Swiper from "@/views/home/children/Swiper";
import grid from "@/views/home/children/grid";
import SecondPurchase from "@/views/home/children/SecondPurchase";
import sort from "@/views/home/children/sort";
import {gethome} from "@/network/home";
import {onMounted} from "vue";
import boottomnav from "@/components/private/boottomnav";

export default {
  name: "index",
  components:{
    Swiper,
    grid,
    SecondPurchase,
    sort,
    boottomnav
  },
  data(){
    return {
      slidess:[],
      second:[],
      sort:[],
      goods:[]
    }
  },
  mounted() {
    gethome().then(res=> {
      this.slidess=res.slides
      this.second=res.goods.data.slice(0,4)
      this.sort=res.goods.data
      this.goods=res.goods.data
    })

  },
  setup(){
    onMounted(()=>{

    })
    return {}
  }
}
</script>

<style scoped>
.doge {
  width: 140px;
  height: 72px;
  margin-top: 8px;
  border-radius: 4px;
}
.homesort{
  clear: both;
  margin-top: 20px;
}
</style>
