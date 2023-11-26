
<template>
	
	<view class="flex padding-sm justify-between">
		<view class="flex padding-top-xs text-xxxl text-black">
			<navigator url="/pages/index/index" open-type="navigateBack">
				<a-button>
				  <text class="cuIcon-close text-black" alt></text>
				</a-button>
			</navigator>
		</view>
		<view class="text-xxxl">
			<view class="flex justify-center cuIcon-more text-blace"></view>
		</view>
	</view>
    <view style="background-color: #f2f2f2;padding-top: 30;">
		<!-- 内容显示行数控制 设置为0显示所有内容 -->
        <YSteps lineNum='0' color='#fff' backgroundColor='#000fff' :infoList='list'></YSteps>
    </view>
</template>
<script>
    import YSteps from '../../components/Y-Steps/Y-Steps.vue'
    export default {
        components: {
            YSteps
        },
        data() {
            return {
                list: [
                        {
                            date: '2020-1-4',
                            info: '第一次听这首歌，旋律很好听'
                        },

                        {
                            date: '2020-7-4',
                            info: '好多人和我一样喜欢听这首歌，好开心'
                        },

                        {
                            date: '2021-3-22',
                            info: '好久没听这首歌了，让我回想起一些往事，有点伤感'
                        },

                    ]
                };

        },
        methods: {

        }
    }
</script>

<style>

</style>