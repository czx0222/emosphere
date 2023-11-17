<template>
	<view class="backarea">
		<router-link :to="{ path: '/pages/main/main' }">
			<view class="head-left">
				<img src="/static/images/fanhui.jpg" />
				<text>返回</text>
			</view>
		</router-link>
		<div class="image-container">
			<img :src="imageUrl1" class="image">
			<text class="text-output1">EmoSphere</text>
			<text class="text-output2">心理测试</text>
			<text class="text-output3">"发现你的可能"</text>
			<text class="text-output4">本测试预计需要15分钟</text>
			<button class="btn" @click="goToQ1">开始测试</button>
		</div>
		<div class="circle-box">
			<img :src="imageUrl2" style="position: absolute;top: 50px;left: 20px;width: 8%; ">
			<img :src="imageUrl3" style="position: absolute;top: 200px;right: 20px;width: 8%;">

			<div class="gray-bar" style="position: absolute;top: 1px;left: 135px;"></div>
			<p class="text-output5">什么是心理测试?</p>
			<p class="text-output6">心理测验（mental test）是根据一定的法则和心理学原理，使用一定的操作程序给
				人的认知、行为、情感的心理活动予以量化。心理测验是心理测量的工具，心理测量在心理咨询中能帮助当事
				人了解自己的情绪、行为模式和人格特点。</p>
		</div>
	</view>
</template>

<script>
	import {
		useRouter
	} from 'vue-router';
	export default {
		data() {
			const router = useRouter();
			const goToQ1 = () => {
				router.push('/pages/questions/questions');
			};
			return {
				imageUrl1: "../../static/back.png",
				imageUrl2: "../../static/if-quote-left.png",
				imageUrl3: "../../static/if-quote-right.png",

				goToQ1
			}
		}
	}
</script>

<style>
	a {
		text-decoration: none;
		color: inherit;
		/* 保留链接的默认文字颜色 */
	}

	.head-left img {
		height: 2rem;
		margin-right: 10px;
	}

	.head-left text {
		color: black;
		font-size: 1rem;
		font-weight: 550;
	}

	.head-left {
		display: flex;
		align-items: center;
		position: relative;
		top: 1rem;
		left: 1rem;
	}

	.backarea {
		background-color: #BAD0CE;
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.image-container {
		position: relative;
		top: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.image {
		border-radius: 35px;
		opacity: 0.85;
		width: 330px;
		height: 450px;
	}


	.text-output1 {
		position: relative;
		font-size: 50px;
		font-weight: bold;
		color: #087860;
		top: -23rem;
		text-decoration: none;
	}

	.text-output2 {
		position: relative;
		font-size: 40px;
		font-weight: bold;
		color: #087860;
		top: -21rem;

	}

	.text-output3 {
		position: relative;
		font-size: 37px;
		font-weight: 900;
		font-family: fangsong;
		color: white;
		top: -19rem;
	}

	.text-output4 {
		position: relative;
		font-size: 22px;
		font-weight: 500;
		font-family: fangsong;
		color: white;
		top: -17rem;
	}

	.btn {
		position: relative;
		color: darkcyan;
		width: 150px;
		height: 45px;
		font-size: 25px;
		font-weight: bold;
		border-radius: 13px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #faeedf;
		top: -15rem;
	}

	.text-output5 {
		font-size: 24px;
		font-weight: bold;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 58px;
		color: #808080;
	}

	.text-output6 {
		font-size: 19px;
		position: absolute;
		font-family: fangsong;
		height: 250px;
		left: 60px;
		color: black;
		width: 280px;
	}

	.circle-box {
		width: 390px;
		height: 400px;
		background-color: #f5f5f5f5;
		border-radius: 15%;
		position: absolute;
		top: 550px;
		left: 0px;
	}

	.gray-bar {
		width: 120px;

		height: 8px;

		background-color: #808080;

		border-radius: 13%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>

