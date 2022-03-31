<template>
  <van-overlay z-index="99" :show="$store.state.loadings">
    <div class="wrapper">
      <van-loading size="24px" vertical>加载中...</van-loading>
    </div>
  </van-overlay>
  <van-nav-bar
      title="商品详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
  <van-swipe  class="my-swipe"  indicator-color="white">
    <van-swipe-item>
      <img height="150"  :src="goodsshow.cover_url" alt="tupian">
    </van-swipe-item>
  </van-swipe>
  <div>
    <h3 style="color: red">{{'¥'+goodsshow.price}}</h3>
    <h2>{{goodsshow.title}}</h2>
    <h3>{{goodsshow.description}}</h3>
  </div>
  <van-tabs v-model:active="activeNamess">
    <van-tab title="概述" name="recommend">
      <van-grid :border="false" :column-num="1">
        <div style="width: 100%" v-html="goodsshow.details"></div>

      </van-grid>
    </van-tab>
    <van-tab title="评价" name="sales">
      <van-empty description="还没有评价哦" />
    </van-tab>
    <van-tab title="相似" name="price">
      <van-empty v-if="!likelist.length" description="还没有内容哦，可以去看看其他商品" />
      <van-card
          v-else
          v-for="item in likelist"
          num="2"
          :price="item.price"
          tag="降价"
          desc="描述信息"
          :title="item.title"
          :thumb="item.cover_url"
          :origin-price="item.price+100"
          @click="$router.push('/goodsshow/'+item.id)"/>
    </van-tab>
  </van-tabs>
<!--  <van-action-bar>
    <van-action-bar-icon icon="chat-o" text="客服" color="#ee0a24" />
    <van-action-bar-icon icon="cart-o" text="购物车" />
    <van-action-bar-icon icon="star" text="已收藏" color="#ff5000" />
    <van-action-bar-button type="warning" text="加入购物车" />
    <van-action-bar-button type="danger" text="立即购买" />
  </van-action-bar>-->
  <van-action-bar>
    <van-action-bar-icon icon="chat-o" text="客服" @click="onClickIcon" />
    <van-action-bar-icon icon="cart-o" text="购物车" @click="onClickIcon" />
    <van-action-bar-icon icon="star" text="已收藏"
                         v-if="goodsshow.is_collect==1"
                         color="#ff5000"
                         @click="onClicksc(goodsshow.id)" />
    <van-action-bar-icon icon="star" v-else text="收藏" @click="onClicksc(goodsshow.id)" />
    <van-action-bar-button type="warning" text="加入购物车" />
    <van-action-bar-button type="danger" text="立即购买" @click="addcatrs" />
  </van-action-bar>
</template>
<script>
import {getgoodsshow,collects} from "@/network/goodsshow";
import {getcarts} from "@/network/catrs";
import {onMounted, ref, watch} from "vue";
import {Toast} from "vant";
import {useRoute,useRouter} from 'vue-router'
import store from "@/store";

export default {
  name: "goodsshow",
  setup() {
    const onClickIcon = () => Toast('点击图标');
    const route=useRoute()
    const router=useRouter()
    const onClickLeft = () => history.back();
    const goodsshow=ref({})
    const likelist=ref({})
    onMounted(()=>{
      console.log(route);
      getgoodsshow(route.params.good).then(res=>{
        console.log(res);
        goodsshow.value=res.goods
        likelist.value=res.like_goods
        store.state.loadings=false
      })
    })
    watch(()=>route.params.good,()=>{
      getgoodsshow(route.params.good).then(res=>{
        console.log(res);
        goodsshow.value=res.goods
        likelist.value=res.like_goods
        store.state.loadings=false
      })
    })
    const addcatrs=()=>{
      getcarts(route.params.good,goodsshow.stock).then((res)=>{
        console.log(res)
        store.dispatch('getcartsNum')
        router.push('/ShoppingCart')
      })
    }
    const onClicksc = (ids) => {
      collects(ids).then(res=>{
        console.log(res);
        getgoodsshow(route.params.good).then(res=>{
          console.log(res);
          goodsshow.value=res.goods
          likelist.value=res.like_goods
          store.state.loadings=false
        })
      })
    }
    return {
      onClickIcon,
      addcatrs,
      onClickLeft,
      goodsshow,
      likelist,
      onClicksc
    };
  },
}
</script>

<style scoped>
.van-swipe-item {
  color: #fff;
  font-size: 20px;
  text-align: center;
  height: 150px;
  line-height: 150px;
  padding: 0;
  background-color: #fff;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
