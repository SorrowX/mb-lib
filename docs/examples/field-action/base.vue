<template>
  <mb-form @submit="onSubmit" class="field-action-base">
    <mb-field-sheet
      name="obj"
      label="单个值绑定"
      v-model="obj"
      :popupProps="popupProps"
      :popupStyle="{ height: '30%' }"
    >
      <div class="field-action-base__content">{{ obj }}</div>
    </mb-field-sheet>

    <mb-field-sheet
      name="arr"
      label="多个值绑定"
      multiple
      v-model="arr"
      :popupProps="popupProps"
      :popupStyle="{ height: '30%' }"
    >
      <div class="field-action-base__content">{{ arr }}</div>
    </mb-field-sheet>

    <p class="tip">提交值: {{ values }}</p>

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
export default {
  data() {
    return {
      obj: {
        name: '1',
        label: '黄焖鸡',
      },
      arr: [
        {
          name: '1',
          label: '米德堡',
        },
        {
          name: '2',
          label: '老娘舅',
        },
      ],
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
.field-action-base {
  &__content {
    box-sizing: border-box;
    height: 100%;
    overflow: auto;
    text-align: center;
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
