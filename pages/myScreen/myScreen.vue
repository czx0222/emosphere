<template>
	<view class="my-page">
		<view class="box" style="width: 100%;height: 5%;"></view>
		<view class="header">
			<view class="head-left" @click="goBack">
				<image src="/static/images/fanhui.png"></image>
				<text>返回</text>
			</view>
		</view>
		<view class="form">

			<view class="role">
				<image class="user-avatar" :src="userAvatar"></image>
			</view>
			<view class="info">
				<text class="user-name">{{username}}</text>
				<text class="user-info">{{age}}</text>
				<text class="user-id">UserID:{{ userid }}</text>
			</view>
		</view>
		<!-- 个人资料 -->
		<view class="content">
			<view class="menu-item" @click="goToProfile">
				<text class="menu-text">个人资料</text>
				<image src="/static/images/heijiantou.png" alt=""></image>
			</view>

			<!-- 收藏内容 -->
			<view class="menu-item" @click="goToFavorites">
				<text class="menu-text">收藏内容</text>
				<image src="/static/images/heijiantou.png" alt=""></image>
			</view>

			<!-- 关于 -->
			<view class="menu-item" @click="goToAbout">
				<text class="menu-text">关于EmoSphere</text>
				<image src="/static/images/heijiantou.png" alt=""></image>
			</view>
		</view>

		<view class="logout-button">
			<button  @click="showConfirmDialog">退出登录</button>

		</view>
		    <confirm-dialog
		      v-if="isConfirmDialogVisible"
		      :message="confirmMessage"
		      @onConfirm="handleConfirm"
		      @onCancel="handleCancel"
		    />
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import store from '@/store';
	import {
		useRouter
	} from 'uni-mini-router'
	import ConfirmDialog from "@/components/ConfirmDialog/ConfirmDialog.vue";
	let router = useRouter();
	const calculateAge = (birthdate) => {
		const today = new Date();
		const birthDate = new Date(birthdate);
		let age = today.getFullYear() - birthDate.getFullYear();
		return age;
	};

	const userbirthday = ref(store.getters.getUserBirthday);
	const age = ref(calculateAge(userbirthday.value));
	const username = ref(store.getters.getUsername);
	const userid = ref(store.getters.getUserId);
	const userAvatar = ref(store.state.ImagePath);
	
	const isConfirmDialogVisible = ref(false);
	const confirmMessage = ref("确定要退出登录吗？");


	const goBack = () => {
		router.replace('/pages/main/main');
	};

	const goToProfile = () => {
		router.push('/pages/aboutme/aboutme');
	};

	const goToFavorites = () => {
		console.log('like');
	};

	const goToAbout = () => {
		router.push('/pages/about/about');
	};

	const showConfirmDialog = () => {
	  isConfirmDialogVisible.value = true;
	};
	
	const handleConfirm = () => {
	  isConfirmDialogVisible.value = false;
	  store.commit("clearUserData");
	  router.push("/pages/login/login");
	};
	
	const handleCancel = () => {
	  isConfirmDialogVisible.value = false;
	};
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
		height: 110vh;
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

	.head-left image {
		width: 40px;
		height: 40px;
	}

	.form {
		border: 5px black solid;
		width: 80%;
		top: 7rem;
		min-height: 190rpx;
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

	.role image {
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
		font-size: 1.5rem;
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

	.menu-item image {
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