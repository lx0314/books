<template>
  <van-nav-bar
      :title="$route.query.type!='edit'?'新增地址':'编辑地址'"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
  <van-address-edit
      :area-list="areaList"
      show-delete
      :address-info="info"
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
  />
</template>
<script>
import { ref ,onMounted} from 'vue';
import { Toast } from 'vant';
import { areaList } from '@vant/area-data';
import {addaddres,getaddressinfo,updataaddress,deleteaddress} from "@/network/Address";
import {useRouter,useRoute} from "vue-router";

export default {
  name: "setaddresss",
  setup() {
    const searchResult = ref([]);
    const router=useRouter()
    const route=useRoute()
    const onClickLeft = () => history.back();
    const onDelete = () =>{
      if(route.query.type=='edit'){
        deleteaddress(route.query.id).then(res=>{
          Toast('delete');
          router.push('/address')
        })
      }

    }
    const onChangeDetail = (val) => {
      if (val) {
        searchResult.value = [
          {
            name: '黄龙万科中心',
            address: '杭州市西湖区',
          },
        ];
      } else {
        searchResult.value = [];
      }
    };
    const info=ref({})
    const onSave = (content) => {
      let datds={
        name:content.name,
        address:content.addressDetail,
        phone:content.tel,
        province:content.province,
        city:content.city,
        county:content.county,
        is_default:content.isDefault?1:0
      }
      if(route.query.type!='edit'){
        addaddres(datds).then(res=>{
          Toast('提交成功');
          router.push('/address')
        })
      }else{
        updataaddress(route.query.id,datds).then(res=>{
          Toast('更新成功');
          router.push('/address')
        })
      }

    }
    onMounted(()=>{
      if(route.query.type=='edit'){
        getaddressinfo(route.query.id).then(res=>{
          let areaCode=''
          for(let i in areaList.county_list){
            if(areaList.county_list[i]===res.county){
              areaCode=i
            }
          }
          info.value={
            name:res.name,
            addressDetail:res.address,
            tel:res.phone,
            province:res.province,
            city:res.city,
            county:res.county,
            isDefault:res.is_default==1?true:false,
            areaCode
          }
        })
      }

    })
    return {
      onSave,
      onDelete,
      areaList,
      searchResult,
      onChangeDetail,
      onClickLeft,
      info
    };
  },
};

</script>

<style scoped>

</style>
