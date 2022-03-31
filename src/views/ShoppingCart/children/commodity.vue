<template>
  <div v-if="catrslist.length">
    <van-checkbox-group v-model="checked" ref="checkboxGroup" @change="selectcat">
      <div  class="prentbox" v-for="item in catrslist" :key="item.id">
        <div style="padding: 57px 20px;">
          <van-checkbox :name="item.id"></van-checkbox>
        </div>
        <div>
          <van-swipe-cell>
            <van-card
                :num="item.goods.stock"
                :price="item.goods.price"
                :desc="item.goods.description"
                :title="item.goods.title"
                class="goods-card"
                :thumb="item.goods.cover_url"
            >
              <template #footer>
                <van-stepper v-model="item.num" :name="item.id" @change="upnum" :max="item.goods.stock" />
              </template>
            </van-card>
            <template #right>
              <van-button square text="删除" type="danger" class="delete-button" @click="delcatrs(item.id)"/>
            </template>
          </van-swipe-cell>
        </div>
      </div>
    </van-checkbox-group>
  </div>
  <van-empty v-else description="还没有商品哦，快去选购把！" />
  <van-submit-bar :price="toal*100" button-text="提交订单" @submit="onSubmit">
    <van-checkbox v-model="checkeds" @click="checkAll">全选</van-checkbox>
  </van-submit-bar>
</template>

<script>
import {computed, ref} from "vue";
import {getcartslist,deletecarts,numcatrs,checkedcatrs} from '@/network/catrs'
import {onMounted} from "vue";
import {useStore} from "vuex";
import {Dialog, Toast} from 'vant';
import {useRouter} from "vue-router";

export default {
  name: "commodity",
  setup() {
    const store=useStore()
    const nums=ref(1)
    const router=useRouter()
    const checked = ref([]);
    const catrslist=ref([])
    const value = ref(1);
    const checkboxGroup = ref(null);
    const VanDialog = Dialog.Component;
    const checkeds = ref(true);
    const init = () => {
      getcartslist().then(res=>{
        console.log(res.data);
        catrslist.value=res.data
        checked.value=res.data.filter(item=>item.is_checked===1).map(items=>items.id)
      })
    }
    onMounted(()=>{
      init()
      if(checked.value.length!==catrslist.value.length){
        checkeds.value=false
      }else{
        checkeds.value=true
      }
    })
    const onClickLink = () => Toast('修改地址');
    //反旋
    const toggleAll = () => {
      checkboxGroup.value.toggleAll();
    }
    //全选
    const checkAll = () => {
      if(checked.value.length!=catrslist.value.length){
        checkboxGroup.value.toggleAll(true);
      }else{
        checkboxGroup.value.toggleAll();
      }
    }
    const delcatrs = (id) => {
      Dialog.confirm({
        title: '是否删除',
        message:
            '如果解决方法是丑陋的，那就肯定还有更好的解决方法，只是还没有发现而已。',
      })
      .then(() => {
            deletecarts(id).then(res=>{
              if (res.status==204){
                init()
                store.dispatch('getcartsNum')
              }
          })
      })
      .catch(() => {
            // on cancel
       });
    }
    //商品数量
    const upnum = (value,detail) => {
      numcatrs(detail.name,value).then(res=>{
        console.log(res);
      })
    }
    //商品选中状态
    const selectcat = (names) => {
      checkedcatrs({cart_ids:names}).then(res=>{
        console.log(res);
        if(checked.value.length!=catrslist.value.length){
          checkeds.value=false
        }else {
          checkeds.value=true
        }
      })
    }
    const toal=computed(()=>{
      return catrslist.value.filter(item=>checked.value.includes(item.id)).reduce((s,n)=>s+=n.num*n.goods.price,0)
    })
    const onSubmit = () => {
      Toast('提交成功')
      router.push('/ordershow')
    }
    // const tal=computed(catrslist.re)
    return {
      checked,
      nums,
      catrslist,
      value,
      onClickLink,
      checkeds,
      checkAll,
      checkboxGroup,
      delcatrs,
      upnum,
      selectcat,
      toal,
      onSubmit
    };
  },
}
</script>

<style scoped lang="scss">
.goods-card {
  margin: 0;
}
.delete-button {
  height: 100%;
}
.van-submit-bar{
  margin-bottom: 50px;
}
.goods-card{
  width: 300px;
}
.prentbox{
  display: flex;
  justify-content: space-around;
}
</style>
