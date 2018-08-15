<template>
  <div class="post">
    <div class="post-info">
      <div class="post-info-author">
        <img v-if="post.country" :src="`https://s.4cdn.org/image/country/${post.country.toLowerCase()}.gif`" />
        <span class="post-info-author-name">{{ post.name }}</span>
        <span class="post-info-author-id" :style="{ color: color, backgroundColor: bgColor }">{{ post.id }}</span>
      </div>
      <div class="post-info-timestamp">
        <timeago class="post-info-timestamp-timeago" :datetime="new Date(`${post.now} EDT`)" :auto-update="60"></timeago>
        <span>{{ `(${new Date(`${post.now} EDT`).toLocaleString()})` }}</span>
      </div>
    </div>
    <div v-if="post.tim && post.ext" class="post-image">
      <div class="post-image-info">
        <span @click="openImage" class="post-image-info-filename">{{ post.filename.length > 25 ? `${post.filename.slice(0,25)}(...)${post.ext}` : `${post.filename}${post.ext}` }}</span>
        <span>{{ `(${post.w}x${post.h})` }}</span>
      </div>
      <img @click="openImage" :src="`http://i.4cdn.org/${board}/${post.tim}s.jpg`" :width="post.tn_w" :height="post.tn_h" />
    </div>
    <div class="post-content">
      <h3>{{post.sub}}</h3>
      <div v-html="post.com"></div>
    </div>
    <Modal :open="imageOpen" :handleClose="handleClose">
      <video v-if="post.ext === '.webm'" :width="post.w" controls>
        <source :src="`http://i.4cdn.org/${board}/${post.tim}${post.ext}`" type="video/webm">
        Your browser does not support HTML5 video.
      </video>
      <img v-else :src="`http://i.4cdn.org/${board}/${post.tim}${post.ext}`" />
    </Modal>
  </div>
</template>

<script>
import Modal from './Modal.vue';

export default {
  name: 'Post',
  data: function() {
    return {
      imageOpen: false
    }
  },
  props: {
    board: String,
    post: Object
  },
  computed: {
    bgColor() {
      return `#${this.intToRGB(this.hashCode(this.post.id))}`;
    },
    color() {
      return this.getColorByBgColor(`#${this.intToRGB(this.hashCode(this.post.id))}`);
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
    Modal
  }
}
</script>

<style lang="scss" scoped>
@import '../common';

.post {
  background-color: #dfe6e9;
  margin-bottom: 5px;
  display: flex;
  flex-wrap: wrap;
  border-radius: 2px;
  font-size: 14px;

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

    img {
      cursor: pointer;
    }

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
  }

  &-content {
    flex: 1;
    padding: 15px;
  }
}
</style>
