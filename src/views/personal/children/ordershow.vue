<template>
  <van-nav-bar
      title="生成订单"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
  <div class="address" style="display: flex">
    <div>
      <h6>{{addresss.name+addresss.phone}}</h6>
      <h6>{{ addresss.province + addresss.city + addresss.county + addresss.address }}</h6>
    </div>
    <div class="icoe">
      <van-icon name="arrow" size="35px" @click="$router.push('/address')" />
    </div>
  </div>
  <div class="goodslist" v-for="item in goodslist" :key="item.id">
    <div class="imgbox">
      <img :src="item.goods.cover_url" alt="">
    </div>
    <div class="titlebox">
      <h6>{{item.goods.title}} <span>{{"X"+item.num}}</span></h6>
      <h6>{{'¥'+item.goods.price}}</h6>
    </div>
  </div>
  <van-submit-bar :price="toal*100" button-text="提交订单" @submit="onSubmit" />
  <van-overlay :show="show" @click="show = false">
    <div class="wrapper" @click.stop>
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
import {preview,addorder} from '@/network/orders'
import {onMounted,ref,computed} from "vue";
import { Toast } from 'vant';
import {useStore} from "vuex";
import {payorder} from "@/network/pay";
export default {
  name: "ordershow",
  setup(){
    const onClickLeft = () => history.back();
    const store=useStore()
    const addresss=ref([])
    const goodslist=ref([])
    const show = ref(false);
    const checked = ref('1');
    const parurl=ref('')
    onMounted(()=>{
      preview().then(res=>{
        console.log(res);
        addresss.value=res.address.filter(item=>item.is_default==1)[0]
        goodslist.value=res.carts
      })
      // addorder(896).then(res=>{
      //   console.log(res);
      // })
    })
    const toal=computed(()=>{
      return goodslist.value.reduce((s,n)=>s+=(n.num*n.goods.price),0)
    })
    const onSubmit = () => {
      console.log(addresss);
      addorder(addresss.value.id).then(res=>{
        payorder(res.id,'aliyun').then(res=>{
          parurl.value=res.qr_code_url
          console.log(res);
        })
        payorder(res.id,'wechat').then(res=>{
          parurl.value=res.qr_code_url
          console.log(res);
        })
        Toast('点击按钮');
        store.dispatch('getcartsNum')
        show.value=true
        console.log(res);
      })
    }
    return {
      addresss,
      onClickLeft,
      goodslist,
      toal,
      onSubmit,
      show,
      checked,
      parurl
    }
  }

}
</script>

<style scoped lang="scss">
.address{
  border-bottom: 3px solid #16cb8a;
  justify-content: space-around;
  .icoe{
    padding-top: 10px;
  }
}
h6{
  margin: 10px 0;
  padding-left: 20px;
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
      color: red;
      padding-left: 0;
    }
  }
}
.van-overlay{
  z-index: 999;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
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
