import { createVuePlugin } from 'vite-plugin-vue2'

export default function getBaseConfig(isFullMode) {
  isFullMode = isFullMode || false
  return {
    resolve: {
      alias: {
        '@': '/packages',
        '~@vant': '@vant',
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import "@/theme-chalk/var.less";`,
          },
          importer(url) {
            console.log('isFullMode: ', isFullMode, url)
            if (!isFullMode && /vant/.test(url)) {
              return {
                contents: '',
              }
            }
          },
        },
        scss: {
          additionalData: `
            $button-primary-background-color: #f60;
          `,
        },
      },
    },
    build: {
      cssCodeSplit: false,
      minify: false,
      sourcemap: false,
      rollupOptions: {
        external: isFullMode
          ? ['vue']
          : (importer) => importer === 'vue' || /vant/.test(importer),
        output: {
          globals: { vue: 'Vue', vant: 'vant' },
        },
      },
    },
    plugins: [createVuePlugin()],
  }
}
