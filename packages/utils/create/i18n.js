import { get, isFunction } from 'vant/es/utils/index.js'
import { camelize } from 'vant/es/utils/format/string.js'
import Locale from 'mb-lib-ui/packages/locale/index.js'

export function createI18N(name) {
  const prefix = camelize(name) + '.'

  return function (path, ...args) {
    const messages = Locale.messages()
    const message = get(messages, prefix + path) || get(messages, path)

    return isFunction(message) ? message(...args) : message
  }
}
