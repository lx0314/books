<template>
  <van-nav-bar
      title="地址管理"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
  <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      @select="defultaddres"
  />

</template>

<script>
import {ref, onMounted} from 'vue';
import { Toast } from 'vant';
import {useRouter} from "vue-router";
import {addreslist,defaultaddress} from '@/network/Address'

export default {
  name: "address",
  setup() {
    const onClickLeft = () => history.back();
    const list =ref([])
    const router=useRouter()
    const chosenAddressId = ref(1)
    const onAdd = () =>{
      Toast('新增地址');
      router.push('/setaddress')
    }
    const onEdit = (item, index) =>{
      Toast('编辑地址:' + index);
      router.push({path:'/setaddress',query:{type:'edit',id:item.id}})
    }
    const init = () => {
      addreslist().then(res=>{
        list.value=res.data.map(item=>{
          return {
            id: item.id,
            name: item.name,
            tel: item.phone,
            address: item.province+item.city+item.county+item.address,
            isDefault: item.is_default==1?true:false
          }
        })
        chosenAddressId.value=res.data.filter(item=>item.is_default==1)[0].id
        console.log(res.data.filter(item=>item.is_default==1)[0].id);
      })
    }
    onMounted(()=>{
      init()
    })
    const defultaddres = (item,index) => {
      defaultaddress(item.id).then(res=>{
        Toast('成功设为默认');
        init()
      })
    }
    return {
      list,
      onAdd,
      onEdit,
      chosenAddressId,
      onClickLeft,
      defultaddres
    };
  },
}
</script>

<style scoped>

</style>
