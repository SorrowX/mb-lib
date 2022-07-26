import { createBEM } from 'vant/es/utils/create/bem.js'
import { createComponent } from 'vant/es/utils/create/component.js'
import { createI18N } from './i18n.js'

export function createNamespace(name) {
  name = 'mb-' + name
  const bem = createBEM(name)
  const t = createI18N(name)
  return [
    function defineComponent(sfc) {
      const comp = createComponent(name)(sfc)
      const methods = comp.methods || {}
      methods.$bem = bem
      methods.$translate = t
      comp.methods = methods
      return comp
    },
    t,
    bem,
  ]
}
