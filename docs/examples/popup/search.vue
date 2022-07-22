<template>
  <div class="popup-search">
    <mb-cell
      title="自定义搜索框"
      is-link
      :value="value"
      @click="show = !show"
    />
    <mb-popup
      v-model="show"
      round
      show-header
      show-search
      position="bottom"
      title="我是标题"
      :searchProps="searchProps"
      :style="{ height: '60%' }"
      @search="(evt) => handleClick('search', evt)"
      @search-input="(evt) => handleClick('search-input', evt)"
      @focus="(evt) => handleClick('focus', evt)"
      @blur="(evt) => handleClick('blur', evt)"
      @clear="(evt) => handleClick('clear', evt)"
      @cancel="(evt) => handleClick('cancel', evt)"
    >
      <span slot="left">地址</span>
      <div class="popup-search__list">
        <div v-for="num in 20" :key="num" class="popup-search__list-item">
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
      value: '',
      searchProps: {
        showAction: true,
      },
    }
  },
  methods: {
    handleClick(evtName, evt) {
      console.log(evtName, evt)
      this.value = `事件名称[${evtName}] ${evt ? ': ' + evt : ''}`
    },
  },
  mounted() {},
}
</script>

<style lang="less">
.popup-search {
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
