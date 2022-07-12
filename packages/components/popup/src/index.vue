<template>
  <div>
    <button type="primary" @click="show = !show">{{ test }}</button>
    <p>{{ bem() }}</p>
    <p>{{ bem('test') }}</p>
    <p>{{ bem({ disabled: true }) }}</p>
    <van-button type="primary">主要按钮</van-button>
    <van-popup v-model="show" position="bottom" :style="{ height: '30%' }"
      >hi</van-popup
    >
  </div>
</template>

<script>
import '@/theme-chalk/popup/index.less'
import 'vant/lib/overlay/index.less'
import 'vant/lib/popup/index.less'
import 'vant/lib/button/index.less'

import Popup from 'vant/lib/popup'
import Button from 'vant/lib/button'
import { createNamespace } from '@/utils/create/index'
const [createComponent, bem, t] = createNamespace('popup')

export default createComponent({
  name: 'MbPopup',
  components: {
    VanPopup: Popup,
    VanButton: Button,
  },
  data() {
    return {
      test: t('test'),
      show: false,
      bem,
    }
  },
})
</script>
