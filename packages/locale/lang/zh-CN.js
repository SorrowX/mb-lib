import zhCN from 'vant/es/locale/lang/zh-CN.js'
import { deepAssign } from 'vant/es/utils/deep-assign.js'

export default deepAssign(zhCN, {
  common: {
    searchPlaceholder: '请输入搜索关键词',
    loading: '加载中...',
  },
  mbPopup: {
    sure: '确定',
  },
  mbList: {
    finishedText: '没有更多了',
    errorText: '请求失败，点击重新加载',
    pulling: '下拉即可刷新...',
    loosing: '释放即可刷新...',
  },
})
