

<template>
	<view class="backarea">
		<view class="box" style="width: 100%;height: 5%; "></view>
	<view  @click="navigateTo('myScreen')">
		<image src="/static/images/geren.png"
			style="position: relative;top: 1rem;left: -9rem;width: 50px;height: 50px;" ></image>
	</view>

		<swiper class="banner" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" alt="z12">
			<swiper-item v-for="item in pictures" :key="item.id">
				<image @tap="onPreviewImage(item.url)" :src="item.url" class="banner-image"></image>
				<view class="swiper-item"></view>
			</swiper-item>
		</swiper>

		<view class="to">
			<view @click="navigateTo('space')">
				<div class="circle">
					<image src='/static/images/z3.png'></image>
				</div>
			</view>
			<view @click="navigateTo('calendar')">
					<div class="circle">
						<image src='/static/images/z4.png'></image>
					</div>
			</view>

			<view @click="navigateTo('chat')">
					<div class="circle">
						<image src='/static/images/z5.png'></image>
					</div>
			</view>
			<view @click="navigateTo('music')">
					<div class="circle">
						<image src='/static/images/z6.png'></image>
					</div>
			</view>
		</view>
		<div @click="navigateTo('torecord')" class="bottom">
			<image  src="/static/images/z10.png" style="width: 50px;height: 50px;margin-right: 2rem;"></image>
			<image  src="/static/images/z13.png" style="width: 200px;height: 50px;"></image>
		</div>
	</view>
</template>
<script setup>
	import { useRouter } from 'uni-mini-router'
	let router = useRouter();
	  const navigateTo = (route) => {
	    const routesMap = {
	      space: '/pages/space/space',
	      calendar: '/pages/calendar/calendar',
	      chat: '/pages/chat/chat',
	     music: '/pages/music/music',
	      myScreen: '/pages/myScreen/myScreen',
		  torecord:'/pages/EmoRecord/EmoRecord'
	    };
	
	    if (routesMap[route]) {
	      router.replace(routesMap[route]);
	    }
	  };
	const pictures = [{
			id: '1',
			url: "/static/images/1.jpg"
		},
		{
			id: '2',
			url: "/static/images/2.jpg"
		},
		{
			id: '3',
			url: "/static/images/3.jpg"
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
	.bottom{
		bottom: 2rem;
		position: absolute;
	}
	.backarea {
		display: flex;
		flex-direction: column;
		background-image: url('/static/images/mainback.jpg');
		background-size: cover;
		background-repeat: no-repeat;
		width: 100%;
		height: 110vh;
		align-items: center;
	}

	.banner {
		width: 80%;
		height: 60%;
		position: absolute;
		top: 8rem;
		left: 50%;
		transform: translateX(-50%);
	}
	.banner image {
		width: 80%;
		height: 80%;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}

	.to {
		position: absolute;
		top: calc(80% - 30px);
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		justify-content: space-between;
		width: 90%;
	}

	 .circle {
		border-radius: 50%;
		width: 55px;
		height: 55px;
		background-color:rgb(255, 255, 255,0.9);
		display: flex;
		align-items: center;
		justify-content: center;
		border: 5px solid #65AF70;
	}

	.circle image {
		
		width: 45px;
		height: 45px;
	}
</style>



<!-- <template>

	<view class="backarea">
		<router-link :to="{ path: '/pages/myScreen/myScreen' }">
			<image alt="z11" src="/static/images/z11.png" style="position: absolute; top: 20px; left: 20px;">
		</router-link>

		<uni-swiper-dot class="uni-swiper-dot-box" @clickItem=clickItem :info="info" :current="current" :mode="mode"
			:dots-styles="dotsStyles" field="content">
			<swiper class="swiper-box" @change="change" :current="swiperDotIndex">
				<swiper-item v-for="(item, index) in 3" :key="index">
					<view class="swiper-item">
						<image :src="'/static/images/page' + (index+1) + '.jpg'" alt="" />
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>

		<div class="to">
			<div style="position: relative;">
				<image alt="z2" src="/static/images/z2.png">
				<image alt="z3" src="/static/images/z3.png" style="position: absolute; top: 8px; left: 8px;">
			</div>
			<view>
				<div style="position: relative;">
					<image alt="z2" src="/static/images/z2.png">
					<router-link :to="{ path: '/pages/calendar/calendar' }">
						<image alt="z4" src="/static/images/z4.png" style="position: absolute; top: 12px; left: 11px;">
					</router-link>
				</div>
			</view>

			<div style="position: relative;">
				<image alt="z2" src="/static/images/z2.png">
				<image alt="z5" src="/static/images/z5.png" style="position: absolute; top: 10px; left: 7px;">
			</div>
			<div style="position: relative;">
				<image alt="z2" src="/static/images/z2.png">
				<router-link :to="{ path: '/pages/relax/relax' }">
					<image alt="z6" src="/static/images/z6.png" style="position: absolute; top: 5px; left: 5px;">
				</router-link>
			</div>
		</div>
		<router-link :to="{ path: '/pages/EmoRecord/EmoRecord' }">
			<div style="position: absolute; bottom: 100px; left: 50%; transform: translateX(-50%); display: flex;">
				<image alt="z10" src="/static/images/z10.png" style="align-self: center; margin-right: 20px;">
				<image alt="z13" src="/static/images/z13.png" style="align-self: center;">
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

	.swiper-item image {
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

		image {
		max-width: 100%;
		height: auto;
	} 

	div {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style> -->