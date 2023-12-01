<template>
	<view class="backarea">
		<view class="box" style="width: 100%;height: 5%;"></view>
		<view class="header">
			<view class="left" @click="getback">
				<image src="/static/images/fanhui.png"></image>
				<text>返回</text>
			</view>
			<view class="right" @click="savadata">
				<image src="/static/images/gou.png"></image>
				<text>保存</text>
			</view>
		</view>
		<view class="emo">
			<text>今日情绪记录</text>
			<div class="icon-list">
				<li v-for="(iconName, index) in emotionIcons" :key="index" @click="selectIcon(iconName)">
					<image :src="`/static/images/qingxu-${iconName}.png`" :class="{ 'selected': isSelected(iconName) }" ></image>
				</li>
			</div>
		</view>
		<view class="things">
			<text>今日事件记录</text>
			<div class="thing-list">
				<li>
					<div class="circle"><image src='/static/images/jiahao.png'></image></div>
					<span>添加</span>
				</li>
				<li>
					<div class="circle"><image src='/static/images/lvhang.png'></image></div>
					<span>旅行</span>
				</li>
				<li>
					<div class="circle"><image src='/static/images/bangqiu.png'></image></div>
					<span>运动</span>
				</li>
				<li>
					<div class="circle"><image src='/static/images/meishi1.png'></image></div>
					<span>美食</span>
				</li>
				<li>
					<div class="circle"><image src='/static/images/shuijue.png'></image></div>
					<span>睡觉</span>
				</li>
				<li>
					<div class="circle"><image src='/static/images/xingquaihao1.png'></image></div>
					<span>爱好</span>
				</li>
				<li>
					<div class="circle"><image src='/static/images/xinsui.png'></image></div>
					<span>失恋</span>
				</li>
				<li>
					<div class="circle"><image src='/static/images/xuexi.png'></image></div>
					<span>学习</span>
				</li>
				<li>
					<div class="circle"><image src='/static/images/jinianri3.png'></image></div>
					<span>纪念日</span>
				</li>
				<li>
					<div class="circle"><image src='/static/images/yueduliang.png'></image></div>
					<span>阅读</span>
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

				<view class="shangchuan">
					<view class="sc2" v-for="(item, index) in imageList" :key="index">
						<image class="del" @click="del(index)" src="/static/images/shanchu.png" mode=""></image>
						<image class="image3" :src="item" mode=""></image>
					</view>
					<view class="sc2" v-if="imageList.length < 1" @click="upload">
						<image class="sc3" src="/static/images/jiahao.png" mode=""></image>
					</view>
				</view>
		</view>
	</view>
</template>

<script setup>
	import {ref} from 'vue';
	import { useRouter } from 'uni-mini-router'
	let router = useRouter()
	import store from '@/store';

	const emotionIcons = store.getters.getEmotionIcons;
	let Icon = null;

	const getback = () => {
		router.replace('/pages/main/main');
	};
	const selectIcon = (iconName) => {
		Icon = Icon === iconName ? null : iconName;
		console.log('选中的图标：', Icon);
	};

	const isSelected = (iconName) => {
		return Icon === iconName;
	};

	const userid = store.getters.getUserId;
	let Title = '';
	let Content = '';
	const savadata = () => {
		const data = {
			uid: userid,
			mood: Icon,
			title: Title,
			content: Content,
		};
		console.log(data);
		uni.request({
			url: 'http://8.136.81.197:8080/mood_record',
			method: 'POST',
			data: data,
			success: (response) => {
				console.log(response.data);
				router.replace('/pages/calendar/calendar');
			},
			fail: (error) => {
				console.error('保存失败', error);
			},
		});
	};

	const imageList = ref([]);
	const upload = () => {
		uni.chooseImage({
			count: 3,
			sizeType: ['original', 'compressed'],
			sourceType: ['album'],
			loop: true,
			success: (res) => {
				console.log(res);
				if (res.tempFilePaths.length !== 0) {
					imageList.value.push(res.tempFilePaths[0]);
					var tempFilePaths = res.tempFilePaths;
				}
			},
		});
	};

	// 删除图片
	const del = (index) => {
		imageList.value.splice(index, 1);
		console.log(imageList);
	};
</script>


<style>



	.shangchuan {
		position: relative;
		top: 1rem;
		border-radius: 10px;
		align-items: center;
		display: flex;
		justify-content: center;
		width: 50%;
		height: 150px;
		box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
		background-color: rgba(255, 255, 255, 0.8); 
	}
	.sc2 {
		text-align: center;
		width: 95%;
		height: 95%;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 10px;
	}

	.image3 {
		border-radius: 10px;
		width: 100%;
		height: 100%;
	}
	.del {
		width: 50rpx;
		height: 50rpx;
		position: absolute;
		z-index: 1000;
		top: 5px;
		right: 5px;
	}

	.sc3 {
		width: 96rpx;
		height: 96rpx;
		
	}

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
	.header image {
		width: 30px;
		height: 30px;
	
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

	.icon-list li image {
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

	.circle image {
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


</style>