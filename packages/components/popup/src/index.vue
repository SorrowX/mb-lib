<template>
  <div>
    <button type="primary" @click="show = !show">{{ test }}</button>
    <p>{{ bem() }}</p>
    <p>{{ bem('test') }}</p>
    <p>{{ bem({ disabled: true }) }}</p>
    <van-popup v-model="show" position="bottom" :style="{ height: '30%' }"
      >hi</van-popup
    >
  </div>
</template>

<script>
import '@/theme-chalk/popup/index.less'
import 'vant/lib/overlay/index.less'
import 'vant/lib/popup/index.less'

import Popup from 'vant/lib/popup'
import { createNamespace } from '@/utils/create/index'
const [createComponent, bem, t] = createNamespace('popup')

const comp = createComponent({
  name: 'MbTest2',
  components: {
    VanPopup: Popup,
  },
  data() {
    return {
      test: t('test'),
      show: false,
      bem,
    }
  },
})

console.log(123, comp)

export default comp
</script>
