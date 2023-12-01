<template>
	<view class="backarea">
		<view class="box" style="width: 100%;height: 5%;"></view>
		<view class="header">
			<view class="head-left" @click="fan">
				<image src="/static/images/fanhui.png"></image>
				<text>返回</text>
			</view>
			<view class="head-right" @click="test">
				<button class="btn">生成报告</button>
			</view>
		</view>
		<tmt-calendar :show="true" @changeDate="changeDate"></tmt-calendar>
		<view class="calendar-content">
			<template v-for="(record, index) in records" :key="index">
				<view class="v">
					<view class="left">
						<text class="time">{{ formatDate(record.createDate) }}</text>
						<image :src="'/static/images/qingxu-' + record.mood + '.png'" alt=""></image>
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
		ref,
		onMounted
	} from 'vue';
	import {
		useRouter
	} from 'uni-mini-router'
	let router = useRouter()

	const records = ref([]);
	const emotionIcons = store.getters.getEmotionIcons;

	const formatDate = (dateString) => {
		const originalDate = new Date(dateString);
		const month = originalDate.getMonth() + 1;
		const day = originalDate.getDate();
		return `${month}月${day}日`;
	};
	const fan = () => {
		router.replace('/pages/main/main')
	}
	const getemo = () => {
		uni.request({
			url: 'http://8.136.81.197:8080/mood_record',
			data: {
				uid: store.state.userId,
				nums: 3,
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
	const test = ()=>{
		let date = new Date().toISOString().substr(0, 10);
		console.log(store.state.userId+date)
		const data = {
			message:"666"
		}
		uni.request({
			url:"http://8.136.81.197:8080/mood_record/day",
			method: 'GET',
			data:{
				uid:store.state.userId,
				date:date
			},

			success: (res) => {
				console.log(res.data);
				let today_record = res.data['record'];
				console.log(today_record.content)
				uni.request({
					url:'http://localhost:8080/class/',
					method: 'POST',
					data:data,
				success: (r) => {
					
					console.log(r.data)
				}
				})
			},
			fail: (error) => {
				uni.showToast({
					title: '获取失败'
				});
			}
		})
	}
	onMounted(() => {
		getemo();
	});
</script>


<style>
	.btn {
		color: #ffffff;
		background-color: rgb(72, 140, 136, 0.5);
		border-color: #488C88;
		border-radius: 10px;
		font-weight: bold;
	}
	.backarea {
		display: flex;
		flex-direction: column;
		background-image: url('/static/images/back2.png');
		background-size: cover;
		background-repeat: no-repeat;
		width: 100%;
		height: 110vh;
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

	.head-left image {
		width: 30px;
		height: 30px;
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
		top: 2rem;
		width: 90%;
	}

	.v {
		display: flex;
		margin: 4px;
		min-height: 6rem;
		border-radius: 10px;
		background-color: rgb(255, 255, 255, 0.9);
	}

	.calendar-content view image {
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