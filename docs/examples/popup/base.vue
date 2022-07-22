<template>
  <div class="popup-base">
    <mb-cell title="基础使用" is-link @click="show = !show" />
    <mb-popup
      v-model="show"
      round
      show-header
      show-search
      position="bottom"
      title="我是标题"
      :style="{ height: '60%' }"
    >
      <div class="popup-base__list">
        <div v-for="num in 20" :key="num" class="popup-base__list-item">
          数据{{ num }}
        </div>
      </div>
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
.popup-base {
  &__list {
    height: 100%;
    overflow: auto;
    &-item {
      position: relative;
      display: flex;
      box-sizing: border-box;
      width: 100%;
      padding: 10px 12px;
      overflow: hidden;
      color: #323233;
      font-size: 14px;
      line-height: 24px;
      background-color: #fff;
      border-bottom: 1px solid #ebedf0;
    }
  }
}
</style>
