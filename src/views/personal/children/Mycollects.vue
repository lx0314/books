<template>
  <van-nav-bar
    title="我的收藏"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
/>
  <van-swipe-cell v-if="collectslists.length" v-for="item in collectslists" :key="item.id">
    <van-card
        num="2"
        :price="item.goods.price"
        :desc="item.goods.description"
        :title="item.goods.title"
        class="goods-card"
        :thumb="item.goods.cover_url"
    />
    <template #right>
      <van-button square type="danger" class="delete-button" text="取消收藏" @click="setlist(item.goods.id)" />
    </template>
  </van-swipe-cell>
  <van-empty v-else description="还没有收藏，赶快去添加喜欢的商品" />
</template>

<script>
import {ref,onMounted} from "vue";
import {collectslist,collects} from "@/network/goodsshow";

export default {
  name: "Mycollects",
  setup(){
    const onClickLeft = () => history.back();
    const collectslists=ref([])
    onMounted(()=>{
      collectslist().then(res=>{
        console.log(res);
        collectslists.value=res.data
      })
    })
    const setlist = (ids) => {
      collects(ids).then(res=>{
        collectslist().then(res=>{
          console.log(res);
          collectslists.value=res.data
        })
      })
    }
    return {
      collectslists,
      setlist,
      onClickLeft
    }
  }
}
</script>

<style scoped>
.goods-card {
  margin: 0;
}

.delete-button {
  height: 100%;
}
</style>
