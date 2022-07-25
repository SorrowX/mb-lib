// @ts-ignore
import { createBEM, BEM } from 'vant/lib/utils/create/bem'
// @ts-ignore
import { createComponent } from 'vant/lib/utils/create/component'
import { createI18N, Translate } from './i18n'

type CreateNamespaceReturn = [
  ReturnType<typeof createComponent>,
  BEM,
  Translate
]

export function createNamespace(name: string): CreateNamespaceReturn {
  name = 'mb-' + name
  const bem = createBEM(name)
  const t = createI18N(name)
  return [
    function defineComponent(sfc: any) {
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
