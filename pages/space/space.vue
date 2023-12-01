<template>
	<view class="backarea">
		<view style="width: 100%; height:2rem;"></view>
		<view class="header">
			<view class="tui-arrow" @click="getback" style="margin-left:10rpx"><tui-icon name="arrowleft" :size="35"
					color="#488C88" bold="true"></tui-icon></view>
			<view class="tui-notice-box" @click="goshare">
				<tui-icon name="evaluate" size="35" color="#488C88" bold="true"></tui-icon>
			</view>
		</view>
		
		<view class="top-tab">
			<tui-tabs :tabs="list1" :currentTab="currentTab" @change="change" sliderBgColor="#488C88" color="#000000"
				selectedColor="#488C88" scale="1.5" height="120" size="40"></tui-tabs>
		</view>


		<view class="content">
			<interest v-if="currentTab == 0"></interest>
			<tuijian v-if="currentTab == 1"></tuijian>
		</view>

		<ren-customer-navigator></ren-customer-navigator>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		useRouter
	} from 'uni-mini-router'
	let router = useRouter()
	const goshare = () => {
		router.replace('/pages/share/share');
	}
	const getback = () => {
		router.replace('/pages/main/main');
	}
	const list1 = ref([{
			name: '最新'
		},
		{
			name: '推荐'
		}
	]);
	let currentTab = ref(0);
	const change = (e) => {
		currentTab.value = e.index;
	};
	let postList = ref("")
	const loadPostStatus = ref('loadmore')
</script>

<style>
	.content{
		width: 100%;
		position: relative;
		top: 1.5rem;
	}
	.top-tab{
		position: relative;
		top: 1.5rem;
	}
	.header {
		display: flex;
		justify-content: space-between;
		width: 90%;
		position: relative;
		top: 1rem;
	
	}
	.backarea {
		display: flex;
		flex-direction: column;
		background-image: url('/static/images/back2.png');
		
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		width: 100%;
		height: 100vh;
		align-items: center;
	}
</style>