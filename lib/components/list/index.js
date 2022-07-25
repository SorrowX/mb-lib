import { PullRefresh, Loading } from "vant";
import Vue from "vue";
import { createBEM } from "vant/lib/utils/create/bem";
import { createComponent } from "vant/lib/utils/create/component";
import { get, isFunction as isFunction$1 } from "vant/lib/utils/index";
import { camelize } from "vant/lib/utils/format/string";
import Locale from "vant/lib/locale/index";
export { default as Locale } from "vant/lib/locale/index";
import zhCN from "vant/es/locale/lang/zh-CN";
import { deepAssign } from "vant/es/utils/deep-assign";
var throttle$1 = function(delay, noTrailing, callback, debounceMode) {
  var timeoutID;
  var lastExec = 0;
  if (typeof noTrailing !== "boolean") {
    debounceMode = callback;
    callback = noTrailing;
    noTrailing = void 0;
  }
  function wrapper() {
    var self = this;
    var elapsed = Number(new Date()) - lastExec;
    var args = arguments;
    function exec() {
      lastExec = Number(new Date());
      callback.apply(self, args);
    }
    function clear() {
      timeoutID = void 0;
    }
    if (debounceMode && !timeoutID) {
      exec();
    }
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    if (debounceMode === void 0 && elapsed > delay) {
      exec();
    } else if (noTrailing !== true) {
      timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === void 0 ? delay - elapsed : delay);
    }
  }
  return wrapper;
};
var throttle = throttle$1;
var debounce = function(delay, atBegin, callback) {
  return callback === void 0 ? throttle(delay, atBegin, false) : throttle(delay, callback, atBegin !== false);
};
function isHtmlElement(node) {
  return node && node.nodeType === Node.ELEMENT_NODE;
}
let isFunction = (functionToCheck) => {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === "[object Function]";
};
if (typeof /./ !== "function" && typeof Int8Array !== "object" && (Vue.prototype.$isServer || typeof document.childNodes !== "function")) {
  isFunction = function(obj) {
    return typeof obj === "function" || false;
  };
}
const isUndefined = (val) => {
  return val === void 0;
};
const isDefined = (val) => {
  return val !== void 0 && val !== null;
};
const isServer = Vue.prototype.$isServer;
const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;
const ieVersion = isServer ? 0 : Number(document.documentMode);
const camelCase = function(name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter;
  }).replace(MOZ_HACK_REGEXP, "Moz$1");
};
const getStyle = ieVersion < 9 ? function(element, styleName) {
  if (isServer)
    return;
  if (!element || !styleName)
    return null;
  styleName = camelCase(styleName);
  if (styleName === "float") {
    styleName = "styleFloat";
  }
  try {
    switch (styleName) {
      case "opacity":
        try {
          return element.filters.item("alpha").opacity / 100;
        } catch (e) {
          return 1;
        }
      default:
        return element.style[styleName] || element.currentStyle ? element.currentStyle[styleName] : null;
    }
  } catch (e) {
    return element.style[styleName];
  }
} : function(element, styleName) {
  if (isServer)
    return;
  if (!element || !styleName)
    return null;
  styleName = camelCase(styleName);
  if (styleName === "float") {
    styleName = "cssFloat";
  }
  try {
    var computed = document.defaultView.getComputedStyle(element, "");
    return element.style[styleName] || computed ? computed[styleName] : null;
  } catch (e) {
    return element.style[styleName];
  }
};
const isScroll = (el, vertical) => {
  if (isServer)
    return;
  const determinedDirection = vertical !== null && vertical !== void 0;
  const overflow = determinedDirection ? vertical ? getStyle(el, "overflow-y") : getStyle(el, "overflow-x") : getStyle(el, "overflow");
  return overflow.match(/(scroll|auto|overlay)/);
};
const getScrollContainer = (el, vertical) => {
  if (isServer)
    return;
  let parent = el;
  while (parent) {
    if ([window, document, document.documentElement].includes(parent)) {
      return window;
    }
    if (isScroll(parent, vertical)) {
      return parent;
    }
    parent = parent.parentNode;
  }
  return parent;
};
const getStyleComputedProperty = (element, property) => {
  if (element === window) {
    element = document.documentElement;
  }
  if (element.nodeType !== 1) {
    return [];
  }
  const css = window.getComputedStyle(element, null);
  return property ? css[property] : css;
};
const entries = (obj) => {
  return Object.keys(obj || {}).map((key) => [key, obj[key]]);
};
const getPositionSize = (el, prop) => {
  return el === window || el === document ? document.documentElement[prop] : el[prop];
};
const getOffsetHeight = (el) => {
  return getPositionSize(el, "offsetHeight");
};
const getClientHeight = (el) => {
  return getPositionSize(el, "clientHeight");
};
const scope$1 = "ElInfiniteScroll";
const attributes = {
  delay: {
    type: Number,
    default: 200
  },
  distance: {
    type: Number,
    default: 0
  },
  disabled: {
    type: Boolean,
    default: false
  },
  immediate: {
    type: Boolean,
    default: true
  }
};
const getScrollOptions = (el, vm) => {
  if (!isHtmlElement(el))
    return {};
  return entries(attributes).reduce((map, [key, option]) => {
    const { type, default: defaultValue } = option;
    let value = el.getAttribute(`infinite-scroll-${key}`);
    value = isUndefined(vm[value]) ? value : vm[value];
    switch (type) {
      case Number:
        value = Number(value);
        value = Number.isNaN(value) ? defaultValue : value;
        break;
      case Boolean:
        value = isDefined(value) ? value === "false" ? false : Boolean(value) : defaultValue;
        break;
      default:
        value = type(value);
    }
    map[key] = value;
    return map;
  }, {});
};
const getElementTop = (el) => el.getBoundingClientRect().top;
const handleScroll = function(cb) {
  const { el, vm, container, observer } = this[scope$1];
  const { distance, disabled } = getScrollOptions(el, vm);
  if (disabled)
    return;
  const containerInfo = container.getBoundingClientRect();
  if (!containerInfo.width && !containerInfo.height)
    return;
  let shouldTrigger = false;
  if (container === el) {
    const scrollBottom = container.scrollTop + getClientHeight(container);
    shouldTrigger = container.scrollHeight - scrollBottom <= distance;
  } else {
    const heightBelowTop = getOffsetHeight(el) + getElementTop(el) - getElementTop(container);
    const offsetHeight = getOffsetHeight(container);
    const borderBottom = Number.parseFloat(getStyleComputedProperty(container, "borderBottomWidth"));
    shouldTrigger = heightBelowTop - offsetHeight + borderBottom <= distance;
  }
  if (shouldTrigger && isFunction(cb)) {
    cb.call(vm);
  } else if (observer) {
    observer.disconnect();
    this[scope$1].observer = null;
  }
};
var InfiniteScroll = {
  name: "InfiniteScroll",
  inserted(el, binding, vnode) {
    console.log("inserted");
    const cb = binding.value;
    const vm = vnode.context;
    const container = getScrollContainer(el, true);
    const { delay, immediate } = getScrollOptions(el, vm);
    const onScroll = debounce(delay, handleScroll.bind(el, cb));
    el[scope$1] = { el, vm, container, onScroll };
    if (container) {
      container.addEventListener("scroll", onScroll);
      if (immediate) {
        const observer = el[scope$1].observer = new MutationObserver(onScroll);
        observer.observe(container, { childList: true, subtree: true });
        onScroll();
      }
    }
  },
  unbind(el) {
    console.log("unbind");
    const { container, onScroll } = el[scope$1];
    if (container) {
      container.removeEventListener("scroll", onScroll);
    }
  }
};
InfiniteScroll.install = function(Vue2) {
  Vue2.directive(InfiniteScroll.name, InfiniteScroll);
};
var defaultMessages = deepAssign(zhCN, {
  common: {
    searchPlaceholder: "\u8BF7\u8F93\u5165\u641C\u7D22\u5173\u952E\u8BCD",
    loading: "\u52A0\u8F7D\u4E2D..."
  },
  mbPopup: {
    test: "\u6D4B\u8BD5",
    sure: "\u786E\u5B9A"
  },
  mbList: {
    finishedText: "\u6CA1\u6709\u66F4\u591A\u4E86",
    errorText: "\u8BF7\u6C42\u5931\u8D25\uFF0C\u70B9\u51FB\u91CD\u65B0\u52A0\u8F7D",
    pulling: "\u4E0B\u62C9\u5373\u53EF\u5237\u65B0...",
    loosing: "\u91CA\u653E\u5373\u53EF\u5237\u65B0..."
  }
});
Locale.add({
  "zh-CN": defaultMessages
});
function createI18N(name) {
  const prefix = camelize(name) + ".";
  return function(path, ...args) {
    const messages = Locale.messages();
    const message = get(messages, prefix + path) || get(messages, path);
    return isFunction$1(message) ? message(...args) : message;
  };
}
function createNamespace(name) {
  name = "mb-" + name;
  const bem = createBEM(name);
  const t2 = createI18N(name);
  return [
    function defineComponent2(sfc) {
      const comp = createComponent(name)(sfc);
      const methods = comp.methods || {};
      methods.$bem = bem;
      methods.$translate = t2;
      comp.methods = methods;
      return comp;
    },
    t2,
    bem
  ];
}
var render = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {
    directives: [{
      name: "infinite-scroll",
      rawName: "v-infinite-scroll",
      value: _vm.onLoad,
      expression: "onLoad"
    }],
    class: _vm.$bem(),
    attrs: {
      "infinite-scroll-disabled": _vm.infiniteScrollDisabled,
      "infinite-scroll-delay": _vm.infiniteScrollDelay,
      "infinite-scroll-distance": _vm.infiniteScrollDistance,
      "infinite-scroll-immediate": _vm.infiniteScrollImmediate
    }
  }, [_c("van-pull-refresh", {
    attrs: {
      "disabled": _vm.disabled,
      "pulling-text": _vm.pullingText,
      "loosing-text": _vm.loosingText,
      "loading-text": _vm.loadingText,
      "success-text": _vm.successText
    },
    on: {
      "refresh": _vm.onRefresh
    },
    scopedSlots: _vm._u([{
      key: "pulling",
      fn: function(props) {
        return [_vm._t("pull-refresh-pulling", null, null, props)];
      }
    }, {
      key: "loosing",
      fn: function(props) {
        return [_vm._t("pull-refresh-loosing", null, null, props)];
      }
    }, {
      key: "loading",
      fn: function(props) {
        return [_vm._t("pull-refresh-loading", null, null, props)];
      }
    }], null, true),
    model: {
      value: _vm.isRefresh,
      callback: function($$v) {
        _vm.isRefresh = $$v;
      },
      expression: "isRefresh"
    }
  }, [_c("div", {
    class: _vm.$bem("content")
  }, [_vm._t("default"), _vm.loading ? _c("div", {
    class: _vm.$bem("loading")
  }, [_vm._t("loading", function() {
    return [_c("van-loading", {
      attrs: {
        "size": _vm.loadingSize
      }
    }, [_vm._v(_vm._s(_vm.loadingText))])];
  })], 2) : _vm._e(), _vm.finished ? _c("div", {
    class: _vm.$bem("finished-text")
  }, [_vm._t("finished", function() {
    return [_vm._v(" " + _vm._s(_vm.finishedText) + " ")];
  })], 2) : _vm._e(), _vm.error ? _c("div", {
    class: _vm.$bem("error-text"),
    on: {
      "click": _vm.clickErrorText
    }
  }, [_vm._t("error", function() {
    return [_vm._v(" " + _vm._s(_vm.errorText) + " ")];
  })], 2) : _vm._e()], 2)])], 1);
};
var staticRenderFns = [];
function normalizeComponent(scriptExports, render2, staticRenderFns2, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
  var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
  if (render2) {
    options.render = render2;
    options.staticRenderFns = staticRenderFns2;
    options._compiled = true;
  }
  if (functionalTemplate) {
    options.functional = true;
  }
  if (scopeId) {
    options._scopeId = "data-v-" + scopeId;
  }
  var hook;
  if (moduleIdentifier) {
    hook = function(context) {
      context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
      if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
        context = __VUE_SSR_CONTEXT__;
      }
      if (injectStyles) {
        injectStyles.call(this, context);
      }
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    };
    options._ssrRegister = hook;
  } else if (injectStyles) {
    hook = shadowMode ? function() {
      injectStyles.call(this, (options.functional ? this.parent : this).$root.$options.shadowRoot);
    } : injectStyles;
  }
  if (hook) {
    if (options.functional) {
      options._injectStyles = hook;
      var originalRender = options.render;
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }
  return {
    exports: scriptExports,
    options
  };
}
const [defineComponent, t] = createNamespace("list");
const scope = "ElInfiniteScroll";
const __vue2_script = defineComponent({
  components: {
    VanPullRefresh: PullRefresh,
    VanLoading: Loading
  },
  directives: {
    InfiniteScroll
  },
  model: {
    prop: "loading",
    event: "update:loading"
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    finished: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    loadingSize: {
      type: String,
      default: "20px"
    },
    finishedText: {
      type: String,
      default: t("mbList.finishedText")
    },
    errorText: {
      type: String,
      default: t("mbList.errorText")
    },
    infiniteScrollDelay: {
      type: Number,
      default: 200
    },
    infiniteScrollDistance: {
      type: Number,
      default: 0
    },
    infiniteScrollImmediate: {
      type: Boolean,
      default: true
    },
    pullingText: {
      type: String,
      default: t("mbList.pulling")
    },
    loosingText: {
      type: String,
      default: t("mbList.loosing")
    },
    loadingText: {
      type: String,
      default: t("common.loading")
    },
    successText: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isRefresh: false
    };
  },
  watch: {
    finished(val) {
      if (val) {
        this.updateLoading(false);
        this.updateError(false);
      }
    },
    error(val) {
      if (val) {
        this.updateLoading(false);
      }
    }
  },
  computed: {
    infiniteScrollDisabled() {
      const { loading, finished, error } = this;
      return finished || error || loading;
    }
  },
  methods: {
    clickErrorText() {
      this.updateError(false);
      this.onLoad();
    }
  },
  beforeCreate() {
    const createEmitter = (eventName) => (event) => this.$emit(eventName, event);
    this.updateError = createEmitter("update:error");
    this.updateLoading = createEmitter("update:loading");
    const onLoad = createEmitter("load");
    this.onLoad = () => {
      this.updateLoading(true);
      onLoad();
    };
    const onRefresh = createEmitter("refresh");
    this.onRefresh = () => {
      onRefresh(() => {
        this.isRefresh = false;
        const { onScroll } = this.$el[scope] || {};
        onScroll && onScroll();
      });
    };
  }
});
const __cssModules = {};
var __component__ = /* @__PURE__ */ normalizeComponent(__vue2_script, render, staticRenderFns, false, __vue2_injectStyles, null, null, null);
function __vue2_injectStyles(context) {
  for (let o in __cssModules) {
    this[o] = __cssModules[o];
  }
}
var MbList = /* @__PURE__ */ function() {
  return __component__.exports;
}();
export { MbList as default };
//# sourceMappingURL=index.js.map
