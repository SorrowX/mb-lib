# 国际化

MbLibUI 采用中文作为默认语言，同时支持多语言切换，请按照下方教程进行国际化设置。

## 多语言切换

MbLibUI 通过 Locale 组件实现多语言支持，使用 Locale.use 方法可以切换当前使用的语言。

```js
import { Locale } from 'mb-lib-ui'
// 引入英文语言包
import enUS from 'mb-lib-ui/packages/locale/lang/en-US.ts'

Locale.use('en-US', enUS)
```

## 覆盖语言包

通过 Locale.add 方法可以实现文案的修改和扩展，示例如下：

```js
import { Locale } from 'mb-lib-ui'

const messages = {
  'zh-CN': {
    mbPopup: {
      test: '测试Test属性值', // 将'测试'修改为'测试Test属性值'
    },
  },
}

Locale.add(messages)
```

## 单个组件国际化

如果你没有使用全量引入组件, 只是使用了部分组件或者单个组件, 那么也可以引入 Locale 组件，如下

```js
import Vue from 'vue'

import 'mb-lib-ui/packages/theme-chalk/popup/index.less'
import MbPopup, { Locale } from 'mb-lib-ui/lib/components/popup/index.js'

Vue.use(MbPopup)

// 语言值覆盖
const messages = {
  'zh-CN': {
    mbPopup: {
      test: '测试Test属性值', // 将'测试'修改为'测试Test属性值'
    },
  },
}
Locale.add(messages)

// 语言切换
import enUS from 'mb-lib-ui/packages/locale/lang/en-US.ts'
Locale.use('en-US', enUS)
```

## MbLibUI 国际化实现

MbLibUI 国际化的实现是基于 Vant 的 Local 组件, 实现一个国际化本身比较简单。

由于 MbLibUI 本身基于 Vant 开发, 所以会尽最大程度复用 Vant 的源代码, 从而专注于业务组件代码开发。

[Local 组件源代码](https://github.com/youzan/vant/blob/2.x/src/locale/index.ts)
