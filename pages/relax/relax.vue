<template>
	<view class="page">
		<view class="box" style="width: 100%;height: 5%;"></view>
		<view class="header">
			<router-link to="/pages/main/main">
				<img src="/static/images/f1.png" @click="incrementCount('f1', 5)">
			</router-link>
			<router-link to="/pages/music/music">
				<img src="/static/images/f2.png" @click="incrementCount('f2', 5)">
			</router-link>
			<img class="choose" src="/static/images/f3.png" >
			<router-link to="">
				<img src="/static/images/f4.png" @click="incrementCount('f4', 5)">
			</router-link>
		</view>
		<view class="title">
			<text>Relax</text>
		</view>
		<img alt="图片f6" src="/static/images/f6.png" style="position: absolute; top: 54%; left: 65%; transform: translate(-50%, -50%);">
		<view class="method" >
			<img alt="图片f7" src="/static/images/f7.png" @click="startRelaxation('f7')" style="margin-bottom: 10px;">
			<img alt="图片f8" src="/static/images/f8.png" @click="startRelaxation('f8')" style="margin-bottom: 10px;">
			<img alt="图片f9" src="/static/images/f9.png" @click="startRelaxation('f9')" style="margin-bottom: 10px;">
			<img alt="图片f10" src="/static/images/f10.png" @click="startRelaxation('f10')" style="margin-bottom: 10px;">
		</view>
	</view>

	<view v-if="currentPopup" :class="`popup popup-${currentPopup}`" style="width: 80%; height: 50%; text-align: center;z-index: 10;">

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
</template>

<script>
	export default {
		data() {
			return {
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
			completeRelaxation() {
				if (this.currentPopup) {
					this.completedPopup = this.popupContent[this.currentPopup].title;
					this.completedCount += 1;
					this.resetCountdown();

					setTimeout(() => {
						this.completedPopup = '';
						this.currentPopup = '';
						this.closePopup(); // 调用关闭弹窗的方法
						// router.push('/pages/index/index'); // 注释掉路由跳转
					});
				}
			},
			incrementCount(popup, duration) {
				this.currentPopup = popup;
			},
			startCountdown(duration) {
				this.countingDown = true;
				const startTime = Date.now();

				const updateCountdown = () => {
					const elapsedTime = Date.now() - startTime;
					const remainingTime = Math.max(0, duration - Math.floor(elapsedTime / 1000));

					this.countdownMinutes = Math.floor(remainingTime / 60);
					this.countdownSeconds = remainingTime % 60;

					if (remainingTime > 0) {
						requestAnimationFrame(updateCountdown);
					} else {
						this.countingDown = false;
						this.resetCountdown();
					}
				};

				requestAnimationFrame(updateCountdown);
			},
			resetCountdown() {
				this.countdownMinutes = 0;
				this.countdownSeconds = 0;
			},
		},
	};
</script>

<style scoped>
	.choose {
		background-color: rgb(172,217,185,0.3);
		border-radius: 5px;
	}
	.method{
		position: absolute; top: 64%; right: 5%; display: flex; flex-direction: column; gap: 20px;
	}
	.title {
		position: relative;
		top: 6%;
	}

	.title text {
		font-weight: bold;
		font-size: 4rem;
		color: #377F7F;
	}

	.page {
		display: flex;
		flex-direction: column;
		background-image: url('/static/images/relaxback.png');
		background-size: cover;
		background-repeat: no-repeat;
		width: 100%;
		height: 100vh;
		align-items: center;
		/* 水平居中 */
	}

	.header {
		position: relative;
		top: 1.5rem;
		display: flex;
		justify-content: space-between;
		width: 80%;
	}

	.header img {
		width: auto;
		height: 40px;
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