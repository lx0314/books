<template>
  <van-swipe  class="my-swipe"  indicator-color="white">
    <van-swipe-item v-for="item in slides" :key="item.id">
      <img :height="150" :src="item.img_url" alt="">
    </van-swipe-item>
  </van-swipe>
</template>

<script>
// import {gethome} from "@/network/home";
// import {onMounted,ref} from "vue";
export default {
  name: "Swiper",
 /* setup(){
    let slides=ref([])
    onMounted(()=>{
      gethome().then(res=> {
        slides=res.data.slides
        console.log(slides);
      })
    })
    return {slides}
  },*/
  props:{
    slides:{
      type:Array
    }
  }

}
</script>

<style scoped lang="scss">
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  text-align: center;
  height: 150px;
  line-height: 150px;
  padding: 10px 0;
  background-color: #fff;
}

img{
  border-radius: 10px;
}
</style>
