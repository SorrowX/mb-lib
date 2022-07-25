<template>
  <mb-list
    class="list-error"
    style="height: 400px"
    v-model="loading"
    :finished="finished"
    :error.sync="error"
    @load="load"
  >
    <div v-for="num in count" :key="num" class="item">mock数据{{ num }}</div>
  </mb-list>
</template>

<script>
const fetch = () => {
  return new Promise((resolve, reject) => {
    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000 * 1.5)
  })
}

export default {
  data() {
    return {
      count: 5,
      loading: false,
      finished: false,
      error: false,
    }
  },
  methods: {
    load() {
      console.log('load event', this.loading)
      if (this.count >= 30) {
        this.finished = true
        return
      }

      fetch()
        .then(() => {
          this.count += 10
          this.loading = false
        })
        .catch(() => {
          // 异步数据请求失败时需要把error重置为true,
          // 其内部会自动把loading重置为false
          this.error = true
        })
    },
  },
}
</script>

<style lang="less">
.list-error {
  .item {
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
html[class='dark'] {
  .list-error {
    .item {
      background-color: rgba(26, 26, 26, 1);
      color: #ededed;
      border-bottom: 1px solid #272727;
    }
  }
}
</style>
