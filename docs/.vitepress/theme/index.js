import DefaultTheme from 'vitepress/theme'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'prismjs/themes/prism-tomorrow.css'
import './style.less'
import VpDemo from '../components/vp-demo.vue'

// 引入 MbLibUI 和 Vue2
import '../../mb-lib/style.css'
// import MbLibUI, { Vue2 } from '../../mb-lib/index.js'

// Vue2.use(MbLibUI)

export default {
  ...DefaultTheme,
  NotFound: () => 'custom 404', // <- this is a Vue 3 functional component
  enhanceApp({ app, router, siteData }) {
    // app is the Vue 3 app instance from `createApp()`. router is VitePress'
    // custom router. `siteData`` is a `ref`` of current site-level metadata.
    app.component(VpDemo.name, VpDemo)
    app.use(Vant)
  },
}
