<template>
	<view class="content">
<view class="box" style="width: 100%;height: 5%;"></view>
		<view class="text-area">
			<text class="title">{{title}}</text>
			<text class="slogan">{{slogan1}}</text>
			<text class="slogan" style="margin-left: 15%;">{{slogan2}}</text>
		</view>
		<view class="btn" @click="tiao">
			<text>SIGN IN</text>
		</view>
		
	</view>

</template>

<script setup>
	import { useRouter } from 'uni-mini-router'

	let router = useRouter()
	const tiao = () => {
			router.push('/pages/login/login')
		}
		
	const title = 'EmoSphere';
	const slogan1 = '欢迎来到 EmoSphere';
	const slogan2 = '一个你的专属世界';
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		background-image: url('/static/images/back.jpg');
		background-size: cover;
		background-repeat: no-repeat;
		z-index: -3;
		width: 100%;
		height: 110vh;
		justify-content: center;
		align-items: center;

	}

	.text-area {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 2rem;
	}

	.title {

		font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
		font-size: 4rem;
		color: #FFFFFF;
		position: absolute;
		top: 7rem;
	}

	.slogan {
		font-size: 2rem;
		font-weight: bold;
		top: 9rem;
		margin-bottom: 1.5rem;
	}

	.btn {
		margin-top: 2rem;
		background-color: #FFFFFF;
		border-radius: 200px;
		border: #ffffff 5px solid;
		padding: 1rem;
	}

	.btn text {
		font-size: 1.5rem;
		color: #7A4C00;
		cursor: pointer;
	}
</style>