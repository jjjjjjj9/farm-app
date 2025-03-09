<template>
	<view class="flex_c row">
		<view class="flex_r text-box" :class="{ text_box: isMy }" @tap.stop="onClick">
			<view
				class="text_32 text"
				:class="isMy ? 'text_r' : 'text_l'"
				:hover-class="isMy ? 'hover_classr' : 'hover_classl'"
				:hover-stay-time="60"
				:style="{ whiteSpace: 'pre-wrap' }"
				v-html="renderTextMessage"
			></view>
		</view>
		<view class="text_26 flex_r" :class="{ row_: isMy }" v-if="value.type === 'text_quote'">
			<view v-if="value.payload.quoteSource.type === 'image' || value.payload.quoteSource.type === 'image_transmit'">
				<m-image :value="value.payload.quoteSource"></m-image>
			</view>
			<view class="" v-else-if="value.payload.quoteSource.type === 'audio' || value.payload.quoteSource.type === 'audio_quote'">
				<m-audio :value="value.payload.quoteSource"></m-audio>
			</view>
			<view class="" v-else-if="value.payload.quoteSource.type === 'text' || value.payload.quoteSource.type === 'text_quote'">
				<m-text :value="value.payload.quoteSource"></m-text>
			</view>
			<view class="" v-else>
				<m-other :value="value.payload.quoteSource"></m-other>
			</view>
		</view>
	</view>
</template>

<script>
import mText from './quoteType/m-text.vue';
import mImage from './quoteType/m-image.vue';
import mAudio from './quoteType/m-audio.vue';
import mOther from './quoteType/m-other.vue';

import { EmojiDecoder, emojiMap } from '../../lib/EmojiDecoder';
const emojiUrl = 'https://imgcache.qq.com/open/qcloud/tim/assets/emoji/';
const decoder = new EmojiDecoder(emojiUrl, emojiMap);
export default {
	components: {
		mText,
		mImage,
		mAudio,
		mOther
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
	computed: {
		//渲染文本消息，如果包含表情，替换为图片
		//todo:本不需要该方法，可以在标签里完成，但小程序有兼容性问题，被迫这样实现
		renderTextMessage() {
			const { text = '' } = this.value.payload;
			if (!text) return '<span>' + '[未知内容]' + '</span>';
			return '<span>' + decoder.decode(text) + '</span>';
		}
	},
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
	padding: 16rpx 26rpx;
	border-radius: 8rpx;
	background-color: #fff;

	word-break: break-all;
	vertical-align: center;
}

.text_r {
	position: relative;
	background-color: #95ec6a;
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
	background-color: #95ec6a;
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

.hover_classr {
	background-color: #89d961;
}
.hover_classl {
	background-color: #e2e2e2;
}

.hover_classr::after {
	position: absolute;
	z-index: -1;
	content: '';
	top: 26rpx;
	right: -8rpx;
	width: 18rpx;
	height: 18rpx;
	border-radius: 2px;
	transform: rotate(45deg);
	background-color: #89d961;
}
.hover_classl::after {
	position: absolute;
	z-index: -1;
	content: '';
	top: 26rpx;
	left: -8rpx;
	width: 18rpx;
	height: 18rpx;
	border-radius: 2px;
	transform: rotate(45deg);
	background-color: #e2e2e2;
}
</style>
