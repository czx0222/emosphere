<template>
	<view class="my-page">
		<view class="header">
			<router-link :to="{ path: '/pages/myScreen/myScreen' }">
				<img src="/static/images/fan.png">
			</router-link>
			<span>个人资料</span>
		</view>
		<text class="edit" @click="edit">编辑资料</text>
		<view class="content">
			<view class="menu-item1">
				<!-- <image class="user-avatar" src="/static/uni.png" /> -->
				<image class="user-avatar" />
				<text class="user-avatar-text" @click="uploadImage">修改头像</text>
			</view>

			<view class="menu-item">
				<text class="menu-text">用户昵称</text>
				<text class="menu-text1">{{username}}</text>
				<img src="/static/images/yuanjiantou.png" alt="" />
			</view>

			<view class="menu-item">
				<text class="menu-text">性别</text>
				<text class="menu-text1">♂ 男 </text>
				<img src="/static/images/yuanjiantou.png" alt="" />
			</view>

			<!-- 个人资料 -->
			<view class="menu-item" @click="goToProfile">
				<text class="menu-text">常驻地</text>
				<text class="menu-text1">福州</text>
				<img src="/static/images/yuanjiantou.png" alt="" />
			</view>

			<!-- 个人资料 -->
			<view class="menu-item" @click="goToProfile">
				<text class="menu-text">生日</text>
				<text class="menu-text1">1998-2-12</text>
				<img src="/static/images/yuanjiantou.png" alt="" />
			</view>


			<!-- 个人资料 -->
			<view class="menu-item" @click="goToProfile">
				<text class="menu-text">二维码</text>
				<text class="menu-text1 look">点击查看</text>
				<img src="/static/images/yuanjiantou.png" alt="" />
			</view>
		</view>

	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		useRouter
	} from 'vue-router';
	import store from '@/store';

	const router = useRouter();
	const username = ref(store.getters.getUsername);

	const goToProfile = () => {
		
	};

	// const uploadImage = () => {
	// 	uni.chooseImage({
	// 		count: 1,
	// 		sizeType: ['compressed'],
	// 		sourceType: ['album', 'camera'],
	// 		success: (res) => {
	// 			const tempFilePaths = res.tempFilePaths;
	// 			const filePath = tempFilePaths[0];
	// 			uploadImage(filePath);
	// 		},
	// 	});
	// };
	// const uploadImage = (filePath) => {
	// 	uni.uploadFile({
	// 		// url: 'https://yourserver.com/upload', // 替换为你的服务器上传接口地址
	// 		filePath: filePath,
	// 		name: 'file',
	// 		formData: {
	// 			'user': 'test',
	// 		},
	// 		success: (uploadRes) => {
	// 			console.log('上传成功', uploadRes.data);
	// 			// 在这里处理上传成功后的逻辑，比如更新用户头像信息等
	// 		},
	// 		fail: (err) => {
	// 			console.log('上传失败', err);
	// 			// 在这里处理上传失败后的逻辑
	// 		},
	// 	});
	// };
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

	.header img {
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
		position: absolute;
		left: 20px;
		top: 3.5rem;
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

	.menu-item img {
		width: 50px;
		height: 50px;
		margin-right: 20px;
	}

	.menu-text {
		font-size: 15px;
		padding-left: 20px;
		/* 添加左边距 */
		color: #4c5049;
		font-weight: 700;

	}

	.menu-text1 {
		position: absolute;
		margin-left: 110px;
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