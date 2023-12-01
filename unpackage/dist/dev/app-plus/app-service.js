if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global2 = uni.requireGlobal();
  ArrayBuffer = global2.ArrayBuffer;
  Int8Array = global2.Int8Array;
  Uint8Array = global2.Uint8Array;
  Uint8ClampedArray = global2.Uint8ClampedArray;
  Int16Array = global2.Int16Array;
  Uint16Array = global2.Uint16Array;
  Int32Array = global2.Int32Array;
  Uint32Array = global2.Uint32Array;
  Float32Array = global2.Float32Array;
  Float64Array = global2.Float64Array;
  BigInt64Array = global2.BigInt64Array;
  BigUint64Array = global2.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue, shared) {
  "use strict";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom2) {
    return shared.isString(component) ? easycom2 : component;
  }
  function a$1(e2) {
    return a$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
      return typeof e3;
    } : function(e3) {
      return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
    }, a$1(e2);
  }
  function i(e2) {
    var r2 = function(e3, r3) {
      if ("object" !== a$1(e3) || null === e3)
        return e3;
      var t2 = e3[Symbol.toPrimitive];
      if (void 0 !== t2) {
        var n2 = t2.call(e3, r3 || "default");
        if ("object" !== a$1(n2))
          return n2;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r3 ? String : Number)(e3);
    }(e2, "string");
    return "symbol" === a$1(r2) ? r2 : r2 + "";
  }
  function u(e2, r2, t2) {
    return (r2 = i(r2)) in e2 ? Object.defineProperty(e2, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e2[r2] = t2, e2;
  }
  var c, l = Symbol("__ROUTER__"), f = Symbol("__ROUTE__");
  !function(e2) {
    e2.push = "navigateTo", e2.replace = "redirectTo", e2.replaceAll = "reLaunch", e2.pushTab = "switchTab", e2.back = "navigateBack";
  }(c || (c = {}));
  var s = ["navigateTo", "redirectTo", "reLaunch", "switchTab", "navigateBack"];
  function p(e2) {
    var r2 = {}, t2 = e2.split("?"), n2 = "", o = [];
    t2.length > 1 && (n2 = t2[1]), o = n2.split("&");
    for (var a2 = 0; o.length > a2; a2++)
      2 === o[a2].split("=").length && (r2[o[a2].split("=")[0]] = o[a2].split("=")[1]);
    return r2;
  }
  function v(e2, r2, t2) {
    return e2.replace(RegExp(r2, "g"), t2);
  }
  function h(e2) {
    return null == e2 || 0 === Object.keys(e2).length;
  }
  function b(e2, r2) {
    var t2 = Object.keys(e2);
    if (Object.getOwnPropertySymbols) {
      var n2 = Object.getOwnPropertySymbols(e2);
      r2 && (n2 = n2.filter(function(r3) {
        return Object.getOwnPropertyDescriptor(e2, r3).enumerable;
      })), t2.push.apply(t2, n2);
    }
    return t2;
  }
  function g(e2) {
    for (var r2 = 1; arguments.length > r2; r2++) {
      var t2 = null != arguments[r2] ? arguments[r2] : {};
      r2 % 2 ? b(Object(t2), true).forEach(function(r3) {
        u(e2, r3, t2[r3]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t2)) : b(Object(t2)).forEach(function(r3) {
        Object.defineProperty(e2, r3, Object.getOwnPropertyDescriptor(t2, r3));
      });
    }
    return e2;
  }
  var y = { navigateTo: uni.navigateTo, redirectTo: uni.redirectTo, reLaunch: uni.reLaunch, switchTab: uni.switchTab, navigateBack: uni.navigateBack };
  function d(e2, r2, t2) {
    var n2 = m(e2, r2);
    switch (t2) {
      case "push":
        y.navigateTo({ url: n2 });
        break;
      case "replace":
        y.redirectTo({ url: n2 });
        break;
      case "pushTab":
        y.switchTab({ url: n2 });
        break;
      case "replaceAll":
        y.reLaunch({ url: n2 });
        break;
      default:
        throw Error("无效的路由类型，请确保提供正确的路由类型");
    }
  }
  function m(e2, r2) {
    var t2 = "", n2 = {};
    if ("string" == typeof e2)
      t2 = e2;
    else {
      if (e2.name) {
        var o = r2.routes.find(function(r3) {
          return r3.name === e2.name;
        });
        if (!o || !o.path)
          throw Error("您正在尝试访问的路由未在路由表中定义。请检查您的路由配置。");
        t2 = o.path, n2 = e2.params;
      } else
        e2.path && (t2 = function(e3) {
          return e3 = v(e3, "//", "/"), e3 = v(e3, "https:/", "https://"), v(e3, "http:/", "http://");
        }("/".concat(e2.path.split("?")[0])), n2 = g(g({}, p(e2.path)), e2.query || {}));
      n2 && (t2 = function(e3, r3) {
        for (var t3 in r3)
          e3.indexOf("?") > -1 ? e3 += "&".concat(t3, "=").concat(r3[t3]) : e3 += "?".concat(t3, "=").concat(r3[t3]);
        return e3;
      }(t2, n2 = function(e3) {
        var r3 = {};
        if (e3)
          for (var t3 in e3) {
            var n3 = e3[t3];
            void 0 === n3 && (n3 = ""), r3[t3] = n3;
          }
        return r3;
      }(n2)));
    }
    return t2;
  }
  function O(e2) {
    var r2, t2 = (r2 = getCurrentPages()).length > 0 ? r2[r2.length - 1] : void 0;
    if (t2 && t2.route && e2.routes) {
      var n2 = k("/".concat(t2.route), e2);
      return t2.$page && (n2.fullPath = t2.$page.fullPath ? t2.$page.fullPath : "", n2.query = t2.$page.fullPath ? p(t2.$page.fullPath) : {}, n2.params = t2.$page.fullPath ? p(t2.$page.fullPath) : {}), n2;
    }
  }
  function k(e2, r2) {
    e2 = e2.split("?")[0];
    var t2 = r2.routes.find(function(r3) {
      return r3.path === e2 || r3.aliasPath === e2;
    });
    return JSON.parse(JSON.stringify(t2));
  }
  function P(e2, r2, t2) {
    e2.guardHooks[r2] = [t2];
  }
  var T = { navigateTo: uni.navigateTo, redirectTo: uni.redirectTo, reLaunch: uni.reLaunch, switchTab: uni.switchTab, navigateBack: uni.navigateBack };
  function w(e2) {
    s.forEach(function(r2) {
      y[r2] = function(t2) {
        if ("navigateBack" === r2)
          T[r2](t2);
        else if (e2.guardHooks.beforeHooks && e2.guardHooks.beforeHooks[0]) {
          var n2 = k(t2.url, e2);
          (function(e3, r3, t3) {
            return new Promise(function(n3, o) {
              var i2 = function e4(r4) {
                e4._called = true, false === r4 ? o({}) : n3(void 0 === r4 || true === r4 || r4);
              }, u2 = e3.call(void 0, r3, t3, i2), c2 = Promise.resolve(u2);
              if (3 > e3.length && (c2 = c2.then(i2)), e3.length > 2) {
                var l2 = 'The "next" callback was never called inside of '.concat(e3.name ? '"' + e3.name + '"' : "", ":\n").concat("" + e3, '\n. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.');
                if (null !== u2 && "object" === a$1(u2) && "then" in u2)
                  c2 = c2.then(function(e4) {
                    return i2._called ? e4 : (formatAppLog("warn", "at node_modules/uni-mini-router/lib/index.js:5", l2), Promise.reject(Error("Invalid navigation guard")));
                  });
                else if (!i2._called)
                  return formatAppLog("warn", "at node_modules/uni-mini-router/lib/index.js:5", l2), void o(Error("Invalid navigation guard"));
              }
              c2.catch(function(e4) {
                return o(e4);
              });
            });
          })(e2.guardHooks.beforeHooks[0], n2, e2.route.value).then(function(n3) {
            if (true === n3)
              T[r2](t2);
            else if ("string" == typeof n3) {
              var o = m(n3, e2);
              T[r2]({ url: o });
            } else if ("back" === n3.navType)
              T.navigateBack(n3);
            else {
              var a2 = m(n3, e2);
              T[n3.navType ? c[n3.navType] : r2]({ url: a2 });
            }
          }).catch(function(e3) {
            throw e3;
          });
        } else
          T[r2](t2);
      };
    });
  }
  function j() {
    var r2 = vue.inject(l);
    if (r2)
      return r2;
    throw Error('useRouter 只可以在 Vue 上下文中使用，请确保你已经正确地注册了 "uni-mini-router" 并且当前正处于 Vue 上下文中');
  }
  function E(e2, r2) {
    var t2 = Object.keys(e2);
    if (Object.getOwnPropertySymbols) {
      var n2 = Object.getOwnPropertySymbols(e2);
      r2 && (n2 = n2.filter(function(r3) {
        return Object.getOwnPropertyDescriptor(e2, r3).enumerable;
      })), t2.push.apply(t2, n2);
    }
    return t2;
  }
  function S(e2) {
    for (var r2 = 1; arguments.length > r2; r2++) {
      var t2 = null != arguments[r2] ? arguments[r2] : {};
      r2 % 2 ? E(Object(t2), true).forEach(function(r3) {
        u(e2, r3, t2[r3]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t2)) : E(Object(t2)).forEach(function(r3) {
        Object.defineProperty(e2, r3, Object.getOwnPropertyDescriptor(t2, r3));
      });
    }
    return e2;
  }
  function $(e2) {
    var r2 = { routes: e2.routes, guardHooks: { beforeHooks: null, afterHooks: null }, push: function(e3) {
      return d(e3, this, "push");
    }, replace: function(e3) {
      return d(e3, this, "replace");
    }, replaceAll: function(e3) {
      return d(e3, this, "replaceAll");
    }, pushTab: function(e3) {
      return d(e3, this, "pushTab");
    }, back: function(e3) {
      return uni.navigateBack(e3);
    }, beforeEach: function(e3) {
      P(r2, "beforeHooks", e3);
    }, afterEach: function(e3) {
      P(r2, "afterHooks", e3);
    }, install: function(e3) {
      var r3 = this, t2 = this;
      e3.provide(l, this), e3.provide(f, this.route), w(t2), e3.mixin({ beforeCreate: function() {
        if ("page" === this.$mpType && t2.guardHooks.afterHooks && t2.guardHooks.afterHooks[0]) {
          var e4 = t2.route.value, r4 = O(t2);
          t2.guardHooks.afterHooks[0].call(null, r4, e4);
        }
      }, onLoad: function(e4) {
        !h(e4) && h(t2.route.value.query) && h(t2.route.value.params) && (t2.route.value = S(S({}, t2.route.value), {}, { query: e4 }));
      }, onShow: function() {
        "page" === this.$mpType && function(e4) {
          e4.route.value = O(e4);
        }(t2);
      } }), Object.defineProperty(e3.config.globalProperties, "$Router", { get: function() {
        return t2;
      } }), Object.defineProperty(e3.config.globalProperties, "$Route", { enumerable: true, get: function() {
        return vue.unref(r3.route);
      } });
    }, route: vue.shallowRef({ path: "/" }) };
    return r2;
  }
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$F = {
    __name: "enter",
    setup(__props) {
      let router2 = j();
      const tiao = () => {
        router2.push("/pages/login/login");
      };
      const title = "EmoSphere";
      const slogan1 = "欢迎来到 EmoSphere";
      const slogan2 = "一个你的专属世界";
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
          vue.createElementVNode("view", {
            class: "box",
            style: { "width": "100%", "height": "5%" }
          }),
          vue.createElementVNode("view", { class: "text-area" }, [
            vue.createElementVNode("text", { class: "title" }, vue.toDisplayString(title)),
            vue.createElementVNode("text", { class: "slogan" }, vue.toDisplayString(slogan1)),
            vue.createElementVNode("text", {
              class: "slogan",
              style: { "margin-left": "15%" }
            }, vue.toDisplayString(slogan2))
          ]),
          vue.createElementVNode("view", {
            class: "btn",
            onClick: tiao
          }, [
            vue.createElementVNode("text", null, "SIGN IN")
          ])
        ]);
      };
    }
  };
  const PagesEnterEnter = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["__file", "D:/ruangong/emosphere/pages/enter/enter.vue"]]);
  function getDevtoolsGlobalHook() {
    return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function getTarget() {
    return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
  }
  const isProxyAvailable = typeof Proxy === "function";
  const HOOK_SETUP = "devtools-plugin:setup";
  const HOOK_PLUGIN_SETTINGS_SET = "plugin:settings:set";
  class ApiProxy {
    constructor(plugin, hook) {
      this.target = null;
      this.targetQueue = [];
      this.onQueue = [];
      this.plugin = plugin;
      this.hook = hook;
      const defaultSettings = {};
      if (plugin.settings) {
        for (const id in plugin.settings) {
          const item = plugin.settings[id];
          defaultSettings[id] = item.defaultValue;
        }
      }
      const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
      let currentSettings = { ...defaultSettings };
      try {
        const raw = localStorage.getItem(localSettingsSaveId);
        const data = JSON.parse(raw);
        Object.assign(currentSettings, data);
      } catch (e2) {
      }
      this.fallbacks = {
        getSettings() {
          return currentSettings;
        },
        setSettings(value) {
          try {
            localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
          } catch (e2) {
          }
          currentSettings = value;
        }
      };
      hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
        if (pluginId === this.plugin.id) {
          this.fallbacks.setSettings(value);
        }
      });
      this.proxiedOn = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target.on[prop];
          } else {
            return (...args) => {
              this.onQueue.push({
                method: prop,
                args
              });
            };
          }
        }
      });
      this.proxiedTarget = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target[prop];
          } else if (prop === "on") {
            return this.proxiedOn;
          } else if (Object.keys(this.fallbacks).includes(prop)) {
            return (...args) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve: () => {
                }
              });
              return this.fallbacks[prop](...args);
            };
          } else {
            return (...args) => {
              return new Promise((resolve) => {
                this.targetQueue.push({
                  method: prop,
                  args,
                  resolve
                });
              });
            };
          }
        }
      });
    }
    async setRealTarget(target) {
      this.target = target;
      for (const item of this.onQueue) {
        this.target.on[item.method](...item.args);
      }
      for (const item of this.targetQueue) {
        item.resolve(await this.target[item.method](...item.args));
      }
    }
  }
  function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
    const target = getTarget();
    const hook = getDevtoolsGlobalHook();
    const enableProxy = isProxyAvailable && pluginDescriptor.enableEarlyProxy;
    if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
      hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
    } else {
      const proxy = enableProxy ? new ApiProxy(pluginDescriptor, hook) : null;
      const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
      list.push({
        pluginDescriptor,
        setupFn,
        proxy
      });
      if (proxy)
        setupFn(proxy.proxiedTarget);
    }
  }
  /*!
   * vuex v4.1.0
   * (c) 2022 Evan You
   * @license MIT
   */
  var storeKey = "store";
  function forEachValue(obj, fn) {
    Object.keys(obj).forEach(function(key) {
      return fn(obj[key], key);
    });
  }
  function isObject$1(obj) {
    return obj !== null && typeof obj === "object";
  }
  function isPromise(val) {
    return val && typeof val.then === "function";
  }
  function assert(condition2, msg) {
    if (!condition2) {
      throw new Error("[vuex] " + msg);
    }
  }
  function partial(fn, arg) {
    return function() {
      return fn(arg);
    };
  }
  function genericSubscribe(fn, subs, options) {
    if (subs.indexOf(fn) < 0) {
      options && options.prepend ? subs.unshift(fn) : subs.push(fn);
    }
    return function() {
      var i2 = subs.indexOf(fn);
      if (i2 > -1) {
        subs.splice(i2, 1);
      }
    };
  }
  function resetStore(store2, hot) {
    store2._actions = /* @__PURE__ */ Object.create(null);
    store2._mutations = /* @__PURE__ */ Object.create(null);
    store2._wrappedGetters = /* @__PURE__ */ Object.create(null);
    store2._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
    var state = store2.state;
    installModule(store2, state, [], store2._modules.root, true);
    resetStoreState(store2, state, hot);
  }
  function resetStoreState(store2, state, hot) {
    var oldState = store2._state;
    var oldScope = store2._scope;
    store2.getters = {};
    store2._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
    var wrappedGetters = store2._wrappedGetters;
    var computedObj = {};
    var computedCache = {};
    var scope = vue.effectScope(true);
    scope.run(function() {
      forEachValue(wrappedGetters, function(fn, key) {
        computedObj[key] = partial(fn, store2);
        computedCache[key] = vue.computed(function() {
          return computedObj[key]();
        });
        Object.defineProperty(store2.getters, key, {
          get: function() {
            return computedCache[key].value;
          },
          enumerable: true
          // for local getters
        });
      });
    });
    store2._state = vue.reactive({
      data: state
    });
    store2._scope = scope;
    if (store2.strict) {
      enableStrictMode(store2);
    }
    if (oldState) {
      if (hot) {
        store2._withCommit(function() {
          oldState.data = null;
        });
      }
    }
    if (oldScope) {
      oldScope.stop();
    }
  }
  function installModule(store2, rootState, path, module, hot) {
    var isRoot = !path.length;
    var namespace = store2._modules.getNamespace(path);
    if (module.namespaced) {
      if (store2._modulesNamespaceMap[namespace] && true) {
        console.error("[vuex] duplicate namespace " + namespace + " for the namespaced module " + path.join("/"));
      }
      store2._modulesNamespaceMap[namespace] = module;
    }
    if (!isRoot && !hot) {
      var parentState = getNestedState(rootState, path.slice(0, -1));
      var moduleName = path[path.length - 1];
      store2._withCommit(function() {
        {
          if (moduleName in parentState) {
            console.warn(
              '[vuex] state field "' + moduleName + '" was overridden by a module with the same name at "' + path.join(".") + '"'
            );
          }
        }
        parentState[moduleName] = module.state;
      });
    }
    var local = module.context = makeLocalContext(store2, namespace, path);
    module.forEachMutation(function(mutation, key) {
      var namespacedType = namespace + key;
      registerMutation(store2, namespacedType, mutation, local);
    });
    module.forEachAction(function(action, key) {
      var type = action.root ? key : namespace + key;
      var handler = action.handler || action;
      registerAction(store2, type, handler, local);
    });
    module.forEachGetter(function(getter, key) {
      var namespacedType = namespace + key;
      registerGetter(store2, namespacedType, getter, local);
    });
    module.forEachChild(function(child, key) {
      installModule(store2, rootState, path.concat(key), child, hot);
    });
  }
  function makeLocalContext(store2, namespace, path) {
    var noNamespace = namespace === "";
    var local = {
      dispatch: noNamespace ? store2.dispatch : function(_type, _payload, _options) {
        var args = unifyObjectStyle(_type, _payload, _options);
        var payload = args.payload;
        var options = args.options;
        var type = args.type;
        if (!options || !options.root) {
          type = namespace + type;
          if (!store2._actions[type]) {
            console.error("[vuex] unknown local action type: " + args.type + ", global type: " + type);
            return;
          }
        }
        return store2.dispatch(type, payload);
      },
      commit: noNamespace ? store2.commit : function(_type, _payload, _options) {
        var args = unifyObjectStyle(_type, _payload, _options);
        var payload = args.payload;
        var options = args.options;
        var type = args.type;
        if (!options || !options.root) {
          type = namespace + type;
          if (!store2._mutations[type]) {
            console.error("[vuex] unknown local mutation type: " + args.type + ", global type: " + type);
            return;
          }
        }
        store2.commit(type, payload, options);
      }
    };
    Object.defineProperties(local, {
      getters: {
        get: noNamespace ? function() {
          return store2.getters;
        } : function() {
          return makeLocalGetters(store2, namespace);
        }
      },
      state: {
        get: function() {
          return getNestedState(store2.state, path);
        }
      }
    });
    return local;
  }
  function makeLocalGetters(store2, namespace) {
    if (!store2._makeLocalGettersCache[namespace]) {
      var gettersProxy = {};
      var splitPos = namespace.length;
      Object.keys(store2.getters).forEach(function(type) {
        if (type.slice(0, splitPos) !== namespace) {
          return;
        }
        var localType = type.slice(splitPos);
        Object.defineProperty(gettersProxy, localType, {
          get: function() {
            return store2.getters[type];
          },
          enumerable: true
        });
      });
      store2._makeLocalGettersCache[namespace] = gettersProxy;
    }
    return store2._makeLocalGettersCache[namespace];
  }
  function registerMutation(store2, type, handler, local) {
    var entry = store2._mutations[type] || (store2._mutations[type] = []);
    entry.push(function wrappedMutationHandler(payload) {
      handler.call(store2, local.state, payload);
    });
  }
  function registerAction(store2, type, handler, local) {
    var entry = store2._actions[type] || (store2._actions[type] = []);
    entry.push(function wrappedActionHandler(payload) {
      var res = handler.call(store2, {
        dispatch: local.dispatch,
        commit: local.commit,
        getters: local.getters,
        state: local.state,
        rootGetters: store2.getters,
        rootState: store2.state
      }, payload);
      if (!isPromise(res)) {
        res = Promise.resolve(res);
      }
      if (store2._devtoolHook) {
        return res.catch(function(err) {
          store2._devtoolHook.emit("vuex:error", err);
          throw err;
        });
      } else {
        return res;
      }
    });
  }
  function registerGetter(store2, type, rawGetter, local) {
    if (store2._wrappedGetters[type]) {
      {
        console.error("[vuex] duplicate getter key: " + type);
      }
      return;
    }
    store2._wrappedGetters[type] = function wrappedGetter(store3) {
      return rawGetter(
        local.state,
        // local state
        local.getters,
        // local getters
        store3.state,
        // root state
        store3.getters
        // root getters
      );
    };
  }
  function enableStrictMode(store2) {
    vue.watch(function() {
      return store2._state.data;
    }, function() {
      {
        assert(store2._committing, "do not mutate vuex store state outside mutation handlers.");
      }
    }, { deep: true, flush: "sync" });
  }
  function getNestedState(state, path) {
    return path.reduce(function(state2, key) {
      return state2[key];
    }, state);
  }
  function unifyObjectStyle(type, payload, options) {
    if (isObject$1(type) && type.type) {
      options = payload;
      payload = type;
      type = type.type;
    }
    {
      assert(typeof type === "string", "expects string as the type, but found " + typeof type + ".");
    }
    return { type, payload, options };
  }
  var LABEL_VUEX_BINDINGS = "vuex bindings";
  var MUTATIONS_LAYER_ID = "vuex:mutations";
  var ACTIONS_LAYER_ID = "vuex:actions";
  var INSPECTOR_ID = "vuex";
  var actionId = 0;
  function addDevtools(app, store2) {
    setupDevtoolsPlugin(
      {
        id: "org.vuejs.vuex",
        app,
        label: "Vuex",
        homepage: "https://next.vuex.vuejs.org/",
        logo: "https://vuejs.org/images/icons/favicon-96x96.png",
        packageName: "vuex",
        componentStateTypes: [LABEL_VUEX_BINDINGS]
      },
      function(api) {
        api.addTimelineLayer({
          id: MUTATIONS_LAYER_ID,
          label: "Vuex Mutations",
          color: COLOR_LIME_500
        });
        api.addTimelineLayer({
          id: ACTIONS_LAYER_ID,
          label: "Vuex Actions",
          color: COLOR_LIME_500
        });
        api.addInspector({
          id: INSPECTOR_ID,
          label: "Vuex",
          icon: "storage",
          treeFilterPlaceholder: "Filter stores..."
        });
        api.on.getInspectorTree(function(payload) {
          if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
            if (payload.filter) {
              var nodes = [];
              flattenStoreForInspectorTree(nodes, store2._modules.root, payload.filter, "");
              payload.rootNodes = nodes;
            } else {
              payload.rootNodes = [
                formatStoreForInspectorTree(store2._modules.root, "")
              ];
            }
          }
        });
        api.on.getInspectorState(function(payload) {
          if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
            var modulePath = payload.nodeId;
            makeLocalGetters(store2, modulePath);
            payload.state = formatStoreForInspectorState(
              getStoreModule(store2._modules, modulePath),
              modulePath === "root" ? store2.getters : store2._makeLocalGettersCache,
              modulePath
            );
          }
        });
        api.on.editInspectorState(function(payload) {
          if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
            var modulePath = payload.nodeId;
            var path = payload.path;
            if (modulePath !== "root") {
              path = modulePath.split("/").filter(Boolean).concat(path);
            }
            store2._withCommit(function() {
              payload.set(store2._state.data, path, payload.state.value);
            });
          }
        });
        store2.subscribe(function(mutation, state) {
          var data = {};
          if (mutation.payload) {
            data.payload = mutation.payload;
          }
          data.state = state;
          api.notifyComponentUpdate();
          api.sendInspectorTree(INSPECTOR_ID);
          api.sendInspectorState(INSPECTOR_ID);
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: Date.now(),
              title: mutation.type,
              data
            }
          });
        });
        store2.subscribeAction({
          before: function(action, state) {
            var data = {};
            if (action.payload) {
              data.payload = action.payload;
            }
            action._id = actionId++;
            action._time = Date.now();
            data.state = state;
            api.addTimelineEvent({
              layerId: ACTIONS_LAYER_ID,
              event: {
                time: action._time,
                title: action.type,
                groupId: action._id,
                subtitle: "start",
                data
              }
            });
          },
          after: function(action, state) {
            var data = {};
            var duration = Date.now() - action._time;
            data.duration = {
              _custom: {
                type: "duration",
                display: duration + "ms",
                tooltip: "Action duration",
                value: duration
              }
            };
            if (action.payload) {
              data.payload = action.payload;
            }
            data.state = state;
            api.addTimelineEvent({
              layerId: ACTIONS_LAYER_ID,
              event: {
                time: Date.now(),
                title: action.type,
                groupId: action._id,
                subtitle: "end",
                data
              }
            });
          }
        });
      }
    );
  }
  var COLOR_LIME_500 = 8702998;
  var COLOR_DARK = 6710886;
  var COLOR_WHITE = 16777215;
  var TAG_NAMESPACED = {
    label: "namespaced",
    textColor: COLOR_WHITE,
    backgroundColor: COLOR_DARK
  };
  function extractNameFromPath(path) {
    return path && path !== "root" ? path.split("/").slice(-2, -1)[0] : "Root";
  }
  function formatStoreForInspectorTree(module, path) {
    return {
      id: path || "root",
      // all modules end with a `/`, we want the last segment only
      // cart/ -> cart
      // nested/cart/ -> cart
      label: extractNameFromPath(path),
      tags: module.namespaced ? [TAG_NAMESPACED] : [],
      children: Object.keys(module._children).map(
        function(moduleName) {
          return formatStoreForInspectorTree(
            module._children[moduleName],
            path + moduleName + "/"
          );
        }
      )
    };
  }
  function flattenStoreForInspectorTree(result, module, filter, path) {
    if (path.includes(filter)) {
      result.push({
        id: path || "root",
        label: path.endsWith("/") ? path.slice(0, path.length - 1) : path || "Root",
        tags: module.namespaced ? [TAG_NAMESPACED] : []
      });
    }
    Object.keys(module._children).forEach(function(moduleName) {
      flattenStoreForInspectorTree(result, module._children[moduleName], filter, path + moduleName + "/");
    });
  }
  function formatStoreForInspectorState(module, getters, path) {
    getters = path === "root" ? getters : getters[path];
    var gettersKeys = Object.keys(getters);
    var storeState = {
      state: Object.keys(module.state).map(function(key) {
        return {
          key,
          editable: true,
          value: module.state[key]
        };
      })
    };
    if (gettersKeys.length) {
      var tree = transformPathsToObjectTree(getters);
      storeState.getters = Object.keys(tree).map(function(key) {
        return {
          key: key.endsWith("/") ? extractNameFromPath(key) : key,
          editable: false,
          value: canThrow(function() {
            return tree[key];
          })
        };
      });
    }
    return storeState;
  }
  function transformPathsToObjectTree(getters) {
    var result = {};
    Object.keys(getters).forEach(function(key) {
      var path = key.split("/");
      if (path.length > 1) {
        var target = result;
        var leafKey = path.pop();
        path.forEach(function(p2) {
          if (!target[p2]) {
            target[p2] = {
              _custom: {
                value: {},
                display: p2,
                tooltip: "Module",
                abstract: true
              }
            };
          }
          target = target[p2]._custom.value;
        });
        target[leafKey] = canThrow(function() {
          return getters[key];
        });
      } else {
        result[key] = canThrow(function() {
          return getters[key];
        });
      }
    });
    return result;
  }
  function getStoreModule(moduleMap, path) {
    var names = path.split("/").filter(function(n2) {
      return n2;
    });
    return names.reduce(
      function(module, moduleName, i2) {
        var child = module[moduleName];
        if (!child) {
          throw new Error('Missing module "' + moduleName + '" for path "' + path + '".');
        }
        return i2 === names.length - 1 ? child : child._children;
      },
      path === "root" ? moduleMap : moduleMap.root._children
    );
  }
  function canThrow(cb) {
    try {
      return cb();
    } catch (e2) {
      return e2;
    }
  }
  var Module = function Module2(rawModule, runtime) {
    this.runtime = runtime;
    this._children = /* @__PURE__ */ Object.create(null);
    this._rawModule = rawModule;
    var rawState = rawModule.state;
    this.state = (typeof rawState === "function" ? rawState() : rawState) || {};
  };
  var prototypeAccessors$1 = { namespaced: { configurable: true } };
  prototypeAccessors$1.namespaced.get = function() {
    return !!this._rawModule.namespaced;
  };
  Module.prototype.addChild = function addChild(key, module) {
    this._children[key] = module;
  };
  Module.prototype.removeChild = function removeChild(key) {
    delete this._children[key];
  };
  Module.prototype.getChild = function getChild(key) {
    return this._children[key];
  };
  Module.prototype.hasChild = function hasChild(key) {
    return key in this._children;
  };
  Module.prototype.update = function update2(rawModule) {
    this._rawModule.namespaced = rawModule.namespaced;
    if (rawModule.actions) {
      this._rawModule.actions = rawModule.actions;
    }
    if (rawModule.mutations) {
      this._rawModule.mutations = rawModule.mutations;
    }
    if (rawModule.getters) {
      this._rawModule.getters = rawModule.getters;
    }
  };
  Module.prototype.forEachChild = function forEachChild(fn) {
    forEachValue(this._children, fn);
  };
  Module.prototype.forEachGetter = function forEachGetter(fn) {
    if (this._rawModule.getters) {
      forEachValue(this._rawModule.getters, fn);
    }
  };
  Module.prototype.forEachAction = function forEachAction(fn) {
    if (this._rawModule.actions) {
      forEachValue(this._rawModule.actions, fn);
    }
  };
  Module.prototype.forEachMutation = function forEachMutation(fn) {
    if (this._rawModule.mutations) {
      forEachValue(this._rawModule.mutations, fn);
    }
  };
  Object.defineProperties(Module.prototype, prototypeAccessors$1);
  var ModuleCollection = function ModuleCollection2(rawRootModule) {
    this.register([], rawRootModule, false);
  };
  ModuleCollection.prototype.get = function get(path) {
    return path.reduce(function(module, key) {
      return module.getChild(key);
    }, this.root);
  };
  ModuleCollection.prototype.getNamespace = function getNamespace(path) {
    var module = this.root;
    return path.reduce(function(namespace, key) {
      module = module.getChild(key);
      return namespace + (module.namespaced ? key + "/" : "");
    }, "");
  };
  ModuleCollection.prototype.update = function update$1(rawRootModule) {
    update([], this.root, rawRootModule);
  };
  ModuleCollection.prototype.register = function register(path, rawModule, runtime) {
    var this$1$1 = this;
    if (runtime === void 0)
      runtime = true;
    {
      assertRawModule(path, rawModule);
    }
    var newModule = new Module(rawModule, runtime);
    if (path.length === 0) {
      this.root = newModule;
    } else {
      var parent = this.get(path.slice(0, -1));
      parent.addChild(path[path.length - 1], newModule);
    }
    if (rawModule.modules) {
      forEachValue(rawModule.modules, function(rawChildModule, key) {
        this$1$1.register(path.concat(key), rawChildModule, runtime);
      });
    }
  };
  ModuleCollection.prototype.unregister = function unregister(path) {
    var parent = this.get(path.slice(0, -1));
    var key = path[path.length - 1];
    var child = parent.getChild(key);
    if (!child) {
      {
        console.warn(
          "[vuex] trying to unregister module '" + key + "', which is not registered"
        );
      }
      return;
    }
    if (!child.runtime) {
      return;
    }
    parent.removeChild(key);
  };
  ModuleCollection.prototype.isRegistered = function isRegistered(path) {
    var parent = this.get(path.slice(0, -1));
    var key = path[path.length - 1];
    if (parent) {
      return parent.hasChild(key);
    }
    return false;
  };
  function update(path, targetModule, newModule) {
    {
      assertRawModule(path, newModule);
    }
    targetModule.update(newModule);
    if (newModule.modules) {
      for (var key in newModule.modules) {
        if (!targetModule.getChild(key)) {
          {
            console.warn(
              "[vuex] trying to add a new module '" + key + "' on hot reloading, manual reload is needed"
            );
          }
          return;
        }
        update(
          path.concat(key),
          targetModule.getChild(key),
          newModule.modules[key]
        );
      }
    }
  }
  var functionAssert = {
    assert: function(value) {
      return typeof value === "function";
    },
    expected: "function"
  };
  var objectAssert = {
    assert: function(value) {
      return typeof value === "function" || typeof value === "object" && typeof value.handler === "function";
    },
    expected: 'function or object with "handler" function'
  };
  var assertTypes = {
    getters: functionAssert,
    mutations: functionAssert,
    actions: objectAssert
  };
  function assertRawModule(path, rawModule) {
    Object.keys(assertTypes).forEach(function(key) {
      if (!rawModule[key]) {
        return;
      }
      var assertOptions = assertTypes[key];
      forEachValue(rawModule[key], function(value, type) {
        assert(
          assertOptions.assert(value),
          makeAssertionMessage(path, key, type, value, assertOptions.expected)
        );
      });
    });
  }
  function makeAssertionMessage(path, key, type, value, expected) {
    var buf = key + " should be " + expected + ' but "' + key + "." + type + '"';
    if (path.length > 0) {
      buf += ' in module "' + path.join(".") + '"';
    }
    buf += " is " + JSON.stringify(value) + ".";
    return buf;
  }
  function createStore(options) {
    return new Store(options);
  }
  var Store = function Store2(options) {
    var this$1$1 = this;
    if (options === void 0)
      options = {};
    {
      assert(typeof Promise !== "undefined", "vuex requires a Promise polyfill in this browser.");
      assert(this instanceof Store2, "store must be called with the new operator.");
    }
    var plugins = options.plugins;
    if (plugins === void 0)
      plugins = [];
    var strict = options.strict;
    if (strict === void 0)
      strict = false;
    var devtools = options.devtools;
    this._committing = false;
    this._actions = /* @__PURE__ */ Object.create(null);
    this._actionSubscribers = [];
    this._mutations = /* @__PURE__ */ Object.create(null);
    this._wrappedGetters = /* @__PURE__ */ Object.create(null);
    this._modules = new ModuleCollection(options);
    this._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
    this._subscribers = [];
    this._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
    this._scope = null;
    this._devtools = devtools;
    var store2 = this;
    var ref = this;
    var dispatch = ref.dispatch;
    var commit = ref.commit;
    this.dispatch = function boundDispatch(type, payload) {
      return dispatch.call(store2, type, payload);
    };
    this.commit = function boundCommit(type, payload, options2) {
      return commit.call(store2, type, payload, options2);
    };
    this.strict = strict;
    var state = this._modules.root.state;
    installModule(this, state, [], this._modules.root);
    resetStoreState(this, state);
    plugins.forEach(function(plugin) {
      return plugin(this$1$1);
    });
  };
  var prototypeAccessors = { state: { configurable: true } };
  Store.prototype.install = function install(app, injectKey) {
    app.provide(injectKey || storeKey, this);
    app.config.globalProperties.$store = this;
    var useDevtools = this._devtools !== void 0 ? this._devtools : true;
    if (useDevtools) {
      addDevtools(app, this);
    }
  };
  prototypeAccessors.state.get = function() {
    return this._state.data;
  };
  prototypeAccessors.state.set = function(v2) {
    {
      assert(false, "use store.replaceState() to explicit replace store state.");
    }
  };
  Store.prototype.commit = function commit(_type, _payload, _options) {
    var this$1$1 = this;
    var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;
    var mutation = { type, payload };
    var entry = this._mutations[type];
    if (!entry) {
      {
        console.error("[vuex] unknown mutation type: " + type);
      }
      return;
    }
    this._withCommit(function() {
      entry.forEach(function commitIterator(handler) {
        handler(payload);
      });
    });
    this._subscribers.slice().forEach(function(sub) {
      return sub(mutation, this$1$1.state);
    });
    if (options && options.silent) {
      console.warn(
        "[vuex] mutation type: " + type + ". Silent option has been removed. Use the filter functionality in the vue-devtools"
      );
    }
  };
  Store.prototype.dispatch = function dispatch(_type, _payload) {
    var this$1$1 = this;
    var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;
    var action = { type, payload };
    var entry = this._actions[type];
    if (!entry) {
      {
        console.error("[vuex] unknown action type: " + type);
      }
      return;
    }
    try {
      this._actionSubscribers.slice().filter(function(sub) {
        return sub.before;
      }).forEach(function(sub) {
        return sub.before(action, this$1$1.state);
      });
    } catch (e2) {
      {
        console.warn("[vuex] error in before action subscribers: ");
        console.error(e2);
      }
    }
    var result = entry.length > 1 ? Promise.all(entry.map(function(handler) {
      return handler(payload);
    })) : entry[0](payload);
    return new Promise(function(resolve, reject) {
      result.then(function(res) {
        try {
          this$1$1._actionSubscribers.filter(function(sub) {
            return sub.after;
          }).forEach(function(sub) {
            return sub.after(action, this$1$1.state);
          });
        } catch (e2) {
          {
            console.warn("[vuex] error in after action subscribers: ");
            console.error(e2);
          }
        }
        resolve(res);
      }, function(error) {
        try {
          this$1$1._actionSubscribers.filter(function(sub) {
            return sub.error;
          }).forEach(function(sub) {
            return sub.error(action, this$1$1.state, error);
          });
        } catch (e2) {
          {
            console.warn("[vuex] error in error action subscribers: ");
            console.error(e2);
          }
        }
        reject(error);
      });
    });
  };
  Store.prototype.subscribe = function subscribe(fn, options) {
    return genericSubscribe(fn, this._subscribers, options);
  };
  Store.prototype.subscribeAction = function subscribeAction(fn, options) {
    var subs = typeof fn === "function" ? { before: fn } : fn;
    return genericSubscribe(subs, this._actionSubscribers, options);
  };
  Store.prototype.watch = function watch$1(getter, cb, options) {
    var this$1$1 = this;
    {
      assert(typeof getter === "function", "store.watch only accepts a function.");
    }
    return vue.watch(function() {
      return getter(this$1$1.state, this$1$1.getters);
    }, cb, Object.assign({}, options));
  };
  Store.prototype.replaceState = function replaceState(state) {
    var this$1$1 = this;
    this._withCommit(function() {
      this$1$1._state.data = state;
    });
  };
  Store.prototype.registerModule = function registerModule(path, rawModule, options) {
    if (options === void 0)
      options = {};
    if (typeof path === "string") {
      path = [path];
    }
    {
      assert(Array.isArray(path), "module path must be a string or an Array.");
      assert(path.length > 0, "cannot register the root module by using registerModule.");
    }
    this._modules.register(path, rawModule);
    installModule(this, this.state, path, this._modules.get(path), options.preserveState);
    resetStoreState(this, this.state);
  };
  Store.prototype.unregisterModule = function unregisterModule(path) {
    var this$1$1 = this;
    if (typeof path === "string") {
      path = [path];
    }
    {
      assert(Array.isArray(path), "module path must be a string or an Array.");
    }
    this._modules.unregister(path);
    this._withCommit(function() {
      var parentState = getNestedState(this$1$1.state, path.slice(0, -1));
      delete parentState[path[path.length - 1]];
    });
    resetStore(this);
  };
  Store.prototype.hasModule = function hasModule(path) {
    if (typeof path === "string") {
      path = [path];
    }
    {
      assert(Array.isArray(path), "module path must be a string or an Array.");
    }
    return this._modules.isRegistered(path);
  };
  Store.prototype.hotUpdate = function hotUpdate(newOptions) {
    this._modules.update(newOptions);
    resetStore(this, true);
  };
  Store.prototype._withCommit = function _withCommit(fn) {
    var committing = this._committing;
    this._committing = true;
    fn();
    this._committing = committing;
  };
  Object.defineProperties(Store.prototype, prototypeAccessors);
  const store = createStore({
    state: {
      userId: null,
      username: null,
      userbirthday: null,
      usergender: null,
      userstatus: null,
      ImagePath: null,
      emotionIcons: ["xiyue", "beiai", "danyou", "yane", "jingqi", "fennu"],
      shoucang: []
    },
    mutations: {
      setUserData(state, { id, username, userBirthday, userGender, imagepath }) {
        state.ImagePath = imagepath;
        state.userId = id;
        state.username = username;
        state.userbirthday = userBirthday;
        state.usergender = userGender;
      },
      upData(state, { username, userBirthday, userGender, userstatus, imagepath }) {
        state.username = username;
        state.userBirthday = userBirthday;
        state.userGender = userGender;
        state.userstatus = userstatus;
        state.ImagePath = imagepath;
      },
      setPath(state, path) {
        state.ImagePath = path;
      },
      clearUserData(state) {
        state.userId = null;
        state.username = null;
        state.userbirthday = null;
        state.usergender = null;
        state.usertatus = null;
      },
      updateshoucang(state, { userId, integerArray }) {
        state.userId = userId;
        state.shoucang = integerArray;
      }
    },
    actions: {},
    getters: {
      getUserId: (state) => state.userId,
      getUsername: (state) => state.username,
      getEmotionIcons: (state) => state.emotionIcons,
      getUserBirthday: (state) => state.userbirthday,
      getUserGender: (state) => state.usergender,
      getUserStatus: (state) => state.userstatus,
      getEmotionIcons: (state) => state.emotionIcons
    }
  });
  const _sfc_main$E = {
    __name: "login",
    setup(__props) {
      let router2 = j();
      const phoneNumber = vue.ref("");
      const password = vue.ref("");
      const agreementChecked = vue.ref(false);
      const handleLogin = () => {
        if (!agreementChecked.value) {
          uni.showToast({
            title: "请同意用户协议和隐私协议",
            icon: "none"
          });
          return;
        }
        uni.request({
          url: "http://8.136.81.197:8080/user/login",
          method: "POST",
          data: {
            phone: phoneNumber.value,
            pwd: password.value
          },
          success: (response) => {
            let formattedBirthday;
            const user = response.data["user"];
            if (user.birthday == null) {
              formattedBirthday = "2000-01-01";
            } else {
              formattedBirthday = user.birthday.substring(0, 10);
            }
            formatAppLog("log", "at pages/login/login.vue:69", formattedBirthday);
            store.commit("setUserData", {
              id: user.id,
              username: user.username,
              userBirthday: formattedBirthday,
              userGender: user.gender,
              imagepath: user.avatar
            });
            formatAppLog("log", "at pages/login/login.vue:77", store.state.username, store.state.userBirthday, store.state.userGender, store.state.ImagePath);
            router2.replace("/pages/main/main");
          },
          fail: (error) => {
            formatAppLog("error", "at pages/login/login.vue:82", error);
          }
        });
      };
      const toggleAgreement = () => {
        agreementChecked.value = !agreementChecked.value;
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "login" }, [
          vue.createElementVNode("view", { class: "login-area" }, [
            vue.createElementVNode("image", {
              class: "logo",
              src: "/static/images/logo.png"
            }),
            vue.createElementVNode("view", { class: "login-card-input" }, [
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  class: "account-input",
                  type: "text",
                  placeholder: "Phone/Email Address",
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => phoneNumber.value = $event)
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vModelText, phoneNumber.value]
              ]),
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  class: "code-input",
                  type: "password",
                  placeholder: "Password",
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => password.value = $event)
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vModelText, password.value]
              ])
            ]),
            vue.createElementVNode("view", {
              class: "login-card-loginIn-btn",
              onClick: handleLogin
            }, " 登 录 / 注 册 "),
            vue.createElementVNode("view", { class: "otherlogin" }, [
              vue.createElementVNode("text", null, "-----其他登录方式-----"),
              vue.createElementVNode("view", { class: "icon-list" }, [
                vue.createElementVNode("li", { class: "iconfont icon-weibo" }),
                vue.createElementVNode("li", { class: "iconfont icon-f-qq" }),
                vue.createElementVNode("li", { class: "iconfont icon-weixin" })
              ])
            ]),
            vue.createElementVNode("view", {
              class: "bottom-message",
              onClick: toggleAgreement
            }, [
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(["checkbox", { checked: agreementChecked.value }])
                },
                [
                  agreementChecked.value ? (vue.openBlock(), vue.createElementBlock("text", {
                    key: 0,
                    class: "checkmark"
                  }, "✔")) : vue.createCommentVNode("v-if", true)
                ],
                2
                /* CLASS */
              ),
              vue.createElementVNode("text", null, " 我已阅读并同意《用户协议》《隐私协议》 ")
            ])
          ])
        ]);
      };
    }
  };
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["__file", "D:/ruangong/emosphere/pages/login/login.vue"]]);
  class MPAnimation {
    constructor(options, _this) {
      this.options = options;
      this.animation = uni.createAnimation({
        ...options
      });
      this.currentStepAnimates = {};
      this.next = 0;
      this.$ = _this;
    }
    _nvuePushAnimates(type, args) {
      let aniObj = this.currentStepAnimates[this.next];
      let styles = {};
      if (!aniObj) {
        styles = {
          styles: {},
          config: {}
        };
      } else {
        styles = aniObj;
      }
      if (animateTypes1.includes(type)) {
        if (!styles.styles.transform) {
          styles.styles.transform = "";
        }
        let unit = "";
        if (type === "rotate") {
          unit = "deg";
        }
        styles.styles.transform += `${type}(${args + unit}) `;
      } else {
        styles.styles[type] = `${args}`;
      }
      this.currentStepAnimates[this.next] = styles;
    }
    _animateRun(styles = {}, config = {}) {
      let ref = this.$.$refs["ani"].ref;
      if (!ref)
        return;
      return new Promise((resolve, reject) => {
        nvueAnimation.transition(ref, {
          styles,
          ...config
        }, (res) => {
          resolve();
        });
      });
    }
    _nvueNextAnimate(animates, step = 0, fn) {
      let obj = animates[step];
      if (obj) {
        let {
          styles,
          config
        } = obj;
        this._animateRun(styles, config).then(() => {
          step += 1;
          this._nvueNextAnimate(animates, step, fn);
        });
      } else {
        this.currentStepAnimates = {};
        typeof fn === "function" && fn();
        this.isEnd = true;
      }
    }
    step(config = {}) {
      this.animation.step(config);
      return this;
    }
    run(fn) {
      this.$.animationData = this.animation.export();
      this.$.timer = setTimeout(() => {
        typeof fn === "function" && fn();
      }, this.$.durationTime);
    }
  }
  const animateTypes1 = [
    "matrix",
    "matrix3d",
    "rotate",
    "rotate3d",
    "rotateX",
    "rotateY",
    "rotateZ",
    "scale",
    "scale3d",
    "scaleX",
    "scaleY",
    "scaleZ",
    "skew",
    "skewX",
    "skewY",
    "translate",
    "translate3d",
    "translateX",
    "translateY",
    "translateZ"
  ];
  const animateTypes2 = ["opacity", "backgroundColor"];
  const animateTypes3 = ["width", "height", "left", "right", "top", "bottom"];
  animateTypes1.concat(animateTypes2, animateTypes3).forEach((type) => {
    MPAnimation.prototype[type] = function(...args) {
      this.animation[type](...args);
      return this;
    };
  });
  function createAnimation(option, _this) {
    if (!_this)
      return;
    clearTimeout(_this.timer);
    return new MPAnimation(option, _this);
  }
  const _sfc_main$D = {
    name: "uniTransition",
    emits: ["click", "change"],
    props: {
      show: {
        type: Boolean,
        default: false
      },
      modeClass: {
        type: [Array, String],
        default() {
          return "fade";
        }
      },
      duration: {
        type: Number,
        default: 300
      },
      styles: {
        type: Object,
        default() {
          return {};
        }
      },
      customClass: {
        type: String,
        default: ""
      },
      onceRender: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isShow: false,
        transform: "",
        opacity: 1,
        animationData: {},
        durationTime: 300,
        config: {}
      };
    },
    watch: {
      show: {
        handler(newVal) {
          if (newVal) {
            this.open();
          } else {
            if (this.isShow) {
              this.close();
            }
          }
        },
        immediate: true
      }
    },
    computed: {
      // 生成样式数据
      stylesObject() {
        let styles = {
          ...this.styles,
          "transition-duration": this.duration / 1e3 + "s"
        };
        let transform = "";
        for (let i2 in styles) {
          let line = this.toLine(i2);
          transform += line + ":" + styles[i2] + ";";
        }
        return transform;
      },
      // 初始化动画条件
      transformStyles() {
        return "transform:" + this.transform + ";opacity:" + this.opacity + ";" + this.stylesObject;
      }
    },
    created() {
      this.config = {
        duration: this.duration,
        timingFunction: "ease",
        transformOrigin: "50% 50%",
        delay: 0
      };
      this.durationTime = this.duration;
    },
    methods: {
      /**
       *  ref 触发 初始化动画
       */
      init(obj = {}) {
        if (obj.duration) {
          this.durationTime = obj.duration;
        }
        this.animation = createAnimation(Object.assign(this.config, obj), this);
      },
      /**
       * 点击组件触发回调
       */
      onClick() {
        this.$emit("click", {
          detail: this.isShow
        });
      },
      /**
       * ref 触发 动画分组
       * @param {Object} obj
       */
      step(obj, config = {}) {
        if (!this.animation)
          return;
        for (let i2 in obj) {
          try {
            if (typeof obj[i2] === "object") {
              this.animation[i2](...obj[i2]);
            } else {
              this.animation[i2](obj[i2]);
            }
          } catch (e2) {
            formatAppLog("error", "at uni_modules/uni-transition/components/uni-transition/uni-transition.vue:143", `方法 ${i2} 不存在`);
          }
        }
        this.animation.step(config);
        return this;
      },
      /**
       *  ref 触发 执行动画
       */
      run(fn) {
        if (!this.animation)
          return;
        this.animation.run(fn);
      },
      // 开始过度动画
      open() {
        clearTimeout(this.timer);
        this.transform = "";
        this.isShow = true;
        let { opacity, transform } = this.styleInit(false);
        if (typeof opacity !== "undefined") {
          this.opacity = opacity;
        }
        this.transform = transform;
        this.$nextTick(() => {
          this.timer = setTimeout(() => {
            this.animation = createAnimation(this.config, this);
            this.tranfromInit(false).step();
            this.animation.run();
            this.$emit("change", {
              detail: this.isShow
            });
          }, 20);
        });
      },
      // 关闭过度动画
      close(type) {
        if (!this.animation)
          return;
        this.tranfromInit(true).step().run(() => {
          this.isShow = false;
          this.animationData = null;
          this.animation = null;
          let { opacity, transform } = this.styleInit(false);
          this.opacity = opacity || 1;
          this.transform = transform;
          this.$emit("change", {
            detail: this.isShow
          });
        });
      },
      // 处理动画开始前的默认样式
      styleInit(type) {
        let styles = {
          transform: ""
        };
        let buildStyle = (type2, mode) => {
          if (mode === "fade") {
            styles.opacity = this.animationType(type2)[mode];
          } else {
            styles.transform += this.animationType(type2)[mode] + " ";
          }
        };
        if (typeof this.modeClass === "string") {
          buildStyle(type, this.modeClass);
        } else {
          this.modeClass.forEach((mode) => {
            buildStyle(type, mode);
          });
        }
        return styles;
      },
      // 处理内置组合动画
      tranfromInit(type) {
        let buildTranfrom = (type2, mode) => {
          let aniNum = null;
          if (mode === "fade") {
            aniNum = type2 ? 0 : 1;
          } else {
            aniNum = type2 ? "-100%" : "0";
            if (mode === "zoom-in") {
              aniNum = type2 ? 0.8 : 1;
            }
            if (mode === "zoom-out") {
              aniNum = type2 ? 1.2 : 1;
            }
            if (mode === "slide-right") {
              aniNum = type2 ? "100%" : "0";
            }
            if (mode === "slide-bottom") {
              aniNum = type2 ? "100%" : "0";
            }
          }
          this.animation[this.animationMode()[mode]](aniNum);
        };
        if (typeof this.modeClass === "string") {
          buildTranfrom(type, this.modeClass);
        } else {
          this.modeClass.forEach((mode) => {
            buildTranfrom(type, mode);
          });
        }
        return this.animation;
      },
      animationType(type) {
        return {
          fade: type ? 1 : 0,
          "slide-top": `translateY(${type ? "0" : "-100%"})`,
          "slide-right": `translateX(${type ? "0" : "100%"})`,
          "slide-bottom": `translateY(${type ? "0" : "100%"})`,
          "slide-left": `translateX(${type ? "0" : "-100%"})`,
          "zoom-in": `scaleX(${type ? 1 : 0.8}) scaleY(${type ? 1 : 0.8})`,
          "zoom-out": `scaleX(${type ? 1 : 1.2}) scaleY(${type ? 1 : 1.2})`
        };
      },
      // 内置动画类型与实际动画对应字典
      animationMode() {
        return {
          fade: "opacity",
          "slide-top": "translateY",
          "slide-right": "translateX",
          "slide-bottom": "translateY",
          "slide-left": "translateX",
          "zoom-in": "scale",
          "zoom-out": "scale"
        };
      },
      // 驼峰转中横线
      toLine(name) {
        return name.replace(/([A-Z])/g, "-$1").toLowerCase();
      }
    }
  };
  function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
    return $data.isShow || $props.onceRender ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("view", {
      key: 0,
      ref: "ani",
      animation: $data.animationData,
      class: vue.normalizeClass($props.customClass),
      style: vue.normalizeStyle($options.transformStyles),
      onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 14, ["animation"])), [
      [vue.vShow, $data.isShow]
    ]) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_0$6 = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["render", _sfc_render$p], ["__file", "D:/ruangong/emosphere/uni_modules/uni-transition/components/uni-transition/uni-transition.vue"]]);
  const _sfc_main$C = {
    name: "uniPopup",
    components: {},
    emits: ["change", "maskClick"],
    props: {
      // 开启动画
      animation: {
        type: Boolean,
        default: true
      },
      // 弹出层类型，可选值，top: 顶部弹出层；bottom：底部弹出层；center：全屏弹出层
      // message: 消息提示 ; dialog : 对话框
      type: {
        type: String,
        default: "center"
      },
      // maskClick
      isMaskClick: {
        type: Boolean,
        default: null
      },
      // TODO 2 个版本后废弃属性 ，使用 isMaskClick
      maskClick: {
        type: Boolean,
        default: null
      },
      backgroundColor: {
        type: String,
        default: "none"
      },
      safeArea: {
        type: Boolean,
        default: true
      },
      maskBackgroundColor: {
        type: String,
        default: "rgba(0, 0, 0, 0.4)"
      }
    },
    watch: {
      /**
       * 监听type类型
       */
      type: {
        handler: function(type) {
          if (!this.config[type])
            return;
          this[this.config[type]](true);
        },
        immediate: true
      },
      isDesktop: {
        handler: function(newVal) {
          if (!this.config[newVal])
            return;
          this[this.config[this.type]](true);
        },
        immediate: true
      },
      /**
       * 监听遮罩是否可点击
       * @param {Object} val
       */
      maskClick: {
        handler: function(val) {
          this.mkclick = val;
        },
        immediate: true
      },
      isMaskClick: {
        handler: function(val) {
          this.mkclick = val;
        },
        immediate: true
      },
      // H5 下禁止底部滚动
      showPopup(show) {
      }
    },
    data() {
      return {
        duration: 300,
        ani: [],
        showPopup: false,
        showTrans: false,
        popupWidth: 0,
        popupHeight: 0,
        config: {
          top: "top",
          bottom: "bottom",
          center: "center",
          left: "left",
          right: "right",
          message: "top",
          dialog: "center",
          share: "bottom"
        },
        maskClass: {
          position: "fixed",
          bottom: 0,
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)"
        },
        transClass: {
          position: "fixed",
          left: 0,
          right: 0
        },
        maskShow: true,
        mkclick: true,
        popupstyle: this.isDesktop ? "fixforpc-top" : "top"
      };
    },
    computed: {
      isDesktop() {
        return this.popupWidth >= 500 && this.popupHeight >= 500;
      },
      bg() {
        if (this.backgroundColor === "" || this.backgroundColor === "none") {
          return "transparent";
        }
        return this.backgroundColor;
      }
    },
    mounted() {
      const fixSize = () => {
        const {
          windowWidth,
          windowHeight,
          windowTop,
          safeArea,
          screenHeight,
          safeAreaInsets
        } = uni.getSystemInfoSync();
        this.popupWidth = windowWidth;
        this.popupHeight = windowHeight + (windowTop || 0);
        if (safeArea && this.safeArea) {
          this.safeAreaInsets = safeAreaInsets.bottom;
        } else {
          this.safeAreaInsets = 0;
        }
      };
      fixSize();
    },
    // TODO vue3
    unmounted() {
      this.setH5Visible();
    },
    created() {
      if (this.isMaskClick === null && this.maskClick === null) {
        this.mkclick = true;
      } else {
        this.mkclick = this.isMaskClick !== null ? this.isMaskClick : this.maskClick;
      }
      if (this.animation) {
        this.duration = 300;
      } else {
        this.duration = 0;
      }
      this.messageChild = null;
      this.clearPropagation = false;
      this.maskClass.backgroundColor = this.maskBackgroundColor;
    },
    methods: {
      setH5Visible() {
      },
      /**
       * 公用方法，不显示遮罩层
       */
      closeMask() {
        this.maskShow = false;
      },
      /**
       * 公用方法，遮罩层禁止点击
       */
      disableMask() {
        this.mkclick = false;
      },
      // TODO nvue 取消冒泡
      clear(e2) {
        e2.stopPropagation();
        this.clearPropagation = true;
      },
      open(direction) {
        if (this.showPopup) {
          return;
        }
        let innerType = ["top", "center", "bottom", "left", "right", "message", "dialog", "share"];
        if (!(direction && innerType.indexOf(direction) !== -1)) {
          direction = this.type;
        }
        if (!this.config[direction]) {
          formatAppLog("error", "at uni_modules/uni-popup/components/uni-popup/uni-popup.vue:279", "缺少类型：", direction);
          return;
        }
        this[this.config[direction]]();
        this.$emit("change", {
          show: true,
          type: direction
        });
      },
      close(type) {
        this.showTrans = false;
        this.$emit("change", {
          show: false,
          type: this.type
        });
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.showPopup = false;
        }, 300);
      },
      // TODO 处理冒泡事件，头条的冒泡事件有问题 ，先这样兼容
      touchstart() {
        this.clearPropagation = false;
      },
      onTap() {
        if (this.clearPropagation) {
          this.clearPropagation = false;
          return;
        }
        this.$emit("maskClick");
        if (!this.mkclick)
          return;
        this.close();
      },
      /**
       * 顶部弹出样式处理
       */
      top(type) {
        this.popupstyle = this.isDesktop ? "fixforpc-top" : "top";
        this.ani = ["slide-top"];
        this.transClass = {
          position: "fixed",
          left: 0,
          right: 0,
          backgroundColor: this.bg
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
        this.$nextTick(() => {
          if (this.messageChild && this.type === "message") {
            this.messageChild.timerClose();
          }
        });
      },
      /**
       * 底部弹出样式处理
       */
      bottom(type) {
        this.popupstyle = "bottom";
        this.ani = ["slide-bottom"];
        this.transClass = {
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          paddingBottom: this.safeAreaInsets + "px",
          backgroundColor: this.bg
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      /**
       * 中间弹出样式处理
       */
      center(type) {
        this.popupstyle = "center";
        this.ani = ["zoom-out", "fade"];
        this.transClass = {
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          justifyContent: "center",
          alignItems: "center"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      left(type) {
        this.popupstyle = "left";
        this.ani = ["slide-left"];
        this.transClass = {
          position: "fixed",
          left: 0,
          bottom: 0,
          top: 0,
          backgroundColor: this.bg,
          display: "flex",
          flexDirection: "column"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      right(type) {
        this.popupstyle = "right";
        this.ani = ["slide-right"];
        this.transClass = {
          position: "fixed",
          bottom: 0,
          right: 0,
          top: 0,
          backgroundColor: this.bg,
          display: "flex",
          flexDirection: "column"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      }
    }
  };
  function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_transition = resolveEasycom(vue.resolveDynamicComponent("uni-transition"), __easycom_0$6);
    return $data.showPopup ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["uni-popup", [$data.popupstyle, $options.isDesktop ? "fixforpc-z-index" : ""]])
      },
      [
        vue.createElementVNode(
          "view",
          {
            onTouchstart: _cache[1] || (_cache[1] = (...args) => $options.touchstart && $options.touchstart(...args))
          },
          [
            $data.maskShow ? (vue.openBlock(), vue.createBlock(_component_uni_transition, {
              key: "1",
              name: "mask",
              "mode-class": "fade",
              styles: $data.maskClass,
              duration: $data.duration,
              show: $data.showTrans,
              onClick: $options.onTap
            }, null, 8, ["styles", "duration", "show", "onClick"])) : vue.createCommentVNode("v-if", true),
            vue.createVNode(_component_uni_transition, {
              key: "2",
              "mode-class": $data.ani,
              name: "content",
              styles: $data.transClass,
              duration: $data.duration,
              show: $data.showTrans,
              onClick: $options.onTap
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["uni-popup__wrapper", [$data.popupstyle]]),
                    style: vue.normalizeStyle({ backgroundColor: $options.bg }),
                    onClick: _cache[0] || (_cache[0] = (...args) => $options.clear && $options.clear(...args))
                  },
                  [
                    vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
                  ],
                  6
                  /* CLASS, STYLE */
                )
              ]),
              _: 3
              /* FORWARDED */
            }, 8, ["mode-class", "styles", "duration", "show", "onClick"])
          ],
          32
          /* HYDRATE_EVENTS */
        )
      ],
      2
      /* CLASS */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_0$5 = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["render", _sfc_render$o], ["__scopeId", "data-v-4dd3c44b"], ["__file", "D:/ruangong/emosphere/uni_modules/uni-popup/components/uni-popup/uni-popup.vue"]]);
  const _sfc_main$B = {
    name: "calendar",
    data() {
      return {
        popupContents: [],
        click_day: {},
        unfold: true,
        week: [
          {
            label: "日",
            value: 7
          },
          {
            label: "一",
            value: 1
          },
          {
            label: "二",
            value: 2
          },
          {
            label: "三",
            value: 3
          },
          {
            label: "四",
            value: 4
          },
          {
            label: "五",
            value: 5
          },
          {
            label: "六",
            value: 6
          }
        ],
        blankDay: 0,
        //空白天数
        today: {},
        //当天
        current: {},
        //当前的年月
        daysArr: [],
        list: [],
        //需要下标的日期
        currentYearMonth: {}
        //当前年月
      };
    },
    computed: {
      contentHeight() {
        let height = Math.ceil((this.blankDay + this.daysArr.length) / 7) * 88;
        return height + "rpx";
      }
    },
    props: {
      pointList: {
        type: Array,
        default() {
          return [];
        }
      },
      defaultDate: {
        type: String,
        default() {
          return "";
        }
      },
      showBtn: {
        type: Boolean,
        default() {
          return true;
        }
      },
      show: {
        type: Boolean,
        default() {
          return true;
        }
      },
      background: {
        type: String,
        default() {
          return "rgb(255, 255, 255,0.6)";
        }
      },
      weekColor: {
        type: String,
        default() {
          return "#000";
        }
      },
      dayColor: {
        type: String,
        default() {
          return "#000";
        }
      },
      selectBg: {
        type: String,
        default() {
          return "#488C88";
        }
      },
      pointColor: {
        type: String,
        default() {
          return "#000";
        }
      },
      backColor: {
        type: String,
        default() {
          return "#000";
        }
      },
      backBg: {
        type: String,
        default() {
          return "rgba(255, 255, 255, 0.19)";
        }
      },
      actionColor: {
        type: String,
        default() {
          return "#000";
        }
      },
      unfoldBtnColor: {
        type: String,
        default() {
          return "#000";
        }
      }
    },
    created() {
      this.unfold = this.show;
      this.list = this.pointList;
      this.fomatePointTime();
      this.init(this.defaultDate == "");
    },
    methods: {
      changMonth(num) {
        const {
          year,
          month
        } = this.getMonthYear(num);
        this.makeCalendar(year, month);
      },
      // 获取前几个月,未来几个月的年份和月份
      getMonthYear(num) {
        let month = this.currentYearMonth.month;
        let year = this.currentYearMonth.year;
        let year2 = year;
        let month2 = month + num;
        if (month + num <= 0) {
          year2 = year - 1 - parseInt(Math.abs(month2) / 12);
          month2 = 12 - Math.abs(month2) % 12;
        } else if (month2 / 12 > 1) {
          year2 = year + (month2 % 12 == 0 ? 0 : parseInt(month2 / 12));
          month2 = parseInt(month2 % 12) == 0 ? 12 : parseInt(month2 % 12);
        }
        return {
          year: year2,
          month: month2
        };
      },
      changeDay(item) {
        this.current = item;
        let { year, month, day } = item;
        this.$emit("changeDate", { year, month, day });
        this.click_day = `${year}-${month}-${day}`;
        this.$refs.popup.open(item);
        uni.request({
          url: "http://8.136.81.197:8080/mood_record/day",
          method: "GET",
          data: {
            uid: store.state.userId,
            date: `${year}-${month}-${day}`
          },
          success: (response) => {
            formatAppLog("log", "at uni_modules/tmt-calendar/components/tmt-calendar/tmt-calendar.vue:243", response.data);
            if (response.data["record"]) {
              const newData = {
                mood: response.data["record"].mood,
                title: response.data["record"].title,
                content: response.data["record"].content
              };
              this.$set(this.popupContents, 0, newData);
            } else {
              const defaultData = {
                mood: "question",
                title: "???",
                content: "?"
              };
              this.$set(this.popupContents, 0, defaultData);
            }
          },
          fail: (error) => {
            formatAppLog("error", "at uni_modules/tmt-calendar/components/tmt-calendar/tmt-calendar.vue:267", error);
          }
        });
      },
      // 获取某年某月的天数
      getDays(year, month) {
        let now = new Date(year, month, 0);
        return now.getDate();
      },
      //获取某一天为星期几
      getWeekByDay(time) {
        let day = new Date(Date.parse(time.replace(/-/g, "/")));
        return day.getDay() == 0 ? 7 : day.getDay();
      },
      init(nowTime) {
        let setTime = nowTime ? /* @__PURE__ */ new Date() : new Date(this.defaultDate);
        let year = setTime.getFullYear();
        let month = setTime.getMonth() + 1;
        let day = setTime.getDate();
        if (!(this.defaultDate != "" && nowTime)) {
          this.current = {
            year,
            month,
            day
          };
        }
        this.today = {
          year: (/* @__PURE__ */ new Date()).getFullYear(),
          month: (/* @__PURE__ */ new Date()).getMonth() + 1,
          day: (/* @__PURE__ */ new Date()).getDate()
        };
        this.makeCalendar(year, month);
      },
      fomatePointTime() {
        let pointList = this.list;
        pointList = pointList.map((item) => {
          item = item.replace(/-/g, "/");
          let timeArr = item.split("/");
          let timeStr = "";
          timeArr.map((time) => {
            time = parseInt(time);
            timeStr += time;
            return time;
          });
          return timeStr;
        });
        this.list = pointList;
      },
      makeCalendar(year, month) {
        let today = this.today;
        let days = this.getDays(year, month);
        formatAppLog("log", "at uni_modules/tmt-calendar/components/tmt-calendar/tmt-calendar.vue:319", days);
        let firstDayWeek = this.getWeekByDay(`${year}-${month}-1`);
        let weekIndex = this.week.findIndex((item) => {
          return item.value == firstDayWeek;
        });
        let daysArr = [];
        for (let i2 = 1; i2 <= days; i2++) {
          let point = this.list.findIndex((item) => {
            return item == String(year) + String(month) + String(i2);
          }) != -1;
          daysArr.push({
            year,
            month,
            day: i2,
            point,
            today: year == today.year && month == today.month && i2 == today.day
          });
        }
        this.currentYearMonth = {
          year,
          month
        };
        this.daysArr = daysArr;
        this.blankDay = weekIndex == -1 ? 0 : weekIndex;
      }
    }
  };
  function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_0$5);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "container",
        style: vue.normalizeStyle({ background: $props.background })
      },
      [
        vue.createElementVNode("view", { class: "tmt-header" }, [
          vue.createElementVNode(
            "view",
            {
              class: "select-wrap",
              style: vue.normalizeStyle({ color: $props.actionColor })
            },
            [
              vue.createElementVNode("view", {
                class: "p20",
                onClick: _cache[0] || (_cache[0] = ($event) => $options.changMonth(-1))
              }, [
                vue.createElementVNode(
                  "view",
                  {
                    class: "arrow-left",
                    style: vue.normalizeStyle([{ "border-left-color": $props.actionColor }, { "border-bottom-color": $props.actionColor }])
                  },
                  null,
                  4
                  /* STYLE */
                )
              ]),
              vue.createElementVNode(
                "view",
                { class: "time" },
                vue.toDisplayString(`${$data.currentYearMonth.year}年${$data.currentYearMonth.month >= 10 ? $data.currentYearMonth.month : "0" + $data.currentYearMonth.month}月`),
                1
                /* TEXT */
              ),
              vue.createElementVNode("view", {
                class: "p20",
                onClick: _cache[1] || (_cache[1] = ($event) => $options.changMonth(1))
              }, [
                vue.createElementVNode(
                  "view",
                  {
                    class: "arrow-right",
                    style: vue.normalizeStyle([{ "border-left-color": $props.actionColor }, { "border-right-color": $props.actionColor }])
                  },
                  null,
                  4
                  /* STYLE */
                )
              ])
            ],
            4
            /* STYLE */
          ),
          vue.createElementVNode(
            "view",
            {
              class: "back",
              style: vue.normalizeStyle([{ color: $props.backColor }, { background: $props.backBg }]),
              onClick: _cache[2] || (_cache[2] = ($event) => $options.init(true))
            },
            " 返回本月 ",
            4
            /* STYLE */
          )
        ]),
        vue.createElementVNode("view", { class: "tmt-content" }, [
          vue.createElementVNode("view", { class: "tmt-week-wrap" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($data.week, (item, index) => {
                return vue.openBlock(), vue.createElementBlock(
                  "view",
                  {
                    class: "cell week-item",
                    style: vue.normalizeStyle({ color: $props.weekColor }),
                    key: index
                  },
                  vue.toDisplayString(item.label),
                  5
                  /* TEXT, STYLE */
                );
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]),
          vue.createElementVNode(
            "view",
            {
              class: "tmt-day-wrap",
              style: vue.normalizeStyle([{ height: $data.unfold ? $options.contentHeight : "88rpx" }, { color: $props.dayColor }])
            },
            [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($data.blankDay, (index) => {
                  return vue.openBlock(), vue.createElementBlock("view", { class: "cell" });
                }),
                256
                /* UNKEYED_FRAGMENT */
              )),
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($data.daysArr, (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "cell",
                    onClick: ($event) => $options.changeDay(item)
                  }, [
                    vue.createElementVNode(
                      "view",
                      {
                        class: "dayText",
                        style: vue.normalizeStyle($data.current.year == item.year && $data.current.month == item.month && $data.current.day == item.day ? "background:" + $props.selectBg : "")
                      },
                      [
                        vue.createTextVNode(
                          vue.toDisplayString(item.today ? "今" : item.day) + " ",
                          1
                          /* TEXT */
                        ),
                        item.point ? (vue.openBlock(), vue.createElementBlock(
                          "view",
                          {
                            key: 0,
                            class: "point",
                            style: vue.normalizeStyle({ background: $props.pointColor })
                          },
                          null,
                          4
                          /* STYLE */
                        )) : vue.createCommentVNode("v-if", true)
                      ],
                      4
                      /* STYLE */
                    )
                  ], 8, ["onClick"]);
                }),
                256
                /* UNKEYED_FRAGMENT */
              ))
            ],
            4
            /* STYLE */
          )
        ]),
        $props.showBtn ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "tmt-footer",
          onClick: _cache[3] || (_cache[3] = ($event) => $data.unfold = !$data.unfold)
        }, [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["arrow-down", { on: $data.unfold }]),
              style: vue.normalizeStyle([{ "border-left-color": $props.unfoldBtnColor }, { "border-bottom-color": $props.unfoldBtnColor }])
            },
            null,
            6
            /* CLASS, STYLE */
          )
        ])) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", null, [
          vue.createCommentVNode(" 普通弹窗 "),
          vue.createVNode(_component_uni_popup, {
            ref: "popup",
            "background-color": "#fff",
            onChange: _ctx.change
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(["popup-content", { "popup-height": _ctx.type === "left" || _ctx.type === "right" }])
                },
                [
                  $data.popupContents ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList($data.popupContents, (popupContent, index) => {
                        return vue.openBlock(), vue.createElementBlock(
                          vue.Fragment,
                          { key: index },
                          [
                            vue.createElementVNode("view", { class: "left" }, [
                              vue.createElementVNode(
                                "text",
                                { class: "time" },
                                vue.toDisplayString($data.click_day),
                                1
                                /* TEXT */
                              ),
                              vue.createElementVNode("image", {
                                src: "/static/images/qingxu-" + popupContent.mood + ".png",
                                alt: "",
                                class: "photosize"
                              }, null, 8, ["src"])
                            ]),
                            vue.createElementVNode("view", { class: "right" }, [
                              vue.createElementVNode(
                                "text",
                                { class: "title" },
                                vue.toDisplayString(popupContent.title),
                                1
                                /* TEXT */
                              ),
                              vue.createElementVNode(
                                "text",
                                { class: "content" },
                                vue.toDisplayString(popupContent.content),
                                1
                                /* TEXT */
                              )
                            ])
                          ],
                          64
                          /* STABLE_FRAGMENT */
                        );
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ])) : vue.createCommentVNode("v-if", true)
                ],
                2
                /* CLASS */
              )
            ]),
            _: 1
            /* STABLE */
          }, 8, ["onChange"])
        ])
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_0$4 = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["render", _sfc_render$n], ["__scopeId", "data-v-d4fda4eb"], ["__file", "D:/ruangong/emosphere/uni_modules/tmt-calendar/components/tmt-calendar/tmt-calendar.vue"]]);
  const _sfc_main$A = {
    __name: "calendar",
    setup(__props) {
      let router2 = j();
      const records = vue.ref([]);
      store.getters.getEmotionIcons;
      const formatDate = (dateString) => {
        const originalDate = new Date(dateString);
        const month = originalDate.getMonth() + 1;
        const day = originalDate.getDate();
        return `${month}月${day}日`;
      };
      const fan = () => {
        router2.replace("/pages/main/main");
      };
      const getemo = () => {
        uni.request({
          url: "http://8.136.81.197:8080/mood_record",
          data: {
            uid: store.state.userId,
            nums: 3
          },
          success: (response) => {
            formatAppLog("log", "at pages/calendar/calendar.vue:62", response.data);
            records.value = response.data["records"];
          },
          fail: (error) => {
            formatAppLog("error", "at pages/calendar/calendar.vue:66", error);
          }
        });
      };
      const test = () => {
        let date = (/* @__PURE__ */ new Date()).toISOString().substr(0, 10);
        formatAppLog("log", "at pages/calendar/calendar.vue:72", store.state.userId + date);
        const data = {
          message: "666"
        };
        uni.request({
          url: "http://8.136.81.197:8080/mood_record/day",
          method: "GET",
          data: {
            uid: store.state.userId,
            date
          },
          success: (res) => {
            formatAppLog("log", "at pages/calendar/calendar.vue:85", res.data);
            let today_record = res.data["record"];
            formatAppLog("log", "at pages/calendar/calendar.vue:87", today_record.content);
            uni.request({
              url: "http://localhost:8080/class/",
              method: "POST",
              data,
              success: (r2) => {
                formatAppLog("log", "at pages/calendar/calendar.vue:94", r2.data);
              }
            });
          },
          fail: (error) => {
            uni.showToast({
              title: "获取失败"
            });
          }
        });
      };
      vue.onMounted(() => {
        getemo();
      });
      return (_ctx, _cache) => {
        const _component_tmt_calendar = resolveEasycom(vue.resolveDynamicComponent("tmt-calendar"), __easycom_0$4);
        return vue.openBlock(), vue.createElementBlock("view", { class: "backarea" }, [
          vue.createElementVNode("view", {
            class: "box",
            style: { "width": "100%", "height": "5%" }
          }),
          vue.createElementVNode("view", { class: "header" }, [
            vue.createElementVNode("view", {
              class: "head-left",
              onClick: fan
            }, [
              vue.createElementVNode("image", { src: "/static/images/fanhui.png" }),
              vue.createElementVNode("text", null, "返回")
            ]),
            vue.createElementVNode("view", {
              class: "head-right",
              onClick: test
            }, [
              vue.createElementVNode("button", { class: "btn" }, "生成报告")
            ])
          ]),
          vue.createVNode(_component_tmt_calendar, {
            show: true,
            onChangeDate: _ctx.changeDate
          }, null, 8, ["onChangeDate"]),
          vue.createElementVNode("view", { class: "calendar-content" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(records.value, (record, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: index,
                  class: "v"
                }, [
                  vue.createElementVNode("view", { class: "left" }, [
                    vue.createElementVNode(
                      "text",
                      { class: "time" },
                      vue.toDisplayString(formatDate(record.createDate)),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode("image", {
                      src: "/static/images/qingxu-" + record.mood + ".png",
                      alt: ""
                    }, null, 8, ["src"])
                  ]),
                  vue.createElementVNode("view", { class: "right" }, [
                    vue.createElementVNode(
                      "text",
                      { class: "title" },
                      vue.toDisplayString(record.title),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "text",
                      { class: "content" },
                      vue.toDisplayString(record.content),
                      1
                      /* TEXT */
                    )
                  ])
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ]);
      };
    }
  };
  const PagesCalendarCalendar = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["__file", "D:/ruangong/emosphere/pages/calendar/calendar.vue"]]);
  const _sfc_main$z = {
    __name: "main",
    setup(__props) {
      let router2 = j();
      const navigateTo = (route) => {
        const routesMap = {
          space: "/pages/space/space",
          calendar: "/pages/calendar/calendar",
          chat: "/pages/chat/chat",
          music: "/pages/music/music",
          myScreen: "/pages/myScreen/myScreen",
          torecord: "/pages/EmoRecord/EmoRecord"
        };
        if (routesMap[route]) {
          router2.replace(routesMap[route]);
        }
      };
      const pictures = [
        {
          id: "1",
          url: "/static/images/1.jpg"
        },
        {
          id: "2",
          url: "/static/images/2.jpg"
        },
        {
          id: "3",
          url: "/static/images/3.jpg"
        }
      ];
      const onPreviewImage = (url) => {
        formatAppLog("log", "at pages/main/main.vue:78", url);
        uni.previewImage({
          urls: pictures.map((v2) => v2.url),
          current: url
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "backarea" }, [
          vue.createElementVNode("view", {
            class: "box",
            style: { "width": "100%", "height": "5%" }
          }),
          vue.createElementVNode("view", {
            onClick: _cache[0] || (_cache[0] = ($event) => navigateTo("myScreen"))
          }, [
            vue.createElementVNode("image", {
              src: "/static/images/geren.png",
              style: { "position": "relative", "top": "1rem", "left": "-9rem", "width": "50px", "height": "50px" }
            })
          ]),
          vue.createElementVNode("swiper", {
            class: "banner",
            "indicator-dots": true,
            autoplay: true,
            interval: 3e3,
            duration: 1e3,
            alt: "z12"
          }, [
            (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(pictures, (item) => {
                return vue.createElementVNode("swiper-item", {
                  key: item.id
                }, [
                  vue.createElementVNode("image", {
                    onClick: ($event) => onPreviewImage(item.url),
                    src: item.url,
                    class: "banner-image"
                  }, null, 8, ["onClick", "src"]),
                  vue.createElementVNode("view", { class: "swiper-item" })
                ]);
              }),
              64
              /* STABLE_FRAGMENT */
            ))
          ]),
          vue.createElementVNode("view", { class: "to" }, [
            vue.createElementVNode("view", {
              onClick: _cache[1] || (_cache[1] = ($event) => navigateTo("space"))
            }, [
              vue.createElementVNode("div", { class: "circle" }, [
                vue.createElementVNode("image", { src: "/static/images/z3.png" })
              ])
            ]),
            vue.createElementVNode("view", {
              onClick: _cache[2] || (_cache[2] = ($event) => navigateTo("calendar"))
            }, [
              vue.createElementVNode("div", { class: "circle" }, [
                vue.createElementVNode("image", { src: "/static/images/z4.png" })
              ])
            ]),
            vue.createElementVNode("view", {
              onClick: _cache[3] || (_cache[3] = ($event) => navigateTo("chat"))
            }, [
              vue.createElementVNode("div", { class: "circle" }, [
                vue.createElementVNode("image", { src: "/static/images/z5.png" })
              ])
            ]),
            vue.createElementVNode("view", {
              onClick: _cache[4] || (_cache[4] = ($event) => navigateTo("music"))
            }, [
              vue.createElementVNode("div", { class: "circle" }, [
                vue.createElementVNode("image", { src: "/static/images/z6.png" })
              ])
            ])
          ]),
          vue.createElementVNode("div", {
            onClick: _cache[5] || (_cache[5] = ($event) => navigateTo("torecord")),
            class: "bottom"
          }, [
            vue.createElementVNode("image", {
              src: "/static/images/z10.png",
              style: { "width": "50px", "height": "50px", "margin-right": "2rem" }
            })
          ])
        ]);
      };
    }
  };
  const PagesMainMain = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["__file", "D:/ruangong/emosphere/pages/main/main.vue"]]);
  const _sfc_main$y = {
    __name: "EmoRecord",
    setup(__props) {
      let router2 = j();
      const emotionIcons = store.getters.getEmotionIcons;
      let Icon = null;
      const getback = () => {
        router2.replace("/pages/main/main");
      };
      const selectIcon = (iconName) => {
        Icon = Icon === iconName ? null : iconName;
        formatAppLog("log", "at pages/EmoRecord/EmoRecord.vue:103", "选中的图标：", Icon);
      };
      const isSelected = (iconName) => {
        return Icon === iconName;
      };
      const userid = store.getters.getUserId;
      let Title = "";
      let Content = "";
      const savadata = () => {
        const data = {
          uid: userid,
          mood: Icon,
          title: Title,
          content: Content
        };
        formatAppLog("log", "at pages/EmoRecord/EmoRecord.vue:120", data);
        uni.request({
          url: "http://8.136.81.197:8080/mood_record",
          method: "POST",
          data,
          success: (response) => {
            formatAppLog("log", "at pages/EmoRecord/EmoRecord.vue:126", response.data);
            if (response.statusCode === 200) {
              if (String(response.data["success"]) === "false") {
                uni.showToast({
                  title: "今日已记录，不要重复记录",
                  icon: "none"
                });
              } else {
                router2.replace("/pages/calendar/calendar");
              }
            } else {
              formatAppLog("error", "at pages/EmoRecord/EmoRecord.vue:140", "请求失败，状态码：", response.statusCode);
              uni.showToast({
                title: "请求失败，请稍后再试",
                icon: "none"
              });
            }
          },
          fail: (error) => {
            formatAppLog("error", "at pages/EmoRecord/EmoRecord.vue:148", "请求失败", error);
            uni.showToast({
              title: "请求失败，请稍后再试",
              icon: "none"
            });
          }
        });
      };
      const imageList = vue.ref([]);
      const upload = () => {
        uni.chooseImage({
          count: 3,
          sizeType: ["original", "compressed"],
          sourceType: ["album"],
          loop: true,
          success: (res) => {
            formatAppLog("log", "at pages/EmoRecord/EmoRecord.vue:165", res);
            if (res.tempFilePaths.length !== 0) {
              imageList.value.push(res.tempFilePaths[0]);
              res.tempFilePaths;
            }
          }
        });
      };
      const del = (index) => {
        imageList.value.splice(index, 1);
        formatAppLog("log", "at pages/EmoRecord/EmoRecord.vue:177", imageList);
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "backarea" }, [
          vue.createElementVNode("view", {
            class: "box",
            style: { "width": "100%", "height": "5%" }
          }),
          vue.createElementVNode("view", { class: "header" }, [
            vue.createElementVNode("view", {
              class: "left",
              onClick: getback
            }, [
              vue.createElementVNode("image", { src: "/static/images/fanhui.png" }),
              vue.createElementVNode("text", null, "返回")
            ]),
            vue.createElementVNode("view", {
              class: "right",
              onClick: savadata
            }, [
              vue.createElementVNode("image", { src: "/static/images/gou.png" }),
              vue.createElementVNode("text", null, "保存")
            ])
          ]),
          vue.createElementVNode("view", { class: "emo" }, [
            vue.createElementVNode("text", null, "今日情绪记录"),
            vue.createElementVNode("div", { class: "icon-list" }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(vue.unref(emotionIcons), (iconName, index) => {
                  return vue.openBlock(), vue.createElementBlock("li", {
                    key: index,
                    onClick: ($event) => selectIcon(iconName)
                  }, [
                    vue.createElementVNode("image", {
                      src: `/static/images/qingxu-${iconName}.png`,
                      class: vue.normalizeClass({ "selected": isSelected(iconName) })
                    }, null, 10, ["src"])
                  ], 8, ["onClick"]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])
          ]),
          vue.createElementVNode("view", { class: "things" }, [
            vue.createElementVNode("text", null, "今日事件记录"),
            vue.createElementVNode("div", { class: "thing-list" }, [
              vue.createElementVNode("li", null, [
                vue.createElementVNode("div", { class: "circle" }, [
                  vue.createElementVNode("image", { src: "/static/images/jiahao.png" })
                ]),
                vue.createElementVNode("span", null, "添加")
              ]),
              vue.createElementVNode("li", null, [
                vue.createElementVNode("div", { class: "circle" }, [
                  vue.createElementVNode("image", { src: "/static/images/lvhang.png" })
                ]),
                vue.createElementVNode("span", null, "旅行")
              ]),
              vue.createElementVNode("li", null, [
                vue.createElementVNode("div", { class: "circle" }, [
                  vue.createElementVNode("image", { src: "/static/images/bangqiu.png" })
                ]),
                vue.createElementVNode("span", null, "运动")
              ]),
              vue.createElementVNode("li", null, [
                vue.createElementVNode("div", { class: "circle" }, [
                  vue.createElementVNode("image", { src: "/static/images/meishi1.png" })
                ]),
                vue.createElementVNode("span", null, "美食")
              ]),
              vue.createElementVNode("li", null, [
                vue.createElementVNode("div", { class: "circle" }, [
                  vue.createElementVNode("image", { src: "/static/images/shuijue.png" })
                ]),
                vue.createElementVNode("span", null, "睡觉")
              ]),
              vue.createElementVNode("li", null, [
                vue.createElementVNode("div", { class: "circle" }, [
                  vue.createElementVNode("image", { src: "/static/images/xingquaihao1.png" })
                ]),
                vue.createElementVNode("span", null, "爱好")
              ]),
              vue.createElementVNode("li", null, [
                vue.createElementVNode("div", { class: "circle" }, [
                  vue.createElementVNode("image", { src: "/static/images/xinsui.png" })
                ]),
                vue.createElementVNode("span", null, "失恋")
              ]),
              vue.createElementVNode("li", null, [
                vue.createElementVNode("div", { class: "circle" }, [
                  vue.createElementVNode("image", { src: "/static/images/xuexi.png" })
                ]),
                vue.createElementVNode("span", null, "学习")
              ]),
              vue.createElementVNode("li", null, [
                vue.createElementVNode("div", { class: "circle" }, [
                  vue.createElementVNode("image", { src: "/static/images/jinianri3.png" })
                ]),
                vue.createElementVNode("span", null, "纪念日")
              ]),
              vue.createElementVNode("li", null, [
                vue.createElementVNode("div", { class: "circle" }, [
                  vue.createElementVNode("image", { src: "/static/images/yueduliang.png" })
                ]),
                vue.createElementVNode("span", null, "阅读")
              ])
            ])
          ]),
          vue.createElementVNode("view", { class: "text-area" }, [
            vue.createElementVNode("view", { class: "title" }, [
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  type: "text",
                  placeholder: "今天心情怎么样",
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.isRef(Title) ? Title.value = $event : Title = $event)
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vModelText, vue.unref(Title)]
              ])
            ]),
            vue.createElementVNode("view", { class: "content" }, [
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  type: "text",
                  placeholder: "请具体描述",
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => vue.isRef(Content) ? Content.value = $event : Content = $event)
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vModelText, vue.unref(Content)]
              ])
            ]),
            vue.createElementVNode("view", { class: "shangchuan" }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(imageList.value, (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "sc2",
                    key: index
                  }, [
                    vue.createElementVNode("image", {
                      class: "del",
                      onClick: ($event) => del(index),
                      src: "/static/images/shanchu.png",
                      mode: ""
                    }, null, 8, ["onClick"]),
                    vue.createElementVNode("image", {
                      class: "image3",
                      src: item,
                      mode: ""
                    }, null, 8, ["src"])
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              )),
              imageList.value.length < 1 ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "sc2",
                onClick: upload
              }, [
                vue.createElementVNode("image", {
                  class: "sc3",
                  src: "/static/images/jiahao.png",
                  mode: ""
                })
              ])) : vue.createCommentVNode("v-if", true)
            ])
          ])
        ]);
      };
    }
  };
  const PagesEmoRecordEmoRecord = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["__file", "D:/ruangong/emosphere/pages/EmoRecord/EmoRecord.vue"]]);
  const _sfc_main$x = {
    data() {
      let router2 = j();
      const fan = () => {
        router2.replace("/pages/myScreen/myScreen");
      };
      return {
        fan,
        showPopup: false,
        showFeedback: false,
        description: "Emosphere: 一款致力于帮助人们放松，舒缓心情的软件，有AI聊天，社区，星期日历，放松等模块，多方面帮助心理压抑的人群去放松。",
        feedbackText: "",
        popupWidth: "80%",
        popupHeight: "25%",
        feedbackWidth: "80%",
        feedbackHeight: "35%"
      };
    },
    methods: {
      submitFeedback() {
        formatAppLog("log", "at pages/about/about.vue:67", "提交问题反馈:", this.feedbackText);
        this.showFeedback = false;
      }
    }
  };
  function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "about" }, [
      vue.createElementVNode("view", {
        class: "box",
        style: { "width": "100%", "height": "5%" }
      }),
      vue.createElementVNode("view", {
        class: "header",
        onClick: _cache[0] || (_cache[0] = (...args) => $data.fan && $data.fan(...args))
      }, [
        vue.createElementVNode("image", { src: "/static/images/fan.png" }),
        vue.createElementVNode("span", null, "关于EmoSphere")
      ]),
      vue.createElementVNode("image", {
        class: "logo",
        src: "/static/images/logo.png"
      }),
      vue.createElementVNode("view", { class: "version" }, [
        vue.createElementVNode("text", null, "Version 1.0.0")
      ]),
      vue.createElementVNode("view", { class: "help" }, [
        vue.createElementVNode("view", {
          onClick: _cache[1] || (_cache[1] = ($event) => $data.showFeedback = true)
        }, [
          vue.createElementVNode("span", null, "问题反馈"),
          vue.createElementVNode("image", {
            src: "/static/images/zhankai.png",
            alt: ""
          })
        ]),
        vue.createElementVNode("view", {
          onClick: _cache[2] || (_cache[2] = ($event) => $data.showPopup = true)
        }, [
          vue.createElementVNode("span", null, "功能介绍"),
          vue.createElementVNode("image", {
            src: "/static/images/zhankai.png",
            alt: ""
          })
        ])
      ]),
      $data.showPopup ? (vue.openBlock(), vue.createElementBlock(
        "div",
        {
          key: 0,
          class: "popup",
          style: vue.normalizeStyle({ width: $data.popupWidth, height: $data.popupHeight })
        },
        [
          vue.createElementVNode(
            "p",
            null,
            vue.toDisplayString($data.description),
            1
            /* TEXT */
          ),
          vue.createElementVNode("button", {
            onClick: _cache[3] || (_cache[3] = ($event) => $data.showPopup = false)
          }, "关闭")
        ],
        4
        /* STYLE */
      )) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 点击图片24后的问题反馈 "),
      $data.showFeedback ? (vue.openBlock(), vue.createElementBlock(
        "div",
        {
          key: 1,
          class: "feedback",
          style: vue.normalizeStyle({ width: $data.feedbackWidth, height: $data.feedbackHeight })
        },
        [
          vue.withDirectives(vue.createElementVNode(
            "textarea",
            {
              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $data.feedbackText = $event),
              placeholder: "请输入你的问题"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $data.feedbackText]
          ]),
          vue.createElementVNode("button", {
            class: "cancel",
            onClick: _cache[5] || (_cache[5] = ($event) => $data.showFeedback = false)
          }, "取消"),
          vue.createElementVNode("button", {
            onClick: _cache[6] || (_cache[6] = (...args) => $options.submitFeedback && $options.submitFeedback(...args))
          }, "确定")
        ],
        4
        /* STYLE */
      )) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesAboutAbout = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["render", _sfc_render$m], ["__scopeId", "data-v-13a78ac6"], ["__file", "D:/ruangong/emosphere/pages/about/about.vue"]]);
  const _sfc_main$w = {
    __name: "aboutme",
    setup(__props) {
      let router2 = j();
      let username = vue.ref("");
      let userbirthday = vue.ref("");
      let usergender = vue.ref("");
      let userstatus = vue.ref("");
      let userAvatar = vue.ref("");
      vue.onMounted(() => {
        username.value = store.state.username;
        userbirthday.value = store.state.userbirthday;
        usergender.value = store.state.usergender;
        userstatus.value = store.state.userstatus;
        userAvatar.value = store.state.ImagePath;
      });
      const edit = () => {
        router2.replace("/pages/set/set");
      };
      const fan = () => {
        router2.replace("/pages/myScreen/myScreen");
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "my-page" }, [
          vue.createElementVNode("view", {
            class: "box",
            style: { "width": "100%", "height": "5%" }
          }),
          vue.createElementVNode("view", {
            class: "header",
            onClick: fan
          }, [
            vue.createElementVNode("image", { src: "/static/images/fan.png" }),
            vue.createElementVNode("span", null, "个人资料")
          ]),
          vue.createElementVNode("text", {
            class: "edit",
            onClick: edit
          }, "编辑资料"),
          vue.createElementVNode("view", { class: "content" }, [
            vue.createElementVNode("view", { class: "menu-item1" }, [
              vue.createCommentVNode(' <image class="user-avatar" src="/static/uni.png" /> '),
              vue.createElementVNode("image", {
                class: "user-avatar",
                src: vue.unref(userAvatar)
              }, null, 8, ["src"]),
              vue.createElementVNode("text", { class: "user-avatar-text" }, "头像")
            ]),
            vue.createElementVNode("view", { class: "menu-item" }, [
              vue.createElementVNode("text", { class: "menu-text" }, "用户昵称"),
              vue.createElementVNode(
                "text",
                { class: "menu-text1" },
                vue.toDisplayString(vue.unref(username)),
                1
                /* TEXT */
              ),
              vue.createElementVNode("image", {
                src: "/static/images/yuanjiantou.png",
                alt: ""
              })
            ]),
            vue.createElementVNode("view", { class: "menu-item" }, [
              vue.createElementVNode("text", { class: "menu-text" }, "性别"),
              vue.createElementVNode(
                "text",
                { class: "menu-text1" },
                vue.toDisplayString(vue.unref(usergender)),
                1
                /* TEXT */
              ),
              vue.createElementVNode("image", {
                src: "/static/images/yuanjiantou.png",
                alt: ""
              })
            ]),
            vue.createCommentVNode(" 个人资料 "),
            vue.createElementVNode("view", {
              class: "menu-item",
              onClick: _cache[0] || (_cache[0] = (...args) => _ctx.goToProfile && _ctx.goToProfile(...args))
            }, [
              vue.createElementVNode("text", { class: "menu-text" }, "常驻地"),
              vue.createElementVNode(
                "text",
                { class: "menu-text1" },
                vue.toDisplayString(vue.unref(userstatus)),
                1
                /* TEXT */
              ),
              vue.createElementVNode("image", {
                src: "/static/images/yuanjiantou.png",
                alt: ""
              })
            ]),
            vue.createCommentVNode(" 个人资料 "),
            vue.createElementVNode("view", {
              class: "menu-item",
              onClick: _cache[1] || (_cache[1] = (...args) => _ctx.goToProfile && _ctx.goToProfile(...args))
            }, [
              vue.createElementVNode("text", { class: "menu-text" }, "生日"),
              vue.createElementVNode(
                "text",
                { class: "menu-text1" },
                vue.toDisplayString(vue.unref(userbirthday)),
                1
                /* TEXT */
              ),
              vue.createElementVNode("image", {
                src: "/static/images/yuanjiantou.png",
                mode: ""
              })
            ]),
            vue.createCommentVNode(" 个人资料 "),
            vue.createElementVNode("view", {
              class: "menu-item",
              onClick: _cache[2] || (_cache[2] = (...args) => _ctx.goToProfile && _ctx.goToProfile(...args))
            }, [
              vue.createElementVNode("text", { class: "menu-text" }, "二维码"),
              vue.createElementVNode("text", { class: "menu-text1 look" }, "点击查看"),
              vue.createElementVNode("image", {
                src: "/static/images/yuanjiantou.png",
                mode: ""
              })
            ])
          ])
        ]);
      };
    }
  };
  const PagesAboutmeAboutme = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["__file", "D:/ruangong/emosphere/pages/aboutme/aboutme.vue"]]);
  const _sfc_main$v = {
    props: {
      message: String
    },
    methods: {
      handleCancel() {
        this.$emit("onCancel");
      },
      handleConfirm() {
        this.$emit("onConfirm");
      }
    }
  };
  function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("div", { class: "confirm-dialog" }, [
      vue.createElementVNode(
        "div",
        { class: "message" },
        vue.toDisplayString($props.message),
        1
        /* TEXT */
      ),
      vue.createElementVNode("div", { class: "buttons" }, [
        vue.createElementVNode("button", {
          onClick: _cache[0] || (_cache[0] = (...args) => $options.handleCancel && $options.handleCancel(...args))
        }, "取消"),
        vue.createElementVNode("button", {
          onClick: _cache[1] || (_cache[1] = (...args) => $options.handleConfirm && $options.handleConfirm(...args))
        }, "确认")
      ])
    ]);
  }
  const ConfirmDialog = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["render", _sfc_render$l], ["__scopeId", "data-v-76a5aa76"], ["__file", "D:/ruangong/emosphere/components/ConfirmDialog/ConfirmDialog.vue"]]);
  const _sfc_main$u = {
    __name: "myScreen",
    setup(__props) {
      let router2 = j();
      const calculateAge = (birthdate) => {
        const today = /* @__PURE__ */ new Date();
        const birthDate = new Date(birthdate);
        let age2 = today.getFullYear() - birthDate.getFullYear();
        return age2;
      };
      let userbirthday = vue.ref("");
      let age = vue.ref("");
      let username = vue.ref("");
      let userid = vue.ref("");
      let userAvatar = vue.ref("");
      vue.onMounted(() => {
        userbirthday.value = store.getters.getUserBirthday;
        age.value = calculateAge(userbirthday.value);
        username.value = store.getters.getUsername;
        userid.value = store.getters.getUserId;
        userAvatar.value = store.state.ImagePath;
      });
      const isConfirmDialogVisible = vue.ref(false);
      const confirmMessage = vue.ref("确定要退出登录吗？");
      const goBack = () => {
        router2.replace("/pages/main/main");
      };
      const golike = () => {
        router2.replace("/pages/user/me");
      };
      const goToProfile = () => {
        router2.push("/pages/aboutme/aboutme");
      };
      const goToAbout = () => {
        router2.push("/pages/about/about");
      };
      const showConfirmDialog = () => {
        isConfirmDialogVisible.value = true;
      };
      const handleConfirm = () => {
        isConfirmDialogVisible.value = false;
        store.commit("clearUserData");
        router2.push("/pages/login/login");
      };
      const handleCancel = () => {
        isConfirmDialogVisible.value = false;
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "my-page" }, [
          vue.createElementVNode("view", {
            class: "box",
            style: { "width": "100%", "height": "5%" }
          }),
          vue.createElementVNode("view", { class: "header" }, [
            vue.createElementVNode("view", {
              class: "head-left",
              onClick: goBack
            }, [
              vue.createElementVNode("image", { src: "/static/images/fanhui.png" }),
              vue.createElementVNode("text", null, "返回")
            ])
          ]),
          vue.createElementVNode("view", { class: "form" }, [
            vue.createElementVNode("view", { class: "role" }, [
              vue.createElementVNode("image", {
                class: "user-avatar",
                src: vue.unref(userAvatar)
              }, null, 8, ["src"])
            ]),
            vue.createElementVNode("view", { class: "info" }, [
              vue.createElementVNode(
                "text",
                { class: "user-name" },
                vue.toDisplayString(vue.unref(username)),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "text",
                { class: "user-info" },
                vue.toDisplayString(vue.unref(age)),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "text",
                { class: "user-id" },
                "UserID:" + vue.toDisplayString(vue.unref(userid)),
                1
                /* TEXT */
              )
            ])
          ]),
          vue.createCommentVNode(" 个人资料 "),
          vue.createElementVNode("view", { class: "content" }, [
            vue.createElementVNode("view", {
              class: "menu-item",
              onClick: goToProfile
            }, [
              vue.createElementVNode("text", { class: "menu-text" }, "个人资料"),
              vue.createElementVNode("image", {
                src: "/static/images/heijiantou.png",
                alt: ""
              })
            ]),
            vue.createCommentVNode(" 收藏内容 "),
            vue.createElementVNode("view", {
              class: "menu-item",
              onClick: golike
            }, [
              vue.createElementVNode("text", { class: "menu-text" }, "收藏内容"),
              vue.createElementVNode("image", {
                src: "/static/images/heijiantou.png",
                alt: ""
              })
            ]),
            vue.createCommentVNode(" 关于 "),
            vue.createElementVNode("view", {
              class: "menu-item",
              onClick: goToAbout
            }, [
              vue.createElementVNode("text", { class: "menu-text" }, "关于EmoSphere"),
              vue.createElementVNode("image", {
                src: "/static/images/heijiantou.png",
                alt: ""
              })
            ])
          ]),
          vue.createElementVNode("view", { class: "logout-button" }, [
            vue.createElementVNode("button", { onClick: showConfirmDialog }, "退出登录")
          ]),
          isConfirmDialogVisible.value ? (vue.openBlock(), vue.createBlock(ConfirmDialog, {
            key: 0,
            message: confirmMessage.value,
            onOnConfirm: handleConfirm,
            onOnCancel: handleCancel
          }, null, 8, ["message"])) : vue.createCommentVNode("v-if", true)
        ]);
      };
    }
  };
  const PagesMyScreenMyScreen = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["__file", "D:/ruangong/emosphere/pages/myScreen/myScreen.vue"]]);
  const _sfc_main$t = {
    data() {
      let router2 = j();
      const tomain = () => {
        router2.replace("/pages/main/main");
      };
      const tohistory = () => {
        router2.replace("/pages/history/history");
      };
      const tomusic = () => {
        router2.replace("/pages/music/music");
      };
      return {
        tomain,
        tohistory,
        tomusic,
        currentPopup: "",
        completedCount: 0,
        completedPopup: "",
        countingDown: false,
        countdownMinutes: 0,
        countdownSeconds: 0,
        popupContent: {
          "f7": {
            title: "呼吸放松法",
            duration: 18e3,
            steps: [
              "缓慢深呼吸，通过鼻子吸气，使腹部膨胀，然后通过嘴巴慢慢呼气。",
              "集中注意力于呼吸的过程，注意每一次的吸气和呼气。",
              "逐渐放慢呼吸的节奏，确保每一次呼吸都是深而有意识的。",
              "想象每一次呼气都带走身体的紧张和焦虑，每一次吸气都带来宁静和放松。",
              "保持这种呼吸状态，直到感觉身体和心灵都变得更加轻松。"
            ]
          },
          "f8": {
            title: "渐进性放松法",
            duration: 36e3,
            steps: [
              "从脚趾开始，逐渐关注身体的每个部分。",
              "先拉紧此部分肌肉，保持5-7秒，然后再放松，想象并感受到每个部位的放松感。",
              "缓慢而有目的地移动到脚踝、小腿、大腿，一直到头部和颈部。",
              "在每个部位停留片刻，专注于释放那一部分的紧张感。",
              "如果有紧张感或疼痛，尝试在呼气时将其释放出去，整个过程可能需要10-15分钟。"
            ]
          },
          "f9": {
            title: "正念冥想",
            duration: 36e3,
            steps: [
              "坐在一个舒适的位置，闭上眼睛，开始深呼吸。",
              "将注意力集中在呼吸上，感觉空气进入和离开身体。",
              "注意身体的感觉、周围环境的声音。",
              "如果思绪飘动，轻轻地将注意力带回到呼吸上。",
              "逐渐扩展您的正念，包括身体感觉、情绪状态和思维过程。",
              "在过程中，保持对当下的关注，接受一切，不要评判。"
            ]
          },
          "f10": {
            title: "蝴蝶拥抱",
            duration: 18e3,
            steps: [
              "寻找一个安静、舒适的地方坐下。",
              "闭上眼睛，开始深呼吸，通过鼻子慢慢吸气，然后通过嘴巴缓慢呼气。",
              "想象自己化身为一只轻盈的蝴蝶，飞翔在宁静的花园中。",
              "感受蝴蝶轻盈的飞翔，每一次呼气都带走紧张和压力。",
              "在这个想象中，感受花香、微风，体验宁静和舒适，保持这种状态直到感觉完全放松和愉悦。"
            ]
          }
        }
      };
    },
    methods: {
      showPopup(popup, duration) {
        this.currentPopup = popup;
      },
      closePopup() {
        this.currentPopup = "";
        this.countingDown = false;
        this.resetCountdown();
      },
      startRelaxation(method) {
        formatAppLog("log", "at pages/relax/relax.vue:154", "开始放松方式:", method);
        this.currentPopup = method;
      },
      toggleRelaxation() {
        if (this.currentPopup && !this.countingDown) {
          this.startCountdown(this.popupContent[this.currentPopup].duration);
        } else if (this.countingDown) {
          this.completeRelaxation();
        }
      },
      completeRelaxation() {
        if (this.currentPopup) {
          const completedPopup = this.popupContent[this.currentPopup].title;
          const timeSpent = this.popupContent[this.currentPopup].duration - (this.countdownMinutes * 60 + this.countdownSeconds);
          formatAppLog("log", "at pages/relax/relax.vue:170", `完成放松方法 "${completedPopup}"，花费时间: ${Math.floor(timeSpent / 60)} 分钟 ${timeSpent % 60} 秒`);
          store.state.userId;
          let method = completedPopup;
          let date = (/* @__PURE__ */ new Date()).toISOString().substr(0, 10);
          const requestData = {
            uid: 5,
            type: method,
            duration: timeSpent,
            createDate: date
          };
          uni.request({
            url: "http://8.136.81.197:8080/relax_record",
            method: "POST",
            data: requestData,
            success: (response) => {
              formatAppLog("log", "at pages/relax/relax.vue:186", response.data);
            },
            fail: (error) => {
              formatAppLog("error", "at pages/relax/relax.vue:189", error);
            }
          });
          this.completedPopup = completedPopup;
          this.completedCount += 1;
          this.resetCountdown();
          setTimeout(() => {
            this.completedPopup = "";
            this.currentPopup = "";
            this.closePopup();
          });
        }
      },
      incrementCount(popup, duration) {
        this.currentPopup = popup;
      },
      startCountdown(duration) {
        clearInterval(this.countdownInterval);
        this.countingDown = true;
        const startTime = Date.now();
        const updateCountdown = () => {
          const elapsedTime = Date.now() - startTime;
          const remainingTime = Math.max(0, duration - Math.floor(elapsedTime / 1e3));
          this.countdownMinutes = Math.floor(remainingTime / 60);
          this.countdownSeconds = remainingTime % 60;
          if (remainingTime > 0)
            ;
          else {
            this.countingDown = false;
            this.resetCountdown();
            clearInterval(this.countdownInterval);
          }
        };
        updateCountdown();
        this.countdownInterval = setInterval(updateCountdown, 1e3);
      },
      resetCountdown() {
        this.countdownMinutes = 0;
        this.countdownSeconds = 0;
      }
    },
    beforeDestroy() {
      clearInterval(this.countdownInterval);
    }
  };
  function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createElementVNode("view", {
        class: "box",
        style: { "width": "100%", "height": "5%" }
      }),
      vue.createElementVNode("view", { class: "header" }, [
        vue.createElementVNode("image", {
          src: "/static/images/fanhui.png",
          onClick: _cache[0] || (_cache[0] = (...args) => $data.tomain && $data.tomain(...args))
        }),
        vue.createElementVNode("image", {
          src: "/static/images/yinyue.png",
          onClick: _cache[1] || (_cache[1] = (...args) => $data.tomusic && $data.tomusic(...args))
        }),
        vue.createElementVNode("view", { class: "choose" }, [
          vue.createElementVNode("image", { src: "/static/images/fenche.png" })
        ]),
        vue.createElementVNode("image", {
          src: "/static/images/recode.png",
          onClick: _cache[2] || (_cache[2] = (...args) => $data.tohistory && $data.tohistory(...args))
        })
      ]),
      vue.createElementVNode("view", { class: "back" }, [
        vue.createElementVNode("view", { class: "back2" }, [
          vue.createElementVNode("view", {
            class: "method",
            onClick: _cache[3] || (_cache[3] = ($event) => $options.startRelaxation("f7"))
          }, [
            vue.createElementVNode("view", { class: "box-left" }, [
              vue.createElementVNode("text", { class: "circle" }, "1")
            ]),
            vue.createElementVNode("view", { class: "box-right" }, "呼吸放松法")
          ]),
          vue.createElementVNode("view", {
            class: "method",
            onClick: _cache[4] || (_cache[4] = ($event) => $options.startRelaxation("f8"))
          }, [
            vue.createElementVNode("view", { class: "box-left" }, [
              vue.createElementVNode("text", { class: "circle" }, "2")
            ]),
            vue.createElementVNode("view", { class: "box-right" }, "渐进性放松法")
          ]),
          vue.createElementVNode("view", {
            class: "method",
            onClick: _cache[5] || (_cache[5] = ($event) => $options.startRelaxation("f9"))
          }, [
            vue.createElementVNode("view", { class: "box-left" }, [
              vue.createElementVNode("text", { class: "circle" }, "3")
            ]),
            vue.createElementVNode("view", { class: "box-right" }, "正念冥想")
          ]),
          vue.createElementVNode("view", {
            class: "method",
            onClick: _cache[6] || (_cache[6] = ($event) => $options.startRelaxation("f10"))
          }, [
            vue.createElementVNode("view", { class: "box-left" }, [
              vue.createElementVNode("text", { class: "circle" }, "4")
            ]),
            vue.createElementVNode("view", { class: "box-right" }, "蝴蝶拥抱")
          ]),
          vue.createElementVNode("view", { class: "tip" }, [
            vue.createElementVNode("image", { src: "/static/images/tip.png" }),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("text", null, "点击上方的小卡片，享受放松时刻！")
            ])
          ])
        ]),
        $data.currentPopup ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: vue.normalizeClass(`popup popup-${$data.currentPopup}`),
            style: { "width": "80%", "height": "50%", "text-align": "center", "z-index": "10" }
          },
          [
            vue.createElementVNode("ul", { style: { "text-align": "left", "margin-bottom": "20px", "font-size": "22px", "font-family": "'华文新魏', cursive" } }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($data.popupContent[$data.currentPopup].steps.slice(0, 4), (step) => {
                  return vue.openBlock(), vue.createElementBlock(
                    "li",
                    { key: step },
                    vue.toDisplayString(step),
                    1
                    /* TEXT */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            $data.countingDown ? (vue.openBlock(), vue.createElementBlock(
              "div",
              {
                key: 0,
                style: { "color": "#006400", "font-size": "24px", "font-family": "'华文新魏', cursive" }
              },
              vue.toDisplayString(Math.floor((this.popupContent[$data.currentPopup].duration - ($data.countdownMinutes * 60 + $data.countdownSeconds)) / 60)) + ":" + vue.toDisplayString((this.popupContent[$data.currentPopup].duration - ($data.countdownMinutes * 60 + $data.countdownSeconds)) % 60),
              1
              /* TEXT */
            )) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode(
              "button",
              {
                onClick: _cache[7] || (_cache[7] = (...args) => $options.toggleRelaxation && $options.toggleRelaxation(...args)),
                style: { "font-size": "18px", "font-family": "'华文新魏', cursive" }
              },
              vue.toDisplayString($data.countingDown ? "完成" : "进行"),
              1
              /* TEXT */
            ),
            vue.createElementVNode("button", {
              onClick: _cache[8] || (_cache[8] = (...args) => $options.closePopup && $options.closePopup(...args)),
              style: { "font-size": "18px", "font-family": "'华文新魏', cursive" }
            }, "取消")
          ],
          2
          /* CLASS */
        )) : vue.createCommentVNode("v-if", true)
      ])
    ]);
  }
  const PagesRelaxRelax = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["render", _sfc_render$k], ["__file", "D:/ruangong/emosphere/pages/relax/relax.vue"]]);
  const _sfc_main$s = {
    __name: "share",
    setup(__props) {
      let router2 = j();
      const getback = () => {
        router2.replace("/pages/space/space");
      };
      let imageurl;
      const imageList = vue.ref([]);
      const upload = () => {
        uni.chooseImage({
          count: 3,
          sizeType: ["original", "compressed"],
          sourceType: ["album"],
          loop: true,
          success: (res) => {
            formatAppLog("log", "at pages/share/share.vue:51", res);
            if (res.tempFilePaths.length !== 0) {
              imageList.value.push(res.tempFilePaths[0]);
              var tempFilePaths = res.tempFilePaths;
              uni.uploadFile({
                url: "http://8.136.81.197:8080/qiniu/file",
                filePath: tempFilePaths[0],
                name: "file",
                success: function(res2) {
                  formatAppLog("log", "at pages/share/share.vue:60", res2.data);
                  const responseData = JSON.parse(res2.data);
                  imageurl = responseData.url;
                },
                fail: function(res2) {
                  formatAppLog("log", "at pages/share/share.vue:65", res2.errMsg);
                }
              });
            }
          }
        });
      };
      const del = (index) => {
        imageList.value.splice(index, 1);
        formatAppLog("log", "at pages/share/share.vue:76", imageList);
      };
      const userid = store.getters.getUserId;
      let Content = "";
      let date = (/* @__PURE__ */ new Date()).toISOString().substr(0, 10);
      const savadata = () => {
        formatAppLog("log", "at pages/share/share.vue:84", imageurl);
        const data = {
          uid: userid,
          content: Content,
          illustration: imageurl,
          createDate: date
        };
        formatAppLog("log", "at pages/share/share.vue:91", data);
        uni.request({
          url: "http://8.136.81.197:8080/post",
          method: "POST",
          data,
          success: (response) => {
            formatAppLog("log", "at pages/share/share.vue:97", response.data);
            uni.showToast({
              title: "发布成功",
              icon: "none"
            });
            router2.replace("/pages/space/space");
          },
          fail: (error) => {
            uni.showToast({
              title: "发布失败",
              icon: "none"
            });
          }
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "backarea" }, [
          vue.createElementVNode("view", {
            class: "box",
            style: { "width": "100%", "height": "5%" }
          }),
          vue.createElementVNode("view", { class: "header" }, [
            vue.createElementVNode("view", {
              class: "left",
              onClick: getback
            }, [
              vue.createElementVNode("image", { src: "/static/images/fanhui.png" }),
              vue.createElementVNode("text", null, "返回")
            ]),
            vue.createElementVNode("view", {
              class: "right",
              onClick: savadata
            }, [
              vue.createElementVNode("button", { class: "btn" }, "发布")
            ])
          ]),
          vue.createElementVNode("view", { class: "text-area" }, [
            vue.createElementVNode("view", { class: "content" }, [
              vue.withDirectives(vue.createElementVNode(
                "textarea",
                {
                  placeholder: "What's your emotion?",
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.isRef(Content) ? Content.value = $event : Content = $event)
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vModelText, vue.unref(Content)]
              ])
            ]),
            vue.createElementVNode("view", { class: "shangchuan" }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(imageList.value, (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "sc2",
                    key: index
                  }, [
                    vue.createElementVNode("image", {
                      class: "del",
                      onClick: ($event) => del(index),
                      src: "/static/images/shanchu.png",
                      mode: ""
                    }, null, 8, ["onClick"]),
                    vue.createElementVNode("image", {
                      class: "image3",
                      src: item,
                      mode: ""
                    }, null, 8, ["src"])
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              )),
              imageList.value.length < 1 ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "sc2",
                onClick: upload
              }, [
                vue.createElementVNode("image", {
                  class: "sc3",
                  src: "/static/images/jiahao.png",
                  mode: ""
                })
              ])) : vue.createCommentVNode("v-if", true)
            ])
          ])
        ]);
      };
    }
  };
  const PagesShareShare = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["__file", "D:/ruangong/emosphere/pages/share/share.vue"]]);
  const _sfc_main$r = {
    name: "YSteps",
    props: {
      infoList: {
        type: Array,
        default: []
      },
      color: {
        type: String,
        default: "#fff"
      },
      backgroundColor: {
        type: String,
        default: "#ff3838"
      },
      lineNum: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {};
    },
    onLoad(e2) {
    },
    methods: {
      topage(e2) {
        this.$emit("click", e2);
      }
    }
  };
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createCommentVNode(" 获取一个数组，结构为[{date:'时间',info:'内容内容'}] "),
        vue.createCommentVNode(" @click事件返回点击标签元素的索引值 第一项为0 "),
        vue.createElementVNode("view", { class: "bg" }, [
          vue.createElementVNode("view", { class: "steps" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($props.infoList, (i2, index) => {
                return vue.openBlock(), vue.createElementBlock("view", { class: "steps_item" }, [
                  vue.createElementVNode("view", { class: "s_r" }, [
                    vue.createElementVNode(
                      "view",
                      {
                        class: "line",
                        style: vue.normalizeStyle({ backgroundColor: index != 0 ? $props.backgroundColor : "rgba(0,0,0,0)" })
                      },
                      null,
                      4
                      /* STYLE */
                    ),
                    vue.createElementVNode(
                      "view",
                      {
                        class: "index",
                        style: vue.normalizeStyle({ backgroundColor: $props.backgroundColor, color: $props.color })
                      },
                      vue.toDisplayString(index + 1),
                      5
                      /* TEXT, STYLE */
                    ),
                    vue.createElementVNode(
                      "view",
                      {
                        class: "line",
                        style: vue.normalizeStyle({ backgroundColor: index != $props.infoList.length - 1 ? $props.backgroundColor : "rgba(0,0,0,0)" })
                      },
                      null,
                      4
                      /* STYLE */
                    )
                  ]),
                  vue.createElementVNode("view", { class: "s_l" }, [
                    vue.createElementVNode("view", {
                      class: "info_item",
                      onClick: ($event) => $options.topage(index)
                    }, [
                      vue.createElementVNode(
                        "text",
                        null,
                        vue.toDisplayString(i2.date),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode(
                        "view",
                        {
                          style: vue.normalizeStyle({ WebkitLineClamp: $props.lineNum != 0 ? $props.lineNum : "" })
                        },
                        vue.toDisplayString(i2.info),
                        5
                        /* TEXT, STYLE */
                      )
                    ], 8, ["onClick"])
                  ])
                ]);
              }),
              256
              /* UNKEYED_FRAGMENT */
            ))
          ])
        ])
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    );
  }
  const YSteps = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$j], ["__scopeId", "data-v-3d3a9ebb"], ["__file", "D:/ruangong/emosphere/components/Y-Steps/Y-Steps.vue"]]);
  const _sfc_main$q = {
    components: {
      YSteps
    },
    data() {
      return {
        list: [
          {
            date: "2020-1-4",
            info: "第一次听这首歌，旋律很好听"
          },
          {
            date: "2020-7-4",
            info: "好多人和我一样喜欢听这首歌，好开心"
          },
          {
            date: "2021-3-22",
            info: "好久没听这首歌了，让我回想起一些往事，有点伤感"
          }
        ]
      };
    },
    methods: {}
  };
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_a_button = vue.resolveComponent("a-button");
    const _component_YSteps = vue.resolveComponent("YSteps");
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("view", { class: "flex padding-sm justify-between" }, [
          vue.createElementVNode("view", { class: "flex padding-top-xs text-xxxl text-black" }, [
            vue.createElementVNode("navigator", {
              url: "/pages/index/index",
              "open-type": "navigateBack"
            }, [
              vue.createVNode(_component_a_button, null, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("text", {
                    class: "cuIcon-close text-black",
                    alt: ""
                  })
                ]),
                _: 1
                /* STABLE */
              })
            ])
          ]),
          vue.createElementVNode("view", { class: "text-xxxl" }, [
            vue.createElementVNode("view", { class: "flex justify-center cuIcon-more text-blace" })
          ])
        ]),
        vue.createElementVNode("view", { style: { "background-color": "#f2f2f2", "padding-top": "30" } }, [
          vue.createCommentVNode(" 内容显示行数控制 设置为0显示所有内容 "),
          vue.createVNode(_component_YSteps, {
            lineNum: "0",
            color: "#fff",
            backgroundColor: "#000fff",
            infoList: $data.list
          }, null, 8, ["infoList"])
        ])
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesRecordRecord = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$i], ["__file", "D:/ruangong/emosphere/pages/record/record.vue"]]);
  const _sfc_main$p = {
    data() {
      return {};
    },
    props: {
      modelValue: {
        type: Boolean,
        require: true
      },
      title: {
        type: String,
        require: false
      },
      duration: {
        type: Number,
        require: false,
        default: 300
      },
      fromPoi: {
        type: Array,
        require: false,
        default: ["0%", "0%"]
      },
      backgroundColor: {
        type: String,
        require: false,
        default: "#f5f5f5"
      },
      startStyle: {
        type: Object,
        require: false
      },
      endStyle: {
        type: Object,
        require: false
      }
    },
    onLoad() {
    },
    methods: {
      close() {
        this.$emit("closed");
        this.$emit("update:modelValue", false);
      }
    },
    computed: {
      getToPoi: function() {
        return [(100 - this.getEndStyle.height) / 2 + "%", (100 - this.getEndStyle.width) / 2 + "%"];
      },
      getEndStyle: function() {
        return Object.assign({
          width: 80,
          height: 80,
          borderRadius: "8px"
        }, this.endStyle);
      },
      getStartStyle: function() {
        return Object.assign({
          width: 0,
          height: 0,
          borderRadius: "0px"
        }, this.startStyle);
      }
    },
    watch: {
      modelValue() {
        formatAppLog("log", "at uni_modules/gscosmos-dialog/components/gscosmos-dialog/gscosmos-dialog.vue:92", this.modelValue);
      }
    }
  };
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "dialog",
        style: vue.normalizeStyle({
          width: $props.modelValue ? $options.getEndStyle.width + "%" : $options.getStartStyle.width + "%",
          height: $props.modelValue ? "calc(" + $options.getEndStyle.height + "% - var(--status-bar-height))" : $options.getStartStyle.height + "%",
          borderRadius: $props.modelValue ? $options.getEndStyle.borderRadius : $options.getStartStyle.borderRadius,
          top: $props.modelValue ? "calc(" + $options.getToPoi[0] + " + var(--status-bar-height))" : $props.fromPoi[0],
          left: $props.modelValue ? $options.getToPoi[1] : $props.fromPoi[1],
          opacity: $props.modelValue ? 1 : 0,
          backgroundColor: $props.backgroundColor,
          transitionDuration: $props.duration + "ms"
        })
      },
      [
        vue.withDirectives(vue.createElementVNode(
          "view",
          { class: "content" },
          [
            vue.createElementVNode("view", { class: "title" }, [
              vue.createElementVNode(
                "h3",
                null,
                vue.toDisplayString($props.title),
                1
                /* TEXT */
              ),
              vue.createElementVNode("span", {
                class: "close",
                onClick: _cache[0] || (_cache[0] = vue.withModifiers(($event) => $options.close(), ["stop"]))
              }, "×")
            ]),
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ],
          512
          /* NEED_PATCH */
        ), [
          [vue.vShow, $props.modelValue]
        ])
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$h], ["__scopeId", "data-v-42d6f2a0"], ["__file", "D:/ruangong/emosphere/uni_modules/gscosmos-dialog/components/gscosmos-dialog/gscosmos-dialog.vue"]]);
  const _sfc_main$o = {
    data() {
      return {
        audio: uni.createInnerAudioContext({
          obeyMuteSwitch: false
        }),
        current: 0,
        //当前进度(s)
        duration: 261,
        //总时长(s)
        paused: true,
        //是否处于暂停状态
        loading: false,
        //是否处于读取状态
        seek: false
        //是否处于拖动状态
      };
    },
    props: {
      src: String,
      toplay: Boolean,
      //是否自动播放
      autocontinue: Boolean,
      //播放完成后是否继续播放下一首，需定义@next事件
      playWay: Number,
      //播放模式，单曲循环 循环播放 随机播放
      control: {
        type: Boolean,
        default: true
      },
      //是否需要上一曲/下一曲按钮
      color: {
        type: String,
        default: "#169af3"
      }
      //主色调
    },
    methods: {
      //返回prev事件
      prev() {
        this.$emit("prev");
      },
      //返回next事件
      next() {
        this.$emit("next");
      },
      //格式化时长
      format(num) {
        return "0".repeat(2 - String(Math.floor(num / 60)).length) + Math.floor(num / 60) + ":" + "0".repeat(2 - String(Math.floor(num % 60)).length) + Math.floor(num % 60);
      },
      //点击播放按钮
      play() {
        this.audio.play();
        this.loading = true;
      }
    },
    created() {
      if (this.src) {
        this.audio.src = this.src;
        this.autoplay && this.play();
      }
      this.audio.onTimeUpdate(() => {
        if (!this.seek) {
          this.current = this.audio.currentTime;
        }
        if (!this.duration) {
          this.duration = this.audio.duration;
        }
      });
      this.audio.onPlay(() => {
        this.paused = false;
        this.loading = false;
      });
      this.audio.onPause(() => {
        this.paused = true;
      });
      this.audio.onEnded(() => {
        if (this.continue == "true" && this.playWay === 1) {
          this.next();
        } else if (this.continue == "true" && this.playWay === 0) {
          this.play();
        } else if (this.continue == "true" && this.playWay === 2) {
          this.paused = true;
          this.current = 0;
        } else {
          this.paused = true;
          this.current = 0;
        }
      });
      this.audio.onSeeked(() => {
        this.seek = false;
      });
    },
    beforeDestroy() {
      this.audio.destroy();
    },
    watch: {
      src(src, old) {
        this.audio.src = src;
        this.current = 0;
        this.duration = 0;
        if (old || this.autoplay) {
          this.play();
        }
      }
    }
  };
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "imt-audio" }, [
      vue.createElementVNode("view", { class: "audio-wrapper" }, [
        vue.createElementVNode(
          "view",
          { class: "audio-number" },
          vue.toDisplayString($options.format($data.current)),
          1
          /* TEXT */
        ),
        vue.createElementVNode("slider", {
          class: "audio-slider",
          activeColor: $props.color,
          "block-size": "25",
          value: $data.current,
          max: $data.duration,
          onChanging: _cache[0] || (_cache[0] = ($event) => ($data.seek = true, $data.current = $event.detail.value)),
          onChange: _cache[1] || (_cache[1] = ($event) => $data.audio.seek($event.detail.value))
        }, null, 40, ["activeColor", "value", "max"]),
        vue.createElementVNode(
          "view",
          { class: "audio-number" },
          vue.toDisplayString($options.format($data.duration)),
          1
          /* TEXT */
        )
      ]),
      vue.createElementVNode(
        "view",
        {
          class: "audio-control-wrapper",
          style: vue.normalizeStyle({ color: $props.color })
        },
        [
          $props.control ? (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 0,
              class: "audio-control audio-control-prev",
              style: vue.normalizeStyle({ borderColor: $props.color }),
              onClick: _cache[2] || (_cache[2] = (...args) => $options.prev && $options.prev(...args))
            },
            " ",
            4
            /* STYLE */
          )) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["audio-control audio-control-switch", { audioLoading: $data.loading }]),
              style: vue.normalizeStyle({ borderColor: $props.color }),
              onClick: _cache[3] || (_cache[3] = ($event) => $data.audio.paused ? $options.play() : $data.audio.pause())
            },
            vue.toDisplayString($data.loading ? "" : $data.paused ? "" : ""),
            7
            /* TEXT, CLASS, STYLE */
          ),
          $props.control ? (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 1,
              class: "audio-control audio-control-next",
              style: vue.normalizeStyle({ borderColor: $props.color }),
              onClick: _cache[4] || (_cache[4] = (...args) => $options.next && $options.next(...args))
            },
            " ",
            4
            /* STYLE */
          )) : vue.createCommentVNode("v-if", true)
        ],
        4
        /* STYLE */
      )
    ]);
  }
  const __easycom_1$2 = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$g], ["__scopeId", "data-v-8a21190d"], ["__file", "D:/ruangong/emosphere/components/imt-audio/imt-audio.vue"]]);
  const __default__ = {
    data() {
      return {
        like: 0,
        play: 0,
        TabCur: 0,
        scrollLeft: 0,
        playWay: 1,
        now: 0,
        audioData: [
          {
            file: "/static/songs/01.mp3",
            longth: "04:21",
            music_id: 1,
            name: "认真的雪",
            singername: "薛之谦",
            like: 0,
            song_image: "/static/images/design07.png"
          },
          {
            file: "/static/songs/02.mp3",
            longth: "04:58",
            music_id: 2,
            name: "可惜没如果",
            singername: "林俊杰",
            like: 0,
            song_image: "/static/images/design10.jpg"
          },
          {
            file: "/static/songs/03.mp3",
            longth: "04:29",
            music_id: 3,
            name: "晴天",
            singername: "周杰伦",
            like: 0,
            song_image: "/static/images/design12.webp"
          },
          {
            file: "/static/songs/04.mp3",
            longth: "04:32",
            music_id: 4,
            name: "爱如潮水",
            singername: "张信哲",
            like: 0,
            song_image: "/static/images/design11.jpg"
          },
          {
            file: "/static/songs/05.mp3",
            longth: "02:50",
            music_id: 5,
            name: "会魔法的老人",
            singername: "法老、KKECHO",
            like: 0,
            song_image: "/static/images/design14.jpg"
          },
          {
            file: "/static/songs/06.mp3",
            longth: "04:18",
            music_id: 6,
            name: "飘向北方 (Live)",
            singername: "尤长靖、那吾克热-NW",
            like: 0,
            song_image: "/static/images/design13.jpg"
          },
          {
            file: "/static/songs/07.mp3",
            longth: "04:19",
            music_id: 7,
            name: "奢香夫人",
            singername: "凤凰传奇",
            like: 0,
            song_image: "/static/images/design15.jpg"
          }
        ]
      };
    },
    methods: {
      tabSelect(e2) {
        this.TabCur = e2.currentTarget.dataset.id;
        this.scrollLeft = (e2.currentTarget.dataset.id - 1) * 60;
      },
      like_ornot(now) {
        if (this.audioData[now].like == 0) {
          this.$set(this.audioData[now], "like", 1);
        } else {
          this.$set(this.audioData[now], "like", 0);
        }
      },
      play_ornot() {
        if (this.play == 0) {
          this.play = 1;
        } else {
          this.play = 0;
        }
      },
      updateWay() {
        var that = this;
        if (that.playWay == 2) {
          that.playWay = 0;
        } else {
          that.playWay = that.playWay + 1;
        }
      }
    }
  };
  const _sfc_main$n = /* @__PURE__ */ vue.defineComponent({
    ...__default__,
    __name: "music",
    setup(__props) {
      let router2 = j();
      const navigateTo = (route) => {
        const routesMap = {
          main: "/pages/main/main",
          history: "/pages/history/history",
          relax: "/pages/relax/relax"
        };
        if (routesMap[route]) {
          router2.replace(routesMap[route]);
        }
      };
      const dialogData = vue.reactive({
        visiable: false,
        fromPoi: ["0", "0"],
        endStyle: {
          height: 50
        }
      });
      const closed = () => {
        formatAppLog("log", "at pages/music/music.vue:87", "关闭弹窗后的回调函数");
      };
      return (_ctx, _cache) => {
        const _component_a_button = vue.resolveComponent("a-button");
        const _component_gscosmos_dialog = resolveEasycom(vue.resolveDynamicComponent("gscosmos-dialog"), __easycom_0$3);
        const _component_imt_audio = resolveEasycom(vue.resolveDynamicComponent("imt-audio"), __easycom_1$2);
        return vue.openBlock(), vue.createElementBlock("view", { class: "scrollPage" }, [
          vue.createElementVNode("view", {
            class: "box",
            style: { "width": "100%", "height": "5%" }
          }),
          vue.createElementVNode("view", { class: "header" }, [
            vue.createElementVNode("image", {
              src: "/static/images/fanhui.png",
              onClick: _cache[0] || (_cache[0] = ($event) => navigateTo("main"))
            }),
            vue.createElementVNode("view", { class: "choose" }, [
              vue.createElementVNode("image", { src: "/static/images/yinyue.png" })
            ]),
            vue.createElementVNode("image", {
              src: "/static/images/fenche.png",
              onClick: _cache[1] || (_cache[1] = ($event) => navigateTo("relax"))
            }),
            vue.createElementVNode("image", {
              src: "/static/images/recode.png",
              onClick: _cache[2] || (_cache[2] = ($event) => navigateTo("history"))
            })
          ]),
          vue.createElementVNode("view", { class: "radius-lg" }, [
            vue.createElementVNode("view", {
              class: "bg-white padding-bottom radius-xl",
              style: { "text-align": "center" }
            }, [
              vue.createElementVNode("view", {
                class: "padding-lr margin-xxl",
                style: { "height": "15rem", "margin-bottom": "40px" }
              }, [
                vue.createElementVNode("image", {
                  class: "shadow-blur bg-image radius-lg",
                  style: {},
                  src: _ctx.audioData[_ctx.now].song_image
                }, null, 8, ["src"])
              ]),
              vue.createElementVNode(
                "view",
                {
                  class: "text-xl text-black text-center",
                  style: { "font-size": "24px" }
                },
                vue.toDisplayString(_ctx.audioData[_ctx.now].name),
                1
                /* TEXT */
              ),
              vue.createElementVNode("view", { class: "text-center padding-top-sm" }, [
                vue.createElementVNode(
                  "text",
                  {
                    class: "text-sm text-gray text-center",
                    style: { "font-size": "20px" }
                  },
                  vue.toDisplayString(_ctx.audioData[_ctx.now].singername),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "margin-top-xl text-center text-xxxl text-black padding-top-lg" }, [
                vue.createVNode(_component_a_button, {
                  type: "link",
                  ghost: "",
                  onClick: _cache[3] || (_cache[3] = ($event) => _ctx.updateWay())
                }, {
                  default: vue.withCtx(() => [
                    _ctx.playWay == 2 ? (vue.openBlock(), vue.createElementBlock("image", {
                      key: 0,
                      class: "iconbtn",
                      src: "/static/images/suijibofang.png"
                    })) : vue.createCommentVNode("v-if", true),
                    _ctx.playWay == 1 ? (vue.openBlock(), vue.createElementBlock("image", {
                      key: 1,
                      class: "iconbtn",
                      src: "/static/images/xunhuanbofang.png"
                    })) : vue.createCommentVNode("v-if", true),
                    _ctx.playWay == 0 ? (vue.openBlock(), vue.createElementBlock("image", {
                      key: 2,
                      class: "iconbtn",
                      src: "/static/images/danquxunhuan.png"
                    })) : vue.createCommentVNode("v-if", true)
                  ]),
                  _: 1
                  /* STABLE */
                }),
                vue.createVNode(_component_a_button, {
                  type: "link",
                  ghost: "",
                  onClick: _cache[4] || (_cache[4] = ($event) => _ctx.like_ornot(_ctx.now))
                }, {
                  default: vue.withCtx(() => [
                    _ctx.audioData[_ctx.now].like == 1 ? (vue.openBlock(), vue.createElementBlock("text", {
                      key: 0,
                      class: "cuIcon-likefill text-red padding-lr-xl iconbtn",
                      alt: ""
                    })) : vue.createCommentVNode("v-if", true),
                    _ctx.audioData[_ctx.now].like == 0 ? (vue.openBlock(), vue.createElementBlock("text", {
                      key: 1,
                      class: "cuIcon-like padding-lr-xl iconbtn",
                      alt: ""
                    })) : vue.createCommentVNode("v-if", true)
                  ]),
                  _: 1
                  /* STABLE */
                }),
                vue.createVNode(_component_gscosmos_dialog, {
                  modelValue: dialogData.visiable,
                  "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => dialogData.visiable = $event),
                  endStyle: dialogData.endStyle,
                  fromPoi: dialogData.fromPoi,
                  title: "播放列表",
                  onClosed: closed
                }, {
                  default: vue.withCtx(() => [
                    vue.createElementVNode("view", { class: "content" }, [
                      (vue.openBlock(true), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList(_ctx.audioData, (item, key) => {
                          return vue.openBlock(), vue.createElementBlock("view", {
                            class: vue.normalizeClass(["list", { active: key === _ctx.now }]),
                            key,
                            onClick: ($event) => _ctx.now = key
                          }, vue.toDisplayString(key + 1) + " . " + vue.toDisplayString(_ctx.audioData[key].name), 11, ["onClick"]);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ])
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["modelValue", "endStyle", "fromPoi"]),
                vue.createElementVNode("image", {
                  class: "iconbtn",
                  onClick: _cache[6] || (_cache[6] = ($event) => dialogData.visiable = true),
                  src: "/static/images/bofangliebiao.png"
                })
              ]),
              vue.createElementVNode("view", { class: "content" }, [
                vue.createVNode(_component_imt_audio, {
                  toplay: "true",
                  autocontinue: false,
                  playWay: _ctx.playWay,
                  src: _ctx.audioData[_ctx.now].file,
                  duration: _ctx.audioData[_ctx.now].file.duration,
                  onPrev: _cache[7] || (_cache[7] = ($event) => _ctx.now = _ctx.now === 0 ? _ctx.audioData.length - 1 : _ctx.now - 1),
                  onNext: _cache[8] || (_cache[8] = ($event) => _ctx.now = _ctx.now === _ctx.audioData.length - 1 ? 0 : _ctx.now + 1)
                }, null, 8, ["playWay", "src", "duration"])
              ])
            ]),
            vue.createElementVNode("view", { class: "flex" }, [
              vue.createElementVNode("view", {
                class: "padding-right-sm",
                style: { "padding": "35rpx 15rpx" }
              }, [
                vue.createElementVNode("navigator", {
                  url: "/pages/record/record",
                  "open-type": "navigate"
                }, [
                  vue.createElementVNode("button", {
                    class: "cu-btn round",
                    style: { "font-size": "40rpx", "height": "92rpx" }
                  }, "听歌心情")
                ])
              ])
            ])
          ])
        ]);
      };
    }
  });
  const PagesMusicMusic = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__file", "D:/ruangong/emosphere/pages/music/music.vue"]]);
  const _sfc_main$m = {
    data() {
      let router2 = j();
      const fan = () => {
        router2.replace("/pages/chat/chat");
      };
      return {
        bgColor: "#BAD0CE",
        // 设置背景色为绿色
        fan,
        score: "",
        average_score: "",
        pos_items: "",
        pas_items: "",
        pos_sym_num: "",
        factor1: "",
        factor2: "",
        factor3: "",
        factor4: "",
        factor5: "",
        factor6: "",
        factor7: "",
        factor8: "",
        factor9: "",
        factor10: "",
        situation: "",
        text1: "",
        text2: "",
        text3: "",
        text4: ""
      };
    },
    onLoad(query) {
      this.score = query.score || "";
      this.average_score = query.average_score || "";
      this.pos_items = query.pos_items || "";
      this.pas_items = query.pas_items || "";
      this.pos_sym_num = query.pos_sym_num || "";
      this.factor1 = query.factor1 || "";
      this.factor2 = query.factor2 || "";
      this.factor3 = query.factor3 || "";
      this.factor4 = query.factor4 || "";
      this.factor5 = query.factor5 || "";
      this.factor6 = query.factor6 || "";
      this.factor7 = query.factor7 || "";
      this.factor8 = query.factor8 || "";
      this.factor9 = query.factor9 || "";
      this.factor10 = query.factor10 || "";
      this.average_score = parseFloat(this.average_score);
      this.average_score = Math.floor(this.average_score * 100) / 100;
      if (this.average_score >= 1 && this.average_score < 2) {
        this.situation = "心理健康";
      } else if (this.average_score >= 2 && this.average_score < 3) {
        this.situation = "亚健康心理状态";
      } else if (this.average_score >= 3 && this.average_score < 4) {
        this.situation = "有心理健康问题";
      } else if (this.average_score >= 4 && this.average_score < 5) {
        this.situation = "有严重心理健康问题";
      }
      var arr = [];
      var randomNum;
      for (var i2 = 0; i2 < 4; ++i2) {
        while (1) {
          randomNum = Math.floor(Math.random() * 10) + 1;
          if (arr[randomNum] == 1)
            continue;
          else {
            arr[randomNum] = 1;
            break;
          }
        }
        if (i2 == 0) {
          if (randomNum == 1) {
            this.text1 = "建议进行一些放松训练，例如深呼吸、渐进性肌肉放松等，这些方法可以帮助您缓解身体紧张和不适感。";
          }
          if (randomNum == 2) {
            this.text1 = "建议通过改变您的生活节奏等方式，例如减少压力、增加运动等，改变不良的思维模式和行为习惯，进而提高对于强迫症状的控制程度。";
          }
          if (randomNum == 3) {
            this.text1 = "建议尝试与他人多交流，保持积极的生活态度，多参加社交活动，逐渐增加自信心和社交能力。";
          }
          if (randomNum == 4) {
            this.text1 = "建议时刻关注自己的情绪变化，了解自己的情绪状态，并寻找适当的情绪调节方法。适当改变生活方式，增加运动、保持良好的作息时间和饮食习惯。";
          }
          if (randomNum == 5) {
            this.text1 = "建议尝试放松训练，通过进行深呼吸等放松训练，缓解身体紧张和心理压力。与亲朋好友、同事或专业心理咨询师交流，分享自己的感受和困惑，减轻孤独感和压力。";
          }
          if (randomNum == 6) {
            this.text1 = "建议尝试控制自己的情绪和行为，可以采取一些冷静下来的方法，如深呼吸、短暂停顿等。尊重他人的观点和感受，避免对他人的言论或行为过于敏感或反应过度。";
          }
          if (randomNum == 7) {
            this.text1 = "建议找出导致恐惧的原因,逐渐暴露自己于恐惧的场所或物体中，以逐渐适应和克服恐惧。";
          }
          if (randomNum == 8) {
            this.text1 = "建议学习一些积极的思维方式和应对策略,与亲朋好友、同事或专业心理咨询师交流，分享自己的感受和困惑，获得支持和理解。";
          }
          if (randomNum == 9) {
            this.text1 = "建议睡前避免饮用咖啡、茶或含咖啡因的饮料，避免剧烈运动或观看刺激性的电视节目。避免暴饮暴食，每餐尽量控制食量，避免过饱。";
          }
          if (randomNum == 10) {
            this.text1 = "建议寻求专业帮助，如果你感到抑郁或焦虑症状严重或持续存在，建议咨询心理医生或精神科医生，接受专业的评估和治疗。";
          }
        }
        if (i2 == 1) {
          if (randomNum == 1) {
            this.text2 = "建议进行一些放松训练，例如深呼吸、渐进性肌肉放松等，这些方法可以帮助您缓解身体紧张和不适感。";
          }
          if (randomNum == 2) {
            this.text2 = "建议通过改变您的生活节奏等方式，例如减少压力、增加运动等，改变不良的思维模式和行为习惯，进而提高对于强迫症状的控制程度。";
          }
          if (randomNum == 3) {
            this.text2 = "建议尝试与他人多交流，保持积极的生活态度，多参加社交活动，逐渐增加自信心和社交能力。";
          }
          if (randomNum == 4) {
            this.text2 = "建议时刻关注自己的情绪变化，了解自己的情绪状态，并寻找适当的情绪调节方法。适当改变生活方式，增加运动、保持良好的作息时间和饮食习惯。";
          }
          if (randomNum == 5) {
            this.text2 = "建议尝试放松训练，通过进行深呼吸等放松训练，缓解身体紧张和心理压力。与亲朋好友、同事或专业心理咨询师交流，分享自己的感受和困惑，减轻孤独感和压力。";
          }
          if (randomNum == 6) {
            this.text2 = "建议尝试控制自己的情绪和行为，可以采取一些冷静下来的方法，如深呼吸、短暂停顿等。尊重他人的观点和感受，避免对他人的言论或行为过于敏感或反应过度。";
          }
          if (randomNum == 7) {
            this.text2 = "建议找出导致恐惧的原因,逐渐暴露自己于恐惧的场所或物体中，以逐渐适应和克服恐惧。";
          }
          if (randomNum == 8) {
            this.text2 = "建议学习一些积极的思维方式和应对策略,与亲朋好友、同事或专业心理咨询师交流，分享自己的感受和困惑，获得支持和理解。";
          }
          if (randomNum == 9) {
            this.text2 = "建议睡前避免饮用咖啡、茶或含咖啡因的饮料，避免剧烈运动或观看刺激性的电视节目。避免暴饮暴食，每餐尽量控制食量，避免过饱。";
          }
          if (randomNum == 10) {
            this.text2 = "建议寻求专业帮助，如果你感到抑郁或焦虑症状严重或持续存在，建议咨询心理医生或精神科医生，接受专业的评估和治疗。";
          }
        }
        if (i2 == 2) {
          if (randomNum == 1) {
            this.text3 = "建议进行一些放松训练，例如深呼吸、渐进性肌肉放松等，这些方法可以帮助您缓解身体紧张和不适感。";
          }
          if (randomNum == 2) {
            this.text3 = "建议通过改变您的生活节奏等方式，例如减少压力、增加运动等，改变不良的思维模式和行为习惯，进而提高对于强迫症状的控制程度。";
          }
          if (randomNum == 3) {
            this.text3 = "建议尝试与他人多交流，保持积极的生活态度，多参加社交活动，逐渐增加自信心和社交能力。";
          }
          if (randomNum == 4) {
            this.text3 = "建议时刻关注自己的情绪变化，了解自己的情绪状态，并寻找适当的情绪调节方法。适当改变生活方式，增加运动、保持良好的作息时间和饮食习惯。";
          }
          if (randomNum == 5) {
            this.text3 = "建议尝试放松训练，通过进行深呼吸等放松训练，缓解身体紧张和心理压力。与亲朋好友、同事或专业心理咨询师交流，分享自己的感受和困惑，减轻孤独感和压力。";
          }
          if (randomNum == 6) {
            this.text3 = "建议尝试控制自己的情绪和行为，可以采取一些冷静下来的方法，如深呼吸、短暂停顿等。尊重他人的观点和感受，避免对他人的言论或行为过于敏感或反应过度。";
          }
          if (randomNum == 7) {
            this.text3 = "建议找出导致恐惧的原因,逐渐暴露自己于恐惧的场所或物体中，以逐渐适应和克服恐惧。";
          }
          if (randomNum == 8) {
            this.text3 = "建议学习一些积极的思维方式和应对策略,与亲朋好友、同事或专业心理咨询师交流，分享自己的感受和困惑，获得支持和理解。";
          }
          if (randomNum == 9) {
            this.text3 = "建议睡前避免饮用咖啡、茶或含咖啡因的饮料，避免剧烈运动或观看刺激性的电视节目。避免暴饮暴食，每餐尽量控制食量，避免过饱。";
          }
          if (randomNum == 10) {
            this.text3 = "建议寻求专业帮助，如果你感到抑郁或焦虑症状严重或持续存在，建议咨询心理医生或精神科医生，接受专业的评估和治疗。";
          }
        }
        if (i2 == 3) {
          if (randomNum == 1) {
            this.text4 = "建议进行一些放松训练，例如深呼吸、渐进性肌肉放松等，这些方法可以帮助您缓解身体紧张和不适感。";
          }
          if (randomNum == 2) {
            this.text4 = "建议通过改变您的生活节奏等方式，例如减少压力、增加运动等，改变不良的思维模式和行为习惯，进而提高对于强迫症状的控制程度。";
          }
          if (randomNum == 3) {
            this.text4 = "建议尝试与他人多交流，保持积极的生活态度，多参加社交活动，逐渐增加自信心和社交能力。";
          }
          if (randomNum == 4) {
            this.text4 = "建议时刻关注自己的情绪变化，了解自己的情绪状态，并寻找适当的情绪调节方法。适当改变生活方式，增加运动、保持良好的作息时间和饮食习惯。";
          }
          if (randomNum == 5) {
            this.text4 = "建议尝试放松训练，通过进行深呼吸等放松训练，缓解身体紧张和心理压力。与亲朋好友、同事或专业心理咨询师交流，分享自己的感受和困惑，减轻孤独感和压力。";
          }
          if (randomNum == 6) {
            this.text4 = "建议尝试控制自己的情绪和行为，可以采取一些冷静下来的方法，如深呼吸、短暂停顿等。尊重他人的观点和感受，避免对他人的言论或行为过于敏感或反应过度。";
          }
          if (randomNum == 7) {
            this.text4 = "建议找出导致恐惧的原因,逐渐暴露自己于恐惧的场所或物体中，以逐渐适应和克服恐惧。";
          }
          if (randomNum == 8) {
            this.text4 = "建议学习一些积极的思维方式和应对策略,与亲朋好友、同事或专业心理咨询师交流，分享自己的感受和困惑，获得支持和理解。";
          }
          if (randomNum == 9) {
            this.text4 = "建议睡前避免饮用咖啡、茶或含咖啡因的饮料，避免剧烈运动或观看刺激性的电视节目。避免暴饮暴食，每餐尽量控制食量，避免过饱。";
          }
          if (randomNum == 10) {
            this.text4 = "建议寻求专业帮助，如果你感到抑郁或焦虑症状严重或持续存在，建议咨询心理医生或精神科医生，接受专业的评估和治疗。";
          }
        }
      }
      formatAppLog("log", "at pages/result/result.vue:244", this.text1);
      formatAppLog("log", "at pages/result/result.vue:245", this.text2);
      formatAppLog("log", "at pages/result/result.vue:246", this.text3);
      formatAppLog("log", "at pages/result/result.vue:247", this.text4);
    },
    methods: {}
  };
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("div", { class: "background" }, [
      vue.createElementVNode("p", {
        class: "text-res",
        style: { "position": "absolute", "left": "4%", "top": "5%" }
      }, "测试结果："),
      vue.createElementVNode("div", {
        class: "rounded-box",
        style: { "position": "absolute", "left": "7.5%", "top": "12%", "height": "30%", "width": "85%" }
      }, [
        vue.createElementVNode(
          "p",
          {
            class: "text-output",
            style: { "position": "absolute", "left": "5%", "top": "3%" }
          },
          "您的测试总分为: " + vue.toDisplayString($data.score),
          1
          /* TEXT */
        ),
        vue.createElementVNode(
          "p",
          {
            class: "text-output",
            style: { "position": "absolute", "left": "5%", "top": "18%" }
          },
          "测试总均分为: " + vue.toDisplayString($data.average_score),
          1
          /* TEXT */
        ),
        vue.createElementVNode("p", {
          class: "text-output",
          style: { "position": "absolute", "left": "5%", "top": "32%" }
        }, "整体的心理健康情况为: "),
        vue.createElementVNode(
          "p",
          {
            class: "text-res",
            style: { "position": "absolute", "left": "4%", "top": "48%" }
          },
          vue.toDisplayString($data.situation),
          1
          /* TEXT */
        )
      ]),
      vue.createElementVNode("div", {
        class: "rounded-circle",
        style: { "position": "absolute", "left": "35%", "top": "25%", "height": "20%", "width": "30%" }
      }, [
        vue.createElementVNode("image", {
          src: "/static/images/result_1.png",
          style: { "left": "20%", "top": "50%", "height": "40%", "width": "60%" }
        })
      ]),
      vue.createElementVNode("div", null, [
        vue.createElementVNode("image", {
          src: "/static/images/leaf.png",
          style: { "position": "absolute", "left": "5%", "top": "46%", "width": "33px", "height": "33px" }
        }),
        vue.createElementVNode("p", {
          class: "text-output",
          style: { "position": "absolute", "left": "15%", "top": "46%" }
        }, "我对您的建议为:")
      ]),
      vue.createElementVNode("div", {
        class: "rounded-res",
        style: { "position": "absolute", "left": "5%", "top": "52%", "height": "10%", "width": "90%", "opacity": "0.8" }
      }, [
        vue.createElementVNode(
          "p",
          {
            class: "text-output1",
            style: { "position": "absolute", "left": "5%", "top": "3%" }
          },
          "1." + vue.toDisplayString($data.text1),
          1
          /* TEXT */
        )
      ]),
      vue.createElementVNode("div", {
        class: "rounded-res",
        style: { "position": "absolute", "left": "5%", "top": "64%", "height": "10%", "width": "90%", "opacity": "0.8" }
      }, [
        vue.createElementVNode(
          "p",
          {
            class: "text-output1",
            style: { "position": "absolute", "left": "5%", "top": "3%" }
          },
          "2." + vue.toDisplayString($data.text2),
          1
          /* TEXT */
        )
      ]),
      vue.createElementVNode("div", {
        class: "rounded-res",
        style: { "position": "absolute", "left": "5%", "top": "76%", "height": "10%", "width": "90%", "opacity": "0.8" }
      }, [
        vue.createElementVNode(
          "p",
          {
            class: "text-output1",
            style: { "position": "absolute", "left": "5%", "top": "3%" }
          },
          "3." + vue.toDisplayString($data.text3),
          1
          /* TEXT */
        )
      ]),
      vue.createElementVNode("div", {
        class: "rounded-res",
        style: { "position": "absolute", "left": "5%", "top": "88%", "height": "10%", "width": "90%", "opacity": "0.8" }
      }, [
        vue.createElementVNode(
          "p",
          {
            class: "text-output1",
            style: { "position": "absolute", "left": "5%", "top": "3%" }
          },
          "4." + vue.toDisplayString($data.text4),
          1
          /* TEXT */
        )
      ]),
      vue.createElementVNode("view", {
        class: "login-card-loginIn-btn",
        onClick: _cache[0] || (_cache[0] = (...args) => $data.fan && $data.fan(...args))
      }, " 返回聊天 ")
    ]);
  }
  const PagesResultResult = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$f], ["__file", "D:/ruangong/emosphere/pages/result/result.vue"]]);
  const _sfc_main$l = {
    data() {
      let router2 = j();
      const goToQ1 = () => {
        router2.replace("/pages/questions/answer");
      };
      const fan = () => {
        router2.replace("/pages/chat/chat");
      };
      return {
        imageUrl1: "../../static/images/back2.png",
        imageUrl2: "../../static/images/if-quote-left.png",
        imageUrl3: "../../static/images/if-quote-right.png",
        fan,
        goToQ1
      };
    }
  };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "backarea" }, [
      vue.createElementVNode("view", {
        class: "box",
        style: { "width": "100%", "height": "5%" }
      }),
      vue.createElementVNode("view", {
        class: "head-left",
        onClick: _cache[0] || (_cache[0] = (...args) => $data.fan && $data.fan(...args))
      }, [
        vue.createElementVNode("image", { src: "/static/images/fanhui.png" }),
        vue.createElementVNode("text", null, "返回")
      ]),
      vue.createElementVNode("div", { class: "image-container" }, [
        vue.createElementVNode("image", {
          src: $data.imageUrl1,
          class: "back"
        }, null, 8, ["src"]),
        vue.createElementVNode("text", { class: "text-output1" }, "EmoSphere"),
        vue.createElementVNode("text", { class: "text-output2" }, "心理测试"),
        vue.createElementVNode("text", { class: "text-output3" }, '"发现你的可能"'),
        vue.createElementVNode("text", { class: "text-output4" }, "本测试预计需要15分钟"),
        vue.createElementVNode("button", {
          class: "btn",
          onClick: _cache[1] || (_cache[1] = (...args) => $data.goToQ1 && $data.goToQ1(...args))
        }, "开始测试")
      ]),
      vue.createElementVNode("div", { class: "circle-box" }, [
        vue.createElementVNode("image", {
          src: $data.imageUrl2,
          style: { "position": "absolute", "top": "2rem", "left": "20px", "width": "8%" }
        }, null, 8, ["src"]),
        vue.createElementVNode("image", {
          src: $data.imageUrl3,
          style: { "position": "absolute", "top": "15rem", "right": "20px", "width": "8%" }
        }, null, 8, ["src"]),
        vue.createElementVNode("div", { class: "gray-bar" }),
        vue.createElementVNode("p", { class: "text-output5" }, "什么是心理测试?"),
        vue.createElementVNode("p", { class: "text-output6" }, "心理测验（mental test）是根据一定的法则和心理学原理，使用一定的操作程序给 人的认知、行为、情感的心理活动予以量化。心理测验是心理测量的工具，心理测量在心理咨询中能帮助当事 人了解自己的情绪、行为模式和人格特点。")
      ])
    ]);
  }
  const PagesHomeHome = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$e], ["__file", "D:/ruangong/emosphere/pages/home/home.vue"]]);
  const _sfc_main$k = {
    data() {
      return {
        keyboardHeight: 0,
        bottomHeight: 0,
        scrollTop: 0,
        userId: "",
        chatMsg: "",
        msgList: [
          {
            botContent: "hello，请问我有什么可以帮助你的吗？",
            recordId: 0,
            titleId: 0,
            userContent: "",
            userId: 0
          },
          {
            botContent: "",
            recordId: 0,
            titleId: 0,
            userContent: "",
            userId: 0
          }
        ]
      };
    },
    updated() {
      this.scrollToBottom();
    },
    computed: {
      windowHeight() {
        return this.rpxTopx(uni.getSystemInfoSync().windowHeight);
      },
      inputHeight() {
        return this.bottomHeight + this.keyboardHeight;
      }
    },
    onLoad() {
      uni.onKeyboardHeightChange((res) => {
        this.keyboardHeight = this.rpxTopx(res.height - 30);
        if (this.keyboardHeight < 0)
          this.keyboardHeight = 0;
      });
    },
    onUnload() {
      uni.offKeyboardHeightChange();
    },
    methods: {
      focus() {
        this.scrollToBottom();
      },
      blur() {
        this.scrollToBottom();
      },
      rpxTopx(px) {
        let deviceWidth = wx.getSystemInfoSync().windowWidth;
        let rpx = 750 / deviceWidth * Number(px);
        return Math.floor(rpx);
      },
      sendHeight() {
        setTimeout(() => {
          let query = uni.createSelectorQuery();
          query.select(".send-msg").boundingClientRect();
          query.exec((res) => {
            this.bottomHeight = this.rpxTopx(res[0].height);
          });
        }, 10);
      },
      scrollToBottom(e2) {
        setTimeout(() => {
          let query = uni.createSelectorQuery().in(this);
          query.select("#scrollview").boundingClientRect();
          query.select("#msglistview").boundingClientRect();
          query.exec((res) => {
            if (res[1].height > res[0].height) {
              this.scrollTop = this.rpxTopx(res[1].height - res[0].height);
            }
          });
        }, 15);
      },
      async handleSend() {
        if (!this.chatMsg || !/^\s+$/.test(this.chatMsg)) {
          let obj = {
            botContent: "",
            recordId: 0,
            titleId: 0,
            userContent: this.chatMsg,
            userId: 0
          };
          formatAppLog("log", "at pages/chat/chat.vue:157", this.chatMsg);
          try {
            const response = await uni.request({
              url: "http://192.168.43.143:8080/api/",
              method: "POST",
              data: {
                message: this.chatMsg
              },
              header: {
                "content-type": "application/json"
              }
            });
            const serverResponse = response.data;
            obj.botContent = serverResponse.message;
            this.msgList.push(obj);
            this.chatMsg = "";
            this.scrollToBottom();
            uni.showToast({
              title: "发送成功",
              icon: "none"
            });
            formatAppLog("log", "at pages/chat/chat.vue:179", "发送成功:", serverResponse);
          } catch (error) {
            formatAppLog("error", "at pages/chat/chat.vue:181", ":", error);
            uni.showToast({
              title: "发送消息失败",
              icon: "none"
            });
            this.$modal.showToast("发送消息失败");
          }
        } else {
          this.$modal.showToast("不能发送空白消息");
        }
      }
    }
  };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("view", { class: "box" }),
        vue.createElementVNode("view", { class: "backarea" }, [
          vue.createElementVNode("view", { class: "header" }, [
            vue.createElementVNode("navigator", { url: "/pages/main/main" }, [
              vue.createElementVNode("view", { class: "head-left" }, [
                vue.createElementVNode("image", { src: "/static/images/fanhui.jpg" }),
                vue.createElementVNode("text", null, "返回")
              ])
            ]),
            vue.createElementVNode("navigator", { url: "/pages/home/home" }, [
              vue.createElementVNode("view", { class: "head-right" }, [
                vue.createElementVNode("image", { src: "/static/images/test.png" }),
                vue.createElementVNode("text", null, "测试")
              ])
            ])
          ]),
          vue.createElementVNode("view", { class: "chat" }, [
            vue.createElementVNode("scroll-view", {
              style: vue.normalizeStyle({ height: `${$options.windowHeight - $options.inputHeight}rpx` }),
              id: "scrollview",
              "scroll-y": "true",
              "scroll-top": $data.scrollTop,
              class: "scroll-view"
            }, [
              vue.createCommentVNode(" 聊天主体 "),
              vue.createElementVNode("view", {
                id: "msglistview",
                class: "chat-body"
              }, [
                vue.createCommentVNode(" 聊天记录 "),
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($data.msgList, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", { key: index }, [
                      vue.createCommentVNode(" 自己发的消息 "),
                      item.userContent != "" ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 0,
                        class: "item self"
                      }, [
                        vue.createCommentVNode(" 文字内容 "),
                        vue.createElementVNode(
                          "view",
                          { class: "content right" },
                          vue.toDisplayString(item.userContent),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode("view", { class: "avatar" }, [
                          vue.createElementVNode("image", { src: "/static/images/logo.png" })
                        ])
                      ])) : vue.createCommentVNode("v-if", true),
                      vue.createCommentVNode(" 机器人发的消息 "),
                      item.botContent != "" ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 1,
                        class: "item Ai"
                      }, [
                        vue.createCommentVNode(" 头像 "),
                        vue.createElementVNode("view", { class: "avatar" }, [
                          vue.createElementVNode("image", { src: "/static/images/ai.png" })
                        ]),
                        vue.createCommentVNode(" 文字内容 "),
                        vue.createElementVNode(
                          "view",
                          { class: "content left" },
                          vue.toDisplayString(item.botContent),
                          1
                          /* TEXT */
                        )
                      ])) : vue.createCommentVNode("v-if", true)
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])
            ], 12, ["scroll-top"]),
            vue.createElementVNode(
              "view",
              {
                class: "chat-bottom",
                style: vue.normalizeStyle({ height: `${$options.inputHeight}rpx` })
              },
              [
                vue.createElementVNode(
                  "view",
                  {
                    class: "send-msg",
                    style: vue.normalizeStyle({ bottom: `${$data.keyboardHeight}rpx` })
                  },
                  [
                    vue.createElementVNode("view", { class: "uni-textarea" }, [
                      vue.withDirectives(vue.createElementVNode(
                        "textarea",
                        {
                          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.chatMsg = $event),
                          maxlength: "300",
                          "confirm-type": "send",
                          onConfirm: _cache[1] || (_cache[1] = (...args) => $options.handleSend && $options.handleSend(...args)),
                          "show-confirm-bar": false,
                          "adjust-position": false,
                          onLinechange: _cache[2] || (_cache[2] = (...args) => $options.sendHeight && $options.sendHeight(...args)),
                          onFocus: _cache[3] || (_cache[3] = (...args) => $options.focus && $options.focus(...args)),
                          onBlur: _cache[4] || (_cache[4] = (...args) => $options.blur && $options.blur(...args)),
                          "auto-height": ""
                        },
                        null,
                        544
                        /* HYDRATE_EVENTS, NEED_PATCH */
                      ), [
                        [vue.vModelText, $data.chatMsg]
                      ])
                    ]),
                    vue.createElementVNode("button", {
                      onClick: _cache[5] || (_cache[5] = (...args) => $options.handleSend && $options.handleSend(...args)),
                      class: "send-btn"
                    }, "发送")
                  ],
                  4
                  /* STYLE */
                )
              ],
              4
              /* STYLE */
            )
          ])
        ])
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesChatChat = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$d], ["__scopeId", "data-v-0a633310"], ["__file", "D:/ruangong/emosphere/pages/chat/chat.vue"]]);
  const icons$1 = {
    "id": "2852637",
    "name": "uniui图标库",
    "font_family": "uniicons",
    "css_prefix_text": "uniui-",
    "description": "",
    "glyphs": [
      {
        "icon_id": "25027049",
        "name": "yanse",
        "font_class": "color",
        "unicode": "e6cf",
        "unicode_decimal": 59087
      },
      {
        "icon_id": "25027048",
        "name": "wallet",
        "font_class": "wallet",
        "unicode": "e6b1",
        "unicode_decimal": 59057
      },
      {
        "icon_id": "25015720",
        "name": "settings-filled",
        "font_class": "settings-filled",
        "unicode": "e6ce",
        "unicode_decimal": 59086
      },
      {
        "icon_id": "25015434",
        "name": "shimingrenzheng-filled",
        "font_class": "auth-filled",
        "unicode": "e6cc",
        "unicode_decimal": 59084
      },
      {
        "icon_id": "24934246",
        "name": "shop-filled",
        "font_class": "shop-filled",
        "unicode": "e6cd",
        "unicode_decimal": 59085
      },
      {
        "icon_id": "24934159",
        "name": "staff-filled-01",
        "font_class": "staff-filled",
        "unicode": "e6cb",
        "unicode_decimal": 59083
      },
      {
        "icon_id": "24932461",
        "name": "VIP-filled",
        "font_class": "vip-filled",
        "unicode": "e6c6",
        "unicode_decimal": 59078
      },
      {
        "icon_id": "24932462",
        "name": "plus_circle_fill",
        "font_class": "plus-filled",
        "unicode": "e6c7",
        "unicode_decimal": 59079
      },
      {
        "icon_id": "24932463",
        "name": "folder_add-filled",
        "font_class": "folder-add-filled",
        "unicode": "e6c8",
        "unicode_decimal": 59080
      },
      {
        "icon_id": "24932464",
        "name": "yanse-filled",
        "font_class": "color-filled",
        "unicode": "e6c9",
        "unicode_decimal": 59081
      },
      {
        "icon_id": "24932465",
        "name": "tune-filled",
        "font_class": "tune-filled",
        "unicode": "e6ca",
        "unicode_decimal": 59082
      },
      {
        "icon_id": "24932455",
        "name": "a-rilidaka-filled",
        "font_class": "calendar-filled",
        "unicode": "e6c0",
        "unicode_decimal": 59072
      },
      {
        "icon_id": "24932456",
        "name": "notification-filled",
        "font_class": "notification-filled",
        "unicode": "e6c1",
        "unicode_decimal": 59073
      },
      {
        "icon_id": "24932457",
        "name": "wallet-filled",
        "font_class": "wallet-filled",
        "unicode": "e6c2",
        "unicode_decimal": 59074
      },
      {
        "icon_id": "24932458",
        "name": "paihangbang-filled",
        "font_class": "medal-filled",
        "unicode": "e6c3",
        "unicode_decimal": 59075
      },
      {
        "icon_id": "24932459",
        "name": "gift-filled",
        "font_class": "gift-filled",
        "unicode": "e6c4",
        "unicode_decimal": 59076
      },
      {
        "icon_id": "24932460",
        "name": "fire-filled",
        "font_class": "fire-filled",
        "unicode": "e6c5",
        "unicode_decimal": 59077
      },
      {
        "icon_id": "24928001",
        "name": "refreshempty",
        "font_class": "refreshempty",
        "unicode": "e6bf",
        "unicode_decimal": 59071
      },
      {
        "icon_id": "24926853",
        "name": "location-ellipse",
        "font_class": "location-filled",
        "unicode": "e6af",
        "unicode_decimal": 59055
      },
      {
        "icon_id": "24926735",
        "name": "person-filled",
        "font_class": "person-filled",
        "unicode": "e69d",
        "unicode_decimal": 59037
      },
      {
        "icon_id": "24926703",
        "name": "personadd-filled",
        "font_class": "personadd-filled",
        "unicode": "e698",
        "unicode_decimal": 59032
      },
      {
        "icon_id": "24923351",
        "name": "back",
        "font_class": "back",
        "unicode": "e6b9",
        "unicode_decimal": 59065
      },
      {
        "icon_id": "24923352",
        "name": "forward",
        "font_class": "forward",
        "unicode": "e6ba",
        "unicode_decimal": 59066
      },
      {
        "icon_id": "24923353",
        "name": "arrowthinright",
        "font_class": "arrow-right",
        "unicode": "e6bb",
        "unicode_decimal": 59067
      },
      {
        "icon_id": "24923353",
        "name": "arrowthinright",
        "font_class": "arrowthinright",
        "unicode": "e6bb",
        "unicode_decimal": 59067
      },
      {
        "icon_id": "24923354",
        "name": "arrowthinleft",
        "font_class": "arrow-left",
        "unicode": "e6bc",
        "unicode_decimal": 59068
      },
      {
        "icon_id": "24923354",
        "name": "arrowthinleft",
        "font_class": "arrowthinleft",
        "unicode": "e6bc",
        "unicode_decimal": 59068
      },
      {
        "icon_id": "24923355",
        "name": "arrowthinup",
        "font_class": "arrow-up",
        "unicode": "e6bd",
        "unicode_decimal": 59069
      },
      {
        "icon_id": "24923355",
        "name": "arrowthinup",
        "font_class": "arrowthinup",
        "unicode": "e6bd",
        "unicode_decimal": 59069
      },
      {
        "icon_id": "24923356",
        "name": "arrowthindown",
        "font_class": "arrow-down",
        "unicode": "e6be",
        "unicode_decimal": 59070
      },
      {
        "icon_id": "24923356",
        "name": "arrowthindown",
        "font_class": "arrowthindown",
        "unicode": "e6be",
        "unicode_decimal": 59070
      },
      {
        "icon_id": "24923349",
        "name": "arrowdown",
        "font_class": "bottom",
        "unicode": "e6b8",
        "unicode_decimal": 59064
      },
      {
        "icon_id": "24923349",
        "name": "arrowdown",
        "font_class": "arrowdown",
        "unicode": "e6b8",
        "unicode_decimal": 59064
      },
      {
        "icon_id": "24923346",
        "name": "arrowright",
        "font_class": "right",
        "unicode": "e6b5",
        "unicode_decimal": 59061
      },
      {
        "icon_id": "24923346",
        "name": "arrowright",
        "font_class": "arrowright",
        "unicode": "e6b5",
        "unicode_decimal": 59061
      },
      {
        "icon_id": "24923347",
        "name": "arrowup",
        "font_class": "top",
        "unicode": "e6b6",
        "unicode_decimal": 59062
      },
      {
        "icon_id": "24923347",
        "name": "arrowup",
        "font_class": "arrowup",
        "unicode": "e6b6",
        "unicode_decimal": 59062
      },
      {
        "icon_id": "24923348",
        "name": "arrowleft",
        "font_class": "left",
        "unicode": "e6b7",
        "unicode_decimal": 59063
      },
      {
        "icon_id": "24923348",
        "name": "arrowleft",
        "font_class": "arrowleft",
        "unicode": "e6b7",
        "unicode_decimal": 59063
      },
      {
        "icon_id": "24923334",
        "name": "eye",
        "font_class": "eye",
        "unicode": "e651",
        "unicode_decimal": 58961
      },
      {
        "icon_id": "24923335",
        "name": "eye-filled",
        "font_class": "eye-filled",
        "unicode": "e66a",
        "unicode_decimal": 58986
      },
      {
        "icon_id": "24923336",
        "name": "eye-slash",
        "font_class": "eye-slash",
        "unicode": "e6b3",
        "unicode_decimal": 59059
      },
      {
        "icon_id": "24923337",
        "name": "eye-slash-filled",
        "font_class": "eye-slash-filled",
        "unicode": "e6b4",
        "unicode_decimal": 59060
      },
      {
        "icon_id": "24923305",
        "name": "info-filled",
        "font_class": "info-filled",
        "unicode": "e649",
        "unicode_decimal": 58953
      },
      {
        "icon_id": "24923299",
        "name": "reload-01",
        "font_class": "reload",
        "unicode": "e6b2",
        "unicode_decimal": 59058
      },
      {
        "icon_id": "24923195",
        "name": "mic_slash_fill",
        "font_class": "micoff-filled",
        "unicode": "e6b0",
        "unicode_decimal": 59056
      },
      {
        "icon_id": "24923165",
        "name": "map-pin-ellipse",
        "font_class": "map-pin-ellipse",
        "unicode": "e6ac",
        "unicode_decimal": 59052
      },
      {
        "icon_id": "24923166",
        "name": "map-pin",
        "font_class": "map-pin",
        "unicode": "e6ad",
        "unicode_decimal": 59053
      },
      {
        "icon_id": "24923167",
        "name": "location",
        "font_class": "location",
        "unicode": "e6ae",
        "unicode_decimal": 59054
      },
      {
        "icon_id": "24923064",
        "name": "starhalf",
        "font_class": "starhalf",
        "unicode": "e683",
        "unicode_decimal": 59011
      },
      {
        "icon_id": "24923065",
        "name": "star",
        "font_class": "star",
        "unicode": "e688",
        "unicode_decimal": 59016
      },
      {
        "icon_id": "24923066",
        "name": "star-filled",
        "font_class": "star-filled",
        "unicode": "e68f",
        "unicode_decimal": 59023
      },
      {
        "icon_id": "24899646",
        "name": "a-rilidaka",
        "font_class": "calendar",
        "unicode": "e6a0",
        "unicode_decimal": 59040
      },
      {
        "icon_id": "24899647",
        "name": "fire",
        "font_class": "fire",
        "unicode": "e6a1",
        "unicode_decimal": 59041
      },
      {
        "icon_id": "24899648",
        "name": "paihangbang",
        "font_class": "medal",
        "unicode": "e6a2",
        "unicode_decimal": 59042
      },
      {
        "icon_id": "24899649",
        "name": "font",
        "font_class": "font",
        "unicode": "e6a3",
        "unicode_decimal": 59043
      },
      {
        "icon_id": "24899650",
        "name": "gift",
        "font_class": "gift",
        "unicode": "e6a4",
        "unicode_decimal": 59044
      },
      {
        "icon_id": "24899651",
        "name": "link",
        "font_class": "link",
        "unicode": "e6a5",
        "unicode_decimal": 59045
      },
      {
        "icon_id": "24899652",
        "name": "notification",
        "font_class": "notification",
        "unicode": "e6a6",
        "unicode_decimal": 59046
      },
      {
        "icon_id": "24899653",
        "name": "staff",
        "font_class": "staff",
        "unicode": "e6a7",
        "unicode_decimal": 59047
      },
      {
        "icon_id": "24899654",
        "name": "VIP",
        "font_class": "vip",
        "unicode": "e6a8",
        "unicode_decimal": 59048
      },
      {
        "icon_id": "24899655",
        "name": "folder_add",
        "font_class": "folder-add",
        "unicode": "e6a9",
        "unicode_decimal": 59049
      },
      {
        "icon_id": "24899656",
        "name": "tune",
        "font_class": "tune",
        "unicode": "e6aa",
        "unicode_decimal": 59050
      },
      {
        "icon_id": "24899657",
        "name": "shimingrenzheng",
        "font_class": "auth",
        "unicode": "e6ab",
        "unicode_decimal": 59051
      },
      {
        "icon_id": "24899565",
        "name": "person",
        "font_class": "person",
        "unicode": "e699",
        "unicode_decimal": 59033
      },
      {
        "icon_id": "24899566",
        "name": "email-filled",
        "font_class": "email-filled",
        "unicode": "e69a",
        "unicode_decimal": 59034
      },
      {
        "icon_id": "24899567",
        "name": "phone-filled",
        "font_class": "phone-filled",
        "unicode": "e69b",
        "unicode_decimal": 59035
      },
      {
        "icon_id": "24899568",
        "name": "phone",
        "font_class": "phone",
        "unicode": "e69c",
        "unicode_decimal": 59036
      },
      {
        "icon_id": "24899570",
        "name": "email",
        "font_class": "email",
        "unicode": "e69e",
        "unicode_decimal": 59038
      },
      {
        "icon_id": "24899571",
        "name": "personadd",
        "font_class": "personadd",
        "unicode": "e69f",
        "unicode_decimal": 59039
      },
      {
        "icon_id": "24899558",
        "name": "chatboxes-filled",
        "font_class": "chatboxes-filled",
        "unicode": "e692",
        "unicode_decimal": 59026
      },
      {
        "icon_id": "24899559",
        "name": "contact",
        "font_class": "contact",
        "unicode": "e693",
        "unicode_decimal": 59027
      },
      {
        "icon_id": "24899560",
        "name": "chatbubble-filled",
        "font_class": "chatbubble-filled",
        "unicode": "e694",
        "unicode_decimal": 59028
      },
      {
        "icon_id": "24899561",
        "name": "contact-filled",
        "font_class": "contact-filled",
        "unicode": "e695",
        "unicode_decimal": 59029
      },
      {
        "icon_id": "24899562",
        "name": "chatboxes",
        "font_class": "chatboxes",
        "unicode": "e696",
        "unicode_decimal": 59030
      },
      {
        "icon_id": "24899563",
        "name": "chatbubble",
        "font_class": "chatbubble",
        "unicode": "e697",
        "unicode_decimal": 59031
      },
      {
        "icon_id": "24881290",
        "name": "upload-filled",
        "font_class": "upload-filled",
        "unicode": "e68e",
        "unicode_decimal": 59022
      },
      {
        "icon_id": "24881292",
        "name": "upload",
        "font_class": "upload",
        "unicode": "e690",
        "unicode_decimal": 59024
      },
      {
        "icon_id": "24881293",
        "name": "weixin",
        "font_class": "weixin",
        "unicode": "e691",
        "unicode_decimal": 59025
      },
      {
        "icon_id": "24881274",
        "name": "compose",
        "font_class": "compose",
        "unicode": "e67f",
        "unicode_decimal": 59007
      },
      {
        "icon_id": "24881275",
        "name": "qq",
        "font_class": "qq",
        "unicode": "e680",
        "unicode_decimal": 59008
      },
      {
        "icon_id": "24881276",
        "name": "download-filled",
        "font_class": "download-filled",
        "unicode": "e681",
        "unicode_decimal": 59009
      },
      {
        "icon_id": "24881277",
        "name": "pengyouquan",
        "font_class": "pyq",
        "unicode": "e682",
        "unicode_decimal": 59010
      },
      {
        "icon_id": "24881279",
        "name": "sound",
        "font_class": "sound",
        "unicode": "e684",
        "unicode_decimal": 59012
      },
      {
        "icon_id": "24881280",
        "name": "trash-filled",
        "font_class": "trash-filled",
        "unicode": "e685",
        "unicode_decimal": 59013
      },
      {
        "icon_id": "24881281",
        "name": "sound-filled",
        "font_class": "sound-filled",
        "unicode": "e686",
        "unicode_decimal": 59014
      },
      {
        "icon_id": "24881282",
        "name": "trash",
        "font_class": "trash",
        "unicode": "e687",
        "unicode_decimal": 59015
      },
      {
        "icon_id": "24881284",
        "name": "videocam-filled",
        "font_class": "videocam-filled",
        "unicode": "e689",
        "unicode_decimal": 59017
      },
      {
        "icon_id": "24881285",
        "name": "spinner-cycle",
        "font_class": "spinner-cycle",
        "unicode": "e68a",
        "unicode_decimal": 59018
      },
      {
        "icon_id": "24881286",
        "name": "weibo",
        "font_class": "weibo",
        "unicode": "e68b",
        "unicode_decimal": 59019
      },
      {
        "icon_id": "24881288",
        "name": "videocam",
        "font_class": "videocam",
        "unicode": "e68c",
        "unicode_decimal": 59020
      },
      {
        "icon_id": "24881289",
        "name": "download",
        "font_class": "download",
        "unicode": "e68d",
        "unicode_decimal": 59021
      },
      {
        "icon_id": "24879601",
        "name": "help",
        "font_class": "help",
        "unicode": "e679",
        "unicode_decimal": 59001
      },
      {
        "icon_id": "24879602",
        "name": "navigate-filled",
        "font_class": "navigate-filled",
        "unicode": "e67a",
        "unicode_decimal": 59002
      },
      {
        "icon_id": "24879603",
        "name": "plusempty",
        "font_class": "plusempty",
        "unicode": "e67b",
        "unicode_decimal": 59003
      },
      {
        "icon_id": "24879604",
        "name": "smallcircle",
        "font_class": "smallcircle",
        "unicode": "e67c",
        "unicode_decimal": 59004
      },
      {
        "icon_id": "24879605",
        "name": "minus-filled",
        "font_class": "minus-filled",
        "unicode": "e67d",
        "unicode_decimal": 59005
      },
      {
        "icon_id": "24879606",
        "name": "micoff",
        "font_class": "micoff",
        "unicode": "e67e",
        "unicode_decimal": 59006
      },
      {
        "icon_id": "24879588",
        "name": "closeempty",
        "font_class": "closeempty",
        "unicode": "e66c",
        "unicode_decimal": 58988
      },
      {
        "icon_id": "24879589",
        "name": "clear",
        "font_class": "clear",
        "unicode": "e66d",
        "unicode_decimal": 58989
      },
      {
        "icon_id": "24879590",
        "name": "navigate",
        "font_class": "navigate",
        "unicode": "e66e",
        "unicode_decimal": 58990
      },
      {
        "icon_id": "24879591",
        "name": "minus",
        "font_class": "minus",
        "unicode": "e66f",
        "unicode_decimal": 58991
      },
      {
        "icon_id": "24879592",
        "name": "image",
        "font_class": "image",
        "unicode": "e670",
        "unicode_decimal": 58992
      },
      {
        "icon_id": "24879593",
        "name": "mic",
        "font_class": "mic",
        "unicode": "e671",
        "unicode_decimal": 58993
      },
      {
        "icon_id": "24879594",
        "name": "paperplane",
        "font_class": "paperplane",
        "unicode": "e672",
        "unicode_decimal": 58994
      },
      {
        "icon_id": "24879595",
        "name": "close",
        "font_class": "close",
        "unicode": "e673",
        "unicode_decimal": 58995
      },
      {
        "icon_id": "24879596",
        "name": "help-filled",
        "font_class": "help-filled",
        "unicode": "e674",
        "unicode_decimal": 58996
      },
      {
        "icon_id": "24879597",
        "name": "plus-filled",
        "font_class": "paperplane-filled",
        "unicode": "e675",
        "unicode_decimal": 58997
      },
      {
        "icon_id": "24879598",
        "name": "plus",
        "font_class": "plus",
        "unicode": "e676",
        "unicode_decimal": 58998
      },
      {
        "icon_id": "24879599",
        "name": "mic-filled",
        "font_class": "mic-filled",
        "unicode": "e677",
        "unicode_decimal": 58999
      },
      {
        "icon_id": "24879600",
        "name": "image-filled",
        "font_class": "image-filled",
        "unicode": "e678",
        "unicode_decimal": 59e3
      },
      {
        "icon_id": "24855900",
        "name": "locked-filled",
        "font_class": "locked-filled",
        "unicode": "e668",
        "unicode_decimal": 58984
      },
      {
        "icon_id": "24855901",
        "name": "info",
        "font_class": "info",
        "unicode": "e669",
        "unicode_decimal": 58985
      },
      {
        "icon_id": "24855903",
        "name": "locked",
        "font_class": "locked",
        "unicode": "e66b",
        "unicode_decimal": 58987
      },
      {
        "icon_id": "24855884",
        "name": "camera-filled",
        "font_class": "camera-filled",
        "unicode": "e658",
        "unicode_decimal": 58968
      },
      {
        "icon_id": "24855885",
        "name": "chat-filled",
        "font_class": "chat-filled",
        "unicode": "e659",
        "unicode_decimal": 58969
      },
      {
        "icon_id": "24855886",
        "name": "camera",
        "font_class": "camera",
        "unicode": "e65a",
        "unicode_decimal": 58970
      },
      {
        "icon_id": "24855887",
        "name": "circle",
        "font_class": "circle",
        "unicode": "e65b",
        "unicode_decimal": 58971
      },
      {
        "icon_id": "24855888",
        "name": "checkmarkempty",
        "font_class": "checkmarkempty",
        "unicode": "e65c",
        "unicode_decimal": 58972
      },
      {
        "icon_id": "24855889",
        "name": "chat",
        "font_class": "chat",
        "unicode": "e65d",
        "unicode_decimal": 58973
      },
      {
        "icon_id": "24855890",
        "name": "circle-filled",
        "font_class": "circle-filled",
        "unicode": "e65e",
        "unicode_decimal": 58974
      },
      {
        "icon_id": "24855891",
        "name": "flag",
        "font_class": "flag",
        "unicode": "e65f",
        "unicode_decimal": 58975
      },
      {
        "icon_id": "24855892",
        "name": "flag-filled",
        "font_class": "flag-filled",
        "unicode": "e660",
        "unicode_decimal": 58976
      },
      {
        "icon_id": "24855893",
        "name": "gear-filled",
        "font_class": "gear-filled",
        "unicode": "e661",
        "unicode_decimal": 58977
      },
      {
        "icon_id": "24855894",
        "name": "home",
        "font_class": "home",
        "unicode": "e662",
        "unicode_decimal": 58978
      },
      {
        "icon_id": "24855895",
        "name": "home-filled",
        "font_class": "home-filled",
        "unicode": "e663",
        "unicode_decimal": 58979
      },
      {
        "icon_id": "24855896",
        "name": "gear",
        "font_class": "gear",
        "unicode": "e664",
        "unicode_decimal": 58980
      },
      {
        "icon_id": "24855897",
        "name": "smallcircle-filled",
        "font_class": "smallcircle-filled",
        "unicode": "e665",
        "unicode_decimal": 58981
      },
      {
        "icon_id": "24855898",
        "name": "map-filled",
        "font_class": "map-filled",
        "unicode": "e666",
        "unicode_decimal": 58982
      },
      {
        "icon_id": "24855899",
        "name": "map",
        "font_class": "map",
        "unicode": "e667",
        "unicode_decimal": 58983
      },
      {
        "icon_id": "24855825",
        "name": "refresh-filled",
        "font_class": "refresh-filled",
        "unicode": "e656",
        "unicode_decimal": 58966
      },
      {
        "icon_id": "24855826",
        "name": "refresh",
        "font_class": "refresh",
        "unicode": "e657",
        "unicode_decimal": 58967
      },
      {
        "icon_id": "24855808",
        "name": "cloud-upload",
        "font_class": "cloud-upload",
        "unicode": "e645",
        "unicode_decimal": 58949
      },
      {
        "icon_id": "24855809",
        "name": "cloud-download-filled",
        "font_class": "cloud-download-filled",
        "unicode": "e646",
        "unicode_decimal": 58950
      },
      {
        "icon_id": "24855810",
        "name": "cloud-download",
        "font_class": "cloud-download",
        "unicode": "e647",
        "unicode_decimal": 58951
      },
      {
        "icon_id": "24855811",
        "name": "cloud-upload-filled",
        "font_class": "cloud-upload-filled",
        "unicode": "e648",
        "unicode_decimal": 58952
      },
      {
        "icon_id": "24855813",
        "name": "redo",
        "font_class": "redo",
        "unicode": "e64a",
        "unicode_decimal": 58954
      },
      {
        "icon_id": "24855814",
        "name": "images-filled",
        "font_class": "images-filled",
        "unicode": "e64b",
        "unicode_decimal": 58955
      },
      {
        "icon_id": "24855815",
        "name": "undo-filled",
        "font_class": "undo-filled",
        "unicode": "e64c",
        "unicode_decimal": 58956
      },
      {
        "icon_id": "24855816",
        "name": "more",
        "font_class": "more",
        "unicode": "e64d",
        "unicode_decimal": 58957
      },
      {
        "icon_id": "24855817",
        "name": "more-filled",
        "font_class": "more-filled",
        "unicode": "e64e",
        "unicode_decimal": 58958
      },
      {
        "icon_id": "24855818",
        "name": "undo",
        "font_class": "undo",
        "unicode": "e64f",
        "unicode_decimal": 58959
      },
      {
        "icon_id": "24855819",
        "name": "images",
        "font_class": "images",
        "unicode": "e650",
        "unicode_decimal": 58960
      },
      {
        "icon_id": "24855821",
        "name": "paperclip",
        "font_class": "paperclip",
        "unicode": "e652",
        "unicode_decimal": 58962
      },
      {
        "icon_id": "24855822",
        "name": "settings",
        "font_class": "settings",
        "unicode": "e653",
        "unicode_decimal": 58963
      },
      {
        "icon_id": "24855823",
        "name": "search",
        "font_class": "search",
        "unicode": "e654",
        "unicode_decimal": 58964
      },
      {
        "icon_id": "24855824",
        "name": "redo-filled",
        "font_class": "redo-filled",
        "unicode": "e655",
        "unicode_decimal": 58965
      },
      {
        "icon_id": "24841702",
        "name": "list",
        "font_class": "list",
        "unicode": "e644",
        "unicode_decimal": 58948
      },
      {
        "icon_id": "24841489",
        "name": "mail-open-filled",
        "font_class": "mail-open-filled",
        "unicode": "e63a",
        "unicode_decimal": 58938
      },
      {
        "icon_id": "24841491",
        "name": "hand-thumbsdown-filled",
        "font_class": "hand-down-filled",
        "unicode": "e63c",
        "unicode_decimal": 58940
      },
      {
        "icon_id": "24841492",
        "name": "hand-thumbsdown",
        "font_class": "hand-down",
        "unicode": "e63d",
        "unicode_decimal": 58941
      },
      {
        "icon_id": "24841493",
        "name": "hand-thumbsup-filled",
        "font_class": "hand-up-filled",
        "unicode": "e63e",
        "unicode_decimal": 58942
      },
      {
        "icon_id": "24841494",
        "name": "hand-thumbsup",
        "font_class": "hand-up",
        "unicode": "e63f",
        "unicode_decimal": 58943
      },
      {
        "icon_id": "24841496",
        "name": "heart-filled",
        "font_class": "heart-filled",
        "unicode": "e641",
        "unicode_decimal": 58945
      },
      {
        "icon_id": "24841498",
        "name": "mail-open",
        "font_class": "mail-open",
        "unicode": "e643",
        "unicode_decimal": 58947
      },
      {
        "icon_id": "24841488",
        "name": "heart",
        "font_class": "heart",
        "unicode": "e639",
        "unicode_decimal": 58937
      },
      {
        "icon_id": "24839963",
        "name": "loop",
        "font_class": "loop",
        "unicode": "e633",
        "unicode_decimal": 58931
      },
      {
        "icon_id": "24839866",
        "name": "pulldown",
        "font_class": "pulldown",
        "unicode": "e632",
        "unicode_decimal": 58930
      },
      {
        "icon_id": "24813798",
        "name": "scan",
        "font_class": "scan",
        "unicode": "e62a",
        "unicode_decimal": 58922
      },
      {
        "icon_id": "24813786",
        "name": "bars",
        "font_class": "bars",
        "unicode": "e627",
        "unicode_decimal": 58919
      },
      {
        "icon_id": "24813788",
        "name": "cart-filled",
        "font_class": "cart-filled",
        "unicode": "e629",
        "unicode_decimal": 58921
      },
      {
        "icon_id": "24813790",
        "name": "checkbox",
        "font_class": "checkbox",
        "unicode": "e62b",
        "unicode_decimal": 58923
      },
      {
        "icon_id": "24813791",
        "name": "checkbox-filled",
        "font_class": "checkbox-filled",
        "unicode": "e62c",
        "unicode_decimal": 58924
      },
      {
        "icon_id": "24813794",
        "name": "shop",
        "font_class": "shop",
        "unicode": "e62f",
        "unicode_decimal": 58927
      },
      {
        "icon_id": "24813795",
        "name": "headphones",
        "font_class": "headphones",
        "unicode": "e630",
        "unicode_decimal": 58928
      },
      {
        "icon_id": "24813796",
        "name": "cart",
        "font_class": "cart",
        "unicode": "e631",
        "unicode_decimal": 58929
      }
    ]
  };
  const getVal = (val) => {
    const reg = /^[0-9]*$/g;
    return typeof val === "number" || reg.test(val) ? val + "px" : val;
  };
  const _sfc_main$j = {
    name: "UniIcons",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: "#333333"
      },
      size: {
        type: [Number, String],
        default: 16
      },
      customPrefix: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        icons: icons$1.glyphs
      };
    },
    computed: {
      unicode() {
        let code = this.icons.find((v2) => v2.font_class === this.type);
        if (code) {
          return unescape(`%u${code.unicode}`);
        }
        return "";
      },
      iconSize() {
        return getVal(this.size);
      }
    },
    methods: {
      _onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "text",
      {
        style: vue.normalizeStyle({ color: $props.color, "font-size": $options.iconSize }),
        class: vue.normalizeClass(["uni-icons", ["uniui-" + $props.type, $props.customPrefix, $props.customPrefix ? $props.type : ""]]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options._onClick && $options._onClick(...args))
      },
      null,
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$c], ["__scopeId", "data-v-d31e1c47"], ["__file", "D:/ruangong/emosphere/uni_modules/uni-icons/components/uni-icons/uni-icons.vue"]]);
  let Calendar$1 = class Calendar {
    constructor({
      selected,
      startDate,
      endDate,
      range
    } = {}) {
      this.date = this.getDateObj(/* @__PURE__ */ new Date());
      this.selected = selected || [];
      this.startDate = startDate;
      this.endDate = endDate;
      this.range = range;
      this.cleanMultipleStatus();
      this.weeks = {};
      this.lastHover = false;
    }
    /**
     * 设置日期
     * @param {Object} date
     */
    setDate(date) {
      const selectDate = this.getDateObj(date);
      this.getWeeks(selectDate.fullDate);
    }
    /**
     * 清理多选状态
     */
    cleanMultipleStatus() {
      this.multipleStatus = {
        before: "",
        after: "",
        data: []
      };
    }
    setStartDate(startDate) {
      this.startDate = startDate;
    }
    setEndDate(endDate) {
      this.endDate = endDate;
    }
    getPreMonthObj(date) {
      date = fixIosDateFormat(date);
      date = new Date(date);
      const oldMonth = date.getMonth();
      date.setMonth(oldMonth - 1);
      const newMonth = date.getMonth();
      if (oldMonth !== 0 && newMonth - oldMonth === 0) {
        date.setMonth(newMonth - 1);
      }
      return this.getDateObj(date);
    }
    getNextMonthObj(date) {
      date = fixIosDateFormat(date);
      date = new Date(date);
      const oldMonth = date.getMonth();
      date.setMonth(oldMonth + 1);
      const newMonth = date.getMonth();
      if (newMonth - oldMonth > 1) {
        date.setMonth(newMonth - 1);
      }
      return this.getDateObj(date);
    }
    /**
     * 获取指定格式Date对象
     */
    getDateObj(date) {
      date = fixIosDateFormat(date);
      date = new Date(date);
      return {
        fullDate: getDate(date),
        year: date.getFullYear(),
        month: addZero(date.getMonth() + 1),
        date: addZero(date.getDate()),
        day: date.getDay()
      };
    }
    /**
     * 获取上一个月日期集合
     */
    getPreMonthDays(amount, dateObj) {
      const result = [];
      for (let i2 = amount - 1; i2 >= 0; i2--) {
        const month = dateObj.month - 1;
        result.push({
          date: new Date(dateObj.year, month, -i2).getDate(),
          month,
          disable: true
        });
      }
      return result;
    }
    /**
     * 获取本月日期集合
     */
    getCurrentMonthDays(amount, dateObj) {
      const result = [];
      const fullDate = this.date.fullDate;
      for (let i2 = 1; i2 <= amount; i2++) {
        const currentDate = `${dateObj.year}-${dateObj.month}-${addZero(i2)}`;
        const isToday = fullDate === currentDate;
        const info = this.selected && this.selected.find((item) => {
          if (this.dateEqual(currentDate, item.date)) {
            return item;
          }
        });
        if (this.startDate) {
          dateCompare(this.startDate, currentDate);
        }
        if (this.endDate) {
          dateCompare(currentDate, this.endDate);
        }
        let multiples = this.multipleStatus.data;
        let multiplesStatus = -1;
        if (this.range && multiples) {
          multiplesStatus = multiples.findIndex((item) => {
            return this.dateEqual(item, currentDate);
          });
        }
        const checked = multiplesStatus !== -1;
        result.push({
          fullDate: currentDate,
          year: dateObj.year,
          date: i2,
          multiple: this.range ? checked : false,
          beforeMultiple: this.isLogicBefore(currentDate, this.multipleStatus.before, this.multipleStatus.after),
          afterMultiple: this.isLogicAfter(currentDate, this.multipleStatus.before, this.multipleStatus.after),
          month: dateObj.month,
          disable: this.startDate && !dateCompare(this.startDate, currentDate) || this.endDate && !dateCompare(currentDate, this.endDate),
          isToday,
          userChecked: false,
          extraInfo: info
        });
      }
      return result;
    }
    /**
     * 获取下一个月日期集合
     */
    _getNextMonthDays(amount, dateObj) {
      const result = [];
      const month = dateObj.month + 1;
      for (let i2 = 1; i2 <= amount; i2++) {
        result.push({
          date: i2,
          month,
          disable: true
        });
      }
      return result;
    }
    /**
     * 获取当前日期详情
     * @param {Object} date
     */
    getInfo(date) {
      if (!date) {
        date = /* @__PURE__ */ new Date();
      }
      return this.calendar.find((item) => item.fullDate === this.getDateObj(date).fullDate);
    }
    /**
     * 比较时间是否相等
     */
    dateEqual(before, after) {
      before = new Date(fixIosDateFormat(before));
      after = new Date(fixIosDateFormat(after));
      return before.valueOf() === after.valueOf();
    }
    /**
     *  比较真实起始日期
     */
    isLogicBefore(currentDate, before, after) {
      let logicBefore = before;
      if (before && after) {
        logicBefore = dateCompare(before, after) ? before : after;
      }
      return this.dateEqual(logicBefore, currentDate);
    }
    isLogicAfter(currentDate, before, after) {
      let logicAfter = after;
      if (before && after) {
        logicAfter = dateCompare(before, after) ? after : before;
      }
      return this.dateEqual(logicAfter, currentDate);
    }
    /**
     * 获取日期范围内所有日期
     * @param {Object} begin
     * @param {Object} end
     */
    geDateAll(begin, end) {
      var arr = [];
      var ab = begin.split("-");
      var ae = end.split("-");
      var db = /* @__PURE__ */ new Date();
      db.setFullYear(ab[0], ab[1] - 1, ab[2]);
      var de = /* @__PURE__ */ new Date();
      de.setFullYear(ae[0], ae[1] - 1, ae[2]);
      var unixDb = db.getTime() - 24 * 60 * 60 * 1e3;
      var unixDe = de.getTime() - 24 * 60 * 60 * 1e3;
      for (var k2 = unixDb; k2 <= unixDe; ) {
        k2 = k2 + 24 * 60 * 60 * 1e3;
        arr.push(this.getDateObj(new Date(parseInt(k2))).fullDate);
      }
      return arr;
    }
    /**
     *  获取多选状态
     */
    setMultiple(fullDate) {
      if (!this.range)
        return;
      let {
        before,
        after
      } = this.multipleStatus;
      if (before && after) {
        if (!this.lastHover) {
          this.lastHover = true;
          return;
        }
        this.multipleStatus.before = fullDate;
        this.multipleStatus.after = "";
        this.multipleStatus.data = [];
        this.multipleStatus.fulldate = "";
        this.lastHover = false;
      } else {
        if (!before) {
          this.multipleStatus.before = fullDate;
          this.lastHover = false;
        } else {
          this.multipleStatus.after = fullDate;
          if (dateCompare(this.multipleStatus.before, this.multipleStatus.after)) {
            this.multipleStatus.data = this.geDateAll(this.multipleStatus.before, this.multipleStatus.after);
          } else {
            this.multipleStatus.data = this.geDateAll(this.multipleStatus.after, this.multipleStatus.before);
          }
          this.lastHover = true;
        }
      }
      this.getWeeks(fullDate);
    }
    /**
     *  鼠标 hover 更新多选状态
     */
    setHoverMultiple(fullDate) {
      if (!this.range || this.lastHover)
        return;
      const { before } = this.multipleStatus;
      if (!before) {
        this.multipleStatus.before = fullDate;
      } else {
        this.multipleStatus.after = fullDate;
        if (dateCompare(this.multipleStatus.before, this.multipleStatus.after)) {
          this.multipleStatus.data = this.geDateAll(this.multipleStatus.before, this.multipleStatus.after);
        } else {
          this.multipleStatus.data = this.geDateAll(this.multipleStatus.after, this.multipleStatus.before);
        }
      }
      this.getWeeks(fullDate);
    }
    /**
     * 更新默认值多选状态
     */
    setDefaultMultiple(before, after) {
      this.multipleStatus.before = before;
      this.multipleStatus.after = after;
      if (before && after) {
        if (dateCompare(before, after)) {
          this.multipleStatus.data = this.geDateAll(before, after);
          this.getWeeks(after);
        } else {
          this.multipleStatus.data = this.geDateAll(after, before);
          this.getWeeks(before);
        }
      }
    }
    /**
     * 获取每周数据
     * @param {Object} dateData
     */
    getWeeks(dateData) {
      const {
        year,
        month
      } = this.getDateObj(dateData);
      const preMonthDayAmount = new Date(year, month - 1, 1).getDay();
      const preMonthDays = this.getPreMonthDays(preMonthDayAmount, this.getDateObj(dateData));
      const currentMonthDayAmount = new Date(year, month, 0).getDate();
      const currentMonthDays = this.getCurrentMonthDays(currentMonthDayAmount, this.getDateObj(dateData));
      const nextMonthDayAmount = 42 - preMonthDayAmount - currentMonthDayAmount;
      const nextMonthDays = this._getNextMonthDays(nextMonthDayAmount, this.getDateObj(dateData));
      const calendarDays = [...preMonthDays, ...currentMonthDays, ...nextMonthDays];
      const weeks = new Array(6);
      for (let i2 = 0; i2 < calendarDays.length; i2++) {
        const index = Math.floor(i2 / 7);
        if (!weeks[index]) {
          weeks[index] = new Array(7);
        }
        weeks[index][i2 % 7] = calendarDays[i2];
      }
      this.calendar = calendarDays;
      this.weeks = weeks;
    }
  };
  function getDateTime(date, hideSecond) {
    return `${getDate(date)} ${getTime(date, hideSecond)}`;
  }
  function getDate(date) {
    date = fixIosDateFormat(date);
    date = new Date(date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${addZero(month)}-${addZero(day)}`;
  }
  function getTime(date, hideSecond) {
    date = fixIosDateFormat(date);
    date = new Date(date);
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return hideSecond ? `${addZero(hour)}:${addZero(minute)}` : `${addZero(hour)}:${addZero(minute)}:${addZero(second)}`;
  }
  function addZero(num) {
    if (num < 10) {
      num = `0${num}`;
    }
    return num;
  }
  function getDefaultSecond(hideSecond) {
    return hideSecond ? "00:00" : "00:00:00";
  }
  function dateCompare(startDate, endDate) {
    startDate = new Date(fixIosDateFormat(startDate));
    endDate = new Date(fixIosDateFormat(endDate));
    return startDate <= endDate;
  }
  function checkDate(date) {
    const dateReg = /((19|20)\d{2})(-|\/)\d{1,2}(-|\/)\d{1,2}/g;
    return date.match(dateReg);
  }
  const dateTimeReg = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])( [0-5][0-9]:[0-5][0-9]:[0-5][0-9])?$/;
  function fixIosDateFormat(value) {
    if (typeof value === "string" && dateTimeReg.test(value)) {
      value = value.replace(/-/g, "/");
    }
    return value;
  }
  const _sfc_main$i = {
    props: {
      weeks: {
        type: Object,
        default() {
          return {};
        }
      },
      calendar: {
        type: Object,
        default: () => {
          return {};
        }
      },
      selected: {
        type: Array,
        default: () => {
          return [];
        }
      },
      checkHover: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      choiceDate(weeks) {
        this.$emit("change", weeks);
      },
      handleMousemove(weeks) {
        this.$emit("handleMouse", weeks);
      }
    }
  };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-calendar-item__weeks-box", {
          "uni-calendar-item--disable": $props.weeks.disable,
          "uni-calendar-item--before-checked-x": $props.weeks.beforeMultiple,
          "uni-calendar-item--multiple": $props.weeks.multiple,
          "uni-calendar-item--after-checked-x": $props.weeks.afterMultiple
        }]),
        onClick: _cache[0] || (_cache[0] = ($event) => $options.choiceDate($props.weeks)),
        onMouseenter: _cache[1] || (_cache[1] = ($event) => $options.handleMousemove($props.weeks))
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["uni-calendar-item__weeks-box-item", {
              "uni-calendar-item--checked": $props.calendar.fullDate === $props.weeks.fullDate && ($props.calendar.userChecked || !$props.checkHover),
              "uni-calendar-item--checked-range-text": $props.checkHover,
              "uni-calendar-item--before-checked": $props.weeks.beforeMultiple,
              "uni-calendar-item--multiple": $props.weeks.multiple,
              "uni-calendar-item--after-checked": $props.weeks.afterMultiple,
              "uni-calendar-item--disable": $props.weeks.disable
            }])
          },
          [
            $props.selected && $props.weeks.extraInfo ? (vue.openBlock(), vue.createElementBlock("text", {
              key: 0,
              class: "uni-calendar-item__weeks-box-circle"
            })) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode(
              "text",
              { class: "uni-calendar-item__weeks-box-text uni-calendar-item__weeks-box-text-disable uni-calendar-item--checked-text" },
              vue.toDisplayString($props.weeks.date),
              1
              /* TEXT */
            )
          ],
          2
          /* CLASS */
        ),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass({ "uni-calendar-item--today": $props.weeks.isToday })
          },
          null,
          2
          /* CLASS */
        )
      ],
      34
      /* CLASS, HYDRATE_EVENTS */
    );
  }
  const calendarItem = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$b], ["__scopeId", "data-v-3c762a01"], ["__file", "D:/ruangong/emosphere/uni_modules/uni-datetime-picker/components/uni-datetime-picker/calendar-item.vue"]]);
  const isObject = (val) => val !== null && typeof val === "object";
  const defaultDelimiters = ["{", "}"];
  class BaseFormatter {
    constructor() {
      this._caches = /* @__PURE__ */ Object.create(null);
    }
    interpolate(message, values, delimiters = defaultDelimiters) {
      if (!values) {
        return [message];
      }
      let tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    }
  }
  const RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
  const RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
  function parse(format, [startDelimiter, endDelimiter]) {
    const tokens = [];
    let position = 0;
    let text = "";
    while (position < format.length) {
      let char = format[position++];
      if (char === startDelimiter) {
        if (text) {
          tokens.push({ type: "text", value: text });
        }
        text = "";
        let sub = "";
        char = format[position++];
        while (char !== void 0 && char !== endDelimiter) {
          sub += char;
          char = format[position++];
        }
        const isClosed = char === endDelimiter;
        const type = RE_TOKEN_LIST_VALUE.test(sub) ? "list" : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? "named" : "unknown";
        tokens.push({ value: sub, type });
      } else {
        text += char;
      }
    }
    text && tokens.push({ type: "text", value: text });
    return tokens;
  }
  function compile(tokens, values) {
    const compiled = [];
    let index = 0;
    const mode = Array.isArray(values) ? "list" : isObject(values) ? "named" : "unknown";
    if (mode === "unknown") {
      return compiled;
    }
    while (index < tokens.length) {
      const token = tokens[index];
      switch (token.type) {
        case "text":
          compiled.push(token.value);
          break;
        case "list":
          compiled.push(values[parseInt(token.value, 10)]);
          break;
        case "named":
          if (mode === "named") {
            compiled.push(values[token.value]);
          } else {
            {
              console.warn(`Type of token '${token.type}' and format of value '${mode}' don't match!`);
            }
          }
          break;
        case "unknown":
          {
            console.warn(`Detect 'unknown' type of token!`);
          }
          break;
      }
      index++;
    }
    return compiled;
  }
  const LOCALE_ZH_HANS = "zh-Hans";
  const LOCALE_ZH_HANT = "zh-Hant";
  const LOCALE_EN = "en";
  const LOCALE_FR = "fr";
  const LOCALE_ES = "es";
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  const hasOwn = (val, key) => hasOwnProperty.call(val, key);
  const defaultFormatter = new BaseFormatter();
  function include(str, parts) {
    return !!parts.find((part) => str.indexOf(part) !== -1);
  }
  function startsWith(str, parts) {
    return parts.find((part) => str.indexOf(part) === 0);
  }
  function normalizeLocale(locale, messages) {
    if (!locale) {
      return;
    }
    locale = locale.trim().replace(/_/g, "-");
    if (messages && messages[locale]) {
      return locale;
    }
    locale = locale.toLowerCase();
    if (locale === "chinese") {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf("zh") === 0) {
      if (locale.indexOf("-hans") > -1) {
        return LOCALE_ZH_HANS;
      }
      if (locale.indexOf("-hant") > -1) {
        return LOCALE_ZH_HANT;
      }
      if (include(locale, ["-tw", "-hk", "-mo", "-cht"])) {
        return LOCALE_ZH_HANT;
      }
      return LOCALE_ZH_HANS;
    }
    let locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
    if (messages && Object.keys(messages).length > 0) {
      locales = Object.keys(messages);
    }
    const lang = startsWith(locale, locales);
    if (lang) {
      return lang;
    }
  }
  class I18n {
    constructor({ locale, fallbackLocale, messages, watcher, formater }) {
      this.locale = LOCALE_EN;
      this.fallbackLocale = LOCALE_EN;
      this.message = {};
      this.messages = {};
      this.watchers = [];
      if (fallbackLocale) {
        this.fallbackLocale = fallbackLocale;
      }
      this.formater = formater || defaultFormatter;
      this.messages = messages || {};
      this.setLocale(locale || LOCALE_EN);
      if (watcher) {
        this.watchLocale(watcher);
      }
    }
    setLocale(locale) {
      const oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      if (oldLocale !== this.locale) {
        this.watchers.forEach((watcher) => {
          watcher(this.locale, oldLocale);
        });
      }
    }
    getLocale() {
      return this.locale;
    }
    watchLocale(fn) {
      const index = this.watchers.push(fn) - 1;
      return () => {
        this.watchers.splice(index, 1);
      };
    }
    add(locale, message, override = true) {
      const curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else {
          Object.keys(message).forEach((key) => {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else {
        this.messages[locale] = message;
      }
    }
    f(message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join("");
    }
    t(key, locale, values) {
      let message = this.message;
      if (typeof locale === "string") {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn(`Cannot translate the value of keypath ${key}. Use the value of keypath as default.`);
        return key;
      }
      return this.formater.interpolate(message[key], values).join("");
    }
  }
  function watchAppLocale(appVm, i18n) {
    if (appVm.$watchLocale) {
      appVm.$watchLocale((newLocale) => {
        i18n.setLocale(newLocale);
      });
    } else {
      appVm.$watch(() => appVm.$locale, (newLocale) => {
        i18n.setLocale(newLocale);
      });
    }
  }
  function getDefaultLocale() {
    if (typeof uni !== "undefined" && uni.getLocale) {
      return uni.getLocale();
    }
    if (typeof global !== "undefined" && global.getLocale) {
      return global.getLocale();
    }
    return LOCALE_EN;
  }
  function initVueI18n(locale, messages = {}, fallbackLocale, watcher) {
    if (typeof locale !== "string") {
      [locale, messages] = [
        messages,
        locale
      ];
    }
    if (typeof locale !== "string") {
      locale = getDefaultLocale();
    }
    if (typeof fallbackLocale !== "string") {
      fallbackLocale = typeof __uniConfig !== "undefined" && __uniConfig.fallbackLocale || LOCALE_EN;
    }
    const i18n = new I18n({
      locale,
      fallbackLocale,
      messages,
      watcher
    });
    let t2 = (key, values) => {
      if (typeof getApp !== "function") {
        t2 = function(key2, values2) {
          return i18n.t(key2, values2);
        };
      } else {
        let isWatchedAppLocale = false;
        t2 = function(key2, values2) {
          const appVm = getApp().$vm;
          if (appVm) {
            appVm.$locale;
            if (!isWatchedAppLocale) {
              isWatchedAppLocale = true;
              watchAppLocale(appVm, i18n);
            }
          }
          return i18n.t(key2, values2);
        };
      }
      return t2(key, values);
    };
    return {
      i18n,
      f(message, values, delimiters) {
        return i18n.f(message, values, delimiters);
      },
      t(key, values) {
        return t2(key, values);
      },
      add(locale2, message, override = true) {
        return i18n.add(locale2, message, override);
      },
      watch(fn) {
        return i18n.watchLocale(fn);
      },
      getLocale() {
        return i18n.getLocale();
      },
      setLocale(newLocale) {
        return i18n.setLocale(newLocale);
      }
    };
  }
  const en = {
    "uni-datetime-picker.selectDate": "select date",
    "uni-datetime-picker.selectTime": "select time",
    "uni-datetime-picker.selectDateTime": "select date and time",
    "uni-datetime-picker.startDate": "start date",
    "uni-datetime-picker.endDate": "end date",
    "uni-datetime-picker.startTime": "start time",
    "uni-datetime-picker.endTime": "end time",
    "uni-datetime-picker.ok": "ok",
    "uni-datetime-picker.clear": "clear",
    "uni-datetime-picker.cancel": "cancel",
    "uni-datetime-picker.year": "-",
    "uni-datetime-picker.month": "",
    "uni-calender.MON": "MON",
    "uni-calender.TUE": "TUE",
    "uni-calender.WED": "WED",
    "uni-calender.THU": "THU",
    "uni-calender.FRI": "FRI",
    "uni-calender.SAT": "SAT",
    "uni-calender.SUN": "SUN",
    "uni-calender.confirm": "confirm"
  };
  const zhHans = {
    "uni-datetime-picker.selectDate": "选择日期",
    "uni-datetime-picker.selectTime": "选择时间",
    "uni-datetime-picker.selectDateTime": "选择日期时间",
    "uni-datetime-picker.startDate": "开始日期",
    "uni-datetime-picker.endDate": "结束日期",
    "uni-datetime-picker.startTime": "开始时间",
    "uni-datetime-picker.endTime": "结束时间",
    "uni-datetime-picker.ok": "确定",
    "uni-datetime-picker.clear": "清除",
    "uni-datetime-picker.cancel": "取消",
    "uni-datetime-picker.year": "年",
    "uni-datetime-picker.month": "月",
    "uni-calender.SUN": "日",
    "uni-calender.MON": "一",
    "uni-calender.TUE": "二",
    "uni-calender.WED": "三",
    "uni-calender.THU": "四",
    "uni-calender.FRI": "五",
    "uni-calender.SAT": "六",
    "uni-calender.confirm": "确认"
  };
  const zhHant = {
    "uni-datetime-picker.selectDate": "選擇日期",
    "uni-datetime-picker.selectTime": "選擇時間",
    "uni-datetime-picker.selectDateTime": "選擇日期時間",
    "uni-datetime-picker.startDate": "開始日期",
    "uni-datetime-picker.endDate": "結束日期",
    "uni-datetime-picker.startTime": "開始时间",
    "uni-datetime-picker.endTime": "結束时间",
    "uni-datetime-picker.ok": "確定",
    "uni-datetime-picker.clear": "清除",
    "uni-datetime-picker.cancel": "取消",
    "uni-datetime-picker.year": "年",
    "uni-datetime-picker.month": "月",
    "uni-calender.SUN": "日",
    "uni-calender.MON": "一",
    "uni-calender.TUE": "二",
    "uni-calender.WED": "三",
    "uni-calender.THU": "四",
    "uni-calender.FRI": "五",
    "uni-calender.SAT": "六",
    "uni-calender.confirm": "確認"
  };
  const i18nMessages = {
    en,
    "zh-Hans": zhHans,
    "zh-Hant": zhHant
  };
  const { t: t$2 } = initVueI18n(i18nMessages);
  const _sfc_main$h = {
    name: "UniDatetimePicker",
    data() {
      return {
        indicatorStyle: `height: 50px;`,
        visible: false,
        fixNvueBug: {},
        dateShow: true,
        timeShow: true,
        title: "日期和时间",
        // 输入框当前时间
        time: "",
        // 当前的年月日时分秒
        year: 1920,
        month: 0,
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
        // 起始时间
        startYear: 1920,
        startMonth: 1,
        startDay: 1,
        startHour: 0,
        startMinute: 0,
        startSecond: 0,
        // 结束时间
        endYear: 2120,
        endMonth: 12,
        endDay: 31,
        endHour: 23,
        endMinute: 59,
        endSecond: 59
      };
    },
    props: {
      type: {
        type: String,
        default: "datetime"
      },
      value: {
        type: [String, Number],
        default: ""
      },
      modelValue: {
        type: [String, Number],
        default: ""
      },
      start: {
        type: [Number, String],
        default: ""
      },
      end: {
        type: [Number, String],
        default: ""
      },
      returnType: {
        type: String,
        default: "string"
      },
      disabled: {
        type: [Boolean, String],
        default: false
      },
      border: {
        type: [Boolean, String],
        default: true
      },
      hideSecond: {
        type: [Boolean, String],
        default: false
      }
    },
    watch: {
      modelValue: {
        handler(newVal) {
          if (newVal) {
            this.parseValue(fixIosDateFormat(newVal));
            this.initTime(false);
          } else {
            this.time = "";
            this.parseValue(Date.now());
          }
        },
        immediate: true
      },
      type: {
        handler(newValue) {
          if (newValue === "date") {
            this.dateShow = true;
            this.timeShow = false;
            this.title = "日期";
          } else if (newValue === "time") {
            this.dateShow = false;
            this.timeShow = true;
            this.title = "时间";
          } else {
            this.dateShow = true;
            this.timeShow = true;
            this.title = "日期和时间";
          }
        },
        immediate: true
      },
      start: {
        handler(newVal) {
          this.parseDatetimeRange(fixIosDateFormat(newVal), "start");
        },
        immediate: true
      },
      end: {
        handler(newVal) {
          this.parseDatetimeRange(fixIosDateFormat(newVal), "end");
        },
        immediate: true
      },
      // 月、日、时、分、秒可选范围变化后，检查当前值是否在范围内，不在则当前值重置为可选范围第一项
      months(newVal) {
        this.checkValue("month", this.month, newVal);
      },
      days(newVal) {
        this.checkValue("day", this.day, newVal);
      },
      hours(newVal) {
        this.checkValue("hour", this.hour, newVal);
      },
      minutes(newVal) {
        this.checkValue("minute", this.minute, newVal);
      },
      seconds(newVal) {
        this.checkValue("second", this.second, newVal);
      }
    },
    computed: {
      // 当前年、月、日、时、分、秒选择范围
      years() {
        return this.getCurrentRange("year");
      },
      months() {
        return this.getCurrentRange("month");
      },
      days() {
        return this.getCurrentRange("day");
      },
      hours() {
        return this.getCurrentRange("hour");
      },
      minutes() {
        return this.getCurrentRange("minute");
      },
      seconds() {
        return this.getCurrentRange("second");
      },
      // picker 当前值数组
      ymd() {
        return [this.year - this.minYear, this.month - this.minMonth, this.day - this.minDay];
      },
      hms() {
        return [this.hour - this.minHour, this.minute - this.minMinute, this.second - this.minSecond];
      },
      // 当前 date 是 start
      currentDateIsStart() {
        return this.year === this.startYear && this.month === this.startMonth && this.day === this.startDay;
      },
      // 当前 date 是 end
      currentDateIsEnd() {
        return this.year === this.endYear && this.month === this.endMonth && this.day === this.endDay;
      },
      // 当前年、月、日、时、分、秒的最小值和最大值
      minYear() {
        return this.startYear;
      },
      maxYear() {
        return this.endYear;
      },
      minMonth() {
        if (this.year === this.startYear) {
          return this.startMonth;
        } else {
          return 1;
        }
      },
      maxMonth() {
        if (this.year === this.endYear) {
          return this.endMonth;
        } else {
          return 12;
        }
      },
      minDay() {
        if (this.year === this.startYear && this.month === this.startMonth) {
          return this.startDay;
        } else {
          return 1;
        }
      },
      maxDay() {
        if (this.year === this.endYear && this.month === this.endMonth) {
          return this.endDay;
        } else {
          return this.daysInMonth(this.year, this.month);
        }
      },
      minHour() {
        if (this.type === "datetime") {
          if (this.currentDateIsStart) {
            return this.startHour;
          } else {
            return 0;
          }
        }
        if (this.type === "time") {
          return this.startHour;
        }
      },
      maxHour() {
        if (this.type === "datetime") {
          if (this.currentDateIsEnd) {
            return this.endHour;
          } else {
            return 23;
          }
        }
        if (this.type === "time") {
          return this.endHour;
        }
      },
      minMinute() {
        if (this.type === "datetime") {
          if (this.currentDateIsStart && this.hour === this.startHour) {
            return this.startMinute;
          } else {
            return 0;
          }
        }
        if (this.type === "time") {
          if (this.hour === this.startHour) {
            return this.startMinute;
          } else {
            return 0;
          }
        }
      },
      maxMinute() {
        if (this.type === "datetime") {
          if (this.currentDateIsEnd && this.hour === this.endHour) {
            return this.endMinute;
          } else {
            return 59;
          }
        }
        if (this.type === "time") {
          if (this.hour === this.endHour) {
            return this.endMinute;
          } else {
            return 59;
          }
        }
      },
      minSecond() {
        if (this.type === "datetime") {
          if (this.currentDateIsStart && this.hour === this.startHour && this.minute === this.startMinute) {
            return this.startSecond;
          } else {
            return 0;
          }
        }
        if (this.type === "time") {
          if (this.hour === this.startHour && this.minute === this.startMinute) {
            return this.startSecond;
          } else {
            return 0;
          }
        }
      },
      maxSecond() {
        if (this.type === "datetime") {
          if (this.currentDateIsEnd && this.hour === this.endHour && this.minute === this.endMinute) {
            return this.endSecond;
          } else {
            return 59;
          }
        }
        if (this.type === "time") {
          if (this.hour === this.endHour && this.minute === this.endMinute) {
            return this.endSecond;
          } else {
            return 59;
          }
        }
      },
      /**
       * for i18n
       */
      selectTimeText() {
        return t$2("uni-datetime-picker.selectTime");
      },
      okText() {
        return t$2("uni-datetime-picker.ok");
      },
      clearText() {
        return t$2("uni-datetime-picker.clear");
      },
      cancelText() {
        return t$2("uni-datetime-picker.cancel");
      }
    },
    mounted() {
    },
    methods: {
      /**
       * @param {Object} item
       * 小于 10 在前面加个 0
       */
      lessThanTen(item) {
        return item < 10 ? "0" + item : item;
      },
      /**
       * 解析时分秒字符串，例如：00:00:00
       * @param {String} timeString
       */
      parseTimeType(timeString) {
        if (timeString) {
          let timeArr = timeString.split(":");
          this.hour = Number(timeArr[0]);
          this.minute = Number(timeArr[1]);
          this.second = Number(timeArr[2]);
        }
      },
      /**
       * 解析选择器初始值，类型可以是字符串、时间戳，例如：2000-10-02、'08:30:00'、 1610695109000
       * @param {String | Number} datetime
       */
      initPickerValue(datetime) {
        let defaultValue = null;
        if (datetime) {
          defaultValue = this.compareValueWithStartAndEnd(datetime, this.start, this.end);
        } else {
          defaultValue = Date.now();
          defaultValue = this.compareValueWithStartAndEnd(defaultValue, this.start, this.end);
        }
        this.parseValue(defaultValue);
      },
      /**
       * 初始值规则：
       * - 用户设置初始值 value
       * 	- 设置了起始时间 start、终止时间 end，并 start < value < end，初始值为 value， 否则初始值为 start
       * 	- 只设置了起始时间 start，并 start < value，初始值为 value，否则初始值为 start
       * 	- 只设置了终止时间 end，并 value < end，初始值为 value，否则初始值为 end
       * 	- 无起始终止时间，则初始值为 value
       * - 无初始值 value，则初始值为当前本地时间 Date.now()
       * @param {Object} value
       * @param {Object} dateBase
       */
      compareValueWithStartAndEnd(value, start, end) {
        let winner = null;
        value = this.superTimeStamp(value);
        start = this.superTimeStamp(start);
        end = this.superTimeStamp(end);
        if (start && end) {
          if (value < start) {
            winner = new Date(start);
          } else if (value > end) {
            winner = new Date(end);
          } else {
            winner = new Date(value);
          }
        } else if (start && !end) {
          winner = start <= value ? new Date(value) : new Date(start);
        } else if (!start && end) {
          winner = value <= end ? new Date(value) : new Date(end);
        } else {
          winner = new Date(value);
        }
        return winner;
      },
      /**
       * 转换为可比较的时间戳，接受日期、时分秒、时间戳
       * @param {Object} value
       */
      superTimeStamp(value) {
        let dateBase = "";
        if (this.type === "time" && value && typeof value === "string") {
          const now = /* @__PURE__ */ new Date();
          const year = now.getFullYear();
          const month = now.getMonth() + 1;
          const day = now.getDate();
          dateBase = year + "/" + month + "/" + day + " ";
        }
        if (Number(value)) {
          value = parseInt(value);
          dateBase = 0;
        }
        return this.createTimeStamp(dateBase + value);
      },
      /**
       * 解析默认值 value，字符串、时间戳
       * @param {Object} defaultTime
       */
      parseValue(value) {
        if (!value) {
          return;
        }
        if (this.type === "time" && typeof value === "string") {
          this.parseTimeType(value);
        } else {
          let defaultDate = null;
          defaultDate = new Date(value);
          if (this.type !== "time") {
            this.year = defaultDate.getFullYear();
            this.month = defaultDate.getMonth() + 1;
            this.day = defaultDate.getDate();
          }
          if (this.type !== "date") {
            this.hour = defaultDate.getHours();
            this.minute = defaultDate.getMinutes();
            this.second = defaultDate.getSeconds();
          }
        }
        if (this.hideSecond) {
          this.second = 0;
        }
      },
      /**
       * 解析可选择时间范围 start、end，年月日字符串、时间戳
       * @param {Object} defaultTime
       */
      parseDatetimeRange(point, pointType) {
        if (!point) {
          if (pointType === "start") {
            this.startYear = 1920;
            this.startMonth = 1;
            this.startDay = 1;
            this.startHour = 0;
            this.startMinute = 0;
            this.startSecond = 0;
          }
          if (pointType === "end") {
            this.endYear = 2120;
            this.endMonth = 12;
            this.endDay = 31;
            this.endHour = 23;
            this.endMinute = 59;
            this.endSecond = 59;
          }
          return;
        }
        if (this.type === "time") {
          const pointArr = point.split(":");
          this[pointType + "Hour"] = Number(pointArr[0]);
          this[pointType + "Minute"] = Number(pointArr[1]);
          this[pointType + "Second"] = Number(pointArr[2]);
        } else {
          if (!point) {
            pointType === "start" ? this.startYear = this.year - 60 : this.endYear = this.year + 60;
            return;
          }
          if (Number(point)) {
            point = parseInt(point);
          }
          const hasTime = /[0-9]:[0-9]/;
          if (this.type === "datetime" && pointType === "end" && typeof point === "string" && !hasTime.test(
            point
          )) {
            point = point + " 23:59:59";
          }
          const pointDate = new Date(point);
          this[pointType + "Year"] = pointDate.getFullYear();
          this[pointType + "Month"] = pointDate.getMonth() + 1;
          this[pointType + "Day"] = pointDate.getDate();
          if (this.type === "datetime") {
            this[pointType + "Hour"] = pointDate.getHours();
            this[pointType + "Minute"] = pointDate.getMinutes();
            this[pointType + "Second"] = pointDate.getSeconds();
          }
        }
      },
      // 获取 年、月、日、时、分、秒 当前可选范围
      getCurrentRange(value) {
        const range = [];
        for (let i2 = this["min" + this.capitalize(value)]; i2 <= this["max" + this.capitalize(value)]; i2++) {
          range.push(i2);
        }
        return range;
      },
      // 字符串首字母大写
      capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      },
      // 检查当前值是否在范围内，不在则当前值重置为可选范围第一项
      checkValue(name, value, values) {
        if (values.indexOf(value) === -1) {
          this[name] = values[0];
        }
      },
      // 每个月的实际天数
      daysInMonth(year, month) {
        return new Date(year, month, 0).getDate();
      },
      //兼容 iOS、safari 日期格式
      fixIosDateFormat(value) {
        if (typeof value === "string") {
          value = value.replace(/-/g, "/");
        }
        return value;
      },
      /**
       * 生成时间戳
       * @param {Object} time
       */
      createTimeStamp(time) {
        if (!time)
          return;
        if (typeof time === "number") {
          return time;
        } else {
          time = time.replace(/-/g, "/");
          if (this.type === "date") {
            time = time + " 00:00:00";
          }
          return Date.parse(time);
        }
      },
      /**
       * 生成日期或时间的字符串
       */
      createDomSting() {
        const yymmdd = this.year + "-" + this.lessThanTen(this.month) + "-" + this.lessThanTen(this.day);
        let hhmmss = this.lessThanTen(this.hour) + ":" + this.lessThanTen(this.minute);
        if (!this.hideSecond) {
          hhmmss = hhmmss + ":" + this.lessThanTen(this.second);
        }
        if (this.type === "date") {
          return yymmdd;
        } else if (this.type === "time") {
          return hhmmss;
        } else {
          return yymmdd + " " + hhmmss;
        }
      },
      /**
       * 初始化返回值，并抛出 change 事件
       */
      initTime(emit = true) {
        this.time = this.createDomSting();
        if (!emit)
          return;
        if (this.returnType === "timestamp" && this.type !== "time") {
          this.$emit("change", this.createTimeStamp(this.time));
          this.$emit("input", this.createTimeStamp(this.time));
          this.$emit("update:modelValue", this.createTimeStamp(this.time));
        } else {
          this.$emit("change", this.time);
          this.$emit("input", this.time);
          this.$emit("update:modelValue", this.time);
        }
      },
      /**
       * 用户选择日期或时间更新 data
       * @param {Object} e
       */
      bindDateChange(e2) {
        const val = e2.detail.value;
        this.year = this.years[val[0]];
        this.month = this.months[val[1]];
        this.day = this.days[val[2]];
      },
      bindTimeChange(e2) {
        const val = e2.detail.value;
        this.hour = this.hours[val[0]];
        this.minute = this.minutes[val[1]];
        this.second = this.seconds[val[2]];
      },
      /**
       * 初始化弹出层
       */
      initTimePicker() {
        if (this.disabled)
          return;
        const value = fixIosDateFormat(this.time);
        this.initPickerValue(value);
        this.visible = !this.visible;
      },
      /**
       * 触发或关闭弹框
       */
      tiggerTimePicker(e2) {
        this.visible = !this.visible;
      },
      /**
       * 用户点击“清空”按钮，清空当前值
       */
      clearTime() {
        this.time = "";
        this.$emit("change", this.time);
        this.$emit("input", this.time);
        this.$emit("update:modelValue", this.time);
        this.tiggerTimePicker();
      },
      /**
       * 用户点击“确定”按钮
       */
      setTime() {
        this.initTime();
        this.tiggerTimePicker();
      }
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-datetime-picker" }, [
      vue.createElementVNode("view", {
        onClick: _cache[0] || (_cache[0] = (...args) => $options.initTimePicker && $options.initTimePicker(...args))
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["uni-datetime-picker-timebox-pointer", { "uni-datetime-picker-disabled": $props.disabled, "uni-datetime-picker-timebox": $props.border }])
            },
            [
              vue.createElementVNode(
                "text",
                { class: "uni-datetime-picker-text" },
                vue.toDisplayString($data.time),
                1
                /* TEXT */
              ),
              !$data.time ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "uni-datetime-picker-time"
              }, [
                vue.createElementVNode(
                  "text",
                  { class: "uni-datetime-picker-text" },
                  vue.toDisplayString($options.selectTimeText),
                  1
                  /* TEXT */
                )
              ])) : vue.createCommentVNode("v-if", true)
            ],
            2
            /* CLASS */
          )
        ], true)
      ]),
      $data.visible ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        id: "mask",
        class: "uni-datetime-picker-mask",
        onClick: _cache[1] || (_cache[1] = (...args) => $options.tiggerTimePicker && $options.tiggerTimePicker(...args))
      })) : vue.createCommentVNode("v-if", true),
      $data.visible ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 1,
          class: vue.normalizeClass(["uni-datetime-picker-popup", [$data.dateShow && $data.timeShow ? "" : "fix-nvue-height"]]),
          style: vue.normalizeStyle($data.fixNvueBug)
        },
        [
          vue.createElementVNode("view", { class: "uni-title" }, [
            vue.createElementVNode(
              "text",
              { class: "uni-datetime-picker-text" },
              vue.toDisplayString($options.selectTimeText),
              1
              /* TEXT */
            )
          ]),
          $data.dateShow ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "uni-datetime-picker__container-box"
          }, [
            vue.createElementVNode("picker-view", {
              class: "uni-datetime-picker-view",
              "indicator-style": $data.indicatorStyle,
              value: $options.ymd,
              onChange: _cache[2] || (_cache[2] = (...args) => $options.bindDateChange && $options.bindDateChange(...args))
            }, [
              vue.createElementVNode("picker-view-column", null, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($options.years, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "uni-datetime-picker-item",
                      key: index
                    }, [
                      vue.createElementVNode(
                        "text",
                        { class: "uni-datetime-picker-item" },
                        vue.toDisplayString($options.lessThanTen(item)),
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              vue.createElementVNode("picker-view-column", null, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($options.months, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "uni-datetime-picker-item",
                      key: index
                    }, [
                      vue.createElementVNode(
                        "text",
                        { class: "uni-datetime-picker-item" },
                        vue.toDisplayString($options.lessThanTen(item)),
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              vue.createElementVNode("picker-view-column", null, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($options.days, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "uni-datetime-picker-item",
                      key: index
                    }, [
                      vue.createElementVNode(
                        "text",
                        { class: "uni-datetime-picker-item" },
                        vue.toDisplayString($options.lessThanTen(item)),
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])
            ], 40, ["indicator-style", "value"]),
            vue.createCommentVNode(" 兼容 nvue 不支持伪类 "),
            vue.createElementVNode("text", { class: "uni-datetime-picker-sign sign-left" }, "-"),
            vue.createElementVNode("text", { class: "uni-datetime-picker-sign sign-right" }, "-")
          ])) : vue.createCommentVNode("v-if", true),
          $data.timeShow ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "uni-datetime-picker__container-box"
          }, [
            vue.createElementVNode("picker-view", {
              class: vue.normalizeClass(["uni-datetime-picker-view", [$props.hideSecond ? "time-hide-second" : ""]]),
              "indicator-style": $data.indicatorStyle,
              value: $options.hms,
              onChange: _cache[3] || (_cache[3] = (...args) => $options.bindTimeChange && $options.bindTimeChange(...args))
            }, [
              vue.createElementVNode("picker-view-column", null, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($options.hours, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "uni-datetime-picker-item",
                      key: index
                    }, [
                      vue.createElementVNode(
                        "text",
                        { class: "uni-datetime-picker-item" },
                        vue.toDisplayString($options.lessThanTen(item)),
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              vue.createElementVNode("picker-view-column", null, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($options.minutes, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "uni-datetime-picker-item",
                      key: index
                    }, [
                      vue.createElementVNode(
                        "text",
                        { class: "uni-datetime-picker-item" },
                        vue.toDisplayString($options.lessThanTen(item)),
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              !$props.hideSecond ? (vue.openBlock(), vue.createElementBlock("picker-view-column", { key: 0 }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($options.seconds, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "uni-datetime-picker-item",
                      key: index
                    }, [
                      vue.createElementVNode(
                        "text",
                        { class: "uni-datetime-picker-item" },
                        vue.toDisplayString($options.lessThanTen(item)),
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : vue.createCommentVNode("v-if", true)
            ], 42, ["indicator-style", "value"]),
            vue.createCommentVNode(" 兼容 nvue 不支持伪类 "),
            vue.createElementVNode(
              "text",
              {
                class: vue.normalizeClass(["uni-datetime-picker-sign", [$props.hideSecond ? "sign-center" : "sign-left"]])
              },
              ":",
              2
              /* CLASS */
            ),
            !$props.hideSecond ? (vue.openBlock(), vue.createElementBlock("text", {
              key: 0,
              class: "uni-datetime-picker-sign sign-right"
            }, ":")) : vue.createCommentVNode("v-if", true)
          ])) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("view", { class: "uni-datetime-picker-btn" }, [
            vue.createElementVNode("view", {
              onClick: _cache[4] || (_cache[4] = (...args) => $options.clearTime && $options.clearTime(...args))
            }, [
              vue.createElementVNode(
                "text",
                { class: "uni-datetime-picker-btn-text" },
                vue.toDisplayString($options.clearText),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "uni-datetime-picker-btn-group" }, [
              vue.createElementVNode("view", {
                class: "uni-datetime-picker-cancel",
                onClick: _cache[5] || (_cache[5] = (...args) => $options.tiggerTimePicker && $options.tiggerTimePicker(...args))
              }, [
                vue.createElementVNode(
                  "text",
                  { class: "uni-datetime-picker-btn-text" },
                  vue.toDisplayString($options.cancelText),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", {
                onClick: _cache[6] || (_cache[6] = (...args) => $options.setTime && $options.setTime(...args))
              }, [
                vue.createElementVNode(
                  "text",
                  { class: "uni-datetime-picker-btn-text" },
                  vue.toDisplayString($options.okText),
                  1
                  /* TEXT */
                )
              ])
            ])
          ])
        ],
        6
        /* CLASS, STYLE */
      )) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const TimePicker = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$a], ["__scopeId", "data-v-1d532b70"], ["__file", "D:/ruangong/emosphere/uni_modules/uni-datetime-picker/components/uni-datetime-picker/time-picker.vue"]]);
  const { t: t$1 } = initVueI18n(i18nMessages);
  const _sfc_main$g = {
    components: {
      calendarItem,
      timePicker: TimePicker
    },
    props: {
      date: {
        type: String,
        default: ""
      },
      defTime: {
        type: [String, Object],
        default: ""
      },
      selectableTimes: {
        type: [Object],
        default() {
          return {};
        }
      },
      selected: {
        type: Array,
        default() {
          return [];
        }
      },
      startDate: {
        type: String,
        default: ""
      },
      endDate: {
        type: String,
        default: ""
      },
      startPlaceholder: {
        type: String,
        default: ""
      },
      endPlaceholder: {
        type: String,
        default: ""
      },
      range: {
        type: Boolean,
        default: false
      },
      hasTime: {
        type: Boolean,
        default: false
      },
      insert: {
        type: Boolean,
        default: true
      },
      showMonth: {
        type: Boolean,
        default: true
      },
      clearDate: {
        type: Boolean,
        default: true
      },
      checkHover: {
        type: Boolean,
        default: true
      },
      hideSecond: {
        type: [Boolean],
        default: false
      },
      pleStatus: {
        type: Object,
        default() {
          return {
            before: "",
            after: "",
            data: [],
            fulldate: ""
          };
        }
      },
      defaultValue: {
        type: [String, Object, Array],
        default: ""
      }
    },
    data() {
      return {
        show: false,
        weeks: [],
        calendar: {},
        nowDate: {},
        aniMaskShow: false,
        firstEnter: true,
        time: "",
        timeRange: {
          startTime: "",
          endTime: ""
        },
        tempSingleDate: "",
        tempRange: {
          before: "",
          after: ""
        }
      };
    },
    watch: {
      date: {
        immediate: true,
        handler(newVal) {
          if (!this.range) {
            this.tempSingleDate = newVal;
            setTimeout(() => {
              this.init(newVal);
            }, 100);
          }
        }
      },
      defTime: {
        immediate: true,
        handler(newVal) {
          if (!this.range) {
            this.time = newVal;
          } else {
            this.timeRange.startTime = newVal.start;
            this.timeRange.endTime = newVal.end;
          }
        }
      },
      startDate(val) {
        if (!this.cale) {
          return;
        }
        this.cale.setStartDate(val);
        this.cale.setDate(this.nowDate.fullDate);
        this.weeks = this.cale.weeks;
      },
      endDate(val) {
        if (!this.cale) {
          return;
        }
        this.cale.setEndDate(val);
        this.cale.setDate(this.nowDate.fullDate);
        this.weeks = this.cale.weeks;
      },
      selected(newVal) {
        if (!this.cale) {
          return;
        }
        this.cale.setSelectInfo(this.nowDate.fullDate, newVal);
        this.weeks = this.cale.weeks;
      },
      pleStatus: {
        immediate: true,
        handler(newVal) {
          const {
            before,
            after,
            fulldate,
            which
          } = newVal;
          this.tempRange.before = before;
          this.tempRange.after = after;
          setTimeout(() => {
            if (fulldate) {
              this.cale.setHoverMultiple(fulldate);
              if (before && after) {
                this.cale.lastHover = true;
                if (this.rangeWithinMonth(after, before))
                  return;
                this.setDate(before);
              } else {
                this.cale.setMultiple(fulldate);
                this.setDate(this.nowDate.fullDate);
                this.calendar.fullDate = "";
                this.cale.lastHover = false;
              }
            } else {
              if (!this.cale) {
                return;
              }
              this.cale.setDefaultMultiple(before, after);
              if (which === "left" && before) {
                this.setDate(before);
                this.weeks = this.cale.weeks;
              } else if (after) {
                this.setDate(after);
                this.weeks = this.cale.weeks;
              }
              this.cale.lastHover = true;
            }
          }, 16);
        }
      }
    },
    computed: {
      timepickerStartTime() {
        const activeDate = this.range ? this.tempRange.before : this.calendar.fullDate;
        return activeDate === this.startDate ? this.selectableTimes.start : "";
      },
      timepickerEndTime() {
        const activeDate = this.range ? this.tempRange.after : this.calendar.fullDate;
        return activeDate === this.endDate ? this.selectableTimes.end : "";
      },
      /**
       * for i18n
       */
      selectDateText() {
        return t$1("uni-datetime-picker.selectDate");
      },
      startDateText() {
        return this.startPlaceholder || t$1("uni-datetime-picker.startDate");
      },
      endDateText() {
        return this.endPlaceholder || t$1("uni-datetime-picker.endDate");
      },
      okText() {
        return t$1("uni-datetime-picker.ok");
      },
      yearText() {
        return t$1("uni-datetime-picker.year");
      },
      monthText() {
        return t$1("uni-datetime-picker.month");
      },
      MONText() {
        return t$1("uni-calender.MON");
      },
      TUEText() {
        return t$1("uni-calender.TUE");
      },
      WEDText() {
        return t$1("uni-calender.WED");
      },
      THUText() {
        return t$1("uni-calender.THU");
      },
      FRIText() {
        return t$1("uni-calender.FRI");
      },
      SATText() {
        return t$1("uni-calender.SAT");
      },
      SUNText() {
        return t$1("uni-calender.SUN");
      },
      confirmText() {
        return t$1("uni-calender.confirm");
      }
    },
    created() {
      this.cale = new Calendar$1({
        selected: this.selected,
        startDate: this.startDate,
        endDate: this.endDate,
        range: this.range
      });
      this.init(this.date);
    },
    methods: {
      leaveCale() {
        this.firstEnter = true;
      },
      handleMouse(weeks) {
        if (weeks.disable)
          return;
        if (this.cale.lastHover)
          return;
        let {
          before,
          after
        } = this.cale.multipleStatus;
        if (!before)
          return;
        this.calendar = weeks;
        this.cale.setHoverMultiple(this.calendar.fullDate);
        this.weeks = this.cale.weeks;
        if (this.firstEnter) {
          this.$emit("firstEnterCale", this.cale.multipleStatus);
          this.firstEnter = false;
        }
      },
      rangeWithinMonth(A, B) {
        const [yearA, monthA] = A.split("-");
        const [yearB, monthB] = B.split("-");
        return yearA === yearB && monthA === monthB;
      },
      // 蒙版点击事件
      maskClick() {
        this.close();
        this.$emit("maskClose");
      },
      clearCalender() {
        if (this.range) {
          this.timeRange.startTime = "";
          this.timeRange.endTime = "";
          this.tempRange.before = "";
          this.tempRange.after = "";
          this.cale.multipleStatus.before = "";
          this.cale.multipleStatus.after = "";
          this.cale.multipleStatus.data = [];
          this.cale.lastHover = false;
        } else {
          this.time = "";
          this.tempSingleDate = "";
        }
        this.calendar.fullDate = "";
        this.setDate(/* @__PURE__ */ new Date());
      },
      bindDateChange(e2) {
        const value = e2.detail.value + "-1";
        this.setDate(value);
      },
      /**
       * 初始化日期显示
       * @param {Object} date
       */
      init(date) {
        if (!this.cale) {
          return;
        }
        this.cale.setDate(date || /* @__PURE__ */ new Date());
        this.weeks = this.cale.weeks;
        this.nowDate = this.cale.getInfo(date);
        this.calendar = { ...this.nowDate };
        if (!date) {
          this.calendar.fullDate = "";
          if (this.defaultValue && !this.range) {
            const defaultDate = new Date(this.defaultValue);
            const fullDate = getDate(defaultDate);
            const year = defaultDate.getFullYear();
            const month = defaultDate.getMonth() + 1;
            const date2 = defaultDate.getDate();
            const day = defaultDate.getDay();
            this.calendar = {
              fullDate,
              year,
              month,
              date: date2,
              day
            }, this.tempSingleDate = fullDate;
            this.time = getTime(defaultDate, this.hideSecond);
          }
        }
      },
      /**
       * 打开日历弹窗
       */
      open() {
        if (this.clearDate && !this.insert) {
          this.cale.cleanMultipleStatus();
          this.init(this.date);
        }
        this.show = true;
        this.$nextTick(() => {
          setTimeout(() => {
            this.aniMaskShow = true;
          }, 50);
        });
      },
      /**
       * 关闭日历弹窗
       */
      close() {
        this.aniMaskShow = false;
        this.$nextTick(() => {
          setTimeout(() => {
            this.show = false;
            this.$emit("close");
          }, 300);
        });
      },
      /**
       * 确认按钮
       */
      confirm() {
        this.setEmit("confirm");
        this.close();
      },
      /**
       * 变化触发
       */
      change() {
        if (!this.insert)
          return;
        this.setEmit("change");
      },
      /**
       * 选择月份触发
       */
      monthSwitch() {
        let {
          year,
          month
        } = this.nowDate;
        this.$emit("monthSwitch", {
          year,
          month: Number(month)
        });
      },
      /**
       * 派发事件
       * @param {Object} name
       */
      setEmit(name) {
        if (!this.range) {
          if (!this.calendar.fullDate) {
            this.calendar = this.cale.getInfo(/* @__PURE__ */ new Date());
            this.tempSingleDate = this.calendar.fullDate;
          }
          if (this.hasTime && !this.time) {
            this.time = getTime(/* @__PURE__ */ new Date(), this.hideSecond);
          }
        }
        let {
          year,
          month,
          date,
          fullDate,
          extraInfo
        } = this.calendar;
        this.$emit(name, {
          range: this.cale.multipleStatus,
          year,
          month,
          date,
          time: this.time,
          timeRange: this.timeRange,
          fulldate: fullDate,
          extraInfo: extraInfo || {}
        });
      },
      /**
       * 选择天触发
       * @param {Object} weeks
       */
      choiceDate(weeks) {
        if (weeks.disable)
          return;
        this.calendar = weeks;
        this.calendar.userChecked = true;
        this.cale.setMultiple(this.calendar.fullDate, true);
        this.weeks = this.cale.weeks;
        this.tempSingleDate = this.calendar.fullDate;
        const beforeDate = new Date(this.cale.multipleStatus.before).getTime();
        const afterDate = new Date(this.cale.multipleStatus.after).getTime();
        if (beforeDate > afterDate && afterDate) {
          this.tempRange.before = this.cale.multipleStatus.after;
          this.tempRange.after = this.cale.multipleStatus.before;
        } else {
          this.tempRange.before = this.cale.multipleStatus.before;
          this.tempRange.after = this.cale.multipleStatus.after;
        }
        this.change();
      },
      changeMonth(type) {
        let newDate;
        if (type === "pre") {
          newDate = this.cale.getPreMonthObj(this.nowDate.fullDate).fullDate;
        } else if (type === "next") {
          newDate = this.cale.getNextMonthObj(this.nowDate.fullDate).fullDate;
        }
        this.setDate(newDate);
        this.monthSwitch();
      },
      /**
       * 设置日期
       * @param {Object} date
       */
      setDate(date) {
        this.cale.setDate(date);
        this.weeks = this.cale.weeks;
        this.nowDate = this.cale.getInfo(date);
      }
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_calendar_item = vue.resolveComponent("calendar-item");
    const _component_time_picker = vue.resolveComponent("time-picker");
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$2);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "uni-calendar",
        onMouseleave: _cache[9] || (_cache[9] = (...args) => $options.leaveCale && $options.leaveCale(...args))
      },
      [
        !$props.insert && $data.show ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: vue.normalizeClass(["uni-calendar__mask", { "uni-calendar--mask-show": $data.aniMaskShow }]),
            onClick: _cache[0] || (_cache[0] = (...args) => $options.maskClick && $options.maskClick(...args))
          },
          null,
          2
          /* CLASS */
        )) : vue.createCommentVNode("v-if", true),
        $props.insert || $data.show ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 1,
            class: vue.normalizeClass(["uni-calendar__content", { "uni-calendar--fixed": !$props.insert, "uni-calendar--ani-show": $data.aniMaskShow, "uni-calendar__content-mobile": $data.aniMaskShow }])
          },
          [
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["uni-calendar__header", { "uni-calendar__header-mobile": !$props.insert }])
              },
              [
                vue.createElementVNode("view", {
                  class: "uni-calendar__header-btn-box",
                  onClick: _cache[1] || (_cache[1] = vue.withModifiers(($event) => $options.changeMonth("pre"), ["stop"]))
                }, [
                  vue.createElementVNode("view", { class: "uni-calendar__header-btn uni-calendar--left" })
                ]),
                vue.createElementVNode("picker", {
                  mode: "date",
                  value: $props.date,
                  fields: "month",
                  onChange: _cache[2] || (_cache[2] = (...args) => $options.bindDateChange && $options.bindDateChange(...args))
                }, [
                  vue.createElementVNode(
                    "text",
                    { class: "uni-calendar__header-text" },
                    vue.toDisplayString(($data.nowDate.year || "") + $options.yearText + ($data.nowDate.month || "") + $options.monthText),
                    1
                    /* TEXT */
                  )
                ], 40, ["value"]),
                vue.createElementVNode("view", {
                  class: "uni-calendar__header-btn-box",
                  onClick: _cache[3] || (_cache[3] = vue.withModifiers(($event) => $options.changeMonth("next"), ["stop"]))
                }, [
                  vue.createElementVNode("view", { class: "uni-calendar__header-btn uni-calendar--right" })
                ]),
                !$props.insert ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "dialog-close",
                  onClick: _cache[4] || (_cache[4] = (...args) => $options.close && $options.close(...args))
                }, [
                  vue.createElementVNode("view", {
                    class: "dialog-close-plus",
                    "data-id": "close"
                  }),
                  vue.createElementVNode("view", {
                    class: "dialog-close-plus dialog-close-rotate",
                    "data-id": "close"
                  })
                ])) : vue.createCommentVNode("v-if", true)
              ],
              2
              /* CLASS */
            ),
            vue.createElementVNode("view", { class: "uni-calendar__box" }, [
              $props.showMonth ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "uni-calendar__box-bg"
              }, [
                vue.createElementVNode(
                  "text",
                  { class: "uni-calendar__box-bg-text" },
                  vue.toDisplayString($data.nowDate.month),
                  1
                  /* TEXT */
                )
              ])) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode("view", {
                class: "uni-calendar__weeks",
                style: { "padding-bottom": "7px" }
              }, [
                vue.createElementVNode("view", { class: "uni-calendar__weeks-day" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "uni-calendar__weeks-day-text" },
                    vue.toDisplayString($options.SUNText),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "uni-calendar__weeks-day" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "uni-calendar__weeks-day-text" },
                    vue.toDisplayString($options.MONText),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "uni-calendar__weeks-day" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "uni-calendar__weeks-day-text" },
                    vue.toDisplayString($options.TUEText),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "uni-calendar__weeks-day" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "uni-calendar__weeks-day-text" },
                    vue.toDisplayString($options.WEDText),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "uni-calendar__weeks-day" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "uni-calendar__weeks-day-text" },
                    vue.toDisplayString($options.THUText),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "uni-calendar__weeks-day" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "uni-calendar__weeks-day-text" },
                    vue.toDisplayString($options.FRIText),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "uni-calendar__weeks-day" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "uni-calendar__weeks-day-text" },
                    vue.toDisplayString($options.SATText),
                    1
                    /* TEXT */
                  )
                ])
              ]),
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($data.weeks, (item, weekIndex) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "uni-calendar__weeks",
                    key: weekIndex
                  }, [
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(item, (weeks, weeksIndex) => {
                        return vue.openBlock(), vue.createElementBlock("view", {
                          class: "uni-calendar__weeks-item",
                          key: weeksIndex
                        }, [
                          vue.createVNode(_component_calendar_item, {
                            class: "uni-calendar-item--hook",
                            weeks,
                            calendar: $data.calendar,
                            selected: $props.selected,
                            checkHover: $props.range,
                            onChange: $options.choiceDate,
                            onHandleMouse: $options.handleMouse
                          }, null, 8, ["weeks", "calendar", "selected", "checkHover", "onChange", "onHandleMouse"])
                        ]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            !$props.insert && !$props.range && $props.hasTime ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "uni-date-changed uni-calendar--fixed-top",
              style: { "padding": "0 80px" }
            }, [
              vue.createElementVNode(
                "view",
                { class: "uni-date-changed--time-date" },
                vue.toDisplayString($data.tempSingleDate ? $data.tempSingleDate : $options.selectDateText),
                1
                /* TEXT */
              ),
              vue.createVNode(_component_time_picker, {
                type: "time",
                start: $options.timepickerStartTime,
                end: $options.timepickerEndTime,
                modelValue: $data.time,
                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.time = $event),
                disabled: !$data.tempSingleDate,
                border: false,
                "hide-second": $props.hideSecond,
                class: "time-picker-style"
              }, null, 8, ["start", "end", "modelValue", "disabled", "hide-second"])
            ])) : vue.createCommentVNode("v-if", true),
            !$props.insert && $props.range && $props.hasTime ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "uni-date-changed uni-calendar--fixed-top"
            }, [
              vue.createElementVNode("view", { class: "uni-date-changed--time-start" }, [
                vue.createElementVNode(
                  "view",
                  { class: "uni-date-changed--time-date" },
                  vue.toDisplayString($data.tempRange.before ? $data.tempRange.before : $options.startDateText),
                  1
                  /* TEXT */
                ),
                vue.createVNode(_component_time_picker, {
                  type: "time",
                  start: $options.timepickerStartTime,
                  modelValue: $data.timeRange.startTime,
                  "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.timeRange.startTime = $event),
                  border: false,
                  "hide-second": $props.hideSecond,
                  disabled: !$data.tempRange.before,
                  class: "time-picker-style"
                }, null, 8, ["start", "modelValue", "hide-second", "disabled"])
              ]),
              vue.createElementVNode("view", { style: { "line-height": "50px" } }, [
                vue.createVNode(_component_uni_icons, {
                  type: "arrowthinright",
                  color: "#999"
                })
              ]),
              vue.createElementVNode("view", { class: "uni-date-changed--time-end" }, [
                vue.createElementVNode(
                  "view",
                  { class: "uni-date-changed--time-date" },
                  vue.toDisplayString($data.tempRange.after ? $data.tempRange.after : $options.endDateText),
                  1
                  /* TEXT */
                ),
                vue.createVNode(_component_time_picker, {
                  type: "time",
                  end: $options.timepickerEndTime,
                  modelValue: $data.timeRange.endTime,
                  "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $data.timeRange.endTime = $event),
                  border: false,
                  "hide-second": $props.hideSecond,
                  disabled: !$data.tempRange.after,
                  class: "time-picker-style"
                }, null, 8, ["end", "modelValue", "hide-second", "disabled"])
              ])
            ])) : vue.createCommentVNode("v-if", true),
            !$props.insert ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 2,
              class: "uni-date-changed uni-date-btn--ok"
            }, [
              vue.createElementVNode(
                "view",
                {
                  class: "uni-datetime-picker--btn",
                  onClick: _cache[8] || (_cache[8] = (...args) => $options.confirm && $options.confirm(...args))
                },
                vue.toDisplayString($options.confirmText),
                1
                /* TEXT */
              )
            ])) : vue.createCommentVNode("v-if", true)
          ],
          2
          /* CLASS */
        )) : vue.createCommentVNode("v-if", true)
      ],
      32
      /* HYDRATE_EVENTS */
    );
  }
  const Calendar = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$9], ["__scopeId", "data-v-1d379219"], ["__file", "D:/ruangong/emosphere/uni_modules/uni-datetime-picker/components/uni-datetime-picker/calendar.vue"]]);
  const _sfc_main$f = {
    name: "UniDatetimePicker",
    options: {
      virtualHost: true
    },
    components: {
      Calendar,
      TimePicker
    },
    data() {
      return {
        isRange: false,
        hasTime: false,
        displayValue: "",
        inputDate: "",
        calendarDate: "",
        pickerTime: "",
        calendarRange: {
          startDate: "",
          startTime: "",
          endDate: "",
          endTime: ""
        },
        displayRangeValue: {
          startDate: "",
          endDate: ""
        },
        tempRange: {
          startDate: "",
          startTime: "",
          endDate: "",
          endTime: ""
        },
        // 左右日历同步数据
        startMultipleStatus: {
          before: "",
          after: "",
          data: [],
          fulldate: ""
        },
        endMultipleStatus: {
          before: "",
          after: "",
          data: [],
          fulldate: ""
        },
        pickerVisible: false,
        pickerPositionStyle: null,
        isEmitValue: false,
        isPhone: false,
        isFirstShow: true,
        i18nT: () => {
        }
      };
    },
    props: {
      type: {
        type: String,
        default: "datetime"
      },
      value: {
        type: [String, Number, Array, Date],
        default: ""
      },
      modelValue: {
        type: [String, Number, Array, Date],
        default: ""
      },
      start: {
        type: [Number, String],
        default: ""
      },
      end: {
        type: [Number, String],
        default: ""
      },
      returnType: {
        type: String,
        default: "string"
      },
      placeholder: {
        type: String,
        default: ""
      },
      startPlaceholder: {
        type: String,
        default: ""
      },
      endPlaceholder: {
        type: String,
        default: ""
      },
      rangeSeparator: {
        type: String,
        default: "-"
      },
      border: {
        type: [Boolean],
        default: true
      },
      disabled: {
        type: [Boolean],
        default: false
      },
      clearIcon: {
        type: [Boolean],
        default: true
      },
      hideSecond: {
        type: [Boolean],
        default: false
      },
      defaultValue: {
        type: [String, Object, Array],
        default: ""
      }
    },
    watch: {
      type: {
        immediate: true,
        handler(newVal) {
          this.hasTime = newVal.indexOf("time") !== -1;
          this.isRange = newVal.indexOf("range") !== -1;
        }
      },
      modelValue: {
        immediate: true,
        handler(newVal) {
          if (this.isEmitValue) {
            this.isEmitValue = false;
            return;
          }
          this.initPicker(newVal);
        }
      },
      start: {
        immediate: true,
        handler(newVal) {
          if (!newVal)
            return;
          this.calendarRange.startDate = getDate(newVal);
          if (this.hasTime) {
            this.calendarRange.startTime = getTime(newVal);
          }
        }
      },
      end: {
        immediate: true,
        handler(newVal) {
          if (!newVal)
            return;
          this.calendarRange.endDate = getDate(newVal);
          if (this.hasTime) {
            this.calendarRange.endTime = getTime(newVal, this.hideSecond);
          }
        }
      }
    },
    computed: {
      timepickerStartTime() {
        const activeDate = this.isRange ? this.tempRange.startDate : this.inputDate;
        return activeDate === this.calendarRange.startDate ? this.calendarRange.startTime : "";
      },
      timepickerEndTime() {
        const activeDate = this.isRange ? this.tempRange.endDate : this.inputDate;
        return activeDate === this.calendarRange.endDate ? this.calendarRange.endTime : "";
      },
      mobileCalendarTime() {
        const timeRange = {
          start: this.tempRange.startTime,
          end: this.tempRange.endTime
        };
        return this.isRange ? timeRange : this.pickerTime;
      },
      mobSelectableTime() {
        return {
          start: this.calendarRange.startTime,
          end: this.calendarRange.endTime
        };
      },
      datePopupWidth() {
        return this.isRange ? 653 : 301;
      },
      /**
       * for i18n
       */
      singlePlaceholderText() {
        return this.placeholder || (this.type === "date" ? this.selectDateText : this.selectDateTimeText);
      },
      startPlaceholderText() {
        return this.startPlaceholder || this.startDateText;
      },
      endPlaceholderText() {
        return this.endPlaceholder || this.endDateText;
      },
      selectDateText() {
        return this.i18nT("uni-datetime-picker.selectDate");
      },
      selectDateTimeText() {
        return this.i18nT("uni-datetime-picker.selectDateTime");
      },
      selectTimeText() {
        return this.i18nT("uni-datetime-picker.selectTime");
      },
      startDateText() {
        return this.startPlaceholder || this.i18nT("uni-datetime-picker.startDate");
      },
      startTimeText() {
        return this.i18nT("uni-datetime-picker.startTime");
      },
      endDateText() {
        return this.endPlaceholder || this.i18nT("uni-datetime-picker.endDate");
      },
      endTimeText() {
        return this.i18nT("uni-datetime-picker.endTime");
      },
      okText() {
        return this.i18nT("uni-datetime-picker.ok");
      },
      clearText() {
        return this.i18nT("uni-datetime-picker.clear");
      },
      showClearIcon() {
        return this.clearIcon && !this.disabled && (this.displayValue || this.displayRangeValue.startDate && this.displayRangeValue.endDate);
      }
    },
    created() {
      this.initI18nT();
      this.platform();
    },
    methods: {
      initI18nT() {
        const vueI18n = initVueI18n(i18nMessages);
        this.i18nT = vueI18n.t;
      },
      initPicker(newVal) {
        if (!newVal && !this.defaultValue || Array.isArray(newVal) && !newVal.length) {
          this.$nextTick(() => {
            this.clear(false);
          });
          return;
        }
        if (!Array.isArray(newVal) && !this.isRange) {
          if (newVal) {
            this.displayValue = this.inputDate = this.calendarDate = getDate(newVal);
            if (this.hasTime) {
              this.pickerTime = getTime(newVal, this.hideSecond);
              this.displayValue = `${this.displayValue} ${this.pickerTime}`;
            }
          } else if (this.defaultValue) {
            this.inputDate = this.calendarDate = getDate(this.defaultValue);
            if (this.hasTime) {
              this.pickerTime = getTime(this.defaultValue, this.hideSecond);
            }
          }
        } else {
          const [before, after] = newVal;
          if (!before && !after)
            return;
          const beforeDate = getDate(before);
          const beforeTime = getTime(before, this.hideSecond);
          const afterDate = getDate(after);
          const afterTime = getTime(after, this.hideSecond);
          const startDate = beforeDate;
          const endDate = afterDate;
          this.displayRangeValue.startDate = this.tempRange.startDate = startDate;
          this.displayRangeValue.endDate = this.tempRange.endDate = endDate;
          if (this.hasTime) {
            this.displayRangeValue.startDate = `${beforeDate} ${beforeTime}`;
            this.displayRangeValue.endDate = `${afterDate} ${afterTime}`;
            this.tempRange.startTime = beforeTime;
            this.tempRange.endTime = afterTime;
          }
          const defaultRange = {
            before: beforeDate,
            after: afterDate
          };
          this.startMultipleStatus = Object.assign({}, this.startMultipleStatus, defaultRange, {
            which: "right"
          });
          this.endMultipleStatus = Object.assign({}, this.endMultipleStatus, defaultRange, {
            which: "left"
          });
        }
      },
      updateLeftCale(e2) {
        const left = this.$refs.left;
        left.cale.setHoverMultiple(e2.after);
        left.setDate(this.$refs.left.nowDate.fullDate);
      },
      updateRightCale(e2) {
        const right = this.$refs.right;
        right.cale.setHoverMultiple(e2.after);
        right.setDate(this.$refs.right.nowDate.fullDate);
      },
      platform() {
        const { windowWidth } = uni.getSystemInfoSync();
        this.isPhone = windowWidth <= 500;
        this.windowWidth = windowWidth;
      },
      show() {
        if (this.disabled) {
          return;
        }
        this.platform();
        if (this.isPhone) {
          this.$refs.mobile.open();
          return;
        }
        this.pickerPositionStyle = {
          top: "10px"
        };
        const dateEditor = uni.createSelectorQuery().in(this).select(".uni-date-editor");
        dateEditor.boundingClientRect((rect) => {
          if (this.windowWidth - rect.left < this.datePopupWidth) {
            this.pickerPositionStyle.right = 0;
          }
        }).exec();
        setTimeout(() => {
          this.pickerVisible = !this.pickerVisible;
          if (!this.isPhone && this.isRange && this.isFirstShow) {
            this.isFirstShow = false;
            const {
              startDate,
              endDate
            } = this.calendarRange;
            if (startDate && endDate) {
              if (this.diffDate(startDate, endDate) < 30) {
                this.$refs.right.changeMonth("pre");
              }
            } else {
              this.$refs.right.changeMonth("next");
              this.$refs.right.cale.lastHover = false;
            }
          }
        }, 50);
      },
      close() {
        setTimeout(() => {
          this.pickerVisible = false;
          this.$emit("maskClick", this.value);
          this.$refs.mobile && this.$refs.mobile.close();
        }, 20);
      },
      setEmit(value) {
        if (this.returnType === "timestamp" || this.returnType === "date") {
          if (!Array.isArray(value)) {
            if (!this.hasTime) {
              value = value + " 00:00:00";
            }
            value = this.createTimestamp(value);
            if (this.returnType === "date") {
              value = new Date(value);
            }
          } else {
            if (!this.hasTime) {
              value[0] = value[0] + " 00:00:00";
              value[1] = value[1] + " 00:00:00";
            }
            value[0] = this.createTimestamp(value[0]);
            value[1] = this.createTimestamp(value[1]);
            if (this.returnType === "date") {
              value[0] = new Date(value[0]);
              value[1] = new Date(value[1]);
            }
          }
        }
        this.$emit("update:modelValue", value);
        this.$emit("input", value);
        this.$emit("change", value);
        this.isEmitValue = true;
      },
      createTimestamp(date) {
        date = fixIosDateFormat(date);
        return Date.parse(new Date(date));
      },
      singleChange(e2) {
        this.calendarDate = this.inputDate = e2.fulldate;
        if (this.hasTime)
          return;
        this.confirmSingleChange();
      },
      confirmSingleChange() {
        if (!checkDate(this.inputDate)) {
          const now = /* @__PURE__ */ new Date();
          this.calendarDate = this.inputDate = getDate(now);
          this.pickerTime = getTime(now, this.hideSecond);
        }
        let startLaterInputDate = false;
        let startDate, startTime;
        if (this.start) {
          let startString = this.start;
          if (typeof this.start === "number") {
            startString = getDateTime(this.start, this.hideSecond);
          }
          [startDate, startTime] = startString.split(" ");
          if (this.start && !dateCompare(startDate, this.inputDate)) {
            startLaterInputDate = true;
            this.inputDate = startDate;
          }
        }
        let endEarlierInputDate = false;
        let endDate, endTime;
        if (this.end) {
          let endString = this.end;
          if (typeof this.end === "number") {
            endString = getDateTime(this.end, this.hideSecond);
          }
          [endDate, endTime] = endString.split(" ");
          if (this.end && !dateCompare(this.inputDate, endDate)) {
            endEarlierInputDate = true;
            this.inputDate = endDate;
          }
        }
        if (this.hasTime) {
          if (startLaterInputDate) {
            this.pickerTime = startTime || getDefaultSecond(this.hideSecond);
          }
          if (endEarlierInputDate) {
            this.pickerTime = endTime || getDefaultSecond(this.hideSecond);
          }
          if (!this.pickerTime) {
            this.pickerTime = getTime(Date.now(), this.hideSecond);
          }
          this.displayValue = `${this.inputDate} ${this.pickerTime}`;
        } else {
          this.displayValue = this.inputDate;
        }
        this.setEmit(this.displayValue);
        this.pickerVisible = false;
      },
      leftChange(e2) {
        const {
          before,
          after
        } = e2.range;
        this.rangeChange(before, after);
        const obj = {
          before: e2.range.before,
          after: e2.range.after,
          data: e2.range.data,
          fulldate: e2.fulldate
        };
        this.startMultipleStatus = Object.assign({}, this.startMultipleStatus, obj);
      },
      rightChange(e2) {
        const {
          before,
          after
        } = e2.range;
        this.rangeChange(before, after);
        const obj = {
          before: e2.range.before,
          after: e2.range.after,
          data: e2.range.data,
          fulldate: e2.fulldate
        };
        this.endMultipleStatus = Object.assign({}, this.endMultipleStatus, obj);
      },
      mobileChange(e2) {
        if (this.isRange) {
          const { before, after } = e2.range;
          if (!before || !after) {
            return;
          }
          this.handleStartAndEnd(before, after, true);
          if (this.hasTime) {
            const {
              startTime,
              endTime
            } = e2.timeRange;
            this.tempRange.startTime = startTime;
            this.tempRange.endTime = endTime;
          }
          this.confirmRangeChange();
        } else {
          if (this.hasTime) {
            this.displayValue = e2.fulldate + " " + e2.time;
          } else {
            this.displayValue = e2.fulldate;
          }
          this.setEmit(this.displayValue);
        }
        this.$refs.mobile.close();
      },
      rangeChange(before, after) {
        if (!(before && after))
          return;
        this.handleStartAndEnd(before, after, true);
        if (this.hasTime)
          return;
        this.confirmRangeChange();
      },
      confirmRangeChange() {
        if (!this.tempRange.startDate || !this.tempRange.endDate) {
          this.pickerVisible = false;
          return;
        }
        if (!checkDate(this.tempRange.startDate)) {
          this.tempRange.startDate = getDate(Date.now());
        }
        if (!checkDate(this.tempRange.endDate)) {
          this.tempRange.endDate = getDate(Date.now());
        }
        let start, end;
        let startDateLaterRangeStartDate = false;
        let startDateLaterRangeEndDate = false;
        let startDate, startTime;
        if (this.start) {
          let startString = this.start;
          if (typeof this.start === "number") {
            startString = getDateTime(this.start, this.hideSecond);
          }
          [startDate, startTime] = startString.split(" ");
          if (this.start && !dateCompare(this.start, this.tempRange.startDate)) {
            startDateLaterRangeStartDate = true;
            this.tempRange.startDate = startDate;
          }
          if (this.start && !dateCompare(this.start, this.tempRange.endDate)) {
            startDateLaterRangeEndDate = true;
            this.tempRange.endDate = startDate;
          }
        }
        let endDateEarlierRangeStartDate = false;
        let endDateEarlierRangeEndDate = false;
        let endDate, endTime;
        if (this.end) {
          let endString = this.end;
          if (typeof this.end === "number") {
            endString = getDateTime(this.end, this.hideSecond);
          }
          [endDate, endTime] = endString.split(" ");
          if (this.end && !dateCompare(this.tempRange.startDate, this.end)) {
            endDateEarlierRangeStartDate = true;
            this.tempRange.startDate = endDate;
          }
          if (this.end && !dateCompare(this.tempRange.endDate, this.end)) {
            endDateEarlierRangeEndDate = true;
            this.tempRange.endDate = endDate;
          }
        }
        if (!this.hasTime) {
          start = this.displayRangeValue.startDate = this.tempRange.startDate;
          end = this.displayRangeValue.endDate = this.tempRange.endDate;
        } else {
          if (startDateLaterRangeStartDate) {
            this.tempRange.startTime = startTime || getDefaultSecond(this.hideSecond);
          } else if (endDateEarlierRangeStartDate) {
            this.tempRange.startTime = endTime || getDefaultSecond(this.hideSecond);
          }
          if (!this.tempRange.startTime) {
            this.tempRange.startTime = getTime(Date.now(), this.hideSecond);
          }
          if (startDateLaterRangeEndDate) {
            this.tempRange.endTime = startTime || getDefaultSecond(this.hideSecond);
          } else if (endDateEarlierRangeEndDate) {
            this.tempRange.endTime = endTime || getDefaultSecond(this.hideSecond);
          }
          if (!this.tempRange.endTime) {
            this.tempRange.endTime = getTime(Date.now(), this.hideSecond);
          }
          start = this.displayRangeValue.startDate = `${this.tempRange.startDate} ${this.tempRange.startTime}`;
          end = this.displayRangeValue.endDate = `${this.tempRange.endDate} ${this.tempRange.endTime}`;
        }
        if (!dateCompare(start, end)) {
          [start, end] = [end, start];
        }
        this.displayRangeValue.startDate = start;
        this.displayRangeValue.endDate = end;
        const displayRange = [start, end];
        this.setEmit(displayRange);
        this.pickerVisible = false;
      },
      handleStartAndEnd(before, after, temp = false) {
        if (!(before && after))
          return;
        const type = temp ? "tempRange" : "range";
        const isStartEarlierEnd = dateCompare(before, after);
        this[type].startDate = isStartEarlierEnd ? before : after;
        this[type].endDate = isStartEarlierEnd ? after : before;
      },
      /**
       * 比较时间大小
       */
      dateCompare(startDate, endDate) {
        startDate = new Date(startDate.replace("-", "/").replace("-", "/"));
        endDate = new Date(endDate.replace("-", "/").replace("-", "/"));
        return startDate <= endDate;
      },
      /**
       * 比较时间差
       */
      diffDate(startDate, endDate) {
        startDate = new Date(startDate.replace("-", "/").replace("-", "/"));
        endDate = new Date(endDate.replace("-", "/").replace("-", "/"));
        const diff = (endDate - startDate) / (24 * 60 * 60 * 1e3);
        return Math.abs(diff);
      },
      clear(needEmit = true) {
        if (!this.isRange) {
          this.displayValue = "";
          this.inputDate = "";
          this.pickerTime = "";
          if (this.isPhone) {
            this.$refs.mobile && this.$refs.mobile.clearCalender();
          } else {
            this.$refs.pcSingle && this.$refs.pcSingle.clearCalender();
          }
          if (needEmit) {
            this.$emit("change", "");
            this.$emit("input", "");
            this.$emit("update:modelValue", "");
          }
        } else {
          this.displayRangeValue.startDate = "";
          this.displayRangeValue.endDate = "";
          this.tempRange.startDate = "";
          this.tempRange.startTime = "";
          this.tempRange.endDate = "";
          this.tempRange.endTime = "";
          if (this.isPhone) {
            this.$refs.mobile && this.$refs.mobile.clearCalender();
          } else {
            this.$refs.left && this.$refs.left.clearCalender();
            this.$refs.right && this.$refs.right.clearCalender();
            this.$refs.right && this.$refs.right.changeMonth("next");
          }
          if (needEmit) {
            this.$emit("change", []);
            this.$emit("input", []);
            this.$emit("update:modelValue", []);
          }
        }
      }
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$2);
    const _component_time_picker = vue.resolveComponent("time-picker");
    const _component_Calendar = vue.resolveComponent("Calendar");
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-date" }, [
      vue.createElementVNode("view", {
        class: "uni-date-editor",
        onClick: _cache[1] || (_cache[1] = (...args) => $options.show && $options.show(...args))
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["uni-date-editor--x", { "uni-date-editor--x__disabled": $props.disabled, "uni-date-x--border": $props.border }])
            },
            [
              !$data.isRange ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "uni-date-x uni-date-single"
              }, [
                vue.createVNode(_component_uni_icons, {
                  class: "icon-calendar",
                  type: "calendar",
                  color: "#c0c4cc",
                  size: "22"
                }),
                vue.createElementVNode(
                  "view",
                  { class: "uni-date__x-input" },
                  vue.toDisplayString($data.displayValue || $options.singlePlaceholderText),
                  1
                  /* TEXT */
                )
              ])) : (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "uni-date-x uni-date-range"
              }, [
                vue.createVNode(_component_uni_icons, {
                  class: "icon-calendar",
                  type: "calendar",
                  color: "#c0c4cc",
                  size: "22"
                }),
                vue.createElementVNode(
                  "view",
                  { class: "uni-date__x-input text-center" },
                  vue.toDisplayString($data.displayRangeValue.startDate || $options.startPlaceholderText),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  { class: "range-separator" },
                  vue.toDisplayString($props.rangeSeparator),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  { class: "uni-date__x-input text-center" },
                  vue.toDisplayString($data.displayRangeValue.endDate || $options.endPlaceholderText),
                  1
                  /* TEXT */
                )
              ])),
              $options.showClearIcon ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 2,
                class: "uni-date__icon-clear",
                onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.clear && $options.clear(...args), ["stop"]))
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: "clear",
                  color: "#c0c4cc",
                  size: "22"
                })
              ])) : vue.createCommentVNode("v-if", true)
            ],
            2
            /* CLASS */
          )
        ], true)
      ]),
      vue.withDirectives(vue.createElementVNode(
        "view",
        {
          class: "uni-date-mask--pc",
          onClick: _cache[2] || (_cache[2] = (...args) => $options.close && $options.close(...args))
        },
        null,
        512
        /* NEED_PATCH */
      ), [
        [vue.vShow, $data.pickerVisible]
      ]),
      !$data.isPhone ? vue.withDirectives((vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          ref: "datePicker",
          class: "uni-date-picker__container"
        },
        [
          !$data.isRange ? (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 0,
              class: "uni-date-single--x",
              style: vue.normalizeStyle($data.pickerPositionStyle)
            },
            [
              vue.createElementVNode("view", { class: "uni-popper__arrow" }),
              $data.hasTime ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "uni-date-changed popup-x-header"
              }, [
                vue.withDirectives(vue.createElementVNode("input", {
                  class: "uni-date__input text-center",
                  type: "text",
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.inputDate = $event),
                  placeholder: $options.selectDateText
                }, null, 8, ["placeholder"]), [
                  [vue.vModelText, $data.inputDate]
                ]),
                vue.createVNode(_component_time_picker, {
                  type: "time",
                  modelValue: $data.pickerTime,
                  "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.pickerTime = $event),
                  border: false,
                  disabled: !$data.inputDate,
                  start: $options.timepickerStartTime,
                  end: $options.timepickerEndTime,
                  hideSecond: $props.hideSecond,
                  style: { "width": "100%" }
                }, {
                  default: vue.withCtx(() => [
                    vue.withDirectives(vue.createElementVNode("input", {
                      class: "uni-date__input text-center",
                      type: "text",
                      "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $data.pickerTime = $event),
                      placeholder: $options.selectTimeText,
                      disabled: !$data.inputDate
                    }, null, 8, ["placeholder", "disabled"]), [
                      [vue.vModelText, $data.pickerTime]
                    ])
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["modelValue", "disabled", "start", "end", "hideSecond"])
              ])) : vue.createCommentVNode("v-if", true),
              vue.createVNode(_component_Calendar, {
                ref: "pcSingle",
                showMonth: false,
                "start-date": $data.calendarRange.startDate,
                "end-date": $data.calendarRange.endDate,
                date: $data.calendarDate,
                onChange: $options.singleChange,
                "default-value": $props.defaultValue,
                style: { "padding": "0 8px" }
              }, null, 8, ["start-date", "end-date", "date", "onChange", "default-value"]),
              $data.hasTime ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "popup-x-footer"
              }, [
                vue.createElementVNode(
                  "text",
                  {
                    class: "confirm-text",
                    onClick: _cache[6] || (_cache[6] = (...args) => $options.confirmSingleChange && $options.confirmSingleChange(...args))
                  },
                  vue.toDisplayString($options.okText),
                  1
                  /* TEXT */
                )
              ])) : vue.createCommentVNode("v-if", true)
            ],
            4
            /* STYLE */
          )) : (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 1,
              class: "uni-date-range--x",
              style: vue.normalizeStyle($data.pickerPositionStyle)
            },
            [
              vue.createElementVNode("view", { class: "uni-popper__arrow" }),
              $data.hasTime ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "popup-x-header uni-date-changed"
              }, [
                vue.createElementVNode("view", { class: "popup-x-header--datetime" }, [
                  vue.withDirectives(vue.createElementVNode("input", {
                    class: "uni-date__input uni-date-range__input",
                    type: "text",
                    "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $data.tempRange.startDate = $event),
                    placeholder: $options.startDateText
                  }, null, 8, ["placeholder"]), [
                    [vue.vModelText, $data.tempRange.startDate]
                  ]),
                  vue.createVNode(_component_time_picker, {
                    type: "time",
                    modelValue: $data.tempRange.startTime,
                    "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $data.tempRange.startTime = $event),
                    start: $options.timepickerStartTime,
                    border: false,
                    disabled: !$data.tempRange.startDate,
                    hideSecond: $props.hideSecond
                  }, {
                    default: vue.withCtx(() => [
                      vue.withDirectives(vue.createElementVNode("input", {
                        class: "uni-date__input uni-date-range__input",
                        type: "text",
                        "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $data.tempRange.startTime = $event),
                        placeholder: $options.startTimeText,
                        disabled: !$data.tempRange.startDate
                      }, null, 8, ["placeholder", "disabled"]), [
                        [vue.vModelText, $data.tempRange.startTime]
                      ])
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["modelValue", "start", "disabled", "hideSecond"])
                ]),
                vue.createVNode(_component_uni_icons, {
                  type: "arrowthinright",
                  color: "#999",
                  style: { "line-height": "40px" }
                }),
                vue.createElementVNode("view", { class: "popup-x-header--datetime" }, [
                  vue.withDirectives(vue.createElementVNode("input", {
                    class: "uni-date__input uni-date-range__input",
                    type: "text",
                    "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $data.tempRange.endDate = $event),
                    placeholder: $options.endDateText
                  }, null, 8, ["placeholder"]), [
                    [vue.vModelText, $data.tempRange.endDate]
                  ]),
                  vue.createVNode(_component_time_picker, {
                    type: "time",
                    modelValue: $data.tempRange.endTime,
                    "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => $data.tempRange.endTime = $event),
                    end: $options.timepickerEndTime,
                    border: false,
                    disabled: !$data.tempRange.endDate,
                    hideSecond: $props.hideSecond
                  }, {
                    default: vue.withCtx(() => [
                      vue.withDirectives(vue.createElementVNode("input", {
                        class: "uni-date__input uni-date-range__input",
                        type: "text",
                        "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => $data.tempRange.endTime = $event),
                        placeholder: $options.endTimeText,
                        disabled: !$data.tempRange.endDate
                      }, null, 8, ["placeholder", "disabled"]), [
                        [vue.vModelText, $data.tempRange.endTime]
                      ])
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["modelValue", "end", "disabled", "hideSecond"])
                ])
              ])) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode("view", { class: "popup-x-body" }, [
                vue.createVNode(_component_Calendar, {
                  ref: "left",
                  showMonth: false,
                  "start-date": $data.calendarRange.startDate,
                  "end-date": $data.calendarRange.endDate,
                  range: true,
                  pleStatus: $data.endMultipleStatus,
                  onChange: $options.leftChange,
                  onFirstEnterCale: $options.updateRightCale,
                  style: { "padding": "0 8px" }
                }, null, 8, ["start-date", "end-date", "pleStatus", "onChange", "onFirstEnterCale"]),
                vue.createVNode(_component_Calendar, {
                  ref: "right",
                  showMonth: false,
                  "start-date": $data.calendarRange.startDate,
                  "end-date": $data.calendarRange.endDate,
                  range: true,
                  onChange: $options.rightChange,
                  pleStatus: $data.startMultipleStatus,
                  onFirstEnterCale: $options.updateLeftCale,
                  style: { "padding": "0 8px", "border-left": "1px solid #F1F1F1" }
                }, null, 8, ["start-date", "end-date", "onChange", "pleStatus", "onFirstEnterCale"])
              ]),
              $data.hasTime ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "popup-x-footer"
              }, [
                vue.createElementVNode(
                  "text",
                  {
                    onClick: _cache[13] || (_cache[13] = (...args) => $options.clear && $options.clear(...args))
                  },
                  vue.toDisplayString($options.clearText),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "text",
                  {
                    class: "confirm-text",
                    onClick: _cache[14] || (_cache[14] = (...args) => $options.confirmRangeChange && $options.confirmRangeChange(...args))
                  },
                  vue.toDisplayString($options.okText),
                  1
                  /* TEXT */
                )
              ])) : vue.createCommentVNode("v-if", true)
            ],
            4
            /* STYLE */
          ))
        ],
        512
        /* NEED_PATCH */
      )), [
        [vue.vShow, $data.pickerVisible]
      ]) : vue.createCommentVNode("v-if", true),
      $data.isPhone ? (vue.openBlock(), vue.createBlock(_component_Calendar, {
        key: 1,
        ref: "mobile",
        clearDate: false,
        date: $data.calendarDate,
        defTime: $options.mobileCalendarTime,
        "start-date": $data.calendarRange.startDate,
        "end-date": $data.calendarRange.endDate,
        selectableTimes: $options.mobSelectableTime,
        startPlaceholder: $props.startPlaceholder,
        endPlaceholder: $props.endPlaceholder,
        "default-value": $props.defaultValue,
        pleStatus: $data.endMultipleStatus,
        showMonth: false,
        range: $data.isRange,
        hasTime: $data.hasTime,
        insert: false,
        hideSecond: $props.hideSecond,
        onConfirm: $options.mobileChange,
        onMaskClose: $options.close
      }, null, 8, ["date", "defTime", "start-date", "end-date", "selectableTimes", "startPlaceholder", "endPlaceholder", "default-value", "pleStatus", "range", "hasTime", "hideSecond", "onConfirm", "onMaskClose"])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$8], ["__scopeId", "data-v-9802168a"], ["__file", "D:/ruangong/emosphere/uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.vue"]]);
  const _sfc_main$e = {
    setup() {
      let router2 = j();
      const single = vue.ref("");
      let usernameInput = vue.ref(store.state.username);
      let statusInput = vue.ref(store.state.userstatus);
      let selectedGender = vue.ref(store.state.usergender);
      let imageList = vue.ref([]);
      const upload = () => {
        uni.chooseImage({
          count: 1,
          sizeType: ["original", "compressed"],
          sourceType: ["album"],
          loop: true,
          success: (res) => {
            formatAppLog("log", "at pages/set/set.vue:65", res);
            if (res.tempFilePaths.length !== 0) {
              imageList.value.push(res.tempFilePaths[0]);
              var tempFilePaths = res.tempFilePaths;
              formatAppLog("log", "at pages/set/set.vue:69", tempFilePaths[0]);
              uni.uploadFile({
                url: "http://8.136.81.197:8080/qiniu/file",
                filePath: tempFilePaths[0],
                name: "file",
                success: function(res2) {
                  formatAppLog("log", "at pages/set/set.vue:75", res2.data);
                  const responseData = JSON.parse(res2.data);
                  store.commit("setPath", responseData.url);
                  formatAppLog("log", "at pages/set/set.vue:78", store.state.ImagePath);
                },
                fail: function(res2) {
                  formatAppLog("log", "at pages/set/set.vue:81", res2.errMsg);
                }
              });
            }
          }
        });
      };
      const tiao = () => {
        router2.replace("/pages/myScreen/myScreen");
      };
      const del = (index) => {
        imageList.value.splice(index, 1);
        formatAppLog("log", "at pages/set/set.vue:93", imageList);
      };
      const tomain = () => {
        let userName = usernameInput.value;
        let userBirthday = single.value;
        let userGender = selectedGender.value;
        let userStatus = statusInput.value;
        store.state.userId;
        let imagepath = store.state.ImagePath;
        uni.request({
          url: "http://8.136.81.197:8080/user/update",
          method: "POST",
          data: {
            id: store.state.userId,
            birthday: userBirthday,
            gender: userGender,
            username: userName,
            avatar: imagepath
          },
          success: (response) => {
            const user = response.data["user"];
            formatAppLog("log", "at pages/set/set.vue:115", response.data);
            let formattedBirthday = user.birthday.substring(0, 10);
            store.commit("upData", {
              username: user.username,
              userBirthday: formattedBirthday,
              userGender: user.gender,
              userstatus: userStatus,
              imagepath: user.avatar
            });
            formatAppLog("log", "at pages/set/set.vue:125", store.state.username, store.state.userBirthday, store.state.userGender, store.state.ImagePath);
            router2.replace("/pages/aboutme/aboutme");
          },
          fail: (error) => {
            formatAppLog("error", "at pages/set/set.vue:129", error);
          }
        });
      };
      return {
        single,
        tomain,
        usernameInput,
        statusInput,
        selectedGender,
        tiao,
        imageList,
        upload,
        del
      };
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_datetime_picker = resolveEasycom(vue.resolveDynamicComponent("uni-datetime-picker"), __easycom_0$1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "backarea" }, [
      vue.createElementVNode("view", {
        class: "box",
        style: { "width": "100%", "height": "5%" }
      }),
      vue.createElementVNode("view", {
        class: "header",
        onClick: _cache[0] || (_cache[0] = (...args) => $setup.tiao && $setup.tiao(...args))
      }, [
        vue.createElementVNode("view", { class: "head-left" }, [
          vue.createElementVNode("image", { src: "/static/images/fanhui.png" }),
          vue.createElementVNode("text", null, "返回")
        ])
      ]),
      vue.createElementVNode("view", { class: "info" }, [
        vue.createElementVNode("div", { class: "circle" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.imageList, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "sc2",
                key: index
              }, [
                vue.createElementVNode("image", {
                  class: "del",
                  onClick: ($event) => $setup.del(index),
                  src: "/static/images/shanchu.png",
                  mode: ""
                }, null, 8, ["onClick"]),
                vue.createElementVNode("image", {
                  class: "image3",
                  src: item,
                  mode: ""
                }, null, 8, ["src"])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          )),
          $setup.imageList.length < 1 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "sc2",
            onClick: _cache[1] || (_cache[1] = (...args) => $setup.upload && $setup.upload(...args))
          }, [
            vue.createElementVNode("image", {
              class: "sc3",
              src: "/static/images/touxiang.png",
              mode: ""
            })
          ])) : vue.createCommentVNode("v-if", true)
        ]),
        vue.createElementVNode("view", { class: "info-item" }, [
          vue.createElementVNode("text", { class: "label" }, "昵称:"),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              class: "left",
              type: "text",
              placeholder: "请填写",
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.usernameInput = $event)
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.usernameInput]
          ])
        ]),
        vue.createElementVNode("view", { class: "info-item" }, [
          vue.createElementVNode("text", { class: "label" }, "性别:"),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              class: "left",
              type: "text",
              placeholder: "请填写",
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.selectedGender = $event)
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.selectedGender]
          ])
        ]),
        vue.createElementVNode("view", { class: "info-item" }, [
          vue.createElementVNode("text", { class: "label" }, "生日:"),
          vue.createVNode(_component_uni_datetime_picker, {
            class: "left",
            type: "date",
            "clear-icon": true,
            modelValue: $setup.single,
            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.single = $event)
          }, null, 8, ["modelValue"])
        ]),
        vue.createElementVNode("view", { class: "info-item" }, [
          vue.createElementVNode("text", { class: "label" }, "常住地:"),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              class: "left",
              type: "text",
              placeholder: "请填写",
              "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.statusInput = $event)
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.statusInput]
          ])
        ]),
        vue.createElementVNode("view", {
          class: "login-card-loginIn-btn",
          onClick: _cache[6] || (_cache[6] = (...args) => $setup.tomain && $setup.tomain(...args))
        }, " 设置完成 ")
      ])
    ]);
  }
  const PagesSetSet = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$7], ["__file", "D:/ruangong/emosphere/pages/set/set.vue"]]);
  const icons = {
    "about": "",
    "about-fill": "",
    "add": "",
    "add-fill": "",
    "addmessage": "",
    "addressbook": "",
    "agree": "",
    "agree-fill": "",
    "alarm": "",
    "alarm-fill": "",
    "alipay": "",
    "android": "",
    "applets": "",
    "arrowdown": "",
    "arrowleft": "",
    "arrowright": "",
    "arrowup": "",
    "attestation": "",
    "back": "",
    "bag": "",
    "bag-fill": "",
    "balloon": "",
    "bankcard": "",
    "bankcard-fill": "",
    "bottom": "",
    "calendar": "",
    "camera": "",
    "camera-fill": "",
    "camera-add": "",
    "card": "",
    "card-fill": "",
    "cart": "",
    "cart-fill": "",
    "category": "",
    "category-fill": "",
    "check": "",
    "circle": "",
    "circle-fill": "",
    "circle-selected": "",
    "clock": "",
    "clock-fill": "",
    "close": "",
    "close-fill": "",
    "community": "",
    "community-fill": "",
    "computer": "",
    "computer-fill": "",
    "coupon": "",
    "delete": "",
    "deletekey": "",
    "dingtalk": "",
    "dissatisfied": "",
    "down": "",
    "download": "",
    "edit": "",
    "ellipsis": "",
    "enlarge": "",
    "evaluate": "",
    "exchange": "",
    "explain": "",
    "explain-fill": "",
    "explore": "",
    "explore-fill": "",
    "eye": "",
    "feedback": "",
    "fingerprint": "",
    "friendadd": "",
    "friendadd-fill": "",
    "gps": "",
    "histogram": "",
    "home": "",
    "home-fill": "",
    "house": "",
    "imface": "",
    "imkeyboard": "",
    "immore": "",
    "imvoice": "",
    "ios": "",
    "kefu": "",
    "label": "",
    "label-fill": "",
    "like": "",
    "like-fill": "",
    "link": "",
    "listview": "",
    "loading": "",
    "location": "",
    "mail": "",
    "mail-fill": "",
    "manage": "",
    "manage-fill": "",
    "member": "",
    "member-fill": "",
    "message": "",
    "message-fill": "",
    "mobile": "",
    "moments": "",
    "more": "",
    "more-fill": "",
    "narrow": "",
    "news": "",
    "news-fill": "",
    "nodata": "",
    "notice": "",
    "notice-fill": "",
    "offline": "",
    "offline-fill": "",
    "oppose": "",
    "oppose-fill": "",
    "order": "",
    "partake": "",
    "people": "",
    "people-fill": "",
    "pic": "",
    "pic-fill": "",
    "picture": "",
    "pie": "",
    "plus": "",
    "polygonal": "",
    "position": "",
    "pwd": "",
    "qq": "",
    "qrcode": "",
    "redpacket": "",
    "redpacket-fill": "",
    "reduce": "",
    "refresh": "",
    "revoke": "",
    "satisfied": "",
    "screen": "",
    "search": "",
    "search-2": "",
    "send": "",
    "service": "",
    "service-fill": "",
    "setup": "",
    "setup-fill": "",
    "share": "",
    "share-fill": "",
    "shield": "",
    "shop": "",
    "shop-fill": "",
    "shut": "",
    "signin": "",
    "sina": "",
    "skin": "",
    "soso": "",
    "square": "",
    "square-fill": "",
    "square-selected": "",
    "star": "",
    "star-fill": "",
    "strategy": "",
    "sweep": "",
    "time": "",
    "time-fill": "",
    "todown": "",
    "toleft": "",
    "tool": "",
    "top": "",
    "toright": "",
    "towardsleft": "",
    "towardsright": "",
    "towardsright-fill": "",
    "transport": "",
    "transport-fill": "",
    "turningdown": "",
    "turningleft": "",
    "turningright": "",
    "turningup": "",
    "unreceive": "",
    "seen": "",
    "unseen": "",
    "up": "",
    "upload": "",
    "video": "",
    "voice": "",
    "voice-fill": "",
    "voipphone": "",
    "wallet": "",
    "warning": "",
    "wealth": "",
    "wealth-fill": "",
    "weather": "",
    "wechat": "",
    "wifi": "",
    "play": "",
    "suspend": ""
  };
  const _sfc_main$d = {
    name: "tuiIcon",
    emits: ["click"],
    props: {
      name: {
        type: String,
        default: ""
      },
      customPrefix: {
        type: String,
        default: ""
      },
      size: {
        type: [Number, String],
        default: 0
      },
      //px或者rpx
      unit: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: ""
      },
      bold: {
        type: Boolean,
        default: false
      },
      margin: {
        type: String,
        default: "0"
      },
      index: {
        type: Number,
        default: 0
      }
    },
    computed: {
      getColor() {
        return this.color || uni && uni.$tui && uni.$tui.tuiIcon.color || "#999";
      },
      getSize() {
        const size = this.size || uni && uni.$tui && uni.$tui.tuiIcon.size || 32;
        const unit = this.unit || uni && uni.$tui && uni.$tui.tuiIcon.unit || "px";
        return size + unit;
      }
    },
    data() {
      return {
        icons
      };
    },
    methods: {
      handleClick() {
        this.$emit("click", {
          index: this.index
        });
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "text",
      {
        class: vue.normalizeClass(["tui-icon", [$props.customPrefix, $props.customPrefix ? $props.name : ""]]),
        style: vue.normalizeStyle({ color: $options.getColor, fontSize: $options.getSize, fontWeight: $props.bold ? "bold" : "normal", margin: $props.margin }),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.handleClick && $options.handleClick(...args))
      },
      vue.toDisplayString($data.icons[$props.name] || ""),
      7
      /* TEXT, CLASS, STYLE */
    );
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$6], ["__scopeId", "data-v-bfc5f459"], ["__file", "D:/ruangong/emosphere/node_modules/thorui-uni/lib/thorui/tui-icon/tui-icon.vue"]]);
  const _sfc_main$c = {
    __name: "interest",
    setup(__props) {
      const dataList = vue.ref([]);
      const get = async () => {
        try {
          const response = await uni.request({
            url: "http://8.136.81.197:8080/post/recent",
            method: "GET",
            data: {
              currentPage: 1,
              pageSize: 6
            }
          });
          const updatedDataList = await Promise.all(response.data["posts"].map(async (post, index) => {
            const postId = post.uid;
            const userResponse = await uni.request({
              url: "http://8.136.81.197:8080/user/update",
              method: "POST",
              data: {
                id: postId
              }
            });
            const avatar1 = userResponse.data["user"].avatar;
            const username1 = userResponse.data["user"].username;
            post.avatar = avatar1;
            post.username = username1;
            return post;
          }));
          dataList.value = updatedDataList;
        } catch (error) {
          formatAppLog("error", "at components/interest/interest.vue:95", error);
        }
      };
      const scrollTop = vue.ref(0);
      const old = vue.ref({
        scrollTop: 0
      });
      const upper = (e2) => {
        formatAppLog("log", "at components/interest/interest.vue:104", e2);
      };
      const lower = (e2) => {
        formatAppLog("log", "at components/interest/interest.vue:108", e2);
      };
      const scroll = (e2) => {
        formatAppLog("log", "at components/interest/interest.vue:112", e2);
        old.value.scrollTop = e2.detail.scrollTop;
      };
      const agreeImg = (item, index) => {
        uni.request({
          url: "http://8.136.81.197:8080/post_mark/",
          method: "POST",
          data: {
            uid: item.uid,
            postId: item.id
          },
          success: (userResponse) => {
            formatAppLog("log", "at components/interest/interest.vue:136", userResponse.data);
          },
          fail: (userError) => {
            formatAppLog("error", "at components/interest/interest.vue:139", userError);
          }
        });
        item.isLike = true;
      };
      const cancelAgreeImg = (item, index) => {
        uni.request({
          url: "http://8.136.81.197:8080/post_mark/",
          method: "POST",
          data: {
            uid: item.uid,
            postId: item.id
          },
          success: (userResponse) => {
            formatAppLog("log", "at components/interest/interest.vue:154", userResponse.data);
          },
          fail: (userError) => {
            formatAppLog("error", "at components/interest/interest.vue:157", userError);
          }
        });
        item.isLike = false;
      };
      vue.ref(false);
      vue.ref("");
      vue.onMounted(() => {
        get();
      });
      return (_ctx, _cache) => {
        const _component_tui_icon = resolveEasycom(vue.resolveDynamicComponent("tui-icon"), __easycom_0);
        return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
          vue.createElementVNode("view", null, [
            vue.createElementVNode("scroll-view", {
              "scroll-top": scrollTop.value,
              "scroll-y": "true",
              class: "scroll-Y",
              onScrolltoupper: upper,
              onScrolltolower: lower,
              onScroll: scroll
            }, [
              vue.createElementVNode("ul", null, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(dataList.value, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("li", {
                      class: "box",
                      key: index
                    }, [
                      vue.createElementVNode("view", { class: "item" }, [
                        vue.createElementVNode("view", { class: "avatar-user" }, [
                          vue.createElementVNode("view", { class: "avatar" }, [
                            vue.createElementVNode("image", {
                              src: item.avatar,
                              mode: "aspectFill",
                              "lazy-load": true
                            }, null, 8, ["src"])
                          ]),
                          vue.createElementVNode("view", { class: "user" }, [
                            vue.createElementVNode(
                              "view",
                              { class: "name" },
                              vue.toDisplayString(item.username),
                              1
                              /* TEXT */
                            ),
                            vue.createElementVNode(
                              "view",
                              { class: "time" },
                              vue.toDisplayString(item.createDate),
                              1
                              /* TEXT */
                            )
                          ])
                        ])
                      ]),
                      vue.createElementVNode(
                        "view",
                        { class: "cont" },
                        vue.toDisplayString(item.content),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode("view", { class: "main" }, [
                        item.illustration === null ? (vue.openBlock(), vue.createElementBlock("div", { key: 0 })) : (vue.openBlock(), vue.createElementBlock("div", { key: 1 }, [
                          vue.createElementVNode("image", {
                            src: item.illustration,
                            mode: "aspectFill",
                            "lazy-load": true,
                            class: "fadeImg"
                          }, null, 8, ["src"])
                        ]))
                      ]),
                      vue.createElementVNode("view", { class: "fotter" }, [
                        vue.createElementVNode("view", { class: "icon" }, [
                          item.isLike ? (vue.openBlock(), vue.createBlock(_component_tui_icon, {
                            key: 0,
                            name: "like-fill",
                            size: "25",
                            onClick: ($event) => cancelAgreeImg(item),
                            color: "#488C88"
                          }, null, 8, ["onClick"])) : (vue.openBlock(), vue.createBlock(_component_tui_icon, {
                            key: 1,
                            name: "like",
                            size: "25",
                            onClick: ($event) => agreeImg(item)
                          }, null, 8, ["onClick"])),
                          vue.createElementVNode(
                            "view",
                            { class: "count" },
                            vue.toDisplayString(item.agreeCount),
                            1
                            /* TEXT */
                          )
                        ]),
                        vue.createCommentVNode(" 分享")
                      ])
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              !_ctx.isEnd && _ctx.loading ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "loadStyle"
              }, [
                vue.createVNode(_component_tui_icon, {
                  name: "loading",
                  size: 18
                })
              ])) : vue.createCommentVNode("v-if", true),
              _ctx.isEnd ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "loadStyle"
              }, "我也是有底线的~")) : vue.createCommentVNode("v-if", true)
            ], 40, ["scroll-top"])
          ]),
          vue.createCommentVNode(" 弄一个回顶部的悬浮按钮"),
          vue.createCommentVNode(" 到底标记")
        ]);
      };
    }
  };
  const __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-bc3d731e"], ["__file", "D:/ruangong/emosphere/components/interest/interest.vue"]]);
  const _sfc_main$b = {
    __name: "tuijian",
    setup(__props) {
      const dataList = vue.ref([
        {
          avatar: "/static/xiaodiao.png",
          username: "xiaodiao",
          time: "Two minutes ago",
          content: "谨遵陈总安排，吾等在所不辞",
          imgsUrl: ["/static/blog1.png", "/static/blog2.png"],
          agreeCount: "666",
          commentCount: "777"
        },
        {
          avatar: "/static/xiaodiao.png",
          username: "xiaodiao",
          time: "One hour ago",
          content: "111111111",
          imgsUrl: ["/static/blog1.png", "/static/blog2.png"],
          agreeCount: "666",
          commentCount: "777"
        }
      ]);
      const scrollTop = vue.ref(0);
      const old = vue.ref({
        scrollTop: 0
      });
      const upper = (e2) => {
        formatAppLog("log", "at components/tuijian/tuijian.vue:92", e2);
      };
      const lower = (e2) => {
        formatAppLog("log", "at components/tuijian/tuijian.vue:96", e2);
      };
      const scroll = (e2) => {
        formatAppLog("log", "at components/tuijian/tuijian.vue:100", e2);
        old.value.scrollTop = e2.detail.scrollTop;
      };
      const agreeImg = (item, index) => {
        item.agreeCount = item.agreeCount * 1 + 1;
        item.isLike = true;
      };
      const cancelAgreeImg = (item, index) => {
        item.agreeCount = item.agreeCount * 1 - 1;
        item.isLike = false;
      };
      return (_ctx, _cache) => {
        const _component_tui_icon = resolveEasycom(vue.resolveDynamicComponent("tui-icon"), __easycom_0);
        return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
          vue.createElementVNode("view", null, [
            vue.createElementVNode("scroll-view", {
              "scroll-top": scrollTop.value,
              "scroll-y": "true",
              class: "scroll-Y",
              onScrolltoupper: upper,
              onScrolltolower: lower,
              onScroll: scroll
            }, [
              vue.createElementVNode("ul", null, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(dataList.value, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("li", { key: index }, [
                      vue.createElementVNode("view", { class: "item" }, [
                        vue.createElementVNode("view", { class: "avatar-user" }, [
                          vue.createCommentVNode(" 点击头像跳转 "),
                          vue.createElementVNode("view", { class: "avatar" }, [
                            vue.createElementVNode("image", {
                              src: item.avatar,
                              mode: "aspectFill",
                              "lazy-load": true
                            }, null, 8, ["src"])
                          ]),
                          vue.createElementVNode("view", { class: "user" }, [
                            vue.createElementVNode(
                              "view",
                              { class: "name" },
                              vue.toDisplayString(item.username),
                              1
                              /* TEXT */
                            ),
                            vue.createElementVNode(
                              "view",
                              { class: "time" },
                              vue.toDisplayString(item.time),
                              1
                              /* TEXT */
                            )
                          ])
                        ])
                      ]),
                      vue.createElementVNode(
                        "view",
                        { class: "content" },
                        vue.toDisplayString(item.content),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode("view", { class: "main" }, [
                        vue.createElementVNode("view", { class: "img-list" }, [
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList(item.imgsUrl, (img, index2) => {
                              return vue.openBlock(), vue.createElementBlock("view", { key: index2 }, [
                                vue.createElementVNode("image", {
                                  src: img,
                                  mode: "aspectFill",
                                  "lazy-load": true,
                                  class: "fadeImg"
                                }, null, 8, ["src"]),
                                vue.createCommentVNode(' <ImgFade :src="img" ></ImgFade> ')
                              ]);
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ])
                      ]),
                      vue.createElementVNode("view", { class: "fotter" }, [
                        vue.createElementVNode("view", { class: "icon" }, [
                          item.isLike ? (vue.openBlock(), vue.createBlock(_component_tui_icon, {
                            key: 0,
                            name: "like-fill",
                            size: "25",
                            onClick: ($event) => cancelAgreeImg(item),
                            color: "#488C88"
                          }, null, 8, ["onClick"])) : (vue.openBlock(), vue.createBlock(_component_tui_icon, {
                            key: 1,
                            name: "like",
                            size: "25",
                            onClick: ($event) => agreeImg(item)
                          }, null, 8, ["onClick"])),
                          vue.createElementVNode(
                            "view",
                            { class: "count" },
                            vue.toDisplayString(item.agreeCount),
                            1
                            /* TEXT */
                          )
                        ]),
                        vue.createElementVNode("view", {
                          class: "icon1",
                          onClick: ($event) => _ctx.getComment(item.mid)
                        }, [
                          vue.createVNode(_component_tui_icon, {
                            name: "message",
                            size: "25"
                          }),
                          vue.createElementVNode(
                            "view",
                            { class: "count" },
                            vue.toDisplayString(item.commentCount),
                            1
                            /* TEXT */
                          )
                        ], 8, ["onClick"]),
                        vue.createCommentVNode(" 分享")
                      ])
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              !_ctx.isEnd && _ctx.loading ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "loadStyle"
              }, [
                vue.createVNode(_component_tui_icon, {
                  name: "loading",
                  size: 18
                })
              ])) : vue.createCommentVNode("v-if", true),
              _ctx.isEnd ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "loadStyle"
              }, "我也是有底线的~")) : vue.createCommentVNode("v-if", true)
            ], 40, ["scroll-top"])
          ]),
          vue.createCommentVNode(" 弄一个回顶部的悬浮按钮"),
          vue.createCommentVNode(" 到底标记")
        ]);
      };
    }
  };
  const __easycom_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-089fc835"], ["__file", "D:/ruangong/emosphere/components/tuijian/tuijian.vue"]]);
  let watched = false;
  let functions = [];
  function watchUniOn(name, func) {
    functions.push(func);
    if (!watched) {
      watched = true;
      uni.$on(name, function(index) {
        functions.forEach(function(func2) {
          if (typeof func2 === "function") {
            func2(index);
          }
        });
      });
    }
  }
  let reLaunchInvokeFunctions = [], reLaunchCompleteFunctions = [], reLaunchinter = false;
  let switchTabInvokeFunctions = [], switchTabCompleteFunctions = [], switchTabinter = false;
  function addRelanchRoute(func, func1) {
    reLaunchInvokeFunctions.push(func);
    reLaunchCompleteFunctions.push(func1);
    if (!reLaunchinter) {
      reLaunchinter = true;
      uni.addInterceptor("reLaunch", {
        //监听关闭本页面跳转
        invoke(e2) {
          reLaunchInvokeFunctions.forEach(function(func2) {
            if (typeof func2 === "function") {
              func2(e2);
            }
          });
        },
        complete() {
          reLaunchCompleteFunctions.forEach(function(func2) {
            if (typeof func2 === "function") {
              func2();
            }
          });
        }
      });
    }
  }
  function addSwitchRoute(func, func1) {
    switchTabInvokeFunctions.push(func);
    switchTabCompleteFunctions.push(func1);
    if (!switchTabinter) {
      switchTabinter = true;
      uni.addInterceptor("switchTab", {
        //监听关闭本页面跳转
        invoke(e2) {
          switchTabInvokeFunctions.forEach(function(func2) {
            if (typeof func2 === "function") {
              func2(e2);
            }
          });
        },
        complete() {
          switchTabCompleteFunctions.forEach(function(func2) {
            if (typeof func2 === "function") {
              func2();
            }
          });
        }
      });
    }
  }
  const _sfc_main$a = {
    props: {
      showSlot: {
        type: Boolean,
        default: true
      },
      // 整个tabbar的背景颜色
      slotColor: String,
      // tabbar的高度，默认无
      contentHeight: [String, Number],
      // 是否隐藏原生tabbar
      hideTabBar: {
        type: Boolean,
        default: true
      },
      tabbarlist: {
        type: Array,
        default: () => [
          {
            "pagePath": "pages/space/space",
            "unactiveIconPath": "/static/tabbar/community.png",
            "iconPath": "/static/tabbar/community_choose.png",
            "text": "首页"
          },
          {
            "pagePath": "pages/user/me",
            "unactiveIconPath": "/static/tabbar/message_choose.png",
            "iconPath": "/static/tabbar/me_choose.png",
            "text": "我的"
          }
        ]
      }
    },
    data() {
      return {
        containerHeight: 85,
        current: "",
        created: false,
        tabIndex: -1
      };
    },
    created() {
      if (this.hideTabBar)
        uni.hideTabBar();
      watchUniOn("__routeChange__", (path) => {
        this.current = path;
        this.$emit("change", path);
      });
      addRelanchRoute((e2) => {
        this.preRoute(e2.url);
      });
      addSwitchRoute((e2) => {
        this.preRoute(e2.url);
      });
      this.tabIndex = this.changeRoute();
      this.created = true;
    },
    mounted() {
      const query = uni.createSelectorQuery().in(this);
      query.select("#navigatorContent").boundingClientRect((data) => {
        if (data) {
          this.containerHeight = data.height;
          uni.setStorage({
            key: "navigatorContainerHeight",
            data: data.height
          });
        }
      }).exec();
    },
    methods: {
      preRoute(path) {
        if (this.created) {
          const f2 = this.tabbarlist.find((item) => `/${item.pagePath}` === path);
          if (f2) {
            uni.$emit("__routeChange__", f2.pagePath);
          }
        }
      },
      changeRoute() {
        if (!this.created) {
          let pages2 = getCurrentPages() || [];
          const f2 = this.tabbarlist.find((item) => item.pagePath === (pages2[pages2.length - 1] ? pages2[pages2.length - 1].route : "none"));
          if (f2) {
            uni.$emit("__routeChange__", f2.pagePath);
            return f2;
          }
        }
      },
      // 切换tab
      switchTab(pagePath) {
        let pages2 = getCurrentPages();
        if (pages2[pages2.length - 1].route.indexOf(pagePath) > -1)
          return;
        uni.navigateTo({
          url: "/" + pagePath
        });
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "u-tabbar",
        onTouchmove: _cache[0] || (_cache[0] = vue.withModifiers(() => {
        }, ["stop", "prevent"]))
      },
      [
        vue.createElementVNode(
          "view",
          {
            id: "navigatorContent",
            class: "u-tabbar__content safe-area-inset-bottom",
            style: vue.normalizeStyle({
              height: typeof $props.contentHeight === "number" ? $props.contentHeight + "rpx" : $props.contentHeight
            })
          },
          [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($props.tabbarlist, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: vue.normalizeClass(["u-tabbar__content__item", $data.current === item.pagePath ? "active" : "default"]),
                  key: index,
                  onClick: vue.withModifiers(($event) => $options.switchTab(item.pagePath), ["stop"])
                }, [
                  $data.current === item.pagePath ? (vue.openBlock(), vue.createElementBlock("image", {
                    key: 0,
                    src: item.iconPath,
                    class: "tab-image actived",
                    style: {}
                  }, null, 8, ["src"])) : (vue.openBlock(), vue.createElementBlock("image", {
                    key: 1,
                    src: item.unactiveIconPath,
                    class: "tab-image",
                    style: {}
                  }, null, 8, ["src"])),
                  vue.createElementVNode(
                    "view",
                    { class: "u-tabbar__content__item__text one-line" },
                    vue.toDisplayString(item.text),
                    1
                    /* TEXT */
                  )
                ], 10, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ],
          4
          /* STYLE */
        ),
        $props.showSlot ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: "tabbar-slot safe-area-inset-bottom",
            style: vue.normalizeStyle({
              background: $props.slotColor,
              height: $data.containerHeight + "px"
            })
          },
          null,
          4
          /* STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      32
      /* HYDRATE_EVENTS */
    );
  }
  const __easycom_4 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$5], ["__scopeId", "data-v-06a0561c"], ["__file", "D:/ruangong/emosphere/components/ren-customer-navigator/ren-customer-navigator.vue"]]);
  const _sfc_main$9 = {
    __name: "space",
    setup(__props) {
      let router2 = j();
      const goshare = () => {
        router2.replace("/pages/share/share");
      };
      const getback = () => {
        router2.replace("/pages/main/main");
      };
      let currentTab = vue.ref(0);
      vue.ref("");
      vue.ref("loadmore");
      let savecollect = vue.ref([]);
      const getsave = () => {
        uni.request({
          url: "http://8.136.81.197:8080/post_mark/",
          data: {
            uid: 5
          },
          success: (response) => {
            const postMarksArray = response.data["postMarks"];
            if (postMarksArray && postMarksArray.length > 0) {
              postMarksArray.forEach((item) => {
                const id1 = item.postId;
                savecollect.value.push(id1);
              });
            }
          },
          fail: (error) => {
            formatAppLog("error", "at pages/space/space.vue:65", error);
          }
        });
        formatAppLog("log", "at pages/space/space.vue:68", savecollect.value);
      };
      vue.onMounted(() => {
        getsave();
      });
      return (_ctx, _cache) => {
        const _component_tui_icon = resolveEasycom(vue.resolveDynamicComponent("tui-icon"), __easycom_0);
        const _component_interest = resolveEasycom(vue.resolveDynamicComponent("interest"), __easycom_1$1);
        const _component_tuijian = resolveEasycom(vue.resolveDynamicComponent("tuijian"), __easycom_2$1);
        const _component_ren_customer_navigator = resolveEasycom(vue.resolveDynamicComponent("ren-customer-navigator"), __easycom_4);
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createElementVNode("view", { style: { "width": "100%", "height": "2rem" } }),
            vue.createElementVNode("view", { class: "backarea" }, [
              vue.createElementVNode("view", { class: "header" }, [
                vue.createElementVNode("view", {
                  class: "tui-arrow",
                  onClick: getback,
                  style: { "margin-left": "10rpx" }
                }, [
                  vue.createVNode(_component_tui_icon, {
                    name: "arrowleft",
                    size: 35,
                    color: "#488C88",
                    bold: "true"
                  })
                ]),
                vue.createElementVNode("view", {
                  class: "tui-notice-box",
                  onClick: goshare
                }, [
                  vue.createVNode(_component_tui_icon, {
                    name: "evaluate",
                    size: "35",
                    color: "#488C88",
                    bold: "true"
                  })
                ])
              ]),
              vue.createElementVNode("view", { class: "content" }, [
                vue.unref(currentTab) == 0 ? (vue.openBlock(), vue.createBlock(_component_interest, { key: 0 })) : vue.createCommentVNode("v-if", true),
                vue.unref(currentTab) == 1 ? (vue.openBlock(), vue.createBlock(_component_tuijian, { key: 1 })) : vue.createCommentVNode("v-if", true)
              ]),
              vue.createVNode(_component_ren_customer_navigator)
            ])
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const PagesSpaceSpace = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__file", "D:/ruangong/emosphere/pages/space/space.vue"]]);
  const _sfc_main$8 = {
    name: "tuiTabs",
    emits: ["change"],
    props: {
      //标签页
      tabs: {
        type: Array,
        default() {
          return [];
        }
      },
      //tabs宽度，不传值则默认使用windowWidth，单位px
      width: {
        type: Number,
        default: 0
      },
      //rpx
      height: {
        type: Number,
        default: 80
      },
      //rpx 只对左右padding起作用，上下为0
      padding: {
        type: Number,
        default: 30
      },
      //背景色
      backgroundColor: {
        type: String,
        default: "#FFFFFF"
      },
      //是否固定
      isFixed: {
        type: Boolean,
        default: false
      },
      //px
      top: {
        type: Number,
        default: 0
      },
      //是否去掉底部线条
      unlined: {
        type: Boolean,
        default: false
      },
      //当前选项卡
      currentTab: {
        type: Number,
        default: 0
      },
      isSlider: {
        type: Boolean,
        default: true
      },
      //滑块宽度
      sliderWidth: {
        type: Number,
        default: 68
      },
      //滑块高度
      sliderHeight: {
        type: Number,
        default: 6
      },
      //滑块背景颜色
      sliderBgColor: {
        type: String,
        default: ""
      },
      sliderRadius: {
        type: String,
        default: "50rpx"
      },
      //滑块bottom
      bottom: {
        type: String,
        default: "0"
      },
      //标签页宽度
      itemWidth: {
        type: String,
        default: ""
      },
      //字体颜色
      color: {
        type: String,
        default: "#666"
      },
      //选中后字体颜色
      selectedColor: {
        type: String,
        default: ""
      },
      //字体大小
      size: {
        type: Number,
        default: 28
      },
      //选中后 是否加粗 ，未选中则无效
      bold: {
        type: Boolean,
        default: false
      },
      //2.3.0+
      scale: {
        type: [Number, String],
        default: 1
      },
      //角标字体颜色
      badgeColor: {
        type: String,
        default: "#fff"
      },
      //角标背景颜色
      badgeBgColor: {
        type: String,
        default: ""
      },
      zIndex: {
        type: [Number, String],
        default: 996
      }
    },
    watch: {
      currentTab() {
        this.checkCor();
      },
      tabs() {
        this.checkCor();
      },
      width(val) {
        this.tabsWidth = val;
        this.checkCor();
      }
    },
    computed: {
      getItemWidth() {
        let width = 100 / (this.tabs.length || 4) + "%";
        return this.itemWidth ? this.itemWidth : width;
      },
      getSliderBgColor() {
        return this.sliderBgColor || uni && uni.$tui && uni.$tui.color.primary || "#5677fc";
      },
      getSelectedColor() {
        return this.selectedColor || uni && uni.$tui && uni.$tui.color.primary || "#5677fc";
      },
      getBadgeBgColor() {
        return this.badgeBgColor || uni && uni.$tui && uni.$tui.color.pink || "#f74d54";
      }
    },
    created() {
      setTimeout(() => {
        uni.getSystemInfo({
          success: (res) => {
            this.winWidth = res.windowWidth;
            this.tabsWidth = this.width == 0 ? this.winWidth : this.width;
            this.checkCor();
          }
        });
      }, 0);
    },
    data() {
      return {
        winWidth: 0,
        tabsWidth: 0,
        scrollLeft: 0
      };
    },
    methods: {
      checkCor: function() {
        let tabsNum = this.tabs.length;
        let padding = this.winWidth / 750 * this.padding;
        let width = this.tabsWidth - padding * 2;
        let left = (width / tabsNum - this.winWidth / 750 * this.sliderWidth) / 2 + padding;
        let scrollLeft = left;
        if (this.currentTab > 0) {
          scrollLeft = scrollLeft + width / tabsNum * this.currentTab;
        }
        this.scrollLeft = scrollLeft;
      },
      // 点击标题切换当前页时改变样式
      swichTabs: function(index) {
        let item = this.tabs[index];
        if (item && item.disabled)
          return;
        if (this.currentTab == index) {
          return false;
        } else {
          this.$emit("change", {
            index: Number(index)
          });
        }
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return $data.tabsWidth > 0 ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["tui-tabs-view", [$props.isFixed ? "tui-tabs-fixed" : "tui-tabs-relative", $props.unlined ? "tui-unlined" : ""]]),
        style: vue.normalizeStyle({
          width: $data.tabsWidth + "px",
          height: $props.height + "rpx",
          padding: `0 ${$props.padding}rpx`,
          background: $props.backgroundColor,
          top: $props.isFixed ? $props.top + "px" : "auto",
          zIndex: $props.isFixed ? $props.zIndex : "auto"
        })
      },
      [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($props.tabs, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: index,
              class: "tui-tabs-item",
              style: vue.normalizeStyle({ width: $options.getItemWidth, height: $props.height + "rpx" }),
              onClick: vue.withModifiers(($event) => $options.swichTabs(index), ["stop"])
            }, [
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(["tui-tabs-title", { "tui-tabs-disabled": item.disabled }]),
                  style: vue.normalizeStyle({
                    color: $props.currentTab == index ? $options.getSelectedColor : $props.color,
                    fontSize: $props.size + "rpx",
                    fontWeight: $props.bold && $props.currentTab == index ? "bold" : "normal",
                    transform: `scale(${$props.currentTab == index ? $props.scale : 1})`
                  })
                },
                [
                  vue.createTextVNode(
                    vue.toDisplayString(item.name) + " ",
                    1
                    /* TEXT */
                  ),
                  item.num || item.isDot ? (vue.openBlock(), vue.createElementBlock(
                    "view",
                    {
                      key: 0,
                      class: vue.normalizeClass([item.isDot ? "tui-badge__dot" : "tui-tabs__badge"]),
                      style: vue.normalizeStyle({ color: $props.badgeColor, backgroundColor: $options.getBadgeBgColor })
                    },
                    vue.toDisplayString(item.isDot ? "" : item.num),
                    7
                    /* TEXT, CLASS, STYLE */
                  )) : vue.createCommentVNode("v-if", true)
                ],
                6
                /* CLASS, STYLE */
              )
            ], 12, ["onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        )),
        $props.isSlider ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: "tui-tabs-slider",
            style: vue.normalizeStyle({
              transform: "translateX(" + $data.scrollLeft + "px)",
              width: $props.sliderWidth + "rpx",
              height: $props.sliderHeight + "rpx",
              borderRadius: $props.sliderRadius,
              bottom: $props.bottom,
              background: $options.getSliderBgColor,
              marginBottom: $props.bottom == "50%" ? "-" + $props.sliderHeight / 2 + "rpx" : 0
            })
          },
          null,
          4
          /* STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      6
      /* CLASS, STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$4], ["__scopeId", "data-v-aff741f1"], ["__file", "D:/ruangong/emosphere/node_modules/thorui-uni/lib/thorui/tui-tabs/tui-tabs.vue"]]);
  const _sfc_main$7 = {
    __name: "my",
    setup(__props) {
      const dataList = vue.ref([]);
      const getmy = async () => {
        try {
          const response = await uni.request({
            url: "http://8.136.81.197:8080/post/uid",
            method: "GET",
            data: {
              uid: store.state.userId,
              pageSize: 10,
              currentPage: 1
            }
          });
          const updatedDataList = await Promise.all(response.data["posts"].map(async (post) => {
            const postId = post.uid;
            const userResponse = await uni.request({
              url: "http://8.136.81.197:8080/user/update",
              method: "POST",
              data: {
                id: store.state.userId
              }
            });
            const avatar1 = userResponse.data["user"].avatar;
            const username1 = userResponse.data["user"].username;
            post.avatar = avatar1;
            post.username = username1;
            return post;
          }));
          dataList.value = updatedDataList;
          formatAppLog("log", "at components/my/my.vue:79", dataList.value);
        } catch (error) {
          formatAppLog("error", "at components/my/my.vue:81", error);
        }
      };
      const scrollTop = vue.ref(0);
      const old = vue.ref({
        scrollTop: 0
      });
      const upper = (e2) => {
        formatAppLog("log", "at components/my/my.vue:92", e2);
      };
      const lower = (e2) => {
        formatAppLog("log", "at components/my/my.vue:96", e2);
      };
      const scroll = (e2) => {
        formatAppLog("log", "at components/my/my.vue:100", e2);
        old.value.scrollTop = e2.detail.scrollTop;
      };
      vue.ref(false);
      vue.ref("");
      vue.onMounted(() => {
        getmy();
      });
      return (_ctx, _cache) => {
        const _component_tui_icon = resolveEasycom(vue.resolveDynamicComponent("tui-icon"), __easycom_0);
        return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
          vue.createElementVNode("view", null, [
            vue.createElementVNode("scroll-view", {
              "scroll-top": scrollTop.value,
              "scroll-y": "true",
              class: "scroll-Y",
              onScrolltoupper: upper,
              onScrolltolower: lower,
              onScroll: scroll
            }, [
              vue.createElementVNode("ul", null, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(dataList.value, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("li", {
                      class: "box",
                      key: index
                    }, [
                      vue.createElementVNode("view", { class: "item" }, [
                        vue.createElementVNode("view", { class: "avatar-user" }, [
                          vue.createElementVNode("view", { class: "user" }, [
                            vue.createElementVNode(
                              "view",
                              { class: "time" },
                              vue.toDisplayString(item.createDate),
                              1
                              /* TEXT */
                            )
                          ])
                        ])
                      ]),
                      vue.createElementVNode(
                        "view",
                        { class: "cont" },
                        vue.toDisplayString(item.content),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode("view", { class: "main" }, [
                        item.illustration === null ? (vue.openBlock(), vue.createElementBlock("div", { key: 0 })) : (vue.openBlock(), vue.createElementBlock("div", { key: 1 }, [
                          vue.createElementVNode("image", {
                            src: item.illustration,
                            mode: "aspectFill",
                            "lazy-load": true,
                            class: "fadeImg"
                          }, null, 8, ["src"])
                        ]))
                      ])
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              !_ctx.isEnd && _ctx.loading ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "loadStyle"
              }, [
                vue.createVNode(_component_tui_icon, {
                  name: "loading",
                  size: 18
                })
              ])) : vue.createCommentVNode("v-if", true),
              _ctx.isEnd ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "loadStyle"
              }, "我也是有底线的~")) : vue.createCommentVNode("v-if", true)
            ], 40, ["scroll-top"])
          ]),
          vue.createCommentVNode(" 弄一个回顶部的悬浮按钮"),
          vue.createCommentVNode(" 到底标记")
        ]);
      };
    }
  };
  const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-ea4ef091"], ["__file", "D:/ruangong/emosphere/components/my/my.vue"]]);
  const _sfc_main$6 = {
    __name: "zan",
    setup(__props) {
      const dataList = vue.ref([]);
      const getzan = async () => {
        try {
          const response = await uni.request({
            url: "http://8.136.81.197:8080/post_mark/",
            method: "GET",
            data: {
              uid: store.state.userId
            }
          });
          const postMarks = response.data["postMarks"];
          const requests = postMarks.map(async (post, index) => {
            const postId = post.postId;
            const postResponse = await uni.request({
              url: "http://8.136.81.197:8080/post/id",
              method: "get",
              data: {
                id: postId
              }
            });
            const userResponse = await uni.request({
              url: "http://8.136.81.197:8080/user/update",
              method: "POST",
              data: {
                id: post.uid
              }
            });
            return {
              content: postResponse.data["post"].content,
              illustration: postResponse.data["post"].illustration,
              avatar: userResponse.data["user"].avatar,
              username: userResponse.data["user"].username,
              ...post
              // Include other properties from postMarks
            };
          });
          const updatedDataList = await Promise.all(requests);
          dataList.value = updatedDataList;
        } catch (error) {
          formatAppLog("error", "at components/zan/zan.vue:96", error);
        }
      };
      const scrollTop = vue.ref(0);
      const old = vue.ref({
        scrollTop: 0
      });
      const upper = (e2) => {
        formatAppLog("log", "at components/zan/zan.vue:107", e2);
      };
      const lower = (e2) => {
        formatAppLog("log", "at components/zan/zan.vue:111", e2);
      };
      const scroll = (e2) => {
        formatAppLog("log", "at components/zan/zan.vue:115", e2);
        old.value.scrollTop = e2.detail.scrollTop;
      };
      vue.ref(false);
      vue.ref("");
      vue.onMounted(() => {
        getzan();
      });
      return (_ctx, _cache) => {
        const _component_tui_icon = resolveEasycom(vue.resolveDynamicComponent("tui-icon"), __easycom_0);
        return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
          vue.createElementVNode("view", null, [
            vue.createElementVNode("scroll-view", {
              "scroll-top": scrollTop.value,
              "scroll-y": "true",
              class: "scroll-Y",
              onScrolltoupper: upper,
              onScrolltolower: lower,
              onScroll: scroll
            }, [
              vue.createElementVNode("ul", null, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(dataList.value, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("li", {
                      class: "box",
                      key: index
                    }, [
                      vue.createElementVNode("view", { class: "item" }, [
                        vue.createElementVNode("view", { class: "avatar-user" }, [
                          vue.createElementVNode("view", { class: "avatar" }, [
                            vue.createElementVNode("image", {
                              src: item.avatar,
                              mode: "aspectFill",
                              "lazy-load": true
                            }, null, 8, ["src"])
                          ]),
                          vue.createElementVNode("view", { class: "user" }, [
                            vue.createElementVNode(
                              "view",
                              { class: "name" },
                              vue.toDisplayString(item.username),
                              1
                              /* TEXT */
                            ),
                            vue.createElementVNode(
                              "view",
                              { class: "time" },
                              vue.toDisplayString(item.createDate),
                              1
                              /* TEXT */
                            )
                          ])
                        ])
                      ]),
                      vue.createElementVNode(
                        "view",
                        { class: "cont" },
                        vue.toDisplayString(item.content),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode("view", { class: "main" }, [
                        item.illustration === null ? (vue.openBlock(), vue.createElementBlock("div", { key: 0 })) : (vue.openBlock(), vue.createElementBlock("div", { key: 1 }, [
                          vue.createElementVNode("image", {
                            src: item.illustration,
                            mode: "aspectFill",
                            "lazy-load": true,
                            class: "fadeImg"
                          }, null, 8, ["src"])
                        ]))
                      ])
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              !_ctx.isEnd && _ctx.loading ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "loadStyle"
              }, [
                vue.createVNode(_component_tui_icon, {
                  name: "loading",
                  size: 18
                })
              ])) : vue.createCommentVNode("v-if", true),
              _ctx.isEnd ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "loadStyle"
              }, "我也是有底线的~")) : vue.createCommentVNode("v-if", true)
            ], 40, ["scroll-top"])
          ]),
          vue.createCommentVNode(" 弄一个回顶部的悬浮按钮"),
          vue.createCommentVNode(" 到底标记")
        ]);
      };
    }
  };
  const __easycom_3 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-d4284ccd"], ["__file", "D:/ruangong/emosphere/components/zan/zan.vue"]]);
  const _sfc_main$5 = {
    __name: "me",
    setup(__props) {
      let currentTab = vue.ref(0);
      const change = (e2) => {
        currentTab.value = e2.index;
      };
      let router2 = j();
      const getback = () => {
        router2.replace("/pages/myScreen/myScreen");
      };
      const tabs = vue.ref([
        {
          name: "我的"
        },
        {
          name: "收藏"
        }
      ]);
      const userInfo = vue.ref({
        avatar: store.state.ImagePath,
        username: store.state.username
      });
      return (_ctx, _cache) => {
        const _component_tui_icon = resolveEasycom(vue.resolveDynamicComponent("tui-icon"), __easycom_0);
        const _component_tui_tabs = resolveEasycom(vue.resolveDynamicComponent("tui-tabs"), __easycom_1);
        const _component_my = resolveEasycom(vue.resolveDynamicComponent("my"), __easycom_2);
        const _component_zan = resolveEasycom(vue.resolveDynamicComponent("zan"), __easycom_3);
        const _component_ren_customer_navigator = resolveEasycom(vue.resolveDynamicComponent("ren-customer-navigator"), __easycom_4);
        return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
          vue.createElementVNode("view", {
            class: "box",
            style: { "width": "100%", "height": "2rem" }
          }),
          vue.createElementVNode("view", { class: "tui-header-img" }, [
            vue.createElementVNode("view", {
              class: "tui-arrow",
              onClick: getback,
              style: { "margin-left": "10rpx" }
            }, [
              vue.createVNode(_component_tui_icon, {
                name: "arrowleft",
                size: 50,
                color: "#ffffff",
                bold: "true"
              })
            ]),
            vue.createElementVNode("view", { class: "user-info" }, [
              vue.createElementVNode("image", {
                src: userInfo.value.avatar,
                class: "avatar",
                mode: "aspectFill"
              }, null, 8, ["src"]),
              vue.createElementVNode(
                "span",
                null,
                vue.toDisplayString(userInfo.value.username),
                1
                /* TEXT */
              )
            ])
          ]),
          vue.createElementVNode("view", { class: "white-rectangle" }),
          vue.createElementVNode("view", { class: "main" }, [
            vue.createElementVNode("view", { class: "tabs-style" }, [
              vue.createVNode(_component_tui_tabs, {
                tabs: tabs.value,
                currentTab: vue.unref(currentTab),
                onChange: change,
                sliderBgColor: "#488C88",
                selectedColor: "#488C88",
                itemWidth: "50%",
                size: "35",
                scale: "1.1"
              }, null, 8, ["tabs", "currentTab"])
            ]),
            vue.unref(currentTab) == 0 ? (vue.openBlock(), vue.createBlock(_component_my, { key: 0 })) : vue.createCommentVNode("v-if", true),
            vue.unref(currentTab) == 1 ? (vue.openBlock(), vue.createBlock(_component_zan, { key: 1 })) : vue.createCommentVNode("v-if", true)
          ]),
          vue.createVNode(_component_ren_customer_navigator)
        ]);
      };
    }
  };
  const PagesUserMe = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__file", "D:/ruangong/emosphere/pages/user/me.vue"]]);
  const _sfc_main$4 = {
    __name: "history",
    setup(__props) {
      let router2 = j();
      const records = vue.ref([]);
      const getback = () => {
        router2.replace("/pages/relax/relax");
      };
      const formatDate = (dateString) => {
        const originalDate = new Date(dateString);
        const month = originalDate.getMonth() + 1;
        const day = originalDate.getDate();
        return `${month}月${day}日`;
      };
      const geterelax = () => {
        const data = {
          uid: store.state.userId,
          pageSize: 5,
          currentPage: 1
        };
        formatAppLog("log", "at pages/history/history.vue:55", data);
        uni.request({
          url: "http://8.136.81.197:8080/relax_record/uid",
          data,
          success: (response) => {
            formatAppLog("log", "at pages/history/history.vue:60", response.data);
            records.value = response.data["records"];
          },
          fail: (error) => {
            formatAppLog("error", "at pages/history/history.vue:64", error);
          }
        });
      };
      vue.onMounted(() => {
        geterelax();
      });
      return (_ctx, _cache) => {
        const _component_uni_datetime_picker = resolveEasycom(vue.resolveDynamicComponent("uni-datetime-picker"), __easycom_0$1);
        return vue.openBlock(), vue.createElementBlock("view", { class: "backarea" }, [
          vue.createElementVNode("view", {
            class: "box",
            style: { "width": "100%", "height": "5%" }
          }),
          vue.createElementVNode("view", { class: "header" }, [
            vue.createElementVNode("view", {
              class: "left",
              onClick: getback
            }, [
              vue.createElementVNode("image", { src: "/static/images/fanhui.png" }),
              vue.createElementVNode("text", null, "返回")
            ])
          ]),
          vue.createElementVNode("h1", { class: "background-title" }, "最近五次放松记录"),
          vue.createElementVNode("view", { class: "time" }, [
            vue.createVNode(_component_uni_datetime_picker, {
              mode: "date",
              start: _ctx.start,
              end: _ctx.end,
              fields: _ctx.fields,
              value: _ctx.value,
              onConfirm: _ctx.onConfirm
            }, null, 8, ["start", "end", "fields", "value", "onConfirm"])
          ]),
          vue.createElementVNode("view", { class: "relax-list" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(records.value, (record, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: index,
                  class: "relax-item"
                }, [
                  vue.createElementVNode(
                    "span",
                    null,
                    "日期:" + vue.toDisplayString(formatDate(record.createDate)),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "span",
                    null,
                    "放松方式:" + vue.toDisplayString(record.type),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "span",
                    null,
                    "放松时长：" + vue.toDisplayString(Math.floor(record.duration / 60)) + "分" + vue.toDisplayString(record.duration % 60) + "秒",
                    1
                    /* TEXT */
                  )
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ]);
      };
    }
  };
  const PagesHistoryHistory = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__file", "D:/ruangong/emosphere/pages/history/history.vue"]]);
  const _sfc_main$3 = {
    data() {
      return {
        show: false
      };
    },
    props: {
      value: {
        type: [Boolean, String],
        default: false
      }
    },
    watch: {
      value(val) {
        if (val) {
          this.show = val;
        } else {
          this.handleHidden();
        }
      }
    },
    methods: {
      closeModal(e2) {
        this.$emit("input", false);
      },
      handleHidden() {
        setTimeout(() => {
          this.show = false;
        }, 300);
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass([[$props.value ? "show" : ""], "yy-modal"]),
          id: "show",
          onClick: _cache[1] || (_cache[1] = (...args) => $options.closeModal && $options.closeModal(...args))
        },
        [
          vue.createElementVNode("div", {
            onClick: _cache[0] || (_cache[0] = vue.withModifiers(() => {
            }, ["stop"])),
            class: "content"
          }, [
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ])
        ],
        2
        /* CLASS */
      )
    ]);
  }
  const PagesQuestionsModal = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__scopeId", "data-v-9afb92b6"], ["__file", "D:/ruangong/emosphere/pages/questions/modal.vue"]]);
  const _sfc_main$2 = {
    data() {
      let router2 = j();
      const fan = () => {
        router2.replace("/pages/chat/chat");
      };
      return {
        fan,
        currentIndex: 0,
        swiperHeight: 0,
        modalHeight: "",
        modalContentHeight: "",
        showQuestion: false,
        finish: false
      };
    },
    watch: {
      currentSwiperItem(val) {
        this.currentIndex = val;
      }
    },
    props: {
      isReviewed: {
        type: Boolean,
        default: false
      },
      currentSwiperItem: {
        type: [String, Number],
        default: 0
      },
      duration: {
        type: [String, Number],
        default: 300
      },
      questtionList: {
        type: Array,
        default: () => {
          return [
            {
              "id": 1,
              "title": "头痛",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 2,
              "title": "神经过敏，心中不踏实",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 3,
              "title": "头脑中有不必要的想法或字句盘旋",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 4,
              "title": "头昏或昏倒",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 5,
              "title": "对异性的兴趣减退",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 6,
              "title": "对旁人责备求全",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 7,
              "title": "感到别人能控制您的思想",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 8,
              "title": "责怪别人制造麻烦",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 9,
              "title": "忘性大",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 10,
              "title": "担心自己的衣饰是否整齐及仪态是否端正",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 11,
              "title": "容易烦恼和激动",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 12,
              "title": "胸痛",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 13,
              "title": "害怕空旷的场所或街道",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 14,
              "title": "感到自己的精力下降，活动减慢",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 15,
              "title": "想结束自己的生命",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 16,
              "title": "听到旁人听不到的声音",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 17,
              "title": "发抖",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 18,
              "title": "感到大多数人都不可信任",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 19,
              "title": "胃口不好",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 20,
              "title": "容易哭泣",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 21,
              "title": "同异性相处时感到害羞和不自在",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 22,
              "title": "感到受骗，中了圈套或有人想抓住您",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 23,
              "title": "无缘无故地突然感到害怕",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 24,
              "title": "自己不能控制地大发脾气",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 25,
              "title": "怕单独出门",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 26,
              "title": "经常责怪自己",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 27,
              "title": "腰痛",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 28,
              "title": "感到难以完成任务",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 29,
              "title": "感到孤独",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 30,
              "title": "感到苦闷",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 31,
              "title": "过分担忧",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 32,
              "title": "对事物不感兴趣",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 33,
              "title": "感到害怕",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 34,
              "title": "您的感情容易受到伤害",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 35,
              "title": "旁人能知道您的私下想法",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 36,
              "title": "感到别人不理解您，不同情您",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 37,
              "title": "感到人们对您不友好，不喜欢您",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 38,
              "title": "做事必须做得很慢以保证做得正确",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 39,
              "title": "心跳得很厉害",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 40,
              "title": "恶心或胃部不舒服",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 41,
              "title": "感到比不上他人",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 42,
              "title": "肌肉酸痛",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 43,
              "title": "感到有人在监视您、谈论您",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 44,
              "title": "难以入睡",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 45,
              "title": "做事必须反复检查",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 46,
              "title": "难以作出决定",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 47,
              "title": "怕乘电车、公共汽车、地铁或火车",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 48,
              "title": "呼吸有困难",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 49,
              "title": "一阵阵发冷或发热",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 50,
              "title": "因为感到害怕而避开某些东西、场合或活动",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 51,
              "title": "脑子变空了",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 52,
              "title": "身体发麻或刺痛",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 53,
              "title": "喉咙有梗塞感",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 54,
              "title": "感到前途没有希望",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 55,
              "title": "不能集中注意力",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 56,
              "title": "感到身体的某一部分软弱无力",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 57,
              "title": "感到紧张或容易紧张",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 58,
              "title": "感到手或脚发重",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 59,
              "title": "想到死亡的事",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 60,
              "title": "吃得太多",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 61,
              "title": "当别人看着您或谈论您时感到不自在",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 62,
              "title": "有一些不属于您自己的想法",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 63,
              "title": "有想打人或伤害他人的冲动",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 64,
              "title": "醒得太早",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 65,
              "title": "必须反复洗手、点数",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 66,
              "title": "睡得不稳、不深",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 67,
              "title": "有想摔坏或破坏东西的想法",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 68,
              "title": "有一些别人没有的想法",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 69,
              "title": "感到对别人神经过敏",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 70,
              "title": "在商店或电影院等人多的地方感到不自在",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 71,
              "title": "感到任何事情都很困难",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 72,
              "title": "一阵阵恐惧或惊恐",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 73,
              "title": "感到公共场合吃东西很不舒服",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 74,
              "title": "经常与人争论",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 75,
              "title": "单独一人时神经很紧张",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 76,
              "title": "别人对您的成绩没有做出恰当的评价",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 77,
              "title": "即使和别人在一起也感到孤单",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 78,
              "title": "感到坐立不安心神不宁",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 79,
              "title": "感到自己没有什么价值",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 80,
              "title": "感到熟悉的东西变成陌生或不像是真的",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 81,
              "title": "大叫或摔东西",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 82,
              "title": "害怕会在公共场合昏倒",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 83,
              "title": "感到别人想占您的便宜",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 84,
              "title": "为一些有关性的想法而很苦恼",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 85,
              "title": "您认为应该因为自己的过错而受到惩罚",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 86,
              "title": "感到要很快把事情做完",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 87,
              "title": "感到自己的身体有严重问题",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 88,
              "title": "从未感到和其他人很亲近",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 89,
              "title": "感到自己有罪",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            },
            {
              "id": 90,
              "title": "感到自己脑子有毛病",
              "optionList": [
                {
                  "id": "A",
                  "content": "从无"
                },
                {
                  "id": "B",
                  "content": "轻度"
                },
                {
                  "id": "C",
                  "content": "中度"
                },
                {
                  "id": "D",
                  "content": "偏重"
                },
                {
                  "id": "E",
                  "content": "严重"
                }
              ],
              "userAnswer": "",
              "answerscore": ""
            }
          ];
        }
      }
    },
    mounted() {
      this.setAnswerHeight();
    },
    components: {
      Modal: PagesQuestionsModal
    },
    methods: {
      /*设置题目的高度
       */
      setAnswerHeight() {
        let that = this;
        let tempHeight = 0;
        uni.getSystemInfo({
          //获取手机屏幕高度信息，让swiper的高度和手机屏幕一样高                
          success: function(res) {
            tempHeight = res.windowHeight;
            that.modalHeight = res.windowHeight - uni.upx2px(200) + "px";
            that.modalContentHeight = res.windowHeight - uni.upx2px(380) + "px";
            uni.createSelectorQuery().select("#header").fields({
              size: true,
              scrollOffset: true
            }, (data) => {
              tempHeight -= data.height;
              uni.createSelectorQuery().select("#subHeader").fields({
                size: true,
                scrollOffset: true
              }, (data2) => {
                tempHeight -= data2.height;
                uni.createSelectorQuery().select("#footer").fields({
                  size: true,
                  scrollOffset: true
                }, (data3) => {
                  tempHeight -= data3.height;
                  that.swiperHeight = tempHeight + "px";
                }).exec();
              }).exec();
            }).exec();
          }
        });
      },
      /*跳转指定题目
       * */
      handleJumpSwiper(index) {
        this.currentIndex = index;
        this.showQuestion = false;
      },
      /* 滑动题目
       */
      handleSwiperChanged(event) {
        this.currentIndex = event.detail.current;
      },
      /* 调用上一页，下一页
       */
      handleChangeCurrentSwiper(operation) {
        let max = this.questtionList.length - 1;
        let min = 0;
        if (this.currentIndex > min && operation < 0 || this.currentIndex < max && operation > 0) {
          this.currentIndex += operation;
          formatAppLog("log", "at pages/questions/answer.vue:2603", "index:" + this.currentIndex);
        }
      },
      /* 选择答案（单选，判断）
       */
      chooseSolution(item, subItem) {
        if (!this.isReviewed) {
          item.userAnswer = subItem.id;
          setTimeout(() => {
            if (this.currentIndex < this.questtionList.length - 1)
              this.currentIndex += 1;
            else {
              this.currentIndex = this.questtionList.length;
              this.currentIndex = this.currentIndex - 1;
            }
          }, 250);
          this.onAnswerChange(item);
        }
        formatAppLog("log", "at pages/questions/answer.vue:2621", "index:" + this.currentIndex + " answer:" + item.userAnswer);
      },
      /* 题目答案变化
       */
      onAnswerChange(item) {
        JSON.parse(JSON.stringify(item));
        this.$emit("onChange", item);
      },
      /* 提交答案
       */
      handleSubmit() {
        var sig = 1;
        var score = 0, average_score = 0;
        var pos_items = 0, pas_items = 0;
        var pos_sym_num = 0;
        var factor1, factor2, factor3, factor4, factor5, factor6, factor7, factor8, factor9, factor10;
        for (var i2 = 0; i2 < this.questtionList.length; ++i2) {
          if (this.questtionList[i2].userAnswer == "") {
            uni.showToast({
              title: "请完成所有题目再提交",
              icon: "none"
            });
            sig = 0;
            break;
          }
          if (this.questtionList[i2].userAnswer == "A") {
            this.questtionList[i2].answerscore = 1;
            score += 1;
            pas_items += 1;
          }
          if (this.questtionList[i2].userAnswer == "B") {
            this.questtionList[i2].answerscore = 2;
            score += 2;
            pos_items += 1;
          }
          if (this.questtionList[i2].userAnswer == "C") {
            this.questtionList[i2].answerscore = 3;
            score += 3;
            pos_items += 1;
          }
          if (this.questtionList[i2].userAnswer == "D") {
            this.questtionList[i2].answerscore = 4;
            score += 4;
            pos_items += 1;
          }
          if (this.questtionList[i2].userAnswer == "E") {
            this.questtionList[i2].answerscore = 5;
            score += 5;
            pos_items += 1;
          }
          formatAppLog("log", "at pages/questions/answer.vue:2676", i2 + ":" + this.questtionList[i2].userAnswer + " ");
        }
        factor1 = this.questtionList[0].answerscore + this.questtionList[3].answerscore + this.questtionList[11].answerscore + this.questtionList[26].answerscore + this.questtionList[39].answerscore + this.questtionList[41].answerscore + this.questtionList[47].answerscore + this.questtionList[48].answerscore + this.questtionList[51].answerscore + this.questtionList[52].answerscore + this.questtionList[55].answerscore + this.questtionList[57].answerscore;
        factor2 = this.questtionList[2].answerscore + this.questtionList[8].answerscore + this.questtionList[9].answerscore + this.questtionList[27].answerscore + this.questtionList[37].answerscore + this.questtionList[44].answerscore + this.questtionList[45].answerscore + this.questtionList[50].answerscore + this.questtionList[54].answerscore + this.questtionList[64].answerscore;
        factor3 = this.questtionList[5].answerscore + this.questtionList[20].answerscore + this.questtionList[33].answerscore + this.questtionList[35].answerscore + this.questtionList[36].answerscore + this.questtionList[40].answerscore + this.questtionList[60].answerscore + this.questtionList[68].answerscore + this.questtionList[72].answerscore;
        factor4 = this.questtionList[4].answerscore + this.questtionList[13].answerscore + this.questtionList[14].answerscore + this.questtionList[19].answerscore + this.questtionList[21].answerscore + this.questtionList[25].answerscore + this.questtionList[28].answerscore + this.questtionList[29].answerscore + this.questtionList[30].answerscore + this.questtionList[31].answerscore + this.questtionList[53].answerscore + this.questtionList[70].answerscore + this.questtionList[78].answerscore;
        factor5 = this.questtionList[1].answerscore + this.questtionList[16].answerscore + this.questtionList[22].answerscore + this.questtionList[32].answerscore + this.questtionList[38].answerscore + this.questtionList[56].answerscore + this.questtionList[71].answerscore + this.questtionList[77].answerscore + this.questtionList[79].answerscore + this.questtionList[85].answerscore;
        factor6 = this.questtionList[10].answerscore + this.questtionList[23].answerscore + this.questtionList[62].answerscore + this.questtionList[66].answerscore + this.questtionList[73].answerscore + this.questtionList[80].answerscore;
        factor7 = this.questtionList[12].answerscore + this.questtionList[24].answerscore + this.questtionList[46].answerscore + this.questtionList[49].answerscore + this.questtionList[69].answerscore + this.questtionList[74].answerscore + this.questtionList[81].answerscore;
        factor8 = this.questtionList[7].answerscore + this.questtionList[17].answerscore + this.questtionList[42].answerscore + this.questtionList[67].answerscore + this.questtionList[75].answerscore + this.questtionList[82].answerscore;
        factor9 = this.questtionList[6].answerscore + this.questtionList[15].answerscore + this.questtionList[34].answerscore + this.questtionList[61].answerscore + this.questtionList[76].answerscore + this.questtionList[83].answerscore + this.questtionList[84].answerscore + this.questtionList[86].answerscore + this.questtionList[87].answerscore + this.questtionList[89].answerscore;
        factor10 = this.questtionList[18].answerscore + this.questtionList[43].answerscore + this.questtionList[58].answerscore + this.questtionList[59].answerscore + this.questtionList[63].answerscore + this.questtionList[65].answerscore + this.questtionList[88].answerscore;
        if (sig == 1) {
          average_score = score / 90;
          pos_sym_num = (score - pas_items) / pos_items;
          uni.navigateTo({
            url: "/pages/result/result?score=" + score + "&average_score=" + average_score + "&pos_items=" + pos_items + "&pas_items=" + pas_items + "&pos_sym_num=" + pos_sym_num + "&factor1=" + factor1 + "&factor2=" + factor2 + "&factor3=" + factor3 + "&factor4=" + factor4 + "&factor5=" + factor5 + "&factor6=" + factor6 + "&factor7=" + factor7 + "&factor8=" + factor8 + "&factor9=" + factor9 + "&factor10=" + factor10
          });
          formatAppLog("log", "at pages/questions/answer.vue:2749", "Submit successed!\n");
        }
        if (sig == 0)
          formatAppLog("log", "at pages/questions/answer.vue:2753", "Submit failed!");
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_modal = vue.resolveComponent("modal");
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("view", {
          class: "box",
          style: { "width": "100%", "height": "2rem" }
        }),
        vue.createElementVNode("view", null, [
          vue.createElementVNode("view", {
            class: "header",
            id: "header"
          }, [
            vue.createElementVNode("view", { class: "head-left" }, [
              vue.createElementVNode("span", {
                class: "btn",
                onClick: _cache[0] || (_cache[0] = (...args) => $data.fan && $data.fan(...args))
              }, "返回")
            ]),
            vue.createElementVNode(
              "span",
              null,
              "第" + vue.toDisplayString($data.currentIndex + 1) + "题",
              1
              /* TEXT */
            ),
            !$props.isReviewed ? (vue.openBlock(), vue.createElementBlock("span", {
              key: 0,
              class: "header-button",
              onClick: _cache[1] || (_cache[1] = (...args) => $options.handleSubmit && $options.handleSubmit(...args))
            }, "提交")) : vue.createCommentVNode("v-if", true)
          ]),
          vue.createElementVNode("view", { id: "subHeader" }, [
            $props.questtionList.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "sub-header"
            }, [
              vue.createElementVNode(
                "span",
                { class: "sub-header-number" },
                vue.toDisplayString($data.currentIndex + 1) + "/" + vue.toDisplayString($props.questtionList.length) + " 题",
                1
                /* TEXT */
              )
            ])) : vue.createCommentVNode("v-if", true)
          ]),
          $props.questtionList.length > 0 ? (vue.openBlock(), vue.createElementBlock("swiper", {
            key: 0,
            class: "content",
            duration: $props.duration,
            current: $data.currentIndex,
            onChange: _cache[2] || (_cache[2] = (...args) => $options.handleSwiperChanged && $options.handleSwiperChanged(...args)),
            style: vue.normalizeStyle({ "height": $data.swiperHeight })
          }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($props.questtionList, (item) => {
                return vue.openBlock(), vue.createElementBlock("swiper-item", { class: "content-item" }, [
                  vue.createElementVNode(
                    "scroll-view",
                    {
                      "scroll-y": "",
                      style: vue.normalizeStyle({ "height": $data.swiperHeight })
                    },
                    [
                      vue.createElementVNode(
                        "view",
                        { class: "content-title" },
                        vue.toDisplayString(item.title),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode("view", { class: "content-solutions" }, [
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList(item.optionList, (subItem) => {
                            return vue.openBlock(), vue.createElementBlock("view", {
                              class: "content-solutions-item",
                              onClick: ($event) => $options.chooseSolution(item, subItem)
                            }, [
                              vue.createElementVNode(
                                "view",
                                { class: "content-solutions-item-single" },
                                vue.toDisplayString(subItem.id),
                                1
                                /* TEXT */
                              ),
                              vue.createElementVNode(
                                "view",
                                {
                                  class: vue.normalizeClass([item.userAnswer == subItem.id ? "content-solutions-item-select" : "", "content-solutions-item-content"])
                                },
                                vue.toDisplayString(subItem.content),
                                3
                                /* TEXT, CLASS */
                              )
                            ], 8, ["onClick"]);
                          }),
                          256
                          /* UNKEYED_FRAGMENT */
                        ))
                      ])
                    ],
                    4
                    /* STYLE */
                  )
                ]);
              }),
              256
              /* UNKEYED_FRAGMENT */
            ))
          ], 44, ["duration", "current"])) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("view", {
            class: "footer",
            id: "footer"
          }, [
            vue.createElementVNode("view", {
              class: "footer-back",
              onClick: _cache[3] || (_cache[3] = ($event) => $options.handleChangeCurrentSwiper(-1))
            }, "上一题"),
            vue.createElementVNode("view", {
              class: "footer-card",
              onClick: _cache[4] || (_cache[4] = ($event) => $data.showQuestion = true)
            }, "答题卡"),
            vue.createElementVNode("view", {
              class: "footer-right",
              onClick: _cache[5] || (_cache[5] = ($event) => $options.handleChangeCurrentSwiper(1))
            }, "下一题")
          ]),
          vue.createVNode(_component_modal, {
            modelValue: $data.showQuestion,
            "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.showQuestion = $event),
            value: $data.showQuestion
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode(
                "view",
                {
                  class: "question-modal",
                  style: vue.normalizeStyle({ "height": $data.modalHeight })
                },
                [
                  vue.createElementVNode("view", {
                    class: "question-modal-header",
                    id: "questionHeader"
                  }, " 答题卡 "),
                  vue.createElementVNode(
                    "scroll-view",
                    {
                      "scroll-y": "",
                      class: "question-modal-body",
                      style: vue.normalizeStyle({ "height": $data.modalContentHeight })
                    },
                    [
                      (vue.openBlock(true), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList($props.questtionList, (item, index) => {
                          return vue.openBlock(), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            [
                              item.userAnswer && $props.isReviewed ? (vue.openBlock(), vue.createElementBlock("view", {
                                key: 0,
                                class: "question-modal-body-item question-modal-body-item-failed",
                                onClick: ($event) => $options.handleJumpSwiper(index)
                              }, vue.toDisplayString(index + 1), 9, ["onClick"])) : item.userAnswer ? (vue.openBlock(), vue.createElementBlock("view", {
                                key: 1,
                                class: "question-modal-body-item question-modal-body-item-select",
                                onClick: ($event) => $options.handleJumpSwiper(index)
                              }, vue.toDisplayString(index + 1), 9, ["onClick"])) : (vue.openBlock(), vue.createElementBlock("view", {
                                key: 2,
                                class: "question-modal-body-item",
                                onClick: ($event) => $options.handleJumpSwiper(index)
                              }, vue.toDisplayString(index + 1), 9, ["onClick"]))
                            ],
                            64
                            /* STABLE_FRAGMENT */
                          );
                        }),
                        256
                        /* UNKEYED_FRAGMENT */
                      ))
                    ],
                    4
                    /* STYLE */
                  )
                ],
                4
                /* STYLE */
              )
            ]),
            _: 1
            /* STABLE */
          }, 8, ["modelValue", "value"])
        ])
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesQuestionsAnswer = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__file", "D:/ruangong/emosphere/pages/questions/answer.vue"]]);
  const _sfc_main$1 = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view");
  }
  const PagesReportReport = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "D:/ruangong/emosphere/pages/report/report.vue"]]);
  __definePage("pages/enter/enter", PagesEnterEnter);
  __definePage("pages/login/login", PagesLoginLogin);
  __definePage("pages/calendar/calendar", PagesCalendarCalendar);
  __definePage("pages/main/main", PagesMainMain);
  __definePage("pages/EmoRecord/EmoRecord", PagesEmoRecordEmoRecord);
  __definePage("pages/about/about", PagesAboutAbout);
  __definePage("pages/aboutme/aboutme", PagesAboutmeAboutme);
  __definePage("pages/myScreen/myScreen", PagesMyScreenMyScreen);
  __definePage("pages/relax/relax", PagesRelaxRelax);
  __definePage("pages/share/share", PagesShareShare);
  __definePage("pages/record/record", PagesRecordRecord);
  __definePage("pages/music/music", PagesMusicMusic);
  __definePage("pages/result/result", PagesResultResult);
  __definePage("pages/home/home", PagesHomeHome);
  __definePage("pages/chat/chat", PagesChatChat);
  __definePage("pages/set/set", PagesSetSet);
  __definePage("pages/space/space", PagesSpaceSpace);
  __definePage("pages/user/me", PagesUserMe);
  __definePage("pages/history/history", PagesHistoryHistory);
  __definePage("pages/questions/modal", PagesQuestionsModal);
  __definePage("pages/questions/answer", PagesQuestionsAnswer);
  __definePage("pages/report/report", PagesReportReport);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:12", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:15", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:18", "App Hide");
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_router_view = vue.resolveComponent("router-view");
    return vue.openBlock(), vue.createElementBlock("div", { id: "app" }, [
      vue.createVNode(_component_router_view)
    ]);
  }
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/ruangong/emosphere/App.vue"]]);
  const easycom = {
    autoscan: true,
    custom: {
      "tui-(.*)": "thorui-uni/lib/thorui/tui-$1/tui-$1.vue"
    }
  };
  const pages = [
    {
      path: "pages/enter/enter",
      name: "index",
      style: {
        navigationBarTitleText: "EmoSphere",
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/login/login",
      style: {
        navigationBarTitleText: "",
        enablePullDownRefresh: false,
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/calendar/calendar",
      style: {
        navigationBarTitleText: "",
        enablePullDownRefresh: false,
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/main/main",
      style: {
        navigationBarTitleText: "",
        enablePullDownRefresh: false,
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/EmoRecord/EmoRecord",
      style: {
        navigationBarTitleText: "",
        enablePullDownRefresh: false,
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/about/about",
      style: {
        navigationBarTitleText: "",
        enablePullDownRefresh: false,
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/aboutme/aboutme",
      style: {
        navigationBarTitleText: "",
        enablePullDownRefresh: false,
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/myScreen/myScreen",
      style: {
        navigationBarTitleText: "",
        enablePullDownRefresh: false,
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/relax/relax",
      style: {
        navigationBarTitleText: "",
        enablePullDownRefresh: false,
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/share/share",
      style: {
        navigationBarTitleText: "",
        enablePullDownRefresh: false,
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/record/record",
      style: {
        navigationBarTitleText: "",
        enablePullDownRefresh: false,
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/music/music",
      style: {
        navigationBarTitleText: "",
        enablePullDownRefresh: false,
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/result/result",
      style: {
        navigationBarTitleText: "",
        enablePullDownRefresh: false,
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/home/home",
      style: {
        navigationBarTitleText: "",
        enablePullDownRefresh: false,
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/chat/chat",
      style: {
        navigationBarTitleText: "",
        enablePullDownRefresh: false,
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/set/set",
      style: {
        navigationBarTitleText: "",
        enablePullDownRefresh: false,
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/space/space",
      style: {
        navigationBarTitleText: "",
        enablePullDownRefresh: false,
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/user/me",
      style: {
        navigationBarTitleText: "",
        enablePullDownRefresh: false,
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/history/history",
      style: {
        navigationBarTitleText: "",
        enablePullDownRefresh: false,
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/questions/modal",
      style: {
        navigationBarTitleText: "",
        enablePullDownRefresh: false,
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/questions/answer",
      style: {
        navigationBarTitleText: "",
        enablePullDownRefresh: false,
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/report/report",
      style: {
        navigationBarTitleText: "",
        enablePullDownRefresh: false
      }
    }
  ];
  const globalStyle = {
    navigationBarTextStyle: "black",
    navigationBarTitleText: "uni-app",
    navigationBarBackgroundColor: "#F8F8F8",
    backgroundColor: "#F8F8F8",
    "app-plus": {
      background: "#efeff4"
    }
  };
  const uniIdRouter = {};
  const tabBar = {
    color: "#AAAAAA",
    selectedColor: "#488C88",
    borderStyle: "black",
    backgroundColor: "#ffffff",
    fontSize: "18px",
    height: "60",
    iconWidth: "40px"
  };
  const condition = {
    current: 0,
    list: [
      {
        name: "",
        path: "",
        query: ""
      }
    ]
  };
  const pagesJson = {
    easycom,
    pages,
    globalStyle,
    uniIdRouter,
    tabBar,
    condition
  };
  /*!
   * uni-reade-pages-vite v0.0.1
   * 2023 weisheng
   */
  function t(t2, n2) {
    (null == n2 || n2 > t2.length) && (n2 = t2.length);
    for (var r2 = 0, e2 = Array(n2); n2 > r2; r2++)
      e2[r2] = t2[r2];
    return e2;
  }
  function n(n2) {
    return function(n3) {
      if (Array.isArray(n3))
        return t(n3);
    }(n2) || function(t2) {
      if ("undefined" != typeof Symbol && null != t2[Symbol.iterator] || null != t2["@@iterator"])
        return Array.from(t2);
    }(n2) || function(n3, r2) {
      if (n3) {
        if ("string" == typeof n3)
          return t(n3, r2);
        var e2 = Object.prototype.toString.call(n3).slice(8, -1);
        return "Object" === e2 && n3.constructor && (e2 = n3.constructor.name), "Map" === e2 || "Set" === e2 ? Array.from(n3) : "Arguments" === e2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e2) ? t(n3, r2) : void 0;
      }
    }(n2) || function() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  var r = { includes: ["meta", "path", "aliasPath", "name"] };
  function e(t2, e2) {
    return e2 && e2.includes && (r.includes = Array.from(new Set([].concat(n(r.includes), n(e2.includes))))), a(t2.pages).concat(function(t3) {
      var n2, r2 = [];
      if (null == t3 || 0 == t3.length)
        return [];
      return t3.forEach(function(t4) {
        n2 = a(t4.pages, t4.root), r2 = r2.concat(n2);
      }), r2;
    }(t2.subPackages));
  }
  function a(t2) {
    for (var n2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, e2 = [], a2 = 0; t2.length > a2; a2++) {
      for (var o = t2[a2], c2 = {}, u2 = 0; r.includes.length > u2; u2++) {
        var i2 = r.includes[u2], l2 = o[i2];
        "path" === i2 && (l2 = n2 ? "/".concat(n2, "/").concat(l2) : "/".concat(l2)), "aliasPath" === i2 && 0 == a2 && null == n2 ? c2[i2] = c2[i2] || "/" : void 0 !== l2 && (c2[i2] = l2);
      }
      e2.push(c2);
    }
    return e2;
  }
  const routes = e(pagesJson);
  const router = $({
    routes: [...routes]
    // 路由表信息
  });
  function createApp() {
    const app = vue.createVueApp(App);
    app.use(router);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue, uni.VueShared);
