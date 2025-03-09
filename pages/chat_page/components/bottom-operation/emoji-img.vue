<template>
	<view class="scroll-view-box img">
		<scroll-view scroll-y="true" @scrolltolower="scrolltolower" class="swiper-item-box">
			<view class="z_index2 flex_r list">
				<view class="icon_ list-item">
					<view class="icon_ list_item_img" @click="addEmoji">
						<image
							class="img"
							src="data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkYXRhLXNwbS1hbmNob3ItaWQ9ImEzMTN4LnNlYXJjaF9pbmRleC4wLmk0LjU5ZTIzYTgxQUtrSDd6IiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTUzMy4zMzMgNDkwLjY2N2gyODEuNmMxMi44IDAgMjEuMzM0IDguNTMzIDIxLjMzNCAyMS4zMzNzLTguNTM0IDIxLjMzMy0yMS4zMzQgMjEuMzMzaC0yODEuNnYyODEuNmMwIDEyLjgtOC41MzMgMjEuMzM0LTIxLjMzMyAyMS4zMzRzLTIxLjMzMy04LjUzNC0yMS4zMzMtMjEuMzM0di0yODEuNmgtMjgxLjZjLTEyLjggMC0yMS4zMzQtOC41MzMtMjEuMzM0LTIxLjMzM3M4LjUzNC0yMS4zMzMgMjEuMzM0LTIxLjMzM2gyODEuNnYtMjgxLjZjMC0xMi44IDguNTMzLTIxLjMzNCAyMS4zMzMtMjEuMzM0czIxLjMzMyA4LjUzNCAyMS4zMzMgMjEuMzM0djI4MS42eiIgZGF0YS1zcG0tYW5jaG9yLWlkPSJhMzEzeC5zZWFyY2hfaW5kZXguMC5pNS41OWUyM2E4MUFLa0g3eiIgY2xhc3M9InNlbGVjdGVkIiBmaWxsPSIjM2QzZDNkIi8+PC9zdmc+"
							mode="aspectFill"
						></image>
					</view>
				</view>
				<view class="icon_ list-item" v-for="(item, index) in list" :key="item.id" @longpress.stop="longpress(item)">
					<view class="list-item-img">
						<view class="edit-choice" :class="{ edit_choice: item.isSelect }" @click.stop="onItem(item, index)" v-if="isEdit">
							<view class="icon_ edit-choice-select" :class="{ edit_choice_select: item.isSelect }">
								<image
									class="img"
									src="data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTkzMS4wMTMgMjI1LjA4Yy0yNC42MzItMjUuODk2LTY1LjAxNS0yNi4zODMtOTAuMTk0LTEuMUw0MDYuMTkyIDY2MC4yNTkgMTgxLjcyMyA0MjkuNDk2Yy0yMy4zMS0yMy45ODctNjIuMzkyLTIyLjY1Ni04Ny4zMTYgMi45NDYtMjQuOTIzIDI1LjYwNi0yNi4yMjEgNjUuNzk1LTIuODgzIDg5Ljc3N2wyNzQuMzg1IDI4Mi4wNjljMjMuMzA0IDIzLjk1NCA2Mi4zOTEgMjIuNjIzIDg3LjMxLTIuOTc4IDUuNzEtNS44NjUgOS45ODUtMTIuNTE0IDEzLjE5Mi0xOS41NDUgMi40NjctMS44NDYgNC45MjgtMy41OTcgNy4xNjMtNS44NjVsNDU2LjM3My00NTguMDkyYzI1LjIxMy0yNS4zMDggMjUuNjY4LTY2LjggMS4wNzEtOTIuNzI3aC0uMDA1em0wIDB6IiBmaWxsPSIjZmZmIi8+PC9zdmc+"
									mode="aspectFill"
								></image>
							</view>
						</view>
						<!-- #ifdef H5 || MP -->
						<image class="img" :src="item.url" mode="aspectFill" @click="onEmoji(item)"></image>
						<!-- #endif -->
						<!-- #ifdef APP -->
						<view @click="onEmoji(item)">
							<cacheImage
								:src="item.url"
								:ext="item.ext"
								mstyle="
									 {
										width: 150rpx;
										height: 150rpx;
									}
								"
							></cacheImage>
						</view>
						<!-- #endif -->
					</view>
				</view>
			</view>
			<view style="height: 70rpx" v-show="isEdit"></view>
		</scroll-view>
		<view class="color__ text_30 flex_r fa_c edit" :class="{ edit_: isEdit }">
			<view class="edit-item" @click="cancel">取消</view>
			<view class="flex1"></view>
			<view class="edit-item" style="color: #d66362" @click="deleteFn">删除</view>
		</view>
	</view>
</template>

<script>
// #ifdef APP
import cacheImage from '../cache-image/cache-image.vue';
// #endif

import { show, throttle } from '@/utils/index.js';
let listCache = [];
let no = false;
let page = 1;
export default {
	components: {
		// #ifdef APP
		cacheImage
		// #endif
	},
	props: {
		value: {
			type: Boolean,
			default: false
		},
		isShow: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			isEdit: false,

			list: []
		};
	},
	created() {
		uni.$off('collectionEmoji', this.collectionEmoji);
		uni.$on('collectionEmoji', this.collectionEmoji);
	},
	watch: {
		value: {
			handler(newName, oldName) {
				this.isEdit = newName;
			},
			immediate: true
		},
		isShow: {
			handler(newName, oldName) {
				if (newName) {
					if (listCache.length) return (this.list = listCache);
					this.getList();
				}
			},
			immediate: true
		}
	},
	methods: {
		// 监听收藏表情包
		collectionEmoji(e) {
			// 执行两次，原因未知
			throttle(() => {
				this.list.unshift({
					...e,
					isSelect: 0,
					id: new Date().getTime()
				});
				listCache = this.list;
			}, 1000);
		},
		longpress(item) {
			return;
			this.isEdit = true;
			item.isSelect = !item.isSelect;
		},
		scrolltolower() {
			if (no) return;
			page++;
			this.getList();
		},
		async getList() {
			this.list = [
				{
					id: 1,
					url: 'https://pic4.zhimg.com/50/v2-884e7c312b0776099b021170e780ca98_hd.gif?source=1940ef5c',
					path: 'emoji/fadacai.gif',
					isSelect: 0,
					ext: 'gif'
				},
				{
					id: 2,
					url: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.3uqdEQWnOBPx0G40jIjh_gHaHa?rs=1&pid=ImgDetMain',
					path: 'emoji/fadacai.gif',
					isSelect: 0,
					ext: 'png'
				},
				{
					id: 3,
					url: 'https://pic3.zhimg.com/v2-4fa5f90ee5c75973d637000acc67c9f6_b.gif',
					path: 'emoji/fadacai.gif',
					isSelect: 0,
					ext: 'gif'
				},
				{
					id: 4,
					url: 'https://ts1.cn.mm.bing.net/th/id/R-C.b9e42f61bfc70941452284e2ada6816b?rik=LDOFmBD7XU2S%2bQ&riu=http%3a%2f%2fimg.zcool.cn%2fcommunity%2f019b7d580d6e63a84a0d304faaecf5.gif&ehk=g6iEiGATRFhX88Yqu1JyAuOFZ4xkAiPI0oWVoA8HPI0%3d&risl=&pid=ImgRaw&r=0',
					path: 'emoji/fadacai.gif',
					isSelect: 0,
					ext: 'gif'
				}
			];
		},
		//
		onItem(item, index) {
			item['isSelect'] = !item['isSelect'];
		},
		// 取消
		cancel() {
			this.isEdit = false;
			this.$emit('input', this.isEdit);
			this.list.map((item, index) => {
				item['isSelect'] = false;
				return item;
			});
		},
		// 删除
		deleteFn() {
			let deleteItem = this.list.filter((item, index) => {
				return item.isSelect;
			});
			if (!deleteItem.length) return show('需选择表情包');
			console.log(deleteItem);
			uni.showModal({
				content: '确定删除选中的表情包？',
				success: async (res) => {
					if (res.confirm) {
						this.list = this.list.filter((item, index) => {
							return !item.isSelect;
						});
						listCache = this.list;
					} else if (res.cancel) {
						console.log('用户点击取消');
						this.isEdit = false;
						this.$emit('input', this.isEdit);
					}
				}
			});
		},

		onEmoji(item) {
			throttle(() => {
				this.$emit('onEmoji', item);
			}, 600);
		},
		addEmoji() {
			uni.chooseImage({
				count: 1,
				success: (res) => {
					uni.showLoading({
						title: '正在添加',
						mask: true
					});
					console.log(res);
					const tempFilePaths = res.tempFilePaths[0];
					show('已添加表情');
					this.list.unshift({
						url: tempFilePaths,
						ext: 'png',
						isSelect: 0,
						id: new Date().getTime()
					});
					listCache = this.list;
				}
			});
		},
		API_EmojiList() {
			return new Promise((res) => {
				http.get(
					'xxxxxxxx',
					{
						page: page
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
.scroll-view-box {
	position: relative;
	width: 100%;
	height: 100%;
}
.swiper-item-box {
	position: relative;
	width: 100%;
	height: 100%;
	.list {
		width: 100%;
		flex-wrap: wrap;
	}
	.list-item {
		width: 25%;
		height: 200rpx;
		.list-item-img {
			position: relative;
			width: 150rpx;
			height: 150rpx;
			.edit-choice {
				position: absolute;
				z-index: 2;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				.edit-choice-select {
					position: absolute;
					top: 10rpx;
					right: 10rpx;
					width: 40rpx;
					height: 40rpx;
					border-radius: 50%;
					border: 1px solid #fff;
					background-color: rgba(216, 216, 216, 0.5);
					.img {
						width: 70%;
						height: 70%;
					}
				}
				.edit_choice_select {
					border: 1px solid #02c162;
					background-color: #02c162;
				}
			}
			.edit_choice {
				background-color: rgba(255, 255, 255, 0.8);
			}
		}
		.list_item_img {
			box-sizing: border-box;
			width: 150rpx;
			height: 150rpx;
			border-radius: 20rpx;
			border: 2px dashed #3d3d3d;
			.img {
				width: 70%;
				height: 70%;
			}
		}
	}
}
.edit {
	box-sizing: border-box;
	padding: 0 30rpx;
	position: absolute;
	z-index: 3;
	bottom: -74rpx;
	left: 0;
	width: 100%;
	height: 70rpx;
	transition: all 0.3s;
	background-color: rgba(246, 246, 246, 0.8);
	backdrop-filter: blur(10px);
	.edit-item {
		padding: 0 10rpx;
	}
}
.edit_ {
	bottom: 0;
}
</style>
