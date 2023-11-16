<template>
	<view class="uPImg">
		<view class="Img">上传照片 :</view>
		<!-- 上传图片 -->
		<view class="shangchuan">
			<view class="sc2" v-for="(item, index) in imgList" :key="index">
				<image class="del" @click="del(index)" src="/static/things/删除.png" mode=""></image>
				<image class="Img3" :src="item" mode=""></image>
			</view>
			<view class="sc2" v-if="imgList.length < 1" @click="upload">
				<image class="sc3" src="/static/things/加号.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgList: []
			};
		},
		methods: {
			// 点击上传图片
			upload() {
				uni.chooseImage({
					count: 3,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					loop: true,
					success: (res) => {
						console.log(res);
						if (res.tempFilePaths.length != 0) {
							this.imgList.push(res.tempFilePaths[0]);
							var tempFilePaths = res.tempFilePaths;
							// uni.uploadFile({
							// 	url: 'http://douzhuoqianshouba.xieenguoji.com/api/ajax/upload',
							// 	filePath: tempFilePaths[0],
							// 	name: 'file',
							// 	success: (uploadFileRes) => {
							// 	},
							// 	fail: (err) => {
							// 		console.log(err);
							// 	}
							// });
						}
					}
				});
			},
			// 删除图片
			del(index) {
				this.imgList.splice(index, 1);
				console.log(this.imgList);
			},
		}
	};
</script>
<style lang="scss">
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