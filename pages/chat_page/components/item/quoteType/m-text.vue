<template>
	<view class="quote-box">
		<view class="quote-name">
			<text>
				{{ value.senderData.name }}：
				<text v-html="renderTextMessage"></text>
			</text>
		</view>
	</view>
</template>

<script>
import { EmojiDecoder, emojiMap } from '../../../lib/EmojiDecoder.js';
const emojiUrl = 'https://imgcache.qq.com/open/qcloud/tim/assets/emoji/';
const decoder = new EmojiDecoder(emojiUrl, emojiMap);
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
	created() {},
	computed: {
		//渲染文本消息，如果包含表情，替换为图片
		//todo:本不需要该方法，可以在标签里完成，但小程序有兼容性问题，被迫这样实现
		renderTextMessage() {
			let { text = '' } = this.value.payload;
			text = text.replace(/\n/g, '');
			if (!text) return '<span>' + '[未知内容]' + '</span>';
			return '<span>' + decoder.decode(text) + '</span>';
		}
	},
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
