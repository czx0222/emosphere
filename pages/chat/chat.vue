


<template>
	<view  class="box" ></view>
	<view class="backarea">
		
		<view class="header">
			<navigator url="/pages/main/main">
				<view class="head-left">
					<image src="/static/images/fanhui.jpg"></image>
					<text>返回</text>
				</view>
			</navigator>
			<navigator url="/pages/home/home">
				<view class="head-right">
					<image src="/static/images/test.png"></image>
					<text>测试</text>
				</view>
			</navigator>
		</view>
		<view class="chat">
			<scroll-view :style="{height: `${windowHeight-inputHeight}rpx`}" id="scrollview" scroll-y="true"
				:scroll-top="scrollTop" class="scroll-view">
				<!-- 聊天主体 -->
				<view id="msglistview" class="chat-body">
					<!-- 聊天记录 -->
					<view v-for="(item,index) in msgList" :key="index">
						<!-- 自己发的消息 -->
						<view class="item self" v-if="item.userContent != ''">
							<!-- 文字内容 -->
							<view class="content right">
								{{item.userContent}}
							</view>
							<view class="avatar">
								<image src="/static/images/logo.png" ></image>
							</view>
						</view>
						<!-- 机器人发的消息 -->
						<view class="item Ai" v-if="item.botContent != ''">
							<!-- 头像 -->
							<view class="avatar">
								<image src="/static/images/ai.png" ></image>
							</view>
							<!-- 文字内容 -->
							<view class="content left">
								{{item.botContent}}
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<view class="chat-bottom" :style="{height: `${inputHeight}rpx`}">
				<view class="send-msg" :style="{bottom:`${keyboardHeight}rpx`}">
					<view class="uni-textarea">
						<textarea v-model="chatMsg" maxlength="300" confirm-type="send" @confirm="handleSend"
							:show-confirm-bar="false" :adjust-position="false" @linechange="sendHeight" @focus="focus"
							@blur="blur" auto-height></textarea>
					</view>
					<button @click="handleSend" class="send-btn">发送</button>
				</view>
			</view>
		</view>
	</view>


</template>
<script>
	export default {
		data() {
			return {
				keyboardHeight: 0,

				bottomHeight: 0,
				scrollTop: 0,
				userId: '',
				chatMsg: "",
				msgList: [{
						botContent: "hello，请问我有什么可以帮助你的吗？",
						recordId: 0,
						titleId: 0,
						userContent: "",
						userId: 0
					},
					{
						botContent: "",
						recordId: 0,
						titleId: 0,
						userContent: "",
						userId: 0
					},
				]
			}
		},
		updated() {
			this.scrollToBottom();
		},
		computed: {
			windowHeight() {
				return this.rpxTopx(uni.getSystemInfoSync().windowHeight)
			},
			inputHeight() {
				return this.bottomHeight + this.keyboardHeight
			}
		},
		onLoad() {
			uni.onKeyboardHeightChange(res => {
				this.keyboardHeight = this.rpxTopx(res.height - 30)
				if (this.keyboardHeight < 0) this.keyboardHeight = 0;
			})
		},
		onUnload() {
			uni.offKeyboardHeightChange()
		},
		methods: {
			focus() {
				this.scrollToBottom()
			},
			blur() {
				this.scrollToBottom()
			},
			rpxTopx(px) {
				let deviceWidth = wx.getSystemInfoSync().windowWidth
				let rpx = (750 / deviceWidth) * Number(px)
				return Math.floor(rpx)
			},
			sendHeight() {
				setTimeout(() => {
					let query = uni.createSelectorQuery();
					query.select('.send-msg').boundingClientRect()
					query.exec(res => {
						this.bottomHeight = this.rpxTopx(res[0].height)
					})
				}, 10)
			},
			scrollToBottom(e) {
				setTimeout(() => {
					let query = uni.createSelectorQuery().in(this);
					query.select('#scrollview').boundingClientRect();
					query.select('#msglistview').boundingClientRect();
					query.exec((res) => {
						if (res[1].height > res[0].height) {
							this.scrollTop = this.rpxTopx(res[1].height - res[0].height)
						}
					})
				}, 15)
			},
			async handleSend() {
			    if (!this.chatMsg || !/^\s+$/.test(this.chatMsg)) {
			        let obj = {
			            botContent: "",
			            recordId: 0,
			            titleId: 0,
			            userContent: this.chatMsg,
			            userId: 0
			        };
			        console.log(this.chatMsg);
			        try {
			            const response = await uni.request({
			                url: 'http://192.168.43.143:8080/api/',
			                method: 'POST',
			                data: {
			                    message: this.chatMsg
			                },
			                header: {
			                    'content-type': 'application/json',
			                }
			            });
			
			            const serverResponse = response.data;
			            obj.botContent = serverResponse.message;
			            this.msgList.push(obj);
			            this.chatMsg = '';
			            this.scrollToBottom();
						uni.showToast({
							title: '发送成功',
							icon: 'none'
						});
			            console.log('发送成功:', serverResponse);
			        } catch (error) {
			            console.error(':', error);
						uni.showToast({
							title: '发送消息失败',
							icon: 'none'
						});
			            this.$modal.showToast('发送消息失败');
			        }
			    } else {
			        this.$modal.showToast('不能发送空白消息');
			    }
			},
		}
	}
</script>
<style lang="scss" scoped>
	$chatContentbgc: #C2DCFF;
	$sendBtnbgc: #4F7DF5;
	
	.backarea{
		position: relative;
		width: 100%;
		height: 110vh;
		
	}

	a {
		text-decoration: none;
		color: inherit;
	}
	.box{
		 width: 100%;height: 5%; 
		 position: fixed;  
		 background-color:#F6F6F6;
		 z-index: 99; 
		 top: 0;
	}
	.header {
		z-index: 99;
		display: flex;
		justify-content: space-between;
		position: fixed;
		width: 100%;
		padding: 10px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		background-color:#F6F6F6;


	}

	.header image {
		height: 30px;
		margin-right: 10px;
		width: 30px;
	}

	.header text {
		color: black;
		font-size: 1rem;
		font-weight: 550;
	}

	.head-left,
	.head-right {
		display: flex;
		align-items: center;
	}

	/* 聊天消息 */
	.chat {
		padding-top:100rpx;
		margin-top: 80rpx;
		.scroll-view {
			::-webkit-scrollbar {
				display: none;
				width: 0 !important;
				height: 0 !important;
				-webkit-appearance: none;
				background: transparent;
				color: transparent;
			}

			// background-color: orange;
			background-color: #F6F6F6;

			.chat-body {
				display: flex;
				flex-direction: column;
				padding-top: 23rpx;
				// background-color:skyblue;

				.self {
					justify-content: flex-end;
				}

				.item {
					display: flex;
					padding: 23rpx 30rpx;
					// background-color: greenyellow;

					.right {
						background-color: $chatContentbgc;
					}

					.left {
						background-color: #FFFFFF;
					}

					// 聊天消息的三角形
					.right::after {
						position: absolute;
						display: inline-block;
						content: '';
						width: 0;
						height: 0;
						left: 100%;
						top: 10px;
						border: 12rpx solid transparent;
						border-left: 12rpx solid $chatContentbgc;
					}

					.left::after {
						position: absolute;
						display: inline-block;
						content: '';
						width: 0;
						height: 0;
						top: 10px;
						right: 100%;
						border: 12rpx solid transparent;
						border-right: 12rpx solid #FFFFFF;
					}

					.content {
						position: relative;
						max-width: 486rpx;
						border-radius: 8rpx;
						word-wrap: break-word;
						padding: 24rpx 24rpx;
						margin: 0 24rpx;
						border-radius: 5px;
						font-size: 32rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
						line-height: 42rpx;
					}

					.avatar {
						display: flex;
						justify-content: center;
						width: 78rpx;
						height: 78rpx;
						border-radius: 8rpx;
						overflow: hidden;

						image {
							align-self: center;
						}

					}
				}
			}
		}

		.chat-bottom {



			.send-msg {
				display: flex;
				align-items: flex-end;
				padding: 16rpx 30rpx;
				width: 100%;
				min-height: 100rpx;
				position: fixed;
				bottom: 0;
				background: #EDEDED;
				transition: all 0.1s ease;
			}

			.uni-textarea {
				padding-bottom: 20rpx;

				textarea {
					width: 537rpx;
					min-height: 75rpx;
					max-height: 300rpx;
					background: #FFFFFF;
					border-radius: 8rpx;
					font-size: 32rpx;
					font-family: PingFang SC;
					color: #333333;
					line-height: 43rpx;
					padding: 5rpx 8rpx;
				}
			}

			.send-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: 20rpx;
				margin-left: 25rpx;
				width: 128rpx;
				height: 75rpx;
				background: $sendBtnbgc;
				border-radius: 8rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 28rpx;
			}
		}
	}
</style>