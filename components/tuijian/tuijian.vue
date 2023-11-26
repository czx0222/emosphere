<template>
	<view class="container">
		<view>
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper"
				@scrolltolower="lower" @scroll="scroll">
				<ul>
					<li v-for="(item, index) in dataList" :key="index">
						<view class="item">
							<view class="avatar-user">
								<!-- 点击头像跳转 -->
								<view class="avatar">
									<image :src=item.avatar mode="aspectFill" :lazy-load='true' />
								</view>
								<view class="user">
									<view class="name">{{ item.username }}</view>
									<view class="time">{{ item.time }}</view>
								</view>
							</view>	
						</view>
						<view class="content">
							{{ item.content }}
						</view>
						<view class="main">
						
							<view class="img-list">
								<view v-for="(img, index) in item.imgsUrl" :key="index">
						
									<image :src="img" mode="aspectFill" :lazy-load='true' class="fadeImg" />
									<!-- <ImgFade :src="img" ></ImgFade> -->
								</view>
						
							</view>
						</view>
						
						<view class="fotter">
							<view class="icon">
								<tui-icon name="like-fill" size="25" v-if="item.isLike" 
									@click="cancelAgreeImg(item, index)" color="#488C88"></tui-icon>
								<tui-icon name="like" size="25" v-else @click="agreeImg(item, index)"></tui-icon>
								<view class="count">{{ item.agreeCount }}</view>
							</view>
							<view class="icon1" @click="getComment(item.mid)">
								<tui-icon name="message" size="25"></tui-icon>
								<view class="count">{{ item.commentCount }}</view>
							</view>
							<!-- 分享-->
						</view>
					</li>
				</ul>
				<view class="loadStyle" v-if="!isEnd && loading">
					<tui-icon name="loading" :size="18"></tui-icon>
				</view>
				<view class="loadStyle" v-if="isEnd">我也是有底线的~</view>
			</scroll-view>
		</view>
		
		<!-- 弄一个回顶部的悬浮按钮-->
		<!-- 到底标记-->
	</view>
</template>

<script setup>
	import {ref} from 'vue';
	
	const dataList = ref([
		{
			avatar: "/static/xiaodiao.png", 
			username: "xiaodiao", 
			time: "Two minutes ago", 
			content: "谨遵陈总安排，吾等在所不辞",
			imgsUrl:["/static/blog1.png","/static/blog2.png"],
			agreeCount:"666",
			commentCount:"777"
		},
		{
			avatar: "/static/xiaodiao.png", 
			username: "xiaodiao", 
			time: "One hour ago", 
			content: "111111111",
			imgsUrl:["/static/blog1.png","/static/blog2.png"],
			agreeCount:"666",
			commentCount:"777"
		},
	]);
	
	const scrollTop = ref(0);
	const old = ref({
	  scrollTop: 0
	});
	
	const upper = (e) => {
	  console.log(e);
	};
	
	const lower = (e) => {
	  console.log(e);
	};
	
	const scroll = (e) => {
	  console.log(e);
	  old.value.scrollTop = e.detail.scrollTop;
	};
	
	const goTop = (e) => {
	  scrollTop.value = old.value.scrollTop;
	  this.$nextTick(() => {
	    scrollTop.value = 0;
	  });
	  uni.showToast({
	    icon: "none",
	    title: "纵向滚动 scrollTop 值已被修改为 0"
	  });
	};

	const agreeImg = (item, index) => {
	  item.agreeCount = item.agreeCount * 1 + 1;
	  item.isLike = true;
	};
	
	const cancelAgreeImg = (item, index) => {
	  item.agreeCount = item.agreeCount * 1 - 1;
	  item.isLike = false;
	};
	// import {
	// 	getAllFollowTrends
	// } from "@/api/interest.js"
	// import {
	// 	addBrowseRecord
	// } from "@/api/browseRecord.js"
	// import TrendComment from "@/components/trendComment.vue"
	// import {
	// 	agree,
	// 	cancelAgree
	// } from "@/api/agreeCollect.js"
	// import {
	// 	timeAgo
	// } from "@/utils/webUtils.js"
	// export default {
	// 	components: {
	// 		TrendComment,
	// 	},
	// 	data() {
	// 		return {
	// 			userInfo: {},
	// 			triggered: false,
	// 			page: 1,
	// 			limit: 4,
	// 			userInfo: {},
	// 			dataList: [],
	// 			popupShow: false,
	// 			isEnd: false, //是否到底底部了
	// 			loading: false, //是否正在加载
	// 			total: 0,
	// 			mid: '',
	// 			seed: 0,
	// 			scrollTop: 0,
	// 			old: {
	// 				scrollTop: 0
	// 			},
	// 		}
	// 	},
	// 	created() {
	// 		this.userInfo = uni.getStorageSync("userInfo")
	// 		if (typeof this.userInfo == 'undefined' || this.userInfo == null || this.userInfo == '') {
	// 			uni.showToast({
	// 				title: "用户未登录",
	// 				icon: 'none',
	// 			})
	// 			return;
	// 		} else {
	// 			this.getAllFollowTrends()
	// 		}

	// 	},

	// 	methods: {
	// 		getComment(mid) {

	// 			this.mid = mid
	// 			this.seed = Math.random()
	// 			this.popupShow = true;
	// 			uni.hideTabBar()
	// 		},
	// 		popup(popupShow) {

	// 			this.popupShow = popupShow
	// 		},
	// 		getAllFollowTrends() {

	// 			let params = {
	// 				uid: this.userInfo.id
	// 			}
	// 			getAllFollowTrends(this.page, this.limit, params).then(res => {
	// 				res.data.forEach(e => {
	// 					e.time = timeAgo(e.time)
	// 					e.imgsUrl = JSON.parse(e.imgsUrl)

	// 					this.dataList.push(e)
	// 				})

	// 				this.total = res.data.length

	// 			})
	// 		},

	// 		onRefresh() {
	// 			this.triggered = true;

	// 			setTimeout(() => {
	// 				this.triggered = false;
	// 			}, 1000)
	// 			this.page = 1

	// 			//刷新数据
	// 			let params = {
	// 				uid: this.userInfo.id
	// 			}
	// 			getAllFollowTrends(this.page, this.limit, params).then(res => {

	// 				let list = []
	// 				res.data.forEach(e => {
	// 					e.time = timeAgo(e.time)
	// 					e.imgsUrl = JSON.parse(e.imgsUrl)

	// 					list.push(e)
	// 				})

	// 				this.dataList = list

	// 				this.total = res.data.length

	// 			})
	// 		},


	// 		loadData() {

	// 			this.loading = true
	// 			setTimeout(() => {
	// 				if (this.total < this.limit) {
	// 					this.isEnd = true
	// 					return
	// 				}
	// 				this.page = this.page + 1;
	// 				let params = {
	// 					uid: this.userInfo.id
	// 				}

	// 				getAllFollowTrends(this.page, this.limit, params).then(res => {

	// 					res.data.forEach(e => {
	// 						e.time = timeAgo(e.time)
	// 						e.imgsUrl = JSON.parse(e.imgsUrl)

	// 						this.dataList.push(e)
	// 					})

	// 					this.total = res.data.length

	// 				})
	// 			}, 100)
	// 		},

	// 		getUserInfo(uid) {
	// 			uni.navigateTo({
	// 				url: "/pages/otherUser/otherUser?uid=" + uid
	// 			})
	// 		},

	// 		toMain(mid) {

	// 			let data = {}
	// 			data.uid = this.userInfo.id
	// 			data.mid = mid

	// 			addBrowseRecord(data).then(res => {
	// 				uni.navigateTo({
	// 					url: "/pages/main/main?mid=" + mid
	// 				})
	// 			})
	// 		},
	// 		toAlbum(aid) {
	// 			uni.navigateTo({
	// 				url: "/pages/user/albums/albumInfo?albumId=" + aid
	// 			})
	// 		},

	// 		agreeImg(item, index) {
	// 			let data = {}
	// 			data.uid = uni.getStorageSync("userInfo").id
	// 			data.type = 1
	// 			data.agreeCollectId = item.mid
	// 			data.agreeCollectUid = item.userId

	// 			agree(data).then(res => {
	// 				this.dataList[index].agreeCount = this.dataList[index].agreeCount * 1 + 1
	// 				this.dataList[index].isAgree = true
	// 			})
	// 		},

	// 		cancelAgreeImg(item, index) {

	// 			let data = {}
	// 			data.uid = uni.getStorageSync("userInfo").id
	// 			data.agreeCollectId = item.mid
	// 			data.agreeCollectUid = item.userId
	// 			data.type = 1
	// 			cancelAgree(data).then(res => {
	// 				this.dataList[index].agreeCount = this.dataList[index].agreeCount * 1 - 1
	// 				this.dataList[index].isAgree = false
	// 			})
	// 		},
	// 		scroll(e) {

	// 			this.old.scrollTop = e.detail.scrollTop
	// 		},

	// 	}
	// }
</script>

<style scoped>
	@import url(./tuijian.css);
	.scroll-Y {
		height: 1300rpx;
	}
	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}
	.scroll-view-item {
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
		font-size: 36rpx;
	}
	.scroll-view-item_H {
		display: inline-block;
		width: 100%;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
		font-size: 36rpx;
	}
	
</style>


