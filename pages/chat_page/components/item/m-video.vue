<template>
	<view class="flex_r m-video">
		<!-- heightFix -->
		<image class="z_index2" :style="getImageHeight" :src="value.payload.thumbnail.url" mode="aspectFill"></image>
		<view class="m-video-icon">
			<image
				class="img"
				src="data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkYXRhLXNwbS1hbmNob3ItaWQ9ImEzMTN4LnNlYXJjaF9pbmRleC4wLmk1LjU1YjUzYTgxcDB1a0U0IiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTUxNi42NTUgOS4zMUMyMzcuMzgyIDkuMzEgMTAuODYgMjM1LjgzIDEwLjg2IDUxNS4xMDJzMjI2LjUyIDUwNS43OTQgNTA1Ljc5NCA1MDUuNzk0IDUwNS43OTMtMjI2LjUyMSA1MDUuNzkzLTUwNS43OTRjMC0yNzcuNzIxLTIyNi41Mi01MDUuNzk0LTUwNS43OTMtNTA1Ljc5NHptMCA5ODIuMTA4Yy0yNjIuMjA3IDAtNDc0Ljc2NC0yMTIuNTU3LTQ3NC43NjQtNDc0Ljc2MyAwLTI2Mi4yMDcgMjEyLjU1Ny00NzQuNzY0IDQ3NC43NjQtNDc0Ljc2NCAyNjIuMjA2IDAgNDc0Ljc2MyAyMTIuNTU3IDQ3NC43NjMgNDc0Ljc2NCAwIDI2Mi4yMDYtMjEyLjU1NyA0NzQuNzYzLTQ3NC43NjMgNDc0Ljc2M3oiIGRhdGEtc3BtLWFuY2hvci1pZD0iYTMxM3guc2VhcmNoX2luZGV4LjAuaTcuNTViNTNhODFwMHVrRTQiIGNsYXNzPSJzZWxlY3RlZCIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik03MDUuOTQgNDc0Ljc2NEw0NzAuMTEgMzI1LjgxOGMtMjEuNzIyLTEzLjk2My01MS4yLTcuNzU3LTYzLjYxMyAxMy45NjQtNC42NTUgNy43NTctNy43NTggMTUuNTE1LTcuNzU4IDI0LjgyNHYyOTcuODkxYzAgMjYuMzc2IDIwLjE3IDQ2LjU0NSA0Ni41NDYgNDYuNTQ1IDkuMzA5IDAgMTcuMDY3LTMuMTAzIDI0LjgyNC03Ljc1N2wyMzcuMzgyLTE0OC45NDZjMjEuNzIxLTEzLjk2MyAyNy45MjctNDEuODkgMTMuOTY0LTYzLjYxMi00LjY1NS00LjY1NC05LjMxLTkuMzA5LTE1LjUxNi0xMy45NjN6IiBkYXRhLXNwbS1hbmNob3ItaWQ9ImEzMTN4LnNlYXJjaF9pbmRleC4wLmk2LjU1YjUzYTgxcDB1a0U0IiBjbGFzcz0ic2VsZWN0ZWQiIGZpbGw9IiNmZmYiLz48L3N2Zz4="
				mode="aspectFill"
			></image>
		</view>
		<view class="size_white text_22 m-video-time">{{ getTimes }}</view>
	</view>
</template>
<script>
export default {
	props: {
		isMy: {
			type: [Boolean, Number],
			default: false
		},
		value: {
			type: Object,
			default: {}
		}
	},
	data() {
		return {};
	},
	computed: {
		getImageHeight() {
			let { width, height } = this.value.payload.thumbnail;
			if (width < 300) {
				width = width * 1.1;
				height = height * 1.1;
				if (width < 200) {
					width = width * 1.2;
					height = height * 1.2;
					if (width < 150) {
						width = width * 1.3;
						height = height * 1.3;
					}
				}
			}
			if (width >= 360) {
				width = width * 0.9;
				height = height * 0.9;
			}
			return {
				width: `${width}rpx`,
				height: `${height}rpx`
			};
		},
		getTimes() {
			const t = this.value.payload.video.duration;
			let h = parseInt((t / 60 / 60) % 24);
			let m = parseInt((t / 60) % 60);
			let s = parseInt(t % 60);
			h = h < 10 ? '0' + h : h;
			m = m < 10 ? '0' + m : m;
			s = s < 10 ? '0' + s : s;
			if (h === '00') return `${m}:${s}`;
			return `${h}:${m}:${s}`;
		}
	},
	methods: {}
};
</script>

<style scoped lang="scss">
.m-video {
	position: relative;
	border-radius: 10rpx;
	overflow: hidden;
	background-color: #fff;
	.m-video-icon {
		position: absolute;
		z-index: 3;
		width: 90rpx;
		height: 90rpx;
		top: calc(50% - 45rpx);
		left: calc(50% - 45rpx);
		border-radius: 50%;
		background-color: rgba(000, 000, 000, 0.2);
	}
	.m-video-time {
		position: absolute;
		z-index: 3;
		bottom: 10rpx;
		right: 10rpx;
	}
}
</style>
