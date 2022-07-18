import 'vant/lib/index.less'

import Vue from 'vue'
import MbLibUI from '@/components/index.js'

Vue.use(MbLibUI)

new Vue({
  render(h) {
    return h('div', [h('mb-popup')])
  },
}).$mount('#app')
