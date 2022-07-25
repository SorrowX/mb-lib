import 'mb-lib-ui/packages/theme-chalk/index.less'

// mb
import Locale from 'mb-lib-ui/packages/locale/index.js'
import MbPopup from './popup/index'
import MbList from './list/index'

// vant
import { Button, Cell, Icon, Loading } from 'vant'

const components = { MbPopup, MbList }

const vantComponents = {
  MbButton: Button,
  MbCell: Cell,
  MbIcon: Icon,
  MbLoading: Loading,
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
