<template>
  <div>
    <button class="btn" @click="goBack()">返回</button>
    <div class="links">
      <div v-for="link in links" class="link">
        <a :href="link.addr">{{link.name}}</a>
      </div>
      <i class="carot"></i>
    </div>
    <div class="articles">
      <div v-for="item in classified.years">
        <p class="year">{{item}}</p>
        <div v-for="article in classified.articlesInyear[item]" class="article-item">
          <p class="date">{{article.date.substring(0, 10)}}</p>
          <router-link :to="{name: 'article', query: {id: article._id}}" class="title">
            <p @click="getArticle">{{article.title}}</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState, mapGetters, mapActions} from 'vuex'
export default {
  name: 'allview',
  data () {
    return {}
  },
  created() {
    this.getArticles();
    this.getLinks();
    console.log('links', this.links);
  },
  computed: {
    ...mapState(['articles', 'links']),
    ...mapGetters(['classified'])
  },
  methods: {
    goBack: function () {
      this.$router.push({path: '/editview/articles'})
    },
    ...mapActions(['getArticles', 'getLinks'])
  }
}
</script>
<style scoped lang='less'>
  .btn {
    color: white;
    width: 100px;
    padding: 5px;
    border-radius: 4px;
    background-color: rgb(65, 184, 131);
    border: none;
  }
  .links {
    position: absolute;
    top: 0;
    right: 100px;
    width: 150px;
    text-align: center;
    background-color: rgb(65, 184, 131);
    .link {
      color: white;
      padding: 5px 0;
      a {
        color: white;
        text-decoration-line: none;
      }
      &:last-of-type {
        margin-bottom: 30px;
      }
    }
    .carot {
      position: absolute;
      bottom: 0px;
      left: 0px;
      width: 0;
      height: 0;
      border-bottom: 25px solid white;
      border-left: 75px solid transparent;
      border-right: 75px solid transparent;
    }
  }
  .articles {
    width: 80%;
    margin: 0 auto;
    .year {
      text-align: left;
      font-weight: bold;
      font-size: 25px;
    }
    .article-item {
      text-align: left;
      text-indent: 30px;
      margin-bottom: 10px;
    }
    .title, .date {
      font-size: 18px;
      display: inline;
      vertical-align: middle;
    }
    .date {
      color: #999;
      margin-right: 10px;
      font-size: 14px;
    }
    .title {
      display: inline-block;
      text-indent: 10px;
      color: rgb(65, 184, 131);
      text-decoration-line: none;
      p {
        margin: 0;
      }
    }
    .title:hover {
      color: orange;
    }
  }
</style>
