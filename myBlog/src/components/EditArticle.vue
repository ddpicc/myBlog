<template>
  <div class="wrap">
    <input type="text" class="title" placeholder="标题" name="title" v-model="title">
    <textarea name="content" cols="30" rows="25" placeholder="内容" class="content" v-model="content"></textarea>
    <div class="new">
      <span @click="saveClick">SAVE</span>
    </div>
  </div>
</template>
<script>
  import {mapState, mapActions, mapMutations} from 'vuex'
  export default {
    created() {
      if(this.$route.query.id) {
        this.id = this.$route.query.id;
        this.getArticle(this.id).then((article)=> {
          this.title = article.title;
          this.content = article.content;
        })
      }
    },
    data() {
      return {
        id: '',
        title: '',
        content: ''
      }
    },
    methods: {
      saveClick() {
        if(this.id == '')
          this.saveArticle({title: this.title, content: this.content}).then(()=>{
            this.$router.push({name: 'articles'});
          });
        else
          this.saveArticle({id: this.id, title: this.title, content: this.content}).then(()=>{
            this.$router.push({name: 'articles'});
          });
      },
      ...mapActions(['saveArticle', 'getArticle', 'setLoading']),
      ...mapMutations(['TOGGLE_TOAST'])
    }
  }
</script>
<style lang="less" scoped>
  input:focus,textarea:focus {
    outline: none;
  }
  .wrap {
    position: relative;
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      display: block;
      width: 40%;
      height: 30px;
      text-align: center;
      border: none;
      border-bottom: 1px solid rgb(65, 184, 131);
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 30px;
    }
    .content {
      padding: 15px;
      width: 100%;
      border: 1px solid rgb(65, 184, 131);
      border-radius: 4px;
      font-size: 16px;
    }
    .new {
      position: absolute;
      right: 0;
      top: 10px;
      display: inline-block;
      background-color: rgb(65, 184, 131);
      color: white;
      padding: 5px;
      border-radius: 4px;
      cursor: pointer;
    }
  }
</style>
