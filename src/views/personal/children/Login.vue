<template>
  <van-nav-bar
      title="登录"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="email"
          name="email"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填邮箱' }]"
      />
      <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div @click="$router.push('./register')">还没有账号去注册</div>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>
<script>
import {ref,toRefs,reactive} from "vue";
import {getlogin} from "@/network/UserRegister";
import {useRouter} from "vue-router";
import {Toast} from 'vant'

export default {
  name: "Login",
  setup() {
    const onClickLeft = () => history.back();
    const data=reactive({
      email:'',
      password:""
    })
    const router=useRouter()
    const onSubmit = (values) => {
      getlogin(values).then(res=>{
        //保存登录获取到的token值到本地浏览器中
        window.localStorage.setItem('token',res.access_token)
        //获取localStorage值 window.localStorage.getItem('token')
        Toast.success('登录成功！')
        router.push({path:'/personal'})
      })
    };

    return {
      ...toRefs(data),
      onSubmit,
      onClickLeft
    };
  },
}
</script>

<style scoped>

</style>
