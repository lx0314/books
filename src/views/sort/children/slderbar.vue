<template>
  <van-loading type="spinner" color="#1989fa" v-if="!goods.length"/>
  <van-row v-else>
    <van-col span="8">
      <van-collapse v-model="activeNames" accordion >
        <van-collapse-item v-for="(item,index) in goods.slice(0,10)" :key="item.id" :title="item.name" :name="index+1">
          <van-sidebar v-model="active">
            <van-sidebar-item v-for="items in item.children" :key="items.id" :title="items.name"
            @click="getitemsid(items.id)"/>
          </van-sidebar>
        </van-collapse-item>
      </van-collapse>
    </van-col>
    <van-col span="16">
      <van-tabs v-model:active="activeNamess" @click-tab="onClickTab">
        <van-tab title="推荐" name="recommend"></van-tab>
        <van-tab title="销量" name="sales"></van-tab>
        <van-tab title="价格" name="price"></van-tab>
      </van-tabs>
      <van-empty v-if="!goodlist.length" description="还没有内容哦，可以去看看其他商品" />
      <van-list
          v-model:loading="loading"
          v-else
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
      >
        <van-card
            v-for="item in goodlist"
            num="2"
            :price="item.price"
            tag="降价"
            desc="描述信息"
            :title="item.title"
            :thumb="item.cover_url"
            :origin-price="item.price+100"
            @click="$router.push('/goodsshow/'+item.id)"/>

      </van-list>
    </van-col>
  </van-row>
</template>


<script>
import {ref, onMounted, computed, reactive} from 'vue';
import {getcategorys} from "@/network/home";

export default {
  name:"slderbar",
  props:{
    goods:{
      type:Array
    }
  },
  setup() {
    const active = ref(0);
    const activeNames = ref(['1']);
    const activeNamess = ref('recommend');
    const sort=ref('recommend');
    const ids=ref(0);
    const goodsort=reactive({
      recommend:{page:1,list:[]},
      sales:{page:1,list:[]},
      price:{page:1,list:[]},
    })
    const goodlist=computed(()=>goodsort[sort.value].list)
    const list = ref([]);
    const loading = ref(false);
    const finished = ref(false);

    const onLoad = () => {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          list.value.push(list.value.length + 1);
        }

        // 加载状态结束
        loading.value = false;

        // 数据全部加载完成
        if (list.value.length >= 40) {
          finished.value = true;
        }
      }, 1000);
    };
    const init=()=>{
      getcategorys(ids.value,'recommend').then(res=>{
        goodsort.recommend.list=res.goods.data
      })
      getcategorys(ids.value,'sales').then(res=>{
        goodsort.sales.list=res.goods.data
      })
      getcategorys(ids.value,'price').then(res=>{
        goodsort.price.list=res.goods.data
      })
    }
    function getitemsid(idss){
      ids.value=idss
      init()
      /*getcategorys(idss,sort).then(res=>{
        good.value=res.data.goods.data
      })*/
    }
    function onClickTab({name}){
      sort.value=name
      init()
      /*getcategorys(ids.value,name).then(res=>{
        good.value=res.data.goods.data
      })*/
    }
    onMounted(()=>{
      /*getcategorys().then(res=>{
        good.value=res.data.goods.data
      })*/
      init()
    })
    return {
      list,
      onLoad,
      loading,
      finished,
      active,
      activeNames,
      activeNamess,
      onClickTab,
      getitemsid,
      goodlist
    }
  },
};
</script>

<style scoped>

</style>
