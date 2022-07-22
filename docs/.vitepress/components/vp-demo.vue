<script>
import { ref, onMounted } from 'vue'
import VpExample from './vp-example.vue'
import VpSourceCode from './vp-source-code.vue'
import { highlight } from '../../utils/highlight'

export default {
  name: 'vp-demo',
  components: { VpExample, VpSourceCode },
  setup(props, context) {
    const rawSource = ref('')
    const activeNames = ref([])

    const inset = (Vue2Component) => {
      exampleRef.value.insert(Vue2Component)
    }

    const setRawSource = (raw) => {
      rawSource.value = encodeURIComponent(highlight(raw, 'js'))
    }

    const exampleRef = ref('exampleRef')

    onMounted(() => {})

    return {
      exampleRef,
      rawSource,
      activeNames,
      inset,
      setRawSource,
    }
  },
  mounted() {
    this.$el.__vue__ = this
  },
}
</script>

<template>
  <div class="vp-demo">
    <vp-example ref="exampleRef" />

    <van-collapse v-model="activeNames">
      <van-collapse-item name="1">
        <template #title>
          <div class="vp-demo__title">Source</div>
        </template>
        <vp-source-code :source="rawSource" />
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<style lang="less">
.vp-demo {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  margin: 16px 0;
  &__title {
    display: flex;
    justify-content: flex-end;
  }
  .van-collapse-item {
    border-top: 1px solid #dcdfe6;
  }
}
html.dark {
  .vp-demo {
    border: 1px solid #262727;
    .example-showcase {
      background: #262727;
    }
    .van-collapse-item {
      border-top: none;
    }
    .van-collapse-item__title {
      background: #262727;
      color: #fff;
    }
    .van-collapse-item__title--expanded:after {
      border-bottom: none;
    }
    .van-collapse-item__content {
      background: #262727;
    }
  }
}
</style>
