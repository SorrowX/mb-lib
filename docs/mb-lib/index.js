var index$3 = "";
/*!
 * Vue.js v2.6.14
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
const emptyObject$1 = Object.freeze({});
function isUndef$1(v) {
  return v === void 0 || v === null;
}
function isDef$3(v) {
  return v !== void 0 && v !== null;
}
function isTrue$1(v) {
  return v === true;
}
function isFalse$1(v) {
  return v === false;
}
function isPrimitive$1(value17) {
  return typeof value17 === "string" || typeof value17 === "number" || typeof value17 === "symbol" || typeof value17 === "boolean";
}
function isObject$3(obj) {
  return obj !== null && typeof obj === "object";
}
const _toString$1 = Object.prototype.toString;
function toRawType$1(value17) {
  return _toString$1.call(value17).slice(8, -1);
}
function isPlainObject$1(obj) {
  return _toString$1.call(obj) === "[object Object]";
}
function isRegExp$1(v) {
  return _toString$1.call(v) === "[object RegExp]";
}
function isValidArrayIndex$1(val) {
  const n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val);
}
function isPromise$3(val) {
  return isDef$3(val) && typeof val.then === "function" && typeof val.catch === "function";
}
function toString$1(val) {
  return val == null ? "" : Array.isArray(val) || isPlainObject$1(val) && val.toString === _toString$1 ? JSON.stringify(val, null, 2) : String(val);
}
function toNumber$1(val) {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
}
function makeMap$1(str2, expectsLowerCase) {
  const map = /* @__PURE__ */ Object.create(null);
  const list2 = str2.split(",");
  for (let i = 0; i < list2.length; i++) {
    map[list2[i]] = true;
  }
  return expectsLowerCase ? (val) => map[val.toLowerCase()] : (val) => map[val];
}
const isBuiltInTag = makeMap$1("slot,component", true);
const isReservedAttribute$1 = makeMap$1("key,ref,slot,slot-scope,is");
function remove$3(arr, item) {
  if (arr.length) {
    const index2 = arr.indexOf(item);
    if (index2 > -1) {
      return arr.splice(index2, 1);
    }
  }
}
const hasOwnProperty$3 = Object.prototype.hasOwnProperty;
function hasOwn$1(obj, key) {
  return hasOwnProperty$3.call(obj, key);
}
function cached$1(fn2) {
  const cache = /* @__PURE__ */ Object.create(null);
  return function cachedFn(str2) {
    const hit = cache[str2];
    return hit || (cache[str2] = fn2(str2));
  };
}
const camelizeRE$3 = /-(\w)/g;
const camelize$3 = cached$1((str2) => {
  return str2.replace(camelizeRE$3, (_2, c) => c ? c.toUpperCase() : "");
});
const capitalize$1 = cached$1((str2) => {
  return str2.charAt(0).toUpperCase() + str2.slice(1);
});
const hyphenateRE$1 = /\B([A-Z])/g;
const hyphenate$1 = cached$1((str2) => {
  return str2.replace(hyphenateRE$1, "-$1").toLowerCase();
});
function polyfillBind$1(fn2, ctx) {
  function boundFn(a) {
    const l = arguments.length;
    return l ? l > 1 ? fn2.apply(ctx, arguments) : fn2.call(ctx, a) : fn2.call(ctx);
  }
  boundFn._length = fn2.length;
  return boundFn;
}
function nativeBind$1(fn2, ctx) {
  return fn2.bind(ctx);
}
const bind$1 = Function.prototype.bind ? nativeBind$1 : polyfillBind$1;
function toArray$2(list2, start4) {
  start4 = start4 || 0;
  let i = list2.length - start4;
  const ret = new Array(i);
  while (i--) {
    ret[i] = list2[i + start4];
  }
  return ret;
}
function extend$1(to, _from) {
  for (const key in _from) {
    to[key] = _from[key];
  }
  return to;
}
function toObject$1(arr) {
  const res = {};
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend$1(res, arr[i]);
    }
  }
  return res;
}
function noop$3(a, b, c) {
}
const no$1 = (a, b, c) => false;
const identity$1 = (_2) => _2;
function genStaticKeys(modules2) {
  return modules2.reduce((keys2, m) => {
    return keys2.concat(m.staticKeys || []);
  }, []).join(",");
}
function looseEqual$1(a, b) {
  if (a === b)
    return true;
  const isObjectA = isObject$3(a);
  const isObjectB = isObject$3(b);
  if (isObjectA && isObjectB) {
    try {
      const isArrayA = Array.isArray(a);
      const isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every((e, i) => {
          return looseEqual$1(e, b[i]);
        });
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
      } else if (!isArrayA && !isArrayB) {
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every((key) => {
          return looseEqual$1(a[key], b[key]);
        });
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}
function looseIndexOf$1(arr, val) {
  for (let i = 0; i < arr.length; i++) {
    if (looseEqual$1(arr[i], val))
      return i;
  }
  return -1;
}
function once$1(fn2) {
  let called = false;
  return function() {
    if (!called) {
      called = true;
      fn2.apply(this, arguments);
    }
  };
}
const SSR_ATTR$1 = "data-server-rendered";
const ASSET_TYPES$1 = [
  "component",
  "directive",
  "filter"
];
const LIFECYCLE_HOOKS$1 = [
  "beforeCreate",
  "created",
  "beforeMount",
  "mounted",
  "beforeUpdate",
  "updated",
  "beforeDestroy",
  "destroyed",
  "activated",
  "deactivated",
  "errorCaptured",
  "serverPrefetch"
];
var config$1 = {
  optionMergeStrategies: /* @__PURE__ */ Object.create(null),
  silent: false,
  productionTip: true,
  devtools: true,
  performance: false,
  errorHandler: null,
  warnHandler: null,
  ignoredElements: [],
  keyCodes: /* @__PURE__ */ Object.create(null),
  isReservedTag: no$1,
  isReservedAttr: no$1,
  isUnknownElement: no$1,
  getTagNamespace: noop$3,
  parsePlatformTagName: identity$1,
  mustUseProp: no$1,
  async: true,
  _lifecycleHooks: LIFECYCLE_HOOKS$1
};
const unicodeRegExp$1 = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
function isReserved$1(str2) {
  const c = (str2 + "").charCodeAt(0);
  return c === 36 || c === 95;
}
function def$1(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}
const bailRE$1 = new RegExp(`[^${unicodeRegExp$1.source}.$_\\d]`);
function parsePath$1(path2) {
  if (bailRE$1.test(path2)) {
    return;
  }
  const segments = path2.split(".");
  return function(obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj)
        return;
      obj = obj[segments[i]];
    }
    return obj;
  };
}
const hasProto$1 = "__proto__" in {};
const inBrowser$3 = typeof window !== "undefined";
const inWeex$1 = typeof WXEnvironment !== "undefined" && !!WXEnvironment.platform;
const weexPlatform$1 = inWeex$1 && WXEnvironment.platform.toLowerCase();
const UA$1 = inBrowser$3 && window.navigator.userAgent.toLowerCase();
const isIE$1 = UA$1 && /msie|trident/.test(UA$1);
const isIE9$1 = UA$1 && UA$1.indexOf("msie 9.0") > 0;
const isEdge$1 = UA$1 && UA$1.indexOf("edge/") > 0;
UA$1 && UA$1.indexOf("android") > 0 || weexPlatform$1 === "android";
const isIOS$3 = UA$1 && /iphone|ipad|ipod|ios/.test(UA$1) || weexPlatform$1 === "ios";
UA$1 && /chrome\/\d+/.test(UA$1) && !isEdge$1;
UA$1 && /phantomjs/.test(UA$1);
const isFF$1 = UA$1 && UA$1.match(/firefox\/(\d+)/);
const nativeWatch$1 = {}.watch;
let supportsPassive$2 = false;
if (inBrowser$3) {
  try {
    const opts = {};
    Object.defineProperty(opts, "passive", {
      get() {
        supportsPassive$2 = true;
      }
    });
    window.addEventListener("test-passive", null, opts);
  } catch (e) {
  }
}
let _isServer$1;
const isServerRendering$1 = () => {
  if (_isServer$1 === void 0) {
    if (!inBrowser$3 && !inWeex$1 && typeof global !== "undefined") {
      _isServer$1 = global["process"] && global["process"].env.VUE_ENV === "server";
    } else {
      _isServer$1 = false;
    }
  }
  return _isServer$1;
};
const devtools$1 = inBrowser$3 && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
function isNative$1(Ctor) {
  return typeof Ctor === "function" && /native code/.test(Ctor.toString());
}
const hasSymbol$1 = typeof Symbol !== "undefined" && isNative$1(Symbol) && typeof Reflect !== "undefined" && isNative$1(Reflect.ownKeys);
let _Set$1;
if (typeof Set !== "undefined" && isNative$1(Set)) {
  _Set$1 = Set;
} else {
  _Set$1 = class Set {
    constructor() {
      this.set = /* @__PURE__ */ Object.create(null);
    }
    has(key) {
      return this.set[key] === true;
    }
    add(key) {
      this.set[key] = true;
    }
    clear() {
      this.set = /* @__PURE__ */ Object.create(null);
    }
  };
}
let warn$1 = noop$3;
let tip = noop$3;
let generateComponentTrace = noop$3;
let formatComponentName = noop$3;
{
  const hasConsole = typeof console !== "undefined";
  const classifyRE = /(?:^|[-_])(\w)/g;
  const classify = (str2) => str2.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
  warn$1 = (msg, vm) => {
    const trace = vm ? generateComponentTrace(vm) : "";
    if (config$1.warnHandler) {
      config$1.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && !config$1.silent) {
      console.error(`[Vue warn]: ${msg}${trace}`);
    }
  };
  tip = (msg, vm) => {
    if (hasConsole && !config$1.silent) {
      console.warn(`[Vue tip]: ${msg}` + (vm ? generateComponentTrace(vm) : ""));
    }
  };
  formatComponentName = (vm, includeFile) => {
    if (vm.$root === vm) {
      return "<Root>";
    }
    const options = typeof vm === "function" && vm.cid != null ? vm.options : vm._isVue ? vm.$options || vm.constructor.options : vm;
    let name = options.name || options._componentTag;
    const file = options.__file;
    if (!name && file) {
      const match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }
    return (name ? `<${classify(name)}>` : `<Anonymous>`) + (file && includeFile !== false ? ` at ${file}` : "");
  };
  const repeat2 = (str2, n) => {
    let res = "";
    while (n) {
      if (n % 2 === 1)
        res += str2;
      if (n > 1)
        str2 += str2;
      n >>= 1;
    }
    return res;
  };
  generateComponentTrace = (vm) => {
    if (vm._isVue && vm.$parent) {
      const tree = [];
      let currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          const last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue;
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return "\n\nfound in\n\n" + tree.map((vm2, i) => `${i === 0 ? "---> " : repeat2(" ", 5 + i * 2)}${Array.isArray(vm2) ? `${formatComponentName(vm2[0])}... (${vm2[1]} recursive calls)` : formatComponentName(vm2)}`).join("\n");
    } else {
      return `

(found in ${formatComponentName(vm)})`;
    }
  };
}
let uid$4 = 0;
class Dep$1 {
  constructor() {
    this.id = uid$4++;
    this.subs = [];
  }
  addSub(sub) {
    this.subs.push(sub);
  }
  removeSub(sub) {
    remove$3(this.subs, sub);
  }
  depend() {
    if (Dep$1.target) {
      Dep$1.target.addDep(this);
    }
  }
  notify() {
    const subs = this.subs.slice();
    if (!config$1.async) {
      subs.sort((a, b) => a.id - b.id);
    }
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update();
    }
  }
}
Dep$1.target = null;
const targetStack$1 = [];
function pushTarget$1(target2) {
  targetStack$1.push(target2);
  Dep$1.target = target2;
}
function popTarget$1() {
  targetStack$1.pop();
  Dep$1.target = targetStack$1[targetStack$1.length - 1];
}
class VNode$1 {
  constructor(tag, data49, children3, text2, elm, context2, componentOptions, asyncFactory) {
    this.tag = tag;
    this.data = data49;
    this.children = children3;
    this.text = text2;
    this.elm = elm;
    this.ns = void 0;
    this.context = context2;
    this.fnContext = void 0;
    this.fnOptions = void 0;
    this.fnScopeId = void 0;
    this.key = data49 && data49.key;
    this.componentOptions = componentOptions;
    this.componentInstance = void 0;
    this.parent = void 0;
    this.raw = false;
    this.isStatic = false;
    this.isRootInsert = true;
    this.isComment = false;
    this.isCloned = false;
    this.isOnce = false;
    this.asyncFactory = asyncFactory;
    this.asyncMeta = void 0;
    this.isAsyncPlaceholder = false;
  }
  get child() {
    return this.componentInstance;
  }
}
const createEmptyVNode$1 = (text2 = "") => {
  const node = new VNode$1();
  node.text = text2;
  node.isComment = true;
  return node;
};
function createTextVNode$1(val) {
  return new VNode$1(void 0, void 0, void 0, String(val));
}
function cloneVNode$1(vnode) {
  const cloned = new VNode$1(vnode.tag, vnode.data, vnode.children && vnode.children.slice(), vnode.text, vnode.elm, vnode.context, vnode.componentOptions, vnode.asyncFactory);
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned;
}
const arrayProto$1 = Array.prototype;
const arrayMethods$1 = Object.create(arrayProto$1);
const methodsToPatch$1 = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse"
];
methodsToPatch$1.forEach(function(method) {
  const original = arrayProto$1[method];
  def$1(arrayMethods$1, method, function mutator(...args) {
    const result = original.apply(this, args);
    const ob = this.__ob__;
    let inserted2;
    switch (method) {
      case "push":
      case "unshift":
        inserted2 = args;
        break;
      case "splice":
        inserted2 = args.slice(2);
        break;
    }
    if (inserted2)
      ob.observeArray(inserted2);
    ob.dep.notify();
    return result;
  });
});
const arrayKeys$1 = Object.getOwnPropertyNames(arrayMethods$1);
let shouldObserve$1 = true;
function toggleObserving$1(value17) {
  shouldObserve$1 = value17;
}
class Observer$1 {
  constructor(value17) {
    this.value = value17;
    this.dep = new Dep$1();
    this.vmCount = 0;
    def$1(value17, "__ob__", this);
    if (Array.isArray(value17)) {
      if (hasProto$1) {
        protoAugment$1(value17, arrayMethods$1);
      } else {
        copyAugment$1(value17, arrayMethods$1, arrayKeys$1);
      }
      this.observeArray(value17);
    } else {
      this.walk(value17);
    }
  }
  walk(obj) {
    const keys2 = Object.keys(obj);
    for (let i = 0; i < keys2.length; i++) {
      defineReactive$$1$1(obj, keys2[i]);
    }
  }
  observeArray(items) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe$1(items[i]);
    }
  }
}
function protoAugment$1(target2, src2) {
  target2.__proto__ = src2;
}
function copyAugment$1(target2, src2, keys2) {
  for (let i = 0, l = keys2.length; i < l; i++) {
    const key = keys2[i];
    def$1(target2, key, src2[key]);
  }
}
function observe$1(value17, asRootData) {
  if (!isObject$3(value17) || value17 instanceof VNode$1) {
    return;
  }
  let ob;
  if (hasOwn$1(value17, "__ob__") && value17.__ob__ instanceof Observer$1) {
    ob = value17.__ob__;
  } else if (shouldObserve$1 && !isServerRendering$1() && (Array.isArray(value17) || isPlainObject$1(value17)) && Object.isExtensible(value17) && !value17._isVue) {
    ob = new Observer$1(value17);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob;
}
function defineReactive$$1$1(obj, key, val, customSetter, shallow) {
  const dep = new Dep$1();
  const property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return;
  }
  const getter = property && property.get;
  const setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }
  let childOb = !shallow && observe$1(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      const value17 = getter ? getter.call(obj) : val;
      if (Dep$1.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value17)) {
            dependArray$1(value17);
          }
        }
      }
      return value17;
    },
    set: function reactiveSetter(newVal) {
      const value17 = getter ? getter.call(obj) : val;
      if (newVal === value17 || newVal !== newVal && value17 !== value17) {
        return;
      }
      if (customSetter) {
        customSetter();
      }
      if (getter && !setter)
        return;
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe$1(newVal);
      dep.notify();
    }
  });
}
function set$1(target2, key, val) {
  if (isUndef$1(target2) || isPrimitive$1(target2)) {
    warn$1(`Cannot set reactive property on undefined, null, or primitive value: ${target2}`);
  }
  if (Array.isArray(target2) && isValidArrayIndex$1(key)) {
    target2.length = Math.max(target2.length, key);
    target2.splice(key, 1, val);
    return val;
  }
  if (key in target2 && !(key in Object.prototype)) {
    target2[key] = val;
    return val;
  }
  const ob = target2.__ob__;
  if (target2._isVue || ob && ob.vmCount) {
    warn$1("Avoid adding reactive properties to a Vue instance or its root $data at runtime - declare it upfront in the data option.");
    return val;
  }
  if (!ob) {
    target2[key] = val;
    return val;
  }
  defineReactive$$1$1(ob.value, key, val);
  ob.dep.notify();
  return val;
}
function del$1(target2, key) {
  if (isUndef$1(target2) || isPrimitive$1(target2)) {
    warn$1(`Cannot delete reactive property on undefined, null, or primitive value: ${target2}`);
  }
  if (Array.isArray(target2) && isValidArrayIndex$1(key)) {
    target2.splice(key, 1);
    return;
  }
  const ob = target2.__ob__;
  if (target2._isVue || ob && ob.vmCount) {
    warn$1("Avoid deleting properties on a Vue instance or its root $data - just set it to null.");
    return;
  }
  if (!hasOwn$1(target2, key)) {
    return;
  }
  delete target2[key];
  if (!ob) {
    return;
  }
  ob.dep.notify();
}
function dependArray$1(value17) {
  for (let e, i = 0, l = value17.length; i < l; i++) {
    e = value17[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray$1(e);
    }
  }
}
const strats$1 = config$1.optionMergeStrategies;
{
  strats$1.el = strats$1.propsData = function(parent, child, vm, key) {
    if (!vm) {
      warn$1(`option "${key}" can only be used during instance creation with the \`new\` keyword.`);
    }
    return defaultStrat$1(parent, child);
  };
}
function mergeData$1(to, from) {
  if (!from)
    return to;
  let key, toVal, fromVal;
  const keys2 = hasSymbol$1 ? Reflect.ownKeys(from) : Object.keys(from);
  for (let i = 0; i < keys2.length; i++) {
    key = keys2[i];
    if (key === "__ob__")
      continue;
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn$1(to, key)) {
      set$1(to, key, fromVal);
    } else if (toVal !== fromVal && isPlainObject$1(toVal) && isPlainObject$1(fromVal)) {
      mergeData$1(toVal, fromVal);
    }
  }
  return to;
}
function mergeDataOrFn$1(parentVal, childVal, vm) {
  if (!vm) {
    if (!childVal) {
      return parentVal;
    }
    if (!parentVal) {
      return childVal;
    }
    return function mergedDataFn() {
      return mergeData$1(typeof childVal === "function" ? childVal.call(this, this) : childVal, typeof parentVal === "function" ? parentVal.call(this, this) : parentVal);
    };
  } else {
    return function mergedInstanceDataFn() {
      const instanceData = typeof childVal === "function" ? childVal.call(vm, vm) : childVal;
      const defaultData2 = typeof parentVal === "function" ? parentVal.call(vm, vm) : parentVal;
      if (instanceData) {
        return mergeData$1(instanceData, defaultData2);
      } else {
        return defaultData2;
      }
    };
  }
}
strats$1.data = function(parentVal, childVal, vm) {
  if (!vm) {
    if (childVal && typeof childVal !== "function") {
      warn$1('The "data" option should be a function that returns a per-instance value in component definitions.', vm);
      return parentVal;
    }
    return mergeDataOrFn$1(parentVal, childVal);
  }
  return mergeDataOrFn$1(parentVal, childVal, vm);
};
function mergeHook$2(parentVal, childVal) {
  const res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks$1(res) : res;
}
function dedupeHooks$1(hooks2) {
  const res = [];
  for (let i = 0; i < hooks2.length; i++) {
    if (res.indexOf(hooks2[i]) === -1) {
      res.push(hooks2[i]);
    }
  }
  return res;
}
LIFECYCLE_HOOKS$1.forEach((hook) => {
  strats$1[hook] = mergeHook$2;
});
function mergeAssets$1(parentVal, childVal, vm, key) {
  const res = Object.create(parentVal || null);
  if (childVal) {
    assertObjectType$1(key, childVal, vm);
    return extend$1(res, childVal);
  } else {
    return res;
  }
}
ASSET_TYPES$1.forEach(function(type2) {
  strats$1[type2 + "s"] = mergeAssets$1;
});
strats$1.watch = function(parentVal, childVal, vm, key) {
  if (parentVal === nativeWatch$1)
    parentVal = void 0;
  if (childVal === nativeWatch$1)
    childVal = void 0;
  if (!childVal)
    return Object.create(parentVal || null);
  {
    assertObjectType$1(key, childVal, vm);
  }
  if (!parentVal)
    return childVal;
  const ret = {};
  extend$1(ret, parentVal);
  for (const key2 in childVal) {
    let parent = ret[key2];
    const child = childVal[key2];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key2] = parent ? parent.concat(child) : Array.isArray(child) ? child : [child];
  }
  return ret;
};
strats$1.props = strats$1.methods = strats$1.inject = strats$1.computed = function(parentVal, childVal, vm, key) {
  if (childVal && true) {
    assertObjectType$1(key, childVal, vm);
  }
  if (!parentVal)
    return childVal;
  const ret = /* @__PURE__ */ Object.create(null);
  extend$1(ret, parentVal);
  if (childVal)
    extend$1(ret, childVal);
  return ret;
};
strats$1.provide = mergeDataOrFn$1;
const defaultStrat$1 = function(parentVal, childVal) {
  return childVal === void 0 ? parentVal : childVal;
};
function checkComponents(options) {
  for (const key in options.components) {
    validateComponentName(key);
  }
}
function validateComponentName(name) {
  if (!new RegExp(`^[a-zA-Z][\\-\\.0-9_${unicodeRegExp$1.source}]*$`).test(name)) {
    warn$1('Invalid component name: "' + name + '". Component names should conform to valid custom element name in html5 specification.');
  }
  if (isBuiltInTag(name) || config$1.isReservedTag(name)) {
    warn$1("Do not use built-in or reserved HTML elements as component id: " + name);
  }
}
function normalizeProps$1(options, vm) {
  const props2 = options.props;
  if (!props2)
    return;
  const res = {};
  let i, val, name;
  if (Array.isArray(props2)) {
    i = props2.length;
    while (i--) {
      val = props2[i];
      if (typeof val === "string") {
        name = camelize$3(val);
        res[name] = { type: null };
      } else {
        warn$1("props must be strings when using array syntax.");
      }
    }
  } else if (isPlainObject$1(props2)) {
    for (const key in props2) {
      val = props2[key];
      name = camelize$3(key);
      res[name] = isPlainObject$1(val) ? val : { type: val };
    }
  } else {
    warn$1(`Invalid value for option "props": expected an Array or an Object, but got ${toRawType$1(props2)}.`, vm);
  }
  options.props = res;
}
function normalizeInject$1(options, vm) {
  const inject = options.inject;
  if (!inject)
    return;
  const normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (let i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject$1(inject)) {
    for (const key in inject) {
      const val = inject[key];
      normalized[key] = isPlainObject$1(val) ? extend$1({ from: key }, val) : { from: val };
    }
  } else {
    warn$1(`Invalid value for option "inject": expected an Array or an Object, but got ${toRawType$1(inject)}.`, vm);
  }
}
function normalizeDirectives$2(options) {
  const dirs = options.directives;
  if (dirs) {
    for (const key in dirs) {
      const def$$1 = dirs[key];
      if (typeof def$$1 === "function") {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}
function assertObjectType$1(name, value17, vm) {
  if (!isPlainObject$1(value17)) {
    warn$1(`Invalid value for option "${name}": expected an Object, but got ${toRawType$1(value17)}.`, vm);
  }
}
function mergeOptions$1(parent, child, vm) {
  {
    checkComponents(child);
  }
  if (typeof child === "function") {
    child = child.options;
  }
  normalizeProps$1(child, vm);
  normalizeInject$1(child, vm);
  normalizeDirectives$2(child);
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions$1(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (let i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions$1(parent, child.mixins[i], vm);
      }
    }
  }
  const options = {};
  let key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn$1(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField(key2) {
    const strat = strats$1[key2] || defaultStrat$1;
    options[key2] = strat(parent[key2], child[key2], vm, key2);
  }
  return options;
}
function resolveAsset$1(options, type2, id, warnMissing) {
  if (typeof id !== "string") {
    return;
  }
  const assets = options[type2];
  if (hasOwn$1(assets, id))
    return assets[id];
  const camelizedId = camelize$3(id);
  if (hasOwn$1(assets, camelizedId))
    return assets[camelizedId];
  const PascalCaseId = capitalize$1(camelizedId);
  if (hasOwn$1(assets, PascalCaseId))
    return assets[PascalCaseId];
  const res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (warnMissing && !res) {
    warn$1("Failed to resolve " + type2.slice(0, -1) + ": " + id, options);
  }
  return res;
}
function validateProp$1(key, propOptions, propsData, vm) {
  const prop = propOptions[key];
  const absent = !hasOwn$1(propsData, key);
  let value17 = propsData[key];
  const booleanIndex = getTypeIndex$1(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn$1(prop, "default")) {
      value17 = false;
    } else if (value17 === "" || value17 === hyphenate$1(key)) {
      const stringIndex = getTypeIndex$1(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value17 = true;
      }
    }
  }
  if (value17 === void 0) {
    value17 = getPropDefaultValue$1(vm, prop, key);
    const prevShouldObserve = shouldObserve$1;
    toggleObserving$1(true);
    observe$1(value17);
    toggleObserving$1(prevShouldObserve);
  }
  {
    assertProp(prop, key, value17, vm, absent);
  }
  return value17;
}
function getPropDefaultValue$1(vm, prop, key) {
  if (!hasOwn$1(prop, "default")) {
    return void 0;
  }
  const def2 = prop.default;
  if (isObject$3(def2)) {
    warn$1('Invalid default value for prop "' + key + '": Props with type Object/Array must use a factory function to return the default value.', vm);
  }
  if (vm && vm.$options.propsData && vm.$options.propsData[key] === void 0 && vm._props[key] !== void 0) {
    return vm._props[key];
  }
  return typeof def2 === "function" && getType$1(prop.type) !== "Function" ? def2.call(vm) : def2;
}
function assertProp(prop, name, value17, vm, absent) {
  if (prop.required && absent) {
    warn$1('Missing required prop: "' + name + '"', vm);
    return;
  }
  if (value17 == null && !prop.required) {
    return;
  }
  let type2 = prop.type;
  let valid = !type2 || type2 === true;
  const expectedTypes = [];
  if (type2) {
    if (!Array.isArray(type2)) {
      type2 = [type2];
    }
    for (let i = 0; i < type2.length && !valid; i++) {
      const assertedType = assertType(value17, type2[i], vm);
      expectedTypes.push(assertedType.expectedType || "");
      valid = assertedType.valid;
    }
  }
  const haveExpectedTypes = expectedTypes.some((t2) => t2);
  if (!valid && haveExpectedTypes) {
    warn$1(getInvalidTypeMessage(name, value17, expectedTypes), vm);
    return;
  }
  const validator3 = prop.validator;
  if (validator3) {
    if (!validator3(value17)) {
      warn$1('Invalid prop: custom validator check failed for prop "' + name + '".', vm);
    }
  }
}
const simpleCheckRE = /^(String|Number|Boolean|Function|Symbol|BigInt)$/;
function assertType(value17, type2, vm) {
  let valid;
  const expectedType = getType$1(type2);
  if (simpleCheckRE.test(expectedType)) {
    const t2 = typeof value17;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value17 instanceof type2;
    }
  } else if (expectedType === "Object") {
    valid = isPlainObject$1(value17);
  } else if (expectedType === "Array") {
    valid = Array.isArray(value17);
  } else {
    try {
      valid = value17 instanceof type2;
    } catch (e) {
      warn$1('Invalid prop type: "' + String(type2) + '" is not a constructor', vm);
      valid = false;
    }
  }
  return {
    valid,
    expectedType
  };
}
const functionTypeCheckRE$1 = /^\s*function (\w+)/;
function getType$1(fn2) {
  const match = fn2 && fn2.toString().match(functionTypeCheckRE$1);
  return match ? match[1] : "";
}
function isSameType$1(a, b) {
  return getType$1(a) === getType$1(b);
}
function getTypeIndex$1(type2, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType$1(expectedTypes, type2) ? 0 : -1;
  }
  for (let i = 0, len2 = expectedTypes.length; i < len2; i++) {
    if (isSameType$1(expectedTypes[i], type2)) {
      return i;
    }
  }
  return -1;
}
function getInvalidTypeMessage(name, value17, expectedTypes) {
  let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize$1).join(", ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType$1(value17);
  if (expectedTypes.length === 1 && isExplicable(expectedType) && isExplicable(typeof value17) && !isBoolean(expectedType, receivedType)) {
    message += ` with value ${styleValue(value17, expectedType)}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable(receivedType)) {
    message += `with value ${styleValue(value17, receivedType)}.`;
  }
  return message;
}
function styleValue(value17, type2) {
  if (type2 === "String") {
    return `"${value17}"`;
  } else if (type2 === "Number") {
    return `${Number(value17)}`;
  } else {
    return `${value17}`;
  }
}
const EXPLICABLE_TYPES = ["string", "number", "boolean"];
function isExplicable(value17) {
  return EXPLICABLE_TYPES.some((elem) => value17.toLowerCase() === elem);
}
function isBoolean(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
function handleError$1(err, vm, info) {
  pushTarget$1();
  try {
    if (vm) {
      let cur = vm;
      while (cur = cur.$parent) {
        const hooks2 = cur.$options.errorCaptured;
        if (hooks2) {
          for (let i = 0; i < hooks2.length; i++) {
            try {
              const capture = hooks2[i].call(cur, err, vm, info) === false;
              if (capture)
                return;
            } catch (e) {
              globalHandleError$1(e, cur, "errorCaptured hook");
            }
          }
        }
      }
    }
    globalHandleError$1(err, vm, info);
  } finally {
    popTarget$1();
  }
}
function invokeWithErrorHandling$1(handler4, context2, args, vm, info) {
  let res;
  try {
    res = args ? handler4.apply(context2, args) : handler4.call(context2);
    if (res && !res._isVue && isPromise$3(res) && !res._handled) {
      res.catch((e) => handleError$1(e, vm, info + ` (Promise/async)`));
      res._handled = true;
    }
  } catch (e) {
    handleError$1(e, vm, info);
  }
  return res;
}
function globalHandleError$1(err, vm, info) {
  if (config$1.errorHandler) {
    try {
      return config$1.errorHandler.call(null, err, vm, info);
    } catch (e) {
      if (e !== err) {
        logError$1(e, null, "config.errorHandler");
      }
    }
  }
  logError$1(err, vm, info);
}
function logError$1(err, vm, info) {
  {
    warn$1(`Error in ${info}: "${err.toString()}"`, vm);
  }
  if ((inBrowser$3 || inWeex$1) && typeof console !== "undefined") {
    console.error(err);
  } else {
    throw err;
  }
}
let isUsingMicroTask$1 = false;
const callbacks$1 = [];
let pending$1 = false;
function flushCallbacks$1() {
  pending$1 = false;
  const copies = callbacks$1.slice(0);
  callbacks$1.length = 0;
  for (let i = 0; i < copies.length; i++) {
    copies[i]();
  }
}
let timerFunc$1;
if (typeof Promise !== "undefined" && isNative$1(Promise)) {
  const p = Promise.resolve();
  timerFunc$1 = () => {
    p.then(flushCallbacks$1);
    if (isIOS$3)
      setTimeout(noop$3);
  };
  isUsingMicroTask$1 = true;
} else if (!isIE$1 && typeof MutationObserver !== "undefined" && (isNative$1(MutationObserver) || MutationObserver.toString() === "[object MutationObserverConstructor]")) {
  let counter = 1;
  const observer = new MutationObserver(flushCallbacks$1);
  const textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc$1 = () => {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
  isUsingMicroTask$1 = true;
} else if (typeof setImmediate !== "undefined" && isNative$1(setImmediate)) {
  timerFunc$1 = () => {
    setImmediate(flushCallbacks$1);
  };
} else {
  timerFunc$1 = () => {
    setTimeout(flushCallbacks$1, 0);
  };
}
function nextTick$1(cb, ctx) {
  let _resolve;
  callbacks$1.push(() => {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError$1(e, ctx, "nextTick");
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending$1) {
    pending$1 = true;
    timerFunc$1();
  }
  if (!cb && typeof Promise !== "undefined") {
    return new Promise((resolve) => {
      _resolve = resolve;
    });
  }
}
let mark;
let measure;
{
  const perf = inBrowser$3 && window.performance;
  if (perf && perf.mark && perf.measure && perf.clearMarks && perf.clearMeasures) {
    mark = (tag) => perf.mark(tag);
    measure = (name, startTag, endTag2) => {
      perf.measure(name, startTag, endTag2);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag2);
    };
  }
}
let initProxy;
{
  const allowedGlobals = makeMap$1("Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,require");
  const warnNonPresent = (target2, key) => {
    warn$1(`Property or method "${key}" is not defined on the instance but referenced during render. Make sure that this property is reactive, either in the data option, or for class-based components, by initializing the property. See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.`, target2);
  };
  const warnReservedPrefix = (target2, key) => {
    warn$1(`Property "${key}" must be accessed with "$data.${key}" because properties starting with "$" or "_" are not proxied in the Vue instance to prevent conflicts with Vue internals. See: https://vuejs.org/v2/api/#data`, target2);
  };
  const hasProxy = typeof Proxy !== "undefined" && isNative$1(Proxy);
  if (hasProxy) {
    const isBuiltInModifier = makeMap$1("stop,prevent,self,ctrl,shift,alt,meta,exact");
    config$1.keyCodes = new Proxy(config$1.keyCodes, {
      set(target2, key, value17) {
        if (isBuiltInModifier(key)) {
          warn$1(`Avoid overwriting built-in modifier in config.keyCodes: .${key}`);
          return false;
        } else {
          target2[key] = value17;
          return true;
        }
      }
    });
  }
  const hasHandler = {
    has(target2, key) {
      const has2 = key in target2;
      const isAllowed = allowedGlobals(key) || typeof key === "string" && key.charAt(0) === "_" && !(key in target2.$data);
      if (!has2 && !isAllowed) {
        if (key in target2.$data)
          warnReservedPrefix(target2, key);
        else
          warnNonPresent(target2, key);
      }
      return has2 || !isAllowed;
    }
  };
  const getHandler = {
    get(target2, key) {
      if (typeof key === "string" && !(key in target2)) {
        if (key in target2.$data)
          warnReservedPrefix(target2, key);
        else
          warnNonPresent(target2, key);
      }
      return target2[key];
    }
  };
  initProxy = function initProxy2(vm) {
    if (hasProxy) {
      const options = vm.$options;
      const handlers = options.render && options.render._withStripped ? getHandler : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}
const seenObjects$1 = new _Set$1();
function traverse$1(val) {
  _traverse$1(val, seenObjects$1);
  seenObjects$1.clear();
}
function _traverse$1(val, seen) {
  let i, keys2;
  const isA = Array.isArray(val);
  if (!isA && !isObject$3(val) || Object.isFrozen(val) || val instanceof VNode$1) {
    return;
  }
  if (val.__ob__) {
    const depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return;
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--)
      _traverse$1(val[i], seen);
  } else {
    keys2 = Object.keys(val);
    i = keys2.length;
    while (i--)
      _traverse$1(val[keys2[i]], seen);
  }
}
const normalizeEvent$1 = cached$1((name) => {
  const passive2 = name.charAt(0) === "&";
  name = passive2 ? name.slice(1) : name;
  const once$$1 = name.charAt(0) === "~";
  name = once$$1 ? name.slice(1) : name;
  const capture = name.charAt(0) === "!";
  name = capture ? name.slice(1) : name;
  return {
    name,
    once: once$$1,
    capture,
    passive: passive2
  };
});
function createFnInvoker$1(fns, vm) {
  function invoker() {
    const fns2 = invoker.fns;
    if (Array.isArray(fns2)) {
      const cloned = fns2.slice();
      for (let i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling$1(cloned[i], null, arguments, vm, `v-on handler`);
      }
    } else {
      return invokeWithErrorHandling$1(fns2, null, arguments, vm, `v-on handler`);
    }
  }
  invoker.fns = fns;
  return invoker;
}
function updateListeners$1(on2, oldOn, add4, remove$$12, createOnceHandler2, vm) {
  let name, cur, old, event;
  for (name in on2) {
    cur = on2[name];
    old = oldOn[name];
    event = normalizeEvent$1(name);
    if (isUndef$1(cur)) {
      warn$1(`Invalid handler for event "${event.name}": got ` + String(cur), vm);
    } else if (isUndef$1(old)) {
      if (isUndef$1(cur.fns)) {
        cur = on2[name] = createFnInvoker$1(cur, vm);
      }
      if (isTrue$1(event.once)) {
        cur = on2[name] = createOnceHandler2(event.name, cur, event.capture);
      }
      add4(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on2[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef$1(on2[name])) {
      event = normalizeEvent$1(name);
      remove$$12(event.name, oldOn[name], event.capture);
    }
  }
}
function mergeVNodeHook$1(def2, hookKey, hook) {
  if (def2 instanceof VNode$1) {
    def2 = def2.data.hook || (def2.data.hook = {});
  }
  let invoker;
  const oldHook = def2[hookKey];
  function wrappedHook() {
    hook.apply(this, arguments);
    remove$3(invoker.fns, wrappedHook);
  }
  if (isUndef$1(oldHook)) {
    invoker = createFnInvoker$1([wrappedHook]);
  } else {
    if (isDef$3(oldHook.fns) && isTrue$1(oldHook.merged)) {
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      invoker = createFnInvoker$1([oldHook, wrappedHook]);
    }
  }
  invoker.merged = true;
  def2[hookKey] = invoker;
}
function extractPropsFromVNodeData$1(data49, Ctor, tag) {
  const propOptions = Ctor.options.props;
  if (isUndef$1(propOptions)) {
    return;
  }
  const res = {};
  const { attrs: attrs2, props: props2 } = data49;
  if (isDef$3(attrs2) || isDef$3(props2)) {
    for (const key in propOptions) {
      const altKey = hyphenate$1(key);
      {
        const keyInLowerCase = key.toLowerCase();
        if (key !== keyInLowerCase && attrs2 && hasOwn$1(attrs2, keyInLowerCase)) {
          tip(`Prop "${keyInLowerCase}" is passed to component ${formatComponentName(tag || Ctor)}, but the declared prop name is "${key}". Note that HTML attributes are case-insensitive and camelCased props need to use their kebab-case equivalents when using in-DOM templates. You should probably use "${altKey}" instead of "${key}".`);
        }
      }
      checkProp$1(res, props2, key, altKey, true) || checkProp$1(res, attrs2, key, altKey, false);
    }
  }
  return res;
}
function checkProp$1(res, hash2, key, altKey, preserve) {
  if (isDef$3(hash2)) {
    if (hasOwn$1(hash2, key)) {
      res[key] = hash2[key];
      if (!preserve) {
        delete hash2[key];
      }
      return true;
    } else if (hasOwn$1(hash2, altKey)) {
      res[key] = hash2[altKey];
      if (!preserve) {
        delete hash2[altKey];
      }
      return true;
    }
  }
  return false;
}
function simpleNormalizeChildren$1(children3) {
  for (let i = 0; i < children3.length; i++) {
    if (Array.isArray(children3[i])) {
      return Array.prototype.concat.apply([], children3);
    }
  }
  return children3;
}
function normalizeChildren$1(children3) {
  return isPrimitive$1(children3) ? [createTextVNode$1(children3)] : Array.isArray(children3) ? normalizeArrayChildren$1(children3) : void 0;
}
function isTextNode$1(node) {
  return isDef$3(node) && isDef$3(node.text) && isFalse$1(node.isComment);
}
function normalizeArrayChildren$1(children3, nestedIndex) {
  const res = [];
  let i, c, lastIndex, last;
  for (i = 0; i < children3.length; i++) {
    c = children3[i];
    if (isUndef$1(c) || typeof c === "boolean")
      continue;
    lastIndex = res.length - 1;
    last = res[lastIndex];
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren$1(c, `${nestedIndex || ""}_${i}`);
        if (isTextNode$1(c[0]) && isTextNode$1(last)) {
          res[lastIndex] = createTextVNode$1(last.text + c[0].text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive$1(c)) {
      if (isTextNode$1(last)) {
        res[lastIndex] = createTextVNode$1(last.text + c);
      } else if (c !== "") {
        res.push(createTextVNode$1(c));
      }
    } else {
      if (isTextNode$1(c) && isTextNode$1(last)) {
        res[lastIndex] = createTextVNode$1(last.text + c.text);
      } else {
        if (isTrue$1(children3._isVList) && isDef$3(c.tag) && isUndef$1(c.key) && isDef$3(nestedIndex)) {
          c.key = `__vlist${nestedIndex}_${i}__`;
        }
        res.push(c);
      }
    }
  }
  return res;
}
function initProvide$1(vm) {
  const provide3 = vm.$options.provide;
  if (provide3) {
    vm._provided = typeof provide3 === "function" ? provide3.call(vm) : provide3;
  }
}
function initInjections$1(vm) {
  const result = resolveInject$1(vm.$options.inject, vm);
  if (result) {
    toggleObserving$1(false);
    Object.keys(result).forEach((key) => {
      {
        defineReactive$$1$1(vm, key, result[key], () => {
          warn$1(`Avoid mutating an injected value directly since the changes will be overwritten whenever the provided component re-renders. injection being mutated: "${key}"`, vm);
        });
      }
    });
    toggleObserving$1(true);
  }
}
function resolveInject$1(inject, vm) {
  if (inject) {
    const result = /* @__PURE__ */ Object.create(null);
    const keys2 = hasSymbol$1 ? Reflect.ownKeys(inject) : Object.keys(inject);
    for (let i = 0; i < keys2.length; i++) {
      const key = keys2[i];
      if (key === "__ob__")
        continue;
      const provideKey = inject[key].from;
      let source = vm;
      while (source) {
        if (source._provided && hasOwn$1(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break;
        }
        source = source.$parent;
      }
      if (!source) {
        if ("default" in inject[key]) {
          const provideDefault = inject[key].default;
          result[key] = typeof provideDefault === "function" ? provideDefault.call(vm) : provideDefault;
        } else {
          warn$1(`Injection "${key}" not found`, vm);
        }
      }
    }
    return result;
  }
}
function resolveSlots$1(children3, context2) {
  if (!children3 || !children3.length) {
    return {};
  }
  const slots4 = {};
  for (let i = 0, l = children3.length; i < l; i++) {
    const child = children3[i];
    const data49 = child.data;
    if (data49 && data49.attrs && data49.attrs.slot) {
      delete data49.attrs.slot;
    }
    if ((child.context === context2 || child.fnContext === context2) && data49 && data49.slot != null) {
      const name = data49.slot;
      const slot = slots4[name] || (slots4[name] = []);
      if (child.tag === "template") {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots4.default || (slots4.default = [])).push(child);
    }
  }
  for (const name in slots4) {
    if (slots4[name].every(isWhitespace$1)) {
      delete slots4[name];
    }
  }
  return slots4;
}
function isWhitespace$1(node) {
  return node.isComment && !node.asyncFactory || node.text === " ";
}
function isAsyncPlaceholder$1(node) {
  return node.isComment && node.asyncFactory;
}
function normalizeScopedSlots$1(slots4, normalSlots, prevSlots) {
  let res;
  const hasNormalSlots = Object.keys(normalSlots).length > 0;
  const isStable = slots4 ? !!slots4.$stable : !hasNormalSlots;
  const key = slots4 && slots4.$key;
  if (!slots4) {
    res = {};
  } else if (slots4._normalized) {
    return slots4._normalized;
  } else if (isStable && prevSlots && prevSlots !== emptyObject$1 && key === prevSlots.$key && !hasNormalSlots && !prevSlots.$hasNormal) {
    return prevSlots;
  } else {
    res = {};
    for (const key2 in slots4) {
      if (slots4[key2] && key2[0] !== "$") {
        res[key2] = normalizeScopedSlot$1(normalSlots, key2, slots4[key2]);
      }
    }
  }
  for (const key2 in normalSlots) {
    if (!(key2 in res)) {
      res[key2] = proxyNormalSlot$1(normalSlots, key2);
    }
  }
  if (slots4 && Object.isExtensible(slots4)) {
    slots4._normalized = res;
  }
  def$1(res, "$stable", isStable);
  def$1(res, "$key", key);
  def$1(res, "$hasNormal", hasNormalSlots);
  return res;
}
function normalizeScopedSlot$1(normalSlots, key, fn2) {
  const normalized = function() {
    let res = arguments.length ? fn2.apply(null, arguments) : fn2({});
    res = res && typeof res === "object" && !Array.isArray(res) ? [res] : normalizeChildren$1(res);
    let vnode = res && res[0];
    return res && (!vnode || res.length === 1 && vnode.isComment && !isAsyncPlaceholder$1(vnode)) ? void 0 : res;
  };
  if (fn2.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized;
}
function proxyNormalSlot$1(slots4, key) {
  return () => slots4[key];
}
function renderList$1(val, render86) {
  let ret, i, l, keys2, key;
  if (Array.isArray(val) || typeof val === "string") {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render86(val[i], i);
    }
  } else if (typeof val === "number") {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render86(i + 1, i);
    }
  } else if (isObject$3(val)) {
    if (hasSymbol$1 && val[Symbol.iterator]) {
      ret = [];
      const iterator = val[Symbol.iterator]();
      let result = iterator.next();
      while (!result.done) {
        ret.push(render86(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys2 = Object.keys(val);
      ret = new Array(keys2.length);
      for (i = 0, l = keys2.length; i < l; i++) {
        key = keys2[i];
        ret[i] = render86(val[key], key, i);
      }
    }
  }
  if (!isDef$3(ret)) {
    ret = [];
  }
  ret._isVList = true;
  return ret;
}
function renderSlot$1(name, fallbackRender, props2, bindObject) {
  const scopedSlotFn = this.$scopedSlots[name];
  let nodes;
  if (scopedSlotFn) {
    props2 = props2 || {};
    if (bindObject) {
      if (!isObject$3(bindObject)) {
        warn$1("slot v-bind without argument expects an Object", this);
      }
      props2 = extend$1(extend$1({}, bindObject), props2);
    }
    nodes = scopedSlotFn(props2) || (typeof fallbackRender === "function" ? fallbackRender() : fallbackRender);
  } else {
    nodes = this.$slots[name] || (typeof fallbackRender === "function" ? fallbackRender() : fallbackRender);
  }
  const target2 = props2 && props2.slot;
  if (target2) {
    return this.$createElement("template", { slot: target2 }, nodes);
  } else {
    return nodes;
  }
}
function resolveFilter$1(id) {
  return resolveAsset$1(this.$options, "filters", id, true) || identity$1;
}
function isKeyNotMatch$1(expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1;
  } else {
    return expect !== actual;
  }
}
function checkKeyCodes$1(eventKeyCode, key, builtInKeyCode, eventKeyName, builtInKeyName) {
  const mappedKeyCode = config$1.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config$1.keyCodes[key]) {
    return isKeyNotMatch$1(builtInKeyName, eventKeyName);
  } else if (mappedKeyCode) {
    return isKeyNotMatch$1(mappedKeyCode, eventKeyCode);
  } else if (eventKeyName) {
    return hyphenate$1(eventKeyName) !== key;
  }
  return eventKeyCode === void 0;
}
function bindObjectProps$1(data49, tag, value17, asProp, isSync) {
  if (value17) {
    if (!isObject$3(value17)) {
      warn$1("v-bind without argument expects an Object or Array value", this);
    } else {
      if (Array.isArray(value17)) {
        value17 = toObject$1(value17);
      }
      let hash2;
      for (const key in value17) {
        if (key === "class" || key === "style" || isReservedAttribute$1(key)) {
          hash2 = data49;
        } else {
          const type2 = data49.attrs && data49.attrs.type;
          hash2 = asProp || config$1.mustUseProp(tag, type2, key) ? data49.domProps || (data49.domProps = {}) : data49.attrs || (data49.attrs = {});
        }
        const camelizedKey = camelize$3(key);
        const hyphenatedKey = hyphenate$1(key);
        if (!(camelizedKey in hash2) && !(hyphenatedKey in hash2)) {
          hash2[key] = value17[key];
          if (isSync) {
            const on2 = data49.on || (data49.on = {});
            on2[`update:${key}`] = function($event) {
              value17[key] = $event;
            };
          }
        }
      }
    }
  }
  return data49;
}
function renderStatic$1(index2, isInFor) {
  const cached2 = this._staticTrees || (this._staticTrees = []);
  let tree = cached2[index2];
  if (tree && !isInFor) {
    return tree;
  }
  tree = cached2[index2] = this.$options.staticRenderFns[index2].call(this._renderProxy, null, this);
  markStatic$1(tree, `__static__${index2}`, false);
  return tree;
}
function markOnce$1(tree, index2, key) {
  markStatic$1(tree, `__once__${index2}${key ? `_${key}` : ``}`, true);
  return tree;
}
function markStatic$1(tree, key, isOnce) {
  if (Array.isArray(tree)) {
    for (let i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== "string") {
        markStaticNode$1(tree[i], `${key}_${i}`, isOnce);
      }
    }
  } else {
    markStaticNode$1(tree, key, isOnce);
  }
}
function markStaticNode$1(node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}
function bindObjectListeners$1(data49, value17) {
  if (value17) {
    if (!isPlainObject$1(value17)) {
      warn$1("v-on without argument expects an Object value", this);
    } else {
      const on2 = data49.on = data49.on ? extend$1({}, data49.on) : {};
      for (const key in value17) {
        const existing = on2[key];
        const ours = value17[key];
        on2[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data49;
}
function resolveScopedSlots$1(fns, res, hasDynamicKeys, contentHashKey) {
  res = res || { $stable: !hasDynamicKeys };
  for (let i = 0; i < fns.length; i++) {
    const slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots$1(slot, res, hasDynamicKeys);
    } else if (slot) {
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    res.$key = contentHashKey;
  }
  return res;
}
function bindDynamicKeys$1(baseObj, values) {
  for (let i = 0; i < values.length; i += 2) {
    const key = values[i];
    if (typeof key === "string" && key) {
      baseObj[values[i]] = values[i + 1];
    } else if (key !== "" && key !== null) {
      warn$1(`Invalid value for dynamic directive argument (expected string or null): ${key}`, this);
    }
  }
  return baseObj;
}
function prependModifier$1(value17, symbol) {
  return typeof value17 === "string" ? symbol + value17 : value17;
}
function installRenderHelpers$1(target2) {
  target2._o = markOnce$1;
  target2._n = toNumber$1;
  target2._s = toString$1;
  target2._l = renderList$1;
  target2._t = renderSlot$1;
  target2._q = looseEqual$1;
  target2._i = looseIndexOf$1;
  target2._m = renderStatic$1;
  target2._f = resolveFilter$1;
  target2._k = checkKeyCodes$1;
  target2._b = bindObjectProps$1;
  target2._v = createTextVNode$1;
  target2._e = createEmptyVNode$1;
  target2._u = resolveScopedSlots$1;
  target2._g = bindObjectListeners$1;
  target2._d = bindDynamicKeys$1;
  target2._p = prependModifier$1;
}
function FunctionalRenderContext$1(data49, props2, children3, parent, Ctor) {
  const options = Ctor.options;
  let contextVm;
  if (hasOwn$1(parent, "_uid")) {
    contextVm = Object.create(parent);
    contextVm._original = parent;
  } else {
    contextVm = parent;
    parent = parent._original;
  }
  const isCompiled = isTrue$1(options._compiled);
  const needNormalization = !isCompiled;
  this.data = data49;
  this.props = props2;
  this.children = children3;
  this.parent = parent;
  this.listeners = data49.on || emptyObject$1;
  this.injections = resolveInject$1(options.inject, parent);
  this.slots = () => {
    if (!this.$slots) {
      normalizeScopedSlots$1(data49.scopedSlots, this.$slots = resolveSlots$1(children3, parent));
    }
    return this.$slots;
  };
  Object.defineProperty(this, "scopedSlots", {
    enumerable: true,
    get() {
      return normalizeScopedSlots$1(data49.scopedSlots, this.slots());
    }
  });
  if (isCompiled) {
    this.$options = options;
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots$1(data49.scopedSlots, this.$slots);
  }
  if (options._scopeId) {
    this._c = (a, b, c, d) => {
      const vnode = createElement$2(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode;
    };
  } else {
    this._c = (a, b, c, d) => createElement$2(contextVm, a, b, c, d, needNormalization);
  }
}
installRenderHelpers$1(FunctionalRenderContext$1.prototype);
function createFunctionalComponent$1(Ctor, propsData, data49, contextVm, children3) {
  const options = Ctor.options;
  const props2 = {};
  const propOptions = options.props;
  if (isDef$3(propOptions)) {
    for (const key in propOptions) {
      props2[key] = validateProp$1(key, propOptions, propsData || emptyObject$1);
    }
  } else {
    if (isDef$3(data49.attrs))
      mergeProps$1(props2, data49.attrs);
    if (isDef$3(data49.props))
      mergeProps$1(props2, data49.props);
  }
  const renderContext = new FunctionalRenderContext$1(data49, props2, children3, contextVm, Ctor);
  const vnode = options.render.call(null, renderContext._c, renderContext);
  if (vnode instanceof VNode$1) {
    return cloneAndMarkFunctionalResult$1(vnode, data49, renderContext.parent, options, renderContext);
  } else if (Array.isArray(vnode)) {
    const vnodes = normalizeChildren$1(vnode) || [];
    const res = new Array(vnodes.length);
    for (let i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult$1(vnodes[i], data49, renderContext.parent, options, renderContext);
    }
    return res;
  }
}
function cloneAndMarkFunctionalResult$1(vnode, data49, contextVm, options, renderContext) {
  const clone = cloneVNode$1(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data49.slot) {
    (clone.data || (clone.data = {})).slot = data49.slot;
  }
  return clone;
}
function mergeProps$1(to, from) {
  for (const key in from) {
    to[camelize$3(key)] = from[key];
  }
}
const componentVNodeHooks$1 = {
  init(vnode, hydrating) {
    if (vnode.componentInstance && !vnode.componentInstance._isDestroyed && vnode.data.keepAlive) {
      const mountedNode = vnode;
      componentVNodeHooks$1.prepatch(mountedNode, mountedNode);
    } else {
      const child = vnode.componentInstance = createComponentInstanceForVnode$1(vnode, activeInstance$1);
      child.$mount(hydrating ? vnode.elm : void 0, hydrating);
    }
  },
  prepatch(oldVnode, vnode) {
    const options = vnode.componentOptions;
    const child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent$1(child, options.propsData, options.listeners, vnode, options.children);
  },
  insert(vnode) {
    const { context: context2, componentInstance } = vnode;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook$2(componentInstance, "mounted");
    }
    if (vnode.data.keepAlive) {
      if (context2._isMounted) {
        queueActivatedComponent$1(componentInstance);
      } else {
        activateChildComponent$1(componentInstance, true);
      }
    }
  },
  destroy(vnode) {
    const { componentInstance } = vnode;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent$1(componentInstance, true);
      }
    }
  }
};
const hooksToMerge$1 = Object.keys(componentVNodeHooks$1);
function createComponent$1K(Ctor, data49, context2, children3, tag) {
  if (isUndef$1(Ctor)) {
    return;
  }
  const baseCtor = context2.$options._base;
  if (isObject$3(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }
  if (typeof Ctor !== "function") {
    {
      warn$1(`Invalid Component definition: ${String(Ctor)}`, context2);
    }
    return;
  }
  let asyncFactory;
  if (isUndef$1(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent$1(asyncFactory, baseCtor);
    if (Ctor === void 0) {
      return createAsyncPlaceholder$1(asyncFactory, data49, context2, children3, tag);
    }
  }
  data49 = data49 || {};
  resolveConstructorOptions$1(Ctor);
  if (isDef$3(data49.model)) {
    transformModel$1(Ctor.options, data49);
  }
  const propsData = extractPropsFromVNodeData$1(data49, Ctor, tag);
  if (isTrue$1(Ctor.options.functional)) {
    return createFunctionalComponent$1(Ctor, propsData, data49, context2, children3);
  }
  const listeners3 = data49.on;
  data49.on = data49.nativeOn;
  if (isTrue$1(Ctor.options.abstract)) {
    const slot = data49.slot;
    data49 = {};
    if (slot) {
      data49.slot = slot;
    }
  }
  installComponentHooks$1(data49);
  const name = Ctor.options.name || tag;
  const vnode = new VNode$1(`vue-component-${Ctor.cid}${name ? `-${name}` : ""}`, data49, void 0, void 0, void 0, context2, { Ctor, propsData, listeners: listeners3, tag, children: children3 }, asyncFactory);
  return vnode;
}
function createComponentInstanceForVnode$1(vnode, parent) {
  const options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent
  };
  const inlineTemplate = vnode.data.inlineTemplate;
  if (isDef$3(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options);
}
function installComponentHooks$1(data49) {
  const hooks2 = data49.hook || (data49.hook = {});
  for (let i = 0; i < hooksToMerge$1.length; i++) {
    const key = hooksToMerge$1[i];
    const existing = hooks2[key];
    const toMerge = componentVNodeHooks$1[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks2[key] = existing ? mergeHook$1$1(toMerge, existing) : toMerge;
    }
  }
}
function mergeHook$1$1(f1, f2) {
  const merged = (a, b) => {
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged;
}
function transformModel$1(options, data49) {
  const prop = options.model && options.model.prop || "value";
  const event = options.model && options.model.event || "input";
  (data49.attrs || (data49.attrs = {}))[prop] = data49.model.value;
  const on2 = data49.on || (data49.on = {});
  const existing = on2[event];
  const callback2 = data49.model.callback;
  if (isDef$3(existing)) {
    if (Array.isArray(existing) ? existing.indexOf(callback2) === -1 : existing !== callback2) {
      on2[event] = [callback2].concat(existing);
    }
  } else {
    on2[event] = callback2;
  }
}
const SIMPLE_NORMALIZE$1 = 1;
const ALWAYS_NORMALIZE$1 = 2;
function createElement$2(context2, tag, data49, children3, normalizationType, alwaysNormalize) {
  if (Array.isArray(data49) || isPrimitive$1(data49)) {
    normalizationType = children3;
    children3 = data49;
    data49 = void 0;
  }
  if (isTrue$1(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE$1;
  }
  return _createElement$1(context2, tag, data49, children3, normalizationType);
}
function _createElement$1(context2, tag, data49, children3, normalizationType) {
  if (isDef$3(data49) && isDef$3(data49.__ob__)) {
    warn$1(`Avoid using observed data object as vnode data: ${JSON.stringify(data49)}
Always create fresh vnode data objects in each render!`, context2);
    return createEmptyVNode$1();
  }
  if (isDef$3(data49) && isDef$3(data49.is)) {
    tag = data49.is;
  }
  if (!tag) {
    return createEmptyVNode$1();
  }
  if (isDef$3(data49) && isDef$3(data49.key) && !isPrimitive$1(data49.key)) {
    {
      warn$1("Avoid using non-primitive value as key, use string/number value instead.", context2);
    }
  }
  if (Array.isArray(children3) && typeof children3[0] === "function") {
    data49 = data49 || {};
    data49.scopedSlots = { default: children3[0] };
    children3.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE$1) {
    children3 = normalizeChildren$1(children3);
  } else if (normalizationType === SIMPLE_NORMALIZE$1) {
    children3 = simpleNormalizeChildren$1(children3);
  }
  let vnode, ns;
  if (typeof tag === "string") {
    let Ctor;
    ns = context2.$vnode && context2.$vnode.ns || config$1.getTagNamespace(tag);
    if (config$1.isReservedTag(tag)) {
      if (isDef$3(data49) && isDef$3(data49.nativeOn) && data49.tag !== "component") {
        warn$1(`The .native modifier for v-on is only valid on components but it was used on <${tag}>.`, context2);
      }
      vnode = new VNode$1(config$1.parsePlatformTagName(tag), data49, children3, void 0, void 0, context2);
    } else if ((!data49 || !data49.pre) && isDef$3(Ctor = resolveAsset$1(context2.$options, "components", tag))) {
      vnode = createComponent$1K(Ctor, data49, context2, children3, tag);
    } else {
      vnode = new VNode$1(tag, data49, children3, void 0, void 0, context2);
    }
  } else {
    vnode = createComponent$1K(tag, data49, context2, children3);
  }
  if (Array.isArray(vnode)) {
    return vnode;
  } else if (isDef$3(vnode)) {
    if (isDef$3(ns))
      applyNS$1(vnode, ns);
    if (isDef$3(data49))
      registerDeepBindings$1(data49);
    return vnode;
  } else {
    return createEmptyVNode$1();
  }
}
function applyNS$1(vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === "foreignObject") {
    ns = void 0;
    force = true;
  }
  if (isDef$3(vnode.children)) {
    for (let i = 0, l = vnode.children.length; i < l; i++) {
      const child = vnode.children[i];
      if (isDef$3(child.tag) && (isUndef$1(child.ns) || isTrue$1(force) && child.tag !== "svg")) {
        applyNS$1(child, ns, force);
      }
    }
  }
}
function registerDeepBindings$1(data49) {
  if (isObject$3(data49.style)) {
    traverse$1(data49.style);
  }
  if (isObject$3(data49.class)) {
    traverse$1(data49.class);
  }
}
function initRender$1(vm) {
  vm._vnode = null;
  vm._staticTrees = null;
  const options = vm.$options;
  const parentVnode = vm.$vnode = options._parentVnode;
  const renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots$1(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject$1;
  vm._c = (a, b, c, d) => createElement$2(vm, a, b, c, d, false);
  vm.$createElement = (a, b, c, d) => createElement$2(vm, a, b, c, d, true);
  const parentData = parentVnode && parentVnode.data;
  {
    defineReactive$$1$1(vm, "$attrs", parentData && parentData.attrs || emptyObject$1, () => {
      !isUpdatingChildComponent && warn$1(`$attrs is readonly.`, vm);
    }, true);
    defineReactive$$1$1(vm, "$listeners", options._parentListeners || emptyObject$1, () => {
      !isUpdatingChildComponent && warn$1(`$listeners is readonly.`, vm);
    }, true);
  }
}
let currentRenderingInstance$1 = null;
function renderMixin$1(Vue3) {
  installRenderHelpers$1(Vue3.prototype);
  Vue3.prototype.$nextTick = function(fn2) {
    return nextTick$1(fn2, this);
  };
  Vue3.prototype._render = function() {
    const vm = this;
    const { render: render86, _parentVnode } = vm.$options;
    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots$1(_parentVnode.data.scopedSlots, vm.$slots, vm.$scopedSlots);
    }
    vm.$vnode = _parentVnode;
    let vnode;
    try {
      currentRenderingInstance$1 = vm;
      vnode = render86.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError$1(e, vm, `render`);
      if (vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e2) {
          handleError$1(e2, vm, `renderError`);
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance$1 = null;
    }
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    if (!(vnode instanceof VNode$1)) {
      if (Array.isArray(vnode)) {
        warn$1("Multiple root nodes returned from render function. Render function should return a single root node.", vm);
      }
      vnode = createEmptyVNode$1();
    }
    vnode.parent = _parentVnode;
    return vnode;
  };
}
function ensureCtor$1(comp, base) {
  if (comp.__esModule || hasSymbol$1 && comp[Symbol.toStringTag] === "Module") {
    comp = comp.default;
  }
  return isObject$3(comp) ? base.extend(comp) : comp;
}
function createAsyncPlaceholder$1(factory, data49, context2, children3, tag) {
  const node = createEmptyVNode$1();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data49, context: context2, children: children3, tag };
  return node;
}
function resolveAsyncComponent$1(factory, baseCtor) {
  if (isTrue$1(factory.error) && isDef$3(factory.errorComp)) {
    return factory.errorComp;
  }
  if (isDef$3(factory.resolved)) {
    return factory.resolved;
  }
  const owner = currentRenderingInstance$1;
  if (owner && isDef$3(factory.owners) && factory.owners.indexOf(owner) === -1) {
    factory.owners.push(owner);
  }
  if (isTrue$1(factory.loading) && isDef$3(factory.loadingComp)) {
    return factory.loadingComp;
  }
  if (owner && !isDef$3(factory.owners)) {
    const owners = factory.owners = [owner];
    let sync = true;
    let timerLoading = null;
    let timerTimeout = null;
    owner.$on("hook:destroyed", () => remove$3(owners, owner));
    const forceRender = (renderCompleted) => {
      for (let i = 0, l = owners.length; i < l; i++) {
        owners[i].$forceUpdate();
      }
      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };
    const resolve = once$1((res2) => {
      factory.resolved = ensureCtor$1(res2, baseCtor);
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });
    const reject = once$1((reason) => {
      warn$1(`Failed to resolve async component: ${String(factory)}` + (reason ? `
Reason: ${reason}` : ""));
      if (isDef$3(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });
    const res = factory(resolve, reject);
    if (isObject$3(res)) {
      if (isPromise$3(res)) {
        if (isUndef$1(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise$3(res.component)) {
        res.component.then(resolve, reject);
        if (isDef$3(res.error)) {
          factory.errorComp = ensureCtor$1(res.error, baseCtor);
        }
        if (isDef$3(res.loading)) {
          factory.loadingComp = ensureCtor$1(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(() => {
              timerLoading = null;
              if (isUndef$1(factory.resolved) && isUndef$1(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }
        if (isDef$3(res.timeout)) {
          timerTimeout = setTimeout(() => {
            timerTimeout = null;
            if (isUndef$1(factory.resolved)) {
              reject(`timeout (${res.timeout}ms)`);
            }
          }, res.timeout);
        }
      }
    }
    sync = false;
    return factory.loading ? factory.loadingComp : factory.resolved;
  }
}
function getFirstComponentChild$1(children3) {
  if (Array.isArray(children3)) {
    for (let i = 0; i < children3.length; i++) {
      const c = children3[i];
      if (isDef$3(c) && (isDef$3(c.componentOptions) || isAsyncPlaceholder$1(c))) {
        return c;
      }
    }
  }
}
function initEvents$1(vm) {
  vm._events = /* @__PURE__ */ Object.create(null);
  vm._hasHookEvent = false;
  const listeners3 = vm.$options._parentListeners;
  if (listeners3) {
    updateComponentListeners$1(vm, listeners3);
  }
}
let target$2;
function add$2(event, fn2) {
  target$2.$on(event, fn2);
}
function remove$1$1(event, fn2) {
  target$2.$off(event, fn2);
}
function createOnceHandler$2(event, fn2) {
  const _target = target$2;
  return function onceHandler() {
    const res = fn2.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  };
}
function updateComponentListeners$1(vm, listeners3, oldListeners) {
  target$2 = vm;
  updateListeners$1(listeners3, oldListeners || {}, add$2, remove$1$1, createOnceHandler$2, vm);
  target$2 = void 0;
}
function eventsMixin$1(Vue3) {
  const hookRE = /^hook:/;
  Vue3.prototype.$on = function(event, fn2) {
    const vm = this;
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn2);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn2);
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm;
  };
  Vue3.prototype.$once = function(event, fn2) {
    const vm = this;
    function on2() {
      vm.$off(event, on2);
      fn2.apply(vm, arguments);
    }
    on2.fn = fn2;
    vm.$on(event, on2);
    return vm;
  };
  Vue3.prototype.$off = function(event, fn2) {
    const vm = this;
    if (!arguments.length) {
      vm._events = /* @__PURE__ */ Object.create(null);
      return vm;
    }
    if (Array.isArray(event)) {
      for (let i2 = 0, l = event.length; i2 < l; i2++) {
        vm.$off(event[i2], fn2);
      }
      return vm;
    }
    const cbs = vm._events[event];
    if (!cbs) {
      return vm;
    }
    if (!fn2) {
      vm._events[event] = null;
      return vm;
    }
    let cb;
    let i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn2 || cb.fn === fn2) {
        cbs.splice(i, 1);
        break;
      }
    }
    return vm;
  };
  Vue3.prototype.$emit = function(event) {
    const vm = this;
    {
      const lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(`Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(vm)} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate$1(event)}" instead of "${event}".`);
      }
    }
    let cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray$2(cbs) : cbs;
      const args = toArray$2(arguments, 1);
      const info = `event handler for "${event}"`;
      for (let i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling$1(cbs[i], vm, args, vm, info);
      }
    }
    return vm;
  };
}
let activeInstance$1 = null;
let isUpdatingChildComponent = false;
function setActiveInstance$1(vm) {
  const prevActiveInstance = activeInstance$1;
  activeInstance$1 = vm;
  return () => {
    activeInstance$1 = prevActiveInstance;
  };
}
function initLifecycle$1(vm) {
  const options = vm.$options;
  let parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }
  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;
  vm.$children = [];
  vm.$refs = {};
  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}
function lifecycleMixin$1(Vue3) {
  Vue3.prototype._update = function(vnode, hydrating) {
    const vm = this;
    const prevEl = vm.$el;
    const prevVnode = vm._vnode;
    const restoreActiveInstance = setActiveInstance$1(vm);
    vm._vnode = vnode;
    if (!prevVnode) {
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false);
    } else {
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
  };
  Vue3.prototype.$forceUpdate = function() {
    const vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };
  Vue3.prototype.$destroy = function() {
    const vm = this;
    if (vm._isBeingDestroyed) {
      return;
    }
    callHook$2(vm, "beforeDestroy");
    vm._isBeingDestroyed = true;
    const parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove$3(parent.$children, vm);
    }
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    let i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    vm._isDestroyed = true;
    vm.__patch__(vm._vnode, null);
    callHook$2(vm, "destroyed");
    vm.$off();
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}
function mountComponent$1(vm, el, hydrating) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode$1;
    {
      if (vm.$options.template && vm.$options.template.charAt(0) !== "#" || vm.$options.el || el) {
        warn$1("You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.", vm);
      } else {
        warn$1("Failed to mount component: template or render function not defined.", vm);
      }
    }
  }
  callHook$2(vm, "beforeMount");
  let updateComponent;
  if (config$1.performance && mark) {
    updateComponent = () => {
      const name = vm._name;
      const id = vm._uid;
      const startTag = `vue-perf-start:${id}`;
      const endTag2 = `vue-perf-end:${id}`;
      mark(startTag);
      const vnode = vm._render();
      mark(endTag2);
      measure(`vue ${name} render`, startTag, endTag2);
      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag2);
      measure(`vue ${name} patch`, startTag, endTag2);
    };
  } else {
    updateComponent = () => {
      vm._update(vm._render(), hydrating);
    };
  }
  new Watcher$1(vm, updateComponent, noop$3, {
    before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook$2(vm, "beforeUpdate");
      }
    }
  }, true);
  hydrating = false;
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook$2(vm, "mounted");
  }
  return vm;
}
function updateChildComponent$1(vm, propsData, listeners3, parentVnode, renderChildren) {
  {
    isUpdatingChildComponent = true;
  }
  const newScopedSlots = parentVnode.data.scopedSlots;
  const oldScopedSlots = vm.$scopedSlots;
  const hasDynamicScopedSlot = !!(newScopedSlots && !newScopedSlots.$stable || oldScopedSlots !== emptyObject$1 && !oldScopedSlots.$stable || newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key || !newScopedSlots && vm.$scopedSlots.$key);
  const needsForceUpdate = !!(renderChildren || vm.$options._renderChildren || hasDynamicScopedSlot);
  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode;
  if (vm._vnode) {
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;
  vm.$attrs = parentVnode.data.attrs || emptyObject$1;
  vm.$listeners = listeners3 || emptyObject$1;
  if (propsData && vm.$options.props) {
    toggleObserving$1(false);
    const props2 = vm._props;
    const propKeys = vm.$options._propKeys || [];
    for (let i = 0; i < propKeys.length; i++) {
      const key = propKeys[i];
      const propOptions = vm.$options.props;
      props2[key] = validateProp$1(key, propOptions, propsData, vm);
    }
    toggleObserving$1(true);
    vm.$options.propsData = propsData;
  }
  listeners3 = listeners3 || emptyObject$1;
  const oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners3;
  updateComponentListeners$1(vm, listeners3, oldListeners);
  if (needsForceUpdate) {
    vm.$slots = resolveSlots$1(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }
  {
    isUpdatingChildComponent = false;
  }
}
function isInInactiveTree$1(vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive)
      return true;
  }
  return false;
}
function activateChildComponent$1(vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree$1(vm)) {
      return;
    }
  } else if (vm._directInactive) {
    return;
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (let i = 0; i < vm.$children.length; i++) {
      activateChildComponent$1(vm.$children[i]);
    }
    callHook$2(vm, "activated");
  }
}
function deactivateChildComponent$1(vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree$1(vm)) {
      return;
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (let i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent$1(vm.$children[i]);
    }
    callHook$2(vm, "deactivated");
  }
}
function callHook$2(vm, hook) {
  pushTarget$1();
  const handlers = vm.$options[hook];
  const info = `${hook} hook`;
  if (handlers) {
    for (let i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling$1(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit("hook:" + hook);
  }
  popTarget$1();
}
const MAX_UPDATE_COUNT = 100;
const queue$2 = [];
const activatedChildren$1 = [];
let has$1 = {};
let circular = {};
let waiting$1 = false;
let flushing$1 = false;
let index$2 = 0;
function resetSchedulerState$1() {
  index$2 = queue$2.length = activatedChildren$1.length = 0;
  has$1 = {};
  {
    circular = {};
  }
  waiting$1 = flushing$1 = false;
}
let currentFlushTimestamp$1 = 0;
let getNow$1 = Date.now;
if (inBrowser$3 && !isIE$1) {
  const performance = window.performance;
  if (performance && typeof performance.now === "function" && getNow$1() > document.createEvent("Event").timeStamp) {
    getNow$1 = () => performance.now();
  }
}
function flushSchedulerQueue$1() {
  currentFlushTimestamp$1 = getNow$1();
  flushing$1 = true;
  let watcher, id;
  queue$2.sort((a, b) => a.id - b.id);
  for (index$2 = 0; index$2 < queue$2.length; index$2++) {
    watcher = queue$2[index$2];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has$1[id] = null;
    watcher.run();
    if (has$1[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn$1("You may have an infinite update loop " + (watcher.user ? `in watcher with expression "${watcher.expression}"` : `in a component render function.`), watcher.vm);
        break;
      }
    }
  }
  const activatedQueue = activatedChildren$1.slice();
  const updatedQueue = queue$2.slice();
  resetSchedulerState$1();
  callActivatedHooks$1(activatedQueue);
  callUpdatedHooks$1(updatedQueue);
  if (devtools$1 && config$1.devtools) {
    devtools$1.emit("flush");
  }
}
function callUpdatedHooks$1(queue2) {
  let i = queue2.length;
  while (i--) {
    const watcher = queue2[i];
    const vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook$2(vm, "updated");
    }
  }
}
function queueActivatedComponent$1(vm) {
  vm._inactive = false;
  activatedChildren$1.push(vm);
}
function callActivatedHooks$1(queue2) {
  for (let i = 0; i < queue2.length; i++) {
    queue2[i]._inactive = true;
    activateChildComponent$1(queue2[i], true);
  }
}
function queueWatcher$1(watcher) {
  const id = watcher.id;
  if (has$1[id] == null) {
    has$1[id] = true;
    if (!flushing$1) {
      queue$2.push(watcher);
    } else {
      let i = queue$2.length - 1;
      while (i > index$2 && queue$2[i].id > watcher.id) {
        i--;
      }
      queue$2.splice(i + 1, 0, watcher);
    }
    if (!waiting$1) {
      waiting$1 = true;
      if (!config$1.async) {
        flushSchedulerQueue$1();
        return;
      }
      nextTick$1(flushSchedulerQueue$1);
    }
  }
}
let uid$2$2 = 0;
class Watcher$1 {
  constructor(vm, expOrFn, cb, options, isRenderWatcher) {
    this.vm = vm;
    if (isRenderWatcher) {
      vm._watcher = this;
    }
    vm._watchers.push(this);
    if (options) {
      this.deep = !!options.deep;
      this.user = !!options.user;
      this.lazy = !!options.lazy;
      this.sync = !!options.sync;
      this.before = options.before;
    } else {
      this.deep = this.user = this.lazy = this.sync = false;
    }
    this.cb = cb;
    this.id = ++uid$2$2;
    this.active = true;
    this.dirty = this.lazy;
    this.deps = [];
    this.newDeps = [];
    this.depIds = new _Set$1();
    this.newDepIds = new _Set$1();
    this.expression = expOrFn.toString();
    if (typeof expOrFn === "function") {
      this.getter = expOrFn;
    } else {
      this.getter = parsePath$1(expOrFn);
      if (!this.getter) {
        this.getter = noop$3;
        warn$1(`Failed watching path: "${expOrFn}" Watcher only accepts simple dot-delimited paths. For full control, use a function instead.`, vm);
      }
    }
    this.value = this.lazy ? void 0 : this.get();
  }
  get() {
    pushTarget$1(this);
    let value17;
    const vm = this.vm;
    try {
      value17 = this.getter.call(vm, vm);
    } catch (e) {
      if (this.user) {
        handleError$1(e, vm, `getter for watcher "${this.expression}"`);
      } else {
        throw e;
      }
    } finally {
      if (this.deep) {
        traverse$1(value17);
      }
      popTarget$1();
      this.cleanupDeps();
    }
    return value17;
  }
  addDep(dep) {
    const id = dep.id;
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id);
      this.newDeps.push(dep);
      if (!this.depIds.has(id)) {
        dep.addSub(this);
      }
    }
  }
  cleanupDeps() {
    let i = this.deps.length;
    while (i--) {
      const dep = this.deps[i];
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this);
      }
    }
    let tmp = this.depIds;
    this.depIds = this.newDepIds;
    this.newDepIds = tmp;
    this.newDepIds.clear();
    tmp = this.deps;
    this.deps = this.newDeps;
    this.newDeps = tmp;
    this.newDeps.length = 0;
  }
  update() {
    if (this.lazy) {
      this.dirty = true;
    } else if (this.sync) {
      this.run();
    } else {
      queueWatcher$1(this);
    }
  }
  run() {
    if (this.active) {
      const value17 = this.get();
      if (value17 !== this.value || isObject$3(value17) || this.deep) {
        const oldValue = this.value;
        this.value = value17;
        if (this.user) {
          const info = `callback for watcher "${this.expression}"`;
          invokeWithErrorHandling$1(this.cb, this.vm, [value17, oldValue], this.vm, info);
        } else {
          this.cb.call(this.vm, value17, oldValue);
        }
      }
    }
  }
  evaluate() {
    this.value = this.get();
    this.dirty = false;
  }
  depend() {
    let i = this.deps.length;
    while (i--) {
      this.deps[i].depend();
    }
  }
  teardown() {
    if (this.active) {
      if (!this.vm._isBeingDestroyed) {
        remove$3(this.vm._watchers, this);
      }
      let i = this.deps.length;
      while (i--) {
        this.deps[i].removeSub(this);
      }
      this.active = false;
    }
  }
}
const sharedPropertyDefinition$1 = {
  enumerable: true,
  configurable: true,
  get: noop$3,
  set: noop$3
};
function proxy$1(target2, sourceKey, key) {
  sharedPropertyDefinition$1.get = function proxyGetter() {
    return this[sourceKey][key];
  };
  sharedPropertyDefinition$1.set = function proxySetter(val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target2, key, sharedPropertyDefinition$1);
}
function initState$1(vm) {
  vm._watchers = [];
  const opts = vm.$options;
  if (opts.props)
    initProps$2(vm, opts.props);
  if (opts.methods)
    initMethods$1(vm, opts.methods);
  if (opts.data) {
    initData$1(vm);
  } else {
    observe$1(vm._data = {}, true);
  }
  if (opts.computed)
    initComputed$2(vm, opts.computed);
  if (opts.watch && opts.watch !== nativeWatch$1) {
    initWatch$1(vm, opts.watch);
  }
}
function initProps$2(vm, propsOptions) {
  const propsData = vm.$options.propsData || {};
  const props2 = vm._props = {};
  const keys2 = vm.$options._propKeys = [];
  const isRoot = !vm.$parent;
  if (!isRoot) {
    toggleObserving$1(false);
  }
  for (const key in propsOptions) {
    keys2.push(key);
    const value17 = validateProp$1(key, propsOptions, propsData, vm);
    {
      const hyphenatedKey = hyphenate$1(key);
      if (isReservedAttribute$1(hyphenatedKey) || config$1.isReservedAttr(hyphenatedKey)) {
        warn$1(`"${hyphenatedKey}" is a reserved attribute and cannot be used as component prop.`, vm);
      }
      defineReactive$$1$1(props2, key, value17, () => {
        if (!isRoot && !isUpdatingChildComponent) {
          warn$1(`Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop's value. Prop being mutated: "${key}"`, vm);
        }
      });
    }
    if (!(key in vm)) {
      proxy$1(vm, `_props`, key);
    }
  }
  toggleObserving$1(true);
}
function initData$1(vm) {
  let data49 = vm.$options.data;
  data49 = vm._data = typeof data49 === "function" ? getData$1(data49, vm) : data49 || {};
  if (!isPlainObject$1(data49)) {
    data49 = {};
    warn$1("data functions should return an object:\nhttps://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function", vm);
  }
  const keys2 = Object.keys(data49);
  const props2 = vm.$options.props;
  const methods = vm.$options.methods;
  let i = keys2.length;
  while (i--) {
    const key = keys2[i];
    {
      if (methods && hasOwn$1(methods, key)) {
        warn$1(`Method "${key}" has already been defined as a data property.`, vm);
      }
    }
    if (props2 && hasOwn$1(props2, key)) {
      warn$1(`The data property "${key}" is already declared as a prop. Use prop default value instead.`, vm);
    } else if (!isReserved$1(key)) {
      proxy$1(vm, `_data`, key);
    }
  }
  observe$1(data49, true);
}
function getData$1(data49, vm) {
  pushTarget$1();
  try {
    return data49.call(vm, vm);
  } catch (e) {
    handleError$1(e, vm, `data()`);
    return {};
  } finally {
    popTarget$1();
  }
}
const computedWatcherOptions$1 = { lazy: true };
function initComputed$2(vm, computed) {
  const watchers = vm._computedWatchers = /* @__PURE__ */ Object.create(null);
  const isSSR = isServerRendering$1();
  for (const key in computed) {
    const userDef = computed[key];
    const getter = typeof userDef === "function" ? userDef : userDef.get;
    if (getter == null) {
      warn$1(`Getter is missing for computed property "${key}".`, vm);
    }
    if (!isSSR) {
      watchers[key] = new Watcher$1(vm, getter || noop$3, noop$3, computedWatcherOptions$1);
    }
    if (!(key in vm)) {
      defineComputed$1(vm, key, userDef);
    } else {
      if (key in vm.$data) {
        warn$1(`The computed property "${key}" is already defined in data.`, vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn$1(`The computed property "${key}" is already defined as a prop.`, vm);
      } else if (vm.$options.methods && key in vm.$options.methods) {
        warn$1(`The computed property "${key}" is already defined as a method.`, vm);
      }
    }
  }
}
function defineComputed$1(target2, key, userDef) {
  const shouldCache = !isServerRendering$1();
  if (typeof userDef === "function") {
    sharedPropertyDefinition$1.get = shouldCache ? createComputedGetter$1(key) : createGetterInvoker$1(userDef);
    sharedPropertyDefinition$1.set = noop$3;
  } else {
    sharedPropertyDefinition$1.get = userDef.get ? shouldCache && userDef.cache !== false ? createComputedGetter$1(key) : createGetterInvoker$1(userDef.get) : noop$3;
    sharedPropertyDefinition$1.set = userDef.set || noop$3;
  }
  if (sharedPropertyDefinition$1.set === noop$3) {
    sharedPropertyDefinition$1.set = function() {
      warn$1(`Computed property "${key}" was assigned to but it has no setter.`, this);
    };
  }
  Object.defineProperty(target2, key, sharedPropertyDefinition$1);
}
function createComputedGetter$1(key) {
  return function computedGetter() {
    const watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep$1.target) {
        watcher.depend();
      }
      return watcher.value;
    }
  };
}
function createGetterInvoker$1(fn2) {
  return function computedGetter() {
    return fn2.call(this, this);
  };
}
function initMethods$1(vm, methods) {
  const props2 = vm.$options.props;
  for (const key in methods) {
    {
      if (typeof methods[key] !== "function") {
        warn$1(`Method "${key}" has type "${typeof methods[key]}" in the component definition. Did you reference the function correctly?`, vm);
      }
      if (props2 && hasOwn$1(props2, key)) {
        warn$1(`Method "${key}" has already been defined as a prop.`, vm);
      }
      if (key in vm && isReserved$1(key)) {
        warn$1(`Method "${key}" conflicts with an existing Vue instance method. Avoid defining component methods that start with _ or $.`);
      }
    }
    vm[key] = typeof methods[key] !== "function" ? noop$3 : bind$1(methods[key], vm);
  }
}
function initWatch$1(vm, watch) {
  for (const key in watch) {
    const handler4 = watch[key];
    if (Array.isArray(handler4)) {
      for (let i = 0; i < handler4.length; i++) {
        createWatcher$1(vm, key, handler4[i]);
      }
    } else {
      createWatcher$1(vm, key, handler4);
    }
  }
}
function createWatcher$1(vm, expOrFn, handler4, options) {
  if (isPlainObject$1(handler4)) {
    options = handler4;
    handler4 = handler4.handler;
  }
  if (typeof handler4 === "string") {
    handler4 = vm[handler4];
  }
  return vm.$watch(expOrFn, handler4, options);
}
function stateMixin$1(Vue3) {
  const dataDef = {};
  dataDef.get = function() {
    return this._data;
  };
  const propsDef = {};
  propsDef.get = function() {
    return this._props;
  };
  {
    dataDef.set = function() {
      warn$1("Avoid replacing instance root $data. Use nested data properties instead.", this);
    };
    propsDef.set = function() {
      warn$1(`$props is readonly.`, this);
    };
  }
  Object.defineProperty(Vue3.prototype, "$data", dataDef);
  Object.defineProperty(Vue3.prototype, "$props", propsDef);
  Vue3.prototype.$set = set$1;
  Vue3.prototype.$delete = del$1;
  Vue3.prototype.$watch = function(expOrFn, cb, options) {
    const vm = this;
    if (isPlainObject$1(cb)) {
      return createWatcher$1(vm, expOrFn, cb, options);
    }
    options = options || {};
    options.user = true;
    const watcher = new Watcher$1(vm, expOrFn, cb, options);
    if (options.immediate) {
      const info = `callback for immediate watcher "${watcher.expression}"`;
      pushTarget$1();
      invokeWithErrorHandling$1(cb, vm, [watcher.value], vm, info);
      popTarget$1();
    }
    return function unwatchFn() {
      watcher.teardown();
    };
  };
}
let uid$3$1 = 0;
function initMixin$2(Vue3) {
  Vue3.prototype._init = function(options) {
    const vm = this;
    vm._uid = uid$3$1++;
    let startTag, endTag2;
    if (config$1.performance && mark) {
      startTag = `vue-perf-start:${vm._uid}`;
      endTag2 = `vue-perf-end:${vm._uid}`;
      mark(startTag);
    }
    vm._isVue = true;
    if (options && options._isComponent) {
      initInternalComponent$1(vm, options);
    } else {
      vm.$options = mergeOptions$1(resolveConstructorOptions$1(vm.constructor), options || {}, vm);
    }
    {
      initProxy(vm);
    }
    vm._self = vm;
    initLifecycle$1(vm);
    initEvents$1(vm);
    initRender$1(vm);
    callHook$2(vm, "beforeCreate");
    initInjections$1(vm);
    initState$1(vm);
    initProvide$1(vm);
    callHook$2(vm, "created");
    if (config$1.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag2);
      measure(`vue ${vm._name} init`, startTag, endTag2);
    }
    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}
function initInternalComponent$1(vm, options) {
  const opts = vm.$options = Object.create(vm.constructor.options);
  const parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  const vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;
  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}
function resolveConstructorOptions$1(Ctor) {
  let options = Ctor.options;
  if (Ctor.super) {
    const superOptions = resolveConstructorOptions$1(Ctor.super);
    const cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      Ctor.superOptions = superOptions;
      const modifiedOptions = resolveModifiedOptions$1(Ctor);
      if (modifiedOptions) {
        extend$1(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions$1(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options;
}
function resolveModifiedOptions$1(Ctor) {
  let modified;
  const latest = Ctor.options;
  const sealed = Ctor.sealedOptions;
  for (const key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified)
        modified = {};
      modified[key] = latest[key];
    }
  }
  return modified;
}
function Vue$1(options) {
  if (!(this instanceof Vue$1)) {
    warn$1("Vue is a constructor and should be called with the `new` keyword");
  }
  this._init(options);
}
initMixin$2(Vue$1);
stateMixin$1(Vue$1);
eventsMixin$1(Vue$1);
lifecycleMixin$1(Vue$1);
renderMixin$1(Vue$1);
function initUse$1(Vue3) {
  Vue3.use = function(plugin) {
    const installedPlugins = this._installedPlugins || (this._installedPlugins = []);
    if (installedPlugins.indexOf(plugin) > -1) {
      return this;
    }
    const args = toArray$2(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === "function") {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === "function") {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this;
  };
}
function initMixin$1$1(Vue3) {
  Vue3.mixin = function(mixin) {
    this.options = mergeOptions$1(this.options, mixin);
    return this;
  };
}
function initExtend$1(Vue3) {
  Vue3.cid = 0;
  let cid = 1;
  Vue3.extend = function(extendOptions) {
    extendOptions = extendOptions || {};
    const Super = this;
    const SuperId = Super.cid;
    const cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId];
    }
    const name = extendOptions.name || Super.options.name;
    if (name) {
      validateComponentName(name);
    }
    const Sub = function VueComponent(options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions$1(Super.options, extendOptions);
    Sub["super"] = Super;
    if (Sub.options.props) {
      initProps$1$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1$1(Sub);
    }
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;
    ASSET_TYPES$1.forEach(function(type2) {
      Sub[type2] = Super[type2];
    });
    if (name) {
      Sub.options.components[name] = Sub;
    }
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend$1({}, Sub.options);
    cachedCtors[SuperId] = Sub;
    return Sub;
  };
}
function initProps$1$1(Comp) {
  const props2 = Comp.options.props;
  for (const key in props2) {
    proxy$1(Comp.prototype, `_props`, key);
  }
}
function initComputed$1$1(Comp) {
  const computed = Comp.options.computed;
  for (const key in computed) {
    defineComputed$1(Comp.prototype, key, computed[key]);
  }
}
function initAssetRegisters$1(Vue3) {
  ASSET_TYPES$1.forEach((type2) => {
    Vue3[type2] = function(id, definition) {
      if (!definition) {
        return this.options[type2 + "s"][id];
      } else {
        if (type2 === "component") {
          validateComponentName(id);
        }
        if (type2 === "component" && isPlainObject$1(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type2 === "directive" && typeof definition === "function") {
          definition = { bind: definition, update: definition };
        }
        this.options[type2 + "s"][id] = definition;
        return definition;
      }
    };
  });
}
function getComponentName$1(opts) {
  return opts && (opts.Ctor.options.name || opts.tag);
}
function matches$1(pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1;
  } else if (typeof pattern === "string") {
    return pattern.split(",").indexOf(name) > -1;
  } else if (isRegExp$1(pattern)) {
    return pattern.test(name);
  }
  return false;
}
function pruneCache$1(keepAliveInstance, filter) {
  const { cache, keys: keys2, _vnode } = keepAliveInstance;
  for (const key in cache) {
    const entry = cache[key];
    if (entry) {
      const name = entry.name;
      if (name && !filter(name)) {
        pruneCacheEntry$1(cache, key, keys2, _vnode);
      }
    }
  }
}
function pruneCacheEntry$1(cache, key, keys2, current) {
  const entry = cache[key];
  if (entry && (!current || entry.tag !== current.tag)) {
    entry.componentInstance.$destroy();
  }
  cache[key] = null;
  remove$3(keys2, key);
}
const patternTypes$1 = [String, RegExp, Array];
var KeepAlive$1 = {
  name: "keep-alive",
  abstract: true,
  props: {
    include: patternTypes$1,
    exclude: patternTypes$1,
    max: [String, Number]
  },
  methods: {
    cacheVNode() {
      const { cache, keys: keys2, vnodeToCache, keyToCache } = this;
      if (vnodeToCache) {
        const { tag, componentInstance, componentOptions } = vnodeToCache;
        cache[keyToCache] = {
          name: getComponentName$1(componentOptions),
          tag,
          componentInstance
        };
        keys2.push(keyToCache);
        if (this.max && keys2.length > parseInt(this.max)) {
          pruneCacheEntry$1(cache, keys2[0], keys2, this._vnode);
        }
        this.vnodeToCache = null;
      }
    }
  },
  created() {
    this.cache = /* @__PURE__ */ Object.create(null);
    this.keys = [];
  },
  destroyed() {
    for (const key in this.cache) {
      pruneCacheEntry$1(this.cache, key, this.keys);
    }
  },
  mounted() {
    this.cacheVNode();
    this.$watch("include", (val) => {
      pruneCache$1(this, (name) => matches$1(val, name));
    });
    this.$watch("exclude", (val) => {
      pruneCache$1(this, (name) => !matches$1(val, name));
    });
  },
  updated() {
    this.cacheVNode();
  },
  render() {
    const slot = this.$slots.default;
    const vnode = getFirstComponentChild$1(slot);
    const componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      const name = getComponentName$1(componentOptions);
      const { include, exclude } = this;
      if (include && (!name || !matches$1(include, name)) || exclude && name && matches$1(exclude, name)) {
        return vnode;
      }
      const { cache, keys: keys2 } = this;
      const key = vnode.key == null ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : "") : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        remove$3(keys2, key);
        keys2.push(key);
      } else {
        this.vnodeToCache = vnode;
        this.keyToCache = key;
      }
      vnode.data.keepAlive = true;
    }
    return vnode || slot && slot[0];
  }
};
var builtInComponents$1 = {
  KeepAlive: KeepAlive$1
};
function initGlobalAPI$1(Vue3) {
  const configDef = {};
  configDef.get = () => config$1;
  {
    configDef.set = () => {
      warn$1("Do not replace the Vue.config object, set individual fields instead.");
    };
  }
  Object.defineProperty(Vue3, "config", configDef);
  Vue3.util = {
    warn: warn$1,
    extend: extend$1,
    mergeOptions: mergeOptions$1,
    defineReactive: defineReactive$$1$1
  };
  Vue3.set = set$1;
  Vue3.delete = del$1;
  Vue3.nextTick = nextTick$1;
  Vue3.observable = (obj) => {
    observe$1(obj);
    return obj;
  };
  Vue3.options = /* @__PURE__ */ Object.create(null);
  ASSET_TYPES$1.forEach((type2) => {
    Vue3.options[type2 + "s"] = /* @__PURE__ */ Object.create(null);
  });
  Vue3.options._base = Vue3;
  extend$1(Vue3.options.components, builtInComponents$1);
  initUse$1(Vue3);
  initMixin$1$1(Vue3);
  initExtend$1(Vue3);
  initAssetRegisters$1(Vue3);
}
initGlobalAPI$1(Vue$1);
Object.defineProperty(Vue$1.prototype, "$isServer", {
  get: isServerRendering$1
});
Object.defineProperty(Vue$1.prototype, "$ssrContext", {
  get() {
    return this.$vnode && this.$vnode.ssrContext;
  }
});
Object.defineProperty(Vue$1, "FunctionalRenderContext", {
  value: FunctionalRenderContext$1
});
Vue$1.version = "2.6.14";
const isReservedAttr$1 = makeMap$1("style,class");
const acceptValue$1 = makeMap$1("input,textarea,option,select,progress");
const mustUseProp$1 = (tag, type2, attr) => {
  return attr === "value" && acceptValue$1(tag) && type2 !== "button" || attr === "selected" && tag === "option" || attr === "checked" && tag === "input" || attr === "muted" && tag === "video";
};
const isEnumeratedAttr$1 = makeMap$1("contenteditable,draggable,spellcheck");
const isValidContentEditableValue$1 = makeMap$1("events,caret,typing,plaintext-only");
const convertEnumeratedValue$1 = (key, value17) => {
  return isFalsyAttrValue$1(value17) || value17 === "false" ? "false" : key === "contenteditable" && isValidContentEditableValue$1(value17) ? value17 : "true";
};
const isBooleanAttr$1 = makeMap$1("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,truespeed,typemustmatch,visible");
const xlinkNS$1 = "http://www.w3.org/1999/xlink";
const isXlink$1 = (name) => {
  return name.charAt(5) === ":" && name.slice(0, 5) === "xlink";
};
const getXlinkProp$1 = (name) => {
  return isXlink$1(name) ? name.slice(6, name.length) : "";
};
const isFalsyAttrValue$1 = (val) => {
  return val == null || val === false;
};
function genClassForVnode$1(vnode) {
  let data49 = vnode.data;
  let parentNode2 = vnode;
  let childNode = vnode;
  while (isDef$3(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data49 = mergeClassData$1(childNode.data, data49);
    }
  }
  while (isDef$3(parentNode2 = parentNode2.parent)) {
    if (parentNode2 && parentNode2.data) {
      data49 = mergeClassData$1(data49, parentNode2.data);
    }
  }
  return renderClass$1(data49.staticClass, data49.class);
}
function mergeClassData$1(child, parent) {
  return {
    staticClass: concat$1(child.staticClass, parent.staticClass),
    class: isDef$3(child.class) ? [child.class, parent.class] : parent.class
  };
}
function renderClass$1(staticClass, dynamicClass) {
  if (isDef$3(staticClass) || isDef$3(dynamicClass)) {
    return concat$1(staticClass, stringifyClass$1(dynamicClass));
  }
  return "";
}
function concat$1(a, b) {
  return a ? b ? a + " " + b : a : b || "";
}
function stringifyClass$1(value17) {
  if (Array.isArray(value17)) {
    return stringifyArray$1(value17);
  }
  if (isObject$3(value17)) {
    return stringifyObject$1(value17);
  }
  if (typeof value17 === "string") {
    return value17;
  }
  return "";
}
function stringifyArray$1(value17) {
  let res = "";
  let stringified;
  for (let i = 0, l = value17.length; i < l; i++) {
    if (isDef$3(stringified = stringifyClass$1(value17[i])) && stringified !== "") {
      if (res)
        res += " ";
      res += stringified;
    }
  }
  return res;
}
function stringifyObject$1(value17) {
  let res = "";
  for (const key in value17) {
    if (value17[key]) {
      if (res)
        res += " ";
      res += key;
    }
  }
  return res;
}
const namespaceMap$1 = {
  svg: "http://www.w3.org/2000/svg",
  math: "http://www.w3.org/1998/Math/MathML"
};
const isHTMLTag$1 = makeMap$1("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot");
const isSVG$1 = makeMap$1("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,foreignobject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view", true);
const isPreTag = (tag) => tag === "pre";
const isReservedTag$1 = (tag) => {
  return isHTMLTag$1(tag) || isSVG$1(tag);
};
function getTagNamespace$1(tag) {
  if (isSVG$1(tag)) {
    return "svg";
  }
  if (tag === "math") {
    return "math";
  }
}
const unknownElementCache$1 = /* @__PURE__ */ Object.create(null);
function isUnknownElement$1(tag) {
  if (!inBrowser$3) {
    return true;
  }
  if (isReservedTag$1(tag)) {
    return false;
  }
  tag = tag.toLowerCase();
  if (unknownElementCache$1[tag] != null) {
    return unknownElementCache$1[tag];
  }
  const el = document.createElement(tag);
  if (tag.indexOf("-") > -1) {
    return unknownElementCache$1[tag] = el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
  } else {
    return unknownElementCache$1[tag] = /HTMLUnknownElement/.test(el.toString());
  }
}
const isTextInputType$1 = makeMap$1("text,number,password,search,email,tel,url");
function query$1(el) {
  if (typeof el === "string") {
    const selected = document.querySelector(el);
    if (!selected) {
      warn$1("Cannot find element: " + el);
      return document.createElement("div");
    }
    return selected;
  } else {
    return el;
  }
}
function createElement$1$1(tagName2, vnode) {
  const elm = document.createElement(tagName2);
  if (tagName2 !== "select") {
    return elm;
  }
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== void 0) {
    elm.setAttribute("multiple", "multiple");
  }
  return elm;
}
function createElementNS$1(namespace2, tagName2) {
  return document.createElementNS(namespaceMap$1[namespace2], tagName2);
}
function createTextNode$1(text2) {
  return document.createTextNode(text2);
}
function createComment$1(text2) {
  return document.createComment(text2);
}
function insertBefore$1(parentNode2, newNode, referenceNode) {
  parentNode2.insertBefore(newNode, referenceNode);
}
function removeChild$1(node, child) {
  node.removeChild(child);
}
function appendChild$1(node, child) {
  node.appendChild(child);
}
function parentNode$1(node) {
  return node.parentNode;
}
function nextSibling$1(node) {
  return node.nextSibling;
}
function tagName$1(node) {
  return node.tagName;
}
function setTextContent$1(node, text2) {
  node.textContent = text2;
}
function setStyleScope$1(node, scopeId) {
  node.setAttribute(scopeId, "");
}
var nodeOps$1 = /* @__PURE__ */ Object.freeze({
  createElement: createElement$1$1,
  createElementNS: createElementNS$1,
  createTextNode: createTextNode$1,
  createComment: createComment$1,
  insertBefore: insertBefore$1,
  removeChild: removeChild$1,
  appendChild: appendChild$1,
  parentNode: parentNode$1,
  nextSibling: nextSibling$1,
  tagName: tagName$1,
  setTextContent: setTextContent$1,
  setStyleScope: setStyleScope$1
});
var ref$1 = {
  create(_2, vnode) {
    registerRef$1(vnode);
  },
  update(oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef$1(oldVnode, true);
      registerRef$1(vnode);
    }
  },
  destroy(vnode) {
    registerRef$1(vnode, true);
  }
};
function registerRef$1(vnode, isRemoval) {
  const key = vnode.data.ref;
  if (!isDef$3(key))
    return;
  const vm = vnode.context;
  const ref2 = vnode.componentInstance || vnode.elm;
  const refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove$3(refs[key], ref2);
    } else if (refs[key] === ref2) {
      refs[key] = void 0;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref2];
      } else if (refs[key].indexOf(ref2) < 0) {
        refs[key].push(ref2);
      }
    } else {
      refs[key] = ref2;
    }
  }
}
const emptyNode$1 = new VNode$1("", {}, []);
const hooks$1 = ["create", "activate", "update", "remove", "destroy"];
function sameVnode$1(a, b) {
  return a.key === b.key && a.asyncFactory === b.asyncFactory && (a.tag === b.tag && a.isComment === b.isComment && isDef$3(a.data) === isDef$3(b.data) && sameInputType$1(a, b) || isTrue$1(a.isAsyncPlaceholder) && isUndef$1(b.asyncFactory.error));
}
function sameInputType$1(a, b) {
  if (a.tag !== "input")
    return true;
  let i;
  const typeA = isDef$3(i = a.data) && isDef$3(i = i.attrs) && i.type;
  const typeB = isDef$3(i = b.data) && isDef$3(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType$1(typeA) && isTextInputType$1(typeB);
}
function createKeyToOldIdx$1(children3, beginIdx, endIdx) {
  let i, key;
  const map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children3[i].key;
    if (isDef$3(key))
      map[key] = i;
  }
  return map;
}
function createPatchFunction$1(backend) {
  let i, j;
  const cbs = {};
  const { modules: modules2, nodeOps: nodeOps2 } = backend;
  for (i = 0; i < hooks$1.length; ++i) {
    cbs[hooks$1[i]] = [];
    for (j = 0; j < modules2.length; ++j) {
      if (isDef$3(modules2[j][hooks$1[i]])) {
        cbs[hooks$1[i]].push(modules2[j][hooks$1[i]]);
      }
    }
  }
  function emptyNodeAt(elm) {
    return new VNode$1(nodeOps2.tagName(elm).toLowerCase(), {}, [], void 0, elm);
  }
  function createRmCb(childElm, listeners3) {
    function remove$$12() {
      if (--remove$$12.listeners === 0) {
        removeNode2(childElm);
      }
    }
    remove$$12.listeners = listeners3;
    return remove$$12;
  }
  function removeNode2(el) {
    const parent = nodeOps2.parentNode(el);
    if (isDef$3(parent)) {
      nodeOps2.removeChild(parent, el);
    }
  }
  function isUnknownElement$$1(vnode, inVPre) {
    return !inVPre && !vnode.ns && !(config$1.ignoredElements.length && config$1.ignoredElements.some((ignore) => {
      return isRegExp$1(ignore) ? ignore.test(vnode.tag) : ignore === vnode.tag;
    })) && config$1.isUnknownElement(vnode.tag);
  }
  let creatingElmInVPre = 0;
  function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested, ownerArray, index2) {
    if (isDef$3(vnode.elm) && isDef$3(ownerArray)) {
      vnode = ownerArray[index2] = cloneVNode$1(vnode);
    }
    vnode.isRootInsert = !nested;
    if (createComponent2(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return;
    }
    const data49 = vnode.data;
    const children3 = vnode.children;
    const tag = vnode.tag;
    if (isDef$3(tag)) {
      {
        if (data49 && data49.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn$1("Unknown custom element: <" + tag + '> - did you register the component correctly? For recursive components, make sure to provide the "name" option.', vnode.context);
        }
      }
      vnode.elm = vnode.ns ? nodeOps2.createElementNS(vnode.ns, tag) : nodeOps2.createElement(tag, vnode);
      setScope(vnode);
      {
        createChildren(vnode, children3, insertedVnodeQueue);
        if (isDef$3(data49)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert2(parentElm, vnode.elm, refElm);
      }
      if (data49 && data49.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue$1(vnode.isComment)) {
      vnode.elm = nodeOps2.createComment(vnode.text);
      insert2(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps2.createTextNode(vnode.text);
      insert2(parentElm, vnode.elm, refElm);
    }
  }
  function createComponent2(vnode, insertedVnodeQueue, parentElm, refElm) {
    let i2 = vnode.data;
    if (isDef$3(i2)) {
      const isReactivated = isDef$3(vnode.componentInstance) && i2.keepAlive;
      if (isDef$3(i2 = i2.hook) && isDef$3(i2 = i2.init)) {
        i2(vnode, false);
      }
      if (isDef$3(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        insert2(parentElm, vnode.elm, refElm);
        if (isTrue$1(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true;
      }
    }
  }
  function initComponent(vnode, insertedVnodeQueue) {
    if (isDef$3(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      registerRef$1(vnode);
      insertedVnodeQueue.push(vnode);
    }
  }
  function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    let i2;
    let innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef$3(i2 = innerNode.data) && isDef$3(i2 = i2.transition)) {
        for (i2 = 0; i2 < cbs.activate.length; ++i2) {
          cbs.activate[i2](emptyNode$1, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break;
      }
    }
    insert2(parentElm, vnode.elm, refElm);
  }
  function insert2(parent, elm, ref$$1) {
    if (isDef$3(parent)) {
      if (isDef$3(ref$$1)) {
        if (nodeOps2.parentNode(ref$$1) === parent) {
          nodeOps2.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps2.appendChild(parent, elm);
      }
    }
  }
  function createChildren(vnode, children3, insertedVnodeQueue) {
    if (Array.isArray(children3)) {
      {
        checkDuplicateKeys(children3);
      }
      for (let i2 = 0; i2 < children3.length; ++i2) {
        createElm(children3[i2], insertedVnodeQueue, vnode.elm, null, true, children3, i2);
      }
    } else if (isPrimitive$1(vnode.text)) {
      nodeOps2.appendChild(vnode.elm, nodeOps2.createTextNode(String(vnode.text)));
    }
  }
  function isPatchable(vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef$3(vnode.tag);
  }
  function invokeCreateHooks(vnode, insertedVnodeQueue) {
    for (let i2 = 0; i2 < cbs.create.length; ++i2) {
      cbs.create[i2](emptyNode$1, vnode);
    }
    i = vnode.data.hook;
    if (isDef$3(i)) {
      if (isDef$3(i.create))
        i.create(emptyNode$1, vnode);
      if (isDef$3(i.insert))
        insertedVnodeQueue.push(vnode);
    }
  }
  function setScope(vnode) {
    let i2;
    if (isDef$3(i2 = vnode.fnScopeId)) {
      nodeOps2.setStyleScope(vnode.elm, i2);
    } else {
      let ancestor = vnode;
      while (ancestor) {
        if (isDef$3(i2 = ancestor.context) && isDef$3(i2 = i2.$options._scopeId)) {
          nodeOps2.setStyleScope(vnode.elm, i2);
        }
        ancestor = ancestor.parent;
      }
    }
    if (isDef$3(i2 = activeInstance$1) && i2 !== vnode.context && i2 !== vnode.fnContext && isDef$3(i2 = i2.$options._scopeId)) {
      nodeOps2.setStyleScope(vnode.elm, i2);
    }
  }
  function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }
  function invokeDestroyHook(vnode) {
    let i2, j2;
    const data49 = vnode.data;
    if (isDef$3(data49)) {
      if (isDef$3(i2 = data49.hook) && isDef$3(i2 = i2.destroy))
        i2(vnode);
      for (i2 = 0; i2 < cbs.destroy.length; ++i2)
        cbs.destroy[i2](vnode);
    }
    if (isDef$3(i2 = vnode.children)) {
      for (j2 = 0; j2 < vnode.children.length; ++j2) {
        invokeDestroyHook(vnode.children[j2]);
      }
    }
  }
  function removeVnodes(vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      const ch = vnodes[startIdx];
      if (isDef$3(ch)) {
        if (isDef$3(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else {
          removeNode2(ch.elm);
        }
      }
    }
  }
  function removeAndInvokeRemoveHook(vnode, rm) {
    if (isDef$3(rm) || isDef$3(vnode.data)) {
      let i2;
      const listeners3 = cbs.remove.length + 1;
      if (isDef$3(rm)) {
        rm.listeners += listeners3;
      } else {
        rm = createRmCb(vnode.elm, listeners3);
      }
      if (isDef$3(i2 = vnode.componentInstance) && isDef$3(i2 = i2._vnode) && isDef$3(i2.data)) {
        removeAndInvokeRemoveHook(i2, rm);
      }
      for (i2 = 0; i2 < cbs.remove.length; ++i2) {
        cbs.remove[i2](vnode, rm);
      }
      if (isDef$3(i2 = vnode.data.hook) && isDef$3(i2 = i2.remove)) {
        i2(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode2(vnode.elm);
    }
  }
  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    let oldStartIdx = 0;
    let newStartIdx = 0;
    let oldEndIdx = oldCh.length - 1;
    let oldStartVnode = oldCh[0];
    let oldEndVnode = oldCh[oldEndIdx];
    let newEndIdx = newCh.length - 1;
    let newStartVnode = newCh[0];
    let newEndVnode = newCh[newEndIdx];
    let oldKeyToIdx, idxInOld, vnodeToMove, refElm;
    const canMove = !removeOnly;
    {
      checkDuplicateKeys(newCh);
    }
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef$1(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx];
      } else if (isUndef$1(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode$1(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode$1(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode$1(oldStartVnode, newEndVnode)) {
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        canMove && nodeOps2.insertBefore(parentElm, oldStartVnode.elm, nodeOps2.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode$1(oldEndVnode, newStartVnode)) {
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        canMove && nodeOps2.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef$1(oldKeyToIdx))
          oldKeyToIdx = createKeyToOldIdx$1(oldCh, oldStartIdx, oldEndIdx);
        idxInOld = isDef$3(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef$1(idxInOld)) {
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode$1(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldCh[idxInOld] = void 0;
            canMove && nodeOps2.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef$1(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(oldCh, oldStartIdx, oldEndIdx);
    }
  }
  function checkDuplicateKeys(children3) {
    const seenKeys = {};
    for (let i2 = 0; i2 < children3.length; i2++) {
      const vnode = children3[i2];
      const key = vnode.key;
      if (isDef$3(key)) {
        if (seenKeys[key]) {
          warn$1(`Duplicate keys detected: '${key}'. This may cause an update error.`, vnode.context);
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }
  function findIdxInOld(node, oldCh, start4, end2) {
    for (let i2 = start4; i2 < end2; i2++) {
      const c = oldCh[i2];
      if (isDef$3(c) && sameVnode$1(node, c))
        return i2;
    }
  }
  function patchVnode(oldVnode, vnode, insertedVnodeQueue, ownerArray, index2, removeOnly) {
    if (oldVnode === vnode) {
      return;
    }
    if (isDef$3(vnode.elm) && isDef$3(ownerArray)) {
      vnode = ownerArray[index2] = cloneVNode$1(vnode);
    }
    const elm = vnode.elm = oldVnode.elm;
    if (isTrue$1(oldVnode.isAsyncPlaceholder)) {
      if (isDef$3(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return;
    }
    if (isTrue$1(vnode.isStatic) && isTrue$1(oldVnode.isStatic) && vnode.key === oldVnode.key && (isTrue$1(vnode.isCloned) || isTrue$1(vnode.isOnce))) {
      vnode.componentInstance = oldVnode.componentInstance;
      return;
    }
    let i2;
    const data49 = vnode.data;
    if (isDef$3(data49) && isDef$3(i2 = data49.hook) && isDef$3(i2 = i2.prepatch)) {
      i2(oldVnode, vnode);
    }
    const oldCh = oldVnode.children;
    const ch = vnode.children;
    if (isDef$3(data49) && isPatchable(vnode)) {
      for (i2 = 0; i2 < cbs.update.length; ++i2)
        cbs.update[i2](oldVnode, vnode);
      if (isDef$3(i2 = data49.hook) && isDef$3(i2 = i2.update))
        i2(oldVnode, vnode);
    }
    if (isUndef$1(vnode.text)) {
      if (isDef$3(oldCh) && isDef$3(ch)) {
        if (oldCh !== ch)
          updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
      } else if (isDef$3(ch)) {
        {
          checkDuplicateKeys(ch);
        }
        if (isDef$3(oldVnode.text))
          nodeOps2.setTextContent(elm, "");
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef$3(oldCh)) {
        removeVnodes(oldCh, 0, oldCh.length - 1);
      } else if (isDef$3(oldVnode.text)) {
        nodeOps2.setTextContent(elm, "");
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps2.setTextContent(elm, vnode.text);
    }
    if (isDef$3(data49)) {
      if (isDef$3(i2 = data49.hook) && isDef$3(i2 = i2.postpatch))
        i2(oldVnode, vnode);
    }
  }
  function invokeInsertHook(vnode, queue2, initial) {
    if (isTrue$1(initial) && isDef$3(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue2;
    } else {
      for (let i2 = 0; i2 < queue2.length; ++i2) {
        queue2[i2].data.hook.insert(queue2[i2]);
      }
    }
  }
  let hydrationBailed = false;
  const isRenderedModule = makeMap$1("attrs,class,staticClass,staticStyle,key");
  function hydrate(elm, vnode, insertedVnodeQueue, inVPre) {
    let i2;
    const { tag, data: data49, children: children3 } = vnode;
    inVPre = inVPre || data49 && data49.pre;
    vnode.elm = elm;
    if (isTrue$1(vnode.isComment) && isDef$3(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true;
    }
    {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false;
      }
    }
    if (isDef$3(data49)) {
      if (isDef$3(i2 = data49.hook) && isDef$3(i2 = i2.init))
        i2(vnode, true);
      if (isDef$3(i2 = vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        return true;
      }
    }
    if (isDef$3(tag)) {
      if (isDef$3(children3)) {
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children3, insertedVnodeQueue);
        } else {
          if (isDef$3(i2 = data49) && isDef$3(i2 = i2.domProps) && isDef$3(i2 = i2.innerHTML)) {
            if (i2 !== elm.innerHTML) {
              if (typeof console !== "undefined" && !hydrationBailed) {
                hydrationBailed = true;
                console.warn("Parent: ", elm);
                console.warn("server innerHTML: ", i2);
                console.warn("client innerHTML: ", elm.innerHTML);
              }
              return false;
            }
          } else {
            let childrenMatch = true;
            let childNode = elm.firstChild;
            for (let i3 = 0; i3 < children3.length; i3++) {
              if (!childNode || !hydrate(childNode, children3[i3], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break;
              }
              childNode = childNode.nextSibling;
            }
            if (!childrenMatch || childNode) {
              if (typeof console !== "undefined" && !hydrationBailed) {
                hydrationBailed = true;
                console.warn("Parent: ", elm);
                console.warn("Mismatching childNodes vs. VNodes: ", elm.childNodes, children3);
              }
              return false;
            }
          }
        }
      }
      if (isDef$3(data49)) {
        let fullInvoke = false;
        for (const key in data49) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break;
          }
        }
        if (!fullInvoke && data49["class"]) {
          traverse$1(data49["class"]);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true;
  }
  function assertNodeMatch(node, vnode, inVPre) {
    if (isDef$3(vnode.tag)) {
      return vnode.tag.indexOf("vue-component") === 0 || !isUnknownElement$$1(vnode, inVPre) && vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase());
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3);
    }
  }
  return function patch2(oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef$1(vnode)) {
      if (isDef$3(oldVnode))
        invokeDestroyHook(oldVnode);
      return;
    }
    let isInitialPatch = false;
    const insertedVnodeQueue = [];
    if (isUndef$1(oldVnode)) {
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue);
    } else {
      const isRealElement = isDef$3(oldVnode.nodeType);
      if (!isRealElement && sameVnode$1(oldVnode, vnode)) {
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
      } else {
        if (isRealElement) {
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR$1)) {
            oldVnode.removeAttribute(SSR_ATTR$1);
            hydrating = true;
          }
          if (isTrue$1(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode;
            } else {
              warn$1("The client-side rendered virtual DOM tree is not matching server-rendered content. This is likely caused by incorrect HTML markup, for example nesting block-level elements inside <p>, or missing <tbody>. Bailing hydration and performing full client-side render.");
            }
          }
          oldVnode = emptyNodeAt(oldVnode);
        }
        const oldElm = oldVnode.elm;
        const parentElm = nodeOps2.parentNode(oldElm);
        createElm(vnode, insertedVnodeQueue, oldElm._leaveCb ? null : parentElm, nodeOps2.nextSibling(oldElm));
        if (isDef$3(vnode.parent)) {
          let ancestor = vnode.parent;
          const patchable = isPatchable(vnode);
          while (ancestor) {
            for (let i2 = 0; i2 < cbs.destroy.length; ++i2) {
              cbs.destroy[i2](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (let i2 = 0; i2 < cbs.create.length; ++i2) {
                cbs.create[i2](emptyNode$1, ancestor);
              }
              const insert3 = ancestor.data.hook.insert;
              if (insert3.merged) {
                for (let i2 = 1; i2 < insert3.fns.length; i2++) {
                  insert3.fns[i2]();
                }
              }
            } else {
              registerRef$1(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }
        if (isDef$3(parentElm)) {
          removeVnodes([oldVnode], 0, 0);
        } else if (isDef$3(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }
    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm;
  };
}
var directives$1 = {
  create: updateDirectives$1,
  update: updateDirectives$1,
  destroy: function unbindDirectives(vnode) {
    updateDirectives$1(vnode, emptyNode$1);
  }
};
function updateDirectives$1(oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update$1(oldVnode, vnode);
  }
}
function _update$1(oldVnode, vnode) {
  const isCreate = oldVnode === emptyNode$1;
  const isDestroy = vnode === emptyNode$1;
  const oldDirs = normalizeDirectives$1$1(oldVnode.data.directives, oldVnode.context);
  const newDirs = normalizeDirectives$1$1(vnode.data.directives, vnode.context);
  const dirsWithInsert = [];
  const dirsWithPostpatch = [];
  let key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      callHook$1$1(dir, "bind", vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      dir.oldValue = oldDir.value;
      dir.oldArg = oldDir.arg;
      callHook$1$1(dir, "update", vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }
  if (dirsWithInsert.length) {
    const callInsert = () => {
      for (let i = 0; i < dirsWithInsert.length; i++) {
        callHook$1$1(dirsWithInsert[i], "inserted", vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook$1(vnode, "insert", callInsert);
    } else {
      callInsert();
    }
  }
  if (dirsWithPostpatch.length) {
    mergeVNodeHook$1(vnode, "postpatch", () => {
      for (let i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1$1(dirsWithPostpatch[i], "componentUpdated", vnode, oldVnode);
      }
    });
  }
  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        callHook$1$1(oldDirs[key], "unbind", oldVnode, oldVnode, isDestroy);
      }
    }
  }
}
const emptyModifiers$1 = /* @__PURE__ */ Object.create(null);
function normalizeDirectives$1$1(dirs, vm) {
  const res = /* @__PURE__ */ Object.create(null);
  if (!dirs) {
    return res;
  }
  let i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      dir.modifiers = emptyModifiers$1;
    }
    res[getRawDirName$1(dir)] = dir;
    dir.def = resolveAsset$1(vm.$options, "directives", dir.name, true);
  }
  return res;
}
function getRawDirName$1(dir) {
  return dir.rawName || `${dir.name}.${Object.keys(dir.modifiers || {}).join(".")}`;
}
function callHook$1$1(dir, hook, vnode, oldVnode, isDestroy) {
  const fn2 = dir.def && dir.def[hook];
  if (fn2) {
    try {
      fn2(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError$1(e, vnode.context, `directive ${dir.name} ${hook} hook`);
    }
  }
}
var baseModules$1 = [
  ref$1,
  directives$1
];
function updateAttrs$1(oldVnode, vnode) {
  const opts = vnode.componentOptions;
  if (isDef$3(opts) && opts.Ctor.options.inheritAttrs === false) {
    return;
  }
  if (isUndef$1(oldVnode.data.attrs) && isUndef$1(vnode.data.attrs)) {
    return;
  }
  let key, cur, old;
  const elm = vnode.elm;
  const oldAttrs = oldVnode.data.attrs || {};
  let attrs2 = vnode.data.attrs || {};
  if (isDef$3(attrs2.__ob__)) {
    attrs2 = vnode.data.attrs = extend$1({}, attrs2);
  }
  for (key in attrs2) {
    cur = attrs2[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr$1(elm, key, cur, vnode.data.pre);
    }
  }
  if ((isIE$1 || isEdge$1) && attrs2.value !== oldAttrs.value) {
    setAttr$1(elm, "value", attrs2.value);
  }
  for (key in oldAttrs) {
    if (isUndef$1(attrs2[key])) {
      if (isXlink$1(key)) {
        elm.removeAttributeNS(xlinkNS$1, getXlinkProp$1(key));
      } else if (!isEnumeratedAttr$1(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}
function setAttr$1(el, key, value17, isInPre) {
  if (isInPre || el.tagName.indexOf("-") > -1) {
    baseSetAttr$1(el, key, value17);
  } else if (isBooleanAttr$1(key)) {
    if (isFalsyAttrValue$1(value17)) {
      el.removeAttribute(key);
    } else {
      value17 = key === "allowfullscreen" && el.tagName === "EMBED" ? "true" : key;
      el.setAttribute(key, value17);
    }
  } else if (isEnumeratedAttr$1(key)) {
    el.setAttribute(key, convertEnumeratedValue$1(key, value17));
  } else if (isXlink$1(key)) {
    if (isFalsyAttrValue$1(value17)) {
      el.removeAttributeNS(xlinkNS$1, getXlinkProp$1(key));
    } else {
      el.setAttributeNS(xlinkNS$1, key, value17);
    }
  } else {
    baseSetAttr$1(el, key, value17);
  }
}
function baseSetAttr$1(el, key, value17) {
  if (isFalsyAttrValue$1(value17)) {
    el.removeAttribute(key);
  } else {
    if (isIE$1 && !isIE9$1 && el.tagName === "TEXTAREA" && key === "placeholder" && value17 !== "" && !el.__ieph) {
      const blocker = (e) => {
        e.stopImmediatePropagation();
        el.removeEventListener("input", blocker);
      };
      el.addEventListener("input", blocker);
      el.__ieph = true;
    }
    el.setAttribute(key, value17);
  }
}
var attrs$1 = {
  create: updateAttrs$1,
  update: updateAttrs$1
};
function updateClass$1(oldVnode, vnode) {
  const el = vnode.elm;
  const data49 = vnode.data;
  const oldData = oldVnode.data;
  if (isUndef$1(data49.staticClass) && isUndef$1(data49.class) && (isUndef$1(oldData) || isUndef$1(oldData.staticClass) && isUndef$1(oldData.class))) {
    return;
  }
  let cls = genClassForVnode$1(vnode);
  const transitionClass = el._transitionClasses;
  if (isDef$3(transitionClass)) {
    cls = concat$1(cls, stringifyClass$1(transitionClass));
  }
  if (cls !== el._prevClass) {
    el.setAttribute("class", cls);
    el._prevClass = cls;
  }
}
var klass$1 = {
  create: updateClass$1,
  update: updateClass$1
};
const validDivisionCharRE = /[\w).+\-_$\]]/;
function parseFilters(exp) {
  let inSingle = false;
  let inDouble = false;
  let inTemplateString = false;
  let inRegex = false;
  let curly = 0;
  let square = 0;
  let paren = 0;
  let lastFilterIndex = 0;
  let c, prev3, i, expression, filters;
  for (i = 0; i < exp.length; i++) {
    prev3 = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 39 && prev3 !== 92)
        inSingle = false;
    } else if (inDouble) {
      if (c === 34 && prev3 !== 92)
        inDouble = false;
    } else if (inTemplateString) {
      if (c === 96 && prev3 !== 92)
        inTemplateString = false;
    } else if (inRegex) {
      if (c === 47 && prev3 !== 92)
        inRegex = false;
    } else if (c === 124 && exp.charCodeAt(i + 1) !== 124 && exp.charCodeAt(i - 1) !== 124 && !curly && !square && !paren) {
      if (expression === void 0) {
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 34:
          inDouble = true;
          break;
        case 39:
          inSingle = true;
          break;
        case 96:
          inTemplateString = true;
          break;
        case 40:
          paren++;
          break;
        case 41:
          paren--;
          break;
        case 91:
          square++;
          break;
        case 93:
          square--;
          break;
        case 123:
          curly++;
          break;
        case 125:
          curly--;
          break;
      }
      if (c === 47) {
        let j = i - 1;
        let p;
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== " ")
            break;
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }
  if (expression === void 0) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }
  function pushFilter() {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }
  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }
  return expression;
}
function wrapFilter(exp, filter) {
  const i = filter.indexOf("(");
  if (i < 0) {
    return `_f("${filter}")(${exp})`;
  } else {
    const name = filter.slice(0, i);
    const args = filter.slice(i + 1);
    return `_f("${name}")(${exp}${args !== ")" ? "," + args : args}`;
  }
}
function baseWarn(msg, range2) {
  console.error(`[Vue compiler]: ${msg}`);
}
function pluckModuleFunction(modules2, key) {
  return modules2 ? modules2.map((m) => m[key]).filter((_2) => _2) : [];
}
function addProp(el, name, value17, range2, dynamic) {
  (el.props || (el.props = [])).push(rangeSetItem({ name, value: value17, dynamic }, range2));
  el.plain = false;
}
function addAttr(el, name, value17, range2, dynamic) {
  const attrs2 = dynamic ? el.dynamicAttrs || (el.dynamicAttrs = []) : el.attrs || (el.attrs = []);
  attrs2.push(rangeSetItem({ name, value: value17, dynamic }, range2));
  el.plain = false;
}
function addRawAttr(el, name, value17, range2) {
  el.attrsMap[name] = value17;
  el.attrsList.push(rangeSetItem({ name, value: value17 }, range2));
}
function addDirective(el, name, rawName, value17, arg, isDynamicArg, modifiers, range2) {
  (el.directives || (el.directives = [])).push(rangeSetItem({
    name,
    rawName,
    value: value17,
    arg,
    isDynamicArg,
    modifiers
  }, range2));
  el.plain = false;
}
function prependModifierMarker(symbol, name, dynamic) {
  return dynamic ? `_p(${name},"${symbol}")` : symbol + name;
}
function addHandler(el, name, value17, modifiers, important, warn2, range2, dynamic) {
  modifiers = modifiers || emptyObject$1;
  if (warn2 && modifiers.prevent && modifiers.passive) {
    warn2("passive and prevent can't be used together. Passive handler can't prevent default event.", range2);
  }
  if (modifiers.right) {
    if (dynamic) {
      name = `(${name})==='click'?'contextmenu':(${name})`;
    } else if (name === "click") {
      name = "contextmenu";
      delete modifiers.right;
    }
  } else if (modifiers.middle) {
    if (dynamic) {
      name = `(${name})==='click'?'mouseup':(${name})`;
    } else if (name === "click") {
      name = "mouseup";
    }
  }
  if (modifiers.capture) {
    delete modifiers.capture;
    name = prependModifierMarker("!", name, dynamic);
  }
  if (modifiers.once) {
    delete modifiers.once;
    name = prependModifierMarker("~", name, dynamic);
  }
  if (modifiers.passive) {
    delete modifiers.passive;
    name = prependModifierMarker("&", name, dynamic);
  }
  let events2;
  if (modifiers.native) {
    delete modifiers.native;
    events2 = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events2 = el.events || (el.events = {});
  }
  const newHandler = rangeSetItem({ value: value17.trim(), dynamic }, range2);
  if (modifiers !== emptyObject$1) {
    newHandler.modifiers = modifiers;
  }
  const handlers = events2[name];
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events2[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events2[name] = newHandler;
  }
  el.plain = false;
}
function getRawBindingAttr(el, name) {
  return el.rawAttrsMap[":" + name] || el.rawAttrsMap["v-bind:" + name] || el.rawAttrsMap[name];
}
function getBindingAttr(el, name, getStatic) {
  const dynamicValue = getAndRemoveAttr(el, ":" + name) || getAndRemoveAttr(el, "v-bind:" + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue);
  } else if (getStatic !== false) {
    const staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue);
    }
  }
}
function getAndRemoveAttr(el, name, removeFromMap) {
  let val;
  if ((val = el.attrsMap[name]) != null) {
    const list2 = el.attrsList;
    for (let i = 0, l = list2.length; i < l; i++) {
      if (list2[i].name === name) {
        list2.splice(i, 1);
        break;
      }
    }
  }
  if (removeFromMap) {
    delete el.attrsMap[name];
  }
  return val;
}
function getAndRemoveAttrByRegex(el, name) {
  const list2 = el.attrsList;
  for (let i = 0, l = list2.length; i < l; i++) {
    const attr = list2[i];
    if (name.test(attr.name)) {
      list2.splice(i, 1);
      return attr;
    }
  }
}
function rangeSetItem(item, range2) {
  if (range2) {
    if (range2.start != null) {
      item.start = range2.start;
    }
    if (range2.end != null) {
      item.end = range2.end;
    }
  }
  return item;
}
function genComponentModel(el, value17, modifiers) {
  const { number: number2, trim } = modifiers || {};
  const baseValueExpression = "$$v";
  let valueExpression = baseValueExpression;
  if (trim) {
    valueExpression = `(typeof ${baseValueExpression} === 'string'? ${baseValueExpression}.trim(): ${baseValueExpression})`;
  }
  if (number2) {
    valueExpression = `_n(${valueExpression})`;
  }
  const assignment = genAssignmentCode(value17, valueExpression);
  el.model = {
    value: `(${value17})`,
    expression: JSON.stringify(value17),
    callback: `function (${baseValueExpression}) {${assignment}}`
  };
}
function genAssignmentCode(value17, assignment) {
  const res = parseModel(value17);
  if (res.key === null) {
    return `${value17}=${assignment}`;
  } else {
    return `$set(${res.exp}, ${res.key}, ${assignment})`;
  }
}
let len, str, chr, index$1$1, expressionPos, expressionEndPos;
function parseModel(val) {
  val = val.trim();
  len = val.length;
  if (val.indexOf("[") < 0 || val.lastIndexOf("]") < len - 1) {
    index$1$1 = val.lastIndexOf(".");
    if (index$1$1 > -1) {
      return {
        exp: val.slice(0, index$1$1),
        key: '"' + val.slice(index$1$1 + 1) + '"'
      };
    } else {
      return {
        exp: val,
        key: null
      };
    }
  }
  str = val;
  index$1$1 = expressionPos = expressionEndPos = 0;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 91) {
      parseBracket(chr);
    }
  }
  return {
    exp: val.slice(0, expressionPos),
    key: val.slice(expressionPos + 1, expressionEndPos)
  };
}
function next() {
  return str.charCodeAt(++index$1$1);
}
function eof() {
  return index$1$1 >= len;
}
function isStringStart(chr2) {
  return chr2 === 34 || chr2 === 39;
}
function parseBracket(chr2) {
  let inBracket = 1;
  expressionPos = index$1$1;
  while (!eof()) {
    chr2 = next();
    if (isStringStart(chr2)) {
      parseString(chr2);
      continue;
    }
    if (chr2 === 91)
      inBracket++;
    if (chr2 === 93)
      inBracket--;
    if (inBracket === 0) {
      expressionEndPos = index$1$1;
      break;
    }
  }
}
function parseString(chr2) {
  const stringQuote = chr2;
  while (!eof()) {
    chr2 = next();
    if (chr2 === stringQuote) {
      break;
    }
  }
}
let warn$1$1;
const RANGE_TOKEN$1 = "__r";
const CHECKBOX_RADIO_TOKEN$1 = "__c";
function model(el, dir, _warn) {
  warn$1$1 = _warn;
  const value17 = dir.value;
  const modifiers = dir.modifiers;
  const tag = el.tag;
  const type2 = el.attrsMap.type;
  {
    if (tag === "input" && type2 === "file") {
      warn$1$1(`<${el.tag} v-model="${value17}" type="file">:
File inputs are read only. Use a v-on:change listener instead.`, el.rawAttrsMap["v-model"]);
    }
  }
  if (el.component) {
    genComponentModel(el, value17, modifiers);
    return false;
  } else if (tag === "select") {
    genSelect(el, value17, modifiers);
  } else if (tag === "input" && type2 === "checkbox") {
    genCheckboxModel(el, value17, modifiers);
  } else if (tag === "input" && type2 === "radio") {
    genRadioModel(el, value17, modifiers);
  } else if (tag === "input" || tag === "textarea") {
    genDefaultModel(el, value17, modifiers);
  } else if (!config$1.isReservedTag(tag)) {
    genComponentModel(el, value17, modifiers);
    return false;
  } else {
    warn$1$1(`<${el.tag} v-model="${value17}">: v-model is not supported on this element type. If you are working with contenteditable, it's recommended to wrap a library dedicated for that purpose inside a custom component.`, el.rawAttrsMap["v-model"]);
  }
  return true;
}
function genCheckboxModel(el, value17, modifiers) {
  const number2 = modifiers && modifiers.number;
  const valueBinding = getBindingAttr(el, "value") || "null";
  const trueValueBinding = getBindingAttr(el, "true-value") || "true";
  const falseValueBinding = getBindingAttr(el, "false-value") || "false";
  addProp(el, "checked", `Array.isArray(${value17})?_i(${value17},${valueBinding})>-1` + (trueValueBinding === "true" ? `:(${value17})` : `:_q(${value17},${trueValueBinding})`));
  addHandler(el, "change", `var $$a=${value17},$$el=$event.target,$$c=$$el.checked?(${trueValueBinding}):(${falseValueBinding});if(Array.isArray($$a)){var $$v=${number2 ? "_n(" + valueBinding + ")" : valueBinding},$$i=_i($$a,$$v);if($$el.checked){$$i<0&&(${genAssignmentCode(value17, "$$a.concat([$$v])")})}else{$$i>-1&&(${genAssignmentCode(value17, "$$a.slice(0,$$i).concat($$a.slice($$i+1))")})}}else{${genAssignmentCode(value17, "$$c")}}`, null, true);
}
function genRadioModel(el, value17, modifiers) {
  const number2 = modifiers && modifiers.number;
  let valueBinding = getBindingAttr(el, "value") || "null";
  valueBinding = number2 ? `_n(${valueBinding})` : valueBinding;
  addProp(el, "checked", `_q(${value17},${valueBinding})`);
  addHandler(el, "change", genAssignmentCode(value17, valueBinding), null, true);
}
function genSelect(el, value17, modifiers) {
  const number2 = modifiers && modifiers.number;
  const selectedVal = `Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return ${number2 ? "_n(val)" : "val"}})`;
  const assignment = "$event.target.multiple ? $$selectedVal : $$selectedVal[0]";
  let code2 = `var $$selectedVal = ${selectedVal};`;
  code2 = `${code2} ${genAssignmentCode(value17, assignment)}`;
  addHandler(el, "change", code2, null, true);
}
function genDefaultModel(el, value17, modifiers) {
  const type2 = el.attrsMap.type;
  {
    const value18 = el.attrsMap["v-bind:value"] || el.attrsMap[":value"];
    const typeBinding = el.attrsMap["v-bind:type"] || el.attrsMap[":type"];
    if (value18 && !typeBinding) {
      const binding = el.attrsMap["v-bind:value"] ? "v-bind:value" : ":value";
      warn$1$1(`${binding}="${value18}" conflicts with v-model on the same element because the latter already expands to a value binding internally`, el.rawAttrsMap[binding]);
    }
  }
  const { lazy, number: number2, trim } = modifiers || {};
  const needCompositionGuard = !lazy && type2 !== "range";
  const event = lazy ? "change" : type2 === "range" ? RANGE_TOKEN$1 : "input";
  let valueExpression = "$event.target.value";
  if (trim) {
    valueExpression = `$event.target.value.trim()`;
  }
  if (number2) {
    valueExpression = `_n(${valueExpression})`;
  }
  let code2 = genAssignmentCode(value17, valueExpression);
  if (needCompositionGuard) {
    code2 = `if($event.target.composing)return;${code2}`;
  }
  addProp(el, "value", `(${value17})`);
  addHandler(el, event, code2, null, true);
  if (trim || number2) {
    addHandler(el, "blur", "$forceUpdate()");
  }
}
function normalizeEvents$1(on2) {
  if (isDef$3(on2[RANGE_TOKEN$1])) {
    const event = isIE$1 ? "change" : "input";
    on2[event] = [].concat(on2[RANGE_TOKEN$1], on2[event] || []);
    delete on2[RANGE_TOKEN$1];
  }
  if (isDef$3(on2[CHECKBOX_RADIO_TOKEN$1])) {
    on2.change = [].concat(on2[CHECKBOX_RADIO_TOKEN$1], on2.change || []);
    delete on2[CHECKBOX_RADIO_TOKEN$1];
  }
}
let target$1$1;
function createOnceHandler$1$1(event, handler4, capture) {
  const _target = target$1$1;
  return function onceHandler() {
    const res = handler4.apply(null, arguments);
    if (res !== null) {
      remove$2$1(event, onceHandler, capture, _target);
    }
  };
}
const useMicrotaskFix$1 = isUsingMicroTask$1 && !(isFF$1 && Number(isFF$1[1]) <= 53);
function add$1$1(name, handler4, capture, passive2) {
  if (useMicrotaskFix$1) {
    const attachedTimestamp = currentFlushTimestamp$1;
    const original = handler4;
    handler4 = original._wrapper = function(e) {
      if (e.target === e.currentTarget || e.timeStamp >= attachedTimestamp || e.timeStamp <= 0 || e.target.ownerDocument !== document) {
        return original.apply(this, arguments);
      }
    };
  }
  target$1$1.addEventListener(name, handler4, supportsPassive$2 ? { capture, passive: passive2 } : capture);
}
function remove$2$1(name, handler4, capture, _target) {
  (_target || target$1$1).removeEventListener(name, handler4._wrapper || handler4, capture);
}
function updateDOMListeners$1(oldVnode, vnode) {
  if (isUndef$1(oldVnode.data.on) && isUndef$1(vnode.data.on)) {
    return;
  }
  const on2 = vnode.data.on || {};
  const oldOn = oldVnode.data.on || {};
  target$1$1 = vnode.elm;
  normalizeEvents$1(on2);
  updateListeners$1(on2, oldOn, add$1$1, remove$2$1, createOnceHandler$1$1, vnode.context);
  target$1$1 = void 0;
}
var events$1 = {
  create: updateDOMListeners$1,
  update: updateDOMListeners$1
};
let svgContainer$1;
function updateDOMProps$1(oldVnode, vnode) {
  if (isUndef$1(oldVnode.data.domProps) && isUndef$1(vnode.data.domProps)) {
    return;
  }
  let key, cur;
  const elm = vnode.elm;
  const oldProps = oldVnode.data.domProps || {};
  let props2 = vnode.data.domProps || {};
  if (isDef$3(props2.__ob__)) {
    props2 = vnode.data.domProps = extend$1({}, props2);
  }
  for (key in oldProps) {
    if (!(key in props2)) {
      elm[key] = "";
    }
  }
  for (key in props2) {
    cur = props2[key];
    if (key === "textContent" || key === "innerHTML") {
      if (vnode.children)
        vnode.children.length = 0;
      if (cur === oldProps[key])
        continue;
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }
    if (key === "value" && elm.tagName !== "PROGRESS") {
      elm._value = cur;
      const strCur = isUndef$1(cur) ? "" : String(cur);
      if (shouldUpdateValue$1(elm, strCur)) {
        elm.value = strCur;
      }
    } else if (key === "innerHTML" && isSVG$1(elm.tagName) && isUndef$1(elm.innerHTML)) {
      svgContainer$1 = svgContainer$1 || document.createElement("div");
      svgContainer$1.innerHTML = `<svg>${cur}</svg>`;
      const svg = svgContainer$1.firstChild;
      while (elm.firstChild) {
        elm.removeChild(elm.firstChild);
      }
      while (svg.firstChild) {
        elm.appendChild(svg.firstChild);
      }
    } else if (cur !== oldProps[key]) {
      try {
        elm[key] = cur;
      } catch (e) {
      }
    }
  }
}
function shouldUpdateValue$1(elm, checkVal) {
  return !elm.composing && (elm.tagName === "OPTION" || isNotInFocusAndDirty$1(elm, checkVal) || isDirtyWithModifiers$1(elm, checkVal));
}
function isNotInFocusAndDirty$1(elm, checkVal) {
  let notInFocus = true;
  try {
    notInFocus = document.activeElement !== elm;
  } catch (e) {
  }
  return notInFocus && elm.value !== checkVal;
}
function isDirtyWithModifiers$1(elm, newVal) {
  const value17 = elm.value;
  const modifiers = elm._vModifiers;
  if (isDef$3(modifiers)) {
    if (modifiers.number) {
      return toNumber$1(value17) !== toNumber$1(newVal);
    }
    if (modifiers.trim) {
      return value17.trim() !== newVal.trim();
    }
  }
  return value17 !== newVal;
}
var domProps$1 = {
  create: updateDOMProps$1,
  update: updateDOMProps$1
};
const parseStyleText$1 = cached$1(function(cssText) {
  const res = {};
  const listDelimiter = /;(?![^(]*\))/g;
  const propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function(item) {
    if (item) {
      const tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res;
});
function normalizeStyleData$1(data49) {
  const style12 = normalizeStyleBinding$1(data49.style);
  return data49.staticStyle ? extend$1(data49.staticStyle, style12) : style12;
}
function normalizeStyleBinding$1(bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject$1(bindingStyle);
  }
  if (typeof bindingStyle === "string") {
    return parseStyleText$1(bindingStyle);
  }
  return bindingStyle;
}
function getStyle$2(vnode, checkChild) {
  const res = {};
  let styleData;
  if (checkChild) {
    let childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode && childNode.data && (styleData = normalizeStyleData$1(childNode.data))) {
        extend$1(res, styleData);
      }
    }
  }
  if (styleData = normalizeStyleData$1(vnode.data)) {
    extend$1(res, styleData);
  }
  let parentNode2 = vnode;
  while (parentNode2 = parentNode2.parent) {
    if (parentNode2.data && (styleData = normalizeStyleData$1(parentNode2.data))) {
      extend$1(res, styleData);
    }
  }
  return res;
}
const cssVarRE$1 = /^--/;
const importantRE$1 = /\s*!important$/;
const setProp$1 = (el, name, val) => {
  if (cssVarRE$1.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE$1.test(val)) {
    el.style.setProperty(hyphenate$1(name), val.replace(importantRE$1, ""), "important");
  } else {
    const normalizedName = normalize$1(name);
    if (Array.isArray(val)) {
      for (let i = 0, len2 = val.length; i < len2; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};
const vendorNames$1 = ["Webkit", "Moz", "ms"];
let emptyStyle$1;
const normalize$1 = cached$1(function(prop) {
  emptyStyle$1 = emptyStyle$1 || document.createElement("div").style;
  prop = camelize$3(prop);
  if (prop !== "filter" && prop in emptyStyle$1) {
    return prop;
  }
  const capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (let i = 0; i < vendorNames$1.length; i++) {
    const name = vendorNames$1[i] + capName;
    if (name in emptyStyle$1) {
      return name;
    }
  }
});
function updateStyle$1(oldVnode, vnode) {
  const data49 = vnode.data;
  const oldData = oldVnode.data;
  if (isUndef$1(data49.staticStyle) && isUndef$1(data49.style) && isUndef$1(oldData.staticStyle) && isUndef$1(oldData.style)) {
    return;
  }
  let cur, name;
  const el = vnode.elm;
  const oldStaticStyle = oldData.staticStyle;
  const oldStyleBinding = oldData.normalizedStyle || oldData.style || {};
  const oldStyle = oldStaticStyle || oldStyleBinding;
  const style12 = normalizeStyleBinding$1(vnode.data.style) || {};
  vnode.data.normalizedStyle = isDef$3(style12.__ob__) ? extend$1({}, style12) : style12;
  const newStyle = getStyle$2(vnode, true);
  for (name in oldStyle) {
    if (isUndef$1(newStyle[name])) {
      setProp$1(el, name, "");
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      setProp$1(el, name, cur == null ? "" : cur);
    }
  }
}
var style$1 = {
  create: updateStyle$1,
  update: updateStyle$1
};
const whitespaceRE$1 = /\s+/;
function addClass$1(el, cls) {
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  if (el.classList) {
    if (cls.indexOf(" ") > -1) {
      cls.split(whitespaceRE$1).forEach((c) => el.classList.add(c));
    } else {
      el.classList.add(cls);
    }
  } else {
    const cur = ` ${el.getAttribute("class") || ""} `;
    if (cur.indexOf(" " + cls + " ") < 0) {
      el.setAttribute("class", (cur + cls).trim());
    }
  }
}
function removeClass$1(el, cls) {
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  if (el.classList) {
    if (cls.indexOf(" ") > -1) {
      cls.split(whitespaceRE$1).forEach((c) => el.classList.remove(c));
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute("class");
    }
  } else {
    let cur = ` ${el.getAttribute("class") || ""} `;
    const tar = " " + cls + " ";
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, " ");
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute("class", cur);
    } else {
      el.removeAttribute("class");
    }
  }
}
function resolveTransition$1(def$$1) {
  if (!def$$1) {
    return;
  }
  if (typeof def$$1 === "object") {
    const res = {};
    if (def$$1.css !== false) {
      extend$1(res, autoCssTransition$1(def$$1.name || "v"));
    }
    extend$1(res, def$$1);
    return res;
  } else if (typeof def$$1 === "string") {
    return autoCssTransition$1(def$$1);
  }
}
const autoCssTransition$1 = cached$1((name) => {
  return {
    enterClass: `${name}-enter`,
    enterToClass: `${name}-enter-to`,
    enterActiveClass: `${name}-enter-active`,
    leaveClass: `${name}-leave`,
    leaveToClass: `${name}-leave-to`,
    leaveActiveClass: `${name}-leave-active`
  };
});
const hasTransition$1 = inBrowser$3 && !isIE9$1;
const TRANSITION$1 = "transition";
const ANIMATION$1 = "animation";
let transitionProp$1 = "transition";
let transitionEndEvent$1 = "transitionend";
let animationProp$1 = "animation";
let animationEndEvent$1 = "animationend";
if (hasTransition$1) {
  if (window.ontransitionend === void 0 && window.onwebkittransitionend !== void 0) {
    transitionProp$1 = "WebkitTransition";
    transitionEndEvent$1 = "webkitTransitionEnd";
  }
  if (window.onanimationend === void 0 && window.onwebkitanimationend !== void 0) {
    animationProp$1 = "WebkitAnimation";
    animationEndEvent$1 = "webkitAnimationEnd";
  }
}
const raf$2 = inBrowser$3 ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout : (fn2) => fn2();
function nextFrame$1(fn2) {
  raf$2(() => {
    raf$2(fn2);
  });
}
function addTransitionClass$1(el, cls) {
  const transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass$1(el, cls);
  }
}
function removeTransitionClass$1(el, cls) {
  if (el._transitionClasses) {
    remove$3(el._transitionClasses, cls);
  }
  removeClass$1(el, cls);
}
function whenTransitionEnds$1(el, expectedType, cb) {
  const { type: type2, timeout, propCount } = getTransitionInfo$1(el, expectedType);
  if (!type2)
    return cb();
  const event = type2 === TRANSITION$1 ? transitionEndEvent$1 : animationEndEvent$1;
  let ended = 0;
  const end2 = () => {
    el.removeEventListener(event, onEnd);
    cb();
  };
  const onEnd = (e) => {
    if (e.target === el) {
      if (++ended >= propCount) {
        end2();
      }
    }
  };
  setTimeout(() => {
    if (ended < propCount) {
      end2();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}
const transformRE$1 = /\b(transform|all)(,|$)/;
function getTransitionInfo$1(el, expectedType) {
  const styles = window.getComputedStyle(el);
  const transitionDelays = (styles[transitionProp$1 + "Delay"] || "").split(", ");
  const transitionDurations = (styles[transitionProp$1 + "Duration"] || "").split(", ");
  const transitionTimeout = getTimeout$1(transitionDelays, transitionDurations);
  const animationDelays = (styles[animationProp$1 + "Delay"] || "").split(", ");
  const animationDurations = (styles[animationProp$1 + "Duration"] || "").split(", ");
  const animationTimeout = getTimeout$1(animationDelays, animationDurations);
  let type2;
  let timeout = 0;
  let propCount = 0;
  if (expectedType === TRANSITION$1) {
    if (transitionTimeout > 0) {
      type2 = TRANSITION$1;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION$1) {
    if (animationTimeout > 0) {
      type2 = ANIMATION$1;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type2 = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION$1 : ANIMATION$1 : null;
    propCount = type2 ? type2 === TRANSITION$1 ? transitionDurations.length : animationDurations.length : 0;
  }
  const hasTransform = type2 === TRANSITION$1 && transformRE$1.test(styles[transitionProp$1 + "Property"]);
  return {
    type: type2,
    timeout,
    propCount,
    hasTransform
  };
}
function getTimeout$1(delays, durations) {
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }
  return Math.max.apply(null, durations.map((d, i) => {
    return toMs$1(d) + toMs$1(delays[i]);
  }));
}
function toMs$1(s) {
  return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
}
function enter$1(vnode, toggleDisplay) {
  const el = vnode.elm;
  if (isDef$3(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }
  const data49 = resolveTransition$1(vnode.data.transition);
  if (isUndef$1(data49)) {
    return;
  }
  if (isDef$3(el._enterCb) || el.nodeType !== 1) {
    return;
  }
  const {
    css,
    type: type2,
    enterClass,
    enterToClass,
    enterActiveClass,
    appearClass,
    appearToClass,
    appearActiveClass,
    beforeEnter,
    enter: enter2,
    afterEnter,
    enterCancelled,
    beforeAppear,
    appear,
    afterAppear,
    appearCancelled,
    duration
  } = data49;
  let context2 = activeInstance$1;
  let transitionNode = activeInstance$1.$vnode;
  while (transitionNode && transitionNode.parent) {
    context2 = transitionNode.context;
    transitionNode = transitionNode.parent;
  }
  const isAppear = !context2._isMounted || !vnode.isRootInsert;
  if (isAppear && !appear && appear !== "") {
    return;
  }
  const startClass = isAppear && appearClass ? appearClass : enterClass;
  const activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
  const toClass = isAppear && appearToClass ? appearToClass : enterToClass;
  const beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
  const enterHook = isAppear ? typeof appear === "function" ? appear : enter2 : enter2;
  const afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
  const enterCancelledHook = isAppear ? appearCancelled || enterCancelled : enterCancelled;
  const explicitEnterDuration = toNumber$1(isObject$3(duration) ? duration.enter : duration);
  if (explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, "enter", vnode);
  }
  const expectsCSS = css !== false && !isIE9$1;
  const userWantsControl = getHookArgumentsLength$1(enterHook);
  const cb = el._enterCb = once$1(() => {
    if (expectsCSS) {
      removeTransitionClass$1(el, toClass);
      removeTransitionClass$1(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass$1(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });
  if (!vnode.data.show) {
    mergeVNodeHook$1(vnode, "insert", () => {
      const parent = el.parentNode;
      const pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass$1(el, startClass);
    addTransitionClass$1(el, activeClass);
    nextFrame$1(() => {
      removeTransitionClass$1(el, startClass);
      if (!cb.cancelled) {
        addTransitionClass$1(el, toClass);
        if (!userWantsControl) {
          if (isValidDuration$1(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds$1(el, type2, cb);
          }
        }
      }
    });
  }
  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }
  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}
function leave$1(vnode, rm) {
  const el = vnode.elm;
  if (isDef$3(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }
  const data49 = resolveTransition$1(vnode.data.transition);
  if (isUndef$1(data49) || el.nodeType !== 1) {
    return rm();
  }
  if (isDef$3(el._leaveCb)) {
    return;
  }
  const {
    css,
    type: type2,
    leaveClass,
    leaveToClass,
    leaveActiveClass,
    beforeLeave,
    leave: leave2,
    afterLeave,
    leaveCancelled,
    delayLeave,
    duration
  } = data49;
  const expectsCSS = css !== false && !isIE9$1;
  const userWantsControl = getHookArgumentsLength$1(leave2);
  const explicitLeaveDuration = toNumber$1(isObject$3(duration) ? duration.leave : duration);
  if (isDef$3(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, "leave", vnode);
  }
  const cb = el._leaveCb = once$1(() => {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass$1(el, leaveToClass);
      removeTransitionClass$1(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass$1(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });
  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }
  function performLeave() {
    if (cb.cancelled) {
      return;
    }
    if (!vnode.data.show && el.parentNode) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass$1(el, leaveClass);
      addTransitionClass$1(el, leaveActiveClass);
      nextFrame$1(() => {
        removeTransitionClass$1(el, leaveClass);
        if (!cb.cancelled) {
          addTransitionClass$1(el, leaveToClass);
          if (!userWantsControl) {
            if (isValidDuration$1(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds$1(el, type2, cb);
            }
          }
        }
      });
    }
    leave2 && leave2(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}
function checkDuration(val, name, vnode) {
  if (typeof val !== "number") {
    warn$1(`<transition> explicit ${name} duration is not a valid number - got ${JSON.stringify(val)}.`, vnode.context);
  } else if (isNaN(val)) {
    warn$1(`<transition> explicit ${name} duration is NaN - the duration expression might be incorrect.`, vnode.context);
  }
}
function isValidDuration$1(val) {
  return typeof val === "number" && !isNaN(val);
}
function getHookArgumentsLength$1(fn2) {
  if (isUndef$1(fn2)) {
    return false;
  }
  const invokerFns = fn2.fns;
  if (isDef$3(invokerFns)) {
    return getHookArgumentsLength$1(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
  } else {
    return (fn2._length || fn2.length) > 1;
  }
}
function _enter$1(_2, vnode) {
  if (vnode.data.show !== true) {
    enter$1(vnode);
  }
}
var transition$1 = inBrowser$3 ? {
  create: _enter$1,
  activate: _enter$1,
  remove(vnode, rm) {
    if (vnode.data.show !== true) {
      leave$1(vnode, rm);
    } else {
      rm();
    }
  }
} : {};
var platformModules$1 = [
  attrs$1,
  klass$1,
  events$1,
  domProps$1,
  style$1,
  transition$1
];
const modules$1 = platformModules$1.concat(baseModules$1);
const patch$1 = createPatchFunction$1({ nodeOps: nodeOps$1, modules: modules$1 });
if (isIE9$1) {
  document.addEventListener("selectionchange", () => {
    const el = document.activeElement;
    if (el && el.vmodel) {
      trigger$1(el, "input");
    }
  });
}
const directive$1 = {
  inserted(el, binding, vnode, oldVnode) {
    if (vnode.tag === "select") {
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook$1(vnode, "postpatch", () => {
          directive$1.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected$1(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue$1);
    } else if (vnode.tag === "textarea" || isTextInputType$1(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        el.addEventListener("compositionstart", onCompositionStart$1);
        el.addEventListener("compositionend", onCompositionEnd$1);
        el.addEventListener("change", onCompositionEnd$1);
        if (isIE9$1) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated(el, binding, vnode) {
    if (vnode.tag === "select") {
      setSelected$1(el, binding, vnode.context);
      const prevOptions = el._vOptions;
      const curOptions = el._vOptions = [].map.call(el.options, getValue$1);
      if (curOptions.some((o, i) => !looseEqual$1(o, prevOptions[i]))) {
        const needReset = el.multiple ? binding.value.some((v) => hasNoMatchingOption$1(v, curOptions)) : binding.value !== binding.oldValue && hasNoMatchingOption$1(binding.value, curOptions);
        if (needReset) {
          trigger$1(el, "change");
        }
      }
    }
  }
};
function setSelected$1(el, binding, vm) {
  actuallySetSelected$1(el, binding, vm);
  if (isIE$1 || isEdge$1) {
    setTimeout(() => {
      actuallySetSelected$1(el, binding, vm);
    }, 0);
  }
}
function actuallySetSelected$1(el, binding, vm) {
  const value17 = binding.value;
  const isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value17)) {
    warn$1(`<select multiple v-model="${binding.expression}"> expects an Array value for its binding, but got ${Object.prototype.toString.call(value17).slice(8, -1)}`, vm);
    return;
  }
  let selected, option;
  for (let i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf$1(value17, getValue$1(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual$1(getValue$1(option), value17)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return;
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}
function hasNoMatchingOption$1(value17, options) {
  return options.every((o) => !looseEqual$1(o, value17));
}
function getValue$1(option) {
  return "_value" in option ? option._value : option.value;
}
function onCompositionStart$1(e) {
  e.target.composing = true;
}
function onCompositionEnd$1(e) {
  if (!e.target.composing)
    return;
  e.target.composing = false;
  trigger$1(e.target, "input");
}
function trigger$1(el, type2) {
  const e = document.createEvent("HTMLEvents");
  e.initEvent(type2, true, true);
  el.dispatchEvent(e);
}
function locateNode$1(vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition) ? locateNode$1(vnode.componentInstance._vnode) : vnode;
}
var show$1 = {
  bind(el, { value: value17 }, vnode) {
    vnode = locateNode$1(vnode);
    const transition$$1 = vnode.data && vnode.data.transition;
    const originalDisplay = el.__vOriginalDisplay = el.style.display === "none" ? "" : el.style.display;
    if (value17 && transition$$1) {
      vnode.data.show = true;
      enter$1(vnode, () => {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value17 ? originalDisplay : "none";
    }
  },
  update(el, { value: value17, oldValue }, vnode) {
    if (!value17 === !oldValue)
      return;
    vnode = locateNode$1(vnode);
    const transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value17) {
        enter$1(vnode, () => {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave$1(vnode, () => {
          el.style.display = "none";
        });
      }
    } else {
      el.style.display = value17 ? el.__vOriginalDisplay : "none";
    }
  },
  unbind(el, binding, vnode, oldVnode, isDestroy) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};
var platformDirectives$1 = {
  model: directive$1,
  show: show$1
};
const transitionProps$1 = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};
function getRealChild$1(vnode) {
  const compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild$1(getFirstComponentChild$1(compOptions.children));
  } else {
    return vnode;
  }
}
function extractTransitionData$1(comp) {
  const data49 = {};
  const options = comp.$options;
  for (const key in options.propsData) {
    data49[key] = comp[key];
  }
  const listeners3 = options._parentListeners;
  for (const key in listeners3) {
    data49[camelize$3(key)] = listeners3[key];
  }
  return data49;
}
function placeholder$1(h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h("keep-alive", {
      props: rawChild.componentOptions.propsData
    });
  }
}
function hasParentTransition$1(vnode) {
  while (vnode = vnode.parent) {
    if (vnode.data.transition) {
      return true;
    }
  }
}
function isSameChild$1(child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag;
}
const isNotTextNode$1 = (c) => c.tag || isAsyncPlaceholder$1(c);
const isVShowDirective$1 = (d) => d.name === "show";
var Transition$1 = {
  name: "transition",
  props: transitionProps$1,
  abstract: true,
  render(h) {
    let children3 = this.$slots.default;
    if (!children3) {
      return;
    }
    children3 = children3.filter(isNotTextNode$1);
    if (!children3.length) {
      return;
    }
    if (children3.length > 1) {
      warn$1("<transition> can only be used on a single element. Use <transition-group> for lists.", this.$parent);
    }
    const mode = this.mode;
    if (mode && mode !== "in-out" && mode !== "out-in") {
      warn$1("invalid <transition> mode: " + mode, this.$parent);
    }
    const rawChild = children3[0];
    if (hasParentTransition$1(this.$vnode)) {
      return rawChild;
    }
    const child = getRealChild$1(rawChild);
    if (!child) {
      return rawChild;
    }
    if (this._leaving) {
      return placeholder$1(h, rawChild);
    }
    const id = `__transition-${this._uid}-`;
    child.key = child.key == null ? child.isComment ? id + "comment" : id + child.tag : isPrimitive$1(child.key) ? String(child.key).indexOf(id) === 0 ? child.key : id + child.key : child.key;
    const data49 = (child.data || (child.data = {})).transition = extractTransitionData$1(this);
    const oldRawChild = this._vnode;
    const oldChild = getRealChild$1(oldRawChild);
    if (child.data.directives && child.data.directives.some(isVShowDirective$1)) {
      child.data.show = true;
    }
    if (oldChild && oldChild.data && !isSameChild$1(child, oldChild) && !isAsyncPlaceholder$1(oldChild) && !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)) {
      const oldData = oldChild.data.transition = extend$1({}, data49);
      if (mode === "out-in") {
        this._leaving = true;
        mergeVNodeHook$1(oldData, "afterLeave", () => {
          this._leaving = false;
          this.$forceUpdate();
        });
        return placeholder$1(h, rawChild);
      } else if (mode === "in-out") {
        if (isAsyncPlaceholder$1(child)) {
          return oldRawChild;
        }
        let delayedLeave;
        const performLeave = () => {
          delayedLeave();
        };
        mergeVNodeHook$1(data49, "afterEnter", performLeave);
        mergeVNodeHook$1(data49, "enterCancelled", performLeave);
        mergeVNodeHook$1(oldData, "delayLeave", (leave2) => {
          delayedLeave = leave2;
        });
      }
    }
    return rawChild;
  }
};
const props$1 = extend$1({
  tag: String,
  moveClass: String
}, transitionProps$1);
delete props$1.mode;
var TransitionGroup$1 = {
  props: props$1,
  beforeMount() {
    const update4 = this._update;
    this._update = (vnode, hydrating) => {
      const restoreActiveInstance = setActiveInstance$1(this);
      this.__patch__(this._vnode, this.kept, false, true);
      this._vnode = this.kept;
      restoreActiveInstance();
      update4.call(this, vnode, hydrating);
    };
  },
  render(h) {
    const tag = this.tag || this.$vnode.data.tag || "span";
    const map = /* @__PURE__ */ Object.create(null);
    const prevChildren = this.prevChildren = this.children;
    const rawChildren = this.$slots.default || [];
    const children3 = this.children = [];
    const transitionData = extractTransitionData$1(this);
    for (let i = 0; i < rawChildren.length; i++) {
      const c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf("__vlist") !== 0) {
          children3.push(c);
          map[c.key] = c;
          (c.data || (c.data = {})).transition = transitionData;
        } else {
          const opts = c.componentOptions;
          const name = opts ? opts.Ctor.options.name || opts.tag || "" : c.tag;
          warn$1(`<transition-group> children must be keyed: <${name}>`);
        }
      }
    }
    if (prevChildren) {
      const kept = [];
      const removed = [];
      for (let i = 0; i < prevChildren.length; i++) {
        const c = prevChildren[i];
        c.data.transition = transitionData;
        c.data.pos = c.elm.getBoundingClientRect();
        if (map[c.key]) {
          kept.push(c);
        } else {
          removed.push(c);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }
    return h(tag, null, children3);
  },
  updated() {
    const children3 = this.prevChildren;
    const moveClass = this.moveClass || (this.name || "v") + "-move";
    if (!children3.length || !this.hasMove(children3[0].elm, moveClass)) {
      return;
    }
    children3.forEach(callPendingCbs$1);
    children3.forEach(recordPosition$1);
    children3.forEach(applyTranslation$1);
    this._reflow = document.body.offsetHeight;
    children3.forEach((c) => {
      if (c.data.moved) {
        const el = c.elm;
        const s = el.style;
        addTransitionClass$1(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = "";
        el.addEventListener(transitionEndEvent$1, el._moveCb = function cb(e) {
          if (e && e.target !== el) {
            return;
          }
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent$1, cb);
            el._moveCb = null;
            removeTransitionClass$1(el, moveClass);
          }
        });
      }
    });
  },
  methods: {
    hasMove(el, moveClass) {
      if (!hasTransition$1) {
        return false;
      }
      if (this._hasMove) {
        return this._hasMove;
      }
      const clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach((cls) => {
          removeClass$1(clone, cls);
        });
      }
      addClass$1(clone, moveClass);
      clone.style.display = "none";
      this.$el.appendChild(clone);
      const info = getTransitionInfo$1(clone);
      this.$el.removeChild(clone);
      return this._hasMove = info.hasTransform;
    }
  }
};
function callPendingCbs$1(c) {
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}
function recordPosition$1(c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}
function applyTranslation$1(c) {
  const oldPos = c.data.pos;
  const newPos = c.data.newPos;
  const dx = oldPos.left - newPos.left;
  const dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    const s = c.elm.style;
    s.transform = s.WebkitTransform = `translate(${dx}px,${dy}px)`;
    s.transitionDuration = "0s";
  }
}
var platformComponents$1 = {
  Transition: Transition$1,
  TransitionGroup: TransitionGroup$1
};
Vue$1.config.mustUseProp = mustUseProp$1;
Vue$1.config.isReservedTag = isReservedTag$1;
Vue$1.config.isReservedAttr = isReservedAttr$1;
Vue$1.config.getTagNamespace = getTagNamespace$1;
Vue$1.config.isUnknownElement = isUnknownElement$1;
extend$1(Vue$1.options.directives, platformDirectives$1);
extend$1(Vue$1.options.components, platformComponents$1);
Vue$1.prototype.__patch__ = inBrowser$3 ? patch$1 : noop$3;
Vue$1.prototype.$mount = function(el, hydrating) {
  el = el && inBrowser$3 ? query$1(el) : void 0;
  return mountComponent$1(this, el, hydrating);
};
if (inBrowser$3) {
  setTimeout(() => {
    if (config$1.devtools) {
      if (devtools$1) {
        devtools$1.emit("init", Vue$1);
      } else {
        console[console.info ? "info" : "log"]("Download the Vue Devtools extension for a better development experience:\nhttps://github.com/vuejs/vue-devtools");
      }
    }
    if (config$1.productionTip !== false && typeof console !== "undefined") {
      console[console.info ? "info" : "log"](`You are running Vue in development mode.
Make sure to turn on production mode when deploying for production.
See more tips at https://vuejs.org/guide/deployment.html`);
    }
  }, 0);
}
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
const regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
const buildRegex = cached$1((delimiters2) => {
  const open2 = delimiters2[0].replace(regexEscapeRE, "\\$&");
  const close2 = delimiters2[1].replace(regexEscapeRE, "\\$&");
  return new RegExp(open2 + "((?:.|\\n)+?)" + close2, "g");
});
function parseText(text2, delimiters2) {
  const tagRE = delimiters2 ? buildRegex(delimiters2) : defaultTagRE;
  if (!tagRE.test(text2)) {
    return;
  }
  const tokens = [];
  const rawTokens = [];
  let lastIndex = tagRE.lastIndex = 0;
  let match, index2, tokenValue;
  while (match = tagRE.exec(text2)) {
    index2 = match.index;
    if (index2 > lastIndex) {
      rawTokens.push(tokenValue = text2.slice(lastIndex, index2));
      tokens.push(JSON.stringify(tokenValue));
    }
    const exp = parseFilters(match[1].trim());
    tokens.push(`_s(${exp})`);
    rawTokens.push({ "@binding": exp });
    lastIndex = index2 + match[0].length;
  }
  if (lastIndex < text2.length) {
    rawTokens.push(tokenValue = text2.slice(lastIndex));
    tokens.push(JSON.stringify(tokenValue));
  }
  return {
    expression: tokens.join("+"),
    tokens: rawTokens
  };
}
function transformNode(el, options) {
  const warn2 = options.warn || baseWarn;
  const staticClass = getAndRemoveAttr(el, "class");
  if (staticClass) {
    const res = parseText(staticClass, options.delimiters);
    if (res) {
      warn2(`class="${staticClass}": Interpolation inside attributes has been removed. Use v-bind or the colon shorthand instead. For example, instead of <div class="{{ val }}">, use <div :class="val">.`, el.rawAttrsMap["class"]);
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  const classBinding = getBindingAttr(el, "class", false);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}
function genData(el) {
  let data49 = "";
  if (el.staticClass) {
    data49 += `staticClass:${el.staticClass},`;
  }
  if (el.classBinding) {
    data49 += `class:${el.classBinding},`;
  }
  return data49;
}
var klass$1$1 = {
  staticKeys: ["staticClass"],
  transformNode,
  genData
};
function transformNode$1(el, options) {
  const warn2 = options.warn || baseWarn;
  const staticStyle = getAndRemoveAttr(el, "style");
  if (staticStyle) {
    {
      const res = parseText(staticStyle, options.delimiters);
      if (res) {
        warn2(`style="${staticStyle}": Interpolation inside attributes has been removed. Use v-bind or the colon shorthand instead. For example, instead of <div style="{{ val }}">, use <div :style="val">.`, el.rawAttrsMap["style"]);
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText$1(staticStyle));
  }
  const styleBinding = getBindingAttr(el, "style", false);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}
function genData$1(el) {
  let data49 = "";
  if (el.staticStyle) {
    data49 += `staticStyle:${el.staticStyle},`;
  }
  if (el.styleBinding) {
    data49 += `style:(${el.styleBinding}),`;
  }
  return data49;
}
var style$1$1 = {
  staticKeys: ["staticStyle"],
  transformNode: transformNode$1,
  genData: genData$1
};
let decoder;
var he = {
  decode(html2) {
    decoder = decoder || document.createElement("div");
    decoder.innerHTML = html2;
    return decoder.textContent;
  }
};
const isUnaryTag = makeMap$1("area,base,br,col,embed,frame,hr,img,input,isindex,keygen,link,meta,param,source,track,wbr");
const canBeLeftOpenTag = makeMap$1("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source");
const isNonPhrasingTag = makeMap$1("address,article,aside,base,blockquote,body,caption,col,colgroup,dd,details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,title,tr,track");
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
const dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z${unicodeRegExp$1.source}]*`;
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
const startTagOpen = new RegExp(`^<${qnameCapture}`);
const startTagClose = /^\s*(\/?)>/;
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);
const doctype = /^<!DOCTYPE [^>]+>/i;
const comment = /^<!\--/;
const conditionalComment = /^<!\[/;
const isPlainTextElement = makeMap$1("script,style,textarea", true);
const reCache = {};
const decodingMap = {
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&amp;": "&",
  "&#10;": "\n",
  "&#9;": "	",
  "&#39;": "'"
};
const encodedAttr = /&(?:lt|gt|quot|amp|#39);/g;
const encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#39|#10|#9);/g;
const isIgnoreNewlineTag = makeMap$1("pre,textarea", true);
const shouldIgnoreFirstNewline = (tag, html2) => tag && isIgnoreNewlineTag(tag) && html2[0] === "\n";
function decodeAttr(value17, shouldDecodeNewlines2) {
  const re = shouldDecodeNewlines2 ? encodedAttrWithNewLines : encodedAttr;
  return value17.replace(re, (match) => decodingMap[match]);
}
function parseHTML(html2, options) {
  const stack = [];
  const expectHTML = options.expectHTML;
  const isUnaryTag$$1 = options.isUnaryTag || no$1;
  const canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no$1;
  let index2 = 0;
  let last, lastTag;
  while (html2) {
    last = html2;
    if (!lastTag || !isPlainTextElement(lastTag)) {
      let textEnd = html2.indexOf("<");
      if (textEnd === 0) {
        if (comment.test(html2)) {
          const commentEnd = html2.indexOf("-->");
          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html2.substring(4, commentEnd), index2, index2 + commentEnd + 3);
            }
            advance(commentEnd + 3);
            continue;
          }
        }
        if (conditionalComment.test(html2)) {
          const conditionalEnd = html2.indexOf("]>");
          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue;
          }
        }
        const doctypeMatch = html2.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue;
        }
        const endTagMatch = html2.match(endTag);
        if (endTagMatch) {
          const curIndex = index2;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index2);
          continue;
        }
        const startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          if (shouldIgnoreFirstNewline(startTagMatch.tagName, html2)) {
            advance(1);
          }
          continue;
        }
      }
      let text2, rest, next3;
      if (textEnd >= 0) {
        rest = html2.slice(textEnd);
        while (!endTag.test(rest) && !startTagOpen.test(rest) && !comment.test(rest) && !conditionalComment.test(rest)) {
          next3 = rest.indexOf("<", 1);
          if (next3 < 0)
            break;
          textEnd += next3;
          rest = html2.slice(textEnd);
        }
        text2 = html2.substring(0, textEnd);
      }
      if (textEnd < 0) {
        text2 = html2;
      }
      if (text2) {
        advance(text2.length);
      }
      if (options.chars && text2) {
        options.chars(text2, index2 - text2.length, index2);
      }
    } else {
      let endTagLength = 0;
      const stackedTag = lastTag.toLowerCase();
      const reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp("([\\s\\S]*?)(</" + stackedTag + "[^>]*>)", "i"));
      const rest = html2.replace(reStackedTag, function(all, text2, endTag2) {
        endTagLength = endTag2.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== "noscript") {
          text2 = text2.replace(/<!\--([\s\S]*?)-->/g, "$1").replace(/<!\[CDATA\[([\s\S]*?)]]>/g, "$1");
        }
        if (shouldIgnoreFirstNewline(stackedTag, text2)) {
          text2 = text2.slice(1);
        }
        if (options.chars) {
          options.chars(text2);
        }
        return "";
      });
      index2 += html2.length - rest.length;
      html2 = rest;
      parseEndTag(stackedTag, index2 - endTagLength, index2);
    }
    if (html2 === last) {
      options.chars && options.chars(html2);
      if (!stack.length && options.warn) {
        options.warn(`Mal-formatted tag at end of template: "${html2}"`, { start: index2 + html2.length });
      }
      break;
    }
  }
  parseEndTag();
  function advance(n) {
    index2 += n;
    html2 = html2.substring(n);
  }
  function parseStartTag() {
    const start4 = html2.match(startTagOpen);
    if (start4) {
      const match = {
        tagName: start4[1],
        attrs: [],
        start: index2
      };
      advance(start4[0].length);
      let end2, attr;
      while (!(end2 = html2.match(startTagClose)) && (attr = html2.match(dynamicArgAttribute) || html2.match(attribute))) {
        attr.start = index2;
        advance(attr[0].length);
        attr.end = index2;
        match.attrs.push(attr);
      }
      if (end2) {
        match.unarySlash = end2[1];
        advance(end2[0].length);
        match.end = index2;
        return match;
      }
    }
  }
  function handleStartTag(match) {
    const tagName2 = match.tagName;
    const unarySlash = match.unarySlash;
    if (expectHTML) {
      if (lastTag === "p" && isNonPhrasingTag(tagName2)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName2) && lastTag === tagName2) {
        parseEndTag(tagName2);
      }
    }
    const unary = isUnaryTag$$1(tagName2) || !!unarySlash;
    const l = match.attrs.length;
    const attrs2 = new Array(l);
    for (let i = 0; i < l; i++) {
      const args = match.attrs[i];
      const value17 = args[3] || args[4] || args[5] || "";
      const shouldDecodeNewlines2 = tagName2 === "a" && args[1] === "href" ? options.shouldDecodeNewlinesForHref : options.shouldDecodeNewlines;
      attrs2[i] = {
        name: args[1],
        value: decodeAttr(value17, shouldDecodeNewlines2)
      };
      if (options.outputSourceRange) {
        attrs2[i].start = args.start + args[0].match(/^\s*/).length;
        attrs2[i].end = args.end;
      }
    }
    if (!unary) {
      stack.push({ tag: tagName2, lowerCasedTag: tagName2.toLowerCase(), attrs: attrs2, start: match.start, end: match.end });
      lastTag = tagName2;
    }
    if (options.start) {
      options.start(tagName2, attrs2, unary, match.start, match.end);
    }
  }
  function parseEndTag(tagName2, start4, end2) {
    let pos, lowerCasedTagName;
    if (start4 == null)
      start4 = index2;
    if (end2 == null)
      end2 = index2;
    if (tagName2) {
      lowerCasedTagName = tagName2.toLowerCase();
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break;
        }
      }
    } else {
      pos = 0;
    }
    if (pos >= 0) {
      for (let i = stack.length - 1; i >= pos; i--) {
        if (i > pos || !tagName2 && options.warn) {
          options.warn(`tag <${stack[i].tag}> has no matching end tag.`, { start: stack[i].start, end: stack[i].end });
        }
        if (options.end) {
          options.end(stack[i].tag, start4, end2);
        }
      }
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === "br") {
      if (options.start) {
        options.start(tagName2, [], true, start4, end2);
      }
    } else if (lowerCasedTagName === "p") {
      if (options.start) {
        options.start(tagName2, [], false, start4, end2);
      }
      if (options.end) {
        options.end(tagName2, start4, end2);
      }
    }
  }
}
const onRE = /^@|^v-on:/;
const dirRE = /^v-|^@|^:|^#/;
const forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
const forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
const stripParensRE = /^\(|\)$/g;
const dynamicArgRE = /^\[.*\]$/;
const argRE = /:(.*)$/;
const bindRE = /^:|^\.|^v-bind:/;
const modifierRE = /\.[^.\]]+(?=[^\]]*$)/g;
const slotRE = /^v-slot(:|$)|^#/;
const lineBreakRE = /[\r\n]/;
const whitespaceRE$1$1 = /[ \f\t\r\n]+/g;
const invalidAttributeRE = /[\s"'<>\/=]/;
const decodeHTMLCached = cached$1(he.decode);
const emptySlotScopeToken = `_empty_`;
let warn$2;
let delimiters;
let transforms;
let preTransforms;
let postTransforms;
let platformIsPreTag;
let platformMustUseProp;
let platformGetTagNamespace;
let maybeComponent;
function createASTElement(tag, attrs2, parent) {
  return {
    type: 1,
    tag,
    attrsList: attrs2,
    attrsMap: makeAttrsMap(attrs2),
    rawAttrsMap: {},
    parent,
    children: []
  };
}
function parse(template, options) {
  warn$2 = options.warn || baseWarn;
  platformIsPreTag = options.isPreTag || no$1;
  platformMustUseProp = options.mustUseProp || no$1;
  platformGetTagNamespace = options.getTagNamespace || no$1;
  const isReservedTag2 = options.isReservedTag || no$1;
  maybeComponent = (el) => !!(el.component || el.attrsMap[":is"] || el.attrsMap["v-bind:is"] || !(el.attrsMap.is ? isReservedTag2(el.attrsMap.is) : isReservedTag2(el.tag)));
  transforms = pluckModuleFunction(options.modules, "transformNode");
  preTransforms = pluckModuleFunction(options.modules, "preTransformNode");
  postTransforms = pluckModuleFunction(options.modules, "postTransformNode");
  delimiters = options.delimiters;
  const stack = [];
  const preserveWhitespace = options.preserveWhitespace !== false;
  const whitespaceOption = options.whitespace;
  let root2;
  let currentParent;
  let inVPre = false;
  let inPre = false;
  let warned = false;
  function warnOnce(msg, range2) {
    if (!warned) {
      warned = true;
      warn$2(msg, range2);
    }
  }
  function closeElement(element) {
    trimEndingWhitespace(element);
    if (!inVPre && !element.processed) {
      element = processElement(element, options);
    }
    if (!stack.length && element !== root2) {
      if (root2.if && (element.elseif || element.else)) {
        {
          checkRootConstraints(element);
        }
        addIfCondition(root2, {
          exp: element.elseif,
          block: element
        });
      } else {
        warnOnce(`Component template should contain exactly one root element. If you are using v-if on multiple elements, use v-else-if to chain them instead.`, { start: element.start });
      }
    }
    if (currentParent && !element.forbidden) {
      if (element.elseif || element.else) {
        processIfConditions(element, currentParent);
      } else {
        if (element.slotScope) {
          const name = element.slotTarget || '"default"';
          (currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        }
        currentParent.children.push(element);
        element.parent = currentParent;
      }
    }
    element.children = element.children.filter((c) => !c.slotScope);
    trimEndingWhitespace(element);
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
    for (let i = 0; i < postTransforms.length; i++) {
      postTransforms[i](element, options);
    }
  }
  function trimEndingWhitespace(el) {
    if (!inPre) {
      let lastNode;
      while ((lastNode = el.children[el.children.length - 1]) && lastNode.type === 3 && lastNode.text === " ") {
        el.children.pop();
      }
    }
  }
  function checkRootConstraints(el) {
    if (el.tag === "slot" || el.tag === "template") {
      warnOnce(`Cannot use <${el.tag}> as component root element because it may contain multiple nodes.`, { start: el.start });
    }
    if (el.attrsMap.hasOwnProperty("v-for")) {
      warnOnce("Cannot use v-for on stateful component root element because it renders multiple elements.", el.rawAttrsMap["v-for"]);
    }
  }
  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    outputSourceRange: options.outputSourceRange,
    start(tag, attrs2, unary, start4, end2) {
      const ns = currentParent && currentParent.ns || platformGetTagNamespace(tag);
      if (isIE$1 && ns === "svg") {
        attrs2 = guardIESVGBug(attrs2);
      }
      let element = createASTElement(tag, attrs2, currentParent);
      if (ns) {
        element.ns = ns;
      }
      {
        if (options.outputSourceRange) {
          element.start = start4;
          element.end = end2;
          element.rawAttrsMap = element.attrsList.reduce((cumulated, attr) => {
            cumulated[attr.name] = attr;
            return cumulated;
          }, {});
        }
        attrs2.forEach((attr) => {
          if (invalidAttributeRE.test(attr.name)) {
            warn$2(`Invalid dynamic argument expression: attribute names cannot contain spaces, quotes, <, >, / or =.`, {
              start: attr.start + attr.name.indexOf(`[`),
              end: attr.start + attr.name.length
            });
          }
        });
      }
      if (isForbiddenTag(element) && !isServerRendering$1()) {
        element.forbidden = true;
        warn$2(`Templates should only be responsible for mapping the state to the UI. Avoid placing tags with side-effects in your templates, such as <${tag}>, as they will not be parsed.`, { start: element.start });
      }
      for (let i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element;
      }
      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else if (!element.processed) {
        processFor(element);
        processIf(element);
        processOnce(element);
      }
      if (!root2) {
        root2 = element;
        {
          checkRootConstraints(root2);
        }
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        closeElement(element);
      }
    },
    end(tag, start4, end2) {
      const element = stack[stack.length - 1];
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      if (options.outputSourceRange) {
        element.end = end2;
      }
      closeElement(element);
    },
    chars(text2, start4, end2) {
      if (!currentParent) {
        {
          if (text2 === template) {
            warnOnce("Component template requires a root element, rather than just text.", { start: start4 });
          } else if (text2 = text2.trim()) {
            warnOnce(`text "${text2}" outside root element will be ignored.`, { start: start4 });
          }
        }
        return;
      }
      if (isIE$1 && currentParent.tag === "textarea" && currentParent.attrsMap.placeholder === text2) {
        return;
      }
      const children3 = currentParent.children;
      if (inPre || text2.trim()) {
        text2 = isTextTag(currentParent) ? text2 : decodeHTMLCached(text2);
      } else if (!children3.length) {
        text2 = "";
      } else if (whitespaceOption) {
        if (whitespaceOption === "condense") {
          text2 = lineBreakRE.test(text2) ? "" : " ";
        } else {
          text2 = " ";
        }
      } else {
        text2 = preserveWhitespace ? " " : "";
      }
      if (text2) {
        if (!inPre && whitespaceOption === "condense") {
          text2 = text2.replace(whitespaceRE$1$1, " ");
        }
        let res;
        let child;
        if (!inVPre && text2 !== " " && (res = parseText(text2, delimiters))) {
          child = {
            type: 2,
            expression: res.expression,
            tokens: res.tokens,
            text: text2
          };
        } else if (text2 !== " " || !children3.length || children3[children3.length - 1].text !== " ") {
          child = {
            type: 3,
            text: text2
          };
        }
        if (child) {
          if (options.outputSourceRange) {
            child.start = start4;
            child.end = end2;
          }
          children3.push(child);
        }
      }
    },
    comment(text2, start4, end2) {
      if (currentParent) {
        const child = {
          type: 3,
          text: text2,
          isComment: true
        };
        if (options.outputSourceRange) {
          child.start = start4;
          child.end = end2;
        }
        currentParent.children.push(child);
      }
    }
  });
  return root2;
}
function processPre(el) {
  if (getAndRemoveAttr(el, "v-pre") != null) {
    el.pre = true;
  }
}
function processRawAttrs(el) {
  const list2 = el.attrsList;
  const len2 = list2.length;
  if (len2) {
    const attrs2 = el.attrs = new Array(len2);
    for (let i = 0; i < len2; i++) {
      attrs2[i] = {
        name: list2[i].name,
        value: JSON.stringify(list2[i].value)
      };
      if (list2[i].start != null) {
        attrs2[i].start = list2[i].start;
        attrs2[i].end = list2[i].end;
      }
    }
  } else if (!el.pre) {
    el.plain = true;
  }
}
function processElement(element, options) {
  processKey(element);
  element.plain = !element.key && !element.scopedSlots && !element.attrsList.length;
  processRef(element);
  processSlotContent(element);
  processSlotOutlet(element);
  processComponent(element);
  for (let i = 0; i < transforms.length; i++) {
    element = transforms[i](element, options) || element;
  }
  processAttrs(element);
  return element;
}
function processKey(el) {
  const exp = getBindingAttr(el, "key");
  if (exp) {
    {
      if (el.tag === "template") {
        warn$2(`<template> cannot be keyed. Place the key on real elements instead.`, getRawBindingAttr(el, "key"));
      }
      if (el.for) {
        const iterator = el.iterator2 || el.iterator1;
        const parent = el.parent;
        if (iterator && iterator === exp && parent && parent.tag === "transition-group") {
          warn$2(`Do not use v-for index as key on <transition-group> children, this is the same as not using keys.`, getRawBindingAttr(el, "key"), true);
        }
      }
    }
    el.key = exp;
  }
}
function processRef(el) {
  const ref2 = getBindingAttr(el, "ref");
  if (ref2) {
    el.ref = ref2;
    el.refInFor = checkInFor(el);
  }
}
function processFor(el) {
  let exp;
  if (exp = getAndRemoveAttr(el, "v-for")) {
    const res = parseFor(exp);
    if (res) {
      extend$1(el, res);
    } else {
      warn$2(`Invalid v-for expression: ${exp}`, el.rawAttrsMap["v-for"]);
    }
  }
}
function parseFor(exp) {
  const inMatch = exp.match(forAliasRE);
  if (!inMatch)
    return;
  const res = {};
  res.for = inMatch[2].trim();
  const alias = inMatch[1].trim().replace(stripParensRE, "");
  const iteratorMatch = alias.match(forIteratorRE);
  if (iteratorMatch) {
    res.alias = alias.replace(forIteratorRE, "").trim();
    res.iterator1 = iteratorMatch[1].trim();
    if (iteratorMatch[2]) {
      res.iterator2 = iteratorMatch[2].trim();
    }
  } else {
    res.alias = alias;
  }
  return res;
}
function processIf(el) {
  const exp = getAndRemoveAttr(el, "v-if");
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, "v-else") != null) {
      el.else = true;
    }
    const elseif = getAndRemoveAttr(el, "v-else-if");
    if (elseif) {
      el.elseif = elseif;
    }
  }
}
function processIfConditions(el, parent) {
  const prev3 = findPrevElement(parent.children);
  if (prev3 && prev3.if) {
    addIfCondition(prev3, {
      exp: el.elseif,
      block: el
    });
  } else {
    warn$2(`v-${el.elseif ? 'else-if="' + el.elseif + '"' : "else"} used on element <${el.tag}> without corresponding v-if.`, el.rawAttrsMap[el.elseif ? "v-else-if" : "v-else"]);
  }
}
function findPrevElement(children3) {
  let i = children3.length;
  while (i--) {
    if (children3[i].type === 1) {
      return children3[i];
    } else {
      if (children3[i].text !== " ") {
        warn$2(`text "${children3[i].text.trim()}" between v-if and v-else(-if) will be ignored.`, children3[i]);
      }
      children3.pop();
    }
  }
}
function addIfCondition(el, condition3) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition3);
}
function processOnce(el) {
  const once$$1 = getAndRemoveAttr(el, "v-once");
  if (once$$1 != null) {
    el.once = true;
  }
}
function processSlotContent(el) {
  let slotScope;
  if (el.tag === "template") {
    slotScope = getAndRemoveAttr(el, "scope");
    if (slotScope) {
      warn$2(`the "scope" attribute for scoped slots have been deprecated and replaced by "slot-scope" since 2.5. The new "slot-scope" attribute can also be used on plain elements in addition to <template> to denote scoped slots.`, el.rawAttrsMap["scope"], true);
    }
    el.slotScope = slotScope || getAndRemoveAttr(el, "slot-scope");
  } else if (slotScope = getAndRemoveAttr(el, "slot-scope")) {
    if (el.attrsMap["v-for"]) {
      warn$2(`Ambiguous combined usage of slot-scope and v-for on <${el.tag}> (v-for takes higher priority). Use a wrapper <template> for the scoped slot to make it clearer.`, el.rawAttrsMap["slot-scope"], true);
    }
    el.slotScope = slotScope;
  }
  const slotTarget = getBindingAttr(el, "slot");
  if (slotTarget) {
    el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
    el.slotTargetDynamic = !!(el.attrsMap[":slot"] || el.attrsMap["v-bind:slot"]);
    if (el.tag !== "template" && !el.slotScope) {
      addAttr(el, "slot", slotTarget, getRawBindingAttr(el, "slot"));
    }
  }
  {
    if (el.tag === "template") {
      const slotBinding = getAndRemoveAttrByRegex(el, slotRE);
      if (slotBinding) {
        {
          if (el.slotTarget || el.slotScope) {
            warn$2(`Unexpected mixed usage of different slot syntaxes.`, el);
          }
          if (el.parent && !maybeComponent(el.parent)) {
            warn$2(`<template v-slot> can only appear at the root level inside the receiving component`, el);
          }
        }
        const { name, dynamic } = getSlotName(slotBinding);
        el.slotTarget = name;
        el.slotTargetDynamic = dynamic;
        el.slotScope = slotBinding.value || emptySlotScopeToken;
      }
    } else {
      const slotBinding = getAndRemoveAttrByRegex(el, slotRE);
      if (slotBinding) {
        {
          if (!maybeComponent(el)) {
            warn$2(`v-slot can only be used on components or <template>.`, slotBinding);
          }
          if (el.slotScope || el.slotTarget) {
            warn$2(`Unexpected mixed usage of different slot syntaxes.`, el);
          }
          if (el.scopedSlots) {
            warn$2(`To avoid scope ambiguity, the default slot should also use <template> syntax when there are other named slots.`, slotBinding);
          }
        }
        const slots4 = el.scopedSlots || (el.scopedSlots = {});
        const { name, dynamic } = getSlotName(slotBinding);
        const slotContainer = slots4[name] = createASTElement("template", [], el);
        slotContainer.slotTarget = name;
        slotContainer.slotTargetDynamic = dynamic;
        slotContainer.children = el.children.filter((c) => {
          if (!c.slotScope) {
            c.parent = slotContainer;
            return true;
          }
        });
        slotContainer.slotScope = slotBinding.value || emptySlotScopeToken;
        el.children = [];
        el.plain = false;
      }
    }
  }
}
function getSlotName(binding) {
  let name = binding.name.replace(slotRE, "");
  if (!name) {
    if (binding.name[0] !== "#") {
      name = "default";
    } else {
      warn$2(`v-slot shorthand syntax requires a slot name.`, binding);
    }
  }
  return dynamicArgRE.test(name) ? { name: name.slice(1, -1), dynamic: true } : { name: `"${name}"`, dynamic: false };
}
function processSlotOutlet(el) {
  if (el.tag === "slot") {
    el.slotName = getBindingAttr(el, "name");
    if (el.key) {
      warn$2(`\`key\` does not work on <slot> because slots are abstract outlets and can possibly expand into multiple elements. Use the key on a wrapping element instead.`, getRawBindingAttr(el, "key"));
    }
  }
}
function processComponent(el) {
  let binding;
  if (binding = getBindingAttr(el, "is")) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, "inline-template") != null) {
    el.inlineTemplate = true;
  }
}
function processAttrs(el) {
  const list2 = el.attrsList;
  let i, l, name, rawName, value17, modifiers, syncGen, isDynamic;
  for (i = 0, l = list2.length; i < l; i++) {
    name = rawName = list2[i].name;
    value17 = list2[i].value;
    if (dirRE.test(name)) {
      el.hasBindings = true;
      modifiers = parseModifiers(name.replace(dirRE, ""));
      if (modifiers) {
        name = name.replace(modifierRE, "");
      }
      if (bindRE.test(name)) {
        name = name.replace(bindRE, "");
        value17 = parseFilters(value17);
        isDynamic = dynamicArgRE.test(name);
        if (isDynamic) {
          name = name.slice(1, -1);
        }
        if (value17.trim().length === 0) {
          warn$2(`The value for a v-bind expression cannot be empty. Found in "v-bind:${name}"`);
        }
        if (modifiers) {
          if (modifiers.prop && !isDynamic) {
            name = camelize$3(name);
            if (name === "innerHtml")
              name = "innerHTML";
          }
          if (modifiers.camel && !isDynamic) {
            name = camelize$3(name);
          }
          if (modifiers.sync) {
            syncGen = genAssignmentCode(value17, `$event`);
            if (!isDynamic) {
              addHandler(el, `update:${camelize$3(name)}`, syncGen, null, false, warn$2, list2[i]);
              if (hyphenate$1(name) !== camelize$3(name)) {
                addHandler(el, `update:${hyphenate$1(name)}`, syncGen, null, false, warn$2, list2[i]);
              }
            } else {
              addHandler(el, `"update:"+(${name})`, syncGen, null, false, warn$2, list2[i], true);
            }
          }
        }
        if (modifiers && modifiers.prop || !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)) {
          addProp(el, name, value17, list2[i], isDynamic);
        } else {
          addAttr(el, name, value17, list2[i], isDynamic);
        }
      } else if (onRE.test(name)) {
        name = name.replace(onRE, "");
        isDynamic = dynamicArgRE.test(name);
        if (isDynamic) {
          name = name.slice(1, -1);
        }
        addHandler(el, name, value17, modifiers, false, warn$2, list2[i], isDynamic);
      } else {
        name = name.replace(dirRE, "");
        const argMatch = name.match(argRE);
        let arg = argMatch && argMatch[1];
        isDynamic = false;
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
          if (dynamicArgRE.test(arg)) {
            arg = arg.slice(1, -1);
            isDynamic = true;
          }
        }
        addDirective(el, name, rawName, value17, arg, isDynamic, modifiers, list2[i]);
        if (name === "model") {
          checkForAliasModel(el, value17);
        }
      }
    } else {
      {
        const res = parseText(value17, delimiters);
        if (res) {
          warn$2(`${name}="${value17}": Interpolation inside attributes has been removed. Use v-bind or the colon shorthand instead. For example, instead of <div id="{{ val }}">, use <div :id="val">.`, list2[i]);
        }
      }
      addAttr(el, name, JSON.stringify(value17), list2[i]);
      if (!el.component && name === "muted" && platformMustUseProp(el.tag, el.attrsMap.type, name)) {
        addProp(el, name, "true", list2[i]);
      }
    }
  }
}
function checkInFor(el) {
  let parent = el;
  while (parent) {
    if (parent.for !== void 0) {
      return true;
    }
    parent = parent.parent;
  }
  return false;
}
function parseModifiers(name) {
  const match = name.match(modifierRE);
  if (match) {
    const ret = {};
    match.forEach((m) => {
      ret[m.slice(1)] = true;
    });
    return ret;
  }
}
function makeAttrsMap(attrs2) {
  const map = {};
  for (let i = 0, l = attrs2.length; i < l; i++) {
    if (map[attrs2[i].name] && !isIE$1 && !isEdge$1) {
      warn$2("duplicate attribute: " + attrs2[i].name, attrs2[i]);
    }
    map[attrs2[i].name] = attrs2[i].value;
  }
  return map;
}
function isTextTag(el) {
  return el.tag === "script" || el.tag === "style";
}
function isForbiddenTag(el) {
  return el.tag === "style" || el.tag === "script" && (!el.attrsMap.type || el.attrsMap.type === "text/javascript");
}
const ieNSBug = /^xmlns:NS\d+/;
const ieNSPrefix = /^NS\d+:/;
function guardIESVGBug(attrs2) {
  const res = [];
  for (let i = 0; i < attrs2.length; i++) {
    const attr = attrs2[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, "");
      res.push(attr);
    }
  }
  return res;
}
function checkForAliasModel(el, value17) {
  let _el = el;
  while (_el) {
    if (_el.for && _el.alias === value17) {
      warn$2(`<${el.tag} v-model="${value17}">: You are binding v-model directly to a v-for iteration alias. This will not be able to modify the v-for source array because writing to the alias is like modifying a function local variable. Consider using an array of objects and use v-model on an object property instead.`, el.rawAttrsMap["v-model"]);
    }
    _el = _el.parent;
  }
}
function preTransformNode(el, options) {
  if (el.tag === "input") {
    const map = el.attrsMap;
    if (!map["v-model"]) {
      return;
    }
    let typeBinding;
    if (map[":type"] || map["v-bind:type"]) {
      typeBinding = getBindingAttr(el, "type");
    }
    if (!map.type && !typeBinding && map["v-bind"]) {
      typeBinding = `(${map["v-bind"]}).type`;
    }
    if (typeBinding) {
      const ifCondition = getAndRemoveAttr(el, "v-if", true);
      const ifConditionExtra = ifCondition ? `&&(${ifCondition})` : ``;
      const hasElse = getAndRemoveAttr(el, "v-else", true) != null;
      const elseIfCondition = getAndRemoveAttr(el, "v-else-if", true);
      const branch0 = cloneASTElement(el);
      processFor(branch0);
      addRawAttr(branch0, "type", "checkbox");
      processElement(branch0, options);
      branch0.processed = true;
      branch0.if = `(${typeBinding})==='checkbox'` + ifConditionExtra;
      addIfCondition(branch0, {
        exp: branch0.if,
        block: branch0
      });
      const branch1 = cloneASTElement(el);
      getAndRemoveAttr(branch1, "v-for", true);
      addRawAttr(branch1, "type", "radio");
      processElement(branch1, options);
      addIfCondition(branch0, {
        exp: `(${typeBinding})==='radio'` + ifConditionExtra,
        block: branch1
      });
      const branch2 = cloneASTElement(el);
      getAndRemoveAttr(branch2, "v-for", true);
      addRawAttr(branch2, ":type", typeBinding);
      processElement(branch2, options);
      addIfCondition(branch0, {
        exp: ifCondition,
        block: branch2
      });
      if (hasElse) {
        branch0.else = true;
      } else if (elseIfCondition) {
        branch0.elseif = elseIfCondition;
      }
      return branch0;
    }
  }
}
function cloneASTElement(el) {
  return createASTElement(el.tag, el.attrsList.slice(), el.parent);
}
var model$1 = {
  preTransformNode
};
var modules$1$1 = [
  klass$1$1,
  style$1$1,
  model$1
];
function text(el, dir) {
  if (dir.value) {
    addProp(el, "textContent", `_s(${dir.value})`, dir);
  }
}
function html(el, dir) {
  if (dir.value) {
    addProp(el, "innerHTML", `_s(${dir.value})`, dir);
  }
}
var directives$1$1 = {
  model,
  text,
  html
};
const baseOptions = {
  expectHTML: true,
  modules: modules$1$1,
  directives: directives$1$1,
  isPreTag,
  isUnaryTag,
  mustUseProp: mustUseProp$1,
  canBeLeftOpenTag,
  isReservedTag: isReservedTag$1,
  getTagNamespace: getTagNamespace$1,
  staticKeys: genStaticKeys(modules$1$1)
};
let isStaticKey;
let isPlatformReservedTag;
const genStaticKeysCached = cached$1(genStaticKeys$1);
function optimize(root2, options) {
  if (!root2)
    return;
  isStaticKey = genStaticKeysCached(options.staticKeys || "");
  isPlatformReservedTag = options.isReservedTag || no$1;
  markStatic$1$1(root2);
  markStaticRoots(root2, false);
}
function genStaticKeys$1(keys2) {
  return makeMap$1("type,tag,attrsList,attrsMap,plain,parent,children,attrs,start,end,rawAttrsMap" + (keys2 ? "," + keys2 : ""));
}
function markStatic$1$1(node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    if (!isPlatformReservedTag(node.tag) && node.tag !== "slot" && node.attrsMap["inline-template"] == null) {
      return;
    }
    for (let i = 0, l = node.children.length; i < l; i++) {
      const child = node.children[i];
      markStatic$1$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
    if (node.ifConditions) {
      for (let i = 1, l = node.ifConditions.length; i < l; i++) {
        const block = node.ifConditions[i].block;
        markStatic$1$1(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}
function markStaticRoots(node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    if (node.static && node.children.length && !(node.children.length === 1 && node.children[0].type === 3)) {
      node.staticRoot = true;
      return;
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (let i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      for (let i = 1, l = node.ifConditions.length; i < l; i++) {
        markStaticRoots(node.ifConditions[i].block, isInFor);
      }
    }
  }
}
function isStatic(node) {
  if (node.type === 2) {
    return false;
  }
  if (node.type === 3) {
    return true;
  }
  return !!(node.pre || !node.hasBindings && !node.if && !node.for && !isBuiltInTag(node.tag) && isPlatformReservedTag(node.tag) && !isDirectChildOfTemplateFor(node) && Object.keys(node).every(isStaticKey));
}
function isDirectChildOfTemplateFor(node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== "template") {
      return false;
    }
    if (node.for) {
      return true;
    }
  }
  return false;
}
const fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function(?:\s+[\w$]+)?\s*\(/;
const fnInvokeRE = /\([^)]*?\);*$/;
const simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;
const keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  "delete": [8, 46]
};
const keyNames = {
  esc: ["Esc", "Escape"],
  tab: "Tab",
  enter: "Enter",
  space: [" ", "Spacebar"],
  up: ["Up", "ArrowUp"],
  left: ["Left", "ArrowLeft"],
  right: ["Right", "ArrowRight"],
  down: ["Down", "ArrowDown"],
  "delete": ["Backspace", "Delete", "Del"]
};
const genGuard = (condition3) => `if(${condition3})return null;`;
const modifierCode = {
  stop: "$event.stopPropagation();",
  prevent: "$event.preventDefault();",
  self: genGuard(`$event.target !== $event.currentTarget`),
  ctrl: genGuard(`!$event.ctrlKey`),
  shift: genGuard(`!$event.shiftKey`),
  alt: genGuard(`!$event.altKey`),
  meta: genGuard(`!$event.metaKey`),
  left: genGuard(`'button' in $event && $event.button !== 0`),
  middle: genGuard(`'button' in $event && $event.button !== 1`),
  right: genGuard(`'button' in $event && $event.button !== 2`)
};
function genHandlers(events2, isNative2) {
  const prefix2 = isNative2 ? "nativeOn:" : "on:";
  let staticHandlers = ``;
  let dynamicHandlers = ``;
  for (const name in events2) {
    const handlerCode = genHandler(events2[name]);
    if (events2[name] && events2[name].dynamic) {
      dynamicHandlers += `${name},${handlerCode},`;
    } else {
      staticHandlers += `"${name}":${handlerCode},`;
    }
  }
  staticHandlers = `{${staticHandlers.slice(0, -1)}}`;
  if (dynamicHandlers) {
    return prefix2 + `_d(${staticHandlers},[${dynamicHandlers.slice(0, -1)}])`;
  } else {
    return prefix2 + staticHandlers;
  }
}
function genHandler(handler4) {
  if (!handler4) {
    return "function(){}";
  }
  if (Array.isArray(handler4)) {
    return `[${handler4.map((handler5) => genHandler(handler5)).join(",")}]`;
  }
  const isMethodPath = simplePathRE.test(handler4.value);
  const isFunctionExpression = fnExpRE.test(handler4.value);
  const isFunctionInvocation = simplePathRE.test(handler4.value.replace(fnInvokeRE, ""));
  if (!handler4.modifiers) {
    if (isMethodPath || isFunctionExpression) {
      return handler4.value;
    }
    return `function($event){${isFunctionInvocation ? `return ${handler4.value}` : handler4.value}}`;
  } else {
    let code2 = "";
    let genModifierCode = "";
    const keys2 = [];
    for (const key in handler4.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        if (keyCodes[key]) {
          keys2.push(key);
        }
      } else if (key === "exact") {
        const modifiers = handler4.modifiers;
        genModifierCode += genGuard(["ctrl", "shift", "alt", "meta"].filter((keyModifier) => !modifiers[keyModifier]).map((keyModifier) => `$event.${keyModifier}Key`).join("||"));
      } else {
        keys2.push(key);
      }
    }
    if (keys2.length) {
      code2 += genKeyFilter(keys2);
    }
    if (genModifierCode) {
      code2 += genModifierCode;
    }
    const handlerCode = isMethodPath ? `return ${handler4.value}.apply(null, arguments)` : isFunctionExpression ? `return (${handler4.value}).apply(null, arguments)` : isFunctionInvocation ? `return ${handler4.value}` : handler4.value;
    return `function($event){${code2}${handlerCode}}`;
  }
}
function genKeyFilter(keys2) {
  return `if(!$event.type.indexOf('key')&&${keys2.map(genFilterCode).join("&&")})return null;`;
}
function genFilterCode(key) {
  const keyVal = parseInt(key, 10);
  if (keyVal) {
    return `$event.keyCode!==${keyVal}`;
  }
  const keyCode = keyCodes[key];
  const keyName = keyNames[key];
  return `_k($event.keyCode,${JSON.stringify(key)},${JSON.stringify(keyCode)},$event.key,${JSON.stringify(keyName)})`;
}
function on$1(el, dir) {
  if (dir.modifiers) {
    warn$1(`v-on without argument does not support modifiers.`);
  }
  el.wrapListeners = (code2) => `_g(${code2},${dir.value})`;
}
function bind$1$1(el, dir) {
  el.wrapData = (code2) => {
    return `_b(${code2},'${el.tag}',${dir.value},${dir.modifiers && dir.modifiers.prop ? "true" : "false"}${dir.modifiers && dir.modifiers.sync ? ",true" : ""})`;
  };
}
var baseDirectives = {
  on: on$1,
  bind: bind$1$1,
  cloak: noop$3
};
class CodegenState {
  constructor(options) {
    this.options = options;
    this.warn = options.warn || baseWarn;
    this.transforms = pluckModuleFunction(options.modules, "transformCode");
    this.dataGenFns = pluckModuleFunction(options.modules, "genData");
    this.directives = extend$1(extend$1({}, baseDirectives), options.directives);
    const isReservedTag2 = options.isReservedTag || no$1;
    this.maybeComponent = (el) => !!el.component || !isReservedTag2(el.tag);
    this.onceId = 0;
    this.staticRenderFns = [];
    this.pre = false;
  }
}
function generate(ast, options) {
  const state = new CodegenState(options);
  const code2 = ast ? ast.tag === "script" ? "null" : genElement(ast, state) : '_c("div")';
  return {
    render: `with(this){return ${code2}}`,
    staticRenderFns: state.staticRenderFns
  };
}
function genElement(el, state) {
  if (el.parent) {
    el.pre = el.pre || el.parent.pre;
  }
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state);
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state);
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state);
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state);
  } else if (el.tag === "template" && !el.slotTarget && !state.pre) {
    return genChildren(el, state) || "void 0";
  } else if (el.tag === "slot") {
    return genSlot(el, state);
  } else {
    let code2;
    if (el.component) {
      code2 = genComponent(el.component, el, state);
    } else {
      let data49;
      if (!el.plain || el.pre && state.maybeComponent(el)) {
        data49 = genData$2(el, state);
      }
      const children3 = el.inlineTemplate ? null : genChildren(el, state, true);
      code2 = `_c('${el.tag}'${data49 ? `,${data49}` : ""}${children3 ? `,${children3}` : ""})`;
    }
    for (let i = 0; i < state.transforms.length; i++) {
      code2 = state.transforms[i](el, code2);
    }
    return code2;
  }
}
function genStatic(el, state) {
  el.staticProcessed = true;
  const originalPreState = state.pre;
  if (el.pre) {
    state.pre = el.pre;
  }
  state.staticRenderFns.push(`with(this){return ${genElement(el, state)}}`);
  state.pre = originalPreState;
  return `_m(${state.staticRenderFns.length - 1}${el.staticInFor ? ",true" : ""})`;
}
function genOnce(el, state) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el, state);
  } else if (el.staticInFor) {
    let key = "";
    let parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break;
      }
      parent = parent.parent;
    }
    if (!key) {
      state.warn(`v-once can only be used inside v-for that is keyed. `, el.rawAttrsMap["v-once"]);
      return genElement(el, state);
    }
    return `_o(${genElement(el, state)},${state.onceId++},${key})`;
  } else {
    return genStatic(el, state);
  }
}
function genIf(el, state, altGen, altEmpty) {
  el.ifProcessed = true;
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty);
}
function genIfConditions(conditions, state, altGen, altEmpty) {
  if (!conditions.length) {
    return altEmpty || "_e()";
  }
  const condition3 = conditions.shift();
  if (condition3.exp) {
    return `(${condition3.exp})?${genTernaryExp(condition3.block)}:${genIfConditions(conditions, state, altGen, altEmpty)}`;
  } else {
    return `${genTernaryExp(condition3.block)}`;
  }
  function genTernaryExp(el) {
    return altGen ? altGen(el, state) : el.once ? genOnce(el, state) : genElement(el, state);
  }
}
function genFor(el, state, altGen, altHelper) {
  const exp = el.for;
  const alias = el.alias;
  const iterator1 = el.iterator1 ? `,${el.iterator1}` : "";
  const iterator2 = el.iterator2 ? `,${el.iterator2}` : "";
  if (state.maybeComponent(el) && el.tag !== "slot" && el.tag !== "template" && !el.key) {
    state.warn(`<${el.tag} v-for="${alias} in ${exp}">: component lists rendered with v-for should have explicit keys. See https://vuejs.org/guide/list.html#key for more info.`, el.rawAttrsMap["v-for"], true);
  }
  el.forProcessed = true;
  return `${altHelper || "_l"}((${exp}),function(${alias}${iterator1}${iterator2}){return ${(altGen || genElement)(el, state)}})`;
}
function genData$2(el, state) {
  let data49 = "{";
  const dirs = genDirectives(el, state);
  if (dirs)
    data49 += dirs + ",";
  if (el.key) {
    data49 += `key:${el.key},`;
  }
  if (el.ref) {
    data49 += `ref:${el.ref},`;
  }
  if (el.refInFor) {
    data49 += `refInFor:true,`;
  }
  if (el.pre) {
    data49 += `pre:true,`;
  }
  if (el.component) {
    data49 += `tag:"${el.tag}",`;
  }
  for (let i = 0; i < state.dataGenFns.length; i++) {
    data49 += state.dataGenFns[i](el);
  }
  if (el.attrs) {
    data49 += `attrs:${genProps(el.attrs)},`;
  }
  if (el.props) {
    data49 += `domProps:${genProps(el.props)},`;
  }
  if (el.events) {
    data49 += `${genHandlers(el.events, false)},`;
  }
  if (el.nativeEvents) {
    data49 += `${genHandlers(el.nativeEvents, true)},`;
  }
  if (el.slotTarget && !el.slotScope) {
    data49 += `slot:${el.slotTarget},`;
  }
  if (el.scopedSlots) {
    data49 += `${genScopedSlots(el, el.scopedSlots, state)},`;
  }
  if (el.model) {
    data49 += `model:{value:${el.model.value},callback:${el.model.callback},expression:${el.model.expression}},`;
  }
  if (el.inlineTemplate) {
    const inlineTemplate = genInlineTemplate(el, state);
    if (inlineTemplate) {
      data49 += `${inlineTemplate},`;
    }
  }
  data49 = data49.replace(/,$/, "") + "}";
  if (el.dynamicAttrs) {
    data49 = `_b(${data49},"${el.tag}",${genProps(el.dynamicAttrs)})`;
  }
  if (el.wrapData) {
    data49 = el.wrapData(data49);
  }
  if (el.wrapListeners) {
    data49 = el.wrapListeners(data49);
  }
  return data49;
}
function genDirectives(el, state) {
  const dirs = el.directives;
  if (!dirs)
    return;
  let res = "directives:[";
  let hasRuntime = false;
  let i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    const gen2 = state.directives[dir.name];
    if (gen2) {
      needRuntime = !!gen2(el, dir, state.warn);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += `{name:"${dir.name}",rawName:"${dir.rawName}"${dir.value ? `,value:(${dir.value}),expression:${JSON.stringify(dir.value)}` : ""}${dir.arg ? `,arg:${dir.isDynamicArg ? dir.arg : `"${dir.arg}"`}` : ""}${dir.modifiers ? `,modifiers:${JSON.stringify(dir.modifiers)}` : ""}},`;
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + "]";
  }
}
function genInlineTemplate(el, state) {
  const ast = el.children[0];
  if (el.children.length !== 1 || ast.type !== 1) {
    state.warn("Inline-template components must have exactly one child element.", { start: el.start });
  }
  if (ast && ast.type === 1) {
    const inlineRenderFns = generate(ast, state.options);
    return `inlineTemplate:{render:function(){${inlineRenderFns.render}},staticRenderFns:[${inlineRenderFns.staticRenderFns.map((code2) => `function(){${code2}}`).join(",")}]}`;
  }
}
function genScopedSlots(el, slots4, state) {
  let needsForceUpdate = el.for || Object.keys(slots4).some((key) => {
    const slot = slots4[key];
    return slot.slotTargetDynamic || slot.if || slot.for || containsSlotChild(slot);
  });
  let needsKey = !!el.if;
  if (!needsForceUpdate) {
    let parent = el.parent;
    while (parent) {
      if (parent.slotScope && parent.slotScope !== emptySlotScopeToken || parent.for) {
        needsForceUpdate = true;
        break;
      }
      if (parent.if) {
        needsKey = true;
      }
      parent = parent.parent;
    }
  }
  const generatedSlots = Object.keys(slots4).map((key) => genScopedSlot(slots4[key], state)).join(",");
  return `scopedSlots:_u([${generatedSlots}]${needsForceUpdate ? `,null,true` : ``}${!needsForceUpdate && needsKey ? `,null,false,${hash(generatedSlots)}` : ``})`;
}
function hash(str2) {
  let hash2 = 5381;
  let i = str2.length;
  while (i) {
    hash2 = hash2 * 33 ^ str2.charCodeAt(--i);
  }
  return hash2 >>> 0;
}
function containsSlotChild(el) {
  if (el.type === 1) {
    if (el.tag === "slot") {
      return true;
    }
    return el.children.some(containsSlotChild);
  }
  return false;
}
function genScopedSlot(el, state) {
  const isLegacySyntax = el.attrsMap["slot-scope"];
  if (el.if && !el.ifProcessed && !isLegacySyntax) {
    return genIf(el, state, genScopedSlot, `null`);
  }
  if (el.for && !el.forProcessed) {
    return genFor(el, state, genScopedSlot);
  }
  const slotScope = el.slotScope === emptySlotScopeToken ? `` : String(el.slotScope);
  const fn2 = `function(${slotScope}){return ${el.tag === "template" ? el.if && isLegacySyntax ? `(${el.if})?${genChildren(el, state) || "undefined"}:undefined` : genChildren(el, state) || "undefined" : genElement(el, state)}}`;
  const reverseProxy = slotScope ? `` : `,proxy:true`;
  return `{key:${el.slotTarget || `"default"`},fn:${fn2}${reverseProxy}}`;
}
function genChildren(el, state, checkSkip, altGenElement, altGenNode) {
  const children3 = el.children;
  if (children3.length) {
    const el2 = children3[0];
    if (children3.length === 1 && el2.for && el2.tag !== "template" && el2.tag !== "slot") {
      const normalizationType2 = checkSkip ? state.maybeComponent(el2) ? `,1` : `,0` : ``;
      return `${(altGenElement || genElement)(el2, state)}${normalizationType2}`;
    }
    const normalizationType = checkSkip ? getNormalizationType(children3, state.maybeComponent) : 0;
    const gen2 = altGenNode || genNode;
    return `[${children3.map((c) => gen2(c, state)).join(",")}]${normalizationType ? `,${normalizationType}` : ""}`;
  }
}
function getNormalizationType(children3, maybeComponent2) {
  let res = 0;
  for (let i = 0; i < children3.length; i++) {
    const el = children3[i];
    if (el.type !== 1) {
      continue;
    }
    if (needsNormalization(el) || el.ifConditions && el.ifConditions.some((c) => needsNormalization(c.block))) {
      res = 2;
      break;
    }
    if (maybeComponent2(el) || el.ifConditions && el.ifConditions.some((c) => maybeComponent2(c.block))) {
      res = 1;
    }
  }
  return res;
}
function needsNormalization(el) {
  return el.for !== void 0 || el.tag === "template" || el.tag === "slot";
}
function genNode(node, state) {
  if (node.type === 1) {
    return genElement(node, state);
  } else if (node.type === 3 && node.isComment) {
    return genComment(node);
  } else {
    return genText(node);
  }
}
function genText(text2) {
  return `_v(${text2.type === 2 ? text2.expression : transformSpecialNewlines(JSON.stringify(text2.text))})`;
}
function genComment(comment2) {
  return `_e(${JSON.stringify(comment2.text)})`;
}
function genSlot(el, state) {
  const slotName = el.slotName || '"default"';
  const children3 = genChildren(el, state);
  let res = `_t(${slotName}${children3 ? `,function(){return ${children3}}` : ""}`;
  const attrs2 = el.attrs || el.dynamicAttrs ? genProps((el.attrs || []).concat(el.dynamicAttrs || []).map((attr) => ({
    name: camelize$3(attr.name),
    value: attr.value,
    dynamic: attr.dynamic
  }))) : null;
  const bind$$1 = el.attrsMap["v-bind"];
  if ((attrs2 || bind$$1) && !children3) {
    res += `,null`;
  }
  if (attrs2) {
    res += `,${attrs2}`;
  }
  if (bind$$1) {
    res += `${attrs2 ? "" : ",null"},${bind$$1}`;
  }
  return res + ")";
}
function genComponent(componentName, el, state) {
  const children3 = el.inlineTemplate ? null : genChildren(el, state, true);
  return `_c(${componentName},${genData$2(el, state)}${children3 ? `,${children3}` : ""})`;
}
function genProps(props2) {
  let staticProps = ``;
  let dynamicProps = ``;
  for (let i = 0; i < props2.length; i++) {
    const prop = props2[i];
    const value17 = transformSpecialNewlines(prop.value);
    if (prop.dynamic) {
      dynamicProps += `${prop.name},${value17},`;
    } else {
      staticProps += `"${prop.name}":${value17},`;
    }
  }
  staticProps = `{${staticProps.slice(0, -1)}}`;
  if (dynamicProps) {
    return `_d(${staticProps},[${dynamicProps.slice(0, -1)}])`;
  } else {
    return staticProps;
  }
}
function transformSpecialNewlines(text2) {
  return text2.replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
}
const prohibitedKeywordRE = new RegExp("\\b" + "do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,super,throw,while,yield,delete,export,import,return,switch,default,extends,finally,continue,debugger,function,arguments".split(",").join("\\b|\\b") + "\\b");
const unaryOperatorsRE = new RegExp("\\b" + "delete,typeof,void".split(",").join("\\s*\\([^\\)]*\\)|\\b") + "\\s*\\([^\\)]*\\)");
const stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;
function detectErrors(ast, warn2) {
  if (ast) {
    checkNode(ast, warn2);
  }
}
function checkNode(node, warn2) {
  if (node.type === 1) {
    for (const name in node.attrsMap) {
      if (dirRE.test(name)) {
        const value17 = node.attrsMap[name];
        if (value17) {
          const range2 = node.rawAttrsMap[name];
          if (name === "v-for") {
            checkFor(node, `v-for="${value17}"`, warn2, range2);
          } else if (name === "v-slot" || name[0] === "#") {
            checkFunctionParameterExpression(value17, `${name}="${value17}"`, warn2, range2);
          } else if (onRE.test(name)) {
            checkEvent(value17, `${name}="${value17}"`, warn2, range2);
          } else {
            checkExpression(value17, `${name}="${value17}"`, warn2, range2);
          }
        }
      }
    }
    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], warn2);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, warn2, node);
  }
}
function checkEvent(exp, text2, warn2, range2) {
  const stripped = exp.replace(stripStringRE, "");
  const keywordMatch = stripped.match(unaryOperatorsRE);
  if (keywordMatch && stripped.charAt(keywordMatch.index - 1) !== "$") {
    warn2(`avoid using JavaScript unary operator as property name: "${keywordMatch[0]}" in expression ${text2.trim()}`, range2);
  }
  checkExpression(exp, text2, warn2, range2);
}
function checkFor(node, text2, warn2, range2) {
  checkExpression(node.for || "", text2, warn2, range2);
  checkIdentifier(node.alias, "v-for alias", text2, warn2, range2);
  checkIdentifier(node.iterator1, "v-for iterator", text2, warn2, range2);
  checkIdentifier(node.iterator2, "v-for iterator", text2, warn2, range2);
}
function checkIdentifier(ident, type2, text2, warn2, range2) {
  if (typeof ident === "string") {
    try {
      new Function(`var ${ident}=_`);
    } catch (e) {
      warn2(`invalid ${type2} "${ident}" in expression: ${text2.trim()}`, range2);
    }
  }
}
function checkExpression(exp, text2, warn2, range2) {
  try {
    new Function(`return ${exp}`);
  } catch (e) {
    const keywordMatch = exp.replace(stripStringRE, "").match(prohibitedKeywordRE);
    if (keywordMatch) {
      warn2(`avoid using JavaScript keyword as property name: "${keywordMatch[0]}"
  Raw expression: ${text2.trim()}`, range2);
    } else {
      warn2(`invalid expression: ${e.message} in

    ${exp}

  Raw expression: ${text2.trim()}
`, range2);
    }
  }
}
function checkFunctionParameterExpression(exp, text2, warn2, range2) {
  try {
    new Function(exp, "");
  } catch (e) {
    warn2(`invalid function parameter expression: ${e.message} in

    ${exp}

  Raw expression: ${text2.trim()}
`, range2);
  }
}
const range$1 = 2;
function generateCodeFrame(source, start4 = 0, end2 = source.length) {
  const lines = source.split(/\r?\n/);
  let count6 = 0;
  const res = [];
  for (let i = 0; i < lines.length; i++) {
    count6 += lines[i].length + 1;
    if (count6 >= start4) {
      for (let j = i - range$1; j <= i + range$1 || end2 > count6; j++) {
        if (j < 0 || j >= lines.length)
          continue;
        res.push(`${j + 1}${repeat(` `, 3 - String(j + 1).length)}|  ${lines[j]}`);
        const lineLength = lines[j].length;
        if (j === i) {
          const pad = start4 - (count6 - lineLength) + 1;
          const length = end2 > count6 ? lineLength - pad : end2 - start4;
          res.push(`   |  ` + repeat(` `, pad) + repeat(`^`, length));
        } else if (j > i) {
          if (end2 > count6) {
            const length = Math.min(end2 - count6, lineLength);
            res.push(`   |  ` + repeat(`^`, length));
          }
          count6 += lineLength + 1;
        }
      }
      break;
    }
  }
  return res.join("\n");
}
function repeat(str2, n) {
  let result = "";
  if (n > 0) {
    while (true) {
      if (n & 1)
        result += str2;
      n >>>= 1;
      if (n <= 0)
        break;
      str2 += str2;
    }
  }
  return result;
}
function createFunction(code2, errors) {
  try {
    return new Function(code2);
  } catch (err) {
    errors.push({ err, code: code2 });
    return noop$3;
  }
}
function createCompileToFunctionFn(compile2) {
  const cache = /* @__PURE__ */ Object.create(null);
  return function compileToFunctions2(template, options, vm) {
    options = extend$1({}, options);
    const warn$$1 = options.warn || warn$1;
    delete options.warn;
    {
      try {
        new Function("return 1");
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn$$1("It seems you are using the standalone build of Vue.js in an environment with Content Security Policy that prohibits unsafe-eval. The template compiler cannot work in this environment. Consider relaxing the policy to allow unsafe-eval or pre-compiling your templates into render functions.");
        }
      }
    }
    const key = options.delimiters ? String(options.delimiters) + template : template;
    if (cache[key]) {
      return cache[key];
    }
    const compiled = compile2(template, options);
    {
      if (compiled.errors && compiled.errors.length) {
        if (options.outputSourceRange) {
          compiled.errors.forEach((e) => {
            warn$$1(`Error compiling template:

${e.msg}

` + generateCodeFrame(template, e.start, e.end), vm);
          });
        } else {
          warn$$1(`Error compiling template:

${template}

` + compiled.errors.map((e) => `- ${e}`).join("\n") + "\n", vm);
        }
      }
      if (compiled.tips && compiled.tips.length) {
        if (options.outputSourceRange) {
          compiled.tips.forEach((e) => tip(e.msg, vm));
        } else {
          compiled.tips.forEach((msg) => tip(msg, vm));
        }
      }
    }
    const res = {};
    const fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map((code2) => {
      return createFunction(code2, fnGenErrors);
    });
    {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn$$1(`Failed to generate render function:

` + fnGenErrors.map(({ err, code: code2 }) => `${err.toString()} in

${code2}
`).join("\n"), vm);
      }
    }
    return cache[key] = res;
  };
}
function createCompilerCreator(baseCompile2) {
  return function createCompiler2(baseOptions2) {
    function compile2(template, options) {
      const finalOptions = Object.create(baseOptions2);
      const errors = [];
      const tips = [];
      let warn2 = (msg, range2, tip2) => {
        (tip2 ? tips : errors).push(msg);
      };
      if (options) {
        if (options.outputSourceRange) {
          const leadingSpaceLength = template.match(/^\s*/)[0].length;
          warn2 = (msg, range2, tip2) => {
            const data49 = { msg };
            if (range2) {
              if (range2.start != null) {
                data49.start = range2.start + leadingSpaceLength;
              }
              if (range2.end != null) {
                data49.end = range2.end + leadingSpaceLength;
              }
            }
            (tip2 ? tips : errors).push(data49);
          };
        }
        if (options.modules) {
          finalOptions.modules = (baseOptions2.modules || []).concat(options.modules);
        }
        if (options.directives) {
          finalOptions.directives = extend$1(Object.create(baseOptions2.directives || null), options.directives);
        }
        for (const key in options) {
          if (key !== "modules" && key !== "directives") {
            finalOptions[key] = options[key];
          }
        }
      }
      finalOptions.warn = warn2;
      const compiled = baseCompile2(template.trim(), finalOptions);
      {
        detectErrors(compiled.ast, warn2);
      }
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled;
    }
    return {
      compile: compile2,
      compileToFunctions: createCompileToFunctionFn(compile2)
    };
  };
}
const createCompiler = createCompilerCreator(function baseCompile(template, options) {
  const ast = parse(template.trim(), options);
  if (options.optimize !== false) {
    optimize(ast, options);
  }
  const code2 = generate(ast, options);
  return {
    ast,
    render: code2.render,
    staticRenderFns: code2.staticRenderFns
  };
});
const { compile, compileToFunctions } = createCompiler(baseOptions);
let div;
function getShouldDecode(href) {
  div = div || document.createElement("div");
  div.innerHTML = href ? `<a href="
"/>` : `<div a="
"/>`;
  return div.innerHTML.indexOf("&#10;") > 0;
}
const shouldDecodeNewlines = inBrowser$3 ? getShouldDecode(false) : false;
const shouldDecodeNewlinesForHref = inBrowser$3 ? getShouldDecode(true) : false;
const idToTemplate = cached$1((id) => {
  const el = query$1(id);
  return el && el.innerHTML;
});
const mount$1 = Vue$1.prototype.$mount;
Vue$1.prototype.$mount = function(el, hydrating) {
  el = el && query$1(el);
  if (el === document.body || el === document.documentElement) {
    warn$1(`Do not mount Vue to <html> or <body> - mount to normal elements instead.`);
    return this;
  }
  const options = this.$options;
  if (!options.render) {
    let template = options.template;
    if (template) {
      if (typeof template === "string") {
        if (template.charAt(0) === "#") {
          template = idToTemplate(template);
          if (!template) {
            warn$1(`Template element not found or is empty: ${options.template}`, this);
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        {
          warn$1("invalid template option:" + template, this);
        }
        return this;
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      if (config$1.performance && mark) {
        mark("compile");
      }
      const { render: render86, staticRenderFns: staticRenderFns2 } = compileToFunctions(template, {
        outputSourceRange: true,
        shouldDecodeNewlines,
        shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this);
      options.render = render86;
      options.staticRenderFns = staticRenderFns2;
      if (config$1.performance && mark) {
        mark("compile end");
        measure(`vue ${this._name} compile`, "compile", "compile end");
      }
    }
  }
  return mount$1.call(this, el, hydrating);
};
function getOuterHTML(el) {
  if (el.outerHTML) {
    return el.outerHTML;
  } else {
    const container = document.createElement("div");
    container.appendChild(el.cloneNode(true));
    return container.innerHTML;
  }
}
Vue$1.compile = compileToFunctions;
var index$1 = "";
function getAugmentedNamespace(n) {
  if (n.__esModule)
    return n;
  var a = Object.defineProperty({}, "__esModule", { value: true });
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
}
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
/*!
 * Vue.js v2.6.14
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
var emptyObject = Object.freeze({});
function isUndef(v) {
  return v === void 0 || v === null;
}
function isDef$2(v) {
  return v !== void 0 && v !== null;
}
function isTrue(v) {
  return v === true;
}
function isFalse(v) {
  return v === false;
}
function isPrimitive(value17) {
  return typeof value17 === "string" || typeof value17 === "number" || typeof value17 === "symbol" || typeof value17 === "boolean";
}
function isObject$2(obj) {
  return obj !== null && typeof obj === "object";
}
var _toString = Object.prototype.toString;
function toRawType(value17) {
  return _toString.call(value17).slice(8, -1);
}
function isPlainObject(obj) {
  return _toString.call(obj) === "[object Object]";
}
function isRegExp(v) {
  return _toString.call(v) === "[object RegExp]";
}
function isValidArrayIndex(val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val);
}
function isPromise$2(val) {
  return isDef$2(val) && typeof val.then === "function" && typeof val.catch === "function";
}
function toString(val) {
  return val == null ? "" : Array.isArray(val) || isPlainObject(val) && val.toString === _toString ? JSON.stringify(val, null, 2) : String(val);
}
function toNumber(val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n;
}
function makeMap(str2, expectsLowerCase) {
  var map = /* @__PURE__ */ Object.create(null);
  var list2 = str2.split(",");
  for (var i = 0; i < list2.length; i++) {
    map[list2[i]] = true;
  }
  return expectsLowerCase ? function(val) {
    return map[val.toLowerCase()];
  } : function(val) {
    return map[val];
  };
}
makeMap("slot,component", true);
var isReservedAttribute = makeMap("key,ref,slot,slot-scope,is");
function remove(arr, item) {
  if (arr.length) {
    var index2 = arr.indexOf(item);
    if (index2 > -1) {
      return arr.splice(index2, 1);
    }
  }
}
var hasOwnProperty$2 = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty$2.call(obj, key);
}
function cached(fn2) {
  var cache = /* @__PURE__ */ Object.create(null);
  return function cachedFn(str2) {
    var hit = cache[str2];
    return hit || (cache[str2] = fn2(str2));
  };
}
var camelizeRE$2 = /-(\w)/g;
var camelize$2 = cached(function(str2) {
  return str2.replace(camelizeRE$2, function(_2, c) {
    return c ? c.toUpperCase() : "";
  });
});
var capitalize = cached(function(str2) {
  return str2.charAt(0).toUpperCase() + str2.slice(1);
});
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function(str2) {
  return str2.replace(hyphenateRE, "-$1").toLowerCase();
});
function polyfillBind(fn2, ctx) {
  function boundFn(a) {
    var l = arguments.length;
    return l ? l > 1 ? fn2.apply(ctx, arguments) : fn2.call(ctx, a) : fn2.call(ctx);
  }
  boundFn._length = fn2.length;
  return boundFn;
}
function nativeBind(fn2, ctx) {
  return fn2.bind(ctx);
}
var bind = Function.prototype.bind ? nativeBind : polyfillBind;
function toArray$1(list2, start4) {
  start4 = start4 || 0;
  var i = list2.length - start4;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list2[i + start4];
  }
  return ret;
}
function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to;
}
function toObject(arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
}
function noop$2(a, b, c) {
}
var no = function(a, b, c) {
  return false;
};
var identity = function(_2) {
  return _2;
};
function looseEqual(a, b) {
  if (a === b) {
    return true;
  }
  var isObjectA = isObject$2(a);
  var isObjectB = isObject$2(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function(e, i) {
          return looseEqual(e, b[i]);
        });
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function(key) {
          return looseEqual(a[key], b[key]);
        });
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}
function looseIndexOf(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) {
      return i;
    }
  }
  return -1;
}
function once(fn2) {
  var called = false;
  return function() {
    if (!called) {
      called = true;
      fn2.apply(this, arguments);
    }
  };
}
var SSR_ATTR = "data-server-rendered";
var ASSET_TYPES = [
  "component",
  "directive",
  "filter"
];
var LIFECYCLE_HOOKS = [
  "beforeCreate",
  "created",
  "beforeMount",
  "mounted",
  "beforeUpdate",
  "updated",
  "beforeDestroy",
  "destroyed",
  "activated",
  "deactivated",
  "errorCaptured",
  "serverPrefetch"
];
var config = {
  optionMergeStrategies: /* @__PURE__ */ Object.create(null),
  silent: false,
  productionTip: false,
  devtools: false,
  performance: false,
  errorHandler: null,
  warnHandler: null,
  ignoredElements: [],
  keyCodes: /* @__PURE__ */ Object.create(null),
  isReservedTag: no,
  isReservedAttr: no,
  isUnknownElement: no,
  getTagNamespace: noop$2,
  parsePlatformTagName: identity,
  mustUseProp: no,
  async: true,
  _lifecycleHooks: LIFECYCLE_HOOKS
};
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
function isReserved(str2) {
  var c = (str2 + "").charCodeAt(0);
  return c === 36 || c === 95;
}
function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}
var bailRE = new RegExp("[^" + unicodeRegExp.source + ".$_\\d]");
function parsePath(path2) {
  if (bailRE.test(path2)) {
    return;
  }
  var segments = path2.split(".");
  return function(obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) {
        return;
      }
      obj = obj[segments[i]];
    }
    return obj;
  };
}
var hasProto = "__proto__" in {};
var inBrowser$2 = typeof window !== "undefined";
var inWeex = typeof WXEnvironment !== "undefined" && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser$2 && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf("msie 9.0") > 0;
var isEdge = UA && UA.indexOf("edge/") > 0;
UA && UA.indexOf("android") > 0 || weexPlatform === "android";
var isIOS$2 = UA && /iphone|ipad|ipod|ios/.test(UA) || weexPlatform === "ios";
UA && /chrome\/\d+/.test(UA) && !isEdge;
UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);
var nativeWatch = {}.watch;
var supportsPassive$1 = false;
if (inBrowser$2) {
  try {
    var opts$1 = {};
    Object.defineProperty(opts$1, "passive", {
      get: function get6() {
        supportsPassive$1 = true;
      }
    });
    window.addEventListener("test-passive", null, opts$1);
  } catch (e) {
  }
}
var _isServer;
var isServerRendering = function() {
  if (_isServer === void 0) {
    if (!inBrowser$2 && !inWeex && typeof global !== "undefined") {
      _isServer = global["process"] && global["process"].env.VUE_ENV === "server";
    } else {
      _isServer = false;
    }
  }
  return _isServer;
};
var devtools = inBrowser$2 && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
function isNative(Ctor) {
  return typeof Ctor === "function" && /native code/.test(Ctor.toString());
}
var hasSymbol = typeof Symbol !== "undefined" && isNative(Symbol) && typeof Reflect !== "undefined" && isNative(Reflect.ownKeys);
var _Set;
if (typeof Set !== "undefined" && isNative(Set)) {
  _Set = Set;
} else {
  _Set = /* @__PURE__ */ function() {
    function Set2() {
      this.set = /* @__PURE__ */ Object.create(null);
    }
    Set2.prototype.has = function has2(key) {
      return this.set[key] === true;
    };
    Set2.prototype.add = function add4(key) {
      this.set[key] = true;
    };
    Set2.prototype.clear = function clear2() {
      this.set = /* @__PURE__ */ Object.create(null);
    };
    return Set2;
  }();
}
var warn = noop$2;
var uid$2 = 0;
var Dep = function Dep2() {
  this.id = uid$2++;
  this.subs = [];
};
Dep.prototype.addSub = function addSub(sub) {
  this.subs.push(sub);
};
Dep.prototype.removeSub = function removeSub(sub) {
  remove(this.subs, sub);
};
Dep.prototype.depend = function depend() {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};
Dep.prototype.notify = function notify() {
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};
Dep.target = null;
var targetStack = [];
function pushTarget(target2) {
  targetStack.push(target2);
  Dep.target = target2;
}
function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}
var VNode = function VNode2(tag, data49, children3, text2, elm, context2, componentOptions, asyncFactory) {
  this.tag = tag;
  this.data = data49;
  this.children = children3;
  this.text = text2;
  this.elm = elm;
  this.ns = void 0;
  this.context = context2;
  this.fnContext = void 0;
  this.fnOptions = void 0;
  this.fnScopeId = void 0;
  this.key = data49 && data49.key;
  this.componentOptions = componentOptions;
  this.componentInstance = void 0;
  this.parent = void 0;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = void 0;
  this.isAsyncPlaceholder = false;
};
var prototypeAccessors = { child: { configurable: true } };
prototypeAccessors.child.get = function() {
  return this.componentInstance;
};
Object.defineProperties(VNode.prototype, prototypeAccessors);
var createEmptyVNode = function(text2) {
  if (text2 === void 0)
    text2 = "";
  var node = new VNode();
  node.text = text2;
  node.isComment = true;
  return node;
};
function createTextVNode(val) {
  return new VNode(void 0, void 0, void 0, String(val));
}
function cloneVNode(vnode) {
  var cloned = new VNode(vnode.tag, vnode.data, vnode.children && vnode.children.slice(), vnode.text, vnode.elm, vnode.context, vnode.componentOptions, vnode.asyncFactory);
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned;
}
var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);
var methodsToPatch = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse"
];
methodsToPatch.forEach(function(method) {
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator() {
    var args = [], len2 = arguments.length;
    while (len2--)
      args[len2] = arguments[len2];
    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted2;
    switch (method) {
      case "push":
      case "unshift":
        inserted2 = args;
        break;
      case "splice":
        inserted2 = args.slice(2);
        break;
    }
    if (inserted2) {
      ob.observeArray(inserted2);
    }
    ob.dep.notify();
    return result;
  });
});
var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
var shouldObserve = true;
function toggleObserving(value17) {
  shouldObserve = value17;
}
var Observer = function Observer2(value17) {
  this.value = value17;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value17, "__ob__", this);
  if (Array.isArray(value17)) {
    if (hasProto) {
      protoAugment(value17, arrayMethods);
    } else {
      copyAugment(value17, arrayMethods, arrayKeys);
    }
    this.observeArray(value17);
  } else {
    this.walk(value17);
  }
};
Observer.prototype.walk = function walk(obj) {
  var keys2 = Object.keys(obj);
  for (var i = 0; i < keys2.length; i++) {
    defineReactive$$1(obj, keys2[i]);
  }
};
Observer.prototype.observeArray = function observeArray(items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};
function protoAugment(target2, src2) {
  target2.__proto__ = src2;
}
function copyAugment(target2, src2, keys2) {
  for (var i = 0, l = keys2.length; i < l; i++) {
    var key = keys2[i];
    def(target2, key, src2[key]);
  }
}
function observe(value17, asRootData) {
  if (!isObject$2(value17) || value17 instanceof VNode) {
    return;
  }
  var ob;
  if (hasOwn(value17, "__ob__") && value17.__ob__ instanceof Observer) {
    ob = value17.__ob__;
  } else if (shouldObserve && !isServerRendering() && (Array.isArray(value17) || isPlainObject(value17)) && Object.isExtensible(value17) && !value17._isVue) {
    ob = new Observer(value17);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob;
}
function defineReactive$$1(obj, key, val, customSetter, shallow) {
  var dep = new Dep();
  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return;
  }
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }
  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      var value17 = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value17)) {
            dependArray(value17);
          }
        }
      }
      return value17;
    },
    set: function reactiveSetter(newVal) {
      var value17 = getter ? getter.call(obj) : val;
      if (newVal === value17 || newVal !== newVal && value17 !== value17) {
        return;
      }
      if (getter && !setter) {
        return;
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}
function set(target2, key, val) {
  if (Array.isArray(target2) && isValidArrayIndex(key)) {
    target2.length = Math.max(target2.length, key);
    target2.splice(key, 1, val);
    return val;
  }
  if (key in target2 && !(key in Object.prototype)) {
    target2[key] = val;
    return val;
  }
  var ob = target2.__ob__;
  if (target2._isVue || ob && ob.vmCount) {
    return val;
  }
  if (!ob) {
    target2[key] = val;
    return val;
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val;
}
function del(target2, key) {
  if (Array.isArray(target2) && isValidArrayIndex(key)) {
    target2.splice(key, 1);
    return;
  }
  var ob = target2.__ob__;
  if (target2._isVue || ob && ob.vmCount) {
    return;
  }
  if (!hasOwn(target2, key)) {
    return;
  }
  delete target2[key];
  if (!ob) {
    return;
  }
  ob.dep.notify();
}
function dependArray(value17) {
  for (var e = void 0, i = 0, l = value17.length; i < l; i++) {
    e = value17[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}
var strats = config.optionMergeStrategies;
function mergeData(to, from) {
  if (!from) {
    return to;
  }
  var key, toVal, fromVal;
  var keys2 = hasSymbol ? Reflect.ownKeys(from) : Object.keys(from);
  for (var i = 0; i < keys2.length; i++) {
    key = keys2[i];
    if (key === "__ob__") {
      continue;
    }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (toVal !== fromVal && isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to;
}
function mergeDataOrFn(parentVal, childVal, vm) {
  if (!vm) {
    if (!childVal) {
      return parentVal;
    }
    if (!parentVal) {
      return childVal;
    }
    return function mergedDataFn() {
      return mergeData(typeof childVal === "function" ? childVal.call(this, this) : childVal, typeof parentVal === "function" ? parentVal.call(this, this) : parentVal);
    };
  } else {
    return function mergedInstanceDataFn() {
      var instanceData = typeof childVal === "function" ? childVal.call(vm, vm) : childVal;
      var defaultData2 = typeof parentVal === "function" ? parentVal.call(vm, vm) : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData2);
      } else {
        return defaultData2;
      }
    };
  }
}
strats.data = function(parentVal, childVal, vm) {
  if (!vm) {
    if (childVal && typeof childVal !== "function") {
      return parentVal;
    }
    return mergeDataOrFn(parentVal, childVal);
  }
  return mergeDataOrFn(parentVal, childVal, vm);
};
function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks2) {
  var res = [];
  for (var i = 0; i < hooks2.length; i++) {
    if (res.indexOf(hooks2[i]) === -1) {
      res.push(hooks2[i]);
    }
  }
  return res;
}
LIFECYCLE_HOOKS.forEach(function(hook) {
  strats[hook] = mergeHook;
});
function mergeAssets(parentVal, childVal, vm, key) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    return extend(res, childVal);
  } else {
    return res;
  }
}
ASSET_TYPES.forEach(function(type2) {
  strats[type2 + "s"] = mergeAssets;
});
strats.watch = function(parentVal, childVal, vm, key) {
  if (parentVal === nativeWatch) {
    parentVal = void 0;
  }
  if (childVal === nativeWatch) {
    childVal = void 0;
  }
  if (!childVal) {
    return Object.create(parentVal || null);
  }
  if (!parentVal) {
    return childVal;
  }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent ? parent.concat(child) : Array.isArray(child) ? child : [child];
  }
  return ret;
};
strats.props = strats.methods = strats.inject = strats.computed = function(parentVal, childVal, vm, key) {
  if (childVal && false) {
    assertObjectType(key, childVal);
  }
  if (!parentVal) {
    return childVal;
  }
  var ret = /* @__PURE__ */ Object.create(null);
  extend(ret, parentVal);
  if (childVal) {
    extend(ret, childVal);
  }
  return ret;
};
strats.provide = mergeDataOrFn;
var defaultStrat = function(parentVal, childVal) {
  return childVal === void 0 ? parentVal : childVal;
};
function normalizeProps(options, vm) {
  var props2 = options.props;
  if (!props2) {
    return;
  }
  var res = {};
  var i, val, name;
  if (Array.isArray(props2)) {
    i = props2.length;
    while (i--) {
      val = props2[i];
      if (typeof val === "string") {
        name = camelize$2(val);
        res[name] = { type: null };
      }
    }
  } else if (isPlainObject(props2)) {
    for (var key in props2) {
      val = props2[key];
      name = camelize$2(key);
      res[name] = isPlainObject(val) ? val : { type: val };
    }
  } else
    ;
  options.props = res;
}
function normalizeInject(options, vm) {
  var inject = options.inject;
  if (!inject) {
    return;
  }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val) ? extend({ from: key }, val) : { from: val };
    }
  } else
    ;
}
function normalizeDirectives(options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === "function") {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}
function assertObjectType(name, value17, vm) {
  if (!isPlainObject(value17)) {
    warn('Invalid value for option "' + name + '": expected an Object, but got ' + toRawType(value17) + ".");
  }
}
function mergeOptions(parent, child, vm) {
  if (typeof child === "function") {
    child = child.options;
  }
  normalizeProps(child);
  normalizeInject(child);
  normalizeDirectives(child);
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField(key2) {
    var strat = strats[key2] || defaultStrat;
    options[key2] = strat(parent[key2], child[key2], vm, key2);
  }
  return options;
}
function resolveAsset(options, type2, id, warnMissing) {
  if (typeof id !== "string") {
    return;
  }
  var assets = options[type2];
  if (hasOwn(assets, id)) {
    return assets[id];
  }
  var camelizedId = camelize$2(id);
  if (hasOwn(assets, camelizedId)) {
    return assets[camelizedId];
  }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) {
    return assets[PascalCaseId];
  }
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  return res;
}
function validateProp(key, propOptions, propsData, vm) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value17 = propsData[key];
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, "default")) {
      value17 = false;
    } else if (value17 === "" || value17 === hyphenate(key)) {
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value17 = true;
      }
    }
  }
  if (value17 === void 0) {
    value17 = getPropDefaultValue(vm, prop, key);
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value17);
    toggleObserving(prevShouldObserve);
  }
  return value17;
}
function getPropDefaultValue(vm, prop, key) {
  if (!hasOwn(prop, "default")) {
    return void 0;
  }
  var def2 = prop.default;
  if (vm && vm.$options.propsData && vm.$options.propsData[key] === void 0 && vm._props[key] !== void 0) {
    return vm._props[key];
  }
  return typeof def2 === "function" && getType(prop.type) !== "Function" ? def2.call(vm) : def2;
}
var functionTypeCheckRE = /^\s*function (\w+)/;
function getType(fn2) {
  var match = fn2 && fn2.toString().match(functionTypeCheckRE);
  return match ? match[1] : "";
}
function isSameType(a, b) {
  return getType(a) === getType(b);
}
function getTypeIndex(type2, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type2) ? 0 : -1;
  }
  for (var i = 0, len2 = expectedTypes.length; i < len2; i++) {
    if (isSameType(expectedTypes[i], type2)) {
      return i;
    }
  }
  return -1;
}
function handleError(err, vm, info) {
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while (cur = cur.$parent) {
        var hooks2 = cur.$options.errorCaptured;
        if (hooks2) {
          for (var i = 0; i < hooks2.length; i++) {
            try {
              var capture = hooks2[i].call(cur, err, vm, info) === false;
              if (capture) {
                return;
              }
            } catch (e) {
              globalHandleError(e, cur, "errorCaptured hook");
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}
function invokeWithErrorHandling(handler4, context2, args, vm, info) {
  var res;
  try {
    res = args ? handler4.apply(context2, args) : handler4.call(context2);
    if (res && !res._isVue && isPromise$2(res) && !res._handled) {
      res.catch(function(e) {
        return handleError(e, vm, info + " (Promise/async)");
      });
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res;
}
function globalHandleError(err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info);
    } catch (e) {
      if (e !== err) {
        logError(e);
      }
    }
  }
  logError(err);
}
function logError(err, vm, info) {
  if ((inBrowser$2 || inWeex) && typeof console !== "undefined") {
    console.error(err);
  } else {
    throw err;
  }
}
var isUsingMicroTask = false;
var callbacks = [];
var pending = false;
function flushCallbacks() {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}
var timerFunc;
if (typeof Promise !== "undefined" && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function() {
    p.then(flushCallbacks);
    if (isIOS$2) {
      setTimeout(noop$2);
    }
  };
  isUsingMicroTask = true;
} else if (!isIE && typeof MutationObserver !== "undefined" && (isNative(MutationObserver) || MutationObserver.toString() === "[object MutationObserverConstructor]")) {
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function() {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
  isUsingMicroTask = true;
} else if (typeof setImmediate !== "undefined" && isNative(setImmediate)) {
  timerFunc = function() {
    setImmediate(flushCallbacks);
  };
} else {
  timerFunc = function() {
    setTimeout(flushCallbacks, 0);
  };
}
function nextTick(cb, ctx) {
  var _resolve;
  callbacks.push(function() {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, "nextTick");
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  if (!cb && typeof Promise !== "undefined") {
    return new Promise(function(resolve) {
      _resolve = resolve;
    });
  }
}
var seenObjects = new _Set();
function traverse(val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}
function _traverse(val, seen) {
  var i, keys2;
  var isA = Array.isArray(val);
  if (!isA && !isObject$2(val) || Object.isFrozen(val) || val instanceof VNode) {
    return;
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return;
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) {
      _traverse(val[i], seen);
    }
  } else {
    keys2 = Object.keys(val);
    i = keys2.length;
    while (i--) {
      _traverse(val[keys2[i]], seen);
    }
  }
}
var normalizeEvent = cached(function(name) {
  var passive2 = name.charAt(0) === "&";
  name = passive2 ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === "~";
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === "!";
  name = capture ? name.slice(1) : name;
  return {
    name,
    once: once$$1,
    capture,
    passive: passive2
  };
});
function createFnInvoker(fns, vm) {
  function invoker() {
    var arguments$1 = arguments;
    var fns2 = invoker.fns;
    if (Array.isArray(fns2)) {
      var cloned = fns2.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      return invokeWithErrorHandling(fns2, null, arguments, vm, "v-on handler");
    }
  }
  invoker.fns = fns;
  return invoker;
}
function updateListeners(on2, oldOn, add4, remove$$12, createOnceHandler2, vm) {
  var name, cur, old, event;
  for (name in on2) {
    cur = on2[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur))
      ;
    else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on2[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on2[name] = createOnceHandler2(event.name, cur, event.capture);
      }
      add4(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on2[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on2[name])) {
      event = normalizeEvent(name);
      remove$$12(event.name, oldOn[name], event.capture);
    }
  }
}
function mergeVNodeHook(def2, hookKey, hook) {
  if (def2 instanceof VNode) {
    def2 = def2.data.hook || (def2.data.hook = {});
  }
  var invoker;
  var oldHook = def2[hookKey];
  function wrappedHook() {
    hook.apply(this, arguments);
    remove(invoker.fns, wrappedHook);
  }
  if (isUndef(oldHook)) {
    invoker = createFnInvoker([wrappedHook]);
  } else {
    if (isDef$2(oldHook.fns) && isTrue(oldHook.merged)) {
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }
  invoker.merged = true;
  def2[hookKey] = invoker;
}
function extractPropsFromVNodeData(data49, Ctor, tag) {
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return;
  }
  var res = {};
  var attrs2 = data49.attrs;
  var props2 = data49.props;
  if (isDef$2(attrs2) || isDef$2(props2)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      checkProp(res, props2, key, altKey, true) || checkProp(res, attrs2, key, altKey, false);
    }
  }
  return res;
}
function checkProp(res, hash2, key, altKey, preserve) {
  if (isDef$2(hash2)) {
    if (hasOwn(hash2, key)) {
      res[key] = hash2[key];
      if (!preserve) {
        delete hash2[key];
      }
      return true;
    } else if (hasOwn(hash2, altKey)) {
      res[key] = hash2[altKey];
      if (!preserve) {
        delete hash2[altKey];
      }
      return true;
    }
  }
  return false;
}
function simpleNormalizeChildren(children3) {
  for (var i = 0; i < children3.length; i++) {
    if (Array.isArray(children3[i])) {
      return Array.prototype.concat.apply([], children3);
    }
  }
  return children3;
}
function normalizeChildren(children3) {
  return isPrimitive(children3) ? [createTextVNode(children3)] : Array.isArray(children3) ? normalizeArrayChildren(children3) : void 0;
}
function isTextNode(node) {
  return isDef$2(node) && isDef$2(node.text) && isFalse(node.isComment);
}
function normalizeArrayChildren(children3, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children3.length; i++) {
    c = children3[i];
    if (isUndef(c) || typeof c === "boolean") {
      continue;
    }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, (nestedIndex || "") + "_" + i);
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + c[0].text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== "") {
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        if (isTrue(children3._isVList) && isDef$2(c.tag) && isUndef(c.key) && isDef$2(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res;
}
function initProvide(vm) {
  var provide3 = vm.$options.provide;
  if (provide3) {
    vm._provided = typeof provide3 === "function" ? provide3.call(vm) : provide3;
  }
}
function initInjections(vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function(key) {
      {
        defineReactive$$1(vm, key, result[key]);
      }
    });
    toggleObserving(true);
  }
}
function resolveInject(inject, vm) {
  if (inject) {
    var result = /* @__PURE__ */ Object.create(null);
    var keys2 = hasSymbol ? Reflect.ownKeys(inject) : Object.keys(inject);
    for (var i = 0; i < keys2.length; i++) {
      var key = keys2[i];
      if (key === "__ob__") {
        continue;
      }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break;
        }
        source = source.$parent;
      }
      if (!source) {
        if ("default" in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === "function" ? provideDefault.call(vm) : provideDefault;
        }
      }
    }
    return result;
  }
}
function resolveSlots(children3, context2) {
  if (!children3 || !children3.length) {
    return {};
  }
  var slots4 = {};
  for (var i = 0, l = children3.length; i < l; i++) {
    var child = children3[i];
    var data49 = child.data;
    if (data49 && data49.attrs && data49.attrs.slot) {
      delete data49.attrs.slot;
    }
    if ((child.context === context2 || child.fnContext === context2) && data49 && data49.slot != null) {
      var name = data49.slot;
      var slot = slots4[name] || (slots4[name] = []);
      if (child.tag === "template") {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots4.default || (slots4.default = [])).push(child);
    }
  }
  for (var name$1 in slots4) {
    if (slots4[name$1].every(isWhitespace)) {
      delete slots4[name$1];
    }
  }
  return slots4;
}
function isWhitespace(node) {
  return node.isComment && !node.asyncFactory || node.text === " ";
}
function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory;
}
function normalizeScopedSlots(slots4, normalSlots, prevSlots) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots4 ? !!slots4.$stable : !hasNormalSlots;
  var key = slots4 && slots4.$key;
  if (!slots4) {
    res = {};
  } else if (slots4._normalized) {
    return slots4._normalized;
  } else if (isStable && prevSlots && prevSlots !== emptyObject && key === prevSlots.$key && !hasNormalSlots && !prevSlots.$hasNormal) {
    return prevSlots;
  } else {
    res = {};
    for (var key$1 in slots4) {
      if (slots4[key$1] && key$1[0] !== "$") {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots4[key$1]);
      }
    }
  }
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  if (slots4 && Object.isExtensible(slots4)) {
    slots4._normalized = res;
  }
  def(res, "$stable", isStable);
  def(res, "$key", key);
  def(res, "$hasNormal", hasNormalSlots);
  return res;
}
function normalizeScopedSlot(normalSlots, key, fn2) {
  var normalized = function() {
    var res = arguments.length ? fn2.apply(null, arguments) : fn2({});
    res = res && typeof res === "object" && !Array.isArray(res) ? [res] : normalizeChildren(res);
    var vnode = res && res[0];
    return res && (!vnode || res.length === 1 && vnode.isComment && !isAsyncPlaceholder(vnode)) ? void 0 : res;
  };
  if (fn2.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized;
}
function proxyNormalSlot(slots4, key) {
  return function() {
    return slots4[key];
  };
}
function renderList(val, render86) {
  var ret, i, l, keys2, key;
  if (Array.isArray(val) || typeof val === "string") {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render86(val[i], i);
    }
  } else if (typeof val === "number") {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render86(i + 1, i);
    }
  } else if (isObject$2(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render86(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys2 = Object.keys(val);
      ret = new Array(keys2.length);
      for (i = 0, l = keys2.length; i < l; i++) {
        key = keys2[i];
        ret[i] = render86(val[key], key, i);
      }
    }
  }
  if (!isDef$2(ret)) {
    ret = [];
  }
  ret._isVList = true;
  return ret;
}
function renderSlot(name, fallbackRender, props2, bindObject) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) {
    props2 = props2 || {};
    if (bindObject) {
      props2 = extend(extend({}, bindObject), props2);
    }
    nodes = scopedSlotFn(props2) || (typeof fallbackRender === "function" ? fallbackRender() : fallbackRender);
  } else {
    nodes = this.$slots[name] || (typeof fallbackRender === "function" ? fallbackRender() : fallbackRender);
  }
  var target2 = props2 && props2.slot;
  if (target2) {
    return this.$createElement("template", { slot: target2 }, nodes);
  } else {
    return nodes;
  }
}
function resolveFilter(id) {
  return resolveAsset(this.$options, "filters", id) || identity;
}
function isKeyNotMatch(expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1;
  } else {
    return expect !== actual;
  }
}
function checkKeyCodes(eventKeyCode, key, builtInKeyCode, eventKeyName, builtInKeyName) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName);
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode);
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key;
  }
  return eventKeyCode === void 0;
}
function bindObjectProps(data49, tag, value17, asProp, isSync) {
  if (value17) {
    if (!isObject$2(value17))
      ;
    else {
      if (Array.isArray(value17)) {
        value17 = toObject(value17);
      }
      var hash2;
      var loop = function(key2) {
        if (key2 === "class" || key2 === "style" || isReservedAttribute(key2)) {
          hash2 = data49;
        } else {
          var type2 = data49.attrs && data49.attrs.type;
          hash2 = asProp || config.mustUseProp(tag, type2, key2) ? data49.domProps || (data49.domProps = {}) : data49.attrs || (data49.attrs = {});
        }
        var camelizedKey = camelize$2(key2);
        var hyphenatedKey = hyphenate(key2);
        if (!(camelizedKey in hash2) && !(hyphenatedKey in hash2)) {
          hash2[key2] = value17[key2];
          if (isSync) {
            var on2 = data49.on || (data49.on = {});
            on2["update:" + key2] = function($event) {
              value17[key2] = $event;
            };
          }
        }
      };
      for (var key in value17)
        loop(key);
    }
  }
  return data49;
}
function renderStatic(index2, isInFor) {
  var cached2 = this._staticTrees || (this._staticTrees = []);
  var tree = cached2[index2];
  if (tree && !isInFor) {
    return tree;
  }
  tree = cached2[index2] = this.$options.staticRenderFns[index2].call(this._renderProxy, null, this);
  markStatic(tree, "__static__" + index2, false);
  return tree;
}
function markOnce(tree, index2, key) {
  markStatic(tree, "__once__" + index2 + (key ? "_" + key : ""), true);
  return tree;
}
function markStatic(tree, key, isOnce) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== "string") {
        markStaticNode(tree[i], key + "_" + i, isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}
function markStaticNode(node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}
function bindObjectListeners(data49, value17) {
  if (value17) {
    if (!isPlainObject(value17))
      ;
    else {
      var on2 = data49.on = data49.on ? extend({}, data49.on) : {};
      for (var key in value17) {
        var existing = on2[key];
        var ours = value17[key];
        on2[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data49;
}
function resolveScopedSlots(fns, res, hasDynamicKeys, contentHashKey) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    res.$key = contentHashKey;
  }
  return res;
}
function bindDynamicKeys(baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === "string" && key) {
      baseObj[values[i]] = values[i + 1];
    }
  }
  return baseObj;
}
function prependModifier(value17, symbol) {
  return typeof value17 === "string" ? symbol + value17 : value17;
}
function installRenderHelpers(target2) {
  target2._o = markOnce;
  target2._n = toNumber;
  target2._s = toString;
  target2._l = renderList;
  target2._t = renderSlot;
  target2._q = looseEqual;
  target2._i = looseIndexOf;
  target2._m = renderStatic;
  target2._f = resolveFilter;
  target2._k = checkKeyCodes;
  target2._b = bindObjectProps;
  target2._v = createTextVNode;
  target2._e = createEmptyVNode;
  target2._u = resolveScopedSlots;
  target2._g = bindObjectListeners;
  target2._d = bindDynamicKeys;
  target2._p = prependModifier;
}
function FunctionalRenderContext(data49, props2, children3, parent, Ctor) {
  var this$1$1 = this;
  var options = Ctor.options;
  var contextVm;
  if (hasOwn(parent, "_uid")) {
    contextVm = Object.create(parent);
    contextVm._original = parent;
  } else {
    contextVm = parent;
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;
  this.data = data49;
  this.props = props2;
  this.children = children3;
  this.parent = parent;
  this.listeners = data49.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function() {
    if (!this$1$1.$slots) {
      normalizeScopedSlots(data49.scopedSlots, this$1$1.$slots = resolveSlots(children3, parent));
    }
    return this$1$1.$slots;
  };
  Object.defineProperty(this, "scopedSlots", {
    enumerable: true,
    get: function get6() {
      return normalizeScopedSlots(data49.scopedSlots, this.slots());
    }
  });
  if (isCompiled) {
    this.$options = options;
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data49.scopedSlots, this.$slots);
  }
  if (options._scopeId) {
    this._c = function(a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode;
    };
  } else {
    this._c = function(a, b, c, d) {
      return createElement(contextVm, a, b, c, d, needNormalization);
    };
  }
}
installRenderHelpers(FunctionalRenderContext.prototype);
function createFunctionalComponent(Ctor, propsData, data49, contextVm, children3) {
  var options = Ctor.options;
  var props2 = {};
  var propOptions = options.props;
  if (isDef$2(propOptions)) {
    for (var key in propOptions) {
      props2[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef$2(data49.attrs)) {
      mergeProps(props2, data49.attrs);
    }
    if (isDef$2(data49.props)) {
      mergeProps(props2, data49.props);
    }
  }
  var renderContext = new FunctionalRenderContext(data49, props2, children3, contextVm, Ctor);
  var vnode = options.render.call(null, renderContext._c, renderContext);
  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data49, renderContext.parent, options);
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data49, renderContext.parent, options);
    }
    return res;
  }
}
function cloneAndMarkFunctionalResult(vnode, data49, contextVm, options, renderContext) {
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (data49.slot) {
    (clone.data || (clone.data = {})).slot = data49.slot;
  }
  return clone;
}
function mergeProps(to, from) {
  for (var key in from) {
    to[camelize$2(key)] = from[key];
  }
}
var componentVNodeHooks = {
  init: function init(vnode, hydrating) {
    if (vnode.componentInstance && !vnode.componentInstance._isDestroyed && vnode.data.keepAlive) {
      var mountedNode = vnode;
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance);
      child.$mount(hydrating ? vnode.elm : void 0, hydrating);
    }
  },
  prepatch: function prepatch(oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(child, options.propsData, options.listeners, vnode, options.children);
  },
  insert: function insert(vnode) {
    var context2 = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, "mounted");
    }
    if (vnode.data.keepAlive) {
      if (context2._isMounted) {
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true);
      }
    }
  },
  destroy: function destroy(vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true);
      }
    }
  }
};
var hooksToMerge = Object.keys(componentVNodeHooks);
function createComponent$1J(Ctor, data49, context2, children3, tag) {
  if (isUndef(Ctor)) {
    return;
  }
  var baseCtor = context2.$options._base;
  if (isObject$2(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }
  if (typeof Ctor !== "function") {
    return;
  }
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === void 0) {
      return createAsyncPlaceholder(asyncFactory, data49, context2, children3, tag);
    }
  }
  data49 = data49 || {};
  resolveConstructorOptions(Ctor);
  if (isDef$2(data49.model)) {
    transformModel(Ctor.options, data49);
  }
  var propsData = extractPropsFromVNodeData(data49, Ctor);
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data49, context2, children3);
  }
  var listeners3 = data49.on;
  data49.on = data49.nativeOn;
  if (isTrue(Ctor.options.abstract)) {
    var slot = data49.slot;
    data49 = {};
    if (slot) {
      data49.slot = slot;
    }
  }
  installComponentHooks(data49);
  var name = Ctor.options.name || tag;
  var vnode = new VNode("vue-component-" + Ctor.cid + (name ? "-" + name : ""), data49, void 0, void 0, void 0, context2, { Ctor, propsData, listeners: listeners3, tag, children: children3 }, asyncFactory);
  return vnode;
}
function createComponentInstanceForVnode(vnode, parent) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent
  };
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef$2(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options);
}
function installComponentHooks(data49) {
  var hooks2 = data49.hook || (data49.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks2[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks2[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}
function mergeHook$1(f1, f2) {
  var merged = function(a, b) {
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged;
}
function transformModel(options, data49) {
  var prop = options.model && options.model.prop || "value";
  var event = options.model && options.model.event || "input";
  (data49.attrs || (data49.attrs = {}))[prop] = data49.model.value;
  var on2 = data49.on || (data49.on = {});
  var existing = on2[event];
  var callback2 = data49.model.callback;
  if (isDef$2(existing)) {
    if (Array.isArray(existing) ? existing.indexOf(callback2) === -1 : existing !== callback2) {
      on2[event] = [callback2].concat(existing);
    }
  } else {
    on2[event] = callback2;
  }
}
var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;
function createElement(context2, tag, data49, children3, normalizationType, alwaysNormalize) {
  if (Array.isArray(data49) || isPrimitive(data49)) {
    normalizationType = children3;
    children3 = data49;
    data49 = void 0;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context2, tag, data49, children3, normalizationType);
}
function _createElement(context2, tag, data49, children3, normalizationType) {
  if (isDef$2(data49) && isDef$2(data49.__ob__)) {
    return createEmptyVNode();
  }
  if (isDef$2(data49) && isDef$2(data49.is)) {
    tag = data49.is;
  }
  if (!tag) {
    return createEmptyVNode();
  }
  if (Array.isArray(children3) && typeof children3[0] === "function") {
    data49 = data49 || {};
    data49.scopedSlots = { default: children3[0] };
    children3.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children3 = normalizeChildren(children3);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children3 = simpleNormalizeChildren(children3);
  }
  var vnode, ns;
  if (typeof tag === "string") {
    var Ctor;
    ns = context2.$vnode && context2.$vnode.ns || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      vnode = new VNode(config.parsePlatformTagName(tag), data49, children3, void 0, void 0, context2);
    } else if ((!data49 || !data49.pre) && isDef$2(Ctor = resolveAsset(context2.$options, "components", tag))) {
      vnode = createComponent$1J(Ctor, data49, context2, children3, tag);
    } else {
      vnode = new VNode(tag, data49, children3, void 0, void 0, context2);
    }
  } else {
    vnode = createComponent$1J(tag, data49, context2, children3);
  }
  if (Array.isArray(vnode)) {
    return vnode;
  } else if (isDef$2(vnode)) {
    if (isDef$2(ns)) {
      applyNS(vnode, ns);
    }
    if (isDef$2(data49)) {
      registerDeepBindings(data49);
    }
    return vnode;
  } else {
    return createEmptyVNode();
  }
}
function applyNS(vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === "foreignObject") {
    ns = void 0;
    force = true;
  }
  if (isDef$2(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef$2(child.tag) && (isUndef(child.ns) || isTrue(force) && child.tag !== "svg")) {
        applyNS(child, ns, force);
      }
    }
  }
}
function registerDeepBindings(data49) {
  if (isObject$2(data49.style)) {
    traverse(data49.style);
  }
  if (isObject$2(data49.class)) {
    traverse(data49.class);
  }
}
function initRender(vm) {
  vm._vnode = null;
  vm._staticTrees = null;
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode;
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  vm._c = function(a, b, c, d) {
    return createElement(vm, a, b, c, d, false);
  };
  vm.$createElement = function(a, b, c, d) {
    return createElement(vm, a, b, c, d, true);
  };
  var parentData = parentVnode && parentVnode.data;
  {
    defineReactive$$1(vm, "$attrs", parentData && parentData.attrs || emptyObject, null, true);
    defineReactive$$1(vm, "$listeners", options._parentListeners || emptyObject, null, true);
  }
}
var currentRenderingInstance = null;
function renderMixin(Vue3) {
  installRenderHelpers(Vue3.prototype);
  Vue3.prototype.$nextTick = function(fn2) {
    return nextTick(fn2, this);
  };
  Vue3.prototype._render = function() {
    var vm = this;
    var ref2 = vm.$options;
    var render86 = ref2.render;
    var _parentVnode = ref2._parentVnode;
    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(_parentVnode.data.scopedSlots, vm.$slots, vm.$scopedSlots);
    }
    vm.$vnode = _parentVnode;
    var vnode;
    try {
      currentRenderingInstance = vm;
      vnode = render86.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    if (!(vnode instanceof VNode)) {
      vnode = createEmptyVNode();
    }
    vnode.parent = _parentVnode;
    return vnode;
  };
}
function ensureCtor(comp, base) {
  if (comp.__esModule || hasSymbol && comp[Symbol.toStringTag] === "Module") {
    comp = comp.default;
  }
  return isObject$2(comp) ? base.extend(comp) : comp;
}
function createAsyncPlaceholder(factory, data49, context2, children3, tag) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data49, context: context2, children: children3, tag };
  return node;
}
function resolveAsyncComponent(factory, baseCtor) {
  if (isTrue(factory.error) && isDef$2(factory.errorComp)) {
    return factory.errorComp;
  }
  if (isDef$2(factory.resolved)) {
    return factory.resolved;
  }
  var owner = currentRenderingInstance;
  if (owner && isDef$2(factory.owners) && factory.owners.indexOf(owner) === -1) {
    factory.owners.push(owner);
  }
  if (isTrue(factory.loading) && isDef$2(factory.loadingComp)) {
    return factory.loadingComp;
  }
  if (owner && !isDef$2(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null;
    owner.$on("hook:destroyed", function() {
      return remove(owners, owner);
    });
    var forceRender = function(renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        owners[i].$forceUpdate();
      }
      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };
    var resolve = once(function(res2) {
      factory.resolved = ensureCtor(res2, baseCtor);
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });
    var reject = once(function(reason) {
      if (isDef$2(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });
    var res = factory(resolve, reject);
    if (isObject$2(res)) {
      if (isPromise$2(res)) {
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise$2(res.component)) {
        res.component.then(resolve, reject);
        if (isDef$2(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }
        if (isDef$2(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function() {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }
        if (isDef$2(res.timeout)) {
          timerTimeout = setTimeout(function() {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(null);
            }
          }, res.timeout);
        }
      }
    }
    sync = false;
    return factory.loading ? factory.loadingComp : factory.resolved;
  }
}
function getFirstComponentChild(children3) {
  if (Array.isArray(children3)) {
    for (var i = 0; i < children3.length; i++) {
      var c = children3[i];
      if (isDef$2(c) && (isDef$2(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c;
      }
    }
  }
}
function initEvents(vm) {
  vm._events = /* @__PURE__ */ Object.create(null);
  vm._hasHookEvent = false;
  var listeners3 = vm.$options._parentListeners;
  if (listeners3) {
    updateComponentListeners(vm, listeners3);
  }
}
var target;
function add(event, fn2) {
  target.$on(event, fn2);
}
function remove$1(event, fn2) {
  target.$off(event, fn2);
}
function createOnceHandler(event, fn2) {
  var _target = target;
  return function onceHandler() {
    var res = fn2.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  };
}
function updateComponentListeners(vm, listeners3, oldListeners) {
  target = vm;
  updateListeners(listeners3, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = void 0;
}
function eventsMixin(Vue3) {
  var hookRE = /^hook:/;
  Vue3.prototype.$on = function(event, fn2) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn2);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn2);
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm;
  };
  Vue3.prototype.$once = function(event, fn2) {
    var vm = this;
    function on2() {
      vm.$off(event, on2);
      fn2.apply(vm, arguments);
    }
    on2.fn = fn2;
    vm.$on(event, on2);
    return vm;
  };
  Vue3.prototype.$off = function(event, fn2) {
    var vm = this;
    if (!arguments.length) {
      vm._events = /* @__PURE__ */ Object.create(null);
      return vm;
    }
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn2);
      }
      return vm;
    }
    var cbs = vm._events[event];
    if (!cbs) {
      return vm;
    }
    if (!fn2) {
      vm._events[event] = null;
      return vm;
    }
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn2 || cb.fn === fn2) {
        cbs.splice(i, 1);
        break;
      }
    }
    return vm;
  };
  Vue3.prototype.$emit = function(event) {
    var vm = this;
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray$1(cbs) : cbs;
      var args = toArray$1(arguments, 1);
      var info = 'event handler for "' + event + '"';
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm;
  };
}
var activeInstance = null;
function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function() {
    activeInstance = prevActiveInstance;
  };
}
function initLifecycle(vm) {
  var options = vm.$options;
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }
  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;
  vm.$children = [];
  vm.$refs = {};
  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}
function lifecycleMixin(Vue3) {
  Vue3.prototype._update = function(vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    if (!prevVnode) {
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false);
    } else {
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
  };
  Vue3.prototype.$forceUpdate = function() {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };
  Vue3.prototype.$destroy = function() {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return;
    }
    callHook(vm, "beforeDestroy");
    vm._isBeingDestroyed = true;
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    vm._isDestroyed = true;
    vm.__patch__(vm._vnode, null);
    callHook(vm, "destroyed");
    vm.$off();
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}
function mountComponent(vm, el, hydrating) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
  }
  callHook(vm, "beforeMount");
  var updateComponent;
  {
    updateComponent = function() {
      vm._update(vm._render(), hydrating);
    };
  }
  new Watcher(vm, updateComponent, noop$2, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, "beforeUpdate");
      }
    }
  }, true);
  hydrating = false;
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, "mounted");
  }
  return vm;
}
function updateChildComponent(vm, propsData, listeners3, parentVnode, renderChildren) {
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(newScopedSlots && !newScopedSlots.$stable || oldScopedSlots !== emptyObject && !oldScopedSlots.$stable || newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key || !newScopedSlots && vm.$scopedSlots.$key);
  var needsForceUpdate = !!(renderChildren || vm.$options._renderChildren || hasDynamicScopedSlot);
  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode;
  if (vm._vnode) {
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners3 || emptyObject;
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props2 = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props;
      props2[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    vm.$options.propsData = propsData;
  }
  listeners3 = listeners3 || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners3;
  updateComponentListeners(vm, listeners3, oldListeners);
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }
}
function isInInactiveTree(vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) {
      return true;
    }
  }
  return false;
}
function activateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return;
    }
  } else if (vm._directInactive) {
    return;
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, "activated");
  }
}
function deactivateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return;
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, "deactivated");
  }
}
function callHook(vm, hook) {
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit("hook:" + hook);
  }
  popTarget();
}
var queue$1 = [];
var activatedChildren = [];
var has = {};
var waiting = false;
var flushing = false;
var index = 0;
function resetSchedulerState() {
  index = queue$1.length = activatedChildren.length = 0;
  has = {};
  waiting = flushing = false;
}
var currentFlushTimestamp = 0;
var getNow = Date.now;
if (inBrowser$2 && !isIE) {
  var performance = window.performance;
  if (performance && typeof performance.now === "function" && getNow() > document.createEvent("Event").timeStamp) {
    getNow = function() {
      return performance.now();
    };
  }
}
function flushSchedulerQueue() {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;
  queue$1.sort(function(a, b) {
    return a.id - b.id;
  });
  for (index = 0; index < queue$1.length; index++) {
    watcher = queue$1[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
  }
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue$1.slice();
  resetSchedulerState();
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);
  if (devtools && config.devtools) {
    devtools.emit("flush");
  }
}
function callUpdatedHooks(queue2) {
  var i = queue2.length;
  while (i--) {
    var watcher = queue2[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, "updated");
    }
  }
}
function queueActivatedComponent(vm) {
  vm._inactive = false;
  activatedChildren.push(vm);
}
function callActivatedHooks(queue2) {
  for (var i = 0; i < queue2.length; i++) {
    queue2[i]._inactive = true;
    activateChildComponent(queue2[i], true);
  }
}
function queueWatcher(watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue$1.push(watcher);
    } else {
      var i = queue$1.length - 1;
      while (i > index && queue$1[i].id > watcher.id) {
        i--;
      }
      queue$1.splice(i + 1, 0, watcher);
    }
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}
var uid$2$1 = 0;
var Watcher = function Watcher2(vm, expOrFn, cb, options, isRenderWatcher) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2$1;
  this.active = true;
  this.dirty = this.lazy;
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = "";
  if (typeof expOrFn === "function") {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop$2;
    }
  }
  this.value = this.lazy ? void 0 : this.get();
};
Watcher.prototype.get = function get() {
  pushTarget(this);
  var value17;
  var vm = this.vm;
  try {
    value17 = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, 'getter for watcher "' + this.expression + '"');
    } else {
      throw e;
    }
  } finally {
    if (this.deep) {
      traverse(value17);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value17;
};
Watcher.prototype.addDep = function addDep(dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};
Watcher.prototype.cleanupDeps = function cleanupDeps() {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};
Watcher.prototype.update = function update() {
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};
Watcher.prototype.run = function run() {
  if (this.active) {
    var value17 = this.get();
    if (value17 !== this.value || isObject$2(value17) || this.deep) {
      var oldValue = this.value;
      this.value = value17;
      if (this.user) {
        var info = 'callback for watcher "' + this.expression + '"';
        invokeWithErrorHandling(this.cb, this.vm, [value17, oldValue], this.vm, info);
      } else {
        this.cb.call(this.vm, value17, oldValue);
      }
    }
  }
};
Watcher.prototype.evaluate = function evaluate() {
  this.value = this.get();
  this.dirty = false;
};
Watcher.prototype.depend = function depend2() {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};
Watcher.prototype.teardown = function teardown() {
  if (this.active) {
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};
var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop$2,
  set: noop$2
};
function proxy(target2, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key];
  };
  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target2, key, sharedPropertyDefinition);
}
function initState(vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) {
    initProps(vm, opts.props);
  }
  if (opts.methods) {
    initMethods(vm, opts.methods);
  }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true);
  }
  if (opts.computed) {
    initComputed(vm, opts.computed);
  }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}
function initProps(vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props2 = vm._props = {};
  var keys2 = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function(key2) {
    keys2.push(key2);
    var value17 = validateProp(key2, propsOptions, propsData, vm);
    {
      defineReactive$$1(props2, key2, value17);
    }
    if (!(key2 in vm)) {
      proxy(vm, "_props", key2);
    }
  };
  for (var key in propsOptions)
    loop(key);
  toggleObserving(true);
}
function initData(vm) {
  var data49 = vm.$options.data;
  data49 = vm._data = typeof data49 === "function" ? getData(data49, vm) : data49 || {};
  if (!isPlainObject(data49)) {
    data49 = {};
  }
  var keys2 = Object.keys(data49);
  var props2 = vm.$options.props;
  vm.$options.methods;
  var i = keys2.length;
  while (i--) {
    var key = keys2[i];
    if (props2 && hasOwn(props2, key))
      ;
    else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  observe(data49, true);
}
function getData(data49, vm) {
  pushTarget();
  try {
    return data49.call(vm, vm);
  } catch (e) {
    handleError(e, vm, "data()");
    return {};
  } finally {
    popTarget();
  }
}
var computedWatcherOptions = { lazy: true };
function initComputed(vm, computed) {
  var watchers = vm._computedWatchers = /* @__PURE__ */ Object.create(null);
  var isSSR = isServerRendering();
  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === "function" ? userDef : userDef.get;
    if (!isSSR) {
      watchers[key] = new Watcher(vm, getter || noop$2, noop$2, computedWatcherOptions);
    }
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    }
  }
}
function defineComputed(target2, key, userDef) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === "function") {
    sharedPropertyDefinition.get = shouldCache ? createComputedGetter(key) : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop$2;
  } else {
    sharedPropertyDefinition.get = userDef.get ? shouldCache && userDef.cache !== false ? createComputedGetter(key) : createGetterInvoker(userDef.get) : noop$2;
    sharedPropertyDefinition.set = userDef.set || noop$2;
  }
  Object.defineProperty(target2, key, sharedPropertyDefinition);
}
function createComputedGetter(key) {
  return function computedGetter() {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value;
    }
  };
}
function createGetterInvoker(fn2) {
  return function computedGetter() {
    return fn2.call(this, this);
  };
}
function initMethods(vm, methods) {
  vm.$options.props;
  for (var key in methods) {
    vm[key] = typeof methods[key] !== "function" ? noop$2 : bind(methods[key], vm);
  }
}
function initWatch(vm, watch) {
  for (var key in watch) {
    var handler4 = watch[key];
    if (Array.isArray(handler4)) {
      for (var i = 0; i < handler4.length; i++) {
        createWatcher(vm, key, handler4[i]);
      }
    } else {
      createWatcher(vm, key, handler4);
    }
  }
}
function createWatcher(vm, expOrFn, handler4, options) {
  if (isPlainObject(handler4)) {
    options = handler4;
    handler4 = handler4.handler;
  }
  if (typeof handler4 === "string") {
    handler4 = vm[handler4];
  }
  return vm.$watch(expOrFn, handler4, options);
}
function stateMixin(Vue3) {
  var dataDef = {};
  dataDef.get = function() {
    return this._data;
  };
  var propsDef = {};
  propsDef.get = function() {
    return this._props;
  };
  Object.defineProperty(Vue3.prototype, "$data", dataDef);
  Object.defineProperty(Vue3.prototype, "$props", propsDef);
  Vue3.prototype.$set = set;
  Vue3.prototype.$delete = del;
  Vue3.prototype.$watch = function(expOrFn, cb, options) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options);
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      var info = 'callback for immediate watcher "' + watcher.expression + '"';
      pushTarget();
      invokeWithErrorHandling(cb, vm, [watcher.value], vm, info);
      popTarget();
    }
    return function unwatchFn() {
      watcher.teardown();
    };
  };
}
var uid$3 = 0;
function initMixin(Vue3) {
  Vue3.prototype._init = function(options) {
    var vm = this;
    vm._uid = uid$3++;
    vm._isVue = true;
    if (options && options._isComponent) {
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
    }
    {
      vm._renderProxy = vm;
    }
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, "beforeCreate");
    initInjections(vm);
    initState(vm);
    initProvide(vm);
    callHook(vm, "created");
    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}
function initInternalComponent(vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;
  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}
function resolveConstructorOptions(Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      Ctor.superOptions = superOptions;
      var modifiedOptions = resolveModifiedOptions(Ctor);
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options;
}
function resolveModifiedOptions(Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) {
        modified = {};
      }
      modified[key] = latest[key];
    }
  }
  return modified;
}
function Vue(options) {
  this._init(options);
}
initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);
function initUse(Vue3) {
  Vue3.use = function(plugin) {
    var installedPlugins = this._installedPlugins || (this._installedPlugins = []);
    if (installedPlugins.indexOf(plugin) > -1) {
      return this;
    }
    var args = toArray$1(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === "function") {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === "function") {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this;
  };
}
function initMixin$1(Vue3) {
  Vue3.mixin = function(mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this;
  };
}
function initExtend(Vue3) {
  Vue3.cid = 0;
  var cid = 1;
  Vue3.extend = function(extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId];
    }
    var name = extendOptions.name || Super.options.name;
    var Sub = function VueComponent(options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(Super.options, extendOptions);
    Sub["super"] = Super;
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;
    ASSET_TYPES.forEach(function(type2) {
      Sub[type2] = Super[type2];
    });
    if (name) {
      Sub.options.components[name] = Sub;
    }
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);
    cachedCtors[SuperId] = Sub;
    return Sub;
  };
}
function initProps$1(Comp) {
  var props2 = Comp.options.props;
  for (var key in props2) {
    proxy(Comp.prototype, "_props", key);
  }
}
function initComputed$1(Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}
function initAssetRegisters(Vue3) {
  ASSET_TYPES.forEach(function(type2) {
    Vue3[type2] = function(id, definition) {
      if (!definition) {
        return this.options[type2 + "s"][id];
      } else {
        if (type2 === "component" && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type2 === "directive" && typeof definition === "function") {
          definition = { bind: definition, update: definition };
        }
        this.options[type2 + "s"][id] = definition;
        return definition;
      }
    };
  });
}
function getComponentName(opts) {
  return opts && (opts.Ctor.options.name || opts.tag);
}
function matches(pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1;
  } else if (typeof pattern === "string") {
    return pattern.split(",").indexOf(name) > -1;
  } else if (isRegExp(pattern)) {
    return pattern.test(name);
  }
  return false;
}
function pruneCache(keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys2 = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var entry = cache[key];
    if (entry) {
      var name = entry.name;
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys2, _vnode);
      }
    }
  }
}
function pruneCacheEntry(cache, key, keys2, current) {
  var entry = cache[key];
  if (entry && (!current || entry.tag !== current.tag)) {
    entry.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys2, key);
}
var patternTypes = [String, RegExp, Array];
var KeepAlive = {
  name: "keep-alive",
  abstract: true,
  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },
  methods: {
    cacheVNode: function cacheVNode() {
      var ref2 = this;
      var cache = ref2.cache;
      var keys2 = ref2.keys;
      var vnodeToCache = ref2.vnodeToCache;
      var keyToCache = ref2.keyToCache;
      if (vnodeToCache) {
        var tag = vnodeToCache.tag;
        var componentInstance = vnodeToCache.componentInstance;
        var componentOptions = vnodeToCache.componentOptions;
        cache[keyToCache] = {
          name: getComponentName(componentOptions),
          tag,
          componentInstance
        };
        keys2.push(keyToCache);
        if (this.max && keys2.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys2[0], keys2, this._vnode);
        }
        this.vnodeToCache = null;
      }
    }
  },
  created: function created() {
    this.cache = /* @__PURE__ */ Object.create(null);
    this.keys = [];
  },
  destroyed: function destroyed() {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },
  mounted: function mounted() {
    var this$1$1 = this;
    this.cacheVNode();
    this.$watch("include", function(val) {
      pruneCache(this$1$1, function(name) {
        return matches(val, name);
      });
    });
    this.$watch("exclude", function(val) {
      pruneCache(this$1$1, function(name) {
        return !matches(val, name);
      });
    });
  },
  updated: function updated() {
    this.cacheVNode();
  },
  render: function render() {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      var name = getComponentName(componentOptions);
      var ref2 = this;
      var include = ref2.include;
      var exclude = ref2.exclude;
      if (include && (!name || !matches(include, name)) || exclude && name && matches(exclude, name)) {
        return vnode;
      }
      var ref$12 = this;
      var cache = ref$12.cache;
      var keys2 = ref$12.keys;
      var key = vnode.key == null ? componentOptions.Ctor.cid + (componentOptions.tag ? "::" + componentOptions.tag : "") : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        remove(keys2, key);
        keys2.push(key);
      } else {
        this.vnodeToCache = vnode;
        this.keyToCache = key;
      }
      vnode.data.keepAlive = true;
    }
    return vnode || slot && slot[0];
  }
};
var builtInComponents = {
  KeepAlive
};
function initGlobalAPI(Vue3) {
  var configDef = {};
  configDef.get = function() {
    return config;
  };
  Object.defineProperty(Vue3, "config", configDef);
  Vue3.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive: defineReactive$$1
  };
  Vue3.set = set;
  Vue3.delete = del;
  Vue3.nextTick = nextTick;
  Vue3.observable = function(obj) {
    observe(obj);
    return obj;
  };
  Vue3.options = /* @__PURE__ */ Object.create(null);
  ASSET_TYPES.forEach(function(type2) {
    Vue3.options[type2 + "s"] = /* @__PURE__ */ Object.create(null);
  });
  Vue3.options._base = Vue3;
  extend(Vue3.options.components, builtInComponents);
  initUse(Vue3);
  initMixin$1(Vue3);
  initExtend(Vue3);
  initAssetRegisters(Vue3);
}
initGlobalAPI(Vue);
Object.defineProperty(Vue.prototype, "$isServer", {
  get: isServerRendering
});
Object.defineProperty(Vue.prototype, "$ssrContext", {
  get: function get2() {
    return this.$vnode && this.$vnode.ssrContext;
  }
});
Object.defineProperty(Vue, "FunctionalRenderContext", {
  value: FunctionalRenderContext
});
Vue.version = "2.6.14";
var isReservedAttr = makeMap("style,class");
var acceptValue = makeMap("input,textarea,option,select,progress");
var mustUseProp = function(tag, type2, attr) {
  return attr === "value" && acceptValue(tag) && type2 !== "button" || attr === "selected" && tag === "option" || attr === "checked" && tag === "input" || attr === "muted" && tag === "video";
};
var isEnumeratedAttr = makeMap("contenteditable,draggable,spellcheck");
var isValidContentEditableValue = makeMap("events,caret,typing,plaintext-only");
var convertEnumeratedValue = function(key, value17) {
  return isFalsyAttrValue(value17) || value17 === "false" ? "false" : key === "contenteditable" && isValidContentEditableValue(value17) ? value17 : "true";
};
var isBooleanAttr = makeMap("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,truespeed,typemustmatch,visible");
var xlinkNS = "http://www.w3.org/1999/xlink";
var isXlink = function(name) {
  return name.charAt(5) === ":" && name.slice(0, 5) === "xlink";
};
var getXlinkProp = function(name) {
  return isXlink(name) ? name.slice(6, name.length) : "";
};
var isFalsyAttrValue = function(val) {
  return val == null || val === false;
};
function genClassForVnode(vnode) {
  var data49 = vnode.data;
  var parentNode2 = vnode;
  var childNode = vnode;
  while (isDef$2(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data49 = mergeClassData(childNode.data, data49);
    }
  }
  while (isDef$2(parentNode2 = parentNode2.parent)) {
    if (parentNode2 && parentNode2.data) {
      data49 = mergeClassData(data49, parentNode2.data);
    }
  }
  return renderClass(data49.staticClass, data49.class);
}
function mergeClassData(child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef$2(child.class) ? [child.class, parent.class] : parent.class
  };
}
function renderClass(staticClass, dynamicClass) {
  if (isDef$2(staticClass) || isDef$2(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass));
  }
  return "";
}
function concat(a, b) {
  return a ? b ? a + " " + b : a : b || "";
}
function stringifyClass(value17) {
  if (Array.isArray(value17)) {
    return stringifyArray(value17);
  }
  if (isObject$2(value17)) {
    return stringifyObject(value17);
  }
  if (typeof value17 === "string") {
    return value17;
  }
  return "";
}
function stringifyArray(value17) {
  var res = "";
  var stringified;
  for (var i = 0, l = value17.length; i < l; i++) {
    if (isDef$2(stringified = stringifyClass(value17[i])) && stringified !== "") {
      if (res) {
        res += " ";
      }
      res += stringified;
    }
  }
  return res;
}
function stringifyObject(value17) {
  var res = "";
  for (var key in value17) {
    if (value17[key]) {
      if (res) {
        res += " ";
      }
      res += key;
    }
  }
  return res;
}
var namespaceMap = {
  svg: "http://www.w3.org/2000/svg",
  math: "http://www.w3.org/1998/Math/MathML"
};
var isHTMLTag = makeMap("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot");
var isSVG = makeMap("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,foreignobject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view", true);
var isReservedTag = function(tag) {
  return isHTMLTag(tag) || isSVG(tag);
};
function getTagNamespace(tag) {
  if (isSVG(tag)) {
    return "svg";
  }
  if (tag === "math") {
    return "math";
  }
}
var unknownElementCache = /* @__PURE__ */ Object.create(null);
function isUnknownElement(tag) {
  if (!inBrowser$2) {
    return true;
  }
  if (isReservedTag(tag)) {
    return false;
  }
  tag = tag.toLowerCase();
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag];
  }
  var el = document.createElement(tag);
  if (tag.indexOf("-") > -1) {
    return unknownElementCache[tag] = el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
  } else {
    return unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString());
  }
}
var isTextInputType = makeMap("text,number,password,search,email,tel,url");
function query(el) {
  if (typeof el === "string") {
    var selected = document.querySelector(el);
    if (!selected) {
      return document.createElement("div");
    }
    return selected;
  } else {
    return el;
  }
}
function createElement$1(tagName2, vnode) {
  var elm = document.createElement(tagName2);
  if (tagName2 !== "select") {
    return elm;
  }
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== void 0) {
    elm.setAttribute("multiple", "multiple");
  }
  return elm;
}
function createElementNS(namespace2, tagName2) {
  return document.createElementNS(namespaceMap[namespace2], tagName2);
}
function createTextNode(text2) {
  return document.createTextNode(text2);
}
function createComment(text2) {
  return document.createComment(text2);
}
function insertBefore(parentNode2, newNode, referenceNode) {
  parentNode2.insertBefore(newNode, referenceNode);
}
function removeChild(node, child) {
  node.removeChild(child);
}
function appendChild(node, child) {
  node.appendChild(child);
}
function parentNode(node) {
  return node.parentNode;
}
function nextSibling(node) {
  return node.nextSibling;
}
function tagName(node) {
  return node.tagName;
}
function setTextContent(node, text2) {
  node.textContent = text2;
}
function setStyleScope(node, scopeId) {
  node.setAttribute(scopeId, "");
}
var nodeOps = /* @__PURE__ */ Object.freeze({
  createElement: createElement$1,
  createElementNS,
  createTextNode,
  createComment,
  insertBefore,
  removeChild,
  appendChild,
  parentNode,
  nextSibling,
  tagName,
  setTextContent,
  setStyleScope
});
var ref = {
  create: function create(_2, vnode) {
    registerRef(vnode);
  },
  update: function update2(oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy2(vnode) {
    registerRef(vnode, true);
  }
};
function registerRef(vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!isDef$2(key)) {
    return;
  }
  var vm = vnode.context;
  var ref2 = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref2);
    } else if (refs[key] === ref2) {
      refs[key] = void 0;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref2];
      } else if (refs[key].indexOf(ref2) < 0) {
        refs[key].push(ref2);
      }
    } else {
      refs[key] = ref2;
    }
  }
}
var emptyNode = new VNode("", {}, []);
var hooks = ["create", "activate", "update", "remove", "destroy"];
function sameVnode(a, b) {
  return a.key === b.key && a.asyncFactory === b.asyncFactory && (a.tag === b.tag && a.isComment === b.isComment && isDef$2(a.data) === isDef$2(b.data) && sameInputType(a, b) || isTrue(a.isAsyncPlaceholder) && isUndef(b.asyncFactory.error));
}
function sameInputType(a, b) {
  if (a.tag !== "input") {
    return true;
  }
  var i;
  var typeA = isDef$2(i = a.data) && isDef$2(i = i.attrs) && i.type;
  var typeB = isDef$2(i = b.data) && isDef$2(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB);
}
function createKeyToOldIdx(children3, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children3[i].key;
    if (isDef$2(key)) {
      map[key] = i;
    }
  }
  return map;
}
function createPatchFunction(backend) {
  var i, j;
  var cbs = {};
  var modules2 = backend.modules;
  var nodeOps2 = backend.nodeOps;
  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules2.length; ++j) {
      if (isDef$2(modules2[j][hooks[i]])) {
        cbs[hooks[i]].push(modules2[j][hooks[i]]);
      }
    }
  }
  function emptyNodeAt(elm) {
    return new VNode(nodeOps2.tagName(elm).toLowerCase(), {}, [], void 0, elm);
  }
  function createRmCb(childElm, listeners3) {
    function remove$$12() {
      if (--remove$$12.listeners === 0) {
        removeNode2(childElm);
      }
    }
    remove$$12.listeners = listeners3;
    return remove$$12;
  }
  function removeNode2(el) {
    var parent = nodeOps2.parentNode(el);
    if (isDef$2(parent)) {
      nodeOps2.removeChild(parent, el);
    }
  }
  function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested, ownerArray, index2) {
    if (isDef$2(vnode.elm) && isDef$2(ownerArray)) {
      vnode = ownerArray[index2] = cloneVNode(vnode);
    }
    vnode.isRootInsert = !nested;
    if (createComponent2(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return;
    }
    var data49 = vnode.data;
    var children3 = vnode.children;
    var tag = vnode.tag;
    if (isDef$2(tag)) {
      vnode.elm = vnode.ns ? nodeOps2.createElementNS(vnode.ns, tag) : nodeOps2.createElement(tag, vnode);
      setScope(vnode);
      {
        createChildren(vnode, children3, insertedVnodeQueue);
        if (isDef$2(data49)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert2(parentElm, vnode.elm, refElm);
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps2.createComment(vnode.text);
      insert2(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps2.createTextNode(vnode.text);
      insert2(parentElm, vnode.elm, refElm);
    }
  }
  function createComponent2(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i2 = vnode.data;
    if (isDef$2(i2)) {
      var isReactivated = isDef$2(vnode.componentInstance) && i2.keepAlive;
      if (isDef$2(i2 = i2.hook) && isDef$2(i2 = i2.init)) {
        i2(vnode, false);
      }
      if (isDef$2(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        insert2(parentElm, vnode.elm, refElm);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true;
      }
    }
  }
  function initComponent(vnode, insertedVnodeQueue) {
    if (isDef$2(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      registerRef(vnode);
      insertedVnodeQueue.push(vnode);
    }
  }
  function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i2;
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef$2(i2 = innerNode.data) && isDef$2(i2 = i2.transition)) {
        for (i2 = 0; i2 < cbs.activate.length; ++i2) {
          cbs.activate[i2](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break;
      }
    }
    insert2(parentElm, vnode.elm, refElm);
  }
  function insert2(parent, elm, ref$$1) {
    if (isDef$2(parent)) {
      if (isDef$2(ref$$1)) {
        if (nodeOps2.parentNode(ref$$1) === parent) {
          nodeOps2.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps2.appendChild(parent, elm);
      }
    }
  }
  function createChildren(vnode, children3, insertedVnodeQueue) {
    if (Array.isArray(children3)) {
      for (var i2 = 0; i2 < children3.length; ++i2) {
        createElm(children3[i2], insertedVnodeQueue, vnode.elm, null, true, children3, i2);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps2.appendChild(vnode.elm, nodeOps2.createTextNode(String(vnode.text)));
    }
  }
  function isPatchable(vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef$2(vnode.tag);
  }
  function invokeCreateHooks(vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook;
    if (isDef$2(i)) {
      if (isDef$2(i.create)) {
        i.create(emptyNode, vnode);
      }
      if (isDef$2(i.insert)) {
        insertedVnodeQueue.push(vnode);
      }
    }
  }
  function setScope(vnode) {
    var i2;
    if (isDef$2(i2 = vnode.fnScopeId)) {
      nodeOps2.setStyleScope(vnode.elm, i2);
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef$2(i2 = ancestor.context) && isDef$2(i2 = i2.$options._scopeId)) {
          nodeOps2.setStyleScope(vnode.elm, i2);
        }
        ancestor = ancestor.parent;
      }
    }
    if (isDef$2(i2 = activeInstance) && i2 !== vnode.context && i2 !== vnode.fnContext && isDef$2(i2 = i2.$options._scopeId)) {
      nodeOps2.setStyleScope(vnode.elm, i2);
    }
  }
  function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }
  function invokeDestroyHook(vnode) {
    var i2, j2;
    var data49 = vnode.data;
    if (isDef$2(data49)) {
      if (isDef$2(i2 = data49.hook) && isDef$2(i2 = i2.destroy)) {
        i2(vnode);
      }
      for (i2 = 0; i2 < cbs.destroy.length; ++i2) {
        cbs.destroy[i2](vnode);
      }
    }
    if (isDef$2(i2 = vnode.children)) {
      for (j2 = 0; j2 < vnode.children.length; ++j2) {
        invokeDestroyHook(vnode.children[j2]);
      }
    }
  }
  function removeVnodes(vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef$2(ch)) {
        if (isDef$2(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else {
          removeNode2(ch.elm);
        }
      }
    }
  }
  function removeAndInvokeRemoveHook(vnode, rm) {
    if (isDef$2(rm) || isDef$2(vnode.data)) {
      var i2;
      var listeners3 = cbs.remove.length + 1;
      if (isDef$2(rm)) {
        rm.listeners += listeners3;
      } else {
        rm = createRmCb(vnode.elm, listeners3);
      }
      if (isDef$2(i2 = vnode.componentInstance) && isDef$2(i2 = i2._vnode) && isDef$2(i2.data)) {
        removeAndInvokeRemoveHook(i2, rm);
      }
      for (i2 = 0; i2 < cbs.remove.length; ++i2) {
        cbs.remove[i2](vnode, rm);
      }
      if (isDef$2(i2 = vnode.data.hook) && isDef$2(i2 = i2.remove)) {
        i2(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode2(vnode.elm);
    }
  }
  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;
    var canMove = !removeOnly;
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx];
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        canMove && nodeOps2.insertBefore(parentElm, oldStartVnode.elm, nodeOps2.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        canMove && nodeOps2.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        }
        idxInOld = isDef$2(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) {
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldCh[idxInOld] = void 0;
            canMove && nodeOps2.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(oldCh, oldStartIdx, oldEndIdx);
    }
  }
  function findIdxInOld(node, oldCh, start4, end2) {
    for (var i2 = start4; i2 < end2; i2++) {
      var c = oldCh[i2];
      if (isDef$2(c) && sameVnode(node, c)) {
        return i2;
      }
    }
  }
  function patchVnode(oldVnode, vnode, insertedVnodeQueue, ownerArray, index2, removeOnly) {
    if (oldVnode === vnode) {
      return;
    }
    if (isDef$2(vnode.elm) && isDef$2(ownerArray)) {
      vnode = ownerArray[index2] = cloneVNode(vnode);
    }
    var elm = vnode.elm = oldVnode.elm;
    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef$2(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return;
    }
    if (isTrue(vnode.isStatic) && isTrue(oldVnode.isStatic) && vnode.key === oldVnode.key && (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
      vnode.componentInstance = oldVnode.componentInstance;
      return;
    }
    var i2;
    var data49 = vnode.data;
    if (isDef$2(data49) && isDef$2(i2 = data49.hook) && isDef$2(i2 = i2.prepatch)) {
      i2(oldVnode, vnode);
    }
    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef$2(data49) && isPatchable(vnode)) {
      for (i2 = 0; i2 < cbs.update.length; ++i2) {
        cbs.update[i2](oldVnode, vnode);
      }
      if (isDef$2(i2 = data49.hook) && isDef$2(i2 = i2.update)) {
        i2(oldVnode, vnode);
      }
    }
    if (isUndef(vnode.text)) {
      if (isDef$2(oldCh) && isDef$2(ch)) {
        if (oldCh !== ch) {
          updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
        }
      } else if (isDef$2(ch)) {
        if (isDef$2(oldVnode.text)) {
          nodeOps2.setTextContent(elm, "");
        }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef$2(oldCh)) {
        removeVnodes(oldCh, 0, oldCh.length - 1);
      } else if (isDef$2(oldVnode.text)) {
        nodeOps2.setTextContent(elm, "");
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps2.setTextContent(elm, vnode.text);
    }
    if (isDef$2(data49)) {
      if (isDef$2(i2 = data49.hook) && isDef$2(i2 = i2.postpatch)) {
        i2(oldVnode, vnode);
      }
    }
  }
  function invokeInsertHook(vnode, queue2, initial) {
    if (isTrue(initial) && isDef$2(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue2;
    } else {
      for (var i2 = 0; i2 < queue2.length; ++i2) {
        queue2[i2].data.hook.insert(queue2[i2]);
      }
    }
  }
  var isRenderedModule = makeMap("attrs,class,staticClass,staticStyle,key");
  function hydrate(elm, vnode, insertedVnodeQueue, inVPre) {
    var i2;
    var tag = vnode.tag;
    var data49 = vnode.data;
    var children3 = vnode.children;
    inVPre = inVPre || data49 && data49.pre;
    vnode.elm = elm;
    if (isTrue(vnode.isComment) && isDef$2(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true;
    }
    if (isDef$2(data49)) {
      if (isDef$2(i2 = data49.hook) && isDef$2(i2 = i2.init)) {
        i2(vnode, true);
      }
      if (isDef$2(i2 = vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        return true;
      }
    }
    if (isDef$2(tag)) {
      if (isDef$2(children3)) {
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children3, insertedVnodeQueue);
        } else {
          if (isDef$2(i2 = data49) && isDef$2(i2 = i2.domProps) && isDef$2(i2 = i2.innerHTML)) {
            if (i2 !== elm.innerHTML) {
              return false;
            }
          } else {
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children3.length; i$1++) {
              if (!childNode || !hydrate(childNode, children3[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break;
              }
              childNode = childNode.nextSibling;
            }
            if (!childrenMatch || childNode) {
              return false;
            }
          }
        }
      }
      if (isDef$2(data49)) {
        var fullInvoke = false;
        for (var key in data49) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break;
          }
        }
        if (!fullInvoke && data49["class"]) {
          traverse(data49["class"]);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true;
  }
  return function patch2(oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      if (isDef$2(oldVnode)) {
        invokeDestroyHook(oldVnode);
      }
      return;
    }
    var isInitialPatch = false;
    var insertedVnodeQueue = [];
    if (isUndef(oldVnode)) {
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue);
    } else {
      var isRealElement = isDef$2(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
      } else {
        if (isRealElement) {
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode;
            }
          }
          oldVnode = emptyNodeAt(oldVnode);
        }
        var oldElm = oldVnode.elm;
        var parentElm = nodeOps2.parentNode(oldElm);
        createElm(vnode, insertedVnodeQueue, oldElm._leaveCb ? null : parentElm, nodeOps2.nextSibling(oldElm));
        if (isDef$2(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i2 = 0; i2 < cbs.destroy.length; ++i2) {
              cbs.destroy[i2](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              var insert3 = ancestor.data.hook.insert;
              if (insert3.merged) {
                for (var i$2 = 1; i$2 < insert3.fns.length; i$2++) {
                  insert3.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }
        if (isDef$2(parentElm)) {
          removeVnodes([oldVnode], 0, 0);
        } else if (isDef$2(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }
    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm;
  };
}
var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives2(vnode) {
    updateDirectives(vnode, emptyNode);
  }
};
function updateDirectives(oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}
function _update(oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);
  var dirsWithInsert = [];
  var dirsWithPostpatch = [];
  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      callHook$1(dir, "bind", vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      dir.oldValue = oldDir.value;
      dir.oldArg = oldDir.arg;
      callHook$1(dir, "update", vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }
  if (dirsWithInsert.length) {
    var callInsert = function() {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], "inserted", vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, "insert", callInsert);
    } else {
      callInsert();
    }
  }
  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, "postpatch", function() {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], "componentUpdated", vnode, oldVnode);
      }
    });
  }
  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        callHook$1(oldDirs[key], "unbind", oldVnode, oldVnode, isDestroy);
      }
    }
  }
}
var emptyModifiers = /* @__PURE__ */ Object.create(null);
function normalizeDirectives$1(dirs, vm) {
  var res = /* @__PURE__ */ Object.create(null);
  if (!dirs) {
    return res;
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, "directives", dir.name);
  }
  return res;
}
function getRawDirName(dir) {
  return dir.rawName || dir.name + "." + Object.keys(dir.modifiers || {}).join(".");
}
function callHook$1(dir, hook, vnode, oldVnode, isDestroy) {
  var fn2 = dir.def && dir.def[hook];
  if (fn2) {
    try {
      fn2(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, "directive " + dir.name + " " + hook + " hook");
    }
  }
}
var baseModules = [
  ref,
  directives
];
function updateAttrs(oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef$2(opts) && opts.Ctor.options.inheritAttrs === false) {
    return;
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return;
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs2 = vnode.data.attrs || {};
  if (isDef$2(attrs2.__ob__)) {
    attrs2 = vnode.data.attrs = extend({}, attrs2);
  }
  for (key in attrs2) {
    cur = attrs2[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur, vnode.data.pre);
    }
  }
  if ((isIE || isEdge) && attrs2.value !== oldAttrs.value) {
    setAttr(elm, "value", attrs2.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs2[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}
function setAttr(el, key, value17, isInPre) {
  if (isInPre || el.tagName.indexOf("-") > -1) {
    baseSetAttr(el, key, value17);
  } else if (isBooleanAttr(key)) {
    if (isFalsyAttrValue(value17)) {
      el.removeAttribute(key);
    } else {
      value17 = key === "allowfullscreen" && el.tagName === "EMBED" ? "true" : key;
      el.setAttribute(key, value17);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, convertEnumeratedValue(key, value17));
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value17)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value17);
    }
  } else {
    baseSetAttr(el, key, value17);
  }
}
function baseSetAttr(el, key, value17) {
  if (isFalsyAttrValue(value17)) {
    el.removeAttribute(key);
  } else {
    if (isIE && !isIE9 && el.tagName === "TEXTAREA" && key === "placeholder" && value17 !== "" && !el.__ieph) {
      var blocker = function(e) {
        e.stopImmediatePropagation();
        el.removeEventListener("input", blocker);
      };
      el.addEventListener("input", blocker);
      el.__ieph = true;
    }
    el.setAttribute(key, value17);
  }
}
var attrs = {
  create: updateAttrs,
  update: updateAttrs
};
function updateClass(oldVnode, vnode) {
  var el = vnode.elm;
  var data49 = vnode.data;
  var oldData = oldVnode.data;
  if (isUndef(data49.staticClass) && isUndef(data49.class) && (isUndef(oldData) || isUndef(oldData.staticClass) && isUndef(oldData.class))) {
    return;
  }
  var cls = genClassForVnode(vnode);
  var transitionClass = el._transitionClasses;
  if (isDef$2(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }
  if (cls !== el._prevClass) {
    el.setAttribute("class", cls);
    el._prevClass = cls;
  }
}
var klass = {
  create: updateClass,
  update: updateClass
};
var RANGE_TOKEN = "__r";
var CHECKBOX_RADIO_TOKEN = "__c";
function normalizeEvents(on2) {
  if (isDef$2(on2[RANGE_TOKEN])) {
    var event = isIE ? "change" : "input";
    on2[event] = [].concat(on2[RANGE_TOKEN], on2[event] || []);
    delete on2[RANGE_TOKEN];
  }
  if (isDef$2(on2[CHECKBOX_RADIO_TOKEN])) {
    on2.change = [].concat(on2[CHECKBOX_RADIO_TOKEN], on2.change || []);
    delete on2[CHECKBOX_RADIO_TOKEN];
  }
}
var target$1;
function createOnceHandler$1(event, handler4, capture) {
  var _target = target$1;
  return function onceHandler() {
    var res = handler4.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  };
}
var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);
function add$1(name, handler4, capture, passive2) {
  if (useMicrotaskFix) {
    var attachedTimestamp = currentFlushTimestamp;
    var original = handler4;
    handler4 = original._wrapper = function(e) {
      if (e.target === e.currentTarget || e.timeStamp >= attachedTimestamp || e.timeStamp <= 0 || e.target.ownerDocument !== document) {
        return original.apply(this, arguments);
      }
    };
  }
  target$1.addEventListener(name, handler4, supportsPassive$1 ? { capture, passive: passive2 } : capture);
}
function remove$2(name, handler4, capture, _target) {
  (_target || target$1).removeEventListener(name, handler4._wrapper || handler4, capture);
}
function updateDOMListeners(oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return;
  }
  var on2 = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on2);
  updateListeners(on2, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
  target$1 = void 0;
}
var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};
var svgContainer;
function updateDOMProps(oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return;
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props2 = vnode.data.domProps || {};
  if (isDef$2(props2.__ob__)) {
    props2 = vnode.data.domProps = extend({}, props2);
  }
  for (key in oldProps) {
    if (!(key in props2)) {
      elm[key] = "";
    }
  }
  for (key in props2) {
    cur = props2[key];
    if (key === "textContent" || key === "innerHTML") {
      if (vnode.children) {
        vnode.children.length = 0;
      }
      if (cur === oldProps[key]) {
        continue;
      }
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }
    if (key === "value" && elm.tagName !== "PROGRESS") {
      elm._value = cur;
      var strCur = isUndef(cur) ? "" : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else if (key === "innerHTML" && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
      svgContainer = svgContainer || document.createElement("div");
      svgContainer.innerHTML = "<svg>" + cur + "</svg>";
      var svg = svgContainer.firstChild;
      while (elm.firstChild) {
        elm.removeChild(elm.firstChild);
      }
      while (svg.firstChild) {
        elm.appendChild(svg.firstChild);
      }
    } else if (cur !== oldProps[key]) {
      try {
        elm[key] = cur;
      } catch (e) {
      }
    }
  }
}
function shouldUpdateValue(elm, checkVal) {
  return !elm.composing && (elm.tagName === "OPTION" || isNotInFocusAndDirty(elm, checkVal) || isDirtyWithModifiers(elm, checkVal));
}
function isNotInFocusAndDirty(elm, checkVal) {
  var notInFocus = true;
  try {
    notInFocus = document.activeElement !== elm;
  } catch (e) {
  }
  return notInFocus && elm.value !== checkVal;
}
function isDirtyWithModifiers(elm, newVal) {
  var value17 = elm.value;
  var modifiers = elm._vModifiers;
  if (isDef$2(modifiers)) {
    if (modifiers.number) {
      return toNumber(value17) !== toNumber(newVal);
    }
    if (modifiers.trim) {
      return value17.trim() !== newVal.trim();
    }
  }
  return value17 !== newVal;
}
var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};
var parseStyleText = cached(function(cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function(item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res;
});
function normalizeStyleData(data49) {
  var style12 = normalizeStyleBinding(data49.style);
  return data49.staticStyle ? extend(data49.staticStyle, style12) : style12;
}
function normalizeStyleBinding(bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle);
  }
  if (typeof bindingStyle === "string") {
    return parseStyleText(bindingStyle);
  }
  return bindingStyle;
}
function getStyle$1(vnode, checkChild) {
  var res = {};
  var styleData;
  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode && childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }
  if (styleData = normalizeStyleData(vnode.data)) {
    extend(res, styleData);
  }
  var parentNode2 = vnode;
  while (parentNode2 = parentNode2.parent) {
    if (parentNode2.data && (styleData = normalizeStyleData(parentNode2.data))) {
      extend(res, styleData);
    }
  }
  return res;
}
var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function(el, name, val) {
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(hyphenate(name), val.replace(importantRE, ""), "important");
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      for (var i = 0, len2 = val.length; i < len2; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};
var vendorNames = ["Webkit", "Moz", "ms"];
var emptyStyle;
var normalize = cached(function(prop) {
  emptyStyle = emptyStyle || document.createElement("div").style;
  prop = camelize$2(prop);
  if (prop !== "filter" && prop in emptyStyle) {
    return prop;
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name;
    }
  }
});
function updateStyle(oldVnode, vnode) {
  var data49 = vnode.data;
  var oldData = oldVnode.data;
  if (isUndef(data49.staticStyle) && isUndef(data49.style) && isUndef(oldData.staticStyle) && isUndef(oldData.style)) {
    return;
  }
  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};
  var oldStyle = oldStaticStyle || oldStyleBinding;
  var style12 = normalizeStyleBinding(vnode.data.style) || {};
  vnode.data.normalizedStyle = isDef$2(style12.__ob__) ? extend({}, style12) : style12;
  var newStyle = getStyle$1(vnode, true);
  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, "");
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      setProp(el, name, cur == null ? "" : cur);
    }
  }
}
var style = {
  create: updateStyle,
  update: updateStyle
};
var whitespaceRE = /\s+/;
function addClass(el, cls) {
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  if (el.classList) {
    if (cls.indexOf(" ") > -1) {
      cls.split(whitespaceRE).forEach(function(c) {
        return el.classList.add(c);
      });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute("class") || "") + " ";
    if (cur.indexOf(" " + cls + " ") < 0) {
      el.setAttribute("class", (cur + cls).trim());
    }
  }
}
function removeClass(el, cls) {
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  if (el.classList) {
    if (cls.indexOf(" ") > -1) {
      cls.split(whitespaceRE).forEach(function(c) {
        return el.classList.remove(c);
      });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute("class");
    }
  } else {
    var cur = " " + (el.getAttribute("class") || "") + " ";
    var tar = " " + cls + " ";
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, " ");
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute("class", cur);
    } else {
      el.removeAttribute("class");
    }
  }
}
function resolveTransition(def$$1) {
  if (!def$$1) {
    return;
  }
  if (typeof def$$1 === "object") {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || "v"));
    }
    extend(res, def$$1);
    return res;
  } else if (typeof def$$1 === "string") {
    return autoCssTransition(def$$1);
  }
}
var autoCssTransition = cached(function(name) {
  return {
    enterClass: name + "-enter",
    enterToClass: name + "-enter-to",
    enterActiveClass: name + "-enter-active",
    leaveClass: name + "-leave",
    leaveToClass: name + "-leave-to",
    leaveActiveClass: name + "-leave-active"
  };
});
var hasTransition = inBrowser$2 && !isIE9;
var TRANSITION = "transition";
var ANIMATION = "animation";
var transitionProp = "transition";
var transitionEndEvent = "transitionend";
var animationProp = "animation";
var animationEndEvent = "animationend";
if (hasTransition) {
  if (window.ontransitionend === void 0 && window.onwebkittransitionend !== void 0) {
    transitionProp = "WebkitTransition";
    transitionEndEvent = "webkitTransitionEnd";
  }
  if (window.onanimationend === void 0 && window.onwebkitanimationend !== void 0) {
    animationProp = "WebkitAnimation";
    animationEndEvent = "webkitAnimationEnd";
  }
}
var raf$1 = inBrowser$2 ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout : function(fn2) {
  return fn2();
};
function nextFrame(fn2) {
  raf$1(function() {
    raf$1(fn2);
  });
}
function addTransitionClass(el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}
function removeTransitionClass(el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}
function whenTransitionEnds(el, expectedType, cb) {
  var ref2 = getTransitionInfo(el, expectedType);
  var type2 = ref2.type;
  var timeout = ref2.timeout;
  var propCount = ref2.propCount;
  if (!type2) {
    return cb();
  }
  var event = type2 === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end2 = function() {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function(e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end2();
      }
    }
  };
  setTimeout(function() {
    if (ended < propCount) {
      end2();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}
var transformRE = /\b(transform|all)(,|$)/;
function getTransitionInfo(el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = (styles[transitionProp + "Delay"] || "").split(", ");
  var transitionDurations = (styles[transitionProp + "Duration"] || "").split(", ");
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = (styles[animationProp + "Delay"] || "").split(", ");
  var animationDurations = (styles[animationProp + "Duration"] || "").split(", ");
  var animationTimeout = getTimeout(animationDelays, animationDurations);
  var type2;
  var timeout = 0;
  var propCount = 0;
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type2 = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type2 = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type2 = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type2 ? type2 === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }
  var hasTransform = type2 === TRANSITION && transformRE.test(styles[transitionProp + "Property"]);
  return {
    type: type2,
    timeout,
    propCount,
    hasTransform
  };
}
function getTimeout(delays, durations) {
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }
  return Math.max.apply(null, durations.map(function(d, i) {
    return toMs(d) + toMs(delays[i]);
  }));
}
function toMs(s) {
  return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
}
function enter(vnode, toggleDisplay) {
  var el = vnode.elm;
  if (isDef$2(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }
  var data49 = resolveTransition(vnode.data.transition);
  if (isUndef(data49)) {
    return;
  }
  if (isDef$2(el._enterCb) || el.nodeType !== 1) {
    return;
  }
  var css = data49.css;
  var type2 = data49.type;
  var enterClass = data49.enterClass;
  var enterToClass = data49.enterToClass;
  var enterActiveClass = data49.enterActiveClass;
  var appearClass = data49.appearClass;
  var appearToClass = data49.appearToClass;
  var appearActiveClass = data49.appearActiveClass;
  var beforeEnter = data49.beforeEnter;
  var enter2 = data49.enter;
  var afterEnter = data49.afterEnter;
  var enterCancelled = data49.enterCancelled;
  var beforeAppear = data49.beforeAppear;
  var appear = data49.appear;
  var afterAppear = data49.afterAppear;
  var appearCancelled = data49.appearCancelled;
  var duration = data49.duration;
  var context2 = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    context2 = transitionNode.context;
    transitionNode = transitionNode.parent;
  }
  var isAppear = !context2._isMounted || !vnode.isRootInsert;
  if (isAppear && !appear && appear !== "") {
    return;
  }
  var startClass = isAppear && appearClass ? appearClass : enterClass;
  var activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
  var toClass = isAppear && appearToClass ? appearToClass : enterToClass;
  var beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
  var enterHook = isAppear ? typeof appear === "function" ? appear : enter2 : enter2;
  var afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
  var enterCancelledHook = isAppear ? appearCancelled || enterCancelled : enterCancelled;
  var explicitEnterDuration = toNumber(isObject$2(duration) ? duration.enter : duration);
  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);
  var cb = el._enterCb = once(function() {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });
  if (!vnode.data.show) {
    mergeVNodeHook(vnode, "insert", function() {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function() {
      removeTransitionClass(el, startClass);
      if (!cb.cancelled) {
        addTransitionClass(el, toClass);
        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type2, cb);
          }
        }
      }
    });
  }
  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }
  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}
function leave(vnode, rm) {
  var el = vnode.elm;
  if (isDef$2(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }
  var data49 = resolveTransition(vnode.data.transition);
  if (isUndef(data49) || el.nodeType !== 1) {
    return rm();
  }
  if (isDef$2(el._leaveCb)) {
    return;
  }
  var css = data49.css;
  var type2 = data49.type;
  var leaveClass = data49.leaveClass;
  var leaveToClass = data49.leaveToClass;
  var leaveActiveClass = data49.leaveActiveClass;
  var beforeLeave = data49.beforeLeave;
  var leave2 = data49.leave;
  var afterLeave = data49.afterLeave;
  var leaveCancelled = data49.leaveCancelled;
  var delayLeave = data49.delayLeave;
  var duration = data49.duration;
  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave2);
  var explicitLeaveDuration = toNumber(isObject$2(duration) ? duration.leave : duration);
  var cb = el._leaveCb = once(function() {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });
  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }
  function performLeave() {
    if (cb.cancelled) {
      return;
    }
    if (!vnode.data.show && el.parentNode) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function() {
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type2, cb);
            }
          }
        }
      });
    }
    leave2 && leave2(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}
function isValidDuration(val) {
  return typeof val === "number" && !isNaN(val);
}
function getHookArgumentsLength(fn2) {
  if (isUndef(fn2)) {
    return false;
  }
  var invokerFns = fn2.fns;
  if (isDef$2(invokerFns)) {
    return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
  } else {
    return (fn2._length || fn2.length) > 1;
  }
}
function _enter(_2, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}
var transition = inBrowser$2 ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1(vnode, rm) {
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};
var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];
var modules = platformModules.concat(baseModules);
var patch = createPatchFunction({ nodeOps, modules });
if (isIE9) {
  document.addEventListener("selectionchange", function() {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, "input");
    }
  });
}
var directive = {
  inserted: function inserted(el, binding, vnode, oldVnode) {
    if (vnode.tag === "select") {
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, "postpatch", function() {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === "textarea" || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        el.addEventListener("compositionstart", onCompositionStart);
        el.addEventListener("compositionend", onCompositionEnd);
        el.addEventListener("change", onCompositionEnd);
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function componentUpdated(el, binding, vnode) {
    if (vnode.tag === "select") {
      setSelected(el, binding, vnode.context);
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function(o, i) {
        return !looseEqual(o, prevOptions[i]);
      })) {
        var needReset = el.multiple ? binding.value.some(function(v) {
          return hasNoMatchingOption(v, curOptions);
        }) : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, "change");
        }
      }
    }
  }
};
function setSelected(el, binding, vm) {
  actuallySetSelected(el, binding);
  if (isIE || isEdge) {
    setTimeout(function() {
      actuallySetSelected(el, binding);
    }, 0);
  }
}
function actuallySetSelected(el, binding, vm) {
  var value17 = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value17)) {
    return;
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value17, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value17)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return;
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}
function hasNoMatchingOption(value17, options) {
  return options.every(function(o) {
    return !looseEqual(o, value17);
  });
}
function getValue(option) {
  return "_value" in option ? option._value : option.value;
}
function onCompositionStart(e) {
  e.target.composing = true;
}
function onCompositionEnd(e) {
  if (!e.target.composing) {
    return;
  }
  e.target.composing = false;
  trigger(e.target, "input");
}
function trigger(el, type2) {
  var e = document.createEvent("HTMLEvents");
  e.initEvent(type2, true, true);
  el.dispatchEvent(e);
}
function locateNode(vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition) ? locateNode(vnode.componentInstance._vnode) : vnode;
}
var show = {
  bind: function bind2(el, ref2, vnode) {
    var value17 = ref2.value;
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay = el.style.display === "none" ? "" : el.style.display;
    if (value17 && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function() {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value17 ? originalDisplay : "none";
    }
  },
  update: function update3(el, ref2, vnode) {
    var value17 = ref2.value;
    var oldValue = ref2.oldValue;
    if (!value17 === !oldValue) {
      return;
    }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value17) {
        enter(vnode, function() {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function() {
          el.style.display = "none";
        });
      }
    } else {
      el.style.display = value17 ? el.__vOriginalDisplay : "none";
    }
  },
  unbind: function unbind(el, binding, vnode, oldVnode, isDestroy) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};
var platformDirectives = {
  model: directive,
  show
};
var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};
function getRealChild(vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children));
  } else {
    return vnode;
  }
}
function extractTransitionData(comp) {
  var data49 = {};
  var options = comp.$options;
  for (var key in options.propsData) {
    data49[key] = comp[key];
  }
  var listeners3 = options._parentListeners;
  for (var key$1 in listeners3) {
    data49[camelize$2(key$1)] = listeners3[key$1];
  }
  return data49;
}
function placeholder(h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h("keep-alive", {
      props: rawChild.componentOptions.propsData
    });
  }
}
function hasParentTransition(vnode) {
  while (vnode = vnode.parent) {
    if (vnode.data.transition) {
      return true;
    }
  }
}
function isSameChild(child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag;
}
var isNotTextNode = function(c) {
  return c.tag || isAsyncPlaceholder(c);
};
var isVShowDirective = function(d) {
  return d.name === "show";
};
var Transition = {
  name: "transition",
  props: transitionProps,
  abstract: true,
  render: function render2(h) {
    var this$1$1 = this;
    var children3 = this.$slots.default;
    if (!children3) {
      return;
    }
    children3 = children3.filter(isNotTextNode);
    if (!children3.length) {
      return;
    }
    var mode = this.mode;
    var rawChild = children3[0];
    if (hasParentTransition(this.$vnode)) {
      return rawChild;
    }
    var child = getRealChild(rawChild);
    if (!child) {
      return rawChild;
    }
    if (this._leaving) {
      return placeholder(h, rawChild);
    }
    var id = "__transition-" + this._uid + "-";
    child.key = child.key == null ? child.isComment ? id + "comment" : id + child.tag : isPrimitive(child.key) ? String(child.key).indexOf(id) === 0 ? child.key : id + child.key : child.key;
    var data49 = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);
    if (child.data.directives && child.data.directives.some(isVShowDirective)) {
      child.data.show = true;
    }
    if (oldChild && oldChild.data && !isSameChild(child, oldChild) && !isAsyncPlaceholder(oldChild) && !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)) {
      var oldData = oldChild.data.transition = extend({}, data49);
      if (mode === "out-in") {
        this._leaving = true;
        mergeVNodeHook(oldData, "afterLeave", function() {
          this$1$1._leaving = false;
          this$1$1.$forceUpdate();
        });
        return placeholder(h, rawChild);
      } else if (mode === "in-out") {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild;
        }
        var delayedLeave;
        var performLeave = function() {
          delayedLeave();
        };
        mergeVNodeHook(data49, "afterEnter", performLeave);
        mergeVNodeHook(data49, "enterCancelled", performLeave);
        mergeVNodeHook(oldData, "delayLeave", function(leave2) {
          delayedLeave = leave2;
        });
      }
    }
    return rawChild;
  }
};
var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);
delete props.mode;
var TransitionGroup = {
  props,
  beforeMount: function beforeMount() {
    var this$1$1 = this;
    var update4 = this._update;
    this._update = function(vnode, hydrating) {
      var restoreActiveInstance = setActiveInstance(this$1$1);
      this$1$1.__patch__(this$1$1._vnode, this$1$1.kept, false, true);
      this$1$1._vnode = this$1$1.kept;
      restoreActiveInstance();
      update4.call(this$1$1, vnode, hydrating);
    };
  },
  render: function render3(h) {
    var tag = this.tag || this.$vnode.data.tag || "span";
    var map = /* @__PURE__ */ Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children3 = this.children = [];
    var transitionData = extractTransitionData(this);
    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf("__vlist") !== 0) {
          children3.push(c);
          map[c.key] = c;
          (c.data || (c.data = {})).transition = transitionData;
        }
      }
    }
    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }
    return h(tag, null, children3);
  },
  updated: function updated2() {
    var children3 = this.prevChildren;
    var moveClass = this.moveClass || (this.name || "v") + "-move";
    if (!children3.length || !this.hasMove(children3[0].elm, moveClass)) {
      return;
    }
    children3.forEach(callPendingCbs);
    children3.forEach(recordPosition);
    children3.forEach(applyTranslation);
    this._reflow = document.body.offsetHeight;
    children3.forEach(function(c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = "";
        el.addEventListener(transitionEndEvent, el._moveCb = function cb(e) {
          if (e && e.target !== el) {
            return;
          }
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },
  methods: {
    hasMove: function hasMove(el, moveClass) {
      if (!hasTransition) {
        return false;
      }
      if (this._hasMove) {
        return this._hasMove;
      }
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function(cls) {
          removeClass(clone, cls);
        });
      }
      addClass(clone, moveClass);
      clone.style.display = "none";
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return this._hasMove = info.hasTransform;
    }
  }
};
function callPendingCbs(c) {
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}
function recordPosition(c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}
function applyTranslation(c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = "0s";
  }
}
var platformComponents = {
  Transition,
  TransitionGroup
};
Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;
extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents);
Vue.prototype.__patch__ = inBrowser$2 ? patch : noop$2;
Vue.prototype.$mount = function(el, hydrating) {
  el = el && inBrowser$2 ? query(el) : void 0;
  return mountComponent(this, el, hydrating);
};
if (inBrowser$2) {
  setTimeout(function() {
    if (config.devtools) {
      if (devtools) {
        devtools.emit("init", Vue);
      }
    }
  }, 0);
}
var vue_runtime_esm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": Vue
}, Symbol.toStringTag, { value: "Module" }));
var require$$1 = /* @__PURE__ */ getAugmentedNamespace(vue_runtime_esm);
var deepAssign$2 = {};
var utils = {};
var create2 = {};
var bem$1y = {};
bem$1y.__esModule = true;
var createBEM_1 = bem$1y.createBEM = createBEM$1;
function gen$1(name, mods) {
  if (!mods) {
    return "";
  }
  if (typeof mods === "string") {
    return " " + name + "--" + mods;
  }
  if (Array.isArray(mods)) {
    return mods.reduce(function(ret, item) {
      return ret + gen$1(name, item);
    }, "");
  }
  return Object.keys(mods).reduce(function(ret, key) {
    return ret + (mods[key] ? gen$1(name, key) : "");
  }, "");
}
function createBEM$1(name) {
  return function(el, mods) {
    if (el && typeof el !== "string") {
      mods = el;
      el = "";
    }
    el = el ? name + "__" + el : name;
    return "" + el + gen$1(el, mods);
  };
}
var component = {};
var string = {};
string.__esModule = true;
var camelize_1 = string.camelize = camelize$1;
string.padZero = padZero$1;
var camelizeRE$1 = /-(\w)/g;
function camelize$1(str2) {
  return str2.replace(camelizeRE$1, function(_2, c) {
    return c.toUpperCase();
  });
}
function padZero$1(num, targetLength) {
  if (targetLength === void 0) {
    targetLength = 2;
  }
  var str2 = num + "";
  while (str2.length < targetLength) {
    str2 = "0" + str2;
  }
  return str2;
}
var slots = {};
slots.__esModule = true;
slots.SlotsMixin = void 0;
var SlotsMixin$1 = {
  methods: {
    slots: function slots2(name, props2) {
      if (name === void 0) {
        name = "default";
      }
      var $slots = this.$slots, $scopedSlots = this.$scopedSlots;
      var scopedSlot = $scopedSlots[name];
      if (scopedSlot) {
        return scopedSlot(props2);
      }
      return $slots[name];
    }
  }
};
slots.SlotsMixin = SlotsMixin$1;
var _interopRequireDefault$3 = interopRequireDefault.exports;
component.__esModule = true;
component.unifySlots = unifySlots$1;
var createComponent_1 = component.createComponent = createComponent$1I;
var _$3 = utils;
var _string$1 = string;
var _slots = slots;
_interopRequireDefault$3(require$$1);
function install$3(Vue3) {
  var name = this.name;
  Vue3.component(name, this);
  Vue3.component((0, _string$1.camelize)("-" + name), this);
}
function unifySlots$1(context2) {
  var scopedSlots = context2.scopedSlots || context2.data.scopedSlots || {};
  var slots4 = context2.slots();
  Object.keys(slots4).forEach(function(key) {
    if (!scopedSlots[key]) {
      scopedSlots[key] = function() {
        return slots4[key];
      };
    }
  });
  return scopedSlots;
}
function transformFunctionComponent$1(pure) {
  return {
    functional: true,
    props: pure.props,
    model: pure.model,
    render: function render86(h, context2) {
      return pure(h, context2.props, unifySlots$1(context2), context2);
    }
  };
}
function createComponent$1I(name) {
  return function(sfc) {
    if ((0, _$3.isFunction)(sfc)) {
      sfc = transformFunctionComponent$1(sfc);
    }
    if (!sfc.functional) {
      sfc.mixins = sfc.mixins || [];
      sfc.mixins.push(_slots.SlotsMixin);
    }
    sfc.name = name;
    sfc.install = install$3;
    return sfc;
  };
}
var i18n = {};
var _interopRequireDefault$2 = interopRequireDefault.exports;
i18n.__esModule = true;
i18n.createI18N = createI18N$2;
var _$2 = utils;
var _string = string;
var _locale = _interopRequireDefault$2(locale);
function createI18N$2(name) {
  var prefix2 = (0, _string.camelize)(name) + ".";
  return function(path2) {
    var messages4 = _locale.default.messages();
    var message = (0, _$2.get)(messages4, prefix2 + path2) || (0, _$2.get)(messages4, path2);
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return (0, _$2.isFunction)(message) ? message.apply(void 0, args) : message;
  };
}
create2.__esModule = true;
create2.createNamespace = createNamespace$2;
var _bem = bem$1y;
var _component = component;
var _i18n = i18n;
function createNamespace$2(name) {
  name = "van-" + name;
  return [(0, _component.createComponent)(name), (0, _bem.createBEM)(name), (0, _i18n.createI18N)(name)];
}
var unit = {};
var number = {};
number.__esModule = true;
number.isNumeric = isNumeric$1;
number.isNaN = isNaN$2;
function isNumeric$1(val) {
  return /^\d+(\.\d+)?$/.test(val);
}
function isNaN$2(val) {
  if (Number.isNaN) {
    return Number.isNaN(val);
  }
  return val !== val;
}
unit.__esModule = true;
unit.addUnit = addUnit$1;
unit.unitToPx = unitToPx$1;
var _$1 = utils;
var _number = number;
function addUnit$1(value17) {
  if (!(0, _$1.isDef)(value17)) {
    return void 0;
  }
  value17 = String(value17);
  return (0, _number.isNumeric)(value17) ? value17 + "px" : value17;
}
var rootFontSize$1;
function getRootFontSize$1() {
  if (!rootFontSize$1) {
    var doc = document.documentElement;
    var fontSize = doc.style.fontSize || window.getComputedStyle(doc).fontSize;
    rootFontSize$1 = parseFloat(fontSize);
  }
  return rootFontSize$1;
}
function convertRem$1(value17) {
  value17 = value17.replace(/rem/g, "");
  return +value17 * getRootFontSize$1();
}
function convertVw$1(value17) {
  value17 = value17.replace(/vw/g, "");
  return +value17 * window.innerWidth / 100;
}
function convertVh$1(value17) {
  value17 = value17.replace(/vh/g, "");
  return +value17 * window.innerHeight / 100;
}
function unitToPx$1(value17) {
  if (typeof value17 === "number") {
    return value17;
  }
  if (_$1.inBrowser) {
    if (value17.indexOf("rem") !== -1) {
      return convertRem$1(value17);
    }
    if (value17.indexOf("vw") !== -1) {
      return convertVw$1(value17);
    }
    if (value17.indexOf("vh") !== -1) {
      return convertVh$1(value17);
    }
  }
  return parseFloat(value17);
}
var _interopRequireDefault$1 = interopRequireDefault.exports;
utils.__esModule = true;
utils.noop = noop$1;
utils.isDef = isDef$1;
var isFunction_1 = utils.isFunction = isFunction$2;
utils.isObject = isObject$1;
utils.isPromise = isPromise$1;
var get_1 = utils.get = get$1;
utils.isEmpty = isEmpty$1;
utils.isServer = utils.inBrowser = utils.addUnit = utils.createNamespace = void 0;
var _vue$1 = _interopRequireDefault$1(require$$1);
var _create = create2;
utils.createNamespace = _create.createNamespace;
var _unit = unit;
utils.addUnit = _unit.addUnit;
var inBrowser$1 = typeof window !== "undefined";
utils.inBrowser = inBrowser$1;
var isServer$2 = _vue$1.default.prototype.$isServer;
utils.isServer = isServer$2;
function noop$1() {
}
function isDef$1(val) {
  return val !== void 0 && val !== null;
}
function isFunction$2(val) {
  return typeof val === "function";
}
function isObject$1(val) {
  return val !== null && typeof val === "object";
}
function isPromise$1(val) {
  return isObject$1(val) && isFunction$2(val.then) && isFunction$2(val.catch);
}
function get$1(object, path2) {
  var keys2 = path2.split(".");
  var result = object;
  keys2.forEach(function(key) {
    var _result$key;
    result = (_result$key = result[key]) != null ? _result$key : "";
  });
  return result;
}
function isEmpty$1(value17) {
  if (value17 == null) {
    return true;
  }
  if (typeof value17 !== "object") {
    return true;
  }
  return Object.keys(value17).length === 0;
}
deepAssign$2.__esModule = true;
deepAssign$2.deepAssign = deepAssign$1;
var _ = utils;
var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
function assignKey$1(to, from, key) {
  var val = from[key];
  if (!(0, _.isDef)(val)) {
    return;
  }
  if (!hasOwnProperty$1.call(to, key) || !(0, _.isObject)(val)) {
    to[key] = val;
  } else {
    to[key] = deepAssign$1(Object(to[key]), from[key]);
  }
}
function deepAssign$1(to, from) {
  Object.keys(from).forEach(function(key) {
    assignKey$1(to, from, key);
  });
  return to;
}
var zhCN$1 = {};
zhCN$1.__esModule = true;
zhCN$1.default = void 0;
var _default$1 = {
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
zhCN$1.default = _default$1;
var _interopRequireDefault = interopRequireDefault.exports;
locale.__esModule = true;
var default_1 = locale.default = void 0;
var _vue = _interopRequireDefault(require$$1);
var _deepAssign = deepAssign$2;
var _zhCN = _interopRequireDefault(zhCN$1);
var proto$1 = _vue.default.prototype;
var defineReactive$1 = _vue.default.util.defineReactive;
defineReactive$1(proto$1, "$vantLang", "zh-CN");
defineReactive$1(proto$1, "$vantMessages", {
  "zh-CN": _zhCN.default
});
var _default = {
  messages: function messages() {
    return proto$1.$vantMessages[proto$1.$vantLang];
  },
  use: function use(lang2, messages4) {
    var _this$add;
    proto$1.$vantLang = lang2;
    this.add((_this$add = {}, _this$add[lang2] = messages4, _this$add));
  },
  add: function add2(messages4) {
    if (messages4 === void 0) {
      messages4 = {};
    }
    (0, _deepAssign.deepAssign)(proto$1.$vantMessages, messages4);
  }
};
default_1 = locale.default = _default;
var zhCN = {
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
    monthTitle: function monthTitle2(year, month) {
      return year + "\u5E74" + month + "\u6708";
    },
    rangePrompt: function rangePrompt2(maxRange) {
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
    discount: function discount2(_discount) {
      return _discount + "\u6298";
    },
    condition: function condition2(_condition) {
      return "\u6EE1" + _condition + "\u5143\u53EF\u7528";
    }
  },
  vanCouponCell: {
    title: "\u4F18\u60E0\u5238",
    tips: "\u6682\u65E0\u53EF\u7528",
    count: function count2(_count) {
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
var proto = Vue.prototype;
var defineReactive = Vue.util.defineReactive;
defineReactive(proto, "$vantLang", "zh-CN");
defineReactive(proto, "$vantMessages", {
  "zh-CN": zhCN
});
var Locale$1 = {
  messages: function messages2() {
    return proto.$vantMessages[proto.$vantLang];
  },
  use: function use2(lang2, messages4) {
    var _this$add;
    proto.$vantLang = lang2;
    this.add((_this$add = {}, _this$add[lang2] = messages4, _this$add));
  },
  add: function add3(messages4) {
    if (messages4 === void 0) {
      messages4 = {};
    }
    deepAssign(proto.$vantMessages, messages4);
  }
};
var camelizeRE = /-(\w)/g;
function camelize(str2) {
  return str2.replace(camelizeRE, function(_2, c) {
    return c.toUpperCase();
  });
}
function padZero(num, targetLength) {
  if (targetLength === void 0) {
    targetLength = 2;
  }
  var str2 = num + "";
  while (str2.length < targetLength) {
    str2 = "0" + str2;
  }
  return str2;
}
var SlotsMixin = {
  methods: {
    slots: function slots3(name, props2) {
      if (name === void 0) {
        name = "default";
      }
      var $slots = this.$slots, $scopedSlots = this.$scopedSlots;
      var scopedSlot = $scopedSlots[name];
      if (scopedSlot) {
        return scopedSlot(props2);
      }
      return $slots[name];
    }
  }
};
function install$2(Vue3) {
  var name = this.name;
  Vue3.component(name, this);
  Vue3.component(camelize("-" + name), this);
}
function unifySlots(context2) {
  var scopedSlots = context2.scopedSlots || context2.data.scopedSlots || {};
  var slots4 = context2.slots();
  Object.keys(slots4).forEach(function(key) {
    if (!scopedSlots[key]) {
      scopedSlots[key] = function() {
        return slots4[key];
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
    render: function render86(h, context2) {
      return pure(h, context2.props, unifySlots(context2), context2);
    }
  };
}
function createComponent$1H(name) {
  return function(sfc) {
    if (isFunction$1(sfc)) {
      sfc = transformFunctionComponent(sfc);
    }
    if (!sfc.functional) {
      sfc.mixins = sfc.mixins || [];
      sfc.mixins.push(SlotsMixin);
    }
    sfc.name = name;
    sfc.install = install$2;
    return sfc;
  };
}
function createI18N$1(name) {
  var prefix2 = camelize(name) + ".";
  return function(path2) {
    var messages4 = Locale$1.messages();
    var message = get3(messages4, prefix2 + path2) || get3(messages4, path2);
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return isFunction$1(message) ? message.apply(void 0, args) : message;
  };
}
function createNamespace$1(name) {
  name = "van-" + name;
  return [createComponent$1H(name), createBEM(name), createI18N$1(name)];
}
function isNumeric(val) {
  return /^\d+(\.\d+)?$/.test(val);
}
function isNaN$1(val) {
  if (Number.isNaN) {
    return Number.isNaN(val);
  }
  return val !== val;
}
function addUnit(value17) {
  if (!isDef(value17)) {
    return void 0;
  }
  value17 = String(value17);
  return isNumeric(value17) ? value17 + "px" : value17;
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
function convertRem(value17) {
  value17 = value17.replace(/rem/g, "");
  return +value17 * getRootFontSize();
}
function convertVw(value17) {
  value17 = value17.replace(/vw/g, "");
  return +value17 * window.innerWidth / 100;
}
function convertVh(value17) {
  value17 = value17.replace(/vh/g, "");
  return +value17 * window.innerHeight / 100;
}
function unitToPx(value17) {
  if (typeof value17 === "number") {
    return value17;
  }
  if (inBrowser) {
    if (value17.indexOf("rem") !== -1) {
      return convertRem(value17);
    }
    if (value17.indexOf("vw") !== -1) {
      return convertVw(value17);
    }
    if (value17.indexOf("vh") !== -1) {
      return convertVh(value17);
    }
  }
  return parseFloat(value17);
}
var inBrowser = typeof window !== "undefined";
var isServer$1 = Vue.prototype.$isServer;
function noop() {
}
function isDef(val) {
  return val !== void 0 && val !== null;
}
function isFunction$1(val) {
  return typeof val === "function";
}
function isObject(val) {
  return val !== null && typeof val === "object";
}
function isPromise(val) {
  return isObject(val) && isFunction$1(val.then) && isFunction$1(val.catch);
}
function get3(object, path2) {
  var keys2 = path2.split(".");
  var result = object;
  keys2.forEach(function(key) {
    var _result$key;
    result = (_result$key = result[key]) != null ? _result$key : "";
  });
  return result;
}
function isEmpty(value17) {
  if (value17 == null) {
    return true;
  }
  if (typeof value17 !== "object") {
    return true;
  }
  return Object.keys(value17).length === 0;
}
var hasOwnProperty = Object.prototype.hasOwnProperty;
function assignKey(to, from, key) {
  var val = from[key];
  if (!isDef(val)) {
    return;
  }
  if (!hasOwnProperty.call(to, key) || !isObject(val)) {
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
var defaultMessages = deepAssign(zhCN, {
  common: {
    searchPlaceholder: "\u8BF7\u8F93\u5165\u641C\u7D22\u5173\u952E\u8BCD",
    loading: "\u52A0\u8F7D\u4E2D..."
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
default_1.add({
  "zh-CN": defaultMessages
});
var Locale = default_1;
function _extends$1() {
  _extends$1 = Object.assign ? Object.assign.bind() : function(target2) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target2[key] = source[key];
        }
      }
    }
    return target2;
  };
  return _extends$1.apply(this, arguments);
}
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
    _extends$1(result.on, context2.data.on);
  }
  return result;
}
function emit(context2, eventName) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }
  var listeners3 = context2.listeners[eventName];
  if (listeners3) {
    if (Array.isArray(listeners3)) {
      listeners3.forEach(function(listener) {
        listener.apply(void 0, args);
      });
    } else {
      listeners3.apply(void 0, args);
    }
  }
}
function mount(Component, data49) {
  var instance2 = new Vue({
    el: document.createElement("div"),
    props: Component.props,
    render: function render86(h) {
      return h(Component, _extends$1({
        props: this.$props
      }, data49));
    }
  });
  document.body.appendChild(instance2.$el);
  return instance2;
}
var context = {
  zIndex: 2e3,
  lockCount: 0,
  stack: [],
  find: function find(vm) {
    return this.stack.filter(function(item) {
      return item.vm === vm;
    })[0];
  },
  remove: function remove2(vm) {
    var item = this.find(vm);
    if (!item)
      return;
    item.vm = null;
    item.overlay = null;
    var index2 = this.stack.indexOf(item);
    this.stack.splice(index2, 1);
  }
};
var supportsPassive = false;
if (!isServer$1) {
  try {
    var opts = {};
    Object.defineProperty(opts, "passive", {
      get: function get6() {
        supportsPassive = true;
      }
    });
    window.addEventListener("test-passive", null, opts);
  } catch (e) {
  }
}
function on(target2, event, handler4, passive2) {
  if (passive2 === void 0) {
    passive2 = false;
  }
  if (!isServer$1) {
    target2.addEventListener(event, handler4, supportsPassive ? {
      capture: false,
      passive: passive2
    } : false);
  }
}
function off(target2, event, handler4) {
  if (!isServer$1) {
    target2.removeEventListener(event, handler4);
  }
}
function stopPropagation(event) {
  event.stopPropagation();
}
function preventDefault(event, isStopPropagation) {
  if (typeof event.cancelable !== "boolean" || event.cancelable) {
    event.preventDefault();
  }
  if (isStopPropagation) {
    stopPropagation(event);
  }
}
var _createNamespace$1C = createNamespace$1("overlay"), createComponent$1G = _createNamespace$1C[0], bem$1x = _createNamespace$1C[1];
function preventTouchMove(event) {
  preventDefault(event, true);
}
function Overlay(h, props2, slots4, ctx) {
  var style12 = _extends$1({
    zIndex: props2.zIndex
  }, props2.customStyle);
  if (isDef(props2.duration)) {
    style12.animationDuration = props2.duration + "s";
  }
  return h("transition", {
    "attrs": {
      "name": "van-fade"
    }
  }, [h("div", helper([{
    "directives": [{
      name: "show",
      value: props2.show
    }],
    "style": style12,
    "class": [bem$1x(), props2.className],
    "on": {
      "touchmove": props2.lockScroll ? preventTouchMove : noop
    }
  }, inherit(ctx, true)]), [slots4.default == null ? void 0 : slots4.default()])]);
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
var Overlay$1 = createComponent$1G(Overlay);
function removeNode(el) {
  var parent = el.parentNode;
  if (parent) {
    parent.removeChild(el);
  }
}
var defaultConfig$1 = {
  className: "",
  customStyle: {}
};
function mountOverlay(vm) {
  return mount(Overlay$1, {
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
  var item = context.find(vm);
  if (item) {
    var el = vm.$el;
    var config2 = item.config, overlay = item.overlay;
    if (el && el.parentNode) {
      el.parentNode.insertBefore(overlay.$el, el);
    }
    _extends$1(overlay, defaultConfig$1, config2, {
      show: true
    });
  }
}
function openOverlay(vm, config2) {
  var item = context.find(vm);
  if (item) {
    item.config = config2;
  } else {
    var overlay = mountOverlay(vm);
    context.stack.push({
      vm,
      config: config2,
      overlay
    });
  }
  updateOverlay(vm);
}
function closeOverlay(vm) {
  var item = context.find(vm);
  if (item) {
    item.overlay.show = false;
  }
}
function removeOverlay(vm) {
  var item = context.find(vm);
  if (item) {
    removeNode(item.overlay.$el);
    context.remove(vm);
  }
}
function isWindow(val) {
  return val === window;
}
var overflowScrollReg = /scroll|auto|overlay/i;
function getScroller(el, root2) {
  if (root2 === void 0) {
    root2 = window;
  }
  var node = el;
  while (node && node.tagName !== "HTML" && node.tagName !== "BODY" && node.nodeType === 1 && node !== root2) {
    var _window$getComputedSt = window.getComputedStyle(node), overflowY = _window$getComputedSt.overflowY;
    if (overflowScrollReg.test(overflowY)) {
      return node;
    }
    node = node.parentNode;
  }
  return root2;
}
function getScrollTop(el) {
  var top2 = "scrollTop" in el ? el.scrollTop : el.pageYOffset;
  return Math.max(top2, 0);
}
function setScrollTop(el, value17) {
  if ("scrollTop" in el) {
    el.scrollTop = value17;
  } else {
    el.scrollTo(el.scrollX, value17);
  }
}
function getRootScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}
function setRootScrollTop(value17) {
  setScrollTop(window, value17);
  setScrollTop(document.body, value17);
}
function getElementTop$1(el, scroller2) {
  if (isWindow(el)) {
    return 0;
  }
  var scrollTop = scroller2 ? getScrollTop(scroller2) : getRootScrollTop();
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
    touchStart: function touchStart(event) {
      this.resetTouchStatus();
      this.startX = event.touches[0].clientX;
      this.startY = event.touches[0].clientY;
    },
    touchMove: function touchMove(event) {
      var touch = event.touches[0];
      this.deltaX = touch.clientX < 0 ? 0 : touch.clientX - this.startX;
      this.deltaY = touch.clientY - this.startY;
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
      var onTouchStart10 = this.onTouchStart, onTouchMove10 = this.onTouchMove, onTouchEnd11 = this.onTouchEnd;
      on(el, "touchstart", onTouchStart10);
      on(el, "touchmove", onTouchMove10);
      if (onTouchEnd11) {
        on(el, "touchend", onTouchEnd11);
        on(el, "touchcancel", onTouchEnd11);
      }
    }
  }
};
function getElement(selector) {
  if (typeof selector === "string") {
    return document.querySelector(selector);
  }
  return selector();
}
function PortalMixin(_temp) {
  var _ref = _temp === void 0 ? {} : _temp, ref2 = _ref.ref, afterPortal = _ref.afterPortal;
  return {
    props: {
      getContainer: [String, Function]
    },
    watch: {
      getContainer: "portal"
    },
    mounted: function mounted25() {
      if (this.getContainer) {
        this.portal();
      }
    },
    methods: {
      portal: function portal() {
        var getContainer = this.getContainer;
        var el = ref2 ? this.$refs[ref2] : this.$el;
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
var uid$1 = 0;
function BindEventMixin(handler4) {
  var key = "binded_" + uid$1++;
  function bind3() {
    if (!this[key]) {
      handler4.call(this, on, true);
      this[key] = true;
    }
  }
  function unbind2() {
    if (this[key]) {
      handler4.call(this, off, false);
      this[key] = false;
    }
  }
  return {
    mounted: bind3,
    activated: bind3,
    deactivated: unbind2,
    beforeDestroy: unbind2
  };
}
var CloseOnPopstateMixin = {
  mixins: [BindEventMixin(function(bind3, isBind) {
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
    closeOnPopstate: function closeOnPopstate(val) {
      this.handlePopstate(val);
    }
  },
  methods: {
    onPopstate: function onPopstate() {
      this.close();
      this.shouldReopen = false;
    },
    handlePopstate: function handlePopstate(bind3) {
      if (this.$isServer) {
        return;
      }
      if (this.bindStatus !== bind3) {
        this.bindStatus = bind3;
        var action = bind3 ? on : off;
        action(window, "popstate", this.onPopstate);
      }
    }
  }
};
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
function PopupMixin(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    mixins: [TouchMixin, CloseOnPopstateMixin, PortalMixin({
      afterPortal: function afterPortal() {
        if (this.overlay) {
          updateOverlay();
        }
      }
    })],
    provide: function provide3() {
      return {
        vanPopup: this
      };
    },
    props: popupMixinProps,
    data: function data49() {
      this.onReopenCallback = [];
      return {
        inited: this.value
      };
    },
    computed: {
      shouldRender: function shouldRender3() {
        return this.inited || !this.lazyRender;
      }
    },
    watch: {
      value: function value17(val) {
        var type2 = val ? "open" : "close";
        this.inited = this.inited || this.value;
        this[type2]();
        if (!options.skipToggleEvent) {
          this.$emit(type2);
        }
      },
      overlay: "renderOverlay"
    },
    mounted: function mounted25() {
      if (this.value) {
        this.open();
      }
    },
    activated: function activated5() {
      if (this.shouldReopen) {
        this.$emit("input", true);
        this.shouldReopen = false;
      }
    },
    beforeDestroy: function beforeDestroy6() {
      removeOverlay(this);
      if (this.opened) {
        this.removeLock();
      }
      if (this.getContainer) {
        removeNode(this.$el);
      }
    },
    deactivated: function deactivated2() {
      if (this.value) {
        this.close();
        this.shouldReopen = true;
      }
    },
    methods: {
      open: function open2() {
        if (this.$isServer || this.opened) {
          return;
        }
        if (this.zIndex !== void 0) {
          context.zIndex = this.zIndex;
        }
        this.opened = true;
        this.renderOverlay();
        this.addLock();
        this.onReopenCallback.forEach(function(callback2) {
          callback2();
        });
      },
      addLock: function addLock() {
        if (this.lockScroll) {
          on(document, "touchstart", this.touchStart);
          on(document, "touchmove", this.onTouchMove);
          if (!context.lockCount) {
            document.body.classList.add("van-overflow-hidden");
          }
          context.lockCount++;
        }
      },
      removeLock: function removeLock() {
        if (this.lockScroll && context.lockCount) {
          context.lockCount--;
          off(document, "touchstart", this.touchStart);
          off(document, "touchmove", this.onTouchMove);
          if (!context.lockCount) {
            document.body.classList.remove("van-overflow-hidden");
          }
        }
      },
      close: function close2() {
        if (!this.opened) {
          return;
        }
        closeOverlay(this);
        this.opened = false;
        this.removeLock();
        this.$emit("input", false);
      },
      onTouchMove: function onTouchMove10(event) {
        this.touchMove(event);
        var direction = this.deltaY > 0 ? "10" : "01";
        var el = getScroller(event.target, this.$el);
        var scrollHeight = el.scrollHeight, offsetHeight = el.offsetHeight, scrollTop = el.scrollTop;
        var status2 = "11";
        if (scrollTop === 0) {
          status2 = offsetHeight >= scrollHeight ? "00" : "01";
        } else if (scrollTop + offsetHeight >= scrollHeight) {
          status2 = "10";
        }
        if (status2 !== "11" && this.direction === "vertical" && !(parseInt(status2, 2) & parseInt(direction, 2))) {
          preventDefault(event, true);
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
            openOverlay(_this, {
              zIndex: context.zIndex++,
              duration: _this.duration,
              className: _this.overlayClass,
              customStyle: _this.overlayStyle
            });
          } else {
            closeOverlay(_this);
          }
        });
      },
      updateZIndex: function updateZIndex(value17) {
        if (value17 === void 0) {
          value17 = 0;
        }
        this.$el.style.zIndex = ++context.zIndex + value17;
      },
      onReopen: function onReopen(callback2) {
        this.onReopenCallback.push(callback2);
      }
    }
  };
}
var _createNamespace$1B = createNamespace$1("info"), createComponent$1F = _createNamespace$1B[0], bem$1w = _createNamespace$1B[1];
function Info(h, props2, slots4, ctx) {
  var dot = props2.dot, info = props2.info;
  var showInfo = isDef(info) && info !== "";
  if (!dot && !showInfo) {
    return;
  }
  return h("div", helper([{
    "class": bem$1w({
      dot
    })
  }, inherit(ctx, true)]), [dot ? "" : props2.info]);
}
Info.props = {
  dot: Boolean,
  info: [Number, String]
};
var Info$1 = createComponent$1F(Info);
var _createNamespace$1A = createNamespace$1("icon"), createComponent$1E = _createNamespace$1A[0], bem$1v = _createNamespace$1A[1];
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
function Icon(h, props2, slots4, ctx) {
  var _props$badge;
  var name = correctName(props2.name);
  var imageIcon = isImage(name);
  return h(props2.tag, helper([{
    "class": [props2.classPrefix, imageIcon ? "" : props2.classPrefix + "-" + name],
    "style": {
      color: props2.color,
      fontSize: addUnit(props2.size)
    }
  }, inherit(ctx, true)]), [slots4.default && slots4.default(), imageIcon && h("img", {
    "class": bem$1v("image"),
    "attrs": {
      "src": name
    }
  }), h(Info$1, {
    "attrs": {
      "dot": props2.dot,
      "info": (_props$badge = props2.badge) != null ? _props$badge : props2.info
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
    default: bem$1v()
  }
};
var Icon$1 = createComponent$1E(Icon);
var _createNamespace$1z = createNamespace$1("popup"), createComponent$1D = _createNamespace$1z[0], bem$1u = _createNamespace$1z[1];
var Popup = createComponent$1D({
  mixins: [PopupMixin()],
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
      return function(event) {
        return _this.$emit(eventName, event);
      };
    };
    this.onClick = createEmitter("click");
    this.onOpened = createEmitter("opened");
    this.onClosed = createEmitter("closed");
  },
  methods: {
    onClickCloseIcon: function onClickCloseIcon(event) {
      this.$emit("click-close-icon", event);
      this.close();
    }
  },
  render: function render4() {
    var _bem2;
    var h = arguments[0];
    if (!this.shouldRender) {
      return;
    }
    var round2 = this.round, position = this.position, duration = this.duration;
    var isCenter = position === "center";
    var transitionName = this.transition || (isCenter ? "van-fade" : "van-popup-slide-" + position);
    var style12 = {};
    if (isDef(duration)) {
      var key = isCenter ? "animationDuration" : "transitionDuration";
      style12[key] = duration + "s";
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
      "style": style12,
      "class": bem$1u((_bem2 = {
        round: round2
      }, _bem2[position] = position, _bem2["safe-area-inset-bottom"] = this.safeAreaInsetBottom, _bem2)),
      "on": {
        "click": this.onClick
      }
    }, [this.slots(), this.closeable && h(Icon$1, {
      "attrs": {
        "role": "button",
        "tabindex": "0",
        "name": this.closeIcon
      },
      "class": bem$1u("close-icon", this.closeIconPosition),
      "on": {
        "click": this.onClickCloseIcon
      }
    })])]);
  }
});
var _createNamespace$1y = createNamespace$1("loading"), createComponent$1C = _createNamespace$1y[0], bem$1t = _createNamespace$1y[1];
function LoadingIcon(h, props2) {
  if (props2.type === "spinner") {
    var Spin = [];
    for (var i = 0; i < 12; i++) {
      Spin.push(h("i"));
    }
    return Spin;
  }
  return h("svg", {
    "class": bem$1t("circular"),
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
function LoadingText(h, props2, slots4) {
  if (slots4.default) {
    var _props$textColor;
    var style12 = {
      fontSize: addUnit(props2.textSize),
      color: (_props$textColor = props2.textColor) != null ? _props$textColor : props2.color
    };
    return h("span", {
      "class": bem$1t("text"),
      "style": style12
    }, [slots4.default()]);
  }
}
function Loading(h, props2, slots4, ctx) {
  var color = props2.color, size2 = props2.size, type2 = props2.type;
  var style12 = {
    color
  };
  if (size2) {
    var iconSize = addUnit(size2);
    style12.width = iconSize;
    style12.height = iconSize;
  }
  return h("div", helper([{
    "class": bem$1t([type2, {
      vertical: props2.vertical
    }])
  }, inherit(ctx, true)]), [h("span", {
    "class": bem$1t("spinner", type2),
    "style": style12
  }, [LoadingIcon(h, props2)]), LoadingText(h, props2, slots4)]);
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
var Loading$1 = createComponent$1C(Loading);
var _createNamespace$1x = createNamespace$1("action-sheet"), createComponent$1B = _createNamespace$1x[0], bem$1s = _createNamespace$1x[1];
function ActionSheet(h, props2, slots4, ctx) {
  var title4 = props2.title, cancelText = props2.cancelText, closeable = props2.closeable;
  function onCancel4() {
    emit(ctx, "input", false);
    emit(ctx, "cancel");
  }
  function Header2() {
    if (title4) {
      return h("div", {
        "class": bem$1s("header")
      }, [title4, closeable && h(Icon$1, {
        "attrs": {
          "name": props2.closeIcon
        },
        "class": bem$1s("close"),
        "on": {
          "click": onCancel4
        }
      })]);
    }
  }
  function Option(item, index2) {
    var disabled = item.disabled, loading = item.loading, callback2 = item.callback;
    function onClickOption(event) {
      event.stopPropagation();
      if (disabled || loading) {
        return;
      }
      if (callback2) {
        callback2(item);
      }
      if (props2.closeOnClickAction) {
        emit(ctx, "input", false);
      }
      Vue.nextTick(function() {
        emit(ctx, "select", item, index2);
      });
    }
    function OptionContent() {
      if (loading) {
        return h(Loading$1, {
          "class": bem$1s("loading-icon")
        });
      }
      return [h("span", {
        "class": bem$1s("name")
      }, [item.name]), item.subname && h("div", {
        "class": bem$1s("subname")
      }, [item.subname])];
    }
    return h("button", {
      "attrs": {
        "type": "button"
      },
      "class": [bem$1s("item", {
        disabled,
        loading
      }), item.className],
      "style": {
        color: item.color
      },
      "on": {
        "click": onClickOption
      }
    }, [OptionContent()]);
  }
  function CancelText() {
    if (cancelText) {
      return [h("div", {
        "class": bem$1s("gap")
      }), h("button", {
        "attrs": {
          "type": "button"
        },
        "class": bem$1s("cancel"),
        "on": {
          "click": onCancel4
        }
      }, [cancelText])];
    }
  }
  function Description() {
    var description = (slots4.description == null ? void 0 : slots4.description()) || props2.description;
    if (description) {
      return h("div", {
        "class": bem$1s("description")
      }, [description]);
    }
  }
  return h(Popup, helper([{
    "class": bem$1s(),
    "attrs": {
      "position": "bottom",
      "round": props2.round,
      "value": props2.value,
      "overlay": props2.overlay,
      "duration": props2.duration,
      "lazyRender": props2.lazyRender,
      "lockScroll": props2.lockScroll,
      "getContainer": props2.getContainer,
      "closeOnPopstate": props2.closeOnPopstate,
      "closeOnClickOverlay": props2.closeOnClickOverlay,
      "safeAreaInsetBottom": props2.safeAreaInsetBottom
    }
  }, inherit(ctx, true)]), [Header2(), Description(), h("div", {
    "class": bem$1s("content")
  }, [props2.actions && props2.actions.map(Option), slots4.default == null ? void 0 : slots4.default()]), CancelText()]);
}
ActionSheet.props = _extends$1({}, popupMixinProps, {
  title: String,
  actions: Array,
  duration: [Number, String],
  cancelText: String,
  description: String,
  getContainer: [String, Function],
  closeOnPopstate: Boolean,
  closeOnClickAction: Boolean,
  round: {
    type: Boolean,
    default: true
  },
  closeable: {
    type: Boolean,
    default: true
  },
  closeIcon: {
    type: String,
    default: "cross"
  },
  safeAreaInsetBottom: {
    type: Boolean,
    default: true
  },
  overlay: {
    type: Boolean,
    default: true
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: true
  }
});
var ActionSheet$1 = createComponent$1B(ActionSheet);
function isMobile(value17) {
  value17 = value17.replace(/[^-|\d]/g, "");
  return /^((\+86)|(86))?(1)\d{10}$/.test(value17) || /^0[0-9-]{10,13}$/.test(value17);
}
var DEFAULT_ITEM_HEIGHT = 44;
var pickerProps = {
  title: String,
  loading: Boolean,
  readonly: Boolean,
  itemHeight: [Number, String],
  showToolbar: Boolean,
  cancelButtonText: String,
  confirmButtonText: String,
  allowHtml: {
    type: Boolean,
    default: true
  },
  visibleItemCount: {
    type: [Number, String],
    default: 6
  },
  swipeDuration: {
    type: [Number, String],
    default: 1e3
  }
};
var RED = "#ee0a24";
var BORDER = "van-hairline";
var BORDER_TOP = BORDER + "--top";
var BORDER_LEFT = BORDER + "--left";
var BORDER_BOTTOM = BORDER + "--bottom";
var BORDER_SURROUND = BORDER + "--surround";
var BORDER_TOP_BOTTOM = BORDER + "--top-bottom";
var BORDER_UNSET_TOP_BOTTOM = BORDER + "-unset--top-bottom";
function deepClone(obj) {
  if (!isDef(obj)) {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(function(item) {
      return deepClone(item);
    });
  }
  if (typeof obj === "object") {
    var to = {};
    Object.keys(obj).forEach(function(key) {
      to[key] = deepClone(obj[key]);
    });
    return to;
  }
  return obj;
}
function range(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
function trimExtraChar(value17, _char, regExp) {
  var index2 = value17.indexOf(_char);
  var prefix2 = "";
  if (index2 === -1) {
    return value17;
  }
  if (_char === "-" && index2 !== 0) {
    return value17.slice(0, index2);
  }
  if (_char === "." && value17.match(/^(\.|-\.)/)) {
    prefix2 = index2 ? "-0" : "0";
  }
  return prefix2 + value17.slice(0, index2 + 1) + value17.slice(index2).replace(regExp, "");
}
function formatNumber(value17, allowDot, allowMinus) {
  if (allowDot === void 0) {
    allowDot = true;
  }
  if (allowMinus === void 0) {
    allowMinus = true;
  }
  if (allowDot) {
    value17 = trimExtraChar(value17, ".", /\./g);
  } else {
    value17 = value17.split(".")[0];
  }
  if (allowMinus) {
    value17 = trimExtraChar(value17, "-", /-/g);
  } else {
    value17 = value17.replace(/-/, "");
  }
  var regExp = allowDot ? /[^-0-9.]/g : /[^-0-9]/g;
  return value17.replace(regExp, "");
}
function addNumber(num1, num2) {
  var cardinal = Math.pow(10, 10);
  return Math.round((num1 + num2) * cardinal) / cardinal;
}
var DEFAULT_DURATION = 200;
var MOMENTUM_LIMIT_TIME = 300;
var MOMENTUM_LIMIT_DISTANCE = 15;
var _createNamespace$1w = createNamespace$1("picker-column"), createComponent$1A = _createNamespace$1w[0], bem$1r = _createNamespace$1w[1];
function getElementTranslateY(element) {
  var style12 = window.getComputedStyle(element);
  var transform = style12.transform || style12.webkitTransform;
  var translateY = transform.slice(7, transform.length - 1).split(", ")[5];
  return Number(translateY);
}
function isOptionDisabled(option) {
  return isObject(option) && option.disabled;
}
var supportMousewheel = inBrowser && "onwheel" in window;
var mousewheelTimer = null;
var PickerColumn = createComponent$1A({
  mixins: [TouchMixin],
  props: {
    valueKey: String,
    readonly: Boolean,
    allowHtml: Boolean,
    className: String,
    itemHeight: Number,
    defaultIndex: Number,
    swipeDuration: [Number, String],
    visibleItemCount: [Number, String],
    initialOptions: {
      type: Array,
      default: function _default2() {
        return [];
      }
    }
  },
  data: function data3() {
    return {
      offset: 0,
      duration: 0,
      options: deepClone(this.initialOptions),
      currentIndex: this.defaultIndex
    };
  },
  created: function created2() {
    if (this.$parent.children) {
      this.$parent.children.push(this);
    }
    this.setIndex(this.currentIndex);
  },
  mounted: function mounted2() {
    this.bindTouchEvent(this.$el);
    if (supportMousewheel) {
      on(this.$el, "wheel", this.onMouseWheel, false);
    }
  },
  destroyed: function destroyed2() {
    var children3 = this.$parent.children;
    if (children3) {
      children3.splice(children3.indexOf(this), 1);
    }
    if (supportMousewheel) {
      off(this.$el, "wheel");
    }
  },
  watch: {
    initialOptions: "setOptions",
    defaultIndex: function defaultIndex(val) {
      this.setIndex(val);
    }
  },
  computed: {
    count: function count3() {
      return this.options.length;
    },
    baseOffset: function baseOffset() {
      return this.itemHeight * (this.visibleItemCount - 1) / 2;
    }
  },
  methods: {
    setOptions: function setOptions(options) {
      if (JSON.stringify(options) !== JSON.stringify(this.options)) {
        this.options = deepClone(options);
        this.setIndex(this.defaultIndex);
      }
    },
    onTouchStart: function onTouchStart(event) {
      if (this.readonly) {
        return;
      }
      this.touchStart(event);
      if (this.moving) {
        var translateY = getElementTranslateY(this.$refs.wrapper);
        this.offset = Math.min(0, translateY - this.baseOffset);
        this.startOffset = this.offset;
      } else {
        this.startOffset = this.offset;
      }
      this.duration = 0;
      this.transitionEndTrigger = null;
      this.touchStartTime = Date.now();
      this.momentumOffset = this.startOffset;
    },
    onTouchMove: function onTouchMove(event) {
      if (this.readonly) {
        return;
      }
      this.touchMove(event);
      if (this.direction === "vertical") {
        this.moving = true;
        preventDefault(event, true);
      }
      this.offset = range(this.startOffset + this.deltaY, -(this.count * this.itemHeight), this.itemHeight);
      var now = Date.now();
      if (now - this.touchStartTime > MOMENTUM_LIMIT_TIME) {
        this.touchStartTime = now;
        this.momentumOffset = this.offset;
      }
    },
    onTouchEnd: function onTouchEnd() {
      var _this = this;
      if (this.readonly) {
        return;
      }
      var distance = this.offset - this.momentumOffset;
      var duration = Date.now() - this.touchStartTime;
      var allowMomentum = duration < MOMENTUM_LIMIT_TIME && Math.abs(distance) > MOMENTUM_LIMIT_DISTANCE;
      if (allowMomentum) {
        this.momentum(distance, duration);
        return;
      }
      var index2 = this.getIndexByOffset(this.offset);
      this.duration = DEFAULT_DURATION;
      this.setIndex(index2, true);
      setTimeout(function() {
        _this.moving = false;
      }, 0);
    },
    onMouseWheel: function onMouseWheel(event) {
      var _this2 = this;
      if (this.readonly) {
        return;
      }
      preventDefault(event, true);
      var translateY = getElementTranslateY(this.$refs.wrapper);
      this.startOffset = Math.min(0, translateY - this.baseOffset);
      this.momentumOffset = this.startOffset;
      this.transitionEndTrigger = null;
      var deltaY = event.deltaY;
      if (this.startOffset === 0 && deltaY < 0) {
        return;
      }
      var distance = -deltaY;
      this.offset = range(this.startOffset + distance, -(this.count * this.itemHeight), this.itemHeight);
      if (mousewheelTimer) {
        clearTimeout(mousewheelTimer);
      }
      mousewheelTimer = setTimeout(function() {
        _this2.onTouchEnd();
        _this2.touchStartTime = 0;
      }, MOMENTUM_LIMIT_TIME);
    },
    onTransitionEnd: function onTransitionEnd() {
      this.stopMomentum();
    },
    onClickItem: function onClickItem(index2) {
      if (this.moving || this.readonly) {
        return;
      }
      this.transitionEndTrigger = null;
      this.duration = DEFAULT_DURATION;
      this.setIndex(index2, true);
    },
    adjustIndex: function adjustIndex(index2) {
      index2 = range(index2, 0, this.count);
      for (var i = index2; i < this.count; i++) {
        if (!isOptionDisabled(this.options[i]))
          return i;
      }
      for (var _i = index2 - 1; _i >= 0; _i--) {
        if (!isOptionDisabled(this.options[_i]))
          return _i;
      }
    },
    getOptionText: function getOptionText(option) {
      if (isObject(option) && this.valueKey in option) {
        return option[this.valueKey];
      }
      return option;
    },
    setIndex: function setIndex(index2, emitChange2) {
      var _this3 = this;
      index2 = this.adjustIndex(index2) || 0;
      var offset3 = -index2 * this.itemHeight;
      var trigger2 = function trigger3() {
        if (index2 !== _this3.currentIndex) {
          _this3.currentIndex = index2;
          if (emitChange2) {
            _this3.$emit("change", index2);
          }
        }
      };
      if (this.moving && offset3 !== this.offset) {
        this.transitionEndTrigger = trigger2;
      } else {
        trigger2();
      }
      this.offset = offset3;
    },
    setValue: function setValue(value17) {
      var options = this.options;
      for (var i = 0; i < options.length; i++) {
        if (this.getOptionText(options[i]) === value17) {
          return this.setIndex(i);
        }
      }
    },
    getValue: function getValue2() {
      return this.options[this.currentIndex];
    },
    getIndexByOffset: function getIndexByOffset(offset3) {
      return range(Math.round(-offset3 / this.itemHeight), 0, this.count - 1);
    },
    momentum: function momentum(distance, duration) {
      var speed = Math.abs(distance / duration);
      distance = this.offset + speed / 3e-3 * (distance < 0 ? -1 : 1);
      var index2 = this.getIndexByOffset(distance);
      this.duration = +this.swipeDuration;
      this.setIndex(index2, true);
    },
    stopMomentum: function stopMomentum() {
      this.moving = false;
      this.duration = 0;
      if (this.transitionEndTrigger) {
        this.transitionEndTrigger();
        this.transitionEndTrigger = null;
      }
    },
    genOptions: function genOptions() {
      var _this4 = this;
      var h = this.$createElement;
      var optionStyle = {
        height: this.itemHeight + "px"
      };
      return this.options.map(function(option, index2) {
        var _domProps;
        var text2 = _this4.getOptionText(option);
        var disabled = isOptionDisabled(option);
        var data49 = {
          style: optionStyle,
          attrs: {
            role: "button",
            tabindex: disabled ? -1 : 0
          },
          class: [bem$1r("item", {
            disabled,
            selected: index2 === _this4.currentIndex
          })],
          on: {
            click: function click() {
              _this4.onClickItem(index2);
            }
          }
        };
        var childData = {
          class: "van-ellipsis",
          domProps: (_domProps = {}, _domProps[_this4.allowHtml ? "innerHTML" : "textContent"] = text2, _domProps)
        };
        return h("li", helper([{}, data49]), [_this4.slots("option", option) || h("div", helper([{}, childData]))]);
      });
    }
  },
  render: function render5() {
    var h = arguments[0];
    var wrapperStyle = {
      transform: "translate3d(0, " + (this.offset + this.baseOffset) + "px, 0)",
      transitionDuration: this.duration + "ms",
      transitionProperty: this.duration ? "all" : "none"
    };
    return h("div", {
      "class": [bem$1r(), this.className]
    }, [h("ul", {
      "ref": "wrapper",
      "style": wrapperStyle,
      "class": bem$1r("wrapper"),
      "on": {
        "transitionend": this.onTransitionEnd
      }
    }, [this.genOptions()])]);
  }
});
var _createNamespace$1v = createNamespace$1("picker"), createComponent$1z = _createNamespace$1v[0], bem$1q = _createNamespace$1v[1], t$r = _createNamespace$1v[2];
var Picker = createComponent$1z({
  props: _extends$1({}, pickerProps, {
    defaultIndex: {
      type: [Number, String],
      default: 0
    },
    columns: {
      type: Array,
      default: function _default3() {
        return [];
      }
    },
    toolbarPosition: {
      type: String,
      default: "top"
    },
    valueKey: {
      type: String,
      default: "text"
    }
  }),
  data: function data4() {
    return {
      children: [],
      formattedColumns: []
    };
  },
  computed: {
    itemPxHeight: function itemPxHeight() {
      return this.itemHeight ? unitToPx(this.itemHeight) : DEFAULT_ITEM_HEIGHT;
    },
    dataType: function dataType() {
      var columns2 = this.columns;
      var firstColumn = columns2[0] || {};
      if (firstColumn.children) {
        return "cascade";
      }
      if (firstColumn.values) {
        return "object";
      }
      return "text";
    }
  },
  watch: {
    columns: {
      handler: "format",
      immediate: true
    }
  },
  methods: {
    format: function format() {
      var columns2 = this.columns, dataType2 = this.dataType;
      if (dataType2 === "text") {
        this.formattedColumns = [{
          values: columns2
        }];
      } else if (dataType2 === "cascade") {
        this.formatCascade();
      } else {
        this.formattedColumns = columns2;
      }
    },
    formatCascade: function formatCascade() {
      var formatted = [];
      var cursor = {
        children: this.columns
      };
      while (cursor && cursor.children) {
        var _cursor$defaultIndex;
        var _cursor = cursor, children3 = _cursor.children;
        var defaultIndex2 = (_cursor$defaultIndex = cursor.defaultIndex) != null ? _cursor$defaultIndex : +this.defaultIndex;
        while (children3[defaultIndex2] && children3[defaultIndex2].disabled) {
          if (defaultIndex2 < children3.length - 1) {
            defaultIndex2++;
          } else {
            defaultIndex2 = 0;
            break;
          }
        }
        formatted.push({
          values: cursor.children,
          className: cursor.className,
          defaultIndex: defaultIndex2
        });
        cursor = children3[defaultIndex2];
      }
      this.formattedColumns = formatted;
    },
    emit: function emit2(event) {
      var _this = this;
      if (this.dataType === "text") {
        this.$emit(event, this.getColumnValue(0), this.getColumnIndex(0));
      } else {
        var values = this.getValues();
        if (this.dataType === "cascade") {
          values = values.map(function(item) {
            return item[_this.valueKey];
          });
        }
        this.$emit(event, values, this.getIndexes());
      }
    },
    onCascadeChange: function onCascadeChange(columnIndex) {
      var cursor = {
        children: this.columns
      };
      var indexes = this.getIndexes();
      for (var i = 0; i <= columnIndex; i++) {
        cursor = cursor.children[indexes[i]];
      }
      while (cursor && cursor.children) {
        columnIndex++;
        this.setColumnValues(columnIndex, cursor.children);
        cursor = cursor.children[cursor.defaultIndex || 0];
      }
    },
    onChange: function onChange(columnIndex) {
      var _this2 = this;
      if (this.dataType === "cascade") {
        this.onCascadeChange(columnIndex);
      }
      if (this.dataType === "text") {
        this.$emit("change", this, this.getColumnValue(0), this.getColumnIndex(0));
      } else {
        var values = this.getValues();
        if (this.dataType === "cascade") {
          values = values.map(function(item) {
            return item[_this2.valueKey];
          });
        }
        this.$emit("change", this, values, columnIndex);
      }
    },
    getColumn: function getColumn(index2) {
      return this.children[index2];
    },
    getColumnValue: function getColumnValue(index2) {
      var column = this.getColumn(index2);
      return column && column.getValue();
    },
    setColumnValue: function setColumnValue(index2, value17) {
      var column = this.getColumn(index2);
      if (column) {
        column.setValue(value17);
        if (this.dataType === "cascade") {
          this.onCascadeChange(index2);
        }
      }
    },
    getColumnIndex: function getColumnIndex(columnIndex) {
      return (this.getColumn(columnIndex) || {}).currentIndex;
    },
    setColumnIndex: function setColumnIndex(columnIndex, optionIndex) {
      var column = this.getColumn(columnIndex);
      if (column) {
        column.setIndex(optionIndex);
        if (this.dataType === "cascade") {
          this.onCascadeChange(columnIndex);
        }
      }
    },
    getColumnValues: function getColumnValues(index2) {
      return (this.children[index2] || {}).options;
    },
    setColumnValues: function setColumnValues(index2, options) {
      var column = this.children[index2];
      if (column) {
        column.setOptions(options);
      }
    },
    getValues: function getValues() {
      return this.children.map(function(child) {
        return child.getValue();
      });
    },
    setValues: function setValues(values) {
      var _this3 = this;
      values.forEach(function(value17, index2) {
        _this3.setColumnValue(index2, value17);
      });
    },
    getIndexes: function getIndexes() {
      return this.children.map(function(child) {
        return child.currentIndex;
      });
    },
    setIndexes: function setIndexes(indexes) {
      var _this4 = this;
      indexes.forEach(function(optionIndex, columnIndex) {
        _this4.setColumnIndex(columnIndex, optionIndex);
      });
    },
    confirm: function confirm() {
      this.children.forEach(function(child) {
        return child.stopMomentum();
      });
      this.emit("confirm");
    },
    cancel: function cancel() {
      this.emit("cancel");
    },
    genTitle: function genTitle() {
      var h = this.$createElement;
      var titleSlot = this.slots("title");
      if (titleSlot) {
        return titleSlot;
      }
      if (this.title) {
        return h("div", {
          "class": ["van-ellipsis", bem$1q("title")]
        }, [this.title]);
      }
    },
    genCancel: function genCancel() {
      var h = this.$createElement;
      return h("button", {
        "attrs": {
          "type": "button"
        },
        "class": bem$1q("cancel"),
        "on": {
          "click": this.cancel
        }
      }, [this.slots("cancel") || this.cancelButtonText || t$r("cancel")]);
    },
    genConfirm: function genConfirm() {
      var h = this.$createElement;
      return h("button", {
        "attrs": {
          "type": "button"
        },
        "class": bem$1q("confirm"),
        "on": {
          "click": this.confirm
        }
      }, [this.slots("confirm") || this.confirmButtonText || t$r("confirm")]);
    },
    genToolbar: function genToolbar() {
      var h = this.$createElement;
      if (this.showToolbar) {
        return h("div", {
          "class": bem$1q("toolbar")
        }, [this.slots() || [this.genCancel(), this.genTitle(), this.genConfirm()]]);
      }
    },
    genColumns: function genColumns() {
      var h = this.$createElement;
      var itemPxHeight2 = this.itemPxHeight;
      var wrapHeight = itemPxHeight2 * this.visibleItemCount;
      var frameStyle = {
        height: itemPxHeight2 + "px"
      };
      var columnsStyle = {
        height: wrapHeight + "px"
      };
      var maskStyle = {
        backgroundSize: "100% " + (wrapHeight - itemPxHeight2) / 2 + "px"
      };
      return h("div", {
        "class": bem$1q("columns"),
        "style": columnsStyle,
        "on": {
          "touchmove": preventDefault
        }
      }, [this.genColumnItems(), h("div", {
        "class": bem$1q("mask"),
        "style": maskStyle
      }), h("div", {
        "class": [BORDER_UNSET_TOP_BOTTOM, bem$1q("frame")],
        "style": frameStyle
      })]);
    },
    genColumnItems: function genColumnItems() {
      var _this5 = this;
      var h = this.$createElement;
      return this.formattedColumns.map(function(item, columnIndex) {
        var _item$defaultIndex;
        return h(PickerColumn, {
          "attrs": {
            "readonly": _this5.readonly,
            "valueKey": _this5.valueKey,
            "allowHtml": _this5.allowHtml,
            "className": item.className,
            "itemHeight": _this5.itemPxHeight,
            "defaultIndex": (_item$defaultIndex = item.defaultIndex) != null ? _item$defaultIndex : +_this5.defaultIndex,
            "swipeDuration": _this5.swipeDuration,
            "visibleItemCount": _this5.visibleItemCount,
            "initialOptions": item.values
          },
          "scopedSlots": {
            option: _this5.$scopedSlots.option
          },
          "on": {
            "change": function change() {
              _this5.onChange(columnIndex);
            }
          }
        });
      });
    }
  },
  render: function render6(h) {
    return h("div", {
      "class": bem$1q()
    }, [this.toolbarPosition === "top" ? this.genToolbar() : h(), this.loading ? h(Loading$1, {
      "class": bem$1q("loading")
    }) : h(), this.slots("columns-top"), this.genColumns(), this.slots("columns-bottom"), this.toolbarPosition === "bottom" ? this.genToolbar() : h()]);
  }
});
var _createNamespace$1u = createNamespace$1("area"), createComponent$1y = _createNamespace$1u[0], bem$1p = _createNamespace$1u[1];
var PLACEHOLDER_CODE = "000000";
function isOverseaCode(code2) {
  return code2[0] === "9";
}
function pickSlots(instance2, keys2) {
  var $slots = instance2.$slots, $scopedSlots = instance2.$scopedSlots;
  var scopedSlots = {};
  keys2.forEach(function(key) {
    if ($scopedSlots[key]) {
      scopedSlots[key] = $scopedSlots[key];
    } else if ($slots[key]) {
      scopedSlots[key] = function() {
        return $slots[key];
      };
    }
  });
  return scopedSlots;
}
var Area = createComponent$1y({
  props: _extends$1({}, pickerProps, {
    value: String,
    areaList: {
      type: Object,
      default: function _default4() {
        return {};
      }
    },
    columnsNum: {
      type: [Number, String],
      default: 3
    },
    isOverseaCode: {
      type: Function,
      default: isOverseaCode
    },
    columnsPlaceholder: {
      type: Array,
      default: function _default5() {
        return [];
      }
    }
  }),
  data: function data5() {
    return {
      code: this.value,
      columns: [{
        values: []
      }, {
        values: []
      }, {
        values: []
      }]
    };
  },
  computed: {
    province: function province() {
      return this.areaList.province_list || {};
    },
    city: function city() {
      return this.areaList.city_list || {};
    },
    county: function county() {
      return this.areaList.county_list || {};
    },
    displayColumns: function displayColumns() {
      return this.columns.slice(0, +this.columnsNum);
    },
    placeholderMap: function placeholderMap() {
      return {
        province: this.columnsPlaceholder[0] || "",
        city: this.columnsPlaceholder[1] || "",
        county: this.columnsPlaceholder[2] || ""
      };
    }
  },
  watch: {
    value: function value(val) {
      this.code = val;
      this.setValues();
    },
    areaList: {
      deep: true,
      handler: "setValues"
    },
    columnsNum: function columnsNum() {
      var _this = this;
      this.$nextTick(function() {
        _this.setValues();
      });
    }
  },
  mounted: function mounted3() {
    this.setValues();
  },
  methods: {
    getList: function getList(type2, code2) {
      var result = [];
      if (type2 !== "province" && !code2) {
        return result;
      }
      var list2 = this[type2];
      result = Object.keys(list2).map(function(listCode) {
        return {
          code: listCode,
          name: list2[listCode]
        };
      });
      if (code2) {
        if (this.isOverseaCode(code2) && type2 === "city") {
          code2 = "9";
        }
        result = result.filter(function(item) {
          return item.code.indexOf(code2) === 0;
        });
      }
      if (this.placeholderMap[type2] && result.length) {
        var codeFill = "";
        if (type2 === "city") {
          codeFill = PLACEHOLDER_CODE.slice(2, 4);
        } else if (type2 === "county") {
          codeFill = PLACEHOLDER_CODE.slice(4, 6);
        }
        result.unshift({
          code: "" + code2 + codeFill,
          name: this.placeholderMap[type2]
        });
      }
      return result;
    },
    getIndex: function getIndex(type2, code2) {
      var compareNum = type2 === "province" ? 2 : type2 === "city" ? 4 : 6;
      var list2 = this.getList(type2, code2.slice(0, compareNum - 2));
      if (this.isOverseaCode(code2) && type2 === "province") {
        compareNum = 1;
      }
      code2 = code2.slice(0, compareNum);
      for (var i = 0; i < list2.length; i++) {
        if (list2[i].code.slice(0, compareNum) === code2) {
          return i;
        }
      }
      return 0;
    },
    parseOutputValues: function parseOutputValues(values) {
      var _this2 = this;
      return values.map(function(value17, index2) {
        if (!value17)
          return value17;
        value17 = JSON.parse(JSON.stringify(value17));
        if (!value17.code || value17.name === _this2.columnsPlaceholder[index2]) {
          value17.code = "";
          value17.name = "";
        }
        return value17;
      });
    },
    onChange: function onChange2(picker, values, index2) {
      this.code = values[index2].code;
      this.setValues();
      var parsedValues = this.parseOutputValues(picker.getValues());
      this.$emit("change", picker, parsedValues, index2);
    },
    onConfirm: function onConfirm(values, index2) {
      values = this.parseOutputValues(values);
      this.setValues();
      this.$emit("confirm", values, index2);
    },
    getDefaultCode: function getDefaultCode() {
      if (this.columnsPlaceholder.length) {
        return PLACEHOLDER_CODE;
      }
      var countyCodes = Object.keys(this.county);
      if (countyCodes[0]) {
        return countyCodes[0];
      }
      var cityCodes = Object.keys(this.city);
      if (cityCodes[0]) {
        return cityCodes[0];
      }
      return "";
    },
    setValues: function setValues2() {
      var code2 = this.code;
      if (!code2) {
        code2 = this.getDefaultCode();
      }
      var picker = this.$refs.picker;
      var province2 = this.getList("province");
      var city2 = this.getList("city", code2.slice(0, 2));
      if (!picker) {
        return;
      }
      picker.setColumnValues(0, province2);
      picker.setColumnValues(1, city2);
      if (city2.length && code2.slice(2, 4) === "00" && !this.isOverseaCode(code2)) {
        code2 = city2[0].code;
      }
      picker.setColumnValues(2, this.getList("county", code2.slice(0, 4)));
      picker.setIndexes([this.getIndex("province", code2), this.getIndex("city", code2), this.getIndex("county", code2)]);
    },
    getValues: function getValues2() {
      var picker = this.$refs.picker;
      var getValues4 = picker ? picker.getValues().filter(function(value17) {
        return !!value17;
      }) : [];
      getValues4 = this.parseOutputValues(getValues4);
      return getValues4;
    },
    getArea: function getArea() {
      var values = this.getValues();
      var area = {
        code: "",
        country: "",
        province: "",
        city: "",
        county: ""
      };
      if (!values.length) {
        return area;
      }
      var names = values.map(function(item) {
        return item.name;
      });
      var validValues = values.filter(function(value17) {
        return !!value17.code;
      });
      area.code = validValues.length ? validValues[validValues.length - 1].code : "";
      if (this.isOverseaCode(area.code)) {
        area.country = names[1] || "";
        area.province = names[2] || "";
      } else {
        area.province = names[0] || "";
        area.city = names[1] || "";
        area.county = names[2] || "";
      }
      return area;
    },
    reset: function reset(code2) {
      this.code = code2 || "";
      this.setValues();
    }
  },
  render: function render7() {
    var h = arguments[0];
    var on2 = _extends$1({}, this.$listeners, {
      change: this.onChange,
      confirm: this.onConfirm
    });
    return h(Picker, {
      "ref": "picker",
      "class": bem$1p(),
      "attrs": {
        "showToolbar": true,
        "valueKey": "name",
        "title": this.title,
        "columns": this.displayColumns,
        "loading": this.loading,
        "readonly": this.readonly,
        "itemHeight": this.itemHeight,
        "swipeDuration": this.swipeDuration,
        "visibleItemCount": this.visibleItemCount,
        "cancelButtonText": this.cancelButtonText,
        "confirmButtonText": this.confirmButtonText
      },
      "scopedSlots": pickSlots(this, ["title", "columns-top", "columns-bottom"]),
      "on": _extends$1({}, on2)
    });
  }
});
function isRedundantNavigation(err) {
  return err.name === "NavigationDuplicated" || err.message && err.message.indexOf("redundant navigation") !== -1;
}
function route(router, config2) {
  var to = config2.to, url = config2.url, replace = config2.replace;
  if (to && router) {
    var promise = router[replace ? "replace" : "push"](to);
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
var cellProps = {
  icon: String,
  size: String,
  center: Boolean,
  isLink: Boolean,
  required: Boolean,
  iconPrefix: String,
  titleStyle: null,
  titleClass: null,
  valueClass: null,
  labelClass: null,
  title: [Number, String],
  value: [Number, String],
  label: [Number, String],
  arrowDirection: String,
  border: {
    type: Boolean,
    default: true
  },
  clickable: {
    type: Boolean,
    default: null
  }
};
var _createNamespace$1t = createNamespace$1("cell"), createComponent$1x = _createNamespace$1t[0], bem$1o = _createNamespace$1t[1];
function Cell(h, props2, slots4, ctx) {
  var _props$clickable;
  var icon = props2.icon, size2 = props2.size, title4 = props2.title, label = props2.label, value17 = props2.value, isLink = props2.isLink;
  var showTitle = slots4.title || isDef(title4);
  function Label() {
    var showLabel = slots4.label || isDef(label);
    if (showLabel) {
      return h("div", {
        "class": [bem$1o("label"), props2.labelClass]
      }, [slots4.label ? slots4.label() : label]);
    }
  }
  function Title2() {
    if (showTitle) {
      return h("div", {
        "class": [bem$1o("title"), props2.titleClass],
        "style": props2.titleStyle
      }, [slots4.title ? slots4.title() : h("span", [title4]), Label()]);
    }
  }
  function Value() {
    var showValue = slots4.default || isDef(value17);
    if (showValue) {
      return h("div", {
        "class": [bem$1o("value", {
          alone: !showTitle
        }), props2.valueClass]
      }, [slots4.default ? slots4.default() : h("span", [value17])]);
    }
  }
  function LeftIcon() {
    if (slots4.icon) {
      return slots4.icon();
    }
    if (icon) {
      return h(Icon$1, {
        "class": bem$1o("left-icon"),
        "attrs": {
          "name": icon,
          "classPrefix": props2.iconPrefix
        }
      });
    }
  }
  function RightIcon() {
    var rightIconSlot = slots4["right-icon"];
    if (rightIconSlot) {
      return rightIconSlot();
    }
    if (isLink) {
      var arrowDirection = props2.arrowDirection;
      return h(Icon$1, {
        "class": bem$1o("right-icon"),
        "attrs": {
          "name": arrowDirection ? "arrow-" + arrowDirection : "arrow"
        }
      });
    }
  }
  function onClick19(event) {
    emit(ctx, "click", event);
    functionalRoute(ctx);
  }
  var clickable = (_props$clickable = props2.clickable) != null ? _props$clickable : isLink;
  var classes = {
    clickable,
    center: props2.center,
    required: props2.required,
    borderless: !props2.border
  };
  if (size2) {
    classes[size2] = size2;
  }
  return h("div", helper([{
    "class": bem$1o(classes),
    "attrs": {
      "role": clickable ? "button" : null,
      "tabindex": clickable ? 0 : null
    },
    "on": {
      "click": onClick19
    }
  }, inherit(ctx)]), [LeftIcon(), Title2(), Value(), RightIcon(), slots4.extra == null ? void 0 : slots4.extra()]);
}
Cell.props = _extends$1({}, cellProps, routeProps);
var Cell$1 = createComponent$1x(Cell);
function isAndroid() {
  return isServer$1 ? false : /android/.test(navigator.userAgent.toLowerCase());
}
function isIOS$1() {
  return isServer$1 ? false : /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
}
var isIOS = isIOS$1();
function resetScroll() {
  if (isIOS) {
    setRootScrollTop(getRootScrollTop());
  }
}
var _createNamespace$1s = createNamespace$1("field"), createComponent$1w = _createNamespace$1s[0], bem$1n = _createNamespace$1s[1];
var Field = createComponent$1w({
  inheritAttrs: false,
  provide: function provide() {
    return {
      vanField: this
    };
  },
  inject: {
    vanForm: {
      default: null
    }
  },
  props: _extends$1({}, cellProps, {
    name: String,
    rules: Array,
    disabled: {
      type: Boolean,
      default: null
    },
    readonly: {
      type: Boolean,
      default: null
    },
    autosize: [Boolean, Object],
    leftIcon: String,
    rightIcon: String,
    clearable: Boolean,
    formatter: Function,
    maxlength: [Number, String],
    labelWidth: [Number, String],
    labelClass: null,
    labelAlign: String,
    inputAlign: String,
    placeholder: String,
    errorMessage: String,
    errorMessageAlign: String,
    showWordLimit: Boolean,
    value: {
      type: [Number, String],
      default: ""
    },
    type: {
      type: String,
      default: "text"
    },
    error: {
      type: Boolean,
      default: null
    },
    colon: {
      type: Boolean,
      default: null
    },
    clearTrigger: {
      type: String,
      default: "focus"
    },
    formatTrigger: {
      type: String,
      default: "onChange"
    }
  }),
  data: function data6() {
    return {
      focused: false,
      validateFailed: false,
      validateMessage: ""
    };
  },
  watch: {
    value: function value2() {
      this.updateValue(this.value);
      this.resetValidation();
      this.validateWithTrigger("onChange");
      this.$nextTick(this.adjustSize);
    }
  },
  mounted: function mounted4() {
    this.updateValue(this.value, this.formatTrigger);
    this.$nextTick(this.adjustSize);
    if (this.vanForm) {
      this.vanForm.addField(this);
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.vanForm) {
      this.vanForm.removeField(this);
    }
  },
  computed: {
    showClear: function showClear() {
      var readonly = this.getProp("readonly");
      if (this.clearable && !readonly) {
        var hasValue = isDef(this.value) && this.value !== "";
        var trigger2 = this.clearTrigger === "always" || this.clearTrigger === "focus" && this.focused;
        return hasValue && trigger2;
      }
    },
    showError: function showError() {
      if (this.error !== null) {
        return this.error;
      }
      if (this.vanForm && this.vanForm.showError && this.validateFailed) {
        return true;
      }
    },
    listeners: function listeners() {
      return _extends$1({}, this.$listeners, {
        blur: this.onBlur,
        focus: this.onFocus,
        input: this.onInput,
        click: this.onClickInput,
        keypress: this.onKeypress
      });
    },
    labelStyle: function labelStyle() {
      var labelWidth = this.getProp("labelWidth");
      if (labelWidth) {
        return {
          width: addUnit(labelWidth)
        };
      }
    },
    formValue: function formValue() {
      if (this.children && (this.$scopedSlots.input || this.$slots.input)) {
        return this.children.value;
      }
      return this.value;
    }
  },
  methods: {
    focus: function focus() {
      if (this.$refs.input) {
        this.$refs.input.focus();
      }
    },
    blur: function blur() {
      if (this.$refs.input) {
        this.$refs.input.blur();
      }
    },
    runValidator: function runValidator(value17, rule) {
      return new Promise(function(resolve) {
        var returnVal = rule.validator(value17, rule);
        if (isPromise(returnVal)) {
          return returnVal.then(resolve);
        }
        resolve(returnVal);
      });
    },
    isEmptyValue: function isEmptyValue(value17) {
      if (Array.isArray(value17)) {
        return !value17.length;
      }
      if (value17 === 0) {
        return false;
      }
      return !value17;
    },
    runSyncRule: function runSyncRule(value17, rule) {
      if (rule.required && this.isEmptyValue(value17)) {
        return false;
      }
      if (rule.pattern && !rule.pattern.test(value17)) {
        return false;
      }
      return true;
    },
    getRuleMessage: function getRuleMessage(value17, rule) {
      var message = rule.message;
      if (isFunction$1(message)) {
        return message(value17, rule);
      }
      return message;
    },
    runRules: function runRules(rules) {
      var _this = this;
      return rules.reduce(function(promise, rule) {
        return promise.then(function() {
          if (_this.validateFailed) {
            return;
          }
          var value17 = _this.formValue;
          if (rule.formatter) {
            value17 = rule.formatter(value17, rule);
          }
          if (!_this.runSyncRule(value17, rule)) {
            _this.validateFailed = true;
            _this.validateMessage = _this.getRuleMessage(value17, rule);
            return;
          }
          if (rule.validator) {
            return _this.runValidator(value17, rule).then(function(result) {
              if (result === false) {
                _this.validateFailed = true;
                _this.validateMessage = _this.getRuleMessage(value17, rule);
              }
            });
          }
        });
      }, Promise.resolve());
    },
    validate: function validate(rules) {
      var _this2 = this;
      if (rules === void 0) {
        rules = this.rules;
      }
      return new Promise(function(resolve) {
        if (!rules) {
          resolve();
        }
        _this2.resetValidation();
        _this2.runRules(rules).then(function() {
          if (_this2.validateFailed) {
            resolve({
              name: _this2.name,
              message: _this2.validateMessage
            });
          } else {
            resolve();
          }
        });
      });
    },
    validateWithTrigger: function validateWithTrigger(trigger2) {
      if (this.vanForm && this.rules) {
        var defaultTrigger = this.vanForm.validateTrigger === trigger2;
        var rules = this.rules.filter(function(rule) {
          if (rule.trigger) {
            return rule.trigger === trigger2;
          }
          return defaultTrigger;
        });
        if (rules.length) {
          this.validate(rules);
        }
      }
    },
    resetValidation: function resetValidation() {
      if (this.validateFailed) {
        this.validateFailed = false;
        this.validateMessage = "";
      }
    },
    updateValue: function updateValue(value17, trigger2) {
      if (trigger2 === void 0) {
        trigger2 = "onChange";
      }
      value17 = isDef(value17) ? String(value17) : "";
      var maxlength = this.maxlength;
      if (isDef(maxlength) && value17.length > maxlength) {
        if (this.value && this.value.length === +maxlength) {
          value17 = this.value;
        } else {
          value17 = value17.slice(0, maxlength);
        }
      }
      if (this.type === "number" || this.type === "digit") {
        var isNumber = this.type === "number";
        value17 = formatNumber(value17, isNumber, isNumber);
      }
      if (this.formatter && trigger2 === this.formatTrigger) {
        value17 = this.formatter(value17);
      }
      var input = this.$refs.input;
      if (input && value17 !== input.value) {
        input.value = value17;
      }
      if (value17 !== this.value) {
        this.$emit("input", value17);
      }
    },
    onInput: function onInput(event) {
      if (event.target.composing) {
        return;
      }
      this.updateValue(event.target.value);
    },
    onFocus: function onFocus(event) {
      this.focused = true;
      this.$emit("focus", event);
      this.$nextTick(this.adjustSize);
      if (this.getProp("readonly")) {
        this.blur();
      }
    },
    onBlur: function onBlur(event) {
      if (this.getProp("readonly")) {
        return;
      }
      this.focused = false;
      this.updateValue(this.value, "onBlur");
      this.$emit("blur", event);
      this.validateWithTrigger("onBlur");
      this.$nextTick(this.adjustSize);
      resetScroll();
    },
    onClick: function onClick(event) {
      this.$emit("click", event);
    },
    onClickInput: function onClickInput(event) {
      this.$emit("click-input", event);
    },
    onClickLeftIcon: function onClickLeftIcon(event) {
      this.$emit("click-left-icon", event);
    },
    onClickRightIcon: function onClickRightIcon(event) {
      this.$emit("click-right-icon", event);
    },
    onClear: function onClear(event) {
      preventDefault(event);
      this.$emit("input", "");
      this.$emit("clear", event);
    },
    onKeypress: function onKeypress(event) {
      var ENTER_CODE = 13;
      if (event.keyCode === ENTER_CODE) {
        var submitOnEnter = this.getProp("submitOnEnter");
        if (!submitOnEnter && this.type !== "textarea") {
          preventDefault(event);
        }
        if (this.type === "search") {
          this.blur();
        }
      }
      this.$emit("keypress", event);
    },
    adjustSize: function adjustSize() {
      var input = this.$refs.input;
      if (!(this.type === "textarea" && this.autosize) || !input) {
        return;
      }
      var scrollTop = getRootScrollTop();
      input.style.height = "auto";
      var height = input.scrollHeight;
      if (isObject(this.autosize)) {
        var _this$autosize = this.autosize, maxHeight = _this$autosize.maxHeight, minHeight = _this$autosize.minHeight;
        if (maxHeight) {
          height = Math.min(height, maxHeight);
        }
        if (minHeight) {
          height = Math.max(height, minHeight);
        }
      }
      if (height) {
        input.style.height = height + "px";
        setRootScrollTop(scrollTop);
      }
    },
    genInput: function genInput() {
      var h = this.$createElement;
      var type2 = this.type;
      var disabled = this.getProp("disabled");
      var readonly = this.getProp("readonly");
      var inputSlot = this.slots("input");
      var inputAlign = this.getProp("inputAlign");
      if (inputSlot) {
        return h("div", {
          "class": bem$1n("control", [inputAlign, "custom"]),
          "on": {
            "click": this.onClickInput
          }
        }, [inputSlot]);
      }
      var inputProps = {
        ref: "input",
        class: bem$1n("control", inputAlign),
        domProps: {
          value: this.value
        },
        attrs: _extends$1({}, this.$attrs, {
          name: this.name,
          disabled,
          readonly,
          placeholder: this.placeholder
        }),
        on: this.listeners,
        directives: [{
          name: "model",
          value: this.value
        }]
      };
      if (type2 === "textarea") {
        return h("textarea", helper([{}, inputProps]));
      }
      var inputType = type2;
      var inputMode;
      if (type2 === "number") {
        inputType = "text";
        inputMode = "decimal";
      }
      if (type2 === "digit") {
        inputType = "tel";
        inputMode = "numeric";
      }
      return h("input", helper([{
        "attrs": {
          "type": inputType,
          "inputmode": inputMode
        }
      }, inputProps]));
    },
    genLeftIcon: function genLeftIcon() {
      var h = this.$createElement;
      var showLeftIcon = this.slots("left-icon") || this.leftIcon;
      if (showLeftIcon) {
        return h("div", {
          "class": bem$1n("left-icon"),
          "on": {
            "click": this.onClickLeftIcon
          }
        }, [this.slots("left-icon") || h(Icon$1, {
          "attrs": {
            "name": this.leftIcon,
            "classPrefix": this.iconPrefix
          }
        })]);
      }
    },
    genRightIcon: function genRightIcon() {
      var h = this.$createElement;
      var slots4 = this.slots;
      var showRightIcon = slots4("right-icon") || this.rightIcon;
      if (showRightIcon) {
        return h("div", {
          "class": bem$1n("right-icon"),
          "on": {
            "click": this.onClickRightIcon
          }
        }, [slots4("right-icon") || h(Icon$1, {
          "attrs": {
            "name": this.rightIcon,
            "classPrefix": this.iconPrefix
          }
        })]);
      }
    },
    genWordLimit: function genWordLimit() {
      var h = this.$createElement;
      if (this.showWordLimit && this.maxlength) {
        var count6 = (this.value || "").length;
        return h("div", {
          "class": bem$1n("word-limit")
        }, [h("span", {
          "class": bem$1n("word-num")
        }, [count6]), "/", this.maxlength]);
      }
    },
    genMessage: function genMessage() {
      var h = this.$createElement;
      if (this.vanForm && this.vanForm.showErrorMessage === false) {
        return;
      }
      var message = this.errorMessage || this.validateMessage;
      if (message) {
        var errorMessageAlign = this.getProp("errorMessageAlign");
        return h("div", {
          "class": bem$1n("error-message", errorMessageAlign)
        }, [message]);
      }
    },
    getProp: function getProp(key) {
      if (isDef(this[key])) {
        return this[key];
      }
      if (this.vanForm && isDef(this.vanForm[key])) {
        return this.vanForm[key];
      }
    },
    genLabel: function genLabel() {
      var h = this.$createElement;
      var colon = this.getProp("colon") ? ":" : "";
      if (this.slots("label")) {
        return [this.slots("label"), colon];
      }
      if (this.label) {
        return h("span", [this.label + colon]);
      }
    }
  },
  render: function render8() {
    var _bem2;
    var h = arguments[0];
    var slots4 = this.slots;
    var disabled = this.getProp("disabled");
    var labelAlign = this.getProp("labelAlign");
    var scopedSlots = {
      icon: this.genLeftIcon
    };
    var Label = this.genLabel();
    if (Label) {
      scopedSlots.title = function() {
        return Label;
      };
    }
    var extra = this.slots("extra");
    if (extra) {
      scopedSlots.extra = function() {
        return extra;
      };
    }
    return h(Cell$1, {
      "attrs": {
        "icon": this.leftIcon,
        "size": this.size,
        "center": this.center,
        "border": this.border,
        "isLink": this.isLink,
        "required": this.required,
        "clickable": this.clickable,
        "titleStyle": this.labelStyle,
        "valueClass": bem$1n("value"),
        "titleClass": [bem$1n("label", labelAlign), this.labelClass],
        "arrowDirection": this.arrowDirection
      },
      "scopedSlots": scopedSlots,
      "class": bem$1n((_bem2 = {
        error: this.showError,
        disabled
      }, _bem2["label-" + labelAlign] = labelAlign, _bem2["min-height"] = this.type === "textarea" && !this.autosize, _bem2)),
      "on": {
        "click": this.onClick
      }
    }, [h("div", {
      "class": bem$1n("body")
    }, [this.genInput(), this.showClear && h(Icon$1, {
      "attrs": {
        "name": "clear"
      },
      "class": bem$1n("clear"),
      "on": {
        "touchstart": this.onClear
      }
    }), this.genRightIcon(), slots4("button") && h("div", {
      "class": bem$1n("button")
    }, [slots4("button")])]), this.genWordLimit(), this.genMessage()]);
  }
});
var lockCount = 0;
function lockClick(lock) {
  if (lock) {
    if (!lockCount) {
      document.body.classList.add("van-toast--unclickable");
    }
    lockCount++;
  } else {
    lockCount--;
    if (!lockCount) {
      document.body.classList.remove("van-toast--unclickable");
    }
  }
}
var _createNamespace$1r = createNamespace$1("toast"), createComponent$1v = _createNamespace$1r[0], bem$1m = _createNamespace$1r[1];
var VueToast = createComponent$1v({
  mixins: [PopupMixin()],
  props: {
    icon: String,
    className: null,
    iconPrefix: String,
    loadingType: String,
    forbidClick: Boolean,
    closeOnClick: Boolean,
    message: [Number, String],
    type: {
      type: String,
      default: "text"
    },
    position: {
      type: String,
      default: "middle"
    },
    transition: {
      type: String,
      default: "van-fade"
    },
    lockScroll: {
      type: Boolean,
      default: false
    }
  },
  data: function data7() {
    return {
      clickable: false
    };
  },
  mounted: function mounted5() {
    this.toggleClickable();
  },
  destroyed: function destroyed3() {
    this.toggleClickable();
  },
  watch: {
    value: "toggleClickable",
    forbidClick: "toggleClickable"
  },
  methods: {
    onClick: function onClick2() {
      if (this.closeOnClick) {
        this.close();
      }
    },
    toggleClickable: function toggleClickable() {
      var clickable = this.value && this.forbidClick;
      if (this.clickable !== clickable) {
        this.clickable = clickable;
        lockClick(clickable);
      }
    },
    onAfterEnter: function onAfterEnter() {
      this.$emit("opened");
      if (this.onOpened) {
        this.onOpened();
      }
    },
    onAfterLeave: function onAfterLeave() {
      this.$emit("closed");
    },
    genIcon: function genIcon() {
      var h = this.$createElement;
      var icon = this.icon, type2 = this.type, iconPrefix = this.iconPrefix, loadingType = this.loadingType;
      var hasIcon = icon || type2 === "success" || type2 === "fail";
      if (hasIcon) {
        return h(Icon$1, {
          "class": bem$1m("icon"),
          "attrs": {
            "classPrefix": iconPrefix,
            "name": icon || type2
          }
        });
      }
      if (type2 === "loading") {
        return h(Loading$1, {
          "class": bem$1m("loading"),
          "attrs": {
            "type": loadingType
          }
        });
      }
    },
    genMessage: function genMessage2() {
      var h = this.$createElement;
      var type2 = this.type, message = this.message;
      if (!isDef(message) || message === "") {
        return;
      }
      if (type2 === "html") {
        return h("div", {
          "class": bem$1m("text"),
          "domProps": {
            "innerHTML": message
          }
        });
      }
      return h("div", {
        "class": bem$1m("text")
      }, [message]);
    }
  },
  render: function render9() {
    var _ref;
    var h = arguments[0];
    return h("transition", {
      "attrs": {
        "name": this.transition
      },
      "on": {
        "afterEnter": this.onAfterEnter,
        "afterLeave": this.onAfterLeave
      }
    }, [h("div", {
      "directives": [{
        name: "show",
        value: this.value
      }],
      "class": [bem$1m([this.position, (_ref = {}, _ref[this.type] = !this.icon, _ref)]), this.className],
      "on": {
        "click": this.onClick
      }
    }, [this.genIcon(), this.genMessage()])]);
  }
});
var defaultOptions$1 = {
  icon: "",
  type: "text",
  mask: false,
  value: true,
  message: "",
  className: "",
  overlay: false,
  onClose: null,
  onOpened: null,
  duration: 2e3,
  iconPrefix: void 0,
  position: "middle",
  transition: "van-fade",
  forbidClick: false,
  loadingType: void 0,
  getContainer: "body",
  overlayStyle: null,
  closeOnClick: false,
  closeOnClickOverlay: false
};
var defaultOptionsMap = {};
var queue = [];
var multiple = false;
var currentOptions = _extends$1({}, defaultOptions$1);
function parseOptions$1(message) {
  if (isObject(message)) {
    return message;
  }
  return {
    message
  };
}
function isInDocument$1(element) {
  return document.body.contains(element);
}
function createInstance() {
  if (isServer$1) {
    return {};
  }
  queue = queue.filter(function(item) {
    return !item.$el.parentNode || isInDocument$1(item.$el);
  });
  if (!queue.length || multiple) {
    var toast = new (Vue.extend(VueToast))({
      el: document.createElement("div")
    });
    toast.$on("input", function(value17) {
      toast.value = value17;
    });
    queue.push(toast);
  }
  return queue[queue.length - 1];
}
function transformOptions(options) {
  return _extends$1({}, options, {
    overlay: options.mask || options.overlay,
    mask: void 0,
    duration: void 0
  });
}
function Toast(options) {
  if (options === void 0) {
    options = {};
  }
  var toast = createInstance();
  if (toast.value) {
    toast.updateZIndex();
  }
  options = parseOptions$1(options);
  options = _extends$1({}, currentOptions, defaultOptionsMap[options.type || currentOptions.type], options);
  options.clear = function() {
    toast.value = false;
    if (options.onClose) {
      options.onClose();
      options.onClose = null;
    }
    if (multiple && !isServer$1) {
      toast.$on("closed", function() {
        clearTimeout(toast.timer);
        queue = queue.filter(function(item) {
          return item !== toast;
        });
        removeNode(toast.$el);
        toast.$destroy();
      });
    }
  };
  _extends$1(toast, transformOptions(options));
  clearTimeout(toast.timer);
  if (options.duration > 0) {
    toast.timer = setTimeout(function() {
      toast.clear();
    }, options.duration);
  }
  return toast;
}
var createMethod = function createMethod2(type2) {
  return function(options) {
    return Toast(_extends$1({
      type: type2
    }, parseOptions$1(options)));
  };
};
["loading", "success", "fail"].forEach(function(method) {
  Toast[method] = createMethod(method);
});
Toast.clear = function(all) {
  if (queue.length) {
    if (all) {
      queue.forEach(function(toast) {
        toast.clear();
      });
      queue = [];
    } else if (!multiple) {
      queue[0].clear();
    } else {
      queue.shift().clear();
    }
  }
};
Toast.setDefaultOptions = function(type2, options) {
  if (typeof type2 === "string") {
    defaultOptionsMap[type2] = options;
  } else {
    _extends$1(currentOptions, type2);
  }
};
Toast.resetDefaultOptions = function(type2) {
  if (typeof type2 === "string") {
    defaultOptionsMap[type2] = null;
  } else {
    currentOptions = _extends$1({}, defaultOptions$1);
    defaultOptionsMap = {};
  }
};
Toast.allowMultiple = function(value17) {
  if (value17 === void 0) {
    value17 = true;
  }
  multiple = value17;
};
Toast.install = function() {
  Vue.use(VueToast);
};
Vue.prototype.$toast = Toast;
var _createNamespace$1q = createNamespace$1("button"), createComponent$1u = _createNamespace$1q[0], bem$1l = _createNamespace$1q[1];
function Button(h, props2, slots4, ctx) {
  var _ref;
  var tag = props2.tag, icon = props2.icon, type2 = props2.type, color = props2.color, plain = props2.plain, disabled = props2.disabled, loading = props2.loading, hairline = props2.hairline, loadingText = props2.loadingText, iconPosition = props2.iconPosition;
  var style12 = {};
  if (color) {
    style12.color = plain ? color : "white";
    if (!plain) {
      style12.background = color;
    }
    if (color.indexOf("gradient") !== -1) {
      style12.border = 0;
    } else {
      style12.borderColor = color;
    }
  }
  function onClick19(event) {
    if (props2.loading) {
      event.preventDefault();
    }
    if (!loading && !disabled) {
      emit(ctx, "click", event);
      functionalRoute(ctx);
    }
  }
  function onTouchstart2(event) {
    emit(ctx, "touchstart", event);
  }
  var classes = [bem$1l([type2, props2.size, {
    plain,
    loading,
    disabled,
    hairline,
    block: props2.block,
    round: props2.round,
    square: props2.square
  }]), (_ref = {}, _ref[BORDER_SURROUND] = hairline, _ref)];
  function renderIcon() {
    if (loading) {
      return slots4.loading ? slots4.loading() : h(Loading$1, {
        "class": bem$1l("loading"),
        "attrs": {
          "size": props2.loadingSize,
          "type": props2.loadingType,
          "color": "currentColor"
        }
      });
    }
    if (slots4.icon) {
      return h("div", {
        "class": bem$1l("icon")
      }, [slots4.icon()]);
    }
    if (icon) {
      return h(Icon$1, {
        "attrs": {
          "name": icon,
          "classPrefix": props2.iconPrefix
        },
        "class": bem$1l("icon")
      });
    }
  }
  function renderContent2() {
    var content = [];
    if (iconPosition === "left") {
      content.push(renderIcon());
    }
    var text2;
    if (loading) {
      text2 = loadingText;
    } else {
      text2 = slots4.default ? slots4.default() : props2.text;
    }
    if (text2) {
      content.push(h("span", {
        "class": bem$1l("text")
      }, [text2]));
    }
    if (iconPosition === "right") {
      content.push(renderIcon());
    }
    return content;
  }
  return h(tag, helper([{
    "style": style12,
    "class": classes,
    "attrs": {
      "type": props2.nativeType,
      "disabled": disabled
    },
    "on": {
      "click": onClick19,
      "touchstart": onTouchstart2
    }
  }, inherit(ctx)]), [h("div", {
    "class": bem$1l("content")
  }, [renderContent2()])]);
}
Button.props = _extends$1({}, routeProps, {
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
var Button$1 = createComponent$1u(Button);
function flattenVNodes(vnodes) {
  var result = [];
  function traverse2(vnodes2) {
    vnodes2.forEach(function(vnode) {
      result.push(vnode);
      if (vnode.componentInstance) {
        traverse2(vnode.componentInstance.$children.map(function(item) {
          return item.$vnode;
        }));
      }
      if (vnode.children) {
        traverse2(vnode.children);
      }
    });
  }
  traverse2(vnodes);
  return result;
}
function sortChildren(children3, parent) {
  var componentOptions = parent.$vnode.componentOptions;
  if (!componentOptions || !componentOptions.children) {
    return;
  }
  var vnodes = flattenVNodes(componentOptions.children);
  children3.sort(function(a, b) {
    return vnodes.indexOf(a.$vnode) - vnodes.indexOf(b.$vnode);
  });
}
function ChildrenMixin(_parent, options) {
  var _inject, _computed;
  if (options === void 0) {
    options = {};
  }
  var indexKey = options.indexKey || "index";
  return {
    inject: (_inject = {}, _inject[_parent] = {
      default: null
    }, _inject),
    computed: (_computed = {
      parent: function parent() {
        if (this.disableBindRelation) {
          return null;
        }
        return this[_parent];
      }
    }, _computed[indexKey] = function() {
      this.bindRelation();
      if (this.parent) {
        return this.parent.children.indexOf(this);
      }
      return null;
    }, _computed),
    watch: {
      disableBindRelation: function disableBindRelation(val) {
        if (!val) {
          this.bindRelation();
        }
      }
    },
    mounted: function mounted25() {
      this.bindRelation();
    },
    beforeDestroy: function beforeDestroy6() {
      var _this = this;
      if (this.parent) {
        this.parent.children = this.parent.children.filter(function(item) {
          return item !== _this;
        });
      }
    },
    methods: {
      bindRelation: function bindRelation() {
        if (!this.parent || this.parent.children.indexOf(this) !== -1) {
          return;
        }
        var children3 = [].concat(this.parent.children, [this]);
        sortChildren(children3, this.parent);
        this.parent.children = children3;
      }
    }
  };
}
function ParentMixin(parent) {
  return {
    provide: function provide3() {
      var _ref;
      return _ref = {}, _ref[parent] = this, _ref;
    },
    data: function data49() {
      return {
        children: []
      };
    }
  };
}
var _createNamespace$1p = createNamespace$1("goods-action"), createComponent$1t = _createNamespace$1p[0], bem$1k = _createNamespace$1p[1];
var GoodsAction = createComponent$1t({
  mixins: [ParentMixin("vanGoodsAction")],
  props: {
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    }
  },
  render: function render10() {
    var h = arguments[0];
    return h("div", {
      "class": bem$1k({
        unfit: !this.safeAreaInsetBottom
      })
    }, [this.slots()]);
  }
});
var _createNamespace$1o = createNamespace$1("goods-action-button"), createComponent$1s = _createNamespace$1o[0], bem$1j = _createNamespace$1o[1];
var GoodsActionButton = createComponent$1s({
  mixins: [ChildrenMixin("vanGoodsAction")],
  props: _extends$1({}, routeProps, {
    type: String,
    text: String,
    icon: String,
    color: String,
    loading: Boolean,
    disabled: Boolean
  }),
  computed: {
    isFirst: function isFirst() {
      var prev3 = this.parent && this.parent.children[this.index - 1];
      return !prev3 || prev3.$options.name !== this.$options.name;
    },
    isLast: function isLast() {
      var next3 = this.parent && this.parent.children[this.index + 1];
      return !next3 || next3.$options.name !== this.$options.name;
    }
  },
  methods: {
    onClick: function onClick3(event) {
      this.$emit("click", event);
      route(this.$router, this);
    }
  },
  render: function render11() {
    var h = arguments[0];
    return h(Button$1, {
      "class": bem$1j([{
        first: this.isFirst,
        last: this.isLast
      }, this.type]),
      "attrs": {
        "size": "large",
        "type": this.type,
        "icon": this.icon,
        "color": this.color,
        "loading": this.loading,
        "disabled": this.disabled
      },
      "on": {
        "click": this.onClick
      }
    }, [this.slots() || this.text]);
  }
});
var _createNamespace$1n = createNamespace$1("dialog"), createComponent$1r = _createNamespace$1n[0], bem$1i = _createNamespace$1n[1], t$q = _createNamespace$1n[2];
var VanDialog = createComponent$1r({
  mixins: [PopupMixin()],
  props: {
    title: String,
    theme: String,
    width: [Number, String],
    message: String,
    className: null,
    callback: Function,
    beforeClose: Function,
    messageAlign: String,
    cancelButtonText: String,
    cancelButtonColor: String,
    confirmButtonText: String,
    confirmButtonColor: String,
    showCancelButton: Boolean,
    overlay: {
      type: Boolean,
      default: true
    },
    allowHtml: {
      type: Boolean,
      default: true
    },
    transition: {
      type: String,
      default: "van-dialog-bounce"
    },
    showConfirmButton: {
      type: Boolean,
      default: true
    },
    closeOnPopstate: {
      type: Boolean,
      default: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: false
    }
  },
  data: function data8() {
    return {
      loading: {
        confirm: false,
        cancel: false
      }
    };
  },
  methods: {
    onClickOverlay: function onClickOverlay() {
      this.handleAction("overlay");
    },
    handleAction: function handleAction(action) {
      var _this = this;
      this.$emit(action);
      if (!this.value) {
        return;
      }
      if (this.beforeClose) {
        this.loading[action] = true;
        this.beforeClose(action, function(state) {
          if (state !== false && _this.loading[action]) {
            _this.onClose(action);
          }
          _this.loading.confirm = false;
          _this.loading.cancel = false;
        });
      } else {
        this.onClose(action);
      }
    },
    onClose: function onClose(action) {
      this.close();
      if (this.callback) {
        this.callback(action);
      }
    },
    onOpened: function onOpened() {
      var _this2 = this;
      this.$emit("opened");
      this.$nextTick(function() {
        var _this2$$refs$dialog;
        (_this2$$refs$dialog = _this2.$refs.dialog) == null ? void 0 : _this2$$refs$dialog.focus();
      });
    },
    onClosed: function onClosed() {
      this.$emit("closed");
    },
    onKeydown: function onKeydown(event) {
      var _this3 = this;
      if (event.key === "Escape" || event.key === "Enter") {
        if (event.target !== this.$refs.dialog) {
          return;
        }
        var onEventType = {
          Enter: this.showConfirmButton ? function() {
            return _this3.handleAction("confirm");
          } : noop,
          Escape: this.showCancelButton ? function() {
            return _this3.handleAction("cancel");
          } : noop
        };
        onEventType[event.key]();
        this.$emit("keydown", event);
      }
    },
    genRoundButtons: function genRoundButtons() {
      var _this4 = this;
      var h = this.$createElement;
      return h(GoodsAction, {
        "class": bem$1i("footer")
      }, [this.showCancelButton && h(GoodsActionButton, {
        "attrs": {
          "size": "large",
          "type": "warning",
          "text": this.cancelButtonText || t$q("cancel"),
          "color": this.cancelButtonColor,
          "loading": this.loading.cancel
        },
        "class": bem$1i("cancel"),
        "on": {
          "click": function click() {
            _this4.handleAction("cancel");
          }
        }
      }), this.showConfirmButton && h(GoodsActionButton, {
        "attrs": {
          "size": "large",
          "type": "danger",
          "text": this.confirmButtonText || t$q("confirm"),
          "color": this.confirmButtonColor,
          "loading": this.loading.confirm
        },
        "class": bem$1i("confirm"),
        "on": {
          "click": function click() {
            _this4.handleAction("confirm");
          }
        }
      })]);
    },
    genButtons: function genButtons() {
      var _this5 = this, _ref;
      var h = this.$createElement;
      var multiple2 = this.showCancelButton && this.showConfirmButton;
      return h("div", {
        "class": [BORDER_TOP, bem$1i("footer")]
      }, [this.showCancelButton && h(Button$1, {
        "attrs": {
          "size": "large",
          "loading": this.loading.cancel,
          "text": this.cancelButtonText || t$q("cancel"),
          "nativeType": "button"
        },
        "class": bem$1i("cancel"),
        "style": {
          color: this.cancelButtonColor
        },
        "on": {
          "click": function click() {
            _this5.handleAction("cancel");
          }
        }
      }), this.showConfirmButton && h(Button$1, {
        "attrs": {
          "size": "large",
          "loading": this.loading.confirm,
          "text": this.confirmButtonText || t$q("confirm"),
          "nativeType": "button"
        },
        "class": [bem$1i("confirm"), (_ref = {}, _ref[BORDER_LEFT] = multiple2, _ref)],
        "style": {
          color: this.confirmButtonColor
        },
        "on": {
          "click": function click() {
            _this5.handleAction("confirm");
          }
        }
      })]);
    },
    genContent: function genContent(hasTitle, messageSlot) {
      var h = this.$createElement;
      if (messageSlot) {
        return h("div", {
          "class": bem$1i("content")
        }, [messageSlot]);
      }
      var message = this.message, messageAlign = this.messageAlign;
      if (message) {
        var _bem2, _domProps;
        var data49 = {
          class: bem$1i("message", (_bem2 = {
            "has-title": hasTitle
          }, _bem2[messageAlign] = messageAlign, _bem2)),
          domProps: (_domProps = {}, _domProps[this.allowHtml ? "innerHTML" : "textContent"] = message, _domProps)
        };
        return h("div", {
          "class": bem$1i("content", {
            isolated: !hasTitle
          })
        }, [h("div", helper([{}, data49]))]);
      }
    }
  },
  render: function render12() {
    var h = arguments[0];
    if (!this.shouldRender) {
      return;
    }
    var message = this.message;
    var messageSlot = this.slots();
    var title4 = this.slots("title") || this.title;
    var Title2 = title4 && h("div", {
      "class": bem$1i("header", {
        isolated: !message && !messageSlot
      })
    }, [title4]);
    return h("transition", {
      "attrs": {
        "name": this.transition
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
      "attrs": {
        "role": "dialog",
        "aria-labelledby": this.title || message,
        "tabIndex": 0
      },
      "class": [bem$1i([this.theme]), this.className],
      "style": {
        width: addUnit(this.width)
      },
      "ref": "dialog",
      "on": {
        "keydown": this.onKeydown
      }
    }, [Title2, this.genContent(title4, messageSlot), this.theme === "round-button" ? this.genRoundButtons() : this.genButtons()])]);
  }
});
var instance$2;
function isInDocument(element) {
  return document.body.contains(element);
}
function initInstance$1() {
  if (instance$2) {
    instance$2.$destroy();
  }
  instance$2 = new (Vue.extend(VanDialog))({
    el: document.createElement("div"),
    propsData: {
      lazyRender: false
    }
  });
  instance$2.$on("input", function(value17) {
    instance$2.value = value17;
  });
}
function Dialog(options) {
  if (isServer$1) {
    return Promise.resolve();
  }
  return new Promise(function(resolve, reject) {
    if (!instance$2 || !isInDocument(instance$2.$el)) {
      initInstance$1();
    }
    _extends$1(instance$2, Dialog.currentOptions, options, {
      resolve,
      reject
    });
  });
}
Dialog.defaultOptions = {
  value: true,
  title: "",
  width: "",
  theme: null,
  message: "",
  overlay: true,
  className: "",
  allowHtml: true,
  lockScroll: true,
  transition: "van-dialog-bounce",
  beforeClose: null,
  overlayClass: "",
  overlayStyle: null,
  messageAlign: "",
  getContainer: "body",
  cancelButtonText: "",
  cancelButtonColor: null,
  confirmButtonText: "",
  confirmButtonColor: null,
  showConfirmButton: true,
  showCancelButton: false,
  closeOnPopstate: true,
  closeOnClickOverlay: false,
  callback: function callback(action) {
    instance$2[action === "confirm" ? "resolve" : "reject"](action);
  }
};
Dialog.alert = Dialog;
Dialog.confirm = function(options) {
  return Dialog(_extends$1({
    showCancelButton: true
  }, options));
};
Dialog.close = function() {
  if (instance$2) {
    instance$2.value = false;
  }
};
Dialog.setDefaultOptions = function(options) {
  _extends$1(Dialog.currentOptions, options);
};
Dialog.resetDefaultOptions = function() {
  Dialog.currentOptions = _extends$1({}, Dialog.defaultOptions);
};
Dialog.resetDefaultOptions();
Dialog.install = function() {
  Vue.use(VanDialog);
};
Dialog.Component = VanDialog;
Vue.prototype.$dialog = Dialog;
var _createNamespace$1m = createNamespace$1("address-edit-detail"), createComponent$1q = _createNamespace$1m[0], bem$1h = _createNamespace$1m[1], t$p = _createNamespace$1m[2];
var android = isAndroid();
var Detail = createComponent$1q({
  props: {
    value: String,
    errorMessage: String,
    focused: Boolean,
    detailRows: [Number, String],
    searchResult: Array,
    detailMaxlength: [Number, String],
    showSearchResult: Boolean
  },
  computed: {
    shouldShowSearchResult: function shouldShowSearchResult() {
      return this.focused && this.searchResult && this.showSearchResult;
    }
  },
  methods: {
    onSelect: function onSelect(express) {
      this.$emit("select-search", express);
      this.$emit("input", ((express.address || "") + " " + (express.name || "")).trim());
    },
    onFinish: function onFinish() {
      this.$refs.field.blur();
    },
    genFinish: function genFinish() {
      var h = this.$createElement;
      var show5 = this.value && this.focused && android;
      if (show5) {
        return h("div", {
          "class": bem$1h("finish"),
          "on": {
            "click": this.onFinish
          }
        }, [t$p("complete")]);
      }
    },
    genSearchResult: function genSearchResult() {
      var _this = this;
      var h = this.$createElement;
      var value17 = this.value, shouldShowSearchResult2 = this.shouldShowSearchResult, searchResult = this.searchResult;
      if (shouldShowSearchResult2) {
        return searchResult.map(function(express) {
          return h(Cell$1, {
            "key": express.name + express.address,
            "attrs": {
              "clickable": true,
              "border": false,
              "icon": "location-o",
              "label": express.address
            },
            "class": bem$1h("search-item"),
            "on": {
              "click": function click() {
                _this.onSelect(express);
              }
            },
            "scopedSlots": {
              title: function title4() {
                if (express.name) {
                  var text2 = express.name.replace(value17, "<span class=" + bem$1h("keyword") + ">" + value17 + "</span>");
                  return h("div", {
                    "domProps": {
                      "innerHTML": text2
                    }
                  });
                }
              }
            }
          });
        });
      }
    }
  },
  render: function render13() {
    var h = arguments[0];
    return h(Cell$1, {
      "class": bem$1h()
    }, [h(Field, {
      "attrs": {
        "autosize": true,
        "rows": this.detailRows,
        "clearable": !android,
        "type": "textarea",
        "value": this.value,
        "errorMessage": this.errorMessage,
        "border": !this.shouldShowSearchResult,
        "label": t$p("label"),
        "maxlength": this.detailMaxlength,
        "placeholder": t$p("placeholder")
      },
      "ref": "field",
      "scopedSlots": {
        icon: this.genFinish
      },
      "on": _extends$1({}, this.$listeners)
    }), this.genSearchResult()]);
  }
});
var switchProps = {
  size: [Number, String],
  value: null,
  loading: Boolean,
  disabled: Boolean,
  activeColor: String,
  inactiveColor: String,
  activeValue: {
    type: null,
    default: true
  },
  inactiveValue: {
    type: null,
    default: false
  }
};
var FieldMixin = {
  inject: {
    vanField: {
      default: null
    }
  },
  watch: {
    value: function value3() {
      var field = this.vanField;
      if (field) {
        field.resetValidation();
        field.validateWithTrigger("onChange");
      }
    }
  },
  created: function created3() {
    var field = this.vanField;
    if (field && !field.children) {
      field.children = this;
    }
  }
};
var _createNamespace$1l = createNamespace$1("switch"), createComponent$1p = _createNamespace$1l[0], bem$1g = _createNamespace$1l[1];
var Switch = createComponent$1p({
  mixins: [FieldMixin],
  props: switchProps,
  computed: {
    checked: function checked() {
      return this.value === this.activeValue;
    },
    style: function style2() {
      return {
        fontSize: addUnit(this.size),
        backgroundColor: this.checked ? this.activeColor : this.inactiveColor
      };
    }
  },
  methods: {
    onClick: function onClick4(event) {
      this.$emit("click", event);
      if (!this.disabled && !this.loading) {
        var newValue = this.checked ? this.inactiveValue : this.activeValue;
        this.$emit("input", newValue);
        this.$emit("change", newValue);
      }
    },
    genLoading: function genLoading() {
      var h = this.$createElement;
      if (this.loading) {
        var color = this.checked ? this.activeColor : this.inactiveColor;
        return h(Loading$1, {
          "class": bem$1g("loading"),
          "attrs": {
            "color": color
          }
        });
      }
    }
  },
  render: function render14() {
    var h = arguments[0];
    var checked3 = this.checked, loading = this.loading, disabled = this.disabled;
    return h("div", {
      "class": bem$1g({
        on: checked3,
        loading,
        disabled
      }),
      "attrs": {
        "role": "switch",
        "aria-checked": String(checked3)
      },
      "style": this.style,
      "on": {
        "click": this.onClick
      }
    }, [h("div", {
      "class": bem$1g("node")
    }, [this.genLoading()])]);
  }
});
var _createNamespace$1k = createNamespace$1("address-edit"), createComponent$1o = _createNamespace$1k[0], bem$1f = _createNamespace$1k[1], t$o = _createNamespace$1k[2];
var defaultData = {
  name: "",
  tel: "",
  country: "",
  province: "",
  city: "",
  county: "",
  areaCode: "",
  postalCode: "",
  addressDetail: "",
  isDefault: false
};
function isPostal(value17) {
  return /^\d{6}$/.test(value17);
}
var AddressEdit = createComponent$1o({
  props: {
    areaList: Object,
    isSaving: Boolean,
    isDeleting: Boolean,
    validator: Function,
    showDelete: Boolean,
    showPostal: Boolean,
    searchResult: Array,
    telMaxlength: [Number, String],
    showSetDefault: Boolean,
    saveButtonText: String,
    areaPlaceholder: String,
    deleteButtonText: String,
    showSearchResult: Boolean,
    showArea: {
      type: Boolean,
      default: true
    },
    showDetail: {
      type: Boolean,
      default: true
    },
    disableArea: Boolean,
    detailRows: {
      type: [Number, String],
      default: 1
    },
    detailMaxlength: {
      type: [Number, String],
      default: 200
    },
    addressInfo: {
      type: Object,
      default: function _default6() {
        return _extends$1({}, defaultData);
      }
    },
    telValidator: {
      type: Function,
      default: isMobile
    },
    postalValidator: {
      type: Function,
      default: isPostal
    },
    areaColumnsPlaceholder: {
      type: Array,
      default: function _default7() {
        return [];
      }
    }
  },
  data: function data9() {
    return {
      data: {},
      showAreaPopup: false,
      detailFocused: false,
      errorInfo: {
        tel: "",
        name: "",
        areaCode: "",
        postalCode: "",
        addressDetail: ""
      }
    };
  },
  computed: {
    areaListLoaded: function areaListLoaded() {
      return isObject(this.areaList) && Object.keys(this.areaList).length;
    },
    areaText: function areaText() {
      var _this$data = this.data, country = _this$data.country, province2 = _this$data.province, city2 = _this$data.city, county2 = _this$data.county, areaCode = _this$data.areaCode;
      if (areaCode) {
        var arr = [country, province2, city2, county2];
        if (province2 && province2 === city2) {
          arr.splice(1, 1);
        }
        return arr.filter(function(text2) {
          return text2;
        }).join("/");
      }
      return "";
    },
    hideBottomFields: function hideBottomFields() {
      var searchResult = this.searchResult;
      return searchResult && searchResult.length && this.detailFocused;
    }
  },
  watch: {
    addressInfo: {
      handler: function handler(val) {
        this.data = _extends$1({}, defaultData, val);
        this.setAreaCode(val.areaCode);
      },
      deep: true,
      immediate: true
    },
    areaList: function areaList() {
      this.setAreaCode(this.data.areaCode);
    }
  },
  methods: {
    onFocus: function onFocus2(key) {
      this.errorInfo[key] = "";
      this.detailFocused = key === "addressDetail";
      this.$emit("focus", key);
    },
    onChangeDetail: function onChangeDetail(val) {
      this.data.addressDetail = val;
      this.$emit("change-detail", val);
    },
    onAreaConfirm: function onAreaConfirm(values) {
      values = values.filter(function(value17) {
        return !!value17;
      });
      if (values.some(function(value17) {
        return !value17.code;
      })) {
        Toast(t$o("areaEmpty"));
        return;
      }
      this.showAreaPopup = false;
      this.assignAreaValues();
      this.$emit("change-area", values);
    },
    assignAreaValues: function assignAreaValues() {
      var area = this.$refs.area;
      if (area) {
        var detail = area.getArea();
        detail.areaCode = detail.code;
        delete detail.code;
        _extends$1(this.data, detail);
      }
    },
    onSave: function onSave() {
      var _this = this;
      var items = ["name", "tel"];
      if (this.showArea) {
        items.push("areaCode");
      }
      if (this.showDetail) {
        items.push("addressDetail");
      }
      if (this.showPostal) {
        items.push("postalCode");
      }
      var isValid = items.every(function(item) {
        var msg = _this.getErrorMessage(item);
        if (msg) {
          _this.errorInfo[item] = msg;
        }
        return !msg;
      });
      if (isValid && !this.isSaving) {
        this.$emit("save", this.data);
      }
    },
    getErrorMessage: function getErrorMessage(key) {
      var value17 = String(this.data[key] || "").trim();
      if (this.validator) {
        var message = this.validator(key, value17);
        if (message) {
          return message;
        }
      }
      switch (key) {
        case "name":
          return value17 ? "" : t$o("nameEmpty");
        case "tel":
          return this.telValidator(value17) ? "" : t$o("telInvalid");
        case "areaCode":
          return value17 ? "" : t$o("areaEmpty");
        case "addressDetail":
          return value17 ? "" : t$o("addressEmpty");
        case "postalCode":
          return value17 && !this.postalValidator(value17) ? t$o("postalEmpty") : "";
      }
    },
    onDelete: function onDelete() {
      var _this2 = this;
      Dialog.confirm({
        title: t$o("confirmDelete")
      }).then(function() {
        _this2.$emit("delete", _this2.data);
      }).catch(function() {
        _this2.$emit("cancel-delete", _this2.data);
      });
    },
    getArea: function getArea2() {
      return this.$refs.area ? this.$refs.area.getValues() : [];
    },
    setAreaCode: function setAreaCode(code2) {
      this.data.areaCode = code2 || "";
      if (code2) {
        this.$nextTick(this.assignAreaValues);
      }
    },
    setAddressDetail: function setAddressDetail(value17) {
      this.data.addressDetail = value17;
    },
    onDetailBlur: function onDetailBlur() {
      var _this3 = this;
      setTimeout(function() {
        _this3.detailFocused = false;
      });
    },
    genSetDefaultCell: function genSetDefaultCell(h) {
      var _this4 = this;
      if (this.showSetDefault) {
        var slots4 = {
          "right-icon": function rightIcon() {
            return h(Switch, {
              "attrs": {
                "size": "24"
              },
              "on": {
                "change": function change(event) {
                  _this4.$emit("change-default", event);
                }
              },
              "model": {
                value: _this4.data.isDefault,
                callback: function callback2($$v) {
                  _this4.$set(_this4.data, "isDefault", $$v);
                }
              }
            });
          }
        };
        return h(Cell$1, {
          "directives": [{
            name: "show",
            value: !this.hideBottomFields
          }],
          "attrs": {
            "center": true,
            "title": t$o("defaultAddress")
          },
          "class": bem$1f("default"),
          "scopedSlots": slots4
        });
      }
      return h();
    }
  },
  render: function render15(h) {
    var _this5 = this;
    var data49 = this.data, errorInfo = this.errorInfo, disableArea = this.disableArea, hideBottomFields2 = this.hideBottomFields;
    var onFocus5 = function onFocus6(name) {
      return function() {
        return _this5.onFocus(name);
      };
    };
    return h("div", {
      "class": bem$1f()
    }, [h("div", {
      "class": bem$1f("fields")
    }, [h(Field, {
      "attrs": {
        "clearable": true,
        "label": t$o("name"),
        "placeholder": t$o("namePlaceholder"),
        "errorMessage": errorInfo.name
      },
      "on": {
        "focus": onFocus5("name")
      },
      "model": {
        value: data49.name,
        callback: function callback2($$v) {
          _this5.$set(data49, "name", $$v);
        }
      }
    }), h(Field, {
      "attrs": {
        "clearable": true,
        "type": "tel",
        "label": t$o("tel"),
        "maxlength": this.telMaxlength,
        "placeholder": t$o("telPlaceholder"),
        "errorMessage": errorInfo.tel
      },
      "on": {
        "focus": onFocus5("tel")
      },
      "model": {
        value: data49.tel,
        callback: function callback2($$v) {
          _this5.$set(data49, "tel", $$v);
        }
      }
    }), h(Field, {
      "directives": [{
        name: "show",
        value: this.showArea
      }],
      "attrs": {
        "readonly": true,
        "clickable": !disableArea,
        "label": t$o("area"),
        "placeholder": this.areaPlaceholder || t$o("areaPlaceholder"),
        "errorMessage": errorInfo.areaCode,
        "rightIcon": !disableArea ? "arrow" : null,
        "value": this.areaText
      },
      "on": {
        "focus": onFocus5("areaCode"),
        "click": function click() {
          _this5.$emit("click-area");
          _this5.showAreaPopup = !disableArea;
        }
      }
    }), h(Detail, {
      "directives": [{
        name: "show",
        value: this.showDetail
      }],
      "attrs": {
        "focused": this.detailFocused,
        "value": data49.addressDetail,
        "errorMessage": errorInfo.addressDetail,
        "detailRows": this.detailRows,
        "detailMaxlength": this.detailMaxlength,
        "searchResult": this.searchResult,
        "showSearchResult": this.showSearchResult
      },
      "on": {
        "focus": onFocus5("addressDetail"),
        "blur": this.onDetailBlur,
        "input": this.onChangeDetail,
        "select-search": function selectSearch(event) {
          _this5.$emit("select-search", event);
        }
      }
    }), this.showPostal && h(Field, {
      "directives": [{
        name: "show",
        value: !hideBottomFields2
      }],
      "attrs": {
        "type": "tel",
        "maxlength": "6",
        "label": t$o("postal"),
        "placeholder": t$o("postal"),
        "errorMessage": errorInfo.postalCode
      },
      "on": {
        "focus": onFocus5("postalCode")
      },
      "model": {
        value: data49.postalCode,
        callback: function callback2($$v) {
          _this5.$set(data49, "postalCode", $$v);
        }
      }
    }), this.slots()]), this.genSetDefaultCell(h), h("div", {
      "directives": [{
        name: "show",
        value: !hideBottomFields2
      }],
      "class": bem$1f("buttons")
    }, [h(Button$1, {
      "attrs": {
        "block": true,
        "round": true,
        "loading": this.isSaving,
        "type": "danger",
        "text": this.saveButtonText || t$o("save")
      },
      "on": {
        "click": this.onSave
      }
    }), this.showDelete && h(Button$1, {
      "attrs": {
        "block": true,
        "round": true,
        "loading": this.isDeleting,
        "text": this.deleteButtonText || t$o("delete")
      },
      "on": {
        "click": this.onDelete
      }
    })]), h(Popup, {
      "attrs": {
        "round": true,
        "position": "bottom",
        "lazyRender": false,
        "getContainer": "body"
      },
      "model": {
        value: _this5.showAreaPopup,
        callback: function callback2($$v) {
          _this5.showAreaPopup = $$v;
        }
      }
    }, [h(Area, {
      "ref": "area",
      "attrs": {
        "value": data49.areaCode,
        "loading": !this.areaListLoaded,
        "areaList": this.areaList,
        "columnsPlaceholder": this.areaColumnsPlaceholder
      },
      "on": {
        "confirm": this.onAreaConfirm,
        "cancel": function cancel2() {
          _this5.showAreaPopup = false;
        }
      }
    })])]);
  }
});
var _createNamespace$1j = createNamespace$1("radio-group"), createComponent$1n = _createNamespace$1j[0], bem$1e = _createNamespace$1j[1];
var RadioGroup = createComponent$1n({
  mixins: [ParentMixin("vanRadio"), FieldMixin],
  props: {
    value: null,
    disabled: Boolean,
    direction: String,
    checkedColor: String,
    iconSize: [Number, String]
  },
  watch: {
    value: function value4(_value) {
      this.$emit("change", _value);
    }
  },
  render: function render16() {
    var h = arguments[0];
    return h("div", {
      "class": bem$1e([this.direction]),
      "attrs": {
        "role": "radiogroup"
      }
    }, [this.slots()]);
  }
});
var _createNamespace$1i = createNamespace$1("tag"), createComponent$1m = _createNamespace$1i[0], bem$1d = _createNamespace$1i[1];
function Tag(h, props2, slots4, ctx) {
  var _style;
  var type2 = props2.type, mark2 = props2.mark, plain = props2.plain, color = props2.color, round2 = props2.round, size2 = props2.size, textColor = props2.textColor;
  var key = plain ? "color" : "backgroundColor";
  var style12 = (_style = {}, _style[key] = color, _style);
  if (plain) {
    style12.color = textColor || color;
    style12.borderColor = color;
  } else {
    style12.color = textColor;
    style12.background = color;
  }
  var classes = {
    mark: mark2,
    plain,
    round: round2
  };
  if (size2) {
    classes[size2] = size2;
  }
  var CloseIcon = props2.closeable && h(Icon$1, {
    "attrs": {
      "name": "cross"
    },
    "class": bem$1d("close"),
    "on": {
      "click": function click(event) {
        event.stopPropagation();
        emit(ctx, "close");
      }
    }
  });
  return h("transition", {
    "attrs": {
      "name": props2.closeable ? "van-fade" : null
    }
  }, [h("span", helper([{
    "key": "content",
    "style": style12,
    "class": bem$1d([classes, type2])
  }, inherit(ctx, true)]), [slots4.default == null ? void 0 : slots4.default(), CloseIcon])]);
}
Tag.props = {
  size: String,
  mark: Boolean,
  color: String,
  plain: Boolean,
  round: Boolean,
  textColor: String,
  closeable: Boolean,
  type: {
    type: String,
    default: "default"
  }
};
var Tag$1 = createComponent$1m(Tag);
var CheckboxMixin = function CheckboxMixin2(_ref) {
  var parent = _ref.parent, bem2 = _ref.bem, role = _ref.role;
  return {
    mixins: [ChildrenMixin(parent), FieldMixin],
    props: {
      name: null,
      value: null,
      disabled: Boolean,
      iconSize: [Number, String],
      checkedColor: String,
      labelPosition: String,
      labelDisabled: Boolean,
      shape: {
        type: String,
        default: "round"
      },
      bindGroup: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      disableBindRelation: function disableBindRelation() {
        return !this.bindGroup;
      },
      isDisabled: function isDisabled() {
        return this.parent && this.parent.disabled || this.disabled;
      },
      direction: function direction() {
        return this.parent && this.parent.direction || null;
      },
      iconStyle: function iconStyle() {
        var checkedColor = this.checkedColor || this.parent && this.parent.checkedColor;
        if (checkedColor && this.checked && !this.isDisabled) {
          return {
            borderColor: checkedColor,
            backgroundColor: checkedColor
          };
        }
      },
      tabindex: function tabindex() {
        if (this.isDisabled || role === "radio" && !this.checked) {
          return -1;
        }
        return 0;
      }
    },
    methods: {
      onClick: function onClick19(event) {
        var _this = this;
        var target2 = event.target;
        var icon = this.$refs.icon;
        var iconClicked = icon === target2 || (icon == null ? void 0 : icon.contains(target2));
        if (!this.isDisabled && (iconClicked || !this.labelDisabled)) {
          this.toggle();
          setTimeout(function() {
            _this.$emit("click", event);
          });
        } else {
          this.$emit("click", event);
        }
      },
      genIcon: function genIcon5() {
        var h = this.$createElement;
        var checked3 = this.checked;
        var iconSize = this.iconSize || this.parent && this.parent.iconSize;
        return h("div", {
          "ref": "icon",
          "class": bem2("icon", [this.shape, {
            disabled: this.isDisabled,
            checked: checked3
          }]),
          "style": {
            fontSize: addUnit(iconSize)
          }
        }, [this.slots("icon", {
          checked: checked3
        }) || h(Icon$1, {
          "attrs": {
            "name": "success"
          },
          "style": this.iconStyle
        })]);
      },
      genLabel: function genLabel2() {
        var h = this.$createElement;
        var slot = this.slots();
        if (slot) {
          return h("span", {
            "class": bem2("label", [this.labelPosition, {
              disabled: this.isDisabled
            }])
          }, [slot]);
        }
      }
    },
    render: function render86() {
      var h = arguments[0];
      var Children = [this.genIcon()];
      if (this.labelPosition === "left") {
        Children.unshift(this.genLabel());
      } else {
        Children.push(this.genLabel());
      }
      return h("div", {
        "attrs": {
          "role": role,
          "tabindex": this.tabindex,
          "aria-checked": String(this.checked)
        },
        "class": bem2([{
          disabled: this.isDisabled,
          "label-disabled": this.labelDisabled
        }, this.direction]),
        "on": {
          "click": this.onClick
        }
      }, [Children]);
    }
  };
};
var _createNamespace$1h = createNamespace$1("radio"), createComponent$1l = _createNamespace$1h[0], bem$1c = _createNamespace$1h[1];
var Radio = createComponent$1l({
  mixins: [CheckboxMixin({
    bem: bem$1c,
    role: "radio",
    parent: "vanRadio"
  })],
  computed: {
    currentValue: {
      get: function get4() {
        return this.parent ? this.parent.value : this.value;
      },
      set: function set2(val) {
        (this.parent || this).$emit("input", val);
      }
    },
    checked: function checked2() {
      return this.currentValue === this.name;
    }
  },
  methods: {
    toggle: function toggle() {
      this.currentValue = this.name;
    }
  }
});
var _createNamespace$1g = createNamespace$1("address-item"), createComponent$1k = _createNamespace$1g[0], bem$1b = _createNamespace$1g[1];
function AddressItem(h, props2, slots4, ctx) {
  var disabled = props2.disabled, switchable = props2.switchable;
  function onClick19() {
    if (switchable) {
      emit(ctx, "select");
    }
    emit(ctx, "click");
  }
  var genRightIcon2 = function genRightIcon3() {
    return h(Icon$1, {
      "attrs": {
        "name": "edit"
      },
      "class": bem$1b("edit"),
      "on": {
        "click": function click(event) {
          event.stopPropagation();
          emit(ctx, "edit");
          emit(ctx, "click");
        }
      }
    });
  };
  function genTag() {
    if (slots4.tag) {
      return slots4.tag(_extends$1({}, props2.data));
    }
    if (props2.data.isDefault && props2.defaultTagText) {
      return h(Tag$1, {
        "attrs": {
          "type": "danger",
          "round": true
        },
        "class": bem$1b("tag")
      }, [props2.defaultTagText]);
    }
  }
  function genContent6() {
    var data49 = props2.data;
    var Info2 = [h("div", {
      "class": bem$1b("name")
    }, [data49.name + " " + data49.tel, genTag()]), h("div", {
      "class": bem$1b("address")
    }, [data49.address])];
    if (switchable && !disabled) {
      return h(Radio, {
        "attrs": {
          "name": data49.id,
          "iconSize": 18
        }
      }, [Info2]);
    }
    return Info2;
  }
  return h("div", {
    "class": bem$1b({
      disabled
    }),
    "on": {
      "click": onClick19
    }
  }, [h(Cell$1, helper([{
    "attrs": {
      "border": false,
      "valueClass": bem$1b("value")
    },
    "scopedSlots": {
      default: genContent6,
      "right-icon": genRightIcon2
    }
  }, inherit(ctx)])), slots4.bottom == null ? void 0 : slots4.bottom(_extends$1({}, props2.data, {
    disabled
  }))]);
}
AddressItem.props = {
  data: Object,
  disabled: Boolean,
  switchable: Boolean,
  defaultTagText: String
};
var AddressItem$1 = createComponent$1k(AddressItem);
var _createNamespace$1f = createNamespace$1("address-list"), createComponent$1j = _createNamespace$1f[0], bem$1a = _createNamespace$1f[1], t$n = _createNamespace$1f[2];
function AddressList(h, props2, slots4, ctx) {
  function genList(list2, disabled) {
    if (!list2) {
      return;
    }
    return list2.map(function(item, index2) {
      return h(AddressItem$1, {
        "attrs": {
          "data": item,
          "disabled": disabled,
          "switchable": props2.switchable,
          "defaultTagText": props2.defaultTagText
        },
        "key": item.id,
        "scopedSlots": {
          bottom: slots4["item-bottom"],
          tag: slots4.tag
        },
        "on": {
          "select": function select5() {
            emit(ctx, disabled ? "select-disabled" : "select", item, index2);
            if (!disabled) {
              emit(ctx, "input", item.id);
            }
          },
          "edit": function edit() {
            emit(ctx, disabled ? "edit-disabled" : "edit", item, index2);
          },
          "click": function click() {
            emit(ctx, "click-item", item, index2);
          }
        }
      });
    });
  }
  var List2 = genList(props2.list);
  var DisabledList = genList(props2.disabledList, true);
  return h("div", helper([{
    "class": bem$1a()
  }, inherit(ctx)]), [slots4.top == null ? void 0 : slots4.top(), h(RadioGroup, {
    "attrs": {
      "value": props2.value
    }
  }, [List2]), props2.disabledText && h("div", {
    "class": bem$1a("disabled-text")
  }, [props2.disabledText]), DisabledList, slots4.default == null ? void 0 : slots4.default(), h("div", {
    "class": bem$1a("bottom")
  }, [h(Button$1, {
    "attrs": {
      "round": true,
      "block": true,
      "type": "danger",
      "text": props2.addButtonText || t$n("add")
    },
    "class": bem$1a("add"),
    "on": {
      "click": function click() {
        emit(ctx, "add");
      }
    }
  })])]);
}
AddressList.props = {
  list: Array,
  value: [Number, String],
  disabledList: Array,
  disabledText: String,
  addButtonText: String,
  defaultTagText: String,
  switchable: {
    type: Boolean,
    default: true
  }
};
var AddressList$1 = createComponent$1j(AddressList);
var _createNamespace$1e = createNamespace$1("badge"), createComponent$1i = _createNamespace$1e[0], bem$19 = _createNamespace$1e[1];
var Badge = createComponent$1i({
  props: {
    dot: Boolean,
    max: [Number, String],
    color: String,
    content: [Number, String],
    tag: {
      type: String,
      default: "div"
    }
  },
  methods: {
    hasContent: function hasContent() {
      return !!(this.$scopedSlots.content || isDef(this.content) && this.content !== "");
    },
    renderContent: function renderContent() {
      var dot = this.dot, max = this.max, content = this.content;
      if (!dot && this.hasContent()) {
        if (this.$scopedSlots.content) {
          return this.$scopedSlots.content();
        }
        if (isDef(max) && isNumeric(content) && +content > max) {
          return max + "+";
        }
        return content;
      }
    },
    renderBadge: function renderBadge() {
      var h = this.$createElement;
      if (this.hasContent() || this.dot) {
        return h("div", {
          "class": bem$19({
            dot: this.dot,
            fixed: !!this.$scopedSlots.default
          }),
          "style": {
            background: this.color
          }
        }, [this.renderContent()]);
      }
    }
  },
  render: function render17() {
    var h = arguments[0];
    if (this.$scopedSlots.default) {
      var tag = this.tag;
      return h(tag, {
        "class": bem$19("wrapper")
      }, [this.$scopedSlots.default(), this.renderBadge()]);
    }
    return this.renderBadge();
  }
});
var prev = Date.now();
function fallback(fn2) {
  var curr = Date.now();
  var ms = Math.max(0, 16 - (curr - prev));
  var id = setTimeout(fn2, ms);
  prev = curr + ms;
  return id;
}
var root = isServer$1 ? global : window;
var iRaf = root.requestAnimationFrame || fallback;
var iCancel = root.cancelAnimationFrame || root.clearTimeout;
function raf(fn2) {
  return iRaf.call(root, fn2);
}
function doubleRaf(fn2) {
  raf(function() {
    raf(fn2);
  });
}
function cancelRaf(id) {
  iCancel.call(root, id);
}
function isDate(val) {
  return Object.prototype.toString.call(val) === "[object Date]" && !isNaN$1(val.getTime());
}
var _createNamespace$1d = createNamespace$1("calendar"), createComponent$1h = _createNamespace$1d[0], bem$18 = _createNamespace$1d[1], t$m = _createNamespace$1d[2];
function formatMonthTitle(date) {
  return t$m("monthTitle", date.getFullYear(), date.getMonth() + 1);
}
function compareMonth(date1, date2) {
  var year1 = date1.getFullYear();
  var year2 = date2.getFullYear();
  var month1 = date1.getMonth();
  var month2 = date2.getMonth();
  if (year1 === year2) {
    return month1 === month2 ? 0 : month1 > month2 ? 1 : -1;
  }
  return year1 > year2 ? 1 : -1;
}
function compareDay(day1, day2) {
  var compareMonthResult = compareMonth(day1, day2);
  if (compareMonthResult === 0) {
    var date1 = day1.getDate();
    var date2 = day2.getDate();
    return date1 === date2 ? 0 : date1 > date2 ? 1 : -1;
  }
  return compareMonthResult;
}
function getDayByOffset(date, offset3) {
  date = new Date(date);
  date.setDate(date.getDate() + offset3);
  return date;
}
function getPrevDay(date) {
  return getDayByOffset(date, -1);
}
function getNextDay(date) {
  return getDayByOffset(date, 1);
}
function calcDateNum(date) {
  var day1 = date[0].getTime();
  var day2 = date[1].getTime();
  return (day2 - day1) / (1e3 * 60 * 60 * 24) + 1;
}
function copyDate(dates) {
  return new Date(dates);
}
function copyDates(dates) {
  if (Array.isArray(dates)) {
    return dates.map(function(date) {
      if (date === null) {
        return date;
      }
      return copyDate(date);
    });
  }
  return copyDate(dates);
}
function times(n, iteratee) {
  if (n < 0) {
    return [];
  }
  var index2 = -1;
  var result = Array(n);
  while (++index2 < n) {
    result[index2] = iteratee(index2);
  }
  return result;
}
function getTrueValue(value17) {
  if (!value17) {
    return 0;
  }
  while (isNaN$1(parseInt(value17, 10))) {
    if (value17.length > 1) {
      value17 = value17.slice(1);
    } else {
      return 0;
    }
  }
  return parseInt(value17, 10);
}
function getMonthEndDay(year, month) {
  return 32 - new Date(year, month - 1, 32).getDate();
}
var _createNamespace$1c = createNamespace$1("calendar-month"), createComponent$1g = _createNamespace$1c[0];
var Month = createComponent$1g({
  props: {
    date: Date,
    type: String,
    color: String,
    minDate: Date,
    maxDate: Date,
    showMark: Boolean,
    rowHeight: [Number, String],
    formatter: Function,
    lazyRender: Boolean,
    currentDate: [Date, Array],
    allowSameDay: Boolean,
    showSubtitle: Boolean,
    showMonthTitle: Boolean,
    firstDayOfWeek: Number
  },
  data: function data10() {
    return {
      visible: false
    };
  },
  computed: {
    title: function title() {
      return formatMonthTitle(this.date);
    },
    rowHeightWithUnit: function rowHeightWithUnit() {
      return addUnit(this.rowHeight);
    },
    offset: function offset() {
      var firstDayOfWeek = this.firstDayOfWeek;
      var realDay = this.date.getDay();
      if (!firstDayOfWeek) {
        return realDay;
      }
      return (realDay + 7 - this.firstDayOfWeek) % 7;
    },
    totalDay: function totalDay() {
      return getMonthEndDay(this.date.getFullYear(), this.date.getMonth() + 1);
    },
    shouldRender: function shouldRender() {
      return this.visible || !this.lazyRender;
    },
    placeholders: function placeholders() {
      var rows = [];
      var count6 = Math.ceil((this.totalDay + this.offset) / 7);
      for (var day = 1; day <= count6; day++) {
        rows.push({
          type: "placeholder"
        });
      }
      return rows;
    },
    days: function days() {
      var days2 = [];
      var year = this.date.getFullYear();
      var month = this.date.getMonth();
      for (var day = 1; day <= this.totalDay; day++) {
        var date = new Date(year, month, day);
        var type2 = this.getDayType(date);
        var config2 = {
          date,
          type: type2,
          text: day,
          bottomInfo: this.getBottomInfo(type2)
        };
        if (this.formatter) {
          config2 = this.formatter(config2);
        }
        days2.push(config2);
      }
      return days2;
    }
  },
  methods: {
    getHeight: function getHeight() {
      var _this$$el;
      return ((_this$$el = this.$el) == null ? void 0 : _this$$el.getBoundingClientRect().height) || 0;
    },
    scrollIntoView: function scrollIntoView(body) {
      var _this$$refs = this.$refs, days2 = _this$$refs.days, month = _this$$refs.month;
      var el = this.showSubtitle ? days2 : month;
      var scrollTop = el.getBoundingClientRect().top - body.getBoundingClientRect().top + body.scrollTop;
      setScrollTop(body, scrollTop);
    },
    getMultipleDayType: function getMultipleDayType(day) {
      var _this = this;
      var isSelected = function isSelected2(date) {
        return _this.currentDate.some(function(item) {
          return compareDay(item, date) === 0;
        });
      };
      if (isSelected(day)) {
        var prevDay = getPrevDay(day);
        var nextDay = getNextDay(day);
        var prevSelected = isSelected(prevDay);
        var nextSelected = isSelected(nextDay);
        if (prevSelected && nextSelected) {
          return "multiple-middle";
        }
        if (prevSelected) {
          return "end";
        }
        return nextSelected ? "start" : "multiple-selected";
      }
      return "";
    },
    getRangeDayType: function getRangeDayType(day) {
      var _this$currentDate = this.currentDate, startDay = _this$currentDate[0], endDay = _this$currentDate[1];
      if (!startDay) {
        return "";
      }
      var compareToStart = compareDay(day, startDay);
      if (!endDay) {
        return compareToStart === 0 ? "start" : "";
      }
      var compareToEnd = compareDay(day, endDay);
      if (compareToStart === 0 && compareToEnd === 0 && this.allowSameDay) {
        return "start-end";
      }
      if (compareToStart === 0) {
        return "start";
      }
      if (compareToEnd === 0) {
        return "end";
      }
      if (compareToStart > 0 && compareToEnd < 0) {
        return "middle";
      }
    },
    getDayType: function getDayType(day) {
      var type2 = this.type, minDate2 = this.minDate, maxDate2 = this.maxDate, currentDate = this.currentDate;
      if (compareDay(day, minDate2) < 0 || compareDay(day, maxDate2) > 0) {
        return "disabled";
      }
      if (currentDate === null) {
        return;
      }
      if (type2 === "single") {
        return compareDay(day, currentDate) === 0 ? "selected" : "";
      }
      if (type2 === "multiple") {
        return this.getMultipleDayType(day);
      }
      if (type2 === "range") {
        return this.getRangeDayType(day);
      }
    },
    getBottomInfo: function getBottomInfo(type2) {
      if (this.type === "range") {
        if (type2 === "start" || type2 === "end") {
          return t$m(type2);
        }
        if (type2 === "start-end") {
          return t$m("startEnd");
        }
      }
    },
    getDayStyle: function getDayStyle(type2, index2) {
      var style12 = {
        height: this.rowHeightWithUnit
      };
      if (type2 === "placeholder") {
        style12.width = "100%";
        return style12;
      }
      if (index2 === 0) {
        style12.marginLeft = 100 * this.offset / 7 + "%";
      }
      if (this.color) {
        if (type2 === "start" || type2 === "end" || type2 === "start-end" || type2 === "multiple-selected" || type2 === "multiple-middle") {
          style12.background = this.color;
        } else if (type2 === "middle") {
          style12.color = this.color;
        }
      }
      return style12;
    },
    genTitle: function genTitle2() {
      var h = this.$createElement;
      if (this.showMonthTitle) {
        return h("div", {
          "class": bem$18("month-title")
        }, [this.title]);
      }
    },
    genMark: function genMark() {
      var h = this.$createElement;
      if (this.showMark && this.shouldRender) {
        return h("div", {
          "class": bem$18("month-mark")
        }, [this.date.getMonth() + 1]);
      }
    },
    genDays: function genDays() {
      var h = this.$createElement;
      var days2 = this.shouldRender ? this.days : this.placeholders;
      return h("div", {
        "ref": "days",
        "attrs": {
          "role": "grid"
        },
        "class": bem$18("days")
      }, [this.genMark(), days2.map(this.genDay)]);
    },
    genTopInfo: function genTopInfo(item) {
      var h = this.$createElement;
      var slot = this.$scopedSlots["top-info"];
      if (item.topInfo || slot) {
        return h("div", {
          "class": bem$18("top-info")
        }, [slot ? slot(item) : item.topInfo]);
      }
    },
    genBottomInfo: function genBottomInfo(item) {
      var h = this.$createElement;
      var slot = this.$scopedSlots["bottom-info"];
      if (item.bottomInfo || slot) {
        return h("div", {
          "class": bem$18("bottom-info")
        }, [slot ? slot(item) : item.bottomInfo]);
      }
    },
    genDay: function genDay(item, index2) {
      var _this2 = this;
      var h = this.$createElement;
      var type2 = item.type;
      var style12 = this.getDayStyle(type2, index2);
      var disabled = type2 === "disabled";
      var onClick19 = function onClick20() {
        if (!disabled) {
          _this2.$emit("click", item);
        }
      };
      if (type2 === "selected") {
        return h("div", {
          "attrs": {
            "role": "gridcell",
            "tabindex": -1
          },
          "style": style12,
          "class": [bem$18("day"), item.className],
          "on": {
            "click": onClick19
          }
        }, [h("div", {
          "class": bem$18("selected-day"),
          "style": {
            width: this.rowHeightWithUnit,
            height: this.rowHeightWithUnit,
            background: this.color
          }
        }, [this.genTopInfo(item), item.text, this.genBottomInfo(item)])]);
      }
      return h("div", {
        "attrs": {
          "role": "gridcell",
          "tabindex": disabled ? null : -1
        },
        "style": style12,
        "class": [bem$18("day", type2), item.className],
        "on": {
          "click": onClick19
        }
      }, [this.genTopInfo(item), item.text, this.genBottomInfo(item)]);
    }
  },
  render: function render18() {
    var h = arguments[0];
    return h("div", {
      "class": bem$18("month"),
      "ref": "month"
    }, [this.genTitle(), this.genDays()]);
  }
});
var _createNamespace$1b = createNamespace$1("calendar-header"), createComponent$1f = _createNamespace$1b[0];
var Header = createComponent$1f({
  props: {
    title: String,
    subtitle: String,
    showTitle: Boolean,
    showSubtitle: Boolean,
    firstDayOfWeek: Number
  },
  methods: {
    genTitle: function genTitle3() {
      var h = this.$createElement;
      if (this.showTitle) {
        var title4 = this.slots("title") || this.title || t$m("title");
        return h("div", {
          "class": bem$18("header-title")
        }, [title4]);
      }
    },
    genSubtitle: function genSubtitle() {
      var h = this.$createElement;
      if (this.showSubtitle) {
        return h("div", {
          "class": bem$18("header-subtitle")
        }, [this.subtitle]);
      }
    },
    genWeekDays: function genWeekDays() {
      var h = this.$createElement;
      var weekdays = t$m("weekdays");
      var firstDayOfWeek = this.firstDayOfWeek;
      var renderWeekDays = [].concat(weekdays.slice(firstDayOfWeek, 7), weekdays.slice(0, firstDayOfWeek));
      return h("div", {
        "class": bem$18("weekdays")
      }, [renderWeekDays.map(function(item) {
        return h("span", {
          "class": bem$18("weekday")
        }, [item]);
      })]);
    }
  },
  render: function render19() {
    var h = arguments[0];
    return h("div", {
      "class": bem$18("header")
    }, [this.genTitle(), this.genSubtitle(), this.genWeekDays()]);
  }
});
var Calendar = createComponent$1h({
  props: {
    title: String,
    color: String,
    value: Boolean,
    readonly: Boolean,
    formatter: Function,
    rowHeight: [Number, String],
    confirmText: String,
    rangePrompt: String,
    defaultDate: [Date, Array],
    getContainer: [String, Function],
    allowSameDay: Boolean,
    confirmDisabledText: String,
    type: {
      type: String,
      default: "single"
    },
    round: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: "bottom"
    },
    poppable: {
      type: Boolean,
      default: true
    },
    maxRange: {
      type: [Number, String],
      default: null
    },
    lazyRender: {
      type: Boolean,
      default: true
    },
    showMark: {
      type: Boolean,
      default: true
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    showConfirm: {
      type: Boolean,
      default: true
    },
    showSubtitle: {
      type: Boolean,
      default: true
    },
    closeOnPopstate: {
      type: Boolean,
      default: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    },
    minDate: {
      type: Date,
      validator: isDate,
      default: function _default8() {
        return new Date();
      }
    },
    maxDate: {
      type: Date,
      validator: isDate,
      default: function _default9() {
        var now = new Date();
        return new Date(now.getFullYear(), now.getMonth() + 6, now.getDate());
      }
    },
    firstDayOfWeek: {
      type: [Number, String],
      default: 0,
      validator: function validator(val) {
        return val >= 0 && val <= 6;
      }
    }
  },
  inject: {
    vanPopup: {
      default: null
    }
  },
  data: function data11() {
    return {
      subtitle: "",
      currentDate: this.getInitialDate()
    };
  },
  computed: {
    months: function months() {
      var months2 = [];
      var cursor = new Date(this.minDate);
      cursor.setDate(1);
      do {
        months2.push(new Date(cursor));
        cursor.setMonth(cursor.getMonth() + 1);
      } while (compareMonth(cursor, this.maxDate) !== 1);
      return months2;
    },
    buttonDisabled: function buttonDisabled() {
      var type2 = this.type, currentDate = this.currentDate;
      if (currentDate) {
        if (type2 === "range") {
          return !currentDate[0] || !currentDate[1];
        }
        if (type2 === "multiple") {
          return !currentDate.length;
        }
      }
      return !currentDate;
    },
    dayOffset: function dayOffset() {
      return this.firstDayOfWeek ? this.firstDayOfWeek % 7 : 0;
    }
  },
  watch: {
    value: "init",
    type: function type() {
      this.reset();
    },
    defaultDate: function defaultDate(val) {
      this.currentDate = val;
      this.scrollIntoView();
    }
  },
  mounted: function mounted6() {
    var _this$vanPopup;
    this.init();
    (_this$vanPopup = this.vanPopup) == null ? void 0 : _this$vanPopup.$on("opened", this.onScroll);
  },
  activated: function activated() {
    this.init();
  },
  methods: {
    reset: function reset2(date) {
      if (date === void 0) {
        date = this.getInitialDate();
      }
      this.currentDate = date;
      this.scrollIntoView();
    },
    init: function init2() {
      var _this = this;
      if (this.poppable && !this.value) {
        return;
      }
      this.$nextTick(function() {
        _this.bodyHeight = Math.floor(_this.$refs.body.getBoundingClientRect().height);
        _this.onScroll();
        _this.scrollIntoView();
      });
    },
    scrollToDate: function scrollToDate(targetDate) {
      var _this2 = this;
      raf(function() {
        var displayed = _this2.value || !_this2.poppable;
        if (!targetDate || !displayed) {
          return;
        }
        _this2.months.some(function(month, index2) {
          if (compareMonth(month, targetDate) === 0) {
            var _this2$$refs = _this2.$refs, body = _this2$$refs.body, months2 = _this2$$refs.months;
            months2[index2].scrollIntoView(body);
            return true;
          }
          return false;
        });
        _this2.onScroll();
      });
    },
    scrollIntoView: function scrollIntoView2() {
      var currentDate = this.currentDate;
      if (currentDate) {
        var targetDate = this.type === "single" ? currentDate : currentDate[0];
        this.scrollToDate(targetDate);
      }
    },
    getInitialDate: function getInitialDate() {
      var type2 = this.type, minDate2 = this.minDate, maxDate2 = this.maxDate, defaultDate2 = this.defaultDate;
      if (defaultDate2 === null) {
        return defaultDate2;
      }
      var defaultVal = new Date();
      if (compareDay(defaultVal, minDate2) === -1) {
        defaultVal = minDate2;
      } else if (compareDay(defaultVal, maxDate2) === 1) {
        defaultVal = maxDate2;
      }
      if (type2 === "range") {
        var _ref = defaultDate2 || [], startDay = _ref[0], endDay = _ref[1];
        return [startDay || defaultVal, endDay || getNextDay(defaultVal)];
      }
      if (type2 === "multiple") {
        return defaultDate2 || [defaultVal];
      }
      return defaultDate2 || defaultVal;
    },
    onScroll: function onScroll() {
      var _this$$refs = this.$refs, body = _this$$refs.body, months2 = _this$$refs.months;
      var top2 = getScrollTop(body);
      var bottom2 = top2 + this.bodyHeight;
      var heights = months2.map(function(item) {
        return item.getHeight();
      });
      var heightSum = heights.reduce(function(a, b) {
        return a + b;
      }, 0);
      if (bottom2 > heightSum && top2 > 0) {
        return;
      }
      var height = 0;
      var currentMonth;
      var visibleRange = [-1, -1];
      for (var i = 0; i < months2.length; i++) {
        var visible = height <= bottom2 && height + heights[i] >= top2;
        if (visible) {
          visibleRange[1] = i;
          if (!currentMonth) {
            currentMonth = months2[i];
            visibleRange[0] = i;
          }
          if (!months2[i].showed) {
            months2[i].showed = true;
            this.$emit("month-show", {
              date: months2[i].date,
              title: months2[i].title
            });
          }
        }
        height += heights[i];
      }
      months2.forEach(function(month, index2) {
        month.visible = index2 >= visibleRange[0] - 1 && index2 <= visibleRange[1] + 1;
      });
      if (currentMonth) {
        this.subtitle = currentMonth.title;
      }
    },
    onClickDay: function onClickDay(item) {
      if (this.readonly) {
        return;
      }
      var date = item.date;
      var type2 = this.type, currentDate = this.currentDate;
      if (type2 === "range") {
        if (!currentDate) {
          this.select([date, null]);
          return;
        }
        var startDay = currentDate[0], endDay = currentDate[1];
        if (startDay && !endDay) {
          var compareToStart = compareDay(date, startDay);
          if (compareToStart === 1) {
            this.select([startDay, date], true);
          } else if (compareToStart === -1) {
            this.select([date, null]);
          } else if (this.allowSameDay) {
            this.select([date, date], true);
          }
        } else {
          this.select([date, null]);
        }
      } else if (type2 === "multiple") {
        if (!currentDate) {
          this.select([date]);
          return;
        }
        var selectedIndex;
        var selected = this.currentDate.some(function(dateItem, index2) {
          var equal2 = compareDay(dateItem, date) === 0;
          if (equal2) {
            selectedIndex = index2;
          }
          return equal2;
        });
        if (selected) {
          var _currentDate$splice = currentDate.splice(selectedIndex, 1), unselectedDate = _currentDate$splice[0];
          this.$emit("unselect", copyDate(unselectedDate));
        } else if (this.maxRange && currentDate.length >= this.maxRange) {
          Toast(this.rangePrompt || t$m("rangePrompt", this.maxRange));
        } else {
          this.select([].concat(currentDate, [date]));
        }
      } else {
        this.select(date, true);
      }
    },
    togglePopup: function togglePopup(val) {
      this.$emit("input", val);
    },
    select: function select(date, complete) {
      var _this3 = this;
      var emit3 = function emit4(date2) {
        _this3.currentDate = date2;
        _this3.$emit("select", copyDates(_this3.currentDate));
      };
      if (complete && this.type === "range") {
        var valid = this.checkRange(date);
        if (!valid) {
          if (this.showConfirm) {
            emit3([date[0], getDayByOffset(date[0], this.maxRange - 1)]);
          } else {
            emit3(date);
          }
          return;
        }
      }
      emit3(date);
      if (complete && !this.showConfirm) {
        this.onConfirm();
      }
    },
    checkRange: function checkRange(date) {
      var maxRange = this.maxRange, rangePrompt3 = this.rangePrompt;
      if (maxRange && calcDateNum(date) > maxRange) {
        Toast(rangePrompt3 || t$m("rangePrompt", maxRange));
        return false;
      }
      return true;
    },
    onConfirm: function onConfirm2() {
      this.$emit("confirm", copyDates(this.currentDate));
    },
    genMonth: function genMonth(date, index2) {
      var h = this.$createElement;
      var showMonthTitle = index2 !== 0 || !this.showSubtitle;
      return h(Month, {
        "ref": "months",
        "refInFor": true,
        "attrs": {
          "date": date,
          "type": this.type,
          "color": this.color,
          "minDate": this.minDate,
          "maxDate": this.maxDate,
          "showMark": this.showMark,
          "formatter": this.formatter,
          "rowHeight": this.rowHeight,
          "lazyRender": this.lazyRender,
          "currentDate": this.currentDate,
          "showSubtitle": this.showSubtitle,
          "allowSameDay": this.allowSameDay,
          "showMonthTitle": showMonthTitle,
          "firstDayOfWeek": this.dayOffset
        },
        "scopedSlots": {
          "top-info": this.$scopedSlots["top-info"],
          "bottom-info": this.$scopedSlots["bottom-info"]
        },
        "on": {
          "click": this.onClickDay
        }
      });
    },
    genFooterContent: function genFooterContent() {
      var h = this.$createElement;
      var slot = this.slots("footer");
      if (slot) {
        return slot;
      }
      if (this.showConfirm) {
        var text2 = this.buttonDisabled ? this.confirmDisabledText : this.confirmText;
        return h(Button$1, {
          "attrs": {
            "round": true,
            "block": true,
            "type": "danger",
            "color": this.color,
            "disabled": this.buttonDisabled,
            "nativeType": "button"
          },
          "class": bem$18("confirm"),
          "on": {
            "click": this.onConfirm
          }
        }, [text2 || t$m("confirm")]);
      }
    },
    genFooter: function genFooter() {
      var h = this.$createElement;
      return h("div", {
        "class": bem$18("footer", {
          unfit: !this.safeAreaInsetBottom
        })
      }, [this.genFooterContent()]);
    },
    genCalendar: function genCalendar() {
      var _this4 = this;
      var h = this.$createElement;
      return h("div", {
        "class": bem$18()
      }, [h(Header, {
        "attrs": {
          "title": this.title,
          "showTitle": this.showTitle,
          "subtitle": this.subtitle,
          "showSubtitle": this.showSubtitle,
          "firstDayOfWeek": this.dayOffset
        },
        "scopedSlots": {
          title: function title4() {
            return _this4.slots("title");
          }
        }
      }), h("div", {
        "ref": "body",
        "class": bem$18("body"),
        "on": {
          "scroll": this.onScroll
        }
      }, [this.months.map(this.genMonth)]), this.genFooter()]);
    }
  },
  render: function render20() {
    var _this5 = this;
    var h = arguments[0];
    if (this.poppable) {
      var _attrs;
      var createListener = function createListener2(name) {
        return function() {
          return _this5.$emit(name);
        };
      };
      return h(Popup, {
        "attrs": (_attrs = {
          "round": true,
          "value": this.value
        }, _attrs["round"] = this.round, _attrs["position"] = this.position, _attrs["closeable"] = this.showTitle || this.showSubtitle, _attrs["getContainer"] = this.getContainer, _attrs["closeOnPopstate"] = this.closeOnPopstate, _attrs["closeOnClickOverlay"] = this.closeOnClickOverlay, _attrs),
        "class": bem$18("popup"),
        "on": {
          "input": this.togglePopup,
          "open": createListener("open"),
          "opened": createListener("opened"),
          "close": createListener("close"),
          "closed": createListener("closed")
        }
      }, [this.genCalendar()]);
    }
    return this.genCalendar();
  }
});
var _createNamespace$1a = createNamespace$1("image"), createComponent$1e = _createNamespace$1a[0], bem$17 = _createNamespace$1a[1];
var Image = createComponent$1e({
  props: {
    src: String,
    fit: String,
    alt: String,
    round: Boolean,
    width: [Number, String],
    height: [Number, String],
    radius: [Number, String],
    lazyLoad: Boolean,
    iconPrefix: String,
    showError: {
      type: Boolean,
      default: true
    },
    showLoading: {
      type: Boolean,
      default: true
    },
    errorIcon: {
      type: String,
      default: "photo-fail"
    },
    loadingIcon: {
      type: String,
      default: "photo"
    }
  },
  data: function data12() {
    return {
      loading: true,
      error: false
    };
  },
  watch: {
    src: function src() {
      this.loading = true;
      this.error = false;
    }
  },
  computed: {
    style: function style3() {
      var style12 = {};
      if (isDef(this.width)) {
        style12.width = addUnit(this.width);
      }
      if (isDef(this.height)) {
        style12.height = addUnit(this.height);
      }
      if (isDef(this.radius)) {
        style12.overflow = "hidden";
        style12.borderRadius = addUnit(this.radius);
      }
      return style12;
    }
  },
  created: function created4() {
    var $Lazyload = this.$Lazyload;
    if ($Lazyload && inBrowser) {
      $Lazyload.$on("loaded", this.onLazyLoaded);
      $Lazyload.$on("error", this.onLazyLoadError);
    }
  },
  beforeDestroy: function beforeDestroy2() {
    var $Lazyload = this.$Lazyload;
    if ($Lazyload) {
      $Lazyload.$off("loaded", this.onLazyLoaded);
      $Lazyload.$off("error", this.onLazyLoadError);
    }
  },
  methods: {
    onLoad: function onLoad(event) {
      this.loading = false;
      this.$emit("load", event);
    },
    onLazyLoaded: function onLazyLoaded(_ref) {
      var el = _ref.el;
      if (el === this.$refs.image && this.loading) {
        this.onLoad();
      }
    },
    onLazyLoadError: function onLazyLoadError(_ref2) {
      var el = _ref2.el;
      if (el === this.$refs.image && !this.error) {
        this.onError();
      }
    },
    onError: function onError(event) {
      this.error = true;
      this.loading = false;
      this.$emit("error", event);
    },
    onClick: function onClick5(event) {
      this.$emit("click", event);
    },
    genPlaceholder: function genPlaceholder() {
      var h = this.$createElement;
      if (this.loading && this.showLoading) {
        return h("div", {
          "class": bem$17("loading")
        }, [this.slots("loading") || h(Icon$1, {
          "attrs": {
            "name": this.loadingIcon,
            "classPrefix": this.iconPrefix
          },
          "class": bem$17("loading-icon")
        })]);
      }
      if (this.error && this.showError) {
        return h("div", {
          "class": bem$17("error")
        }, [this.slots("error") || h(Icon$1, {
          "attrs": {
            "name": this.errorIcon,
            "classPrefix": this.iconPrefix
          },
          "class": bem$17("error-icon")
        })]);
      }
    },
    genImage: function genImage() {
      var h = this.$createElement;
      var imgData = {
        class: bem$17("img"),
        attrs: {
          alt: this.alt
        },
        style: {
          objectFit: this.fit
        }
      };
      if (this.error) {
        return;
      }
      if (this.lazyLoad) {
        return h("img", helper([{
          "ref": "image",
          "directives": [{
            name: "lazy",
            value: this.src
          }]
        }, imgData]));
      }
      return h("img", helper([{
        "attrs": {
          "src": this.src
        },
        "on": {
          "load": this.onLoad,
          "error": this.onError
        }
      }, imgData]));
    }
  },
  render: function render21() {
    var h = arguments[0];
    return h("div", {
      "class": bem$17({
        round: this.round
      }),
      "style": this.style,
      "on": {
        "click": this.onClick
      }
    }, [this.genImage(), this.genPlaceholder(), this.slots()]);
  }
});
var _createNamespace$19 = createNamespace$1("card"), createComponent$1d = _createNamespace$19[0], bem$16 = _createNamespace$19[1];
function Card(h, props2, slots4, ctx) {
  var _slots$priceTop;
  var thumb = props2.thumb;
  var showNum = slots4.num || isDef(props2.num);
  var showPrice = slots4.price || isDef(props2.price);
  var showOriginPrice = slots4["origin-price"] || isDef(props2.originPrice);
  var showBottom = showNum || showPrice || showOriginPrice || slots4.bottom;
  function onThumbClick(event) {
    emit(ctx, "click-thumb", event);
  }
  function ThumbTag() {
    if (slots4.tag || props2.tag) {
      return h("div", {
        "class": bem$16("tag")
      }, [slots4.tag ? slots4.tag() : h(Tag$1, {
        "attrs": {
          "mark": true,
          "type": "danger"
        }
      }, [props2.tag])]);
    }
  }
  function Thumb() {
    if (slots4.thumb || thumb) {
      return h("a", {
        "attrs": {
          "href": props2.thumbLink
        },
        "class": bem$16("thumb"),
        "on": {
          "click": onThumbClick
        }
      }, [slots4.thumb ? slots4.thumb() : h(Image, {
        "attrs": {
          "src": thumb,
          "width": "100%",
          "height": "100%",
          "fit": "cover",
          "lazy-load": props2.lazyLoad
        }
      }), ThumbTag()]);
    }
  }
  function Title2() {
    if (slots4.title) {
      return slots4.title();
    }
    if (props2.title) {
      return h("div", {
        "class": [bem$16("title"), "van-multi-ellipsis--l2"]
      }, [props2.title]);
    }
  }
  function Desc() {
    if (slots4.desc) {
      return slots4.desc();
    }
    if (props2.desc) {
      return h("div", {
        "class": [bem$16("desc"), "van-ellipsis"]
      }, [props2.desc]);
    }
  }
  function PriceContent() {
    var priceArr = props2.price.toString().split(".");
    return h("div", [h("span", {
      "class": bem$16("price-currency")
    }, [props2.currency]), h("span", {
      "class": bem$16("price-integer")
    }, [priceArr[0]]), ".", h("span", {
      "class": bem$16("price-decimal")
    }, [priceArr[1]])]);
  }
  function Price() {
    if (showPrice) {
      return h("div", {
        "class": bem$16("price")
      }, [slots4.price ? slots4.price() : PriceContent()]);
    }
  }
  function OriginPrice() {
    if (showOriginPrice) {
      var slot = slots4["origin-price"];
      return h("div", {
        "class": bem$16("origin-price")
      }, [slot ? slot() : props2.currency + " " + props2.originPrice]);
    }
  }
  function Num() {
    if (showNum) {
      return h("div", {
        "class": bem$16("num")
      }, [slots4.num ? slots4.num() : "x" + props2.num]);
    }
  }
  function Footer() {
    if (slots4.footer) {
      return h("div", {
        "class": bem$16("footer")
      }, [slots4.footer()]);
    }
  }
  return h("div", helper([{
    "class": bem$16()
  }, inherit(ctx, true)]), [h("div", {
    "class": bem$16("header")
  }, [Thumb(), h("div", {
    "class": bem$16("content", {
      centered: props2.centered
    })
  }, [h("div", [Title2(), Desc(), slots4.tags == null ? void 0 : slots4.tags()]), showBottom && h("div", {
    "class": "van-card__bottom"
  }, [(_slots$priceTop = slots4["price-top"]) == null ? void 0 : _slots$priceTop.call(slots4), Price(), OriginPrice(), Num(), slots4.bottom == null ? void 0 : slots4.bottom()])])]), Footer()]);
}
Card.props = {
  tag: String,
  desc: String,
  thumb: String,
  title: String,
  centered: Boolean,
  lazyLoad: Boolean,
  thumbLink: String,
  num: [Number, String],
  price: [Number, String],
  originPrice: [Number, String],
  currency: {
    type: String,
    default: "\xA5"
  }
};
var Card$1 = createComponent$1d(Card);
var _createNamespace$18 = createNamespace$1("tab"), createComponent$1c = _createNamespace$18[0], bem$15 = _createNamespace$18[1];
var Tab = createComponent$1c({
  mixins: [ChildrenMixin("vanTabs")],
  props: _extends$1({}, routeProps, {
    dot: Boolean,
    name: [Number, String],
    info: [Number, String],
    badge: [Number, String],
    title: String,
    titleStyle: null,
    titleClass: null,
    disabled: Boolean
  }),
  data: function data13() {
    return {
      inited: false
    };
  },
  computed: {
    computedName: function computedName() {
      var _this$name;
      return (_this$name = this.name) != null ? _this$name : this.index;
    },
    isActive: function isActive() {
      var active4 = this.computedName === this.parent.currentName;
      if (active4) {
        this.inited = true;
      }
      return active4;
    }
  },
  watch: {
    title: function title2() {
      this.parent.setLine();
      this.parent.scrollIntoView();
    },
    inited: function inited(val) {
      var _this = this;
      if (this.parent.lazyRender && val) {
        this.$nextTick(function() {
          _this.parent.$emit("rendered", _this.computedName, _this.title);
        });
      }
    }
  },
  render: function render22(h) {
    var slots4 = this.slots, parent = this.parent, isActive2 = this.isActive;
    var slotContent = slots4();
    if (!slotContent && !parent.animated) {
      return;
    }
    var show5 = parent.scrollspy || isActive2;
    var shouldRender3 = this.inited || parent.scrollspy || !parent.lazyRender;
    var Content2 = shouldRender3 ? slotContent : h();
    if (parent.animated) {
      return h("div", {
        "attrs": {
          "role": "tabpanel",
          "aria-hidden": !isActive2
        },
        "class": bem$15("pane-wrapper", {
          inactive: !isActive2
        })
      }, [h("div", {
        "class": bem$15("pane")
      }, [Content2])]);
    }
    return h("div", {
      "directives": [{
        name: "show",
        value: show5
      }],
      "attrs": {
        "role": "tabpanel"
      },
      "class": bem$15("pane")
    }, [Content2]);
  }
});
function scrollLeftTo(scroller2, to, duration) {
  var count6 = 0;
  var from = scroller2.scrollLeft;
  var frames = duration === 0 ? 1 : Math.round(duration * 1e3 / 16);
  function animate2() {
    scroller2.scrollLeft += (to - from) / frames;
    if (++count6 < frames) {
      raf(animate2);
    }
  }
  animate2();
}
function scrollTopTo(scroller2, to, duration, callback2) {
  var current = getScrollTop(scroller2);
  var isDown = current < to;
  var frames = duration === 0 ? 1 : Math.round(duration * 1e3 / 16);
  var step = (to - current) / frames;
  function animate2() {
    current += step;
    if (isDown && current > to || !isDown && current < to) {
      current = to;
    }
    setScrollTop(scroller2, current);
    if (isDown && current < to || !isDown && current > to) {
      raf(animate2);
    } else if (callback2) {
      raf(callback2);
    }
  }
  animate2();
}
function isHidden(el) {
  var style12 = window.getComputedStyle(el);
  var hidden = style12.display === "none";
  var parentHidden = el.offsetParent === null && style12.position !== "fixed";
  return hidden || parentHidden;
}
function callInterceptor(options) {
  var interceptor = options.interceptor, args = options.args, done = options.done;
  if (interceptor) {
    var returnVal = interceptor.apply(void 0, args);
    if (isPromise(returnVal)) {
      returnVal.then(function(value17) {
        if (value17) {
          done();
        }
      }).catch(noop);
    } else if (returnVal) {
      done();
    }
  } else {
    done();
  }
}
var _createNamespace$17 = createNamespace$1("tab"), createComponent$1b = _createNamespace$17[0], bem$14 = _createNamespace$17[1];
var Title = createComponent$1b({
  props: {
    dot: Boolean,
    type: String,
    info: [Number, String],
    color: String,
    title: String,
    isActive: Boolean,
    disabled: Boolean,
    scrollable: Boolean,
    activeColor: String,
    inactiveColor: String
  },
  computed: {
    style: function style4() {
      var style12 = {};
      var color = this.color, isActive2 = this.isActive;
      var isCard = this.type === "card";
      if (color && isCard) {
        style12.borderColor = color;
        if (!this.disabled) {
          if (isActive2) {
            style12.backgroundColor = color;
          } else {
            style12.color = color;
          }
        }
      }
      var titleColor = isActive2 ? this.activeColor : this.inactiveColor;
      if (titleColor) {
        style12.color = titleColor;
      }
      return style12;
    }
  },
  methods: {
    onClick: function onClick6() {
      this.$emit("click");
    },
    genText: function genText2() {
      var h = this.$createElement;
      var Text = h("span", {
        "class": bem$14("text", {
          ellipsis: !this.scrollable
        })
      }, [this.slots() || this.title]);
      if (this.dot || isDef(this.info) && this.info !== "") {
        return h("span", {
          "class": bem$14("text-wrapper")
        }, [Text, h(Info$1, {
          "attrs": {
            "dot": this.dot,
            "info": this.info
          }
        })]);
      }
      return Text;
    }
  },
  render: function render23() {
    var h = arguments[0];
    return h("div", {
      "attrs": {
        "role": "tab",
        "aria-selected": this.isActive
      },
      "class": [bem$14({
        active: this.isActive,
        disabled: this.disabled
      })],
      "style": this.style,
      "on": {
        "click": this.onClick
      }
    }, [this.genText()]);
  }
});
var _createNamespace$16 = createNamespace$1("sticky"), createComponent$1a = _createNamespace$16[0], bem$13 = _createNamespace$16[1];
var Sticky = createComponent$1a({
  mixins: [BindEventMixin(function(bind3, isBind) {
    if (!this.scroller) {
      this.scroller = getScroller(this.$el);
    }
    if (this.observer) {
      var method = isBind ? "observe" : "unobserve";
      this.observer[method](this.$el);
    }
    bind3(this.scroller, "scroll", this.onScroll, true);
    this.onScroll();
  })],
  props: {
    zIndex: [Number, String],
    container: null,
    offsetTop: {
      type: [Number, String],
      default: 0
    }
  },
  data: function data14() {
    return {
      fixed: false,
      height: 0,
      transform: 0
    };
  },
  computed: {
    offsetTopPx: function offsetTopPx() {
      return unitToPx(this.offsetTop);
    },
    style: function style5() {
      if (!this.fixed) {
        return;
      }
      var style12 = {};
      if (isDef(this.zIndex)) {
        style12.zIndex = this.zIndex;
      }
      if (this.offsetTopPx && this.fixed) {
        style12.top = this.offsetTopPx + "px";
      }
      if (this.transform) {
        style12.transform = "translate3d(0, " + this.transform + "px, 0)";
      }
      return style12;
    }
  },
  watch: {
    fixed: function fixed(isFixed) {
      this.$emit("change", isFixed);
    }
  },
  created: function created5() {
    var _this = this;
    if (!isServer$1 && window.IntersectionObserver) {
      this.observer = new IntersectionObserver(function(entries2) {
        if (entries2[0].intersectionRatio > 0) {
          _this.onScroll();
        }
      }, {
        root: document.body
      });
    }
  },
  methods: {
    onScroll: function onScroll2() {
      var _this2 = this;
      if (isHidden(this.$el)) {
        return;
      }
      this.height = this.$el.offsetHeight;
      var container = this.container, offsetTopPx3 = this.offsetTopPx;
      var scrollTop = getScrollTop(window);
      var topToPageTop = getElementTop$1(this.$el);
      var emitScrollEvent = function emitScrollEvent2() {
        _this2.$emit("scroll", {
          scrollTop,
          isFixed: _this2.fixed
        });
      };
      if (container) {
        var bottomToPageTop = topToPageTop + container.offsetHeight;
        if (scrollTop + offsetTopPx3 + this.height > bottomToPageTop) {
          var distanceToBottom = this.height + scrollTop - bottomToPageTop;
          if (distanceToBottom < this.height) {
            this.fixed = true;
            this.transform = -(distanceToBottom + offsetTopPx3);
          } else {
            this.fixed = false;
          }
          emitScrollEvent();
          return;
        }
      }
      if (scrollTop + offsetTopPx3 > topToPageTop) {
        this.fixed = true;
        this.transform = 0;
      } else {
        this.fixed = false;
      }
      emitScrollEvent();
    }
  },
  render: function render24() {
    var h = arguments[0];
    var fixed2 = this.fixed;
    var style12 = {
      height: fixed2 ? this.height + "px" : null
    };
    return h("div", {
      "style": style12
    }, [h("div", {
      "class": bem$13({
        fixed: fixed2
      }),
      "style": this.style
    }, [this.slots()])]);
  }
});
var _createNamespace$15 = createNamespace$1("tabs"), createComponent$19 = _createNamespace$15[0], bem$12 = _createNamespace$15[1];
var MIN_SWIPE_DISTANCE = 50;
var Content = createComponent$19({
  mixins: [TouchMixin],
  props: {
    count: Number,
    duration: [Number, String],
    animated: Boolean,
    swipeable: Boolean,
    currentIndex: Number
  },
  computed: {
    style: function style6() {
      if (this.animated) {
        return {
          transform: "translate3d(" + -1 * this.currentIndex * 100 + "%, 0, 0)",
          transitionDuration: this.duration + "s"
        };
      }
    },
    listeners: function listeners2() {
      if (this.swipeable) {
        return {
          touchstart: this.touchStart,
          touchmove: this.touchMove,
          touchend: this.onTouchEnd,
          touchcancel: this.onTouchEnd
        };
      }
    }
  },
  methods: {
    onTouchEnd: function onTouchEnd2() {
      var direction = this.direction, deltaX = this.deltaX, currentIndex2 = this.currentIndex;
      if (direction === "horizontal" && this.offsetX >= MIN_SWIPE_DISTANCE) {
        if (deltaX > 0 && currentIndex2 !== 0) {
          this.$emit("change", currentIndex2 - 1);
        } else if (deltaX < 0 && currentIndex2 !== this.count - 1) {
          this.$emit("change", currentIndex2 + 1);
        }
      }
    },
    genChildren: function genChildren2() {
      var h = this.$createElement;
      if (this.animated) {
        return h("div", {
          "class": bem$12("track"),
          "style": this.style
        }, [this.slots()]);
      }
      return this.slots();
    }
  },
  render: function render25() {
    var h = arguments[0];
    return h("div", {
      "class": bem$12("content", {
        animated: this.animated
      }),
      "on": _extends$1({}, this.listeners)
    }, [this.genChildren()]);
  }
});
var _createNamespace$14 = createNamespace$1("tabs"), createComponent$18 = _createNamespace$14[0], bem$11 = _createNamespace$14[1];
var Tabs = createComponent$18({
  mixins: [ParentMixin("vanTabs"), BindEventMixin(function(bind3) {
    if (!this.scroller) {
      this.scroller = getScroller(this.$el);
    }
    bind3(window, "resize", this.resize, true);
    if (this.scrollspy) {
      bind3(this.scroller, "scroll", this.onScroll, true);
    }
  })],
  inject: {
    vanPopup: {
      default: null
    }
  },
  model: {
    prop: "active"
  },
  props: {
    color: String,
    border: Boolean,
    sticky: Boolean,
    animated: Boolean,
    swipeable: Boolean,
    scrollspy: Boolean,
    background: String,
    lineWidth: [Number, String],
    lineHeight: [Number, String],
    beforeChange: Function,
    titleActiveColor: String,
    titleInactiveColor: String,
    type: {
      type: String,
      default: "line"
    },
    active: {
      type: [Number, String],
      default: 0
    },
    ellipsis: {
      type: Boolean,
      default: true
    },
    duration: {
      type: [Number, String],
      default: 0.3
    },
    offsetTop: {
      type: [Number, String],
      default: 0
    },
    lazyRender: {
      type: Boolean,
      default: true
    },
    swipeThreshold: {
      type: [Number, String],
      default: 5
    }
  },
  data: function data15() {
    return {
      position: "",
      currentIndex: null,
      lineStyle: {
        backgroundColor: this.color
      }
    };
  },
  computed: {
    scrollable: function scrollable() {
      return this.children.length > this.swipeThreshold || !this.ellipsis;
    },
    navStyle: function navStyle() {
      return {
        borderColor: this.color,
        background: this.background
      };
    },
    currentName: function currentName() {
      var activeTab = this.children[this.currentIndex];
      if (activeTab) {
        return activeTab.computedName;
      }
    },
    offsetTopPx: function offsetTopPx2() {
      return unitToPx(this.offsetTop);
    },
    scrollOffset: function scrollOffset() {
      if (this.sticky) {
        return this.offsetTopPx + this.tabHeight;
      }
      return 0;
    }
  },
  watch: {
    color: "setLine",
    active: function active(name) {
      if (name !== this.currentName) {
        this.setCurrentIndexByName(name);
      }
    },
    children: function children() {
      var _this = this;
      this.setCurrentIndexByName(this.active);
      this.setLine();
      this.$nextTick(function() {
        _this.scrollIntoView(true);
      });
    },
    currentIndex: function currentIndex() {
      this.scrollIntoView();
      this.setLine();
      if (this.stickyFixed && !this.scrollspy) {
        setRootScrollTop(Math.ceil(getElementTop$1(this.$el) - this.offsetTopPx));
      }
    },
    scrollspy: function scrollspy(val) {
      if (val) {
        on(this.scroller, "scroll", this.onScroll, true);
      } else {
        off(this.scroller, "scroll", this.onScroll);
      }
    }
  },
  mounted: function mounted7() {
    var _this2 = this;
    this.init();
    if (this.vanPopup) {
      this.vanPopup.onReopen(function() {
        _this2.setLine();
      });
    }
  },
  activated: function activated2() {
    this.init();
    this.setLine();
  },
  methods: {
    resize: function resize() {
      this.setLine();
    },
    init: function init3() {
      var _this3 = this;
      this.$nextTick(function() {
        _this3.inited = true;
        _this3.tabHeight = getVisibleHeight(_this3.$refs.wrap);
        _this3.scrollIntoView(true);
      });
    },
    setLine: function setLine() {
      var _this4 = this;
      var shouldAnimate = this.inited;
      this.$nextTick(function() {
        var titles = _this4.$refs.titles;
        if (!titles || !titles[_this4.currentIndex] || _this4.type !== "line" || isHidden(_this4.$el)) {
          return;
        }
        var title4 = titles[_this4.currentIndex].$el;
        var lineWidth = _this4.lineWidth, lineHeight = _this4.lineHeight;
        var left2 = title4.offsetLeft + title4.offsetWidth / 2;
        var lineStyle2 = {
          width: addUnit(lineWidth),
          backgroundColor: _this4.color,
          transform: "translateX(" + left2 + "px) translateX(-50%)"
        };
        if (shouldAnimate) {
          lineStyle2.transitionDuration = _this4.duration + "s";
        }
        if (isDef(lineHeight)) {
          var height = addUnit(lineHeight);
          lineStyle2.height = height;
          lineStyle2.borderRadius = height;
        }
        _this4.lineStyle = lineStyle2;
      });
    },
    setCurrentIndexByName: function setCurrentIndexByName(name) {
      var matched = this.children.filter(function(tab) {
        return tab.computedName === name;
      });
      var defaultIndex2 = (this.children[0] || {}).index || 0;
      this.setCurrentIndex(matched.length ? matched[0].index : defaultIndex2);
    },
    setCurrentIndex: function setCurrentIndex(currentIndex2) {
      var newIndex = this.findAvailableTab(currentIndex2);
      if (!isDef(newIndex)) {
        return;
      }
      var newTab = this.children[newIndex];
      var newName = newTab.computedName;
      var shouldEmitChange = this.currentIndex !== null;
      this.currentIndex = newIndex;
      if (newName !== this.active) {
        this.$emit("input", newName);
        if (shouldEmitChange) {
          this.$emit("change", newName, newTab.title);
        }
      }
    },
    findAvailableTab: function findAvailableTab(index2) {
      var diff = index2 < this.currentIndex ? -1 : 1;
      while (index2 >= 0 && index2 < this.children.length) {
        if (!this.children[index2].disabled) {
          return index2;
        }
        index2 += diff;
      }
    },
    onClick: function onClick7(item, index2) {
      var _this5 = this;
      var _this$children$index = this.children[index2], title4 = _this$children$index.title, disabled = _this$children$index.disabled, computedName2 = _this$children$index.computedName;
      if (disabled) {
        this.$emit("disabled", computedName2, title4);
      } else {
        callInterceptor({
          interceptor: this.beforeChange,
          args: [computedName2],
          done: function done() {
            _this5.setCurrentIndex(index2);
            _this5.scrollToCurrentContent();
          }
        });
        this.$emit("click", computedName2, title4);
        route(item.$router, item);
      }
    },
    scrollIntoView: function scrollIntoView3(immediate) {
      var titles = this.$refs.titles;
      if (!this.scrollable || !titles || !titles[this.currentIndex]) {
        return;
      }
      var nav = this.$refs.nav;
      var title4 = titles[this.currentIndex].$el;
      var to = title4.offsetLeft - (nav.offsetWidth - title4.offsetWidth) / 2;
      scrollLeftTo(nav, to, immediate ? 0 : +this.duration);
    },
    onSticktScroll: function onSticktScroll(params) {
      this.stickyFixed = params.isFixed;
      this.$emit("scroll", params);
    },
    scrollTo: function scrollTo(name) {
      var _this6 = this;
      this.$nextTick(function() {
        _this6.setCurrentIndexByName(name);
        _this6.scrollToCurrentContent(true);
      });
    },
    scrollToCurrentContent: function scrollToCurrentContent(immediate) {
      var _this7 = this;
      if (immediate === void 0) {
        immediate = false;
      }
      if (this.scrollspy) {
        var target2 = this.children[this.currentIndex];
        var el = target2 == null ? void 0 : target2.$el;
        if (el) {
          var to = getElementTop$1(el, this.scroller) - this.scrollOffset;
          this.lockScroll = true;
          scrollTopTo(this.scroller, to, immediate ? 0 : +this.duration, function() {
            _this7.lockScroll = false;
          });
        }
      }
    },
    onScroll: function onScroll3() {
      if (this.scrollspy && !this.lockScroll) {
        var index2 = this.getCurrentIndexOnScroll();
        this.setCurrentIndex(index2);
      }
    },
    getCurrentIndexOnScroll: function getCurrentIndexOnScroll() {
      var children3 = this.children;
      for (var index2 = 0; index2 < children3.length; index2++) {
        var top2 = getVisibleTop(children3[index2].$el);
        if (top2 > this.scrollOffset) {
          return index2 === 0 ? 0 : index2 - 1;
        }
      }
      return children3.length - 1;
    }
  },
  render: function render26() {
    var _this8 = this, _ref;
    var h = arguments[0];
    var type2 = this.type, animated = this.animated, scrollable3 = this.scrollable;
    var Nav = this.children.map(function(item, index2) {
      var _item$badge;
      return h(Title, {
        "ref": "titles",
        "refInFor": true,
        "attrs": {
          "type": type2,
          "dot": item.dot,
          "info": (_item$badge = item.badge) != null ? _item$badge : item.info,
          "title": item.title,
          "color": _this8.color,
          "isActive": index2 === _this8.currentIndex,
          "disabled": item.disabled,
          "scrollable": scrollable3,
          "activeColor": _this8.titleActiveColor,
          "inactiveColor": _this8.titleInactiveColor
        },
        "style": item.titleStyle,
        "class": item.titleClass,
        "scopedSlots": {
          default: function _default31() {
            return item.slots("title");
          }
        },
        "on": {
          "click": function click() {
            _this8.onClick(item, index2);
          }
        }
      });
    });
    var Wrap = h("div", {
      "ref": "wrap",
      "class": [bem$11("wrap", {
        scrollable: scrollable3
      }), (_ref = {}, _ref[BORDER_TOP_BOTTOM] = type2 === "line" && this.border, _ref)]
    }, [h("div", {
      "ref": "nav",
      "attrs": {
        "role": "tablist"
      },
      "class": bem$11("nav", [type2, {
        complete: this.scrollable
      }]),
      "style": this.navStyle
    }, [this.slots("nav-left"), Nav, type2 === "line" && h("div", {
      "class": bem$11("line"),
      "style": this.lineStyle
    }), this.slots("nav-right")])]);
    return h("div", {
      "class": bem$11([type2])
    }, [this.sticky ? h(Sticky, {
      "attrs": {
        "container": this.$el,
        "offsetTop": this.offsetTop
      },
      "on": {
        "scroll": this.onSticktScroll
      }
    }, [Wrap]) : Wrap, h(Content, {
      "attrs": {
        "count": this.children.length,
        "animated": animated,
        "duration": this.duration,
        "swipeable": this.swipeable,
        "currentIndex": this.currentIndex
      },
      "on": {
        "change": this.setCurrentIndex
      }
    }, [this.slots()])]);
  }
});
var _createNamespace$13 = createNamespace$1("cascader"), createComponent$17 = _createNamespace$13[0], bem$10 = _createNamespace$13[1], t$l = _createNamespace$13[2];
var Cascader = createComponent$17({
  props: {
    title: String,
    value: [Number, String],
    fieldNames: Object,
    placeholder: String,
    activeColor: String,
    options: {
      type: Array,
      default: function _default10() {
        return [];
      }
    },
    closeable: {
      type: Boolean,
      default: true
    },
    showHeader: {
      type: Boolean,
      default: true
    }
  },
  data: function data16() {
    return {
      tabs: [],
      activeTab: 0
    };
  },
  computed: {
    textKey: function textKey() {
      var _this$fieldNames;
      return ((_this$fieldNames = this.fieldNames) == null ? void 0 : _this$fieldNames.text) || "text";
    },
    valueKey: function valueKey() {
      var _this$fieldNames2;
      return ((_this$fieldNames2 = this.fieldNames) == null ? void 0 : _this$fieldNames2.value) || "value";
    },
    childrenKey: function childrenKey() {
      var _this$fieldNames3;
      return ((_this$fieldNames3 = this.fieldNames) == null ? void 0 : _this$fieldNames3.children) || "children";
    }
  },
  watch: {
    options: {
      deep: true,
      handler: "updateTabs"
    },
    value: function value5(_value) {
      var _this = this;
      if (_value || _value === 0) {
        var values = this.tabs.map(function(tab) {
          var _tab$selectedOption;
          return (_tab$selectedOption = tab.selectedOption) == null ? void 0 : _tab$selectedOption[_this.valueKey];
        });
        if (values.indexOf(_value) !== -1) {
          return;
        }
      }
      this.updateTabs();
    }
  },
  created: function created6() {
    this.updateTabs();
  },
  methods: {
    getSelectedOptionsByValue: function getSelectedOptionsByValue(options, value17) {
      for (var i = 0; i < options.length; i++) {
        var option = options[i];
        if (option[this.valueKey] === value17) {
          return [option];
        }
        if (option[this.childrenKey]) {
          var selectedOptions = this.getSelectedOptionsByValue(option[this.childrenKey], value17);
          if (selectedOptions) {
            return [option].concat(selectedOptions);
          }
        }
      }
    },
    updateTabs: function updateTabs() {
      var _this2 = this;
      if (this.value || this.value === 0) {
        var selectedOptions = this.getSelectedOptionsByValue(this.options, this.value);
        if (selectedOptions) {
          var optionsCursor = this.options;
          this.tabs = selectedOptions.map(function(option) {
            var tab = {
              options: optionsCursor,
              selectedOption: option
            };
            var next3 = optionsCursor.filter(function(item) {
              return item[_this2.valueKey] === option[_this2.valueKey];
            });
            if (next3.length) {
              optionsCursor = next3[0][_this2.childrenKey];
            }
            return tab;
          });
          if (optionsCursor) {
            this.tabs.push({
              options: optionsCursor,
              selectedOption: null
            });
          }
          this.$nextTick(function() {
            _this2.activeTab = _this2.tabs.length - 1;
          });
          return;
        }
      }
      this.tabs = [{
        options: this.options,
        selectedOption: null
      }];
    },
    onSelect: function onSelect2(option, tabIndex) {
      var _this3 = this;
      this.tabs[tabIndex].selectedOption = option;
      if (this.tabs.length > tabIndex + 1) {
        this.tabs = this.tabs.slice(0, tabIndex + 1);
      }
      if (option[this.childrenKey]) {
        var nextTab = {
          options: option[this.childrenKey],
          selectedOption: null
        };
        if (this.tabs[tabIndex + 1]) {
          this.$set(this.tabs, tabIndex + 1, nextTab);
        } else {
          this.tabs.push(nextTab);
        }
        this.$nextTick(function() {
          _this3.activeTab++;
        });
      }
      var selectedOptions = this.tabs.map(function(tab) {
        return tab.selectedOption;
      }).filter(function(item) {
        return !!item;
      });
      var eventParams = {
        value: option[this.valueKey],
        tabIndex,
        selectedOptions
      };
      this.$emit("input", option[this.valueKey]);
      this.$emit("change", eventParams);
      if (!option[this.childrenKey]) {
        this.$emit("finish", eventParams);
      }
    },
    onClose: function onClose2() {
      this.$emit("close");
    },
    renderHeader: function renderHeader() {
      var h = this.$createElement;
      if (this.showHeader) {
        return h("div", {
          "class": bem$10("header")
        }, [h("h2", {
          "class": bem$10("title")
        }, [this.slots("title") || this.title]), this.closeable ? h(Icon$1, {
          "attrs": {
            "name": "cross"
          },
          "class": bem$10("close-icon"),
          "on": {
            "click": this.onClose
          }
        }) : null]);
      }
    },
    renderOptions: function renderOptions(options, selectedOption, tabIndex) {
      var _this4 = this;
      var h = this.$createElement;
      var renderOption = function renderOption2(option) {
        var isSelected = selectedOption && option[_this4.valueKey] === selectedOption[_this4.valueKey];
        var Text = _this4.slots("option", {
          option,
          selected: isSelected
        }) || h("span", [option[_this4.textKey]]);
        return h("li", {
          "class": bem$10("option", {
            selected: isSelected
          }),
          "style": {
            color: isSelected ? _this4.activeColor : null
          },
          "on": {
            "click": function click() {
              _this4.onSelect(option, tabIndex);
            }
          }
        }, [Text, isSelected ? h(Icon$1, {
          "attrs": {
            "name": "success"
          },
          "class": bem$10("selected-icon")
        }) : null]);
      };
      return h("ul", {
        "class": bem$10("options")
      }, [options.map(renderOption)]);
    },
    renderTab: function renderTab(item, tabIndex) {
      var h = this.$createElement;
      var options = item.options, selectedOption = item.selectedOption;
      var title4 = selectedOption ? selectedOption[this.textKey] : this.placeholder || t$l("select");
      return h(Tab, {
        "attrs": {
          "title": title4,
          "titleClass": bem$10("tab", {
            unselected: !selectedOption
          })
        }
      }, [this.renderOptions(options, selectedOption, tabIndex)]);
    },
    renderTabs: function renderTabs() {
      var _this5 = this;
      var h = this.$createElement;
      return h(Tabs, {
        "attrs": {
          "animated": true,
          "swipeable": true,
          "swipeThreshold": 0,
          "color": this.activeColor
        },
        "class": bem$10("tabs"),
        "model": {
          value: _this5.activeTab,
          callback: function callback2($$v) {
            _this5.activeTab = $$v;
          }
        }
      }, [this.tabs.map(this.renderTab)]);
    }
  },
  render: function render27() {
    var h = arguments[0];
    return h("div", {
      "class": bem$10()
    }, [this.renderHeader(), this.renderTabs()]);
  }
});
var _createNamespace$12 = createNamespace$1("cell-group"), createComponent$16 = _createNamespace$12[0], bem$$ = _createNamespace$12[1];
function CellGroup(h, props2, slots4, ctx) {
  var _ref;
  var Group = h("div", helper([{
    "class": [bem$$({
      inset: props2.inset
    }), (_ref = {}, _ref[BORDER_TOP_BOTTOM] = props2.border, _ref)]
  }, inherit(ctx, true)]), [slots4.default == null ? void 0 : slots4.default()]);
  if (props2.title || slots4.title) {
    return h("div", {
      "key": ctx.data.key
    }, [h("div", {
      "class": bem$$("title", {
        inset: props2.inset
      })
    }, [slots4.title ? slots4.title() : props2.title]), Group]);
  }
  return Group;
}
CellGroup.props = {
  title: String,
  inset: Boolean,
  border: {
    type: Boolean,
    default: true
  }
};
var CellGroup$1 = createComponent$16(CellGroup);
var _createNamespace$11 = createNamespace$1("checkbox"), createComponent$15 = _createNamespace$11[0], bem$_ = _createNamespace$11[1];
var Checkbox = createComponent$15({
  mixins: [CheckboxMixin({
    bem: bem$_,
    role: "checkbox",
    parent: "vanCheckbox"
  })],
  computed: {
    checked: {
      get: function get5() {
        if (this.parent) {
          return this.parent.value.indexOf(this.name) !== -1;
        }
        return this.value;
      },
      set: function set3(val) {
        if (this.parent) {
          this.setParentValue(val);
        } else {
          this.$emit("input", val);
        }
      }
    }
  },
  watch: {
    value: function value6(val) {
      this.$emit("change", val);
    }
  },
  methods: {
    toggle: function toggle2(checked3) {
      var _this = this;
      if (checked3 === void 0) {
        checked3 = !this.checked;
      }
      clearTimeout(this.toggleTask);
      this.toggleTask = setTimeout(function() {
        _this.checked = checked3;
      });
    },
    setParentValue: function setParentValue(val) {
      var parent = this.parent;
      var value17 = parent.value.slice();
      if (val) {
        if (parent.max && value17.length >= parent.max) {
          return;
        }
        if (value17.indexOf(this.name) === -1) {
          value17.push(this.name);
          parent.$emit("input", value17);
        }
      } else {
        var index2 = value17.indexOf(this.name);
        if (index2 !== -1) {
          value17.splice(index2, 1);
          parent.$emit("input", value17);
        }
      }
    }
  }
});
var _createNamespace$10 = createNamespace$1("checkbox-group"), createComponent$14 = _createNamespace$10[0], bem$Z = _createNamespace$10[1];
var CheckboxGroup = createComponent$14({
  mixins: [ParentMixin("vanCheckbox"), FieldMixin],
  props: {
    max: [Number, String],
    disabled: Boolean,
    direction: String,
    iconSize: [Number, String],
    checkedColor: String,
    value: {
      type: Array,
      default: function _default11() {
        return [];
      }
    }
  },
  watch: {
    value: function value7(val) {
      this.$emit("change", val);
    }
  },
  methods: {
    toggleAll: function toggleAll(options) {
      if (options === void 0) {
        options = {};
      }
      if (typeof options === "boolean") {
        options = {
          checked: options
        };
      }
      var _options = options, checked3 = _options.checked, skipDisabled = _options.skipDisabled;
      var children3 = this.children.filter(function(item) {
        if (item.disabled && skipDisabled) {
          return item.checked;
        }
        return checked3 != null ? checked3 : !item.checked;
      });
      var names = children3.map(function(item) {
        return item.name;
      });
      this.$emit("input", names);
    }
  },
  render: function render28() {
    var h = arguments[0];
    return h("div", {
      "class": bem$Z([this.direction])
    }, [this.slots()]);
  }
});
var _createNamespace$$ = createNamespace$1("circle"), createComponent$13 = _createNamespace$$[0], bem$Y = _createNamespace$$[1];
var PERIMETER = 3140;
var uid = 0;
function format$1(rate) {
  return Math.min(Math.max(rate, 0), 100);
}
function getPath(clockwise, viewBoxSize2) {
  var sweepFlag = clockwise ? 1 : 0;
  return "M " + viewBoxSize2 / 2 + " " + viewBoxSize2 / 2 + " m 0, -500 a 500, 500 0 1, " + sweepFlag + " 0, 1000 a 500, 500 0 1, " + sweepFlag + " 0, -1000";
}
var Circle = createComponent$13({
  props: {
    text: String,
    size: [Number, String],
    color: [String, Object],
    layerColor: String,
    strokeLinecap: String,
    value: {
      type: Number,
      default: 0
    },
    speed: {
      type: [Number, String],
      default: 0
    },
    fill: {
      type: String,
      default: "none"
    },
    rate: {
      type: [Number, String],
      default: 100
    },
    strokeWidth: {
      type: [Number, String],
      default: 40
    },
    clockwise: {
      type: Boolean,
      default: true
    }
  },
  beforeCreate: function beforeCreate2() {
    this.uid = "van-circle-gradient-" + uid++;
  },
  computed: {
    style: function style7() {
      var size2 = addUnit(this.size);
      return {
        width: size2,
        height: size2
      };
    },
    path: function path() {
      return getPath(this.clockwise, this.viewBoxSize);
    },
    viewBoxSize: function viewBoxSize() {
      return +this.strokeWidth + 1e3;
    },
    layerStyle: function layerStyle() {
      return {
        fill: "" + this.fill,
        stroke: "" + this.layerColor,
        strokeWidth: this.strokeWidth + "px"
      };
    },
    hoverStyle: function hoverStyle() {
      var offset3 = PERIMETER * this.value / 100;
      return {
        stroke: "" + (this.gradient ? "url(#" + this.uid + ")" : this.color),
        strokeWidth: +this.strokeWidth + 1 + "px",
        strokeLinecap: this.strokeLinecap,
        strokeDasharray: offset3 + "px " + PERIMETER + "px"
      };
    },
    gradient: function gradient() {
      return isObject(this.color);
    },
    LinearGradient: function LinearGradient() {
      var _this = this;
      var h = this.$createElement;
      if (!this.gradient) {
        return;
      }
      var Stops = Object.keys(this.color).sort(function(a, b) {
        return parseFloat(a) - parseFloat(b);
      }).map(function(key, index2) {
        return h("stop", {
          "key": index2,
          "attrs": {
            "offset": key,
            "stop-color": _this.color[key]
          }
        });
      });
      return h("defs", [h("linearGradient", {
        "attrs": {
          "id": this.uid,
          "x1": "100%",
          "y1": "0%",
          "x2": "0%",
          "y2": "0%"
        }
      }, [Stops])]);
    }
  },
  watch: {
    rate: {
      handler: function handler2(rate) {
        this.startTime = Date.now();
        this.startRate = this.value;
        this.endRate = format$1(rate);
        this.increase = this.endRate > this.startRate;
        this.duration = Math.abs((this.startRate - this.endRate) * 1e3 / this.speed);
        if (this.speed) {
          cancelRaf(this.rafId);
          this.rafId = raf(this.animate);
        } else {
          this.$emit("input", this.endRate);
        }
      },
      immediate: true
    }
  },
  methods: {
    animate: function animate() {
      var now = Date.now();
      var progress = Math.min((now - this.startTime) / this.duration, 1);
      var rate = progress * (this.endRate - this.startRate) + this.startRate;
      this.$emit("input", format$1(parseFloat(rate.toFixed(1))));
      if (this.increase ? rate < this.endRate : rate > this.endRate) {
        this.rafId = raf(this.animate);
      }
    }
  },
  render: function render29() {
    var h = arguments[0];
    return h("div", {
      "class": bem$Y(),
      "style": this.style
    }, [h("svg", {
      "attrs": {
        "viewBox": "0 0 " + this.viewBoxSize + " " + this.viewBoxSize
      }
    }, [this.LinearGradient, h("path", {
      "class": bem$Y("layer"),
      "style": this.layerStyle,
      "attrs": {
        "d": this.path
      }
    }), h("path", {
      "attrs": {
        "d": this.path
      },
      "class": bem$Y("hover"),
      "style": this.hoverStyle
    })]), this.slots() || this.text && h("div", {
      "class": bem$Y("text")
    }, [this.text])]);
  }
});
var _createNamespace$_ = createNamespace$1("col"), createComponent$12 = _createNamespace$_[0], bem$X = _createNamespace$_[1];
var Col = createComponent$12({
  mixins: [ChildrenMixin("vanRow")],
  props: {
    span: [Number, String],
    offset: [Number, String],
    tag: {
      type: String,
      default: "div"
    }
  },
  computed: {
    style: function style8() {
      var index2 = this.index;
      var _ref = this.parent || {}, spaces2 = _ref.spaces;
      if (spaces2 && spaces2[index2]) {
        var _spaces$index = spaces2[index2], left2 = _spaces$index.left, right2 = _spaces$index.right;
        return {
          paddingLeft: left2 ? left2 + "px" : null,
          paddingRight: right2 ? right2 + "px" : null
        };
      }
    }
  },
  methods: {
    onClick: function onClick8(event) {
      this.$emit("click", event);
    }
  },
  render: function render30() {
    var _bem2;
    var h = arguments[0];
    var span = this.span, offset3 = this.offset;
    return h(this.tag, {
      "style": this.style,
      "class": bem$X((_bem2 = {}, _bem2[span] = span, _bem2["offset-" + offset3] = offset3, _bem2)),
      "on": {
        "click": this.onClick
      }
    }, [this.slots()]);
  }
});
var _createNamespace$Z = createNamespace$1("collapse"), createComponent$11 = _createNamespace$Z[0], bem$W = _createNamespace$Z[1];
var Collapse = createComponent$11({
  mixins: [ParentMixin("vanCollapse")],
  props: {
    accordion: Boolean,
    value: [String, Number, Array],
    border: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    switch: function _switch(name, expanded3) {
      if (!this.accordion) {
        name = expanded3 ? this.value.concat(name) : this.value.filter(function(activeName) {
          return activeName !== name;
        });
      }
      this.$emit("change", name);
      this.$emit("input", name);
    }
  },
  render: function render31() {
    var _ref;
    var h = arguments[0];
    return h("div", {
      "class": [bem$W(), (_ref = {}, _ref[BORDER_TOP_BOTTOM] = this.border, _ref)]
    }, [this.slots()]);
  }
});
var _createNamespace$Y = createNamespace$1("collapse-item"), createComponent$10 = _createNamespace$Y[0], bem$V = _createNamespace$Y[1];
var CELL_SLOTS = ["title", "icon", "right-icon"];
var CollapseItem = createComponent$10({
  mixins: [ChildrenMixin("vanCollapse")],
  props: _extends$1({}, cellProps, {
    name: [Number, String],
    disabled: Boolean,
    lazyRender: {
      type: Boolean,
      default: true
    },
    isLink: {
      type: Boolean,
      default: true
    }
  }),
  data: function data17() {
    return {
      show: null,
      inited: null
    };
  },
  computed: {
    currentName: function currentName2() {
      var _this$name;
      return (_this$name = this.name) != null ? _this$name : this.index;
    },
    expanded: function expanded() {
      var _this = this;
      if (!this.parent) {
        return null;
      }
      var _this$parent = this.parent, value17 = _this$parent.value, accordion = _this$parent.accordion;
      return accordion ? value17 === this.currentName : value17.some(function(name) {
        return name === _this.currentName;
      });
    }
  },
  created: function created7() {
    this.show = this.expanded;
    this.inited = this.expanded;
  },
  watch: {
    expanded: function expanded2(_expanded, prev3) {
      var _this2 = this;
      if (prev3 === null) {
        return;
      }
      if (_expanded) {
        this.show = true;
        this.inited = true;
      }
      var nextTick2 = _expanded ? this.$nextTick : raf;
      nextTick2(function() {
        var _this2$$refs = _this2.$refs, content = _this2$$refs.content, wrapper = _this2$$refs.wrapper;
        if (!content || !wrapper) {
          return;
        }
        var offsetHeight = content.offsetHeight;
        if (offsetHeight) {
          var contentHeight = offsetHeight + "px";
          wrapper.style.height = _expanded ? 0 : contentHeight;
          doubleRaf(function() {
            wrapper.style.height = _expanded ? contentHeight : 0;
          });
        } else {
          _this2.onTransitionEnd();
        }
      });
    }
  },
  methods: {
    onClick: function onClick9() {
      if (!this.disabled) {
        this.toggle();
      }
    },
    toggle: function toggle3(expanded3) {
      if (expanded3 === void 0) {
        expanded3 = !this.expanded;
      }
      var parent = this.parent, currentName3 = this.currentName;
      var close2 = parent.accordion && currentName3 === parent.value;
      var name = close2 ? "" : currentName3;
      this.parent.switch(name, expanded3);
    },
    onTransitionEnd: function onTransitionEnd2() {
      if (!this.expanded) {
        this.show = false;
      } else {
        this.$refs.wrapper.style.height = "";
      }
    },
    genTitle: function genTitle4() {
      var _this3 = this;
      var h = this.$createElement;
      var border = this.border, disabled = this.disabled, expanded3 = this.expanded;
      var titleSlots = CELL_SLOTS.reduce(function(slots4, name) {
        if (_this3.slots(name)) {
          slots4[name] = function() {
            return _this3.slots(name);
          };
        }
        return slots4;
      }, {});
      if (this.slots("value")) {
        titleSlots.default = function() {
          return _this3.slots("value");
        };
      }
      return h(Cell$1, {
        "attrs": {
          "role": "button",
          "tabindex": disabled ? -1 : 0,
          "aria-expanded": String(expanded3)
        },
        "class": bem$V("title", {
          disabled,
          expanded: expanded3,
          borderless: !border
        }),
        "on": {
          "click": this.onClick
        },
        "scopedSlots": titleSlots,
        "props": _extends$1({}, this.$props)
      });
    },
    genContent: function genContent2() {
      var h = this.$createElement;
      if (this.inited || !this.lazyRender) {
        return h("div", {
          "directives": [{
            name: "show",
            value: this.show
          }],
          "ref": "wrapper",
          "class": bem$V("wrapper"),
          "on": {
            "transitionend": this.onTransitionEnd
          }
        }, [h("div", {
          "ref": "content",
          "class": bem$V("content")
        }, [this.slots()])]);
      }
    }
  },
  render: function render32() {
    var h = arguments[0];
    return h("div", {
      "class": [bem$V({
        border: this.index && this.border
      })]
    }, [this.genTitle(), this.genContent()]);
  }
});
var _createNamespace$X = createNamespace$1("contact-card"), createComponent$$ = _createNamespace$X[0], bem$U = _createNamespace$X[1], t$k = _createNamespace$X[2];
function ContactCard(h, props2, slots4, ctx) {
  var type2 = props2.type, editable = props2.editable;
  function onClick19(event) {
    if (editable) {
      emit(ctx, "click", event);
    }
  }
  function Content2() {
    if (type2 === "add") {
      return props2.addText || t$k("addText");
    }
    return [h("div", [t$k("name") + "\uFF1A" + props2.name]), h("div", [t$k("tel") + "\uFF1A" + props2.tel])];
  }
  return h(Cell$1, helper([{
    "attrs": {
      "center": true,
      "border": false,
      "isLink": editable,
      "valueClass": bem$U("value"),
      "icon": type2 === "edit" ? "contact" : "add-square"
    },
    "class": bem$U([type2]),
    "on": {
      "click": onClick19
    }
  }, inherit(ctx)]), [Content2()]);
}
ContactCard.props = {
  tel: String,
  name: String,
  addText: String,
  editable: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    default: "add"
  }
};
var ContactCard$1 = createComponent$$(ContactCard);
var _createNamespace$W = createNamespace$1("contact-edit"), createComponent$_ = _createNamespace$W[0], bem$T = _createNamespace$W[1], t$j = _createNamespace$W[2];
var defaultContact = {
  tel: "",
  name: ""
};
var ContactEdit = createComponent$_({
  props: {
    isEdit: Boolean,
    isSaving: Boolean,
    isDeleting: Boolean,
    showSetDefault: Boolean,
    setDefaultLabel: String,
    contactInfo: {
      type: Object,
      default: function _default12() {
        return _extends$1({}, defaultContact);
      }
    },
    telValidator: {
      type: Function,
      default: isMobile
    }
  },
  data: function data18() {
    return {
      data: _extends$1({}, defaultContact, this.contactInfo),
      errorInfo: {
        name: "",
        tel: ""
      }
    };
  },
  watch: {
    contactInfo: function contactInfo(val) {
      this.data = _extends$1({}, defaultContact, val);
    }
  },
  methods: {
    onFocus: function onFocus3(key) {
      this.errorInfo[key] = "";
    },
    getErrorMessageByKey: function getErrorMessageByKey(key) {
      var value17 = this.data[key].trim();
      switch (key) {
        case "name":
          return value17 ? "" : t$j("nameInvalid");
        case "tel":
          return this.telValidator(value17) ? "" : t$j("telInvalid");
      }
    },
    onSave: function onSave2() {
      var _this = this;
      var isValid = ["name", "tel"].every(function(item) {
        var msg = _this.getErrorMessageByKey(item);
        if (msg) {
          _this.errorInfo[item] = msg;
        }
        return !msg;
      });
      if (isValid && !this.isSaving) {
        this.$emit("save", this.data);
      }
    },
    onDelete: function onDelete2() {
      var _this2 = this;
      Dialog.confirm({
        title: t$j("confirmDelete")
      }).then(function() {
        _this2.$emit("delete", _this2.data);
      });
    }
  },
  render: function render33() {
    var _this3 = this;
    var h = arguments[0];
    var data49 = this.data, errorInfo = this.errorInfo;
    var onFocus5 = function onFocus6(name) {
      return function() {
        return _this3.onFocus(name);
      };
    };
    return h("div", {
      "class": bem$T()
    }, [h("div", {
      "class": bem$T("fields")
    }, [h(Field, {
      "attrs": {
        "clearable": true,
        "maxlength": "30",
        "label": t$j("name"),
        "placeholder": t$j("nameEmpty"),
        "errorMessage": errorInfo.name
      },
      "on": {
        "focus": onFocus5("name")
      },
      "model": {
        value: data49.name,
        callback: function callback2($$v) {
          _this3.$set(data49, "name", $$v);
        }
      }
    }), h(Field, {
      "attrs": {
        "clearable": true,
        "type": "tel",
        "label": t$j("tel"),
        "placeholder": t$j("telEmpty"),
        "errorMessage": errorInfo.tel
      },
      "on": {
        "focus": onFocus5("tel")
      },
      "model": {
        value: data49.tel,
        callback: function callback2($$v) {
          _this3.$set(data49, "tel", $$v);
        }
      }
    })]), this.showSetDefault && h(Cell$1, {
      "attrs": {
        "title": this.setDefaultLabel,
        "border": false
      },
      "class": bem$T("switch-cell")
    }, [h(Switch, {
      "attrs": {
        "size": 24
      },
      "slot": "right-icon",
      "on": {
        "change": function change(event) {
          _this3.$emit("change-default", event);
        }
      },
      "model": {
        value: data49.isDefault,
        callback: function callback2($$v) {
          _this3.$set(data49, "isDefault", $$v);
        }
      }
    })]), h("div", {
      "class": bem$T("buttons")
    }, [h(Button$1, {
      "attrs": {
        "block": true,
        "round": true,
        "type": "danger",
        "text": t$j("save"),
        "loading": this.isSaving
      },
      "on": {
        "click": this.onSave
      }
    }), this.isEdit && h(Button$1, {
      "attrs": {
        "block": true,
        "round": true,
        "text": t$j("delete"),
        "loading": this.isDeleting
      },
      "on": {
        "click": this.onDelete
      }
    })])]);
  }
});
var _createNamespace$V = createNamespace$1("contact-list"), createComponent$Z = _createNamespace$V[0], bem$S = _createNamespace$V[1], t$i = _createNamespace$V[2];
function ContactList(h, props2, slots4, ctx) {
  var List2 = props2.list && props2.list.map(function(item, index2) {
    function onClick19() {
      emit(ctx, "input", item.id);
      emit(ctx, "select", item, index2);
    }
    function RightIcon() {
      return h(Radio, {
        "attrs": {
          "name": item.id,
          "iconSize": 16,
          "checkedColor": RED
        },
        "on": {
          "click": onClick19
        }
      });
    }
    function LeftIcon() {
      return h(Icon$1, {
        "attrs": {
          "name": "edit"
        },
        "class": bem$S("edit"),
        "on": {
          "click": function click(event) {
            event.stopPropagation();
            emit(ctx, "edit", item, index2);
          }
        }
      });
    }
    function Content2() {
      var nodes = [item.name + "\uFF0C" + item.tel];
      if (item.isDefault && props2.defaultTagText) {
        nodes.push(h(Tag$1, {
          "attrs": {
            "type": "danger",
            "round": true
          },
          "class": bem$S("item-tag")
        }, [props2.defaultTagText]));
      }
      return nodes;
    }
    return h(Cell$1, {
      "key": item.id,
      "attrs": {
        "isLink": true,
        "center": true,
        "valueClass": bem$S("item-value")
      },
      "class": bem$S("item"),
      "scopedSlots": {
        icon: LeftIcon,
        default: Content2,
        "right-icon": RightIcon
      },
      "on": {
        "click": onClick19
      }
    });
  });
  return h("div", helper([{
    "class": bem$S()
  }, inherit(ctx)]), [h(RadioGroup, {
    "attrs": {
      "value": props2.value
    },
    "class": bem$S("group")
  }, [List2]), h("div", {
    "class": bem$S("bottom")
  }, [h(Button$1, {
    "attrs": {
      "round": true,
      "block": true,
      "type": "danger",
      "text": props2.addText || t$i("addText")
    },
    "class": bem$S("add"),
    "on": {
      "click": function click() {
        emit(ctx, "add");
      }
    }
  })])]);
}
ContactList.props = {
  value: null,
  list: Array,
  addText: String,
  defaultTagText: String
};
var ContactList$1 = createComponent$Z(ContactList);
var SECOND = 1e3;
var MINUTE = 60 * SECOND;
var HOUR = 60 * MINUTE;
var DAY = 24 * HOUR;
function parseTimeData(time) {
  var days2 = Math.floor(time / DAY);
  var hours = Math.floor(time % DAY / HOUR);
  var minutes = Math.floor(time % HOUR / MINUTE);
  var seconds = Math.floor(time % MINUTE / SECOND);
  var milliseconds = Math.floor(time % SECOND);
  return {
    days: days2,
    hours,
    minutes,
    seconds,
    milliseconds
  };
}
function parseFormat(format5, timeData2) {
  var days2 = timeData2.days;
  var hours = timeData2.hours, minutes = timeData2.minutes, seconds = timeData2.seconds, milliseconds = timeData2.milliseconds;
  if (format5.indexOf("DD") === -1) {
    hours += days2 * 24;
  } else {
    format5 = format5.replace("DD", padZero(days2));
  }
  if (format5.indexOf("HH") === -1) {
    minutes += hours * 60;
  } else {
    format5 = format5.replace("HH", padZero(hours));
  }
  if (format5.indexOf("mm") === -1) {
    seconds += minutes * 60;
  } else {
    format5 = format5.replace("mm", padZero(minutes));
  }
  if (format5.indexOf("ss") === -1) {
    milliseconds += seconds * 1e3;
  } else {
    format5 = format5.replace("ss", padZero(seconds));
  }
  if (format5.indexOf("S") !== -1) {
    var ms = padZero(milliseconds, 3);
    if (format5.indexOf("SSS") !== -1) {
      format5 = format5.replace("SSS", ms);
    } else if (format5.indexOf("SS") !== -1) {
      format5 = format5.replace("SS", ms.slice(0, 2));
    } else {
      format5 = format5.replace("S", ms.charAt(0));
    }
  }
  return format5;
}
function isSameSecond(time1, time2) {
  return Math.floor(time1 / 1e3) === Math.floor(time2 / 1e3);
}
var _createNamespace$U = createNamespace$1("count-down"), createComponent$Y = _createNamespace$U[0], bem$R = _createNamespace$U[1];
var CountDown = createComponent$Y({
  props: {
    millisecond: Boolean,
    time: {
      type: [Number, String],
      default: 0
    },
    format: {
      type: String,
      default: "HH:mm:ss"
    },
    autoStart: {
      type: Boolean,
      default: true
    }
  },
  data: function data19() {
    return {
      remain: 0
    };
  },
  computed: {
    timeData: function timeData() {
      return parseTimeData(this.remain);
    },
    formattedTime: function formattedTime() {
      return parseFormat(this.format, this.timeData);
    }
  },
  watch: {
    time: {
      immediate: true,
      handler: "reset"
    }
  },
  activated: function activated3() {
    if (this.keepAlivePaused) {
      this.counting = true;
      this.keepAlivePaused = false;
      this.tick();
    }
  },
  deactivated: function deactivated() {
    if (this.counting) {
      this.pause();
      this.keepAlivePaused = true;
    }
  },
  beforeDestroy: function beforeDestroy3() {
    this.pause();
  },
  methods: {
    start: function start() {
      if (this.counting) {
        return;
      }
      this.counting = true;
      this.endTime = Date.now() + this.remain;
      this.tick();
    },
    pause: function pause() {
      this.counting = false;
      cancelRaf(this.rafId);
    },
    reset: function reset3() {
      this.pause();
      this.remain = +this.time;
      if (this.autoStart) {
        this.start();
      }
    },
    tick: function tick() {
      if (!inBrowser) {
        return;
      }
      if (this.millisecond) {
        this.microTick();
      } else {
        this.macroTick();
      }
    },
    microTick: function microTick() {
      var _this = this;
      this.rafId = raf(function() {
        if (!_this.counting) {
          return;
        }
        _this.setRemain(_this.getRemain());
        if (_this.remain > 0) {
          _this.microTick();
        }
      });
    },
    macroTick: function macroTick() {
      var _this2 = this;
      this.rafId = raf(function() {
        if (!_this2.counting) {
          return;
        }
        var remain = _this2.getRemain();
        if (!isSameSecond(remain, _this2.remain) || remain === 0) {
          _this2.setRemain(remain);
        }
        if (_this2.remain > 0) {
          _this2.macroTick();
        }
      });
    },
    getRemain: function getRemain() {
      return Math.max(this.endTime - Date.now(), 0);
    },
    setRemain: function setRemain(remain) {
      this.remain = remain;
      this.$emit("change", this.timeData);
      if (remain === 0) {
        this.pause();
        this.$emit("finish");
      }
    }
  },
  render: function render34() {
    var h = arguments[0];
    return h("div", {
      "class": bem$R()
    }, [this.slots("default", this.timeData) || this.formattedTime]);
  }
});
var _createNamespace$T = createNamespace$1("coupon"), createComponent$X = _createNamespace$T[0], bem$Q = _createNamespace$T[1], t$h = _createNamespace$T[2];
function formatTimeStamp(timeStamp) {
  if (timeStamp < Math.pow(10, 12)) {
    return timeStamp * 1e3;
  }
  return +timeStamp;
}
function getDate(timeStamp) {
  var date = new Date(formatTimeStamp(timeStamp));
  return date.getFullYear() + "." + padZero(date.getMonth() + 1) + "." + padZero(date.getDate());
}
function formatDiscount(discount3) {
  return (discount3 / 10).toFixed(discount3 % 10 === 0 ? 0 : 1);
}
function formatAmount(amount) {
  return (amount / 100).toFixed(amount % 100 === 0 ? 0 : amount % 10 === 0 ? 1 : 2);
}
var Coupon = createComponent$X({
  props: {
    coupon: Object,
    chosen: Boolean,
    disabled: Boolean,
    currency: {
      type: String,
      default: "\xA5"
    }
  },
  computed: {
    validPeriod: function validPeriod() {
      var _this$coupon = this.coupon, startAt = _this$coupon.startAt, endAt = _this$coupon.endAt, customValidPeriod = _this$coupon.customValidPeriod;
      return customValidPeriod || getDate(startAt) + " - " + getDate(endAt);
    },
    faceAmount: function faceAmount() {
      var coupon = this.coupon;
      if (coupon.valueDesc) {
        return coupon.valueDesc + "<span>" + (coupon.unitDesc || "") + "</span>";
      }
      if (coupon.denominations) {
        var denominations = formatAmount(coupon.denominations);
        return "<span>" + this.currency + "</span> " + denominations;
      }
      if (coupon.discount) {
        return t$h("discount", formatDiscount(coupon.discount));
      }
      return "";
    },
    conditionMessage: function conditionMessage() {
      var condition3 = formatAmount(this.coupon.originCondition);
      return condition3 === "0" ? t$h("unlimited") : t$h("condition", condition3);
    }
  },
  render: function render35() {
    var h = arguments[0];
    var coupon = this.coupon, disabled = this.disabled;
    var description = disabled && coupon.reason || coupon.description;
    return h("div", {
      "class": bem$Q({
        disabled
      })
    }, [h("div", {
      "class": bem$Q("content")
    }, [h("div", {
      "class": bem$Q("head")
    }, [h("h2", {
      "class": bem$Q("amount"),
      "domProps": {
        "innerHTML": this.faceAmount
      }
    }), h("p", {
      "class": bem$Q("condition")
    }, [this.coupon.condition || this.conditionMessage])]), h("div", {
      "class": bem$Q("body")
    }, [h("p", {
      "class": bem$Q("name")
    }, [coupon.name]), h("p", {
      "class": bem$Q("valid")
    }, [this.validPeriod]), !this.disabled && h(Checkbox, {
      "attrs": {
        "size": 18,
        "value": this.chosen,
        "checkedColor": RED
      },
      "class": bem$Q("corner")
    })])]), description && h("p", {
      "class": bem$Q("description")
    }, [description])]);
  }
});
var _createNamespace$S = createNamespace$1("coupon-cell"), createComponent$W = _createNamespace$S[0], bem$P = _createNamespace$S[1], t$g = _createNamespace$S[2];
function formatValue(props2) {
  var coupons = props2.coupons, chosenCoupon = props2.chosenCoupon, currency = props2.currency;
  var coupon = coupons[+chosenCoupon];
  if (coupon) {
    var value17 = 0;
    if (isDef(coupon.value)) {
      value17 = coupon.value;
    } else if (isDef(coupon.denominations)) {
      value17 = coupon.denominations;
    }
    return "-" + currency + " " + (value17 / 100).toFixed(2);
  }
  return coupons.length === 0 ? t$g("tips") : t$g("count", coupons.length);
}
function CouponCell(h, props2, slots4, ctx) {
  var selected = props2.coupons[+props2.chosenCoupon];
  var value17 = formatValue(props2);
  return h(Cell$1, helper([{
    "class": bem$P(),
    "attrs": {
      "value": value17,
      "title": props2.title || t$g("title"),
      "border": props2.border,
      "isLink": props2.editable,
      "valueClass": bem$P("value", {
        selected
      })
    }
  }, inherit(ctx, true)]));
}
CouponCell.model = {
  prop: "chosenCoupon"
};
CouponCell.props = {
  title: String,
  coupons: {
    type: Array,
    default: function _default13() {
      return [];
    }
  },
  currency: {
    type: String,
    default: "\xA5"
  },
  border: {
    type: Boolean,
    default: true
  },
  editable: {
    type: Boolean,
    default: true
  },
  chosenCoupon: {
    type: [Number, String],
    default: -1
  }
};
var CouponCell$1 = createComponent$W(CouponCell);
var _createNamespace$R = createNamespace$1("coupon-list"), createComponent$V = _createNamespace$R[0], bem$O = _createNamespace$R[1], t$f = _createNamespace$R[2];
var EMPTY_IMAGE = "https://img01.yzcdn.cn/vant/coupon-empty.png";
var CouponList = createComponent$V({
  model: {
    prop: "code"
  },
  props: {
    code: String,
    closeButtonText: String,
    inputPlaceholder: String,
    enabledTitle: String,
    disabledTitle: String,
    exchangeButtonText: String,
    exchangeButtonLoading: Boolean,
    exchangeButtonDisabled: Boolean,
    exchangeMinLength: {
      type: Number,
      default: 1
    },
    chosenCoupon: {
      type: Number,
      default: -1
    },
    coupons: {
      type: Array,
      default: function _default14() {
        return [];
      }
    },
    disabledCoupons: {
      type: Array,
      default: function _default15() {
        return [];
      }
    },
    displayedCouponIndex: {
      type: Number,
      default: -1
    },
    showExchangeBar: {
      type: Boolean,
      default: true
    },
    showCloseButton: {
      type: Boolean,
      default: true
    },
    showCount: {
      type: Boolean,
      default: true
    },
    currency: {
      type: String,
      default: "\xA5"
    },
    emptyImage: {
      type: String,
      default: EMPTY_IMAGE
    }
  },
  data: function data20() {
    return {
      tab: 0,
      winHeight: window.innerHeight,
      currentCode: this.code || ""
    };
  },
  computed: {
    buttonDisabled: function buttonDisabled2() {
      return !this.exchangeButtonLoading && (this.exchangeButtonDisabled || !this.currentCode || this.currentCode.length < this.exchangeMinLength);
    },
    listStyle: function listStyle() {
      return {
        height: this.winHeight - (this.showExchangeBar ? 140 : 94) + "px"
      };
    }
  },
  watch: {
    code: function code(_code) {
      this.currentCode = _code;
    },
    currentCode: function currentCode(code2) {
      this.$emit("input", code2);
    },
    displayedCouponIndex: "scrollToShowCoupon"
  },
  mounted: function mounted8() {
    this.scrollToShowCoupon(this.displayedCouponIndex);
  },
  methods: {
    onClickExchangeButton: function onClickExchangeButton() {
      this.$emit("exchange", this.currentCode);
      if (!this.code) {
        this.currentCode = "";
      }
    },
    scrollToShowCoupon: function scrollToShowCoupon(index2) {
      var _this = this;
      if (index2 === -1) {
        return;
      }
      this.$nextTick(function() {
        var _this$$refs = _this.$refs, card = _this$$refs.card, list2 = _this$$refs.list;
        if (list2 && card && card[index2]) {
          list2.scrollTop = card[index2].$el.offsetTop - 100;
        }
      });
    },
    genEmpty: function genEmpty() {
      var h = this.$createElement;
      return h("div", {
        "class": bem$O("empty")
      }, [h("img", {
        "attrs": {
          "src": this.emptyImage
        }
      }), h("p", [t$f("empty")])]);
    },
    genExchangeButton: function genExchangeButton() {
      var h = this.$createElement;
      return h(Button$1, {
        "attrs": {
          "plain": true,
          "type": "danger",
          "text": this.exchangeButtonText || t$f("exchange"),
          "loading": this.exchangeButtonLoading,
          "disabled": this.buttonDisabled
        },
        "class": bem$O("exchange"),
        "on": {
          "click": this.onClickExchangeButton
        }
      });
    }
  },
  render: function render36() {
    var _this2 = this;
    var h = arguments[0];
    var coupons = this.coupons, disabledCoupons = this.disabledCoupons;
    var count6 = this.showCount ? " (" + coupons.length + ")" : "";
    var title4 = (this.enabledTitle || t$f("enable")) + count6;
    var disabledCount = this.showCount ? " (" + disabledCoupons.length + ")" : "";
    var disabledTitle = (this.disabledTitle || t$f("disabled")) + disabledCount;
    var ExchangeBar = this.showExchangeBar && h("div", {
      "class": bem$O("exchange-bar")
    }, [h(Field, {
      "attrs": {
        "clearable": true,
        "border": false,
        "placeholder": this.inputPlaceholder || t$f("placeholder"),
        "maxlength": "20"
      },
      "class": bem$O("field"),
      "model": {
        value: _this2.currentCode,
        callback: function callback2($$v) {
          _this2.currentCode = $$v;
        }
      }
    }), this.genExchangeButton()]);
    var onChange8 = function onChange9(index2) {
      return function() {
        return _this2.$emit("change", index2);
      };
    };
    var CouponTab = h(Tab, {
      "attrs": {
        "title": title4
      }
    }, [h("div", {
      "class": bem$O("list", {
        "with-bottom": this.showCloseButton
      }),
      "style": this.listStyle
    }, [coupons.map(function(coupon, index2) {
      return h(Coupon, {
        "ref": "card",
        "key": coupon.id,
        "attrs": {
          "coupon": coupon,
          "currency": _this2.currency,
          "chosen": index2 === _this2.chosenCoupon
        },
        "nativeOn": {
          "click": onChange8(index2)
        }
      });
    }), !coupons.length && this.genEmpty(), this.slots("list-footer")])]);
    var DisabledCouponTab = h(Tab, {
      "attrs": {
        "title": disabledTitle
      }
    }, [h("div", {
      "class": bem$O("list", {
        "with-bottom": this.showCloseButton
      }),
      "style": this.listStyle
    }, [disabledCoupons.map(function(coupon) {
      return h(Coupon, {
        "attrs": {
          "disabled": true,
          "coupon": coupon,
          "currency": _this2.currency
        },
        "key": coupon.id
      });
    }), !disabledCoupons.length && this.genEmpty(), this.slots("disabled-list-footer")])]);
    return h("div", {
      "class": bem$O()
    }, [ExchangeBar, h(Tabs, {
      "class": bem$O("tab"),
      "attrs": {
        "border": false
      },
      "model": {
        value: _this2.tab,
        callback: function callback2($$v) {
          _this2.tab = $$v;
        }
      }
    }, [CouponTab, DisabledCouponTab]), h("div", {
      "class": bem$O("bottom")
    }, [h(Button$1, {
      "directives": [{
        name: "show",
        value: this.showCloseButton
      }],
      "attrs": {
        "round": true,
        "type": "danger",
        "block": true,
        "text": this.closeButtonText || t$f("close")
      },
      "class": bem$O("close"),
      "on": {
        "click": onChange8(-1)
      }
    })])]);
  }
});
var sharedProps = _extends$1({}, pickerProps, {
  value: null,
  filter: Function,
  columnsOrder: Array,
  showToolbar: {
    type: Boolean,
    default: true
  },
  formatter: {
    type: Function,
    default: function _default16(type2, value17) {
      return value17;
    }
  }
});
var TimePickerMixin = {
  data: function data21() {
    return {
      innerValue: this.formatValue(this.value)
    };
  },
  computed: {
    originColumns: function originColumns() {
      var _this = this;
      return this.ranges.map(function(_ref) {
        var type2 = _ref.type, rangeArr = _ref.range;
        var values = times(rangeArr[1] - rangeArr[0] + 1, function(index2) {
          var value17 = padZero(rangeArr[0] + index2);
          return value17;
        });
        if (_this.filter) {
          values = _this.filter(type2, values);
        }
        return {
          type: type2,
          values
        };
      });
    },
    columns: function columns() {
      var _this2 = this;
      return this.originColumns.map(function(column) {
        return {
          values: column.values.map(function(value17) {
            return _this2.formatter(column.type, value17);
          })
        };
      });
    }
  },
  watch: {
    columns: "updateColumnValue",
    innerValue: function innerValue(val, oldVal) {
      if (!oldVal) {
        this.$emit("input", null);
      } else {
        this.$emit("input", val);
      }
    }
  },
  mounted: function mounted9() {
    var _this3 = this;
    this.updateColumnValue();
    this.$nextTick(function() {
      _this3.updateInnerValue();
    });
  },
  methods: {
    getPicker: function getPicker() {
      return this.$refs.picker;
    },
    getProxiedPicker: function getProxiedPicker() {
      var _this4 = this;
      var picker = this.$refs.picker;
      if (picker) {
        var proxy2 = function proxy3(fn2) {
          return function() {
            picker[fn2].apply(picker, arguments);
            _this4.updateInnerValue();
          };
        };
        return _extends$1({}, picker, {
          setValues: proxy2("setValues"),
          setIndexes: proxy2("setIndexes"),
          setColumnIndex: proxy2("setColumnIndex"),
          setColumnValue: proxy2("setColumnValue")
        });
      }
    },
    onConfirm: function onConfirm3() {
      this.$emit("input", this.innerValue);
      this.$emit("confirm", this.innerValue);
    },
    onCancel: function onCancel() {
      this.$emit("cancel");
    }
  },
  render: function render37() {
    var _this5 = this;
    var h = arguments[0];
    var props2 = {};
    Object.keys(pickerProps).forEach(function(key) {
      props2[key] = _this5[key];
    });
    return h(Picker, {
      "ref": "picker",
      "attrs": {
        "columns": this.columns,
        "readonly": this.readonly
      },
      "scopedSlots": this.$scopedSlots,
      "on": {
        "change": this.onChange,
        "confirm": this.onConfirm,
        "cancel": this.onCancel
      },
      "props": _extends$1({}, props2)
    });
  }
};
var _createNamespace$Q = createNamespace$1("time-picker"), createComponent$U = _createNamespace$Q[0];
var TimePicker = createComponent$U({
  mixins: [TimePickerMixin],
  props: _extends$1({}, sharedProps, {
    minHour: {
      type: [Number, String],
      default: 0
    },
    maxHour: {
      type: [Number, String],
      default: 23
    },
    minMinute: {
      type: [Number, String],
      default: 0
    },
    maxMinute: {
      type: [Number, String],
      default: 59
    }
  }),
  computed: {
    ranges: function ranges() {
      return [{
        type: "hour",
        range: [+this.minHour, +this.maxHour]
      }, {
        type: "minute",
        range: [+this.minMinute, +this.maxMinute]
      }];
    }
  },
  watch: {
    filter: "updateInnerValue",
    minHour: function minHour() {
      var _this = this;
      this.$nextTick(function() {
        _this.updateInnerValue();
      });
    },
    maxHour: function maxHour(value17) {
      var _this$innerValue$spli = this.innerValue.split(":"), hour = _this$innerValue$spli[0], minute = _this$innerValue$spli[1];
      if (hour >= value17) {
        this.innerValue = this.formatValue(value17 + ":" + minute);
        this.updateColumnValue();
      } else {
        this.updateInnerValue();
      }
    },
    minMinute: "updateInnerValue",
    maxMinute: function maxMinute(value17) {
      var _this$innerValue$spli2 = this.innerValue.split(":"), hour = _this$innerValue$spli2[0], minute = _this$innerValue$spli2[1];
      if (minute >= value17) {
        this.innerValue = this.formatValue(hour + ":" + value17);
        this.updateColumnValue();
      } else {
        this.updateInnerValue();
      }
    },
    value: function value8(val) {
      val = this.formatValue(val);
      if (val !== this.innerValue) {
        this.innerValue = val;
        this.updateColumnValue();
      }
    }
  },
  methods: {
    formatValue: function formatValue2(value17) {
      if (!value17) {
        value17 = padZero(this.minHour) + ":" + padZero(this.minMinute);
      }
      var _value$split = value17.split(":"), hour = _value$split[0], minute = _value$split[1];
      hour = padZero(range(hour, this.minHour, this.maxHour));
      minute = padZero(range(minute, this.minMinute, this.maxMinute));
      return hour + ":" + minute;
    },
    updateInnerValue: function updateInnerValue() {
      var _this$getPicker$getIn = this.getPicker().getIndexes(), hourIndex = _this$getPicker$getIn[0], minuteIndex = _this$getPicker$getIn[1];
      var _this$originColumns = this.originColumns, hourColumn = _this$originColumns[0], minuteColumn = _this$originColumns[1];
      var hour = hourColumn.values[hourIndex] || hourColumn.values[0];
      var minute = minuteColumn.values[minuteIndex] || minuteColumn.values[0];
      this.innerValue = this.formatValue(hour + ":" + minute);
      this.updateColumnValue();
    },
    onChange: function onChange3(picker) {
      var _this2 = this;
      this.updateInnerValue();
      this.$nextTick(function() {
        _this2.$nextTick(function() {
          _this2.updateInnerValue();
          _this2.$emit("change", picker);
        });
      });
    },
    updateColumnValue: function updateColumnValue() {
      var _this3 = this;
      var formatter2 = this.formatter;
      var pair = this.innerValue.split(":");
      var values = [formatter2("hour", pair[0]), formatter2("minute", pair[1])];
      this.$nextTick(function() {
        _this3.getPicker().setValues(values);
      });
    }
  }
});
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct.bind();
  } else {
    _construct = function _construct2(Parent2, args2, Class2) {
      var a = [null];
      a.push.apply(a, args2);
      var Constructor = Function.bind.apply(Parent2, a);
      var instance2 = new Constructor();
      if (Class2)
        _setPrototypeOf(instance2, Class2.prototype);
      return instance2;
    };
  }
  return _construct.apply(null, arguments);
}
var currentYear = new Date().getFullYear();
var _createNamespace$P = createNamespace$1("date-picker"), createComponent$T = _createNamespace$P[0];
var DatePicker = createComponent$T({
  mixins: [TimePickerMixin],
  props: _extends$1({}, sharedProps, {
    type: {
      type: String,
      default: "datetime"
    },
    minDate: {
      type: Date,
      default: function _default17() {
        return new Date(currentYear - 10, 0, 1);
      },
      validator: isDate
    },
    maxDate: {
      type: Date,
      default: function _default18() {
        return new Date(currentYear + 10, 11, 31);
      },
      validator: isDate
    }
  }),
  watch: {
    filter: "updateInnerValue",
    minDate: function minDate() {
      var _this = this;
      this.$nextTick(function() {
        _this.updateInnerValue();
      });
    },
    maxDate: function maxDate(value17) {
      if (this.innerValue.valueOf() >= value17.valueOf()) {
        this.innerValue = value17;
      } else {
        this.updateInnerValue();
      }
    },
    value: function value9(val) {
      val = this.formatValue(val);
      if (val && val.valueOf() !== this.innerValue.valueOf()) {
        this.innerValue = val;
      }
    }
  },
  computed: {
    ranges: function ranges2() {
      var _this$getBoundary = this.getBoundary("max", this.innerValue ? this.innerValue : this.minDate), maxYear = _this$getBoundary.maxYear, maxDate2 = _this$getBoundary.maxDate, maxMonth = _this$getBoundary.maxMonth, maxHour2 = _this$getBoundary.maxHour, maxMinute2 = _this$getBoundary.maxMinute;
      var _this$getBoundary2 = this.getBoundary("min", this.innerValue ? this.innerValue : this.minDate), minYear = _this$getBoundary2.minYear, minDate2 = _this$getBoundary2.minDate, minMonth = _this$getBoundary2.minMonth, minHour2 = _this$getBoundary2.minHour, minMinute = _this$getBoundary2.minMinute;
      var result = [{
        type: "year",
        range: [minYear, maxYear]
      }, {
        type: "month",
        range: [minMonth, maxMonth]
      }, {
        type: "day",
        range: [minDate2, maxDate2]
      }, {
        type: "hour",
        range: [minHour2, maxHour2]
      }, {
        type: "minute",
        range: [minMinute, maxMinute2]
      }];
      switch (this.type) {
        case "date":
          result = result.slice(0, 3);
          break;
        case "year-month":
          result = result.slice(0, 2);
          break;
        case "month-day":
          result = result.slice(1, 3);
          break;
        case "datehour":
          result = result.slice(0, 4);
          break;
      }
      if (this.columnsOrder) {
        var columnsOrder = this.columnsOrder.concat(result.map(function(column) {
          return column.type;
        }));
        result.sort(function(a, b) {
          return columnsOrder.indexOf(a.type) - columnsOrder.indexOf(b.type);
        });
      }
      return result;
    }
  },
  methods: {
    formatValue: function formatValue3(value17) {
      var _this2 = this;
      if (!isDate(value17)) {
        return null;
      }
      var minDate2 = new Date(this.minDate);
      var maxDate2 = new Date(this.maxDate);
      var dateMethods = {
        year: "getFullYear",
        month: "getMonth",
        day: "getDate",
        hour: "getHours",
        minute: "getMinutes"
      };
      if (this.originColumns) {
        var dateColumns = this.originColumns.map(function(_ref, index2) {
          var type2 = _ref.type, values = _ref.values;
          var range2 = _this2.ranges[index2].range;
          var minDateVal = minDate2[dateMethods[type2]]();
          var maxDateVal = maxDate2[dateMethods[type2]]();
          var min = type2 === "month" ? +values[0] - 1 : +values[0];
          var max = type2 === "month" ? +values[values.length - 1] - 1 : +values[values.length - 1];
          return {
            type: type2,
            values: [minDateVal < range2[0] ? Math.max(minDateVal, min) : min || minDateVal, maxDateVal > range2[1] ? Math.min(maxDateVal, max) : max || maxDateVal]
          };
        });
        if (this.type === "month-day") {
          var year = (this.innerValue || this.minDate).getFullYear();
          dateColumns.unshift({
            type: "year",
            values: [year, year]
          });
        }
        var dates = Object.keys(dateMethods).map(function(type2) {
          var _dateColumns$filter$;
          return (_dateColumns$filter$ = dateColumns.filter(function(item) {
            return item.type === type2;
          })[0]) == null ? void 0 : _dateColumns$filter$.values;
        }).filter(function(item) {
          return item;
        });
        minDate2 = _construct(Date, dates.map(function(val) {
          return getTrueValue(val[0]);
        }));
        maxDate2 = _construct(Date, dates.map(function(val) {
          return getTrueValue(val[1]);
        }));
      }
      value17 = Math.max(value17, minDate2.getTime());
      value17 = Math.min(value17, maxDate2.getTime());
      return new Date(value17);
    },
    getBoundary: function getBoundary(type2, value17) {
      var _ref2;
      var boundary = this[type2 + "Date"];
      var year = boundary.getFullYear();
      var month = 1;
      var date = 1;
      var hour = 0;
      var minute = 0;
      if (type2 === "max") {
        month = 12;
        date = getMonthEndDay(value17.getFullYear(), value17.getMonth() + 1);
        hour = 23;
        minute = 59;
      }
      if (value17.getFullYear() === year) {
        month = boundary.getMonth() + 1;
        if (value17.getMonth() + 1 === month) {
          date = boundary.getDate();
          if (value17.getDate() === date) {
            hour = boundary.getHours();
            if (value17.getHours() === hour) {
              minute = boundary.getMinutes();
            }
          }
        }
      }
      return _ref2 = {}, _ref2[type2 + "Year"] = year, _ref2[type2 + "Month"] = month, _ref2[type2 + "Date"] = date, _ref2[type2 + "Hour"] = hour, _ref2[type2 + "Minute"] = minute, _ref2;
    },
    updateInnerValue: function updateInnerValue2() {
      var _this3 = this;
      var type2 = this.type;
      var indexes = this.getPicker().getIndexes();
      var getValue3 = function getValue4(type3) {
        var index2 = 0;
        _this3.originColumns.forEach(function(column, columnIndex) {
          if (type3 === column.type) {
            index2 = columnIndex;
          }
        });
        var values = _this3.originColumns[index2].values;
        return getTrueValue(values[indexes[index2]]);
      };
      var year;
      var month;
      var day;
      if (type2 === "month-day") {
        year = (this.innerValue || this.minDate).getFullYear();
        month = getValue3("month");
        day = getValue3("day");
      } else {
        year = getValue3("year");
        month = getValue3("month");
        day = type2 === "year-month" ? 1 : getValue3("day");
      }
      var maxDay = getMonthEndDay(year, month);
      day = day > maxDay ? maxDay : day;
      var hour = 0;
      var minute = 0;
      if (type2 === "datehour") {
        hour = getValue3("hour");
      }
      if (type2 === "datetime") {
        hour = getValue3("hour");
        minute = getValue3("minute");
      }
      var value17 = new Date(year, month - 1, day, hour, minute);
      this.innerValue = this.formatValue(value17);
    },
    onChange: function onChange4(picker) {
      var _this4 = this;
      this.updateInnerValue();
      this.$nextTick(function() {
        _this4.$nextTick(function() {
          _this4.updateInnerValue();
          _this4.$emit("change", picker);
        });
      });
    },
    updateColumnValue: function updateColumnValue2() {
      var _this5 = this;
      var value17 = this.innerValue ? this.innerValue : this.minDate;
      var formatter2 = this.formatter;
      var values = this.originColumns.map(function(column) {
        switch (column.type) {
          case "year":
            return formatter2("year", "" + value17.getFullYear());
          case "month":
            return formatter2("month", padZero(value17.getMonth() + 1));
          case "day":
            return formatter2("day", padZero(value17.getDate()));
          case "hour":
            return formatter2("hour", padZero(value17.getHours()));
          case "minute":
            return formatter2("minute", padZero(value17.getMinutes()));
          default:
            return null;
        }
      });
      this.$nextTick(function() {
        _this5.getPicker().setValues(values);
      });
    }
  }
});
var _createNamespace$O = createNamespace$1("datetime-picker"), createComponent$S = _createNamespace$O[0], bem$N = _createNamespace$O[1];
var DatetimePicker = createComponent$S({
  props: _extends$1({}, TimePicker.props, DatePicker.props),
  methods: {
    getPicker: function getPicker2() {
      return this.$refs.root.getProxiedPicker();
    }
  },
  render: function render38() {
    var h = arguments[0];
    var Component = this.type === "time" ? TimePicker : DatePicker;
    return h(Component, {
      "ref": "root",
      "class": bem$N(),
      "scopedSlots": this.$scopedSlots,
      "props": _extends$1({}, this.$props),
      "on": _extends$1({}, this.$listeners)
    });
  }
});
var _createNamespace$N = createNamespace$1("divider"), createComponent$R = _createNamespace$N[0], bem$M = _createNamespace$N[1];
function Divider(h, props2, slots4, ctx) {
  var _bem2;
  return h("div", helper([{
    "attrs": {
      "role": "separator"
    },
    "style": {
      borderColor: props2.borderColor
    },
    "class": bem$M((_bem2 = {
      dashed: props2.dashed,
      hairline: props2.hairline
    }, _bem2["content-" + props2.contentPosition] = slots4.default, _bem2))
  }, inherit(ctx, true)]), [slots4.default && slots4.default()]);
}
Divider.props = {
  dashed: Boolean,
  hairline: {
    type: Boolean,
    default: true
  },
  contentPosition: {
    type: String,
    default: "center"
  }
};
var Divider$1 = createComponent$R(Divider);
var _createNamespace$M = createNamespace$1("dropdown-item"), createComponent$Q = _createNamespace$M[0], bem$L = _createNamespace$M[1];
var DropdownItem = createComponent$Q({
  mixins: [PortalMixin({
    ref: "wrapper"
  }), ChildrenMixin("vanDropdownMenu")],
  props: {
    value: null,
    title: String,
    disabled: Boolean,
    titleClass: String,
    options: {
      type: Array,
      default: function _default19() {
        return [];
      }
    },
    lazyRender: {
      type: Boolean,
      default: true
    }
  },
  data: function data22() {
    return {
      transition: true,
      showPopup: false,
      showWrapper: false
    };
  },
  computed: {
    displayTitle: function displayTitle() {
      var _this = this;
      if (this.title) {
        return this.title;
      }
      var match = this.options.filter(function(option) {
        return option.value === _this.value;
      });
      return match.length ? match[0].text : "";
    }
  },
  watch: {
    showPopup: function showPopup(val) {
      this.bindScroll(val);
    }
  },
  beforeCreate: function beforeCreate3() {
    var _this2 = this;
    var createEmitter = function createEmitter2(eventName) {
      return function() {
        return _this2.$emit(eventName);
      };
    };
    this.onOpen = createEmitter("open");
    this.onClose = createEmitter("close");
    this.onOpened = createEmitter("opened");
  },
  methods: {
    toggle: function toggle4(show5, options) {
      if (show5 === void 0) {
        show5 = !this.showPopup;
      }
      if (options === void 0) {
        options = {};
      }
      if (show5 === this.showPopup) {
        return;
      }
      this.transition = !options.immediate;
      this.showPopup = show5;
      if (show5) {
        this.parent.updateOffset();
        this.showWrapper = true;
      }
    },
    bindScroll: function bindScroll(bind3) {
      var scroller2 = this.parent.scroller;
      var action = bind3 ? on : off;
      action(scroller2, "scroll", this.onScroll, true);
    },
    onScroll: function onScroll4() {
      this.parent.updateOffset();
    },
    onClickWrapper: function onClickWrapper(event) {
      if (this.getContainer) {
        event.stopPropagation();
      }
    }
  },
  render: function render39() {
    var _this3 = this;
    var h = arguments[0];
    var _this$parent = this.parent, zIndex = _this$parent.zIndex, offset3 = _this$parent.offset, overlay = _this$parent.overlay, duration = _this$parent.duration, direction = _this$parent.direction, activeColor = _this$parent.activeColor, closeOnClickOverlay = _this$parent.closeOnClickOverlay;
    var Options = this.options.map(function(option) {
      var active4 = option.value === _this3.value;
      return h(Cell$1, {
        "attrs": {
          "clickable": true,
          "icon": option.icon,
          "title": option.text
        },
        "key": option.value,
        "class": bem$L("option", {
          active: active4
        }),
        "style": {
          color: active4 ? activeColor : ""
        },
        "on": {
          "click": function click() {
            _this3.showPopup = false;
            if (option.value !== _this3.value) {
              _this3.$emit("input", option.value);
              _this3.$emit("change", option.value);
            }
          }
        }
      }, [active4 && h(Icon$1, {
        "class": bem$L("icon"),
        "attrs": {
          "color": activeColor,
          "name": "success"
        }
      })]);
    });
    var style12 = {
      zIndex
    };
    if (direction === "down") {
      style12.top = offset3 + "px";
    } else {
      style12.bottom = offset3 + "px";
    }
    return h("div", [h("div", {
      "directives": [{
        name: "show",
        value: this.showWrapper
      }],
      "ref": "wrapper",
      "style": style12,
      "class": bem$L([direction]),
      "on": {
        "click": this.onClickWrapper
      }
    }, [h(Popup, {
      "attrs": {
        "overlay": overlay,
        "position": direction === "down" ? "top" : "bottom",
        "duration": this.transition ? duration : 0,
        "lazyRender": this.lazyRender,
        "overlayStyle": {
          position: "absolute"
        },
        "closeOnClickOverlay": closeOnClickOverlay
      },
      "class": bem$L("content"),
      "on": {
        "open": this.onOpen,
        "close": this.onClose,
        "opened": this.onOpened,
        "closed": function closed() {
          _this3.showWrapper = false;
          _this3.$emit("closed");
        }
      },
      "model": {
        value: _this3.showPopup,
        callback: function callback2($$v) {
          _this3.showPopup = $$v;
        }
      }
    }, [Options, this.slots("default")])])]);
  }
});
var ClickOutsideMixin = function ClickOutsideMixin2(config2) {
  return {
    props: {
      closeOnClickOutside: {
        type: Boolean,
        default: true
      }
    },
    data: function data49() {
      var _this = this;
      var clickOutsideHandler = function clickOutsideHandler2(event) {
        if (_this.closeOnClickOutside && !_this.$el.contains(event.target)) {
          _this[config2.method]();
        }
      };
      return {
        clickOutsideHandler
      };
    },
    mounted: function mounted25() {
      on(document, config2.event, this.clickOutsideHandler);
    },
    beforeDestroy: function beforeDestroy6() {
      off(document, config2.event, this.clickOutsideHandler);
    }
  };
};
var _createNamespace$L = createNamespace$1("dropdown-menu"), createComponent$P = _createNamespace$L[0], bem$K = _createNamespace$L[1];
var DropdownMenu = createComponent$P({
  mixins: [ParentMixin("vanDropdownMenu"), ClickOutsideMixin({
    event: "click",
    method: "onClickOutside"
  })],
  props: {
    zIndex: [Number, String],
    activeColor: String,
    overlay: {
      type: Boolean,
      default: true
    },
    duration: {
      type: [Number, String],
      default: 0.2
    },
    direction: {
      type: String,
      default: "down"
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    }
  },
  data: function data23() {
    return {
      offset: 0
    };
  },
  computed: {
    scroller: function scroller() {
      return getScroller(this.$el);
    },
    opened: function opened() {
      return this.children.some(function(item) {
        return item.showWrapper;
      });
    },
    barStyle: function barStyle() {
      if (this.opened && isDef(this.zIndex)) {
        return {
          zIndex: 1 + this.zIndex
        };
      }
    }
  },
  methods: {
    updateOffset: function updateOffset() {
      if (!this.$refs.bar) {
        return;
      }
      var rect = this.$refs.bar.getBoundingClientRect();
      if (this.direction === "down") {
        this.offset = rect.bottom;
      } else {
        this.offset = window.innerHeight - rect.top;
      }
    },
    toggleItem: function toggleItem(active4) {
      this.children.forEach(function(item, index2) {
        if (index2 === active4) {
          item.toggle();
        } else if (item.showPopup) {
          item.toggle(false, {
            immediate: true
          });
        }
      });
    },
    onClickOutside: function onClickOutside() {
      this.children.forEach(function(item) {
        item.toggle(false);
      });
    }
  },
  render: function render40() {
    var _this = this;
    var h = arguments[0];
    var Titles = this.children.map(function(item, index2) {
      return h("div", {
        "attrs": {
          "role": "button",
          "tabindex": item.disabled ? -1 : 0
        },
        "class": bem$K("item", {
          disabled: item.disabled
        }),
        "on": {
          "click": function click() {
            if (!item.disabled) {
              _this.toggleItem(index2);
            }
          }
        }
      }, [h("span", {
        "class": [bem$K("title", {
          active: item.showPopup,
          down: item.showPopup === (_this.direction === "down")
        }), item.titleClass],
        "style": {
          color: item.showPopup ? _this.activeColor : ""
        }
      }, [h("div", {
        "class": "van-ellipsis"
      }, [item.slots("title") || item.displayTitle])])]);
    });
    return h("div", {
      "class": bem$K()
    }, [h("div", {
      "ref": "bar",
      "style": this.barStyle,
      "class": bem$K("bar", {
        opened: this.opened
      })
    }, [Titles]), this.slots("default")]);
  }
});
var prefix = "van-empty-network-";
var Network = {
  render: function render41() {
    var h = arguments[0];
    var genStop = function genStop2(color, offset3, opacity) {
      return h("stop", {
        "attrs": {
          "stop-color": color,
          "offset": offset3 + "%",
          "stop-opacity": opacity
        }
      });
    };
    return h("svg", {
      "attrs": {
        "viewBox": "0 0 160 160",
        "xmlns": "http://www.w3.org/2000/svg"
      }
    }, [h("defs", [h("linearGradient", {
      "attrs": {
        "id": prefix + "1",
        "x1": "64.022%",
        "y1": "100%",
        "x2": "64.022%",
        "y2": "0%"
      }
    }, [genStop("#FFF", 0, 0.5), genStop("#F2F3F5", 100)]), h("linearGradient", {
      "attrs": {
        "id": prefix + "2",
        "x1": "50%",
        "y1": "0%",
        "x2": "50%",
        "y2": "84.459%"
      }
    }, [genStop("#EBEDF0", 0), genStop("#DCDEE0", 100, 0)]), h("linearGradient", {
      "attrs": {
        "id": prefix + "3",
        "x1": "100%",
        "y1": "0%",
        "x2": "100%",
        "y2": "100%"
      }
    }, [genStop("#EAEDF0", 0), genStop("#DCDEE0", 100)]), h("linearGradient", {
      "attrs": {
        "id": prefix + "4",
        "x1": "100%",
        "y1": "100%",
        "x2": "100%",
        "y2": "0%"
      }
    }, [genStop("#EAEDF0", 0), genStop("#DCDEE0", 100)]), h("linearGradient", {
      "attrs": {
        "id": prefix + "5",
        "x1": "0%",
        "y1": "43.982%",
        "x2": "100%",
        "y2": "54.703%"
      }
    }, [genStop("#EAEDF0", 0), genStop("#DCDEE0", 100)]), h("linearGradient", {
      "attrs": {
        "id": prefix + "6",
        "x1": "94.535%",
        "y1": "43.837%",
        "x2": "5.465%",
        "y2": "54.948%"
      }
    }, [genStop("#EAEDF0", 0), genStop("#DCDEE0", 100)]), h("radialGradient", {
      "attrs": {
        "id": prefix + "7",
        "cx": "50%",
        "cy": "0%",
        "fx": "50%",
        "fy": "0%",
        "r": "100%",
        "gradientTransform": "matrix(0 1 -.54835 0 .5 -.5)"
      }
    }, [genStop("#EBEDF0", 0), genStop("#FFF", 100, 0)])]), h("g", {
      "attrs": {
        "fill": "none",
        "fill-rule": "evenodd"
      }
    }, [h("g", {
      "attrs": {
        "opacity": ".8"
      }
    }, [h("path", {
      "attrs": {
        "d": "M0 124V46h20v20h14v58H0z",
        "fill": "url(#" + prefix + "1)",
        "transform": "matrix(-1 0 0 1 36 7)"
      }
    }), h("path", {
      "attrs": {
        "d": "M121 8h22.231v14H152v77.37h-31V8z",
        "fill": "url(#" + prefix + "1)",
        "transform": "translate(2 7)"
      }
    })]), h("path", {
      "attrs": {
        "fill": "url(#" + prefix + "7)",
        "d": "M0 139h160v21H0z"
      }
    }), h("path", {
      "attrs": {
        "d": "M37 18a7 7 0 013 13.326v26.742c0 1.23-.997 2.227-2.227 2.227h-1.546A2.227 2.227 0 0134 58.068V31.326A7 7 0 0137 18z",
        "fill": "url(#" + prefix + "2)",
        "fill-rule": "nonzero",
        "transform": "translate(43 36)"
      }
    }), h("g", {
      "attrs": {
        "opacity": ".6",
        "stroke-linecap": "round",
        "stroke-width": "7"
      }
    }, [h("path", {
      "attrs": {
        "d": "M20.875 11.136a18.868 18.868 0 00-5.284 13.121c0 5.094 2.012 9.718 5.284 13.12",
        "stroke": "url(#" + prefix + "3)",
        "transform": "translate(43 36)"
      }
    }), h("path", {
      "attrs": {
        "d": "M9.849 0C3.756 6.225 0 14.747 0 24.146c0 9.398 3.756 17.92 9.849 24.145",
        "stroke": "url(#" + prefix + "3)",
        "transform": "translate(43 36)"
      }
    }), h("path", {
      "attrs": {
        "d": "M57.625 11.136a18.868 18.868 0 00-5.284 13.121c0 5.094 2.012 9.718 5.284 13.12",
        "stroke": "url(#" + prefix + "4)",
        "transform": "rotate(-180 76.483 42.257)"
      }
    }), h("path", {
      "attrs": {
        "d": "M73.216 0c-6.093 6.225-9.849 14.747-9.849 24.146 0 9.398 3.756 17.92 9.849 24.145",
        "stroke": "url(#" + prefix + "4)",
        "transform": "rotate(-180 89.791 42.146)"
      }
    })]), h("g", {
      "attrs": {
        "transform": "translate(31 105)",
        "fill-rule": "nonzero"
      }
    }, [h("rect", {
      "attrs": {
        "fill": "url(#" + prefix + "5)",
        "width": "98",
        "height": "34",
        "rx": "2"
      }
    }), h("rect", {
      "attrs": {
        "fill": "#FFF",
        "x": "9",
        "y": "8",
        "width": "80",
        "height": "18",
        "rx": "1.114"
      }
    }), h("rect", {
      "attrs": {
        "fill": "url(#" + prefix + "6)",
        "x": "15",
        "y": "12",
        "width": "18",
        "height": "6",
        "rx": "1.114"
      }
    })])])]);
  }
};
var _createNamespace$K = createNamespace$1("empty"), createComponent$O = _createNamespace$K[0], bem$J = _createNamespace$K[1];
var PRESETS = ["error", "search", "default"];
var Empty = createComponent$O({
  props: {
    imageSize: [Number, String],
    description: String,
    image: {
      type: String,
      default: "default"
    }
  },
  methods: {
    genImageContent: function genImageContent() {
      var h = this.$createElement;
      var slots4 = this.slots("image");
      if (slots4) {
        return slots4;
      }
      if (this.image === "network") {
        return h(Network);
      }
      var image = this.image;
      if (PRESETS.indexOf(image) !== -1) {
        image = "https://img01.yzcdn.cn/vant/empty-image-" + image + ".png";
      }
      return h("img", {
        "attrs": {
          "src": image
        }
      });
    },
    genImage: function genImage2() {
      var h = this.$createElement;
      var imageStyle2 = {
        width: addUnit(this.imageSize),
        height: addUnit(this.imageSize)
      };
      return h("div", {
        "class": bem$J("image"),
        "style": imageStyle2
      }, [this.genImageContent()]);
    },
    genDescription: function genDescription() {
      var h = this.$createElement;
      var description = this.slots("description") || this.description;
      if (description) {
        return h("p", {
          "class": bem$J("description")
        }, [description]);
      }
    },
    genBottom: function genBottom() {
      var h = this.$createElement;
      var slot = this.slots();
      if (slot) {
        return h("div", {
          "class": bem$J("bottom")
        }, [slot]);
      }
    }
  },
  render: function render42() {
    var h = arguments[0];
    return h("div", {
      "class": bem$J()
    }, [this.genImage(), this.genDescription(), this.genBottom()]);
  }
});
var _createNamespace$J = createNamespace$1("form"), createComponent$N = _createNamespace$J[0], bem$I = _createNamespace$J[1];
var Form = createComponent$N({
  props: {
    colon: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    labelWidth: [Number, String],
    labelAlign: String,
    inputAlign: String,
    scrollToError: Boolean,
    validateFirst: Boolean,
    errorMessageAlign: String,
    submitOnEnter: {
      type: Boolean,
      default: true
    },
    validateTrigger: {
      type: String,
      default: "onBlur"
    },
    showError: {
      type: Boolean,
      default: true
    },
    showErrorMessage: {
      type: Boolean,
      default: true
    }
  },
  provide: function provide2() {
    return {
      vanForm: this
    };
  },
  data: function data24() {
    return {
      fields: []
    };
  },
  methods: {
    getFieldsByNames: function getFieldsByNames(names) {
      if (names) {
        return this.fields.filter(function(field) {
          return names.indexOf(field.name) !== -1;
        });
      }
      return this.fields;
    },
    validateSeq: function validateSeq(names) {
      var _this = this;
      return new Promise(function(resolve, reject) {
        var errors = [];
        var fields = _this.getFieldsByNames(names);
        fields.reduce(function(promise, field) {
          return promise.then(function() {
            if (!errors.length) {
              return field.validate().then(function(error) {
                if (error) {
                  errors.push(error);
                }
              });
            }
          });
        }, Promise.resolve()).then(function() {
          if (errors.length) {
            reject(errors);
          } else {
            resolve();
          }
        });
      });
    },
    validateFields: function validateFields(names) {
      var _this2 = this;
      return new Promise(function(resolve, reject) {
        var fields = _this2.getFieldsByNames(names);
        Promise.all(fields.map(function(item) {
          return item.validate();
        })).then(function(errors) {
          errors = errors.filter(function(item) {
            return item;
          });
          if (errors.length) {
            reject(errors);
          } else {
            resolve();
          }
        });
      });
    },
    validate: function validate2(name) {
      if (name && !Array.isArray(name)) {
        return this.validateField(name);
      }
      return this.validateFirst ? this.validateSeq(name) : this.validateFields(name);
    },
    validateField: function validateField(name) {
      var matched = this.fields.filter(function(item) {
        return item.name === name;
      });
      if (matched.length) {
        return new Promise(function(resolve, reject) {
          matched[0].validate().then(function(error) {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          });
        });
      }
      return Promise.reject();
    },
    resetValidation: function resetValidation2(name) {
      if (name && !Array.isArray(name)) {
        name = [name];
      }
      var fields = this.getFieldsByNames(name);
      fields.forEach(function(item) {
        item.resetValidation();
      });
    },
    scrollToField: function scrollToField(name, options) {
      this.fields.some(function(item) {
        if (item.name === name) {
          item.$el.scrollIntoView(options);
          return true;
        }
        return false;
      });
    },
    addField: function addField(field) {
      this.fields.push(field);
      sortChildren(this.fields, this);
    },
    removeField: function removeField(field) {
      this.fields = this.fields.filter(function(item) {
        return item !== field;
      });
    },
    getValues: function getValues3() {
      return this.fields.reduce(function(form, field) {
        form[field.name] = field.formValue;
        return form;
      }, {});
    },
    onSubmit: function onSubmit(event) {
      event.preventDefault();
      this.submit();
    },
    submit: function submit() {
      var _this3 = this;
      var values = this.getValues();
      this.validate().then(function() {
        _this3.$emit("submit", values);
      }).catch(function(errors) {
        _this3.$emit("failed", {
          values,
          errors
        });
        if (_this3.scrollToError) {
          _this3.scrollToField(errors[0].name);
        }
      });
    }
  },
  render: function render43() {
    var h = arguments[0];
    return h("form", {
      "class": bem$I(),
      "on": {
        "submit": this.onSubmit
      }
    }, [this.slots()]);
  }
});
var _createNamespace$I = createNamespace$1("goods-action-icon"), createComponent$M = _createNamespace$I[0], bem$H = _createNamespace$I[1];
var GoodsActionIcon = createComponent$M({
  mixins: [ChildrenMixin("vanGoodsAction")],
  props: _extends$1({}, routeProps, {
    dot: Boolean,
    text: String,
    icon: String,
    color: String,
    info: [Number, String],
    badge: [Number, String],
    iconClass: null
  }),
  methods: {
    onClick: function onClick10(event) {
      this.$emit("click", event);
      route(this.$router, this);
    },
    genIcon: function genIcon2() {
      var _this$badge;
      var h = this.$createElement;
      var slot = this.slots("icon");
      var info = (_this$badge = this.badge) != null ? _this$badge : this.info;
      if (slot) {
        return h("div", {
          "class": bem$H("icon")
        }, [slot, h(Info$1, {
          "attrs": {
            "dot": this.dot,
            "info": info
          }
        })]);
      }
      return h(Icon$1, {
        "class": [bem$H("icon"), this.iconClass],
        "attrs": {
          "tag": "div",
          "dot": this.dot,
          "name": this.icon,
          "badge": info,
          "color": this.color
        }
      });
    }
  },
  render: function render44() {
    var h = arguments[0];
    return h("div", {
      "attrs": {
        "role": "button",
        "tabindex": "0"
      },
      "class": bem$H(),
      "on": {
        "click": this.onClick
      }
    }, [this.genIcon(), this.slots() || this.text]);
  }
});
var _createNamespace$H = createNamespace$1("grid"), createComponent$L = _createNamespace$H[0], bem$G = _createNamespace$H[1];
var Grid = createComponent$L({
  mixins: [ParentMixin("vanGrid")],
  props: {
    square: Boolean,
    gutter: [Number, String],
    iconSize: [Number, String],
    direction: String,
    clickable: Boolean,
    columnNum: {
      type: [Number, String],
      default: 4
    },
    center: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    style: function style9() {
      var gutter = this.gutter;
      if (gutter) {
        return {
          paddingLeft: addUnit(gutter)
        };
      }
    }
  },
  render: function render45() {
    var _ref;
    var h = arguments[0];
    return h("div", {
      "style": this.style,
      "class": [bem$G(), (_ref = {}, _ref[BORDER_TOP] = this.border && !this.gutter, _ref)]
    }, [this.slots()]);
  }
});
var _createNamespace$G = createNamespace$1("grid-item"), createComponent$K = _createNamespace$G[0], bem$F = _createNamespace$G[1];
var GridItem = createComponent$K({
  mixins: [ChildrenMixin("vanGrid")],
  props: _extends$1({}, routeProps, {
    dot: Boolean,
    text: String,
    icon: String,
    iconPrefix: String,
    info: [Number, String],
    badge: [Number, String]
  }),
  computed: {
    style: function style10() {
      var _this$parent = this.parent, square = _this$parent.square, gutter = _this$parent.gutter, columnNum = _this$parent.columnNum;
      var percent = 100 / columnNum + "%";
      var style12 = {
        flexBasis: percent
      };
      if (square) {
        style12.paddingTop = percent;
      } else if (gutter) {
        var gutterValue = addUnit(gutter);
        style12.paddingRight = gutterValue;
        if (this.index >= columnNum) {
          style12.marginTop = gutterValue;
        }
      }
      return style12;
    },
    contentStyle: function contentStyle() {
      var _this$parent2 = this.parent, square = _this$parent2.square, gutter = _this$parent2.gutter;
      if (square && gutter) {
        var gutterValue = addUnit(gutter);
        return {
          right: gutterValue,
          bottom: gutterValue,
          height: "auto"
        };
      }
    }
  },
  methods: {
    onClick: function onClick11(event) {
      this.$emit("click", event);
      route(this.$router, this);
    },
    genIcon: function genIcon3() {
      var _this$badge;
      var h = this.$createElement;
      var iconSlot = this.slots("icon");
      var info = (_this$badge = this.badge) != null ? _this$badge : this.info;
      if (iconSlot) {
        return h("div", {
          "class": bem$F("icon-wrapper")
        }, [iconSlot, h(Info$1, {
          "attrs": {
            "dot": this.dot,
            "info": info
          }
        })]);
      }
      if (this.icon) {
        return h(Icon$1, {
          "attrs": {
            "name": this.icon,
            "dot": this.dot,
            "badge": info,
            "size": this.parent.iconSize,
            "classPrefix": this.iconPrefix
          },
          "class": bem$F("icon")
        });
      }
    },
    getText: function getText() {
      var h = this.$createElement;
      var textSlot = this.slots("text");
      if (textSlot) {
        return textSlot;
      }
      if (this.text) {
        return h("span", {
          "class": bem$F("text")
        }, [this.text]);
      }
    },
    genContent: function genContent3() {
      var slot = this.slots();
      if (slot) {
        return slot;
      }
      return [this.genIcon(), this.getText()];
    }
  },
  render: function render46() {
    var _ref;
    var h = arguments[0];
    var _this$parent3 = this.parent, center = _this$parent3.center, border = _this$parent3.border, square = _this$parent3.square, gutter = _this$parent3.gutter, direction = _this$parent3.direction, clickable = _this$parent3.clickable;
    return h("div", {
      "class": [bem$F({
        square
      })],
      "style": this.style
    }, [h("div", {
      "style": this.contentStyle,
      "attrs": {
        "role": clickable ? "button" : null,
        "tabindex": clickable ? 0 : null
      },
      "class": [bem$F("content", [direction, {
        center,
        square,
        clickable,
        surround: border && gutter
      }]), (_ref = {}, _ref[BORDER] = border, _ref)],
      "on": {
        "click": this.onClick
      }
    }, [this.genContent()])]);
  }
});
var _createNamespace$F = createNamespace$1("image-preview"), createComponent$J = _createNamespace$F[0], bem$E = _createNamespace$F[1];
var _createNamespace$E = createNamespace$1("swipe"), createComponent$I = _createNamespace$E[0], bem$D = _createNamespace$E[1];
var Swipe = createComponent$I({
  mixins: [TouchMixin, ParentMixin("vanSwipe"), BindEventMixin(function(bind3, isBind) {
    bind3(window, "resize", this.resize, true);
    bind3(window, "orientationchange", this.resize, true);
    bind3(window, "visibilitychange", this.onVisibilityChange);
    if (isBind) {
      this.initialize();
    } else {
      this.clear();
    }
  })],
  props: {
    width: [Number, String],
    height: [Number, String],
    autoplay: [Number, String],
    vertical: Boolean,
    lazyRender: Boolean,
    indicatorColor: String,
    loop: {
      type: Boolean,
      default: true
    },
    duration: {
      type: [Number, String],
      default: 500
    },
    touchable: {
      type: Boolean,
      default: true
    },
    initialSwipe: {
      type: [Number, String],
      default: 0
    },
    showIndicators: {
      type: Boolean,
      default: true
    },
    stopPropagation: {
      type: Boolean,
      default: true
    }
  },
  data: function data25() {
    return {
      rect: null,
      offset: 0,
      active: 0,
      deltaX: 0,
      deltaY: 0,
      swiping: false,
      computedWidth: 0,
      computedHeight: 0
    };
  },
  watch: {
    children: function children2() {
      this.initialize();
    },
    initialSwipe: function initialSwipe() {
      this.initialize();
    },
    autoplay: function autoplay(_autoplay) {
      if (_autoplay > 0) {
        this.autoPlay();
      } else {
        this.clear();
      }
    }
  },
  computed: {
    count: function count4() {
      return this.children.length;
    },
    maxCount: function maxCount() {
      return Math.ceil(Math.abs(this.minOffset) / this.size);
    },
    delta: function delta() {
      return this.vertical ? this.deltaY : this.deltaX;
    },
    size: function size() {
      return this[this.vertical ? "computedHeight" : "computedWidth"];
    },
    trackSize: function trackSize() {
      return this.count * this.size;
    },
    activeIndicator: function activeIndicator() {
      return (this.active + this.count) % this.count;
    },
    isCorrectDirection: function isCorrectDirection() {
      var expect = this.vertical ? "vertical" : "horizontal";
      return this.direction === expect;
    },
    trackStyle: function trackStyle() {
      var style12 = {
        transitionDuration: (this.swiping ? 0 : this.duration) + "ms",
        transform: "translate" + (this.vertical ? "Y" : "X") + "(" + this.offset + "px)"
      };
      if (this.size) {
        var mainAxis = this.vertical ? "height" : "width";
        var crossAxis = this.vertical ? "width" : "height";
        style12[mainAxis] = this.trackSize + "px";
        style12[crossAxis] = this[crossAxis] ? this[crossAxis] + "px" : "";
      }
      return style12;
    },
    indicatorStyle: function indicatorStyle() {
      return {
        backgroundColor: this.indicatorColor
      };
    },
    minOffset: function minOffset() {
      return (this.vertical ? this.rect.height : this.rect.width) - this.size * this.count;
    }
  },
  mounted: function mounted10() {
    this.bindTouchEvent(this.$refs.track);
  },
  methods: {
    initialize: function initialize(active4) {
      if (active4 === void 0) {
        active4 = +this.initialSwipe;
      }
      if (!this.$el || isHidden(this.$el)) {
        return;
      }
      clearTimeout(this.timer);
      var rect = {
        width: this.$el.offsetWidth,
        height: this.$el.offsetHeight
      };
      this.rect = rect;
      this.swiping = true;
      this.active = active4;
      this.computedWidth = +this.width || rect.width;
      this.computedHeight = +this.height || rect.height;
      this.offset = this.getTargetOffset(active4);
      this.children.forEach(function(swipe) {
        swipe.offset = 0;
      });
      this.autoPlay();
    },
    resize: function resize2() {
      this.initialize(this.activeIndicator);
    },
    onVisibilityChange: function onVisibilityChange() {
      if (document.hidden) {
        this.clear();
      } else {
        this.autoPlay();
      }
    },
    onTouchStart: function onTouchStart2(event) {
      if (!this.touchable)
        return;
      this.clear();
      this.touchStartTime = Date.now();
      this.touchStart(event);
      this.correctPosition();
    },
    onTouchMove: function onTouchMove2(event) {
      if (!this.touchable || !this.swiping)
        return;
      this.touchMove(event);
      if (this.isCorrectDirection) {
        preventDefault(event, this.stopPropagation);
        this.move({
          offset: this.delta
        });
      }
    },
    onTouchEnd: function onTouchEnd3() {
      if (!this.touchable || !this.swiping)
        return;
      var size2 = this.size, delta2 = this.delta;
      var duration = Date.now() - this.touchStartTime;
      var speed = delta2 / duration;
      var shouldSwipe = Math.abs(speed) > 0.25 || Math.abs(delta2) > size2 / 2;
      if (shouldSwipe && this.isCorrectDirection) {
        var offset3 = this.vertical ? this.offsetY : this.offsetX;
        var pace = 0;
        if (this.loop) {
          pace = offset3 > 0 ? delta2 > 0 ? -1 : 1 : 0;
        } else {
          pace = -Math[delta2 > 0 ? "ceil" : "floor"](delta2 / size2);
        }
        this.move({
          pace,
          emitChange: true
        });
      } else if (delta2) {
        this.move({
          pace: 0
        });
      }
      this.swiping = false;
      this.autoPlay();
    },
    getTargetActive: function getTargetActive(pace) {
      var active4 = this.active, count6 = this.count, maxCount2 = this.maxCount;
      if (pace) {
        if (this.loop) {
          return range(active4 + pace, -1, count6);
        }
        return range(active4 + pace, 0, maxCount2);
      }
      return active4;
    },
    getTargetOffset: function getTargetOffset(targetActive, offset3) {
      if (offset3 === void 0) {
        offset3 = 0;
      }
      var currentPosition = targetActive * this.size;
      if (!this.loop) {
        currentPosition = Math.min(currentPosition, -this.minOffset);
      }
      var targetOffset = offset3 - currentPosition;
      if (!this.loop) {
        targetOffset = range(targetOffset, this.minOffset, 0);
      }
      return targetOffset;
    },
    move: function move(_ref) {
      var _ref$pace = _ref.pace, pace = _ref$pace === void 0 ? 0 : _ref$pace, _ref$offset = _ref.offset, offset3 = _ref$offset === void 0 ? 0 : _ref$offset, emitChange2 = _ref.emitChange;
      var loop = this.loop, count6 = this.count, active4 = this.active, children3 = this.children, trackSize2 = this.trackSize, minOffset2 = this.minOffset;
      if (count6 <= 1) {
        return;
      }
      var targetActive = this.getTargetActive(pace);
      var targetOffset = this.getTargetOffset(targetActive, offset3);
      if (loop) {
        if (children3[0] && targetOffset !== minOffset2) {
          var outRightBound = targetOffset < minOffset2;
          children3[0].offset = outRightBound ? trackSize2 : 0;
        }
        if (children3[count6 - 1] && targetOffset !== 0) {
          var outLeftBound = targetOffset > 0;
          children3[count6 - 1].offset = outLeftBound ? -trackSize2 : 0;
        }
      }
      this.active = targetActive;
      this.offset = targetOffset;
      if (emitChange2 && targetActive !== active4) {
        this.$emit("change", this.activeIndicator);
      }
    },
    prev: function prev2() {
      var _this = this;
      this.correctPosition();
      this.resetTouchStatus();
      doubleRaf(function() {
        _this.swiping = false;
        _this.move({
          pace: -1,
          emitChange: true
        });
      });
    },
    next: function next2() {
      var _this2 = this;
      this.correctPosition();
      this.resetTouchStatus();
      doubleRaf(function() {
        _this2.swiping = false;
        _this2.move({
          pace: 1,
          emitChange: true
        });
      });
    },
    swipeTo: function swipeTo(index2, options) {
      var _this3 = this;
      if (options === void 0) {
        options = {};
      }
      this.correctPosition();
      this.resetTouchStatus();
      doubleRaf(function() {
        var targetIndex;
        if (_this3.loop && index2 === _this3.count) {
          targetIndex = _this3.active === 0 ? 0 : index2;
        } else {
          targetIndex = index2 % _this3.count;
        }
        if (options.immediate) {
          doubleRaf(function() {
            _this3.swiping = false;
          });
        } else {
          _this3.swiping = false;
        }
        _this3.move({
          pace: targetIndex - _this3.active,
          emitChange: true
        });
      });
    },
    correctPosition: function correctPosition() {
      this.swiping = true;
      if (this.active <= -1) {
        this.move({
          pace: this.count
        });
      }
      if (this.active >= this.count) {
        this.move({
          pace: -this.count
        });
      }
    },
    clear: function clear() {
      clearTimeout(this.timer);
    },
    autoPlay: function autoPlay() {
      var _this4 = this;
      var autoplay2 = this.autoplay;
      if (autoplay2 > 0 && this.count > 1) {
        this.clear();
        this.timer = setTimeout(function() {
          _this4.next();
          _this4.autoPlay();
        }, autoplay2);
      }
    },
    genIndicator: function genIndicator() {
      var _this5 = this;
      var h = this.$createElement;
      var count6 = this.count, activeIndicator2 = this.activeIndicator;
      var slot = this.slots("indicator");
      if (slot) {
        return slot;
      }
      if (this.showIndicators && count6 > 1) {
        return h("div", {
          "class": bem$D("indicators", {
            vertical: this.vertical
          })
        }, [Array.apply(void 0, Array(count6)).map(function(empty, index2) {
          return h("i", {
            "class": bem$D("indicator", {
              active: index2 === activeIndicator2
            }),
            "style": index2 === activeIndicator2 ? _this5.indicatorStyle : null
          });
        })]);
      }
    }
  },
  render: function render47() {
    var h = arguments[0];
    return h("div", {
      "class": bem$D()
    }, [h("div", {
      "ref": "track",
      "style": this.trackStyle,
      "class": bem$D("track", {
        vertical: this.vertical
      })
    }, [this.slots()]), this.genIndicator()]);
  }
});
var _createNamespace$D = createNamespace$1("swipe-item"), createComponent$H = _createNamespace$D[0], bem$C = _createNamespace$D[1];
var SwipeItem = createComponent$H({
  mixins: [ChildrenMixin("vanSwipe")],
  data: function data26() {
    return {
      offset: 0,
      inited: false,
      mounted: false
    };
  },
  mounted: function mounted11() {
    var _this = this;
    this.$nextTick(function() {
      _this.mounted = true;
    });
  },
  computed: {
    style: function style11() {
      var style12 = {};
      var _this$parent = this.parent, size2 = _this$parent.size, vertical2 = _this$parent.vertical;
      if (size2) {
        style12[vertical2 ? "height" : "width"] = size2 + "px";
      }
      if (this.offset) {
        style12.transform = "translate" + (vertical2 ? "Y" : "X") + "(" + this.offset + "px)";
      }
      return style12;
    },
    shouldRender: function shouldRender2() {
      var index2 = this.index, inited2 = this.inited, parent = this.parent, mounted25 = this.mounted;
      if (!parent.lazyRender || inited2) {
        return true;
      }
      if (!mounted25) {
        return false;
      }
      var active4 = parent.activeIndicator;
      var maxActive = parent.count - 1;
      var prevActive = active4 === 0 && parent.loop ? maxActive : active4 - 1;
      var nextActive = active4 === maxActive && parent.loop ? 0 : active4 + 1;
      var shouldRender3 = index2 === active4 || index2 === prevActive || index2 === nextActive;
      if (shouldRender3) {
        this.inited = true;
      }
      return shouldRender3;
    }
  },
  render: function render48() {
    var h = arguments[0];
    return h("div", {
      "class": bem$C(),
      "style": this.style,
      "on": _extends$1({}, this.$listeners)
    }, [this.shouldRender && this.slots()]);
  }
});
function getDistance(touches) {
  return Math.sqrt(Math.pow(touches[0].clientX - touches[1].clientX, 2) + Math.pow(touches[0].clientY - touches[1].clientY, 2));
}
var ImagePreviewItem = {
  mixins: [TouchMixin],
  props: {
    src: String,
    show: Boolean,
    active: Number,
    minZoom: [Number, String],
    maxZoom: [Number, String],
    rootWidth: Number,
    rootHeight: Number
  },
  data: function data27() {
    return {
      scale: 1,
      moveX: 0,
      moveY: 0,
      moving: false,
      zooming: false,
      imageRatio: 0,
      displayWidth: 0,
      displayHeight: 0
    };
  },
  computed: {
    vertical: function vertical() {
      var rootWidth = this.rootWidth, rootHeight = this.rootHeight;
      var rootRatio = rootHeight / rootWidth;
      return this.imageRatio > rootRatio;
    },
    imageStyle: function imageStyle() {
      var scale = this.scale;
      var style12 = {
        transitionDuration: this.zooming || this.moving ? "0s" : ".3s"
      };
      if (scale !== 1) {
        var offsetX = this.moveX / scale;
        var offsetY = this.moveY / scale;
        style12.transform = "scale(" + scale + ", " + scale + ") translate(" + offsetX + "px, " + offsetY + "px)";
      }
      return style12;
    },
    maxMoveX: function maxMoveX() {
      if (this.imageRatio) {
        var displayWidth = this.vertical ? this.rootHeight / this.imageRatio : this.rootWidth;
        return Math.max(0, (this.scale * displayWidth - this.rootWidth) / 2);
      }
      return 0;
    },
    maxMoveY: function maxMoveY() {
      if (this.imageRatio) {
        var displayHeight = this.vertical ? this.rootHeight : this.rootWidth * this.imageRatio;
        return Math.max(0, (this.scale * displayHeight - this.rootHeight) / 2);
      }
      return 0;
    }
  },
  watch: {
    active: "resetScale",
    show: function show2(val) {
      if (!val) {
        this.resetScale();
      }
    }
  },
  mounted: function mounted12() {
    this.bindTouchEvent(this.$el);
  },
  methods: {
    resetScale: function resetScale() {
      this.setScale(1);
      this.moveX = 0;
      this.moveY = 0;
    },
    setScale: function setScale(scale) {
      scale = range(scale, +this.minZoom, +this.maxZoom);
      if (scale !== this.scale) {
        this.scale = scale;
        this.$emit("scale", {
          scale: this.scale,
          index: this.active
        });
      }
    },
    toggleScale: function toggleScale() {
      var scale = this.scale > 1 ? 1 : 2;
      this.setScale(scale);
      this.moveX = 0;
      this.moveY = 0;
    },
    onTouchStart: function onTouchStart3(event) {
      var touches = event.touches;
      var _this$offsetX = this.offsetX, offsetX = _this$offsetX === void 0 ? 0 : _this$offsetX;
      this.touchStart(event);
      this.touchStartTime = new Date();
      this.fingerNum = touches.length;
      this.startMoveX = this.moveX;
      this.startMoveY = this.moveY;
      this.moving = this.fingerNum === 1 && this.scale !== 1;
      this.zooming = this.fingerNum === 2 && !offsetX;
      if (this.zooming) {
        this.startScale = this.scale;
        this.startDistance = getDistance(event.touches);
      }
    },
    onTouchMove: function onTouchMove3(event) {
      var touches = event.touches;
      this.touchMove(event);
      if (this.moving || this.zooming) {
        preventDefault(event, true);
      }
      if (this.moving) {
        var moveX = this.deltaX + this.startMoveX;
        var moveY = this.deltaY + this.startMoveY;
        this.moveX = range(moveX, -this.maxMoveX, this.maxMoveX);
        this.moveY = range(moveY, -this.maxMoveY, this.maxMoveY);
      }
      if (this.zooming && touches.length === 2) {
        var distance = getDistance(touches);
        var scale = this.startScale * distance / this.startDistance;
        this.setScale(scale);
      }
    },
    onTouchEnd: function onTouchEnd4(event) {
      var stopPropagation2 = false;
      if (this.moving || this.zooming) {
        stopPropagation2 = true;
        if (this.moving && this.startMoveX === this.moveX && this.startMoveY === this.moveY) {
          stopPropagation2 = false;
        }
        if (!event.touches.length) {
          if (this.zooming) {
            this.moveX = range(this.moveX, -this.maxMoveX, this.maxMoveX);
            this.moveY = range(this.moveY, -this.maxMoveY, this.maxMoveY);
            this.zooming = false;
          }
          this.moving = false;
          this.startMoveX = 0;
          this.startMoveY = 0;
          this.startScale = 1;
          if (this.scale < 1) {
            this.resetScale();
          }
        }
      }
      preventDefault(event, stopPropagation2);
      this.checkTap();
      this.resetTouchStatus();
    },
    checkTap: function checkTap() {
      var _this = this;
      if (this.fingerNum > 1) {
        return;
      }
      var _this$offsetX2 = this.offsetX, offsetX = _this$offsetX2 === void 0 ? 0 : _this$offsetX2, _this$offsetY = this.offsetY, offsetY = _this$offsetY === void 0 ? 0 : _this$offsetY;
      var deltaTime = new Date() - this.touchStartTime;
      var TAP_TIME = 250;
      var TAP_OFFSET = 5;
      if (offsetX < TAP_OFFSET && offsetY < TAP_OFFSET && deltaTime < TAP_TIME) {
        if (this.doubleTapTimer) {
          clearTimeout(this.doubleTapTimer);
          this.doubleTapTimer = null;
          this.toggleScale();
        } else {
          this.doubleTapTimer = setTimeout(function() {
            _this.$emit("close");
            _this.doubleTapTimer = null;
          }, TAP_TIME);
        }
      }
    },
    onLoad: function onLoad2(event) {
      var _event$target = event.target, naturalWidth = _event$target.naturalWidth, naturalHeight = _event$target.naturalHeight;
      this.imageRatio = naturalHeight / naturalWidth;
    }
  },
  render: function render49() {
    var h = arguments[0];
    var imageSlots = {
      loading: function loading() {
        return h(Loading$1, {
          "attrs": {
            "type": "spinner"
          }
        });
      }
    };
    return h(SwipeItem, {
      "class": bem$E("swipe-item")
    }, [h(Image, {
      "attrs": {
        "src": this.src,
        "fit": "contain"
      },
      "class": bem$E("image", {
        vertical: this.vertical
      }),
      "style": this.imageStyle,
      "scopedSlots": imageSlots,
      "on": {
        "load": this.onLoad
      }
    })]);
  }
};
var VueImagePreview = createComponent$J({
  mixins: [TouchMixin, PopupMixin({
    skipToggleEvent: true
  }), BindEventMixin(function(bind3) {
    bind3(window, "resize", this.resize, true);
    bind3(window, "orientationchange", this.resize, true);
  })],
  props: {
    className: null,
    closeable: Boolean,
    asyncClose: Boolean,
    overlayStyle: Object,
    showIndicators: Boolean,
    images: {
      type: Array,
      default: function _default20() {
        return [];
      }
    },
    loop: {
      type: Boolean,
      default: true
    },
    overlay: {
      type: Boolean,
      default: true
    },
    minZoom: {
      type: [Number, String],
      default: 1 / 3
    },
    maxZoom: {
      type: [Number, String],
      default: 3
    },
    transition: {
      type: String,
      default: "van-fade"
    },
    showIndex: {
      type: Boolean,
      default: true
    },
    swipeDuration: {
      type: [Number, String],
      default: 300
    },
    startPosition: {
      type: [Number, String],
      default: 0
    },
    overlayClass: {
      type: String,
      default: bem$E("overlay")
    },
    closeIcon: {
      type: String,
      default: "clear"
    },
    closeOnPopstate: {
      type: Boolean,
      default: true
    },
    closeIconPosition: {
      type: String,
      default: "top-right"
    }
  },
  data: function data28() {
    return {
      active: 0,
      rootWidth: 0,
      rootHeight: 0,
      doubleClickTimer: null
    };
  },
  mounted: function mounted13() {
    this.resize();
  },
  watch: {
    startPosition: "setActive",
    value: function value10(val) {
      var _this = this;
      if (val) {
        this.setActive(+this.startPosition);
        this.$nextTick(function() {
          _this.resize();
          _this.$refs.swipe.swipeTo(+_this.startPosition, {
            immediate: true
          });
        });
      } else {
        this.$emit("close", {
          index: this.active,
          url: this.images[this.active]
        });
      }
    }
  },
  methods: {
    resize: function resize3() {
      if (this.$el && this.$el.getBoundingClientRect) {
        var rect = this.$el.getBoundingClientRect();
        this.rootWidth = rect.width;
        this.rootHeight = rect.height;
      }
    },
    emitClose: function emitClose() {
      if (!this.asyncClose) {
        this.$emit("input", false);
      }
    },
    emitScale: function emitScale(args) {
      this.$emit("scale", args);
    },
    setActive: function setActive(active4) {
      if (active4 !== this.active) {
        this.active = active4;
        this.$emit("change", active4);
      }
    },
    genIndex: function genIndex() {
      var h = this.$createElement;
      if (this.showIndex) {
        return h("div", {
          "class": bem$E("index")
        }, [this.slots("index", {
          index: this.active
        }) || this.active + 1 + " / " + this.images.length]);
      }
    },
    genCover: function genCover() {
      var h = this.$createElement;
      var cover = this.slots("cover");
      if (cover) {
        return h("div", {
          "class": bem$E("cover")
        }, [cover]);
      }
    },
    genImages: function genImages() {
      var _this2 = this;
      var h = this.$createElement;
      return h(Swipe, {
        "ref": "swipe",
        "attrs": {
          "lazyRender": true,
          "loop": this.loop,
          "duration": this.swipeDuration,
          "initialSwipe": this.startPosition,
          "showIndicators": this.showIndicators,
          "indicatorColor": "white"
        },
        "class": bem$E("swipe"),
        "on": {
          "change": this.setActive
        }
      }, [this.images.map(function(image) {
        return h(ImagePreviewItem, {
          "attrs": {
            "src": image,
            "show": _this2.value,
            "active": _this2.active,
            "maxZoom": _this2.maxZoom,
            "minZoom": _this2.minZoom,
            "rootWidth": _this2.rootWidth,
            "rootHeight": _this2.rootHeight
          },
          "on": {
            "scale": _this2.emitScale,
            "close": _this2.emitClose
          }
        });
      })]);
    },
    genClose: function genClose() {
      var h = this.$createElement;
      if (this.closeable) {
        return h(Icon$1, {
          "attrs": {
            "role": "button",
            "name": this.closeIcon
          },
          "class": bem$E("close-icon", this.closeIconPosition),
          "on": {
            "click": this.emitClose
          }
        });
      }
    },
    onClosed: function onClosed2() {
      this.$emit("closed");
    },
    swipeTo: function swipeTo2(index2, options) {
      if (this.$refs.swipe) {
        this.$refs.swipe.swipeTo(index2, options);
      }
    }
  },
  render: function render50() {
    var h = arguments[0];
    return h("transition", {
      "attrs": {
        "name": this.transition
      },
      "on": {
        "afterLeave": this.onClosed
      }
    }, [this.shouldRender ? h("div", {
      "directives": [{
        name: "show",
        value: this.value
      }],
      "class": [bem$E(), this.className]
    }, [this.genClose(), this.genImages(), this.genIndex(), this.genCover()]) : null]);
  }
});
var instance$1;
var defaultConfig = {
  loop: true,
  value: true,
  images: [],
  maxZoom: 3,
  minZoom: 1 / 3,
  onClose: null,
  onChange: null,
  className: "",
  showIndex: true,
  closeable: false,
  closeIcon: "clear",
  asyncClose: false,
  transition: "van-fade",
  getContainer: "body",
  overlayStyle: null,
  startPosition: 0,
  swipeDuration: 300,
  showIndicators: false,
  closeOnPopstate: true,
  closeIconPosition: "top-right"
};
var initInstance = function initInstance2() {
  instance$1 = new (Vue.extend(VueImagePreview))({
    el: document.createElement("div")
  });
  document.body.appendChild(instance$1.$el);
  instance$1.$on("change", function(index2) {
    if (instance$1.onChange) {
      instance$1.onChange(index2);
    }
  });
  instance$1.$on("scale", function(data49) {
    if (instance$1.onScale) {
      instance$1.onScale(data49);
    }
  });
};
var ImagePreview = function ImagePreview2(images, startPosition) {
  if (startPosition === void 0) {
    startPosition = 0;
  }
  if (isServer$1) {
    return;
  }
  if (!instance$1) {
    initInstance();
  }
  var options = Array.isArray(images) ? {
    images,
    startPosition
  } : images;
  _extends$1(instance$1, defaultConfig, options);
  instance$1.$once("input", function(show5) {
    instance$1.value = show5;
  });
  instance$1.$once("closed", function() {
    instance$1.images = [];
  });
  if (options.onClose) {
    instance$1.$off("close");
    instance$1.$once("close", options.onClose);
  }
  return instance$1;
};
ImagePreview.Component = VueImagePreview;
ImagePreview.install = function() {
  Vue.use(VueImagePreview);
};
var ImagePreview$1 = ImagePreview;
var _createNamespace$C = createNamespace$1("index-anchor"), createComponent$G = _createNamespace$C[0], bem$B = _createNamespace$C[1];
var IndexAnchor = createComponent$G({
  mixins: [ChildrenMixin("vanIndexBar", {
    indexKey: "childrenIndex"
  })],
  props: {
    index: [Number, String]
  },
  data: function data29() {
    return {
      top: 0,
      left: null,
      rect: {
        top: 0,
        height: 0
      },
      width: null,
      active: false
    };
  },
  computed: {
    sticky: function sticky() {
      return this.active && this.parent.sticky;
    },
    anchorStyle: function anchorStyle() {
      if (this.sticky) {
        return {
          zIndex: "" + this.parent.zIndex,
          left: this.left ? this.left + "px" : null,
          width: this.width ? this.width + "px" : null,
          transform: "translate3d(0, " + this.top + "px, 0)",
          color: this.parent.highlightColor
        };
      }
    }
  },
  mounted: function mounted14() {
    var rect = this.$el.getBoundingClientRect();
    this.rect.height = rect.height;
  },
  methods: {
    scrollIntoView: function scrollIntoView4() {
      this.$el.scrollIntoView();
    },
    getRect: function getRect(scroller2, scrollerRect) {
      var el = this.$el;
      var elRect = el.getBoundingClientRect();
      this.rect.height = elRect.height;
      if (scroller2 === window || scroller2 === document.body) {
        this.rect.top = elRect.top + getRootScrollTop();
      } else {
        this.rect.top = elRect.top + getScrollTop(scroller2) - scrollerRect.top;
      }
      return this.rect;
    }
  },
  render: function render51() {
    var _ref;
    var h = arguments[0];
    var sticky2 = this.sticky;
    return h("div", {
      "style": {
        height: sticky2 ? this.rect.height + "px" : null
      }
    }, [h("div", {
      "style": this.anchorStyle,
      "class": [bem$B({
        sticky: sticky2
      }), (_ref = {}, _ref[BORDER_BOTTOM] = sticky2, _ref)]
    }, [this.slots("default") || this.index])]);
  }
});
function genAlphabet() {
  var indexList2 = [];
  var charCodeOfA = "A".charCodeAt(0);
  for (var i = 0; i < 26; i++) {
    indexList2.push(String.fromCharCode(charCodeOfA + i));
  }
  return indexList2;
}
var _createNamespace$B = createNamespace$1("index-bar"), createComponent$F = _createNamespace$B[0], bem$A = _createNamespace$B[1];
var IndexBar = createComponent$F({
  mixins: [TouchMixin, ParentMixin("vanIndexBar"), BindEventMixin(function(bind3) {
    if (!this.scroller) {
      this.scroller = getScroller(this.$el);
    }
    bind3(this.scroller, "scroll", this.onScroll);
  })],
  props: {
    zIndex: [Number, String],
    highlightColor: String,
    sticky: {
      type: Boolean,
      default: true
    },
    stickyOffsetTop: {
      type: Number,
      default: 0
    },
    indexList: {
      type: Array,
      default: genAlphabet
    }
  },
  data: function data30() {
    return {
      activeAnchorIndex: null
    };
  },
  computed: {
    sidebarStyle: function sidebarStyle() {
      if (isDef(this.zIndex)) {
        return {
          zIndex: this.zIndex + 1
        };
      }
    },
    highlightStyle: function highlightStyle() {
      var highlightColor = this.highlightColor;
      if (highlightColor) {
        return {
          color: highlightColor
        };
      }
    }
  },
  watch: {
    indexList: function indexList() {
      this.$nextTick(this.onScroll);
    },
    activeAnchorIndex: function activeAnchorIndex(value17) {
      if (value17) {
        this.$emit("change", value17);
      }
    }
  },
  methods: {
    onScroll: function onScroll5() {
      var _this = this;
      if (isHidden(this.$el)) {
        return;
      }
      var scrollTop = getScrollTop(this.scroller);
      var scrollerRect = this.getScrollerRect();
      var rects = this.children.map(function(item) {
        return item.getRect(_this.scroller, scrollerRect);
      });
      var active4 = this.getActiveAnchorIndex(scrollTop, rects);
      this.activeAnchorIndex = this.indexList[active4];
      if (this.sticky) {
        this.children.forEach(function(item, index2) {
          if (index2 === active4 || index2 === active4 - 1) {
            var rect = item.$el.getBoundingClientRect();
            item.left = rect.left;
            item.width = rect.width;
          } else {
            item.left = null;
            item.width = null;
          }
          if (index2 === active4) {
            item.active = true;
            item.top = Math.max(_this.stickyOffsetTop, rects[index2].top - scrollTop) + scrollerRect.top;
          } else if (index2 === active4 - 1) {
            var activeItemTop = rects[active4].top - scrollTop;
            item.active = activeItemTop > 0;
            item.top = activeItemTop + scrollerRect.top - rects[index2].height;
          } else {
            item.active = false;
          }
        });
      }
    },
    getScrollerRect: function getScrollerRect() {
      if (this.scroller.getBoundingClientRect) {
        return this.scroller.getBoundingClientRect();
      }
      return {
        top: 0,
        left: 0
      };
    },
    getActiveAnchorIndex: function getActiveAnchorIndex(scrollTop, rects) {
      for (var i = this.children.length - 1; i >= 0; i--) {
        var prevHeight = i > 0 ? rects[i - 1].height : 0;
        var reachTop = this.sticky ? prevHeight + this.stickyOffsetTop : 0;
        if (scrollTop + reachTop >= rects[i].top) {
          return i;
        }
      }
      return -1;
    },
    onClick: function onClick12(event) {
      this.scrollToElement(event.target);
    },
    onTouchMove: function onTouchMove4(event) {
      this.touchMove(event);
      if (this.direction === "vertical") {
        preventDefault(event);
        var _event$touches$ = event.touches[0], clientX = _event$touches$.clientX, clientY = _event$touches$.clientY;
        var target2 = document.elementFromPoint(clientX, clientY);
        if (target2) {
          var index2 = target2.dataset.index;
          if (this.touchActiveIndex !== index2) {
            this.touchActiveIndex = index2;
            this.scrollToElement(target2);
          }
        }
      }
    },
    scrollTo: function scrollTo2(index2) {
      var match = this.children.filter(function(item) {
        return String(item.index) === index2;
      });
      if (match[0]) {
        match[0].scrollIntoView();
        if (this.sticky && this.stickyOffsetTop) {
          setRootScrollTop(getRootScrollTop() - this.stickyOffsetTop);
        }
        this.$emit("select", match[0].index);
      }
    },
    scrollToElement: function scrollToElement(element) {
      var index2 = element.dataset.index;
      this.scrollTo(index2);
    },
    onTouchEnd: function onTouchEnd5() {
      this.active = null;
    }
  },
  render: function render52() {
    var _this2 = this;
    var h = arguments[0];
    var Indexes = this.indexList.map(function(index2) {
      var active4 = index2 === _this2.activeAnchorIndex;
      return h("span", {
        "class": bem$A("index", {
          active: active4
        }),
        "style": active4 ? _this2.highlightStyle : null,
        "attrs": {
          "data-index": index2
        }
      }, [index2]);
    });
    return h("div", {
      "class": bem$A()
    }, [h("div", {
      "class": bem$A("sidebar"),
      "style": this.sidebarStyle,
      "on": {
        "click": this.onClick,
        "touchstart": this.touchStart,
        "touchmove": this.onTouchMove,
        "touchend": this.onTouchEnd,
        "touchcancel": this.onTouchEnd
      }
    }, [Indexes]), this.slots("default")]);
  }
});
var _createNamespace$A = createNamespace$1("list"), createComponent$E = _createNamespace$A[0], bem$z = _createNamespace$A[1], t$e = _createNamespace$A[2];
var List = createComponent$E({
  mixins: [BindEventMixin(function(bind3) {
    if (!this.scroller) {
      this.scroller = getScroller(this.$el);
    }
    bind3(this.scroller, "scroll", this.check);
  })],
  model: {
    prop: "loading"
  },
  props: {
    error: Boolean,
    loading: Boolean,
    finished: Boolean,
    errorText: String,
    loadingText: String,
    finishedText: String,
    immediateCheck: {
      type: Boolean,
      default: true
    },
    offset: {
      type: [Number, String],
      default: 300
    },
    direction: {
      type: String,
      default: "down"
    }
  },
  data: function data31() {
    return {
      innerLoading: this.loading
    };
  },
  updated: function updated3() {
    this.innerLoading = this.loading;
  },
  mounted: function mounted15() {
    if (this.immediateCheck) {
      this.check();
    }
  },
  watch: {
    loading: "check",
    finished: "check"
  },
  methods: {
    check: function check() {
      var _this = this;
      this.$nextTick(function() {
        if (_this.innerLoading || _this.finished || _this.error) {
          return;
        }
        var el = _this.$el, scroller2 = _this.scroller, offset3 = _this.offset, direction = _this.direction;
        var scrollerRect;
        if (scroller2.getBoundingClientRect) {
          scrollerRect = scroller2.getBoundingClientRect();
        } else {
          scrollerRect = {
            top: 0,
            bottom: scroller2.innerHeight
          };
        }
        var scrollerHeight = scrollerRect.bottom - scrollerRect.top;
        if (!scrollerHeight || isHidden(el)) {
          return false;
        }
        var isReachEdge = false;
        var placeholderRect = _this.$refs.placeholder.getBoundingClientRect();
        if (direction === "up") {
          isReachEdge = scrollerRect.top - placeholderRect.top <= offset3;
        } else {
          isReachEdge = placeholderRect.bottom - scrollerRect.bottom <= offset3;
        }
        if (isReachEdge) {
          _this.innerLoading = true;
          _this.$emit("input", true);
          _this.$emit("load");
        }
      });
    },
    clickErrorText: function clickErrorText() {
      this.$emit("update:error", false);
      this.check();
    },
    genLoading: function genLoading2() {
      var h = this.$createElement;
      if (this.innerLoading && !this.finished) {
        return h("div", {
          "key": "loading",
          "class": bem$z("loading")
        }, [this.slots("loading") || h(Loading$1, {
          "attrs": {
            "size": "16"
          }
        }, [this.loadingText || t$e("loading")])]);
      }
    },
    genFinishedText: function genFinishedText() {
      var h = this.$createElement;
      if (this.finished) {
        var text2 = this.slots("finished") || this.finishedText;
        if (text2) {
          return h("div", {
            "class": bem$z("finished-text")
          }, [text2]);
        }
      }
    },
    genErrorText: function genErrorText() {
      var h = this.$createElement;
      if (this.error) {
        var text2 = this.slots("error") || this.errorText;
        if (text2) {
          return h("div", {
            "on": {
              "click": this.clickErrorText
            },
            "class": bem$z("error-text")
          }, [text2]);
        }
      }
    }
  },
  render: function render53() {
    var h = arguments[0];
    var Placeholder = h("div", {
      "ref": "placeholder",
      "key": "placeholder",
      "class": bem$z("placeholder")
    });
    return h("div", {
      "class": bem$z(),
      "attrs": {
        "role": "feed",
        "aria-busy": this.innerLoading
      }
    }, [this.direction === "down" ? this.slots() : Placeholder, this.genLoading(), this.genFinishedText(), this.genErrorText(), this.direction === "up" ? this.slots() : Placeholder]);
  }
});
var _createNamespace$z = createNamespace$1("nav-bar"), createComponent$D = _createNamespace$z[0], bem$y = _createNamespace$z[1];
var NavBar = createComponent$D({
  props: {
    title: String,
    fixed: Boolean,
    zIndex: [Number, String],
    leftText: String,
    rightText: String,
    leftArrow: Boolean,
    placeholder: Boolean,
    safeAreaInsetTop: Boolean,
    border: {
      type: Boolean,
      default: true
    }
  },
  data: function data32() {
    return {
      height: null
    };
  },
  mounted: function mounted16() {
    var _this = this;
    if (this.placeholder && this.fixed) {
      var setHeight = function setHeight2() {
        _this.height = _this.$refs.navBar.getBoundingClientRect().height;
      };
      setHeight();
      setTimeout(setHeight, 100);
    }
  },
  methods: {
    genLeft: function genLeft() {
      var h = this.$createElement;
      var leftSlot = this.slots("left");
      if (leftSlot) {
        return leftSlot;
      }
      return [this.leftArrow && h(Icon$1, {
        "class": bem$y("arrow"),
        "attrs": {
          "name": "arrow-left"
        }
      }), this.leftText && h("span", {
        "class": bem$y("text")
      }, [this.leftText])];
    },
    genRight: function genRight() {
      var h = this.$createElement;
      var rightSlot = this.slots("right");
      if (rightSlot) {
        return rightSlot;
      }
      if (this.rightText) {
        return h("span", {
          "class": bem$y("text")
        }, [this.rightText]);
      }
    },
    genNavBar: function genNavBar() {
      var _ref;
      var h = this.$createElement;
      return h("div", {
        "ref": "navBar",
        "style": {
          zIndex: this.zIndex
        },
        "class": [bem$y({
          fixed: this.fixed,
          "safe-area-inset-top": this.safeAreaInsetTop
        }), (_ref = {}, _ref[BORDER_BOTTOM] = this.border, _ref)]
      }, [h("div", {
        "class": bem$y("content")
      }, [this.hasLeft() && h("div", {
        "class": bem$y("left"),
        "on": {
          "click": this.onClickLeft
        }
      }, [this.genLeft()]), h("div", {
        "class": [bem$y("title"), "van-ellipsis"]
      }, [this.slots("title") || this.title]), this.hasRight() && h("div", {
        "class": bem$y("right"),
        "on": {
          "click": this.onClickRight
        }
      }, [this.genRight()])])]);
    },
    hasLeft: function hasLeft() {
      return this.leftArrow || this.leftText || this.slots("left");
    },
    hasRight: function hasRight() {
      return this.rightText || this.slots("right");
    },
    onClickLeft: function onClickLeft(event) {
      this.$emit("click-left", event);
    },
    onClickRight: function onClickRight(event) {
      this.$emit("click-right", event);
    }
  },
  render: function render54() {
    var h = arguments[0];
    if (this.placeholder && this.fixed) {
      return h("div", {
        "class": bem$y("placeholder"),
        "style": {
          height: this.height + "px"
        }
      }, [this.genNavBar()]);
    }
    return this.genNavBar();
  }
});
var _createNamespace$y = createNamespace$1("notice-bar"), createComponent$C = _createNamespace$y[0], bem$x = _createNamespace$y[1];
var NoticeBar = createComponent$C({
  mixins: [BindEventMixin(function(bind3) {
    bind3(window, "pageshow", this.reset);
  })],
  inject: {
    vanPopup: {
      default: null
    }
  },
  props: {
    text: String,
    mode: String,
    color: String,
    leftIcon: String,
    wrapable: Boolean,
    background: String,
    scrollable: {
      type: Boolean,
      default: null
    },
    delay: {
      type: [Number, String],
      default: 1
    },
    speed: {
      type: [Number, String],
      default: 60
    }
  },
  data: function data33() {
    return {
      show: true,
      offset: 0,
      duration: 0,
      wrapWidth: 0,
      contentWidth: 0
    };
  },
  watch: {
    scrollable: "reset",
    text: {
      handler: "reset",
      immediate: true
    }
  },
  created: function created8() {
    if (this.vanPopup) {
      this.vanPopup.onReopen(this.reset);
    }
  },
  activated: function activated4() {
    this.reset();
  },
  methods: {
    onClickIcon: function onClickIcon(event) {
      if (this.mode === "closeable") {
        this.show = false;
        this.$emit("close", event);
      }
    },
    onTransitionEnd: function onTransitionEnd3() {
      var _this = this;
      this.offset = this.wrapWidth;
      this.duration = 0;
      raf(function() {
        doubleRaf(function() {
          _this.offset = -_this.contentWidth;
          _this.duration = (_this.contentWidth + _this.wrapWidth) / _this.speed;
          _this.$emit("replay");
        });
      });
    },
    start: function start2() {
      this.reset();
    },
    reset: function reset4() {
      var _this2 = this;
      var delay = isDef(this.delay) ? this.delay * 1e3 : 0;
      this.offset = 0;
      this.duration = 0;
      this.wrapWidth = 0;
      this.contentWidth = 0;
      clearTimeout(this.startTimer);
      this.startTimer = setTimeout(function() {
        var _this2$$refs = _this2.$refs, wrap = _this2$$refs.wrap, content = _this2$$refs.content;
        if (!wrap || !content || _this2.scrollable === false) {
          return;
        }
        var wrapWidth = wrap.getBoundingClientRect().width;
        var contentWidth = content.getBoundingClientRect().width;
        if (_this2.scrollable || contentWidth > wrapWidth) {
          doubleRaf(function() {
            _this2.offset = -contentWidth;
            _this2.duration = contentWidth / _this2.speed;
            _this2.wrapWidth = wrapWidth;
            _this2.contentWidth = contentWidth;
          });
        }
      }, delay);
    }
  },
  render: function render55() {
    var _this3 = this;
    var h = arguments[0];
    var slots4 = this.slots, mode = this.mode, leftIcon = this.leftIcon, onClickIcon2 = this.onClickIcon;
    var barStyle2 = {
      color: this.color,
      background: this.background
    };
    var contentStyle2 = {
      transform: this.offset ? "translateX(" + this.offset + "px)" : "",
      transitionDuration: this.duration + "s"
    };
    function LeftIcon() {
      var slot = slots4("left-icon");
      if (slot) {
        return slot;
      }
      if (leftIcon) {
        return h(Icon$1, {
          "class": bem$x("left-icon"),
          "attrs": {
            "name": leftIcon
          }
        });
      }
    }
    function RightIcon() {
      var slot = slots4("right-icon");
      if (slot) {
        return slot;
      }
      var iconName;
      if (mode === "closeable") {
        iconName = "cross";
      } else if (mode === "link") {
        iconName = "arrow";
      }
      if (iconName) {
        return h(Icon$1, {
          "class": bem$x("right-icon"),
          "attrs": {
            "name": iconName
          },
          "on": {
            "click": onClickIcon2
          }
        });
      }
    }
    return h("div", {
      "attrs": {
        "role": "alert"
      },
      "directives": [{
        name: "show",
        value: this.show
      }],
      "class": bem$x({
        wrapable: this.wrapable
      }),
      "style": barStyle2,
      "on": {
        "click": function click(event) {
          _this3.$emit("click", event);
        }
      }
    }, [LeftIcon(), h("div", {
      "ref": "wrap",
      "class": bem$x("wrap"),
      "attrs": {
        "role": "marquee"
      }
    }, [h("div", {
      "ref": "content",
      "class": [bem$x("content"), {
        "van-ellipsis": this.scrollable === false && !this.wrapable
      }],
      "style": contentStyle2,
      "on": {
        "transitionend": this.onTransitionEnd
      }
    }, [this.slots() || this.text])]), RightIcon()]);
  }
});
var _createNamespace$x = createNamespace$1("notify"), createComponent$B = _createNamespace$x[0], bem$w = _createNamespace$x[1];
function Notify$1(h, props2, slots4, ctx) {
  var style12 = {
    color: props2.color,
    background: props2.background
  };
  return h(Popup, helper([{
    "attrs": {
      "value": props2.value,
      "position": "top",
      "overlay": false,
      "duration": 0.2,
      "lockScroll": false
    },
    "style": style12,
    "class": [bem$w([props2.type]), props2.className]
  }, inherit(ctx, true)]), [(slots4.default == null ? void 0 : slots4.default()) || props2.message]);
}
Notify$1.props = _extends$1({}, popupMixinProps, {
  color: String,
  message: [Number, String],
  duration: [Number, String],
  className: null,
  background: String,
  getContainer: [String, Function],
  type: {
    type: String,
    default: "danger"
  }
});
var VanNotify = createComponent$B(Notify$1);
var timer;
var instance;
function parseOptions(message) {
  return isObject(message) ? message : {
    message
  };
}
function Notify(options) {
  if (isServer$1) {
    return;
  }
  if (!instance) {
    instance = mount(VanNotify, {
      on: {
        click: function click(event) {
          if (instance.onClick) {
            instance.onClick(event);
          }
        },
        close: function close2() {
          if (instance.onClose) {
            instance.onClose();
          }
        },
        opened: function opened2() {
          if (instance.onOpened) {
            instance.onOpened();
          }
        }
      }
    });
  }
  options = _extends$1({}, Notify.currentOptions, parseOptions(options));
  _extends$1(instance, options);
  clearTimeout(timer);
  if (options.duration && options.duration > 0) {
    timer = setTimeout(Notify.clear, options.duration);
  }
  return instance;
}
function defaultOptions() {
  return {
    type: "danger",
    value: true,
    message: "",
    color: void 0,
    background: void 0,
    duration: 3e3,
    className: "",
    onClose: null,
    onClick: null,
    onOpened: null
  };
}
Notify.clear = function() {
  if (instance) {
    instance.value = false;
  }
};
Notify.currentOptions = defaultOptions();
Notify.setDefaultOptions = function(options) {
  _extends$1(Notify.currentOptions, options);
};
Notify.resetDefaultOptions = function() {
  Notify.currentOptions = defaultOptions();
};
Notify.install = function() {
  Vue.use(VanNotify);
};
Notify.Component = VanNotify;
Vue.prototype.$notify = Notify;
var DeleteIcon = {
  render: function render56() {
    var h = arguments[0];
    return h("svg", {
      "attrs": {
        "viewBox": "0 0 32 22",
        "xmlns": "http://www.w3.org/2000/svg"
      }
    }, [h("path", {
      "attrs": {
        "d": "M28.016 0A3.991 3.991 0 0132 3.987v14.026c0 2.2-1.787 3.987-3.98 3.987H10.382c-.509 0-.996-.206-1.374-.585L.89 13.09C.33 12.62 0 11.84 0 11.006c0-.86.325-1.62.887-2.08L9.01.585A1.936 1.936 0 0110.383 0zm0 1.947H10.368L2.24 10.28c-.224.226-.312.432-.312.73 0 .287.094.51.312.729l8.128 8.333h17.648a2.041 2.041 0 002.037-2.04V3.987c0-1.127-.915-2.04-2.037-2.04zM23.028 6a.96.96 0 01.678.292.95.95 0 01-.003 1.377l-3.342 3.348 3.326 3.333c.189.188.292.43.292.679 0 .248-.103.49-.292.679a.96.96 0 01-.678.292.959.959 0 01-.677-.292L18.99 12.36l-3.343 3.345a.96.96 0 01-.677.292.96.96 0 01-.678-.292.962.962 0 01-.292-.68c0-.248.104-.49.292-.679l3.342-3.348-3.342-3.348A.963.963 0 0114 6.971c0-.248.104-.49.292-.679A.96.96 0 0114.97 6a.96.96 0 01.677.292l3.358 3.348 3.345-3.348A.96.96 0 0123.028 6z",
        "fill": "currentColor"
      }
    })]);
  }
};
var CollapseIcon = {
  render: function render57() {
    var h = arguments[0];
    return h("svg", {
      "attrs": {
        "viewBox": "0 0 30 24",
        "xmlns": "http://www.w3.org/2000/svg"
      }
    }, [h("path", {
      "attrs": {
        "d": "M25.877 12.843h-1.502c-.188 0-.188 0-.188.19v1.512c0 .188 0 .188.188.188h1.5c.187 0 .187 0 .187-.188v-1.511c0-.19 0-.191-.185-.191zM17.999 10.2c0 .188 0 .188.188.188h1.687c.188 0 .188 0 .188-.188V8.688c0-.187.004-.187-.186-.19h-1.69c-.187 0-.187 0-.187.19V10.2zm2.25-3.967h1.5c.188 0 .188 0 .188-.188v-1.7c0-.19 0-.19-.188-.19h-1.5c-.189 0-.189 0-.189.19v1.7c0 .188 0 .188.19.188zm2.063 4.157h3.563c.187 0 .187 0 .187-.189V4.346c0-.19.004-.19-.185-.19h-1.69c-.187 0-.187 0-.187.188v4.155h-1.688c-.187 0-.187 0-.187.189v1.514c0 .19 0 .19.187.19zM14.812 24l2.812-3.4H12l2.813 3.4zm-9-11.157H4.31c-.188 0-.188 0-.188.19v1.512c0 .188 0 .188.188.188h1.502c.187 0 .187 0 .187-.188v-1.511c0-.19.01-.191-.189-.191zm15.937 0H8.25c-.188 0-.188 0-.188.19v1.512c0 .188 0 .188.188.188h13.5c.188 0 .188 0 .188-.188v-1.511c0-.19 0-.191-.188-.191zm-11.438-2.454h1.5c.188 0 .188 0 .188-.188V8.688c0-.187 0-.187-.188-.189h-1.5c-.187 0-.187 0-.187.189V10.2c0 .188 0 .188.187.188zM27.94 0c.563 0 .917.21 1.313.567.518.466.748.757.748 1.51v14.92c0 .567-.188 1.134-.562 1.512-.376.378-.938.566-1.313.566H2.063c-.563 0-.938-.188-1.313-.566-.562-.378-.75-.945-.75-1.511V2.078C0 1.51.188.944.562.567.938.189 1.5 0 1.875 0zm-.062 2H2v14.92h25.877V2zM5.81 4.157c.19 0 .19 0 .19.189v1.762c-.003.126-.024.126-.188.126H4.249c-.126-.003-.126-.023-.126-.188v-1.7c-.187-.19 0-.19.188-.19zm10.5 2.077h1.503c.187 0 .187 0 .187-.188v-1.7c0-.19 0-.19-.187-.19h-1.502c-.188 0-.188.001-.188.19v1.7c0 .188 0 .188.188.188zM7.875 8.5c.187 0 .187.002.187.189V10.2c0 .188 0 .188-.187.188H4.249c-.126-.002-.126-.023-.126-.188V8.625c.003-.126.024-.126.188-.126zm7.875 0c.19.002.19.002.19.189v1.575c-.003.126-.024.126-.19.126h-1.563c-.126-.002-.126-.023-.126-.188V8.625c.002-.126.023-.126.189-.126zm-6-4.342c.187 0 .187 0 .187.189v1.7c0 .188 0 .188-.187.188H8.187c-.126-.003-.126-.023-.126-.188V4.283c.003-.126.024-.126.188-.126zm3.94 0c.185 0 .372 0 .372.189v1.762c-.002.126-.023.126-.187.126h-1.75C12 6.231 12 6.211 12 6.046v-1.7c0-.19.187-.19.187-.19z",
        "fill": "currentColor"
      }
    })]);
  }
};
var _createNamespace$w = createNamespace$1("key"), createComponent$A = _createNamespace$w[0], bem$v = _createNamespace$w[1];
var Key = createComponent$A({
  mixins: [TouchMixin],
  props: {
    type: String,
    text: [Number, String],
    color: String,
    wider: Boolean,
    large: Boolean,
    loading: Boolean
  },
  data: function data34() {
    return {
      active: false
    };
  },
  mounted: function mounted17() {
    this.bindTouchEvent(this.$el);
  },
  methods: {
    onTouchStart: function onTouchStart4(event) {
      event.stopPropagation();
      this.touchStart(event);
      this.active = true;
    },
    onTouchMove: function onTouchMove5(event) {
      this.touchMove(event);
      if (this.direction) {
        this.active = false;
      }
    },
    onTouchEnd: function onTouchEnd6(event) {
      if (this.active) {
        if (!this.slots("default")) {
          event.preventDefault();
        }
        this.active = false;
        this.$emit("press", this.text, this.type);
      }
    },
    genContent: function genContent4() {
      var h = this.$createElement;
      var isExtra = this.type === "extra";
      var isDelete = this.type === "delete";
      var text2 = this.slots("default") || this.text;
      if (this.loading) {
        return h(Loading$1, {
          "class": bem$v("loading-icon")
        });
      }
      if (isDelete) {
        return text2 || h(DeleteIcon, {
          "class": bem$v("delete-icon")
        });
      }
      if (isExtra) {
        return text2 || h(CollapseIcon, {
          "class": bem$v("collapse-icon")
        });
      }
      return text2;
    }
  },
  render: function render58() {
    var h = arguments[0];
    return h("div", {
      "class": bem$v("wrapper", {
        wider: this.wider
      })
    }, [h("div", {
      "attrs": {
        "role": "button",
        "tabindex": "0"
      },
      "class": bem$v([this.color, {
        large: this.large,
        active: this.active,
        delete: this.type === "delete"
      }])
    }, [this.genContent()])]);
  }
});
var _createNamespace$v = createNamespace$1("number-keyboard"), createComponent$z = _createNamespace$v[0], bem$u = _createNamespace$v[1];
var NumberKeyboard = createComponent$z({
  mixins: [PortalMixin(), BindEventMixin(function(bind3) {
    if (this.hideOnClickOutside) {
      bind3(document.body, "touchstart", this.onBlur);
    }
  })],
  model: {
    event: "update:value"
  },
  props: {
    show: Boolean,
    title: String,
    zIndex: [Number, String],
    randomKeyOrder: Boolean,
    closeButtonText: String,
    deleteButtonText: String,
    closeButtonLoading: Boolean,
    theme: {
      type: String,
      default: "default"
    },
    value: {
      type: String,
      default: ""
    },
    extraKey: {
      type: [String, Array],
      default: ""
    },
    maxlength: {
      type: [Number, String],
      default: Number.MAX_VALUE
    },
    transition: {
      type: Boolean,
      default: true
    },
    showDeleteKey: {
      type: Boolean,
      default: true
    },
    hideOnClickOutside: {
      type: Boolean,
      default: true
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    show: function show3(val) {
      if (!this.transition) {
        this.$emit(val ? "show" : "hide");
      }
    }
  },
  computed: {
    keys: function keys() {
      if (this.theme === "custom") {
        return this.genCustomKeys();
      }
      return this.genDefaultKeys();
    }
  },
  methods: {
    genBasicKeys: function genBasicKeys() {
      var keys2 = [];
      for (var i = 1; i <= 9; i++) {
        keys2.push({
          text: i
        });
      }
      if (this.randomKeyOrder) {
        keys2.sort(function() {
          return Math.random() > 0.5 ? 1 : -1;
        });
      }
      return keys2;
    },
    genDefaultKeys: function genDefaultKeys() {
      return [].concat(this.genBasicKeys(), [{
        text: this.extraKey,
        type: "extra"
      }, {
        text: 0
      }, {
        text: this.showDeleteKey ? this.deleteButtonText : "",
        type: this.showDeleteKey ? "delete" : ""
      }]);
    },
    genCustomKeys: function genCustomKeys() {
      var keys2 = this.genBasicKeys();
      var extraKey = this.extraKey;
      var extraKeys = Array.isArray(extraKey) ? extraKey : [extraKey];
      if (extraKeys.length === 1) {
        keys2.push({
          text: 0,
          wider: true
        }, {
          text: extraKeys[0],
          type: "extra"
        });
      } else if (extraKeys.length === 2) {
        keys2.push({
          text: extraKeys[0],
          type: "extra"
        }, {
          text: 0
        }, {
          text: extraKeys[1],
          type: "extra"
        });
      }
      return keys2;
    },
    onBlur: function onBlur2() {
      this.show && this.$emit("blur");
    },
    onClose: function onClose3() {
      this.$emit("close");
      this.onBlur();
    },
    onAnimationEnd: function onAnimationEnd() {
      this.$emit(this.show ? "show" : "hide");
    },
    onPress: function onPress(text2, type2) {
      if (text2 === "") {
        if (type2 === "extra") {
          this.onBlur();
        }
        return;
      }
      var value17 = this.value;
      if (type2 === "delete") {
        this.$emit("delete");
        this.$emit("update:value", value17.slice(0, value17.length - 1));
      } else if (type2 === "close") {
        this.onClose();
      } else if (value17.length < this.maxlength) {
        this.$emit("input", text2);
        this.$emit("update:value", value17 + text2);
      }
    },
    genTitle: function genTitle5() {
      var h = this.$createElement;
      var title4 = this.title, theme = this.theme, closeButtonText = this.closeButtonText;
      var titleLeft = this.slots("title-left");
      var showClose = closeButtonText && theme === "default";
      var showTitle = title4 || showClose || titleLeft;
      if (!showTitle) {
        return;
      }
      return h("div", {
        "class": bem$u("header")
      }, [titleLeft && h("span", {
        "class": bem$u("title-left")
      }, [titleLeft]), title4 && h("h2", {
        "class": bem$u("title")
      }, [title4]), showClose && h("button", {
        "attrs": {
          "type": "button"
        },
        "class": bem$u("close"),
        "on": {
          "click": this.onClose
        }
      }, [closeButtonText])]);
    },
    genKeys: function genKeys() {
      var _this = this;
      var h = this.$createElement;
      return this.keys.map(function(key) {
        return h(Key, {
          "key": key.text,
          "attrs": {
            "text": key.text,
            "type": key.type,
            "wider": key.wider,
            "color": key.color
          },
          "on": {
            "press": _this.onPress
          }
        }, [key.type === "delete" && _this.slots("delete"), key.type === "extra" && _this.slots("extra-key")]);
      });
    },
    genSidebar: function genSidebar() {
      var h = this.$createElement;
      if (this.theme === "custom") {
        return h("div", {
          "class": bem$u("sidebar")
        }, [this.showDeleteKey && h(Key, {
          "attrs": {
            "large": true,
            "text": this.deleteButtonText,
            "type": "delete"
          },
          "on": {
            "press": this.onPress
          }
        }, [this.slots("delete")]), h(Key, {
          "attrs": {
            "large": true,
            "text": this.closeButtonText,
            "type": "close",
            "color": "blue",
            "loading": this.closeButtonLoading
          },
          "on": {
            "press": this.onPress
          }
        })]);
      }
    }
  },
  render: function render59() {
    var h = arguments[0];
    var Title2 = this.genTitle();
    return h("transition", {
      "attrs": {
        "name": this.transition ? "van-slide-up" : ""
      }
    }, [h("div", {
      "directives": [{
        name: "show",
        value: this.show
      }],
      "style": {
        zIndex: this.zIndex
      },
      "class": bem$u({
        unfit: !this.safeAreaInsetBottom,
        "with-title": Title2
      }),
      "on": {
        "touchstart": stopPropagation,
        "animationend": this.onAnimationEnd,
        "webkitAnimationEnd": this.onAnimationEnd
      }
    }, [Title2, h("div", {
      "class": bem$u("body")
    }, [h("div", {
      "class": bem$u("keys")
    }, [this.genKeys()]), this.genSidebar()])])]);
  }
});
var _createNamespace$u = createNamespace$1("pagination"), createComponent$y = _createNamespace$u[0], bem$t = _createNamespace$u[1], t$d = _createNamespace$u[2];
function makePage(number2, text2, active4) {
  return {
    number: number2,
    text: text2,
    active: active4
  };
}
var Pagination = createComponent$y({
  props: {
    prevText: String,
    nextText: String,
    forceEllipses: Boolean,
    mode: {
      type: String,
      default: "multi"
    },
    value: {
      type: Number,
      default: 0
    },
    pageCount: {
      type: [Number, String],
      default: 0
    },
    totalItems: {
      type: [Number, String],
      default: 0
    },
    itemsPerPage: {
      type: [Number, String],
      default: 10
    },
    showPageSize: {
      type: [Number, String],
      default: 5
    }
  },
  computed: {
    count: function count5() {
      var count6 = this.pageCount || Math.ceil(this.totalItems / this.itemsPerPage);
      return Math.max(1, count6);
    },
    pages: function pages() {
      var pages2 = [];
      var pageCount = this.count;
      var showPageSize = +this.showPageSize;
      if (this.mode !== "multi") {
        return pages2;
      }
      var startPage = 1;
      var endPage = pageCount;
      var isMaxSized = showPageSize < pageCount;
      if (isMaxSized) {
        startPage = Math.max(this.value - Math.floor(showPageSize / 2), 1);
        endPage = startPage + showPageSize - 1;
        if (endPage > pageCount) {
          endPage = pageCount;
          startPage = endPage - showPageSize + 1;
        }
      }
      for (var number2 = startPage; number2 <= endPage; number2++) {
        var page = makePage(number2, number2, number2 === this.value);
        pages2.push(page);
      }
      if (isMaxSized && showPageSize > 0 && this.forceEllipses) {
        if (startPage > 1) {
          var previousPageSet = makePage(startPage - 1, "...", false);
          pages2.unshift(previousPageSet);
        }
        if (endPage < pageCount) {
          var nextPageSet = makePage(endPage + 1, "...", false);
          pages2.push(nextPageSet);
        }
      }
      return pages2;
    }
  },
  watch: {
    value: {
      handler: function handler3(page) {
        this.select(page || this.value);
      },
      immediate: true
    }
  },
  methods: {
    select: function select2(page, emitChange2) {
      page = Math.min(this.count, Math.max(1, page));
      if (this.value !== page) {
        this.$emit("input", page);
        if (emitChange2) {
          this.$emit("change", page);
        }
      }
    }
  },
  render: function render60() {
    var _this = this, _this$slots, _this$slots3;
    var h = arguments[0];
    var value17 = this.value;
    var simple = this.mode !== "multi";
    var onSelect7 = function onSelect8(value18) {
      return function() {
        _this.select(value18, true);
      };
    };
    return h("ul", {
      "class": bem$t({
        simple
      })
    }, [h("li", {
      "class": [bem$t("item", {
        disabled: value17 === 1
      }), bem$t("prev"), BORDER],
      "on": {
        "click": onSelect7(value17 - 1)
      }
    }, [((_this$slots = this.slots("prev-text")) != null ? _this$slots : this.prevText) || t$d("prev")]), this.pages.map(function(page) {
      var _this$slots2;
      return h("li", {
        "class": [bem$t("item", {
          active: page.active
        }), bem$t("page"), BORDER],
        "on": {
          "click": onSelect7(page.number)
        }
      }, [(_this$slots2 = _this.slots("page", page)) != null ? _this$slots2 : page.text]);
    }), simple && h("li", {
      "class": bem$t("page-desc")
    }, [this.slots("pageDesc") || value17 + "/" + this.count]), h("li", {
      "class": [bem$t("item", {
        disabled: value17 === this.count
      }), bem$t("next"), BORDER],
      "on": {
        "click": onSelect7(value17 + 1)
      }
    }, [((_this$slots3 = this.slots("next-text")) != null ? _this$slots3 : this.nextText) || t$d("next")])]);
  }
});
var _createNamespace$t = createNamespace$1("panel"), createComponent$x = _createNamespace$t[0], bem$s = _createNamespace$t[1];
function Panel(h, props2, slots4, ctx) {
  var Content2 = function Content3() {
    return [slots4.header ? slots4.header() : h(Cell$1, {
      "attrs": {
        "icon": props2.icon,
        "label": props2.desc,
        "title": props2.title,
        "value": props2.status,
        "valueClass": bem$s("header-value")
      },
      "class": bem$s("header")
    }), h("div", {
      "class": bem$s("content")
    }, [slots4.default && slots4.default()]), slots4.footer && h("div", {
      "class": [bem$s("footer"), BORDER_TOP]
    }, [slots4.footer()])];
  };
  return h(CellGroup$1, helper([{
    "class": bem$s(),
    "scopedSlots": {
      default: Content2
    }
  }, inherit(ctx, true)]));
}
Panel.props = {
  icon: String,
  desc: String,
  title: String,
  status: String
};
var Panel$1 = createComponent$x(Panel);
var _createNamespace$s = createNamespace$1("password-input"), createComponent$w = _createNamespace$s[0], bem$r = _createNamespace$s[1];
function PasswordInput(h, props2, slots4, ctx) {
  var _ref2;
  var mask = props2.mask, value17 = props2.value, length = props2.length, gutter = props2.gutter, focused = props2.focused, errorInfo = props2.errorInfo;
  var info = errorInfo || props2.info;
  var Points = [];
  for (var i = 0; i < length; i++) {
    var _ref;
    var _char = value17[i];
    var showBorder = i !== 0 && !gutter;
    var showCursor = focused && i === value17.length;
    var style12 = void 0;
    if (i !== 0 && gutter) {
      style12 = {
        marginLeft: addUnit(gutter)
      };
    }
    Points.push(h("li", {
      "class": [(_ref = {}, _ref[BORDER_LEFT] = showBorder, _ref), bem$r("item", {
        focus: showCursor
      })],
      "style": style12
    }, [mask ? h("i", {
      "style": {
        visibility: _char ? "visible" : "hidden"
      }
    }) : _char, showCursor && h("div", {
      "class": bem$r("cursor")
    })]));
  }
  return h("div", {
    "class": bem$r()
  }, [h("ul", helper([{
    "class": [bem$r("security"), (_ref2 = {}, _ref2[BORDER_SURROUND] = !gutter, _ref2)],
    "on": {
      "touchstart": function touchstart(event) {
        event.stopPropagation();
        emit(ctx, "focus", event);
      }
    }
  }, inherit(ctx, true)]), [Points]), info && h("div", {
    "class": bem$r(errorInfo ? "error-info" : "info")
  }, [info])]);
}
PasswordInput.props = {
  info: String,
  gutter: [Number, String],
  focused: Boolean,
  errorInfo: String,
  mask: {
    type: Boolean,
    default: true
  },
  value: {
    type: String,
    default: ""
  },
  length: {
    type: [Number, String],
    default: 6
  }
};
var PasswordInput$1 = createComponent$w(PasswordInput);
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (node.toString() !== "[object Window]") {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node;
}
function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}
var round = Math.round;
function getBoundingClientRect(element, includeScale) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  var rect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  if (isHTMLElement(element) && includeScale) {
    var offsetHeight = element.offsetHeight;
    var offsetWidth = element.offsetWidth;
    if (offsetWidth > 0) {
      scaleX = round(rect.width) / offsetWidth || 1;
    }
    if (offsetHeight > 0) {
      scaleY = round(rect.height) / offsetHeight || 1;
    }
  }
  return {
    width: rect.width / scaleX,
    height: rect.height / scaleY,
    top: rect.top / scaleY,
    right: rect.right / scaleX,
    bottom: rect.bottom / scaleY,
    left: rect.left / scaleX,
    x: rect.left / scaleX,
    y: rect.top / scaleY
  };
}
function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop
  };
}
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}
function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}
function getNodeName(element) {
  return element ? (element.nodeName || "").toLowerCase() : null;
}
function getDocumentElement(element) {
  return ((isElement(element) ? element.ownerDocument : element.document) || window.document).documentElement;
}
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}
function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}
function isScrollParent(element) {
  var _getComputedStyle = getComputedStyle(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element);
  var width = element.offsetWidth;
  var height = element.offsetHeight;
  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }
  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width,
    height
  };
}
function getParentNode(element) {
  if (getNodeName(element) === "html") {
    return element;
  }
  return element.assignedSlot || element.parentNode || (isShadowRoot(element) ? element.host : null) || getDocumentElement(element);
}
function getScrollParent(node) {
  if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }
  return getScrollParent(getParentNode(node));
}
function listScrollParents(element, list2) {
  var _element$ownerDocumen;
  if (list2 === void 0) {
    list2 = [];
  }
  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target2 = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list2.concat(target2);
  return isBody ? updatedList : updatedList.concat(listScrollParents(getParentNode(target2)));
}
function isTableElement(element) {
  return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
}
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || getComputedStyle(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1;
  var isIE2 = navigator.userAgent.indexOf("Trident") !== -1;
  if (isIE2 && isHTMLElement(element)) {
    var elementCss = getComputedStyle(element);
    if (elementCss.position === "fixed") {
      return null;
    }
  }
  var currentNode = getParentNode(element);
  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }
  while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle(currentNode);
    if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  var window2 = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle(offsetParent).position === "static")) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}
var top = "top";
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [top, bottom, right, left];
var start3 = "start";
var end = "end";
var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
  return acc.concat([placement, placement + "-" + start3, placement + "-" + end]);
}, []);
var beforeRead = "beforeRead";
var read = "read";
var afterRead = "afterRead";
var beforeMain = "beforeMain";
var main = "main";
var afterMain = "afterMain";
var beforeWrite = "beforeWrite";
var write = "write";
var afterWrite = "afterWrite";
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
function order(modifiers) {
  var map = /* @__PURE__ */ new Map();
  var visited = /* @__PURE__ */ new Set();
  var result = [];
  modifiers.forEach(function(modifier) {
    map.set(modifier.name, modifier);
  });
  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function(dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function(modifier) {
    if (!visited.has(modifier.name)) {
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  var orderedModifiers = order(modifiers);
  return modifierPhases.reduce(function(acc, phase) {
    return acc.concat(orderedModifiers.filter(function(modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}
function debounce$1(fn2) {
  var pending2;
  return function() {
    if (!pending2) {
      pending2 = new Promise(function(resolve) {
        Promise.resolve().then(function() {
          pending2 = void 0;
          resolve(fn2());
        });
      });
    }
    return pending2;
  };
}
function format2(str2) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  return [].concat(args).reduce(function(p, c) {
    return p.replace(/%s/, c);
  }, str2);
}
var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
var VALID_PROPERTIES = ["name", "enabled", "phase", "fn", "effect", "requires", "options"];
function validateModifiers(modifiers) {
  modifiers.forEach(function(modifier) {
    [].concat(Object.keys(modifier), VALID_PROPERTIES).filter(function(value17, index2, self) {
      return self.indexOf(value17) === index2;
    }).forEach(function(key) {
      switch (key) {
        case "name":
          if (typeof modifier.name !== "string") {
            console.error(format2(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', '"' + String(modifier.name) + '"'));
          }
          break;
        case "enabled":
          if (typeof modifier.enabled !== "boolean") {
            console.error(format2(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', '"' + String(modifier.enabled) + '"'));
          }
          break;
        case "phase":
          if (modifierPhases.indexOf(modifier.phase) < 0) {
            console.error(format2(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + modifierPhases.join(", "), '"' + String(modifier.phase) + '"'));
          }
          break;
        case "fn":
          if (typeof modifier.fn !== "function") {
            console.error(format2(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', '"' + String(modifier.fn) + '"'));
          }
          break;
        case "effect":
          if (modifier.effect != null && typeof modifier.effect !== "function") {
            console.error(format2(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', '"' + String(modifier.fn) + '"'));
          }
          break;
        case "requires":
          if (modifier.requires != null && !Array.isArray(modifier.requires)) {
            console.error(format2(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', '"' + String(modifier.requires) + '"'));
          }
          break;
        case "requiresIfExists":
          if (!Array.isArray(modifier.requiresIfExists)) {
            console.error(format2(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', '"' + String(modifier.requiresIfExists) + '"'));
          }
          break;
        case "options":
        case "data":
          break;
        default:
          console.error('PopperJS: an invalid property has been provided to the "' + modifier.name + '" modifier, valid properties are ' + VALID_PROPERTIES.map(function(s) {
            return '"' + s + '"';
          }).join(", ") + '; but "' + key + '" was provided.');
      }
      modifier.requires && modifier.requires.forEach(function(requirement) {
        if (modifiers.find(function(mod) {
          return mod.name === requirement;
        }) == null) {
          console.error(format2(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
        }
      });
    });
  });
}
function uniqueBy(arr, fn2) {
  var identifiers = /* @__PURE__ */ new Set();
  return arr.filter(function(item) {
    var identifier = fn2(item);
    if (!identifiers.has(identifier)) {
      identifiers.add(identifier);
      return true;
    }
  });
}
function getBasePlacement(placement) {
  return placement.split("-")[0];
}
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function(merged2, current) {
    var existing = merged2[current.name];
    merged2[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged2;
  }, {});
  return Object.keys(merged).map(function(key) {
    return merged[key];
  });
}
function getVariation(placement) {
  return placement.split("-")[1];
}
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}
function computeOffsets(_ref) {
  var reference = _ref.reference, element = _ref.element, placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len2 = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start3:
        offsets[mainAxis] = offsets[mainAxis] - (reference[len2] / 2 - element[len2] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference[len2] / 2 - element[len2] / 2);
        break;
    }
  }
  return offsets;
}
var INVALID_ELEMENT_ERROR = "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.";
var INFINITE_LOOP_ERROR = "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.";
var DEFAULT_OPTIONS = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function(element) {
    return !(element && typeof element.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions2 = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper2(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions2;
    }
    var state = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions2),
      modifiersData: {},
      elements: {
        reference,
        popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance2 = {
      state,
      setOptions: function setOptions2(setOptionsAction) {
        var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions2, state.options, options2);
        state.scrollParents = {
          reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
          popper: listScrollParents(popper)
        };
        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers2, state.options.modifiers)));
        state.orderedModifiers = orderedModifiers.filter(function(m) {
          return m.enabled;
        });
        {
          var modifiers = uniqueBy([].concat(orderedModifiers, state.options.modifiers), function(_ref) {
            var name = _ref.name;
            return name;
          });
          validateModifiers(modifiers);
          if (getBasePlacement(state.options.placement) === auto) {
            var flipModifier = state.orderedModifiers.find(function(_ref2) {
              var name = _ref2.name;
              return name === "flip";
            });
            if (!flipModifier) {
              console.error(['Popper: "auto" placements require the "flip" modifier be', "present and enabled to work."].join(" "));
            }
          }
          var _getComputedStyle = getComputedStyle(popper), marginTop = _getComputedStyle.marginTop, marginRight = _getComputedStyle.marginRight, marginBottom = _getComputedStyle.marginBottom, marginLeft = _getComputedStyle.marginLeft;
          if ([marginTop, marginRight, marginBottom, marginLeft].some(function(margin) {
            return parseFloat(margin);
          })) {
            console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', "between the popper and its reference element or boundary.", "To replicate margin, use the `offset` modifier, as well as", "the `padding` option in the `preventOverflow` and `flip`", "modifiers."].join(" "));
          }
        }
        runModifierEffects();
        return instance2.update();
      },
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements, reference2 = _state$elements.reference, popper2 = _state$elements.popper;
        if (!areValidElements(reference2, popper2)) {
          {
            console.error(INVALID_ELEMENT_ERROR);
          }
          return;
        }
        state.rects = {
          reference: getCompositeRect(reference2, getOffsetParent(popper2), state.options.strategy === "fixed"),
          popper: getLayoutRect(popper2)
        };
        state.reset = false;
        state.placement = state.options.placement;
        state.orderedModifiers.forEach(function(modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        var __debug_loops__ = 0;
        for (var index2 = 0; index2 < state.orderedModifiers.length; index2++) {
          {
            __debug_loops__ += 1;
            if (__debug_loops__ > 100) {
              console.error(INFINITE_LOOP_ERROR);
              break;
            }
          }
          if (state.reset === true) {
            state.reset = false;
            index2 = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index2], fn2 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
          if (typeof fn2 === "function") {
            state = fn2({
              state,
              options: _options,
              name,
              instance: instance2
            }) || state;
          }
        }
      },
      update: debounce$1(function() {
        return new Promise(function(resolve) {
          instance2.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy3() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference, popper)) {
      {
        console.error(INVALID_ELEMENT_ERROR);
      }
      return instance2;
    }
    instance2.setOptions(options).then(function(state2) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state2);
      }
    });
    function runModifierEffects() {
      state.orderedModifiers.forEach(function(_ref3) {
        var name = _ref3.name, _ref3$options = _ref3.options, options2 = _ref3$options === void 0 ? {} : _ref3$options, effect3 = _ref3.effect;
        if (typeof effect3 === "function") {
          var cleanupFn = effect3({
            state,
            name,
            instance: instance2,
            options: options2
          });
          var noopFn = function noopFn2() {
          };
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function(fn2) {
        return fn2();
      });
      effectCleanupFns = [];
    }
    return instance2;
  };
}
var passive = {
  passive: true
};
function effect(_ref) {
  var state = _ref.state, instance2 = _ref.instance, options = _ref.options;
  var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize5 = _options$resize === void 0 ? true : _options$resize;
  var window2 = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function(scrollParent) {
      scrollParent.addEventListener("scroll", instance2.update, passive);
    });
  }
  if (resize5) {
    window2.addEventListener("resize", instance2.update, passive);
  }
  return function() {
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.removeEventListener("scroll", instance2.update, passive);
      });
    }
    if (resize5) {
      window2.removeEventListener("resize", instance2.update, passive);
    }
  };
}
var eventListeners_default = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function fn() {
  },
  effect,
  data: {}
};
function popperOffsets(_ref) {
  var state = _ref.state, name = _ref.name;
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: "absolute",
    placement: state.placement
  });
}
var popperOffsets_default = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: popperOffsets,
  data: {}
};
var unsetSides = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function roundOffsetsByDPR(_ref) {
  var x = _ref.x, y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x * dpr) / dpr || 0,
    y: round(y * dpr) / dpr || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
  var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
    x,
    y
  }) : {
    x,
    y
  };
  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left;
  var sideY = top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper)) {
      offsetParent = getDocumentElement(popper);
      if (getComputedStyle(offsetParent).position !== "static" && position === "absolute") {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    offsetParent = offsetParent;
    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : offsetParent[heightProp];
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : offsetParent[widthProp];
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position
  }, adaptive && unsetSides);
  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x,
    y
  }) : {
    x,
    y
  };
  x = _ref4.x;
  y = _ref4.y;
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref5) {
  var state = _ref5.state, options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  {
    var transitionProperty = getComputedStyle(state.elements.popper).transitionProperty || "";
    if (adaptive && ["transform", "top", "right", "bottom", "left"].some(function(property) {
      return transitionProperty.indexOf(property) >= 0;
    })) {
      console.warn(["Popper: Detected CSS transitions on at least one of the following", 'CSS properties: "transform", "top", "right", "bottom", "left".', "\n\n", 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', "for smooth transitions, or remove these properties from the CSS", "transition declaration on the popper element if only transitioning", "opacity or background-color for example.", "\n\n", "We recommend using the popper element as a wrapper around an inner", "element that can have any CSS property transitioned for animations."].join(" "));
    }
  }
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration,
    isFixed: state.options.strategy === "fixed"
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive,
      roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: "absolute",
      adaptive: false,
      roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-placement": state.placement
  });
}
var computeStyles_default = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: computeStyles,
  data: {}
};
function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function(name) {
    var style12 = state.styles[name] || {};
    var attributes2 = state.attributes[name] || {};
    var element = state.elements[name];
    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style12);
    Object.keys(attributes2).forEach(function(name2) {
      var value17 = attributes2[name2];
      if (value17 === false) {
        element.removeAttribute(name2);
      } else {
        element.setAttribute(name2, value17 === true ? "" : value17);
      }
    });
  });
}
function effect2(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state.elements).forEach(function(name) {
      var element = state.elements[name];
      var attributes2 = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
      var style12 = styleProperties.reduce(function(style22, property) {
        style22[property] = "";
        return style22;
      }, {});
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style12);
      Object.keys(attributes2).forEach(function(attribute2) {
        element.removeAttribute(attribute2);
      });
    });
  };
}
var applyStyles_default = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: applyStyles,
  effect: effect2,
  requires: ["computeStyles"]
};
var defaultModifiers = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default];
var createPopper = /* @__PURE__ */ popperGenerator({
  defaultModifiers
});
function distanceAndSkiddingToXY(placement, rects, offset22) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset22 === "function" ? offset22(Object.assign({}, rects, {
    placement
  })) : offset22, skidding = _ref[0], distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}
function offset2(_ref2) {
  var state = _ref2.state, options = _ref2.options, name = _ref2.name;
  var _options$offset = options.offset, offset22 = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data49 = placements.reduce(function(acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset22);
    return acc;
  }, {});
  var _data$state$placement = data49[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }
  state.modifiersData[name] = data49;
}
var offset_default = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: ["popperOffsets"],
  fn: offset2
};
var _createNamespace$r = createNamespace$1("popover"), createComponent$v = _createNamespace$r[0], bem$q = _createNamespace$r[1];
var Popover = createComponent$v({
  mixins: [ClickOutsideMixin({
    event: "touchstart",
    method: "onClickOutside"
  })],
  props: {
    value: Boolean,
    trigger: String,
    overlay: Boolean,
    offset: {
      type: Array,
      default: function _default21() {
        return [0, 8];
      }
    },
    theme: {
      type: String,
      default: "light"
    },
    actions: {
      type: Array,
      default: function _default22() {
        return [];
      }
    },
    placement: {
      type: String,
      default: "bottom"
    },
    getContainer: {
      type: [String, Function],
      default: "body"
    },
    closeOnClickAction: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    value: "updateLocation",
    placement: "updateLocation"
  },
  mounted: function mounted18() {
    this.updateLocation();
  },
  beforeDestroy: function beforeDestroy4() {
    if (this.popper) {
      this.popper.destroy();
      this.popper = null;
    }
  },
  methods: {
    createPopper: function createPopper$1() {
      return createPopper(this.$refs.wrapper, this.$refs.popover.$el, {
        placement: this.placement,
        modifiers: [{
          name: "computeStyles",
          options: {
            adaptive: false,
            gpuAcceleration: false
          }
        }, _extends$1({}, offset_default, {
          options: {
            offset: this.offset
          }
        })]
      });
    },
    updateLocation: function updateLocation() {
      var _this = this;
      this.$nextTick(function() {
        if (!_this.value) {
          return;
        }
        if (!_this.popper) {
          _this.popper = _this.createPopper();
        } else {
          _this.popper.setOptions({
            placement: _this.placement
          });
        }
      });
    },
    renderAction: function renderAction(action, index2) {
      var _this2 = this;
      var h = this.$createElement;
      var icon = action.icon, text2 = action.text, disabled = action.disabled, className = action.className;
      return h("div", {
        "attrs": {
          "role": "menuitem"
        },
        "class": [bem$q("action", {
          disabled,
          "with-icon": icon
        }), className],
        "on": {
          "click": function click() {
            return _this2.onClickAction(action, index2);
          }
        }
      }, [icon && h(Icon$1, {
        "attrs": {
          "name": icon
        },
        "class": bem$q("action-icon")
      }), h("div", {
        "class": [bem$q("action-text"), BORDER_BOTTOM]
      }, [text2])]);
    },
    onToggle: function onToggle(value17) {
      this.$emit("input", value17);
    },
    onClickWrapper: function onClickWrapper2() {
      if (this.trigger === "click") {
        this.onToggle(!this.value);
      }
    },
    onTouchstart: function onTouchstart(event) {
      event.stopPropagation();
      this.$emit("touchstart", event);
    },
    onClickAction: function onClickAction(action, index2) {
      if (action.disabled) {
        return;
      }
      this.$emit("select", action, index2);
      if (this.closeOnClickAction) {
        this.$emit("input", false);
      }
    },
    onClickOutside: function onClickOutside2() {
      this.$emit("input", false);
    },
    onOpen: function onOpen() {
      this.$emit("open");
    },
    onOpened: function onOpened2() {
      this.$emit("opened");
    },
    onClose: function onClose4() {
      this.$emit("close");
    },
    onClosed: function onClosed3() {
      this.$emit("closed");
    }
  },
  render: function render61() {
    var h = arguments[0];
    return h("span", {
      "ref": "wrapper",
      "class": bem$q("wrapper"),
      "on": {
        "click": this.onClickWrapper
      }
    }, [h(Popup, {
      "ref": "popover",
      "attrs": {
        "value": this.value,
        "overlay": this.overlay,
        "position": null,
        "transition": "van-popover-zoom",
        "lockScroll": false,
        "getContainer": this.getContainer
      },
      "class": bem$q([this.theme]),
      "on": {
        "open": this.onOpen,
        "close": this.onClose,
        "input": this.onToggle,
        "opened": this.onOpened,
        "closed": this.onClosed
      },
      "nativeOn": {
        "touchstart": this.onTouchstart
      }
    }, [h("div", {
      "class": bem$q("arrow")
    }), h("div", {
      "class": bem$q("content"),
      "attrs": {
        "role": "menu"
      }
    }, [this.slots("default") || this.actions.map(this.renderAction)])]), this.slots("reference")]);
  }
});
var _createNamespace$q = createNamespace$1("progress"), createComponent$u = _createNamespace$q[0], bem$p = _createNamespace$q[1];
var Progress = createComponent$u({
  mixins: [BindEventMixin(function(bind3) {
    bind3(window, "resize", this.resize, true);
    bind3(window, "orientationchange", this.resize, true);
  })],
  props: {
    color: String,
    inactive: Boolean,
    pivotText: String,
    textColor: String,
    pivotColor: String,
    trackColor: String,
    strokeWidth: [Number, String],
    percentage: {
      type: [Number, String],
      required: true,
      validator: function validator2(value17) {
        return value17 >= 0 && value17 <= 100;
      }
    },
    showPivot: {
      type: Boolean,
      default: true
    }
  },
  data: function data35() {
    return {
      pivotWidth: 0,
      progressWidth: 0
    };
  },
  mounted: function mounted19() {
    this.resize();
  },
  watch: {
    showPivot: "resize",
    pivotText: "resize"
  },
  methods: {
    resize: function resize4() {
      var _this = this;
      this.$nextTick(function() {
        _this.progressWidth = _this.$el.offsetWidth;
        _this.pivotWidth = _this.$refs.pivot ? _this.$refs.pivot.offsetWidth : 0;
      });
    }
  },
  render: function render62() {
    var h = arguments[0];
    var pivotText = this.pivotText, percentage = this.percentage;
    var text2 = pivotText != null ? pivotText : percentage + "%";
    var showPivot = this.showPivot && text2;
    var background = this.inactive ? "#cacaca" : this.color;
    var pivotStyle = {
      color: this.textColor,
      left: (this.progressWidth - this.pivotWidth) * percentage / 100 + "px",
      background: this.pivotColor || background
    };
    var portionStyle = {
      background,
      width: this.progressWidth * percentage / 100 + "px"
    };
    var wrapperStyle = {
      background: this.trackColor,
      height: addUnit(this.strokeWidth)
    };
    return h("div", {
      "class": bem$p(),
      "style": wrapperStyle
    }, [h("span", {
      "class": bem$p("portion"),
      "style": portionStyle
    }, [showPivot && h("span", {
      "ref": "pivot",
      "style": pivotStyle,
      "class": bem$p("pivot")
    }, [text2])])]);
  }
});
var _createNamespace$p = createNamespace$1("pull-refresh"), createComponent$t = _createNamespace$p[0], bem$o = _createNamespace$p[1], t$c = _createNamespace$p[2];
var DEFAULT_HEAD_HEIGHT = 50;
var TEXT_STATUS = ["pulling", "loosing", "success"];
var PullRefresh = createComponent$t({
  mixins: [TouchMixin],
  props: {
    disabled: Boolean,
    successText: String,
    pullingText: String,
    loosingText: String,
    loadingText: String,
    pullDistance: [Number, String],
    value: {
      type: Boolean,
      required: true
    },
    successDuration: {
      type: [Number, String],
      default: 500
    },
    animationDuration: {
      type: [Number, String],
      default: 300
    },
    headHeight: {
      type: [Number, String],
      default: DEFAULT_HEAD_HEIGHT
    }
  },
  data: function data36() {
    return {
      status: "normal",
      distance: 0,
      duration: 0
    };
  },
  computed: {
    touchable: function touchable() {
      return this.status !== "loading" && this.status !== "success" && !this.disabled;
    },
    headStyle: function headStyle() {
      if (this.headHeight !== DEFAULT_HEAD_HEIGHT) {
        return {
          height: this.headHeight + "px"
        };
      }
    }
  },
  watch: {
    value: function value11(loading) {
      this.duration = this.animationDuration;
      if (loading) {
        this.setStatus(+this.headHeight, true);
      } else if (this.slots("success") || this.successText) {
        this.showSuccessTip();
      } else {
        this.setStatus(0, false);
      }
    }
  },
  mounted: function mounted20() {
    this.bindTouchEvent(this.$refs.track);
    this.scrollEl = getScroller(this.$el);
  },
  methods: {
    checkPullStart: function checkPullStart(event) {
      this.ceiling = getScrollTop(this.scrollEl) === 0;
      if (this.ceiling) {
        this.duration = 0;
        this.touchStart(event);
      }
    },
    onTouchStart: function onTouchStart5(event) {
      if (this.touchable) {
        this.checkPullStart(event);
      }
    },
    onTouchMove: function onTouchMove6(event) {
      if (!this.touchable) {
        return;
      }
      if (!this.ceiling) {
        this.checkPullStart(event);
      }
      this.touchMove(event);
      if (this.ceiling && this.deltaY >= 0 && this.direction === "vertical") {
        preventDefault(event);
        this.setStatus(this.ease(this.deltaY));
      }
    },
    onTouchEnd: function onTouchEnd7() {
      var _this = this;
      if (this.touchable && this.ceiling && this.deltaY) {
        this.duration = this.animationDuration;
        if (this.status === "loosing") {
          this.setStatus(+this.headHeight, true);
          this.$emit("input", true);
          this.$nextTick(function() {
            _this.$emit("refresh");
          });
        } else {
          this.setStatus(0);
        }
      }
    },
    ease: function ease(distance) {
      var pullDistance = +(this.pullDistance || this.headHeight);
      if (distance > pullDistance) {
        if (distance < pullDistance * 2) {
          distance = pullDistance + (distance - pullDistance) / 2;
        } else {
          distance = pullDistance * 1.5 + (distance - pullDistance * 2) / 4;
        }
      }
      return Math.round(distance);
    },
    setStatus: function setStatus(distance, isLoading) {
      var status2;
      if (isLoading) {
        status2 = "loading";
      } else if (distance === 0) {
        status2 = "normal";
      } else {
        status2 = distance < (this.pullDistance || this.headHeight) ? "pulling" : "loosing";
      }
      this.distance = distance;
      if (status2 !== this.status) {
        this.status = status2;
      }
    },
    genStatus: function genStatus() {
      var h = this.$createElement;
      var status2 = this.status, distance = this.distance;
      var slot = this.slots(status2, {
        distance
      });
      if (slot) {
        return slot;
      }
      var nodes = [];
      var text2 = this[status2 + "Text"] || t$c(status2);
      if (TEXT_STATUS.indexOf(status2) !== -1) {
        nodes.push(h("div", {
          "class": bem$o("text")
        }, [text2]));
      }
      if (status2 === "loading") {
        nodes.push(h(Loading$1, {
          "attrs": {
            "size": "16"
          }
        }, [text2]));
      }
      return nodes;
    },
    showSuccessTip: function showSuccessTip() {
      var _this2 = this;
      this.status = "success";
      setTimeout(function() {
        _this2.setStatus(0);
      }, this.successDuration);
    }
  },
  render: function render63() {
    var h = arguments[0];
    var trackStyle2 = {
      transitionDuration: this.duration + "ms",
      transform: this.distance ? "translate3d(0," + this.distance + "px, 0)" : ""
    };
    return h("div", {
      "class": bem$o()
    }, [h("div", {
      "ref": "track",
      "class": bem$o("track"),
      "style": trackStyle2
    }, [h("div", {
      "class": bem$o("head"),
      "style": this.headStyle
    }, [this.genStatus()]), this.slots()])]);
  }
});
var _createNamespace$o = createNamespace$1("rate"), createComponent$s = _createNamespace$o[0], bem$n = _createNamespace$o[1];
function getRateStatus(value17, index2, allowHalf) {
  if (value17 >= index2) {
    return "full";
  }
  if (value17 + 0.5 >= index2 && allowHalf) {
    return "half";
  }
  return "void";
}
var Rate = createComponent$s({
  mixins: [TouchMixin, FieldMixin],
  props: {
    size: [Number, String],
    color: String,
    gutter: [Number, String],
    readonly: Boolean,
    disabled: Boolean,
    allowHalf: Boolean,
    voidColor: String,
    iconPrefix: String,
    disabledColor: String,
    value: {
      type: Number,
      default: 0
    },
    icon: {
      type: String,
      default: "star"
    },
    voidIcon: {
      type: String,
      default: "star-o"
    },
    count: {
      type: [Number, String],
      default: 5
    },
    touchable: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    list: function list() {
      var list2 = [];
      for (var i = 1; i <= this.count; i++) {
        list2.push(getRateStatus(this.value, i, this.allowHalf));
      }
      return list2;
    },
    sizeWithUnit: function sizeWithUnit() {
      return addUnit(this.size);
    },
    gutterWithUnit: function gutterWithUnit() {
      return addUnit(this.gutter);
    }
  },
  mounted: function mounted21() {
    this.bindTouchEvent(this.$el);
  },
  methods: {
    select: function select3(index2) {
      if (!this.disabled && !this.readonly && index2 !== this.value) {
        this.$emit("input", index2);
        this.$emit("change", index2);
      }
    },
    onTouchStart: function onTouchStart6(event) {
      var _this = this;
      if (this.readonly || this.disabled || !this.touchable) {
        return;
      }
      this.touchStart(event);
      var rects = this.$refs.items.map(function(item) {
        return item.getBoundingClientRect();
      });
      var ranges3 = [];
      rects.forEach(function(rect, index2) {
        if (_this.allowHalf) {
          ranges3.push({
            score: index2 + 0.5,
            left: rect.left
          }, {
            score: index2 + 1,
            left: rect.left + rect.width / 2
          });
        } else {
          ranges3.push({
            score: index2 + 1,
            left: rect.left
          });
        }
      });
      this.ranges = ranges3;
    },
    onTouchMove: function onTouchMove7(event) {
      if (this.readonly || this.disabled || !this.touchable) {
        return;
      }
      this.touchMove(event);
      if (this.direction === "horizontal") {
        preventDefault(event);
        var clientX = event.touches[0].clientX;
        this.select(this.getScoreByPosition(clientX));
      }
    },
    getScoreByPosition: function getScoreByPosition(x) {
      for (var i = this.ranges.length - 1; i > 0; i--) {
        if (x > this.ranges[i].left) {
          return this.ranges[i].score;
        }
      }
      return this.allowHalf ? 0.5 : 1;
    },
    genStar: function genStar(status2, index2) {
      var _this2 = this;
      var h = this.$createElement;
      var icon = this.icon, color = this.color, count6 = this.count, voidIcon = this.voidIcon, disabled = this.disabled, voidColor = this.voidColor, disabledColor = this.disabledColor;
      var score = index2 + 1;
      var isFull = status2 === "full";
      var isVoid = status2 === "void";
      var style12;
      if (this.gutterWithUnit && score !== +count6) {
        style12 = {
          paddingRight: this.gutterWithUnit
        };
      }
      return h("div", {
        "ref": "items",
        "refInFor": true,
        "key": index2,
        "attrs": {
          "role": "radio",
          "tabindex": "0",
          "aria-setsize": count6,
          "aria-posinset": score,
          "aria-checked": String(!isVoid)
        },
        "style": style12,
        "class": bem$n("item")
      }, [h(Icon$1, {
        "attrs": {
          "size": this.sizeWithUnit,
          "name": isFull ? icon : voidIcon,
          "color": disabled ? disabledColor : isFull ? color : voidColor,
          "classPrefix": this.iconPrefix,
          "data-score": score
        },
        "class": bem$n("icon", {
          disabled,
          full: isFull
        }),
        "on": {
          "click": function click() {
            _this2.select(score);
          }
        }
      }), this.allowHalf && h(Icon$1, {
        "attrs": {
          "size": this.sizeWithUnit,
          "name": isVoid ? voidIcon : icon,
          "color": disabled ? disabledColor : isVoid ? voidColor : color,
          "classPrefix": this.iconPrefix,
          "data-score": score - 0.5
        },
        "class": bem$n("icon", ["half", {
          disabled,
          full: !isVoid
        }]),
        "on": {
          "click": function click() {
            _this2.select(score - 0.5);
          }
        }
      })]);
    }
  },
  render: function render64() {
    var _this3 = this;
    var h = arguments[0];
    return h("div", {
      "class": bem$n({
        readonly: this.readonly,
        disabled: this.disabled
      }),
      "attrs": {
        "tabindex": "0",
        "role": "radiogroup"
      }
    }, [this.list.map(function(status2, index2) {
      return _this3.genStar(status2, index2);
    })]);
  }
});
var _createNamespace$n = createNamespace$1("row"), createComponent$r = _createNamespace$n[0], bem$m = _createNamespace$n[1];
var Row = createComponent$r({
  mixins: [ParentMixin("vanRow")],
  props: {
    type: String,
    align: String,
    justify: String,
    tag: {
      type: String,
      default: "div"
    },
    gutter: {
      type: [Number, String],
      default: 0
    }
  },
  computed: {
    spaces: function spaces() {
      var gutter = Number(this.gutter);
      if (!gutter) {
        return;
      }
      var spaces2 = [];
      var groups = [[]];
      var totalSpan = 0;
      this.children.forEach(function(item, index2) {
        totalSpan += Number(item.span);
        if (totalSpan > 24) {
          groups.push([index2]);
          totalSpan -= 24;
        } else {
          groups[groups.length - 1].push(index2);
        }
      });
      groups.forEach(function(group) {
        var averagePadding = gutter * (group.length - 1) / group.length;
        group.forEach(function(item, index2) {
          if (index2 === 0) {
            spaces2.push({
              right: averagePadding
            });
          } else {
            var left2 = gutter - spaces2[item - 1].right;
            var right2 = averagePadding - left2;
            spaces2.push({
              left: left2,
              right: right2
            });
          }
        });
      });
      return spaces2;
    }
  },
  methods: {
    onClick: function onClick13(event) {
      this.$emit("click", event);
    }
  },
  render: function render65() {
    var _bem2;
    var h = arguments[0];
    var align = this.align, justify = this.justify;
    var flex = this.type === "flex";
    return h(this.tag, {
      "class": bem$m((_bem2 = {
        flex
      }, _bem2["align-" + align] = flex && align, _bem2["justify-" + justify] = flex && justify, _bem2)),
      "on": {
        "click": this.onClick
      }
    }, [this.slots()]);
  }
});
var _createNamespace$m = createNamespace$1("search"), createComponent$q = _createNamespace$m[0], bem$l = _createNamespace$m[1], t$b = _createNamespace$m[2];
function Search(h, props2, slots4, ctx) {
  function Label() {
    if (slots4.label || props2.label) {
      return h("div", {
        "class": bem$l("label")
      }, [slots4.label ? slots4.label() : props2.label]);
    }
  }
  function Action() {
    if (!props2.showAction) {
      return;
    }
    function onCancel4() {
      if (slots4.action) {
        return;
      }
      emit(ctx, "input", "");
      emit(ctx, "cancel");
    }
    return h("div", {
      "class": bem$l("action"),
      "attrs": {
        "role": "button",
        "tabindex": "0"
      },
      "on": {
        "click": onCancel4
      }
    }, [slots4.action ? slots4.action() : props2.actionText || t$b("cancel")]);
  }
  var fieldData = {
    attrs: ctx.data.attrs,
    on: _extends$1({}, ctx.listeners, {
      keypress: function keypress(event) {
        if (event.keyCode === 13) {
          preventDefault(event);
          emit(ctx, "search", props2.value);
        }
        emit(ctx, "keypress", event);
      }
    })
  };
  var inheritData = inherit(ctx);
  inheritData.attrs = void 0;
  return h("div", helper([{
    "class": bem$l({
      "show-action": props2.showAction
    }),
    "style": {
      background: props2.background
    }
  }, inheritData]), [slots4.left == null ? void 0 : slots4.left(), h("div", {
    "class": bem$l("content", props2.shape)
  }, [Label(), h(Field, helper([{
    "attrs": {
      "type": "search",
      "border": false,
      "value": props2.value,
      "leftIcon": props2.leftIcon,
      "rightIcon": props2.rightIcon,
      "clearable": props2.clearable,
      "clearTrigger": props2.clearTrigger
    },
    "scopedSlots": {
      "left-icon": slots4["left-icon"],
      "right-icon": slots4["right-icon"]
    }
  }, fieldData]))]), Action()]);
}
Search.props = {
  value: String,
  label: String,
  rightIcon: String,
  actionText: String,
  background: String,
  showAction: Boolean,
  clearTrigger: String,
  shape: {
    type: String,
    default: "square"
  },
  clearable: {
    type: Boolean,
    default: true
  },
  leftIcon: {
    type: String,
    default: "search"
  }
};
var Search$1 = createComponent$q(Search);
var PRESET_ICONS = ["qq", "link", "weibo", "wechat", "poster", "qrcode", "weapp-qrcode", "wechat-moments"];
var _createNamespace$l = createNamespace$1("share-sheet"), createComponent$p = _createNamespace$l[0], bem$k = _createNamespace$l[1], t$a = _createNamespace$l[2];
var ShareSheet = createComponent$p({
  props: _extends$1({}, popupMixinProps, {
    title: String,
    duration: String,
    cancelText: String,
    description: String,
    getContainer: [String, Function],
    options: {
      type: Array,
      default: function _default23() {
        return [];
      }
    },
    overlay: {
      type: Boolean,
      default: true
    },
    closeOnPopstate: {
      type: Boolean,
      default: true
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    }
  }),
  methods: {
    onCancel: function onCancel2() {
      this.toggle(false);
      this.$emit("cancel");
    },
    onSelect: function onSelect3(option, index2) {
      this.$emit("select", option, index2);
    },
    toggle: function toggle5(val) {
      this.$emit("input", val);
    },
    getIconURL: function getIconURL(icon) {
      if (PRESET_ICONS.indexOf(icon) !== -1) {
        return "https://img01.yzcdn.cn/vant/share-sheet-" + icon + ".png";
      }
      return icon;
    },
    genHeader: function genHeader() {
      var h = this.$createElement;
      var title4 = this.slots("title") || this.title;
      var description = this.slots("description") || this.description;
      if (!title4 && !description) {
        return;
      }
      return h("div", {
        "class": bem$k("header")
      }, [title4 && h("h2", {
        "class": bem$k("title")
      }, [title4]), description && h("span", {
        "class": bem$k("description")
      }, [description])]);
    },
    genOptions: function genOptions2(options, showBorder) {
      var _this = this;
      var h = this.$createElement;
      return h("div", {
        "class": bem$k("options", {
          border: showBorder
        })
      }, [options.map(function(option, index2) {
        return h("div", {
          "attrs": {
            "role": "button",
            "tabindex": "0"
          },
          "class": [bem$k("option"), option.className],
          "on": {
            "click": function click() {
              _this.onSelect(option, index2);
            }
          }
        }, [h("img", {
          "attrs": {
            "src": _this.getIconURL(option.icon)
          },
          "class": bem$k("icon")
        }), option.name && h("span", {
          "class": bem$k("name")
        }, [option.name]), option.description && h("span", {
          "class": bem$k("option-description")
        }, [option.description])]);
      })]);
    },
    genRows: function genRows() {
      var _this2 = this;
      var options = this.options;
      if (Array.isArray(options[0])) {
        return options.map(function(item, index2) {
          return _this2.genOptions(item, index2 !== 0);
        });
      }
      return this.genOptions(options);
    },
    genCancelText: function genCancelText() {
      var _this$cancelText;
      var h = this.$createElement;
      var cancelText = (_this$cancelText = this.cancelText) != null ? _this$cancelText : t$a("cancel");
      if (cancelText) {
        return h("button", {
          "attrs": {
            "type": "button"
          },
          "class": bem$k("cancel"),
          "on": {
            "click": this.onCancel
          }
        }, [cancelText]);
      }
    },
    onClickOverlay: function onClickOverlay2() {
      this.$emit("click-overlay");
    }
  },
  render: function render66() {
    var h = arguments[0];
    return h(Popup, {
      "attrs": {
        "round": true,
        "value": this.value,
        "position": "bottom",
        "overlay": this.overlay,
        "duration": this.duration,
        "lazyRender": this.lazyRender,
        "lockScroll": this.lockScroll,
        "getContainer": this.getContainer,
        "closeOnPopstate": this.closeOnPopstate,
        "closeOnClickOverlay": this.closeOnClickOverlay,
        "safeAreaInsetBottom": this.safeAreaInsetBottom
      },
      "class": bem$k(),
      "on": {
        "input": this.toggle,
        "click-overlay": this.onClickOverlay
      }
    }, [this.genHeader(), this.genRows(), this.genCancelText()]);
  }
});
var _createNamespace$k = createNamespace$1("sidebar"), createComponent$o = _createNamespace$k[0], bem$j = _createNamespace$k[1];
var Sidebar = createComponent$o({
  mixins: [ParentMixin("vanSidebar")],
  model: {
    prop: "activeKey"
  },
  props: {
    activeKey: {
      type: [Number, String],
      default: 0
    }
  },
  data: function data37() {
    return {
      index: +this.activeKey
    };
  },
  watch: {
    activeKey: function activeKey() {
      this.setIndex(+this.activeKey);
    }
  },
  methods: {
    setIndex: function setIndex2(index2) {
      if (index2 !== this.index) {
        this.index = index2;
        this.$emit("change", index2);
      }
    }
  },
  render: function render67() {
    var h = arguments[0];
    return h("div", {
      "class": bem$j()
    }, [this.slots()]);
  }
});
var _createNamespace$j = createNamespace$1("sidebar-item"), createComponent$n = _createNamespace$j[0], bem$i = _createNamespace$j[1];
var SidebarItem = createComponent$n({
  mixins: [ChildrenMixin("vanSidebar")],
  props: _extends$1({}, routeProps, {
    dot: Boolean,
    info: [Number, String],
    badge: [Number, String],
    title: String,
    disabled: Boolean
  }),
  computed: {
    select: function select4() {
      return this.index === +this.parent.activeKey;
    }
  },
  methods: {
    onClick: function onClick14() {
      if (this.disabled) {
        return;
      }
      this.$emit("click", this.index);
      this.parent.$emit("input", this.index);
      this.parent.setIndex(this.index);
      route(this.$router, this);
    }
  },
  render: function render68() {
    var _this$slots, _this$badge;
    var h = arguments[0];
    return h("a", {
      "class": bem$i({
        select: this.select,
        disabled: this.disabled
      }),
      "on": {
        "click": this.onClick
      }
    }, [h("div", {
      "class": bem$i("text")
    }, [(_this$slots = this.slots("title")) != null ? _this$slots : this.title, h(Info$1, {
      "attrs": {
        "dot": this.dot,
        "info": (_this$badge = this.badge) != null ? _this$badge : this.info
      },
      "class": bem$i("info")
    })])]);
  }
});
var _createNamespace$i = createNamespace$1("skeleton"), createComponent$m = _createNamespace$i[0], bem$h = _createNamespace$i[1];
var DEFAULT_ROW_WIDTH = "100%";
var DEFAULT_LAST_ROW_WIDTH = "60%";
function Skeleton(h, props2, slots4, ctx) {
  if (!props2.loading) {
    return slots4.default && slots4.default();
  }
  function Title2() {
    if (props2.title) {
      return h("h3", {
        "class": bem$h("title"),
        "style": {
          width: addUnit(props2.titleWidth)
        }
      });
    }
  }
  function Rows() {
    var Rows2 = [];
    var rowWidth = props2.rowWidth;
    function getRowWidth(index2) {
      if (rowWidth === DEFAULT_ROW_WIDTH && index2 === +props2.row - 1) {
        return DEFAULT_LAST_ROW_WIDTH;
      }
      if (Array.isArray(rowWidth)) {
        return rowWidth[index2];
      }
      return rowWidth;
    }
    for (var i = 0; i < props2.row; i++) {
      Rows2.push(h("div", {
        "class": bem$h("row"),
        "style": {
          width: addUnit(getRowWidth(i))
        }
      }));
    }
    return Rows2;
  }
  function Avatar() {
    if (props2.avatar) {
      var size2 = addUnit(props2.avatarSize);
      return h("div", {
        "class": bem$h("avatar", props2.avatarShape),
        "style": {
          width: size2,
          height: size2
        }
      });
    }
  }
  return h("div", helper([{
    "class": bem$h({
      animate: props2.animate,
      round: props2.round
    })
  }, inherit(ctx)]), [Avatar(), h("div", {
    "class": bem$h("content")
  }, [Title2(), Rows()])]);
}
Skeleton.props = {
  title: Boolean,
  round: Boolean,
  avatar: Boolean,
  titleWidth: [Number, String],
  avatarSize: [Number, String],
  row: {
    type: [Number, String],
    default: 0
  },
  loading: {
    type: Boolean,
    default: true
  },
  animate: {
    type: Boolean,
    default: true
  },
  avatarShape: {
    type: String,
    default: "round"
  },
  rowWidth: {
    type: [Number, String, Array],
    default: DEFAULT_ROW_WIDTH
  }
};
var Skeleton$1 = createComponent$m(Skeleton);
var lang = {
  "zh-CN": {
    vanSku: {
      select: "\u8BF7\u9009\u62E9",
      selected: "\u5DF2\u9009",
      selectSku: "\u8BF7\u5148\u9009\u62E9\u5546\u54C1\u89C4\u683C",
      soldout: "\u5E93\u5B58\u4E0D\u8DB3",
      originPrice: "\u539F\u4EF7",
      minusTip: "\u81F3\u5C11\u9009\u62E9\u4E00\u4EF6",
      minusStartTip: function minusStartTip(start4) {
        return start4 + "\u4EF6\u8D77\u552E";
      },
      unavailable: "\u5546\u54C1\u5DF2\u7ECF\u65E0\u6CD5\u8D2D\u4E70\u5566",
      stock: "\u5269\u4F59",
      stockUnit: "\u4EF6",
      quotaTip: function quotaTip(quota) {
        return "\u6BCF\u4EBA\u9650\u8D2D" + quota + "\u4EF6";
      },
      quotaUsedTip: function quotaUsedTip(quota, count6) {
        return "\u6BCF\u4EBA\u9650\u8D2D" + quota + "\u4EF6\uFF0C\u4F60\u5DF2\u8D2D\u4E70" + count6 + "\u4EF6";
      }
    },
    vanSkuActions: {
      buy: "\u7ACB\u5373\u8D2D\u4E70",
      addCart: "\u52A0\u5165\u8D2D\u7269\u8F66"
    },
    vanSkuImgUploader: {
      oversize: function oversize(maxSize) {
        return "\u6700\u5927\u53EF\u4E0A\u4F20\u56FE\u7247\u4E3A" + maxSize + "MB\uFF0C\u8BF7\u5C1D\u8BD5\u538B\u7F29\u56FE\u7247\u5C3A\u5BF8";
      },
      fail: "\u4E0A\u4F20\u5931\u8D25",
      uploading: "\u4E0A\u4F20\u4E2D..."
    },
    vanSkuStepper: {
      quotaLimit: function quotaLimit(quota) {
        return "\u9650\u8D2D" + quota + "\u4EF6";
      },
      quotaStart: function quotaStart(start4) {
        return start4 + "\u4EF6\u8D77\u552E";
      },
      comma: "\uFF0C",
      num: "\u8D2D\u4E70\u6570\u91CF"
    },
    vanSkuMessages: {
      fill: "\u8BF7\u586B\u5199",
      upload: "\u8BF7\u4E0A\u4F20",
      imageLabel: "\u4EC5\u9650\u4E00\u5F20",
      invalid: {
        tel: "\u8BF7\u586B\u5199\u6B63\u786E\u7684\u6570\u5B57\u683C\u5F0F\u7559\u8A00",
        mobile: "\u624B\u673A\u53F7\u957F\u5EA6\u4E3A6-20\u4F4D\u6570\u5B57",
        email: "\u8BF7\u586B\u5199\u6B63\u786E\u7684\u90AE\u7BB1",
        id_no: "\u8BF7\u586B\u5199\u6B63\u786E\u7684\u8EAB\u4EFD\u8BC1\u53F7\u7801"
      },
      placeholder: {
        id_no: "\u8BF7\u586B\u5199\u8EAB\u4EFD\u8BC1\u53F7",
        text: "\u8BF7\u586B\u5199\u7559\u8A00",
        tel: "\u8BF7\u586B\u5199\u6570\u5B57",
        email: "\u8BF7\u586B\u5199\u90AE\u7BB1",
        date: "\u8BF7\u9009\u62E9\u65E5\u671F",
        time: "\u8BF7\u9009\u62E9\u65F6\u95F4",
        textarea: "\u8BF7\u586B\u5199\u7559\u8A00",
        mobile: "\u8BF7\u586B\u5199\u624B\u673A\u53F7"
      }
    },
    vanSkuRow: {
      multiple: "\u53EF\u591A\u9009"
    },
    vanSkuDatetimeField: {
      title: {
        date: "\u9009\u62E9\u5E74\u6708\u65E5",
        time: "\u9009\u62E9\u65F6\u95F4",
        datetime: "\u9009\u62E9\u65E5\u671F\u65F6\u95F4"
      },
      format: {
        year: "\u5E74",
        month: "\u6708",
        day: "\u65E5",
        hour: "\u65F6",
        minute: "\u5206"
      }
    }
  }
};
var LIMIT_TYPE = {
  QUOTA_LIMIT: 0,
  STOCK_LIMIT: 1
};
var UNSELECTED_SKU_VALUE_ID = "";
var constants = {
  LIMIT_TYPE,
  UNSELECTED_SKU_VALUE_ID
};
var normalizeSkuTree = function normalizeSkuTree2(skuTree2) {
  var normalizedTree = {};
  skuTree2.forEach(function(treeItem) {
    normalizedTree[treeItem.k_s] = treeItem.v;
  });
  return normalizedTree;
};
var normalizePropList = function normalizePropList2(propList2) {
  var normalizedProp = {};
  propList2.forEach(function(item) {
    var itemObj = {};
    item.v.forEach(function(it) {
      itemObj[it.id] = it;
    });
    normalizedProp[item.k_id] = itemObj;
  });
  return normalizedProp;
};
var isAllSelected = function isAllSelected2(skuTree2, selectedSku) {
  var selected = Object.keys(selectedSku).filter(function(skuKeyStr) {
    return selectedSku[skuKeyStr] !== UNSELECTED_SKU_VALUE_ID;
  });
  return skuTree2.length === selected.length;
};
var getSkuComb = function getSkuComb2(skuList2, selectedSku) {
  var skuComb = skuList2.filter(function(item) {
    return Object.keys(selectedSku).every(function(skuKeyStr) {
      return String(item[skuKeyStr]) === String(selectedSku[skuKeyStr]);
    });
  });
  return skuComb[0];
};
var getSelectedSkuValues = function getSelectedSkuValues2(skuTree2, selectedSku) {
  var normalizedTree = normalizeSkuTree(skuTree2);
  return Object.keys(selectedSku).reduce(function(selectedValues, skuKeyStr) {
    var skuValues = normalizedTree[skuKeyStr] || [];
    var skuValueId = selectedSku[skuKeyStr];
    if (skuValueId !== UNSELECTED_SKU_VALUE_ID && skuValues.length > 0) {
      var skuValue = skuValues.filter(function(value17) {
        return value17.id === skuValueId;
      })[0];
      skuValue && selectedValues.push(skuValue);
    }
    return selectedValues;
  }, []);
};
var isSkuChoosable = function isSkuChoosable2(skuList2, selectedSku, skuToChoose) {
  var _extends2;
  var key = skuToChoose.key, valueId = skuToChoose.valueId;
  var matchedSku = _extends$1({}, selectedSku, (_extends2 = {}, _extends2[key] = valueId, _extends2));
  var skusToCheck = Object.keys(matchedSku).filter(function(skuKey) {
    return matchedSku[skuKey] !== UNSELECTED_SKU_VALUE_ID;
  });
  var filteredSku = skuList2.filter(function(sku) {
    return skusToCheck.every(function(skuKey) {
      return String(matchedSku[skuKey]) === String(sku[skuKey]);
    });
  });
  var stock2 = filteredSku.reduce(function(total, sku) {
    total += sku.stock_num;
    return total;
  }, 0);
  return stock2 > 0;
};
var getSelectedPropValues = function getSelectedPropValues2(propList2, selectedProp) {
  var normalizeProp = normalizePropList(propList2);
  return Object.keys(selectedProp).reduce(function(acc, cur) {
    selectedProp[cur].forEach(function(it) {
      acc.push(_extends$1({}, normalizeProp[cur][it]));
    });
    return acc;
  }, []);
};
var getSelectedProperties = function getSelectedProperties2(propList2, selectedProp) {
  var list2 = [];
  (propList2 || []).forEach(function(prop) {
    if (selectedProp[prop.k_id] && selectedProp[prop.k_id].length > 0) {
      var v = [];
      prop.v.forEach(function(it) {
        if (selectedProp[prop.k_id].indexOf(it.id) > -1) {
          v.push(_extends$1({}, it));
        }
      });
      list2.push(_extends$1({}, prop, {
        v
      }));
    }
  });
  return list2;
};
var skuHelper = {
  normalizeSkuTree,
  getSkuComb,
  getSelectedSkuValues,
  isAllSelected,
  isSkuChoosable,
  getSelectedPropValues,
  getSelectedProperties
};
var _createNamespace$h = createNamespace$1("sku-header"), createComponent$l = _createNamespace$h[0], bem$g = _createNamespace$h[1];
function getSkuImgValue(sku, selectedSku) {
  var imgValue;
  sku.tree.some(function(item) {
    var id = selectedSku[item.k_s];
    if (id && item.v) {
      var matchedSku = item.v.filter(function(skuValue) {
        return skuValue.id === id;
      })[0] || {};
      var img = matchedSku.previewImgUrl || matchedSku.imgUrl || matchedSku.img_url;
      if (img) {
        imgValue = _extends$1({}, matchedSku, {
          ks: item.k_s,
          imgUrl: img
        });
        return true;
      }
    }
    return false;
  });
  return imgValue;
}
function SkuHeader$1(h, props2, slots4, ctx) {
  var _slots$skuHeaderIma;
  var sku = props2.sku, goods = props2.goods, skuEventBus = props2.skuEventBus, selectedSku = props2.selectedSku, _props$showHeaderImag = props2.showHeaderImage, showHeaderImage = _props$showHeaderImag === void 0 ? true : _props$showHeaderImag;
  var selectedValue = getSkuImgValue(sku, selectedSku);
  var imgUrl2 = selectedValue ? selectedValue.imgUrl : goods.picture;
  var previewImage = function previewImage2() {
    skuEventBus.$emit("sku:previewImage", selectedValue);
  };
  return h("div", helper([{
    "class": [bem$g(), BORDER_BOTTOM]
  }, inherit(ctx)]), [showHeaderImage && h(Image, {
    "attrs": {
      "fit": "cover",
      "src": imgUrl2
    },
    "class": bem$g("img-wrap"),
    "on": {
      "click": previewImage
    }
  }, [(_slots$skuHeaderIma = slots4["sku-header-image-extra"]) == null ? void 0 : _slots$skuHeaderIma.call(slots4)]), h("div", {
    "class": bem$g("goods-info")
  }, [slots4.default == null ? void 0 : slots4.default()])]);
}
SkuHeader$1.props = {
  sku: Object,
  goods: Object,
  skuEventBus: Object,
  selectedSku: Object,
  showHeaderImage: Boolean
};
var SkuHeader$2 = createComponent$l(SkuHeader$1);
var _createNamespace$g = createNamespace$1("sku-header-item"), createComponent$k = _createNamespace$g[0], bem$f = _createNamespace$g[1];
function SkuHeader(h, props2, slots4, ctx) {
  return h("div", helper([{
    "class": bem$f()
  }, inherit(ctx)]), [slots4.default && slots4.default()]);
}
var SkuHeaderItem = createComponent$k(SkuHeader);
var _createNamespace$f = createNamespace$1("sku-row"), createComponent$j = _createNamespace$f[0], bem$e = _createNamespace$f[1], t$9 = _createNamespace$f[2];
var SkuRow = createComponent$j({
  mixins: [ParentMixin("vanSkuRows"), BindEventMixin(function(bind3) {
    if (this.scrollable && this.$refs.scroller) {
      bind3(this.$refs.scroller, "scroll", this.onScroll);
    }
  })],
  props: {
    skuRow: Object
  },
  data: function data38() {
    return {
      progress: 0
    };
  },
  computed: {
    scrollable: function scrollable2() {
      return this.skuRow.largeImageMode && this.skuRow.v.length > 6;
    }
  },
  methods: {
    onScroll: function onScroll6() {
      var _this$$refs = this.$refs, scroller2 = _this$$refs.scroller, row = _this$$refs.row;
      var distance = row.offsetWidth - scroller2.offsetWidth;
      this.progress = scroller2.scrollLeft / distance;
    },
    genTitle: function genTitle6() {
      var h = this.$createElement;
      return h("div", {
        "class": bem$e("title")
      }, [this.skuRow.k, this.skuRow.is_multiple && h("span", {
        "class": bem$e("title-multiple")
      }, ["\uFF08", t$9("multiple"), "\uFF09"])]);
    },
    genIndicator: function genIndicator2() {
      var h = this.$createElement;
      if (this.scrollable) {
        var style12 = {
          transform: "translate3d(" + this.progress * 20 + "px, 0, 0)"
        };
        return h("div", {
          "class": bem$e("indicator-wrapper")
        }, [h("div", {
          "class": bem$e("indicator")
        }, [h("div", {
          "class": bem$e("indicator-slider"),
          "style": style12
        })])]);
      }
    },
    genContent: function genContent5() {
      var h = this.$createElement;
      var nodes = this.slots();
      if (this.skuRow.largeImageMode) {
        var top2 = [];
        var bottom2 = [];
        nodes.forEach(function(node, index2) {
          var group = Math.floor(index2 / 3) % 2 === 0 ? top2 : bottom2;
          group.push(node);
        });
        return h("div", {
          "class": bem$e("scroller"),
          "ref": "scroller"
        }, [h("div", {
          "class": bem$e("row"),
          "ref": "row"
        }, [top2]), bottom2.length ? h("div", {
          "class": bem$e("row")
        }, [bottom2]) : null]);
      }
      return nodes;
    },
    centerItem: function centerItem(selectSkuId) {
      if (!this.skuRow.largeImageMode || !selectSkuId) {
        return;
      }
      var _this$children = this.children, children3 = _this$children === void 0 ? [] : _this$children;
      var _this$$refs2 = this.$refs, scroller2 = _this$$refs2.scroller, row = _this$$refs2.row;
      var child = children3.find(function(it) {
        return +it.skuValue.id === +selectSkuId;
      });
      if (scroller2 && row && child && child.$el) {
        var target2 = child.$el;
        var to = target2.offsetLeft - (scroller2.offsetWidth - target2.offsetWidth) / 2;
        scroller2.scrollLeft = to;
      }
    }
  },
  render: function render69() {
    var h = arguments[0];
    return h("div", {
      "class": [bem$e(), BORDER_BOTTOM]
    }, [this.genTitle(), this.genContent(), this.genIndicator()]);
  }
});
var _createNamespace$e = createNamespace$1("sku-row-item"), createComponent$i = _createNamespace$e[0];
var SkuRowItem = createComponent$i({
  mixins: [ChildrenMixin("vanSkuRows")],
  props: {
    lazyLoad: Boolean,
    skuValue: Object,
    skuKeyStr: String,
    skuEventBus: Object,
    selectedSku: Object,
    largeImageMode: Boolean,
    disableSoldoutSku: Boolean,
    skuList: {
      type: Array,
      default: function _default24() {
        return [];
      }
    }
  },
  computed: {
    imgUrl: function imgUrl() {
      var url = this.skuValue.imgUrl || this.skuValue.img_url;
      return this.largeImageMode ? url || "https://img01.yzcdn.cn/upload_files/2020/06/24/FmKWDg0bN9rMcTp9ne8MXiQWGtLn.png" : url;
    },
    choosable: function choosable() {
      if (!this.disableSoldoutSku) {
        return true;
      }
      return isSkuChoosable(this.skuList, this.selectedSku, {
        key: this.skuKeyStr,
        valueId: this.skuValue.id
      });
    }
  },
  methods: {
    onSelect: function onSelect4() {
      if (this.choosable) {
        this.skuEventBus.$emit("sku:select", _extends$1({}, this.skuValue, {
          skuKeyStr: this.skuKeyStr
        }));
      }
    },
    onPreviewImg: function onPreviewImg(event) {
      event.stopPropagation();
      var skuValue = this.skuValue, skuKeyStr = this.skuKeyStr;
      this.skuEventBus.$emit("sku:previewImage", _extends$1({}, skuValue, {
        ks: skuKeyStr,
        imgUrl: skuValue.imgUrl || skuValue.img_url
      }));
    },
    genImage: function genImage3(classPrefix) {
      var h = this.$createElement;
      if (this.imgUrl) {
        return h(Image, {
          "attrs": {
            "fit": "cover",
            "src": this.imgUrl,
            "lazyLoad": this.lazyLoad
          },
          "class": classPrefix + "-img"
        });
      }
    }
  },
  render: function render70() {
    var h = arguments[0];
    var choosed2 = this.skuValue.id === this.selectedSku[this.skuKeyStr];
    var classPrefix = this.largeImageMode ? bem$e("image-item") : bem$e("item");
    return h("span", {
      "class": [classPrefix, choosed2 ? classPrefix + "--active" : "", !this.choosable ? classPrefix + "--disabled" : ""],
      "on": {
        "click": this.onSelect
      }
    }, [this.genImage(classPrefix), h("div", {
      "class": classPrefix + "-name"
    }, [this.largeImageMode ? h("span", {
      "class": {
        "van-multi-ellipsis--l2": this.largeImageMode
      }
    }, [this.skuValue.name]) : this.skuValue.name]), this.largeImageMode && h(Icon$1, {
      "attrs": {
        "name": "enlarge"
      },
      "class": classPrefix + "-img-icon",
      "on": {
        "click": this.onPreviewImg
      }
    })]);
  }
});
var _createNamespace$d = createNamespace$1("sku-row-prop-item"), createComponent$h = _createNamespace$d[0];
var SkuRowPropItem = createComponent$h({
  props: {
    skuValue: Object,
    skuKeyStr: String,
    skuEventBus: Object,
    selectedProp: Object,
    multiple: Boolean
  },
  computed: {
    choosed: function choosed() {
      var selectedProp = this.selectedProp, skuKeyStr = this.skuKeyStr, skuValue = this.skuValue;
      if (selectedProp && selectedProp[skuKeyStr]) {
        return selectedProp[skuKeyStr].indexOf(skuValue.id) > -1;
      }
      return false;
    }
  },
  methods: {
    onSelect: function onSelect5() {
      this.skuEventBus.$emit("sku:propSelect", _extends$1({}, this.skuValue, {
        skuKeyStr: this.skuKeyStr,
        multiple: this.multiple
      }));
    }
  },
  render: function render71() {
    var h = arguments[0];
    return h("span", {
      "class": ["van-sku-row__item", {
        "van-sku-row__item--active": this.choosed
      }],
      "on": {
        "click": this.onSelect
      }
    }, [h("span", {
      "class": "van-sku-row__item-name"
    }, [this.skuValue.name])]);
  }
});
var _createNamespace$c = createNamespace$1("stepper"), createComponent$g = _createNamespace$c[0], bem$d = _createNamespace$c[1];
var LONG_PRESS_START_TIME = 600;
var LONG_PRESS_INTERVAL = 200;
function equal(value1, value22) {
  return String(value1) === String(value22);
}
var Stepper = createComponent$g({
  mixins: [FieldMixin],
  props: {
    value: null,
    theme: String,
    integer: Boolean,
    disabled: Boolean,
    allowEmpty: Boolean,
    inputWidth: [Number, String],
    buttonSize: [Number, String],
    asyncChange: Boolean,
    placeholder: String,
    disablePlus: Boolean,
    disableMinus: Boolean,
    disableInput: Boolean,
    decimalLength: [Number, String],
    name: {
      type: [Number, String],
      default: ""
    },
    min: {
      type: [Number, String],
      default: 1
    },
    max: {
      type: [Number, String],
      default: Infinity
    },
    step: {
      type: [Number, String],
      default: 1
    },
    defaultValue: {
      type: [Number, String],
      default: 1
    },
    showPlus: {
      type: Boolean,
      default: true
    },
    showMinus: {
      type: Boolean,
      default: true
    },
    showInput: {
      type: Boolean,
      default: true
    },
    longPress: {
      type: Boolean,
      default: true
    }
  },
  data: function data39() {
    var _this$value;
    var defaultValue = (_this$value = this.value) != null ? _this$value : this.defaultValue;
    var value17 = this.format(defaultValue);
    if (!equal(value17, this.value)) {
      this.$emit("input", value17);
    }
    return {
      currentValue: value17
    };
  },
  computed: {
    minusDisabled: function minusDisabled() {
      return this.disabled || this.disableMinus || this.currentValue <= +this.min;
    },
    plusDisabled: function plusDisabled() {
      return this.disabled || this.disablePlus || this.currentValue >= +this.max;
    },
    inputStyle: function inputStyle() {
      var style12 = {};
      if (this.inputWidth) {
        style12.width = addUnit(this.inputWidth);
      }
      if (this.buttonSize) {
        style12.height = addUnit(this.buttonSize);
      }
      return style12;
    },
    buttonStyle: function buttonStyle() {
      if (this.buttonSize) {
        var size2 = addUnit(this.buttonSize);
        return {
          width: size2,
          height: size2
        };
      }
    }
  },
  watch: {
    max: "check",
    min: "check",
    integer: "check",
    decimalLength: "check",
    value: function value12(val) {
      if (!equal(val, this.currentValue)) {
        this.currentValue = this.format(val);
      }
    },
    currentValue: function currentValue(val) {
      this.$emit("input", val);
      this.$emit("change", val, {
        name: this.name
      });
    }
  },
  methods: {
    check: function check2() {
      var val = this.format(this.currentValue);
      if (!equal(val, this.currentValue)) {
        this.currentValue = val;
      }
    },
    formatNumber: function formatNumber$1(value17) {
      return formatNumber(String(value17), !this.integer);
    },
    format: function format3(value17) {
      if (this.allowEmpty && value17 === "") {
        return value17;
      }
      value17 = this.formatNumber(value17);
      value17 = value17 === "" ? 0 : +value17;
      value17 = isNaN$1(value17) ? this.min : value17;
      value17 = Math.max(Math.min(this.max, value17), this.min);
      if (isDef(this.decimalLength)) {
        value17 = value17.toFixed(this.decimalLength);
      }
      return value17;
    },
    onInput: function onInput2(event) {
      var value17 = event.target.value;
      var formatted = this.formatNumber(value17);
      if (isDef(this.decimalLength) && formatted.indexOf(".") !== -1) {
        var pair = formatted.split(".");
        formatted = pair[0] + "." + pair[1].slice(0, this.decimalLength);
      }
      if (!equal(value17, formatted)) {
        event.target.value = formatted;
      }
      if (formatted === String(+formatted)) {
        formatted = +formatted;
      }
      this.emitChange(formatted);
    },
    emitChange: function emitChange(value17) {
      if (this.asyncChange) {
        this.$emit("input", value17);
        this.$emit("change", value17, {
          name: this.name
        });
      } else {
        this.currentValue = value17;
      }
    },
    onChange: function onChange5() {
      var type2 = this.type;
      if (this[type2 + "Disabled"]) {
        this.$emit("overlimit", type2);
        return;
      }
      var diff = type2 === "minus" ? -this.step : +this.step;
      var value17 = this.format(addNumber(+this.currentValue, diff));
      this.emitChange(value17);
      this.$emit(type2);
    },
    onFocus: function onFocus4(event) {
      if (this.disableInput && this.$refs.input) {
        this.$refs.input.blur();
      } else {
        this.$emit("focus", event);
      }
    },
    onBlur: function onBlur3(event) {
      var value17 = this.format(event.target.value);
      event.target.value = value17;
      this.emitChange(value17);
      this.$emit("blur", event);
      resetScroll();
    },
    longPressStep: function longPressStep() {
      var _this = this;
      this.longPressTimer = setTimeout(function() {
        _this.onChange();
        _this.longPressStep(_this.type);
      }, LONG_PRESS_INTERVAL);
    },
    onTouchStart: function onTouchStart7() {
      var _this2 = this;
      if (!this.longPress) {
        return;
      }
      clearTimeout(this.longPressTimer);
      this.isLongPress = false;
      this.longPressTimer = setTimeout(function() {
        _this2.isLongPress = true;
        _this2.onChange();
        _this2.longPressStep();
      }, LONG_PRESS_START_TIME);
    },
    onTouchEnd: function onTouchEnd8(event) {
      if (!this.longPress) {
        return;
      }
      clearTimeout(this.longPressTimer);
      if (this.isLongPress) {
        preventDefault(event);
      }
    },
    onMousedown: function onMousedown(event) {
      if (this.disableInput) {
        event.preventDefault();
      }
    }
  },
  render: function render72() {
    var _this3 = this;
    var h = arguments[0];
    var createListeners = function createListeners2(type2) {
      return {
        on: {
          click: function click(e) {
            e.preventDefault();
            _this3.type = type2;
            _this3.onChange();
          },
          touchstart: function touchstart() {
            _this3.type = type2;
            _this3.onTouchStart();
          },
          touchend: _this3.onTouchEnd,
          touchcancel: _this3.onTouchEnd
        }
      };
    };
    return h("div", {
      "class": bem$d([this.theme])
    }, [h("button", helper([{
      "directives": [{
        name: "show",
        value: this.showMinus
      }],
      "attrs": {
        "type": "button"
      },
      "style": this.buttonStyle,
      "class": bem$d("minus", {
        disabled: this.minusDisabled
      })
    }, createListeners("minus")])), h("input", {
      "directives": [{
        name: "show",
        value: this.showInput
      }],
      "ref": "input",
      "attrs": {
        "type": this.integer ? "tel" : "text",
        "role": "spinbutton",
        "disabled": this.disabled,
        "readonly": this.disableInput,
        "inputmode": this.integer ? "numeric" : "decimal",
        "placeholder": this.placeholder,
        "aria-valuemax": this.max,
        "aria-valuemin": this.min,
        "aria-valuenow": this.currentValue
      },
      "class": bem$d("input"),
      "domProps": {
        "value": this.currentValue
      },
      "style": this.inputStyle,
      "on": {
        "input": this.onInput,
        "focus": this.onFocus,
        "blur": this.onBlur,
        "mousedown": this.onMousedown
      }
    }), h("button", helper([{
      "directives": [{
        name: "show",
        value: this.showPlus
      }],
      "attrs": {
        "type": "button"
      },
      "style": this.buttonStyle,
      "class": bem$d("plus", {
        disabled: this.plusDisabled
      })
    }, createListeners("plus")]))]);
  }
});
var namespace$3 = createNamespace$1("sku-stepper");
var createComponent$f = namespace$3[0];
var t$8 = namespace$3[2];
var QUOTA_LIMIT$1 = LIMIT_TYPE.QUOTA_LIMIT, STOCK_LIMIT = LIMIT_TYPE.STOCK_LIMIT;
var SkuStepper = createComponent$f({
  props: {
    stock: Number,
    skuEventBus: Object,
    skuStockNum: Number,
    selectedNum: Number,
    stepperTitle: String,
    disableStepperInput: Boolean,
    customStepperConfig: Object,
    hideQuotaText: Boolean,
    quota: {
      type: Number,
      default: 0
    },
    quotaUsed: {
      type: Number,
      default: 0
    },
    startSaleNum: {
      type: Number,
      default: 1
    }
  },
  data: function data40() {
    return {
      currentNum: this.selectedNum,
      limitType: STOCK_LIMIT
    };
  },
  watch: {
    currentNum: function currentNum(num) {
      var intValue = parseInt(num, 10);
      if (intValue >= this.stepperMinLimit && intValue <= this.stepperLimit) {
        this.skuEventBus.$emit("sku:numChange", intValue);
      }
    },
    stepperLimit: function stepperLimit(limit) {
      if (limit < this.currentNum && this.stepperMinLimit <= limit) {
        this.currentNum = limit;
      }
      this.checkState(this.stepperMinLimit, limit);
    },
    stepperMinLimit: function stepperMinLimit(start4) {
      if (start4 > this.currentNum || start4 > this.stepperLimit) {
        this.currentNum = start4;
      }
      this.checkState(start4, this.stepperLimit);
    }
  },
  computed: {
    stepperLimit: function stepperLimit2() {
      var quotaLimit2 = this.quota - this.quotaUsed;
      var limit;
      if (this.quota > 0 && quotaLimit2 <= this.stock) {
        limit = quotaLimit2 < 0 ? 0 : quotaLimit2;
        this.limitType = QUOTA_LIMIT$1;
      } else {
        limit = this.stock;
        this.limitType = STOCK_LIMIT;
      }
      return limit;
    },
    stepperMinLimit: function stepperMinLimit2() {
      return this.startSaleNum < 1 ? 1 : this.startSaleNum;
    },
    quotaText: function quotaText() {
      var _this$customStepperCo = this.customStepperConfig, quotaText2 = _this$customStepperCo.quotaText, hideQuotaText = _this$customStepperCo.hideQuotaText;
      if (hideQuotaText)
        return "";
      var text2 = "";
      if (quotaText2) {
        text2 = quotaText2;
      } else {
        var textArr = [];
        if (this.startSaleNum > 1) {
          textArr.push(t$8("quotaStart", this.startSaleNum));
        }
        if (this.quota > 0) {
          textArr.push(t$8("quotaLimit", this.quota));
        }
        text2 = textArr.join(t$8("comma"));
      }
      return text2;
    }
  },
  created: function created9() {
    this.checkState(this.stepperMinLimit, this.stepperLimit);
  },
  methods: {
    setCurrentNum: function setCurrentNum(num) {
      this.currentNum = num;
      this.checkState(this.stepperMinLimit, this.stepperLimit);
    },
    onOverLimit: function onOverLimit(action) {
      this.skuEventBus.$emit("sku:overLimit", {
        action,
        limitType: this.limitType,
        quota: this.quota,
        quotaUsed: this.quotaUsed,
        startSaleNum: this.startSaleNum
      });
    },
    onChange: function onChange6(currentValue2) {
      var intValue = parseInt(currentValue2, 10);
      var handleStepperChange = this.customStepperConfig.handleStepperChange;
      handleStepperChange && handleStepperChange(intValue);
      this.$emit("change", intValue);
    },
    checkState: function checkState(min, max) {
      if (this.currentNum < min || min > max) {
        this.currentNum = min;
      } else if (this.currentNum > max) {
        this.currentNum = max;
      }
      this.skuEventBus.$emit("sku:stepperState", {
        valid: min <= max,
        min,
        max,
        limitType: this.limitType,
        quota: this.quota,
        quotaUsed: this.quotaUsed,
        startSaleNum: this.startSaleNum
      });
    }
  },
  render: function render73() {
    var _this = this;
    var h = arguments[0];
    return h("div", {
      "class": "van-sku-stepper-stock"
    }, [h("div", {
      "class": "van-sku__stepper-title"
    }, [this.stepperTitle || t$8("num")]), h(Stepper, {
      "attrs": {
        "integer": true,
        "min": this.stepperMinLimit,
        "max": this.stepperLimit,
        "disableInput": this.disableStepperInput
      },
      "class": "van-sku__stepper",
      "on": {
        "overlimit": this.onOverLimit,
        "change": this.onChange
      },
      "model": {
        value: _this.currentNum,
        callback: function callback2($$v) {
          _this.currentNum = $$v;
        }
      }
    }), !this.hideQuotaText && this.quotaText && h("span", {
      "class": "van-sku__stepper-quota"
    }, ["(", this.quotaText, ")"])]);
  }
});
function isEmail(value17) {
  var reg = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return reg.test(value17.trim());
}
function toArray(item) {
  if (Array.isArray(item)) {
    return item;
  }
  return [item];
}
function readFile(file, resultType) {
  return new Promise(function(resolve) {
    if (resultType === "file") {
      resolve(null);
      return;
    }
    var reader = new FileReader();
    reader.onload = function(event) {
      resolve(event.target.result);
    };
    if (resultType === "dataUrl") {
      reader.readAsDataURL(file);
    } else if (resultType === "text") {
      reader.readAsText(file);
    }
  });
}
function isOversize(files, maxSize) {
  return toArray(files).some(function(file) {
    if (file) {
      if (isFunction$1(maxSize)) {
        return maxSize(file);
      }
      return file.size > maxSize;
    }
    return false;
  });
}
var IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
function isImageUrl(url) {
  return IMAGE_REGEXP.test(url);
}
function isImageFile(item) {
  if (item.isImage) {
    return true;
  }
  if (item.file && item.file.type) {
    return item.file.type.indexOf("image") === 0;
  }
  if (item.url) {
    return isImageUrl(item.url);
  }
  if (item.content) {
    return item.content.indexOf("data:image") === 0;
  }
  return false;
}
var _createNamespace$b = createNamespace$1("uploader"), createComponent$e = _createNamespace$b[0], bem$c = _createNamespace$b[1];
var Uploader = createComponent$e({
  inheritAttrs: false,
  mixins: [FieldMixin],
  model: {
    prop: "fileList"
  },
  props: {
    disabled: Boolean,
    readonly: Boolean,
    lazyLoad: Boolean,
    uploadText: String,
    afterRead: Function,
    beforeRead: Function,
    beforeDelete: Function,
    previewSize: [Number, String],
    previewOptions: Object,
    name: {
      type: [Number, String],
      default: ""
    },
    accept: {
      type: String,
      default: "image/*"
    },
    fileList: {
      type: Array,
      default: function _default25() {
        return [];
      }
    },
    maxSize: {
      type: [Number, String, Function],
      default: Number.MAX_VALUE
    },
    maxCount: {
      type: [Number, String],
      default: Number.MAX_VALUE
    },
    deletable: {
      type: Boolean,
      default: true
    },
    showUpload: {
      type: Boolean,
      default: true
    },
    previewImage: {
      type: Boolean,
      default: true
    },
    previewFullImage: {
      type: Boolean,
      default: true
    },
    imageFit: {
      type: String,
      default: "cover"
    },
    resultType: {
      type: String,
      default: "dataUrl"
    },
    uploadIcon: {
      type: String,
      default: "photograph"
    }
  },
  computed: {
    previewSizeWithUnit: function previewSizeWithUnit() {
      return addUnit(this.previewSize);
    },
    value: function value13() {
      return this.fileList;
    }
  },
  created: function created10() {
    this.urls = [];
  },
  beforeDestroy: function beforeDestroy5() {
    this.urls.forEach(function(url) {
      return URL.revokeObjectURL(url);
    });
  },
  methods: {
    getDetail: function getDetail(index2) {
      if (index2 === void 0) {
        index2 = this.fileList.length;
      }
      return {
        name: this.name,
        index: index2
      };
    },
    onChange: function onChange7(event) {
      var _this = this;
      var files = event.target.files;
      if (this.disabled || !files.length) {
        return;
      }
      files = files.length === 1 ? files[0] : [].slice.call(files);
      if (this.beforeRead) {
        var response = this.beforeRead(files, this.getDetail());
        if (!response) {
          this.resetInput();
          return;
        }
        if (isPromise(response)) {
          response.then(function(data49) {
            if (data49) {
              _this.readFile(data49);
            } else {
              _this.readFile(files);
            }
          }).catch(this.resetInput);
          return;
        }
      }
      this.readFile(files);
    },
    readFile: function readFile$1(files) {
      var _this2 = this;
      var oversize2 = isOversize(files, this.maxSize);
      if (Array.isArray(files)) {
        var maxCount2 = this.maxCount - this.fileList.length;
        if (files.length > maxCount2) {
          files = files.slice(0, maxCount2);
        }
        Promise.all(files.map(function(file) {
          return readFile(file, _this2.resultType);
        })).then(function(contents) {
          var fileList = files.map(function(file, index2) {
            var result = {
              file,
              status: "",
              message: ""
            };
            if (contents[index2]) {
              result.content = contents[index2];
            }
            return result;
          });
          _this2.onAfterRead(fileList, oversize2);
        });
      } else {
        readFile(files, this.resultType).then(function(content) {
          var result = {
            file: files,
            status: "",
            message: ""
          };
          if (content) {
            result.content = content;
          }
          _this2.onAfterRead(result, oversize2);
        });
      }
    },
    onAfterRead: function onAfterRead(files, oversize2) {
      var _this3 = this;
      this.resetInput();
      var validFiles = files;
      if (oversize2) {
        var oversizeFiles = files;
        if (Array.isArray(files)) {
          oversizeFiles = [];
          validFiles = [];
          files.forEach(function(item) {
            if (item.file) {
              if (isOversize(item.file, _this3.maxSize)) {
                oversizeFiles.push(item);
              } else {
                validFiles.push(item);
              }
            }
          });
        } else {
          validFiles = null;
        }
        this.$emit("oversize", oversizeFiles, this.getDetail());
      }
      var isValidFiles = Array.isArray(validFiles) ? Boolean(validFiles.length) : Boolean(validFiles);
      if (isValidFiles) {
        this.$emit("input", [].concat(this.fileList, toArray(validFiles)));
        if (this.afterRead) {
          this.afterRead(validFiles, this.getDetail());
        }
      }
    },
    onDelete: function onDelete3(file, index2) {
      var _file$beforeDelete, _this4 = this;
      var beforeDelete = (_file$beforeDelete = file.beforeDelete) != null ? _file$beforeDelete : this.beforeDelete;
      if (beforeDelete) {
        var response = beforeDelete(file, this.getDetail(index2));
        if (!response) {
          return;
        }
        if (isPromise(response)) {
          response.then(function() {
            _this4.deleteFile(file, index2);
          }).catch(noop);
          return;
        }
      }
      this.deleteFile(file, index2);
    },
    deleteFile: function deleteFile(file, index2) {
      var fileList = this.fileList.slice(0);
      fileList.splice(index2, 1);
      this.$emit("input", fileList);
      this.$emit("delete", file, this.getDetail(index2));
    },
    resetInput: function resetInput() {
      if (this.$refs.input) {
        this.$refs.input.value = "";
      }
    },
    onClickUpload: function onClickUpload(event) {
      this.$emit("click-upload", event);
    },
    onPreviewImage: function onPreviewImage(item) {
      var _this5 = this;
      if (!this.previewFullImage) {
        return;
      }
      var imageFiles = this.fileList.filter(function(item2) {
        return isImageFile(item2);
      });
      var imageContents = imageFiles.map(function(item2) {
        if (item2.file && !item2.url) {
          item2.url = URL.createObjectURL(item2.file);
          _this5.urls.push(item2.url);
        }
        return item2.url;
      });
      this.imagePreview = ImagePreview$1(_extends$1({
        images: imageContents,
        startPosition: imageFiles.indexOf(item),
        onClose: function onClose5() {
          _this5.$emit("close-preview");
        }
      }, this.previewOptions));
    },
    closeImagePreview: function closeImagePreview() {
      if (this.imagePreview) {
        this.imagePreview.close();
      }
    },
    chooseFile: function chooseFile() {
      if (this.disabled) {
        return;
      }
      if (this.$refs.input) {
        this.$refs.input.click();
      }
    },
    genPreviewMask: function genPreviewMask(item) {
      var h = this.$createElement;
      var status2 = item.status, message = item.message;
      if (status2 === "uploading" || status2 === "failed") {
        var MaskIcon = status2 === "failed" ? h(Icon$1, {
          "attrs": {
            "name": "close"
          },
          "class": bem$c("mask-icon")
        }) : h(Loading$1, {
          "class": bem$c("loading")
        });
        var showMessage = isDef(message) && message !== "";
        return h("div", {
          "class": bem$c("mask")
        }, [MaskIcon, showMessage && h("div", {
          "class": bem$c("mask-message")
        }, [message])]);
      }
    },
    genPreviewItem: function genPreviewItem(item, index2) {
      var _item$deletable, _this6 = this, _item$previewSize, _item$imageFit;
      var h = this.$createElement;
      var deleteAble = (_item$deletable = item.deletable) != null ? _item$deletable : this.deletable;
      var showDelete = item.status !== "uploading" && deleteAble;
      var DeleteIcon2 = showDelete && h("div", {
        "class": bem$c("preview-delete"),
        "on": {
          "click": function click(event) {
            event.stopPropagation();
            _this6.onDelete(item, index2);
          }
        }
      }, [h(Icon$1, {
        "attrs": {
          "name": "cross"
        },
        "class": bem$c("preview-delete-icon")
      })]);
      var PreviewCoverContent = this.slots("preview-cover", _extends$1({
        index: index2
      }, item));
      var PreviewCover = PreviewCoverContent && h("div", {
        "class": bem$c("preview-cover")
      }, [PreviewCoverContent]);
      var previewSize = (_item$previewSize = item.previewSize) != null ? _item$previewSize : this.previewSize;
      var imageFit = (_item$imageFit = item.imageFit) != null ? _item$imageFit : this.imageFit;
      var Preview = isImageFile(item) ? h(Image, {
        "attrs": {
          "fit": imageFit,
          "src": item.content || item.url,
          "width": previewSize,
          "height": previewSize,
          "lazyLoad": this.lazyLoad
        },
        "class": bem$c("preview-image"),
        "on": {
          "click": function click() {
            _this6.onPreviewImage(item);
          }
        }
      }, [PreviewCover]) : h("div", {
        "class": bem$c("file"),
        "style": {
          width: this.previewSizeWithUnit,
          height: this.previewSizeWithUnit
        }
      }, [h(Icon$1, {
        "class": bem$c("file-icon"),
        "attrs": {
          "name": "description"
        }
      }), h("div", {
        "class": [bem$c("file-name"), "van-ellipsis"]
      }, [item.file ? item.file.name : item.url]), PreviewCover]);
      return h("div", {
        "class": bem$c("preview"),
        "on": {
          "click": function click() {
            _this6.$emit("click-preview", item, _this6.getDetail(index2));
          }
        }
      }, [Preview, this.genPreviewMask(item), DeleteIcon2]);
    },
    genPreviewList: function genPreviewList() {
      if (this.previewImage) {
        return this.fileList.map(this.genPreviewItem);
      }
    },
    genUpload: function genUpload() {
      var h = this.$createElement;
      if (this.fileList.length >= this.maxCount || !this.showUpload) {
        return;
      }
      var slot = this.slots();
      var Input = this.readonly ? null : h("input", {
        "attrs": _extends$1({}, this.$attrs, {
          "type": "file",
          "accept": this.accept,
          "disabled": this.disabled
        }),
        "ref": "input",
        "class": bem$c("input"),
        "on": {
          "change": this.onChange
        }
      });
      if (slot) {
        return h("div", {
          "class": bem$c("input-wrapper"),
          "key": "input-wrapper",
          "on": {
            "click": this.onClickUpload
          }
        }, [slot, Input]);
      }
      var style12;
      if (this.previewSize) {
        var size2 = this.previewSizeWithUnit;
        style12 = {
          width: size2,
          height: size2
        };
      }
      return h("div", {
        "class": bem$c("upload", {
          readonly: this.readonly
        }),
        "style": style12,
        "on": {
          "click": this.onClickUpload
        }
      }, [h(Icon$1, {
        "attrs": {
          "name": this.uploadIcon
        },
        "class": bem$c("upload-icon")
      }), this.uploadText && h("span", {
        "class": bem$c("upload-text")
      }, [this.uploadText]), Input]);
    }
  },
  render: function render74() {
    var h = arguments[0];
    return h("div", {
      "class": bem$c()
    }, [h("div", {
      "class": bem$c("wrapper", {
        disabled: this.disabled
      })
    }, [this.genPreviewList(), this.genUpload()])]);
  }
});
var namespace$2 = createNamespace$1("sku-img-uploader");
var createComponent$d = namespace$2[0];
var t$7 = namespace$2[2];
var SkuImgUploader = createComponent$d({
  props: {
    value: String,
    uploadImg: Function,
    customUpload: Function,
    maxSize: {
      type: Number,
      default: 6
    }
  },
  data: function data41() {
    return {
      fileList: []
    };
  },
  watch: {
    value: function value14(val) {
      if (val) {
        this.fileList = [{
          url: val,
          isImage: true
        }];
      } else {
        this.fileList = [];
      }
    }
  },
  methods: {
    afterReadFile: function afterReadFile(file) {
      var _this = this;
      file.status = "uploading";
      file.message = t$7("uploading");
      this.uploadImg(file.file, file.content).then(function(img) {
        file.status = "done";
        _this.$emit("input", img);
      }).catch(function() {
        file.status = "failed";
        file.message = t$7("fail");
      });
    },
    onOversize: function onOversize() {
      this.$toast(t$7("oversize", this.maxSize));
    },
    onDelete: function onDelete4() {
      this.$emit("input", "");
    },
    onClickUpload: function onClickUpload2() {
      var _this2 = this;
      if (this.customUpload) {
        this.customUpload().then(function(url) {
          _this2.fileList.push({
            url
          });
          _this2.$emit("input", url);
        });
      }
    }
  },
  render: function render75() {
    var _this3 = this;
    var h = arguments[0];
    return h(Uploader, {
      "attrs": {
        "maxCount": 1,
        "readonly": !!this.customUpload,
        "maxSize": this.maxSize * 1024 * 1024,
        "afterRead": this.afterReadFile
      },
      "on": {
        "oversize": this.onOversize,
        "delete": this.onDelete,
        "click-upload": this.onClickUpload
      },
      "model": {
        value: _this3.fileList,
        callback: function callback2($$v) {
          _this3.fileList = $$v;
        }
      }
    });
  }
});
function stringToDate(timeString) {
  if (!timeString) {
    return null;
  }
  return new Date(timeString.replace(/-/g, "/"));
}
function dateToString(date, type2) {
  if (type2 === void 0) {
    type2 = "date";
  }
  if (!date) {
    return "";
  }
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var timeString = year + "-" + padZero(month) + "-" + padZero(day);
  if (type2 === "datetime") {
    var hours = date.getHours();
    var minute = date.getMinutes();
    timeString += " " + padZero(hours) + ":" + padZero(minute);
  }
  return timeString;
}
var namespace$1 = createNamespace$1("sku-datetime-field");
var createComponent$c = namespace$1[0];
var t$6 = namespace$1[2];
var SkuDateTimeField = createComponent$c({
  props: {
    value: String,
    label: String,
    required: Boolean,
    placeholder: String,
    type: {
      type: String,
      default: "date"
    }
  },
  data: function data42() {
    return {
      showDatePicker: false,
      currentDate: this.type === "time" ? "" : new Date(),
      minDate: new Date(new Date().getFullYear() - 60, 0, 1)
    };
  },
  watch: {
    value: function value15(val) {
      switch (this.type) {
        case "time":
          this.currentDate = val;
          break;
        case "date":
        case "datetime":
          this.currentDate = stringToDate(val) || new Date();
          break;
      }
    }
  },
  computed: {
    title: function title3() {
      return t$6("title." + this.type);
    }
  },
  methods: {
    onClick: function onClick15() {
      this.showDatePicker = true;
    },
    onConfirm: function onConfirm4(val) {
      var data49 = val;
      if (this.type !== "time") {
        data49 = dateToString(val, this.type);
      }
      this.$emit("input", data49);
      this.showDatePicker = false;
    },
    onCancel: function onCancel3() {
      this.showDatePicker = false;
    },
    formatter: function formatter(type2, val) {
      var word = t$6("format." + type2);
      return "" + val + word;
    }
  },
  render: function render76() {
    var _this = this;
    var h = arguments[0];
    return h(Field, {
      "attrs": {
        "readonly": true,
        "is-link": true,
        "center": true,
        "value": this.value,
        "label": this.label,
        "required": this.required,
        "placeholder": this.placeholder
      },
      "on": {
        "click": this.onClick
      }
    }, [h(Popup, {
      "attrs": {
        "round": true,
        "position": "bottom",
        "getContainer": "body"
      },
      "slot": "extra",
      "model": {
        value: _this.showDatePicker,
        callback: function callback2($$v) {
          _this.showDatePicker = $$v;
        }
      }
    }, [h(DatetimePicker, {
      "attrs": {
        "type": this.type,
        "title": this.title,
        "value": this.currentDate,
        "minDate": this.minDate,
        "formatter": this.formatter
      },
      "on": {
        "cancel": this.onCancel,
        "confirm": this.onConfirm
      }
    })])]);
  }
});
var _createNamespace$a = createNamespace$1("sku-messages"), createComponent$b = _createNamespace$a[0], bem$b = _createNamespace$a[1], t$5 = _createNamespace$a[2];
var SkuMessages = createComponent$b({
  props: {
    messageConfig: Object,
    goodsId: [Number, String],
    messages: {
      type: Array,
      default: function _default26() {
        return [];
      }
    }
  },
  data: function data43() {
    return {
      messageValues: this.resetMessageValues(this.messages)
    };
  },
  watch: {
    messages: function messages3(val) {
      this.messageValues = this.resetMessageValues(val);
    }
  },
  methods: {
    resetMessageValues: function resetMessageValues(messages4) {
      var messageConfig = this.messageConfig;
      var _messageConfig$initia = messageConfig.initialMessages, initialMessages = _messageConfig$initia === void 0 ? {} : _messageConfig$initia;
      return (messages4 || []).map(function(message) {
        return {
          value: initialMessages[message.name] || ""
        };
      });
    },
    getType: function getType2(message) {
      if (+message.multiple === 1) {
        return "textarea";
      }
      if (message.type === "id_no") {
        return "text";
      }
      return message.datetime > 0 ? "datetime" : message.type;
    },
    getMessages: function getMessages() {
      var messages4 = {};
      this.messageValues.forEach(function(item, index2) {
        messages4["message_" + index2] = item.value;
      });
      return messages4;
    },
    getCartMessages: function getCartMessages() {
      var _this = this;
      var messages4 = {};
      this.messageValues.forEach(function(item, index2) {
        var message = _this.messages[index2];
        messages4[message.name] = item.value;
      });
      return messages4;
    },
    getPlaceholder: function getPlaceholder(message) {
      var type2 = +message.multiple === 1 ? "textarea" : message.type;
      var map = this.messageConfig.placeholderMap || {};
      return message.placeholder || map[type2] || t$5("placeholder." + type2);
    },
    validateMessages: function validateMessages() {
      var values = this.messageValues;
      for (var i = 0; i < values.length; i++) {
        var value17 = values[i].value;
        var message = this.messages[i];
        if (value17 === "") {
          if (String(message.required) === "1") {
            var textType = t$5(message.type === "image" ? "upload" : "fill");
            return textType + message.name;
          }
        } else {
          if (message.type === "tel" && !isNumeric(value17)) {
            return t$5("invalid.tel");
          }
          if (message.type === "mobile" && !/^\d{6,20}$/.test(value17)) {
            return t$5("invalid.mobile");
          }
          if (message.type === "email" && !isEmail(value17)) {
            return t$5("invalid.email");
          }
          if (message.type === "id_no" && (value17.length < 15 || value17.length > 18)) {
            return t$5("invalid.id_no");
          }
        }
      }
    },
    getFormatter: function getFormatter(message) {
      return function formatter2(value17) {
        if (message.type === "mobile" || message.type === "tel") {
          return value17.replace(/[^\d.]/g, "");
        }
        return value17;
      };
    },
    getExtraDesc: function getExtraDesc(message) {
      var h = this.$createElement;
      var extraDesc = message.extraDesc;
      if (extraDesc) {
        return h("div", {
          "class": bem$b("extra-message")
        }, [extraDesc]);
      }
    },
    genMessage: function genMessage3(message, index2) {
      var _this2 = this;
      var h = this.$createElement;
      if (message.type === "image") {
        return h(Cell$1, {
          "key": this.goodsId + "-" + index2,
          "attrs": {
            "title": message.name,
            "required": String(message.required) === "1",
            "valueClass": bem$b("image-cell-value")
          },
          "class": bem$b("image-cell")
        }, [h(SkuImgUploader, {
          "attrs": {
            "maxSize": this.messageConfig.uploadMaxSize,
            "uploadImg": this.messageConfig.uploadImg,
            "customUpload": this.messageConfig.customUpload
          },
          "model": {
            value: _this2.messageValues[index2].value,
            callback: function callback2($$v) {
              _this2.$set(_this2.messageValues[index2], "value", $$v);
            }
          }
        }), h("div", {
          "class": bem$b("image-cell-label")
        }, [t$5("imageLabel")])]);
      }
      var isDateOrTime = ["date", "time"].indexOf(message.type) > -1;
      if (isDateOrTime) {
        return h(SkuDateTimeField, {
          "attrs": {
            "label": message.name,
            "required": String(message.required) === "1",
            "placeholder": this.getPlaceholder(message),
            "type": this.getType(message)
          },
          "key": this.goodsId + "-" + index2,
          "model": {
            value: _this2.messageValues[index2].value,
            callback: function callback2($$v) {
              _this2.$set(_this2.messageValues[index2], "value", $$v);
            }
          }
        });
      }
      return h("div", {
        "class": bem$b("cell-block")
      }, [h(Field, {
        "attrs": {
          "maxlength": "200",
          "center": !message.multiple,
          "label": message.name,
          "required": String(message.required) === "1",
          "placeholder": this.getPlaceholder(message),
          "type": this.getType(message),
          "formatter": this.getFormatter(message),
          "border": false
        },
        "key": this.goodsId + "-" + index2,
        "model": {
          value: _this2.messageValues[index2].value,
          callback: function callback2($$v) {
            _this2.$set(_this2.messageValues[index2], "value", $$v);
          }
        }
      }), this.getExtraDesc(message)]);
    }
  },
  render: function render77() {
    var h = arguments[0];
    return h("div", {
      "class": bem$b()
    }, [this.messages.map(this.genMessage)]);
  }
});
var _createNamespace$9 = createNamespace$1("sku-actions"), createComponent$a = _createNamespace$9[0], bem$a = _createNamespace$9[1], t$4 = _createNamespace$9[2];
function SkuActions(h, props2, slots4, ctx) {
  var createEmitter = function createEmitter2(name) {
    return function() {
      props2.skuEventBus.$emit(name);
    };
  };
  return h("div", helper([{
    "class": bem$a()
  }, inherit(ctx)]), [props2.showAddCartBtn && h(Button$1, {
    "attrs": {
      "size": "large",
      "type": "warning",
      "text": props2.addCartText || t$4("addCart")
    },
    "on": {
      "click": createEmitter("sku:addCart")
    }
  }), h(Button$1, {
    "attrs": {
      "size": "large",
      "type": "danger",
      "text": props2.buyText || t$4("buy")
    },
    "on": {
      "click": createEmitter("sku:buy")
    }
  })]);
}
SkuActions.props = {
  buyText: String,
  addCartText: String,
  skuEventBus: Object,
  showAddCartBtn: Boolean
};
var SkuActions$1 = createComponent$a(SkuActions);
var namespace = createNamespace$1("sku");
var createComponent$9 = namespace[0], bem$9 = namespace[1], t$3 = namespace[2];
var QUOTA_LIMIT = LIMIT_TYPE.QUOTA_LIMIT;
var Sku = createComponent$9({
  props: {
    sku: Object,
    goods: Object,
    value: Boolean,
    buyText: String,
    goodsId: [Number, String],
    priceTag: String,
    lazyLoad: Boolean,
    hideStock: Boolean,
    properties: Array,
    addCartText: String,
    stepperTitle: String,
    getContainer: [String, Function],
    hideQuotaText: Boolean,
    hideSelectedText: Boolean,
    resetStepperOnHide: Boolean,
    customSkuValidator: Function,
    disableStepperInput: Boolean,
    resetSelectedSkuOnHide: Boolean,
    quota: {
      type: Number,
      default: 0
    },
    quotaUsed: {
      type: Number,
      default: 0
    },
    startSaleNum: {
      type: Number,
      default: 1
    },
    initialSku: {
      type: Object,
      default: function _default27() {
        return {};
      }
    },
    stockThreshold: {
      type: Number,
      default: 50
    },
    showSoldoutSku: {
      type: Boolean,
      default: true
    },
    showAddCartBtn: {
      type: Boolean,
      default: true
    },
    disableSoldoutSku: {
      type: Boolean,
      default: true
    },
    customStepperConfig: {
      type: Object,
      default: function _default28() {
        return {};
      }
    },
    showHeaderImage: {
      type: Boolean,
      default: true
    },
    previewOnClickImage: {
      type: Boolean,
      default: true
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    },
    bodyOffsetTop: {
      type: Number,
      default: 200
    },
    messageConfig: {
      type: Object,
      default: function _default29() {
        return {
          initialMessages: {},
          placeholderMap: {},
          uploadImg: function uploadImg() {
            return Promise.resolve();
          },
          uploadMaxSize: 5
        };
      }
    }
  },
  data: function data44() {
    return {
      selectedSku: {},
      selectedProp: {},
      selectedNum: 1,
      show: this.value
    };
  },
  watch: {
    show: function show4(val) {
      this.$emit("input", val);
      if (!val) {
        this.$emit("sku-close", {
          selectedSkuValues: this.selectedSkuValues,
          selectedNum: this.selectedNum,
          selectedSkuComb: this.selectedSkuComb
        });
        if (this.resetStepperOnHide) {
          this.resetStepper();
        }
        if (this.resetSelectedSkuOnHide) {
          this.resetSelectedSku();
        }
      }
    },
    value: function value16(val) {
      this.show = val;
    },
    skuTree: "resetSelectedSku",
    initialSku: function initialSku() {
      this.resetStepper();
      this.resetSelectedSku();
    }
  },
  computed: {
    skuGroupClass: function skuGroupClass() {
      return ["van-sku-group-container", {
        "van-sku-group-container--hide-soldout": !this.showSoldoutSku
      }];
    },
    bodyStyle: function bodyStyle() {
      if (this.$isServer) {
        return;
      }
      var maxHeight = window.innerHeight - this.bodyOffsetTop;
      return {
        maxHeight: maxHeight + "px"
      };
    },
    isSkuCombSelected: function isSkuCombSelected() {
      var _this = this;
      if (this.hasSku && !isAllSelected(this.skuTree, this.selectedSku)) {
        return false;
      }
      return !this.propList.filter(function(i) {
        return i.is_necessary !== false;
      }).some(function(i) {
        return (_this.selectedProp[i.k_id] || []).length === 0;
      });
    },
    isSkuEmpty: function isSkuEmpty() {
      return Object.keys(this.sku).length === 0;
    },
    hasSku: function hasSku() {
      return !this.sku.none_sku;
    },
    hasSkuOrAttr: function hasSkuOrAttr() {
      return this.hasSku || this.propList.length > 0;
    },
    selectedSkuComb: function selectedSkuComb() {
      var skuComb = null;
      if (this.isSkuCombSelected) {
        if (this.hasSku) {
          skuComb = getSkuComb(this.skuList, this.selectedSku);
        } else {
          skuComb = {
            id: this.sku.collection_id,
            price: Math.round(this.sku.price * 100),
            stock_num: this.sku.stock_num
          };
        }
        if (skuComb) {
          skuComb.properties = getSelectedProperties(this.propList, this.selectedProp);
          skuComb.property_price = this.selectedPropValues.reduce(function(acc, cur) {
            return acc + (cur.price || 0);
          }, 0);
        }
      }
      return skuComb;
    },
    selectedSkuValues: function selectedSkuValues() {
      return getSelectedSkuValues(this.skuTree, this.selectedSku);
    },
    selectedPropValues: function selectedPropValues() {
      return getSelectedPropValues(this.propList, this.selectedProp);
    },
    price: function price() {
      if (this.selectedSkuComb) {
        return ((this.selectedSkuComb.price + this.selectedSkuComb.property_price) / 100).toFixed(2);
      }
      return this.sku.price;
    },
    originPrice: function originPrice() {
      if (this.selectedSkuComb && this.selectedSkuComb.origin_price) {
        return ((this.selectedSkuComb.origin_price + this.selectedSkuComb.property_price) / 100).toFixed(2);
      }
      return this.sku.origin_price;
    },
    skuTree: function skuTree() {
      return this.sku.tree || [];
    },
    skuList: function skuList() {
      return this.sku.list || [];
    },
    propList: function propList() {
      return this.properties || [];
    },
    imageList: function imageList() {
      var imageList2 = [this.goods.picture];
      if (this.skuTree.length > 0) {
        this.skuTree.forEach(function(treeItem) {
          if (!treeItem.v) {
            return;
          }
          treeItem.v.forEach(function(vItem) {
            var imgUrl2 = vItem.previewImgUrl || vItem.imgUrl || vItem.img_url;
            if (imgUrl2 && imageList2.indexOf(imgUrl2) === -1) {
              imageList2.push(imgUrl2);
            }
          });
        });
      }
      return imageList2;
    },
    stock: function stock() {
      var stockNum = this.customStepperConfig.stockNum;
      if (stockNum !== void 0) {
        return stockNum;
      }
      if (this.selectedSkuComb) {
        return this.selectedSkuComb.stock_num;
      }
      return this.sku.stock_num;
    },
    stockText: function stockText() {
      var h = this.$createElement;
      var stockFormatter = this.customStepperConfig.stockFormatter;
      if (stockFormatter) {
        return stockFormatter(this.stock);
      }
      return [t$3("stock") + " ", h("span", {
        "class": bem$9("stock-num", {
          highlight: this.stock < this.stockThreshold
        })
      }, [this.stock]), " " + t$3("stockUnit")];
    },
    selectedText: function selectedText() {
      var _this2 = this;
      if (this.selectedSkuComb) {
        var values = this.selectedSkuValues.concat(this.selectedPropValues);
        return t$3("selected") + " " + values.map(function(item) {
          return item.name;
        }).join(" ");
      }
      var unselectedSku = this.skuTree.filter(function(item) {
        return _this2.selectedSku[item.k_s] === UNSELECTED_SKU_VALUE_ID;
      }).map(function(item) {
        return item.k;
      });
      var unselectedProp = this.propList.filter(function(item) {
        return (_this2.selectedProp[item.k_id] || []).length < 1;
      }).map(function(item) {
        return item.k;
      });
      return t$3("select") + " " + unselectedSku.concat(unselectedProp).join(" ");
    }
  },
  created: function created11() {
    var skuEventBus = new Vue();
    this.skuEventBus = skuEventBus;
    skuEventBus.$on("sku:select", this.onSelect);
    skuEventBus.$on("sku:propSelect", this.onPropSelect);
    skuEventBus.$on("sku:numChange", this.onNumChange);
    skuEventBus.$on("sku:previewImage", this.onPreviewImage);
    skuEventBus.$on("sku:overLimit", this.onOverLimit);
    skuEventBus.$on("sku:stepperState", this.onStepperState);
    skuEventBus.$on("sku:addCart", this.onAddCart);
    skuEventBus.$on("sku:buy", this.onBuy);
    this.resetStepper();
    this.resetSelectedSku();
    this.$emit("after-sku-create", skuEventBus);
  },
  methods: {
    resetStepper: function resetStepper() {
      var skuStepper = this.$refs.skuStepper;
      var selectedNum = this.initialSku.selectedNum;
      var num = selectedNum != null ? selectedNum : this.startSaleNum;
      this.stepperError = null;
      if (skuStepper) {
        skuStepper.setCurrentNum(num);
      } else {
        this.selectedNum = num;
      }
    },
    resetSelectedSku: function resetSelectedSku() {
      var _this3 = this;
      this.selectedSku = {};
      this.skuTree.forEach(function(item) {
        _this3.selectedSku[item.k_s] = UNSELECTED_SKU_VALUE_ID;
      });
      this.skuTree.forEach(function(item) {
        var key = item.k_s;
        var valueId = item.v.length === 1 ? item.v[0].id : _this3.initialSku[key];
        if (valueId && isSkuChoosable(_this3.skuList, _this3.selectedSku, {
          key,
          valueId
        })) {
          _this3.selectedSku[key] = valueId;
        }
      });
      var skuValues = this.selectedSkuValues;
      if (skuValues.length > 0) {
        this.$nextTick(function() {
          _this3.$emit("sku-selected", {
            skuValue: skuValues[skuValues.length - 1],
            selectedSku: _this3.selectedSku,
            selectedSkuComb: _this3.selectedSkuComb
          });
        });
      }
      this.selectedProp = {};
      var _this$initialSku$sele = this.initialSku.selectedProp, selectedProp = _this$initialSku$sele === void 0 ? {} : _this$initialSku$sele;
      this.propList.forEach(function(item) {
        if (selectedProp[item.k_id]) {
          _this3.selectedProp[item.k_id] = selectedProp[item.k_id];
        }
      });
      if (isEmpty(this.selectedProp)) {
        this.propList.forEach(function(item) {
          var _item$v;
          if ((item == null ? void 0 : (_item$v = item.v) == null ? void 0 : _item$v.length) > 0) {
            var v = item.v, k_id = item.k_id;
            var isHasConfigPrice = v.some(function(i) {
              return +i.price !== 0;
            });
            if (!isHasConfigPrice) {
              _this3.selectedProp[k_id] = [v[0].id];
            }
          }
        });
      }
      var propValues = this.selectedPropValues;
      if (propValues.length > 0) {
        this.$emit("sku-prop-selected", {
          propValue: propValues[propValues.length - 1],
          selectedProp: this.selectedProp,
          selectedSkuComb: this.selectedSkuComb
        });
      }
      this.$emit("sku-reset", {
        selectedSku: this.selectedSku,
        selectedProp: this.selectedProp,
        selectedSkuComb: this.selectedSkuComb
      });
      this.centerInitialSku();
    },
    getSkuMessages: function getSkuMessages() {
      return this.$refs.skuMessages ? this.$refs.skuMessages.getMessages() : {};
    },
    getSkuCartMessages: function getSkuCartMessages() {
      return this.$refs.skuMessages ? this.$refs.skuMessages.getCartMessages() : {};
    },
    validateSkuMessages: function validateSkuMessages() {
      return this.$refs.skuMessages ? this.$refs.skuMessages.validateMessages() : "";
    },
    validateSku: function validateSku() {
      if (this.selectedNum === 0) {
        return t$3("unavailable");
      }
      if (this.isSkuCombSelected) {
        return this.validateSkuMessages();
      }
      if (this.customSkuValidator) {
        var err = this.customSkuValidator(this);
        if (err)
          return err;
      }
      return t$3("selectSku");
    },
    onSelect: function onSelect6(skuValue) {
      var _extends2, _extends3;
      this.selectedSku = this.selectedSku[skuValue.skuKeyStr] === skuValue.id ? _extends$1({}, this.selectedSku, (_extends2 = {}, _extends2[skuValue.skuKeyStr] = UNSELECTED_SKU_VALUE_ID, _extends2)) : _extends$1({}, this.selectedSku, (_extends3 = {}, _extends3[skuValue.skuKeyStr] = skuValue.id, _extends3));
      this.$emit("sku-selected", {
        skuValue,
        selectedSku: this.selectedSku,
        selectedSkuComb: this.selectedSkuComb
      });
    },
    onPropSelect: function onPropSelect(propValue) {
      var _extends4;
      var arr = this.selectedProp[propValue.skuKeyStr] || [];
      var pos = arr.indexOf(propValue.id);
      if (pos > -1) {
        arr.splice(pos, 1);
      } else if (propValue.multiple) {
        arr.push(propValue.id);
      } else {
        arr.splice(0, 1, propValue.id);
      }
      this.selectedProp = _extends$1({}, this.selectedProp, (_extends4 = {}, _extends4[propValue.skuKeyStr] = arr, _extends4));
      this.$emit("sku-prop-selected", {
        propValue,
        selectedProp: this.selectedProp,
        selectedSkuComb: this.selectedSkuComb
      });
    },
    onNumChange: function onNumChange(num) {
      this.selectedNum = num;
    },
    onPreviewImage: function onPreviewImage2(selectedValue) {
      var _this4 = this;
      var imageList2 = this.imageList;
      var index2 = 0;
      var indexImage = imageList2[0];
      if (selectedValue && selectedValue.imgUrl) {
        this.imageList.some(function(image, pos) {
          if (image === selectedValue.imgUrl) {
            index2 = pos;
            return true;
          }
          return false;
        });
        indexImage = selectedValue.imgUrl;
      }
      var params = _extends$1({}, selectedValue, {
        index: index2,
        imageList: this.imageList,
        indexImage
      });
      this.$emit("open-preview", params);
      if (!this.previewOnClickImage) {
        return;
      }
      ImagePreview$1({
        images: this.imageList,
        startPosition: index2,
        onClose: function onClose5() {
          _this4.$emit("close-preview", params);
        }
      });
    },
    onOverLimit: function onOverLimit2(data49) {
      var action = data49.action, limitType = data49.limitType, quota = data49.quota, quotaUsed = data49.quotaUsed;
      var handleOverLimit = this.customStepperConfig.handleOverLimit;
      if (handleOverLimit) {
        handleOverLimit(data49);
        return;
      }
      if (action === "minus") {
        if (this.startSaleNum > 1) {
          Toast(t$3("minusStartTip", this.startSaleNum));
        } else {
          Toast(t$3("minusTip"));
        }
      } else if (action === "plus") {
        if (limitType === QUOTA_LIMIT) {
          if (quotaUsed > 0) {
            Toast(t$3("quotaUsedTip", quota, quotaUsed));
          } else {
            Toast(t$3("quotaTip", quota));
          }
        } else {
          Toast(t$3("soldout"));
        }
      }
    },
    onStepperState: function onStepperState(data49) {
      this.stepperError = data49.valid ? null : _extends$1({}, data49, {
        action: "plus"
      });
    },
    onAddCart: function onAddCart() {
      this.onBuyOrAddCart("add-cart");
    },
    onBuy: function onBuy() {
      this.onBuyOrAddCart("buy-clicked");
    },
    onBuyOrAddCart: function onBuyOrAddCart(type2) {
      if (this.stepperError) {
        return this.onOverLimit(this.stepperError);
      }
      var error = this.validateSku();
      if (error) {
        Toast(error);
      } else {
        this.$emit(type2, this.getSkuData());
      }
    },
    getSkuData: function getSkuData() {
      return {
        goodsId: this.goodsId,
        messages: this.getSkuMessages(),
        selectedNum: this.selectedNum,
        cartMessages: this.getSkuCartMessages(),
        selectedSkuComb: this.selectedSkuComb
      };
    },
    onOpened: function onOpened3() {
      this.centerInitialSku();
    },
    centerInitialSku: function centerInitialSku() {
      var _this5 = this;
      (this.$refs.skuRows || []).forEach(function(it) {
        var _ref = it.skuRow || {}, k_s = _ref.k_s;
        it.centerItem(_this5.initialSku[k_s]);
      });
    }
  },
  render: function render78() {
    var _this6 = this;
    var h = arguments[0];
    if (this.isSkuEmpty) {
      return;
    }
    var sku = this.sku, skuList2 = this.skuList, goods = this.goods, price2 = this.price, lazyLoad = this.lazyLoad, originPrice2 = this.originPrice, skuEventBus = this.skuEventBus, selectedSku = this.selectedSku, selectedProp = this.selectedProp, selectedNum = this.selectedNum, stepperTitle = this.stepperTitle, selectedSkuComb2 = this.selectedSkuComb, showHeaderImage = this.showHeaderImage, disableSoldoutSku = this.disableSoldoutSku;
    var slotsProps = {
      price: price2,
      originPrice: originPrice2,
      selectedNum,
      skuEventBus,
      selectedSku,
      selectedSkuComb: selectedSkuComb2
    };
    var slots4 = function slots5(name) {
      return _this6.slots(name, slotsProps);
    };
    var Header2 = slots4("sku-header") || h(SkuHeader$2, {
      "attrs": {
        "sku": sku,
        "goods": goods,
        "skuEventBus": skuEventBus,
        "selectedSku": selectedSku,
        "showHeaderImage": showHeaderImage
      }
    }, [h("template", {
      "slot": "sku-header-image-extra"
    }, [slots4("sku-header-image-extra")]), slots4("sku-header-price") || h("div", {
      "class": "van-sku__goods-price"
    }, [h("span", {
      "class": "van-sku__price-symbol"
    }, ["\uFFE5"]), h("span", {
      "class": "van-sku__price-num"
    }, [price2]), this.priceTag && h("span", {
      "class": "van-sku__price-tag"
    }, [this.priceTag])]), slots4("sku-header-origin-price") || originPrice2 && h(SkuHeaderItem, [t$3("originPrice"), " \uFFE5", originPrice2]), !this.hideStock && h(SkuHeaderItem, [h("span", {
      "class": "van-sku__stock"
    }, [this.stockText])]), this.hasSkuOrAttr && !this.hideSelectedText && h(SkuHeaderItem, [this.selectedText]), slots4("sku-header-extra")]);
    var Group = slots4("sku-group") || this.hasSkuOrAttr && h("div", {
      "class": this.skuGroupClass
    }, [this.skuTree.map(function(skuTreeItem) {
      return h(SkuRow, {
        "attrs": {
          "skuRow": skuTreeItem
        },
        "ref": "skuRows",
        "refInFor": true
      }, [skuTreeItem.v.map(function(skuValue) {
        return h(SkuRowItem, {
          "attrs": {
            "skuList": skuList2,
            "lazyLoad": lazyLoad,
            "skuValue": skuValue,
            "skuKeyStr": skuTreeItem.k_s,
            "selectedSku": selectedSku,
            "skuEventBus": skuEventBus,
            "disableSoldoutSku": disableSoldoutSku,
            "largeImageMode": skuTreeItem.largeImageMode
          }
        });
      })]);
    }), this.propList.map(function(skuTreeItem) {
      return h(SkuRow, {
        "attrs": {
          "skuRow": skuTreeItem
        }
      }, [skuTreeItem.v.map(function(skuValue) {
        return h(SkuRowPropItem, {
          "attrs": {
            "skuValue": skuValue,
            "skuKeyStr": skuTreeItem.k_id + "",
            "selectedProp": selectedProp,
            "skuEventBus": skuEventBus,
            "multiple": skuTreeItem.is_multiple
          }
        });
      })]);
    })]);
    var Stepper2 = slots4("sku-stepper") || h(SkuStepper, {
      "ref": "skuStepper",
      "attrs": {
        "stock": this.stock,
        "quota": this.quota,
        "quotaUsed": this.quotaUsed,
        "startSaleNum": this.startSaleNum,
        "skuEventBus": skuEventBus,
        "selectedNum": selectedNum,
        "stepperTitle": stepperTitle,
        "skuStockNum": sku.stock_num,
        "disableStepperInput": this.disableStepperInput,
        "customStepperConfig": this.customStepperConfig,
        "hideQuotaText": this.hideQuotaText
      },
      "on": {
        "change": function change(event) {
          _this6.$emit("stepper-change", event);
        }
      }
    });
    var Messages = slots4("sku-messages") || h(SkuMessages, {
      "ref": "skuMessages",
      "attrs": {
        "goodsId": this.goodsId,
        "messageConfig": this.messageConfig,
        "messages": sku.messages
      }
    });
    var Actions = slots4("sku-actions") || h(SkuActions$1, {
      "attrs": {
        "buyText": this.buyText,
        "skuEventBus": skuEventBus,
        "addCartText": this.addCartText,
        "showAddCartBtn": this.showAddCartBtn
      }
    });
    return h(Popup, {
      "attrs": {
        "round": true,
        "closeable": true,
        "position": "bottom",
        "getContainer": this.getContainer,
        "closeOnClickOverlay": this.closeOnClickOverlay,
        "safeAreaInsetBottom": this.safeAreaInsetBottom
      },
      "class": "van-sku-container",
      "on": {
        "opened": this.onOpened
      },
      "model": {
        value: _this6.show,
        callback: function callback2($$v) {
          _this6.show = $$v;
        }
      }
    }, [Header2, h("div", {
      "class": "van-sku-body",
      "style": this.bodyStyle
    }, [slots4("sku-body-top"), Group, slots4("extra-sku-group"), Stepper2, Messages]), slots4("sku-actions-top"), Actions]);
  }
});
Locale$1.add(lang);
Sku.SkuActions = SkuActions$1;
Sku.SkuHeader = SkuHeader$2;
Sku.SkuHeaderItem = SkuHeaderItem;
Sku.SkuMessages = SkuMessages;
Sku.SkuStepper = SkuStepper;
Sku.SkuRow = SkuRow;
Sku.SkuRowItem = SkuRowItem;
Sku.SkuRowPropItem = SkuRowPropItem;
Sku.skuHelper = skuHelper;
Sku.skuConstants = constants;
var _createNamespace$8 = createNamespace$1("slider"), createComponent$8 = _createNamespace$8[0], bem$8 = _createNamespace$8[1];
var isSameValue = function isSameValue2(newValue, oldValue) {
  return JSON.stringify(newValue) === JSON.stringify(oldValue);
};
var Slider = createComponent$8({
  mixins: [TouchMixin, FieldMixin],
  props: {
    disabled: Boolean,
    vertical: Boolean,
    range: Boolean,
    barHeight: [Number, String],
    buttonSize: [Number, String],
    activeColor: String,
    inactiveColor: String,
    min: {
      type: [Number, String],
      default: 0
    },
    max: {
      type: [Number, String],
      default: 100
    },
    step: {
      type: [Number, String],
      default: 1
    },
    value: {
      type: [Number, Array],
      default: 0
    }
  },
  data: function data45() {
    return {
      dragStatus: ""
    };
  },
  computed: {
    scope: function scope() {
      return this.max - this.min;
    },
    buttonStyle: function buttonStyle2() {
      if (this.buttonSize) {
        var size2 = addUnit(this.buttonSize);
        return {
          width: size2,
          height: size2
        };
      }
    }
  },
  created: function created12() {
    this.updateValue(this.value);
  },
  mounted: function mounted22() {
    if (this.range) {
      this.bindTouchEvent(this.$refs.wrapper0);
      this.bindTouchEvent(this.$refs.wrapper1);
    } else {
      this.bindTouchEvent(this.$refs.wrapper);
    }
  },
  methods: {
    onTouchStart: function onTouchStart8(event) {
      if (this.disabled) {
        return;
      }
      this.touchStart(event);
      this.currentValue = this.value;
      if (this.range) {
        this.startValue = this.value.map(this.format);
      } else {
        this.startValue = this.format(this.value);
      }
      this.dragStatus = "start";
    },
    onTouchMove: function onTouchMove8(event) {
      if (this.disabled) {
        return;
      }
      if (this.dragStatus === "start") {
        this.$emit("drag-start");
      }
      preventDefault(event, true);
      this.touchMove(event);
      this.dragStatus = "draging";
      var rect = this.$el.getBoundingClientRect();
      var delta2 = this.vertical ? this.deltaY : this.deltaX;
      var total = this.vertical ? rect.height : rect.width;
      var diff = delta2 / total * this.scope;
      if (this.range) {
        this.currentValue[this.index] = this.startValue[this.index] + diff;
      } else {
        this.currentValue = this.startValue + diff;
      }
      this.updateValue(this.currentValue);
    },
    onTouchEnd: function onTouchEnd9() {
      if (this.disabled) {
        return;
      }
      if (this.dragStatus === "draging") {
        this.updateValue(this.currentValue, true);
        this.$emit("drag-end");
      }
      this.dragStatus = "";
    },
    onClick: function onClick16(event) {
      event.stopPropagation();
      if (this.disabled)
        return;
      var rect = this.$el.getBoundingClientRect();
      var delta2 = this.vertical ? event.clientY - rect.top : event.clientX - rect.left;
      var total = this.vertical ? rect.height : rect.width;
      var value17 = +this.min + delta2 / total * this.scope;
      if (this.range) {
        var _this$value = this.value, left2 = _this$value[0], right2 = _this$value[1];
        var middle = (left2 + right2) / 2;
        if (value17 <= middle) {
          left2 = value17;
        } else {
          right2 = value17;
        }
        value17 = [left2, right2];
      }
      this.startValue = this.value;
      this.updateValue(value17, true);
    },
    handleOverlap: function handleOverlap(value17) {
      if (value17[0] > value17[1]) {
        value17 = deepClone(value17);
        return value17.reverse();
      }
      return value17;
    },
    updateValue: function updateValue2(value17, end2) {
      if (this.range) {
        value17 = this.handleOverlap(value17).map(this.format);
      } else {
        value17 = this.format(value17);
      }
      if (!isSameValue(value17, this.value)) {
        this.$emit("input", value17);
      }
      if (end2 && !isSameValue(value17, this.startValue)) {
        this.$emit("change", value17);
      }
    },
    format: function format4(value17) {
      var min = +this.min;
      var max = +this.max;
      var step = +this.step;
      value17 = range(value17, min, max);
      var diff = Math.round((value17 - min) / step) * step;
      return addNumber(min, diff);
    }
  },
  render: function render79() {
    var _wrapperStyle, _this = this, _barStyle;
    var h = arguments[0];
    var vertical2 = this.vertical;
    var mainAxis = vertical2 ? "height" : "width";
    var crossAxis = vertical2 ? "width" : "height";
    var wrapperStyle = (_wrapperStyle = {
      background: this.inactiveColor
    }, _wrapperStyle[crossAxis] = addUnit(this.barHeight), _wrapperStyle);
    var calcMainAxis = function calcMainAxis2() {
      var value17 = _this.value, min = _this.min, range2 = _this.range, scope3 = _this.scope;
      if (range2) {
        return (value17[1] - value17[0]) * 100 / scope3 + "%";
      }
      return (value17 - min) * 100 / scope3 + "%";
    };
    var calcOffset = function calcOffset2() {
      var value17 = _this.value, min = _this.min, range2 = _this.range, scope3 = _this.scope;
      if (range2) {
        return (value17[0] - min) * 100 / scope3 + "%";
      }
      return null;
    };
    var barStyle2 = (_barStyle = {}, _barStyle[mainAxis] = calcMainAxis(), _barStyle.left = this.vertical ? null : calcOffset(), _barStyle.top = this.vertical ? calcOffset() : null, _barStyle.background = this.activeColor, _barStyle);
    if (this.dragStatus) {
      barStyle2.transition = "none";
    }
    var renderButton = function renderButton2(i) {
      var map = ["left", "right"];
      var isNumber = typeof i === "number";
      var current = isNumber ? _this.value[i] : _this.value;
      var getClassName = function getClassName2() {
        if (isNumber) {
          return "button-wrapper-" + map[i];
        }
        return "button-wrapper";
      };
      var getRefName = function getRefName2() {
        if (isNumber) {
          return "wrapper" + i;
        }
        return "wrapper";
      };
      var renderButtonContent = function renderButtonContent2() {
        if (isNumber) {
          var slot = _this.slots(i === 0 ? "left-button" : "right-button", {
            value: current
          });
          if (slot) {
            return slot;
          }
        }
        if (_this.slots("button")) {
          return _this.slots("button");
        }
        return h("div", {
          "class": bem$8("button"),
          "style": _this.buttonStyle
        });
      };
      return h("div", {
        "ref": getRefName(),
        "attrs": {
          "role": "slider",
          "tabindex": _this.disabled ? -1 : 0,
          "aria-valuemin": _this.min,
          "aria-valuenow": _this.value,
          "aria-valuemax": _this.max,
          "aria-orientation": _this.vertical ? "vertical" : "horizontal"
        },
        "class": bem$8(getClassName()),
        "on": {
          "touchstart": function touchstart() {
            if (isNumber) {
              _this.index = i;
            }
          },
          "click": function click(e) {
            return e.stopPropagation();
          }
        }
      }, [renderButtonContent()]);
    };
    return h("div", {
      "style": wrapperStyle,
      "class": bem$8({
        disabled: this.disabled,
        vertical: vertical2
      }),
      "on": {
        "click": this.onClick
      }
    }, [h("div", {
      "class": bem$8("bar"),
      "style": barStyle2
    }, [this.range ? [renderButton(0), renderButton(1)] : renderButton()])]);
  }
});
var _createNamespace$7 = createNamespace$1("step"), createComponent$7 = _createNamespace$7[0], bem$7 = _createNamespace$7[1];
var Step = createComponent$7({
  mixins: [ChildrenMixin("vanSteps")],
  computed: {
    status: function status() {
      if (this.index < this.parent.active) {
        return "finish";
      }
      if (this.index === +this.parent.active) {
        return "process";
      }
    },
    active: function active2() {
      return this.status === "process";
    },
    lineStyle: function lineStyle() {
      var _this$parent = this.parent, activeColor = _this$parent.activeColor, inactiveColor = _this$parent.inactiveColor, center = _this$parent.center, direction = _this$parent.direction;
      var style12 = {
        background: this.status === "finish" ? activeColor : inactiveColor
      };
      if (center && direction === "vertical") {
        style12.top = "50%";
      }
      return style12;
    },
    circleContainerStyle: function circleContainerStyle() {
      if (this.parent.center && this.parent.direction === "vertical") {
        return {
          top: "50%"
        };
      }
    },
    titleStyle: function titleStyle() {
      if (this.active) {
        return {
          color: this.parent.activeColor
        };
      }
      if (!this.status) {
        return {
          color: this.parent.inactiveColor
        };
      }
    }
  },
  methods: {
    genCircle: function genCircle() {
      var h = this.$createElement;
      var _this$parent2 = this.parent, activeIcon = _this$parent2.activeIcon, iconPrefix = _this$parent2.iconPrefix, activeColor = _this$parent2.activeColor, finishIcon = _this$parent2.finishIcon, inactiveIcon = _this$parent2.inactiveIcon;
      if (this.active) {
        return this.slots("active-icon") || h(Icon$1, {
          "class": bem$7("icon", "active"),
          "attrs": {
            "name": activeIcon,
            "color": activeColor,
            "classPrefix": iconPrefix
          }
        });
      }
      var finishIconSlot = this.slots("finish-icon");
      if (this.status === "finish" && (finishIcon || finishIconSlot)) {
        return finishIconSlot || h(Icon$1, {
          "class": bem$7("icon", "finish"),
          "attrs": {
            "name": finishIcon,
            "color": activeColor,
            "classPrefix": iconPrefix
          }
        });
      }
      var inactiveIconSlot = this.slots("inactive-icon");
      if (inactiveIcon || inactiveIconSlot) {
        return inactiveIconSlot || h(Icon$1, {
          "class": bem$7("icon"),
          "attrs": {
            "name": inactiveIcon,
            "classPrefix": iconPrefix
          }
        });
      }
      return h("i", {
        "class": bem$7("circle"),
        "style": this.lineStyle
      });
    },
    onClickStep: function onClickStep() {
      this.parent.$emit("click-step", this.index);
    }
  },
  render: function render80() {
    var _ref;
    var h = arguments[0];
    var status2 = this.status, active4 = this.active;
    var direction = this.parent.direction;
    return h("div", {
      "class": [BORDER, bem$7([direction, (_ref = {}, _ref[status2] = status2, _ref)])]
    }, [h("div", {
      "class": bem$7("title", {
        active: active4
      }),
      "style": this.titleStyle,
      "on": {
        "click": this.onClickStep
      }
    }, [this.slots()]), h("div", {
      "class": bem$7("circle-container"),
      "on": {
        "click": this.onClickStep
      },
      "style": this.circleContainerStyle
    }, [this.genCircle()]), h("div", {
      "class": bem$7("line"),
      "style": this.lineStyle
    })]);
  }
});
var _createNamespace$6 = createNamespace$1("steps"), createComponent$6 = _createNamespace$6[0], bem$6 = _createNamespace$6[1];
var Steps = createComponent$6({
  mixins: [ParentMixin("vanSteps")],
  props: {
    center: Boolean,
    iconPrefix: String,
    finishIcon: String,
    activeColor: String,
    inactiveIcon: String,
    inactiveColor: String,
    active: {
      type: [Number, String],
      default: 0
    },
    direction: {
      type: String,
      default: "horizontal"
    },
    activeIcon: {
      type: String,
      default: "checked"
    }
  },
  render: function render81() {
    var h = arguments[0];
    return h("div", {
      "class": bem$6([this.direction])
    }, [h("div", {
      "class": bem$6("items")
    }, [this.slots()])]);
  }
});
var _createNamespace$5 = createNamespace$1("submit-bar"), createComponent$5 = _createNamespace$5[0], bem$5 = _createNamespace$5[1], t$2 = _createNamespace$5[2];
function SubmitBar(h, props2, slots4, ctx) {
  var tip2 = props2.tip, price2 = props2.price, tipIcon = props2.tipIcon;
  function Text() {
    if (typeof price2 === "number") {
      var priceArr = (price2 / 100).toFixed(props2.decimalLength).split(".");
      var decimalStr = props2.decimalLength ? "." + priceArr[1] : "";
      return h("div", {
        "style": {
          textAlign: props2.textAlign ? props2.textAlign : ""
        },
        "class": bem$5("text")
      }, [h("span", [props2.label || t$2("label")]), h("span", {
        "class": bem$5("price")
      }, [props2.currency, h("span", {
        "class": bem$5("price", "integer")
      }, [priceArr[0]]), decimalStr]), props2.suffixLabel && h("span", {
        "class": bem$5("suffix-label")
      }, [props2.suffixLabel])]);
    }
  }
  function Tip() {
    if (slots4.tip || tip2) {
      return h("div", {
        "class": bem$5("tip")
      }, [tipIcon && h(Icon$1, {
        "class": bem$5("tip-icon"),
        "attrs": {
          "name": tipIcon
        }
      }), tip2 && h("span", {
        "class": bem$5("tip-text")
      }, [tip2]), slots4.tip && slots4.tip()]);
    }
  }
  return h("div", helper([{
    "class": bem$5({
      unfit: !props2.safeAreaInsetBottom
    })
  }, inherit(ctx)]), [slots4.top && slots4.top(), Tip(), h("div", {
    "class": bem$5("bar")
  }, [slots4.default && slots4.default(), Text(), slots4.button ? slots4.button() : h(Button$1, {
    "attrs": {
      "round": true,
      "type": props2.buttonType,
      "text": props2.loading ? "" : props2.buttonText,
      "color": props2.buttonColor,
      "loading": props2.loading,
      "disabled": props2.disabled
    },
    "class": bem$5("button", props2.buttonType),
    "on": {
      "click": function click() {
        emit(ctx, "submit");
      }
    }
  })])]);
}
SubmitBar.props = {
  tip: String,
  label: String,
  price: Number,
  tipIcon: String,
  loading: Boolean,
  disabled: Boolean,
  textAlign: String,
  buttonText: String,
  buttonColor: String,
  suffixLabel: String,
  safeAreaInsetBottom: {
    type: Boolean,
    default: true
  },
  decimalLength: {
    type: [Number, String],
    default: 2
  },
  currency: {
    type: String,
    default: "\xA5"
  },
  buttonType: {
    type: String,
    default: "danger"
  }
};
var SubmitBar$1 = createComponent$5(SubmitBar);
var _createNamespace$4 = createNamespace$1("swipe-cell"), createComponent$4 = _createNamespace$4[0], bem$4 = _createNamespace$4[1];
var THRESHOLD = 0.15;
var SwipeCell = createComponent$4({
  mixins: [TouchMixin, ClickOutsideMixin({
    event: "touchstart",
    method: "onClick"
  })],
  props: {
    onClose: Function,
    disabled: Boolean,
    leftWidth: [Number, String],
    rightWidth: [Number, String],
    beforeClose: Function,
    stopPropagation: Boolean,
    name: {
      type: [Number, String],
      default: ""
    }
  },
  data: function data46() {
    return {
      offset: 0,
      dragging: false
    };
  },
  computed: {
    computedLeftWidth: function computedLeftWidth() {
      return +this.leftWidth || this.getWidthByRef("left");
    },
    computedRightWidth: function computedRightWidth() {
      return +this.rightWidth || this.getWidthByRef("right");
    }
  },
  mounted: function mounted23() {
    this.bindTouchEvent(this.$el);
  },
  methods: {
    getWidthByRef: function getWidthByRef(ref2) {
      if (this.$refs[ref2]) {
        var rect = this.$refs[ref2].getBoundingClientRect();
        return rect.width;
      }
      return 0;
    },
    open: function open(position) {
      var offset3 = position === "left" ? this.computedLeftWidth : -this.computedRightWidth;
      this.opened = true;
      this.offset = offset3;
      this.$emit("open", {
        position,
        name: this.name,
        detail: this.name
      });
    },
    close: function close(position) {
      this.offset = 0;
      if (this.opened) {
        this.opened = false;
        this.$emit("close", {
          position,
          name: this.name
        });
      }
    },
    onTouchStart: function onTouchStart9(event) {
      if (this.disabled) {
        return;
      }
      this.startOffset = this.offset;
      this.touchStart(event);
    },
    onTouchMove: function onTouchMove9(event) {
      if (this.disabled) {
        return;
      }
      this.touchMove(event);
      if (this.direction === "horizontal") {
        this.dragging = true;
        this.lockClick = true;
        var isPrevent = !this.opened || this.deltaX * this.startOffset < 0;
        if (isPrevent) {
          preventDefault(event, this.stopPropagation);
        }
        this.offset = range(this.deltaX + this.startOffset, -this.computedRightWidth, this.computedLeftWidth);
      }
    },
    onTouchEnd: function onTouchEnd10() {
      var _this = this;
      if (this.disabled) {
        return;
      }
      if (this.dragging) {
        this.toggle(this.offset > 0 ? "left" : "right");
        this.dragging = false;
        setTimeout(function() {
          _this.lockClick = false;
        }, 0);
      }
    },
    toggle: function toggle6(direction) {
      var offset3 = Math.abs(this.offset);
      var threshold = this.opened ? 1 - THRESHOLD : THRESHOLD;
      var computedLeftWidth2 = this.computedLeftWidth, computedRightWidth2 = this.computedRightWidth;
      if (computedRightWidth2 && direction === "right" && offset3 > computedRightWidth2 * threshold) {
        this.open("right");
      } else if (computedLeftWidth2 && direction === "left" && offset3 > computedLeftWidth2 * threshold) {
        this.open("left");
      } else {
        this.close();
      }
    },
    onClick: function onClick17(position) {
      if (position === void 0) {
        position = "outside";
      }
      this.$emit("click", position);
      if (this.opened && !this.lockClick) {
        if (this.beforeClose) {
          this.beforeClose({
            position,
            name: this.name,
            instance: this
          });
        } else if (this.onClose) {
          this.onClose(position, this, {
            name: this.name
          });
        } else {
          this.close(position);
        }
      }
    },
    getClickHandler: function getClickHandler(position, stop) {
      var _this2 = this;
      return function(event) {
        if (stop) {
          event.stopPropagation();
        }
        _this2.onClick(position);
      };
    },
    genLeftPart: function genLeftPart() {
      var h = this.$createElement;
      var content = this.slots("left");
      if (content) {
        return h("div", {
          "ref": "left",
          "class": bem$4("left"),
          "on": {
            "click": this.getClickHandler("left", true)
          }
        }, [content]);
      }
    },
    genRightPart: function genRightPart() {
      var h = this.$createElement;
      var content = this.slots("right");
      if (content) {
        return h("div", {
          "ref": "right",
          "class": bem$4("right"),
          "on": {
            "click": this.getClickHandler("right", true)
          }
        }, [content]);
      }
    }
  },
  render: function render82() {
    var h = arguments[0];
    var wrapperStyle = {
      transform: "translate3d(" + this.offset + "px, 0, 0)",
      transitionDuration: this.dragging ? "0s" : ".6s"
    };
    return h("div", {
      "class": bem$4(),
      "on": {
        "click": this.getClickHandler("cell")
      }
    }, [h("div", {
      "class": bem$4("wrapper"),
      "style": wrapperStyle
    }, [this.genLeftPart(), this.slots(), this.genRightPart()])]);
  }
});
var _createNamespace$3 = createNamespace$1("switch-cell"), createComponent$3 = _createNamespace$3[0], bem$3 = _createNamespace$3[1];
function SwitchCell(h, props2, slots4, ctx) {
  return h(Cell$1, helper([{
    "attrs": {
      "center": true,
      "size": props2.cellSize,
      "title": props2.title,
      "border": props2.border
    },
    "class": bem$3([props2.cellSize])
  }, inherit(ctx)]), [h(Switch, {
    "props": _extends$1({}, props2),
    "on": _extends$1({}, ctx.listeners)
  })]);
}
SwitchCell.props = _extends$1({}, switchProps, {
  title: String,
  cellSize: String,
  border: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: "24px"
  }
});
var SwitchCell$1 = createComponent$3(SwitchCell);
var _createNamespace$2 = createNamespace$1("tabbar"), createComponent$2 = _createNamespace$2[0], bem$2 = _createNamespace$2[1];
var Tabbar = createComponent$2({
  mixins: [ParentMixin("vanTabbar")],
  props: {
    route: Boolean,
    zIndex: [Number, String],
    placeholder: Boolean,
    activeColor: String,
    beforeChange: Function,
    inactiveColor: String,
    value: {
      type: [Number, String],
      default: 0
    },
    border: {
      type: Boolean,
      default: true
    },
    fixed: {
      type: Boolean,
      default: true
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: null
    }
  },
  data: function data47() {
    return {
      height: null
    };
  },
  computed: {
    fit: function fit() {
      if (this.safeAreaInsetBottom !== null) {
        return this.safeAreaInsetBottom;
      }
      return this.fixed;
    }
  },
  watch: {
    value: "setActiveItem",
    children: "setActiveItem"
  },
  mounted: function mounted24() {
    var _this = this;
    if (this.placeholder && this.fixed) {
      var setHeight = function setHeight2() {
        _this.height = _this.$refs.tabbar.getBoundingClientRect().height;
      };
      setHeight();
      setTimeout(setHeight, 100);
    }
  },
  methods: {
    setActiveItem: function setActiveItem() {
      var _this2 = this;
      this.children.forEach(function(item, index2) {
        item.nameMatched = item.name === _this2.value || index2 === _this2.value;
      });
    },
    triggerChange: function triggerChange(active4, afterChange) {
      var _this3 = this;
      callInterceptor({
        interceptor: this.beforeChange,
        args: [active4],
        done: function done() {
          _this3.$emit("input", active4);
          _this3.$emit("change", active4);
          afterChange();
        }
      });
    },
    genTabbar: function genTabbar() {
      var _ref;
      var h = this.$createElement;
      return h("div", {
        "ref": "tabbar",
        "style": {
          zIndex: this.zIndex
        },
        "class": [(_ref = {}, _ref[BORDER_TOP_BOTTOM] = this.border, _ref), bem$2({
          unfit: !this.fit,
          fixed: this.fixed
        })]
      }, [this.slots()]);
    }
  },
  render: function render83() {
    var h = arguments[0];
    if (this.placeholder && this.fixed) {
      return h("div", {
        "class": bem$2("placeholder"),
        "style": {
          height: this.height + "px"
        }
      }, [this.genTabbar()]);
    }
    return this.genTabbar();
  }
});
var _createNamespace$1 = createNamespace$1("tabbar-item"), createComponent$1 = _createNamespace$1[0], bem$1 = _createNamespace$1[1];
var TabbarItem = createComponent$1({
  mixins: [ChildrenMixin("vanTabbar")],
  props: _extends$1({}, routeProps, {
    dot: Boolean,
    icon: String,
    name: [Number, String],
    info: [Number, String],
    badge: [Number, String],
    iconPrefix: String
  }),
  data: function data48() {
    return {
      nameMatched: false
    };
  },
  computed: {
    active: function active3() {
      var routeMode = this.parent.route;
      if (routeMode && "$route" in this) {
        var to = this.to, $route = this.$route;
        var config2 = isObject(to) ? to : {
          path: to
        };
        return !!$route.matched.find(function(r) {
          var path2 = r.path === "" ? "/" : r.path;
          var pathMatched = config2.path === path2;
          var nameMatched = isDef(config2.name) && config2.name === r.name;
          return pathMatched || nameMatched;
        });
      }
      return this.nameMatched;
    }
  },
  methods: {
    onClick: function onClick18(event) {
      var _this = this;
      if (!this.active) {
        this.parent.triggerChange(this.name || this.index, function() {
          route(_this.$router, _this);
        });
      }
      this.$emit("click", event);
    },
    genIcon: function genIcon4() {
      var h = this.$createElement;
      var slot = this.slots("icon", {
        active: this.active
      });
      if (slot) {
        return slot;
      }
      if (this.icon) {
        return h(Icon$1, {
          "attrs": {
            "name": this.icon,
            "classPrefix": this.iconPrefix
          }
        });
      }
    }
  },
  render: function render84() {
    var _this$badge;
    var h = arguments[0];
    var active4 = this.active;
    var color = this.parent[active4 ? "activeColor" : "inactiveColor"];
    return h("div", {
      "class": bem$1({
        active: active4
      }),
      "style": {
        color
      },
      "on": {
        "click": this.onClick
      }
    }, [h("div", {
      "class": bem$1("icon")
    }, [this.genIcon(), h(Info$1, {
      "attrs": {
        "dot": this.dot,
        "info": (_this$badge = this.badge) != null ? _this$badge : this.info
      }
    })]), h("div", {
      "class": bem$1("text")
    }, [this.slots("default", {
      active: active4
    })])]);
  }
});
var _createNamespace = createNamespace$1("tree-select"), createComponent = _createNamespace[0], bem = _createNamespace[1];
function TreeSelect(h, props2, slots4, ctx) {
  var items = props2.items, height = props2.height, activeId = props2.activeId, selectedIcon = props2.selectedIcon, mainActiveIndex = props2.mainActiveIndex;
  var selectedItem = items[+mainActiveIndex] || {};
  var subItems = selectedItem.children || [];
  var isMultiple = Array.isArray(activeId);
  function isActiveItem(id) {
    return isMultiple ? activeId.indexOf(id) !== -1 : activeId === id;
  }
  var Navs = items.map(function(item) {
    var _item$badge;
    return h(SidebarItem, {
      "attrs": {
        "dot": item.dot,
        "info": (_item$badge = item.badge) != null ? _item$badge : item.info,
        "title": item.text,
        "disabled": item.disabled
      },
      "class": [bem("nav-item"), item.className]
    });
  });
  function Content2() {
    if (slots4.content) {
      return slots4.content();
    }
    return subItems.map(function(item) {
      return h("div", {
        "key": item.id,
        "class": ["van-ellipsis", bem("item", {
          active: isActiveItem(item.id),
          disabled: item.disabled
        })],
        "on": {
          "click": function click() {
            if (!item.disabled) {
              var newActiveId = item.id;
              if (isMultiple) {
                newActiveId = activeId.slice();
                var index2 = newActiveId.indexOf(item.id);
                if (index2 !== -1) {
                  newActiveId.splice(index2, 1);
                } else if (newActiveId.length < props2.max) {
                  newActiveId.push(item.id);
                }
              }
              emit(ctx, "update:active-id", newActiveId);
              emit(ctx, "click-item", item);
              emit(ctx, "itemclick", item);
            }
          }
        }
      }, [item.text, isActiveItem(item.id) && h(Icon$1, {
        "attrs": {
          "name": selectedIcon
        },
        "class": bem("selected")
      })]);
    });
  }
  return h("div", helper([{
    "class": bem(),
    "style": {
      height: addUnit(height)
    }
  }, inherit(ctx)]), [h(Sidebar, {
    "class": bem("nav"),
    "attrs": {
      "activeKey": mainActiveIndex
    },
    "on": {
      "change": function change(index2) {
        emit(ctx, "update:main-active-index", index2);
        emit(ctx, "click-nav", index2);
        emit(ctx, "navclick", index2);
      }
    }
  }, [Navs]), h("div", {
    "class": bem("content")
  }, [Content2()])]);
}
TreeSelect.props = {
  max: {
    type: [Number, String],
    default: Infinity
  },
  items: {
    type: Array,
    default: function _default30() {
      return [];
    }
  },
  height: {
    type: [Number, String],
    default: 300
  },
  activeId: {
    type: [Number, String, Array],
    default: 0
  },
  selectedIcon: {
    type: String,
    default: "success"
  },
  mainActiveIndex: {
    type: [Number, String],
    default: 0
  }
};
var TreeSelect$1 = createComponent(TreeSelect);
function install$1(Vue3) {
  var components2 = [ActionSheet$1, AddressEdit, AddressList$1, Area, Badge, Button$1, Calendar, Card$1, Cascader, Cell$1, CellGroup$1, Checkbox, CheckboxGroup, Circle, Col, Collapse, CollapseItem, ContactCard$1, ContactEdit, ContactList$1, CountDown, Coupon, CouponCell$1, CouponList, DatetimePicker, Dialog, Divider$1, DropdownItem, DropdownMenu, Empty, Field, Form, GoodsAction, GoodsActionButton, GoodsActionIcon, Grid, GridItem, Icon$1, Image, ImagePreview$1, IndexAnchor, IndexBar, Info$1, List, Loading$1, Locale$1, NavBar, NoticeBar, Notify, NumberKeyboard, Overlay$1, Pagination, Panel$1, PasswordInput$1, Picker, Popover, Popup, Progress, PullRefresh, Radio, RadioGroup, Rate, Row, Search$1, ShareSheet, Sidebar, SidebarItem, Skeleton$1, Sku, Slider, Step, Stepper, Steps, Sticky, SubmitBar$1, Swipe, SwipeCell, SwipeItem, Switch, SwitchCell$1, Tab, Tabbar, TabbarItem, Tabs, Tag$1, Toast, TreeSelect$1, Uploader];
  components2.forEach(function(item) {
    if (item.install) {
      Vue3.use(item);
    } else if (item.name) {
      Vue3.component(item.name, item);
    }
  });
}
if (typeof window !== "undefined" && window.Vue) {
  install$1(window.Vue);
}
function createI18N(name) {
  const prefix2 = camelize_1(name) + ".";
  return function(path2, ...args) {
    const messages4 = Locale.messages();
    const message = get_1(messages4, prefix2 + path2) || get_1(messages4, path2);
    return isFunction_1(message) ? message(...args) : message;
  };
}
function createNamespace(name) {
  name = "mb-" + name;
  const bem2 = createBEM_1(name);
  const t2 = createI18N(name);
  return [
    function defineComponent2(sfc) {
      const comp = createComponent_1(name)(sfc);
      const methods = comp.methods || {};
      methods.$bem = bem2;
      methods.$translate = t2;
      comp.methods = methods;
      return comp;
    },
    t2,
    bem2
  ];
}
var render$1 = function() {
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
var staticRenderFns$1 = [];
function normalizeComponent(scriptExports, render86, staticRenderFns2, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
  var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
  if (render86) {
    options.render = render86;
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
const [defineComponent$1, t$1] = createNamespace("popup");
const eventsExclude = [
  "default",
  "header-left",
  "header-center",
  "header-right"
];
const __vue2_script$1 = defineComponent$1({
  components: {
    VanPopup: Popup,
    VanIcon: Icon$1,
    VanSearch: Search$1
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
      return Object.keys(this.$slots).filter((_2) => !eventsExclude.includes(_2));
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
const __cssModules$1 = {};
var __component__$1 = /* @__PURE__ */ normalizeComponent(__vue2_script$1, render$1, staticRenderFns$1, false, __vue2_injectStyles$1, null, null, null);
function __vue2_injectStyles$1(context2) {
  for (let o in __cssModules$1) {
    this[o] = __cssModules$1[o];
  }
}
var MbPopup = /* @__PURE__ */ function() {
  return __component__$1.exports;
}();
var throttle$1 = function(delay, noTrailing, callback2, debounceMode) {
  var timeoutID;
  var lastExec = 0;
  if (typeof noTrailing !== "boolean") {
    debounceMode = callback2;
    callback2 = noTrailing;
    noTrailing = void 0;
  }
  function wrapper() {
    var self = this;
    var elapsed = Number(new Date()) - lastExec;
    var args = arguments;
    function exec() {
      lastExec = Number(new Date());
      callback2.apply(self, args);
    }
    function clear2() {
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
      timeoutID = setTimeout(debounceMode ? clear2 : exec, debounceMode === void 0 ? delay - elapsed : delay);
    }
  }
  return wrapper;
};
var throttle = throttle$1;
var debounce = function(delay, atBegin, callback2) {
  return callback2 === void 0 ? throttle(delay, atBegin, false) : throttle(delay, callback2, atBegin !== false);
};
function isHtmlElement(node) {
  return node && node.nodeType === Node.ELEMENT_NODE;
}
let isFunction = (functionToCheck) => {
  var getType3 = {};
  return functionToCheck && getType3.toString.call(functionToCheck) === "[object Function]";
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
  return name.replace(SPECIAL_CHARS_REGEXP, function(_2, separator, letter, offset3) {
    return offset3 ? letter.toUpperCase() : letter;
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
const isScroll = (el, vertical2) => {
  if (isServer)
    return;
  const determinedDirection = vertical2 !== null && vertical2 !== void 0;
  const overflow = determinedDirection ? vertical2 ? getStyle(el, "overflow-y") : getStyle(el, "overflow-x") : getStyle(el, "overflow");
  return overflow.match(/(scroll|auto|overlay)/);
};
const getScrollContainer = (el, vertical2) => {
  if (isServer)
    return;
  let parent = el;
  while (parent) {
    if ([window, document, document.documentElement].includes(parent)) {
      return window;
    }
    if (isScroll(parent, vertical2)) {
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
    const { type: type2, default: defaultValue } = option;
    let value17 = el.getAttribute(`infinite-scroll-${key}`);
    value17 = isUndefined(vm[value17]) ? value17 : vm[value17];
    switch (type2) {
      case Number:
        value17 = Number(value17);
        value17 = Number.isNaN(value17) ? defaultValue : value17;
        break;
      case Boolean:
        value17 = isDefined(value17) ? value17 === "false" ? false : Boolean(value17) : defaultValue;
        break;
      default:
        value17 = type2(value17);
    }
    map[key] = value17;
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
    const onScroll7 = debounce(delay, handleScroll.bind(el, cb));
    el[scope$1] = { el, vm, container, onScroll: onScroll7 };
    if (container) {
      container.addEventListener("scroll", onScroll7);
      if (immediate) {
        const observer = el[scope$1].observer = new MutationObserver(onScroll7);
        observer.observe(container, { childList: true, subtree: true });
        onScroll7();
      }
    }
  },
  unbind(el) {
    console.log("unbind");
    const { container, onScroll: onScroll7 } = el[scope$1];
    if (container) {
      container.removeEventListener("scroll", onScroll7);
    }
  }
};
InfiniteScroll.install = function(Vue3) {
  Vue3.directive(InfiniteScroll.name, InfiniteScroll);
};
var render85 = function() {
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
      fn: function(props2) {
        return [_vm._t("pull-refresh-pulling", null, null, props2)];
      }
    }, {
      key: "loosing",
      fn: function(props2) {
        return [_vm._t("pull-refresh-loosing", null, null, props2)];
      }
    }, {
      key: "loading",
      fn: function(props2) {
        return [_vm._t("pull-refresh-loading", null, null, props2)];
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
const [defineComponent, t] = createNamespace("list");
const scope2 = "ElInfiniteScroll";
const __vue2_script = defineComponent({
  components: {
    VanPullRefresh: PullRefresh,
    VanLoading: Loading$1
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
    const onLoad3 = createEmitter("load");
    this.onLoad = () => {
      this.updateLoading(true);
      onLoad3();
    };
    const onRefresh = createEmitter("refresh");
    this.onRefresh = () => {
      onRefresh(() => {
        this.isRefresh = false;
        const { onScroll: onScroll7 } = this.$el[scope2] || {};
        onScroll7 && onScroll7();
      });
    };
  }
});
const __cssModules = {};
var __component__ = /* @__PURE__ */ normalizeComponent(__vue2_script, render85, staticRenderFns, false, __vue2_injectStyles, null, null, null);
function __vue2_injectStyles(context2) {
  for (let o in __cssModules) {
    this[o] = __cssModules[o];
  }
}
var MbList = /* @__PURE__ */ function() {
  return __component__.exports;
}();
const components = { MbPopup, MbList };
const vantComponents = {
  MbButton: Button$1,
  MbCell: Cell$1,
  MbIcon: Icon$1,
  MbLoading: Loading$1
};
var version = "0.0.3";
function install(Vue3) {
  Object.keys(components).forEach((key) => {
    const component2 = components[key];
    Vue3.component(component2.name, component2);
  });
  Object.keys(vantComponents).forEach((key) => {
    const component2 = vantComponents[key];
    Vue3.component(key, component2);
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
const Vue2 = Vue$1;
export { Locale, Vue2, MbLibUI as default };
