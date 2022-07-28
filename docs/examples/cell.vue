<template>
  <div class="test">
    <mb-cell-group inset>
      <mb-cell title="单元格" value="内容" required />
      <mb-cell title="单元格" value="内容" label="描述信息" required />
      <mb-cell value="内容" />

      <mb-cell title="单元格" is-link />
      <mb-cell title="单元格" is-link value="内容" />
      <mb-cell title="单元格" is-link arrow-direction="down" value="内容" />

      <mb-cell title="URL 跳转" is-link url="/vant/mobile.html" />
      <mb-cell title="路由跳转" is-link to="index" />
    </mb-cell-group>

    <mb-cell-group title="分组1">
      <mb-cell title="单元格" value="内容" />
    </mb-cell-group>
    <mb-cell-group title="分组2">
      <mb-cell title="单元格" value="内容" />
    </mb-cell-group>

    <mb-cell center title="单元格" value="内容" label="描述信息" />

    <mb-cell value="内容" is-link>
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <span class="custom-title">单元格</span>
      </template>
    </mb-cell>

    <mb-cell title="单元格" icon="shop-o">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #right-icon>
        <mb-icon name="search" class="search-icon" />
      </template>
    </mb-cell>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'hi',
    }
  },
}
</script>

<style scoped>
.test {
  padding: 20px 0;
}
</style>
