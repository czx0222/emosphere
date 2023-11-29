<template>
	<view>
		<view class="header" id="header">
			<span>第{{currentIndex+1}}题</span>
				<span class="header-button" @click='handleSubmit' v-if='!isReviewed'>提交</span>
		</view>
		<view id="subHeader">
			<view class="sub-header" v-if='questtionList.length>0'>
				<span class='sub-header-number'>{{currentIndex+1}}/{{questtionList.length}} 题</span>
			</view>
		</view>
			<swiper class="content" :duration='duration' :current=currentIndex @change='handleSwiperChanged' v-if='questtionList.length>0' :style="{'height':swiperHeight}">
				<template v-for='item in questtionList'>
					<swiper-item class="content-item">
						<scroll-view scroll-y :style="{'height':swiperHeight}">
							<view class="content-title">
								{{item.title}}
							</view>
							<view class="content-solutions">
								<template v-for='subItem in item.optionList'>
									<view class="content-solutions-item" @click='chooseSolution(item,subItem)'>
										<view class="content-solutions-item-single">{{subItem.id}}</view>
										<view :class="item.userAnswer == subItem.id? 'content-solutions-item-select' : ''" class="content-solutions-item-content">{{subItem.content}}</view>
									</view>
								</template>
							</view>
						</scroll-view>
					</swiper-item>
				</template>
			</swiper>
	
		
		<view class="footer" id="footer">
			<view class="footer-back" @click='handleChangeCurrentSwiper(-1)'>上一题</view>
			<view class="footer-card" @click="showQuestion = true">答题卡</view>
			<view class="footer-right" @click='handleChangeCurrentSwiper(1)'>下一题</view>
		</view>
		
		<modal v-model="showQuestion" :value="showQuestion">
			<view class='question-modal' :style="{'height': modalHeight}">
				<view class="question-modal-header" id="questionHeader">
					答题卡
				</view>
				<scroll-view scroll-y class="question-modal-body" :style="{'height': modalContentHeight}">
					<template v-for="(item, index) in questtionList">
						<view v-if='item.userAnswer && isReviewed' class="question-modal-body-item question-modal-body-item-failed" @click="handleJumpSwiper(index)">{{index + 1 }}</view>
						<view v-else-if='item.userAnswer' class="question-modal-body-item question-modal-body-item-select" @click="handleJumpSwiper(index)">{{index + 1 }}</view>
						<view v-else class="question-modal-body-item" @click="handleJumpSwiper(index)">{{index + 1 }}</view>
					</template>
				</scroll-view>
			</view>
		</modal>
	</view>
</template>

<script>
	import {useRouter} from 'uni-mini-router'
	import Modal from './modal.vue'
	export default {
		data() {
			
			return {
				currentIndex: 0,
				swiperHeight: 0,
				modalHeight: '',
				modalContentHeight: '',
				showQuestion: false,
				finish: false,
			}
		},
		watch:{
			currentSwiperItem(val){
				this.currentIndex = val
			}
		},
		props:{
			isReviewed: {
				type: Boolean,
				default: false
			},
			currentSwiperItem: {
				type: [String, Number],
				default: 0
			},
			duration: {
				type: [String, Number],
				default: 300
			},
			
			questtionList: {
				type: Array,
				default: ()=> {
					return [
					{
						"id":1,
						"title":"头痛",
						"optionList": [
						{"id":"A","content":"从无",},
						{"id":"B","content":"轻度",},
						{"id":"C","content":"中度",},
						{"id":"D","content":"偏重",},
						{"id":"E","content":"严重",},
						],
						"userAnswer":""
					},
					{
						"id":2,
						"title":"神经过敏，心中不踏实",
						"optionList":[
						{"id":"A","content":"从无",},
						{"id":"B","content":"轻度",},
						{"id":"C","content":"中度",},
						{"id":"D","content":"偏重",},
						{"id":"E","content":"严重",},
						],
						"userAnswer":""
					},
					{
						"id":3,
						"title":"头脑中有不必要的想法或字句盘旋",
						"optionList":[
						{"id":"A","content":"从无",},
						{"id":"B","content":"轻度",},
						{"id":"C","content":"中度",},
						{"id":"D","content":"偏重",},
						{"id":"E","content":"严重",},
						],
						"userAnswer":""
					},
					{
						"id":4,
						"title":"头昏或昏倒",
						"optionList":[
						{"id":"A","content":"从无",},
						{"id":"B","content":"轻度",},
						{"id":"C","content":"中度",},
						{"id":"D","content":"偏重",},
						{"id":"E","content":"严重",},
						],
						"userAnswer":""
					},
					{
						"id":5,
						"title":"对异性的兴趣减退",
						"optionList":[
						{"id":"A","content":"从无",},
						{"id":"B","content":"轻度",},
						{"id":"C","content":"中度",},
						{"id":"D","content":"偏重",},
						{"id":"E","content":"严重",},
						],
						"userAnswer":""
					},
					{
						"id":6,
						"title":"对旁人责备求全",
						"optionList":[
						{"id":"A","content":"从无",},
						{"id":"B","content":"轻度",},
						{"id":"C","content":"中度",},
						{"id":"D","content":"偏重",},
						{"id":"E","content":"严重",},
						],
						"userAnswer":""
					},
					{
						"id":7,
						"title":"感到别人能控制您的思想",
						"optionList":[
						{"id":"A","content":"从无",},
						{"id":"B","content":"轻度",},
						{"id":"C","content":"中度",},
						{"id":"D","content":"偏重",},
						{"id":"E","content":"严重",},
						],
						"userAnswer":""
					},
					{
						"id":8,
						"title":"责怪别人制造麻烦",
						"optionList":[
						{"id":"A","content":"从无",},
						{"id":"B","content":"轻度",},
						{"id":"C","content":"中度",},
						{"id":"D","content":"偏重",},
						{"id":"E","content":"严重",},
						],
						"userAnswer":""
					},
					{
						"id":9,
						"title":"忘性大",
						"optionList":[
						{"id":"A","content":"从无",},
						{"id":"B","content":"轻度",},
						{"id":"C","content":"中度",},
						{"id":"D","content":"偏重",},
						{"id":"E","content":"严重",},
						],
						"userAnswer":""
					},
					{
						"id":10,
						"title":"担心自己的衣饰是否整齐及仪态是否端正",
						"optionList":[
						{"id":"A","content":"从无",},
						{"id":"B","content":"轻度",},
						{"id":"C","content":"中度",},
						{"id":"D","content":"偏重",},
						{"id":"E","content":"严重",},
						],
						"userAnswer":""
					},
					{
						"id":11,
						"title":"容易烦恼和激动",
						"optionList":[
						{"id":"A","content":"从无",},
						{"id":"B","content":"轻度",},
						{"id":"C","content":"中度",},
						{"id":"D","content":"偏重",},
						{"id":"E","content":"严重",},
						],
						"userAnswer":""
					},
					{
						"id":12,
						"title":"胸痛",
						"optionList":[
						{"id":"A","content":"从无",},
						{"id":"B","content":"轻度",},
						{"id":"C","content":"中度",},
						{"id":"D","content":"偏重",},
						{"id":"E","content":"严重",},
						],
						"userAnswer":""
					},
					{
						"id":13,
						"title":"害怕空旷的场所或街道",
						"optionList":[
						{"id":"A","content":"从无",},
						{"id":"B","content":"轻度",},
						{"id":"C","content":"中度",},
						{"id":"D","content":"偏重",},
						{"id":"E","content":"严重",},
						],
						"userAnswer":""
					},
					{
						"id":14,
						"title":"感到自己的精力下降，活动减慢",
						"optionList":[
						{"id":"A","content":"从无",},
						{"id":"B","content":"轻度",},
						{"id":"C","content":"中度",},
						{"id":"D","content":"偏重",},
						{"id":"E","content":"严重",},
						],
						"userAnswer":""
					},
					{
						"id":15,
						"title":"想结束自己的生命",
						"optionList":[
						{"id":"A","content":"从无",},
						{"id":"B","content":"轻度",},
						{"id":"C","content":"中度",},
						{"id":"D","content":"偏重",},
						{"id":"E","content":"严重",},
						],
						"userAnswer":""
					},
					{
						"id":16,
						"title":"听到旁人听不到的声音",
						"optionList":[
						{"id":"A","content":"从无",},
						{"id":"B","content":"轻度",},
						{"id":"C","content":"中度",},
						{"id":"D","content":"偏重",},
						{"id":"E","content":"严重",},
						],
						"userAnswer":""
					},
					{
						"id":17,
						"title":"发抖",
						"optionList":[
						{"id":"A","content":"从无",},
						{"id":"B","content":"轻度",},
						{"id":"C","content":"中度",},
						{"id":"D","content":"偏重",},
						{"id":"E","content":"严重",},
						],
						"userAnswer":""
					},
					// {
					// 	"id":18,
					// 	"title":"感到大多数人都不可信任",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":19,
					// 	"title":"胃口不好",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":20,
					// 	"title":"容易哭泣",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":21,
					// 	"title":"同异性相处时感到害羞和不自在",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":22,
					// 	"title":"感到受骗，中了圈套或有人想抓住您",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":23,
					// 	"title":"无缘无故地突然感到害怕",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":24,
					// 	"title":"自己不能控制地大发脾气",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":25,
					// 	"title":"怕单独出门",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":26,
					// 	"title":"经常责怪自己",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":27,
					// 	"title":"腰痛",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":28,
					// 	"title":"感到难以完成任务",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":29,
					// 	"title":"感到孤独",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":30,
					// 	"title":"感到苦闷",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":31,
					// 	"title":"过分担忧",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":32,
					// 	"title":"对事物不感兴趣",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":33,
					// 	"title":"感到害怕",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":34,
					// 	"title":"您的感情容易受到伤害",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":35,
					// 	"title":"旁人能知道您的私下想法",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":36,
					// 	"title":"感到别人不理解您，不同情您",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":37,
					// 	"title":"感到人们对您不友好，不喜欢您",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":38,
					// 	"title":"做事必须做得很慢以保证做得正确",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":39,
					// 	"title":"心跳得很厉害",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":40,
					// 	"title":"恶心或胃部不舒服",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":41,
					// 	"title":"感到比不上他人",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":42,
					// 	"title":"肌肉酸痛",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":43,
					// 	"title":"感到有人在监视您、谈论您",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":44,
					// 	"title":"难以入睡",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":45,
					// 	"title":"做事必须反复检查",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":46,
					// 	"title":"难以作出决定",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":47,
					// 	"title":"怕乘电车、公共汽车、地铁或火车",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":48,
					// 	"title":"呼吸有困难",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":49,
					// 	"title":"一阵阵发冷或发热",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":50,
					// 	"title":"因为感到害怕而避开某些东西、场合或活动",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":51,
					// 	"title":"脑子变空了",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":52,
					// 	"title":"身体发麻或刺痛",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":53,
					// 	"title":"喉咙有梗塞感",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":54,
					// 	"title":"感到前途没有希望",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":55,
					// 	"title":"不能集中注意力",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":56,
					// 	"title":"感到身体的某一部分软弱无力",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":57,
					// 	"title":"感到紧张或容易紧张",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":58,
					// 	"title":"感到手或脚发重",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":59,
					// 	"title":"想到死亡的事",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":60,
					// 	"title":"吃得太多",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":61,
					// 	"title":"当别人看着您或谈论您时感到不自在",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":62,
					// 	"title":"有一些不属于您自己的想法",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":63,
					// 	"title":"有想打人或伤害他人的冲动",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":64,
					// 	"title":"醒得太早",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":65,
					// 	"title":"必须反复洗手、点数",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":66,
					// 	"title":"睡得不稳、不深",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":67,
					// 	"title":"有想摔坏或破坏东西的想法",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":68,
					// 	"title":"有一些别人没有的想法",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":69,
					// 	"title":"感到对别人神经过敏",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":70,
					// 	"title":"在商店或电影院等人多的地方感到不自在",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":71,
					// 	"title":"感到任何事情都很困难",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":72,
					// 	"title":"一阵阵恐惧或惊恐",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":73,
					// 	"title":"感到公共场合吃东西很不舒服",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":74,
					// 	"title":"经常与人争论",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":75,
					// 	"title":"单独一人时神经很紧张",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":76,
					// 	"title":"别人对您的成绩没有做出恰当的评价",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":77,
					// 	"title":"即使和别人在一起也感到孤单",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":78,
					// 	"title":"感到坐立不安心神不宁",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":79,
					// 	"title":"感到自己没有什么价值",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":80,
					// 	"title":"感到熟悉的东西变成陌生或不像是真的",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":81,
					// 	"title":"大叫或摔东西",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":82,
					// 	"title":"害怕会在公共场合昏倒",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":83,
					// 	"title":"感到别人想占您的便宜",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":84,
					// 	"title":"为一些有关性的想法而很苦恼",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":85,
					// 	"title":"您认为应该因为自己的过错而受到惩罚",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":86,
					// 	"title":"感到要很快把事情做完",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":87,
					// 	"title":"感到自己的身体有严重问题",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":88,
					// 	"title":"从未感到和其他人很亲近",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":89,
					// 	"title":"感到自己有罪",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					// {
					// 	"id":90,
					// 	"title":"感到自己脑子有毛病",
					// 	"optionList":[
					// 	{"id":"A","content":"从无",},
					// 	{"id":"B","content":"轻度",},
					// 	{"id":"C","content":"中度",},
					// 	{"id":"D","content":"偏重",},
					// 	{"id":"E","content":"严重",},
					// 	],
					// 	"userAnswer":""
					// },
					]
				}
			}
		},
		mounted(){
			this.setAnswerHeight()
		},
		components:{
			Modal
		},
		methods: {
			/*设置题目的高度
			 */
			setAnswerHeight(){
				let that = this
				let tempHeight = 0
				uni.getSystemInfo({
					//获取手机屏幕高度信息，让swiper的高度和手机屏幕一样高                
					success: function(res) {               
						tempHeight = res.windowHeight;
						that.modalHeight = res.windowHeight - uni.upx2px(200) + 'px';
						that.modalContentHeight = res.windowHeight - uni.upx2px(380) + 'px';
						uni.createSelectorQuery().select("#header").fields({
							size: true,
							scrollOffset: true
						}, (data) => {
							tempHeight -= data.height;
							uni.createSelectorQuery().select("#subHeader").fields({
								size: true,
								scrollOffset: true
							}, (data) => {
								tempHeight -= data.height;
								uni.createSelectorQuery().select("#footer").fields({
									size: true,
									scrollOffset: true
								}, (data) => {
									tempHeight -= data.height;
									that.swiperHeight = tempHeight + 'px';
								}).exec();
							}).exec();
						}).exec();
					}
				});
			},
			/*跳转指定题目
			* */
			handleJumpSwiper(index){
				this.currentIndex = index
				this.showQuestion = false
			},
			/* 滑动题目
			 */
			handleSwiperChanged(event){
				this.currentIndex = event.detail.current
			},
			/* 调用上一页，下一页
			 */
			handleChangeCurrentSwiper(operation){
				let max = this.questtionList.length -1
				let min = 0
				if((this.currentIndex>min && operation<0) || (this.currentIndex<max&&operation>0) ){
					this.currentIndex += operation
					console.log("index:"+this.currentIndex)
				}
			},
			/* 选择答案（单选，判断）
			 */
			chooseSolution(item, subItem){
				if(!this.isReviewed){
					item.userAnswer = subItem.id
					setTimeout(()=> {
						if(this.currentIndex<this.questtionList.length-1)
							this.currentIndex +=1
						else{
							this.currentIndex = this.questtionList.length
							this.currentIndex = this.currentIndex-1
						}
					},250)
					this.onAnswerChange(item)
				}
				console.log("index:"+this.currentIndex+" answer:"+item.userAnswer)
			},
				
			
			/* 题目答案变化
			 */
			onAnswerChange(item){
				let result = JSON.parse(JSON.stringify(item))
				this.$emit('onChange', item)
			},
			/* 提交答案
			 */
			handleSubmit(){
				var sig=1,score=0;
				for(var i=0;i<this.questtionList.length;++i)
				{
					if(this.questtionList[i].userAnswer=="")
					{
						alert("请完成所有题目！")
						sig=0;
						break;
					}
					if(this.questtionList[i].userAnswer=="A") score+=0
					if(this.questtionList[i].userAnswer=="B") score+=1
					if(this.questtionList[i].userAnswer=="C") score+=2
					if(this.questtionList[i].userAnswer=="D") score+=3
					if(this.questtionList[i].userAnswer=="E") score+=4
					console.log(i+":"+this.questtionList[i].userAnswer+" ")
				}
				if(sig==1)
				{
					this.$router.replace('/pages/result/result')
					console.log("Submit successed!\n" )
					console.log("Your score is "+score+". Average score: "+score/90)
				}
					
				if(sig==0)
					console.log("Submit failed!")
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #FFFFFF;
	}
#header, #subHeader{
	height: 100rpx;
}
.header{
	position: relative;
	text-align: center;
	line-height: 100rpx;
	font-size: 30rpx;
	font-weight: 600;
	color: #00aa00;
	letter-spacing: 10rpx;
	&-button{
		width: 80rpx;
		height: 40rpx;
		line-height: 40rpx;
		position: absolute;
		top: 20rpx;
		right: 40rpx;
		padding: 10rpx 20rpx;
		border-radius: 15rpx;
		letter-spacing: 2rpx;
		font-weight: 500;
		color: #FFFFFF;
		background-color:  #00b881;
	}
}
.sub-header{
	padding: 30rpx 20rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: #00aa00;
}
.content{
	letter-spacing: 3rpx;
	&-item-explain{
		padding-bottom: 20rpx;
		font-size: 30rpx;
		color: #8799a3;
		letter-spacing: 5rpx;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		&-result{
			padding: 20rpx 0;
			span{
				padding-left: 20rpx;
				color: #00aa00;
			}
		}
		&-content{
			padding: 20rpx 0;
		}
	}
	&-item{
		padding: 0 20rpx;
		box-sizing: border-box;
	}
	&-title{
		margin-bottom: 30rpx;
		font-size: 38rpx;
		line-height: 55rpx;
		color: #000000
	}
	&-solutions{
		width: 100%;
		padding-bottom: 20rpx;
		&-item{
			margin: 60rpx 0;
			border: 5rpx solid  #00b881;
			border-radius: 20rpx;
			display: flex;
			align-items: center;
			font-size: 30rpx;
			background-color:  #00b881;
			&-check-content{
				padding: 35rpx 20rpx;
				width: 100%;
				border-radius: 15rpx;
				color: #000000;
				background-color: #FFFFFF;
			}
			&-single{
				width: 80rpx;
				text-align: center;
				color: #FFFFFF;
			}
			
			&-content{
				padding: 35rpx 20rpx;
				width: 630rpx;
				border-top-right-radius: 15rpx;
				border-bottom-right-radius: 15rpx;
				color: #000000;
				background-color: #FFFFFF;
			}
			&-select{
				color: #FFFFFF;
				background-color:   #00b881;
			}
		}
	}
}
.footer{
	width: 750rpx;
	height: 100rpx;
	padding: 30rpx 20rpx;
	position: fixed;
	display: flex;
	align-items: center;
	justify-content: space-between;
	bottom: 0;
	font-size: 30rpx;
	box-sizing: border-box;
	color: #000000;
	box-shadow: 0 -5rpx 5rpx #00aa00;
	&-card{
		padding: 10rpx 20rpx;
		border: 1px solid #00b881;
		border-radius: 15rpx;
		color: #FFFFFF;
		background-color: #00b881;
	}
}
.question-modal{
	width: 700rpx;
	padding: 40rpx;
	background-color: #FFFFFF;
	&-header{
		height: 100rpx;
		text-align: center;
		font-size: 35rpx;
		line-height: 100rpx;
		color: #333333;
		border-bottom: 1rpx solid #F0F0F0;
	}
	&-body{
		&-item{
			width: 80rpx;
			margin: 10rpx 22rpx;
			height: 80rpx;
			line-height: 80rpx;
			font-size: 35rpx;
			display: inline-block;
			text-align: center;
			border-radius: 50%;
			color: #8799a3;
		}
		&-item-failed{
			color: #FFFFFF;
			background-color: #982121;
		}
		&-item-right{
			color: #FFFFFF;
			background-color: #000000;
		}
		&-item-select{
			color: #FFFFFF;
			background-color: #00aa00;
		}
	}
}
.right{
	border: 5rpx solid #000000;
}

</style>
