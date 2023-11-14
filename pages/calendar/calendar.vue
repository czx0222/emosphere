<template>

	<view class="backarea">
		<view class="header">
			<router-link :to="{ path: '/pages/main/main' }">
				<view class="head-left">
					<img src="/static/images/fanhui.png" />
					<text>返回</text>
				</view>
			</router-link>
		</view>
		<view class="calendar">
			<view>
				<uni-calendar class="uni-calendar--hook" :selected="info.selected" :showMonth="false" @change="change"
					@monthSwitch="monthSwitch" />
			</view>
		</view>
		<view class="calendar-content">
			<view class="v">
				<view class="left">
					<text class="time">11月10日</text>
					<img src="/static/images/qingxu-xiyue.png" alt="" />
				</view>
				<view class="right">
					<text class="title">满足</text>
					<text class="content">"大家贵州带回来的特产都很好次！！！"</text>
				</view>
			</view>
			<view class="v">
				<view class="left">
					<text class="time">11月9日</text>
					<img src="/static/images/qingxu-xiyue.png" alt="" />
				</view>
				<view class="right">
					<text class="title">很烦</text>
					<text class="content">"复习图形学哪有不疯的"</text>
				</view>
			</view>
			<view class="v">
				<view class="left">
					<text class="time">11月8日</text>
					<img src="/static/images/qingxu-xiyue.png" alt="" />
				</view>
				<view class="right">
					<text class="title">时间过的好快</text>
					<text class="content">"十月份怎么就结束了"</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	function getDate(date, AddDayCount = 0) {
		if (!date) {
			date = new Date()
		}
		if (typeof date !== 'object') {
			date = date.replace(/-/g, '/')
		}
		const dd = new Date(date)

		dd.setDate(dd.getDate() + AddDayCount) // 获取AddDayCount天后的日期

		const y = dd.getFullYear()
		const m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1 // 获取当前月份的日期，不足10补0
		const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() // 获取当前几号，不足10补0
		return {
			fullDate: y + '-' + m + '-' + d,
			year: y,
			month: m,
			date: d,
			day: dd.getDay()
		}
	}
	export default {
		components: {},
		data() {
			return {
				showCalendar: false,
				info: {
					lunar: true,
					range: true,
					insert: false,
					selected: []
				}
			}
		},
		onReady() {
			this.$nextTick(() => {
				this.showCalendar = true
			})
			// TODO 模拟请求异步同步数据
			setTimeout(() => {
				this.info.date = getDate(new Date(), -30).fullDate
				this.info.startDate = getDate(new Date(), -60).fullDate
				this.info.endDate = getDate(new Date(), 30).fullDate
			}, 2000)
		},
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
		height: 100vh;
		align-items: center;
		/* 水平居中 */

	}

	.header {
		display: flex;
		justify-content: space-between;
		width: 90%;
		position: relative;
		top: 1rem;

	}

	.header text {
		color: #ffffff;
		font-size: 1rem;
		font-weight: 550;

	}

	.head-left {
		display: flex;
		align-items: center;
		float: left;
	}
	.head-right {
		display: flex;
		align-items: center;
	}
	.calendar {
		position: relative;
		top: 2rem;

	}

	.calendar-content {
		position: relative;
		top: 3rem;
		width: 90%;
	}

	.v {
		display: flex;
		margin: 4px;
		min-height: 6rem;
		border-radius: 10px;
		background-color: rgb(255, 255, 255, 0.9);
	}

	.calendar-content view img {
		height: 50px;
		width: 50px;
	}

	.left {
		border-top-left-radius: 10px;
		border-bottom-left-radius: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 30%;
	}

	.left text {
		font-size: 1rem;
		font-weight: bold;
	}

	.right {
		border-top-right-radius: 10px;
		border-bottom-right-radius: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 70%;

	}

	.right .title {
		font-size: 1.5rem;
		font-weight: bold;

	}

	.right .content {
		font-size: 18px;
		margin: 5px;
	}
</style>