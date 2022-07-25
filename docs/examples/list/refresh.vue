<template>
  <mb-list
    class="list-refresh"
    style="height: 400px"
    v-model="loading"
    :finished="finished"
    :disabled="false"
    success-text="刷新成功"
    @load="load"
    @refresh="onRefresh"
  >
    <div v-for="num in count" :key="num" class="item">refresh数据{{ num }}</div>
  </mb-list>
</template>

<script>
export default {
  data() {
    return {
      count: 5,
      loading: false,
      finished: false,
    }
  },
  methods: {
    load() {
      console.log('load event', this.loading)
      if (this.count >= 30) {
        this.finished = true
        return
      }
      setTimeout(() => {
        this.count += 10
        // 当异步数据加载完毕后需要把loading重置为false
        this.loading = false
      }, 1000 * 1.5)
    },
    onRefresh(resolve) {
      setTimeout(() => {
        this.count = 5
        this.loading = false
        this.finished = false
        resolve() // 一定要调用resolve方法,让好其内部执行相关逻辑
      }, 1000 * 2)
    },
  },
}
</script>

<style lang="less">
.list-refresh {
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
  .list-refresh {
    .item {
      background-color: rgba(26, 26, 26, 1);
      color: #ededed;
      border-bottom: 1px solid #272727;
    }
  }
}
</style>
