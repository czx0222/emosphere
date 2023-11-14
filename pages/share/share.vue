<template>
	<div id='building'>
		<!-- 		<u-navbar :is-back="false" title="" height=80 leftIconSize=25 leftIconColor="#488C88"
			:bgColor="`rgb(255 255 255 / 0%)`">
			<view class="slot-wrap" slot="right">
				<u-button color=#488C88 shape="circle" text="分享">
				</u-button>
			</view>
		</u-navbar> -->

		<!-- 		<u-textarea v-model="value1" placeholder="What's your emotion" count="true" class="text-style">
		</u-textarea> -->
		<!-- 		<u-upload :fileList="fileList6" @afterRead="afterRead" @delete="deletePic" name="6" multiple :maxCount="1"
			width="130" height="130" class="update-style" uploadText="上传图片" uploadIcon="plus-circle-fill"
			uploadIconColor="#488C88">

		</u-upload> -->
	</div>
</template>

<script>
	// export default {
	// 	data() {
	// 		return {
	// 			btnStyle: {

	// 				color: "#fff",
	// 				backgroundColor: '#333333'
	// 			},
	// 			// uploadImgUrl: this.$c.domain + 'common/upload',
	// 			form: {
	// 				title: '',
	// 				type: 1,
	// 				topicId: 2,
	// 				discussId: '',
	// 				content: '',
	// 				media: [],
	// 				longitude: 0,
	// 				latitude: 0,
	// 				address: '',
	// 				cut: 0, //分类id
	// 				pay: '',
	// 			},
	// 			cateName: '',
	// 			header: {
	// 				token: uni.getStorageSync('token')
	// 			},
	// 			fileList1: [],
	// 		};
	// 	},
	// 	onLoad(options) {
	// 		if (!uni.getStorageSync("hasLogin")) {
	// 			this.$u.toast('请先登录哦');
	// 		}
	// 	},
	// 	methods: {
	// 		deletePic(event) {
	// 			this[`fileList${event.name}`].splice(event.index, 1)
	// 		},
	// 		async afterRead(event) {
	// 			let lists = [].concat(event.file)
	// 			let fileListLen = this[`fileList${event.name}`].length
	// 			lists.map((item) => {
	// 				this[`fileList${event.name}`].push({
	// 					...item,
	// 					status: 'uploading',
	// 					message: '上传中'
	// 				})
	// 			})
	// 			for (let i = 0; i < lists.length; i++) {
	// 				const result = await this.uploadFilePromise(lists[i].url)
	// 				let item = this[`fileList${event.name}`][fileListLen]
	// 				this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
	// 					status: 'success',
	// 					message: '',
	// 					url: result
	// 				}))
	// 				fileListLen++
	// 			}
	// 		},
	// 		uploadFilePromise(url) {
	// 			return new Promise((resolve, reject) => {
	// 				let a = uni.uploadFile({
	// 					url: 'http://192.168.2.21:7001/upload',
	// 					filePath: url,
	// 					name: 'file',
	// 					formData: {
	// 						user: 'test'
	// 					},
	// 					success: (res) => {
	// 						setTimeout(() => {
	// 							resolve(res.data.data)
	// 						}, 1000)
	// 					}
	// 				});
	// 			})
	// 		},
	// 		chooseClass() {
	// 			uni.navigateTo({
	// 				url: "category"
	// 			})
	// 		},
	// 		uploadImg() {

	// 			if (!this.form.content) {
	// 				this.$u.toast('内容不能为空');
	// 				return;
	// 			}
	// 			if (!this.form.title) {
	// 				this.$u.toast('标题不能为空');
	// 				return;
	// 			}

	// 			uni.showLoading({
	// 				mask: true,
	// 				title: '发布中'
	// 			});
	// 			this.$refs.uUpload.upload();
	// 		},

	// 		submit(e) {
	// 			uni.showLoading({
	// 				mask: true,
	// 				title: '发布中'
	// 			});

	// 			let mediaList = [];
	// 			e.forEach(function(item, index) {
	// 				mediaList.push(item.response.result);
	// 			});

	// 			this.form.media = mediaList;

	// 			this.$H.post('post/addPost', this.form).then(res => {
	// 				if (res.code == 0) {
	// 					uni.redirectTo({
	// 						url: '/pages/post/post?id=' + res.result
	// 					});
	// 				}
	// 				uni.hideLoading();
	// 			});
	// 		}
	// 	}
	// };
</script>

<style lang="scss" scoped>
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
</style>