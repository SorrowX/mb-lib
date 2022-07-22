import path from 'path'
import { defineConfig, mergeConfig } from 'vite'
import getBaseConfig from './build/base-config.mjs'

export default defineConfig(({ command, mode }) => {
  console.log(command, mode)
  // const isFullMode = mode === 'full'
  const baseConfig = getBaseConfig()

  return mergeConfig(baseConfig, {
    root: __dirname,
    build: {
      outDir: `lib`,
      lib: {
        entry: path.resolve(__dirname, 'packages/components/index.js'),
        name: 'MbLib',
        formats: ['es'],
        fileName: (format) => `index.js`,
      },
    },
  })
})
