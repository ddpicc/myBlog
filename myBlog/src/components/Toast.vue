<template>
  <div class="wrap">
    <div class="tips">{{toast.content}}</div>
    <button @click="toast.resolve" class="comfirm">yes</button>
    <button @click="toast.reject" class="cancel" v-if="toast.isCancel">no</button>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: 'Toast',
  computed: mapState(['toast'])
}
</script>
<style lang='less' scoped>
  .wrap {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 100px;
    border: 1px solid #ddd;
    background-color: white;
    border-radius: 4px;
    .tips {
      font-weight: bold;
      margin: 20px 0;
    }
    button {
      border: none;
    }
    .comfirm {
      width: 30%;
      background-color: rgb(65, 184, 131);
      color: white;
    }
    .cancel {
      width: 30%;
      background-color: lightcoral;
      color:white;
    }
  }
</style>
