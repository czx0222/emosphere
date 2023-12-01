let watched = false
let functions = []
export function watchUniOn (name, func) {
 functions.push(func)
 if (!watched) {
  watched = true
  uni.$on(name, function (index) {
   functions.forEach(function (func) {
    if (typeof func === 'function') {
     func(index)
    }
   })
  })
 }
}


let reLaunchInvokeFunctions = [], reLaunchCompleteFunctions = [], reLaunchinter = false
let switchTabInvokeFunctions = [], switchTabCompleteFunctions = [], switchTabinter = false

export function addRelanchRoute (func, func1) {
 reLaunchInvokeFunctions.push(func)
 reLaunchCompleteFunctions.push(func1)
 if (!reLaunchinter) {
  reLaunchinter = true
  uni.addInterceptor('reLaunch', {//监听关闭本页面跳转
   invoke (e) {
    reLaunchInvokeFunctions.forEach(function (func) {
     if (typeof func === 'function') {
      func(e)
     }
    })
   },
   complete () {
    reLaunchCompleteFunctions.forEach(function (func) {
     if (typeof func === 'function') {
      func()
     }
    })
   }
  })
 }

}

export function addSwitchRoute (func, func1) {
 switchTabInvokeFunctions.push(func)
 switchTabCompleteFunctions.push(func1)
 if (!switchTabinter) {
  switchTabinter = true
  uni.addInterceptor('switchTab', {//监听关闭本页面跳转
   invoke (e) {
    switchTabInvokeFunctions.forEach(function (func) {
     if (typeof func === 'function') {
      func(e)
     }
    })
   },
   complete () {
    switchTabCompleteFunctions.forEach(function (func) {
     if (typeof func === 'function') {
      func()
     }
    })
   }
  })
 }

}