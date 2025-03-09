<template>
	<view class="placeholder" :style="[placeholderStyle]">
	</view>
</template>
<!-- <m-bottom-paceholder></m-bottom-paceholder> -->
<script>
	export default {
		props: {
			height: {
				type: [String, Number],
				default: '20'
			}
		},
		computed: {
			placeholderStyle() {
				const style = {}
				style.height = `${this.height}rpx`
				// #ifndef MP-WEIXIN
				const {
					safeAreaInsets
				} = uni.getSystemInfoSync()
				style.paddingBottom = `${safeAreaInsets.bottom}px`
				// #endif
				return style;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.placeholder {
		width: 100%;
		height: 20rpx;
		/* #ifdef MP-WEIXIN*/
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom); //适配底部
		padding-bottom: env(safe-area-inset-bottom);
		/*#endif*/

	}
</style>
