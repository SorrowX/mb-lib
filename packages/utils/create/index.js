import { createBEM } from 'vant/lib/utils/create/bem'
import { createComponent } from 'vant/lib/utils/create/component'
import { createI18N } from './i18n'

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
