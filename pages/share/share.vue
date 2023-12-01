<template>
	<view class="backarea">
		<view class="box" style="width: 100%;height: 5%;"></view>
		<view class="header">
			<view class="left" @click="getback">
				<image src="/static/images/fanhui.png"></image>
				<text>返回</text>
			</view>
			<view class="right" @click="savadata">
				<button class="btn">发布</button>
			</view>
		</view>
		<view class="text-area">
			<view class="content">
				<textarea placeholder="What's your emotion?" v-model="Content"></textarea>
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
	import {
		ref
	} from 'vue';
	import {
		useRouter
	} from 'uni-mini-router'
	import store from '@/store';
	let router = useRouter()
	const getback = () => {
		router.replace('/pages/space/space');
	};
	let imageurl
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
					uni.uploadFile({
						url: 'http://8.136.81.197:8080/qiniu/file',
						filePath: tempFilePaths[0],
						name: 'file',
						success: function(res) {
							console.log(res.data)
							const responseData = JSON.parse(res.data);
							imageurl = responseData.url
						},
						fail: function(res) {
							console.log(res.errMsg)
						}
					});
				}
			},
		});
	};

	// 删除图片
	const del = (index) => {
		imageList.value.splice(index, 1);
		console.log(imageList);
	};
	const userid = store.getters.getUserId;
	let Title = '';
	let Content = '';
	let date = new Date().toISOString().substr(0, 10);
	console.log(imageurl)
	const savadata = () => {
		const data = {
			uid: 5,
			content: Content,
			illustration: imageurl,
			createDate: date
		};
		console.log(data);
		uni.request({
			url: 'http://8.136.81.197:8080/post',
			method: 'POST',
			data: data,
			success: (response) => {
				console.log(response.data);
			},
			fail: (error) => {
				console.error('发布失败', error);
			},
		});
		// router.replace('/pages/space/space');
	};
</script>


<style >

	.text-area {
		width: 90%;
		position: relative;
		top: 2rem;
	}

	.content {
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		border-bottom-left-radius: 20px;
		border-bottom-right-radius: 20px;
		background-color: rgb(255, 255, 255, 0.8);
		min-height: 12rem;
		padding: 8px;
	}

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
		background-position: center;
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
</style>