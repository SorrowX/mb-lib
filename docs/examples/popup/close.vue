<template>
  <div class="popup">
    <mb-cell is-link @click="show1 = !show1">关闭图标</mb-cell>
    <mb-cell is-link @click="show2 = !show2">自定义图标</mb-cell>
    <mb-cell is-link @click="show3 = !show3">图标位置</mb-cell>

    <!-- 关闭图标 -->
    <mb-popup
      v-model="show1"
      closeable
      position="bottom"
      :style="{ height: '30%' }"
    />

    <!-- 自定义图标 -->
    <mb-popup
      v-model="show2"
      closeable
      close-icon="close"
      position="bottom"
      :style="{ height: '30%' }"
    />

    <!-- 图标位置 -->
    <mb-popup
      v-model="show3"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '30%' }"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      show1: false,
      show2: false,
      show3: false,
    }
  },
}
</script>
