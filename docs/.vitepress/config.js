module.exports = {
  title: 'MbLibUI',
  description: 'A Vue2 UI Components library.',
  lastUpdated: true,
  markdown: {},
  themeConfig: {
    nav: nav(),

    sidebar: {
      '/components/': sidebarConfig(),
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/SorrowX/mb-lib' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Summer',
    },

    algolia: {
      appId: '8J64VVRP8K',
      apiKey: 'a18e2f4cc5665f6602c5631fd868adfd',
      indexName: 'vitepress',
    },
  },
}

function nav() {
  return [
    {
      text: '组件',
      link: '/components/introduction',
      activeMatch: '/components/',
    },
    {
      text: '日志',
      link: 'https://github.com/SorrowX/mb-lib/commits/main',
    },
  ]
}

function sidebarConfig() {
  return [
    {
      text: '开发指南',
      items: [
        { text: '介绍', link: '/components/introduction' },
        { text: '快速上手', link: '/components/quickstart' },
        { text: '主题定制', link: '/components/theme' },
        {
          text: '国际化',
          link: '/components/locale',
        },
      ],
    },
    {
      text: '基础组件',
      items: [
        { text: 'Popup 弹出层', link: '/components/popup' },
        { text: 'Layout 布局', link: '/components/todo' },
        { text: 'Button 按钮', link: '/components/todo' },
        { text: 'Search 搜索', link: '/components/todo' },
        { text: 'Toast 轻提示', link: '/components/todo' },

        { text: 'List 列表', link: '/components/todo' },
        { text: 'PullRefresh 下拉刷新', link: '/components/todo' },
        { text: 'Dialog 弹出框', link: '/components/todo' },
      ],
    },
    {
      text: '表单组件',
      items: [
        { text: 'Select 列表选择', link: '/components/todo' },
        { text: 'Calendar 日历', link: '/components/todo' },
        { text: 'DatetimePicker 时间选择', link: '/components/todo' },
        { text: 'Tree 树型选择', link: '/components/todo' },
        { text: 'Form 表单', link: '/components/todo' },
        { text: 'FormWidgets 表单控件', link: '/components/todo' },
      ],
    },
  ]
}
