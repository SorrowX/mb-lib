# 介绍

MbLibUI 是一个基于 [Vant](https://vant-contrib.gitee.io/vant/v2/#/zh-CN/home) 进行二次开发的 Vue2 UI 组件库。部分组件将在 Vant 组件上进行扩展，部分组件将基于 Vant 组件进行业务组件开发，部分组件可能不依赖 Vant 组件。

## 基于 Vant 开发

为了减少加班的次数，为了业务组件开发的质量，对于以业务为主的公司，选取一个开源且稳定的 [Vant UI 库](https://vant-contrib.gitee.io/vant/v2/#/zh-CN/home) 作为基础组件是很有必要的。

拒绝重复造轮子，拒绝抄写源代码，以开源且稳定库作为基石并不可耻，发现问题可以提 issues 和 pr。

## 基于 Vite 构建

MbLibUI 组件库是由 [Vite](https://cn.vitejs.dev/guide/) 来构建，并由[Rollup](https://rollupjs.org/guide/en/#introduction)来打包组件库代码，强大的 Tree-Shaking 功能，可以排除不必要的代码。所有的组件代码将生成 2 份,一份包含 Vant 所需的组件代码，一份不包含 Vant 组件的代码。可以根据需求自由使用。

## 文档由 Vitepress 构建

[vitepress](https://vitepress.vuejs.org/config/introduction.html)[(中文文档)](https://vitejs.cn/vitepress/)是 VuePress 小兄弟, 基于 Vite 构建。用其编写 MbLibUI 库组件的文档，开发体验真的很不错，只可惜其 Markdown 文档目前只支持[Vue3](https://v3.cn.vuejs.org/)组件解析，目前已编写了 markdown-transform.js 插件，才支持在 Markdown 文件中渲染[Vue2](https://cn.vuejs.org/)单元测试组件。
