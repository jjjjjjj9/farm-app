<template>
	<view>
		<!-- 群公告 -->
		<view class="text_26 icon_ group_notice" v-if="item.type === 'group_notice'">
			管理员设置了新的
			<text style="color: #fe6702; margin: 0 10rpx">群公告</text>
			请及时查看
		</view>
		<view class="text_26 icon_ group_notice" v-else-if="item.type === 'update_group_name'">
			管理员修改了群名称为:"
			<text style="color: #fe6702; margin: 0 10rpx">{{ item.payload.name }}</text>
			"
		</view>
		<view class="flex_r item" :class="{ item_: isMy }" v-else>
			<view class="item-img" @longpress.stop="longpressAvatar" @click.stop="onItem">
				<!-- <view class="item-img-pendant">
					<image class="img" :src="item.senderData.avatar_pendant" mode="aspectFill"></image>
				</view> -->
				<view class="z_index2 item-img-url">
					<image class="img" :src="item.senderData.avatar" mode="aspectFill"></image>
				</view>
			</view>
			<view style="width: 22rpx"></view>
			<view class="item-content" :class="{ item_content: !isMy, item_content2: !item.senderData.name }">
				<view class="text_24 color__ item-name" v-if="item.senderData.name">{{ item.senderData.name }}</view>
				<view class="flex_r fa_c item-content-box" :class="{ row_reverse: isMy }">
					<view class="flex_r fa_c item-content-box-box" :class="'A' + item.timestamp" @longpress.stop="longpress">
						<view v-if="isMy">
							<view class="loading" v-if="item.status === 'new' || item.status === 'sending'">
								<m-loading-icon iconColor="#989898"></m-loading-icon>
							</view>
							<view class="loading" v-if="item.status === 'error'">
								<image
									class="img"
									src="data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTUxMiAzN2MyNjIuMzEgMCA0NzUgMjEyLjY5IDQ3NSA0NzVTNzc0LjMxIDk4NyA1MTIgOTg3IDM3IDc3NC4zMSAzNyA1MTIgMjQ5LjY5IDM3IDUxMiAzN3ptMCA2NjEuMDhjLTI5LjI4IDAtNTMuMDEgMjMuNzMtNTMuMDEgNTMuMDEgMCAyOS4yOCAyMy43MyA1My4wMSA1My4wMSA1My4wMSAyOS4yOCAwIDUzLjAxLTIzLjczIDUzLjAxLTUzLjAxIDAtMjkuMjgtMjMuNzMtNTMuMDEtNTMuMDEtNTMuMDF6bTAtNDc4LjE4Yy0zNy40MyAwLTY3Ljg2IDMwLjQzLTY3Ljg2IDY3Ljk2bDI1LjQ1IDMxOS43OC41OSA2LjEyYzMuMzkgMTkuOTggMjAuODEgMzUuMjMgNDEuODIgMzUuMjMgMjMuMTEgMCA0MS43Ny0xOC40NSA0Mi40MS00MS4zNWwyNS40NS0zMTkuNzgtLjQtNy40MWMtMy42OS0zNC4wNS0zMi41My02MC41NS02Ny40Ni02MC41NXoiIGZpbGw9IiNmNDM0MmYiIGRhdGEtc3BtLWFuY2hvci1pZD0iYTMxM3guc2VhcmNoX2luZGV4LjAuaTkuNjJlMTNhODF0ejVJRE4iIGNsYXNzPSJzZWxlY3RlZCIvPjwvc3ZnPg=="
									mode="aspectFill"
								></image>
							</view>
						</view>
						<view v-if="item.type === 'text' || item.type === 'text_quote'">
							<m-text :isMy="isMy" :value="item" @onClick="onClick"></m-text>
						</view>
						<view v-else-if="item.type === 'image' || item.type === 'image_transmit'" @tap.stop="onClick">
							<m-image :isMy="isMy" :value="item"></m-image>
						</view>
						<view v-else-if="item.type === 'video'" @tap.stop="onClick">
							<m-video :isMy="isMy" :value="item"></m-video>
						</view>
						<view v-else-if="item.type === 'audio'">
							<m-audio :isMy="isMy" :value="item" @onClick="onClick"></m-audio>
						</view>
						<!-- 红包 -->
						<!-- <view v-else-if="item.type === 'red_envelope'">
							<m-red-packet :isMy="isMy" :myid="myid" :value="item" @onClick="onClick"></m-red-packet>
						</view> -->
						<!-- 表情包 -->
						<view v-else-if="item.type === 'emoji_pack'" @tap.stop="onClick">
							<m-emoji-img :isMy="isMy" :value="item"></m-emoji-img>
						</view>
						<!-- 位置 -->
						<!-- <view v-else-if="item.type === 'map'">
							<m-map :isMy="isMy" :value="item" @onClick="onClick"></m-map>
						</view> -->
						<!-- 文章 -->
						<!-- <view v-else-if="item.type === 'article'">
							<m-article :isMy="isMy" :value="item" @onClick="onClick"></m-article>
						</view> -->
						<!-- 商家分享 -->
						<!-- <view v-else-if="item.type === 'share_SBCF'">
							<m-share-sbcf :isMy="isMy" :value="item" @onClick="onClick"></m-share-sbcf>
						</view>
						<view v-else-if="item.type === 'share_mall'">
							<m-share-mall :isMy="isMy" :value="item" @onClick="onClick"></m-share-mall>
						</view> -->
						<view v-else-if="item.type === 'functional_module'">
							<m-functional-module :isMy="isMy" :value="item" @onClick="onClick"></m-functional-module>
						</view>

						<view class="flex1"></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { to, vibrateShort } from '@/utils/index.js';
import mText from './m-text.vue';
import mImage from './m-image.vue';
import mVideo from './m-video.vue';
import mAudio from './m-audio.vue';
import mRedPacket from './m-redPacket.vue';
import mMap from './m-map.vue';
import mEmojiImg from './m-emoji-img.vue';
import mArticle from './m-article.vue';
import mShareSbcf from './m-share-sbcf.vue';
import mShareMall from './m-share-mall.vue';

import mFunctionalModule from './m-functional-module.vue';

let isLongpress = false;
let isLongpressAvatar = false;
export default {
	components: {
		mText,
		mImage,
		mVideo,
		mAudio,
		mRedPacket,
		mMap,
		mEmojiImg,
		mArticle,
		mShareSbcf,
		mShareMall,
		mFunctionalModule
	},
	props: {
		myid: {
			type: [String, Number],
			default: null
		},
		isMy: {
			type: [Boolean, Number],
			default: false
		},
		item: {
			type: Object,
			default: {}
		},
		index: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			userInforData: {}
		};
	},
	created() {},
	methods: {
		onClick() {
			if (isLongpress) return (isLongpress = false);
			if (this.item.status === 'error') return;
			this.$emit('onClick', this.item, this.index);
		},
		// @某人
		longpressAvatar() {
			isLongpressAvatar = true;
			this.$emit('mention', this.item, this.index);
		},
		onItem() {
			if (isLongpressAvatar) return (isLongpressAvatar = false);
			console.log(this.item);
			to('/pagesGoEasy/group_member_infor/index', { member_id: this.item.senderId, group_id: this.item.groupId });
		},

		// 长按
		longpress(e) {
			isLongpress = true;
			vibrateShort();
			console.log(this.item);
			this.$nextTick(() => {
				// let view = uni.createSelectorQuery().select(`.A${this.item.timestamp}`);
				// view.boundingClientRect((data) => {
				// 	this.$emit('onLongpress', this.item, data);
				// }).exec();

				const query = uni.createSelectorQuery().in(this);
				query
					.select(`.A${this.item.timestamp}`)
					.boundingClientRect((data) => {
						this.$emit('onLongpress', this.item, data);
					})
					.exec();
			});
		}
	}
};
</script>

<style scoped lang="scss">
.group_notice {
	width: 100%;
	height: 80rpx;
	color: #a3a3a3;
}
.row_reverse {
	flex-direction: row-reverse;
}
.item {
	position: relative;
	z-index: 0;
	width: calc(100% - 50rpx);
	margin: 0 auto;
	margin-bottom: 28rpx;
	.item-name {
		margin-bottom: 4rpx;
	}
}
.item_ {
	flex-direction: row-reverse;
	.item-name {
		position: relative;
		top: 0rpx;
		display: none;
	}
}
.item-img {
	position: relative;
	width: 76rpx;
	height: 76rpx;
	.item-img-pendant {
		position: absolute;
		z-index: 3;
		top: -2rpx;
		left: -2rpx;
		right: -2rpx;
		bottom: -2rpx;
	}
	.item-img-url {
		width: 76rpx;
		height: 76rpx;
		overflow: hidden;
		border-radius: 6rpx;
		background-color: #fff;
	}
}
.item-content {
	width: calc(100% - 164rpx);
	.item-content-box {
		position: relative;
		.item-content-box-box {
		}
		.loading {
			width: 40rpx;
			height: 40rpx;
			margin: 0 10rpx;
		}
	}
}
.item_content {
	position: relative;
	top: -10rpx;
}
.item_content2 {
	position: relative;
	top: 0rpx !important;
}
</style>
