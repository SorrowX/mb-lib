<template>
  <div class="refresh-test">
    <p>我是刷新组件测试2</p>
    <p>我是刷新组件测试2</p>
    <p>我是刷新组件测试2</p>
    <p>我是刷新组件测试2</p>
    <p>我是刷新组件测试2</p>
    <p>我是刷新组件测试2</p>
    <p>我是刷新组件测试2</p>
    <p>我是刷新组件测试2</p>
    <p>我是刷新组件测试2</p>
    <p>我是刷新组件测试2</p>
    <p>我是刷新组件测试2</p>
  </div>
</template>

<script>
export default {
  options: {
    iframeStyle: {
      height: '300px',
    },
  },
  data() {
    return {
      msg: 'hi12',
    }
  },
  methods: {
    go() {
      console.log('go')
    },
  },
}
</script>

<style lang="less">
.refresh-test {
  color: #f60;
}
</style>
