# 快速上手

通过本章节你可以了解到 MbLibUI 的安装方法和基本使用姿势.

## 安装

可以通过 yarn 或 npm 进行安装:

```js
yarn add mb-lib-ui -S
or
npm install mb-lib-ui -S
```

## 升级

可以通过 yarn 或 npm 进行升级安装:

```js
yarn upgrade mb-lib-ui --latest
or
npm update mb-lib-ui
```

### 方式一. 全量引入组件

I. 全量引入, 如下操作:

```js
import Vue from 'vue'

import 'vant/lib/index.css'
import 'mb-lib-ui/lib/style.css'
import MbLibUI from 'mb-lib-ui'

Vue.use(MbLibUI)
```

II. 全量引入 + 自定义主题, 如下操作:

```js
// main.js
import Vue from 'vue'

import 'vant/lib/index.less';
import 'mb-lib-ui/packages/theme-chalk/index.less'
import MbLibUI from 'mb-lib-ui'

Vue.use(MbLibUI)

// vite.config.js
import { defineConfig } from 'vite'
export default defineConfig({
  return {
    resolve: {
      alias: {
        '~@vant': '@vant',
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            // 这里定义 css 变量
            "@green": "#f60"
          },
        },
      },
    },
  }
})

// 其他配置文件参考主题定制
```

### 方式二. 手动按需引入组件

I. 按需引入(比如 popup 组件), 如下操作:

```js
import Vue from 'vue'

import 'vant/es/popup/style/less'
import 'mb-lib-ui/packages/theme-chalk/popup/index.less'
import MbPopup from 'mb-lib-ui/lib/components/popup/index.js'

Vue.use(MbPopup)
```

II. 按需引入(比如 popup 组件) + 自定义主题, 如下操作:

```js
// main.js
import Vue from 'vue'

import 'vant/es/popup/style/less'
import 'mb-lib-ui/packages/theme-chalk/popup/index.less'
import MbPopup from 'mb-lib-ui/lib/components/popup/index.js'

Vue.use(MbPopup)

// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  return {
    resolve: {
      alias: {
        '~@vant': '@vant',
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            // 这里定义 css 变量
            "@green": "#f60",
          },
        },
      },
    },
  }
})

// 其他配置文件参考主题定制
```

::: warning

由于大多数情况下,我们项目都是用 Webpack 或者 Vite 来构建。所以 MbLibUI 库不提供 iife/cjs/amd/umd/system 模式的库文件,只提供 es 版库文件。

:::
