<template>

	<view class="backarea">
		<view class="header">
			<router-link :to="{ path: '/pages/main/main' }">
				<view class="head-left">
					<img src="/static/images/fanhui.png" />
					<text>返回</text>
				</view>
			</router-link>
			<view class="head-right" @click="getemo">
				<img src="/static/images/gou.png" />
				<text>获取</text>
			</view>
		</view>
		<view class="calendar">
<!-- 						<view>
				<uni-calendar class="uni-calendar--hook" :selected="info.selected" :showMonth="false" @change="change"
					@monthSwitch="monthSwitch" />
			</view> -->
		</view>
		<view class="calendar-content">
			<template v-for="(record, index) in records" :key="index">
				<view class="v">
					<view class="left">
						<text class="time">{{ formatDate(record.createDate) }}</text>
						<img :src="'/static/images/qingxu-' + record.mood + '.png'" alt="" />
					</view>
					<view class="right">
						<text class="title">{{ record.title }}</text>
						<text class="content">{{ record.content }}</text>
					</view>
				</view>
			</template>
		</view>
	</view>
</template>

<script setup>
	import store from '@/store';
	import {
		ref,onMounted
	} from 'vue';

	const emotionIcons = store.getters.getEmotionIcons;
	const records = ref([]);

	const formatDate = (dateString) => {
		const originalDate = new Date(dateString);
		const month = originalDate.getMonth() + 1; // 注意月份是从0开始计数，需要加1
		const day = originalDate.getDate();
		return `${month}月${day}日`;
	};

	const getemo = () => {
		uni.request({
			url: 'http://8.136.81.197:8080/mood_record',
			method: 'GET',
			data: {
				uid: 5,
				nums: 2,
			},
			success: (response) => {
				console.log(response.data);
				records.value = response.data['records'];
			},
			fail: (error) => {
				console.error(error);
			}
		});
	};
	onMounted(() => {
		// 在页面加载时自动调用 getemo 函数
		getemo();
	});
</script>


<style>
	.backarea {
		display: flex;
		flex-direction: column;
		background-image: url('/static/images/back2.png');
		background-size: cover;
		background-repeat: no-repeat;
		width: 100%;
		height: 100vh;
		align-items: center;
		/* 水平居中 */

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

	.head-left {
		display: flex;
		align-items: center;
		float: left;
	}

	.head-right {
		display: flex;
		align-items: center;
	}

	.calendar {
		position: relative;
		top: 2rem;

	}

	.calendar-content {
		position: relative;
		top: 3rem;
		width: 90%;
	}

	.v {
		display: flex;
		margin: 4px;
		min-height: 6rem;
		border-radius: 10px;
		background-color: rgb(255, 255, 255, 0.9);
	}

	.calendar-content view img {
		height: 50px;
		width: 50px;
	}

	.left {
		border-top-left-radius: 10px;
		border-bottom-left-radius: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 30%;
	}

	.left text {
		font-size: 1rem;
		font-weight: bold;
	}

	.right {
		border-top-right-radius: 10px;
		border-bottom-right-radius: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 70%;

	}

	.right .title {
		font-size: 1.5rem;
		font-weight: bold;

	}

	.right .content {
		font-size: 18px;
		margin: 5px;
	}
</style>