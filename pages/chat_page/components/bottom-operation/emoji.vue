<template>
	<!-- <view class="emoji" v-show="value"> -->
	<view class="emoji" :style="{ height: value ? '690rpx' : '0px' }">
		<view class="text_28 color_4a flex_r fa_c emoji-title">
			<view class="icon_ emoji-title-item" :class="{ emoji_title_item: thisIndex === index }" v-for="(item, index) in topList" :key="index" @click="onTop(index)">
				<view class="emoji-title-item-img">
					<image class="img" :src="item.icon" mode="aspectFill"></image>
				</view>
			</view>
			<view class="flex1"></view>
			<view class="text_28 color__" @click="onEdit" v-if="thisIndex === 1">{{ isEdit ? '关闭' : '管理' }}</view>
		</view>
		<!-- disable-touch -->
		<swiper class="swiper" @change="change" :current="thisIndex">
			<swiper-item class="swiper-item">
				<scroll-view scroll-y="true" class="swiper-item-box" lower-threshold="10" @scroll="scroll" @scrolltolower="scrolltolower">
					<view class="swiper-item-box flex_r">
						<view class="flex_r swiper-item-box-l" v-for="(im, ix) in list" :key="ix">
							<view
								class="icon_ emoji-item"
								v-for="(item, index) in im"
								:key="index"
								:style="{ opacity: ix === opacityGroup && (index == 5 || index == 6 || index == 7) ? opacity : 1 }"
							>
								<image class="img" :src="emojiUrl + item.image" @click="chooseEmoji(item.text)"></image>
							</view>
						</view>
						<view class="img" style="height: 18vw"></view>
					</view>
				</scroll-view>
				<view class="icon_ size_white swiper-item-box-b">
					<view class="icon_ swiper-item-box-delete" @click="deleteFn">
						<image
							class="img"
							src="data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkYXRhLXNwbS1hbmNob3ItaWQ9ImEzMTN4LnNlYXJjaF9pbmRleC4wLmkyLjU1YjUzYTgxa1poQ1hMIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTM1NS40MTMgMTcwLjY2N2g1NDAuMDMyYzIzLjg5NCAwIDQzLjIyMiAxOS4xMTQgNDMuMjIyIDQyLjY2NnY1OTcuMzM0YzAgMjMuNTUyLTE5LjMyOCA0Mi42NjYtNDMuMjIyIDQyLjY2NkgzNTUuNDEzYy0xMy42MSAwLTI2LjQxLTYuMzE0LTM0LjU2LTE3LjA2Nkw5NC4wMzcgNTM3LjZhNDIuMjQgNDIuMjQgMCAwIDEgMC01MS4ybDIyNi44MTYtMjk4LjY2N2M4LjE1LTEwLjc1MiAyMC45NS0xNy4wNjYgMzQuNTYtMTcuMDY2ek0xNTUuNTYzIDUxMmwyMTAuNjAyIDI3Ny4zMzNoNTA3LjY5MVYyMzQuNjY3aC01MDcuNjlMMTU1LjU2MiA1MTJ6TTU0Ny4yIDUwMS4zMzNMNDI2LjU4MSAzODIuMjA4YTEyLjggMTIuOCAwIDAgMSAwLTE4LjIxOWwyNy42MDYtMjcuMjY0YTEyLjggMTIuOCAwIDAgMSAxNy45NjIgMGwxMjAuOTE4IDExOS4zODIgMTIwLjgzMi0xMTkuMzM5YTEyLjggMTIuOCAwIDAgMSAxOC4wMDUgMGwyNy42MDUgMjcuMzA3YTEyLjggMTIuOCAwIDAgMSAwIDE4LjE3Nkw2MzguODkxIDUwMS4zNzZsMTIwLjYxOCAxMTkuMTI1YTEyLjg0MyAxMi44NDMgMCAwIDEgMCAxOC4yMTlsLTI3LjYwNSAyNy4yNjRhMTIuOCAxMi44IDAgMCAxLTE4LjAwNSAwTDU5My4wNjcgNTQ2LjU2IDQ3Mi4xOTIgNjY1Ljg5OWExMi44IDEyLjggMCAwIDEtMTcuOTYzIDBsLTI3LjYwNS0yNy4zMDdhMTIuOCAxMi44IDAgMCAxIDAtMTguMTc2bDEyMC42MTktMTE5LjEyNXoiIGZpbGw9IiMxNjE2MTYiIGRhdGEtc3BtLWFuY2hvci1pZD0iYTMxM3guc2VhcmNoX2luZGV4LjAuaTMuNTViNTNhODFrWmhDWEwiIGNsYXNzPSJzZWxlY3RlZCIvPjwvc3ZnPg=="
							mode="aspectFill"
						></image>
					</view>
					<view class="icon_ text_30 swiper-item-box-button" @click="sendingText">发送</view>
				</view>
			</swiper-item>
			<swiper-item class="swiper-item">
				<emoji-img @onEmoji="onEmoji" :isShow="value" v-model="isEdit"></emoji-img>
			</swiper-item>
		</swiper>
	</view>
</template>

<!-- 5,6,7,
12,13,14
19,20,21
26,27,28
33,34,35 -->

<script>
import emojiImg from './emoji-img.vue';
import { emojiMap } from '../../lib/EmojiDecoder.js';
const emojiUrl = 'https://imgcache.qq.com/open/qcloud/tim/assets/emoji/';
let height = null;
let height2 = null;

let list = [];
export default {
	components: {
		emojiImg
	},
	props: {
		value: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			isEdit: false,
			emojiUrl,
			list: [],
			scrollTop: 0,
			opacity: 1,
			opacityGroup: null,
			thisIndex: 0,
			topList: [
				{
					icon: 'data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTUxMyA5NTljLTYwLjQgMC0xMTguOS0xMS44LTE3NC4xLTM1LjItNTMuMy0yMi41LTEwMS4xLTU0LjgtMTQyLjEtOTUuOC00MS4xLTQxLjEtNzMuMy04OC45LTk1LjgtMTQyLjEtMjMuMy01NS4yLTM1LjItMTEzLjctMzUuMi0xNzQuMVM3Ny42IDM5Mi45IDEwMSAzMzcuN2MyMi41LTUzLjMgNTQuOC0xMDEuMSA5NS44LTE0Mi4xIDQxLjEtNDEuMSA4OC45LTczLjMgMTQyLjEtOTUuOEMzOTQuMSA3Ni40IDQ1Mi42IDY0LjYgNTEzIDY0LjZzMTE4LjkgMTEuOCAxNzQuMSAzNS4yYzUzLjMgMjIuNSAxMDEuMSA1NC44IDE0Mi4xIDk1LjggNDEuMSA0MS4xIDczLjMgODguOSA5NS44IDE0Mi4xIDIzLjMgNTUuMiAzNS4yIDExMy43IDM1LjIgMTc0LjFTOTQ4LjQgNjMwLjcgOTI1IDY4NS45QzkwMi41IDczOS4xIDg3MC4zIDc4NyA4MjkuMiA4MjhjLTQxLjEgNDEuMS04OC45IDczLjMtMTQyLjEgOTUuOEM2MzEuOSA5NDcuMiA1NzMuNCA5NTkgNTEzIDk1OXptMC04MzguNGMtNTIuOCAwLTEwNC4xIDEwLjMtMTUyLjMgMzAuNy00Ni42IDE5LjctODguNCA0Ny45LTEyNC40IDgzLjktMzUuOSAzNS45LTY0LjIgNzcuOC04My45IDEyNC40LTIwLjQgNDguMi0zMC43IDk5LjQtMzAuNyAxNTIuM1MxMzIgNjE2IDE1Mi40IDY2NC4yYzE5LjcgNDYuNiA0Ny45IDg4LjQgODMuOSAxMjQuNCAzNS45IDM1LjkgNzcuOCA2NC4yIDEyNC40IDgzLjlDNDA4LjkgODkyLjcgNDYwLjIgOTAzIDUxMyA5MDNzMTA0LjEtMTAuMyAxNTIuMy0zMC43YzQ2LjYtMTkuNyA4OC40LTQ3LjkgMTI0LjQtODMuOSAzNS45LTM1LjkgNjQuMi03Ny44IDgzLjktMTI0LjQgMjAuNC00OC4yIDMwLjctOTkuNCAzMC43LTE1Mi4zUzg5NCA0MDcuNiA4NzMuNiAzNTkuNGMtMTkuNy00Ni42LTQ3LjktODguNC04My45LTEyNC40LTM1LjktMzUuOS03Ny44LTY0LjItMTI0LjQtODMuOS00OC4yLTIwLjItOTkuNS0zMC41LTE1Mi4zLTMwLjV6IiBkYXRhLXNwbS1hbmNob3ItaWQ9ImEzMTN4LmNvbGxlY3Rpb25zX2RldGFpbC4wLmkxMS40NDIzM2E4MUVESkxIQSIgY2xhc3M9InNlbGVjdGVkIi8+PHBhdGggZD0iTTU4My45IDM5OC4zYTQ2LjcgNDYuNyAwIDEgMCA5My40IDAgNDYuNyA0Ni43IDAgMSAwLTkzLjQgMHpNMzQ3IDM5OC4zYTQ2LjcgNDYuNyAwIDEgMCA5My40IDAgNDYuNyA0Ni43IDAgMSAwLTkzLjQgMHpNNTEzIDc5MGMtNTUuMiAwLTExMC0xOC40LTE1NC4zLTUxLjgtNDIuNC0zMS45LTcyLjUtNzQuOS04NC45LTEyMC45LTQuNy0xNy40LTEtMzUuNiAxMC01MCAxMS4xLTE0LjUgMjcuOS0yMi44IDQ2LjEtMjIuOGwzNjYuMy0uMWMxOC4yIDAgMzUgOC4zIDQ2LjEgMjIuNyAxMSAxNC40IDE0LjcgMzIuNiAxMCA1MC0xMi4zIDQ2LTQyLjUgODktODQuOSAxMjAuOS00NC40IDMzLjYtOTkuMiA1Mi0xNTQuNCA1MnptMTgzLjEtMTg5LjZsLTM2Ni4zLjFjLS4zIDAtMSAwLTEuNy44LS41LjctLjQgMS4yLS4zIDEuNCA5IDMzLjUgMzIuNSA2Ni41IDY0LjUgOTAuNkM0MjcuMSA3MTkuNiA0NjkuOSA3MzQgNTEzIDczNGM0My4xIDAgODUuOS0xNC40IDEyMC43LTQwLjYgMzItMjQuMSA1NS41LTU3LjIgNjQuNS05MC43LjEtLjMuMi0uNy0uMy0xLjQtLjctLjktMS41LS45LTEuOC0uOXoiLz48L3N2Zz4=',
					type: 0
				},
				{
					icon: 'data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTY5NS4zMDYgMTQzLjQ0MmMtNDEuODUgNy4yODYtNzYuNTE4IDIwLjI1NS0xMDUuNzY0IDQwLjAxOGwtMzAuMDA4IDI0LjI5NC00Ny4xNjUgNDcuMTY2Yy02Ny4yOTMtNTEuNjQtOTYuMjcyLTExNC45NC0yMjEuNTMzLTExMi45MTJsLTUyLjg3OSA4LjU3NmMtNDUuMDEgMTMuNjgxLTg4LjE5MiAzOS44NzUtMTE0LjM0IDcyLjg5NC0xNS4zNTUgMTkuMzktMzAuMzY2IDQyLjctNDAuMDE4IDY3LjE3NEMyNi42MTQgNDM1LjE5IDEyNS4zNDggNTI1LjM0MiAxOTIuMjIgNTkyLjIybDExNy4xOTcgMTE1Ljc2M0w0NTMuNzcgODUwLjkwOGMxNy40MzkgMTQuMDg1IDMwLjU1NiAzOC4xOCA2OC42MDMgMzEuNDQ3IDQ1LjU0My04LjA2NCA5My4yNi03NC42OSAxMjIuOTEtMTA0LjMzNUEyNjI5ODk5Ljk4IDI2Mjk4OTkuOTggMCAwIDEgODE1LjM2IDYwOS4zNzJjNTIuNDc1LTUyLjQ3IDExMS42LTk2LjI1IDEzNC4zNDktMTc4LjY1MiA0My4xNC0xNTYuMzAzLTEwMS41NS0zMTMuOTAyLTI1NC40MDMtMjg3LjI3OHptMTg0LjM2NiAzMTQuNDI0Yy0yMi4xMzkgMzcuOTQ1LTU3LjAyNiA2NS42MDMtODcuMTczIDk1Ljc2LTU2LjY4OCA1Ni4yMTctMTEzLjM4NyAxMTIuNDQtMTcwLjA4MSAxNjguNjQ3LTE1LjU2IDE1LjU1NS05NS44MzEgMTA0LjQzOC0xMTAuMDUgMTAyLjkwNy0xNC4xNDYgMS4yNi0zMy4wMDMtMjcuMzU2LTQyLjg4LTM3LjE2TDM1NS4xNTUgNjc1LjEwN2MtNDYuNjktNDYuMTk4LTkzLjM4NC05Mi40MjYtMTQwLjA1OC0xMzguNjM0LTI3LjA3LTI3LjA2NS01OS41MS01Mi41NDItNzUuNzYtOTAuMDM2LTI4LjgzMS02Ni41MjktNy43OTMtMTQ5LjMzIDMwLjAxOC0xOTAuMDkgMjEuMzY2LTIzLjA0IDUxLjUyMy00My4yMTggODUuNzU1LTUyLjg4IDEyLjM4LTEuOTA0IDI0Ljc2Ni0zLjgxNCAzNy4xNTYtNS43MTMgNzEuNDQ0LjMxMiA4Ny42NSAyNi4yNDUgMTMxLjQ4NyA0Ny4xNmw4OC42MTIgODguNjEyYzQ1Ljc4OC0zNS4xMDggNzYuNzQ4LTg5Ljk5NCAxMzAuMDU4LTExNy4xOTcgMTE2LjY1OS01OS41MiAyMzEuNjM0IDI0LjUyNSAyNTQuNDAyIDEyMS40ODggOS45MTMgNDIuMTgzLTEuMzM2IDkyLjk2My0xNy4xNTIgMTIwLjA0OHoiLz48L3N2Zz4=',
					type: 0
				}
			]
		};
	},
	mounted() {
		this.$nextTick(() => {
			// let view = uni.createSelectorQuery().select('.swiper-item-box-delete');
			// view.boundingClientRect((data) => {
			// 	height = data.height * 5;
			// 	height2 = data.height;
			// 	this.init();
			// }).exec();

			const query = uni.createSelectorQuery().in(this);
			query
				.select('.swiper-item-box-delete')
				.boundingClientRect((data) => {
					height = data?.height * 5;
					height2 = data?.height;
					this.init();
				})
				.exec();
		});
	},
	methods: {
		onEdit() {
			this.isEdit = !this.isEdit;
		},
		change(e) {
			this.thisIndex = e.detail.current;
		},
		onTop(index) {
			this.thisIndex = index;
		},

		scroll(e) {
			this.scrollTop = e.detail.scrollTop + height;
			for (let i = 0; i < this.list.length; i++) {
				let top = list[i];
				if (this.scrollTop < top && top < this.scrollTop + height2) {
					this.opacityGroup = i - 1;
					let opacityValue = this.scrollTop + height2 - 20 - top;
					this.opacity = opacityValue / height2;
					return;
				}
			}
		},
		// 触底
		scrolltolower() {
			console.log('触底');
			this.opacityGroup = null;
		},
		init() {
			let newList = [];
			let i = 1;
			for (let key in emojiMap) {
				let obj = {};
				obj['index'] = i;
				obj['text'] = key;
				obj['image'] = emojiMap[key];
				i++;
				newList.push(obj);
			}
			list = [];
			let A = newList.filter((item, index) => {
				return (index + 1) % 8 === 0;
			});
			A.unshift({ index: 0 });
			A.push({ index: newList.length });
			this.list = A.map((item, index) => {
				return newList.slice(A[index].index, A[index + 1]?.index || newList.length);
			});
			list = this.list.map((item, index) => {
				return (index * height2).toFixed();
			});
			// this.scroll({ detail: { scrollTop: 10 } });
		},
		//选择表情
		chooseEmoji(key) {
			this.$emit('onEmoji', key);
		},
		// 删除
		deleteFn() {
			this.$emit('deleteFn');
		},
		// 发送
		sendingText() {
			this.$emit('sendingText');
		},
		// =============
		// 选择自定义表情
		onEmoji(item) {
			this.$emit('sendingEmojiPack', item);
		}
	}
};
</script>

<style lang="scss" scoped>
.emoji {
	box-sizing: border-box;
	width: 100%;
	overflow: hidden;
	transition: all 0.2s;
	background-color: #f6f6f6;
	.emoji-title {
		box-sizing: border-box;
		padding: 0 20rpx;
		width: 100%;
		height: 100rpx;
		.emoji-title-item {
			width: 80rpx;
			height: 80rpx;
			margin-bottom: 10rpx;
			border-radius: 8rpx;
			margin-right: 16rpx;
			transition: all 0.3s;
			.emoji-title-item-img {
				width: 70%;
				height: 70%;
			}
		}
		.emoji_title_item {
			background-color: #fff;
		}
	}
}
.swiper {
	width: 100%;
	height: 590rpx;
	background-color: #ececec;
	.scroll-Y {
		width: 100%;
		height: 100%;
	}
	.swiper-item {
		position: relative;
		width: 100%;
		height: 100%;

		.swiper-item-box {
			position: relative;
			z-index: 1;
			box-sizing: border-box;
			width: 100%;
			height: 100%;
			flex-wrap: wrap;
			align-items: flex-start;

			.swiper-item-box-l {
				// width: calc(62.5vw);
				width: calc(100vw);
				flex-wrap: wrap;
				align-items: flex-start;
			}
			.swiper-item-box-r {
				width: calc(37.5vw);
				flex-wrap: wrap;
				align-items: flex-start;
			}

			.emoji-item {
				width: calc(12.5vw);
				height: calc(12.5vw);
				flex-shrink: 0;
				transition: all 0.1s;
				.img {
					width: 70%;
					height: 70%;
				}
			}
		}

		.swiper-item-box-b {
			width: calc(38vw);
			position: absolute;
			z-index: 99;
			right: 0rpx;
			bottom: 0px;
			padding: 0 0 40rpx 0;
			// background-color: #000;
			background-image: linear-gradient(to top, #ececec, #ececec, #ececec, #ececec, #ececec, rgba(0, 0, 0, 0));
		}
		.swiper-item-box-delete {
			width: 116rpx;
			height: calc(12.5vw);
			border-radius: 10rpx;
			margin-right: 20rpx;
			background-color: #fff;
			.img {
				width: 45%;
				height: 45%;
				margin-right: 4rpx;
			}
		}
		.swiper-item-box-button {
			width: 116rpx;
			height: calc(12.5vw);
			border-radius: 10rpx;
			margin-right: 10rpx;
			background-color: #05c160;
		}
	}
}
</style>
