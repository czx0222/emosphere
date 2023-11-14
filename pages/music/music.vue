<template>
	<view class="scrollPage margin-xs bg-oc-gray-9 ">

		<view class="header">
			<router-link to="/pages/main/main">
				<img src="/static/images/fanhui.png">
			</router-link>
			<router-link to="">
				<img class="choose" src="/static/images/mm.png">
			</router-link>
			
			<router-link to="/pages/relax/relax">
				<img src="/static/images/fenche.png">
			</router-link>

			<router-link to="">
				<img src="/static/images/recode.png">
			</router-link>
		</view>

		<view class="radius-lg">

			<view class="bg-white padding-bottom radius-xl" style="text-align: center;">
				<view class="padding-lr margin-xxl" style="height: 14rem; margin-bottom: 40px">
					<image class="shadow-blur bg-img radius-lg" :src="songimage[now]"></image>
				</view>
				<view class="text-xl text-black text-center" style="font-size: 24px;">{{songname[now]}}</view>
				<view class="text-center padding-top-sm">
					<text class="text-sm text-gray text-center" style="font-size:20px">{{singername[now]}}</text>
				</view>
				<view class="margin-top-xl text-center text-xxxl text-black padding-top-lg">
					<text class="cuIcon-refresh padding-right-xl"></text>
					<a-button type="link" ghost @click="like_ornot">
						<text v-if="like" class="cuIcon-likefill text-red padding-lr-xl" alt></text>
						<text v-else class="cuIcon-like padding-lr-xl" alt></text>
					</a-button>
					<text class="cuIcon-sort padding-left-xl"></text>
				</view>
				<view class="content">
					<imt-audio autoplay="true" continue="false" :src="audio[now]" :duration="audio[now].duration"
						@prev="now = now === 0?audio.length-1:now-1"
						@next="now = now === audio.length-1?0:now+1"></imt-audio>

					<view class="list" :class="{active:key===now}" v-for="(item,key) in song" :key="key"
						@click="now = key">{{key+1}} . {{item}}</view>
				</view>

			</view>
			<view class="padding-tb">
				<view class="flex justify-between">
					<view class="flex">
						<view class="cu-avatar round margin-left-sm"
							style="background-image:url(/static/images/design05.png);">
						</view>
						<view class="cu-avatar round margin-left-sm"
							style="background-image:url(/static/images/design01.png);">
						</view>
						<view class="cu-avatar round margin-left-sm"
							style="background-image:url(/static/images/design02.png);">
						</view>
						<view class="cu-avatar round margin-left bg-oc-gray-7"><text class="cuIcon-more"></text></view>
					</view>


					<view class="flex">
						<view class="padding-right-sm">
							<navigator url="/pages/record/record" open-type="navigate">
								<button class="cu-btn round">听歌心情</button>
							</navigator>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				like: 0,
				play: 0,
				TabCur: 0,
				scrollLeft: 0,
				audio: [
					'/static/songs/xue.mp3',
					'/static/songs/kexi.mp3'
				],
				song: [
					'认真的雪 薛之谦',
					'可惜没如果 林俊杰'
				],
				songname: [
					'认真的雪',
					'可惜没如果'
				],
				singername: [
					'薛之谦',
					'林俊杰'
				],
				songimage: [
					'/static/images/design07.png',
					'/static/images/design10.jpg'
				],
				now: 0
			};

		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			like_ornot() {
				if (this.like == 0) {
					this.like = 1
				} else {
					this.like = 0
				}
			},
			play_ornot() {
				if (this.play == 0) {
					this.play = 1
				} else {
					this.play = 0
				}
			}
		}
	}
</script>

<style>
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

	.header img {
		width: auto;
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

	.content {
		padding: 5px;
	}

	.list {
		font-size: 20px;
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
</style>