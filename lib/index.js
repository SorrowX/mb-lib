import Locale from "vant/es/locale/index.js";
export { default as Locale } from "vant/es/locale/index.js";
import zhCN from "vant/es/locale/lang/zh-CN.js";
import { deepAssign } from "vant/es/utils/deep-assign.js";
import { Popup, Icon, Search, PullRefresh, Loading, Tag, Field, Button, Cell, CellGroup, Form, Checkbox, CheckboxGroup, Radio, RadioGroup } from "vant";
import { createBEM } from "vant/es/utils/create/bem.js";
import { createComponent } from "vant/es/utils/create/component.js";
import { get, isFunction as isFunction$1, isObject, isDef } from "vant/es/utils/index.js";
import { camelize } from "vant/es/utils/format/string.js";
import Vue from "vue";
import { FieldMixin } from "vant/es/mixins/field.js";
var index = "";
var defaultMessages = deepAssign(zhCN, {
  common: {
    searchPlaceholder: "\u8BF7\u8F93\u5165\u641C\u7D22\u5173\u952E\u8BCD",
    loading: "\u52A0\u8F7D\u4E2D...",
    select: "\u8BF7\u9009\u62E9"
  },
  mbPopup: {
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
var render$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("van-popup", _vm._g(_vm._b({
    ref: "popupRef",
    class: _vm.$bem(),
    attrs: {
      "close-icon": _vm.closeIcon
    }
  }, "van-popup", _vm.$attrs, false), _vm.$listeners), [_vm.showHeader ? _c("div", {
    class: _vm.$bem("header")
  }, [_c("div", {
    class: _vm.$bem("header-left"),
    on: {
      "click": _vm.handleClickIconClose
    }
  }, [_vm._t("header-left", function() {
    return [_c("van-icon", {
      attrs: {
        "role": "button",
        "tabindex": "0",
        "name": _vm.closeIcon,
        "size": _vm.closeIconSize,
        "color": _vm.closeIconColor
      }
    })];
  })], 2), _c("div", {
    class: [_vm.$bem("header-center"), "van-ellipsis"]
  }, [_vm._t("header-center", function() {
    return [_c("span", [_vm._v(_vm._s(_vm.title))])];
  })], 2), _c("div", {
    class: _vm.$bem("header-right"),
    on: {
      "click": _vm.handleClickSure
    }
  }, [_vm._t("header-right", function() {
    return [_c("span", [_vm._v(_vm._s(_vm.$translate("mbPopup.sure")))])];
  })], 2)]) : _vm._e(), _vm.showSearch ? _c("div", {
    class: _vm.$bem("search")
  }, [_c("van-search", _vm._g(_vm._b({
    model: {
      value: _vm.searchValue,
      callback: function($$v) {
        _vm.searchValue = $$v;
      },
      expression: "searchValue"
    }
  }, "van-search", _vm.searchProps, false), _vm.searchEvents), [_vm._l(_vm.searchSlotNames, function(slotName) {
    return _c("template", {
      slot: slotName
    }, [_vm._t(slotName)], 2);
  })], 2)], 1) : _vm._e(), _c("div", {
    class: _vm.$bem("content")
  }, [_vm._t("default")], 2)]);
};
var staticRenderFns$3 = [];
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
const [defineComponent$2, t$1] = createNamespace("popup");
const eventsExclude = [
  "default",
  "header-left",
  "header-center",
  "header-right"
];
const __vue2_script$3 = defineComponent$2({
  components: {
    VanPopup: Popup,
    VanIcon: Icon,
    VanSearch: Search
  },
  provide() {
    return {
      vanForm: null
    };
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    showHeader: {
      type: Boolean,
      default: false
    },
    closeIcon: {
      type: String,
      default: "cross"
    },
    closeIconSize: {
      type: [Number, String],
      default: "20"
    },
    closeIconColor: {
      type: String,
      default: "#bfbfbf"
    },
    showSearch: {
      type: Boolean,
      default: false
    },
    searchProps: {
      type: Object,
      default: () => ({
        placeholder: t$1("common.searchPlaceholder")
      })
    }
  },
  data() {
    return {
      searchValue: ""
    };
  },
  computed: {
    searchSlotNames() {
      return Object.keys(this.$slots).filter((_) => !eventsExclude.includes(_));
    }
  },
  methods: {
    close() {
      const { popupRef } = this.$refs;
      popupRef.close();
    },
    handleClickIconClose() {
      this.close();
    },
    handleClickSure(evt) {
      this.close();
      this.onSure(evt);
    }
  },
  beforeCreate() {
    const createEmitter = (eventName) => (event) => this.$emit(eventName, event);
    this.onSure = createEmitter("sure");
    this.searchEvents = {
      search: createEmitter("search"),
      input: createEmitter("search-input"),
      focus: createEmitter("focus"),
      blur: createEmitter("blur"),
      clear: createEmitter("clear"),
      cancel: createEmitter("cancel")
    };
  },
  mounted() {
  }
});
const __cssModules$3 = {};
var __component__$3 = /* @__PURE__ */ normalizeComponent(__vue2_script$3, render$3, staticRenderFns$3, false, __vue2_injectStyles$3, null, null, null);
function __vue2_injectStyles$3(context) {
  for (let o in __cssModules$3) {
    this[o] = __cssModules$3[o];
  }
}
var MbPopup = /* @__PURE__ */ function() {
  return __component__$3.exports;
}();
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
    const { container, onScroll } = el[scope$1];
    if (container) {
      container.removeEventListener("scroll", onScroll);
    }
  }
};
InfiniteScroll.install = function(Vue2) {
  Vue2.directive(InfiniteScroll.name, InfiniteScroll);
};
var render$2 = function() {
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
var staticRenderFns$2 = [];
const [defineComponent$1, t] = createNamespace("list");
const scope = "ElInfiniteScroll";
const __vue2_script$2 = defineComponent$1({
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
const __cssModules$2 = {};
var __component__$2 = /* @__PURE__ */ normalizeComponent(__vue2_script$2, render$2, staticRenderFns$2, false, __vue2_injectStyles$2, null, null, null);
function __vue2_injectStyles$2(context) {
  for (let o in __cssModules$2) {
    this[o] = __cssModules$2[o];
  }
}
var MbList = /* @__PURE__ */ function() {
  return __component__$2.exports;
}();
var getProps = () => {
  return {
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    labelKey: {
      type: String,
      default: "label"
    },
    nameKey: {
      type: String,
      default: "name"
    },
    clearable: {
      type: Boolean,
      default: false
    },
    collapse: {
      type: Boolean,
      default: false
    },
    collapseCount: {
      type: Number,
      default: 1
    },
    labelSeparator: {
      type: String,
      default: ", "
    },
    formatter: {
      type: Function
    },
    tagSize: {
      type: String,
      default: "medium"
    }
  };
};
var render$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {
    class: _vm.$bem("tags", {
      disabled: _vm.disabled
    })
  }, [_vm.clearable || _vm.collapse ? [_vm.collapse ? [_vm.tags.length ? _c("div", [_vm._l(_vm.collapseTags, function(tag, index2) {
    return _c("van-tag", {
      key: index2,
      attrs: {
        "closeable": _vm.clearable,
        "size": _vm.tagSize,
        "plain": ""
      },
      on: {
        "close": function($event) {
          return _vm.close(tag);
        }
      }
    }, [_vm._v(" " + _vm._s(tag[_vm.labelKey]) + " ")]);
  }), _vm.tags.length - _vm.collapseCount >= 1 ? _c("van-tag", {
    attrs: {
      "size": _vm.tagSize,
      "plain": ""
    }
  }, [_vm._v(" + " + _vm._s(_vm.tags.length - _vm.collapseCount) + " ")]) : _vm._e()], 2) : _c("span", {
    class: _vm.$bem("tags--placeholder")
  }, [_vm._v(" " + _vm._s(_vm.$translate("common.select")) + " ")])] : [_vm.tags.length ? _c("div", _vm._l(_vm.tags, function(tag, index2) {
    return _c("van-tag", {
      key: index2,
      attrs: {
        "closeable": _vm.clearable,
        "size": _vm.tagSize,
        "plain": ""
      },
      on: {
        "close": function($event) {
          return _vm.close(tag);
        }
      }
    }, [_vm._v(" " + _vm._s(tag[_vm.labelKey]) + " ")]);
  }), 1) : _c("span", {
    class: _vm.$bem("tags--placeholder")
  }, [_vm._v(" " + _vm._s(_vm.$translate("common.select")) + " ")])]] : _c("span", {
    class: _vm.labels ? "" : _vm.$bem("tags--placeholder")
  }, [_vm._v(" " + _vm._s(_vm.labels || _vm.$translate("common.select")) + " ")])], 2);
};
var staticRenderFns$1 = [];
const __vue2_script$1 = {
  name: "MbTags",
  mixins: [FieldMixin],
  components: {
    VanTag: Tag
  },
  model: {
    prop: "modelValue",
    event: "update:modelValue"
  },
  props: {
    ...getProps(),
    modelValue: {
      type: [Object, Array],
      default: () => ({})
    },
    $bem: {
      type: Function
    },
    $translate: {
      type: Function
    }
  },
  data() {
    return {};
  },
  computed: {
    value() {
      const { formatter, bindValue } = this;
      if (formatter) {
        return formatter(bindValue);
      }
      return bindValue;
    },
    bindValue: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.updateModelValue(val);
      }
    },
    tags() {
      const { multiple, bindValue, nameKey } = this;
      if (multiple && !Array.isArray(bindValue)) {
        throw new Error("[field-action]: value type must array.");
      }
      if (!multiple && !isObject(bindValue)) {
        throw new Error("[field-action]: value type must object.");
      }
      const tags = multiple ? bindValue : [bindValue];
      return tags.filter((_) => isDef(_[nameKey]));
    },
    labels() {
      const { labelKey, labelSeparator, tags } = this;
      return tags.map((_) => _[labelKey]).join(`${labelSeparator}`);
    },
    collapseTags() {
      const { collapseCount, tags } = this;
      return tags.slice(0, collapseCount);
    }
  },
  methods: {
    close(tag) {
      const { nameKey, bindValue, tags, multiple } = this;
      if (multiple) {
        const index2 = bindValue.findIndex((_) => _[nameKey] === tag[nameKey]);
        if (index2 !== -1) {
          bindValue.splice(index2, 1);
        }
      } else {
        this.bindValue = {};
      }
      this.onCloseTag({
        multiple,
        tag
      });
    }
  },
  beforeCreate() {
    const createEmitter = (eventName) => (event) => this.$emit(eventName, event);
    this.updateModelValue = createEmitter("update:modelValue");
    this.onCloseTag = createEmitter("close-tag");
  }
};
const __cssModules$1 = {};
var __component__$1 = /* @__PURE__ */ normalizeComponent(__vue2_script$1, render$1, staticRenderFns$1, false, __vue2_injectStyles$1, null, null, null);
function __vue2_injectStyles$1(context) {
  for (let o in __cssModules$1) {
    this[o] = __cssModules$1[o];
  }
}
var MbTags = /* @__PURE__ */ function() {
  return __component__$1.exports;
}();
var render = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("van-field", _vm._b({
    ref: "fieldRef",
    class: _vm.$bem({
      disabled: _vm.disabled
    }),
    attrs: {
      "right-icon": "arrow",
      "disabled": _vm.disabled
    },
    on: {
      "click-input": _vm.handleClickInput,
      "click-right-icon": _vm.handleClickInput
    },
    scopedSlots: _vm._u([{
      key: "input",
      fn: function() {
        return [_c("mb-tags", _vm._b({
          attrs: {
            "$bem": _vm.$bem,
            "$translate": _vm.$translate
          },
          on: {
            "close-tag": _vm.onCloseTag
          },
          model: {
            value: _vm.bindValue,
            callback: function($$v) {
              _vm.bindValue = $$v;
            },
            expression: "bindValue"
          }
        }, "mb-tags", _vm.tagsProps, false))];
      },
      proxy: true
    }, {
      key: "extra",
      fn: function() {
        return [_c("mb-popup", _vm._g(_vm._b({
          class: _vm.popupClass,
          style: _vm.popupStyle,
          on: {
            "sure": _vm.onSure,
            "close": _vm.onClose,
            "search": _vm.onSearch
          },
          model: {
            value: _vm.showPopup,
            callback: function($$v) {
              _vm.showPopup = $$v;
            },
            expression: "showPopup"
          }
        }, "mb-popup", _vm.mergePopupProps, false), _vm.popupEvents), [_vm._t("default")], 2)];
      },
      proxy: true
    }], null, true)
  }, "van-field", _vm.$attrs, false));
};
var staticRenderFns = [];
const [defineComponent] = createNamespace("field-sheet");
const defaultPopupProps = () => ({
  title: "",
  showHeader: true,
  showSearch: true,
  round: true,
  position: "bottom",
  getContainer: "body"
});
const __vue2_script = defineComponent({
  components: {
    MbPopup,
    MbTags,
    VanField: Field
  },
  props: {
    ...getProps(),
    value: {
      type: [Object, Array],
      default: () => ({})
    },
    popupProps: {
      type: Object,
      default: () => defaultPopupProps()
    },
    popupEvents: {
      type: Object,
      default: () => ({})
    },
    popupStyle: {
      type: [Object, Array],
      default: () => []
    },
    popupClass: {
      type: [Object, Array, String],
      default: ""
    }
  },
  data() {
    return {
      showPopup: false
    };
  },
  computed: {
    bindValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.onInput(val);
      }
    },
    mergePopupProps() {
      return Object.assign(defaultPopupProps(), this.popupProps);
    },
    tagsProps() {
      return Object.keys(getProps()).reduce((pre, key) => {
        return {
          [key]: this[key],
          ...pre
        };
      }, {});
    }
  },
  methods: {
    handleClickInput() {
      const { disabled } = this;
      if (disabled)
        return;
      this.toggle();
    },
    toggle() {
      this.showPopup = !this.showPopup;
    }
  },
  beforeCreate() {
    const createEmitter = (eventName) => (event) => this.$emit(eventName, event);
    this.onInput = createEmitter("input");
    this.onSure = createEmitter("sure");
    this.onClose = createEmitter("close");
    this.onSearch = createEmitter("search");
    this.onCloseTag = createEmitter("close-tag");
  }
});
const __cssModules = {};
var __component__ = /* @__PURE__ */ normalizeComponent(__vue2_script, render, staticRenderFns, false, __vue2_injectStyles, null, null, null);
function __vue2_injectStyles(context) {
  for (let o in __cssModules) {
    this[o] = __cssModules[o];
  }
}
var MbFieldSheet = /* @__PURE__ */ function() {
  return __component__.exports;
}();
const components = { MbPopup, MbList, MbFieldSheet };
const vantComponents = {
  MbButton: Button,
  MbCell: Cell,
  MbIcon: Icon,
  MbLoading: Loading,
  MbCellGroup: CellGroup,
  MbField: Field,
  MbForm: Form,
  MbCheckbox: Checkbox,
  MbCheckboxGroup: CheckboxGroup,
  MbRadio: Radio,
  MbRadioGroup: RadioGroup,
  MbSearch: Search
};
var version = "0.0.3";
function install(Vue2) {
  Object.keys(components).forEach((key) => {
    const component = components[key];
    Vue2.component(component.name, component);
  });
  Object.keys(vantComponents).forEach((key) => {
    const component = vantComponents[key];
    Vue2.component(key, component);
  });
}
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
const MbLibUI = {
  install,
  version,
  ...components,
  ...vantComponents,
  Locale
};
export { MbLibUI as default };
