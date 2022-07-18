import '@/theme-chalk/index.less'
import Locale from '@/locale'
import MbPopup from './popup/index.js'

const components = { MbPopup }

var version = '0.0.3'

function install(Vue) {
  Object.keys(components).forEach((key) => {
    const component = components[key]
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

const MbLibUI = {
  install: install,
  version: version,
  ...components,
  Locale,
}

export default MbLibUI
export { Locale }
