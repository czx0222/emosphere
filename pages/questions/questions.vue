<template>
	<view class="" @click="fan">
		<image src="../../static/images/fan.png" mode=""></image>
	</view>
</template>

<script setup>
	import {
		useRouter
	} from 'uni-mini-router'
	let router = useRouter()
	const fan = ()=>{
		router.replace('/pages/home/home')
	}
</script>

<style>
	image{
		width: 40px;
		height: 40px;
	}
</style>