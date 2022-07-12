import { createVuePlugin } from 'vite-plugin-vue2'

export default function getBaseConfig(isFullMode) {
  return {
    resolve: {
      alias: {
        '@': '/packages',
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import "@/theme-chalk/var.less";`,
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
