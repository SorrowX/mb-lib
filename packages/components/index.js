import 'mb-lib-ui/packages/theme-chalk/index.less'

// mb
import Locale from 'mb-lib-ui/packages/locale/index.js'
import MbPopup from './popup/index.js'
import MbList from './list/index.js'
import MbFieldSheet from './field-sheet/index.js'

// vant
import {
  Button,
  Cell,
  CellGroup,
  Icon,
  Loading,
  Field,
  Form,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Search,
} from 'vant'

// import Field from 'vant/es/field/index'
// import Form from 'vant/es/form/index'

const components = { MbPopup, MbList, MbFieldSheet }

const vantComponents = {
  MbButton: Button,
  MbCell: Cell,
  MbIcon: Icon,
  MbLoading: Loading,
  MbCellGroup: CellGroup,
  MbField: Field,
  MbForm: Form,
  MbCheckbox: Checkbox,
  MbCheckboxGroup: CheckboxGroup,
  MbRadio: Radio,
  MbRadioGroup: RadioGroup,
  MbSearch: Search,
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
