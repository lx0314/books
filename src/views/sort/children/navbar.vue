<template>
  <van-nav-bar
      title="分类"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
  <van-search
      v-model="value"
      shape="round"
      background="#16cb8a"
      placeholder="请输入搜索关键词"
  />
</template>

<script>
export default {
  name: "navbar",
  setup() {
    const onClickLeft = () => history.back();
    return {
      onClickLeft,
    };
  },
};
</script>

<style scoped>

</style>
