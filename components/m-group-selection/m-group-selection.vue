<template>
	<uni-popup ref="popup" :safe-area="false" type="bottom" maskBackgroundColor="rgba(000, 000, 000, 0.7)">
		<view class="flex_c_c next">
			<view class="top">
				<view class="icon_ text_32 top-title">
					<view class="top-title-text" @click="isChoice = !isChoice">{{ isChoice ? '取消' : '多选' }}</view>
					<view class="flex1 bold_ icon_">{{ title }}</view>
					<view class="top-title-icon" @click="close" v-if="!isChoice">
						<image
							class="img"
							src="data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjUgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTUxMS45NzkgMTAyNEMyMjkuNjg5IDEwMjQgMCA3OTQuMzEgMCA1MTEuOTc5IDAgMjI5LjY4OSAyMjkuNjkgMCA1MTEuOTc5IDBzNTExLjk3OCAyMjkuNjkgNTExLjk3OCA1MTEuOTc5QzEwMjQgNzk0LjMxIDc5NC4zMSAxMDI0IDUxMS45OCAxMDI0em0wLTk0NS41MDZjLTIzOS4wMTcgMC00MzMuNDg1IDE5NC40NjgtNDMzLjQ4NSA0MzMuNDQyIDAgMjM5LjAxNyAxOTQuNDY4IDQzMy41MjcgNDMzLjQ4NSA0MzMuNTI3IDIzOS4wMTcgMCA0MzMuNDg0LTE5NC40NjcgNDMzLjQ4NC00MzMuNTI3IDAtMjM4Ljk3NC0xOTQuNDI1LTQzMy40NDItNDMzLjQ4NC00MzMuNDQyeiIgZmlsbD0iIzUxNTE1MSIvPjxwYXRoIGQ9Ik01NjEuNjgyIDUxMS45NzlsMTUxLjc1LTE1Mi4xNzZhMzUuOTQ2IDM1Ljk0NiAwIDAgMCAwLTUwLjcyNSAzNS42OSAzNS42OSAwIDAgMC01MC41OTggMGwtMTUxLjc1IDE1Mi4yMTgtMTUxLjc1LTE1Mi4xNzVhMzUuNjkgMzUuNjkgMCAwIDAtNTAuNTk2IDAgMzUuOTQ2IDM1Ljk0NiAwIDAgMCAwIDUwLjcyNUw0NjAuNDg3IDUxMi4wMmwtMTUxLjc1IDE1Mi4xMzNhMzUuNzc2IDM1Ljc3NiAwIDEgMCA1MC41OTggNTAuNzI1bDE1MS43NS0xNTIuMTc1IDE1MS43NDkgMTUyLjE3NWEzNS43NzYgMzUuNzc2IDAgMSAwIDUwLjU5Ny01MC43MjVMNTYxLjY4MSA1MTEuOTh6IiBmaWxsPSIjNTE1MTUxIi8+PC9zdmc+"
							mode="aspectFill"
						></image>
					</view>
					<view class="size_white icon_ text_30 top-title-button" @click="submit" v-else>完成</view>
				</view>
				<view class="icon_ search">
					<view class="icon_ z_index2" v-if="!focus & !searchStr">
						<view class="search-icon">
							<image
								class="img"
								src="data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTQ2OS4zMzMgMEMyMDkuMDY3IDAgMCAyMDkuMDY3IDAgNDY5LjMzM3MyMDkuMDY3IDQ2OS4zMzQgNDY5LjMzMyA0NjkuMzM0UzkzOC42NjcgNzI5LjYgOTM4LjY2NyA0NjkuMzMzIDcyOS42IDAgNDY5LjMzMyAwem0wIDg1My4zMzNjLTIxMy4zMzMgMC0zODQtMTcwLjY2Ni0zODQtMzg0czE3MC42NjctMzg0IDM4NC0zODQgMzg0IDE3MC42NjcgMzg0IDM4NC0xNzAuNjY2IDM4NC0zODQgMzg0eiIgZmlsbD0iIzliOWI5YiIgZGF0YS1zcG0tYW5jaG9yLWlkPSJhMzEzeC5zZWFyY2hfaW5kZXguMC5pMS4xMTdjM2E4MVdwVG9pVyIgY2xhc3M9InNlbGVjdGVkIi8+PHBhdGggZD0iTTczOC4xMzMgNzQyLjRjMTcuMDY3LTE3LjA2NyA0Mi42NjctMTcuMDY3IDU5LjczNCAwbDIwOS4wNjYgMjAwLjUzM2MxNy4wNjcgMTcuMDY3IDE3LjA2NyA0Mi42NjcgMCA1OS43MzQtMTcuMDY2IDE3LjA2Ni00Mi42NjYgMTcuMDY2LTU5LjczMyAwTDczOC4xMzMgODAyLjEzM2MtMTcuMDY2LTE3LjA2Ni0xNy4wNjYtNDIuNjY2IDAtNTkuNzMzeiIgZmlsbD0iIzliOWI5YiIgZGF0YS1zcG0tYW5jaG9yLWlkPSJhMzEzeC5zZWFyY2hfaW5kZXguMC5pNC4xMTdjM2E4MVdwVG9pVyIgY2xhc3M9InNlbGVjdGVkIi8+PC9zdmc+"
								mode="aspectFill"
							></image>
						</view>
						<view class="text_32 search-text">搜索</view>
					</view>

					<view class="search-input">
						<input @input="search" v-model="searchStr" :focus="focus" @focus="focusFn" @blur="blurFn" :adjust-position="false" maxlength="50" />
					</view>
				</view>
			</view>
			<view class="flex1 next-list">
				<scroll-view class="next-scroll-left" scroll-y="true" :scroll-with-animation="true">
					<view class="icon_ item" v-for="(item, index) in list" :key="index" @click="onClick(item)">
						<view class="icon_ choice" :class="{ showChoice: isChoice, choice_: item.isChoice }">
							<image
								class="img"
								src="data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTM4NCA3NjhjLTEyLjggMC0yMS4zMzMtNC4yNjctMjkuODY3LTEyLjhMMTQwLjggNTQxLjg2N2MtMTcuMDY3LTE3LjA2Ny0xNy4wNjctNDIuNjY3IDAtNTkuNzM0czQyLjY2Ny0xNy4wNjYgNTkuNzMzIDBMMzg0IDY2NS42bDQzOS40NjctNDM5LjQ2N2MxNy4wNjYtMTcuMDY2IDQyLjY2Ni0xNy4wNjYgNTkuNzMzIDBzMTcuMDY3IDQyLjY2NyAwIDU5LjczNEw0MTMuODY3IDc1NS4yQzQwNS4zMzMgNzYzLjczMyAzOTYuOCA3NjggMzg0IDc2OHoiIGZpbGw9IiNmZmYiLz48L3N2Zz4="
								mode="aspectFill"
							></image>
						</view>
						<view class="item-img">
							<image class="img" :src="item.group_info.avatar" mode="aspectFill"></image>
						</view>
						<view class="text_32 flex1 flex_r fa_c item-name">
							{{ item.group_info.name }}
							<view class="flex1"></view>
							<view class="text_30 icon_ item-label" v-if="item.top">本群</view>
							<view class="m-line">
								<m-line color="#cecece" length="100%" :hairline="true"></m-line>
							</view>
						</view>
					</view>

					<view class="flex_c_c no-data" v-if="!hasData">
						<view class="no-data-img">
							<image
								class="img"
								src="data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkYXRhLXNwbS1hbmNob3ItaWQ9ImEzMTN4LnNlYXJjaF9pbmRleC4wLmkxMi4xMTdjM2E4MVdwVG9pVyIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiPjxwYXRoIGQ9Ik03NDIuNCAxNzkuMkgzNTMuMjhjLTY1LjAyNCAwLTExNy43NiA1Mi43MzYtMTE3Ljc2IDExNy43NnYxMDIuNEgxNzkuMmMtOC43MDQgMC0xNS4zNiA2LjY1Ni0xNS4zNiAxNS4zNnM2LjY1NiAxNS4zNiAxNS4zNiAxNS4zNmg1Ni4zMnY3MS42OEgxNzkuMmMtOC43MDQgMC0xNS4zNiA2LjY1Ni0xNS4zNiAxNS4zNnM2LjY1NiAxNS4zNiAxNS4zNiAxNS4zNmg1Ni4zMnY3Ni44SDE3OS4yYy04LjcwNCAwLTE1LjM2IDYuNjU2LTE1LjM2IDE1LjM2UzE3MC40OTYgNjQwIDE3OS4yIDY0MGg1Ni4zMnYxMTcuNzZjMCA2NS4wMjQgNTIuNzM2IDExNy43NiAxMTcuNzYgMTE3Ljc2SDc0Mi40YzY1LjAyNCAwIDExNy43Ni01Mi43MzYgMTE3Ljc2LTExNy43NnYtNDYwLjhjMC02NS4wMjQtNTIuNzM2LTExNy43Ni0xMTcuNzYtMTE3Ljc2em04Ny4wNCA1NzguNTZjMCA0OC4xMjgtMzguOTEyIDg3LjA0LTg3LjA0IDg3LjA0SDM1My4yOGMtNDguMTI4IDAtODcuMDQtMzguOTEyLTg3LjA0LTg3LjA0di00NjAuOGMwLTQ4LjEyOCAzOC45MTItODcuMDQgODcuMDQtODcuMDRINzQyLjRjNDguMTI4IDAgODcuMDQgMzguOTEyIDg3LjA0IDg3LjA0djQ2MC44eiIgZmlsbD0iIzliOWI5YiIgb3BhY2l0eT0iLjUiIGRhdGEtc3BtLWFuY2hvci1pZD0iYTMxM3guc2VhcmNoX2luZGV4LjAuaTEzLjExN2MzYTgxV3BUb2lXIiBjbGFzcz0ic2VsZWN0ZWQiLz48cGF0aCBkPSJNNzQyLjQgMjQ1Ljc2SDM1My4yOGMtMjguMTYgMC01MS4yIDIzLjA0LTUxLjIgNTEuMnY0NjAuOGMwIDI4LjE2IDIzLjA0IDUxLjIgNTEuMiA1MS4ySDc0Mi40YzI4LjE2IDAgNTEuMi0yMy4wNCA1MS4yLTUxLjJ2LTQ2MC44YzAtMjguMTYtMjMuMDQtNTEuMi01MS4yLTUxLjJ6TTQxNC4yMDggNjYwLjk5MmMwLTcxLjE2OCA1NS44MDgtMTI5LjUzNiAxMjUuOTUyLTEzMy4xMi0zNS44NC00LjA5Ni02My40ODgtMzQuODE2LTYzLjQ4OC03MS42OCAwLTM5LjkzNiAzMi4yNTYtNzIuMTkyIDcyLjE5Mi03Mi4xOTJzNzIuMTkyIDMyLjI1NiA3Mi4xOTIgNzIuMTkyYzAgMzcuMzc2LTI4LjE2IDY4LjA5Ni02NC41MTIgNzEuNjggNjkuNjMyIDQuNjA4IDEyNC45MjggNjIuNDY0IDEyNC45MjggMTMzLjEySDQxNC4yMDh6IiBmaWxsPSIjOWI5YjliIiBvcGFjaXR5PSIuMiIgZGF0YS1zcG0tYW5jaG9yLWlkPSJhMzEzeC5zZWFyY2hfaW5kZXguMC5pMTAuMTE3YzNhODFXcFRvaVciIGNsYXNzPSJzZWxlY3RlZCIvPjxwYXRoIGQ9Ik0xMDIuNCA4OTZhNDA5LjYgNTEuMiAwIDEgMCA4MTkuMiAwIDQwOS42IDUxLjIgMCAxIDAtODE5LjIgMHoiIGZpbGw9IiM5YjliOWIiIG9wYWNpdHk9Ii4xIiBkYXRhLXNwbS1hbmNob3ItaWQ9ImEzMTN4LnNlYXJjaF9pbmRleC4wLmk5LjExN2MzYTgxV3BUb2lXIiBjbGFzcz0ic2VsZWN0ZWQiLz48cGF0aCBkPSJNMTQ3LjQ1NiA4MTcuMTUyYzAgOC43MDQgNi42NTYgMTUuMzYgMTUuMzYgMTUuMzZzMTUuMzYtNi42NTYgMTUuMzYtMTUuMzYtNi42NTYtMTUuMzYtMTUuMzYtMTUuMzZjLTguMTkyIDAtMTUuMzYgNy4xNjgtMTUuMzYgMTUuMzZ6TTkyNi43MiA4MzJjLTE5LjQ1NiA1LjEyLTIzLjU1MiA5LjIxNi0yOC4xNiAyOC4xNi01LjEyLTE5LjQ1Ni05LjIxNi0yMy41NTItMjguMTYtMjguMTYgMTguOTQ0LTUuMTIgMjMuNTUyLTkuMjE2IDI4LjE2LTI4LjE2IDQuNjA4IDE4Ljk0NCA4LjcwNCAyMy41NTIgMjguMTYgMjguMTZ6TTk2MCA3NjMuMzkyYy0yNS4wODggNi42NTYtMzAuMjA4IDExLjc3Ni0zNi44NjQgMzYuODY0LTYuNjU2LTI1LjA4OC0xMS43NzYtMzAuMjA4LTM2Ljg2NC0zNi44NjQgMjUuMDg4LTYuNjU2IDMwLjIwOC0xMi4yODggMzYuODY0LTM2Ljg2NCA2LjE0NCAyNS4wODggMTEuNzc2IDMwLjIwOCAzNi44NjQgMzYuODY0ek0xNzYuNjQgMjM1LjAwOGMtMTUuMzYgNC4wOTYtMTguNDMyIDcuMTY4LTIyLjUyOCAyMi41MjgtNC4wOTYtMTUuMzYtNy4xNjgtMTguNDMyLTIyLjUyOC0yMi41MjggMTUuMzYtNC4wOTYgMTguNDMyLTcuMTY4IDIyLjUyOC0yMi41MjggMy41ODQgMTUuMzYgNy4xNjggMTguNDMyIDIyLjUyOCAyMi41Mjh6bTY2LjA0OC03OC44NDhjLTM5LjkzNiAxMC4yNC00OC4xMjggMTguOTQ0LTU4Ljg4IDU4Ljg4LTEwLjI0LTM5LjkzNi0xOC45NDQtNDguMTI4LTU4Ljg4LTU4Ljg4IDM5LjkzNi0xMC4yNCA0OC4xMjgtMTguOTQ0IDU4Ljg4LTU4Ljg4IDEwLjI0IDM5LjQyNCAxOC45NDQgNDguMTI4IDU4Ljg4IDU4Ljg4eiIgZmlsbD0iIzliOWI5YiIgb3BhY2l0eT0iLjUiIGRhdGEtc3BtLWFuY2hvci1pZD0iYTMxM3guc2VhcmNoX2luZGV4LjAuaTE0LjExN2MzYTgxV3BUb2lXIiBjbGFzcz0ic2VsZWN0ZWQiLz48cGF0aCBkPSJNODI0LjMyIDExNi4yMjR2My4wNzJsMjcuMTM2IDI1LjYgMTA0LjQ0OC01MC42ODgtOTQuMjA4IDYwLjQxNnYyOS42OTZsMTQuODQ4LTE0Ljg0OHYtLjUxMi41MTJsMTUuMzYgMTQuODQ4TDk3Mi44IDg1LjUwNFY4MS45MnoiIGZpbGw9IiM5YjliOWIiIG9wYWNpdHk9Ii4yIiBkYXRhLXNwbS1hbmNob3ItaWQ9ImEzMTN4LnNlYXJjaF9pbmRleC4wLmkxNS4xMTdjM2E4MVdwVG9pVyIgY2xhc3M9InNlbGVjdGVkIi8+PC9zdmc+"
								mode="aspectFill"
							></image>
						</view>
						<view class="text_26 color__">没查询到聊天</view>
					</view>
					<view style="height: 180rpx"></view>
					<!-- <m-bottom-paceholder></m-bottom-paceholder> -->
				</scroll-view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
import { show } from '@/utils/index.js';
let list = [];
let member_id = null;
let Item = {};
export default {
	props: {
		title: {
			type: String,
			default: '选择聊天'
		}
	},
	data() {
		return {
			focus: false,
			searchStr: '',
			hasData: true,
			isChoice: false,
			list: []
		};
	},
	// created() {
	// 	if (this.$store.state.userInfo.member_id === member_id) {
	// 		if (list.length) return (this.list = list);
	// 	}
	// 	this.getList();
	// },
	methods: {
		onClick(item) {
			if (this.isChoice) {
				item.isChoice = !item.isChoice;
				return;
			}
			const to = {
				id: item.group_id,
				type: this.GoEasy.IM_SCENE.GROUP,
				data: {
					name: item.group_info.name,
					avatar: item.group_info.avatar
				}
			};
			uni.showModal({
				content: `转发内容到"${item.group_info.name}"？`,
				success: (res) => {
					if (res.confirm) {
						this.messageTypeSend(to);
					} else if (res.cancel) {
					}
				}
			});
		},
		// 完成
		submit() {
			const items = list.filter((item) => {
				return item.isChoice;
			});
			if (!items.length) return show('需选择聊天');
			items.forEach((item) => {
				const to = {
					id: item.group_id,
					type: this.GoEasy.IM_SCENE.GROUP,
					data: {
						name: item.group_info.name,
						avatar: item.group_info.avatar
					}
				};
				this.messageTypeSend(to);
			});
		},
		// 根据不同类型发送
		messageTypeSend(to) {
			switch (Item.type) {
				case 'text':
				case 'text_quote':
					this.createTextMessage(to);
					break;
				case 'emoji_pack':
					this.createCustomEmojiPack(to);
					break;
				case 'image':
				case 'image_transmit':
					this.createImageTransmit(to);
					break;
				// 文章类型
				case 'article':
					this.createArticle(to);
					break;
				// sbcf分享
				case 'share_SBCF':
					this.createShareSBCF(to);
					break;
				case 'share_mall':
					this.createShareMall(to);
					break;
				case 'map':
					this.createCustomMessageMap(to);
					break;
				case 'functional_module':
					this.createFunctionalModule(to);
					break;
				default:
					break;
			}
		},
		// 文字信息
		createTextMessage(to) {
			const text = Item.payload.text;
			this.goEasy.im.createTextMessage({
				text,
				to,
				notification: {
					title: `${getApp().globalData.currentUser.name}发来一段文字`,
					body: text.length >= 50 ? text.substring(0, 30) + '...' : text,
					badge: '+1'
				},
				onSuccess: (message) => {
					this.sendMessage(message);
				},
				onFailed: (e) => {
					console.log('发送失败 :', e);
				}
			});
		},

		// 发送自定义表情包
		createCustomEmojiPack(to) {
			this.goEasy.im.createCustomMessage({
				type: 'emoji_pack',
				to: to,
				payload: {
					...Item.payload
				},
				notification: {
					title: `${getApp().globalData.currentUser.name}发来一个表情包`,
					body: '[表情包]', // 字段最长 50 字符
					badge: '+1'
				},
				onSuccess: (message) => {
					this.sendMessage(message);
				}
			});
		},
		// 自定义转发图片类型
		createImageTransmit(to) {
			this.goEasy.im.createCustomMessage({
				type: 'image_transmit',
				to: to,
				payload: {
					...Item.payload
				},
				notification: {
					title: `${getApp().globalData.currentUser.name}发来一张图片`,
					body: '[图片]',
					badge: '+1'
				},
				onSuccess: (message) => {
					this.sendMessage(message);
				}
			});
		},
		// 发送位置信息
		createCustomMessageMap(to) {
			this.goEasy.im.createCustomMessage({
				type: 'map',
				to,
				payload: {
					...Item.payload
				},
				notification: {
					title: `${getApp().globalData.currentUser.name}发来一个位置`,
					body: '[位置]', // 字段最长 50 字符
					badge: '+1'
				},
				onSuccess: (message) => {
					this.sendMessage(message);
				}
			});
		},

		// 文章
		createArticle(to) {
			this.goEasy.im.createCustomMessage({
				type: 'article',
				to,
				payload: {
					...Item.payload
				},
				notification: {
					title: `${getApp().globalData.currentUser.name}发来一篇文章`,
					body: '[文章分享]',
					badge: '+1'
				},
				onSuccess: (message) => {
					this.sendMessage(message);
				}
			});
		},
		// sbcf
		createShareSBCF(to) {
			this.goEasy.im.createCustomMessage({
				type: 'share_SBCF',
				to,
				payload: {
					...Item.payload
				},
				notification: {
					title: `${getApp().globalData.currentUser.name}分享一个商家`,
					body: '[商家分享]',
					badge: '+1'
				},
				onSuccess: (message) => {
					this.sendMessage(message);
				}
			});
		},
		//分享商品
		createShareMall(to) {
			this.goEasy.im.createCustomMessage({
				type: 'share_mall',
				to,
				payload: {
					...Item.payload
				},
				notification: {
					title: `${getApp().globalData.currentUser.name}分享一件商品`,
					body: '[商品分享]',
					badge: '+1'
				},
				onSuccess: (message) => {
					this.sendMessage(message);
				}
			});
		},

		// 分享功能页面入口
		createFunctionalModule(to) {
			this.goEasy.im.createCustomMessage({
				type: 'functional_module',
				to,
				payload: {
					...Item.payload
				},
				// payload: {
				// 	title: '商家联盟',
				// 	text: '备注备注备注备注',
				// 	image: '',
				// 	url: ''
				// },
				notification: {
					title: `${getApp().globalData.currentUser.name}分享一个功能入口`,
					body: '[位置]', // 字段最长 50 字符
					badge: '+1'
				},
				onSuccess: (message) => {
					this.sendMessage(message);
				}
			});
			this.text = '';
		},

		// 最终提交发送
		sendMessage(message) {
			console.log('message');
			console.log(message);
			this.goEasy.im.sendMessage({
				message,
				onSuccess: (res) => {
					console.log('发送成功.', res);
					show('成功转发', 1500, 'success');
					Item = {};
					this.$emit('sendMessage', message);
					this.close();
				},
				onFailed: function (error) {
					message.status = 'error';
					if (error.code === 507) {
						console.log('发送语音/图片/视频/文件失败，没有配置OSS存储，详情参考：https://docs.goeasy.io/2.x/im/message/media/alioss');
					} else {
						console.log('发送失败:', error);
					}
				}
			});
		},

		async getList() {
			const res = await this.API_group();
			if (res) {
				list = res.data.data;
				list.forEach((item) => {
					item['isChoice'] = false;
					item['group_id'] = `${item.group_id}`;
				});
				this.list = list;
				member_id = this.$store.state.userInfo.member_id;
			}
		},
		open(item) {
			Item = item;
			// 置顶本群
			let index = null;
			list = list.map((im, ix) => {
				if (item.groupId == `${im.group_id}`) {
					index = ix;
				}
				return {
					...im,
					top: item.groupId == `${im.group_id}`
				};
			});
			if (index != null) {
				list.unshift(list[index]);
				list.splice(index + 1, 1);
			}
			this.list = list;
			this.$refs.popup.open();
		},
		close() {
			this.$refs.popup.close();
		},
		focusFn() {
			this.focus = true;
		},
		blurFn() {
			this.focus = false;
		},
		search() {
			this.focus = true;
			if (this.searchStr) {
				let has = false;
				const lists = this.list.filter((item) => {
					return item.group_info.name.indexOf(this.searchStr) != -1;
				});
				if (lists.length) has = true;
				if (has) this.hasData = true;
				else this.hasData = false;
				this.list = lists;
			} else {
				this.hasData = true;
				this.list = list;
			}
		},
		API_group() {
			return new Promise((res) => {
				http.post('Group/group', {}, false, (r) => {
					if (r.data.code == 0) return res(r);
					return show(r.data.msg), res(false);
				});
			});
		}
	}
};
</script>
<style>
/deep/ ::-webkit-scrollbar {
	width: 0;
	height: 0;
	color: transparent;
	display: none;
}
</style>
<style lang="scss" scoped>
.next {
	position: relative;
	width: 100%;
	height: 82vh;
	background-color: #f7f7f7;
	overflow: hidden;
	border-radius: 20rpx 20rpx 0 0;
	.top {
		width: 100%;
		height: 220rpx;
		.top-title {
			width: calc(100% - 60rpx);
			height: 120rpx;
			margin: 0 auto;
			.top-title-text {
				width: 100rpx;
			}
			.top-title-icon {
				width: 44rpx;
				height: 44rpx;
				margin-left: 66rpx;
			}
			.top-title-button {
				width: 100rpx;
				height: 66rpx;
				border-radius: 10rpx;
				background-color: #4ac165;
			}
		}

		.search {
			position: relative;
			width: calc(100% - 40rpx);
			height: 80rpx;
			margin: 0 auto;
			border-radius: 14rpx;
			background-color: #fff;
			.search-input {
				box-sizing: border-box;
				padding: 0 20rpx;
				position: absolute;
				z-index: 3;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				input {
					width: 100%;
					height: 100%;
					text-align: center;
				}
			}
			.search-icon {
				width: 34rpx;
				height: 34rpx;
				margin-right: 16rpx;
			}
			.search-text {
				color: #9b9b9b;
			}
		}
	}
}

.item {
	box-sizing: border-box;
	width: 100%;
	padding: 0 0 0 20rpx;
	.item-label {
		box-sizing: border-box;
		padding: 0 14rpx;
		height: 44rpx;
		border-radius: 10rpx;
		color: #4ac165;
		border: #4ac165 1px solid;
		margin-right: 20rpx;
	}

	.choice {
		opacity: 0;
		width: 0rpx;
		height: 0rpx;
		margin-right: 0rpx;
		background-color: #fff;
		border-radius: 50%;
		border: 1px solid #999;
		transition: all 0.3s;
		.img {
			width: 80%;
			height: 80%;
			margin-top: 4rpx;
		}
	}
	.choice_ {
		background-color: #4ac165;
		border: 1px solid #4ac165;
	}
	.showChoice {
		opacity: 1;
		width: 40rpx;
		height: 40rpx;
		margin-right: 20rpx;
	}
	.item-img {
		width: 80rpx;
		height: 80rpx;
		border-radius: 10rpx;
		margin-right: 30rpx;
		overflow: hidden;
		background-color: #f1f1f1;
	}
	.item-name {
		position: relative;
		width: 100%;
		height: 120rpx;
		.m-line {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
		}
	}
}

.next-list {
	position: relative;
	width: 100%;
	height: 0;
	border-radius: 10rpx 10rpx 0 0;
	box-sizing: border-box;
	background-color: #fff;
	overflow: hidden;
	.next-scroll-left {
		height: 100%;

		.left-list {
		}
	}

	.no-data {
		width: 100%;
		.no-data-img {
			width: 200rpx;
			height: 200rpx;
			margin-top: 100rpx;
			margin-bottom: 20rpx;
		}
	}
}
</style>
