<template>
	<view class="more" :style="{ height: value ? '430rpx' : '0px' }">
		<view class="more-line">
			<m-line color="#d4d4d4" length="100%" :hairline="true"></m-line>
		</view>
		<view class="flex_r more-list">
			<view class="flex_c_c more-item" v-for="(item, index) in list" :key="index" @click="onClick(item)">
				<view class="icon_ more-item-icon">
					<image class="img" :src="item.icon" mode="aspectFill"></image>
				</view>
				<view class="text_26" style="color: #686868">
					{{ item.title }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		value: {
			type: Boolean,
			default: false
		}
	},
	// #4c4c4c
	data() {
		return {
			isShow: false,
			list: [
				{
					type: 'img',
					icon: 'data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTYwNy45IDcwNy45bC00Ny41IDQ1LjljLTE0LjYgMTQuMS0zMy45IDIxLjktNTQuMiAyMS45cy0zOS42LTcuOC01NC4yLTIxLjlMMzExLjQgNjE4Yy04LjYtOC4zLTIyLTguMy0zMC42IDBsLTIxNyAyMDkuNGM3LjggNzQuNCA3MC44IDEzMi41IDE0Ny4yIDEzMi41aDU5OC41YzI5LjcgMCA1Ny4zLTguOCA4MC41LTIzLjlMNjU1LjIgNzA3LjhjLTEzLjItMTIuNy0zNC0xMi43LTQ3LjMuMXptNTguMi00MzEuNmMtNDkuMyAwLTg5LjUgNDAuMS04OS41IDg5LjVzNDAuMSA4OS41IDg5LjUgODkuNWM0OS4zIDAgODkuNS00MC4xIDg5LjUtODkuNXMtNDAuMi04OS41LTg5LjUtODkuNXoiIGZpbGw9IiM0YzRjNGMiLz48cGF0aCBkPSJNODA5LjYgNjUuNEgyMTFjLTgxLjYgMC0xNDggNjYuNC0xNDggMTQ4djUzN2wxNzktMTcyLjdjMTQuNi0xNC4xIDMzLjktMjEuOSA1NC4yLTIxLjlzMzkuNiA3LjggNTQuMiAyMS45TDQ5MSA3MTMuNWM4LjYgOC4zIDIyIDguMyAzMC42IDBsNDcuNS00NS45YzE2LjktMTYuMyAzOS4xLTI1LjMgNjIuNi0yNS4zczQ1LjcgOSA2Mi42IDI1LjNsMjM2LjMgMjI5LjZjMTcuMS0yNC4xIDI3LjEtNTMuNiAyNy4xLTg1LjNWMjEzLjRjLS4xLTgxLjYtNjYuNS0xNDgtMTQ4LjEtMTQ4ek02NjYuMSA1MTEuM2MtODAuMiAwLTE0NS41LTY1LjMtMTQ1LjUtMTQ1LjVzNjUuMy0xNDUuNSAxNDUuNS0xNDUuNSAxNDUuNSA2NS4zIDE0NS41IDE0NS41LTY1LjMgMTQ1LjUtMTQ1LjUgMTQ1LjV6IiBmaWxsPSIjNGM0YzRjIi8+PC9zdmc+',
					title: '照片'
				},
				// #ifdef APP || H5
				{
					type: 'shot',
					icon: 'data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEyNjAgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTY0Mi45MzQgMzM1LjM4N2MtMTM0LjM2IDAtMjQzLjYzNSAxMDkuMzE1LTI0My42MzUgMjQzLjY3NXMxMDkuMjc1IDI0My42NzQgMjQzLjYzNSAyNDMuNjc0YzEzNC4zMiAwIDI0My42NzQtMTA5LjE5NyAyNDMuNjc0LTI0My42NzRTNzc3LjI1NCAzMzUuMzg3IDY0Mi45MzQgMzM1LjM4N201MTcuODI4LTIwOS45MjdIOTMyLjg3OEw4NDMuMTc0IDEwLjA4QTI1Ljk5IDI1Ljk5IDAgMCAwIDgyMi41MzkgMEg0NTAuNDkxYy04LjMxIDAtMTYuMTg1IDMuOTM4LTIxLjEwNyAxMC42NzJMMzQ0Ljc5OSAxMjUuNDJIOTguODc5YTk2LjMyIDk2LjMyIDAgMCAwLTk2LjI0IDk2LjIwMlY5MjcuNjRhOTYuMjQxIDk2LjI0MSAwIDAgMCA5Ni4yNCA5Ni4xMjNoMTA2MS44NDNhOTYuMjQxIDk2LjI0MSAwIDAgMCA5Ni4xMjMtOTYuMTIzVjIyMS42MjNhOTYuMTIzIDk2LjEyMyAwIDAgMC05Ni4wODMtOTYuMTYzTTY0Mi45MzQgODc1LjAzYy0xNjMuMjY0IDAtMjk2LjA0OC0xMzIuNzg0LTI5Ni4wNDgtMjk2LjA0NyAwLTE2My4zMDMgMTMyLjgyNC0yOTYuMTY2IDI5Ni4wNDgtMjk2LjE2NiAxNjMuMjYzIDAgMjk2LjA4NyAxMzIuODYzIDI5Ni4wODcgMjk2LjE2NiAwIDE2My4yNjMtMTMyLjgyNCAyOTYuMDQ4LTI5Ni4wODcgMjk2LjA0OG00MDUuOTE0LTUyNy4xMjFhMzguNDczIDM4LjQ3MyAwIDAgMS0zOC4zOTQtMzguNDM0YzAtMjEuMTA3IDE3LjI0OC0zOC4zNTUgMzguMzk0LTM4LjM1NXMzOC4zOTQgMTcuMjQ4IDM4LjM5NCAzOC4zNTVhMzguNTEyIDM4LjUxMiAwIDAgMS0zOC4zOTQgMzguNDM0IiBmaWxsPSIjNGM0YzRjIiBkYXRhLXNwbS1hbmNob3ItaWQ9ImEzMTN4LnNlYXJjaF9pbmRleC4wLmk0LjI4YWMzYTgxU0FzSkNkIiBjbGFzcz0ic2VsZWN0ZWQiLz48L3N2Zz4=',
					title: '拍摄'
				},
				// #endif
				{
					type: 'video',
					icon: 'data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTg4NC4zIDQ0NS45aC03bC0xNDIuOSA3Ni43di03NC4yYzAtMzEuMS0yNS4zLTU2LjMtNTYuMy01Ni4zSDExOC41Yy0zMS4xIDAtNTYuMyAyNS4zLTU2LjMgNTYuM3Y0MzUuM2MwIDMxLjEgMjUuMyA1Ni4zIDU2LjMgNTYuM0g2NzhjMzEuMSAwIDU2LjMtMjUuMyA1Ni4zLTU2LjN2LTQ1LjZsMTQyLjkgNzYuN2g3YzQwLjMgMCA3My4xLTMyLjggNzMuMS03My4xVjUxOWMuMS00MC4zLTMyLjctNzMuMS03My03My4xek0yMjYuNyA4NS41Yy03My42IDAtMTMzLjUgNTkuOS0xMzMuNSAxMzMuNXM1OS45IDEzMy41IDEzMy41IDEzMy41UzM2MC4yIDI5Mi42IDM2MC4yIDIxOSAzMDAuMyA4NS41IDIyNi43IDg1LjV6bTM0NSAwYy03My42IDAtMTMzLjUgNTkuOS0xMzMuNSAxMzMuNXM1OS45IDEzMy41IDEzMy41IDEzMy41UzcwNS4yIDI5Mi42IDcwNS4yIDIxOSA2NDUuNCA4NS41IDU3MS43IDg1LjV6IiBmaWxsPSIjNGM0YzRjIi8+PC9zdmc+',
					title: '视频'
				},
				{
					type: 'red_envelope',
					icon: 'data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTE5MiAyMDIuNFY4OTZjMCAzNS4yIDI4LjggNjQgNjQgNjRoNTEyYzM1LjIgMCA2NC0yOC44IDY0LTY0VjIwMi40TDUxMiAyNTZsLTMyMC01My42em00MTIuOCAyNDIuNGw0NS42IDQ1LjYtODcuMiA4NS42SDY0MHY2NGgtOTZ2MzJoOTZ2NjRoLTk2djk2aC02NHYtOTZoLTk2di02NGg5NnYtMzJoLTk2di02NGg3Ni44bC04Ni40LTg2LjRMNDIwIDQ0NGw5MiA5Mi44IDkyLjgtOTJ6TTc2OCA2NEgyNTZjLTM1LjIgMC02NCAyOC44LTY0IDY0djQyLjRMNTEyIDIyNGwzMjAtNTMuNlYxMjhjMC0zNS4yLTI4LjgtNjQtNjQtNjR6IiBkYXRhLXNwbS1hbmNob3ItaWQ9ImEzMTN4LnNlYXJjaF9pbmRleC4wLmkwLmUyY2YzYTgxdnh2OU9rIiBjbGFzcz0ic2VsZWN0ZWQiIGZpbGw9IiM0YzRjNGMiLz48L3N2Zz4=',
					title: '红包'
				},
				{
					type: 'map',
					icon: 'data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTUxMy4wMjQgMTAyNEg1MTJjLTE3LjkyIDAtMzQuODE2LTcuMTY4LTQ3LjEwNC0yMC40OC05LjcyOC0xMC4yNC05Ny4yOC0xMDIuOTEyLTE4NC44MzItMjE5LjY0OEMxNjIuMzA0IDYyNS42NjQgMTAyLjQgNDk5LjIgMTAyLjQgNDA5LjA4OCAxMDIuNCAxODMuMjk2IDI4Ni4yMDggMCA1MTIgMHM0MDkuNiAxODMuMjk2IDQwOS42IDQwOS4wODhjMCA1NC43ODQtMjAuOTkyIDEyMS44NTYtNjIuOTc2IDE5OS42OC0zOS45MzYgNzQuNzUyLTEwMC4zNTIgMTYxLjc5Mi0xNzkuNzEyIDI1OC4wNDhsLS41MTIuNTEyLTExNy43NiAxMzQuMTQ0Yy0xMS43NzYgMTQuMzM2LTI5LjE4NCAyMi41MjgtNDcuNjE2IDIyLjUyOHpNNTEyIDYwMC4wNjRjMTA1Ljk4NCAwIDE5MS40ODgtODYuMDE2IDE5MS40ODgtMTkxLjQ4OFM2MTcuOTg0IDIxNy42IDUxMiAyMTcuNnMtMTkyIDg1LjUwNC0xOTIgMTkxLjQ4OCA4Ni4wMTYgMTkwLjk3NiAxOTIgMTkwLjk3NnoiIGZpbGw9IiM0YzRjNGMiIGRhdGEtc3BtLWFuY2hvci1pZD0iYTMxM3guc2VhcmNoX2luZGV4LjAuaTEzLjEwZTYzYTgxRkRjbjF4IiBjbGFzcz0ic2VsZWN0ZWQiLz48L3N2Zz4=',
					title: '位置'
				}
			]
		};
	},
	created() {},
	watch: {
		value: {
			handler: function (newV) {
				this.isShow = newV;
			},
			immediate: true
		}
	},
	methods: {
		onClick(item) {
			this.$emit('onMore', item);
		}
	}
};
</script>

<style lang="scss" scoped>
.more {
	position: relative;
	box-sizing: border-box;
	width: 100%;
	background-color: #f6f6f6;
	overflow: hidden;
	transition: all 0.2s;
	.more-line {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
	}
	.more-list {
		box-sizing: border-box;
		padding: 20rpx;
		width: 100%;
		height: 370rpx;
		flex-wrap: wrap;
	}
	.more-item {
		width: 25%;
		height: 190rpx;
		.more-item-icon {
			width: 120rpx;
			height: 120rpx;
			background-color: #fff;
			border-radius: 30rpx;
			margin-bottom: 10rpx;
			.img {
				width: 50%;
				height: 50%;
			}
		}
	}
}
</style>
