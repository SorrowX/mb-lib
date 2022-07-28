<template>
  <van-field
    :class="$bem({ disabled })"
    right-icon="arrow"
    v-bind="$attrs"
    :disabled="disabled"
    @click-input="handleClickInput"
    @click-right-icon="handleClickInput"
    ref="fieldRef"
  >
    <template #input>
      <mb-tags
        :$bem="$bem"
        :$translate="$translate"
        v-bind="tagsProps"
        v-model="bindValue"
        @close-tag="onCloseTag"
      />
    </template>
    <template #extra>
      <mb-popup
        :style="popupStyle"
        :class="popupClass"
        v-model="showPopup"
        v-bind="mergePopupProps"
        v-on="popupEvents"
        @sure="onSure"
        @close="onClose"
        @search="onSearch"
      >
        <slot />
      </mb-popup>
    </template>
  </van-field>
</template>

<script>
import { Field } from 'vant'
import getProps from './props.js'
import MbTags from './tags.vue'
import MbPopup from 'mb-lib-ui/packages/components/popup/index.js'
import { createNamespace } from 'mb-lib-ui/packages/utils/create/index.js'
const [defineComponent] = createNamespace('field-sheet')

const defaultPopupProps = () => ({
  title: '',
  showHeader: true,
  showSearch: true,
  round: true,
  position: 'bottom',
  getContainer: 'body',
})

export default defineComponent({
  components: {
    MbPopup,
    MbTags,
    VanField: Field,
  },
  props: {
    ...getProps(),
    value: {
      type: [Object, Array],
      default: () => ({}),
    },
    popupProps: {
      type: Object,
      default: () => defaultPopupProps(),
    },
    popupEvents: {
      type: Object,
      default: () => ({}),
    },
    popupStyle: {
      type: [Object, Array],
      default: () => [],
    },
    popupClass: {
      type: [Object, Array, String],
      default: '',
    },
  },
  data() {
    return {
      showPopup: false,
    }
  },
  computed: {
    bindValue: {
      get() {
        return this.value
      },
      set(val) {
        this.onInput(val)
      },
    },
    mergePopupProps() {
      return Object.assign(defaultPopupProps(), this.popupProps)
    },
    tagsProps() {
      return Object.keys(getProps()).reduce((pre, key) => {
        return {
          [key]: this[key],
          ...pre,
        }
      }, {})
    },
  },
  methods: {
    handleClickInput() {
      const { disabled } = this
      if (disabled) return
      this.toggle()
    },
    toggle() {
      this.showPopup = !this.showPopup
    },
  },
  beforeCreate() {
    const createEmitter = (eventName) => (event) => this.$emit(eventName, event)

    this.onInput = createEmitter('input')
    this.onSure = createEmitter('sure')
    this.onClose = createEmitter('close')
    this.onSearch = createEmitter('search')
    this.onCloseTag = createEmitter('close-tag')
  },
})
</script>
