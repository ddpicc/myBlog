<template>
  <div>
    <div class="header">
      <img src="../assets/logo2.jpg" alt="logo" class="logo">
      <div class="nav">
        <router-link :to="{path: '/All'}" class="nav-item">
          <span>总览</span>
        </router-link>
        <router-link :to="{name: 'articles'}" class="nav-item">
          <span>我的文章</span>
        </router-link>
        <router-link :to="{name: 'about'}" class="nav-item">
          <span>关于我</span>
        </router-link>
        <router-link :to="{name: 'collection'}" class="nav-item">
          <span>我的收藏</span>
        </router-link>
      </div>
      <div class="info">
        Hi,{{getCookie}}
        <button class="btn" @click="logoutClick">退出</button>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import {get, unset} from '../assets/js/cookieUtil'
export default {
  name: 'editview',
  // 判断是否登录过
  created() {
    const username = get('username');
    const sessionId = get('session_id');
    if(!username) {
      alert('尚未登录');
      this.$router.push({name: 'login'});
    } else {
      // 在此处判断session是否合法
      this.checkSession(sessionId).then((status) => {
        // console.log(sessionId);
        console.log(status);
        if (status === 1 || status === 3) {
          alert('尚未登录');
          this.$router.push({name: 'login'});
        }
      })
    }
  },
  data () {
    return {
    }
  },
  methods: {
    logoutClick: function() {
      unset('username', '/', window.location.hostname);
      unset('session_id', '/', window.location.hostname);
      this.$router.push({name: 'login'});
    },
    ...mapMutations(['SET_USER']),
    ...mapActions(['checkSession'])
  },
  computed: {
    getCookie: function() {
      return get('username');
    }
  }
}
</script>

<style scoped lang="less">
  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    border-bottom: 0.5px solid #ddd;
    margin-bottom: 30px;
    padding-bottom: 15px;
    .logo {
      display: inline-block;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 0.5px solid #ddd;
    }
    .nav {
      width: 40%;
      display: flex;
      justify-content: space-around;
      .nav-item {
        display: inline-block;
        font-style: normal;
        color: rgb(65, 184, 131);
        text-decoration-line: none;
      }
    }

    .info {
      display: inline-block;
      .btn {
        width: 40%;
        border: 1px solid rgb(65, 184, 131);
        background-color: white;
        color: rgb(65, 184, 131);
        margin-top: 10px;
        border-radius: 4px;
      }
    }
  }
</style>
