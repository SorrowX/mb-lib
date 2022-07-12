<template>
  <div class="example-showcase">
    <iframe
      ref="iframe"
      width="100%"
      :style="iframeStyle"
      frameborder="0"
    ></iframe>
  </div>
</template>

<script>
import Vue from './vue.esm.browser.js'

export default {
  data() {
    return {
      iframeStyle: {},
    }
  },
  methods: {
    insert(Vue2Component) {
      this.iframeStyle = Vue2Component?.options?.iframeStyle || {}
      Vue.nextTick(() => {
        new Vue({
          render(h) {
            return h(Vue2Component)
          },
        }).$mount(this.$refs.iframe.contentWindow.document.body)
      })
    },
  },
  mounted() {
    const targetNode = document.documentElement

    const config = { attributes: true }

    const switchStyle = () => {
      const cssText = `
            background: #262727;
            color: #fff;
          `
      const iframe = this.$refs.iframe
      if (iframe) {
        iframe.contentWindow.document.documentElement.style.cssText = [
          ...document.documentElement.classList,
        ].includes('dark')
          ? cssText
          : ''
      }
    }
    switchStyle()

    const callback = function (mutationsList, observer) {
      for (let mutation of mutationsList) {
        if (mutation.type === 'attributes') {
          switchStyle()
        }
      }
    }

    this.observer = new MutationObserver(callback)
    this.observer.observe(targetNode, config)
  },
  unmounted() {
    this.observer.disconnect()
  },
}
</script>

<style lang="less">
.example-showcase {
  padding: 1.5rem;
  margin: 0.5px;
  background-color: #ffffff;
  iframe {
    .popup-test {
      max-height: 500px;
      background: #262727;
      color: #fff;
    }
  }
}
</style>
