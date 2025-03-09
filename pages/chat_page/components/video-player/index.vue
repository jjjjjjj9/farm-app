<template>
	<view
		class="video"
		:style="{
			display: isShow ? '' : 'none'
		}"
	>
		<video :src="url" id="videoPlayer" @fullscreenchange="onVideoFullScreenChange"></video>
	</view>
</template>

<script>
export default {
	props: {
		value: {
			type: Boolean,
			default: false
		},
		url: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			isShow: false
		};
	},
	created() {},
	watch: {
		value: {
			handler: function (newV) {
				this.isShow = newV;
			},
			immediate: true
		}
	},
	methods: {
		onVideoFullScreenChange(e) {
			this.$emit('onVideoFullScreenChange', e);
		}
	}
};
</script>

<style lang="scss" scoped>
	.video {
		position: absolute;
		left: -1000rpx;
		bottom: -1000rpx;
		opacity: 0;
	}
	
</style>
