import Vue from 'vue'
import Vuex from 'vuex'
import { getItem,setItem } from '../utils/storage'

Vue.use(Vuex)

const USER_KEY = 'user';

export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY) // 当前登录用户的登录状态
  },
  mutations: {
    setUser(state,data){
      state.user = data;
      //  放入本地进行持久化
      //window.localStorage.setItem('user',JSON.stringify(state.user))
      setItem(USER_KEY,state.user);
    }
  },
  actions: {
  },
  modules: {
  }
})
