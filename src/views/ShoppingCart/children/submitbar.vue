<template>

</template>

<script>
import {ref} from "vue";

export default {
  name: "submitbar",
  setup() {
    const onClickLink = () => Toast('修改地址');
    const checked = ref(true);
    const checkAll = () => {
      checkboxGroup.value.toggleAll(true);
    }
    return {
      onClickLink,
      checked,
      checkAll
    };
  },
}
</script>

<style scoped>

</style>
