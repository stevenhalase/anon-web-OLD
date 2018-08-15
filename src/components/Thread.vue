<template>
  <div class="thread">
    <Card class="thread-op-container">
      <div v-if="op.tim && op.ext" class="thread-image">
        <div class="thread-image-info">
          <span @click="openImage" class="thread-image-info-filename">{{ op.filename.length > 25 ? `${op.filename.slice(0,25)}(...)${op.ext}` : `${op.filename}${op.ext}` }}</span>
          <span>{{ `(${op.w}x${op.h})` }}</span>
        </div>
        <img @click="openImage" :src="`http://i.4cdn.org/${board}/${op.tim}s.jpg`" :width="op.tn_w" :height="op.tn_h" />
      </div>
      <div class="thread-content">
        <h3>{{op.sub}}</h3>
        <div v-html="op.com"></div>
      </div>
    </Card>
    <Card class="thread-replies">
      <div v-if="replies.length > 0">
        <Post v-for="(post, index) in replies" :board="board" :post="post" :key="index" />
      </div>
    </Card>
    <Modal :open="imageOpen" :handleClose="handleClose">
      <video v-if="op.ext === '.webm'" :width="op.w" controls>
        <source :src="`http://i.4cdn.org/${board}/${op.tim}${op.ext}`" type="video/webm">
        Your browser does not support HTML5 video.
      </video>
      <img v-else :src="`http://i.4cdn.org/${board}/${op.tim}${op.ext}`" />
    </Modal>
  </div>
</template>

<script>
import Card from './Card.vue';
import Post from './Post.vue';
import Modal from './Modal.vue';

export default {
  name: 'Thread',
  data: function() {
    return {
      imageOpen: false
    }
  },
  props: {
    board: String,
    thread: Object
  },
  computed: {
    op() {
      return this.thread.posts[0];
    },
    replies() {
      return this.thread.posts.slice(1);
    }
  },
  methods: {
    openImage() {
      this.imageOpen = true;
    },
    handleClose() {
      this.imageOpen = false;
    }
  },
  components: {
    Card,
    Post,
    Modal
  }
}
</script>

<style lang="scss" scoped>
@import '../common';

.thread {
  margin-bottom: 15px;

  &-op-container {
    display: flex;
  }

  &-image {
    padding: 15px;

    &-info {
      font-size: 12px;
      display: flex;
      flex-direction: column;

      &-filename {
        color: #0984e3;
        margin-right: 5px;

        &:hover {
          cursor: pointer;
        }

      }
    }

    img {
      width: 100%;
      cursor: pointer;
    }
  }

  &-content {
    flex: 1;
    padding: 15px;
    font-size: 14px;
  }

  &-replies {
    margin-top: 2px;
  }
}
</style>
