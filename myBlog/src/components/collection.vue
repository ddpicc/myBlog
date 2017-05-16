<template>
  <div>
    <div v-for="(item, index) in articles">
      <div v-if="item.favor" class="title-item">
        <div class="title">
          <router-link :to="{name: 'article', query: {id: item._id}}" class="title">
            {{item.title}}
          </router-link>
          <span class="cancel" @click="changeFavor({id: item._id, index, favor: item.favor})">
              取消收藏
              <i class="pointer"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
export default {
  created() {
    this.getArticles();
  },
  computed: mapState(['articles']),
  methods: mapActions(['getArticles', 'changeFavor'])
}
</script>
<style lang='less' scoped>
  .title {
    color: rgb(65, 184, 131);
    text-decoration-line: none;
    font-size: 20px;
    font-weight: bold;
    line-height:35px;
  }
  .title:hover {
    color: orange;
  }
  .title {
    display: inline-block;
    position: relative;
    .cancel {
      cursor: pointer;
      width: 60px;
      visibility: hidden;
      position: absolute;
      right: -80px;
      font-weight: normal;
      font-size: 12px;
      color: orange;
      padding: 0 3px;
      border-radius: 4px;
      background-color: rgb(65, 184, 131);
      color: white;
      i {
        position: absolute;
        left: -3px;
        bottom: 50%;
        display: inline-block;
        width: 0;
        height: 0;
        border-right: 3px solid rgb(65, 184, 131);
        border-bottom: 3px solid transparent;
        border-top: 3px solid transparent;
      }
    }
  }
  .title-item:hover {
    .cancel {
      visibility: visible;
    }
  }
</style>
