import '@/theme-chalk/index.less'

// mb
import Locale from '@/locale'
import MbPopup from './popup/index.js'

// vant
import { Button, Cell, Icon } from 'vant'

const components = { MbPopup }

const vantComponents = {
  MbButton: Button,
  MbCell: Cell,
  MbIcon: Icon,
}

var version = '0.0.3'

function install(Vue) {
  Object.keys(components).forEach((key) => {
    const component = components[key]
    Vue.component(component.name, component)
  })
  Object.keys(vantComponents).forEach((key) => {
    const component = vantComponents[key]
    Vue.component(key, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

const MbLibUI = {
  install: install,
  version: version,
  ...components,
  ...vantComponents,
  Locale,
}

export default MbLibUI
export { Locale }
