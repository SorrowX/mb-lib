import enUS from 'vant/es/locale/lang/en-US'
import { deepAssign } from 'vant/es/utils/deep-assign'

export default deepAssign(enUS, {
  common: {
    searchPlaceholder: 'Please enter search keywords',
    loading: 'Loading...',
  },
  mbPopup: {
    sure: 'Sure',
  },
  mbList: {
    finishedText: 'No more',
    loadingText: 'Loading...',
    errorText: 'Request failed, click reload',
    pulling: 'Pull to refresh...',
    loosing: 'Loose to refresh...',
  },
})