# 自定义底部导航栏

## 安装方式

1. 下载并导入导入到项目components文件夹下,hbuilderx可一键导入

2. 全局或局部注册组件，推荐全局注册，因为该组件需要在每个tabbar页面下导入

局部安装方式如下：
```js
import renCustomerNavigator from '@/components/ren-customer-navigator/ren-customer-navigator.vue'
components: {
	renCustomerNavigator
}
```

全局安装方式如下：
```js
import renCustomerNavigator from '@/components/ren-customer-navigator/ren-customer-navigator.vue'

// vue2
import Vue from 'vue'
Vue.component('ren-customer-navigator', renCustomerNavigator)

// vue3
app.component('ren-customer-navigator', renCustomerNavigator)
```

3. 在tabbar页面下导入

```html
<ren-customer-navigator></ren-customer-navigator>
```

## 功能与参数

1. 底部添加占位view，可以防止遮挡，相关参数是showSlot(默认true),slotColor背景色(默认undefined),默认会添加一个无背景色的view

由于底部导航定位方式是采取fixed方案，脱离了文档流，所以正常文档流的内容会被底部导航栏遮挡，所以需要设置padding-bottom或者使用view来占据底部空间的方式来防止遮挡

2. contentHeight参数，支持设置底部导航栏高度，想要自己设置高度就使用这个参数

3. hideTabBar(默认true),默认隐藏原生tabbar，既然是自定义导航栏，当然需要隐藏原生tabbar

4. tabbarlist, tabbar列表，用于配置底部导航栏的标题，图标，跳转路径

5. 本地存储storage提供navigatorContainerHeight参数，表示底部导航栏的实际高度，以px为单位，和组件data中containerHeight相同

## 注意

- 开发时需要注意，本底部导航栏监听了页面跳转switchTab,navigateTo,navigateBack,redirectTo,relanchTo这几个函数触发时会触发底部导航栏中的事件

- 注册了uni.$on 自定义事件 __routeChange__
