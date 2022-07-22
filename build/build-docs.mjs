import path from 'path'
import { build, mergeConfig } from 'vite'
import getBaseConfig from './base-config.mjs'

const resolve = (dir) => path.join(__dirname, dir)

const __dirname = path.resolve()

const getBuildOptions = () => {
  const baseConfig = getBaseConfig(true)

  return mergeConfig(baseConfig, {
    configFile: false,
    root: __dirname,
    build: {
      outDir: resolve(`docs/mb-lib`),
      write: true,
      lib: {
        entry: resolve(`packages/components/docs.js`),
        formats: ['es'],
        fileName: (format) => `index.js`,
      },
    },
  })
}

export default async function doBuild() {
  try {
    await build(getBuildOptions())
  } catch (e) {
    console.error('文档所需完整库文件包构建失败: ', e)
  } finally {
    console.error('文档所需完整库文件包构建结束.')
  }
}

doBuild()
