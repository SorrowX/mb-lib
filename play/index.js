import 'vant/lib/index.less'

import Vue from 'vue'
import MbLibUI from '@/components/index.js'
import Test from '../docs/examples/popup/container.vue'

Vue.use(MbLibUI)

new Vue({
  components: { Test },
  render(h) {
    return h('div', [h('Test')])
  },
}).$mount('#app')
