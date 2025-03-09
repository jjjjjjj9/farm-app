<template>
	<view class="flex_c">
		<view class="flex_r" :class="{ text_box: isMy }">
			<view class="text-box" @tap.stop="onClick">
				<view
					class="text_30 flex_r fa_c text"
					:class="isMy ? 'text_r' : 'text_l'"
					:style="{ width: setWidth }"
					:hover-class="isMy ? 'hover_classr' : 'hover_classl'"
					:hover-stay-time="60"
				>
					<view class="text-icon" v-if="value.pause !== 3">
						<image
							class="img"
							src="data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTY3NC44MDYgNzcuMTI2YTQ2LjAwOCA0Ni4wMDggMCAwIDAtNjYuMTc2IDAgNDYuMDA4IDQ2LjAwOCAwIDAgMCAwIDYzLjAyNSA1MjAuNTg4IDUyMC41ODggMCAwIDEgMCA3MzUuNTA0IDQ3LjI2OSA0Ny4yNjkgMCAwIDAgMCA2Ni44MDcgNDcuMjY5IDQ3LjI2OSAwIDAgMCA2Ni44MDcgMCA2MTQuNDk2IDYxNC40OTYgMCAwIDAtLjYzLTg2NS4zMzZ6Ii8+PHBhdGggZD0iTTQ2Ny40NTMgMjQyLjg4MmE0Ny4yNjkgNDcuMjY5IDAgMCAwLTYzLjAyNSAwIDQ2LjYzOSA0Ni42MzkgMCAwIDAgMCA2My4wMjYgMjk5LjM3IDI5OS4zNyAwIDAgMSAwIDQyMi4yNjggNDcuMjY5IDQ3LjI2OSAwIDAgMCAwIDYzLjAyNiA0Ni42MzkgNDYuNjM5IDAgMCAwIDYzLjAyNSAwIDM5My45MDggMzkzLjkwOCAwIDAgMCAwLTU0OC4zMnptLTI3Ny4zMSAyMTQuOTE2YTc4LjE1MSA3OC4xNTEgMCAwIDAgMCAxMTAuOTI1IDc4Ljc4MiA3OC43ODIgMCAxIDAgMC0xMTAuOTI1eiIvPjwvc3ZnPg=="
							mode="aspectFill"
						></image>
					</view>
					<view class="text-icon" v-if="value.pause == 3">
						<image class="img" style="transform: scale(1.35)"  :src="require('../../static/chat_page/play.gif')" mode="aspectFill"></image>
					</view>
					<view class="text-duration">{{ Math.ceil(value.payload.duration) || 1 }}''</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	components: {},
	props: {
		isMy: {
			type: [Boolean, Number],
			default: false
		},
		value: {
			type: Object,
			default: {}
		}
	},
	data() {
		return {};
	},
	computed: {
		setWidth() {
			let width = 0;
			const duration = Math.ceil(this.value.payload.duration);
			// 基础长度
			let basis = duration - 10;
			if (basis >= 0) {
				width = 10 * 8 + 60;
				width = width + basis * 2;
			} else {
				width = duration * 8 + 60;
			}
			return `${width}px`;
		}
	},
	methods: {
		onClick() {
			this.$emit('onClick');
		}
	}
};
</script>

<style scoped lang="scss">
.row_ {
	flex-direction: row-reverse;
}
.text_box {
	flex-direction: row-reverse;
}
.text-box {
	border-radius: 8rpx;
}

.text {
	position: relative;
	z-index: 99;
	box-sizing: border-box;
	padding: 18rpx 16rpx;
	border-radius: 8rpx;
	word-break: break-all;
	vertical-align: center;
	.text-icon {
		width: 32rpx;
		height: 32rpx;
		margin: 0 4rpx;
	}
	.text-duration {
		margin: 0 8rpx;
	}
}

.text_r {
	position: relative;
	z-index: 2;
	background-color: #95ec6a;
	flex-direction: row-reverse;
	.text-icon {
		transform: rotate(180deg);
	}
}
.text_l {
	position: relative;
	z-index: 2;
	background-color: #fff;
}

.text_r::after {
	position: absolute;
	z-index: -1;
	content: '';
	top: 28rpx;
	right: -8rpx;
	width: 18rpx;
	height: 18rpx;
	border-radius: 2px;
	transform: rotate(45deg);
	background-color: #95ec6a;
}
.text_l::after {
	position: absolute;
	z-index: -1;
	content: '';
	top: 28rpx;
	left: -8rpx;
	width: 18rpx;
	height: 18rpx;
	border-radius: 2px;
	transform: rotate(45deg);
	background-color: #fff;
}
.hover_classr {
	background-color: #89d961;
}
.hover_classl {
	background-color: #e2e2e2;
}

.hover_classr::after {
	position: absolute;
	z-index: -1;
	content: '';
	top: 28rpx;
	right: -8rpx;
	width: 18rpx;
	height: 18rpx;
	border-radius: 2px;
	transform: rotate(45deg);
	background-color: #89d961;
}
.hover_classl::after {
	position: absolute;
	z-index: -1;
	content: '';
	top: 28rpx;
	left: -8rpx;
	width: 18rpx;
	height: 18rpx;
	border-radius: 2px;
	transform: rotate(45deg);
	background-color: #e2e2e2;
}
</style>
