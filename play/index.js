import 'vant/lib/index.less'

import Vue from 'vue'
import MbLibUI from 'mb-lib-ui/packages/components/index.js'
import Test from 'mb-lib-ui/docs/examples/list/slots.vue'

Vue.use(MbLibUI)

new Vue({
  components: { Test },
  render(h) {
    return h('div', [h('Test')])
  },
}).$mount('#app')
