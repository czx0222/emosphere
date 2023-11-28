<template>
	<view class="my-page">
		<view class="box" style="width: 100%;height: 5%;"></view>
		<view class="header" @click="fan">
				<image src="/static/images/fan.png"></image>
			<span>个人资料</span>
		</view>
		<text class="edit" @click="edit">编辑资料</text>
		<view class="content">
			<view class="menu-item1">
				<!-- <image class="user-avatar" src="/static/uni.png" /> -->
				<image class="user-avatar" :src="userAvatar"></image>
				<text class="user-avatar-text" >头像</text>
			</view>

			<view class="menu-item">
				<text class="menu-text">用户昵称</text>
				<text class="menu-text1">{{username}}</text>
				<image src="/static/images/yuanjiantou.png" alt="" ></image>
			</view>

			<view class="menu-item">
				<text class="menu-text">性别</text>
				<text class="menu-text1">{{usergender}} </text>
				<image src="/static/images/yuanjiantou.png" alt="" ></image>
			</view>

			<!-- 个人资料 -->
			<view class="menu-item" @click="goToProfile">
				<text class="menu-text">常驻地</text>
				<text class="menu-text1">{{userstatus}}</text>
				<image src="/static/images/yuanjiantou.png" alt="" ></image>
			</view>

			<!-- 个人资料 -->
			<view class="menu-item" @click="goToProfile">
				<text class="menu-text">生日</text>
				<text class="menu-text1">{{userbirthday}}</text>
				<image src="/static/images/yuanjiantou.png" mode=""></image>
			</view>


			<!-- 个人资料 -->
			<view class="menu-item" @click="goToProfile">
				<text class="menu-text">二维码</text>
				<text class="menu-text1 look">点击查看</text>
				<image src="/static/images/yuanjiantou.png" mode=""></image>
			</view>
		</view>

	</view>
</template>

<script setup>
	import {
		ref,onMounted
	} from 'vue';
	import store from '@/store';
	import { useRouter } from 'uni-mini-router'
	let router = useRouter()
	let username = ref('');
	let userbirthday = ref('');
	let usergender = ref('');
	let userstatus = ref('');
	let userAvatar = ref('');
	
	
	onMounted(()=>{
		username.value = store.state.username
		userbirthday.value = store.state.userbirthday
		usergender.value = store.state.usergender
		userstatus.value = store.state.userstatus
		userAvatar.value = store.state.ImagePath
		
	})
	
	
	const edit = () => {
			router.push('/pages/set/set')
		}
	const fan = () =>{
		router.replace('/pages/myScreen/myScreen')
	}
</script>

<style lang="scss">
	.header {
		display: flex;
		align-items: center;
		position: relative;
		width: 100%;
		min-height: 3rem;
		background-color: rgba(255, 255, 255, 0.3);
		padding-left: 28px;
	}

	.header image {
		width: 25px;
		height: 25px;
		margin-right: 90px;
	}

	.header span {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);

		font-weight: bold;
		font-size: 1.5rem;
	}

	.my-page {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-image: url('/static/images/back2.png');
		background-repeat: no-repeat;
		height: 100vh;
		width: 100%;
	}

	.edit {
		position: relative;
		left: -8rem;
		top: 1rem;
		color: #ffffff;
		font-size: 1rem;
		font-weight: bold;

	}

	.content {
		position: relative;
		top: 3rem;
		width: 100%;
	}

	.menu-item1 {
		display: flex;
		align-items: center;
		cursor: pointer;
		border-top: 1px solid #ffffff;
		/* 只显示上边框 */
		border-bottom: 1px solid #ffffff;
		padding: 15px;
	}

	.user-avatar {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		background-image: url('static/images/logo.png');
		background-size: cover;
	}

	.user-avatar-text {
		margin-left: 15px;
		/* 调整文字与图片之间的间距 */
		font-size: 15px;
		color: #7d8378;
		font-weight: 700;
	}

	.menu-item {
		display: flex;
		align-items: center;
		padding: 10px;
		border-top: 1px solid #ffffff;
		/* 只显示上边框 */
		border-bottom: 1px solid #ffffff;
		justify-content: space-between;
	}

	.menu-item image {
		width: 50px;
		height: 50px;
		margin-right: 20px;
	}

	.menu-text {
		font-size: 15px;
		padding-left: 10px;
		color: #4c5049;
		font-weight: 700;

	}

	.menu-text1 {
		position: absolute;
		margin-left: 80px;
		font-size: 17px;
		display: flex;
		font-weight: bold;
		/* 让字体加粗 */

	}

	.look {
		font-size: 12px;
		color: #7d8378;

	}
</style>