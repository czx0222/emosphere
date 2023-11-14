<template>
	<view class="content">
		<image src="/static/back.png" class="tui-header-img"></image>
		
		<view class="main">
			<view class="top">
				<view class="user">
					<view class="user-left">
						<image src="/static/xiaodiao.png" class="avatar" mode="aspectFill" />
						<view class="user-content">
							<h3>{{ userInfo.username }}</h3>
							<view class="user-id f">{{ userInfo.id }}</view>
							<view class="descrpition f">{{ userInfo.description }} </view>
						</view>
					</view>
					<view class="user-right">
						
						<tui-button type="green" shape="circle" @click="editUserInfo" height="60rpx" width="140rpx"
							:size="28">编辑</tui-button>
					</view>
				</view>
				
				<view class="info">
					<view class="up-down">
						<view class="up-number">
							{{ userInfo.followCount }}
						</view>
						<view class="down-zi">
							关注 
						</view>
					</view>
					<view class="up-down">
						<view class="up-number">
							{{ userInfo.fanCount }}
						</view>
						<view class="down-zi">
							粉丝 
						</view>
					</view>
					<view class="up-down">
						<view class="up-number">
							{{ userInfo.like }}
						</view>
						<view class="down-zi">
							赞 
						</view>
					</view>
				</view>
				
				<view class="tabs-style">
					<tui-tabs :tabs="tabs" :currentTab="currentTab" @change="change" sliderBgColor="#488C88"
						selectedColor="#488C88" itemWidth="50%" size=35 scale=1.1></tui-tabs>
				</view>
			</view>
		</view>
		
		<view class="zhuti">
			<view v-if="userInfo">
				<Trend v-if="currentTab == 0" :uid='uid' @cancelUp='cancelUp' :seed='seed'> </Trend>
				<Album v-if="currentTab == 1" :seed='seed' :uid='uid'></Album>
				<Collection v-if="currentTab == 2" :uid='uid' :seed='seed'></Collection>
			</view>
		</view>
		
		<tui-modal :show="show" @click="confirm" @cancel="hide" content="取消上传" :button="radio" width="50%"
			padding="15rpx 40rpx" :fadeIn='true'></tui-modal>
	</view>
	
	
</template>

<script>
	
	export default {
	
		data() {
			return {
				top:10,
				current: 0,
				currentTab: 0,
				tabs: [{
					name: "我的"
				}, {
					name: "赞过"
				},
				],
				userInfo: {
					avatar: "/static/xiaodiao.png",
					username: "Xiaodiao",
					id:"The sun will shion on us again.",
					followCount: 25,
					fanCount: 25,
					like: 25
				},
				seed: 0,
				uid: '',
				show: false,
				radio: [{
						text: '取消',
						type: 'white',
					},
					{
						text: '确定',
						type: 'red',
					}
				],
				mid: '',
				screenHeight: 0,
				top_show: false,
				vHeight: 0,
			}
		
			},
		}
</script>

<style lang="scss" scoped>
	@import url(./me.css);
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
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}
	.tui-avatar-box {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid #eaeef1;
		flex-shrink: 0;
	}
	.tui-avatar {
		width: 28px;
		height: 28px;
		border-radius: 50%;
	}
	
	.tui-search-box {
		width: 100%;
		height: 32px;
		margin: 0 28rpx;
		border-radius: 18px;
		font-size: 14px;
		background-color: #f1f1f1;
		padding: 0 12px;
		box-sizing: border-box;
		color: #bfbfbf;
		display: flex;
		align-items: center;
	}
	
	.tui-bg-white {
		background-color: #ffffff !important;
	}
	.tui-search-text {
		padding-left: 10rpx;
	}
	
	.tui-notice-box {
		position: relative;
		flex-shrink: 0;
		font-size: 44rpx;
		color: #fff;
	}
</style>
