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
  /*!
    * vue-router v4.1.6
    * (c) 2022 Eduardo San Martin Morote
    * @license MIT
    */
  var NavigationType;
  (function(NavigationType2) {
    NavigationType2["pop"] = "pop";
    NavigationType2["push"] = "push";
  })(NavigationType || (NavigationType = {}));
  var NavigationDirection;
  (function(NavigationDirection2) {
    NavigationDirection2["back"] = "back";
    NavigationDirection2["forward"] = "forward";
    NavigationDirection2["unknown"] = "";
  })(NavigationDirection || (NavigationDirection = {}));
  var NavigationFailureType;
  (function(NavigationFailureType2) {
    NavigationFailureType2[NavigationFailureType2["aborted"] = 4] = "aborted";
    NavigationFailureType2[NavigationFailureType2["cancelled"] = 8] = "cancelled";
    NavigationFailureType2[NavigationFailureType2["duplicated"] = 16] = "duplicated";
  })(NavigationFailureType || (NavigationFailureType = {}));
  const routerKey = Symbol("router");
  function useRouter() {
    return vue.inject(routerKey);
  }
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$g = {
    __name: "index",
    setup(__props) {
      const router = useRouter();
      const tiao = () => {
        router.push("/pages/login/login");
      };
      const title = "EmoSphere";
      const slogan1 = "欢迎来到 EmoSphere";
      const slogan2 = "一个你的专属世界";
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
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
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__file", "D:/软工实践/EmoSphere/pages/index/index.vue"]]);
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return shared.isString(component) ? easycom : component;
  }
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
      } catch (e) {
      }
      this.fallbacks = {
        getSettings() {
          return currentSettings;
        },
        setSettings(value) {
          try {
            localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
          } catch (e) {
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
  function isObject(obj) {
    return obj !== null && typeof obj === "object";
  }
  function isPromise(val) {
    return val && typeof val.then === "function";
  }
  function assert(condition, msg) {
    if (!condition) {
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
      var i = subs.indexOf(fn);
      if (i > -1) {
        subs.splice(i, 1);
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
    if (isObject(type) && type.type) {
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
        path.forEach(function(p) {
          if (!target[p]) {
            target[p] = {
              _custom: {
                value: {},
                display: p,
                tooltip: "Module",
                abstract: true
              }
            };
          }
          target = target[p]._custom.value;
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
    var names = path.split("/").filter(function(n) {
      return n;
    });
    return names.reduce(
      function(module, moduleName, i) {
        var child = module[moduleName];
        if (!child) {
          throw new Error('Missing module "' + moduleName + '" for path "' + path + '".');
        }
        return i === names.length - 1 ? child : child._children;
      },
      path === "root" ? moduleMap : moduleMap.root._children
    );
  }
  function canThrow(cb) {
    try {
      return cb();
    } catch (e) {
      return e;
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
  prototypeAccessors.state.set = function(v) {
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
    } catch (e) {
      {
        console.warn("[vuex] error in before action subscribers: ");
        console.error(e);
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
        } catch (e) {
          {
            console.warn("[vuex] error in after action subscribers: ");
            console.error(e);
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
        } catch (e) {
          {
            console.warn("[vuex] error in error action subscribers: ");
            console.error(e);
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
      emotionIcons: ["xiyue", "beiai", "danyou", "yane", "jingqi", "fennu"]
    },
    mutations: {
      setUserData(state, { id, username }) {
        state.userId = id;
        state.username = username;
      }
    },
    actions: {},
    getters: {
      getUserId: (state) => state.userId,
      getUsername: (state) => state.username,
      getEmotionIcons: (state) => state.emotionIcons
    }
  });
  const _sfc_main$f = {
    __name: "login",
    setup(__props) {
      const router = useRouter();
      const phoneNumber = vue.ref("");
      const password = vue.ref("");
      const handleLogin = () => {
        uni.request({
          url: "http://8.136.81.197:8080/user/login",
          method: "POST",
          data: {
            phone: phoneNumber.value,
            authCode: password.value
          },
          success: (response) => {
            const user = response.data["user"];
            formatAppLog("log", "at pages/login/login.vue:51", response.data);
            store.commit("setUserData", {
              id: user.id,
              username: user.username
            });
            formatAppLog("log", "at pages/login/login.vue:56", "User data stored in Vuex:", store.state.userId, store.state.username);
            router.push("/pages/main/main");
          },
          fail: (error) => {
            formatAppLog("error", "at pages/login/login.vue:62", error);
          }
        });
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
            }, " 登 录 "),
            vue.createElementVNode("view", {
              class: "login-card-loginIn-btn",
              click: ""
            }, " 注册 "),
            vue.createElementVNode("view", { class: "otherlogin" }, [
              vue.createElementVNode("text", null, "-----其他登录方式-----"),
              vue.createElementVNode("view", { class: "icon-list" }, [
                vue.createElementVNode("li", { class: "iconfont icon-weibo" }),
                vue.createElementVNode("li", { class: "iconfont icon-f-qq" }),
                vue.createElementVNode("li", { class: "iconfont icon-weixin" })
              ])
            ]),
            vue.createElementVNode("view", { class: "bottom-message" }, [
              vue.createElementVNode("view", { class: "checbox" }),
              vue.createElementVNode("text", null, "我已阅读并同意《用户协议》《隐私协议》")
            ])
          ])
        ]);
      };
    }
  };
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__file", "D:/软工实践/EmoSphere/pages/login/login.vue"]]);
  const _sfc_main$e = {
    __name: "calendar",
    setup(__props) {
      store.getters.getEmotionIcons;
      const records = vue.ref([]);
      const formatDate = (dateString) => {
        const originalDate = new Date(dateString);
        const month = originalDate.getMonth() + 1;
        const day = originalDate.getDate();
        return `${month}月${day}日`;
      };
      const getemo = () => {
        uni.request({
          url: "http://8.136.81.197:8080/mood_record",
          method: "GET",
          data: {
            uid: 5,
            nums: 2
          },
          success: (response) => {
            formatAppLog("log", "at pages/calendar/calendar.vue:64", response.data);
            records.value = response.data["records"];
          },
          fail: (error) => {
            formatAppLog("error", "at pages/calendar/calendar.vue:68", error);
          }
        });
      };
      vue.onMounted(() => {
        getemo();
      });
      return (_ctx, _cache) => {
        const _component_router_link = vue.resolveComponent("router-link");
        return vue.openBlock(), vue.createElementBlock("view", { class: "backarea" }, [
          vue.createElementVNode("view", { class: "header" }, [
            vue.createVNode(_component_router_link, { to: { path: "/pages/main/main" } }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "head-left" }, [
                  vue.createElementVNode("img", { src: "/static/images/fanhui.png" }),
                  vue.createElementVNode("text", null, "返回")
                ])
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createElementVNode("view", {
              class: "head-right",
              onClick: getemo
            }, [
              vue.createElementVNode("img", { src: "/static/images/gou.png" }),
              vue.createElementVNode("text", null, "获取")
            ])
          ]),
          vue.createElementVNode("view", { class: "calendar" }, [
            vue.createCommentVNode(' 						<view>\r\n				<uni-calendar class="uni-calendar--hook" :selected="info.selected" :showMonth="false" @change="change"\r\n					@monthSwitch="monthSwitch" />\r\n			</view> ')
          ]),
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
                    vue.createElementVNode("img", {
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
  const PagesCalendarCalendar = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__file", "D:/软工实践/EmoSphere/pages/calendar/calendar.vue"]]);
  const _sfc_main$d = {
    __name: "main",
    setup(__props) {
      const router = useRouter();
      const ToRecord = () => {
        router.push("/pages/EmoRecord/EmoRecord");
      };
      return (_ctx, _cache) => {
        const _component_router_link = vue.resolveComponent("router-link");
        return vue.openBlock(), vue.createElementBlock("div", { id: "app" }, [
          vue.createElementVNode("img", {
            alt: "背景图",
            src: "/static/images/z.png",
            style: { "width": "auto" }
          }),
          vue.createVNode(_component_router_link, { to: { path: "/pages/myScreen/myScreen" } }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("img", {
                alt: "z11",
                src: "/static/images/z11.png",
                style: { "position": "absolute", "top": "20px", "left": "20px" }
              })
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createElementVNode("img", {
            alt: "z12",
            src: "/static/images/z12.png",
            style: { "position": "absolute", "top": "calc(50% - 80px)", "left": "50%", "transform": "translate(-50%, -50%)" }
          }),
          vue.createElementVNode("div", { style: { "position": "absolute", "top": "calc(70% - 30px)", "left": "50%", "transform": "translateX(-50%)", "display": "flex", "justify-content": "space-between", "width": "80%" } }, [
            vue.createElementVNode("div", { style: { "position": "relative" } }, [
              vue.createElementVNode("img", {
                alt: "z2",
                src: "/static/images/z2.png"
              }),
              vue.createElementVNode("img", {
                alt: "z3",
                src: "/static/images/z3.png",
                style: { "position": "absolute", "top": "8px", "left": "8px" }
              })
            ]),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("div", { style: { "position": "relative" } }, [
                vue.createElementVNode("img", {
                  alt: "z2",
                  src: "/static/images/z2.png"
                }),
                vue.createVNode(_component_router_link, { to: { path: "/pages/calendar/calendar" } }, {
                  default: vue.withCtx(() => [
                    vue.createElementVNode("img", {
                      alt: "z4",
                      src: "/static/images/z4.png",
                      style: { "position": "absolute", "top": "12px", "left": "11px" }
                    })
                  ]),
                  _: 1
                  /* STABLE */
                })
              ])
            ]),
            vue.createElementVNode("div", { style: { "position": "relative" } }, [
              vue.createElementVNode("img", {
                alt: "z2",
                src: "/static/images/z2.png"
              }),
              vue.createElementVNode("img", {
                alt: "z5",
                src: "/static/images/z5.png",
                style: { "position": "absolute", "top": "10px", "left": "7px" }
              })
            ]),
            vue.createElementVNode("div", { style: { "position": "relative" } }, [
              vue.createElementVNode("img", {
                alt: "z2",
                src: "/static/images/z2.png"
              }),
              vue.createVNode(_component_router_link, { to: { path: "/pages/relax/relax" } }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("img", {
                    alt: "z6",
                    src: "/static/images/z6.png",
                    style: { "position": "absolute", "top": "5px", "left": "5px" }
                  })
                ]),
                _: 1
                /* STABLE */
              })
            ])
          ]),
          vue.createElementVNode("div", {
            onClick: ToRecord,
            style: { "position": "absolute", "bottom": "100px", "left": "50%", "transform": "translateX(-50%)", "display": "flex" }
          }, [
            vue.createElementVNode("img", {
              alt: "z10",
              src: "/static/images/z10.png",
              style: { "align-self": "center", "margin-right": "20px" }
            }),
            vue.createElementVNode("img", {
              alt: "z13",
              src: "/static/images/z13.png",
              style: { "align-self": "center" }
            })
          ])
        ]);
      };
    }
  };
  const PagesMainMain = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__file", "D:/软工实践/EmoSphere/pages/main/main.vue"]]);
  const _sfc_main$c = {
    __name: "EmoRecord",
    setup(__props) {
      const emotionIcons = store.getters.getEmotionIcons;
      formatAppLog("log", "at pages/EmoRecord/EmoRecord.vue:86", emotionIcons);
      let Icon = null;
      const router = useRouter();
      const getback = () => {
        router.push("/pages/main/main");
      };
      const selectIcon = (iconName) => {
        Icon = Icon === iconName ? null : iconName;
        formatAppLog("log", "at pages/EmoRecord/EmoRecord.vue:94", "选中的图标：", Icon);
      };
      const isSelected = (iconName) => {
        return Icon === iconName;
      };
      const userid = vue.ref(store.getters.getUserId).value;
      const Title = vue.ref("");
      const Content = vue.ref("");
      const savadata = () => {
        const data = {
          uid: userid,
          mood: Icon,
          title: Title.value,
          content: Content.value
        };
        formatAppLog("log", "at pages/EmoRecord/EmoRecord.vue:111", data);
        uni.request({
          url: "http://8.136.81.197:8080/mood_record",
          method: "POST",
          data,
          success: (response) => {
            formatAppLog("log", "at pages/EmoRecord/EmoRecord.vue:117", response.data);
          },
          fail: (error) => {
            formatAppLog("error", "at pages/EmoRecord/EmoRecord.vue:120", "保存失败", error);
          }
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "backarea" }, [
          vue.createElementVNode("view", { class: "header" }, [
            vue.createElementVNode("view", {
              class: "left",
              onClick: getback
            }, [
              vue.createElementVNode("img", { src: "/static/images/fanhui.png" }),
              vue.createElementVNode("text", null, "返回")
            ]),
            vue.createElementVNode("view", {
              class: "right",
              onClick: savadata
            }, [
              vue.createElementVNode("img", { src: "/static/images/gou.png" }),
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
                    vue.createElementVNode("img", {
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
                  vue.createElementVNode("img", { src: "/static/things/加号.png" })
                ]),
                vue.createElementVNode("span", null, "添加")
              ]),
              vue.createElementVNode("li", null, [
                vue.createElementVNode("div", { class: "circle" }, [
                  vue.createElementVNode("img", { src: "/static/things/lvhang.png" })
                ]),
                vue.createElementVNode("span", null, "添加")
              ]),
              vue.createElementVNode("li", null, [
                vue.createElementVNode("div", { class: "circle" }, [
                  vue.createElementVNode("img", { src: "/static/things/bangqiu.png" })
                ]),
                vue.createElementVNode("span", null, "添加")
              ]),
              vue.createElementVNode("li", null, [
                vue.createElementVNode("div", { class: "circle" }, [
                  vue.createElementVNode("img", { src: "/static/things/meishi1.png" })
                ]),
                vue.createElementVNode("span", null, "添加")
              ]),
              vue.createElementVNode("li", null, [
                vue.createElementVNode("div", { class: "circle" }, [
                  vue.createElementVNode("img", { src: "/static/things/shuijue.png" })
                ]),
                vue.createElementVNode("span", null, "添加")
              ]),
              vue.createElementVNode("li", null, [
                vue.createElementVNode("div", { class: "circle" }, [
                  vue.createElementVNode("img", { src: "/static/things/xingquaihao1.png" })
                ]),
                vue.createElementVNode("span", null, "添加")
              ]),
              vue.createElementVNode("li", null, [
                vue.createElementVNode("div", { class: "circle" }, [
                  vue.createElementVNode("img", { src: "/static/things/xinsui.png" })
                ]),
                vue.createElementVNode("span", null, "添加")
              ]),
              vue.createElementVNode("li", null, [
                vue.createElementVNode("div", { class: "circle" }, [
                  vue.createElementVNode("img", { src: "/static/things/xuexi.png" })
                ]),
                vue.createElementVNode("span", null, "添加")
              ]),
              vue.createElementVNode("li", null, [
                vue.createElementVNode("div", { class: "circle" }, [
                  vue.createElementVNode("img", { src: "/static/things/jinianri3.png" })
                ]),
                vue.createElementVNode("span", null, "添加")
              ]),
              vue.createElementVNode("li", null, [
                vue.createElementVNode("div", { class: "circle" }, [
                  vue.createElementVNode("img", { src: "/static/things/yueduliang.png" })
                ]),
                vue.createElementVNode("span", null, "添加")
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
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => Title.value = $event)
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vModelText, Title.value]
              ])
            ]),
            vue.createElementVNode("view", { class: "content" }, [
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  type: "text",
                  placeholder: "请具体描述",
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => Content.value = $event)
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vModelText, Content.value]
              ])
            ]),
            vue.createElementVNode("view", { class: "photo" }, [
              vue.createElementVNode("button", { class: "circle" }, [
                vue.createElementVNode("img", {
                  src: "/static/things/加号.png",
                  alt: ""
                })
              ])
            ])
          ])
        ]);
      };
    }
  };
  const PagesEmoRecordEmoRecord = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__file", "D:/软工实践/EmoSphere/pages/EmoRecord/EmoRecord.vue"]]);
  const _sfc_main$b = {
    data() {
      return {
        showPopup: false,
        showFeedback: false,
        description: "Emosphere: 一款致力于帮助人们放松，舒缓心情的软件，有AI聊天，社区，星期日历，放松等模块，多方面帮助心理压抑的人群去放松。",
        feedbackText: "",
        popupWidth: "80%",
        // 设置弹窗宽度为背景图宽度的90%
        popupHeight: "25%",
        // 设置弹窗高度为背景图高度的90%
        feedbackWidth: "80%",
        // 设置问题反馈界面宽度为背景图宽度的90%
        feedbackHeight: "35%"
        // 设置问题反馈界面高度为背景图高度的90%
      };
    },
    methods: {
      submitFeedback() {
        formatAppLog("log", "at pages/about/about.vue:60", "提交问题反馈:", this.feedbackText);
        this.showFeedback = false;
      }
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_router_link = vue.resolveComponent("router-link");
    return vue.openBlock(), vue.createElementBlock("view", { class: "about" }, [
      vue.createElementVNode("view", { class: "header" }, [
        vue.createVNode(_component_router_link, { to: { path: "/pages/myScreen/myScreen" } }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("img", { src: "/static/images/fan.png" })
          ]),
          _: 1
          /* STABLE */
        }),
        vue.createElementVNode("span", null, "关于EmoSphere")
      ]),
      vue.createElementVNode("img", {
        class: "logo",
        src: "/static/images/logo.png"
      }),
      vue.createElementVNode("img", {
        alt: "图片23",
        src: "/static/images/23.png",
        style: { "position": "absolute", "top": "38%", "left": "50%", "transform": "translateX(-50%)", "height": "50px" }
      }),
      vue.createElementVNode("view", { class: "help" }, [
        vue.createElementVNode("view", {
          onClick: _cache[0] || (_cache[0] = ($event) => $data.showFeedback = true)
        }, [
          vue.createElementVNode("span", null, "问题反馈"),
          vue.createElementVNode("img", {
            src: "/static/images/zhankai.png",
            alt: ""
          })
        ]),
        vue.createElementVNode("view", {
          onClick: _cache[1] || (_cache[1] = ($event) => $data.showPopup = true)
        }, [
          vue.createElementVNode("span", null, "功能介绍"),
          vue.createElementVNode("img", {
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
            onClick: _cache[2] || (_cache[2] = ($event) => $data.showPopup = false)
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
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.feedbackText = $event),
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
            onClick: _cache[4] || (_cache[4] = ($event) => $data.showFeedback = false)
          }, "取消"),
          vue.createElementVNode("button", {
            onClick: _cache[5] || (_cache[5] = (...args) => $options.submitFeedback && $options.submitFeedback(...args))
          }, "确定")
        ],
        4
        /* STYLE */
      )) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesAboutAbout = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$9], ["__scopeId", "data-v-13a78ac6"], ["__file", "D:/软工实践/EmoSphere/pages/about/about.vue"]]);
  const _sfc_main$a = {
    __name: "aboutme",
    setup(__props) {
      useRouter();
      const username = vue.ref(store.getters.getUsername);
      const goToProfile = () => {
      };
      return (_ctx, _cache) => {
        const _component_router_link = vue.resolveComponent("router-link");
        return vue.openBlock(), vue.createElementBlock("view", { class: "my-page" }, [
          vue.createElementVNode("view", { class: "header" }, [
            vue.createVNode(_component_router_link, { to: { path: "/pages/myScreen/myScreen" } }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("img", { src: "/static/images/fan.png" })
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createElementVNode("span", null, "个人资料")
          ]),
          vue.createElementVNode("text", {
            class: "edit",
            onClick: _cache[0] || (_cache[0] = (...args) => _ctx.edit && _ctx.edit(...args))
          }, "编辑资料"),
          vue.createElementVNode("view", { class: "content" }, [
            vue.createElementVNode("view", { class: "menu-item1" }, [
              vue.createCommentVNode(' <image class="user-avatar" src="/static/uni.png" /> '),
              vue.createElementVNode("image", { class: "user-avatar" }),
              vue.createElementVNode("text", {
                class: "user-avatar-text",
                onClick: _cache[1] || (_cache[1] = (...args) => _ctx.uploadImage && _ctx.uploadImage(...args))
              }, "修改头像")
            ]),
            vue.createElementVNode("view", { class: "menu-item" }, [
              vue.createElementVNode("text", { class: "menu-text" }, "用户昵称"),
              vue.createElementVNode(
                "text",
                { class: "menu-text1" },
                vue.toDisplayString(username.value),
                1
                /* TEXT */
              ),
              vue.createElementVNode("img", {
                src: "/static/images/yuanjiantou.png",
                alt: ""
              })
            ]),
            vue.createElementVNode("view", { class: "menu-item" }, [
              vue.createElementVNode("text", { class: "menu-text" }, "性别"),
              vue.createElementVNode("text", { class: "menu-text1" }, "♂ 男 "),
              vue.createElementVNode("img", {
                src: "/static/images/yuanjiantou.png",
                alt: ""
              })
            ]),
            vue.createCommentVNode(" 个人资料 "),
            vue.createElementVNode("view", {
              class: "menu-item",
              onClick: goToProfile
            }, [
              vue.createElementVNode("text", { class: "menu-text" }, "常驻地"),
              vue.createElementVNode("text", { class: "menu-text1" }, "福州"),
              vue.createElementVNode("img", {
                src: "/static/images/yuanjiantou.png",
                alt: ""
              })
            ]),
            vue.createCommentVNode(" 个人资料 "),
            vue.createElementVNode("view", {
              class: "menu-item",
              onClick: goToProfile
            }, [
              vue.createElementVNode("text", { class: "menu-text" }, "生日"),
              vue.createElementVNode("text", { class: "menu-text1" }, "1998-2-12"),
              vue.createElementVNode("img", {
                src: "/static/images/yuanjiantou.png",
                alt: ""
              })
            ]),
            vue.createCommentVNode(" 个人资料 "),
            vue.createElementVNode("view", {
              class: "menu-item",
              onClick: goToProfile
            }, [
              vue.createElementVNode("text", { class: "menu-text" }, "二维码"),
              vue.createElementVNode("text", { class: "menu-text1 look" }, "点击查看"),
              vue.createElementVNode("img", {
                src: "/static/images/yuanjiantou.png",
                alt: ""
              })
            ])
          ])
        ]);
      };
    }
  };
  const PagesAboutmeAboutme = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__file", "D:/软工实践/EmoSphere/pages/aboutme/aboutme.vue"]]);
  const _sfc_main$9 = {
    __name: "myScreen",
    setup(__props) {
      const router = useRouter();
      const username = vue.ref(store.getters.getUsername);
      const userid = vue.ref(store.getters.getUserId);
      const goBack = () => {
        router.push("/pages/main/main");
      };
      const goToProfile = () => {
        formatAppLog("log", "at pages/myScreen/myScreen.vue:59", "aboutme");
        router.push("/pages/aboutMe/aboutMe");
      };
      const goToFavorites = () => {
        formatAppLog("log", "at pages/myScreen/myScreen.vue:64", "like");
      };
      const goToAbout = () => {
        router.push("/pages/about/about");
      };
      const logout = () => {
        if (confirm("确定要退出登录吗？")) {
          formatAppLog("log", "at pages/myScreen/myScreen.vue:73", "logout");
          router.push("/pages/login/login");
        }
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "my-page" }, [
          vue.createElementVNode("view", { class: "header" }, [
            vue.createElementVNode("view", {
              class: "head-left",
              onClick: goBack
            }, [
              vue.createElementVNode("img", { src: "/static/images/fanhui.png" }),
              vue.createElementVNode("text", null, "返回")
            ])
          ]),
          vue.createElementVNode("view", { class: "form" }, [
            vue.createElementVNode("view", { class: "role" }, [
              vue.createElementVNode("img", {
                src: "/static/images/logo.png",
                alt: ""
              })
            ]),
            vue.createElementVNode("view", { class: "info" }, [
              vue.createElementVNode(
                "text",
                { class: "user-name" },
                vue.toDisplayString(username.value),
                1
                /* TEXT */
              ),
              vue.createElementVNode("text", { class: "user-info" }, "♂ 30岁"),
              vue.createElementVNode(
                "text",
                { class: "user-id" },
                "UserID:" + vue.toDisplayString(userid.value),
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
              vue.createElementVNode("img", {
                src: "/static/images/heijiantou.png",
                alt: ""
              })
            ]),
            vue.createCommentVNode(" 收藏内容 "),
            vue.createElementVNode("view", {
              class: "menu-item",
              onClick: goToFavorites
            }, [
              vue.createElementVNode("text", { class: "menu-text" }, "收藏内容"),
              vue.createElementVNode("img", {
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
              vue.createElementVNode("img", {
                src: "/static/images/heijiantou.png",
                alt: ""
              })
            ])
          ]),
          vue.createElementVNode("button", {
            class: "logout-button",
            onClick: logout
          }, "退出登录")
        ]);
      };
    }
  };
  const PagesMyScreenMyScreen = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__file", "D:/软工实践/EmoSphere/pages/myScreen/myScreen.vue"]]);
  const _sfc_main$8 = {
    data() {
      return {
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
        formatAppLog("log", "at pages/relax/relax.vue:112", "开始放松方式:", method);
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
          this.completedPopup = this.popupContent[this.currentPopup].title;
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
        this.countingDown = true;
        const startTime = Date.now();
        const updateCountdown = () => {
          const elapsedTime = Date.now() - startTime;
          const remainingTime = Math.max(0, duration - Math.floor(elapsedTime / 1e3));
          this.countdownMinutes = Math.floor(remainingTime / 60);
          this.countdownSeconds = remainingTime % 60;
          if (remainingTime > 0) {
            requestAnimationFrame(updateCountdown);
          } else {
            this.countingDown = false;
            this.resetCountdown();
          }
        };
        requestAnimationFrame(updateCountdown);
      },
      resetCountdown() {
        this.countdownMinutes = 0;
        this.countdownSeconds = 0;
      }
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_router_link = vue.resolveComponent("router-link");
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("view", { class: "page" }, [
          vue.createElementVNode("view", { class: "header" }, [
            vue.createVNode(_component_router_link, { to: "/pages/main/main" }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("img", {
                  src: "/static/f1.png",
                  onClick: _cache[0] || (_cache[0] = ($event) => $options.incrementCount("f1", 5))
                })
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createVNode(_component_router_link, { to: "/pages/music/music" }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("img", {
                  src: "/static/f2.png",
                  onClick: _cache[1] || (_cache[1] = ($event) => $options.incrementCount("f2", 5))
                })
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createElementVNode("img", {
              class: "choose",
              src: "/static/f3.png"
            }),
            vue.createVNode(_component_router_link, { to: "" }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("img", {
                  src: "/static/f4.png",
                  onClick: _cache[2] || (_cache[2] = ($event) => $options.incrementCount("f4", 5))
                })
              ]),
              _: 1
              /* STABLE */
            })
          ]),
          vue.createElementVNode("view", { class: "title" }, [
            vue.createElementVNode("text", null, "Relax")
          ]),
          vue.createElementVNode("img", {
            alt: "图片f6",
            src: "/static/f6.png",
            style: { "position": "absolute", "top": "58%", "left": "65%", "transform": "translate(-50%, -50%)" }
          }),
          vue.createElementVNode("view", { class: "method" }, [
            vue.createElementVNode("img", {
              alt: "图片f7",
              src: "/static/f7.png",
              onClick: _cache[3] || (_cache[3] = ($event) => $options.startRelaxation("f7")),
              style: { "margin-bottom": "10px" }
            }),
            vue.createElementVNode("img", {
              alt: "图片f8",
              src: "/static/f8.png",
              onClick: _cache[4] || (_cache[4] = ($event) => $options.startRelaxation("f8")),
              style: { "margin-bottom": "10px" }
            }),
            vue.createElementVNode("img", {
              alt: "图片f9",
              src: "/static/f9.png",
              onClick: _cache[5] || (_cache[5] = ($event) => $options.startRelaxation("f9")),
              style: { "margin-bottom": "10px" }
            }),
            vue.createElementVNode("img", {
              alt: "图片f10",
              src: "/static/f10.png",
              onClick: _cache[6] || (_cache[6] = ($event) => $options.startRelaxation("f10")),
              style: { "margin-bottom": "10px" }
            })
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
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesRelaxRelax = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8], ["__scopeId", "data-v-3a9d0990"], ["__file", "D:/软工实践/EmoSphere/pages/relax/relax.vue"]]);
  const _sfc_main$7 = {};
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("div", { id: "building" }, [
      vue.createCommentVNode(' 		<u-navbar :is-back="false" title="" height=80 leftIconSize=25 leftIconColor="#488C88"\r\n			:bgColor="`rgb(255 255 255 / 0%)`">\r\n			<view class="slot-wrap" slot="right">\r\n				<u-button color=#488C88 shape="circle" text="分享">\r\n				</u-button>\r\n			</view>\r\n		</u-navbar> '),
      vue.createCommentVNode(` 		<u-textarea v-model="value1" placeholder="What's your emotion" count="true" class="text-style">\r
		</u-textarea> `),
      vue.createCommentVNode(' 		<u-upload :fileList="fileList6" @afterRead="afterRead" @delete="deletePic" name="6" multiple :maxCount="1"\r\n			width="130" height="130" class="update-style" uploadText="上传图片" uploadIcon="plus-circle-fill"\r\n			uploadIconColor="#488C88">\r\n\r\n		</u-upload> ')
    ]);
  }
  const PagesShareShare = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7], ["__scopeId", "data-v-ceb22cc9"], ["__file", "D:/软工实践/EmoSphere/pages/share/share.vue"]]);
  const _sfc_main$6 = {
    data() {
      return {
        top: 10,
        current: 0,
        currentTab: 0,
        tabs: [
          {
            name: "我的"
          },
          {
            name: "赞过"
          }
        ],
        userInfo: {
          avatar: "/static/xiaodiao.png",
          username: "Xiaodiao",
          id: "The sun will shion on us again.",
          followCount: 25,
          fanCount: 25,
          like: 25
        },
        seed: 0,
        uid: "",
        show: false,
        radio: [
          {
            text: "取消",
            type: "white"
          },
          {
            text: "确定",
            type: "red"
          }
        ],
        mid: "",
        screenHeight: 0,
        top_show: false,
        vHeight: 0
      };
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_tui_button = vue.resolveComponent("tui-button");
    const _component_tui_tabs = vue.resolveComponent("tui-tabs");
    const _component_Trend = vue.resolveComponent("Trend");
    const _component_Album = vue.resolveComponent("Album");
    const _component_Collection = vue.resolveComponent("Collection");
    const _component_tui_modal = vue.resolveComponent("tui-modal");
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      vue.createElementVNode("image", {
        src: "/static/back.png",
        class: "tui-header-img"
      }),
      vue.createElementVNode("view", { class: "main" }, [
        vue.createElementVNode("view", { class: "top" }, [
          vue.createElementVNode("view", { class: "user" }, [
            vue.createElementVNode("view", { class: "user-left" }, [
              vue.createElementVNode("image", {
                src: "/static/xiaodiao.png",
                class: "avatar",
                mode: "aspectFill"
              }),
              vue.createElementVNode("view", { class: "user-content" }, [
                vue.createElementVNode(
                  "h3",
                  null,
                  vue.toDisplayString($data.userInfo.username),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  { class: "user-id f" },
                  vue.toDisplayString($data.userInfo.id),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  { class: "descrpition f" },
                  vue.toDisplayString($data.userInfo.description),
                  1
                  /* TEXT */
                )
              ])
            ]),
            vue.createElementVNode("view", { class: "user-right" }, [
              vue.createVNode(_component_tui_button, {
                type: "green",
                shape: "circle",
                onClick: _ctx.editUserInfo,
                height: "60rpx",
                width: "140rpx",
                size: 28
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode("编辑")
                ]),
                _: 1
                /* STABLE */
              }, 8, ["onClick"])
            ])
          ]),
          vue.createElementVNode("view", { class: "info" }, [
            vue.createElementVNode("view", { class: "up-down" }, [
              vue.createElementVNode(
                "view",
                { class: "up-number" },
                vue.toDisplayString($data.userInfo.followCount),
                1
                /* TEXT */
              ),
              vue.createElementVNode("view", { class: "down-zi" }, " 关注 ")
            ]),
            vue.createElementVNode("view", { class: "up-down" }, [
              vue.createElementVNode(
                "view",
                { class: "up-number" },
                vue.toDisplayString($data.userInfo.fanCount),
                1
                /* TEXT */
              ),
              vue.createElementVNode("view", { class: "down-zi" }, " 粉丝 ")
            ]),
            vue.createElementVNode("view", { class: "up-down" }, [
              vue.createElementVNode(
                "view",
                { class: "up-number" },
                vue.toDisplayString($data.userInfo.like),
                1
                /* TEXT */
              ),
              vue.createElementVNode("view", { class: "down-zi" }, " 赞 ")
            ])
          ]),
          vue.createElementVNode("view", { class: "tabs-style" }, [
            vue.createVNode(_component_tui_tabs, {
              tabs: $data.tabs,
              currentTab: $data.currentTab,
              onChange: _ctx.change,
              sliderBgColor: "#488C88",
              selectedColor: "#488C88",
              itemWidth: "50%",
              size: "35",
              scale: "1.1"
            }, null, 8, ["tabs", "currentTab", "onChange"])
          ])
        ])
      ]),
      vue.createElementVNode("view", { class: "zhuti" }, [
        $data.userInfo ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
          $data.currentTab == 0 ? (vue.openBlock(), vue.createBlock(_component_Trend, {
            key: 0,
            uid: $data.uid,
            onCancelUp: _ctx.cancelUp,
            seed: $data.seed
          }, null, 8, ["uid", "onCancelUp", "seed"])) : vue.createCommentVNode("v-if", true),
          $data.currentTab == 1 ? (vue.openBlock(), vue.createBlock(_component_Album, {
            key: 1,
            seed: $data.seed,
            uid: $data.uid
          }, null, 8, ["seed", "uid"])) : vue.createCommentVNode("v-if", true),
          $data.currentTab == 2 ? (vue.openBlock(), vue.createBlock(_component_Collection, {
            key: 2,
            uid: $data.uid,
            seed: $data.seed
          }, null, 8, ["uid", "seed"])) : vue.createCommentVNode("v-if", true)
        ])) : vue.createCommentVNode("v-if", true)
      ]),
      vue.createVNode(_component_tui_modal, {
        show: $data.show,
        onClick: _ctx.confirm,
        onCancel: _ctx.hide,
        content: "取消上传",
        button: $data.radio,
        width: "50%",
        padding: "15rpx 40rpx",
        fadeIn: true
      }, null, 8, ["show", "onClick", "onCancel", "button"])
    ]);
  }
  const PagesUserMe = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6], ["__scopeId", "data-v-4dafeecb"], ["__file", "D:/软工实践/EmoSphere/pages/user/me.vue"]]);
  const _sfc_main$5 = {
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
    onLoad(e) {
    },
    methods: {
      topage(e) {
        this.$emit("click", e);
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
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
              vue.renderList($props.infoList, (i, index) => {
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
                        vue.toDisplayString(i.date),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode(
                        "view",
                        {
                          style: vue.normalizeStyle({ WebkitLineClamp: $props.lineNum != 0 ? $props.lineNum : "" })
                        },
                        vue.toDisplayString(i.info),
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
  const YSteps = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5], ["__scopeId", "data-v-3d3a9ebb"], ["__file", "D:/软工实践/EmoSphere/components/Y-Steps/Y-Steps.vue"]]);
  const _sfc_main$4 = {
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
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
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
          vue.createCommentVNode(' <view class="flex padding-top-xs text-xxxl text-black">\n			<text class="cuIcon-close text-white"></text>\n		</view> '),
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
  const PagesRecordRecord = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__file", "D:/软工实践/EmoSphere/pages/record/record.vue"]]);
  const _sfc_main$3 = {
    data() {
      return {
        audio: uni.createInnerAudioContext(),
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
      //音频链接
      autoplay: Boolean,
      //是否自动播放
      continue: Boolean,
      //播放完成后是否继续播放下一首，需定义@next事件
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
      this.audio.obeyMuteSwitch = false;
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
        if (this.continue) {
          this.next();
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
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
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
          "block-size": "20",
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
            "",
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
            "",
            4
            /* STYLE */
          )) : vue.createCommentVNode("v-if", true)
        ],
        4
        /* STYLE */
      )
    ]);
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__scopeId", "data-v-8a21190d"], ["__file", "D:/软工实践/EmoSphere/components/imt-audio/imt-audio.vue"]]);
  const _sfc_main$2 = {
    data() {
      return {
        like: 0,
        play: 0,
        TabCur: 0,
        scrollLeft: 0,
        audio: [
          "/static/songs/xue.mp3",
          "/static/songs/kexi.mp3"
        ],
        song: [
          "认真的雪 薛之谦",
          "可惜没如果 林俊杰"
        ],
        songname: [
          "认真的雪",
          "可惜没如果"
        ],
        singername: [
          "薛之谦",
          "林俊杰"
        ],
        songimage: [
          "/static/images/design07.png",
          "/static/images/design10.jpg"
        ],
        now: 0
      };
    },
    methods: {
      tabSelect(e) {
        this.TabCur = e.currentTarget.dataset.id;
        this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
      },
      like_ornot() {
        if (this.like == 0) {
          this.like = 1;
        } else {
          this.like = 0;
        }
      },
      play_ornot() {
        if (this.play == 0) {
          this.play = 1;
        } else {
          this.play = 0;
        }
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_router_link = vue.resolveComponent("router-link");
    const _component_a_button = vue.resolveComponent("a-button");
    const _component_imt_audio = resolveEasycom(vue.resolveDynamicComponent("imt-audio"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", { class: "scrollPage margin-xs bg-oc-gray-9" }, [
      vue.createElementVNode("view", { class: "header" }, [
        vue.createVNode(_component_router_link, { to: "/pages/main/main" }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("img", { src: "/static/images/fanhui.png" })
          ]),
          _: 1
          /* STABLE */
        }),
        vue.createVNode(_component_router_link, { to: "" }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("img", {
              class: "choose",
              src: "/static/images/mm.png"
            })
          ]),
          _: 1
          /* STABLE */
        }),
        vue.createVNode(_component_router_link, { to: "/pages/relax/relax" }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("img", { src: "/static/images/fenche.png" })
          ]),
          _: 1
          /* STABLE */
        }),
        vue.createVNode(_component_router_link, { to: "" }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("img", { src: "/static/images/recode.png" })
          ]),
          _: 1
          /* STABLE */
        })
      ]),
      vue.createElementVNode("view", { class: "radius-lg" }, [
        vue.createElementVNode("view", {
          class: "bg-white padding-bottom radius-xl",
          style: { "text-align": "center" }
        }, [
          vue.createElementVNode("view", {
            class: "padding-lr margin-xxl",
            style: { "height": "14rem", "margin-bottom": "40px" }
          }, [
            vue.createElementVNode("image", {
              class: "shadow-blur bg-img radius-lg",
              src: $data.songimage[$data.now]
            }, null, 8, ["src"])
          ]),
          vue.createElementVNode(
            "view",
            {
              class: "text-xl text-black text-center",
              style: { "font-size": "24px" }
            },
            vue.toDisplayString($data.songname[$data.now]),
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
              vue.toDisplayString($data.singername[$data.now]),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "margin-top-xl text-center text-xxxl text-black padding-top-lg" }, [
            vue.createElementVNode("text", { class: "cuIcon-refresh padding-right-xl" }),
            vue.createVNode(_component_a_button, {
              type: "link",
              ghost: "",
              onClick: $options.like_ornot
            }, {
              default: vue.withCtx(() => [
                $data.like ? (vue.openBlock(), vue.createElementBlock("text", {
                  key: 0,
                  class: "cuIcon-likefill text-red padding-lr-xl",
                  alt: ""
                })) : (vue.openBlock(), vue.createElementBlock("text", {
                  key: 1,
                  class: "cuIcon-like padding-lr-xl",
                  alt: ""
                }))
              ]),
              _: 1
              /* STABLE */
            }, 8, ["onClick"]),
            vue.createElementVNode("text", { class: "cuIcon-sort padding-left-xl" })
          ]),
          vue.createElementVNode("view", { class: "content" }, [
            vue.createVNode(_component_imt_audio, {
              autoplay: "true",
              continue: "false",
              src: $data.audio[$data.now],
              duration: $data.audio[$data.now].duration,
              onPrev: _cache[0] || (_cache[0] = ($event) => $data.now = $data.now === 0 ? $data.audio.length - 1 : $data.now - 1),
              onNext: _cache[1] || (_cache[1] = ($event) => $data.now = $data.now === $data.audio.length - 1 ? 0 : $data.now + 1)
            }, null, 8, ["src", "duration"]),
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($data.song, (item, key) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: vue.normalizeClass(["list", { active: key === $data.now }]),
                  key,
                  onClick: ($event) => $data.now = key
                }, vue.toDisplayString(key + 1) + " . " + vue.toDisplayString(item), 11, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ]),
        vue.createElementVNode("view", { class: "padding-tb" }, [
          vue.createElementVNode("view", { class: "flex justify-between" }, [
            vue.createElementVNode("view", { class: "flex" }, [
              vue.createElementVNode("view", {
                class: "cu-avatar round margin-left-sm",
                style: { "background-image": "url(/static/images/design05.png)" }
              }),
              vue.createElementVNode("view", {
                class: "cu-avatar round margin-left-sm",
                style: { "background-image": "url(/static/images/design01.png)" }
              }),
              vue.createElementVNode("view", {
                class: "cu-avatar round margin-left-sm",
                style: { "background-image": "url(/static/images/design02.png)" }
              }),
              vue.createElementVNode("view", { class: "cu-avatar round margin-left bg-oc-gray-7" }, [
                vue.createElementVNode("text", { class: "cuIcon-more" })
              ])
            ]),
            vue.createElementVNode("view", { class: "flex" }, [
              vue.createElementVNode("view", { class: "padding-right-sm" }, [
                vue.createElementVNode("navigator", {
                  url: "/pages/record/record",
                  "open-type": "navigate"
                }, [
                  vue.createElementVNode("button", { class: "cu-btn round" }, "听歌心情")
                ])
              ])
            ])
          ])
        ])
      ])
    ]);
  }
  const PagesMusicMusic = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__file", "D:/软工实践/EmoSphere/pages/music/music.vue"]]);
  const _sfc_main$1 = {
    data() {
      return {
        daysOfWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        showCalendar: false,
        selectedDate: "",
        currentDate: /* @__PURE__ */ new Date()
      };
    },
    computed: {
      currentMonth() {
        const options = { month: "long", year: "numeric" };
        return this.currentDate.toLocaleDateString("en-US", options);
      },
      calendar() {
        const firstDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
        const startDate = new Date(firstDayOfMonth);
        startDate.setDate(startDate.getDate() - startDate.getDay());
        const endDate = new Date(lastDayOfMonth);
        endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));
        const calendar = [];
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
          const week = [];
          for (let i = 0; i < 7; i++) {
            const dateValue = new Date(currentDate);
            const display = dateValue.getDate();
            const isCurrentMonth = dateValue.getMonth() === this.currentDate.getMonth();
            week.push({ value: dateValue.toISOString(), display, isCurrentMonth });
            currentDate.setDate(currentDate.getDate() + 1);
          }
          calendar.push(week);
        }
        return calendar;
      }
    },
    methods: {
      prevMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      },
      nextMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      },
      selectDate(day) {
        if (day.isCurrentMonth) {
          this.selectedDate = day.value;
          this.showCalendar = false;
        }
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("div", null, [
      vue.withDirectives(vue.createElementVNode(
        "input",
        {
          type: "text",
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.selectedDate = $event),
          onClick: _cache[1] || (_cache[1] = ($event) => $data.showCalendar = !$data.showCalendar),
          placeholder: "点击选择日期"
        },
        null,
        512
        /* NEED_PATCH */
      ), [
        [vue.vModelText, $data.selectedDate]
      ]),
      $data.showCalendar ? (vue.openBlock(), vue.createElementBlock("div", {
        key: 0,
        class: "calendar"
      }, [
        vue.createElementVNode("div", { class: "header" }, [
          vue.createElementVNode("button", {
            onClick: _cache[2] || (_cache[2] = (...args) => $options.prevMonth && $options.prevMonth(...args))
          }, "<"),
          vue.createElementVNode(
            "span",
            null,
            vue.toDisplayString($options.currentMonth),
            1
            /* TEXT */
          ),
          vue.createElementVNode("button", {
            onClick: _cache[3] || (_cache[3] = (...args) => $options.nextMonth && $options.nextMonth(...args))
          }, ">")
        ]),
        vue.createElementVNode("table", null, [
          vue.createElementVNode("thead", null, [
            vue.createElementVNode("tr", null, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($data.daysOfWeek, (day) => {
                  return vue.openBlock(), vue.createElementBlock(
                    "th",
                    { key: day },
                    vue.toDisplayString(day),
                    1
                    /* TEXT */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])
          ]),
          vue.createElementVNode("tbody", null, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($options.calendar, (week, index) => {
                return vue.openBlock(), vue.createElementBlock("tr", { key: index }, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(week, (day) => {
                      return vue.openBlock(), vue.createElementBlock("td", {
                        key: day.value,
                        onClick: ($event) => $options.selectDate(day)
                      }, vue.toDisplayString(day.display), 9, ["onClick"]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ])
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesTestTest = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-727d09f0"], ["__file", "D:/软工实践/EmoSphere/pages/test/test.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/login/login", PagesLoginLogin);
  __definePage("pages/calendar/calendar", PagesCalendarCalendar);
  __definePage("pages/main/main", PagesMainMain);
  __definePage("pages/EmoRecord/EmoRecord", PagesEmoRecordEmoRecord);
  __definePage("pages/about/about", PagesAboutAbout);
  __definePage("pages/aboutme/aboutme", PagesAboutmeAboutme);
  __definePage("pages/myScreen/myScreen", PagesMyScreenMyScreen);
  __definePage("pages/relax/relax", PagesRelaxRelax);
  __definePage("pages/share/share", PagesShareShare);
  __definePage("pages/user/me", PagesUserMe);
  __definePage("pages/record/record", PagesRecordRecord);
  __definePage("pages/music/music", PagesMusicMusic);
  __definePage("pages/test/test", PagesTestTest);
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
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/软工实践/EmoSphere/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
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
