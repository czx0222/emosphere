<template>
	<view class="background" :style="{ backgroundColor: bgColor }">
		<!-- 最上方的标题QUESTIONS板块 -->
		<div id="title" style="margin-left: 0%; margin-top:0px;height: 80px; background-color: white;">
			<p id="title1">Q U E S T I O N S</p>
		</div>
		<div class="green-circle">
			<div class="circle-container" style="margin-left: 5%; margin-top:60px;">
				<span class="circle-number">1</span>
			</div>
		</div>

		<div>
			<p class="text-output" style="margin-left: 20%; margin-top:-780px;">你是否经常感到神经过敏,心中不踏实？</p>
		</div>

		<div>
			<button class="button" style="margin-left: 10%; margin-top:50px;">没有</button>
			<button class="button" style="margin-left: 10%; margin-top:25px;">很轻</button>
			<button class="button" style="margin-left: 10%; margin-top:25px;">中等</button>
			<button class="button" style="margin-left: 10%; margin-top:25px;">偏重</button>
			<button class="button" style="margin-left: 10%; margin-top:25px;">严重</button>。。
		</div>



		<div class="green-circle">
			<div class="circle-container" style="margin-left: 5%; margin-top:60px;">
				<span class="circle-number">2</span>
			</div>
		</div>

		<div>
			<p class="text-output" style="margin-left: 20%; margin-top:-780px;">问题2描述</p>
		</div>

		<div>
			<button class="button" style="margin-left: 10%; margin-top:50px;">A</button>
			<button class="button" style="margin-left: 10%; margin-top:25px;">B</button>
			<button class="button" style="margin-left: 10%; margin-top:25px;">C</button>
			<button class="button" style="margin-left: 10%; margin-top:25px;">D</button>
			<button class="button" style="margin-left: 10%; margin-top:25px;">E</button>
		</div>

		<div class="green-circle">
			<div class="circle-container" style="margin-left: 5%; margin-top:60px;">
				<span class="circle-number">3</span>
			</div>
		</div>

		<div>
			<p class="text-output" style="margin-left: 20%; margin-top:-780px;">问题3描述</p>
		</div>

		<div>
			<button class="button" style="margin-left: 10%; margin-top:50px;">A</button>
			<button class="button" style="margin-left: 10%; margin-top:25px;">B</button>
			<button class="button" style="margin-left: 10%; margin-top:25px;">C</button>
			<button class="button" style="margin-left: 10%; margin-top:25px;">D</button>
			<button class="button" style="margin-left: 10%; margin-top:25px;">E</button>
		</div>

		<div class="green-circle">
			<div class="circle-container" style="margin-left: 5%; margin-top:60px;">
				<span class="circle-number">4</span>
			</div>
		</div>

		<div>
			<p class="text-output" style="margin-left: 20%; margin-top:-780px;">问题4描述</p>
		</div>

		<div>
			<button class="button" style="margin-left: 10%; margin-top:50px;">A</button>
			<button class="button" style="margin-left: 10%; margin-top:25px;">B</button>
			<button class="button" style="margin-left: 10%; margin-top:25px;">C</button>
			<button class="button" style="margin-left: 10%; margin-top:25px;">D</button>
			<button class="button" style="margin-left: 10%; margin-top:25px;">E</button>
		</div>

		<div class="green-circle">
			<div class="circle-container" style="margin-left: 5%; margin-top:60px;">
				<span class="circle-number">5</span>
			</div>
		</div>

		<div>
			<p class="text-output" style="margin-left: 20%; margin-top:-780px;">问题5描述</p>
		</div>

		<div>
			<button class="button" style="margin-left: 10%; margin-top:50px;">A</button>
			<button class="button" style="margin-left: 10%; margin-top:25px;">B</button>
			<button class="button" style="margin-left: 10%; margin-top:25px;">C</button>
			<button class="button" style="margin-left: 10%; margin-top:25px;">D</button>
			<button class="button" style="margin-left: 10%; margin-top:25px;">E</button>
		</div>



		<div>
			<button class="three-d" style="margin-left: 10%; margin-buttom:0px;" @click="goToHome">Home</button>
			<button class="three-d" style="margin-left: 10%; margin-buttom:0px;" @click="goToQ2">下一题</button>
		</div>
	</view>
</template>

<script>
	import {
		defineComponent
	} from 'vue';
	import {
		useRouter
	} from 'vue-router';

	export default {
		data() {
			const router = useRouter();

			const goToHome = () => {
				router.push('../home/home');
			};

			const goToQ2 = () => {
				router.push('../Q2/Q2');
			};

			return {
				bgColor: "#BAD0CE", // 设置背景色为绿色 
				// 设置圆形标题的相关参数

				circleTop: 140, // 调整为适当的顶部偏移量  
				circleLeft: 20, // 调整为适当的左侧偏移量 

				text: '',

				goToHome,
				goToQ2
			};
		}
	}
</script>

<style>
	/* 设置背景的大小 */
	.background {
		height: 4844px;
		width: 390;
	}

	#title {
		border: 2px solid #e8e9e4;
		border-radius: calc();
	}

	#title1 {
		color: darkcyan;
		font-weight: bold;
		font-size: 36px;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 10vh;
	}

	.green-circle {
		position: relative;
		display: flex;

		height: 100vh;
	}

	.circle-container {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 50px;
		/* 调整为适合的宽度 */
		height: 50px;
		/* 调整为适合的高度 */
		border-radius: 50%;
		/* 使容器变为圆形 */
		background-color: white;
		/* 设置圆形的背景色 */
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		/* 可选：添加阴影效果 */
	}

	.circle-number {
		font-size: 28px;
		/* 设置数字的字体大小 */
		font-weight: bold;
		/* 设置数字的字体粗细 */
		color: darkcyan;
		/* 设置数字的颜色 */

	}

	.text-output {
		font-size: 28px;
		font-weight: bold;
		color: darkcyan;
		text-align: left;
	}

	.button {
		display: flex;

		justify-content: center;

		align-items: center;


		background: linear-gradient(to right, darkcyan 0%, darkcyan 10%, white 10%, white 100%);
		color: darkcyan;
		width: 300px;
		height: 45px;
		border: 0;
		font-size: 25px;
		box-sizing: border-box;
		text-align: center;
		border-radius: 13px;

		font-weight: bold;
	}

	.button:hover {
		background: linear-gradient(to right, darkcyan 0%, darkcyan 10%, lightgoldenrodyellow 10%, lightgoldenrodyellow 100%);
	}

	.three-d {
		color: #fff;
		background-color: #5F9EA0;
		/* box-shadow: 0px 15px 0px 0px #9bf5aa; */
		/*右下*/
		box-shadow: 3px 3px 1px 1px #666;
		transition: all .3s;
		font-weight: bold;
	}

	.three-d:hover {
		background-color: #49dd00;
	}

	.three-d:active {
		transform: translate(0, 4px);
		box-shadow: 0px 1px 0px 0px #00c792;
	}
</style>