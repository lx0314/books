<template>
  <van-sticky>
    <van-tabs v-model:active="activeName"  @click-tab="onClickTab">
      <van-tab title="推荐" name="recommend"></van-tab>
      <van-tab title="热销" name="sales"></van-tab>
      <van-tab title="最新" name="new"></van-tab>
    </van-tabs>
  </van-sticky>
  <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
  >
    <homesort :goods="recome"></homesort>
  </van-list>
</template>

<script>
import {ref, onMounted} from "vue";
import homesort from "@/components/public/homesort";
import {getsort} from "@/network/home";
export default {
  name: "sort",
  components:{
    homesort
  },
  setup() {
    const recome=ref([])
    const activeName = ref('a');
    const loading = ref(false);
    const finished = ref(false);
    const list = ref([]);
    onMounted(()=>{
      getsort().then(res=>{
        recome.value=res.goods.data
      })

    })
    function onClickTab({name}){
      getsort(name).then(res=>{
        recome.value=res.goods.data
      })

    }
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
    return { activeName, onClickTab,recome,onLoad,loading,finished,list};
  },
  props:{
    good:{
      type:Array
    }
  }
}
</script>

<style scoped lang="scss">


</style>
