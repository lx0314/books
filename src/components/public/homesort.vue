<template>
  <div class="home">
    <div class="wrapper">
      <van-loading  v-if="!goods.length" type="spinner" size="24px" />
      <van-card v-else  v-for="item in goods" :key="item.id"
                :price="item.price"
                :desc="item.description"
                :title="item.title"
                :thumb="item.cover_url"
                @click="$router.push('/goodsshow/'+item.id)"
      >
      </van-card>
    </div>
  </div>
</template>

<script>

import {onMounted, reactive} from "vue";
import BScroll from "better-scroll";

export default {
  name: "homesort",
  props:{
    goods:{
      type:Array
    }
  },
  setup() {
    let bscroll=reactive({})
    onMounted(()=>{
      bscroll= new BScroll(document.querySelector('.wrapper'),{
        probeType:3,
        click:true,
        pullUpLoad:true//上啦加载更多
      })
      bscroll.on('pullingUp',()=>{
        console.log("上啦加载更多...")
      })
    })
    return { bscroll};
    }

}
</script>

<style scoped>

</style>
