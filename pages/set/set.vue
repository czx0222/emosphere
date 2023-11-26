<template>
  <view class="backarea">
    <view class="header">
      <router-link :to="{ path: '/pages/login/login' }">
        <view class="head-left">
          <img src="/static/images/fanhui.png" />
          <text>返回</text>
        </view>
      </router-link>
    </view>
    <view class="info">
      <div class="circle">
        <img src="/static/images/touxiang.png" alt="" />
      </div>
      <view class="info-item">
        <text class="label">昵称:</text>
        <input class="left" type="text" placeholder="请填写" v-model="usernameInput" />
      </view>
      <view class="info-item">
        <text class="label">性别:</text>
		<input class="left" type="text" placeholder="请填写" v-model="selectedGender" />


      </view>
      <view class="info-item">
        <text class="label">生日:</text>
        <uni-datetime-picker class="left" type="date" :clear-icon="true" v-model="single" />
      </view>
      <view class="info-item">
        <text class="label">常住地:</text>
        <input class="left" type="text" placeholder="请填写" v-model="statusInput" />
      </view>
      <view class="login-card-loginIn-btn" @click="tomain">
        设置完成
      </view>
    </view>
  </view>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import store from '@/store';

export default {
  setup() {
    const router = useRouter();
    const single = ref('');
    const usernameInput = ref('小吴');
    const statusInput = ref('福州');
	const selectedGender = ref('男');
	const upload = () => {
		uni.chooseImage({
			count: 1,
			sizeType: ['original', 'compressed'],
			sourceType: ['album'],
			loop: true,
			success: (res) => {
				console.log(res);
				if (res.tempFilePaths.length !== 0) {
					imgList.value.push(res.tempFilePaths[0]);
					var tempFilePaths = res.tempFilePaths;
					// uni.uploadFile({
					//   url: 'http://douzhuoqianshouba.xieenguoji.com/api/ajax/upload',
					//   filePath: tempFilePaths[0],
					//   name: 'file',
					//   success: (uploadFileRes) => {},
					//   fail: (err) => {
					//     console.log(err);
					//   },
					// });
				}
			},
		});
	};

    const tomain = () => {

      const username = usernameInput.value;
      const userBirthday = single.value;
       const userGender = selectedGender.value;
      const userStatus = statusInput.value;
      store.commit('UserData', {
        username,
        userBirthday,
        userGender,
        userStatus,
      });
	console.log(store.state.username,store.state.userBirthday,store.state.userGender,store.state.userStatus);
    router.push('/pages/main/main');
    };

    return { single, tomain, usernameInput, statusInput,selectedGender };
  },
};
</script>


<style>
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

  .header {
    width: 90%;
    margin: 20px;
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

  .info {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    top: 2rem;
	width: 90%;
  }

  .info-item {
    display: flex;
    margin: 20px;
    align-items: center; 
	width: 70%;
  }

  .info-item .label {
    font-size: 20px;
    font-weight: bold;
    margin-right: 10px;
	width: 35%;
  }
  .info-item .left{
	  width: 65%;
  }

  .circle {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .circle img {
    width: 70px;
    height: 70px;
  }
  .login-card-loginIn-btn{
  	top:3rem;
  	position: relative;
  	display: flex;
  	justify-content: center;
  	align-items: center;
    background-color:rgba(0, 0, 0, 0.5);
    width: 200px;
    font-size: 20px;
    height: 50px;
    border-radius: 40px;
    color: white;
  }
</style>
