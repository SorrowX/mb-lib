<template>
  <mb-form @submit="onSubmit" class="field-action-checkbox">
    <mb-field-sheet
      name="checkbox"
      label="列表多选"
      v-model="value"
      multiple
      :collapse="false"
      :clearable="true"
      :popupProps="{ title: '多选' }"
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
        <mb-checkbox-group v-model="result">
          <mb-cell-group>
            <mb-cell
              v-for="(item, index) in list"
              clickable
              :key="item.name"
              :title="item.label"
              @click="toggle(index)"
            >
              <mb-checkbox
                slot="right-icon"
                shape="square"
                :name="item.name"
                ref="checkboxes"
              />
            </mb-cell>
          </mb-cell-group>
        </mb-checkbox-group>
      </mb-list>
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
      label: '复选框' + (i + index + 1),
    }
  })
}

export default {
  data() {
    return {
      loading: false,
      finished: false,
      value: [],
      list: genData(),
      values: {},
      result: [],
    }
  },
  methods: {
    toggle(index) {
      this.$refs.checkboxes[index].toggle()
    },
    onSubmit(values) {
      console.log('submit', values)
      this.values = values
    },
    handleSure() {
      this.value = this.list.filter((_) => this.result.includes(_.name))
    },
    handleClose() {
      this.result = this.value.map((_) => _.name)
    },
    handleSearch() {
      console.log('自定义搜索逻辑')
    },
    handleCloseTag({ multiple, tag }) {
      if (multiple) {
        const index = this.result.findIndex((_) => _ === tag['name'])
        if (index !== -1) {
          this.result.splice(index, 1)
        }
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
    formatter(list) {
      return list.map((_) => _.name).join(',')
    },
  },
}
</script>

<style lang="less">
.field-action-checkbox {
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
