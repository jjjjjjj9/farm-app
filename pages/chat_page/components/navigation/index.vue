<template>
	<view>
		<view class="nowrap_ navigationBar-box">
			<view :style="{ height: statusBar - 8 + 'px' }"></view>
			<view class="flex_r fa_c fj_b nowrap_ navigationBar" :style="{ height: customBar - statusBar - 8 + 'px' }">
				<view class="icon_ navigationBar-icon" @click="to()">
					<image
						class="img"
						src="data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTMyNC4yMTIgNTExLjgwNkw3ODcuODkgNzMuMDgzYzE2LjE5NC0xNi42MyAxNi4xOTQtNDMuOTc1IDAtNjAuNjA1LTE2LjE5NS0xNi42My00Mi40OTYtMTYuNjMtNTguNjE0IDBMMjM1Ljc1IDQ3OS4zNmMtOC42NDcgOC45Ny0xMi4zNDUgMjAuOTM1LTExLjcxOSAzMi40NDYtLjY0NSAxMS45MDggMy4wNzIgMjMuODc0IDExLjcyIDMyLjgyNGw0OTMuNTA2IDQ2Ni44ODNjMTYuMTE4IDE2LjY1IDQyLjQzOCAxNi42NSA1OC42MTQgMCAxNi4xOTQtMTcuMDg1IDE2LjE5NC00My45NzUgMC02MC42MDVMMzI0LjIxIDUxMS44MDYiIGZpbGw9IiMxZDFkMWQiIGRhdGEtc3BtLWFuY2hvci1pZD0iYTMxM3guc2VhcmNoX2luZGV4LjAuaTguMmM2YTNhODFJY0NLRlYiIGNsYXNzPSJzZWxlY3RlZCIvPjwvc3ZnPg=="
						mode="aspectFill"
					></image>
				</view>
				<view class="flex1 icon_ nowrap_ navigationBar-text bold_">
					<text class="nowrap_">
						{{ title }}
						<text v-if="groupCount">（{{ groupCount }}）</text>
					</text>
				</view>
				<view class="navigationBar-icon" @click="onMore">
					<image
						class="img"
						src="data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTcuMjI0OTk5OTk5OTk5OTk0IDUwNy4wMzNhMTE3LjIzIDExNy4yMyAwIDEgMCAyMzQuNDYgMCAxMTcuMjMgMTE3LjIzIDAgMSAwLTIzNC40NiAwek0zOTYuNjY3MDAwMDAwMDAwMDMgNTA3LjAzM2ExMTcuMjMgMTE3LjIzIDAgMSAwIDIzNC40NiAwIDExNy4yMyAxMTcuMjMgMCAxIDAtMjM0LjQ2IDB6TTc4NS45MjggNTA3LjAzM2ExMTcuMjMgMTE3LjIzIDAgMSAwIDIzNC40NiAwIDExNy4yMyAxMTcuMjMgMCAxIDAtMjM0LjQ2IDB6Ii8+PC9zdmc+"
						mode="aspectFill"
					></image>
				</view>
				<!-- #ifdef MP -->
				<view class="wx-srt" :style="{ width: barWidth + 'px' }"></view>
				<!-- #endif -->
			</view>

			<!-- 置顶信息 -->
			<view class="icon_ topping" :class="{ topping_: showTopping }" @click="open">
				<view class="topping-icon">
					<image
						class="img"
						src="data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTU5Ny42MjkgNzczLjMxNWgyMC4xNXYzLjQ3NmgtMjAuMTV2LTMuNDc2em04OC42NTQtMjEuNTA5aDQuOTg2djE2LjExOGgtNC45ODZ2LTE2LjExN3ptMTUuNzEzLS4xaDUuMDM4djE2LjIxOGgtNS4wMzh2LTE2LjIxOHptLTEwNC4zNjcgMjguMjA4aDIwLjE1djMuNDc1aC0yMC4xNXYtMy40NzV6bS00MzcuNTUtMzYwLjIyNmg3MDEuODM1djQ4Mi41M0gxNjAuMDh2LTQ4Mi41M3ptNzY3LjYzNyA1NTQuNzY1SDk0LjI4NFYzNTIuMjI2aDgzMy40MzJ2NjIyLjIyN3ptLTgwNy43NTUtMjUuNjg1aDc4Mi4wNDJWMzc3LjkwNEgxMTkuOTZ2NTcwLjg2NHptNjc1LjQ3LTYxMy43ODlMNTUwLjgwNyAxMzkuMjlsMTguOTg0LTIzLjcxNSAyNzQuNzcgMjE5LjQwNXptLTU2OC44NzggMGwyNDQuNjM1LTE5NS42OS0xOC45Ny0yMy43MTUtMjc0Ljc5MiAyMTkuNDA1ek01NTQuODQ2IDgzLjU1M2MwIDI0LjI0Ny0xOS42MzMgNDMuODc0LTQzLjg1IDQzLjg3NC0yNC4yMzEgMC00My44OC0xOS42MjctNDMuODgtNDMuODc0IDAtMjQuMjE1IDE5LjY0OS00My44NjUgNDMuODgtNDMuODY1IDI0LjIxNyAwIDQzLjg1IDE5LjY1IDQzLjg1IDQzLjg2NXoiIGZpbGw9IiNmZmMzMDEiLz48L3N2Zz4="
						mode="aspectFill"
					></image>
				</view>
				<view class="text_28 nowrap_ flex1 topping-text"><view class="nowrap_ text_32" v-html="renderTextMessageNo"></view></view>
			</view>
		</view>

		<uni-popup ref="popup" type="top" maskBackgroundColor="rgba(255, 255, 255, 0.7)" @maskClick="maskClick">
			<view class="flex_c popup-box">
				<view class="popup-top" :style="{ height: $store.state.StatusBar.customBar + 10 + 'px' }"></view>
				<view class="content">
					<view class="text_32" :style="{ whiteSpace: 'pre-wrap' }" v-html="renderTextMessage"></view>
				</view>
				<view class="flex_r popup-box-bottom">
					<view class="icon_ text_30 bold_ size_white button" @click="noticeReaded">
						<view class="button-icon">
							<image
								class="img"
								src="data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTgzMi44NTMgODY2Ljk4N2gtNjE0LjRjLTU4LjAyNiAwLTEwMi40LTQ0LjM3NC0xMDIuNC0xMDIuNFY0MzAuMDhjMC0zNy41NDcgMjAuNDgtNzEuNjggNTQuNjE0LTg4Ljc0N2wzMDcuMi0xNzAuNjY2YzMwLjcyLTE3LjA2NyA2NC44NTMtMTcuMDY3IDk1LjU3MyAwbDMyMC44NTMgMTYwLjQyNmMyMy44OTQgMTAuMjQgMzcuNTQ3IDM0LjEzNCAzNy41NDcgNTguMDI3cy0xMy42NTMgNDcuNzg3LTM0LjEzMyA2MS40NGwtMzE3LjQ0IDE4NC4zMmMtMzQuMTM0IDIwLjQ4LTc4LjUwNyAxNy4wNjctMTEyLjY0LTMuNDEzTDI2Ni4yNCA0ODguMTA3Yy0xMy42NTMtMTAuMjQtMjAuNDgtMzAuNzItNi44MjctNDcuNzg3czMwLjcyLTIwLjQ4IDQ3Ljc4Ny02LjgyN2wyMDEuMzg3IDE0My4zNmMxMC4yNCA2LjgyNyAyMy44OTMgNi44MjcgMzcuNTQ2IDMuNDE0bDMxNy40NC0xODQuMzJMNTQyLjcyIDIzNS41MmMtMTAuMjQtMy40MTMtMjAuNDgtMy40MTMtMzAuNzIgMEwyMDQuOCA0MDIuNzczYy0xMC4yNCA2LjgyNy0xNy4wNjcgMTcuMDY3LTE3LjA2NyAzMC43MlY3NjhjMCAyMC40OCAxMy42NTQgMzQuMTMzIDM0LjEzNCAzNC4xMzNoNjE0LjRjMjAuNDggMCAzNC4xMzMtMTMuNjUzIDM0LjEzMy0zNC4xMzNWNTYzLjJjMC0yMC40OCAxMy42NTMtMzQuMTMzIDM0LjEzMy0zNC4xMzNzMzQuMTM0IDEzLjY1MyAzNC4xMzQgMzQuMTMzVjc2OGMtMy40MTQgNTEuMi00Ny43ODcgOTguOTg3LTEwNS44MTQgOTguOTg3eiIgZmlsbD0iI2ZmZiIgZGF0YS1zcG0tYW5jaG9yLWlkPSJhMzEzeC5zZWFyY2hfaW5kZXguMC5pNS42NTgyM2E4MWJhWkhnMiIgY2xhc3M9InNlbGVjdGVkIi8+PC9zdmc+"
								mode="aspectFill"
							></image>
						</view>
						已读
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import { to, show } from '@/utils/index.js';
import { EmojiDecoder, emojiMap } from '../../lib/EmojiDecoder.js';
const emojiUrl = 'https://imgcache.qq.com/open/qcloud/tim/assets/emoji/';
const decoder = new EmojiDecoder(emojiUrl, emojiMap);
// #ifdef MP
const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
let barWidth = menuButtonInfo.width;
// #endif

export default {
	props: {
		title: {
			type: String,
			default: ''
		},
		groupCount: {
			type: [String, Number],
			default: ''
		},
		group_id: {
			type: [String, Number],
			default: ''
		},
		isPrivate: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			// #ifdef MP
			barWidth,
			// #endif
			showTopping: false,
			pageData: {}
		};
	},
	watch: {
		group_id(value) {
			if (value) {
				if (!this.isPrivate) {
					this.getData();
				}
			}
		}
	},
	computed: mapState({
		customBar: (state) => state.StatusBar.customBar,
		statusBar: (state) => state.StatusBar.statusBar,
		userInfo: (state) => state.userInfo,
		//渲染文本消息，如果包含表情，替换为图片
		//todo:本不需要该方法，可以在标签里完成，但小程序有兼容性问题，被迫这样实现
		renderTextMessage() {
			const text = this.pageData.content;
			if (!text) return '';
			return '<span>' + decoder.decode(text) + '</span>';
		},
		renderTextMessageNo() {
			const text = this.pageData.content;
			if (!text) return '';
			return '<span>' + decoder.decodeNo(text) + '</span>';
		}
	}),
	methods: {
		to,
		onMore() {
			if (this.isPrivate) {
				to(`/pagesGoEasy/group_member_infor/index`, { member_id: this.group_id });
			} else {
				to(`/pagesGoEasy/group_infor/index?group_id=${this.group_id}`);
			}
		},
		open() {
			this.showTopping = false;
			this.$refs.popup.open();
		},
		close() {
			this.showTopping = false;
			this.$refs.popup.close();
		},
		maskClick() {
			this.showTopping = true;
		},
		async getData() {
			const res = await this.API_notice();
			if (res) {
				const data = res.data.data;
				this.pageData = data;
				if (!data.is_new) {
					this.showTopping = true;
				}
				if (!data.content) this.showTopping = false;
			}
		},
		async noticeReaded() {
			uni.showLoading({
				title: '加载中'
			});
			const res = await this.API_noticeReaded();
			if (res) {
				this.close();
				show('标记已读', 2000, 'success');
			}
			uni.hideLoading();
		},
		API_notice() {
			return new Promise((res) => {
				http.post(
					'Group/notice',
					{
						group_id: this.group_id
					},
					true,
					(r) => {
						if (r.data.code == 0) return res(r);
						return show(r.data.msg), res(false);
					}
				);
			});
		},
		// 已读
		API_noticeReaded() {
			return new Promise((res) => {
				http.post(
					'Group/noticeReaded',
					{
						group_id: this.group_id,
						notice_id: this.pageData.notice_id
					},
					true,
					(r) => {
						if (r.data.code == 0) return res(r);
						return show(r.data.msg), res(false);
					}
				);
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.topping {
	position: relative;
	top: -10rpx;
	box-sizing: border-box;
	padding: 0 20rpx;
	width: calc(100% - 40rpx);
	height: 0rpx;
	margin: 0rpx auto;
	box-sizing: border-box;
	border-radius: 10rpx;
	background-color: #fff;
	overflow: hidden;
	opacity: 0;
	transition: all 0.3s;
	.topping-icon {
		width: 50rpx;
		height: 50rpx;
		margin-bottom: 4rpx;
		margin-right: 16rpx;
	}
	.topping-text {
	}
}
.topping_ {
	position: relative;
	top: 0rpx;
	height: 80rpx;
	margin: 20rpx auto;
	opacity: 1;
}
.wx-srt {
	height: 20rpx;
}

.popup-box {
	box-sizing: border-box;
	padding: 0 20rpx 20rpx 20rpx;
	width: 100%;
	max-height: 70vh;
	border-radius: 0 0 20rpx 20rpx;
	background-color: #fff;
	.content {
		box-sizing: border-box;
		width: 100%;
		overflow-x: auto;
	}
	.popup-box-bottom {
		width: 100%;
		height: 60rpx;
		margin-top: 10rpx;
		flex-direction: row-reverse;
		.button {
			width: 150rpx;
			height: 60rpx;
			border-radius: 10rpx;
			background-color: #05c160;
			.button-icon {
				width: 44rpx;
				height: 44rpx;
				margin-bottom: 4rpx;
				margin-right: 10rpx;
			}
		}
	}
}

.navigationBar-box {
	position: fixed;
	z-index: 98;
	top: 0;
	left: 0;
	width: 100%;
	padding-bottom: 14rpx;
	background-color: rgba(237, 237, 237, 0.9);
	backdrop-filter: blur(10px);
	.navigationBar {
		width: 100%;

		.navigationBar-icon {
			width: 40rpx;
			height: 40rpx;
			margin: 0 30rpx;
			.img {
				width: 90%;
				height: 90%;
			}
		}

		.navigationBar-text {
			font-size: 16px;
			margin: 0 20rpx;
		}
	}
}
</style>
