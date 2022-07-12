import require$$1 from "vue";
var locale = {};
var interopRequireDefault = { exports: {} };
(function(module) {
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }
  module.exports = _interopRequireDefault2, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(interopRequireDefault);
var deepAssign$1 = {};
var utils = {};
var create = {};
var bem$7 = {};
bem$7.__esModule = true;
var createBEM_1 = bem$7.createBEM = createBEM;
function gen(name, mods) {
  if (!mods) {
    return "";
  }
  if (typeof mods === "string") {
    return " " + name + "--" + mods;
  }
  if (Array.isArray(mods)) {
    return mods.reduce(function(ret, item) {
      return ret + gen(name, item);
    }, "");
  }
  return Object.keys(mods).reduce(function(ret, key) {
    return ret + (mods[key] ? gen(name, key) : "");
  }, "");
}
function createBEM(name) {
  return function(el, mods) {
    if (el && typeof el !== "string") {
      mods = el;
      el = "";
    }
    el = el ? name + "__" + el : name;
    return "" + el + gen(el, mods);
  };
}
var component = {};
var string = {};
string.__esModule = true;
var camelize_1 = string.camelize = camelize;
string.padZero = padZero;
var camelizeRE = /-(\w)/g;
function camelize(str) {
  return str.replace(camelizeRE, function(_2, c) {
    return c.toUpperCase();
  });
}
function padZero(num, targetLength) {
  if (targetLength === void 0) {
    targetLength = 2;
  }
  var str = num + "";
  while (str.length < targetLength) {
    str = "0" + str;
  }
  return str;
}
var slots = {};
slots.__esModule = true;
slots.SlotsMixin = void 0;
var SlotsMixin = {
  methods: {
    slots: function slots2(name, props) {
      if (name === void 0) {
        name = "default";
      }
      var $slots = this.$slots, $scopedSlots = this.$scopedSlots;
      var scopedSlot = $scopedSlots[name];
      if (scopedSlot) {
        return scopedSlot(props);
      }
      return $slots[name];
    }
  }
};
slots.SlotsMixin = SlotsMixin;
var _interopRequireDefault$b = interopRequireDefault.exports;
component.__esModule = true;
component.unifySlots = unifySlots;
var createComponent_1 = component.createComponent = createComponent$7;
var _$4 = utils;
var _string$1 = string;
var _slots = slots;
_interopRequireDefault$b(require$$1);
function install$1(Vue) {
  var name = this.name;
  Vue.component(name, this);
  Vue.component((0, _string$1.camelize)("-" + name), this);
}
function unifySlots(context2) {
  var scopedSlots = context2.scopedSlots || context2.data.scopedSlots || {};
  var slots3 = context2.slots();
  Object.keys(slots3).forEach(function(key) {
    if (!scopedSlots[key]) {
      scopedSlots[key] = function() {
        return slots3[key];
      };
    }
  });
  return scopedSlots;
}
function transformFunctionComponent(pure) {
  return {
    functional: true,
    props: pure.props,
    model: pure.model,
    render: function render3(h, context2) {
      return pure(h, context2.props, unifySlots(context2), context2);
    }
  };
}
function createComponent$7(name) {
  return function(sfc) {
    if ((0, _$4.isFunction)(sfc)) {
      sfc = transformFunctionComponent(sfc);
    }
    if (!sfc.functional) {
      sfc.mixins = sfc.mixins || [];
      sfc.mixins.push(_slots.SlotsMixin);
    }
    sfc.name = name;
    sfc.install = install$1;
    return sfc;
  };
}
var i18n = {};
var _interopRequireDefault$a = interopRequireDefault.exports;
i18n.__esModule = true;
i18n.createI18N = createI18N$1;
var _$3 = utils;
var _string = string;
var _locale = _interopRequireDefault$a(locale);
function createI18N$1(name) {
  var prefix = (0, _string.camelize)(name) + ".";
  return function(path) {
    var messages2 = _locale.default.messages();
    var message = (0, _$3.get)(messages2, prefix + path) || (0, _$3.get)(messages2, path);
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return (0, _$3.isFunction)(message) ? message.apply(void 0, args) : message;
  };
}
create.__esModule = true;
create.createNamespace = createNamespace$1;
var _bem = bem$7;
var _component = component;
var _i18n = i18n;
function createNamespace$1(name) {
  name = "van-" + name;
  return [(0, _component.createComponent)(name), (0, _bem.createBEM)(name), (0, _i18n.createI18N)(name)];
}
var unit = {};
var number = {};
number.__esModule = true;
number.isNumeric = isNumeric;
number.isNaN = isNaN;
function isNumeric(val) {
  return /^\d+(\.\d+)?$/.test(val);
}
function isNaN(val) {
  if (Number.isNaN) {
    return Number.isNaN(val);
  }
  return val !== val;
}
unit.__esModule = true;
unit.addUnit = addUnit;
unit.unitToPx = unitToPx;
var _$2 = utils;
var _number = number;
function addUnit(value) {
  if (!(0, _$2.isDef)(value)) {
    return void 0;
  }
  value = String(value);
  return (0, _number.isNumeric)(value) ? value + "px" : value;
}
var rootFontSize;
function getRootFontSize() {
  if (!rootFontSize) {
    var doc = document.documentElement;
    var fontSize = doc.style.fontSize || window.getComputedStyle(doc).fontSize;
    rootFontSize = parseFloat(fontSize);
  }
  return rootFontSize;
}
function convertRem(value) {
  value = value.replace(/rem/g, "");
  return +value * getRootFontSize();
}
function convertVw(value) {
  value = value.replace(/vw/g, "");
  return +value * window.innerWidth / 100;
}
function convertVh(value) {
  value = value.replace(/vh/g, "");
  return +value * window.innerHeight / 100;
}
function unitToPx(value) {
  if (typeof value === "number") {
    return value;
  }
  if (_$2.inBrowser) {
    if (value.indexOf("rem") !== -1) {
      return convertRem(value);
    }
    if (value.indexOf("vw") !== -1) {
      return convertVw(value);
    }
    if (value.indexOf("vh") !== -1) {
      return convertVh(value);
    }
  }
  return parseFloat(value);
}
var _interopRequireDefault$9 = interopRequireDefault.exports;
utils.__esModule = true;
utils.noop = noop;
utils.isDef = isDef;
var isFunction_1 = utils.isFunction = isFunction;
utils.isObject = isObject;
utils.isPromise = isPromise;
var get_1 = utils.get = get;
utils.isEmpty = isEmpty;
utils.isServer = utils.inBrowser = utils.addUnit = utils.createNamespace = void 0;
var _vue$2 = _interopRequireDefault$9(require$$1);
var _create = create;
utils.createNamespace = _create.createNamespace;
var _unit = unit;
utils.addUnit = _unit.addUnit;
var inBrowser = typeof window !== "undefined";
utils.inBrowser = inBrowser;
var isServer = _vue$2.default.prototype.$isServer;
utils.isServer = isServer;
function noop() {
}
function isDef(val) {
  return val !== void 0 && val !== null;
}
function isFunction(val) {
  return typeof val === "function";
}
function isObject(val) {
  return val !== null && typeof val === "object";
}
function isPromise(val) {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
}
function get(object, path) {
  var keys = path.split(".");
  var result = object;
  keys.forEach(function(key) {
    var _result$key;
    result = (_result$key = result[key]) != null ? _result$key : "";
  });
  return result;
}
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if (typeof value !== "object") {
    return true;
  }
  return Object.keys(value).length === 0;
}
deepAssign$1.__esModule = true;
deepAssign$1.deepAssign = deepAssign;
var _$1 = utils;
var hasOwnProperty = Object.prototype.hasOwnProperty;
function assignKey(to, from, key) {
  var val = from[key];
  if (!(0, _$1.isDef)(val)) {
    return;
  }
  if (!hasOwnProperty.call(to, key) || !(0, _$1.isObject)(val)) {
    to[key] = val;
  } else {
    to[key] = deepAssign(Object(to[key]), from[key]);
  }
}
function deepAssign(to, from) {
  Object.keys(from).forEach(function(key) {
    assignKey(to, from, key);
  });
  return to;
}
var zhCN = {};
zhCN.__esModule = true;
zhCN.default = void 0;
var _default$7 = {
  name: "\u59D3\u540D",
  tel: "\u7535\u8BDD",
  save: "\u4FDD\u5B58",
  confirm: "\u786E\u8BA4",
  cancel: "\u53D6\u6D88",
  delete: "\u5220\u9664",
  complete: "\u5B8C\u6210",
  loading: "\u52A0\u8F7D\u4E2D...",
  telEmpty: "\u8BF7\u586B\u5199\u7535\u8BDD",
  nameEmpty: "\u8BF7\u586B\u5199\u59D3\u540D",
  nameInvalid: "\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u59D3\u540D",
  confirmDelete: "\u786E\u5B9A\u8981\u5220\u9664\u5417",
  telInvalid: "\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u624B\u673A\u53F7",
  vanCalendar: {
    end: "\u7ED3\u675F",
    start: "\u5F00\u59CB",
    title: "\u65E5\u671F\u9009\u62E9",
    confirm: "\u786E\u5B9A",
    startEnd: "\u5F00\u59CB/\u7ED3\u675F",
    weekdays: ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"],
    monthTitle: function monthTitle(year, month) {
      return year + "\u5E74" + month + "\u6708";
    },
    rangePrompt: function rangePrompt(maxRange) {
      return "\u9009\u62E9\u5929\u6570\u4E0D\u80FD\u8D85\u8FC7 " + maxRange + " \u5929";
    }
  },
  vanCascader: {
    select: "\u8BF7\u9009\u62E9"
  },
  vanContactCard: {
    addText: "\u6DFB\u52A0\u8054\u7CFB\u4EBA"
  },
  vanContactList: {
    addText: "\u65B0\u5EFA\u8054\u7CFB\u4EBA"
  },
  vanPagination: {
    prev: "\u4E0A\u4E00\u9875",
    next: "\u4E0B\u4E00\u9875"
  },
  vanPullRefresh: {
    pulling: "\u4E0B\u62C9\u5373\u53EF\u5237\u65B0...",
    loosing: "\u91CA\u653E\u5373\u53EF\u5237\u65B0..."
  },
  vanSubmitBar: {
    label: "\u5408\u8BA1\uFF1A"
  },
  vanCoupon: {
    unlimited: "\u65E0\u4F7F\u7528\u95E8\u69DB",
    discount: function discount(_discount) {
      return _discount + "\u6298";
    },
    condition: function condition(_condition) {
      return "\u6EE1" + _condition + "\u5143\u53EF\u7528";
    }
  },
  vanCouponCell: {
    title: "\u4F18\u60E0\u5238",
    tips: "\u6682\u65E0\u53EF\u7528",
    count: function count(_count) {
      return _count + "\u5F20\u53EF\u7528";
    }
  },
  vanCouponList: {
    empty: "\u6682\u65E0\u4F18\u60E0\u5238",
    exchange: "\u5151\u6362",
    close: "\u4E0D\u4F7F\u7528\u4F18\u60E0\u5238",
    enable: "\u53EF\u7528",
    disabled: "\u4E0D\u53EF\u7528",
    placeholder: "\u8BF7\u8F93\u5165\u4F18\u60E0\u7801"
  },
  vanAddressEdit: {
    area: "\u5730\u533A",
    postal: "\u90AE\u653F\u7F16\u7801",
    areaEmpty: "\u8BF7\u9009\u62E9\u5730\u533A",
    addressEmpty: "\u8BF7\u586B\u5199\u8BE6\u7EC6\u5730\u5740",
    postalEmpty: "\u90AE\u653F\u7F16\u7801\u683C\u5F0F\u4E0D\u6B63\u786E",
    defaultAddress: "\u8BBE\u4E3A\u9ED8\u8BA4\u6536\u8D27\u5730\u5740",
    telPlaceholder: "\u6536\u8D27\u4EBA\u624B\u673A\u53F7",
    namePlaceholder: "\u6536\u8D27\u4EBA\u59D3\u540D",
    areaPlaceholder: "\u9009\u62E9\u7701 / \u5E02 / \u533A"
  },
  vanAddressEditDetail: {
    label: "\u8BE6\u7EC6\u5730\u5740",
    placeholder: "\u8857\u9053\u95E8\u724C\u3001\u697C\u5C42\u623F\u95F4\u53F7\u7B49\u4FE1\u606F"
  },
  vanAddressList: {
    add: "\u65B0\u589E\u5730\u5740"
  }
};
zhCN.default = _default$7;
var _interopRequireDefault$8 = interopRequireDefault.exports;
locale.__esModule = true;
var default_1$2 = locale.default = void 0;
var _vue$1 = _interopRequireDefault$8(require$$1);
var _deepAssign = deepAssign$1;
var _zhCN = _interopRequireDefault$8(zhCN);
var proto = _vue$1.default.prototype;
var defineReactive = _vue$1.default.util.defineReactive;
defineReactive(proto, "$vantLang", "zh-CN");
defineReactive(proto, "$vantMessages", {
  "zh-CN": _zhCN.default
});
var _default$6 = {
  messages: function messages() {
    return proto.$vantMessages[proto.$vantLang];
  },
  use: function use(lang, messages2) {
    var _this$add;
    proto.$vantLang = lang;
    this.add((_this$add = {}, _this$add[lang] = messages2, _this$add));
  },
  add: function add(messages2) {
    if (messages2 === void 0) {
      messages2 = {};
    }
    (0, _deepAssign.deepAssign)(proto.$vantMessages, messages2);
  }
};
default_1$2 = locale.default = _default$6;
var defaultMessages = {
  mbPopup: {
    test: "\u6D4B\u8BD5"
  }
};
default_1$2.add({
  "zh-CN": defaultMessages
});
var Locale = default_1$2;
var index$3 = "";
var index$2 = "";
var index$1 = "";
var index = "";
var popup = {};
var context$1 = {};
context$1.__esModule = true;
context$1.context = void 0;
var context = {
  zIndex: 2e3,
  lockCount: 0,
  stack: [],
  find: function find(vm) {
    return this.stack.filter(function(item) {
      return item.vm === vm;
    })[0];
  },
  remove: function remove(vm) {
    var item = this.find(vm);
    if (!item)
      return;
    item.vm = null;
    item.overlay = null;
    var index2 = this.stack.indexOf(item);
    this.stack.splice(index2, 1);
  }
};
context$1.context = context;
var overlay$1 = {};
var _extends$1 = { exports: {} };
(function(module) {
  function _extends3() {
    module.exports = _extends3 = Object.assign ? Object.assign.bind() : function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
    return _extends3.apply(this, arguments);
  }
  module.exports = _extends3, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(_extends$1);
var overlay = {};
function _extends() {
  return _extends = Object.assign || function(a) {
    for (var b, c = 1; c < arguments.length; c++)
      for (var d in b = arguments[c], b)
        Object.prototype.hasOwnProperty.call(b, d) && (a[d] = b[d]);
    return a;
  }, _extends.apply(this, arguments);
}
var normalMerge = ["attrs", "props", "domProps"], toArrayMerge = ["class", "style", "directives"], functionalMerge = ["on", "nativeOn"], mergeJsxProps = function(a) {
  return a.reduce(function(c, a2) {
    for (var b in a2)
      if (!c[b])
        c[b] = a2[b];
      else if (-1 !== normalMerge.indexOf(b))
        c[b] = _extends({}, c[b], a2[b]);
      else if (-1 !== toArrayMerge.indexOf(b)) {
        var d = c[b] instanceof Array ? c[b] : [c[b]], e = a2[b] instanceof Array ? a2[b] : [a2[b]];
        c[b] = d.concat(e);
      } else if (-1 !== functionalMerge.indexOf(b)) {
        for (var f in a2[b])
          if (c[b][f]) {
            var g = c[b][f] instanceof Array ? c[b][f] : [c[b][f]], h = a2[b][f] instanceof Array ? a2[b][f] : [a2[b][f]];
            c[b][f] = g.concat(h);
          } else
            c[b][f] = a2[b][f];
      } else if ("hook" == b)
        for (var i in a2[b])
          c[b][i] = c[b][i] ? mergeFn(c[b][i], a2[b][i]) : a2[b][i];
      else
        c[b] = a2[b];
    return c;
  }, {});
}, mergeFn = function(a, b) {
  return function() {
    a && a.apply(this, arguments), b && b.apply(this, arguments);
  };
};
var helper = mergeJsxProps;
var functional = {};
var _interopRequireDefault$7 = interopRequireDefault.exports;
functional.__esModule = true;
functional.inherit = inherit;
functional.emit = emit;
functional.mount = mount;
var _extends2$3 = _interopRequireDefault$7(_extends$1.exports);
var _vue = _interopRequireDefault$7(require$$1);
var inheritKey = ["ref", "key", "style", "class", "attrs", "refInFor", "nativeOn", "directives", "staticClass", "staticStyle"];
var mapInheritKey = {
  nativeOn: "on"
};
function inherit(context2, inheritListeners) {
  var result = inheritKey.reduce(function(obj, key) {
    if (context2.data[key]) {
      obj[mapInheritKey[key] || key] = context2.data[key];
    }
    return obj;
  }, {});
  if (inheritListeners) {
    result.on = result.on || {};
    (0, _extends2$3.default)(result.on, context2.data.on);
  }
  return result;
}
function emit(context2, eventName) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }
  var listeners = context2.listeners[eventName];
  if (listeners) {
    if (Array.isArray(listeners)) {
      listeners.forEach(function(listener) {
        listener.apply(void 0, args);
      });
    } else {
      listeners.apply(void 0, args);
    }
  }
}
function mount(Component, data3) {
  var instance = new _vue.default({
    el: document.createElement("div"),
    props: Component.props,
    render: function render3(h) {
      return h(Component, (0, _extends2$3.default)({
        props: this.$props
      }, data3));
    }
  });
  document.body.appendChild(instance.$el);
  return instance;
}
var event = {};
event.__esModule = true;
event.on = on;
event.off = off;
event.stopPropagation = stopPropagation;
event.preventDefault = preventDefault;
var supportsPassive_1 = event.supportsPassive = void 0;
var _ = utils;
var supportsPassive = false;
supportsPassive_1 = event.supportsPassive = supportsPassive;
if (!_.isServer) {
  try {
    var opts = {};
    Object.defineProperty(opts, "passive", {
      get: function get2() {
        supportsPassive_1 = event.supportsPassive = supportsPassive = true;
      }
    });
    window.addEventListener("test-passive", null, opts);
  } catch (e) {
  }
}
function on(target, event2, handler, passive) {
  if (passive === void 0) {
    passive = false;
  }
  if (!_.isServer) {
    target.addEventListener(event2, handler, supportsPassive ? {
      capture: false,
      passive
    } : false);
  }
}
function off(target, event2, handler) {
  if (!_.isServer) {
    target.removeEventListener(event2, handler);
  }
}
function stopPropagation(event2) {
  event2.stopPropagation();
}
function preventDefault(event2, isStopPropagation) {
  if (typeof event2.cancelable !== "boolean" || event2.cancelable) {
    event2.preventDefault();
  }
  if (isStopPropagation) {
    stopPropagation(event2);
  }
}
var _interopRequireDefault$6 = interopRequireDefault.exports;
overlay.__esModule = true;
overlay.default = void 0;
var _babelHelperVueJsxMergeProps$4 = _interopRequireDefault$6(helper);
var _extends2$2 = _interopRequireDefault$6(_extends$1.exports);
var _utils$5 = utils;
var _functional$5 = functional;
var _event$4 = event;
var _createNamespace$5 = (0, _utils$5.createNamespace)("overlay"), createComponent$6 = _createNamespace$5[0], bem$6 = _createNamespace$5[1];
function preventTouchMove(event2) {
  (0, _event$4.preventDefault)(event2, true);
}
function Overlay(h, props, slots3, ctx) {
  var style = (0, _extends2$2.default)({
    zIndex: props.zIndex
  }, props.customStyle);
  if ((0, _utils$5.isDef)(props.duration)) {
    style.animationDuration = props.duration + "s";
  }
  return h("transition", {
    "attrs": {
      "name": "van-fade"
    }
  }, [h("div", (0, _babelHelperVueJsxMergeProps$4.default)([{
    "directives": [{
      name: "show",
      value: props.show
    }],
    "style": style,
    "class": [bem$6(), props.className],
    "on": {
      "touchmove": props.lockScroll ? preventTouchMove : _utils$5.noop
    }
  }, (0, _functional$5.inherit)(ctx, true)]), [slots3.default == null ? void 0 : slots3.default()])]);
}
Overlay.props = {
  show: Boolean,
  zIndex: [Number, String],
  duration: [Number, String],
  className: null,
  customStyle: Object,
  lockScroll: {
    type: Boolean,
    default: true
  }
};
var _default$5 = createComponent$6(Overlay);
overlay.default = _default$5;
var node = {};
node.__esModule = true;
node.removeNode = removeNode;
function removeNode(el) {
  var parent = el.parentNode;
  if (parent) {
    parent.removeChild(el);
  }
}
var _interopRequireDefault$5 = interopRequireDefault.exports;
overlay$1.__esModule = true;
overlay$1.updateOverlay = updateOverlay;
overlay$1.openOverlay = openOverlay;
overlay$1.closeOverlay = closeOverlay;
overlay$1.removeOverlay = removeOverlay;
var _extends2$1 = _interopRequireDefault$5(_extends$1.exports);
var _overlay$1 = _interopRequireDefault$5(overlay);
var _context$1 = context$1;
var _functional$4 = functional;
var _node$1 = node;
var defaultConfig = {
  className: "",
  customStyle: {}
};
function mountOverlay(vm) {
  return (0, _functional$4.mount)(_overlay$1.default, {
    on: {
      click: function click() {
        vm.$emit("click-overlay");
        if (vm.closeOnClickOverlay) {
          if (vm.onClickOverlay) {
            vm.onClickOverlay();
          } else {
            vm.close();
          }
        }
      }
    }
  });
}
function updateOverlay(vm) {
  var item = _context$1.context.find(vm);
  if (item) {
    var el = vm.$el;
    var config = item.config, overlay2 = item.overlay;
    if (el && el.parentNode) {
      el.parentNode.insertBefore(overlay2.$el, el);
    }
    (0, _extends2$1.default)(overlay2, defaultConfig, config, {
      show: true
    });
  }
}
function openOverlay(vm, config) {
  var item = _context$1.context.find(vm);
  if (item) {
    item.config = config;
  } else {
    var overlay2 = mountOverlay(vm);
    _context$1.context.stack.push({
      vm,
      config,
      overlay: overlay2
    });
  }
  updateOverlay(vm);
}
function closeOverlay(vm) {
  var item = _context$1.context.find(vm);
  if (item) {
    item.overlay.show = false;
  }
}
function removeOverlay(vm) {
  var item = _context$1.context.find(vm);
  if (item) {
    (0, _node$1.removeNode)(item.overlay.$el);
    _context$1.context.remove(vm);
  }
}
var scroll = {};
scroll.__esModule = true;
scroll.getScroller = getScroller;
scroll.getScrollTop = getScrollTop;
scroll.setScrollTop = setScrollTop;
scroll.getRootScrollTop = getRootScrollTop;
scroll.setRootScrollTop = setRootScrollTop;
scroll.getElementTop = getElementTop;
scroll.getVisibleHeight = getVisibleHeight;
scroll.getVisibleTop = getVisibleTop;
function isWindow(val) {
  return val === window;
}
var overflowScrollReg = /scroll|auto|overlay/i;
function getScroller(el, root) {
  if (root === void 0) {
    root = window;
  }
  var node2 = el;
  while (node2 && node2.tagName !== "HTML" && node2.tagName !== "BODY" && node2.nodeType === 1 && node2 !== root) {
    var _window$getComputedSt = window.getComputedStyle(node2), overflowY = _window$getComputedSt.overflowY;
    if (overflowScrollReg.test(overflowY)) {
      return node2;
    }
    node2 = node2.parentNode;
  }
  return root;
}
function getScrollTop(el) {
  var top = "scrollTop" in el ? el.scrollTop : el.pageYOffset;
  return Math.max(top, 0);
}
function setScrollTop(el, value) {
  if ("scrollTop" in el) {
    el.scrollTop = value;
  } else {
    el.scrollTo(el.scrollX, value);
  }
}
function getRootScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}
function setRootScrollTop(value) {
  setScrollTop(window, value);
  setScrollTop(document.body, value);
}
function getElementTop(el, scroller) {
  if (isWindow(el)) {
    return 0;
  }
  var scrollTop = scroller ? getScrollTop(scroller) : getRootScrollTop();
  return el.getBoundingClientRect().top + scrollTop;
}
function getVisibleHeight(el) {
  if (isWindow(el)) {
    return el.innerHeight;
  }
  return el.getBoundingClientRect().height;
}
function getVisibleTop(el) {
  if (isWindow(el)) {
    return 0;
  }
  return el.getBoundingClientRect().top;
}
var touch = {};
touch.__esModule = true;
touch.TouchMixin = void 0;
var _event$3 = event;
function getDirection(x, y) {
  if (x > y) {
    return "horizontal";
  }
  if (y > x) {
    return "vertical";
  }
  return "";
}
var TouchMixin = {
  data: function data() {
    return {
      direction: ""
    };
  },
  methods: {
    touchStart: function touchStart(event2) {
      this.resetTouchStatus();
      this.startX = event2.touches[0].clientX;
      this.startY = event2.touches[0].clientY;
    },
    touchMove: function touchMove(event2) {
      var touch2 = event2.touches[0];
      this.deltaX = touch2.clientX < 0 ? 0 : touch2.clientX - this.startX;
      this.deltaY = touch2.clientY - this.startY;
      this.offsetX = Math.abs(this.deltaX);
      this.offsetY = Math.abs(this.deltaY);
      var LOCK_DIRECTION_DISTANCE = 10;
      if (!this.direction || this.offsetX < LOCK_DIRECTION_DISTANCE && this.offsetY < LOCK_DIRECTION_DISTANCE) {
        this.direction = getDirection(this.offsetX, this.offsetY);
      }
    },
    resetTouchStatus: function resetTouchStatus() {
      this.direction = "";
      this.deltaX = 0;
      this.deltaY = 0;
      this.offsetX = 0;
      this.offsetY = 0;
    },
    bindTouchEvent: function bindTouchEvent(el) {
      var onTouchStart = this.onTouchStart, onTouchMove = this.onTouchMove, onTouchEnd = this.onTouchEnd;
      (0, _event$3.on)(el, "touchstart", onTouchStart);
      (0, _event$3.on)(el, "touchmove", onTouchMove);
      if (onTouchEnd) {
        (0, _event$3.on)(el, "touchend", onTouchEnd);
        (0, _event$3.on)(el, "touchcancel", onTouchEnd);
      }
    }
  }
};
touch.TouchMixin = TouchMixin;
var portal = {};
portal.__esModule = true;
portal.PortalMixin = PortalMixin;
function getElement(selector) {
  if (typeof selector === "string") {
    return document.querySelector(selector);
  }
  return selector();
}
function PortalMixin(_temp) {
  var _ref = _temp === void 0 ? {} : _temp, ref = _ref.ref, afterPortal = _ref.afterPortal;
  return {
    props: {
      getContainer: [String, Function]
    },
    watch: {
      getContainer: "portal"
    },
    mounted: function mounted() {
      if (this.getContainer) {
        this.portal();
      }
    },
    methods: {
      portal: function portal2() {
        var getContainer = this.getContainer;
        var el = ref ? this.$refs[ref] : this.$el;
        var container;
        if (getContainer) {
          container = getElement(getContainer);
        } else if (this.$parent) {
          container = this.$parent.$el;
        }
        if (container && container !== el.parentNode) {
          container.appendChild(el);
        }
        if (afterPortal) {
          afterPortal.call(this);
        }
      }
    }
  };
}
var closeOnPopstate = {};
var bindEvent = {};
bindEvent.__esModule = true;
bindEvent.BindEventMixin = BindEventMixin;
var _event$2 = event;
var uid = 0;
function BindEventMixin(handler) {
  var key = "binded_" + uid++;
  function bind() {
    if (!this[key]) {
      handler.call(this, _event$2.on, true);
      this[key] = true;
    }
  }
  function unbind() {
    if (this[key]) {
      handler.call(this, _event$2.off, false);
      this[key] = false;
    }
  }
  return {
    mounted: bind,
    activated: bind,
    deactivated: unbind,
    beforeDestroy: unbind
  };
}
closeOnPopstate.__esModule = true;
closeOnPopstate.CloseOnPopstateMixin = void 0;
var _event$1 = event;
var _bindEvent = bindEvent;
var CloseOnPopstateMixin = {
  mixins: [(0, _bindEvent.BindEventMixin)(function(bind, isBind) {
    this.handlePopstate(isBind && this.closeOnPopstate);
  })],
  props: {
    closeOnPopstate: Boolean
  },
  data: function data2() {
    return {
      bindStatus: false
    };
  },
  watch: {
    closeOnPopstate: function closeOnPopstate2(val) {
      this.handlePopstate(val);
    }
  },
  methods: {
    onPopstate: function onPopstate() {
      this.close();
      this.shouldReopen = false;
    },
    handlePopstate: function handlePopstate(bind) {
      if (this.$isServer) {
        return;
      }
      if (this.bindStatus !== bind) {
        this.bindStatus = bind;
        var action = bind ? _event$1.on : _event$1.off;
        action(window, "popstate", this.onPopstate);
      }
    }
  }
};
closeOnPopstate.CloseOnPopstateMixin = CloseOnPopstateMixin;
popup.__esModule = true;
popup.PopupMixin = PopupMixin;
popup.popupMixinProps = void 0;
var _context = context$1;
var _overlay = overlay$1;
var _event = event;
var _node = node;
var _scroll = scroll;
var _touch = touch;
var _portal = portal;
var _closeOnPopstate = closeOnPopstate;
var popupMixinProps = {
  transitionAppear: Boolean,
  value: Boolean,
  overlay: Boolean,
  overlayStyle: Object,
  overlayClass: String,
  closeOnClickOverlay: Boolean,
  zIndex: [Number, String],
  lockScroll: {
    type: Boolean,
    default: true
  },
  lazyRender: {
    type: Boolean,
    default: true
  }
};
popup.popupMixinProps = popupMixinProps;
function PopupMixin(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    mixins: [_touch.TouchMixin, _closeOnPopstate.CloseOnPopstateMixin, (0, _portal.PortalMixin)({
      afterPortal: function afterPortal() {
        if (this.overlay) {
          (0, _overlay.updateOverlay)();
        }
      }
    })],
    provide: function provide() {
      return {
        vanPopup: this
      };
    },
    props: popupMixinProps,
    data: function data3() {
      this.onReopenCallback = [];
      return {
        inited: this.value
      };
    },
    computed: {
      shouldRender: function shouldRender() {
        return this.inited || !this.lazyRender;
      }
    },
    watch: {
      value: function value(val) {
        var type = val ? "open" : "close";
        this.inited = this.inited || this.value;
        this[type]();
        if (!options.skipToggleEvent) {
          this.$emit(type);
        }
      },
      overlay: "renderOverlay"
    },
    mounted: function mounted() {
      if (this.value) {
        this.open();
      }
    },
    activated: function activated() {
      if (this.shouldReopen) {
        this.$emit("input", true);
        this.shouldReopen = false;
      }
    },
    beforeDestroy: function beforeDestroy() {
      (0, _overlay.removeOverlay)(this);
      if (this.opened) {
        this.removeLock();
      }
      if (this.getContainer) {
        (0, _node.removeNode)(this.$el);
      }
    },
    deactivated: function deactivated() {
      if (this.value) {
        this.close();
        this.shouldReopen = true;
      }
    },
    methods: {
      open: function open() {
        if (this.$isServer || this.opened) {
          return;
        }
        if (this.zIndex !== void 0) {
          _context.context.zIndex = this.zIndex;
        }
        this.opened = true;
        this.renderOverlay();
        this.addLock();
        this.onReopenCallback.forEach(function(callback) {
          callback();
        });
      },
      addLock: function addLock() {
        if (this.lockScroll) {
          (0, _event.on)(document, "touchstart", this.touchStart);
          (0, _event.on)(document, "touchmove", this.onTouchMove);
          if (!_context.context.lockCount) {
            document.body.classList.add("van-overflow-hidden");
          }
          _context.context.lockCount++;
        }
      },
      removeLock: function removeLock() {
        if (this.lockScroll && _context.context.lockCount) {
          _context.context.lockCount--;
          (0, _event.off)(document, "touchstart", this.touchStart);
          (0, _event.off)(document, "touchmove", this.onTouchMove);
          if (!_context.context.lockCount) {
            document.body.classList.remove("van-overflow-hidden");
          }
        }
      },
      close: function close() {
        if (!this.opened) {
          return;
        }
        (0, _overlay.closeOverlay)(this);
        this.opened = false;
        this.removeLock();
        this.$emit("input", false);
      },
      onTouchMove: function onTouchMove(event2) {
        this.touchMove(event2);
        var direction = this.deltaY > 0 ? "10" : "01";
        var el = (0, _scroll.getScroller)(event2.target, this.$el);
        var scrollHeight = el.scrollHeight, offsetHeight = el.offsetHeight, scrollTop = el.scrollTop;
        var status = "11";
        if (scrollTop === 0) {
          status = offsetHeight >= scrollHeight ? "00" : "01";
        } else if (scrollTop + offsetHeight >= scrollHeight) {
          status = "10";
        }
        if (status !== "11" && this.direction === "vertical" && !(parseInt(status, 2) & parseInt(direction, 2))) {
          (0, _event.preventDefault)(event2, true);
        }
      },
      renderOverlay: function renderOverlay() {
        var _this = this;
        if (this.$isServer || !this.value) {
          return;
        }
        this.$nextTick(function() {
          _this.updateZIndex(_this.overlay ? 1 : 0);
          if (_this.overlay) {
            (0, _overlay.openOverlay)(_this, {
              zIndex: _context.context.zIndex++,
              duration: _this.duration,
              className: _this.overlayClass,
              customStyle: _this.overlayStyle
            });
          } else {
            (0, _overlay.closeOverlay)(_this);
          }
        });
      },
      updateZIndex: function updateZIndex(value) {
        if (value === void 0) {
          value = 0;
        }
        this.$el.style.zIndex = ++_context.context.zIndex + value;
      },
      onReopen: function onReopen(callback) {
        this.onReopenCallback.push(callback);
      }
    }
  };
}
var icon = {};
var info = {};
var _interopRequireDefault$4 = interopRequireDefault.exports;
info.__esModule = true;
info.default = void 0;
var _babelHelperVueJsxMergeProps$3 = _interopRequireDefault$4(helper);
var _utils$4 = utils;
var _functional$3 = functional;
var _createNamespace$4 = (0, _utils$4.createNamespace)("info"), createComponent$5 = _createNamespace$4[0], bem$5 = _createNamespace$4[1];
function Info(h, props, slots3, ctx) {
  var dot = props.dot, info2 = props.info;
  var showInfo = (0, _utils$4.isDef)(info2) && info2 !== "";
  if (!dot && !showInfo) {
    return;
  }
  return h("div", (0, _babelHelperVueJsxMergeProps$3.default)([{
    "class": bem$5({
      dot
    })
  }, (0, _functional$3.inherit)(ctx, true)]), [dot ? "" : props.info]);
}
Info.props = {
  dot: Boolean,
  info: [Number, String]
};
var _default$4 = createComponent$5(Info);
info.default = _default$4;
var _interopRequireDefault$3 = interopRequireDefault.exports;
icon.__esModule = true;
icon.default = void 0;
var _babelHelperVueJsxMergeProps$2 = _interopRequireDefault$3(helper);
var _utils$3 = utils;
var _functional$2 = functional;
var _info = _interopRequireDefault$3(info);
var _createNamespace$3 = (0, _utils$3.createNamespace)("icon"), createComponent$4 = _createNamespace$3[0], bem$4 = _createNamespace$3[1];
function isImage(name) {
  return name ? name.indexOf("/") !== -1 : false;
}
var LEGACY_MAP = {
  medel: "medal",
  "medel-o": "medal-o",
  "calender-o": "calendar-o"
};
function correctName(name) {
  return name && LEGACY_MAP[name] || name;
}
function Icon(h, props, slots3, ctx) {
  var _props$badge;
  var name = correctName(props.name);
  var imageIcon = isImage(name);
  return h(props.tag, (0, _babelHelperVueJsxMergeProps$2.default)([{
    "class": [props.classPrefix, imageIcon ? "" : props.classPrefix + "-" + name],
    "style": {
      color: props.color,
      fontSize: (0, _utils$3.addUnit)(props.size)
    }
  }, (0, _functional$2.inherit)(ctx, true)]), [slots3.default && slots3.default(), imageIcon && h("img", {
    "class": bem$4("image"),
    "attrs": {
      "src": name
    }
  }), h(_info.default, {
    "attrs": {
      "dot": props.dot,
      "info": (_props$badge = props.badge) != null ? _props$badge : props.info
    }
  })]);
}
Icon.props = {
  dot: Boolean,
  name: String,
  size: [Number, String],
  info: [Number, String],
  badge: [Number, String],
  color: String,
  tag: {
    type: String,
    default: "i"
  },
  classPrefix: {
    type: String,
    default: bem$4()
  }
};
var _default$3 = createComponent$4(Icon);
icon.default = _default$3;
var _interopRequireDefault$2 = interopRequireDefault.exports;
var default_1$1 = void 0;
var _utils$2 = utils;
var _popup = popup;
var _icon$1 = _interopRequireDefault$2(icon);
var _createNamespace$2 = (0, _utils$2.createNamespace)("popup"), createComponent$3 = _createNamespace$2[0], bem$3 = _createNamespace$2[1];
var _default$2 = createComponent$3({
  mixins: [(0, _popup.PopupMixin)()],
  props: {
    round: Boolean,
    duration: [Number, String],
    closeable: Boolean,
    transition: String,
    safeAreaInsetBottom: Boolean,
    closeIcon: {
      type: String,
      default: "cross"
    },
    closeIconPosition: {
      type: String,
      default: "top-right"
    },
    position: {
      type: String,
      default: "center"
    },
    overlay: {
      type: Boolean,
      default: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    }
  },
  beforeCreate: function beforeCreate() {
    var _this = this;
    var createEmitter = function createEmitter2(eventName) {
      return function(event2) {
        return _this.$emit(eventName, event2);
      };
    };
    this.onClick = createEmitter("click");
    this.onOpened = createEmitter("opened");
    this.onClosed = createEmitter("closed");
  },
  methods: {
    onClickCloseIcon: function onClickCloseIcon(event2) {
      this.$emit("click-close-icon", event2);
      this.close();
    }
  },
  render: function render() {
    var _bem2;
    var h = arguments[0];
    if (!this.shouldRender) {
      return;
    }
    var round = this.round, position = this.position, duration = this.duration;
    var isCenter = position === "center";
    var transitionName = this.transition || (isCenter ? "van-fade" : "van-popup-slide-" + position);
    var style = {};
    if ((0, _utils$2.isDef)(duration)) {
      var key = isCenter ? "animationDuration" : "transitionDuration";
      style[key] = duration + "s";
    }
    return h("transition", {
      "attrs": {
        "appear": this.transitionAppear,
        "name": transitionName
      },
      "on": {
        "afterEnter": this.onOpened,
        "afterLeave": this.onClosed
      }
    }, [h("div", {
      "directives": [{
        name: "show",
        value: this.value
      }],
      "style": style,
      "class": bem$3((_bem2 = {
        round
      }, _bem2[position] = position, _bem2["safe-area-inset-bottom"] = this.safeAreaInsetBottom, _bem2)),
      "on": {
        "click": this.onClick
      }
    }, [this.slots(), this.closeable && h(_icon$1.default, {
      "attrs": {
        "role": "button",
        "tabindex": "0",
        "name": this.closeIcon
      },
      "class": bem$3("close-icon", this.closeIconPosition),
      "on": {
        "click": this.onClickCloseIcon
      }
    })])]);
  }
});
default_1$1 = _default$2;
var constant = {};
constant.__esModule = true;
constant.BORDER_UNSET_TOP_BOTTOM = constant.BORDER_TOP_BOTTOM = constant.BORDER_SURROUND = constant.BORDER_BOTTOM = constant.BORDER_LEFT = constant.BORDER_TOP = constant.BORDER = constant.RED = void 0;
var RED = "#ee0a24";
constant.RED = RED;
var BORDER = "van-hairline";
constant.BORDER = BORDER;
var BORDER_TOP = BORDER + "--top";
constant.BORDER_TOP = BORDER_TOP;
var BORDER_LEFT = BORDER + "--left";
constant.BORDER_LEFT = BORDER_LEFT;
var BORDER_BOTTOM = BORDER + "--bottom";
constant.BORDER_BOTTOM = BORDER_BOTTOM;
var BORDER_SURROUND = BORDER + "--surround";
constant.BORDER_SURROUND = BORDER_SURROUND;
var BORDER_TOP_BOTTOM = BORDER + "--top-bottom";
constant.BORDER_TOP_BOTTOM = BORDER_TOP_BOTTOM;
var BORDER_UNSET_TOP_BOTTOM = BORDER + "-unset--top-bottom";
constant.BORDER_UNSET_TOP_BOTTOM = BORDER_UNSET_TOP_BOTTOM;
var router = {};
router.__esModule = true;
router.route = route;
router.functionalRoute = functionalRoute;
router.routeProps = void 0;
function isRedundantNavigation(err) {
  return err.name === "NavigationDuplicated" || err.message && err.message.indexOf("redundant navigation") !== -1;
}
function route(router2, config) {
  var to = config.to, url = config.url, replace = config.replace;
  if (to && router2) {
    var promise = router2[replace ? "replace" : "push"](to);
    if (promise && promise.catch) {
      promise.catch(function(err) {
        if (err && !isRedundantNavigation(err)) {
          throw err;
        }
      });
    }
  } else if (url) {
    replace ? location.replace(url) : location.href = url;
  }
}
function functionalRoute(context2) {
  route(context2.parent && context2.parent.$router, context2.props);
}
var routeProps = {
  url: String,
  replace: Boolean,
  to: [String, Object]
};
router.routeProps = routeProps;
var loading = {};
var _interopRequireDefault$1 = interopRequireDefault.exports;
loading.__esModule = true;
loading.default = void 0;
var _babelHelperVueJsxMergeProps$1 = _interopRequireDefault$1(helper);
var _utils$1 = utils;
var _functional$1 = functional;
var _createNamespace$1 = (0, _utils$1.createNamespace)("loading"), createComponent$2 = _createNamespace$1[0], bem$2 = _createNamespace$1[1];
function LoadingIcon(h, props) {
  if (props.type === "spinner") {
    var Spin = [];
    for (var i = 0; i < 12; i++) {
      Spin.push(h("i"));
    }
    return Spin;
  }
  return h("svg", {
    "class": bem$2("circular"),
    "attrs": {
      "viewBox": "25 25 50 50"
    }
  }, [h("circle", {
    "attrs": {
      "cx": "50",
      "cy": "50",
      "r": "20",
      "fill": "none"
    }
  })]);
}
function LoadingText(h, props, slots3) {
  if (slots3.default) {
    var _props$textColor;
    var style = {
      fontSize: (0, _utils$1.addUnit)(props.textSize),
      color: (_props$textColor = props.textColor) != null ? _props$textColor : props.color
    };
    return h("span", {
      "class": bem$2("text"),
      "style": style
    }, [slots3.default()]);
  }
}
function Loading(h, props, slots3, ctx) {
  var color = props.color, size = props.size, type = props.type;
  var style = {
    color
  };
  if (size) {
    var iconSize = (0, _utils$1.addUnit)(size);
    style.width = iconSize;
    style.height = iconSize;
  }
  return h("div", (0, _babelHelperVueJsxMergeProps$1.default)([{
    "class": bem$2([type, {
      vertical: props.vertical
    }])
  }, (0, _functional$1.inherit)(ctx, true)]), [h("span", {
    "class": bem$2("spinner", type),
    "style": style
  }, [LoadingIcon(h, props)]), LoadingText(h, props, slots3)]);
}
Loading.props = {
  color: String,
  size: [Number, String],
  vertical: Boolean,
  textSize: [Number, String],
  textColor: String,
  type: {
    type: String,
    default: "circular"
  }
};
var _default$1 = createComponent$2(Loading);
loading.default = _default$1;
var _interopRequireDefault = interopRequireDefault.exports;
var default_1 = void 0;
var _extends2 = _interopRequireDefault(_extends$1.exports);
var _babelHelperVueJsxMergeProps = _interopRequireDefault(helper);
var _utils = utils;
var _functional = functional;
var _constant = constant;
var _router = router;
var _icon = _interopRequireDefault(icon);
var _loading = _interopRequireDefault(loading);
var _createNamespace = (0, _utils.createNamespace)("button"), createComponent$1 = _createNamespace[0], bem$1 = _createNamespace[1];
function Button(h, props, slots3, ctx) {
  var _ref;
  var tag = props.tag, icon2 = props.icon, type = props.type, color = props.color, plain = props.plain, disabled = props.disabled, loading2 = props.loading, hairline = props.hairline, loadingText = props.loadingText, iconPosition = props.iconPosition;
  var style = {};
  if (color) {
    style.color = plain ? color : "white";
    if (!plain) {
      style.background = color;
    }
    if (color.indexOf("gradient") !== -1) {
      style.border = 0;
    } else {
      style.borderColor = color;
    }
  }
  function onClick(event2) {
    if (props.loading) {
      event2.preventDefault();
    }
    if (!loading2 && !disabled) {
      (0, _functional.emit)(ctx, "click", event2);
      (0, _router.functionalRoute)(ctx);
    }
  }
  function onTouchstart(event2) {
    (0, _functional.emit)(ctx, "touchstart", event2);
  }
  var classes = [bem$1([type, props.size, {
    plain,
    loading: loading2,
    disabled,
    hairline,
    block: props.block,
    round: props.round,
    square: props.square
  }]), (_ref = {}, _ref[_constant.BORDER_SURROUND] = hairline, _ref)];
  function renderIcon() {
    if (loading2) {
      return slots3.loading ? slots3.loading() : h(_loading.default, {
        "class": bem$1("loading"),
        "attrs": {
          "size": props.loadingSize,
          "type": props.loadingType,
          "color": "currentColor"
        }
      });
    }
    if (slots3.icon) {
      return h("div", {
        "class": bem$1("icon")
      }, [slots3.icon()]);
    }
    if (icon2) {
      return h(_icon.default, {
        "attrs": {
          "name": icon2,
          "classPrefix": props.iconPrefix
        },
        "class": bem$1("icon")
      });
    }
  }
  function renderContent() {
    var content = [];
    if (iconPosition === "left") {
      content.push(renderIcon());
    }
    var text;
    if (loading2) {
      text = loadingText;
    } else {
      text = slots3.default ? slots3.default() : props.text;
    }
    if (text) {
      content.push(h("span", {
        "class": bem$1("text")
      }, [text]));
    }
    if (iconPosition === "right") {
      content.push(renderIcon());
    }
    return content;
  }
  return h(tag, (0, _babelHelperVueJsxMergeProps.default)([{
    "style": style,
    "class": classes,
    "attrs": {
      "type": props.nativeType,
      "disabled": disabled
    },
    "on": {
      "click": onClick,
      "touchstart": onTouchstart
    }
  }, (0, _functional.inherit)(ctx)]), [h("div", {
    "class": bem$1("content")
  }, [renderContent()])]);
}
Button.props = (0, _extends2.default)({}, _router.routeProps, {
  text: String,
  icon: String,
  color: String,
  block: Boolean,
  plain: Boolean,
  round: Boolean,
  square: Boolean,
  loading: Boolean,
  hairline: Boolean,
  disabled: Boolean,
  iconPrefix: String,
  nativeType: String,
  loadingText: String,
  loadingType: String,
  tag: {
    type: String,
    default: "button"
  },
  type: {
    type: String,
    default: "default"
  },
  size: {
    type: String,
    default: "normal"
  },
  loadingSize: {
    type: String,
    default: "20px"
  },
  iconPosition: {
    type: String,
    default: "left"
  }
});
var _default = createComponent$1(Button);
default_1 = _default;
function createI18N(name) {
  const prefix = camelize_1(name) + ".";
  return function(path, ...args) {
    const messages2 = Locale.messages();
    const message = get_1(messages2, prefix + path) || get_1(messages2, path);
    return isFunction_1(message) ? message(...args) : message;
  };
}
function createNamespace(name) {
  name = "mb-" + name;
  return [createComponent_1(name), createBEM_1(name), createI18N(name)];
}
var render2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", [_c("button", {
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
render2._withStripped = true;
function normalizeComponent(scriptExports, render3, staticRenderFns2, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
  var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
  if (render3) {
    options.render = render3;
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
    hook = function(context2) {
      context2 = context2 || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
      if (!context2 && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
        context2 = __VUE_SSR_CONTEXT__;
      }
      if (injectStyles) {
        injectStyles.call(this, context2);
      }
      if (context2 && context2._registeredComponents) {
        context2._registeredComponents.add(moduleIdentifier);
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
      options.render = function renderWithStyleInjection(h, context2) {
        hook.call(context2);
        return originalRender(h, context2);
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
    VanPopup: default_1$1,
    VanButton: default_1
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
var __component__ = /* @__PURE__ */ normalizeComponent(__vue2_script, render2, staticRenderFns, false, __vue2_injectStyles, null, null, null);
function __vue2_injectStyles(context2) {
  for (let o in __cssModules) {
    this[o] = __cssModules[o];
  }
}
__component__.options.__file = "packages/components/popup/src/index.vue";
var MbPopup = /* @__PURE__ */ function() {
  return __component__.exports;
}();
const components = { MbPopup };
var version = "0.0.2";
function install(Vue) {
  Object.keys(components).forEach((key) => {
    const component2 = components[key];
    Vue.component(component2.name, component2);
  });
}
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
const MbLibUI = {
  install,
  version,
  ...components,
  Locale
};
export { MbLibUI as default };
