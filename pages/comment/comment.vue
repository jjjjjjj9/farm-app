<template>
	<view>
		<u--form labelPosition="left" :model="commentInfo" :rules="rules" labelWidth="80" ref="form"
			style="padding: 20rpx;">
			<u-form-item label="订单编号:" prop="orderId" borderBottom>
				<u--input v-model="commentInfo.orderId" border="none" disabledColor="#f0f0f0"></u--input>
			</u-form-item>
			<u-form-item label="商店编号:" prop="storeId" borderBottom>
				<u--input v-model="commentInfo.storeId" border="none" disabled disabledColor="#f0f0f0"></u--input>
			</u-form-item>
			<u-form-item label="产品编号:" prop="productId" borderBottom>
				<u--input v-model="commentInfo.productId" border="none" disabled disabledColor="#f0f0f0"></u--input>
			</u-form-item>
			<u-form-item label="好感度" prop="assessLevel" borderBottom>
				<u-rate count="5" v-model="commentInfo.assessLevel"></u-rate>
			</u-form-item>
			<u-form-item label="评论:" prop="content" borderBottom>
				<u--textarea v-model="commentInfo.content" placeholder="请输入评论内容" count></u--textarea>
			</u-form-item>
		</u--form>
		<u-button type="primary" @click="submit">提交</u-button>
	</view>
</template>

<script>
	import {
		apiAddComment
	} from '@/api/comment.js'
	export default {
		data() {
			return {
				commentInfo: {
					assessLevel: 0,
				},
				rules: {
					content: [{
						required: true,
						message: "请填写评论内容",
						trigger: ['blur', 'change']
					}]
				}
			}
		},
		onLoad(options) {
			console.log((options))
			const encodedData = options.data;
			const orderData = JSON.parse(decodeURIComponent(encodedData));

		},
		methods: {
			submit() {
				let params = JSON.parse(JSON.stringify(this.commentInfo))
				apiAddComment(params).then(res => {
					uni.$u.toast("评论成功，即将返回首页")
					setTimeout(() => {
						this.$tab.switchTab("/pages/index")
					}, 1000)
				})
			}
		}
	}
</script>

<style>

</style>