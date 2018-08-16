<template>
  <div class="boardpage">
    <Thread v-for="(thread, i) in threads" :key="i" :thread="thread" :board="abbr" :view-all="true"/>
  </div>
</template>

<script>
import axios from 'axios';
import Thread from '../components/Thread.vue';

export default {
  name: 'BoardPage',
  props: {
    abbr: String
  },
  data: function() {
    return {
      threads: []
    }
  },
  created: function() {
    console.log(this.abbr);
    axios.get(`http://localhost:3000/api/v1/boards/${this.abbr}`)
      .then(response => {
        console.log(response.data.threads);
        this.threads = response.data.threads;
      });
  },
  components: {
    Thread
  }
}
</script>

<style lang="scss">
.boardpage {
  background-color: #dfe6e9;
  padding: 15px;
}
</style>
