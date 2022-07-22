<template>
  <div class="popup">
    <mb-cell is-link @click="show1 = !show1">挂载到body</mb-cell>
    <mb-cell is-link @click="show2 = !show2">挂载到#app</mb-cell>

    <mb-popup
      v-model="show1"
      round
      get-container="body"
      position="bottom"
      :style="{ height: '30%' }"
    />

    <mb-popup
      v-model="show2"
      round
      :get-container="getContainer"
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
    }
  },
  methods: {
    // 返回一个特定的 DOM 节点，作为挂载的父节点
    getContainer() {
      return document.querySelector('#app')
    },
  },
}
</script>
