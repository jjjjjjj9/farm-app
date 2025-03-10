<template>
	<view class="content">
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item"
				:class="{current: tabCurrentIndex === index}" @click="tabClick(index)">
				{{item.text}}
			</view>
		</view>

		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
				<scroll-view class="list-scroll-content" scroll-y @scrolltolower="loadData">
					<!-- 空白页 -->
					<empty v-if="tabItem.loaded === true && orderList.length === 0"></empty>

					<!-- 订单列表 -->
					<view v-for="(item, index) in orderList" :key="index" class="order-item">
						<!-- 订单头部 -->
						<view class="i-top b-b">
							<text class="time">{{ item.createTime }}</text>
							<text class="state" :style="{ color: item.stateTipColor }">{{ item.stateTip }}</text>
							<text v-if="item.state === 9" class="del-btn yticon icon-iconfontshanchu1"
								@click="confirmDeleteOrder(index)">
								删除
							</text>
						</view>

						<!-- 营业时间提示 -->
						<view class="business-time">
							<text class="tip">请在农场营业时间内进行消费：</text>
							<text class="time">{{ item.businessTime }}</text>
						</view>

						<view class="goods-box-single">
							<image class="goods-img" :src="item.projectImages" mode="aspectFill"></image>
							<view class="right">
								<text class="title clamp">{{ item.projectName }}</text>
								<!-- <text class="attr-box">{{ item.attr }} x {{ item.number }}</text> -->
								<text class="price">{{ item.projectPrice }}</text>
							</view>
						</view>

						<!-- 订单金额 -->
						<view class="price-box">
							实付款
							<text class="price">{{ item.price }}</text>
						</view>

						<!-- 操作按钮 -->
						<view class="action-box b-t" v-if="item.orderStatus != 'C'">
							<button class="action-btn" @click="cancelOrder(item) ">取消订单</button>
							<button class="action-btn recom" @click="payOrder(item)"
								v-if="item.orderStatus=='A'">立即支付</button>
							<button class="action-btn recom" @click="confirmOrder(item)"
								v-if="item.orderStatus=='D'">确认完成</button>
							<button class="action-btn recom" @click="toComment(item)"
								v-if="item.orderStatus=='E'">去评价</button>
							<button class="action-btn recom" @click="toRefund(item)"
								v-if="item.orderStatus=='E'">退款</button>
						</view>
					</view>
					<uni-load-more :status=" tabItem.loadingType"></uni-load-more>

				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import empty from "@/components/empty";
	import {
		getOrderList,
		pay,
		cancel,
		confirm
	} from "@/api/order";
	import Json from '@/Json';
	export default {
		components: {
			uniLoadMore,
			empty
		},
		data() {
			return {
				orderList: [],
				tabCurrentIndex: 0,
				orderType: '',
				navList: [{
						state: 0,
						text: '全部',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 1,
						text: '待付款',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 2,
						text: '待确认',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 3,
						text: '待完成',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 4,
						text: '待评价',
						loadingType: 'more',
						orderList: []
					},
				],
			};
		},

		onLoad(options) {
			/**
			 * 修复app端点击除全部订单外的按钮进入时不加载数据的问题
			 * 替换onLoad下代码即可
			 */
			this.tabCurrentIndex = +options.state;
			if (this.tabCurrentIndex == 1) {
				this.orderType = 'A'
			} else if (this.tabCurrentIndex == 2) {
				this.orderType = 'B'
			} else if (this.tabCurrentIndex == 3) {
				this.orderType = 'D'
			} else if (this.tabCurrentIndesx == 4) {
				this.orderType = 'E'
			} else if (this.tabCurrentIndex == 0) {
				this.orderType = null
			}
			this.loadData()
		},

		methods: {
			//获取订单列表
			async loadData() {
				//这里是将订单挂载到tab列表下
				let index = this.tabCurrentIndex;
				let navItem = this.navList[index];
				let state = navItem.state;

				if (navItem.loadingType === 'loading') {
					//防止重复加载
					return;
				}

				navItem.loadingType = 'loading';
				console.log("ordertype", this.orderType)
				const res = await getOrderList(this.orderType)

				this.orderList = res.data.data
				for (let item of this.orderList) {
					if (item.projectImages != null) {
						let imageList = item.projectImages.split(",")
						item.projectImages = '/static/uploadImg/' + imageList[0]
					}
				}
				this.$set(navItem, 'loaded', true);

				//判断是否还有数据， 有改为 more， 没有改为noMore 
				navItem.loadingType = 'more';

			},

			//swiper 切换
			changeTab(e) {
				this.tabCurrentIndex = e.target.current;
				if (this.tabCurrentIndex == 1) {
					this.orderType = 'A'
				} else if (this.tabCurrentIndex == 2) {
					this.orderType = 'B'
				} else if (this.tabCurrentIndex == 3) {
					this.orderType = 'D'
				} else if (this.tabCurrentIndex == 4) {
					this.orderType = 'E'
				} else if (this.tabCurrentIndex == 0) {
					this.orderType = null
				}
				this.loadData();
			},
			//顶部tab点击
			tabClick(index) {
				this.tabCurrentIndex = index;
				if (this.tabCurrentIndex == 1) {
					this.orderType = 'A'
				} else if (this.tabCurrentIndex == 2) {
					this.orderType = 'B'
				} else if (this.tabCurrentIndex == 3) {
					this.orderType = 'D'
				} else if (this.tabCurrentIndex == 4) {
					this.orderType = 'E'
				} else if (this.tabCurrentIndex == 0) {
					this.orderType = null
				}
				this.loadData();
			},
			//删除订单
			deleteOrder(index) {
				uni.showLoading({
					title: '请稍后'
				})
				setTimeout(() => {
					this.navList[this.tabCurrentIndex].orderList.splice(index, 1);
					uni.hideLoading();
				}, 600)
			},
			payOrder(item) {
				console.log(item); // 打印订单数据，便于调试
				const orderData = JSON.stringify({
					order: item
				});
				const encodedData = encodeURIComponent(orderData);
				uni.navigateTo({
					url: `/pages/money/pay?data=${encodedData}`
				});
			},
			async confirmOrder(item) {
				console.log(item); // 打印订单数据，便于调试
				const res = await confirm(item.id)
				if (res.data.code == '200') {
					this.$api.msg(`确认成功`);
				}
				this.loadData()
			},
			async toComment(item) {
				const orderData = JSON.stringify({
					order: item
				});
				const encodedData = encodeURIComponent(orderData);
				uni.navigateTo({
					url: `/pages/comment/comment?data=${encodedData}`
				});
			},
			async toRefund(item) {
				console.log(item); // 打印订单数据，便于调试
				const res = await refund(item.id)
				if (res.data.code == '200') {
					this.$api.msg(`确认成功`);
				}
				this.loadData()
			},
			//取消订单
			async cancelOrder(item) {
				// uni.showLoading({
				// 	title: '请稍后'
				// })
				const res = await cancel(item.id)
				this.loadData()
			},

			//订单状态文字和颜色
			orderStateExp(state) {
				let stateTip = '',
					stateTipColor = '#fa436a';
				switch (+state) {
					case 1:
						stateTip = '待付款';
						break;
					case 2:
						stateTip = '待发货';
						break;
					case 9:
						stateTip = '订单已关闭';
						stateTipColor = '#909399';
						break;

						//更多自定义
				}
				return {
					stateTip,
					stateTipColor
				};
			}
		},
	}
</script>

<style lang="scss">
	page,
	.content {
		background: $page-color-base;
		height: 100%;
	}

	.swiper-box {
		height: calc(100% - 40px);
	}

	.list-scroll-content {
		height: 100%;
	}

	.navbar {
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0, 0, 0, .06);
		position: relative;
		z-index: 10;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 15px;
			color: $font-color-dark;
			position: relative;

			&.current {
				color: $base-color;

				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44px;
					height: 0;
					border-bottom: 2px solid $base-color;
				}
			}
		}
	}

	.uni-swiper-item {
		height: auto;
	}

	.order-item {
		display: flex;
		flex-direction: column;
		padding-left: 30upx;
		background: #fff;
		margin-top: 16upx;

		.i-top {
			display: flex;
			align-items: center;
			height: 80upx;
			padding-right: 30upx;
			font-size: $font-base;
			color: $font-color-dark;
			position: relative;

			.time {
				flex: 1;
			}

			.state {
				color: $base-color;
			}

			.del-btn {
				padding: 10upx 0 10upx 36upx;
				font-size: $font-lg;
				color: $font-color-light;
				position: relative;

				&:after {
					content: '';
					width: 0;
					height: 30upx;
					border-left: 1px solid $border-color-dark;
					position: absolute;
					left: 20upx;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}

		/* 多条商品 */
		.goods-box {
			height: 160upx;
			padding: 20upx 0;
			white-space: nowrap;

			.goods-item {
				width: 120upx;
				height: 120upx;
				display: inline-block;
				margin-right: 24upx;
			}

			.goods-img {
				display: block;
				width: 100%;
				height: 100%;
			}
		}

		/* 单条商品 */
		.goods-box-single {
			display: flex;
			padding: 20upx 0;

			.goods-img {
				display: block;
				width: 120upx;
				height: 120upx;
			}

			.right {
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 0 30upx 0 24upx;
				overflow: hidden;

				.title {
					font-size: $font-base + 2upx;
					color: $font-color-dark;
					line-height: 1;
				}

				.attr-box {
					font-size: $font-sm + 2upx;
					color: $font-color-light;
					padding: 10upx 12upx;
				}

				.price {
					font-size: $font-base + 2upx;
					color: $font-color-dark;

					&:before {
						content: '￥';
						font-size: $font-sm;
						margin: 0 2upx 0 8upx;
					}
				}
			}
		}

		.price-box {
			display: flex;
			justify-content: flex-end;
			align-items: baseline;
			padding: 20upx 30upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;

			.num {
				margin: 0 8upx;
				color: $font-color-dark;
			}

			.price {
				font-size: $font-lg;
				color: $font-color-dark;

				&:before {
					content: '￥';
					font-size: $font-sm;
					margin: 0 2upx 0 8upx;
				}
			}
		}

		.action-box {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			height: 100upx;
			position: relative;
			padding-right: 30upx;
		}

		.action-btn {
			width: 160upx;
			height: 60upx;
			margin: 0;
			margin-left: 24upx;
			padding: 0;
			text-align: center;
			line-height: 60upx;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
			background: #fff;
			border-radius: 100px;

			&:after {
				border-radius: 100px;
			}

			&.recom {
				background: #fff9f9;
				color: $base-color;

				&:after {
					border-color: #f7bcc8;
				}
			}
		}
	}


	/* load-more */
	.uni-load-more {
		display: flex;
		flex-direction: row;
		height: 80upx;
		align-items: center;
		justify-content: center
	}

	.uni-load-more__text {
		font-size: 28upx;
		color: #999
	}

	.uni-load-more__img {
		height: 24px;
		width: 24px;
		margin-right: 10px
	}

	.uni-load-more__img>view {
		position: absolute
	}

	.uni-load-more__img>view view {
		width: 6px;
		height: 2px;
		border-top-left-radius: 1px;
		border-bottom-left-radius: 1px;
		background: #999;
		position: absolute;
		opacity: .2;
		transform-origin: 50%;
		animation: load 1.56s ease infinite
	}

	.uni-load-more__img>view view:nth-child(1) {
		transform: rotate(90deg);
		top: 2px;
		left: 9px
	}

	.uni-load-more__img>view view:nth-child(2) {
		transform: rotate(180deg);
		top: 11px;
		right: 0
	}

	.uni-load-more__img>view view:nth-child(3) {
		transform: rotate(270deg);
		bottom: 2px;
		left: 9px
	}

	.uni-load-more__img>view view:nth-child(4) {
		top: 11px;
		left: 0
	}

	.load1,
	.load2,
	.load3 {
		height: 24px;
		width: 24px
	}

	.load2 {
		transform: rotate(30deg)
	}

	.load3 {
		transform: rotate(60deg)
	}

	.load1 view:nth-child(1) {
		animation-delay: 0s
	}

	.load2 view:nth-child(1) {
		animation-delay: .13s
	}

	.load3 view:nth-child(1) {
		animation-delay: .26s
	}

	.load1 view:nth-child(2) {
		animation-delay: .39s
	}

	.load2 view:nth-child(2) {
		animation-delay: .52s
	}

	.load3 view:nth-child(2) {
		animation-delay: .65s
	}

	.load1 view:nth-child(3) {
		animation-delay: .78s
	}

	.load2 view:nth-child(3) {
		animation-delay: .91s
	}

	.load3 view:nth-child(3) {
		animation-delay: 1.04s
	}

	.load1 view:nth-child(4) {
		animation-delay: 1.17s
	}

	.load2 view:nth-child(4) {
		animation-delay: 1.3s
	}

	.load3 view:nth-child(4) {
		animation-delay: 1.43s
	}

	@-webkit-keyframes load {
		0% {
			opacity: 1
		}

		100% {
			opacity: .2
		}
	}

	.order-item {
		background: #fff;
		margin-bottom: 10px;
		border-radius: 8px;
		overflow: hidden;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

		.business-time {
			padding: 10px;
			font-size: 12px;
			color: #666;
			// background: #f9f9f9;

			.tip {
				font-weight: bold;
			}

			.time {
				margin-left: 5px;
			}
		}

		.i-top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10px;
			border-bottom: 1px solid #f2f2f2;

			.time {
				font-size: 14px;
				color: #666;
			}

			.state {
				font-size: 14px;
				font-weight: bold;
			}

			.del-btn {
				font-size: 16px;
				color: #ff4d4f;
				cursor: pointer;
			}
		}

		.goods-box {
			padding: 10px;
			background: #f9f9f9;

			.goods-scroll {
				white-space: nowrap;
			}

			.goods-item {
				display: inline-block;
				margin-right: 10px;

				.goods-img {
					width: 60px;
					height: 60px;
					border-radius: 4px;
				}
			}
		}

		.goods-box-single {
			display: flex;
			padding: 10px;

			.goods-img {
				width: 60px;
				height: 60px;
				border-radius: 4px;
				margin-right: 10px;
			}

			.right {
				flex: 1;

				.title {
					font-size: 14px;
					color: #333;
				}

				.attr-box {
					font-size: 12px;
					color: #999;
				}

				.price {
					font-size: 14px;
					color: #ff4d4f;
					font-weight: bold;
				}
			}
		}

		.price-box {
			padding: 10px;
			text-align: right;
			font-size: 14px;
			color: #333;

			.num {
				color: #ff4d4f;
				font-weight: bold;
			}

			.price {
				color: #ff4d4f;
				font-size: 16px;
				font-weight: bold;
			}
		}

		.action-box {
			display: flex;
			justify-content: flex-end;
			padding: 10px;

			.action-btn {
				margin-left: 10px;
				border: none;
				border-radius: 4px;
				font-size: 14px;
				color: #fff;
				background: #ff4d4f;

				&.recom {
					background: #1aad19;
				}
			}
		}
	}
</style>