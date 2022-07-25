import path from 'path'
import { resolve } from 'path'

const templateReg = /<template([^>]*)>([\s\S]*)<\/template>/g
const vpDemoReg = /<vp-demo.*(path=(["'](.+)['"])).*\/?>/g
const pathValueReg = /path=["'](?:[^<>]+)['"]/g
const generateId = () => Math.floor(Math.random() * 10000)

export default function MarkdownTransform() {
  const mdTransformPlugin = {
    name: 'vite-plugin-md-transform',

    enforce: 'pre',

    transform(code, id) {
      if (!id.endsWith('.md')) return

      const vpDemos = code.match(vpDemoReg)
      if (!vpDemos) return
      code = code.replace(vpDemoReg, (a, b, c) => {
        return a.replace(b, `id=${c.replace('.vue', '').split('/').join('-')}`)
      })

      const components = vpDemos.map((str) => {
        const matchs = str.match(pathValueReg)
        const basePath = matchs[0].split('=')[1].replace(/["']/g, '')
        return {
          [basePath.replace('.vue', '').split('/').join('-')]: resolve(
            __dirname,
            './examples/',
            basePath
          ),
        }
      })

      // console.log('components: ', components)

      let scriptCode = ``

      components.forEach((item) => {
        const key = Object.keys(item)[0]
        const value = item[key].replace(/\\/g, '/')
        const componentName = path.basename(value, '.vue')
        const $el = `$el_${generateId()}`

        const code = `
          import ${componentName} from '${value}'
          import ${componentName}Raw from '${value}?raw'
          delete ${componentName}.render
          ${componentName}.template = ${componentName}Raw.match(${templateReg})[0].replace('<template>', '').replace('</template>', '')

          Promise.resolve().then(() => {
            const ${$el} = document.querySelector('#${key}')
            const inset = ${$el}.__vue__.inset
            const setRawSource = ${$el}.__vue__.setRawSource
            inset(${componentName})
            setRawSource(${componentName}Raw)
          }).catch(e => {})
          \n
        `
        scriptCode += code
      })

      code += `\n<script setup>
        ${scriptCode}
        \n
        // 设置table的列宽
        setTimeout(() => {
          try {
            const tables = document.querySelectorAll('table')
            const mainWidth = document.querySelector('.main')?.offsetWidth || 688
            tables.forEach((table) => {
              const theadTr = table.querySelector('thead tr')
              const ths = theadTr?.querySelectorAll('th')
              const maps = {
                1: mainWidth + 'px',
                2: (mainWidth/2) + 'px',
                3: (mainWidth/3) + 'px',
                4: (mainWidth/4) + 'px',
                5: (mainWidth/5) + 'px',
                6: (mainWidth/6) + 'px',
              }
              ths &&
                ths.forEach((th) => {
                  th.style.minWidth = maps[ths.length]
                })
          })
        } catch (e) {}
        }, 1000)
      </script>
      `

      return code
    },
  }

  return [mdTransformPlugin]
}
