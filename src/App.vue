<template>
  <router-view/>
</template>
<script>
import {onMounted} from "vue";
import {useStore} from 'vuex'

export default {
  name:'App',
  setup(){
    const store=useStore()
    onMounted(()=>{
      store.dispatch('getcartsNum')
    })
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-bottom: 50px;
}
.van-loading{
  text-align: center;
}
</style>
