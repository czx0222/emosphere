<template>


	<view class="about">
		<view class="box" style="width: 100%;height: 5%;"></view>
		<view class="header">
			<router-link :to="{ path: '/pages/myScreen/myScreen' }">
				<image src="/static/images/fan.png"></image>
			</router-link>
			<span>关于EmoSphere</span>
		</view>
		<image class="logo" src="/static/images/logo.png"></image>
		<image alt="图片23" src="/static/images/23.png"
			style="position: absolute; top: 38%; left: 50%; transform: translateX(-50%);height: 60px;width: 60%;"></image>

		<view class="help">
			<view @click="showFeedback = true">
				<span>问题反馈</span>
				<image src="/static/images/zhankai.png" alt="" ></image>
			</view>

			<view @click="showPopup = true">
				<span>功能介绍</span>
				<image src="/static/images/zhankai.png" alt="" ></image>
			</view>
		</view>

	

		<div v-if="showPopup" class="popup" :style="{ width: popupWidth, height: popupHeight}">
			<p>{{ description }}</p>
			<button @click="showPopup = false">关闭</button>
		</div>

		<!-- 点击图片24后的问题反馈 -->
		<div v-if="showFeedback" class="feedback" :style="{ width: feedbackWidth, height: feedbackHeight }">
			<textarea v-model="feedbackText" placeholder="请输入你的问题"></textarea>
			<button class="cancel" @click="showFeedback = false">取消</button>
			<button @click="submitFeedback">确定</button>
		</div>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				showPopup: false,
				showFeedback: false,
				description: 'Emosphere: 一款致力于帮助人们放松，舒缓心情的软件，有AI聊天，社区，星期日历，放松等模块，多方面帮助心理压抑的人群去放松。',
				feedbackText: '',
				popupWidth: '80%', 
				popupHeight: '25%', 
				feedbackWidth: '80%', 
				feedbackHeight: '35%', 
			};
		},
		methods: {
			submitFeedback() {
				console.log('提交问题反馈:', this.feedbackText);
				this.showFeedback = false;
			},
		},
	};
</script>

<style scoped>
	.help {
		position: relative;
		width: 90%;
		top: 10rem;

	}

	.help view {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: rgba(165,192,183, 0.8);
		min-height: 4rem;
		padding-left: 30%;
		margin-top: 10px;
		border-radius: 10px;
	}

	.help span {
		flex-wrap: 1;
		font-weight: bold;
		font-size: 1.5rem;
	}

	.help image {
		width: 25px;
		height: 25px;
		margin-right: 30px;
	}

	.header {
		display: flex;
		align-items: center;
		position: relative;

		width: 100%;
		min-height: 4rem;
		padding-left: 20px;
	}

	.header image {
		width: 25px;
		height: 25px;
		margin-right: 60px;
		float: left;
	}

	.header span {
		flex-wrap: 1;
		font-weight: bold;
		font-size: 1.5rem;
	}

	.logo {
		position: relative;
		top: 2rem;
		height: 140px;
		width: 140px;
		clip-path: circle(55% at center);
		z-index: 1;
		display: flex;

	}

	.about {
		display: flex;
		flex-direction: column;
		background-image: url('/static/images/back2.png');
		background-size: cover;
		background-repeat: no-repeat;
		width: 100%;
		height: 100vh;
		align-items: center;
	}

	.popup,
	.feedback {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #e8f5e9;
		color: #2e7d32;
		padding: 30px;
		border: 2px solid #5F9EA0;
		border-radius: 10px;
		box-sizing: border-box;
		overflow: auto;
		font-family: 'Arial', sans-serif;
		font-size: 20px;
		z-index: 2;
	}

	textarea {
		width: calc(100% - 20px);
		height: 150px;
		margin-bottom: 10px;
		padding: 15px;
		border: 1px solid #5F9EA0;
		border-radius: 5px;
		font-family: 'Arial', sans-serif;
	}

	button {
		background-color: #5F9EA0;
		color: white;
		border: none;
		padding: 2px 20px;
		margin-right: 10px;
		border-radius: 4px;
		cursor: pointer;
		font-size: 16px;
		font-family: 'Arial', sans-serif;
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
		transition: background-color 0.3s;
		display: inline-block;
	}

	button.cancel {
		background-color: #5F9EA0;
	}

	button:hover {
		background-color: #3f7f7f;
	}

	button:active {
		background-color: #367568;
		box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.2);
	}

	textarea:focus {
		outline: none;
		border-color: #367568;
		box-shadow: 0 0 0 2px rgba(95, 158, 160, 0.4);
	}
</style>
