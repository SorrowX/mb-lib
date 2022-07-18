# 主题定制

MbLibUI 默认使用 OPPO 绿 作为默认主题并遵循 BEM 命名规范。如果你想完全替换主题色或者其他样式，可以按照本文档进行主题定制。

## 定制方法

::: tip

Vite 环境下, 需要安装 less:

```js
npm install less --save-dev
```

Vue-Cli 或者 Webpack 环境下, 需要安装 less 和 less-loader:

```js
npm install less less-loader --save-dev
```

:::

#### 步骤一: 新建一个 less 文件

在你的项目中新建一个 less 文件, 比如 var.less, 里面可以写入 [主题变量](https://github.com/youzan/vant/blob/2.x/src/style/var.less) 覆盖。

```css
// var.less

// Color Palette （具体可以参考下文的 Vant 主题变量）
@black: #000;
@white: #fff;
@gray-1: #f7f8fa;
@gray-2: #f2f3f5;
@gray-3: #ebedf0;
@gray-4: #dcdee0;
@gray-5: #c8c9cc;
@gray-6: #969799;
@gray-7: #646566;
@gray-8: #323233;
@red: #ee0a24;
@blue: #1989fa;
@orange: #ff976a;
@orange-dark: #ed6a0c;
@orange-light: #fffbe8;
@green: #07c160;
```

#### 步骤二: 使用修改后的变量文件

如果 使用 vite 搭建的项目，可以在 vite.config.js 中进行配置。

```js
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
            // ./var.less 这是你项目中创建好主题变量文件的具体绝对路径
            hack: `true; @import "./var.less";`,
          },
        },
      },
    },
  }
})
```

如果 vue-cli 搭建的项目，可以在 vue.config.js 中进行配置。

```js
// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，
        // 直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            'text-color': '#111',
            'border-color': '#eee',
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "your-less-file-path.less";`,
          },
        },
      },
    },
  },
}
```

使用 Less 提供的 modifyVars 即可对变量进行修改，下面是参考的 webpack 配置。

```js
// webpack.config.js
module.exports = {
  rules: [
    {
      test: /\.less$/,
      use: [
        // ...其他 loader 配置
        {
          loader: 'less-loader',
          options: {
            // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，
            // 直接配置选项。
            lessOptions: {
              modifyVars: {
                // 直接覆盖变量
                'text-color': '#111',
                'border-color': '#eee',
                // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
                hack: `true; @import "your-less-file-path.less";`,
              },
            },
          },
        },
      ],
    },
  ],
}
```

## Vant 主题变量

[有关 Vant 的所有主题变量,可以参考这里](https://github.com/youzan/vant/blob/2.x/src/style/var.less)
