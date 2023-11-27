<template>
	<view class="container">
		<view style="width: 100%;height: 5%; "></view>
		<view class="tui-content-box">
			<view class="tui-arrow" @click="getback" style="margin-left:10rpx"><tui-icon name="arrowleft" :size="35"
					color="#488C88" bold="true"></tui-icon></view>
			<view class="tui-notice-box" @click="goshare">
				<tui-icon name="evaluate" size="35" color="#488C88" bold="true"></tui-icon>
			</view>
		</view>
		<view>
			<tui-tabs :tabs="list1" :currentTab="currentTab" @change="change" sliderBgColor="#488C88" color="#000000"
				selectedColor="#488C88" scale="1.5" height="150" size="30"></tui-tabs>
		</view>

		<view class="gray-line"></view>

		<interest v-if="currentTab == 0"></interest>
		<tuijian v-if="currentTab == 1"></tuijian>
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
	.container {
		padding-bottom: 120rpx;
		box-sizing: border-box;
	}
</style>