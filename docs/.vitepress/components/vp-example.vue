<script>
export default {
  data() {
    return {
      dynamicComponent: '',
    }
  },
  methods: {
    insert(Vue2Component) {
      this.dynamicComponent = Vue2Component
    },
  },
  mounted() {
    import('../../mb-lib/index.js').then((module) => {
      const { Vue2, default: MbLibUI } = module
      Vue2.use(MbLibUI)
      new Vue2(this.dynamicComponent).$mount(this.$refs.content)
    })
  },
}
</script>

<template>
  <div class="example-showcase">
    <div ref="content"></div>
  </div>
</template>

<style lang="less">
.example-showcase {
  padding: 1.5rem;
  margin: 0.5px;
  background-color: #ffffff;
}
</style>
