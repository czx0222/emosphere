<template>
	<view class="login">
		<view class="login-area">
			<image class="logo" src="/static/images/logo.png"></image>
			<view class="login-card-input">
				<input class="account-input" type="text" placeholder="Phone/Email Address" v-model="phoneNumber">
				<input class="code-input" type="password" placeholder="Password" v-model="password">

			</view>
			<view class="login-card-loginIn-btn" @click="handleLogin">
				登 录 / 注 册
			</view>
			<view class="otherlogin">
				<text>-----其他登录方式-----</text>
				<view class="icon-list">
					<li class="iconfont icon-weibo"></li>
					<li class="iconfont icon-f-qq"></li>
					<li class="iconfont icon-weixin"></li>
				</view>

			</view>
			<view class="bottom-message" @click="toggleAgreement">
				<view class="checkbox" :class="{ checked: agreementChecked }">
					<text v-if="agreementChecked" class="checkmark">✔</text>
				</view>
				<text>
					我已阅读并同意《用户协议》《隐私协议》
				</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import { useRouter } from 'uni-mini-router'
	import { getCurrentInstance } from 'vue'
	import store from '@/store';
	let router = useRouter()
	const phoneNumber = ref('15159606435');
	const password = ref('123456');
	const agreementChecked = ref(false);
	const handleLogin = () => {
		if (!agreementChecked.value) {
			uni.showToast({
				title: '请同意用户协议和隐私协议',
				icon: 'none'
			});
			return;
		}
		uni.request({
			url: 'http://8.136.81.197:8080/user/login',
			method: 'POST',
			data: {
				phone: phoneNumber.value,
				pwd: password.value
			},
			success: (response) => {
				let formattedBirthday 
				const user = response.data['user'];

				if(user.birthday == null){
					formattedBirthday='2000-01-01'
				}else{
					 formattedBirthday = user.birthday.substring(0, 10);
				}
				console.log(formattedBirthday)
				store.commit('setUserData', {
					id: user.id,
					username: user.username,
					userBirthday:formattedBirthday,
					userGender:user.gender,	
					imagepath:user.avatar
				});
				console.log(store.state.username, store.state.userBirthday, store.state.userGender, store.state.ImagePath);

				router.replace('/pages/main/main');
			},
			fail: (error) => {
				console.error(error);
			}
		});
	};
	const toggleAgreement = () => {
		agreementChecked.value = !agreementChecked.value;
	};
</script>

<style>
	.bottom-message {
		display: flex;
		align-items: center;
		/* 让子元素在垂直方向上居中对齐 */
	}

	.checkbox {
		position: relative;
		width: 1.5rem;
		height: 1.5rem;
		border: 2px solid #969898;
		/* 设置边框颜色 */
		border-radius: 50%;
		background-color: transparent;
		margin-right: 0.5rem;
	}

	.checkmark {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #000;
		/* 设置勾的颜色 */
	}

	.login {
		display: flex;
		flex-direction: column;
		background-image: url('/static/images/back.jpg');
		background-size: cover;
		background-repeat: no-repeat;
		width: 100%;
		height: 110vh;

	}

	.account-input,
	.code-input {
		position: relative;
		top: 7rem;
		width: 270px;
		height: 60px;
		border: none;
		border-radius: 20px;
		background-color: rgba(255, 255, 255, 0.3);
		margin-top: 1.5rem;
		padding-left: 0.5rem;
		font-size: 1rem;
		color: #ffffff;
		z-index: 5;
	}

	.login-area {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.logo {
		position: relative;
		top: 5rem;
		height: 94px;
		width: 94px;
		clip-path: circle(50% at center);
		z-index: 1;
	}

	.otherlogin {
		position: relative;
		top: 10.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 20px;
		color: white;
	}

	.otherlogin text {
		margin-bottom: 10px;
		color: #000;
	}

	.icon-list {
		display: flex;
		justify-content: space-between;
		width: 200px;
		/* 调整宽度适配图标大小 */
	}

	.icon-list li {
		list-style-type: none;
		font-size: 3rem;
	}

	.login-card-loginIn-btn {
		top: 7.5rem;
		margin-top: 1rem;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #F9BD69;
		width: 240px;
		font-size: 20px;
		height: 50px;
		border-radius: 40px;
		color: white;
	}

	.bottom-message {
		position: absolute;
		height: 20px;
		font-size: 1rem;
		color: #484949;
		font-weight: 900;
		bottom: 5rem;
	}

	@media (max-width: 884px) {
		.title {
			font-size: 2.5rem;
		}

		.slogan {
			font-size: 1rem;
		}

		.navigator {
			font-size: 1rem;
		}
	}
</style>