<template>
  <div>
    <div class="title">{{title}}</div>
    <div class="content">{{content}}</div>
  </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  created() {
    this.getArticle(this.$route.query.id).then((article) => {
      this.title = article.title;
      this.content = article.content;
    })
  },
  data() {
    return {
      title: '',
      content: ''
    }
  },
  methods: mapActions(['getArticle'])
}
</script>
<style lang="less" scoped>
  .title {
    font-size: 20px;
    font-weight: bold;
    color: rgb(65, 184, 131);
  }
  .content {
    font-size: 16px;
    margin: 30px 50px;
  }
</style>
