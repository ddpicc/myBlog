import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getter'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {},
    articles: [],
    links: [],
    isToast: false,
    isLoading: false,
    toast: {
      content: '',
      resolve: ()=>{},
      reject: ()=>{},
      promise: null,
      isCancel: true
    }
  },
  getters,
  mutations,
  actions
})

export default store
