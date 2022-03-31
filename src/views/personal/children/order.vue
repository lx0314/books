<template>
  <van-nav-bar
      title="订单管理"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
  <van-tabs v-model:active="active" @click-tab="chicktab">
    <van-tab title="全部"></van-tab>
    <van-tab title="待付款"></van-tab>
    <van-tab title="已支付"></van-tab>
    <van-tab title="发货"></van-tab>
    <van-tab title="交易完成"></van-tab>
    <van-tab title="过期"></van-tab>
  </van-tabs>
  <div class="goods" v-for="item in goodslist" :key="item.id" @click="$router.push({path:'/OrderDetails',query:{id:item.id}})">
    <h6>订单号:{{item.order_no}}</h6>
    <h6>创建时间:{{item.created_at}}</h6>
    <div class="goodslist" v-for="(items,index) in item.goods.data" :key="item.id">
      <div class="imgbox">
        <img :src="items.cover_url" alt="">
      </div>
      <div class="titlebox">
        <h6>{{items.title}} <span>{{"X"+item.orderDetails.data[index].num}}</span></h6>
        <h6>{{'¥'+items.price}}</h6>
      </div>
    </div>
  </div>
</template>

<script>
import {orderlist} from '@/network/orders'
import {onMounted,ref} from "vue";
export default {
  name: "order",
  setup(){
    const onClickLeft = () => history.back();
    const goodslist=ref([])
    const active = ref(0);
    onMounted(()=>{
      orderlist(1,0).then(res=>{
        console.log(res);
        goodslist.value=res.data.filter(item=>item.amount!=0)
      })
      // addorder(896).then(res=>{
      //   console.log(res);
      // })
    })
    const chicktab = ({name}) => {
      let ids=name
      orderlist(1,ids).then(res=>{
        console.log(res);
        goodslist.value=res.data.filter(item=>item.amount!=0)
      })
    }
    return {
      active,
      goodslist,
      onClickLeft,
      chicktab
    }
  }
}
</script>

<style scoped lang="scss">
.goods{
  margin-bottom: 20px;
  h6{
    margin: 10px 20px;
  }
  .goodslist{
    display: flex;
    justify-content: space-around;
    .imgbox{
      width: 100px;
      height: 100px;
      img{
        width: 100px;
      }
    }
    .titlebox{
      width: 215px;
      height: 100px;
      h6:first-child{
        padding-left: 0;
        margin: 20px 0;
        span{
          float: right;
        }
      }
      h6:last-child{
        padding-left: 0;
      }
    }
  }
}
</style>
