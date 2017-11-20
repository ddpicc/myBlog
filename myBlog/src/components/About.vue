<template>
  <div class="wrap">
    <div class="new" @click="add">
      <span>+</span>
    </div>
    <div class="new" @click="saveLinks(links); isChange = false" style="right: -35px;">
      <span v-bind:class="{active:isChange}">S</span>
    </div>
    <table>
      <tr class="header">
        <td>链接名称</td>
        <td>链接地址</td>
        <td>操作</td>
      </tr>
      <tr v-for="(item, index) in links" class="content">
        <td>
          <input type="text" @input="updateLinkName({name: $event.target.value, index: index}); isChange = true" :value="item.name">
        </td>
        <td>
          <input type="text" @input="updateLinkAddr({addr: $event.target.value, index: index}); isChange = true;" :value="item.addr">
        </td>
        <td @click="deleteLink(index);isChange = true">删除</td>
      </tr>
    </table>
    <div class="add_window" v-if="isShow">
      <h5>添加一条链接</h5>
      <span class="close" @click="isShow = false">x</span>
      <input type="text" placeholder="请输入链接名称" class="link_name" v-model="name">
      <input type="text" placeholder="请输入链接地址" class="link_addr" v-model="addr">
      <input :value="tips" disabled class="tips" type="text"></input>
      <input type="submit" value="添加" class="btn" @click="add_one" >
    </div>
  </div>
</template>
<script>
import {mapState, mapActions, mapMutations} from 'vuex'
export default {
  name: 'about',
  data () {
    return {
      isShow: false,
      name: '',
      addr: '',
      tips: '',
      isChange: false,
      timer: null
    }
  },
  created () {
    this.setLoading();
    this.getLinks().then(()=> {
      this.setLoading();
    });
  },
  computed: {
    ...mapState(['links'])
  },
  methods: {
    add: function() {
      if(this.links.length >= 4) {
        alert('添加超过四条以上的链接啦')
      } else {
        this.isShow = true;
        this.tips = '';
        this.name = '';
        this.addr = '';
      }
    },
    add_one: function() {
      if(this.name == '') {
        this.tips = '链接名称不能为空';
      }
      else if(this.addr == '') {
        this.tips = '链接地址不能为空';
      }
      else {
        this.addLink({name: this.name, addr: this.addr});
        if(!this.timer) {
          this.timer = setTimeout(()=>{
            this.saveLinks(this.links);
            clearTimeout(this.timer);
            this.timer = null;
          }, 5000);
        }
        this.isShow = false;
        this.isChange = true;
      }
    },
    ...mapActions(['getLinks', 'addLink', 'updateLinkName', 'updateLinkAddr', 'deleteLink', 'saveLinks', 'setLoading'])}
}
</script>
<style scoped lang='less'>
  input:focus {
    outline: none;
  }
  .wrap {
    position: relative;
    width: 60%;
    margin: 0 auto;
    span, .btn, .btn-save, .close{
      cursor: pointer;
    }
    .add_window {
      display: flex;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 60%;
      background-color: white;
      border: 1px solid #ddd;
      flex-direction: column;
      align-items: center;
      input {
        text-align: center;
        border: none;
      }
      .link_name, .link_addr {
        display: block;
        height: 30px;
        margin-bottom: 10px;
        border: none;
        border-bottom: 1px solid rgb(65, 184, 131);
      }
      .btn {
        width: 20%;
        border: none;
        background-color: rgb(65, 184, 131);
        margin-top: 10px;
        border-radius: 4px;
        color: white;
        margin-bottom: 10px;
      }
      .close {
        position: absolute;
        right: 10px;
        top: 10px;
        padding: 0 5px;
        background-color: lightcoral;
        color: white;
      }
    }
    table {
      width: 100%;
    }
    .new {
      position: absolute;
      right: 0;
      top: -20px;
      span {
        display: inline-block;
        width: 30px;
        height: 30px;
        font-size: 30px;
        line-height: 30px;
        border-radius: 50%;
        background-color: rgb(65, 184, 131);
        color: white;
      }
      .active {
        background-color: orange;
      }
    }
    .header {
      height: 30px;
      td {
        color: rgb(65, 184, 131);
        font-weight: bold;
        width: 30%;
        text-align: center;
        font-size: 18px;
      }
    }
    .content {
      height: 50px;
      td {
        line-height: 50px;
        input {
          text-align: center;
          border: none;
        }
      }
    }
    .btn-save {
      padding: 5px;
      border: 1px solid rgb(65, 184, 131);
      background-color: white;
      position: absolute;
      right: 0;
      top: 50px;
      color: rgb(65, 184, 131);
    }

  }
</style>
