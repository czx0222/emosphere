<template>


	<view class="about">
		<view class="header">
			<router-link :to="{ path: '/pages/myScreen/myScreen' }">
				<img src="/static/images/fan.png">
			</router-link>
			<span>关于EmoSphere</span>
		</view>
		<img class="logo" src="/static/images/logo.png">
		<img alt="图片23" src="/static/images/23.png"
			style="position: absolute; top: 38%; left: 50%; transform: translateX(-50%);height: 50px;">

		<view class="help">
			<view @click="showFeedback = true">
				<span>问题反馈</span>
				<img src="/static/images/zhankai.png" alt="" />
			</view>

			<view @click="showPopup = true">
				<span>功能介绍</span>
				<img src="/static/images/zhankai.png" alt="" />
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
				popupWidth: '80%', // 设置弹窗宽度为背景图宽度的90%
				popupHeight: '25%', // 设置弹窗高度为背景图高度的90%
				feedbackWidth: '80%', // 设置问题反馈界面宽度为背景图宽度的90%
				feedbackHeight: '35%', // 设置问题反馈界面高度为背景图高度的90%
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
		width: 100%;
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

	.help img {
		width: 25px;
		height: 25px;
		margin-right: 60px;
	}

	.header {
		display: flex;
		align-items: center;
		position: relative;

		width: 100%;
		min-height: 4rem;
		background-color: rgba(255, 255, 255, 0.6);
		padding-left: 20px;
	}

	.header img {
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
		top: 4rem;
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
		/* 浅绿色背景 */
		color: #2e7d32;
		/* 深绿色文字 */
		padding: 30px;
		/* 增加了padding */
		border: 2px solid #5F9EA0;
		/* 指定的深绿色边框 */
		border-radius: 10px;
		/* 圆角边框 */
		box-sizing: border-box;
		overflow: auto;
		font-family: 'Arial', sans-serif;
		/* 优雅的字体 */
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
		z-index: 2;
		/* 添加阴影效果 */
	}

	textarea {
		width: calc(100% - 20px);
		/* 调整宽度以适应新的padding */
		height: 150px;
		/* 增加了textarea的高度 */
		margin-bottom: 10px;
		padding: 15px;
		/* 增加了padding */
		border: 1px solid #5F9EA0;
		/* 指定的深绿色边框 */
		border-radius: 5px;
		font-family: 'Arial', sans-serif;
	}

	button {
		background-color: #5F9EA0;
		/* 深绿色按钮 */
		color: white;
		border: none;
		padding: 2px 20px;
		/* 调整按钮的padding，使其更小 */
		margin-right: 10px;
		border-radius: 4px;
		cursor: pointer;
		font-size: 16px;
		font-family: 'Arial', sans-serif;
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
		/* 添加阴影效果 */
		transition: background-color 0.3s;
		display: inline-block;
	}

	/* ... 省略其他的样式 ... */

	/* 取消按钮的样式 */
	button.cancel {
		background-color: #5F9EA0;
		/* 与主按钮相同的颜色，取消按钮不灰色 */
	}

	/* 按钮悬停时的样式 */
	button:hover {
		background-color: #3f7f7f;
		/* 鼠标悬停时的颜色变化 */
	}

	/* 按钮激活时的样式 */
	button:active {
		background-color: #367568;
		box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.2);
	}

	/* 输入框获取焦点时的样式 */
	textarea:focus {
		outline: none;
		border-color: #367568;
		box-shadow: 0 0 0 2px rgba(95, 158, 160, 0.4);
	}
</style>

/*