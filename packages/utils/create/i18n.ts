// @ts-ignore
import { get, isFunction } from 'vant/lib/utils/index'
// @ts-ignore
import { camelize } from 'vant/lib/utils/format/string'
// @ts-ignore
import Locale from '@/locale/index'

export function createI18N(name: string) {
  const prefix = camelize(name) + '.'

  return function (path: string, ...args: any[]): string {
    const messages = Locale.messages()
    const message = get(messages, prefix + path) || get(messages, path)

    return isFunction(message) ? message(...args) : message
  }
}

export type Translate = ReturnType<typeof createI18N>
