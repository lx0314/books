<template>
  <van-nav-bar
      title="订单详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
  <div class="ordertitle">
    <h6>订单状态：{{status}}</h6>
    <h6>订单编号：{{goods.order_no}}</h6>
    <h6>下单时间：{{goods.created_at}}</h6>
    <van-button type="primary" size="large" @click="pay">{{status}}</van-button>
  </div>
  <div class="orderprice">
    <h6>商品金额：{{goods.amount}}</h6>
    <h6>配送方式：普通快递</h6>
  </div>
  <div class="goods" v-for="item in orderdetails" :key="item.id">
    <div class="goodslist">
      <div class="imgbox">
        <img :src="item.cover_url" alt="">
      </div>
      <div class="titlebox">
        <h6>{{item.title}} <span>{{"X"+item.stock}}</span></h6>
        <h6>{{'¥'+item.price}}</h6>
      </div>
    </div>
  </div>
  <van-overlay :show="show" @click="show = false">
    <div class="wrapper">
      <div class="block">
        <van-radio-group v-model="checked" direction="horizontal">
          <van-radio name="1">支付宝</van-radio>
          <van-radio name="2">微信</van-radio>
        </van-radio-group>
        <img class="payimg" :src="parurl" alt="">
      </div>
    </div>
  </van-overlay>
</template>

<script>
import {onMounted,ref} from "vue";
import {orderxq} from "@/network/orders";
import {useRoute} from "vue-router";
import {payorder} from "@/network/pay";

export default {
  name: "OrderDetails",
  setup(){
    const onClickLeft = () => history.back();
    const route=useRoute()
    const goods=ref([])
    const goodslist=ref([])
    const orderdetails=ref([])
    const status=ref('')
    const show = ref(false);
    const parurl=ref('')
    const checked = ref('1');
    onMounted(()=>{
      orderxq(route.query.id).then(res=>{
        console.log(res);
        goods.value=res
        orderdetails.value=res.goods.data
        goodslist.value=res.orderDetails.data
        if(res.status==1){
          status.value="待付款"
        }else if(res.status==2){
          status.value="以支付"
        }else if(res.status==3){
          status.value="待发货"
        }else if(res.status==4){
          status.value="交易完成"
        }else if(res.status==5){
          status.value="过期"
        }
      })
    })
    const pay = () => {
      show.value=true
      payorder(route.query.id,'wechat').then(res=>{
        parurl.value=res.qr_code_url
        console.log(res);
      })
    }
    return {
      onClickLeft,
      orderdetails,
      goods,
      status,
      show,
      pay,
      checked
    }
  }
}
</script>

<style scoped lang="scss">
h6{
  margin: 10px 0;
}
.ordertitle{
  padding: 0 20px;
}
.orderprice{
  margin: 10px 20px;
}
.goods{
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
        margin: 20px 0;
        padding-left: 0;
      }
    }
  }
}
.block {
  width: 52%;
  background-color: #fff;
  border-radius: 3%;
  padding: 10px;
}
.van-radio-group{
  display: flex;
  justify-content: space-around;
  padding-top: 20px;
}
.payimg{
  width: 200px;
  margin: 0 auto;
}
</style>
