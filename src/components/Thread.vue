<template>
  <div class="thread">
    <Card class="thread-op-container">
      <div class="thread-info">
        <div class="thread-info-author">
          <img v-if="op.country" :src="`https://s.4cdn.org/image/country/${op.country.toLowerCase()}.gif`" />
          <span class="thread-info-author-name">{{ op.name }}</span>
          <span class="thread-info-author-id" :style="{ color: color, backgroundColor: bgColor }">{{ op.id }}</span>
          <span class="thread-info-author-no">{{ op.no }}</span>
        </div>
        <div class="thread-info-timestamp">
          <timeago class="thread-info-timestamp-timeago" :datetime="new Date(`${op.now} EDT`)" :auto-update="60"></timeago>
          <span>{{ `(${new Date(`${op.now} EDT`).toLocaleString()})` }}</span>
        </div>
      </div>
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
      <div v-if="viewAll" class="thread-view-more">
        <router-link :to="{ name: 'ThreadPage', params: { abbr: board, threadNo: op.no, viewAll: false }}">{{ `View all ${op.replies} replies` }}</router-link>
      </div>
    </Card>
    <Card class="thread-replies">
      <div v-if="replies.length > 0">
        <Post v-for="(post, index) in replies" :board="board" :post="post" :all-posts="thread.posts" :key="index" />
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
    thread: Object,
    viewAll: Boolean
  },
  computed: {
    op() {
      return this.thread.posts[0];
    },
    replies() {
      return this.thread.posts.slice(1);
    },
    bgColor() {
      return `#${this.intToRGB(this.hashCode(this.op.id))}`;
    },
    color() {
      return this.getColorByBgColor(`#${this.intToRGB(this.hashCode(this.op.id))}`);
    }
  },
  methods: {
    openImage() {
      this.imageOpen = true;
    },
    handleClose() {
      this.imageOpen = false;
    },
    hashCode(str) {
      var hash = 0;
      for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      return hash;
    },
    intToRGB(i){
      var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

      return "00000".substring(0, 6 - c.length) + c;
    },
    getColorByBgColor(bgColor) {
      if (!bgColor) { return ''; }
      return (parseInt(bgColor.replace('#', ''), 16) > 0xffffff / 2) ? '#000' : '#fff';
    }
  },
  components: {
    Card,
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
    flex-wrap: wrap;
  }

  &-info {
    padding: 10px 15px;
    flex: 0 0 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-author {

      &-name {
        margin: 0 5px;
      }

      &-id {
        font-size: 10px;
        padding: 3px 5px;
        border-radius: 2px;
      }

      &-no {
        margin-left: 5px;
      }

    }

    &-timestamp {
      font-size: 10px;
      &-timeago {
        margin-right: 5px;
      }
    }
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

  &-view-more {
    flex: 0 0 100%;
    background-color: #dfe6e9;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background-color: #b2bec3;
      cursor: pointer;
    }
  }

  &-replies {
    margin-top: 2px;
  }
}
</style>
