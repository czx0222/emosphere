<template>
	<view class="backarea">
		<view class="box" style="width: 100%;height: 5%;"></view>
		<view class="header" @click="tiao">
			<view class="head-left">
				<image src="/static/images/fanhui.png"></image>
				<text>返回</text>
			</view>
		</view>
		<view class="info">
			<div class="circle">
				<view class="sc2" v-for="(item, index) in imageList" :key="index">
					<image class="del" @click="del(index)" src="/static/images/shanchu.png" mode=""></image>
					<image class="image3" :src="item" mode=""></image>
				</view>
				<view class="sc2" v-if="imageList.length < 1" @click="upload">
					<image class="sc3" src="/static/images/touxiang.png" mode=""></image>
				</view>
			</div>
			<view class="info-item">
				<text class="label">昵称:</text>
				<input class="left" type="text" placeholder="请填写" v-model="usernameInput" />
			</view>
			<view class="info-item">
				<text class="label">性别:</text>
				<input class="left" type="text" placeholder="请填写" v-model="selectedGender" />


			</view>
			<view class="info-item">
				<text class="label">生日:</text>
				<uni-datetime-picker class="left" type="date" :clear-icon="true" v-model="single" />
			</view>
			<view class="info-item">
				<text class="label">常住地:</text>
				<input class="left" type="text" placeholder="请填写" v-model="statusInput" />
			</view>
			<view class="login-card-loginIn-btn" @click="tomain">
				设置完成
			</view>
		</view>
	</view>
</template>

<script>
	import { ref } from 'vue';
	import { useRouter } from 'uni-mini-router'
	import { getCurrentInstance } from 'vue'
	import store from '@/store';
	export default {
		setup() {
			let router = useRouter()
			const single = ref('');
			let usernameInput = ref('');
			let statusInput = ref('');
			let selectedGender = ref('');
			let imageList = ref([]);
			const upload = () => {
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					loop: true,
					success: (res) => {
						console.log(res);
						if (res.tempFilePaths.length !== 0) {
							imageList.value.push(res.tempFilePaths[0]);
							store.commit('setPath', res.tempFilePaths[0]);
							var tempFilePaths = res.tempFilePaths;
							console.log(tempFilePaths[0])
							// uni.uploadFile({
							//   url: 'http://douzhuoqianshouba.xieenguoji.com/api/ajax/upload',
							//   filePath: tempFilePaths[0],
							//   name: 'file',
							//   success: (uploadFileRes) => {},
							//   fail: (err) => {
							//     console.log(err);
							//   },
							// });
						}
					},
				});
			};
			const tiao = () => {
					router.back()
			}
			const del = (index) => {
				imageList.value.splice(index, 1);
				console.log(imageList);
			};
			const tomain = () => {

				let userName = usernameInput.value;
				let userBirthday = single.value;
				let userGender = selectedGender.value;
				let userStatus = statusInput.value;
				let userid = store.state.userId
				let imagepath = store.state.ImagePath
				console.log(imagepath)
				uni.request({
					url:'http://8.136.81.197:8080/user/update',
					method: 'POST',
					data:{
						id:store.state.userId,
						birthday:userBirthday,
						gender: userGender,
						username:userName,
						avatar:imagepath
					},
					success: (response) => {
						const user = response.data['user'];
						console.log(response.data);
						let formattedBirthday = user.birthday.substring(0, 10);
						store.commit('upData', {
							username: user.username,
							userBirthday:formattedBirthday,
							userGender:user.gender,	
							userstatus:userStatus,
							imagepath:user.avatar
							
						});
						console.log(store.state.username, store.state.userBirthday, store.state.userGender, store.state.userstatus);
						router.replace('/pages/aboutme/aboutme');
					},
					fail: (error) => {
						console.error(error);
					}
				})
						
			};

			return {
				single,
				tomain,
				usernameInput,
				statusInput,
				selectedGender,
				tiao,
				imageList,
				upload,
				del
			};
		},
	};
</script>

<style>
	.del{
		width: 50rpx;
		height: 50rpx;
		z-index: 100;
		position: absolute;
	}
	.image3 {
		border-radius: 50%;
		width: 100%;
		height: 100%;
		
	}
	.sc2{
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		width: 100%;
		height: 100%;
		position: relative;
		
	}
	.sc3 {
		width: 100rpx;
		height: 100rpx;
		
	}
	.circle {
		width: 120px;
		height: 120px;
		border-radius: 50%;
		background-color: rgba(0, 0, 0, 0.2);
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.8); 
	}
	
	.backarea {
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

	.header {
		width: 90%;
		margin: 20px;
	}
	.header image{
		width: 40px;
		height: 40px;
	}

	.header text {
		color: #ffffff;
		font-size: 1rem;
		font-weight: 550;
	}

	.head-left {
		display: flex;
		align-items: center;
		float: left;
	}

	.info {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		top: 2rem;
		width: 90%;
	}

	.info-item {
		display: flex;
		margin: 20px;
		align-items: center;
		width: 70%;
	}

	.info-item .label {
		font-size: 20px;
		font-weight: bold;
		margin-right: 10px;
		width: 35%;
	}

	.info-item .left {
		width: 65%;
	}



	.login-card-loginIn-btn {
		top: 3rem;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.5);
		width: 200px;
		font-size: 20px;
		height: 50px;
		border-radius: 40px;
		color: white;
	}
</style>