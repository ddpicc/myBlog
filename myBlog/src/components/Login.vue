<template>
  <div class="wrap">
    <h1>登录</h1>
    <input type="text" placeholder="请输入用户名" name="username" class="username" v-model="name">
    <input type="password" placeholder="请输入密码" name="password" class="password" v-model="pwd">
    <input type="text" :value="tips" class="tips" disabled>
    <input type="button" value="登录" @click="loginClick" class="btn">
  </div>
</template>
<script>
  import {mapState, mapActions} from 'vuex'
  import {set}  from '../assets/js/cookieUtil'
  export default {
    data() {
      return {
        name: '',
        pwd: '',
        tips: ''
      }
    },
    methods: {
      ...mapActions(['login']),
      loginClick: function() {
        if(this.name == '') {
          this.tips = '用户名不能为空';
        } else if(this.pwd == '') {
          this.tips = '密码不能为空';
        } else {
          this.login({username: this.name, password: this.pwd})
            .then((msg) => {
              set('username', this.name, new Date(Date.now()+60000*30), '/', window.location.hostname);
              this.$router.push({name: 'articles'});
            })
            .catch((msg) => {
              this.tips = msg;
            });
        }
      }
    }
  }
</script>
<style scoped lang='less'>
  input:focus {
    outline: none;
  }
  .wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    .username, .password{
      text-align: center;
      width: 300px;
      height: 20px;
      padding: 5px 5px;
      margin-bottom: 10px;
      border: none;
      border-bottom: 1px solid rgb(65, 184, 131);
    }
    .tips {
      text-align: center;
      color: rgb(65, 184, 131);
      border: none;
    }
    .btn {
      width: 310px;
      height: 30px;
      background-color: rgb(65, 184, 131);
      border: none;
      color: white;
      margin-top: 10px;
    }
  }
</style>
