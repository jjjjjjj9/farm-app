<template>
	<view>
		<view class="notice-item" v-for="item in history.messages">
			<text class="time">{{new Date(item.timestamp).toUTCString()}}</text>
			<view class="content">
				<text class="title">用户：{{item.senderData.name}}</text>
				<text class="introduce">
					消息：{{item.payload.text}}
				</text>
				<view class="bot b-t">
					<text @click="toChat(item)">查看详情</text>
					<text class="more-icon yticon icon-you"></text>
				</view>
			</view>
		</view>
		<!-- <view class="notice-item">
			<text class="time">昨天 12:30</text>
			<view class="content">
				<text class="title">新品上市，全场满199减50</text>
				<view class="img-wrapper">
					<image class="pic" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3761064275,227090144&fm=26&gp=0.jpg"></image>
					<view class="cover">
						活动结束
					</view>
				</view>
				<view class="bot b-t">
					<text>查看详情</text>
					<text class="more-icon yticon icon-you"></text>
				</view>
			</view>
		</view> -->
		<!-- <view class="notice-item">
			<text class="time">2019-07-26 12:30</text>
			<view class="content">
				<text class="title">新品上市，全场满199减50</text>
				<view class="img-wrapper">
					<image class="pic" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556465765776&di=57bb5ff70dc4f67dcdb856e5d123c9e7&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01fd015aa4d95fa801206d96069229.jpg%401280w_1l_2o_100sh.jpg"></image>
					<view class="cover">
						活动结束
					</view>
				</view>
				<text class="introduce">新品上市全场2折起，新品上市全场2折起，新品上市全场2折起，新品上市全场2折起，新品上市全场2折起</text>
				<view class="bot b-t">
					<text>查看详情</text>
					<text class="more-icon yticon icon-you"></text>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	import { getInfo } from '../../api/user'
	export default {
		data() {
			return {
				history: {
					messages: [],
					allLoaded: false
				},
				own:{}
			}
		},
		async onLoad() {
			const res = await getInfo()
			console.log(res)
			let userInfo = res.data.user
			this.own = {
				id: userInfo.userId,
				name:userInfo.userName,
				avatar: userInfo.avatar
			};
			this.loadHistoryMessage()
		},
		methods: {
			toChat(item){
				uni.navigateTo({
					url: `/pages/chat_page/index?userId=${item.senderData.senderId}&username=${item.senderData.name}`
				})
			},
			// 获取聊天记录
			async loadHistoryMessage() {
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
						pageSize:10,
						pageNum:1,
						timestamp: timestamp
					}
				})
				if (data.data.code !== 0)return
				return data.data.data
			},
		}
	}
</script>

<style lang='scss'>
	page {
		background-color: #f7f7f7;
		padding-bottom: 30upx;
	}

	.notice-item {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.time {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 80upx;
		padding-top: 10upx;
		font-size: 26upx;
		color: #7d7d7d;
	}

	.content {
		width: 710upx;
		padding: 0 24upx;
		background-color: #fff;
		border-radius: 4upx;
	}

	.title {
		display: flex;
		align-items: center;
		height: 90upx;
		font-size: 32upx;
		color: #303133;
	}

	.img-wrapper {
		width: 100%;
		height: 260upx;
		position: relative;
	}

	.pic {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 6upx;
	}

	.cover {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .5);
		font-size: 36upx;
		color: #fff;
	}

	.introduce {
		display: inline-block;
		padding: 16upx 0;
		font-size: 28upx;
		color: #606266;
		line-height: 38upx;
	}

	.bot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 80upx;
		font-size: 24upx;
		color: #707070;
		position: relative;
	}

	.more-icon {
		font-size: 32upx;
	}
</style>
