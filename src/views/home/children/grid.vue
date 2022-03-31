<template>
  <van-swipe :loop="false" :width="73" :show-indicators="false" >
    <van-swipe-item  v-for="item in slidess" :key="item.id" @click="$router.push('/goodsshow/'+item.id)">
      <van-grid :column-num="1" :icon-size="'3.5rem'">
        <img :src="item.cover_url" alt="img" width="73">
        <h6>{{item.title}}</h6>
      </van-grid>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  name: "grid",
  props:{
    slidess:{
      type:Array
    }
  }
}
</script>

<style scoped>

</style>
