<template>
	<view class="flex_r m-image" :style="{ height: getImageHeight(value.payload) + 'rpx' }">
		<!-- <image class="img" :src="value.payload.thumbnail || value.payload.url" mode="widthFix"></image> -->
		<image class="img" :src="value.payload.url" mode="heightFix"></image>
		<!-- {{value.payload.thumbnail}} -->
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
		/**
		 * 核心就是设置高度，产生明确占位
		 *
		 * 小  (宽度和高度都小于预设尺寸)
		 *    设高=原始高度
		 * 宽 (宽度>高度)
		 *    高度= 根据宽度等比缩放
		 * 窄  (宽度<高度)或方(宽度=高度)
		 *    设高=MAX height
		 *
		 * @param width,height
		 * @returns number
		 */
		getImageHeight(payload) {
			const { width, height } = payload;
			const IMAGE_MAX_WIDTH = 130;
			const IMAGE_MAX_HEIGHT = 94;
			if (width < IMAGE_MAX_WIDTH && height < IMAGE_MAX_HEIGHT) {
				return height * 3;
			} else if (width > height) {
				return (IMAGE_MAX_WIDTH / width) * height * 3;
			} else if (width === height || width < height) {
				return IMAGE_MAX_HEIGHT * 3;
			}
		}
	}
};
</script>

<style scoped lang="scss">
.m-image {
	border-radius: 10rpx;
	overflow: hidden;
	.img {
		min-height: 100rpx;
		background-color: #fff;
	}
}
</style>
