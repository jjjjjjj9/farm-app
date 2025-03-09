<template>
	<view class="quote-box">
		<text class="quote-name">
			{{ value.senderData.name }}：
			<text>[语音]{{ Math.ceil(value.payload.duration) || 1 }}''</text>
		</text>
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
	methods: {}
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
</style>
