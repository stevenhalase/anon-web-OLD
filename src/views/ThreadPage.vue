<template>
  <div class="threadpage">
    <Thread v-if="thread !== null" :thread="thread" :board="abbr" :view-all="false"/>
  </div>
</template>

<script>
import axios from 'axios';
import Thread from '../components/Thread.vue';

export default {
  name: 'ThreadPage',
  props: {
    abbr: String,
    threadNo: {
        type: [Number, String],
        required: true
    }
  },
  data: function() {
    return {
      thread: null
    }
  },
  created: function() {
    console.log(this.abbr);
    axios.get(`http://localhost:3000/api/v1/boards/${this.abbr}/thread/${this.threadNo}`)
      .then(response => {
        console.log(response.data.posts);
        this.thread = { posts: response.data.posts };
      });
  },
  components: {
    Thread
  }
}
</script>

<style lang="scss">
.threadpage {
  background-color: #dfe6e9;
  padding: 15px;
}
</style>
