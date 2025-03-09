<template>
	<view class="flex_r m-image">
		<!-- #ifdef H5 || MP -->
		<image class="img" :src="value.payload.url" mode="aspectFill"></image>
		<!-- #endif -->
		<!-- #ifdef APP -->
		<cacheImage :src="value.payload.url" :ext="value.payload.ext" mstyle="{width: 250rpx;height: 250rpx;}"></cacheImage>
		<!-- #endif -->
	</view>
</template>
<script>
import cacheImage from '../cache-image/cache-image.vue';
export default {
	components: {
		cacheImage
	},
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
	methods: {}
};
</script>

<style scoped lang="scss">
.m-image {
	border-radius: 2rpx;
	overflow: hidden;
	.img {
		width: 250rpx;
		height: 250rpx;
	}
}
</style>
