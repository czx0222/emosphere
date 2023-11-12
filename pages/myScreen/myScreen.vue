<template>
	<view class="my-page">
		<view class="header">
			<view class="head-left" @click="goBack">
					<img src="/static/images/fanhui.png" />
					<text>返回</text>

				
				
			</view>
		</view>
		<view class="form">

			<view class="role">
				<img src="/static/images/logo.png" alt="">
			</view>

			<view class="info">
				<text class="user-name">zzz</text>
				<text class="user-info">♂ 30岁</text>
				<text class="user-id">UserID:1021081</text>
			</view>
		</view>
		<!-- 个人资料 -->
		<view class="content">
			<view class="menu-item" @click="goToProfile">
				<text class="menu-text">个人资料</text>
				<img src="/static/images/heijiantou.png" alt="" />
			</view>

			<!-- 收藏内容 -->
			<view class="menu-item" @click="goToFavorites">
				<text class="menu-text">收藏内容</text>
				<img src="/static/images/heijiantou.png" alt="" />
			</view>

			<!-- 关于 -->
			<view class="menu-item" @click="goToAbout">
				<text class="menu-text">关于EmoSphere</text>
				<img src="/static/images/heijiantou.png" alt="" />
			</view>
		</view>


		<button class="logout-button" @click="logout">退出登录</button>
	</view>
</template>

<script>
	export default {
		methods: {
			goBack() {
				// 跳转到关于页面的逻辑
				this.$router.push( '/pages/main/main' )
			},
			goToProfile() {
				// 跳转到个人资料页面的逻辑
				console.log("aboutme")
				this.$router.push('/pages/aboutMe/aboutMe')
			},
			goToFavorites() {
				// 跳转到收藏内容页面的逻辑
				console.log("like")
			},
			goToAbout() {
				// 跳转到关于页面的逻辑
				this.$router.push('/pages/about/about')
			},
			logout() {
				if (confirm("确定要退出登录吗？")) {

					console.log("logout");
					// 跳转到登录界面
					this.$router.push('/pages/login/login'); // 假设登录界面的路由路径为'/login'
				} else {
					// 否，不做任何操作
				}
			},
		},
	}
</script>

<style>
	.my-page {
		display: flex;
		flex-direction: column;
		background-image: url('/static/images/back2.png');
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		width: 100%;
		height: 100vh;
		align-items: center;
	}

	.logout-button {
		background-color: #78a397;
		color: #000000;
		border-radius: 20px;
		cursor: pointer;
		position: relative;
		top: 12rem;
		width: 40%;
	}

	.header {
		display: flex;
		justify-content: space-between;
		width: 90%;
		position: relative;
		top: 1rem;

	}

	.header text {
		margin-left: 10px;
		color: #ffffff;
		font-size: 1.3rem;
		font-weight: 550;

	}

	.head-left {
		display: flex;
		align-items: center;
		float: left;
	}

	.form {
		width: 80%;
		top: 6rem;
		min-height: 200rpx;
		position: relative;
		border-radius: 60rpx;
		padding: 10px;
		border: 2px solid rgba(255, 255, 255, 0.3);
		box-shadow: 0 0 40rpx 10rpx rgba(0, 0, 0, 0.08);
	}

	.role {
		width: 300rpx;
		height: 300rpx;
		border-radius: 50%;
		position: absolute;
		left: 55%;
		transform: translateX(-50%);
		top: -150rpx;
	}

	.role img {
		width: 80%;
		height: 80%;
		object-fit: cover;
		border-radius: 50%;
		box-shadow: 0 0 40rpx 10rpx rgba(0, 0, 0, 0.0.8);
	}

	.info {
		margin: 60rpx auto 60rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 90%;

	}

	.user-name {
		font-size: 3rem;
		margin-bottom: 10px;
		text-align: center;
		font-weight: 700;
	}

	.user-info {
		text-align: center;
		font-weight: 700;
	}

	.user-id {
		margin-top: 20px;
		margin-left: 50%;
		font-weight: 700;
	}

	.content {
		position: relative;
		top: 7rem;
		width: 90%;
	}

	.menu-item {
		display: flex;
		align-items: center;
		margin-top: 20px;
		border-radius: 20px;
		height: 60px;
		background-color: rgba(255, 255, 255, 0.8);
		justify-content: space-between;
		padding-right: 10px;
	}

	.menu-item img {
		width: 40px;
		height: 40px;
		margin-right: 20px;

	}

	.menu-text {
		font-size: 20px;
		margin-left: 10px;
		font-weight: bold;
	}

	.menu-icon {
		width: 24px;
		height: 24px;
		margin-left: atuo;

	}
</style>