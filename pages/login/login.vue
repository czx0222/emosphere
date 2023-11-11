<template>
		<view class="login">
			<view class="login-area">
				<image class="logo" src="/static/images/logo.png"></image>
				<view class="login-card-input">
					<input class="account-input" type="text" placeholder="Phone/Email Address" v-model="phoneNumber">
					<input class="code-input" type="text" placeholder="Password" v-model="password">
					
				</view>
				<view class="login-card-loginIn-btn" @click="handleLogin">
					登 录
				</view>
				<view class="login-card-loginIn-btn" click="">
					注册
				</view>
				<view class="otherlogin">
					<text>-----其他登录方式-----</text>
					<view class="icon-list">
						<li class="iconfont icon-weibo"></li>
						<li class="iconfont icon-f-qq"></li>
						<li class="iconfont icon-weixin"></li>	
					</view>

				</view>
				<view class="bottom-message">
					<view class="checbox"></view>
					<text>我已阅读并同意《用户协议》《隐私协议》</text>
				</view>	
			</view>	
		</view>
</template>

<script setup>
	import { ref } from 'vue';
	import axios from 'axios';
	import { useRouter } from 'vue-router';
	const router = useRouter();
	const phoneNumber = ref('19959561535');
	const password = ref('6666');
	
	const handleLogin = () => {
	
	  axios.post('http://8.136.81.197:8080/user/login', {
		phone: phoneNumber.value,
	    authCode: password.value
	  })
	  .then(response => {
	    const responseData = response.data; 
		const user = responseData['user']; 
	    console.log(response.data);
		router.push('/pages/main/main');
	  })
	  .catch(error => {
	    // 登录请求失败的处理逻辑
	    console.error(error);
	  });
	};
	
</script>

<style>
	.login{
		display: flex;
		flex-direction: column; 
		background-image: url('/static/images/back.jpg'); 
		background-size: cover; 
		background-repeat: no-repeat; 
		width: 100%; 
		height: 100vh; 
		
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
		  	top:10.5rem;
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
		    width: 200px; /* 调整宽度适配图标大小 */
		  }
		  	
		  .icon-list li {
		    list-style-type:none ;
		    font-size: 3rem;
		  } 
		  .login-card-loginIn-btn{
		  	top:7.5rem;
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
		  	color: #969898;
		  	bottom: 1rem;
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


