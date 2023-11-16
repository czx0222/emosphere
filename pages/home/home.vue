<template>
	<view class="background" :style="{ backgroundColor: bgColor }">
		<div class="image-container">
			<img :src="imageUrl1" class="image">
		</div>

		<div>
			<p class="text-output1">EmoSphere</p>
			<p class="text-output2">心理测试</p>
			<p class="text-output3">"发现你的可能"</p>
			<p class="text-output4">本测试预计需要15分钟</p>
			<button class="button" @click="goToQ1">开始测试</button>
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
	import { defineComponent } from 'vue';
	import { useRouter } from 'vue-router';
	export default {
		data() {
			const router = useRouter();
			const goToQ1 = () => {
				router.push('/pages/questions/questions');
			};
			return {
				bgColor: "#BAD0CE", // 设置背景色为绿色 

				imageUrl1: "../../static/back.png",
				imageUrl2: "../../static/if-quote-left.png",
				imageUrl3: "../../static/if-quote-right.png",
				
				goToQ1
			}
		}
	}
</script>

<style>
	.button {
		position: relative;
		top: 410px;
		left: 0px;
		color: darkcyan;
		width: 150px;
		height: 45px;
		border: 0;
		font-size: 25px;
		font-weight: bold;
		box-sizing: border-box;
		text-align: center;
		border-radius: 13px;
		display: flex;  
		justify-content: center; /* 水平居中 */  
		align-items: center; /* 垂直居中 */  
		/* 设置按钮边框圆角 */
		background-color: #faeedf;
	}
	
	.button:hover {
		background: #fddeb8;
	}
		
	/* 设置背景的大小 */
	.background {
		height: 844px;
		width: 390;
	}

	.image-container {
		position: relative;
	}

	.image {
		border: 5px black;
		outline-style: hidden;
		/* 设置边框 */
		border-radius: 35px;
		/* 设置边框圆角 */
		opacity: 0.85;
		/* // 设置透明度，范围从0（完全透明）到1（完全不透明） */
		position: absolute;
		top: 80px;
		left: 30px;
		width: 330px;
		height: 420px;
	}

	.text-output1 {
		font-size: 50px;
		font-weight: bold;
		color: #087860;
		text-align: left;
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		top: 130px;
		left: 55px;
	}

	.text-output2 {
		font-size: 40px;
		font-weight: bold;
		color: #087860;
		text-align: left;
		position: absolute;
		top: 200px;
		left: 104px;
	}

	.text-output3 {
		font-size: 37px;
		font-weight: 900;
		font-family: fangsong;
		color: white;
		text-align: left;
		position: absolute;
		top: 280px;
		left: 70px;
	}

	.text-output4 {
		font-size: 22px;
		font-weight: 500;
		font-family: fangsong;
		color: white;
		text-align: left;
		position: absolute;
		top: 350px;
		left: 90px;
		border: 3px outset #0ed4a9;
	}

	.text-output5 {
		font-size: 24px;
		font-weight: bold;
		display: flex;
		align-items: center;
		/* 垂直对齐 */
		justify-content: center;
		/* 水平对齐 */
		height: 58px;
		/* 视口的高度 */
		color: #808080;
	}
	
	.text-output6 {
		font-size: 19px;
		position: absolute;
		font-family: fangsong;
		/* 水平对齐 */
		height: 250px;
		left: 60px;
		/* 视口的高度 */
		color: black;
		width: 280px;
	}

	.circle-box {
		width: 390px;
		/* 设置圆框的宽度 */
		height: 400px;
		/* 设置圆框的高度 */
		background-color: #f5f5f5f5;
		/* 设置圆框的背景颜色为白色 */
		border-radius: 15%;
		/* 设置圆框的边框为圆形 */

		position: absolute;
		top: 550px;
		left: 0px;
	}

	.gray-bar {
		width: 120px;
		/* 设置长条的宽度 */
		height: 8px;
		/* 设置长条的高度 */
		background-color: #808080;
		/* 设置灰色背景色 */
		border-radius: 13%;
		/* 设置圆框的边框为圆形 */
		display: flex;
		align-items: center;
		/* 垂直对齐 */
		justify-content: center;
	}
</style>