<template>
  <van-nav-bar
      title="绑定邮箱"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="email"
          name="email"
          label="邮箱"
          placeholder="邮箱"
          :rules="[{ required: true, message: '请填写邮箱' }]"
      />
      <van-field
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
import {addemailcode,addemail} from '@/network/user'
import {ref,onMounted} from "vue";

export default {
  name: "email",
  setup(){
    const onClickLeft = () => history.back();
    const code = ref('');
    const email = ref('');
    onMounted(()=>{

    })
    const onSubmit = (values) => {
      console.log('submit', values);
      code.value=values.code
      email.value=values.email
      addemail(values.code,values.email).then(res=>{
        console.log("请求成功",res.status);
      })
    };
    const getcode = () => {
      console.log("获取验证码",email.value)
      addemailcode(email.value).then(res=>{
        console.log(res);
      })
    }
    return {
      code,
      email,
      onSubmit,
      getcode,
      onClickLeft
    }

  }
}
</script>

<style scoped>

</style>
