<template>
	<view class="container">
		<view class="tui-content-box">
			<view class="tui-arrow" @click="getback" style="margin-left:10rpx"><tui-icon name="arrowleft" :size="35" color="#488C88"  bold="true"></tui-icon></view>
			<view class="tui-notice-box" @click="goshare" >
				<tui-icon name="evaluate" size="35" color="#488C88" bold="true"></tui-icon>
			</view>
		</view>
		
		<view>
			<tui-tabs :tabs="list1" :currentTab="currentTab" @change="change" sliderBgColor="#488C88" color="#000000" selectedColor="#488C88" scale="1.5" height="150" size="30"></tui-tabs>
		</view>
		
		<view class="gray-line"></view>
		
		<interest v-if="currentTab == 0"></interest>
		<tuijian v-if="currentTab == 1"></tuijian>

		
	</view>
</template>

<script setup>
	import {useRouter} from 'vue-router';
	import store from '@/store';
	import {ref} from 'vue';
	const router = useRouter();
	const goshare = () => {
		router.push('/pages/share/share');
	}
	const getback = () => {
		router.push('/pages/main/main');
	}
	const list1 = ref([
		{ name: '最新' },
		{ name: '推荐' }
	]);
	let currentTab = ref(0);
	const change = (e) =>{
		currentTab.value = e.index;
	};
	let postList = ref("")
	const loadPostStatus = ref('loadmore')
	// export default {
	// 	data() {
	// 		return {
	// 			list1: [{
	// 				name: '最新',
	// 			}, {
	// 				name: '推荐',
	// 			}],
	// 			currentTab:0,
	// 		}
	// 	},
	// 	methods: {
	// 		change(e) {
	// 			this.currentTab = e.index
	// 		}
	// 	}
	// }
</script>

<style lang="scss" scoped>
	
	.container {
		padding-bottom: 120rpx;
		box-sizing: border-box;
	}
	
	.header {
		padding: 80rpx 90rpx 60rpx 90rpx;
		box-sizing: border-box;
	}
	
	.title {
		font-size: 34rpx;
		color: #333;
		font-weight: 500;
	}
	
	.sub-title {
		font-size: 24rpx;
		color: #7a7a7a;
		padding-top: 18rpx;
	}
	.tui-title {
		width: 100%;
		padding: 50rpx 30rpx 30rpx;
		box-sizing: border-box;
		font-weight: bold;
	}
	.tui-header-bg {
		width: 100%;
		margin: 0;
	}
	
	.tui-header-img {
		width: 100%;
		height: 440rpx;
		display: block;
	}
	
	.tui-header-icon {
		width: 100%;
		position: fixed;
		top: 0;
		padding: 0 12rpx;
		display: flex;
		align-items: center;
		height: 32px;
		transform: translateZ(0);
		z-index: 99999;
		box-sizing: border-box;
	}
	
	.tui-content-box {
		width: 100%;
		height: 44px;
		padding: 0 30rpx;
		display: flex;
		align-items: center;
		background-color:#fff;
	}
	
	.tui-arrow {
		width: 30px;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		margin-top:10rpx;
	}
	
	.tui-notice-box {
		width: 30px;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		margin-left:550rpx;
		margin-top:10rpx;
	}
	
	.tui-bg-white {
		background-color: #ffffff !important;
	}
	.tui-search-text {
		padding-left: 10rpx;
	}
	
	
	.search-width {
		width: 250px;
	}

	.add-icon {
		margin-right: 30%;
	}

	.tabs-wrap {
		position: sticky;
		z-index: 999;
	}

	.wrap {
		padding: 0 40rpx;
	}

	// 用户列表
	.user-item {
		margin: 30rpx;
		padding: 20rpx;
		display: flex;
		border-bottom: 1px solid #f5f5f5;

		.user-index-hot {
			margin-right: 20rpx;
			color: #fff;
			background-image: linear-gradient(#e64340, #ffaac3);
			width: 55rpx;
			height: 55rpx;
			border-radius: 50%;
			text-align: center;
			line-height: 55rpx;
		}

		.user-index {
			margin-right: 20rpx;
			color: #aaaaff;
			font-weight: bold;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.avatar {
			width: 100rpx;
			height: 100rpx;
			border-radius: 10rpx;
			margin-right: 20rpx;
		}

		.right {
			flex: 1;

			.username {
				font-weight: bold;
			}

			.tag-wrap {
				font-size: 20rpx;

				.tag {
					display: inline-block;
					padding: 5rpx 20rpx;
					border-radius: 10rpx;
					margin-right: 20rpx;
					margin-bottom: 20rpx;
					background-color: #7da9bd;

					&:nth-child(2n) {
						background-color: #ccb3ff;
					}

				}
			}
		}

		.no-info {
			margin: 30rpx 0;
		}

		.u-page {
			padding-bottom: 500px;
		}
	}
	
	.gray-line {
	  width: 100%;
	  height: 2px;
	  background-color: #ccc; /* 灰色 */
	}
</style>