import { Popup, Icon, Search } from "vant";
import { createBEM } from "vant/es/utils/create/bem.js";
import { createComponent } from "vant/es/utils/create/component.js";
import { get, isFunction } from "vant/es/utils/index.js";
import { camelize } from "vant/es/utils/format/string.js";
import Locale from "vant/es/locale/index.js";
export { default as Locale } from "vant/es/locale/index.js";
import zhCN from "vant/es/locale/lang/zh-CN.js";
import { deepAssign } from "vant/es/utils/deep-assign.js";
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
    return isFunction(message) ? message(...args) : message;
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
const [defineComponent, t] = createNamespace("popup");
const eventsExclude = [
  "default",
  "header-left",
  "header-center",
  "header-right"
];
const __vue2_script = defineComponent({
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
        placeholder: t("common.searchPlaceholder")
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
const __cssModules = {};
var __component__ = /* @__PURE__ */ normalizeComponent(__vue2_script, render, staticRenderFns, false, __vue2_injectStyles, null, null, null);
function __vue2_injectStyles(context) {
  for (let o in __cssModules) {
    this[o] = __cssModules[o];
  }
}
var MbPopup = /* @__PURE__ */ function() {
  return __component__.exports;
}();
export { MbPopup as default };
//# sourceMappingURL=index.js.map
