<template>
  <div
    :class="$bem()"
    v-infinite-scroll="onLoad"
    :infinite-scroll-disabled="infiniteScrollDisabled"
    :infinite-scroll-delay="infiniteScrollDelay"
    :infinite-scroll-distance="infiniteScrollDistance"
    :infinite-scroll-immediate="infiniteScrollImmediate"
  >
    <van-pull-refresh
      v-model="isRefresh"
      :disabled="disabled"
      :pulling-text="pullingText"
      :loosing-text="loosingText"
      :loading-text="loadingText"
      :success-text="successText"
      @refresh="onRefresh"
    >
      <div :class="$bem('content')">
        <slot />

        <div v-if="loading" :class="$bem('loading')">
          <slot name="loading">
            <van-loading :size="loadingSize">{{ loadingText }}</van-loading>
          </slot>
        </div>

        <div v-if="finished" :class="$bem('finished-text')">
          <slot name="finished">
            {{ finishedText }}
          </slot>
        </div>

        <div v-if="error" :class="$bem('error-text')" @click="clickErrorText">
          <slot name="error">
            {{ errorText }}
          </slot>
        </div>
      </div>

      <template #pulling="props">
        <slot name="pull-refresh-pulling" v-bind="props" />
      </template>
      <template #loosing="props">
        <slot name="pull-refresh-loosing" v-bind="props" />
      </template>
      <template #loading="props">
        <slot name="pull-refresh-loading" v-bind="props" />
      </template>
    </van-pull-refresh>
  </div>
</template>

<script>
import { PullRefresh, Loading } from 'vant'
import InfiniteScroll from 'element-ui/packages/infinite-scroll/index'
import { createNamespace } from 'mb-lib-ui/packages/utils/create/index.js'
const [defineComponent, t] = createNamespace('list')
const scope = 'ElInfiniteScroll'

export default defineComponent({
  components: {
    VanPullRefresh: PullRefresh,
    VanLoading: Loading,
  },
  directives: {
    InfiniteScroll,
  },
  model: {
    prop: 'loading',
    event: 'update:loading',
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    finished: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    loadingSize: {
      type: String,
      default: '20px',
    },
    finishedText: {
      type: String,
      default: t('mbList.finishedText'),
    },
    errorText: {
      type: String,
      default: t('mbList.errorText'),
    },
    infiniteScrollDelay: {
      type: Number,
      default: 200,
    },
    infiniteScrollDistance: {
      type: Number,
      default: 0,
    },
    infiniteScrollImmediate: {
      type: Boolean,
      default: true,
    },
    pullingText: {
      type: String,
      default: t('mbList.pulling'),
    },
    loosingText: {
      type: String,
      default: t('mbList.loosing'),
    },
    loadingText: {
      type: String,
      default: t('common.loading'),
    },
    successText: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isRefresh: false,
    }
  },
  watch: {
    finished(val) {
      if (val) {
        this.updateLoading(false)
        this.updateError(false)
      }
    },
    error(val) {
      if (val) {
        this.updateLoading(false)
      }
    },
  },
  computed: {
    infiniteScrollDisabled() {
      const { loading, finished, error } = this
      return finished || error || loading
    },
  },
  methods: {
    clickErrorText() {
      this.updateError(false)
      this.onLoad()
    },
  },
  beforeCreate() {
    const createEmitter = (eventName) => (event) => this.$emit(eventName, event)

    this.updateError = createEmitter('update:error')
    this.updateLoading = createEmitter('update:loading')

    const onLoad = createEmitter('load')
    this.onLoad = () => {
      this.updateLoading(true)
      onLoad()
    }

    const onRefresh = createEmitter('refresh')
    this.onRefresh = () => {
      onRefresh(() => {
        this.isRefresh = false

        // Re trigger
        const { onScroll } = this.$el[scope] || {}
        onScroll && onScroll()
      })
    }
  },
})
</script>
