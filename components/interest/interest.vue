<template>
	<view class="container">
		<view>
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper"
				@scrolltolower="lower" @scroll="scroll">
				<ul >
					<li class="box" v-for="(item, index) in dataList" :key="index">
						<view class="item">
							<view class="avatar-user">
								<view class="avatar">
									<image :src=item.avatar mode="aspectFill" :lazy-load='true' />
								</view>
								<view class="user">
									<view class="name">{{ item.username }}</view>
									<view class="time">{{ item.createDate }}</view>
								</view>
							</view>	
						</view>
						<view class="content">
							{{ item.content }}
						</view>
						<view class="main">
							<div v-if="item.illustration === null"></div>
							<div v-else>
								<image :src=item.illustration mode="aspectFill" :lazy-load='true' class="fadeImg" />
							 </div>
						</view>
						
						<view class="fotter">
							<view class="icon">
								<tui-icon name="like-fill" size="25" v-if="item.isLike" 
									@click="cancelAgreeImg(item, index)" color="#488C88"></tui-icon>
								<tui-icon name="like" size="25" v-else @click="agreeImg(item, index)"></tui-icon>
								<view class="count">{{ item.agreeCount }}</view>
							</view>
							<view class="icon1">
								<tui-icon name="message" size="25" @click="toggleCommentBox"></tui-icon>
								<view class="count">{{ item.commentCount }}</view>
								<view v-if="showCommentBox" class="comment-box">
									<textarea v-model="commentText" placeholder="在这里输入评论"></textarea>
									<button @click="postComment">发送评论</button>
								</view>
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
	import {
		onMounted,
		ref
	} from 'vue';
	const dataList = ref([])
	// 发起第一个请求，获取posts数据
	uni.request({
	    url: 'http://8.136.81.197:8080/post/recent',
	    method: 'GET',
	    data: {
	        currentPage: 1,
	        pageSize: 6,
	    },
	    success: (response) => {
	        // console.log(response.data);
	
	        // 遍历每个帖子
	        response.data['posts'].forEach((post, index) => {
	            // 获取每个帖子的id
	            const postId = post.uid;
				// console.log(postId)
	            // 发起第二个请求，通过id获取用户信息
	            uni.request({
	                url: 'http://8.136.81.197:8080/user/update',
	                method: 'POST',
	                data: {
	                    id: 5,
	                },
	                success: (userResponse) => {
	                    // console.log(userResponse.data);
	
	                    // 获取用户头像信息
	                    const avatar1 = userResponse.data['user'].avatar;
						const username1 = userResponse.data['user'].username;
	                    const updatedDataList = response.data['posts'];
	                    updatedDataList[index].avatar=avatar1
	                    // 将更新后的dataList赋值给原始dataList
						updatedDataList[index].username=username1
	                    dataList.value = updatedDataList;
						console.log(dataList.value)
	                },
	                fail: (userError) => {
	                    console.error(userError);
	                }
	            });
	        });
	    },
	    fail: (error) => {
	        console.error(error);
	    }
	});

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
	
	const showCommentBox = ref(false);
	const commentText = ref('');
	
	const toggleCommentBox = () => {
	  // 切换评论框的显示与隐藏状态
	  showCommentBox.value = !showCommentBox.value;
	};
	
	const postComment = () => {
	  // 处理发送评论的逻辑，可以在这里调用后端接口等
	  console.log('发送评论:', commentText.value);
	  // 清空评论框内容
	  commentText.value = '';
	  // 隐藏评论框
	  showCommentBox.value = false;
	};
	
</script>

<style scoped>
	@import url(./interest.css);
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
	.comment-box {
	  position: absolute;
	  background-color: #fff;
	  border: 1px solid #ccc;
	  padding: 10px;
	}
	.box{
		width: 22rem;
		border-left: 3px solid #488C88;
		border-right: 3px solid #488C88;
	}
</style>
