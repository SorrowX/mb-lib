<template>
  <div class="popup">
    <mb-cell is-link @click="show = !show">圆角弹窗</mb-cell>

    <mb-popup
      v-model="show"
      round
      position="bottom"
      :style="{ height: '30%' }"
    />
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
