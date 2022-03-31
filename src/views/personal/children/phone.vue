<template>
  <van-nav-bar
      title="绑定电话"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="phone"
          name="phone"
          label="电话号码"
          placeholder="电话号码"
          :rules="[{ required: true, message: '请填写电话号码' }]"
      />
      <van-field
          clearable
          v-model="code"
          name="code"
          label="验证码"
          placeholder="验证码"
      >
        <template #button>
          <van-button size="small" @click="getcode" type="primary">发送验证码</van-button>
        </template>
      </van-field>
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script>
import {addphone,addphonecode} from '@/network/user'
import {ref,onMounted} from "vue";

export default {
  name: "phone",
  setup(){
    const onClickLeft = () => history.back();
    const code = ref('');
    const phone = ref('');
    onMounted(()=>{

    })
    const onSubmit = (values) => {
      console.log('submit', values);
      code.value=values.code
      phone.value=values.phone
      addphone(code.value,phone.value).then(res=>{
        console.log(res);
      })
    };
    const getcode = () => {
      console.log("获取验证码")
      console.log(phone.value);
      addphonecode(phone.value).then(res=>{
        console.log(res);
      })
    }
    return {
      code,
      phone,
      onSubmit,
      getcode,
      onClickLeft
    }

  }
}
</script>

<style scoped>

</style>
