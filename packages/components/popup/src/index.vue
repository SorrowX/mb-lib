<template>
  <van-popup
    :class="$bem()"
    v-bind="$attrs"
    :close-icon="closeIcon"
    v-on="$listeners"
    ref="popupRef"
  >
    <div v-if="showHeader" :class="$bem('header')">
      <div :class="$bem('header-left')" @click="handleClickIconClose">
        <slot name="header-left">
          <van-icon
            role="button"
            tabindex="0"
            :name="closeIcon"
            :size="closeIconSize"
            :color="closeIconColor"
          />
        </slot>
      </div>
      <div :class="[$bem('header-center'), 'van-ellipsis']">
        <slot name="header-center">
          <span>{{ title }}</span>
        </slot>
      </div>
      <div :class="$bem('header-right')" @click="handleClickSure">
        <slot name="header-right">
          <span>{{ $translate('mbPopup.sure') }}</span>
        </slot>
      </div>
    </div>
    <div v-if="showSearch" :class="$bem('search')">
      <van-search
        v-model="searchValue"
        v-bind="searchProps"
        v-on="searchEvents"
      >
        <template v-for="slotName in searchSlotNames" :slot="slotName">
          <slot :name="slotName" />
        </template>
      </van-search>
    </div>
    <div :class="$bem('content')">
      <slot />
    </div>
  </van-popup>
</template>

<script>
import { Popup, Icon, Search } from 'vant'
import { createNamespace } from 'mb-lib-ui/packages/utils/create/index.js'
const [defineComponent, t] = createNamespace('popup')

const eventsExclude = [
  'default',
  'header-left',
  'header-center',
  'header-right',
]

export default defineComponent({
  components: {
    VanPopup: Popup,
    VanIcon: Icon,
    VanSearch: Search,
  },
  provide() {
    return {
      vanForm: null,
    }
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    showHeader: {
      type: Boolean,
      default: false,
    },
    closeIcon: {
      type: String,
      default: 'cross',
    },
    closeIconSize: {
      type: [Number, String],
      default: '20',
    },
    closeIconColor: {
      type: String,
      default: '#bfbfbf',
    },
    showSearch: {
      type: Boolean,
      default: false,
    },
    searchProps: {
      type: Object,
      default: () => ({
        placeholder: t('common.searchPlaceholder'),
      }),
    },
  },
  data() {
    return {
      searchValue: '',
    }
  },
  computed: {
    searchSlotNames() {
      return Object.keys(this.$slots).filter((_) => !eventsExclude.includes(_))
    },
  },
  methods: {
    close() {
      const { popupRef } = this.$refs
      popupRef.close()
    },
    handleClickIconClose() {
      this.close()
    },
    handleClickSure(evt) {
      this.close()
      this.onSure(evt)
    },
  },
  beforeCreate() {
    const createEmitter = (eventName) => (event) => this.$emit(eventName, event)

    this.onSure = createEmitter('sure')

    // search
    this.searchEvents = {
      search: createEmitter('search'),
      input: createEmitter('search-input'),
      focus: createEmitter('focus'),
      blur: createEmitter('blur'),
      clear: createEmitter('clear'),
      cancel: createEmitter('cancel'),
    }
  },
  mounted() {},
})
</script>
