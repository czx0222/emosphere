<template>
	<view class="backarea">
		<view class="box" style="width: 100%;height: 5%;"></view>
			<view class="head-left" @click="fan">
				<image src="/static/images/fanhui.png" ></image>
				<text>返回</text>
			</view>
	<div class="image-container">
			<image :src="imageUrl1" class="back"></image>
			<text class="text-output1">EmoSphere</text>
			<text class="text-output2">心理测试</text>
			<text class="text-output3">"发现你的可能"</text>
			<text class="text-output4">本测试预计需要15分钟</text>
			<button class="btn" @click="goToQ1">开始测试</button>
		</div>
		<div class="circle-box">
			<image :src="imageUrl2" style="position: absolute;top: 2rem;left: 20px;width: 8%; "></image>
			<image :src="imageUrl3" style="position: absolute;top: 15rem;right: 20px;width: 8%;"></image>

			<div class="gray-bar"></div>
			<p class="text-output5">什么是心理测试?</p>
			<p class="text-output6">心理测验（mental test）是根据一定的法则和心理学原理，使用一定的操作程序给
				人的认知、行为、情感的心理活动予以量化。心理测验是心理测量的工具，心理测量在心理咨询中能帮助当事
				人了解自己的情绪、行为模式和人格特点。</p>
		</div>
	</view>
</template>

<script>
	import { useRouter } from 'uni-mini-router'

	export default {
		data() {
			let router = useRouter()
			const goToQ1 = () => {
				router.replace('/pages/questions/questions');
			};
			const fan = () =>{
				router.replace('/pages/chat/chat')
			}
			return {
				imageUrl1: "../../static/images/back2.png",
				imageUrl2: "../../static/images/if-quote-left.png",
				imageUrl3: "../../static/images/if-quote-right.png",
				fan,
				goToQ1
			}
		}
	}
</script>

<style>
	a {
		text-decoration: none;
		color: inherit;
	}
	.head-left {
		display: flex;
		align-items: center;
		position: relative;
		top: 1rem;
		left: -8rem;
	}
	.head-left image {
		height: 40px;
		width: 40px;
		margin-right: 10px;
	}
	
	.head-left text {
		color: #f5f5f5f5;
		font-size: 1rem;
		font-weight: 550;
	}
	.backarea {
		background-color: #BAD0CE;
		width: 100%;
		height: 110vh;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.image-container {
		position: relative;
		top: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 90%;
		height: 50%;
	}
	.back {
		position: absolute;
		border-radius: 20px;
		opacity: 0.85;
		width: 100%;
		height: 100%;
		
	}
	.text-output1 {
		z-index: 4;
		position: relative;
		top:2rem;
		font-size: 50px;
		font-weight: bold;
		color: #087860;
	}
	
	.text-output2 {
		font-size: 40px;
		font-weight: bold;
		color: #087860;
		position: relative;
		top:4rem;
	}
	.text-output3 {
		font-size: 30px;
		font-weight: 900;
		font-family: fangsong;
		color: white;
		position: relative;
		top:6rem;
	}
	.text-output4 {
		position: relative;
		font-size: 22px;
		font-weight: 600;
		font-family: fangsong;
		color: white;
		top: 8rem;
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
		top: 10rem;
	}
	.circle-box {
		width: 100%;
		height: 36%;
		border-radius: 15%;
		position: relative;
		top: 3rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #f5f5f5f5;
	}
	.circle-box image{
		height: 2rem;
		width: 2rem;
	}
	.gray-bar {
		margin-top: 10px;
		position: relative;
		width: 30%;
		height: 2%;
		background-color: #808080;
	}
	.text-output5 {
		margin-top: 10px;
		font-size: 24px;
		font-weight: bold;
		height: 58px;
		color: #808080;
	}
	
	.text-output6 {
		width: 80%;
		font-size: 21px;
		font-family: fangsong;
		font-weight: 900;
		color: black;
	}
</style>

