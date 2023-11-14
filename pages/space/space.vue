<template>
	<view>
		<view>
			<u-navbar :is-back="false" title="" height=65 leftIconSize=25 leftIconColor="#000000">
				<view class="slot-wrap" slot="center">
					<u-search class="search-width" placeholder="请输入" v-model="keyword" :show-action="false"
						@clickIcon="clickIcon" height=35 search-icon-color="#488C88" search-icon-size=30>
					</u-search>
				</view>
				<view class="slot-wrap" slot="right">
					<u-icon name="edit-pen" size=35 color="#488C88">
					</u-icon>
				</view>
			</u-navbar>
			<u-gap height="75" bgColor="#fff"></u-gap>
			<u-sticky bgColor="#fff">
				<u-tabs :list="list1" lineColor="#488C88" :activeStyle="{
						color: '#000000',
						fontWeight: 'bold',
						transform: 'scale(1.5)'
					}" :inactiveStyle="{
						color: '#000000',
						transform: 'scale(1.4)'
					}" itemStyle="padding-left: 20px; padding-right: 20px; height: 50px" lineWidth=50>
				</u-tabs>
			</u-sticky>
			<u-gap height="40" bgColor="#fff"></u-gap>
		</view>
		<view v-show="pageCurrent == 0">

			<post-list :list="postList" :loadStatus="loadPostStatus"></post-list>
			<u-gap height="100" bgColor="#fff"></u-gap>
		</view>


	</view>
</template>

<script>
	import postList from '@/components/post-list/post-list.vue';
	import addPostTag from '@/components/add-post-tag/add-post-tag.vue';
	export default {
		data() {
			return {
				list1: [{
					name: '最新',
				}, {
					name: '推荐',
				}],
				pageCurrent: 0,
				current: 0,
				classList: [{
					cateId: 0,
					cateName: '推荐'
				}],
				swiperList: [],
				postList: [],
				loadPostStatus: 'loadmore',
				classId: 0,
				page: 1,
				userList: [],
				loadStatus: 'nomore'
			}
		},
		methods: {
			clickIcon() {
				uni.$u.toast('点击了左侧图标')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-width {
		width: 250px;
	}

	.slot-wrap {
		@include flex;
		align-items: center;
		justify-content: space-between;
		border-width: 0.5px;
		border-radius: 100px;
		border-color: $u-border-color;
		padding: 3px 7px;
		opacity: 0.8;
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
</style>