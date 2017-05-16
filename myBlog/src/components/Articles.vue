<template>
  <div class="wrap">
    <router-link :to="{name: 'editarticle'}">
      <div class="new">
        <span>+</span>
      </div>
    </router-link>
    <table>
      <tr class="header">
        <td>标题</td>
        <td>日期</td>
        <td>操作</td>
      </tr>
      <tr v-for="(item, index) in articles" class="content">
        <td>
          <router-link :to="{name: 'article', query: {id: item._id}}" class="title">
            {{item.title}}
          </router-link>
        </td>
        <td>{{item.date.substring(0, 10)}}</td>
        <td class="operation">
          <i><router-link :to="{name: 'editarticle',  query: {id: item._id}}">编辑</router-link></i> |
          <i @click="deleteArticle({id: item._id, index})">删除</i> |
          <i @click="changeFavor({id: item._id, favor: item.favor, index})">
            <span v-if="item.favor">取消收藏</span>
            <span v-else>收藏</span>
          </i>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'articles',
  data () {
    return {
    }
  },
  created () {
    this.getArticles();
  },
  computed: mapState(['articles']),
  methods: {
    ...mapActions(['getArticles', 'deleteArticle', 'changeFavor', 'setLoading'])
  }
}
</script>
<style scoped lang="less">
  .wrap {
    position: relative;
    width: 80%;
    margin: 0 auto;
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
    }
    .header {
      height: 30px;
      td {
        color: rgb(65, 184, 131);
        font-weight: bold;
        width: 33.3%;
        text-align: center;
        font-size: 18px;
      }
    }
    .content {
      height: 50px;
      .title {
        color: rgb(65, 184, 131);
        text-decoration-line: none;
      }
      .title:hover {
        color: orange;
      }
      i{
        text-decoration-line: none;
        font-size: 14px;
        font-style: normal;
        text-decoration-line: none;
        cursor: pointer;
      }
      i:hover {
        color: orange;
      }
    }
  }
</style>
