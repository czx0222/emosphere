<template>
		<view class="dialog" :style="{
			width: modelValue ? getEndStyle.width + '%' : getStartStyle.width + '%',
			height: modelValue ? 'calc(' + getEndStyle.height + '% - var(--status-bar-height))'  : getStartStyle.height + '%', 
			borderRadius: modelValue ? getEndStyle.borderRadius : getStartStyle.borderRadius,
			top: modelValue ? 'calc(' + getToPoi[0] + ' + var(--status-bar-height))' : fromPoi[0], 
			left: modelValue ? getToPoi[1] : fromPoi[1],
			opacity: modelValue ? 1 : 0,
			backgroundColor: backgroundColor,
			transitionDuration: duration + 'ms'
		}">
			<view class="content" v-show="modelValue">
				<view class="title">
					<h3>{{ title }}</h3>
					<span class="close" @click.stop="close()">×</span>
				</view>
				<slot></slot>
			</view>
		</view>
</template>

<script>
export default {
	data() {
		return {
			
		}
	},
	props:{
		modelValue:{
			type: Boolean,
			require: true,
		},
		title:{
			type: String,
			require: false,
		},
		duration:{
			type: Number,
			require: false,
			default: 300
		},
		fromPoi:{
			type: Array,
			require: false,
			default: ['0%','0%']
		},
		backgroundColor:{
			type: String,
			require: false,
			default: '#f5f5f5'
		},
		startStyle:{
			type: Object,
			require: false,
		},
		endStyle:{
			type: Object,
			require: false,
		}
	},
	onLoad() {
		
	},
	methods: {
		close(){
			this.$emit('closed');
			this.$emit('update:modelValue', false);
		}
	},
	computed:{
		getToPoi:function(){
			return [(100 - this.getEndStyle.height) / 2 + '%', (100 - this.getEndStyle.width) / 2 + '%']
		},
		getEndStyle:function(){
			return Object.assign({
				width: 80,
				height: 80,
				borderRadius: '8px'
			}, this.endStyle)
		},
		getStartStyle:function(){
			return Object.assign({
				width: 0,
				height: 0,
				borderRadius: '0px'
			}, this.startStyle)
		}
	},
	watch:{
		modelValue(){
			console.log(this.modelValue);
		}
	}
}	
</script>






<style scoped>
.dialog{
	position: absolute;
	z-index: 999;
	overflow: hidden;
	transition-timing-function: cubic-bezier(0.69 ,0.15, 0.52, 1.04);
	box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 5px 0px, rgba(0, 0, 0, 0.5) 0px 0px 1px 0px;
	padding: 16rpx 32rpx;
	box-sizing: border-box;
	overflow: scroll;
	height: 100px;
}

.title{
	display: flex;
	position: relative;
	justify-content: space-between;
	align-items: center;
	padding-bottom: 32rpx;
	
}

.title > h2{
	letter-spacing: 4rpx;
	color: #333;
	position: relative;
}
.title > .close{
	color: #333;
	font-size: 64rpx;
}

.mask{
	padding-top: var(--status-bar-height);
	position: absolute;
	top: 0;
	width: 100%;
	height: 100%;
	background: #00000099;
	pointer-events: none;
	opacity: 0;
	transition: .3s ease-in-out;
}
.mask.show{
	pointer-events: all;
	opacity: 1;
}
</style>