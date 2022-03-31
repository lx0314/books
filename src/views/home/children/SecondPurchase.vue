<template>
<div>
  <div class="titletop">
    <h2><van-icon name="good-job-o" />限时秒购</h2>
    <p>倒计时
      <van-count-down :time="time" format="HH : mm : ss" />
    </p>
  </div>
  <ul>
    <li v-for="item in slidess" :key="item.id"  @click="$router.push('/goodsshow/'+item.id)">
      <a href="#">
        <img :src="item.cover_url" alt="">
        <span style="color: red ;padding-right:10px">¥:{{ item.price }}</span>
        <span style="color:#ccc;"><del>12</del></span>
      </a>
    </li>
  </ul>
</div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "SecondPurchase",
  props:{
    slidess:{
      type:Array
    }
  },
  setup() {
    const time = ref(30 * 60 * 60 * 1000);
    return { time };
  },

}
</script>

<style scoped lang="scss">
.titletop{
  padding: 10px 20px;
  h2{
    float: left;
    font-size: 1rem;
    .van-icon-good-job-o:before {
      color: lawngreen;
    }
  }
  p{
    float: right;
  }
}
ul{
  padding: 10px 20px;
  margin: 0;
  list-style: none;
  clear: both;
  li{
    width: 21%;
    float: left;
    margin: 0 2%;
    a{
      display: block;
      img{
        width: 100%;
        height: 80px;
      }
      span{
        width: 50%;
        text-align: center;
      }
    }
  }
}
</style>
