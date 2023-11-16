<template>
	<div id="app">
		<img alt="背景图" src="/static/images/z.png" style="width: auto;">
		<router-link :to="{ path: '/pages/myScreen/myScreen' }">
			<img alt="z11" src="/static/images/z11.png" style="position: absolute; top: 20px; left: 20px;">
		</router-link>

		<swiper class="banner" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" alt="z12">
			<swiper-item v-for="item in pictures" :key="item.id">
				<image @tap="onPreviewImage(item.url)" :src="item.url" class="banner-img"></image>
				<view class="swiper-item"></view>
			</swiper-item>
		</swiper>


		<div class="to">
			<div style="position: relative;">
				<img alt="z2" src="/static/images/z2.png">
				<img alt="z3" src="/static/images/z3.png" style="position: absolute; top: 8px; left: 8px;">
			</div>
			<view>
				<div style="position: relative;">
					<img alt="z2" src="/static/images/z2.png">
					<router-link :to="{ path: '/pages/calendar/calendar' }">
						<img alt="z4" src="/static/images/z4.png" style="position: absolute; top: 12px; left: 11px;">
					</router-link>

				</div>
			</view>

			<div style="position: relative;">
				<img alt="z2" src="/static/images/z2.png">
				<img alt="z5" src="/static/images/z5.png" style="position: absolute; top: 10px; left: 7px;">
			</div>
			<div style="position: relative;">
				<img alt="z2" src="/static/images/z2.png">
				<router-link :to="{ path: '/pages/relax/relax' }">
					<img alt="z6" src="/static/images/z6.png" style="position: absolute; top: 5px; left: 5px;">
				</router-link>
			</div>
		</div>

		<div @click="ToRecord"
			style="position: absolute; bottom: 150px; left: 50%; transform: translateX(-50%); display: flex;">
			<img alt="z10" src="/static/images/z10.png" style="align-self: center; margin-right: 20px;">
			<img alt="z13" src="/static/images/z13.png" style="align-self: center;">
		</div>
	</div>
</template>

<script setup>
	import {
		useRouter
	} from 'vue-router';
	const router = useRouter();
	const ToRecord = () => {
		router.push('/pages/EmoRecord/EmoRecord')
	}


	const pictures = [{
			id: '1',
			url: "/static/myimg/1.jpg"
		},
		{
			id: '2',
			url: "/static/myimg/2.jpg"
		},
		{
			id: '3',
			url: "/static/myimg/3.jpg"
		}
	];

	const onPreviewImage = (url) => {
		console.log(url);
		uni.previewImage({
			urls: pictures.map(v => v.url),
			current: url
		});
	};
</script>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		text-align: center;
		color: #2c3e50;
		max-width: 100%;
		margin: 0 auto;
		position: relative;
	}

	div {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.banner,
	.banner image {
		/* 		width: 650rpx;
		height: 600rpx; */
		width: 90%;
		height: 60%;
		position: absolute;
		top: 50px;
		left: 50%;
		transform: translateX(-50%);
	}

	.to {
		position: absolute;
		top: calc(70% - 30px);
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		justify-content: space-between;
		width: 80%;
	}
</style>




<!-- <template>

	<view class="backarea">
		<router-link :to="{ path: '/pages/myScreen/myScreen' }">
			<img alt="z11" src="/static/images/z11.png" style="position: absolute; top: 20px; left: 20px;">
		</router-link>

		<uni-swiper-dot class="uni-swiper-dot-box" @clickItem=clickItem :info="info" :current="current" :mode="mode"
			:dots-styles="dotsStyles" field="content">
			<swiper class="swiper-box" @change="change" :current="swiperDotIndex">
				<swiper-item v-for="(item, index) in 3" :key="index">
					<view class="swiper-item">
						<img :src="'/static/images/page' + (index+1) + '.jpg'" alt="" />
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>

		<div class="to">
			<div style="position: relative;">
				<img alt="z2" src="/static/images/z2.png">
				<img alt="z3" src="/static/images/z3.png" style="position: absolute; top: 8px; left: 8px;">
			</div>
			<view>
				<div style="position: relative;">
					<img alt="z2" src="/static/images/z2.png">
					<router-link :to="{ path: '/pages/calendar/calendar' }">
						<img alt="z4" src="/static/images/z4.png" style="position: absolute; top: 12px; left: 11px;">
					</router-link>
				</div>
			</view>

			<div style="position: relative;">
				<img alt="z2" src="/static/images/z2.png">
				<img alt="z5" src="/static/images/z5.png" style="position: absolute; top: 10px; left: 7px;">
			</div>
			<div style="position: relative;">
				<img alt="z2" src="/static/images/z2.png">
				<router-link :to="{ path: '/pages/relax/relax' }">
					<img alt="z6" src="/static/images/z6.png" style="position: absolute; top: 5px; left: 5px;">
				</router-link>
			</div>
		</div>
		<router-link :to="{ path: '/pages/EmoRecord/EmoRecord' }">
			<div style="position: absolute; bottom: 100px; left: 50%; transform: translateX(-50%); display: flex;">
				<img alt="z10" src="/static/images/z10.png" style="align-self: center; margin-right: 20px;">
				<img alt="z13" src="/static/images/z13.png" style="align-self: center;">
			</div>
		</router-link>

	</view>





</template>

<script>
	export default {
		components: {},
		data() {
			return {
				info: [{
						url: "/static/images/page3.jpg",
					},
					{
						url: '/static/images/page2.jpg',
					},
					{
						url: "/static/images/page1.jpg",
					}
				],
				dotStyle: [{
					backgroundColor: 'rgba(0, 0, 0, .3)',
					border: '1px rgba(0, 0, 0, .3) solid',
					color: '#fff',
					selectedBackgroundColor: 'rgba(0, 0, 0, .9)',
					selectedBorder: '1px rgba(0, 0, 0, .9) solid'
				}, ],
				modeIndex: -1,
				styleIndex: -1,
				current: 0,
				mode: 'dot',
				dotsStyles: {},
				swiperDotIndex: 0
			}
		},
		methods: {
			change(e) {
				this.current = e.detail.current
			},
			clickItem(e) {
				this.swiperDotIndex = e
			},
		}
	}
</script>

<style>
	.backarea {
		display: flex;
		flex-direction: column;
		background-image: url('/static/images/back2.png');
		background-size: cover;
		background-repeat: no-repeat;
		width: 100%;
		height: 110vh;
		align-items: center;
		background-position: center;
	}

	.swiper-box {
		height: 380px;
	}

	.swiper-item {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;

	}

	.swiper-item img {
		border-radius: 20px;
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
		margin-top: -40px;
	}

	.uni-swiper-dot-box {
		position: absolute;
		top: 5.5rem;
		width: 90%;
	}

	.to {
		position: absolute;
		top: calc(70% - 30px);
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		justify-content: space-between;
		width: 80%;
	}

		img {
		max-width: 100%;
		height: auto;
	} 

	div {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style> -->