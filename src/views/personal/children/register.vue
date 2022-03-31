<template>
  <van-nav-bar
      title="注册"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
  <van-image
      round
      fit="cover"
      width="10rem"
      height="10rem"
      src="https://img.yzcdn.cn/vant/cat.jpeg"
  />
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="name"
          name="name"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
          v-model="password_confirmation"
          type="password"
          name="password_confirmation"
          label="确认密码"
          placeholder="确认密码"
          :rules="[{ required: true, message: '请再次填写密码' }]"
      />
      <van-field
          v-model="email"
          name="email"
          label="邮箱"
          placeholder="邮箱"
          :rules="[{ required: true, message: '请填写邮箱' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <div @click="$router.push('/login')">已有账号，去登录</div>
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

</template>

<script>
import { reactive ,toRefs} from 'vue';
import {getregister} from '@/network/UserRegister'
import {Toast} from 'vant'

export default {
  setup() {
    const onClickLeft = () => history.back();
    const data = reactive({
      name:'',
      password:'',
      password_confirmation:"",
      email:''
    });
    const onSubmit = (values) => {
     if(data.password!==data.password_confirmation){
       Notify({ type: 'danger', message: '密码不一致' });
     }else{
       getregister(values).then(res=>{
        if(res.status===201){
          Toast.success('注册成功！')

        }
       })
     }
    };

    return {
      ...toRefs(data),
      onSubmit,
      onClickLeft
    };
  },
};

</script>

<style scoped>

</style>
