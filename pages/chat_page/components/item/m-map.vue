<template>
	<view class="flex_c row">
		<view class="flex_r text-box" :class="{ text_box: isMy }" @tap.stop="onClick">
			<view class="text" :class="isMy ? 'text_r' : 'text_l'">
				<view class="flex_c_c nowrap_ map">
					<view class="nowrap_ text_32 map-title">
						{{ value.payload.title }}
					</view>
					<view class="nowrap_ text_22 map-text">
						{{ value.payload.address }}
					</view>
					<view class="flex1 map-img">
						<view class="str"></view>
						<image class="z_index2 img" :src="value.payload.image" mode="aspectFill"></image>
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
			this.$emit('onClick')
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

.map {
	width: 490rpx;
	height: 300rpx;
	border-radius: 10rpx;
	overflow: hidden;
	background-color: #fff;
	border: 0.5px solid #fff;
	.map-title {
		box-sizing: border-box;
		width: 100%;
		padding: 14rpx 20rpx 4rpx 20rpx;
	}
	.map-text {
		box-sizing: border-box;
		width: 100%;
		color: #afafaf;
		padding: 0rpx 20rpx 6rpx 20rpx;
	}
	.map-img {
		position: relative;
		width: 100%;
		.str {
			box-sizing: border-box;
			position: absolute;
			z-index: 3;
			top: calc(50% - 60rpx);
			left: calc(50% - 25rpx);
			width: 50rpx;
			height: 50rpx;
			border: 12rpx solid #07be5b;
			border-radius: 50%;
			background-color: #fff;
		}
		.str::before {
			position: absolute;
			z-index: 0;
			content: '';
			bottom: -40rpx;
			left: 12rpx;
			width: 6rpx;
			height: 40rpx;
			border-radius: 3rpx;
			background-color: #07be5b;
		}
	}
}
</style>
