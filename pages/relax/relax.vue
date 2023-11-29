<template>
	<view class="page">
		<view class="box" style="width: 100%;height: 5%;"></view>
		<view class="header">
			<image src="/static/images/fanhui.png" @click="tomain"></image>

			<image src="/static/images/yinyue.png" @click="tomusic"></image>

			<view class="choose">
				<image src="/static/images/fenche.png"></image>
			</view>
			<image src="/static/images/recode.png" @click="tohistory"></image>
		</view>
		<view class="back">
			<view class="back2">
				<view class="method" @click="startRelaxation('f7')">
					<view class="box-left">
						<text class="circle">1</text>
					</view>
					<view class="box-right">呼吸放松法</view>

				</view>
				<view class="method" @click="startRelaxation('f8')">
					<view class="box-left">
						<text class="circle">2</text>
					</view>
					<view class="box-right">渐进性放松法</view>
				</view>
				<view class="method" @click="startRelaxation('f9')">
					<view class="box-left">
						<text class="circle">3</text>
					</view>
					<view class="box-right">正念冥想</view>
				</view>
				<view class="method" @click="startRelaxation('f10')">
					<view class="box-left">
						<text class="circle">4</text>
					</view>
					<view class="box-right">蝴蝶拥抱</view>
				</view>
				<view class="tip">
					<image src="../../static/images/tip.png"></image>
					<view>
						<text>点击上方的小卡片，享受放松时刻！</text>

					</view>
				</view>

			</view>
			<view v-if="currentPopup" :class="`popup popup-${currentPopup}`"
				style="width: 80%; height: 50%; text-align: center;z-index: 10;">

				<ul style="text-align: left; margin-bottom: 20px; font-size: 22px; font-family: '华文新魏', cursive;">
					<li v-for="step in popupContent[currentPopup].steps.slice(0, 4)" :key="step">{{ step }}</li>
				</ul>
				<div v-if="countingDown" style="color: #006400; font-size: 24px; font-family: '华文新魏', cursive;">
					{{ Math.floor((this.popupContent[currentPopup].duration - (countdownMinutes * 60 + countdownSeconds)) / 60) }}:{{ (this.popupContent[currentPopup].duration - (countdownMinutes * 60 + countdownSeconds)) % 60 }}
				</div>
				<button @click="toggleRelaxation"
					style="font-size: 18px; font-family: '华文新魏', cursive;">{{ countingDown ? '完成' : '进行' }}</button>
				<button @click="closePopup" style="font-size: 18px; font-family: '华文新魏', cursive;">取消</button>
			</view>
		</view>
	</view>
</template>


<script>
	import {
		useRouter
	} from 'uni-mini-router'
import store from '../../store';
	export default {
		data() {
			let router = useRouter()
			const tomain = () => {
				router.replace('/pages/main/main')
			}
			const tohistory = () => {
				router.replace('/pages/history/history')
			}
			const tomusic = () => {
				router.replace('/pages/music/music')
			}
			return {
				tomain,
				tohistory,
				tomusic,
				currentPopup: '',
				completedCount: 0,
				completedPopup: '',
				countingDown: false,
				countdownMinutes: 0,
				countdownSeconds: 0,
				popupContent: {
					'f7': {
						title: '呼吸放松法',
						duration: 18000,
						steps: [
							'缓慢深呼吸，通过鼻子吸气，使腹部膨胀，然后通过嘴巴慢慢呼气。',
							'集中注意力于呼吸的过程，注意每一次的吸气和呼气。',
							'逐渐放慢呼吸的节奏，确保每一次呼吸都是深而有意识的。',
							'想象每一次呼气都带走身体的紧张和焦虑，每一次吸气都带来宁静和放松。',
							'保持这种呼吸状态，直到感觉身体和心灵都变得更加轻松。',
						],
					},
					'f8': {
						title: '渐进性放松法',
						duration: 36000,
						steps: [
							'从脚趾开始，逐渐关注身体的每个部分。',
							'先拉紧此部分肌肉，保持5-7秒，然后再放松，想象并感受到每个部位的放松感。',
							'缓慢而有目的地移动到脚踝、小腿、大腿，一直到头部和颈部。',
							'在每个部位停留片刻，专注于释放那一部分的紧张感。',
							'如果有紧张感或疼痛，尝试在呼气时将其释放出去，整个过程可能需要10-15分钟。',
						],
					},
					'f9': {
						title: '正念冥想',
						duration: 36000,
						steps: [
							'坐在一个舒适的位置，闭上眼睛，开始深呼吸。',
							'将注意力集中在呼吸上，感觉空气进入和离开身体。',
							'注意身体的感觉、周围环境的声音。',
							'如果思绪飘动，轻轻地将注意力带回到呼吸上。',
							'逐渐扩展您的正念，包括身体感觉、情绪状态和思维过程。',
							'在过程中，保持对当下的关注，接受一切，不要评判。',
						],
					},
					'f10': {
						title: '蝴蝶拥抱',
						duration: 18000,
						steps: [
							'寻找一个安静、舒适的地方坐下。',
							'闭上眼睛，开始深呼吸，通过鼻子慢慢吸气，然后通过嘴巴缓慢呼气。',
							'想象自己化身为一只轻盈的蝴蝶，飞翔在宁静的花园中。',
							'感受蝴蝶轻盈的飞翔，每一次呼气都带走紧张和压力。',
							'在这个想象中，感受花香、微风，体验宁静和舒适，保持这种状态直到感觉完全放松和愉悦。',
						],
					},
				},
			};
		},
		methods: {
			showPopup(popup, duration) {
				this.currentPopup = popup;
			},
			closePopup() {
				this.currentPopup = '';
				this.countingDown = false;
				this.resetCountdown();
			},
			startRelaxation(method) {
				console.log('开始放松方式:', method);
				this.currentPopup = method;
			},
			toggleRelaxation() {
				if (this.currentPopup && !this.countingDown) {
					this.startCountdown(this.popupContent[this.currentPopup].duration);
				} else if (this.countingDown) {
					this.completeRelaxation();
				}
			},
			// completeRelaxation() {
			// 	if (this.currentPopup) {
			// 		this.completedPopup = this.popupContent[this.currentPopup].title;
			// 		this.completedCount += 1;
			// 		this.resetCountdown();

			// 		setTimeout(() => {
			// 			this.completedPopup = '';
			// 			this.currentPopup = '';
			// 			this.closePopup(); 
			// 	}
			// },
			completeRelaxation() {
				if (this.currentPopup) {
					const completedPopup = this.popupContent[this.currentPopup].title;
					const timeSpent = this.popupContent[this.currentPopup].duration - (this.countdownMinutes * 60 + this
						.countdownSeconds);

					console.log(`完成放松方法 "${completedPopup}"，花费时间: ${Math.floor(timeSpent / 60)} 分钟 ${timeSpent % 60} 秒`);
					
					// let useid = store.state.userId
					// let method = completedPopup
					// let time = ${Math.floor(timeSpent / 60)} 分钟 ${timeSpent % 60} 秒
					// let date = ew Date().toISOString() 
					// console.log(useid+method+time+date)
					// const requestData = {
					// 	method: completedPopup,
					// 	duration: timeSpent,
					// 	date: new Date().toISOString() 
					// };

					
					// uni.request({
					// 	url: 'http://8.136.81.197:8080/relax_record',
					// 	method: 'POST',
					// 	data: requestData,
					// 	success: (res) => {
					// 		console.log('数据发送成功', res);
					// 	},
					// 	fail: (err) => {
					// 		console.error('数据发送失败', err);
					// 	}
					// });
					this.completedPopup = completedPopup;
					this.completedCount += 1;
					this.resetCountdown()

					setTimeout(() => {
						this.completedPopup = '';
						this.currentPopup = '';
						this.closePopup();
					});
				}
			},
			incrementCount(popup, duration) {
				this.currentPopup = popup;
			},
			startCountdown(duration) {
				// 清除旧的interval
				clearInterval(this.countdownInterval);

				this.countingDown = true;
				const startTime = Date.now();

				const updateCountdown = () => {
					const elapsedTime = Date.now() - startTime;
					const remainingTime = Math.max(0, duration - Math.floor(elapsedTime / 1000));

					this.countdownMinutes = Math.floor(remainingTime / 60);
					this.countdownSeconds = remainingTime % 60;

					if (remainingTime > 0) {
						// 更新UI的代码 (this.countdownMinutes 和 this.countdownSeconds)
					} else {
						this.countingDown = false;
						this.resetCountdown();
						clearInterval(this.countdownInterval);
					}
				};

				updateCountdown();
				this.countdownInterval = setInterval(updateCountdown, 1000);
			},

			resetCountdown() {
				this.countdownMinutes = 0;
				this.countdownSeconds = 0;
			},
		},

		beforeDestroy() {
			// 在组件销毁之前清除interval，以防止内存泄漏
			clearInterval(this.countdownInterval);
		},
	};
</script>




<style>
	.tip {
		display: flex;
		position: relative;
		top: 3rem;
		left: -1rem;
	}

	.tip view {
		padding-top: 50rpx;
		font-size: 1rem;
		font-weight: bold;
		color: rgba(0, 0, 0, 0.8);
		font-family: '华文新魏', cursive;

	}

	.tip image {

		width: 100rpx;
		height: 120rpx;
	}

	.box-left {
		width: 30%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.box-right {
		width: 70%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		font-size: 1.8rem;
		color: #377F7F;
		font-family: '华文新魏', cursive;
	}

	.circle {

		position: relative;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		font-size: 2rem;
		border: black 2px solid;

	}

	.method:first-child .circle {
		background-color: #98D7B2;
	}

	.method:nth-child(2) .circle {
		background-color: #6f9e82;
	}

	.method:nth-child(3) .circle {
		background-color: #0eab89;
	}

	.method:nth-child(4) .circle {
		background-color: #1A866C;
	}

	.method {

		position: relative;
		width: 90%;
		height: 15%;
		margin: 30rpx;
		border-radius: 10px;
		display: flex;
		padding: 30rpx;
		background-color: rgb(141, 178, 172, 0.3);
	}


	.back {
		background-color: rgb(141, 178, 172, 0.7);
		position: relative;
		width: 100%;
		height: 85%;
		border-top-left-radius: 30px;
		border-top-right-radius: 30px;
		top: 2.7rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.back2 {

		position: relative;
		height: 90%;
		width: 90%;
		background-color: rgb(255, 255, 255);
		border-radius: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 50rpx;
	}

	.page {
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
		position: relative;
		top: 1.3rem;
		display: flex;
		justify-content: space-between;
		width: 80%;
	}

	.header image {
		width: 40px;
		height: 40px;
	}

	.choose {
		background-color: rgb(195, 212, 208, 0.5);
		border-radius: 5px;
		width: 80px;
		display: flex;
		justify-content: center;
	}

	.popup {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #e8f5e9;
		color: #2e7d32;
		padding: 30px;
		border: 2px solid #5F9EA0;
		border-radius: 10px;
		font-size: 25px;
		box-sizing: border-box;
		overflow: auto;
		font-family: '华文新魏', cursive;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	}

	button {
		background-color: #5F9EA0;
		color: white;
		border: none;
		padding: 2px 10px;
		margin-right: 10px;
		border-radius: 4px;
		cursor: pointer;
		font-size: 25px;
		font-family: '华文新魏', cursive;
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
		transition: background-color 0.3s;
		display: inline-block;
	}

	button:hover {
		background-color: #3f7f7f;
	}

	button:active {
		background-color: #367568;
		box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.2);
	}

	.completed-animation {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #5F9EA0;
		font-size: 30px;
		font-family: '华文新魏', cursive;
	}

	@keyframes fadeInOut {
		0% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}
</style>