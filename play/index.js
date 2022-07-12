import Vue from 'vue'
import { MbPopup } from '@/components/index.js'
// import '../lib/index.full/style.css'
// import { MbTest } from '../lib/index.full/mb-lib.full.es.js'

new Vue({
  render(h) {
    // return h('div', [h(MbList), h(MbTree)])
    return h('div', [h(MbPopup)])
  },
}).$mount('#app')
