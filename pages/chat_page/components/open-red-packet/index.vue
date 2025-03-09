<template>
	<view class="">
		<uni-popup ref="popup" type="center" maskBackgroundColor="rgba(255, 255, 255, 0.7)">
			<view class="popup-box">
				<view class="popup">
					<view class="z_index2 flex_c_c popup-top">
						<view class="popup-top-str">
							<view class="popup-top-str-img" v-if="pageObj.payload">
								<!-- #ifdef APP -->
								<cacheImage
									:src="pageObj.payload.red_packet_bg"
									ext="jpg"
									mstyle="
										 {
											width: 580rpx;
											height: 800rpx;
										}
									"
								></cacheImage>
								<!-- #endif -->
								<!-- #ifndef APP -->
								<image class="img" :src="pageObj.payload.red_packet_bg" mode="aspectFill"></image>
								<!-- #endif -->
							</view>
						</view>
						<view class="icon_ z_index2 info">
							<view class="info-img" style="flex-shrink: 0">
								<image class="img" :src="pageObj.senderData.avatar" mode="aspectFill"></image>
							</view>
							<view class="text_30 info-name">{{ pageObj.senderData.name }} 发出的红包</view>
						</view>

						<view class="z_index2 popup-title" v-if="pageObj.is_refund">红包已过期</view>

						<view class="text_36 z_index2 popup-title" v-else>
							<view v-if="pageObj.had_draw" class="text_50 bold_">
								{{ pageObj.my_red }}
								<text class="text_22">蝌蚪</text>
							</view>
							<text>{{ pageObj.remark }}</text>
							<!-- 专属红包 -->
							<view v-if="pageObj.type === 2">
								<text v-if="pageObj.is_end === 1">xxxxxx 已领取</text>
								<text v-else>xxxx 的专属红包</text>
							</view>
							<!-- 普通拼手气红包 -->
							<view v-else>
								<text v-if="!pageObj.had_draw && pageObj.is_end === 1">手慢了，红包派完了</text>
							</view>
						</view>
						<view style="height: 300rpx"></view>

						<!-- 拼手气红包 -->
						<template v-if="!pageObj.is_refund">
							<template v-if="pageObj.type === 1">
								<view class="icon_ popup-top-icon" :class="{ popup_top_icon: isOpen }" @click="open_red_packet" v-if="!pageObj.had_draw && !pageObj.is_end">
									<image
										class="img"
										src="data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTMzNy4zNTEgMzkzLjA0Mmw3Ni45NDctNDYuMTY4Vjg1LjI1N2wzNC43OC0yMy41NDVhOS4wOCA5LjA4IDAgMCAwIDAtMTUuMzlsLTY1LjU1OS00My41NWExNS4zOSAxNS4zOSAwIDAgMC0yMi43NzYgNi4xNTVsLTIzLjM5MiA0NS41NTJIMTY4LjA3TDc3Ljg5IDIuOTI1YTExLjY5NiAxMS42OTYgMCAwIDAtMTcuNTQ1IDEwLjE1N1YxMDI0bDkyLjMzNi00Ni4xNjhWMzYyLjI2M2gxODQuNjd6bS0xODQuNjctMzE1Ljk0aDE4NC42N3YxMjMuMTEzaC0xODQuNjd6bTAgMjUzLjkyMVYyMjMuM2gxODQuNjd2MTA3LjcyNHpNOTUyLjkyIDU0LjQ4TDg3NS45NzMgOC4zMWEyMS4zOTEgMjEuMzkxIDAgMCAwLTMwLjc3OCAwTDgzMC43MyA1MS41NTVhNC4zMDkgNC4zMDkgMCAwIDEtMy44NDcgMi45MjRINjQ2LjA1OWE0LjE1NSA0LjE1NSAwIDAgMS0xLjg0NiAwbC02OC42MzYtMzQuNzhBMTUuMzkgMTUuMzkgMCAwIDAgNTUyLjggMzMuNzAzdjM1My45NTNhNC4xNTUgNC4xNTUgMCAwIDAgNC43NyA0LjE1NWw4Ny41NjUtMTQuMTU4di0xNS4zOWgxODAuNTE2YTQuMTU1IDQuMTU1IDAgMCAxIDQuMTU1IDQuMTU1djUwMy42OXMwIDQ2LjE2Ny0zMC43NzkgNDYuMTY3Yy0xNS4zOSAwLTEzOC41MDMtMTUuMzg5LTEzOC41MDMtMTUuMzg5djE1LjM5czEwOC45NTYgMTMuNTQyIDEzNC42NTYgOTIuMzM1YTEyLjkyNyAxMi45MjcgMCAwIDAgMTkuMjM2IDcuMjMzbDEwNy43MjUtNjAuMTcyYTMwLjc3OCAzMC43NzggMCAwIDAgMTUuMzktMjYuMzE2VjEwMi44MDFhNC4xNTUgNC4xNTUgMCAwIDEgMS42OTItMy4zODZjOC4wMDItNS42OTQgNDAuOTM1LTMxLjM5NCAxMy42OTYtNDQuOTM2ek04MjUuNjUgMzMxLjQ4NWgtMTc2LjM2YTQuMTU1IDQuMTU1IDAgMCAxLTQuMTU1LTQuMTU1di05OS40MTVhNC4xNTUgNC4xNTUgMCAwIDEgNC4xNTUtNC4xNTVoMTc2LjM2YTQuMTU1IDQuMTU1IDAgMCAxIDQuMTU2IDQuMTU1djk5LjQxNWE0LjE1NSA0LjE1NSAwIDAgMS00LjE1NSA0LjE1NXptMC0xMzAuODA4aC0xNzYuMzZhNC4xNTUgNC4xNTUgMCAwIDEtNC4xNTUtNC4xNTZWODEuNzE4YTQuMTU1IDQuMTU1IDAgMCAxIDQuMTU1LTQuNjE3aDE3Ni4zNmE0LjE1NSA0LjE1NSAwIDAgMSA0LjE1NiA0LjYxN1YxOTYuNTJhNC4xNTUgNC4xNTUgMCAwIDEtNC4xNTUgMy42OTR6IiBmaWxsPSIjNGY0YzQzIi8+PHBhdGggZD0iTTgxMC43MjQgNjgxLjc0NGwtODAuNzkzLTgxLjQxYTguMDAyIDguMDAyIDAgMCAwLTEyLjc3NCAyLjE1NWwtMjUuODUzIDUyLjE3aC00Ni4xNjhWNDg1LjM3N2g5OS4yNmE0LjE1NSA0LjE1NSAwIDAgMCAzLjIzMi02LjYxN2wtNTAuMDE1LTYzLjA5NmE3LjU0IDcuNTQgMCAwIDAtMTIuMDAzIDBsLTI1LjA4NSAzOC45MzVIMjQ1LjAxNnYzMC43NzhoMTA3LjcyNVY2NTQuNjZIMTgzLjQ1OWEzMy43MDIgMzMuNzAyIDAgMCAxIDE1LjM5IDQ2LjE2N0gzNTIuNzRDMzY4LjEzIDgzOS4zMyAyMjkuNjI3IDk0Ny4wNTQgMjI5LjYyNyA5NDcuMDU0Yy0zMC43NzkgMzAuNzc4IDAgMzAuNzc4IDAgMzAuNzc4IDIxNS40NDktOTIuMzM1IDIwMC4wNi0yNzcuMDA2IDIwMC4wNi0yNzcuMDA2SDU1Mi44djI3Ny4wMDZjOTIuMzM1LTE1LjM4OSA5Mi4zMzUtNDYuMTY3IDkyLjMzNS00Ni4xNjdWNzAwLjgyNmgxNTEuNzM4YTUuMzg2IDUuMzg2IDAgMCAwIDMuNjkzLTEuNTM5bDEwLjE1Ny0xMC4xNTdhNS4yMzIgNS4yMzIgMCAwIDAgMC03LjM4NnptLTI1Ny45MjMtMjcuMDg1SDQyOS42ODdWNDg1LjM3N0g1NTIuOHoiIGZpbGw9IiM0ZjRjNDMiLz48L3N2Zz4="
										mode="aspectFill"
									></image>
								</view>
							</template>

							<template v-else>
								<view class="icon_ popup-top-icon" :class="{ popup_top_icon: isOpen }" @click="open_red_packet" v-if="!pageObj.had_draw && myid === pageObj.to_uid">
									<image
										class="img"
										src="data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTMzNy4zNTEgMzkzLjA0Mmw3Ni45NDctNDYuMTY4Vjg1LjI1N2wzNC43OC0yMy41NDVhOS4wOCA5LjA4IDAgMCAwIDAtMTUuMzlsLTY1LjU1OS00My41NWExNS4zOSAxNS4zOSAwIDAgMC0yMi43NzYgNi4xNTVsLTIzLjM5MiA0NS41NTJIMTY4LjA3TDc3Ljg5IDIuOTI1YTExLjY5NiAxMS42OTYgMCAwIDAtMTcuNTQ1IDEwLjE1N1YxMDI0bDkyLjMzNi00Ni4xNjhWMzYyLjI2M2gxODQuNjd6bS0xODQuNjctMzE1Ljk0aDE4NC42N3YxMjMuMTEzaC0xODQuNjd6bTAgMjUzLjkyMVYyMjMuM2gxODQuNjd2MTA3LjcyNHpNOTUyLjkyIDU0LjQ4TDg3NS45NzMgOC4zMWEyMS4zOTEgMjEuMzkxIDAgMCAwLTMwLjc3OCAwTDgzMC43MyA1MS41NTVhNC4zMDkgNC4zMDkgMCAwIDEtMy44NDcgMi45MjRINjQ2LjA1OWE0LjE1NSA0LjE1NSAwIDAgMS0xLjg0NiAwbC02OC42MzYtMzQuNzhBMTUuMzkgMTUuMzkgMCAwIDAgNTUyLjggMzMuNzAzdjM1My45NTNhNC4xNTUgNC4xNTUgMCAwIDAgNC43NyA0LjE1NWw4Ny41NjUtMTQuMTU4di0xNS4zOWgxODAuNTE2YTQuMTU1IDQuMTU1IDAgMCAxIDQuMTU1IDQuMTU1djUwMy42OXMwIDQ2LjE2Ny0zMC43NzkgNDYuMTY3Yy0xNS4zOSAwLTEzOC41MDMtMTUuMzg5LTEzOC41MDMtMTUuMzg5djE1LjM5czEwOC45NTYgMTMuNTQyIDEzNC42NTYgOTIuMzM1YTEyLjkyNyAxMi45MjcgMCAwIDAgMTkuMjM2IDcuMjMzbDEwNy43MjUtNjAuMTcyYTMwLjc3OCAzMC43NzggMCAwIDAgMTUuMzktMjYuMzE2VjEwMi44MDFhNC4xNTUgNC4xNTUgMCAwIDEgMS42OTItMy4zODZjOC4wMDItNS42OTQgNDAuOTM1LTMxLjM5NCAxMy42OTYtNDQuOTM2ek04MjUuNjUgMzMxLjQ4NWgtMTc2LjM2YTQuMTU1IDQuMTU1IDAgMCAxLTQuMTU1LTQuMTU1di05OS40MTVhNC4xNTUgNC4xNTUgMCAwIDEgNC4xNTUtNC4xNTVoMTc2LjM2YTQuMTU1IDQuMTU1IDAgMCAxIDQuMTU2IDQuMTU1djk5LjQxNWE0LjE1NSA0LjE1NSAwIDAgMS00LjE1NSA0LjE1NXptMC0xMzAuODA4aC0xNzYuMzZhNC4xNTUgNC4xNTUgMCAwIDEtNC4xNTUtNC4xNTZWODEuNzE4YTQuMTU1IDQuMTU1IDAgMCAxIDQuMTU1LTQuNjE3aDE3Ni4zNmE0LjE1NSA0LjE1NSAwIDAgMSA0LjE1NiA0LjYxN1YxOTYuNTJhNC4xNTUgNC4xNTUgMCAwIDEtNC4xNTUgMy42OTR6IiBmaWxsPSIjNGY0YzQzIi8+PHBhdGggZD0iTTgxMC43MjQgNjgxLjc0NGwtODAuNzkzLTgxLjQxYTguMDAyIDguMDAyIDAgMCAwLTEyLjc3NCAyLjE1NWwtMjUuODUzIDUyLjE3aC00Ni4xNjhWNDg1LjM3N2g5OS4yNmE0LjE1NSA0LjE1NSAwIDAgMCAzLjIzMi02LjYxN2wtNTAuMDE1LTYzLjA5NmE3LjU0IDcuNTQgMCAwIDAtMTIuMDAzIDBsLTI1LjA4NSAzOC45MzVIMjQ1LjAxNnYzMC43NzhoMTA3LjcyNVY2NTQuNjZIMTgzLjQ1OWEzMy43MDIgMzMuNzAyIDAgMCAxIDE1LjM5IDQ2LjE2N0gzNTIuNzRDMzY4LjEzIDgzOS4zMyAyMjkuNjI3IDk0Ny4wNTQgMjI5LjYyNyA5NDcuMDU0Yy0zMC43NzkgMzAuNzc4IDAgMzAuNzc4IDAgMzAuNzc4IDIxNS40NDktOTIuMzM1IDIwMC4wNi0yNzcuMDA2IDIwMC4wNi0yNzcuMDA2SDU1Mi44djI3Ny4wMDZjOTIuMzM1LTE1LjM4OSA5Mi4zMzUtNDYuMTY3IDkyLjMzNS00Ni4xNjdWNzAwLjgyNmgxNTEuNzM4YTUuMzg2IDUuMzg2IDAgMCAwIDMuNjkzLTEuNTM5bDEwLjE1Ny0xMC4xNTdhNS4yMzIgNS4yMzIgMCAwIDAgMC03LjM4NnptLTI1Ny45MjMtMjcuMDg1SDQyOS42ODdWNDg1LjM3N0g1NTIuOHoiIGZpbGw9IiM0ZjRjNDMiLz48L3N2Zz4="
										mode="aspectFill"
									></image>
								</view>
							</template>
						</template>
					</view>
					<view class="popup-button">
						<!-- 自己有强到；已经抢完；专属红包并且不是自己的 -->
						<view
							class="text_28 icon_ popup-button-text"
							@click="onOpen"
							v-if="pageObj.had_draw || pageObj.is_end === 1 || (pageObj.had_draw === 1 && pageObj.type === 2)"
						>
							查看领取详情
							<view class="popup-button-icon">
								<image
									class="img"
									src="data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTM0Ny42ODcgMTQ0LjE4OGwtNTIuNzYxIDUyLjIzOCAzMTMuOTI4IDMxNi4wODItMzE2LjU2OCAzMTMuNDIgNTIuMzE0IDUyLjY3MyAzNjkuMzIyLTM2NS42NjN6IiBmaWxsPSIjZmFlMWFhIiBkYXRhLXNwbS1hbmNob3ItaWQ9ImEzMTN4LnNlYXJjaF9pbmRleC4wLmkxMC4zN2RiM2E4MXZBSW5MVyIgY2xhc3M9InNlbGVjdGVkIi8+PC9zdmc+"
									mode="aspectFill"
								></image>
							</view>
						</view>
					</view>
				</view>

				<view class="close" @click="onClose">
					<image
						class="img"
						src="data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTUxMiAuMDA2QzIyOS4yMzMuMDA2LjAwNiAyMjkuMjMzLjAwNiA1MTJTMjI5LjIzMyAxMDIzLjk5MyA1MTIgMTAyMy45OTMgMTAyMy45OTQgNzk0Ljc2NyAxMDIzLjk5NCA1MTIgNzk0Ljc2Ny4wMDYgNTEyIC4wMDZ6bTAgOTYyLjU0OUMyNjMuNTYzIDk2Mi41NTUgNjEuNDQ1IDc2MC40MzcgNjEuNDQ1IDUxMlMyNjMuNTYzIDYxLjQ0NSA1MTIgNjEuNDQ1IDk2Mi41NTUgMjYzLjU2MyA5NjIuNTU1IDUxMiA3NjAuNDM3IDk2Mi41NTUgNTEyIDk2Mi41NTV6IiBmaWxsPSIjZDNhZDczIi8+PHBhdGggZD0iTTcwNy40OTggMjczLjA2M0w1MTIgNDY4LjU2MSAzMTYuNTAyIDI3My4wNjNsLTQzLjQ0OSA0My40MzlMNDY4LjU1MSA1MTIgMjczLjA1MyA3MDcuNDk3bDQzLjQ0OSA0My40NUw1MTIgNTU1LjQ0OWwxOTUuNDk4IDE5NS40OTggNDMuNDQ5LTQzLjQ1TDU1NS40NDkgNTEybDE5NS40OTgtMTk1LjQ5OHoiIGZpbGw9IiNkM2FkNzMiLz48L3N2Zz4="
						mode="aspectFill"
					></image>
				</view>
			</view>
		</uni-popup>
	</view>
</template>
<script>
// import { 自己的信息 } from '@/TEST/index';
// #ifdef APP
import cacheImage from '../cache-image/cache-image.vue';
// #endif
import { to, show } from '@/utils/index.js';

const AudioContext = uni.createInnerAudioContext();
// 这里放打开红包时的金币掉落音频
AudioContext.src = 'https://xxxxxxxxxxx.mp3';
let item = null;
export default {
	components: {
		// #ifdef APP
		cacheImage
		// #endif
	},
	data() {
		return {
			myid: null,
			isOpen: false,
			pageObj:{
				senderData:{}
			},
			item: {
				senderData: {},
				payload: {}
			}
		};
	},
	methods: {
		onClose() {
			this.$refs.popup.close();
		},
		async open(e) {
			uni.showLoading({
				title: '加载中'
			});
			console.log(e);
			item = e;
			const { member_id = '' } = 自己的信息;
			this.myid = member_id;
			const data = {
				type:1,//1拼手气,2专属
				to_uid: 62413,
				red_money: '0.01',
				remark: '恭喜发财,大吉大利', //是否
				is_refund: 0, //是否过期
				had_draw: 0,//自己是否抢到
				is_end: 0,//是否还有
				my_red: null,//自己领取了多少钱
				red_packet_bg: 'https://app.gdmlmh.cn/static/images/red/red_bg.jpg'//红包背景
			};
			this.pageObj = { ...e, ...data, type: data.type };
			console.log(this.$refs.popup)
			this.$refs.popup.open();
			// 没有了并且也没抢到
			// if (data.is_end === 1 && !data.had_draw) {
			// 	e.isClick = 1;
			// 	uni.$emit('open_red_packet', '1');
			// 	// 强制更新试图
			// 	this.$forceUpdate();
			// 	let envelopeClickList = uni.getStorageSync('envelopeClickList') || [];
			// 	if (envelopeClickList.includes(item.messageId)) {
			// 		// 这里就不用改状态了，因为前面也就改了
			// 	} else {
			// 		// 没有就存
			// 		envelopeClickList = envelopeClickList.slice(0, 300);
			// 		envelopeClickList.push(item.messageId);
			// 		uni.setStorage({
			// 			//红包是否已点击
			// 			key: 'envelopeClickList',
			// 			data: envelopeClickList
			// 		});
			// 	}
			// }
			uni.hideLoading();
		},

		onOpen() {
			to('/pagesGoEasy/envelope_receive/index', { messageId: item.payload.message_id, group_id: item.id });
			this.onClose();
		},
		// 点击开启
		async open_red_packet() {
			this.isOpen = true;
			const code = '0';
			uni.$emit('open_red_packet', code);
			uni.$off('open_red_packet');
			let envelopeClickList = uni.getStorageSync('envelopeClickList') || [];
			envelopeClickList = envelopeClickList.slice(0, 300);
			envelopeClickList.push(item.messageId);
			uni.setStorage({
				//红包是否已点击
				key: 'envelopeClickList',
				data: envelopeClickList
			});
			if (code === '0') {
				// 金币声音
				AudioContext.play();
				// 领取
				// 延时展示一下动画
				setTimeout(() => {
					this.onClose();
					this.isOpen = false;
					to('/pagesGoEasy/envelope_receive/index', { messageId: item.payload.message_id, group_id: item.id, first: 1 });
				}, 600);
			} else {
				this.isOpen = false;
				switch (code) {
					case '-2':
						// 已被领完
						this.pageObj.is_end = 1;
						this.pageObj.had_draw = 0;
						show('手慢了！');
						break;
					case '-3':
						// 已过期
						show('红包已过期');
						break;
					case '-5':
						// 已领取
						this.pageObj.had_draw = 1;
						show('已领取');
						break;
					default:
						show('红包异常');
						this.onClose();
						break;
				}
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.popup-box {
	position: relative;
	margin-bottom: 200rpx;
	.close {
		position: absolute;
		bottom: -130rpx;
		left: calc(50% - 35rpx);
		width: 70rpx;
		height: 70rpx;
	}
}
.popup {
	width: 580rpx;
	height: 1000rpx;
	border-radius: 20rpx;
	overflow: hidden;
	background-color: #f35d4c;
	.popup-top {
		position: relative;
		width: 100%;
		height: 800rpx;
		border-radius: 20rpx;
		.info {
			margin: 0 auto;
			width: calc(100% - 40rpx);
			.info-img {
				width: 40rpx;
				height: 40rpx;
				background-color: #fff;
				margin-right: 10rpx;
				border-radius: 6rpx;
				overflow: hidden;
			}
			.info-name {
				color: #fae1aa;
			}
		}
		.popup-title {
			margin-top: 50rpx;
			text-align: center;
			color: #fae1aa;
		}

		.popup-top-str {
			position: absolute;
			left: calc(50% - 600rpx);
			bottom: 0rpx;
			width: 1200rpx;
			height: 1100rpx;
			border-radius: 50%;
			overflow: hidden;
			box-shadow: 0rpx 4rpx 10rpx rgba(0, 0, 0, 0.2);
			.popup-top-str-img {
				position: absolute;
				left: calc(50% - 290rpx);
				bottom: 0;
				width: 580rpx;
				height: 800rpx;
			}
		}
		.popup-top-icon {
			position: absolute;
			bottom: -90rpx;
			left: calc(50% - 90rpx);
			width: 180rpx;
			height: 180rpx;
			background-color: #eccc99;
			border-radius: 50%;
			box-shadow: 0rpx 2rpx 6rpx rgba(0, 0, 0, 0.2);
			.img {
				width: 40%;
				height: 40%;
			}
		}
		.popup_top_icon {
			animation: animateName 1.5s infinite;
		}
	}
	.popup-button {
		position: relative;
		z-index: 1;
		width: 100%;
		height: 200rpx;
		border-radius: 0 0 20rpx 20rpx;
		.popup-button-text {
			position: absolute;
			height: 40rpx;
			width: 100%;
			bottom: 40rpx;
			left: 0;
			color: #fae1aa;
			.popup-button-icon {
				width: 40rpx;
				height: 40rpx;
			}
		}
	}
}
@keyframes animateName {
	0% {
		transform: rotateY(0deg);
	}
	50% {
		transform: rotateY(180deg);
	}
	100% {
		transform: rotateY(0deg);
	}
}
</style>
