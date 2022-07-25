import path from 'path'
import { build, mergeConfig } from 'vite'
import getBaseConfig from './base-config.mjs'

const __dirname = path.resolve()
const resolve = (dir) => path.join(__dirname, dir)

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

const tip = '文档所需完整库文件包构建'
export default async function doBuild() {
  try {
    console.error(tip + '开始')
    await build(getBuildOptions())
  } catch (e) {
    console.error(tip + '失败: ', e)
  } finally {
    console.error(tip + '结束.')
  }
}

doBuild()
