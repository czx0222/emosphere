# gscosmos-dialog
>GSCOSMOS·一款支持VUE3带动效的弹窗


## style类型
| 参数   | 类型 |     必填 |     说明 |
| :----- | :--: | -------: | :--: |
| width |  number  | 否 |  宽度(最终计算为%)  |
| height |  number  | 否 |  高度(最终计算为%)  |
| borderRadius |  string  | 否 |  圆角度  |


## Options 参数说明
| 参数   | 类型 |     必填 |     说明 |     默认值 |
| :----- | :--: | -------: | :--: | -------: |
| modelValue |  boolean  | 是 |  控制是否弹出弹窗  |  |
| duration |  number  | 否 |  弹窗 弹出/弹回 动画时间(毫秒)  | 300 |
| title |  string  | 否 |  弹窗的标题  |  |
| fromPoi |  string[]  | 否 |  弹窗最开始的位置  | ['0%','0%'] |
| title |  string  | 否 |  弹窗的标题  |  |
| backgroundColor |  string  | 否 |  弹窗的背景色  | #f5f5f5 |
| startStyle |  style  | 否 |  弹窗开始的样式  | {'width': 0, height: 0, borderRadius: '0px'} |
| endStyle |  style  | 否 |  弹窗最终的样式  | {'width': 80, height: 80, borderRadius: '8px'} |


## Events 回调

| 回调名称   | 说明 |     返回参数类型 |
| :----- | :--: | -------: | :--: | -------: |
| closed |  关闭弹窗时的回调函数  | NULL |


## 使用说明
```vue
<template>
	<view class="content">
		<gscosmos-dialog 
		v-model="dialogData.visiable" 
		:endStyle="dialogData.endStyle" 
		:fromPoi="dialogData.fromPoi" 
		:title="'添加旅程规划'" 
		@closed="closed">
			<view class="content">
				弹窗的内容
			</view>
		</gscosmos-dialog>
		
		<view @click="dialogData.visiable = true">
			打开弹窗
		</view>
	</view>
</template>

<script lang="ts" setup>
import { reactive } from "vue";

const dialogData = reactive({
	visiable: false,
	fromPoi: ['0','0'],
	endStyle: {
		height: 50
	}
})

const closed = () => {
	console.log('关闭弹窗后的回调函数');
}

</script>

```