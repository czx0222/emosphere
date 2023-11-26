<template>
	<view class="backarea">
		<view class="box" style="width: 100%;height: 5%;"></view>
		<view class="header">
			<view class="left" @click="getback">
				<image src="/static/images/fanhui.png" ></image>
				<text>返回</text>
			</view>

		</view>
		<h1 class="background-title">最近五次放松记录</h1>
		<view class="time">
			<uni-datetime-picker mode="date" :start="start" :end="end" :fields="fields" :value="value"
				@confirm="onConfirm"></uni-datetime-picker>
		</view>

		<view class="relax-list">
			<view class="relax-item">
				<span>日期：2023-11-13</span>
				<span>放松方式：冥想</span>
				<span>放松时长：20分钟</span>
			</view>
			<view class="relax-item">
				<span>日期：2023-11-13</span>
				<span>放松方式：渐进性放松法</span>
				<span>放松时长：10分钟</span>
			</view>
			<view class="relax-item">
				<span>日期：2023-11-13</span>
				<span>放松方式：呼吸放松法</span>
				<span>放松时长：5分钟</span>
			</view>
			<view class="relax-item">
				<span>日期：2023-11-13</span>
				<span>放松方式：冥想</span>
				<span>放松时长：25分钟</span>
			</view>
		</view>
	</view>
</template>






<script setup>
	import {useRouter} from 'vue-router';
	const router = useRouter();
	const getback = () => {
		router.push('/pages/relax/relax');
	};
</script>

<style>
	.relax-list {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;

		width: 90%;
		top: 5rem;
	}

	.relax-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 10px;
		width: 100%;
		height: 130px;
		border-radius: 10px;
		padding: 10px;
		background-color: rgb(255, 255, 255, 0.5);


	}

	.relax-item span {
		font-size: 20px;
		color: #008080;
		font-weight: bold;
		display: block;
		margin-bottom: 8px;
	}

	.time {
		position: relative;
		top: 3rem;
		left: -6rem;
		width: 280rpx;
	}

	.background-title {
		position: relative;
		color: #008080;
		top: 30px;
		font-family: 'Pacifico', cursive;
	}

	.backarea {
		display: flex;
		flex-direction: column;
		background-image: url('/static/images/back2.png');
		background-size: cover;
		background-repeat: no-repeat;
		width: 100%;
		height: 120vh;
		align-items: center;

	}

	.header {
		display: flex;
		justify-content: space-between;
		width: 90%;
		position: relative;
		top: 1rem;

	}

	.header text {
		color: #ffffff;
		font-size: 1rem;
		font-weight: 550;

	}

	.left {
		display: flex;
		align-items: center;
		float: left;
	}
	.left image{
		width: 30px;
		height: 30px;
	}
</style>