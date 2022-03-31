<template>
  <van-nav-bar
      title="修改密码"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="old_password"
          name="old_password"
          label="旧密码"
          placeholder="旧密码"
          :rules="[{ required: true, message: '请填写旧密码' }]"
      />
      <van-field
          v-model="password"
          name="password"
          label="新密码"
          placeholder="新密码"
          :rules="[{ required: true, message: '请填写新密码' }]"
      />
      <van-field
          v-model="password_confirmation"
          name="password_confirmation"
          label="确认新密码"
          placeholder="确认新密码"
          :rules="[{ required: true, message: '请确认填写新密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script>
import {setpassword} from "@/network/user";
import {ref} from "vue";
import {useRouter} from "vue-router";

export default {
  name: "setpassword",
  setup(){
    const onClickLeft = () => history.back();
    const old_password = ref('');
    const password = ref('');
    const password_confirmation = ref('');
    const router=useRouter()
    const onSubmit = (values) => {
      console.log('submit', values);
      old_password.value=values.old_password
      password.value=values.password
      password_confirmation.value=values.password_confirmation
      setpassword(old_password.value,password.value,password_confirmation.value).then(res=>{
        console.log(res);
        router.push('/personal')
      })
    };
    return {
      old_password,
      password,
      password_confirmation,
      onSubmit,
      onClickLeft
    }
  }
}
</script>

<style scoped>

</style>
