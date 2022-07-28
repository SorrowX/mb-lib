<template>
  <div class="test">
    <mb-form @submit="onSubmit" label-width="100px">
      <mb-field
        label="文本"
        right-icon="arrow"
        clickable
        label-width="120px"
        name="name"
        v-model="value"
        :rules="[{ required: true, message: '请填写' }]"
      >
        <template #input>
          <div style="text-align: right">{{ value }}</div>
        </template>
      </mb-field>

      <div style="margin: 16px">
        <mb-button round block type="info" native-type="submit">提交</mb-button>
      </div>
    </mb-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
    }
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values)
    },
  },
}
</script>

<style scoped>
.test {
  padding: 20px 0;
}
</style>
