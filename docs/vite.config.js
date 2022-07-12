import { defineConfig } from 'vite'
import MarkdownTransform from './markdown-transform.js'

export default defineConfig(({ command, mode }) => {
  return {
    root: __dirname,
    plugins: [MarkdownTransform()],
  }
})
