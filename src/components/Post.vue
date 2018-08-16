<template>
  <div :id="`p${post.no}`" class="post">
    <div class="post-info">
      <div class="post-info-author">
        <img v-if="post.country" :src="`https://s.4cdn.org/image/country/${post.country.toLowerCase()}.gif`" />
        <span class="post-info-author-name">{{ post.name }}</span>
        <span class="post-info-author-id" :style="{ color: color, backgroundColor: bgColor }">{{ post.id }}</span>
        <span class="post-info-author-no">{{ post.no }}</span>
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
    <PostPreview v-if="postPreviewOpen && refPost" :board="board" :post="refPost" :all-posts="allPosts" :top-position="topPosition" />
  </div>
</template>

<script>
import Modal from './Modal.vue';
import PostPreview from './PostPreview.vue';

export default {
  name: 'Post',
  data: function() {
    return {
      imageOpen: false,
      refPost: null,
      position: null,
      postPreviewOpen: false
    }
  },
  props: {
    board: String,
    post: Object,
    allPosts: Array
  },
  mounted() {
    const post = $(`#p${this.post.no}`);
    const postQuoteLinks = $(post).find('.quotelink');
    const _this = this;
    for (let link of postQuoteLinks) {
      link.onmouseenter = function() {
        const refPost = _this.getPostByPostNumber(link.hash.replace('#p', ''));
        _this.refPost = refPost;
        _this.topPosition = link.getBoundingClientRect().top;
        _this.postPreviewOpen = true;
      }

      link.onmouseleave = function() {
        _this.refPost = null;
        _this.postPreviewOpen = false;
      }

      link.onclick = function() {
        const refPostEl = $(link.hash);
        if (refPostEl !== null) {
          window.scrollTo(0, refPostEl.offset().top);
        }
      }
    }
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
    getPostByPostNumber(postNumber) {
      const refPost = this.allPosts.find(post => {
        return post.no == postNumber;
      })
      return refPost;
    },
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
    Modal,
    PostPreview
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
  position: relative;

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
