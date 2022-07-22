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

export default async function doBuild() {
  try {
    for (let i = 0; i < opts.length; i++) {
      await build(getBuildOptions(opts[i]))
    }
  } catch (e) {
    console.error('组件构建失败: ', e)
  } finally {
    console.error('组件构建结束.')
  }
}

doBuild()

// ;(async () => {
//   const inputs = componentsDirNames.reduce((pre, dirName) => {
//     const entry = resolve(`${COMPONENTS_PATH}/${dirName}/index.js`)
//     pre.push(entry)
//     return pre
//   }, [])

//   await build({
//     configFile: false,
//     root: __dirname,
//     resolve: {
//       alias: {
//         '@': '/packages',
//       },
//     },
//     build: {
//       cssCodeSplit: true,
//       outDir: resolve(`lib/components`),
//       write: true,
//       lib: {
//         entry: 'lib/components/index.js',
//         name: 'components',
//         formats: ['es'],
//       },
//       rollupOptions: {
//         external: false
//           ? ['vue']
//           : (importer) => importer === 'vue' || /vant/.test(importer),
//         output: {
//           globals: { vue: 'Vue', vant: 'vant' },
//           format: ['es'],
//         },
//         input: inputs,
//       },
//     },
//     plugins: [createVuePlugin()],
//   })
// })()
