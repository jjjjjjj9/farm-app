<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
		<view class="right-top-sign"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="left-top-sign">LOGIN</view>
			<view class="welcome">
				欢迎回来！
			</view>
			<view class="input-content">
				<view class="input-item">
					<text class="tit">手机号码</text>
					<input v-model="mobile" placeholder="请输入手机号码" maxlength="11" />
				</view>
				<view class="input-item">
					<text class="tit">密码</text>
					<input type="password" v-model="password" placeholder="8-18位不含特殊字符的数字、字母组合" maxlength="20"
						@confirm="toLogin" />
				</view>
			</view>
			<button class="confirm-btn" @click="toLogin" :disabled="logining">登录</button>
			<view class="forget-section">
				忘记密码?
			</view>
		</view>
		<view class="register-section">
			还没有账号?
			<text @click="toRegist">马上注册</text>
		</view>
		<view class="weixin-login">
			<view class="weixin-content">
				<image src="../../static/wechat.svg" style="width:20px;height: 20px;"></image>
				<view class="grid-text" @click="loginByWeChatId">微信</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex';
	import {
		login,loginByWeChat
	} from '@/api/user'

	export default {
		data() {
			return {
				mobile: '',
				password: '',
				logining: false,
				wechatId: ''
			}
		},
		onLoad() {

		},
		methods: {
			getWeChatId(){
			  return new Promise((resolve,reject)=>{
				  let $that = this
				  uni.getProvider({
					service:'oauth',
					success: (res) => {
						if(res.provider.indexOf(('weixin'))){
							uni.login({
								provider:"weixin",
								success: (loginRes) => {
									uni.getUserInfo({
										provider:"weixin",
										success: (infoRes) => {
											console.log(infoRes)
											$that.wechatId = infoRes.userInfo.openId
											resolve()
										}
									})
								}
							})
						}
					}
				}) 
			})
		  },
			loginByWeChatId(){
			  this.getWeChatId().then(()=>{
				  console.log(this.wechatId)
				  loginByWeChat({wechatId: this.wechatId}).then((res)=>{
					  uni.setStorageSync("token", res.data.token)
					  console.log('res.token', res.data.token)
					  uni.navigateBack();
				  }).catch((res) => {
					  console.log('登陆失败',res)
					if (this.captchaEnabled) {
					  this.getCode()
					}
				  })
			  })
			  
		  },
			// ...mapMutations(['login']),
			inputChange(e) {
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			navBack() {
				uni.navigateBack();
			},
			toRegist() {
				uni.navigateTo({
					url: '/pages/public/register'
				})
			},
			async toLogin() {
				this.logining = true;
				const {
					mobile,
					password
				} = this;
				//数据验证模块
				// if (!this.$api.match({
				// 		mobile,
				// 		password
				// 	})) {
				// 	this.logining = false;
				// 	return;
				// }

				const sendData = {
					mobile,
					password
				};
				const result = await this.$api.json('userInfo');
				if (result.status === 1) {
					console.log(result.data)
					const res = login(mobile, password, 1).then(res => {
						uni.setStorageSync("token", res.data.token)
						console.log('res.token', res.data.token)
						uni.navigateBack();
					});
				} else {
					this.$api.msg(result.msg);
					this.logining = false;
				}
			}
		},

	}
</script>

<style lang='scss'>
	page {
		background: #fff;
	}
	.weixin-login{
		display: flex;
		flex-direction: row;
		width:100%;
		align-items: center;
		justify-content: center;
		gap: 10rpx;
		
	}
	.weixin-content{
		display: flex;
		flex-direction: row;
		width:40%;
		align-items: center;
		justify-content: center;
		border: 1px solid rgb(244, 230, 210);
		/* background-color: rgb(0, 122, 255); */
		padding: 10rpx;
		border-radius: 10rpx;
		gap: 10rpx;
	}

	.container {
		padding-top: 115px;
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #fff;
	}

	.wrapper {
		position: relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;
	}

	.back-btn {
		position: absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}

	.left-top-sign {
		font-size: 120upx;
		color: $page-color-base;
		position: relative;
		left: -16upx;
	}

	.right-top-sign {
		position: absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;

		&:before,
		&:after {
			display: block;
			content: "";
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}

		&:before {
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}

		&:after {
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}

	.left-bottom-sign {
		position: absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
	}

	.welcome {
		position: relative;
		left: 50upx;
		top: -90upx;
		font-size: 46upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0, 0, 0, .3);
	}

	.input-content {
		padding: 0 60upx;
	}

	.input-item {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		padding: 0 30upx;
		background: $page-color-light;
		height: 120upx;
		border-radius: 4px;
		margin-bottom: 50upx;

		&:last-child {
			margin-bottom: 0;
		}

		.tit {
			height: 50upx;
			line-height: 56upx;
			font-size: $font-sm+2upx;
			color: $font-color-base;
		}

		input {
			height: 60upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
		}
	}

	.confirm-btn {
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 70upx;
		background: $uni-color-primary;
		color: #fff;
		font-size: $font-lg;

		&:after {
			border-radius: 100px;
		}
	}

	.forget-section {
		font-size: $font-sm+2upx;
		color: $font-color-spec;
		text-align: center;
		margin-top: 40upx;
	}

	.register-section {
		position: absolute;
		left: 0;
		bottom: 50upx;
		width: 100%;
		font-size: $font-sm+2upx;
		color: $font-color-base;
		text-align: center;

		text {
			color: $font-color-spec;
			margin-left: 10upx;
		}
	}
</style>