

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
		bottom: 8rem;
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
		top: calc(90% - 30px);
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



