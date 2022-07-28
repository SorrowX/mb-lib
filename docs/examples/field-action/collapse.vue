<template>
  <mb-form @submit="onSubmit" class="field-action-collapse" label-width="100px">
    <mb-field-sheet
      name="arr1"
      label="多选展开"
      multiple
      clearable
      v-model="arr1"
      :popupProps="popupProps"
      :popupStyle="{ height: '30%' }"
    >
      <div class="field-action-collapse__content">{{ arr1 }}</div>
    </mb-field-sheet>

    <mb-field-sheet
      name="arr2"
      label="多选折叠"
      multiple
      clearable
      collapse
      v-model="arr2"
      :popupProps="popupProps"
      :popupStyle="{ height: '30%' }"
    >
      <div class="field-action-collapse__content">{{ arr2 }}</div>
    </mb-field-sheet>

    <mb-field-sheet
      name="arr3"
      label="指定折叠数量"
      multiple
      collapse
      :collapseCount="3"
      v-model="arr3"
      :popupProps="popupProps"
      :popupStyle="{ height: '30%' }"
    >
      <div class="field-action-collapse__content">{{ arr3 }}</div>
    </mb-field-sheet>

    <p class="tip">提交值:
      <pre>
        {{ values }}
      </pre>
    </p> 
    
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
      label: '数据' + (i + index + 1),
    }
  })
}

export default {
  data() {
    return {
      arr1: genData(20),
      arr2: genData(20),
      arr3: genData(10),
      popupProps: {
        title: '弹出框标题',
        showSearch: false,
      },
      values: {},
    }
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values)
      this.values = values
    },
  },
}
</script>

<style lang="less">
.field-action-collapse {
  &__content {
    box-sizing: border-box;
    height: 100%;
    overflow: auto;
    text-align: center;
  }
  .tip {
    max-height: 200px;
    overflow: auto;
  }
  .tip,
  &__content {
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
