<template>
  <div id="app">
    <router-view></router-view>
    <Loading v-show="isLoading"></Loading>
    <Toast v-show="isToast"></Toast>
  </div>
</template>

<script>
import Toast from './components/Toast.vue'
import Loading from './components/Loading.vue'
import {mapState} from 'vuex'

export default {
  name: 'app',
  components: {
    Toast,
    Loading
  },
  computed: mapState(['isToast', 'isLoading'])
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
