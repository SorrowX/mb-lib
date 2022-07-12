## 快速上手

通过本章节你可以了解到 MbLibUI 的安装方法和基本使用姿势.

## 安装

在现有项目中使用 MbLibUI 时, 可以通过 yarn 或 npm 进行安装:

```js
yarn add mb-lib-ui -S
or
npm install mb-lib-ui -S
```

## 引入组件

::: tip
组件引入可以分为 "全量引入" 和 "按需引入"。

全量引入和按需引入中又可分为完整和纯净 js, css 文件引入。

完整: 因为 MbLibUI 是基于 Vant 进行二次开发,使用完整版 js, css 文件，将包含 Vant 对应的组件代码和样式。

纯净: 将排除 Vant 的源代码，只有 MbLibUI 组件的源代码和样式,适用于项目中引入过 Vant 库。
:::

### 方式一. 全量引入组件

I. 如果你的项目没有使用 vant 库, 你想全量引入所有组件, 如下操作:

```js
import Vue from 'vue'
// MbLibUI js和css文件包含对应的Vant组件源代码和样式
import 'mb-lib-ui/lib/index.full/style.css'
import MbLibUI from 'mb-lib-ui'

Vue.use(MbLibUI)
```

II. 如果你的项目已经在使用 vant 库, 你想全量引入所有组件, 如下操作:

```js
import Vue from 'vue'

// 需引入Vant
import 'vant/lib/index.css'
import Vant from 'vant'
// MbLibUI js和css文件只包含自身的源代码和样式
import 'mb-lib-ui/lib/index.pure/style.css'
import MbLibUI from 'mb-lib-ui/lib/index.pure/mb-lib.pure.es.js'

Vue.use(Vant)
Vue.use(MbLibUI)
```

### 方式二. 手动按需引入组件

I. 如果你的项目没有使用 vant 库, 你可以手动引入需要的组件, 比如 popup 组件, 如下操作:

```js
import Vue from 'vue'

// MbPopup组件包含Vant的popup组件源代码
import 'mb-lib-ui/lib/components/popup/full/style.css'
import MbPopup from 'mb-lib-ui/lib/components/popup/full/index.full.es.js'

Vue.use(MbPopup)
```

II. 如果你的项目已经在使用 vant 库, 你可以手动引入需要的组件, 比如 popup 组件, 如下操作:

```js
import Vue from 'vue'

// 需引入Vant(或者部分Vant组件)
import 'vant/lib/index.css'
import Vant from 'vant'

// MbPopup组件不包含Vant的popup组件源代码
import 'mb-lib-ui/lib/components/popup/pure/style.css'
import MbPopup from 'mb-lib-ui/lib/components/popup/pure/index.pure.es.js'

Vue.use(Vant)
Vue.use(MbPopup)
```

::: warning
由于大多数情况下,我们项目都是用 webpack 或者 vite 来构建。所以 MbLibUI 库不提供 iife/cjs/amd/umd/system 模式的库文件,只提供 es 版库文件。
:::
