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
  return [createComponent(name), createBEM(name), createI18N(name)]
}
