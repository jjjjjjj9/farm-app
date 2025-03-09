<template>
	<view class="quote-box">
		<view class="flex_r quote-name">
			<view class="">{{ value.senderData.name }}：</view>
			<view class="flex_r m-image" @tap.stop="openimg(value.payload.url)">
				<image class="img" :src="value.payload.thumbnail || value.payload.url" mode="aspectFill"></image>
			</view>
		</view>
	</view>
</template>
<script>
import { openimg } from '@/utils/index.js';
export default {
	props: {
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
		openimg
	}
};
</script>

<style scoped lang="scss">
.quote-box {
	box-sizing: border-box;
	padding: 12rpx 16rpx;
	border-radius: 10rpx;
	margin-top: 6rpx;
	background-color: #e1e1e1;
	color: #6b6b6b;
}
.quote-name {
}
.quote-content {
}
.m-image {
	border-radius: 10rpx;
	overflow: hidden;
	.img {
		width: 80rpx;
		height: 80rpx;
		border-radius: 6rpx;
		overflow: hidden;
		background-color: #fff;
	}
}
</style>
