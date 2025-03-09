<template>
	<view class="m-recorder" v-show="isShow">
		<view class="icon_ m-recorder-gif">
			<image class="img" :src="require('../../static/chat_page/sound.gif')" mode="heightFix" v-if="recordTime < 50"></image>
			<view class="color_4a" v-else>{{ 60 - recordTime }}"后将停止录音</view>
		</view>
		<view class="m-recorder-str2" :class="{ m_recorder_str2: isCancel }">
			<view class="icon_ size_white m-recorder-text" v-if="isCancel">
				松手
				<view style="width: 10rpx"></view>
				取消
			</view>
			<view class="icon_ size_white m-recorder-text" v-else>
				上划
				<view style="width: 10rpx"></view>
				取消
			</view>
		</view>
		<view class="m-recorder-str">
			<view class="m-recorder-str-icon">
				<image
					class="img"
					src="data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTY3NC44MDYgNzcuMTI2YTQ2LjAwOCA0Ni4wMDggMCAwIDAtNjYuMTc2IDAgNDYuMDA4IDQ2LjAwOCAwIDAgMCAwIDYzLjAyNSA1MjAuNTg4IDUyMC41ODggMCAwIDEgMCA3MzUuNTA0IDQ3LjI2OSA0Ny4yNjkgMCAwIDAgMCA2Ni44MDcgNDcuMjY5IDQ3LjI2OSAwIDAgMCA2Ni44MDcgMCA2MTQuNDk2IDYxNC40OTYgMCAwIDAtLjYzLTg2NS4zMzZ6IiBmaWxsPSIjNTE1MTUxIi8+PHBhdGggZD0iTTQ2Ny40NTMgMjQyLjg4MmE0Ny4yNjkgNDcuMjY5IDAgMCAwLTYzLjAyNSAwIDQ2LjYzOSA0Ni42MzkgMCAwIDAgMCA2My4wMjYgMjk5LjM3IDI5OS4zNyAwIDAgMSAwIDQyMi4yNjggNDcuMjY5IDQ3LjI2OSAwIDAgMCAwIDYzLjAyNiA0Ni42MzkgNDYuNjM5IDAgMCAwIDYzLjAyNSAwIDM5My45MDggMzkzLjkwOCAwIDAgMCAwLTU0OC4zMnptLTI3Ny4zMSAyMTQuOTE2YTc4LjE1MSA3OC4xNTEgMCAwIDAgMCAxMTAuOTI1IDc4Ljc4MiA3OC43ODIgMCAxIDAgMC0xMTAuOTI1eiIgZmlsbD0iIzUxNTE1MSIvPjwvc3ZnPg=="
					mode="aspectFill"
				></image>
			</view>
		</view>
	</view>
</template>

<script>
let recordTimeInterval = null;
export default {
	props: {
		value: {
			type: Boolean,
			default: false
		},
		isCancel: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			recordTime: 1,
			isShow: false,
			emojiList: []
		};
	},
	watch: {
		value: {
			handler: function (newV) {
				this.isShow = newV;
				this.recordTime = 1;
				if (newV) {
					recordTimeInterval = setInterval(() => {
						this.recordTime++;
						if (this.recordTime === 60) {
							this.touchend();
						}
					}, 1000);
				} else {
					clearInterval(recordTimeInterval);
				}
				this.$nextTick(() => {
					let view = uni.createSelectorQuery().select('.m-recorder-str');
					view.boundingClientRect((data) => {
						this.$emit('recorderTop', data);
					}).exec();

					// setTimeout(() => {
					// 	const query = uni.createSelectorQuery().in(this);
					// 	query
					// 		.select('.m-recorder-str')
					// 		.boundingClientRect((data) => {
					// 			console.log('得到布局位置信息' + JSON.stringify(data));
					// 			console.log('节点离页面顶部的距离为' + data.top);
					// 		})
					// 		.exec();
					// }, 1000);
				});
			},
			immediate: true
		}
	},
	methods: {
		touchend() {
			this.$emit('touchend');
		}
	}
};
</script>

<style lang="scss" scoped>
.m-recorder {
	position: fixed;
	z-index: 9999;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	overflow: hidden;
	background-color: rgba(0, 0, 0, 0.75);

	.m-recorder-gif {
		position: absolute;
		top: 50vh;
		left: calc(50% - 160rpx);
		z-index: 99;
		width: 340rpx;
		height: 170rpx;
		box-sizing: border-box;
		padding: 16rpx;
		border-radius: 30rpx;
		background-color: #95ec6a;
		.img {
			width: 100%;
			height: 100%;
		}
	}
	.m-recorder-gif::after {
		position: absolute;
		z-index: -1;
		content: '';
		bottom: -10rpx;
		left: calc(50% - 18rpx);
		width: 36rpx;
		height: 36rpx;
		border-radius: 2px;
		transform: rotate(45deg);
		background-color: #95ec6a;
	}

	.m-recorder-str {
		box-sizing: border-box;
		position: absolute;
		top: calc(100vh - 300rpx);
		left: calc(50% - 150vw);
		width: 300vw;
		height: 300vw;
		border: 12rpx solid #cccccc;
		border-radius: 50%;
		background-image: radial-gradient(#fff, #dddddd, #797979);
		.m-recorder-str-icon {
			position: absolute;
			top: 100rpx;
			left: calc(50% - 25rpx);
			width: 60rpx;
			height: 60rpx;
		}
	}
	.m-recorder-str2 {
		box-sizing: border-box;
		position: absolute;
		top: calc(100vh - 400rpx);
		left: calc(50% - 150vw);
		width: 300vw;
		height: 300vw;
		opacity: 0.7;
		background-color: rgba(240, 240, 240, 0.3);
		border-radius: 50%;
		transition: all 0.2s;
		.m-recorder-text {
			width: 200rpx;
			position: absolute;
			top: 30rpx;
			left: calc(50% - 100rpx);
		}
	}
	.m_recorder_str2 {
		background-color: #fa5251;
		box-shadow: #fa5251 0px 0px 50px;
	}
}
</style>
