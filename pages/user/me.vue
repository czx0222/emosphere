<template>
	<view class="content">
		<view class="box" style="width: 100%;height: 2rem;"></view>
		<view class="tui-header-img">
			<view class="tui-arrow" @click="getback" style="margin-left:10rpx"><tui-icon name="arrowleft" :size="50"
					color="#ffffff" bold="true"></tui-icon></view>
			<view class="user-info">
				<image :src="userInfo.avatar" class="avatar" mode="aspectFill" />
				<span>{{userInfo.username}}</span>
			</view>
		</view>
		
		<view class="white-rectangle"></view>
		
		<view class="main">
			<view class="tabs-style">
				<tui-tabs :tabs="tabs" :currentTab="currentTab" @change="change" sliderBgColor="#488C88"
					selectedColor="#488C88" itemWidth="50%" size=35 scale=1.1></tui-tabs>
			</view>
			<my v-if="currentTab == 0"></my>
			<zan v-if="currentTab == 1"></zan>

		</view>

		<ren-customer-navigator></ren-customer-navigator>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import store from '@/store';
	import {
		useRouter
	} from 'uni-mini-router'
	let currentTab = ref(0);
		const change = (e) =>{
			currentTab.value = e.index;
		};
		let router = useRouter()
	const getback = () => {
		router.replace('/pages/main/main')
	}
	const tabs = ref([{
			name: "我的"
		},
		{
			name: "收藏"
		},
	]);
	const userInfo = ref({
		avatar: store.state.ImagePath,
		username: store.state.username
	});
</script>

<style>
	.main{
		position: relative;
		top: 0rem;
	}
	.content {
		position: relative;
		width: 100%;
		background-color: #f4f4f4;
	}

	.tui-header-img {
		background-image: url("/static/images/back2.png");
		width: 100%;
		height: 440rpx;
		display: block;
	}
	.user-info{
		display:flex;
		align-items: flex-start;
		position: relative;
		top: 6rem;
		padding: 20rpx;
	}
	.user-info span{
		margin-left: 10rpx;
		font-size: 90rpx;
		font-weight: bold;
		color: #f4f4f4;
	}
	.avatar{
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%
	}
	
	.white-rectangle {
	  width: 100%;
	  height: 35px;
	  background-color: white;
	}
</style>
