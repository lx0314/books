import { createStore } from 'vuex'
import {getcartslist} from '@/network/catrs'

export default createStore({
  state: {
    loadings:true,
    personal:{
      usename:'',
    },
    status:0

  },
  getters: {

  },
  mutations:{
    getcatrsnum(state,num){
      state.status=num
    }
  },
  actions: {
    getcartsNum({commit}){
      getcartslist().then(res=>{
        commit('getcatrsnum',res.data.length)
      })
    }
  },
  modules: {
  }
})
