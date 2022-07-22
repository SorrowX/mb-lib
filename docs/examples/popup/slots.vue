<template>
  <div class="popup-slots">
    <mb-cell title="自定义头部插槽" is-link @click="show = !show" />
    <mb-popup
      v-model="show"
      round
      show-header
      position="bottom"
      :style="{ height: '60%' }"
    >
      <i slot="header-left"></i>
      <div slot="header-center">我是自定义title</div>
      <div slot="header-right">
        <mb-icon role="button" name="cross" size="18" color="#969799" />
      </div>
      <div class="popup-slots__list">
        <div v-for="num in 20" :key="num" class="popup-slots__list-item">
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
.popup-slots {
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
