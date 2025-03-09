<template>
	<view class="flex_c row">
		<view class="flex_r text-box" :class="{ text_box: isMy }" @tap.stop="onClick">
			<view class="text" :class="isMy ? 'text_r' : 'text_l'">
				<view class="flex_c_c article">
					<view class="flex_r fa_c article-infr">
						<view class="article-infr-img">
							<image class="img" :src="value.payload.share_image" mode="aspectFill"></image>
						</view>
						<view class="text_22 color__ article-infr-text">
							{{ value.payload.title }}
						</view>
					</view>
					<view class="text_30 nowrap_ article-title">
						{{ value.payload.short_title }}
					</view>
					<view class="article-img">
						<image class="img" :src="value.payload.share_image" mode="aspectFill"></image>
					</view>
					<view class="m-line">
						<m-line color="#f0f0f0" length="100%" :hairline="true"></m-line>
					</view>
					<view class="flex_r fa_c article-b">
						<view class="article-b-icon"></view>
						<view class="text_20 color__ article-b-text">联盟商家</view>
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

	.article-infr {
		width: 100%;
		height: 46rpx;
		margin-bottom: 10rpx;
		.article-infr-img {
			width: 40rpx;
			height: 40rpx;
			margin-right: 10rpx;
			border-radius: 50%;
			overflow: hidden;
			background-color: #f1f1f1;
		}
		.article-infr-text {
		}
	}

	.article-title {
		box-sizing: border-box;
		width: 100%;
		margin-bottom: 14rpx;
	}
	.article-img {
		width: 450rpx;
		height: 450rpx;
		background-color: #f1f1f1;
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
