<template>
  <div :class="$bem('tags', { disabled })">
    <template v-if="clearable || collapse">
      <template v-if="collapse">
        <div v-if="tags.length">
          <van-tag
            v-for="(tag, index) in collapseTags"
            :key="index"
            :closeable="clearable"
            :size="tagSize"
            plain
            @close="close(tag)"
          >
            {{ tag[labelKey] }}
          </van-tag>
          <van-tag
            v-if="tags.length - collapseCount >= 1"
            :size="tagSize"
            plain
          >
            + {{ tags.length - collapseCount }}
          </van-tag>
        </div>
        <span v-else :class="$bem('tags--placeholder')">
          {{ $translate('common.select') }}
        </span>
      </template>

      <template v-else>
        <div v-if="tags.length">
          <van-tag
            v-for="(tag, index) in tags"
            :key="index"
            :closeable="clearable"
            :size="tagSize"
            plain
            @close="close(tag)"
          >
            {{ tag[labelKey] }}
          </van-tag>
        </div>
        <span v-else :class="$bem('tags--placeholder')">
          {{ $translate('common.select') }}
        </span>
      </template>
    </template>
    <span v-else :class="labels ? '' : $bem('tags--placeholder')">
      {{ labels || $translate('common.select') }}
    </span>
  </div>
</template>

<script>
import { Tag } from 'vant'
import { isObject, isDef } from 'vant/es/utils/index.js'
import getProps from './props.js'
import { FieldMixin } from 'vant/es/mixins/field.js'

export default {
  name: 'MbTags',
  mixins: [FieldMixin],
  components: {
    VanTag: Tag,
  },
  model: {
    prop: 'modelValue',
    event: 'update:modelValue',
  },
  props: {
    ...getProps(),
    modelValue: {
      type: [Object, Array],
      default: () => ({}),
    },
    $bem: {
      type: Function,
    },
    $translate: {
      type: Function,
    },
  },
  data() {
    return {}
  },
  computed: {
    value() {
      const { formatter, bindValue } = this
      if (formatter) {
        return formatter(bindValue)
      }
      return bindValue
    },
    bindValue: {
      get() {
        return this.modelValue
      },
      set(val) {
        this.updateModelValue(val)
      },
    },
    tags() {
      const { multiple, bindValue, nameKey } = this
      if (multiple && !Array.isArray(bindValue)) {
        throw new Error('[field-action]: value type must array.')
      }
      if (!multiple && !isObject(bindValue)) {
        throw new Error('[field-action]: value type must object.')
      }
      const tags = multiple ? bindValue : [bindValue]
      return tags.filter((_) => isDef(_[nameKey]))
    },
    labels() {
      const { labelKey, labelSeparator, tags } = this
      return tags.map((_) => _[labelKey]).join(`${labelSeparator}`)
    },
    collapseTags() {
      const { collapseCount, tags } = this
      return tags.slice(0, collapseCount)
    },
  },
  methods: {
    close(tag) {
      const { nameKey, bindValue, tags, multiple } = this
      if (multiple) {
        const index = bindValue.findIndex((_) => _[nameKey] === tag[nameKey])
        if (index !== -1) {
          bindValue.splice(index, 1)
        }
      } else {
        this.bindValue = {}
      }
      this.onCloseTag({
        multiple,
        tag,
      })
    },
  },
  beforeCreate() {
    const createEmitter = (eventName) => (event) => this.$emit(eventName, event)

    this.updateModelValue = createEmitter('update:modelValue')
    this.onCloseTag = createEmitter('close-tag')
  },
}
</script>
