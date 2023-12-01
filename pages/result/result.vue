<template>
	
	<div class="background">
		<p class="text-res" style="position: absolute;left: 4%;top: 5%;">测试结果：</p>
		<div class="rounded-box" style="position: absolute;left: 7.5%;top: 12%;height: 30%;width: 85%;">
			<p class="text-output" style="position: absolute;left: 5%;top: 3%;">您的测试总分为: {{score}}</p>
			<p class="text-output" style="position: absolute;left: 5%;top: 18%;">测试总均分为: {{average_score}}</p>
			<p class="text-output" style="position: absolute;left: 5%;top: 32%;">整体的心理健康情况为: </p>
			
			<p class="text-res" style="position: absolute;left: 4%;top: 48%;">{{situation}}</p>
		</div>
		
		<div class="rounded-circle" style="position: absolute;left: 35%;top: 25%;height: 20%;width: 30%;">
			<image src="../../static/images/result_1.png" style="left: 20%;top: 50%;;height: 40%;width: 60%;"></image>
		</div>
		
		
		<div>
			<image src="../../static/images/leaf.png" style="position: absolute;left: 5%;top: 46%;width: 33px;height: 33px;"></image>
			<p class="text-output" style="position: absolute;left: 15%;top: 46%;">我对您的建议为:</p>
		</div>
		
		<div class="rounded-res" style="position: absolute;left: 5%;top: 52%;height: 10%;width: 90%;opacity: 0.8;">
			<p class="text-output1" style="position: absolute;left: 5%;top: 3%;">1.{{text1}}</p>
		</div>
		<div class="rounded-res" style="position: absolute;left: 5%;top: 64%;height: 10%;width: 90%;opacity: 0.8;">
			<p class="text-output1" style="position: absolute;left: 5%;top: 3%;">2.{{text2}}</p>
		</div>
		<div class="rounded-res" style="position: absolute;left: 5%;top: 76%;height: 10%;width: 90%;opacity: 0.8;">
			<p class="text-output1" style="position: absolute;left: 5%;top: 3%;">3.{{text3}}</p>
		</div>
		<div class="rounded-res" style="position: absolute;left: 5%;top: 88%;height: 10%;width: 90%;opacity: 0.8;">
			<p class="text-output1" style="position: absolute;left: 5%;top: 3%;">4.{{text4}}</p>
		</div>
		<view class="login-card-loginIn-btn" @click="fan">
			返回聊天
		</view>
	</div>

</template>

<script>
	import { useRouter } from 'uni-mini-router'
	export default {
		data() {
			let router = useRouter()
			const fan = () =>{
				router.replace('/pages/chat/chat')
			}
			return {
				bgColor: "#BAD0CE", // 设置背景色为绿色
				fan,
				score: '',
				average_score: '',
				pos_items: '',
				pas_items: '',
				pos_sym_num: '',
				factor1: '',
				factor2: '',
				factor3: '',
				factor4: '',
				factor5: '',
				factor6: '',
				factor7: '',
				factor8: '',
				factor9: '',
				factor10: '',
				situation: '',
				text1: '',
				text2: '',
				text3: '',
				text4: '',
			}
		},
		onLoad(query) {
		  // 获取参数
		  this.score = query.score||'';
		  this.average_score = query.average_score||'';
		  this.pos_items = query.pos_items||'';
		  this.pas_items = query.pas_items||'';
		  this.pos_sym_num = query.pos_sym_num||'';
		  this.factor1 = query.factor1||'';
		  this.factor2 = query.factor2||'';
		  this.factor3 = query.factor3||'';
		  this.factor4 = query.factor4||'';
		  this.factor5 = query.factor5||'';
		  this.factor6 = query.factor6||'';
		  this.factor7 = query.factor7||'';
		  this.factor8 = query.factor8||'';
		  this.factor9 = query.factor9||'';
		  this.factor10 = query.factor10||'';
		  this.average_score=parseFloat(this.average_score)
		  this.average_score= Math.floor(this.average_score * 100) / 100
		  if(this.average_score>=1 && this.average_score<2){
			  this.situation="心理健康"
		  }else if(this.average_score>=2 && this.average_score<3){
			  this.situation="亚健康心理状态"
		  }else if(this.average_score>=3 && this.average_score<4){
			  this.situation="有心理健康问题"
		  }else if(this.average_score>=4 && this.average_score<5){
			  this.situation="有严重心理健康问题"
		  }
		  var arr=[]
		  var randomNum
		  for(var i=0;i<4;++i)
		  {
			  while(1){
				randomNum = Math.floor(Math.random() * 10) + 1;
				if(arr[randomNum]==1) continue
				else{
					arr[randomNum]=1
					break
				}
			  }
			  if(i==0){
				  if(randomNum==1){
				  	this.text1="建议进行一些放松训练，例如深呼吸、渐进性肌肉放松等，这些方法可以帮助您缓解身体紧张和不适感。"
				  }
				  if(randomNum==2){
				  	this.text1="建议通过改变您的生活节奏等方式，例如减少压力、增加运动等，改变不良的思维模式和行为习惯，进而提高对于强迫症状的控制程度。"
				  }
				  if(randomNum==3){
				  	this.text1="建议尝试与他人多交流，保持积极的生活态度，多参加社交活动，逐渐增加自信心和社交能力。"
				  }
				  if(randomNum==4){
				  	this.text1="建议时刻关注自己的情绪变化，了解自己的情绪状态，并寻找适当的情绪调节方法。适当改变生活方式，增加运动、保持良好的作息时间和饮食习惯。"
				  }
				  if(randomNum==5){
				  	this.text1="建议尝试放松训练，通过进行深呼吸等放松训练，缓解身体紧张和心理压力。与亲朋好友、同事或专业心理咨询师交流，分享自己的感受和困惑，减轻孤独感和压力。"
				  }
				  if(randomNum==6){
				  	this.text1="建议尝试控制自己的情绪和行为，可以采取一些冷静下来的方法，如深呼吸、短暂停顿等。尊重他人的观点和感受，避免对他人的言论或行为过于敏感或反应过度。"
				  }
				  if(randomNum==7){
				  	this.text1="建议找出导致恐惧的原因,逐渐暴露自己于恐惧的场所或物体中，以逐渐适应和克服恐惧。"
				  }
				  if(randomNum==8){
				  	this.text1="建议学习一些积极的思维方式和应对策略,与亲朋好友、同事或专业心理咨询师交流，分享自己的感受和困惑，获得支持和理解。"
				  }
				  if(randomNum==9){
				  	this.text1="建议睡前避免饮用咖啡、茶或含咖啡因的饮料，避免剧烈运动或观看刺激性的电视节目。避免暴饮暴食，每餐尽量控制食量，避免过饱。"
				  }
				  if(randomNum==10){
				  	this.text1="建议寻求专业帮助，如果你感到抑郁或焦虑症状严重或持续存在，建议咨询心理医生或精神科医生，接受专业的评估和治疗。"
				  } 
			  }
			  if(i==1){
			  	  if(randomNum==1){
			  	  	this.text2="建议进行一些放松训练，例如深呼吸、渐进性肌肉放松等，这些方法可以帮助您缓解身体紧张和不适感。"
			  	  }
			  	  if(randomNum==2){
			  	  	this.text2="建议通过改变您的生活节奏等方式，例如减少压力、增加运动等，改变不良的思维模式和行为习惯，进而提高对于强迫症状的控制程度。"
			  	  }
			  	  if(randomNum==3){
			  	  	this.text2="建议尝试与他人多交流，保持积极的生活态度，多参加社交活动，逐渐增加自信心和社交能力。"
			  	  }
			  	  if(randomNum==4){
			  	  	this.text2="建议时刻关注自己的情绪变化，了解自己的情绪状态，并寻找适当的情绪调节方法。适当改变生活方式，增加运动、保持良好的作息时间和饮食习惯。"
			  	  }
			  	  if(randomNum==5){
			  	  	this.text2="建议尝试放松训练，通过进行深呼吸等放松训练，缓解身体紧张和心理压力。与亲朋好友、同事或专业心理咨询师交流，分享自己的感受和困惑，减轻孤独感和压力。"
			  	  }
			  	  if(randomNum==6){
			  	  	this.text2="建议尝试控制自己的情绪和行为，可以采取一些冷静下来的方法，如深呼吸、短暂停顿等。尊重他人的观点和感受，避免对他人的言论或行为过于敏感或反应过度。"
			  	  }
			  	  if(randomNum==7){
			  	  	this.text2="建议找出导致恐惧的原因,逐渐暴露自己于恐惧的场所或物体中，以逐渐适应和克服恐惧。"
			  	  }
			  	  if(randomNum==8){
			  	  	this.text2="建议学习一些积极的思维方式和应对策略,与亲朋好友、同事或专业心理咨询师交流，分享自己的感受和困惑，获得支持和理解。"
			  	  }
			  	  if(randomNum==9){
			  	  	this.text2="建议睡前避免饮用咖啡、茶或含咖啡因的饮料，避免剧烈运动或观看刺激性的电视节目。避免暴饮暴食，每餐尽量控制食量，避免过饱。"
			  	  }
			  	  if(randomNum==10){
			  	  	this.text2="建议寻求专业帮助，如果你感到抑郁或焦虑症状严重或持续存在，建议咨询心理医生或精神科医生，接受专业的评估和治疗。"
			  	  } 
			  }
			  if(i==2){
			  	  if(randomNum==1){
			  	  	this.text3="建议进行一些放松训练，例如深呼吸、渐进性肌肉放松等，这些方法可以帮助您缓解身体紧张和不适感。"
			  	  }
			  	  if(randomNum==2){
			  	  	this.text3="建议通过改变您的生活节奏等方式，例如减少压力、增加运动等，改变不良的思维模式和行为习惯，进而提高对于强迫症状的控制程度。"
			  	  }
			  	  if(randomNum==3){
			  	  	this.text3="建议尝试与他人多交流，保持积极的生活态度，多参加社交活动，逐渐增加自信心和社交能力。"
			  	  }
			  	  if(randomNum==4){
			  	  	this.text3="建议时刻关注自己的情绪变化，了解自己的情绪状态，并寻找适当的情绪调节方法。适当改变生活方式，增加运动、保持良好的作息时间和饮食习惯。"
			  	  }
			  	  if(randomNum==5){
			  	  	this.text3="建议尝试放松训练，通过进行深呼吸等放松训练，缓解身体紧张和心理压力。与亲朋好友、同事或专业心理咨询师交流，分享自己的感受和困惑，减轻孤独感和压力。"
			  	  }
			  	  if(randomNum==6){
			  	  	this.text3="建议尝试控制自己的情绪和行为，可以采取一些冷静下来的方法，如深呼吸、短暂停顿等。尊重他人的观点和感受，避免对他人的言论或行为过于敏感或反应过度。"
			  	  }
			  	  if(randomNum==7){
			  	  	this.text3="建议找出导致恐惧的原因,逐渐暴露自己于恐惧的场所或物体中，以逐渐适应和克服恐惧。"
			  	  }
			  	  if(randomNum==8){
			  	  	this.text3="建议学习一些积极的思维方式和应对策略,与亲朋好友、同事或专业心理咨询师交流，分享自己的感受和困惑，获得支持和理解。"
			  	  }
			  	  if(randomNum==9){
			  	  	this.text3="建议睡前避免饮用咖啡、茶或含咖啡因的饮料，避免剧烈运动或观看刺激性的电视节目。避免暴饮暴食，每餐尽量控制食量，避免过饱。"
			  	  }
			  	  if(randomNum==10){
			  	  	this.text3="建议寻求专业帮助，如果你感到抑郁或焦虑症状严重或持续存在，建议咨询心理医生或精神科医生，接受专业的评估和治疗。"
			  	  } 
			  }
			  if(i==3){
			  	  if(randomNum==1){
			  	  	this.text4="建议进行一些放松训练，例如深呼吸、渐进性肌肉放松等，这些方法可以帮助您缓解身体紧张和不适感。"
			  	  }
			  	  if(randomNum==2){
			  	  	this.text4="建议通过改变您的生活节奏等方式，例如减少压力、增加运动等，改变不良的思维模式和行为习惯，进而提高对于强迫症状的控制程度。"
			  	  }
			  	  if(randomNum==3){
			  	  	this.text4="建议尝试与他人多交流，保持积极的生活态度，多参加社交活动，逐渐增加自信心和社交能力。"
			  	  }
			  	  if(randomNum==4){
			  	  	this.text4="建议时刻关注自己的情绪变化，了解自己的情绪状态，并寻找适当的情绪调节方法。适当改变生活方式，增加运动、保持良好的作息时间和饮食习惯。"
			  	  }
			  	  if(randomNum==5){
			  	  	this.text4="建议尝试放松训练，通过进行深呼吸等放松训练，缓解身体紧张和心理压力。与亲朋好友、同事或专业心理咨询师交流，分享自己的感受和困惑，减轻孤独感和压力。"
			  	  }
			  	  if(randomNum==6){
			  	  	this.text4="建议尝试控制自己的情绪和行为，可以采取一些冷静下来的方法，如深呼吸、短暂停顿等。尊重他人的观点和感受，避免对他人的言论或行为过于敏感或反应过度。"
			  	  }
			  	  if(randomNum==7){
			  	  	this.text4="建议找出导致恐惧的原因,逐渐暴露自己于恐惧的场所或物体中，以逐渐适应和克服恐惧。"
			  	  }
			  	  if(randomNum==8){
			  	  	this.text4="建议学习一些积极的思维方式和应对策略,与亲朋好友、同事或专业心理咨询师交流，分享自己的感受和困惑，获得支持和理解。"
			  	  }
			  	  if(randomNum==9){
			  	  	this.text4="建议睡前避免饮用咖啡、茶或含咖啡因的饮料，避免剧烈运动或观看刺激性的电视节目。避免暴饮暴食，每餐尽量控制食量，避免过饱。"
			  	  }
			  	  if(randomNum==10){
			  	  	this.text4="建议寻求专业帮助，如果你感到抑郁或焦虑症状严重或持续存在，建议咨询心理医生或精神科医生，接受专业的评估和治疗。"
			  	  } 
			  }
		  }
		  console.log(this.text1)
		  console.log(this.text2)
		  console.log(this.text3)
		  console.log(this.text4)
		},
		methods: {
			}

	}
</script>

<style>
	.login-card-loginIn-btn {
		position: absolute;
		top: 100%;
		left: 30%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #00b881;
		width: 40%;
		font-size: 20px;
		height: 50px;
		border-radius: 40px;
		color: white;
	}
	.background {
		background-image: url("../../static/images/back2.png");
		height: 110vh;
		width: 100%;
	}

	.rounded-box {
		background-color: #f5f8f7;
		/* 设置方框的颜色 */
		border-radius: 30px;
		/* 设置圆角的半径 */
	}
	
	.rounded-res {
		background-color: #f5f8f7;
		/* 设置方框的颜色 */
		border-radius: 20px;
		/* 设置圆角的半径 */
	}

	.rounded-circle {
		background-color: #f5f8f7;
		/* 设置方框的颜色 */
		border-radius: 100px;
		/* 设置圆角的半径 */
	}
	
	.text-output {
		font-size: 20px;
		font-weight: bold;
		color: #00b881;
		text-align: left;
	}
	
	.text-output1 {
		font-size: 15px;
		font-weight: bold;
		color: darkcyan;
		text-align: left;
	}
	
	.text-res {
		font-size: 40px;
		font-weight: bold;
		color: darkcyan;
		text-align: left;
		z-index: 999;  
	}
</style>