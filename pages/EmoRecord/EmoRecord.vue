<template>
	<view class="backarea">
		<view class="header">
			<view class="left" @click="getback">
				<img src="/static/images/fanhui.png" />
				<text>返回</text>
			</view>
			<view class="right" @click="savadata">
				<img src="/static/images/gou.png" />
				<text>保存</text>
			</view>
		</view>
		<view class="emo">
			<text>今日情绪记录</text>
			<div class="icon-list">
				<li v-for="(iconName, index) in emotionIcons" :key="index" @click="selectIcon(iconName)">
					<img :src="`/static/images/qingxu-${iconName}.png`" :class="{ 'selected': isSelected(iconName) }" />
				</li>
			</div>
		</view>
		<view class="things">
			<text>今日事件记录</text>
			<div class="thing-list">
				<li>
					<div class="circle"><img src='/static/things/加号.png'></div>
					<span>添加</span>
				</li>
				<li>
					<div class="circle"><img src='/static/things/lvhang.png'></div>
					<span>添加</span>
				</li>
				<li>
					<div class="circle"><img src='/static/things/bangqiu.png'></div>
					<span>添加</span>
				</li>
				<li>
					<div class="circle"><img src='/static/things/meishi1.png'></div>
					<span>添加</span>
				</li>
				<li>
					<div class="circle"><img src='/static/things/shuijue.png'></div>
					<span>添加</span>
				</li>
				<li>
					<div class="circle"><img src='/static/things/xingquaihao1.png'></div>
					<span>添加</span>
				</li>
				<li>
					<div class="circle"><img src='/static/things/xinsui.png'></div>
					<span>添加</span>
				</li>
				<li>
					<div class="circle"><img src='/static/things/xuexi.png'></div>
					<span>添加</span>
				</li>
				<li>
					<div class="circle"><img src='/static/things/jinianri3.png'></div>
					<span>添加</span>
				</li>
				<li>
					<div class="circle"><img src='/static/things/yueduliang.png'></div>
					<span>添加</span>
				</li>
			</div>
		</view>
		<view class="text-area">
			<view class="title">
				<input type="text" placeholder="今天心情怎么样" v-model="Title">
			</view>

			<view class="content">
				<input type="text" placeholder="请具体描述" v-model="Content">
			</view>
			<view class="photo">
				<button class="circle"><img src="/static/things/加号.png" alt="" /></button>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		useRouter
	} from 'vue-router';
	import store from '@/store';
	import {
		ref
	} from 'vue';
	const emotionIcons = store.getters.getEmotionIcons;
	console.log(emotionIcons)
	let Icon = null;
	const router = useRouter();
	const getback = () => {
		router.push('/pages/main/main');
	}
	const selectIcon = (iconName) => {
		Icon = Icon === iconName ? null : iconName;
		console.log('选中的图标：', Icon);
	};
	const isSelected = (iconName) => {
		return Icon === iconName;
	};
	const userid = ref(store.getters.getUserId).value
	const Title = ref('');
	const Content = ref('')
	const savadata = () => {

		
		const data = {
			uid: userid,
			mood: Icon,
			title: Title.value,
			content: Content.value,
		};
		console.log(data);
		uni.request({
			url: 'http://8.136.81.197:8080/mood_record',
			method: 'POST',
			data: data,
			success: (response) => {
				console.log(response.data);
			},
			fail: (error) => {
				console.error('保存失败', error);
			}
		});
	};
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

	.left {
		display: flex;
		align-items: center;
		float: left;
	}

	.right {
		display: flex;
		align-items: center;
	}

	.emo {
		display: flex;
		flex-direction: column;
		/* 设置为列布局，让文本和图标垂直排列 */
		width: 90%;
		top: 2rem;
		position: relative;
	}

	.emo text {
		font-size: 1.5rem;
		font-weight: bold;
		color: #000;

	}

	.icon-list {
		margin-top: 1rem;
		display: flex;
		justify-content: space-between;
		width: 100%;
		/* 调整宽度适配图标大小 */
	}

	.icon-list li {
		list-style-type: none;
	}

	.icon-list li img {
		cursor: pointer;
		width: 50px;
		height: 50px;
	}

	.things {
		display: flex;
		flex-direction: column;
		/* 设置为列布局，让文本和图标垂直排列 */
		width: 90%;
		top: 3.5rem;
		position: relative;
	}

	.things text {
		font-size: 1.5rem;
		font-weight: bold;
		color: #000;

	}

	.thing-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.circle {
		position: relative;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background-color: rgba(0, 0, 0, 0.3);
		box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
		margin: 5px;
		margin-bottom: 2px;
		display: flex;
		align-items: center;
		justify-content: center;

	}

	.circle img {
		width: 40px;
		height: 40px;
	}

	.thing-list li {
		flex-direction: column;
		display: flex;

		align-items: center;
		justify-content: center;
	}

	.thing-list li span {
		font-size: 12px;
		font-weight: bold;
		color: #fff;
	}

	.text-area {
		width: 90%;
		position: relative;
		top: 5rem;

	}

	.title {
		background-color: rgb(255, 255, 255, 0.8);
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		min-height: 15px;
		padding: 8px;

	}

	.content {
		border-bottom-left-radius: 20px;
		border-bottom-right-radius: 20px;
		background-color: rgb(255, 255, 255, 0.8);
		min-height: 6rem;
		padding: 8px;
	}

	.photo {
		border-radius: 20px;
		background-color: rgb(255, 255, 255, 0.8);
		margin-top: 1rem;
		width: 50%;
		height: 9rem;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
	}
</style>