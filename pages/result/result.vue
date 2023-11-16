<template>
	<div class="background">
		<div class="rounded-box" style="position: absolute;left: 10%;top: 10%;height: 20%;width: 80%;">
			<p class="text-output" style="position: absolute;left: 5%;top: 3%;">您的心理评价状态为:</p>
			<p class="text-res" style="position: absolute;left: 33%;top: 40%;">优秀</p>
		</div>
		
		<div class="rounded-circle" style="position: absolute;left: 35%;top: 19%;height: 20%;width: 30%;">
			<image src="../../static/result_1.png" style="left: 20%;top: 50%;;height: 40%;width: 60%;"></image>
		</div>
		
		
		<div>
			<image src="../../static/leaf.png" style="position: absolute;left: 5%;top: 42%;width: 33px;height: 33px;"></image>
			<p class="text-output" style="position: absolute;left: 15%;top: 42%;">我对您的建议为:</p>
		</div>
		
		<div class="rounded-res" style="position: absolute;left: 5%;top: 50%;height: 10%;width: 90%;opacity: 0.8;">
			<p class="text-output1" style="position: absolute;left: 5%;top: 3%;">1、吃吃吃</p>
		</div>
		<div class="rounded-res" style="position: absolute;left: 5%;top: 62%;height: 10%;width: 90%;opacity: 0.8;">
			<p class="text-output1" style="position: absolute;left: 5%;top: 3%;">2、吃吃吃</p>
		</div>
		<div class="rounded-res" style="position: absolute;left: 5%;top: 74%;height: 10%;width: 90%;opacity: 0.8;">
			<p class="text-output1" style="position: absolute;left: 5%;top: 3%;">3、吃吃吃</p>
		</div>
		<div class="rounded-res" style="position: absolute;left: 5%;top: 86%;height: 10%;width: 90%;opacity: 0.8;">
			<p class="text-output1" style="position: absolute;left: 5%;top: 3%;">4、吃吃吃</p>
		</div>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				bgColor: "#BAD0CE", // 设置背景色为绿色

			}
		},
		methods: {

		}
	}
</script>

<style>
	/* 设置背景的大小 */
	.background {
		background-image: url("../../static/back.png");
		height: 844px;
		width: 390;
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
		font-size: 23px;
		font-weight: bold;
		color: #00b881;
		text-align: left;
	}
	
	.text-output1 {
		font-size: 23px;
		font-weight: bold;
		color: darkcyan;
		text-align: left;
	}
	
	.text-res {
		font-size: 50px;
		font-weight: bold;
		color: darkcyan;
		text-align: left;
		z-index: 999;  
	}
</style>