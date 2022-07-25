import path from 'path'
import { createVuePlugin } from 'vite-plugin-vue2'

const __dirname = path.resolve()
const resolve = (dir) => path.join(__dirname, dir)

const libDirName = 'mb-lib-ui'

export default function getBaseConfig(isFullMode) {
  isFullMode = isFullMode || false
  return {
    resolve: {
      alias: [
        { find: '~@vant', replacement: '@vant' },
        {
          find: libDirName,
          replacement: libDirName,
          customResolver(id) {
            return resolve(id.replace(libDirName, ''))
          },
        },
      ],
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import "mb-lib-ui/packages/theme-chalk/var.less";`,
          },
        },
      },
    },
    build: {
      cssCodeSplit: false,
      minify: false,
      sourcemap: false,
      rollupOptions: {
        external: isFullMode
          ? []
          : (importer) => importer === 'vue' || /vant/.test(importer),
        output: {
          globals: { vue: 'Vue', vant: 'vant' },
        },
      },
    },
    server: {
      host: '0.0.0.0',
    },
    plugins: [createVuePlugin()],
  }
}
