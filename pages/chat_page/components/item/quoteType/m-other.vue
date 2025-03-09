<template>
	<view class="quote-box">
		<text class="quote-name">
			{{ value.senderData.name }}：
			<text>{{ renderTextMessage }}</text>
		</text>
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
		renderTextMessage() {
			const { type = '' } = this.value;
			const typeText = {
				video: `[视频]${this.getTimes()}`,
				red_envelope: '[蝌蚪红包]',
				map: `[位置]${this.value.payload?.title}`,
				emoji_pack: `[表情包]`,
				article: '[文章分享]',
				share_SBCF: '[商家分享]',
				share_mall: '[商品分享]',
				functional_module: '[功能分享]'
			};
			return typeText[type];
		}
	},
	methods: {
		getTimes() {
			if (this.value.type !== 'video') return;
			const t = this.value.payload.video.duration;
			let h = parseInt((t / 60 / 60) % 24);
			let m = parseInt((t / 60) % 60);
			let s = parseInt(t % 60);
			h = h < 10 ? '0' + h : h;
			m = m < 10 ? '0' + m : m;
			s = s < 10 ? '0' + s : s;
			if (h === '00') return `${m}:${s}`;
			return `${h}:${m}:${s}`;
		}
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
</style>
