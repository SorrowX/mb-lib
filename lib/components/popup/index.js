import Popup from "vant/lib/popup";
import Button from "vant/lib/button";
import { createBEM } from "vant/lib/utils/create/bem";
import { createComponent as createComponent$1 } from "vant/lib/utils/create/component";
import { get, isFunction } from "vant/lib/utils/index";
import { camelize } from "vant/lib/utils/format/string";
import Locale from "vant/lib/locale/index";
export { default as Locale } from "vant/lib/locale/index";
var defaultMessages = {
  mbPopup: {
    test: "\u6D4B\u8BD5"
  }
};
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
  return [createComponent$1(name), createBEM(name), createI18N(name)];
}
var render = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {
    staticClass: "mb-popup"
  }, [_c("button", {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.show = !_vm.show;
      }
    }
  }, [_vm._v(_vm._s(_vm.test))]), _c("p", [_vm._v(_vm._s(_vm.bem()))]), _c("p", [_vm._v(_vm._s(_vm.bem("test")))]), _c("p", [_vm._v(_vm._s(_vm.bem({
    disabled: true
  })))]), _c("van-button", {
    attrs: {
      "type": "primary"
    }
  }, [_vm._v("\u4E3B\u8981\u6309\u94AE")]), _c("van-popup", {
    style: {
      height: "30%"
    },
    attrs: {
      "position": "bottom"
    },
    model: {
      value: _vm.show,
      callback: function($$v) {
        _vm.show = $$v;
      },
      expression: "show"
    }
  }, [_vm._v("hi")])], 1);
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
const [createComponent, bem, t] = createNamespace("popup");
const __vue2_script = createComponent({
  name: "MbPopup",
  components: {
    VanPopup: Popup,
    VanButton: Button
  },
  data() {
    return {
      test: t("test"),
      show: false,
      bem
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
var MbPopup = /* @__PURE__ */ function() {
  return __component__.exports;
}();
export { MbPopup as default };
//# sourceMappingURL=index.js.map
