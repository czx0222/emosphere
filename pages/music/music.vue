<template>
	<view class="scrollPage">
		<view class="box" style="width: 100%;height: 5%;"></view>
		<view class="header">
			<router-link to="/pages/main/main">
				<image src="/static/images/fanhui.png"></image>
			</router-link>
			<router-link to="">
				<image class="choose" src="/static/images/mm.png"></image>
			</router-link>

			<router-link to="/pages/relax/relax">
				<image src="/static/images/fenche.png"></image>
			</router-link>

			<router-link to="">
				<image src="/static/images/recode.png"></image>
			</router-link>
		</view>
		<view class="radius-lg">
			<view class="bg-white padding-bottom radius-xl" style="text-align: center;">

				<view class="padding-lr margin-xxl" style="height: 15rem; margin-bottom: 40px">
					<image class="shadow-blur bg-image radius-lg" style="" :src="audioData[now].song_image"></image>
				</view>
				<view class="text-xl text-black text-center" style="font-size: 24px;">{{audioData[now].name}}</view>
				<view class="text-center padding-top-sm">
					<text class="text-sm text-gray text-center"
						style="font-size:20px">{{audioData[now].singername}}</text>
				</view>
				<view class="margin-top-xl text-center text-xxxl text-black padding-top-lg">
					<a-button type="link" ghost @click="updateWay()">
						<image v-if="playWay==2" class="iconbtn" src="/static/images/suijibofang.png" />
						<image v-if="playWay==1" class="iconbtn" src="/static/images/xunhuanbofang.png" />
						<image v-if="playWay==0" class="iconbtn" src="/static/images/danquxunhuan.png" />
					</a-button>
					<a-button type="link" ghost @click="like_ornot(now)">
						<text v-if="audioData[now].like==1" class="cuIcon-likefill text-red padding-lr-xl iconbtn"
							alt></text>
						<text v-if="audioData[now].like==0" class="cuIcon-like padding-lr-xl iconbtn" alt></text>
					</a-button>
					<gscosmos-dialog v-model="dialogData.visiable" :endStyle="dialogData.endStyle"
						:fromPoi="dialogData.fromPoi" :title="'播放列表'" @closed="closed">
						<view class="content">
							<view class="list" :class="{active:key===now}" v-for="(item,key) in audioData" :key="key"
								@click="now = key">{{key+1}} . {{audioData[key].name}}</view>
						</view>
					</gscosmos-dialog>
					<image class="iconbtn" @click="dialogData.visiable = true" src="/static/images/bofangliebiao.png" />
				</view>
				<view class="content">
					<imt-audio autoplay="true" continue="true" :playWay="playWay" :src="audioData[now].file"
						:duration="audioData[now].file.duration" @prev="now = now === 0?audioData.length-1:now-1"
						@next="now = now === audioData.length-1?0:now+1">
					</imt-audio>
				</view>
			</view>
			<view class="flex">
				<view class="padding-right-sm" style="padding: 35rpx 15rpx;">
					<navigator url="/pages/record/record" open-type="navigate">
						<button class="cu-btn round" style="font-size: 40rpx;height: 92rpx;">听歌心情</button>
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>


<script lang="ts" setup>
	import { reactive } from "vue";

	const dialogData = reactive({
		visiable: false,
		fromPoi: ['0', '0'],
		endStyle: {
			height: 50
		}
	})

	const closed = () => {
		console.log('关闭弹窗后的回调函数');
	}
</script>
<script lang="ts">
	export default {
		data() {
			return {
				like: 0,
				play: 0,
				TabCur: 0,
				scrollLeft: 0,
				playWay: 1,
				now: 0,
				audioData: [{
					file: "/static/songs/01.mp3",
					longth: "04:21",
					music_id: 1,
					name: "认真的雪",
					singername: '薛之谦',
					like: 0,
					song_image: "/static/images/design07.png"
				},
				{
					file: "/static/songs/02.mp3",
					longth: "04:58",
					music_id: 2,
					name: "可惜没如果",
					singername: '林俊杰',
					like: 0,
					song_image: "/static/images/design10.jpg"
				},
				{
					file: "/static/songs/03.mp3",
					longth: "04:29",
					music_id: 3,
					name: "晴天",
					singername: '周杰伦',
					like: 0,
					song_image: "/static/images/design12.webp"
				},
				{
					file: "/static/songs/04.mp3",
					longth: "04:32",
					music_id: 4,
					name: "爱如潮水",
					singername: '张信哲',
					like: 0,
					song_image: "/static/images/design11.jpg"
				},
				{
					file: "/static/songs/05.mp3",
					longth: "02:50",
					music_id: 5,
					name: "会魔法的老人",
					singername: '法老、KKECHO',
					like: 0,
					song_image: "/static/images/design14.jpg"
				},
				{
					file: "/static/songs/06.mp3",
					longth: "04:18",
					music_id: 6,
					name: "飘向北方 (Live)",
					singername: '尤长靖、那吾克热-NW',
					like: 0,
					song_image: "/static/images/design13.jpg"
				},
				{
					file: "/static/songs/07.mp3",
					longth: "04:19",
					music_id: 7,
					name: "奢香夫人",
					singername: '凤凰传奇',
					like: 0,
					song_image: "/static/images/design15.jpg"
				},

				],

			};

		},
		methods: {
			tabSelect(e : { currentTarget : { dataset : { id : number; }; }; }) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			like_ornot(now) {
				if (this.audioData[now].like == 0) {
					this.$set(this.audioData[now], 'like', 1)
				} else {
					this.$set(this.audioData[now], 'like', 0)
				}
			},
			play_ornot() {
				if (this.play == 0) {
					this.play = 1
				} else {
					this.play = 0
				}
			},
			updateWay() {
				var that = this
				if (that.playWay == 2) {
					that.playWay = 0
				} else {
					that.playWay = that.playWay + 1
				}
			}
		}
	}
</script>

<style>
	.play-list-content-title {
		font-size: 28rpx;
		margin-bottom: 16rpx;
	}

	.play-list {
		margin: 20rpx 10rpx;
		font-size: 36rpx;
		color: #343434;
		padding: 20rpx;
	}

	.radius-lg {
		position: relative;
		top: 1.5rem;
		width: 90%;
	}

	.header {
		position: relative;
		top: 1.3rem;
		display: flex;
		justify-content: space-between;
		width: 80%;
	}

	.header image {
		width: 40px;
		height: 40px;
	}

	.scrollPage {
		display: flex;
		flex-direction: column;
		background-image: url('/static/images/design09.jpg');
		background-size: cover;
		background-repeat: no-repeat;
		width: 100%;
		height: 100vh;
		align-items: center;
	}

	.choose {
		background-color: rgb(131, 166, 100, 0.7);
		border-radius: 5px;
	}

	.choose image {
		width: 90px;
	}

	.content {
		padding: 5px;
	}

	.list {
		font-size: 16px;
		line-height: 66upx;
		padding-left: 5upx;
		background: #fff;
		border-radius: 10px;
		margin-top: 5px;
		color: #333;
	}

	.active {
		background: #169af3;
		color: #fff;
	}

	.iconbtn {
		width: 55upx;
		height: 55upx;
		margin-left: 33upx;
		margin-right: 33upx;

	}
</style>