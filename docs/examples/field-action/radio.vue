<template>
  <mb-form @submit="onSubmit" class="field-action-radio">
    <mb-field-sheet
      name="radio"
      label="列表单选"
      v-model="value"
      :popupProps="{ title: '单选哦' }"
      :popupStyle="{ height: '60%' }"
      :formatter="formatter"
      @sure="handleSure"
      @close="handleClose"
      @search="handleSearch"
      @close-tag="handleCloseTag"
    >
      <mb-list
        style="overflow: auto; height: 100%"
        v-model="loading"
        :finished="finished"
        :disabled="false"
        success-text="刷新成功"
        @load="load"
        @refresh="onRefresh"
      >
        <mb-radio-group v-model="radio">
          <mb-cell-group>
            <mb-cell
              v-for="(item, index) in list"
              :key="index"
              :title="item.label"
              clickable
              @click="handleClick(item)"
            >
              <mb-radio slot="right-icon" :name="item.name" />
            </mb-cell>
          </mb-cell-group>
        </mb-radio-group>
      </mb-list>
      <div style=""></div>
    </mb-field-sheet>

    <p class="tip"><span>绑定的值</span>: {{ value }}</p>
    <p class="tip"><span>表单提交的值</span>: {{ values }}</p>

    <div class="botton-wrapper">
      <mb-button
        round
        plain
        block
        class="button"
        type="primary"
        native-type="submit"
        style="width: 50%"
        >提交</mb-button
      >
    </div>
  </mb-form>
</template>

<script>
const genData = (len = 10, i = 0) => {
  return Array.from({ length: len }).map((_, index) => {
    return {
      name: i + index + 1,
      label: '单选框' + (i + index + 1),
    }
  })
}

export default {
  data() {
    return {
      radio: '',
      loading: false,
      finished: false,
      value: {},
      list: genData(),
      values: {},
    }
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values)
      this.values = values
    },
    handleClick(item) {
      this.radio = item.name
    },
    handleSure() {
      this.value = this.list.find((_) => _.name === this.radio)
    },
    handleClose() {
      this.radio = this.value.name
    },
    handleSearch() {
      console.log('自定义搜索逻辑')
    },
    handleCloseTag({ multiple, tag }) {
      if (!multiple) {
        this.radio = ''
      }
    },
    load() {
      if (this.list.length >= 30) {
        this.finished = true
        return
      }
      setTimeout(() => {
        const len = this.list.length
        this.list = this.list.concat(genData(10, len))
        this.loading = false
      }, 1000 * 1.5)
    },
    onRefresh(resolve) {
      setTimeout(() => {
        this.list = genData(5)
        this.loading = false
        this.finished = false
        resolve()
      }, 1000 * 1.5)
    },
    formatter(value) {
      return value.name
    },
  },
}
</script>

<style lang="less">
.field-action-radio {
  .tip {
    max-height: 200px;
    overflow: auto;
    padding: 10px 16px;
    color: #969799;
    font-size: 14px;
  }
  .botton-wrapper {
    margin-top: 16px;
    display: flex;
    justify-content: center;
  }
}
</style>
