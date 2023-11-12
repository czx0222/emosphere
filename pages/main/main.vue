
<template>
  <div id="app">
    <img alt="背景图" src="/static/assets/z.png" style="width: auto;">
	<router-link :to="{ path: '/pages/about/about' }">
		<img alt="z11" src="/static/assets/z11.png" style="position: absolute; top: 40px; left: 20px;">
	</router-link>

    <img alt="z12" src="/static/assets/z12.png" style="position: absolute; top: calc(50% - 80px); left: 50%; transform: translate(-50%, -50%);">
    <div style="position: absolute; top: calc(70% - 30px); left: 50%; transform: translateX(-50%); display: flex; justify-content: space-between; width: 80%;">
      <div style="position: relative;">
        <img alt="z2" src="/static/assets/z2.png">
        <img alt="z3" src="/static/assets/z3.png" style="position: absolute; top: 8px; left: 8px;">
      </div>
	  <view >
	  	<div style="position: relative;">
	  	  <img alt="z2" src="/static/assets/z2.png">
	  	  <img alt="z4" src="/static/assets/z4.png" style="position: absolute; top: 12px; left: 11px;">
	  	</div>
	  </view>

      <div style="position: relative;">
        <img alt="z2" src="/static/assets/z2.png">
        <img alt="z5" src="/static/assets/z5.png" style="position: absolute; top: 10px; left: 7px;">
      </div>
      <div style="position: relative;">
        <img alt="z2" src="/static/assets/z2.png">
        <img alt="z6" src="/static/assets/z6.png" style="position: absolute; top: 5px; left: 5px;">
      </div>
    </div>
	
    <div @click="Toclander" style="position: absolute; bottom: 100px; left: 50%; transform: translateX(-50%); display: flex;">
      <img alt="z10" src="/static/assets/z10.png" style="align-self: center; margin-right: 20px;">
      <img alt="z13" src="/static/assets/z13.png" style="align-self: center;">
    </div>
  </div>
</template>

<script setup>
	import { useRouter } from 'vue-router';
	const router = useRouter();
	const Toclander = () =>{
		router.push('/pages/clander/clander')
	}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  max-width: 100%;
  margin: 0 auto;
  position: relative;
}

img {
  max-width: 100%;
  height: auto;
}

div {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>