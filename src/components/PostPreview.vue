<template>
  <div class="postpreview" :style="{ top: `${topPosition + 25}px` }">
    <Post :board="board" :post="post" :all-posts="allPosts" />
  </div>
</template>

<script>
export default {
  name: 'PostPreview',
  props: {
    board: String,
    post: Object,
    allPosts: Array,
    topPosition: Number
  }
}
</script>

<style lang="scss" scoped>
.postpreview {
  width: 80%;
  background-color: #fff;
  padding: 15px;
  border-radius: 2px;
  box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
}
</style>
