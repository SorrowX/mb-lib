<template>
  <div class="popup">
    <mb-cell is-link @click="handleClick('top')">顶部弹出</mb-cell>
    <mb-cell is-link @click="handleClick('bottom')">底部弹出</mb-cell>
    <mb-cell is-link @click="handleClick('left')">左侧弹出</mb-cell>
    <mb-cell is-link @click="handleClick('right')">右侧弹出</mb-cell>

    <mb-popup v-model="show" :position="position" :style="popupStyle">
      <div class="content">每天重复搬砖, 心好累...</div>
    </mb-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      position: 'bottom',
    }
  },
  computed: {
    popupStyle() {
      const { position } = this
      return position === 'left' || position === 'right'
        ? {
            width: '30%',
            height: '100%',
          }
        : {
            height: '30%',
            width: '100%',
          }
    },
  },
  methods: {
    handleClick(position) {
      this.position = position
      this.show = true
    },
  },
}
</script>
