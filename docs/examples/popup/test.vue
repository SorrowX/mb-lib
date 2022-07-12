<template>
  <div class="popup-test">
    <span>&#x26A1;</span>
    <p>{{ msg }}</p>
    <div>哈哈哈哈</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'hi1211',
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
.popup-test {
  color: red;
  p {
    color: green;
  }
}
</style>
