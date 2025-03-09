<template>
	<view class="flex_r flex_c text-box">
		<view>
			<view class="text_30 size_white text" :class="[{ text_: item.had_draw || item.isClick }, { text_r: isMy }, { text_l: !isMy }]" @tap.stop="onClick">
				<!-- <view class="red_packet_bg_mini">
					<image class="img" :src="item.payload.red_packet_bg_mini" mode="aspectFill"></image>
				</view> -->
				<view class="flex_r z_index2 redPacket-row">
					<view class="redPacket-icon">
						<!-- 开启 -->
						<image
							class="img"
							src="data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTkxNS4wNzkgNTcwLjIwN3YtNDQ4LjdjMC0xMC4yMTQtNS41NTItMTkuNzUzLTE0LjU1Mi0yNC41NUE4MjUuMzk3IDgyNS4zOTcgMCAwIDAgNTExLjQzNC4wMDFhODI1LjI5IDgyNS4yOSAwIDAgMC0zODkuMDY2IDk2Ljk1NiAyNy43ODMgMjcuNzgzIDAgMCAwLTE0LjU3OCAyNC41NXY0NDguN2MwIDE0Ljg3NCAxMi4wNDUgMjYuOTIgMjYuOTIgMjYuOTJoNzUzLjQ0OGEyNi45MiAyNi45MiAwIDAgMCAyNi45Mi0yNi45MiIgZmlsbD0iI2ZmZjNlNyIgZGF0YS1zcG0tYW5jaG9yLWlkPSJhMzEzeC5zZWFyY2hfaW5kZXguMC5pNS41ZmM4M2E4MVJVTGFkOSIvPjxwYXRoIGQ9Ik0xMDcuNzkgMzQ3LjYyMXY2NDguMDNjMCAxNC44NzUgMTIuMDQ1IDI2Ljk0OCAyNi45MiAyNi45NDhoNzUzLjQ0OGEyNi45MiAyNi45MiAwIDAgMCAyNi45Mi0yNi45NDh2LTY0OC4wM2E4MjUuMzE3IDgyNS4zMTcgMCAwIDEtNDAzLjY0NCAxMDQuOTA2QTgyNS4zMTcgODI1LjMxNyAwIDAgMSAxMDcuNzkgMzQ3LjYyMSIgZmlsbD0iI2VmN2I2NCIgZGF0YS1zcG0tYW5jaG9yLWlkPSJhMzEzeC5zZWFyY2hfaW5kZXguMC5pNi41ZmM4M2E4MVJVTGFkOSIvPjxwYXRoIGQ9Ik0zNzUuNjQ2IDYxMC41NzRhMTM0LjUyMSAxMzQuNTIxIDAgMSAwIDI2OS4xMjQgMCAxMzQuNTQ4IDEzNC41NDggMCAwIDAtMjY5LjA5NyAwIiBmaWxsPSIjZjJkMzljIiBkYXRhLXNwbS1hbmNob3ItaWQ9ImEzMTN4LnNlYXJjaF9pbmRleC4wLmk5LjVmYzgzYTgxUlVMYWQ5Ii8+PHBhdGggZD0iTTU2Ni4yOTkgNjEzLjg4OHYtMjEuODgxaC0zNC44NDNsMzEuMjMyLTMxLjU4Mi0yMC41MzQtMTguODEtMzIuMDEzIDI5LjIxMS0zMi4wNjgtMjkuMjEtMjAuNTA3IDE4Ljc1NSAzMS4yNiAzMS42MDloLTM0LjY4MnYyMS44MjdoNDAuMDQ0djE0LjU3OWgtNDAuMDQ0djI5LjE4NGg0MC4wNDR2MjEuOTM1aDIzLjk4M3YtMjkuMTg0aDQ4LjA3NFY2MjguNDRoLTQ4LjA0N3YtMTQuNTUyeiIgZmlsbD0iI2ViYjM3NyIgZGF0YS1zcG0tYW5jaG9yLWlkPSJhMzEzeC5zZWFyY2hfaW5kZXguMC5pMTEuNWZjODNhODFSVUxhZDkiIGNsYXNzPSJzZWxlY3RlZCIvPjwvc3ZnPg=="
							mode="aspectFill"
							v-if="item.had_draw || item.isClick"
						></image>

						<!-- 未开启 -->
						<image
							class="img"
							src="data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTg3OC41OTIgMTAyNEgxNDUuNDA4Yy0yNC4wNjQgMC00My41Mi0xOS40NTYtNDMuNTItNDMuNTJWNDMuNTJjMC0yNC4wNjQgMTkuNDU2LTQzLjUyIDQzLjUyLTQzLjUyaDczMy4xODRjMjQuMDY0IDAgNDMuNTIgMTkuNDU2IDQzLjUyIDQzLjUydjkzNi40NDhjMCAyNC41NzYtMTkuNDU2IDQ0LjAzMi00My41MiA0NC4wMzJ6IiBmaWxsPSIjREY0OTQ5Ii8+PHBhdGggZD0iTTg3OC41OTIgMEgxNDUuNDA4Yy0yNC4wNjQgMC00NC4wMzIgMTkuNDU2LTQ0LjAzMiA0My41MnYzNzMuMjQ4QzIxMC45NDQgNDUzLjEyIDMzNS44NzIgNDczLjYgNDY4Ljk5MiA0NzMuNmMxNjguOTYgMCAzMjUuNjMyLTMzLjI4IDQ1My4xMi05MC4xMTJWNDMuNTJjMC0yNC4wNjQtMTkuNDU2LTQzLjUyLTQzLjUyLTQzLjUyeiIgZmlsbD0iI0ZCNTM1MiIvPjxwYXRoIGQ9Ik0zNzUuMjk2IDQ4OS45ODRjMCA3NS4yNjQgNjEuNDQgMTM2LjcwNCAxMzYuNzA0IDEzNi43MDRzMTM2LjcwNC02MS40NCAxMzYuNzA0LTEzNi43MDRTNTg3LjI2NCAzNTMuMjggNTEyIDM1My4yOHMtMTM2LjcwNCA2MS40NC0xMzYuNzA0IDEzNi43MDR6IiBmaWxsPSIjRkNDRTNFIi8+PHBhdGggZD0iTTU2MS42NjQgNDgzLjg0aDMuMDcydi0uNTEyYzQuMDk2LTEuNTM2IDcuMTY4LTUuMTIgNy4xNjgtOS43MjggMC01LjYzMi00LjYwOC0xMC4yNC0xMC4yNC0xMC4yNEg1MjIuMjR2LS41MTJsNDEuNDcyLTQwLjQ0OCAyLjA0OC0yLjA0OGMxLjAyNC0xLjUzNiAxLjUzNi0zLjA3MiAxLjUzNi00LjYwOCAwLTIuNTYtLjUxMi01LjEyLTIuNTYtNy42OC0zLjU4NC00LjA5Ni0xMC4yNC00LjYwOC0xNC4zMzYtLjUxMmwtMzcuODg4IDM3LjM3Ni0zOS45MzYtMzguOTEyYy00LjA5Ni0zLjU4NC0xMC43NTItMy4wNzItMTQuMzM2IDEuMDI0LTMuMDcyIDMuNTg0LTMuNTg0IDguMTkyLTEuMDI0IDEyLjI4OHYuNTEybDQ1LjA1NiA0NC4wMzJ2MS4wMjRoLTQyLjQ5NnYuNTEyYy00LjA5NiAxLjUzNi03LjE2OCA1LjEyLTcuMTY4IDkuNzI4czMuMDcyIDguMTkyIDcuMTY4IDkuNzI4di41MTJoNDEuOTg0djMxLjIzMmgtNDMuMDA4di41MTJjLTQuMDk2IDEuNTM2LTcuMTY4IDUuMTItNy4xNjggOS43MjhzMy4wNzIgOC4xOTIgNy4xNjggOS43Mjh2LjUxMmg0My4wMDh2MzQuMzA0aC41MTJjMS41MzYgNC4wOTYgNS4xMiA3LjE2OCA5LjcyOCA3LjE2OHM4LjE5Mi0zLjA3MiA5LjcyOC03LjE2OGguNTEydi0zNC4zMDRoNDIuNDk2di0uNTEyYzQuMDk2LTEuNTM2IDcuMTY4LTUuMTIgNy4xNjgtOS43MjggMC01LjYzMi00LjYwOC0xMC4yNC0xMC4yNC0xMC4yNEg1MjIuMjR2LTMxLjIzMmwzOS40MjQtMS41MzZ6IiBmaWxsPSIjRDg4NjE5Ii8+PC9zdmc+"
							mode="aspectFill"
							v-else
						></image>
					</view>
					<view class="flex1 flex_c fj_a z_index2 nowrap_ redPacket-title">
						<view class="nowrap_ text_34 bold_">{{ item.payload.remark }}</view>
						<view class="text_24" style="margin-top: 6rpx" v-if="item.had_draw && item.payload.type !== 'exclusive'">已领取</view>

						<view class="text_24" style="margin-top: 6rpx" v-if="item.payload.type === 'exclusive'">
							{{ item.payload.exclusive.name || item.payload.exclusive.realname }}
							{{ item.had_draw ? '已领取' : '的专属红包' }}
						</view>
					</view>
				</view>
				<view class="m-line">
					<m-line color="rgba(255, 255, 255, 0.4)" width="100%" margin="20rpx auto 6rpx auto" :hairline="true"></m-line>
				</view>
				<view class="text_24 redPacket-text">{{ item.payload.account_type_text }}</view>
			</view>
		</view>

		<!-- 你的专属红包 -->
		<view class="text_22 color__ flex_r fa_c exclusive" v-if="item.payload.type === 'exclusive' && item.payload.exclusive.member_id === myid">
			这是你的专属红包
			<view class="label-icon">
				<image
					class="img"
					src="data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTAgMGgxMDI0djEwMjRIMHoiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNOTg1LjYgMzUyYzAtNDAuMzItMzItNzIuMzItNzEuMDQtNzIuMzItMzkuNjggMC03MS4wNCAzMi42NC03MS4wNCA3Mi4zMiAwIDE1LjM2IDQuNDggMjkuNDQgMTIuOCA0MS42LTQzLjUyIDc0LjI0LTc0Ljg4IDE3NC43Mi0xMzUuNjggMTc0LjcyLTkuNiAwLTE5LjItLjY0LTI4LjE2LTIuNTYtOTYtMTcuMjgtMTQ3LjItMjUzLjQ0LTE1Mi4zMi0yODYuNzIgMjMuMDQtMTIuMTYgMzkuNjgtMzcuMTIgMzkuNjgtNjUuOTIgMC00MC4zMi0zMi03Mi4zMi03MS4wNC03Mi4zMmE3Mi41MTIgNzIuNTEyIDAgMCAwLTI0Ljk2IDE0MC4xNmMtNS4xMiAzNy4xMi01My43NiAyNzYuNDgtMTQ3LjIgMjg5LjkyLTcuNjggMS4yOC0xNS4zNiAxLjkyLTIzLjY4IDEuOTItNjAuMTYgMC0xMDIuNC0xMDQuOTYtMTM3LjYtMTc0LjcyIDMuODQtOC4zMiA1Ljc2LTE3LjkyIDUuNzYtMjguMTYgMC00MC4zMi0zMi03Mi4zMi03MS4wNC03Mi4zMi0xOS4yIDAtMzYuNDggNy42OC00OS4yOCAyMC40OC0xNC4wOCAxMy40NC0yMi40IDMyLTIyLjQgNTEuODQgMCA0MC4zMiAzMiA3Mi4zMiA3MS4wNCA3Mi4zMiAxMjQuMTYgMzEwLjQgMTg1LjYgNDY1LjkyIDE4NS42IDQ2NS45MlM0MDEuOTIgOTYwIDUxMS4zNiA5NjBzMjE3LjYtNTEuODQgMjE3LjYtNTEuODQgNjQuNjQtMTYxLjI4IDE5My4yOC00ODQuNDhjMzUuMi0zLjg0IDYzLjM2LTM0LjU2IDYzLjM2LTcxLjY4eiIgZmlsbD0iI0ZCRDMwRiIvPjxwYXRoIGQ9Ik0yOTQuNCA5MDQuMzJjMCAyOS40NCAxMDYuODggNTkuNTIgMjE1LjA0IDU5LjUyUzcyOS42IDkzNC40IDcyOS42IDkwNC4zMmMwLTI5LjQ0LTExMi42NC01OS41Mi0yMjAuMTYtNTkuNTJTMjk0LjQgODc0LjI0IDI5NC40IDkwNC4zMnoiIGZpbGw9IiNGRkE3MDYiLz48L3N2Zz4="
					mode="aspectFill"
				></image>
			</view>
		</view>
		<view class="icon_ redPacket" v-if="item.had_draw">
			<view class="redPacket-icon">
				<image
					class="img"
					src="data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTg3OC41OTIgMTAyNEgxNDUuNDA4Yy0yNC4wNjQgMC00My41Mi0xOS40NTYtNDMuNTItNDMuNTJWNDMuNTJjMC0yNC4wNjQgMTkuNDU2LTQzLjUyIDQzLjUyLTQzLjUyaDczMy4xODRjMjQuMDY0IDAgNDMuNTIgMTkuNDU2IDQzLjUyIDQzLjUydjkzNi40NDhjMCAyNC41NzYtMTkuNDU2IDQ0LjAzMi00My41MiA0NC4wMzJ6IiBmaWxsPSIjREY0OTQ5Ii8+PHBhdGggZD0iTTg3OC41OTIgMEgxNDUuNDA4Yy0yNC4wNjQgMC00NC4wMzIgMTkuNDU2LTQ0LjAzMiA0My41MnYzNzMuMjQ4QzIxMC45NDQgNDUzLjEyIDMzNS44NzIgNDczLjYgNDY4Ljk5MiA0NzMuNmMxNjguOTYgMCAzMjUuNjMyLTMzLjI4IDQ1My4xMi05MC4xMTJWNDMuNTJjMC0yNC4wNjQtMTkuNDU2LTQzLjUyLTQzLjUyLTQzLjUyeiIgZmlsbD0iI0ZCNTM1MiIvPjxwYXRoIGQ9Ik0zNzUuMjk2IDQ4OS45ODRjMCA3NS4yNjQgNjEuNDQgMTM2LjcwNCAxMzYuNzA0IDEzNi43MDRzMTM2LjcwNC02MS40NCAxMzYuNzA0LTEzNi43MDRTNTg3LjI2NCAzNTMuMjggNTEyIDM1My4yOHMtMTM2LjcwNCA2MS40NC0xMzYuNzA0IDEzNi43MDR6IiBmaWxsPSIjRkNDRTNFIi8+PHBhdGggZD0iTTU2MS42NjQgNDgzLjg0aDMuMDcydi0uNTEyYzQuMDk2LTEuNTM2IDcuMTY4LTUuMTIgNy4xNjgtOS43MjggMC01LjYzMi00LjYwOC0xMC4yNC0xMC4yNC0xMC4yNEg1MjIuMjR2LS41MTJsNDEuNDcyLTQwLjQ0OCAyLjA0OC0yLjA0OGMxLjAyNC0xLjUzNiAxLjUzNi0zLjA3MiAxLjUzNi00LjYwOCAwLTIuNTYtLjUxMi01LjEyLTIuNTYtNy42OC0zLjU4NC00LjA5Ni0xMC4yNC00LjYwOC0xNC4zMzYtLjUxMmwtMzcuODg4IDM3LjM3Ni0zOS45MzYtMzguOTEyYy00LjA5Ni0zLjU4NC0xMC43NTItMy4wNzItMTQuMzM2IDEuMDI0LTMuMDcyIDMuNTg0LTMuNTg0IDguMTkyLTEuMDI0IDEyLjI4OHYuNTEybDQ1LjA1NiA0NC4wMzJ2MS4wMjRoLTQyLjQ5NnYuNTEyYy00LjA5NiAxLjUzNi03LjE2OCA1LjEyLTcuMTY4IDkuNzI4czMuMDcyIDguMTkyIDcuMTY4IDkuNzI4di41MTJoNDEuOTg0djMxLjIzMmgtNDMuMDA4di41MTJjLTQuMDk2IDEuNTM2LTcuMTY4IDUuMTItNy4xNjggOS43MjhzMy4wNzIgOC4xOTIgNy4xNjggOS43Mjh2LjUxMmg0My4wMDh2MzQuMzA0aC41MTJjMS41MzYgNC4wOTYgNS4xMiA3LjE2OCA5LjcyOCA3LjE2OHM4LjE5Mi0zLjA3MiA5LjcyOC03LjE2OGguNTEydi0zNC4zMDRoNDIuNDk2di0uNTEyYzQuMDk2LTEuNTM2IDcuMTY4LTUuMTIgNy4xNjgtOS43MjggMC01LjYzMi00LjYwOC0xMC4yNC0xMC4yNC0xMC4yNEg1MjIuMjR2LTMxLjIzMmwzOS40MjQtMS41MzZ6IiBmaWxsPSIjRDg4NjE5Ii8+PC9zdmc+"
					mode="heightFix"
				></image>
			</view>
			<view class="text_24 color__" v-if="item.senderData.name">你领取了{{ item.senderData.name }}的红包</view>
			<view class="text_24 color__" v-else>你领取了红包</view>
		</view>
	</view>
</template>

<script>
import { show } from '@/utils/index.js';
export default {
	props: {
		myid: {
			type: [String, Number],
			default: null
		},
		isMy: {
			type: [Boolean, Number],
			default: false
		},
		value: {
			type: Object,
			default: {}
		}
	},
	created() {
		// console.log(this.value);
		// this.infr();
	},
	data() {
		return {
			item: {},
			pageObj: {}
		};
	},
	watch: {
		value: {
			handler: function (newV) {
				this.item = newV;
				// this.infr();
			},
			immediate: true
		}
	},
	methods: {
		onClick() {
			this.$emit('onClick');
		},
		async infr() {
			const res = await this.API_red_view(this.value.payload.message_id);
			if (res) {
				const data = res.data.data;
				this.item.had_draw = data.had_draw;
			}
		},
		API_red_view(message_id) {
			return new Promise((res) => {
				http.get(
					'Group/red_view',
					{
						message_id
					},
					true,
					(r) => {
						if (r.data.code == 0) return res(r);
						return res(false);
					}
				);
			});
		}
	}
};
</script>

<style scoped lang="scss">
.text {
	position: relative;
	z-index: 99;
	box-sizing: border-box;
	width: 490rpx;
	min-height: 180rpx;
	padding: 22rpx 30rpx 0 30rpx;
	border-radius: 10rpx;
	background-color: #fa9e3b;
	.red_packet_bg_mini {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 0;
		overflow: hidden;
		opacity: 0.2;
		border-radius: 10rpx;
	}

	.redPacket-row {
		width: 100%;
		min-height: 94rpx;
		.redPacket-icon {
			width: 76rpx;
			height: 88rpx;
			border-radius: 10rpx;
			overflow: hidden;
			margin-right: 26rpx;
		}
		.redPacket-title {
		}
	}
	.m-line {
	}
	.redPacket-text {
		width: 100%;
		min-height: 30rpx;
		padding: 4rpx 0 6rpx 0;
		font-weight: 300;
	}
}

.text_r {
	position: relative;
}
.text_l {
	position: relative;
}

.text_r::after {
	position: absolute;
	z-index: -1;
	content: '';
	top: 26rpx;
	right: -8rpx;
	width: 18rpx;
	height: 18rpx;
	border-radius: 2px;
	transform: rotate(45deg);
	background-color: #fa9e3b;
}
.text_l::after {
	position: absolute;
	z-index: -1;
	content: '';
	top: 26rpx;
	left: -8rpx;
	width: 18rpx;
	height: 18rpx;
	border-radius: 2px;
	transform: rotate(45deg);
	background-color: #fa9e3b;
}
.text_ {
	background-color: #fde2c4;
}

.text_::after {
	background-color: #fde2c4;
}

.text-box {
}

.exclusive {
	width: 100%;
	flex-direction: row-reverse;
	margin-top: 2rpx;
	.label-icon {
		width: 34rpx;
		height: 34rpx;
		margin-right: 10rpx;
	}
}

.redPacket {
	width: 100%;
	height: 80rpx;

	.redPacket-icon {
		height: 34rpx;
		border-radius: 4px;
		margin: 0 12rpx 0 0;
		overflow: hidden;
	}
}
</style>
