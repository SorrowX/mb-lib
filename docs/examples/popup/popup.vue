<template>
  <div class="popup">
    <mb-cell is-link @click="show = !show">展示弹出层</mb-cell>
    <mb-popup v-model="show" :lock-scroll="false">
      <div class="content">内容</div>
    </mb-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    }
  },
}
</script>

<style lang="less">
.popup {
  .content {
    width: 300px;
    height: 300px;
    line-height: 300px;
    text-align: center;
  }
}
</style>
