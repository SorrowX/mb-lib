import fs from 'fs'
import path from 'path'
import { build, mergeConfig } from 'vite'
import getBaseConfig from './base-config.mjs'

const resolve = (dir) => path.join(__dirname, dir)

const __dirname = path.resolve()

const COMPONENTS_PATH = 'packages/components'

const getDirNames = (fullPath) =>
  fs
    .readdirSync(fullPath)
    .filter((dir) => fs.statSync(resolve(fullPath + '/' + dir)).isDirectory())

const componentsDirNames = getDirNames(COMPONENTS_PATH)

const opts = componentsDirNames.reduce((pre, dirName) => {
  const entry = resolve(`${COMPONENTS_PATH}/${dirName}/index.js`)
  const outDir = resolve(`lib/components/${dirName}`)
  pre.push({ entry, outDir: outDir })
  return pre
}, [])

const getBuildOptions = (optopns) => {
  const { outDir, entry } = optopns
  const baseConfig = getBaseConfig()

  return mergeConfig(baseConfig, {
    configFile: false,
    root: __dirname,
    build: {
      outDir,
      write: true,
      sourcemap: true,
      lib: {
        entry,
        formats: ['es'],
        fileName: (format) => `index.js`,
      },
    },
  })
}

const tip = '单独组件包构建'
export default async function doBuild() {
  try {
    console.error(tip + '开始')
    for (let i = 0; i < opts.length; i++) {
      await build(getBuildOptions(opts[i]))
    }
  } catch (e) {
    console.error(tip + '失败: ', e)
  } finally {
    console.error(tip + '结束.')
  }
}

doBuild()
