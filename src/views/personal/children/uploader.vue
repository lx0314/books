<template>
  <van-nav-bar
      title="修改密码"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
  <van-uploader v-model="fileList" multiple :max-count="1" />
  <van-button type="primary" block>提交</van-button>

</template>

<script>
import { ref } from 'vue';

export default {
  name: "uploader",
  setup() {
    const onClickLeft = () => history.back();
    const fileList = ref([]);

    return {
      fileList,
      onClickLeft
    };
  },
};
</script>

<style scoped>

</style>
