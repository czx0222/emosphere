<template>
	<view style="width: 100%; height:2rem"></view>
	<view class="backarea">
		
		<view class="header">
			
			<view class="tui-arrow" @click="getback" style="margin-left:10rpx"><tui-icon name="arrowleft" :size="35"
					color="#488C88" bold="true"></tui-icon></view>
			<view class="tui-notice-box" @click="goshare">
				<tui-icon name="evaluate" size="35" color="#488C88" bold="true"></tui-icon>
			</view>
		</view>

		<view class="content">
			<interest v-if="currentTab == 0"></interest>
			<tuijian v-if="currentTab == 1"></tuijian>
		</view>

		<ren-customer-navigator></ren-customer-navigator>
	</view>
</template>

<script setup>
	import store from '@/store';
	import {
		ref,
		onMounted
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
	let currentTab = ref(0);
	const change = (e) => {
		currentTab.value = e.index;
	};
	let postList = ref("")
	const loadPostStatus = ref('loadmore')
	
	let savecollect = ref([])
	
	const getsave = () => {
		uni.request({
			url: 'http://8.136.81.197:8080/post_mark/',
			data: {
				uid: 5,
			},
			success: (response) => {
				const postMarksArray = response.data['postMarks'];
				
				if (postMarksArray && postMarksArray.length > 0) {
				  postMarksArray.forEach((item) => {
				    const id1 = item.postId;
				    savecollect.value.push(id1);
				  });
				}
			},
			fail: (error) => {
				console.error(error);
			}
		});
		console.log(savecollect.value)
	};
	
	onMounted(() => {
		// 在页面加载时自动调用 getemo 函数
		getsave();
	});
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