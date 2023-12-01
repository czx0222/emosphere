<template>
	<view class="u-tabbar" @touchmove.stop.prevent="() => { }">
		<view id="navigatorContent" class="u-tabbar__content safe-area-inset-bottom" :style="{
			height: typeof contentHeight === 'number' ? (contentHeight + 'rpx') : contentHeight
		}">
			<view class="u-tabbar__content__item" :class="current === item.pagePath ? 'active' : 'default'"
				v-for="(item, index) in tabbarlist" :key="index" @tap.stop="switchTab(item.pagePath)">
				<image v-if="current === item.pagePath" :src="item.iconPath" class="tab-image actived" style=""></image>
				<image v-else :src="item.unactiveIconPath" class="tab-image" style=""></image>
				<view class="u-tabbar__content__item__text one-line">{{ item.text }}</view>
			</view>
		</view>
		<view v-if="showSlot" class="tabbar-slot safe-area-inset-bottom" :style="{
			background: slotColor,
			height: containerHeight + 'px'
		}"></view>
	</view>
</template>

<script>
	import {
		watchUniOn,
		addRelanchRoute,
		addSwitchRoute
	} from "./navUtil"
	export default {
		props: {
			showSlot: {
				type: Boolean,
				default: true,
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
				default: () => [{
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
				tabIndex: -1,

			}
		},
		created() {
			// 是否隐藏原生tabbar
			if (this.hideTabBar) uni.hideTabBar();
			watchUniOn("__routeChange__", path => {
				this.current = path
				this.$emit("change", path)
			})

			addRelanchRoute((e) => {
				this.preRoute(e.url);
			})

			addSwitchRoute((e) => {
				this.preRoute(e.url);
			})

			this.tabIndex = this.changeRoute();
			this.created = true
		},
		mounted() {
			const query = uni.createSelectorQuery().in(this);
			query.select('#navigatorContent').boundingClientRect(data => {
				if (data) {
					this.containerHeight = data.height
					uni.setStorage({
						key: 'navigatorContainerHeight',
						data: data.height
					})
				}

			}).exec();
		},
		methods: {
			preRoute(path) {
				if (this.created) {
					const f = this.tabbarlist.find(item => `/${item.pagePath}` === path)
					if (f) {
						uni.$emit("__routeChange__", f.pagePath)
					}
				}
			},
			changeRoute() {
				if (!this.created) {
					let pages = getCurrentPages() || []
					const f = this.tabbarlist.find(item => item.pagePath === (pages[pages.length - 1] ? pages[
						pages.length - 1].route : 'none'))
					if (f) {
						uni.$emit("__routeChange__", f.pagePath)
						return f
					}
				}
			},
			// 切换tab
			switchTab(pagePath) {
				let pages = getCurrentPages()
				if(pages[pages.length - 1].route.indexOf(pagePath) > -1) return
				uni.navigateTo({
					url: '/' + pagePath
				})
			},
		}
	}
</script>

<style scoped>
	.u-tabbar .tabbar-slot {
		box-sizing: content-box;
	}

	.u-tabbar__content {
		align-items: center;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 998;
		background: #FFFFFF;
		box-sizing: content-box;
		display: flex;
		align-items: center;
		box-shadow: 0px -3px 5px rgba(0, 0, 0, 0.1);
	}

	.u-tabbar__content__item:not(:first-child) {
		margin-left: 20rpx;
	}

	.u-tabbar__content__item {
		flex: 1;
		width: 200rpx;
		padding: 12rpx 0;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.u-tabbar__content__item .tab-image {
		width: 50rpx;
		height: 50rpx;
		color: #CFCFCF;
	}

	.u-tabbar__content__item .tab-image.actived {
		transform: translateY(-30%) scale(1.6);
		animation: shakeIn 0.3s ease-in-out;
		background: #fff;
		border-radius: 50%;

		box-shadow: 0px -3px 5px rgba(0, 0, 0, 0.1);
	}

	@keyframes shakeIn {
		0% {
			opacity: 0;
			transform: translateY(20px) scale(0.9);
		}

		100% {
			opacity: 1;
			transform: translateY(-30%) scale(1.6);
		}
	}

	.u-tabbar__content__item__text {
		font-weight: 400;
		font-size: 22rpx;
		line-height: 40rpx;
		color: #222;
	}
</style>