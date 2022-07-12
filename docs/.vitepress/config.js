module.exports = {
  title: 'MbLibUI',
  description: 'Just playing around.',
  lastUpdated: true,
  markdown: {},
  themeConfig: {
    nav: nav(),

    sidebar: {
      // '/guide/': sidebarGuide(),
      '/components/': sidebarConfig(),
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
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
    // { text: '指南', link: '/guide/what-is-vitepress', activeMatch: '/guide/' },
    {
      text: '组件',
      link: '/components/introduction',
      activeMatch: '/components/',
    },
    {
      text: '日志',
      link: 'https://github.com/vuejs/vitepress/blob/main/CHANGELOG.md',
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
        { text: '主题定制', link: '/components/theme-configs' },
        {
          text: '国际化',
          link: '/components/frontmatter-configs',
        },
      ],
    },
    {
      text: '业务组件',
      items: [
        { text: '下拉选择', link: '/components/introduction' },
        { text: '上拉刷新', link: '/components/app-configs' },
        { text: '弹出框', link: '/components/theme-configs' },
      ],
    },
  ]
}

function sidebarGuide() {
  return [
    {
      text: 'Introduction',
      collapsible: true,
      items: [
        { text: 'What is VitePress?', link: '/guide/what-is-vitepress' },
        { text: 'Getting Started', link: '/guide/getting-started' },
        { text: 'Configuration', link: '/guide/configuration' },
        { text: 'Deploying', link: '/guide/deploying' },
      ],
    },
    {
      text: 'Writing',
      collapsible: true,
      items: [
        { text: 'Markdown', link: '/guide/markdown' },
        { text: 'Asset Handling', link: '/guide/asset-handling' },
        { text: 'Frontmatter', link: '/guide/frontmatter' },
        { text: 'Using Vue in Markdown', link: '/guide/using-vue' },
        { text: 'API Reference', link: '/guide/api' },
      ],
    },
    {
      text: 'Theme',
      collapsible: true,
      items: [
        { text: 'Introduction', link: '/guide/theme-introduction' },
        { text: 'Nav', link: '/guide/theme-nav' },
        { text: 'Sidebar', link: '/guide/theme-sidebar' },
        { text: 'Prev Next Link', link: '/guide/theme-prev-next-link' },
        { text: 'Edit Link', link: '/guide/theme-edit-link' },
        { text: 'Last Updated', link: '/guide/theme-last-updated' },
        { text: 'Layout', link: '/guide/theme-layout' },
        { text: 'Homepage', link: '/guide/theme-homepage' },
        { text: 'Footer', link: '/guide/theme-footer' },
        { text: 'Search', link: '/guide/theme-search' },
        { text: 'Carbon Ads', link: '/guide/theme-carbon-ads' },
      ],
    },
    {
      text: 'Migrations',
      collapsible: true,
      items: [
        {
          text: 'Migration from VuePress',
          link: '/guide/migration-from-vuepress',
        },
        {
          text: 'Migration from VitePress 0.x',
          link: '/guide/migration-from-vitepress-0',
        },
      ],
    },
  ]
}
