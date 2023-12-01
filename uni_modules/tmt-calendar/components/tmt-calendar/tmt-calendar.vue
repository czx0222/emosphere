<template>
	<view class="container" :style="{background}">
		<view class="tmt-header">
			<view class="select-wrap" :style="{color:actionColor}">
				<view class="p20" @click="changMonth(-1)">
					<view class="arrow-left" :style="[{'border-left-color':actionColor},{'border-bottom-color':actionColor}]"></view>
				</view>
				<view class="time">
					{{ `${currentYearMonth.year}年${currentYearMonth.month>=10?currentYearMonth.month:'0'+currentYearMonth.month}月` }}
				</view>
				<view class="p20" @click="changMonth(1)">
					<view class="arrow-right" :style="[{'border-left-color':actionColor},{'border-right-color':actionColor}]"></view>
				</view>
			</view>
			<view class="back" :style="[{color:backColor},{background:backBg}]" @click="init(true)">
				返回本月
			</view>
		</view>
		<view class="tmt-content">
			<view class="tmt-week-wrap">
				<view class="cell week-item" :style="{color:weekColor}" v-for="(item,index) in week" :key="index">{{ item.label }}</view>
			</view>
			<view class="tmt-day-wrap" :style="[{height:unfold ?contentHeight:'88rpx'},{color:dayColor}]">
				<view class="cell" v-for="index of blankDay"></view>
				<view class="cell" v-for="(item,index) in daysArr" @click="changeDay(item)">
					<view
						class="dayText"
                        :style="(current.year==item.year && current.month==item.month && current.day==item.day)?'background:'+selectBg:''"
                        >
						{{ item.today?'今':item.day }}
                        <view class="point" :style="{background:pointColor}" v-if="item.point"></view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="showBtn" class="tmt-footer" @click="unfold =!unfold ">
			<view :class="['arrow-down',{on:unfold }]" :style="[{'border-left-color':unfoldBtnColor},{'border-bottom-color':unfoldBtnColor}]"></view>
		</view>
		<view>
			<!-- 普通弹窗 -->
			<uni-popup ref="popup" background-color="#fff" @change="change">
				<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
					<view v-if:="popupContents">
						<template v-for="(popupContent, index) in popupContents" :key="index">
							<view class="left">
								<text class="time">{{click_day}}</text>
								<image :src="'/static/images/qingxu-' + popupContent.mood + '.png'" alt="" class="photosize"></image>
							</view>
							<view class="right">
								<text class="title">{{ popupContent.title }}</text>
								<text class="content">{{ popupContent.content }}</text>
							</view>
						</template>
					</view>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
import store from '../../../../store';
	export default {
		name: "calendar",
		data() {
			return {
				popupContents: [],
				click_day:{},
				unfold: true,
				week: [
					{
						label: '日',
						value: 7
					},
					{
						label: '一',
						value: 1
					},
					{
						label: '二',
						value: 2
					},
					{
						label: '三',
						value: 3
					},
					{
						label: '四',
						value: 4
					},
					{
						label: '五',
						value: 5
					},
					{
						label: '六',
						value: 6
					},
				],
				blankDay: 0, //空白天数
				today: {}, //当天
				current: {}, //当前的年月
				daysArr: [],
				list: [], //需要下标的日期
				currentYearMonth: {}, //当前年月
			};
		},
		computed: {
			contentHeight() {
				let height = Math.ceil((this.blankDay + this.daysArr.length) / 7) * 88
				return height + 'rpx'
			}
		},
		props: {
			pointList: {
				type: Array,
				default () {
					return []
				}
			},
			defaultDate: {
				type: String,
				default () {
					return ''
				}
			},
			showBtn: {
				type: Boolean,
				default () {
					return true
				}
			},
			show: {
				type: Boolean,
				default () {
					return true
				}
			},
			background: {
				type: String,
				default () {
					return 'rgb(255, 255, 255,0.6)'
				}
			},
			weekColor: {
				type: String,
				default () {
					return '#000'
				}
			},
			dayColor: {
				type: String,
				default () {
					return '#000'
				}
			},
            selectBg:{
				type: String,
				default () {
					return '#488C88'
				}
            },
            pointColor:{
				type: String,
				default () {
					return '#000'
				}
            },
            backColor:{
				type: String,
				default () {
					return '#000'
				}
            },
            backBg:{
				type: String,
				default () {
					return 'rgba(255, 255, 255, 0.19)'
				}
            },
            actionColor:{
				type: String,
				default () {
					return '#000'
				}
            },
            unfoldBtnColor:{
				type: String,
				default () {
					return '#000'
				}
            }
		},
		created() {
			this.unfold = this.show
			this.list = this.pointList
			this.fomatePointTime()
			this.init(this.defaultDate == '')
		},
		methods: {
			changMonth(num) {
				const {
					year,
					month
				} = this.getMonthYear(num)
				this.makeCalendar(year, month)
			},
			// 获取前几个月,未来几个月的年份和月份
			getMonthYear(num) {
				let month = this.currentYearMonth.month
				let year = this.currentYearMonth.year
				let year2 = year
				let month2 = month + num
				if (month + num <= 0) {
					// 之前年份
					year2 = year - 1 - parseInt(Math.abs(month2) / 12)
					month2 = 12 - (Math.abs(month2) % 12)
				} else if ((month2 / 12) > 1) {
					// 之后年份
					year2 = year + (month2 % 12 == 0 ? 0 : parseInt(month2 / 12))
					month2 = parseInt(month2 % 12) == 0 ? 12 : parseInt(month2 % 12)
				}
				return {
					year: year2,
					month: month2
				}
			},
			
			changeDay(item) {
				this.current = item
				let {year,month,day} = item
				this.$emit('changeDate',{year,month,day})
				this.click_day = `${year}-${month}-${day}`
				this.$refs.popup.open(item)
				uni.request({
					url: 'http://8.136.81.197:8080/mood_record/day',
					method: 'GET',
					data: {
						uid: store.state.userId,
						date: `${year}-${month}-${day}`,
					},
					success: (response) => {
						console.log(response.data);
						// 判断是否有 record 属性
						if (response.data['record']) {
						  const newData = {
							mood: response.data['record'].mood,
							title: response.data['record'].title,
							content: response.data['record'].content,
						  };
					
						  // 更新 popupContents 数组
						  this.$set(this.popupContents, 0, newData);
						} else {
						  // 执行另一个自定义逻辑，例如设置默认值
						  const defaultData = {
							mood: 'question',
							title: '???',
							content: '?',
						  };
					
						  // 更新 popupContents 数组
						  this.$set(this.popupContents, 0, defaultData);
						}
					},
					fail: (error) => {
						console.error(error);
					}
				  });
			},
			
			// 获取某年某月的天数
			getDays(year, month) {
				let now = new Date(year, month, 0)
				return now.getDate()
			},
			//获取某一天为星期几
			getWeekByDay(time) {
				let day = new Date(Date.parse(time.replace(/-/g, '/'))); //将日期值格式化
				return day.getDay() == 0 ? 7 : day.getDay();
			},
			init(nowTime) {
				let setTime = nowTime ? new Date() : new Date(this.defaultDate)
				let year = setTime.getFullYear()
				let month = setTime.getMonth() + 1
				let day = setTime.getDate()
				if(!(this.defaultDate!='' && nowTime) ){
					this.current = {
						year,
						month,
						day,
					}
				}
				this.today = {
					year: new Date().getFullYear(),
					month: new Date().getMonth() + 1,
					day: new Date().getDate()
				}
				this.makeCalendar(year, month)
			},
			fomatePointTime() {
				let pointList = this.list
				pointList = pointList.map(item => {
					item = item.replace(/-/g, '/') //期值格式化
					let timeArr = item.split('/')
					let timeStr = ''
					timeArr.map(time => {
						time = parseInt(time)
						timeStr += time
						return time
					})
					return timeStr
				})
				this.list = pointList
			},
			makeCalendar(year, month) {
				let today = this.today
				let days = this.getDays(year, month) //当月天数
                console.log(days)
				let firstDayWeek = this.getWeekByDay(`${year}-${month}-1`) //获取每个月第一天的星期
				let weekIndex = this.week.findIndex(item => {
					return item.value == firstDayWeek
				})
				let daysArr = []
				for (let i = 1; i <= days; i++) {
					let point = this.list.findIndex(item => {
						return item == String(year) + String(month) + String(i)
					}) != -1
					daysArr.push({
						year,
						month,
						day: i,
						point,
						today: year == today.year && month == today.month && i == today.day
					})
				}
				this.currentYearMonth = {
					year,
					month
				}
				this.daysArr = daysArr
				this.blankDay = weekIndex == -1 ? 0 : weekIndex
			},
		}
	}
</script>

<style lang="scss">
	.p20 {
		padding: 20upx;
	}

	.container {
		margin-top: 35px;
		padding: 0 20upx;
		margin-left: 15px;
		margin-right:15px;
		border-radius: 10px;
	}

	.tmt-header {
		display: flex;
		justify-content: space-between;
		padding: 20upx 0;

		.select-wrap {
			display: flex;
			align-items: center;

			.arrow-left {
				width: 18upx;
				height: 18upx;
				transform: rotate(45deg);
                border-left-width: 1upx;
                border-bottom-width: 1upx;
                border-left-style: solid;
                border-bottom-style: solid;
			}

			.time {
				font-size: 36upx;
				margin: 0 20upx;
			}

			.arrow-right {
				width: 18upx;
				height: 18upx;
				transform: rotate(45deg);
                border-top-width: 1upx;
                border-right-width: 1upx;
                border-top-style: solid;
                border-right-style: solid;
			}
		}

		.back {
			padding: 0 20upx;
			font-size: 24upx;
			height: 52upx;
			color: #fff;
			line-height: 52upx;
			background: rgba(255, 255, 255, .19);
			text-align: center;
			border-radius: 30upx;
		}
	}

	.cell {
		width: 14.28%;
		height: 88upx;
		text-align: center;
		line-height: 88upx;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;

		.point {
			width: 6upx;
			height: 6upx;
			position: absolute;
			bottom: 3upx;
			border-radius: 50%;
			left: 50%;
			transform: translateX(-50%);
		}

		.dayText {
			width: 56upx;
			height: 56upx;
			text-align: center;
			line-height: 56upx;
			border-radius: 50%;

			&.on {
				background: linear-gradient(180deg, #FF855E 0%, #ED6337 100%);
			}
		}

	}

	.tmt-content {
		padding-bottom: 20upx;

		.tmt-week-wrap {
			display: flex;

			.week-item {
				font-size: 36upx;
			}
		}

		.tmt-day-wrap {
			display: flex;
			flex-wrap: wrap;
			transition: height .3s;
			overflow: hidden;
		}
	}

	.tmt-footer {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 80upx;
		margin-top: -36upx;

		.arrow-down {
			width: 18upx;
			height: 18upx;
			transform: rotate(-45deg);
                border-left-width: 1upx;
                border-bottom-width: 1upx;
                border-left-style: solid;
                border-bottom-style: solid;
			transition: all .3s;

			&.on {
				transform: rotate(135deg);
			}
		}
	}
	
	.popup-content {
		align-items: center;
		justify-content: center;
		padding: 15px;
		height: 150px;
		background-color: #fff;
		width: 350px;
		border-radius: 10px;
		background-color: rgb(255, 255, 255, 0.9);
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
	
	.calendar-content view image {
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
		margin-left:20px;
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
		justify-content: center;
		width: 80%;
		margin-left:100px;
		margin-top: -90px;
	}
	
	.right .title {
		font-size: 1.5rem;
		font-weight: bold;
	
	}
	
	.right .content {
		font-size: 18px;
		margin: 5px;
	}
	
	.photosize{
		height:100px;
	}
</style>
