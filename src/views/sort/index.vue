<template>
  <navbar></navbar>
  <slderbar :goods="goodssort"></slderbar>
  <boottomnav></boottomnav>
</template>

<script>
import navbar from "@/views/sort/children/navbar";
import slderbar from "@/views/sort/children/slderbar";
import {getcategory} from "@/network/home";
import boottomnav from "@/components/private/boottomnav";
export default {
  name: "index",
  data(){
    return{
      goodssort:[]
    }
  },
  components:{
    slderbar,
    navbar,
    boottomnav
  },
  mounted() {
    getcategory().then(res=>{
      console.log(res)
      this.goodssort=res.categories
    })
  },
  setup(){

  }
}
</script>

<style scoped>

</style>
