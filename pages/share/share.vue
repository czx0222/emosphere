<template>
	<view class='backarea'>
		<view class="top-box">
			<view class="tui-arrow"  @click="getback"><tui-icon name="arrowleft" :size="30" color="#488C88"  bold="true" style="margin-top: 20rpx;"></tui-icon></view>
			<button size="default" type="default" 
				style="color:#ffffff;backgroundColor:#488C88;borderColor:#488C88;margin-right: 10rpx;margin-top: 30rpx;border-radius: 20px;" @click="savadata">发布</button>
		</view>
		
		<view class="text-area">
			<view class="content">
				<input type="text" placeholder="What's your emotion?" v-model="Content">
			</view>
			<view class="photo">
				<button class="circle"><img src="/static/images/jiahao.png" alt="" /></button>
			</view>
		</view>
	</view>
	
	 <!-- <view class="photo">
	    上传图片 -->
	    <!-- <view class="shangchuan">
	      <view class="sc2" v-for="(item, index) in imgList" :key="index">
	        <image class="del" @click="del(index)" mode=""></image>
	        <image class="Img3" :src="item" mode=""></image>
	      </view>
	      <view class="sc2" v-if="imgList.length < 3" @click="upload">
	        <image class="sc3" mode=""></image>
	      </view>
	    </view>
	  </view> --> 
</template>

<script setup>
	import {useRouter} from 'vue-router';
	import store from '@/store';
	import {ref} from 'vue';
	const router = useRouter();
	const getback = () => {
		router.push('/pages/space/space');
	}
	const userid = ref(store.getters.getUserId).value;
	const Content = ref('');
	const savadata = () => {
		const data = {
			uid: userid,
			content: Content.value,
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
			}
		});
	};
	const imgList = ref([]);
	
	const upload = () => {
	  uni.chooseImage({
	    count: 3,
	    sizeType: ['original', 'compressed'],
	    sourceType: ['album'],
	    loop: true,
	    success: (res) => {
	      console.log(res);
	      if (res.tempFilePaths.length !== 0) {
	        imgList.value.push(res.tempFilePaths[0]);
	        console.log(JSON.stringify(res.tempFilePaths));
	        var tempFilePaths = res.tempFilePaths;
	        console.log(tempFilePaths);
	        console.log(tempFilePaths[0]);
	      }
	    }
	  });
	};
	
	const del = (index) => {
	  imgList.value.splice(index, 1);
	  console.log(imgList.value);
	};
</script>

<style lang="scss" scoped>
	.container {
		padding-bottom: 120rpx;
		box-sizing: border-box;
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
		padding: 80rpx 90rpx 60rpx 90rpx;
		box-sizing: border-box;
	}
	
	.text-area {
		width: 90%;
		position: relative;
		top: 2rem;
	}
	
	.title {
		font-size: 34rpx;
		color: #333;
		font-weight: 500;
	}
	
	.sub-title {
		font-size: 24rpx;
		color: #7a7a7a;
		padding-top: 18rpx;
	}
	.tui-title {
		width: 100%;
		padding: 50rpx 30rpx 30rpx;
		box-sizing: border-box;
		font-weight: bold;
	}
	.tui-header-bg {
		width: 100%;
		margin: 0;
	}
	.tui-header-img {
		width: 100%;
		height: 440rpx;
		display: block;
	}
	.tui-header-icon {
		width: 100%;
		position: fixed;
		top: 0;
		padding: 0 12rpx;
		display: flex;
		align-items: center;
		height: 32px;
		transform: translateZ(0);
		z-index: 99999;
		box-sizing: border-box;
	}
	
	.top-box {
		width: 100%;
		height: 44px;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		margin-top: 10rpx;
	}
	.tui-arrow {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}
	
	.tui-search-box {
		width: 100%;
		height: 32px;
		margin: 0 28rpx;
		border-radius: 18px;
		font-size: 14px;
		background-color: #f1f1f1;
		padding: 0 12px;
		box-sizing: border-box;
		color: #bfbfbf;
		display: flex;
		align-items: center;
	}
	
	.tui-bg-white {
		background-color: #ffffff !important;
	}
	.tui-search-text {
		padding-left: 10rpx;
	}
	
	.tui-notice-box {
		position: relative;
		flex-shrink: 0;
		font-size: 44rpx;
		color: #fff;
	}
	
	#building {
		background-image: url('/static/images/back2.png');
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		width: 100%;
		height: 100vh;
	}

	.slot-wrap {
		width: 150rpx
	}

	.arrow-style {
		margin-left: 30rpx;
	}

	.text-style {
		margin-left: 30rpx;
		margin-right: 30rpx;
		margin-top: 180rpx;
		height: 200px;
	}

	.update-style {
		padding-top: 30rpx;
		margin-left: 30rpx;
	}

	.title-input {
		border-bottom: 1px solid #F5F5F5;
		margin: 20rpx 0;
		padding: 20rpx 0;
	}

	.content-display {
		width: 100%;
		padding: 20rpx 0;
		min-height: 300rpx;
	}

	.choose-item {
		display: flex;
		align-items: center;
		padding: 20rpx;
		border-bottom: 1px solid #F5F5F5;

		&:last-child {
			border: 0;
		}

		.txt {
			margin-left: 20rpx;
		}

		.sw {
			margin-left: 300rpx;
		}

		.inputStyle {
			margin-left: 60rpx;
			width: 400rpx;
		}

		.radio {
			margin-left: 320rpx;
		}

		.icon {
			width: 40rpx;
			height: 40rpx;
		}

		.u-icon {
			margin-left: auto;
			color: #999;
		}

		.add-icon {
			margin-left: 0;
		}
	}

	.button-style {
		margin-top: 50rpx;
		color: #F4F4F5;
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
	
	.title {
		background-color: rgb(255, 255, 255, 0.8);
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		min-height: 15px;
		padding: 8px;
	}
	
	.content {
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		border-bottom-left-radius: 20px;
		border-bottom-right-radius: 20px;
		background-color: rgb(255, 255, 255, 0.8);
		min-height: 10rem;
		padding: 8px;
	}
	
	.photo {
		border-radius: 20px;
		background-color: rgb(255, 255, 255, 0.8);
		margin-top: 1rem;
		width: 40%;
		height: 9rem;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
	}
	
	.circle img {
		width: 40px;
		height: 40px;
	}
	
	.shangchuan {
			width: 90%;
			height: 200rpx;
			margin: 0 auto;
			display: flex;
			align-items: center;
			.sc2 {
				width: 30%;
				height: 90%;
				border-radius: 10rpx;
				background-color: #dadfef;
				text-align: center;
				line-height: 240rpx;
				margin: 0 10rpx;
				position: relative;
				// background-color: #4CD964;
			}
			.Img3 {
				width: 100%;
				height: 100%;
				border-radius: 10rpx;
			}
			.del {
				width: 32rpx;
				height: 32rpx;
				position: absolute;
				z-index: 1000;
				top: 0rpx;
				right: 0;
			}
			.sc3 {
				width: 96rpx;
				height: 96rpx;
				border-radius: 10rpx;
			}
		}
</style>