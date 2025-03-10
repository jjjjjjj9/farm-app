<template>
	<view :id="page_font_size">
		<view class="flex_c page" @touchmove="touchmove">
			<scroll-view
				class="flex1 scroll-Y"
				@tap.stop="onPage"
				id="scroll-view"
				lower-threshold="100"
				scroll-y
				scroll-with-animation
				:scroll-top="scroll_top"
				@scroll="scroll"
				@scrolltoupper="scrolltoupper"
				@scrolltolower="scrolltolower"
			>
				<view :style="{ height: bottomView }"></view>
				<template v-for="(item, index) in history.messages">
					<!-- #ifdef APP || H5 -->
					<view class="z_index2" :class="`oneheight_${index}`" style="transform: rotate(-180deg)" :key="item.messageId + index" v-if="!item.isHide">
						<view class="icon_ text_26 color__ time">
							{{ renderMessageDate(item, index) }}
						</view>
						<view :key="item.messageId + index" v-if="!item.recalled">
							<item :isMy="isSelf(item.senderId)" :myid="own.id" :item="item" @onClick="onItem" @onLongpress="onLongpress" @mention="mention"></item>
						</view>
						<view class="icon_ text_26 recalled" v-else>
							<view class="">
								<text v-if="isSelf(item.senderId)">你</text>
								<text v-else>{{ item.senderData.name }}</text>
								撤回了一条消息
							</view>
							<view class="recalled-edit" v-if="item.type === 'text' && isSelf(item.senderId)" @click="recalledEdit(item)">重新编辑</view>
						</view>
					</view>
					<!-- #endif -->
					<!-- #ifdef MP -->
					<view class="z_index2" style="transform: rotate(-180deg)" :key="item.messageId" v-if="!item.isHide">
						<view class="icon_ text_26 color__ time">
							{{ renderMessageDate(item, index) }}
						</view>
						<view :key="item.messageIds" v-if="!item.recalled">
							<item :isMy="isSelf(item.senderId)" :myid="own.id" :item="item" @onClick="onItem" @onLongpress="onLongpress" @mention="mention"></item>
						</view>
						<view class="icon_ text_26 recalled" v-else>
							<view class="">
								<text v-if="isSelf(item.senderId)">你</text>
								<text v-else>{{ item.senderData.name }}</text>
								撤回了一条消息
							</view>
							<view class="recalled-edit" v-if="item.type === 'text' && isSelf(item.senderId)" @click="recalledEdit(item)">重新编辑</view>
						</view>
					</view>
					<!-- #endif -->
				</template>

				<view :style="{ height: $store.state.StatusBar.customBar + 44 + 'px' }"></view>
			</scroll-view>
			<bottom-operation
				ref="bottomOperationRef"
				:to="to"
				@sendMessage="sendMessage"
				@onBottom="onBottom"
				@backToBottom="bottomOperationScrollToBottom"
				@focus="focus"
			></bottom-operation>
		</view>

		<!-- 礼花 -->
		<!-- <m-screen-animation-lihua ref="mScreenAnimationLihua" zIndex="9999"></m-screen-animation-lihua> -->
		<!-- 红包雨 -->
		<!-- <m-screen-animation-hongbao ref="mScreenAnimationHongbao"></m-screen-animation-hongbao> -->
		<!-- 视频播放器 -->
		<video-player-ref v-model="videoPlayer.show" :url="videoPlayer.url" @onVideoFullScreenChange="onVideoFullScreenChange"></video-player-ref>
		<!-- 红包封面 -->
		<!-- <open-red-packet ref="openRedPacketRef"></open-red-packet> -->
		<!-- 复制；撤回等操作 -->
		<operate ref="operateRef" @quote="quote" @thank="thank" @transmit="transmit"></operate>
		<!-- 转发选择聊天 -->
		<m-group-selection ref="groupSelectionRef" @sendMessage="sendMessage"></m-group-selection>
	</view>
</template>
<script>
import navigation from './components/navigation/index.vue';
import bottomOperation from './components/bottom-operation/index.vue';
import item from './components/item/index';
import videoPlayerRef from './components/video-player/index';
import openRedPacket from './components/open-red-packet/index';
import operate from './components/operate/index';
import { mapState } from 'vuex';

import { getInfo } from '../../api/user';

let lastMessageTimeStamp = null;

let userInforMap = {};

let envelopeClickList = [];
let innerAudioContext = uni.createInnerAudioContext();
let audioItem = {};
// let group = {};

// let groupId = null;

// 浏览照片数组
let imageList = [];

// 是否是手动触发的列表滑动
let isBottomOperationScrollToBottom = false;

import { show, formatDate, throttle, openimg, getLocation, to as tofn } from '@/utils/index.js';

const IMAGE_MAX_WIDTH = 200;
const IMAGE_MAX_HEIGHT = 150;
let scroll_top = 0;
export default {
	components: {
		// groupSelection,
		navigation,
		bottomOperation,
		item,
		videoPlayerRef,
		openRedPacket,
		operate
	},
	name: 'simpleChat',
	data() {
		return {
			webSocketTask:null,
			isHistoryGet: false,
			bottomView: '30rpx',
			scroll_top,
			groupCount: '',
			pagueObj: {
				name: '哈哈哈',
				id:123,
			},
			own: {
				id: 1,
				name:'本人',
				avatar: 'http://127.0.0.1'
			},
			to: {},
			// 历史数据
			history: {
				messages: [],
				allLoaded: false
			},
			videoPlayer: {
				show: false,
				url: '',
				context: null
			},
			page: {
				pageSize:10,
				pageNum:1
			}
		};
	},
	onShow() {
		// 接收websocket消息及处理
		this.webSocketTask.onMessage((res) => {
			let data = JSON.parse(res.data);
			switch (data.type) {
				case 'text':
					this.onMessageReceived(data)
					this.scrollToBottom()
					break;
			}
	 
		});
	},
	async onLoad(e) {
		imageList = [];
		console.log(e)
		this.pagueObj = {
			id: Number(e.userId),
			name: e.username?e.username:''
		}
		uni.setNavigationBarTitle({
			title:e.username
		})
		envelopeClickList = uni.getStorageSync('envelopeClickList') || [];
		lastMessageTimeStamp = e.lastMessageTimeStamp || null;
		this.isHistoryGet = e.lastMessageTimeStamp;
		const res = await getInfo()
		let userInfo = res.data.user
		this.own = {
			id: userInfo.userId,
			name:userInfo.userName,
			avatar: userInfo.avatar
		};
		this.socket()
		this.loadHistoryMessage();
	},
	onReady() {
		this.videoPlayer.context = uni.createVideoContext('videoPlayer', this);
	},
	onUnload() {
		uni.closeSocket({
			success: () => {
				console.info("退出成功")
			},
		})
	},
	onNavigationBarButtonTap(e) {
		this.showMembers();
	},
	computed: mapState({
		page_font_size: (state) => state.page_font_size,
		//显示时间
		renderMessageDate() {
			return (message, index) => {
				if (message.timestamp - this.history.messages[index + 1]?.timestamp > 3 * 60 * 1000) {
					return formatDate(message.timestamp, 'timestamp');
				}
				return '';
			};
		},
		// 是否本人isMy
		isSelf() {
			return (senderId) => {
				return senderId === this.own.id;
			};
		},
		envelope_top_opened() {
			return (id) => {
				return this.envelopeXollectionList.includes(id);
			};
		}
	}),
	methods: {
		async getHistoryList(){
			let token = uni.getStorageSync("token")
			let timestamp = this.history.messages.length > 0?this.history.messages[this.history.messages.length - 1].timestamp:Date.now()
			let data = await uni.request({
				url:"http://192.168.16.225:8081/api/message/list",
				method: "POST",
				header:{
					"Authorization": "Bearer "+token,
					"UserId": this.own.id
				},
				data: {
					...this.page,
					userId: this.pagueObj.id,
					timestamp: timestamp
				}
			})
			if (data.data.code !== 0)return
			return data.data.data
		},
		// 初始化ws协议
		socket(){
		    //创建webSocket
		    this.webSocketTask = uni.connectSocket({
			    url: 'ws://192.168.16.225:32255/ws?userId='+this.own.id,
				header: {
					'content-type': 'application/json'
				},
				success(res) {
					console.log('成功', res);
				},
			})
			// 监听WebSocket连接打开事件
			this.webSocketTask.onOpen((res) => {
				console.log("监听WebSocket连接打开事件", res)
			});
		 
			// 监听WebSocket错误
			uni.onSocketError((res) => {
				console.info("监听WebSocket错误" + res)
			});
		},
		
		// 点击整个页面
		onPage() {
			this.$refs.bottomOperationRef.close();
			this.$refs.operateRef.close();
		},
		touchmove() {
			// this.$refs.bottomOperationRef.closeAll();
		},
		onBottom() {
			this.$refs.operateRef.close();
		},
		// 输入框获取焦点
		focus() {
			if (this.isHistoryGet) {
				this.isHistoryGet = false;
				lastMessageTimeStamp = null;
				this.history.messages = [];
				this.loadHistoryMessage();
			}
		},
		// 获取聊天记录
		async loadHistoryMessage() {
			uni.hideLoading();
			let list = await this.getHistoryList()
			// list = list.reverse();
			// 同步混入数据
			list.forEach((im, ix) => {
				// 缓存照片地址，
				if (im.type === 'image' || im.type === 'image_transmit') {
					imageList.unshift(im.payload.url);
				}
			});

			this.history.messages = [...this.history.messages,...list];
			console.log(this.history.messages)
		},
		// 设置不足一页时占位高度
		setOneHeight() {
			this.$nextTick(() => {
				let view = uni.createSelectorQuery().select(`.oneheight_${this.history.messages.length - 1}`);
				view.boundingClientRect((data) => {
					if (!data) return;
					if (!data.top) return;
					this.bottomView = `${data.top - this.$store.state.StatusBar.customBar}px`;
				}).exec();
			});
		},

		onMessageReceived(message) {
			// console.log('触发了')
			// if (message.senderId === this.pagueObj.id) {
				// push进列表
				this.pushList(message);
				//聊天时，收到消息标记为已读
				this.markGroupMessageAsRead();
			// }
		},
		// // 转发成功后
		sendMessage(message) {
			message = {
				...message,
				senderId: this.own.id,
				receiverId: this.pagueObj.id,
				senderData: {
					senderId: this.own.id,
					avatar: this.own.avatar,
					name: this.own.name
				}
			}
			// console.log(message)
			this.webSocketTask.send({
				data: JSON.stringify(message)
			})
		},
		// 将信息设置为已读
		markGroupMessageAsRead() {
			//
		},
		// 组装item
		initMessageItem(message, index) {
			message['isHide'] = 0;
			// 初始化语音
			if (message.type === 'audio') {
				message['pause'] = 4;
			}
			// 初始化红包
			if (message.type === 'red_envelope') {
				message['had_draw'] = 0;
				message['isClick'] = 0;
				this.setEnvelopeClickList(message, index);
			}
			if (index === 0 && (message.type === 'text' || message.type === 'text_quote')) {
				this.onSetText(message.payload.text);
			}
		},
		// 处理红包是否被点击
		setEnvelopeClickList(im, index) {
			if (envelopeClickList.includes(im.messageId)) {
				im['isClick'] = 1;
			} else {
				im['isClick'] = 0;
				if (index === 0) {
					this.$nextTick(() => {
						this.$refs.mScreenAnimationHongbao.show();
						uni.vibrateLong();
					});
				}
			}
		},
		// 发送信息后，将信息push到列表
		async pushList(message) {
			this.initMessageItem(message);
			this.history.messages.unshift(message);
			this.scrollToBottom();

			if (this.history.messages.length < 10) {
				this.setOneHeight();
			}

			// 是否触发文字动效果
			if (message.type === 'text' || message.type === 'text_quote') {
				this.onSetText(message.payload.text);
			}
			// 是否触发红包雨
			if (message.type === 'red_envelope') {
				this.onSetRedEnvelope();
			}

			// 缓存照片地址，
			if (message.type === 'image' || message.type === 'image_transmit') {
				imageList.push(message.payload.url);
			}
		},

		// 文本触发效果相关========
		onSetText(text) {
			// 触发礼花
			throttle(() => {
				if (text.includes('[彩带]')) {
					this.$refs.mScreenAnimationLihua.show();
					uni.vibrateLong();
				}
			}, 4000);
		},
		// 触发红包雨
		onSetRedEnvelope() {
			throttle(() => {
				this.$refs.mScreenAnimationHongbao.show();
				uni.vibrateLong();
			}, 4000);
		},
		bottomOperationScrollToBottom() {
			isBottomOperationScrollToBottom = true;
			setTimeout(() => {
				isBottomOperationScrollToBottom = false;
			}, 800);
			this.$nextTick(() => {
				this.scrollToBottom();
			});
		},
		// 页面滚动到底部
		scrollToBottom(e) {
			this.scroll_top = scroll_top;
			this.$nextTick(() => {
				this.scroll_top = 0;
			});
		},
		// 点击某条信息
		onItem(item, index) {
			console.log(item);
			switch (item.type) {
				case 'video':
					this.playVideo(item);
					break;
				case 'audio':
					this.playAudio(item);
					break;
				case 'audio_quote':
					this.playAudio(item);
					break;
				case 'image':
				case 'image_transmit':
					const index = imageList.indexOf(item.payload.url);
					if (index === -1) return openimg(imageList.length - 1, imageList);
					openimg(index, imageList);
					break;
				case 'red_envelope':
					// 点击红包
					const fun = (code) => {
						this.renewItem(code, item);
					};
					uni.$off('open_red_packet');
					uni.$on('open_red_packet', fun);
					// item['id'] = group.id;
					this.$refs.openRedPacketRef.open(item);
					break;
				case 'map':
					getLocation({
						name: item.payload.title,
						address: item.payload.address,
						latitude: item.payload.latitude,
						longitude: item.payload.longitude
					});
					break;
				case 'article':
					tofn(`/pagesOne/HTML/index?id=${item.payload.id}`);
					break;
				case 'share_SBCF':
					tofn('/pagesSBCF/commodity_list/index', { id: item.payload.seller_id });
					break;
				case 'share_mall':
					tofn(`/pagesShopping/details/index`, { goods_id: item.payload.goods_id });
					break;
				case 'functional_module':
					tofn(item.payload.url);
					break;
				default:
					break;
			}
		},
		// 点击红包后更新那一条
		renewItem(code, item) {
			if (code === '0') {
				// 领取
				item.had_draw = 1;
			} else {
				item.isClick = 1;
			}
			// 不这样写某些情况下更新不了视图，
			for (let i = 0; i < this.history.messages.length; i++) {
				if (this.history.messages[i].messageId == item.messageId) {
					this.$set(this.history.messages, i, { ...item });
					break;
				}
			}
		},
		// 长按相关=======================
		// 长按某一条
		onLongpress(item, e) {
			this.$refs.operateRef.open(item, e);
		},
		// 引用
		quote(item) {
			this.$refs.bottomOperationRef.quote(item);
		},
		// 谢谢红包
		thank(item) {
			this.$refs.bottomOperationRef.thank(item);
		},
		// 转发
		transmit(item) {
			this.$refs.groupSelectionRef.open(item);
		},
		// 重新编辑
		recalledEdit(item) {
			this.$refs.bottomOperationRef.recalledEdit(item);
		},
		// @某人
		mention(item) {
			this.$refs.bottomOperationRef.mention(item);
		},
		// 视频相关========================
		// 点击了视频并播放
		playVideo(item) {
			this.videoPlayer.url = item.payload.video.url;
			this.videoPlayer.show = true;
			this.$nextTick(() => {
				this.videoPlayer.context.requestFullScreen({
					direction: 0
				});
				this.videoPlayer.context.play();
				this.videoPlayer.context.showStatusBar();
			});
		},
		// 退出全屏
		onVideoFullScreenChange(e) {
			//当退出全屏播放时，隐藏播放器
			if (this.videoPlayer.show && !e.detail.fullScreen) {
				this.videoPlayer.show = false;
				this.videoPlayer.context.stop();
			}
		},
		// =============================================
		// 播放语音相关===========
		playAudio(item) {
			throttle(() => {
				// pause:1暂停;2播放完,3播放中,4初始状态
				if (item.messageId === audioItem?.messageId) {
					if (audioItem['pause'] == 3) {
						//正在播放
						// 暂停
						innerAudioContext.pause();
						innerAudioContext.offEnded();
						item['pause'] = 1;
						audioItem['pause'] = 1;
					} else if (audioItem['pause'] == 1 || audioItem['pause'] == 2) {
						//暂停或者播放中
						// 播放
						innerAudioContext.play();
					}
					return;
				}

				audioItem['pause'] = '4';
				audioItem = item;
				if (innerAudioContext) {
					try {
						innerAudioContext.pause();
						innerAudioContext.destroy();
						innerAudioContext = null;
					} catch (e) {}
				}
				innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.src = item.payload.url;
				innerAudioContext.play();
				innerAudioContext.offEnded();
				innerAudioContext.offPlay();
				innerAudioContext.onPlay(() => {
					// console.log('开始播放');
					item['pause'] = 3;
					audioItem['pause'] = 3;
				});
				innerAudioContext.onEnded(() => {
					// console.log('播放结束');
					item['pause'] = 2;
					audioItem['pause'] = 2;
				});
				innerAudioContext.onError((res) => {
					console.log('播放异常');
				});
			}, 500);
		},
		// ====================

		// 滚动中
		scroll(e) {
			scroll_top = e.detail.scrollTop;
			this.$refs.operateRef.close();
			if (isBottomOperationScrollToBottom) return;
			this.$refs.bottomOperationRef.closeAll();
		},
		// 滚动到底部
		scrolltolower() {
			console.log(this.history.allLoaded)
			if (this.history.allLoaded) return;
			this.loadHistoryMessage();
		},
		// 滚动到顶部
		scrolltoupper() {}
	}
};
</script>
<style lang="scss" scoped>
.page {
	position: fixed;
	z-index: 1;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background-color: #ededed;
}
.scroll-Y {
	width: 100%;
	height: 0;
	transition: all 0.2s;
	transform: rotate(180deg);
	background-color: #ededed;
	::-webkit-scrollbar {
		display: none;
	}
}

.time {
	width: 100%;
	color: #a3a3a3;
	line-height: 100rpx;
}

.recalled {
	width: 100%;
	height: 50rpx;
	margin: 20rpx 0;
	color: #a3a3a3;
	.recalled-edit {
		color: #5a6693;
		margin-left: 14rpx;
	}
}
</style>
