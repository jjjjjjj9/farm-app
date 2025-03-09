<template>
	<view class="flex_c row">
		<view class="flex_r text-box" :class="{ text_box: isMy }" @tap.stop="onClick">
			<view class="text" :class="isMy ? 'text_r' : 'text_l'">
				<view class="flex_c_c article">
					<view class="flex_r fa_c article-info">
						<view class="article-img">
							<image class="img" :src="value.payload.image" mode="aspectFill"></image>
						</view>
						<view class="flex1">
							<view class="text_32 article-title">{{ value.payload.title }}</view>
							<view class="text_26 color__ article-title">{{ value.payload.text }}</view>
						</view>
					</view>

					<view class="m-line">
						<m-line color="#f0f0f0" length="100%" :hairline="true"></m-line>
					</view>
					<view class="flex_r fa_c article-b">
						<!-- <view class="article-b-icon"></view> -->
						<view class="text_20 color__ article-b-text">功能分享</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
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
	computed: {},
	methods: {
		onClick() {
			this.$emit('onClick');
		}
	}
};
</script>

<style scoped lang="scss">
.row {
}
.row_ {
	flex-direction: row-reverse;
}
.text_box {
	flex-direction: row-reverse;
}
.text {
	position: relative;
	z-index: 99;
	box-sizing: border-box;
}

.text_r {
	position: relative;
}
.text_l {
	position: relative;
}

.text_r::after {
	position: absolute;
	z-index: -1;
	content: '';
	top: 26rpx;
	right: -8rpx;
	width: 18rpx;
	height: 18rpx;
	border-radius: 2px;
	transform: rotate(45deg);
	background-color: #fff;
}
.text_l::after {
	position: absolute;
	z-index: -1;
	content: '';
	top: 26rpx;
	left: -8rpx;
	width: 18rpx;
	height: 18rpx;
	border-radius: 2px;
	transform: rotate(45deg);
	background-color: #fff;
}

.article {
	box-sizing: border-box;
	padding: 14rpx 20rpx 4rpx 20rpx;
	width: 490rpx;
	border-radius: 10rpx;
	overflow: hidden;
	background-color: #fff;
	border: 0.5px solid #fff;
	.article-info {
		width: 100%;
		.article-img {
			width: 100rpx;
			height: 100rpx;
			margin-right: 20rpx;
			border-radius: 10rpx;
			overflow: hidden;
		}
		.article-title {
			box-sizing: border-box;
			margin-bottom: 14rpx;
		}
	}

	.m-line {
		width: 100%;
		height: 1px;
		margin-top: 20rpx;
	}
	.article-b {
		width: 100%;
		margin-top: 4rpx;
		.article-b-icon {
			width: 26rpx;
			height: 26rpx;
			background-color: #f1f1f1;
			border-radius: 50%;
			overflow: hidden;
			margin-right: 10rpx;
		}
		.article-b-text {
		}
	}
}
</style>
