<template>
	<view class="flex_r operate-box" v-if="show" :style="[Style]" @click="show = false">
		<view :class="{ flex1: isSelf }" style="transition: all 0.2s"></view>
		<view class="flex_r operate">
			<view class="flex_c_c size_white operate-item" v-for="(item, index) in list" :key="index" @click.stop="onClick(item)" v-if="item.icon">
				<view class="operate-item-icon">
					<image class="img" :src="item.icon" mode="aspectFill"></image>
				</view>
				<view class="text_24">
					{{ item.title }}
				</view>
			</view>
			<view class="operate-str" :style="[StyleStr]"></view>
		</view>
	</view>
</template>

<script>
// import { 自己的信息 } from '@/TEST/index';
import { getLocation, show } from '@/utils/index.js';
const transmit = {
	type: 'transmit',
	icon: 'data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTU2NS45MzQgODE3LjU3NGEzNC44MTYgMzQuODE2IDAgMCAwIDkuODE4IDI5LjM5NGwuMzAyLjI0MWEzNS41MzkgMzUuNTM5IDAgMCAwIDI1LjYgMTAuOTYzYzExLjE0MyAwIDIwLjY2LTUuNDIgMjcuMjI2LTEzLjMxMmwzNTQuNTQ1LTM4Ny4wNzJhMzUuMTE3IDM1LjExNyAwIDAgMCAxMC4yNC0yNy4xMDYgMzUuMDU3IDM1LjA1NyAwIDAgMC0xMC4yNC0yNy4xMDZMNjI2Ljg5MiAxNC4zMzZhMzYuNTAzIDM2LjUwMyAwIDAgMC01MS4yIDAgMzQuOTM2IDM0LjkzNiAwIDAgMC05Ljc1OCAyOS4zOTVWMjUzLjM1Yy0yOTUuOTk2IDAtNTM1Ljk3NCAyMzguODkzLTUzNS45NzQgNTMzLjY4NGE1MjkuNDY4IDUyOS40NjggMCAwIDAgNDQuNDU0IDIxMi41MUMxMTYuNyA3NzcuMjc2IDMyOS44MTIgNjA4LjQzNyA1NjUuMzMyIDYwOC40MzdsLjYwMiAyMDkuMTM3eiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==',
	title: '转发'
};
const copy = {
	type: 'copy',
	icon: 'data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTc2MiA4NjYuMTd2MzMuMzNjMCAyNy42Mi0yMi4zOCA1MC01MCA1MEgxODdjLTI3LjYyIDAtNTAtMjIuMzgtNTAtNTB2LTY1MGMwLTI3LjYyIDIyLjM4LTUwIDUwLTUwaDMzLjMzdjYxNi42N2MwIDI3LjYyIDIyLjM4IDUwIDUwIDUwSDc2MnoiIGRhdGEtc3BtLWFuY2hvci1pZD0iYTMxM3guc2VhcmNoX2luZGV4LjAuaTEuNGE2MzNhODFFQkU0bnEiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNODg3IDMwMC44NFY3NzQuNWMwIDI3LjYyLTIyLjM4IDUwLTUwIDUwSDMxMmMtMjcuNjIgMC01MC0yMi4zOC01MC01MHYtNjUwYzAtMjcuNjIgMjIuMzgtNTAgNTAtNTBoMzQ4LjY2YzQuNDIgMCA4LjY2IDEuNzYgMTEuNzggNC44OGwyMDkuNjcgMjA5LjY3YzMuMTMgMy4xMyA0Ljg5IDcuMzcgNC44OSAxMS43OXoiIGRhdGEtc3BtLWFuY2hvci1pZD0iYTMxM3guc2VhcmNoX2luZGV4LjAuaTAuNGE2MzNhODFFQkU0bnEiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNNjUwLjg5IDI3Ny4yN1Y5MS4xN2wyMTkuNDQgMjE5LjQ0SDY4NC4yMmMtMTguNCAwLTMzLjMzLTE0LjkzLTMzLjMzLTMzLjM0eiIgZmlsbD0iIzRjNGM0YyIgZGF0YS1zcG0tYW5jaG9yLWlkPSJhMzEzeC5zZWFyY2hfaW5kZXguMC5pMi40YTYzM2E4MUVCRTRucSIgY2xhc3M9InNlbGVjdGVkIi8+PC9zdmc+',
	title: '复制'
};
const hide = {
	type: 'hide',

	icon: 'data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTg4Mi43ODEgNzAuNzg0YTY0IDY0IDAgMCAxIDcuODcyIDkwLjExMmwtNzMuNiA4Ny42OGM2Ny45NjggNTYuNDQ4IDEzMy42MzIgMTMyLjY3MiAxOTYuOTI4IDIyOC43MzZhNjQgNjQgMCAwIDEgNC40OCA2Mi40bC00LjAzMiA3LjM2Qzg2NS4zMSA3NzkuNzEyIDY5OC4wNzcgODk2IDUxMi42NyA4OTZhNDM3Ljc2IDQzNy43NiAwIDAgMS0xOTguNTkyLTQ3LjkzNmwtODEuNiA5Ny4yOGE2NCA2NCAwIDAgMS05OC4wNDgtODIuMjRsNzIuMTI4LTg2LjA4QzEzOC4xNDEgNzIwLjQ0OCA3Mi44NjEgNjQzLjU4NCAxMC42NTMgNTQ2LjU2YTY0IDY0IDAgMCAxLTQuMDMyLTYxLjc2bDQuMDMyLTcuMjMyQzE1OS44MzcgMjQ0LjQ4IDMyNy4xOTcgMTI4IDUxMi43MzMgMTI4YzY3LjY0OCAwIDEzMy41MDQgMTYuMzIgMTk3LjM3NiA0OS4wMjRsODIuNTYtOTguMzY4YTY0IDY0IDAgMCAxIDkwLjExMi03Ljg3MnptLTE2MS45MiAyOTIuNDhsLTg4IDEwNC44OTZhMTI4IDEyOCAwIDAgMS0xNDIuNTI4IDE2OS45MmwtODguMTI4IDEwNC45NmEyNTYgMjU2IDAgMCAwIDMxOC43Mi0zNzkuNzc2ek01MTIuNTQxIDI1NmEyNTYgMjU2IDAgMCAwLTIwOC4zMiA0MDQuNzM2bDg3Ljg3Mi0xMDQuODMyQTEyOCAxMjggMCAwIDEgNTM0Ljc1IDM4NS45Mmw4OC4xMjgtMTA0Ljk2QTI1NS4wNCAyNTUuMDQgMCAwIDAgNTEyLjU0MSAyNTZ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+',
	title: '隐藏'
};
const quote = {
	type: 'quote',
	icon: 'data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTUxMiAxMDI0QTUxMi41NzYgNTEyLjU3NiAwIDAgMSAwIDUxMiA1MTIuNTc2IDUxMi41NzYgMCAwIDEgNTEyIDBhNTEyLjU3NiA1MTIuNTc2IDAgMCAxIDUxMiA1MTIgNTEyLjU3NiA1MTIuNTc2IDAgMCAxLTUxMiA1MTJ6bTI1LjYtNTExLjA0djE5MmgxODIuNTI4di0xOTJINjAyLjgxNmEyMDQuMjI0IDIwNC4yMjQgMCAwIDEgMTA4LjgtMTM1LjkzNmwtMjcuMDA4LTU4LjA0OGEyNjIuNCAyNjIuNCAwIDAgMC0xNDYuMDQ4IDE5My45MnptLTI1NiAwdjE5MmgxODIuNDY0di0xOTJIMzQ2Ljg4YTIwNC4yMjQgMjA0LjIyNCAwIDAgMSAxMDguOC0xMzUuOTM2TDQyOC44IDMxOS4wNGEyNjIuNCAyNjIuNCAwIDAgMC0xNDYuMTEyIDE5My45MnoiIGRhdGEtc3BtLWFuY2hvci1pZD0iYTMxM3guc2VhcmNoX2luZGV4LjAuaTIwLjRhNjMzYTgxRUJFNG5xIiBjbGFzcz0ic2VsZWN0ZWQiIGZpbGw9IiNmZmYiLz48L3N2Zz4=',
	title: '引用'
};
const thank = {
	type: 'thank',
	icon: 'data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTQ5MC42NjcgNzQ2LjExMkMyOTkuODQgNzM1LjUzMSAxNDguMzMgNTc3LjAwMiAxNDguMzMgMzgzLjAxOWMwLTcwLjIzIDE5Ljg0LTEzNS44MDggNTQuMjI5LTE5MS4zODIgNTUuMzM5IDQuNjMgMTMwLjg1OSAxNy4zODcgMTg3Ljg2MSA1MS41NDJDNDEwLjQxMSAxNTkuOTM2IDQ1Mi44NDMgMTAxLjMzMyA1MTIgNjQuMDg1YzYyLjgyNyAzNy4yNDggOTguNzczIDk3LjY0MyAxMjIuMDkgMTc5LjA5NCA0NS42MTEtMzUuNTQyIDEyNi4yMy00Ny45MTUgMTg1LjA0Ni01Mi4wNTRhMzYyLjY4OCAzNjIuNjg4IDAgMCAxIDU0LjUyOCAxOTEuODcyYzAgMTkzLjM0NC0xNTAuNDQzIDM1MS40MjQtMzQwLjMzIDM2Mi45ODdWOTYwYTIxLjMzMyAyMS4zMzMgMCAwIDEtNDIuNjY3IDBWNzQ2LjExMnpNMzg1LjkyIDkyNi4xODdDMzM4LjgzNyA4MjIuOTk3IDI1MS4xNTcgNzY4LjUzMyAxNDkuMjI3IDc2OGEyMS4zMzMgMjEuMzMzIDAgMSAxIC4yMTMtNDIuNjY3YzExOC4yNzIuNTk4IDIyMS4xODQgNjQuNTU1IDI3NS4zMDcgMTgzLjE0N2EyMS4zMzMgMjEuMzMzIDAgMSAxLTM4LjgyNyAxNy43MDd6bTIxMy4zMzMtMTcuNzA3YzU0LjEyMy0xMTguNjEzIDE1Ny4wMzUtMTgyLjU1IDI3NS4zMDctMTgzLjE0N2EyMS4zMzMgMjEuMzMzIDAgMSAxIC4yMTMgNDIuNjY3Yy0xMDEuOTMuNTEyLTE4OS42MSA1NC45OTctMjM2LjY5MyAxNTguMTg3YTIxLjMzMyAyMS4zMzMgMCAxIDEtMzguODI3LTE3LjcwN3oiIGZpbGw9IiNmZmYiIGRhdGEtc3BtLWFuY2hvci1pZD0iYTMxM3guc2VhcmNoX2luZGV4LjAuaTguMWRiNDNhODFUTVJ3UTIiIGNsYXNzPSJzZWxlY3RlZCIvPjwvc3ZnPg==',
	title: '谢谢'
};
const map = {
	type: 'map',
	icon: 'data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTg5OC4yIDExMy4xYy0xMS40LTYuNC0yNS4yLTYuNC0zNi42IDBMMTMwLjEgNDc2LjRjLTEyIDUtMjAuNCAxNi4yLTIxLjkgMjkuMS0uNCAxMS42IDUuMSAyMi42IDE0LjYgMjkuMWwxNzUuNiAxMDljMTQuNSA4LjUgMzMgNS41IDQ0LTcuM2wzODMuNC0zNDQuOWMyLjUtMi4yIDYuMi0yLjIgOC43IDAgMS4yIDEgMS45IDIuNCAyIDMuOS4xIDEuNS0uNCAzLTEuNSA0LjFsLTM0MS40IDM2NmMtNS42IDUuOC04LjIgMTMuOC03LjIgMjEuOHYxNTkuOWMtLjMgMTUuMyA4LjIgMjkuNSAyMS45IDM2LjQgMTIuNSA1LjYgMjcuMiAyLjYgMzYuNi03LjNsODcuOS04Ny4yIDE3NS42IDExNi4zYzExIDYuNCAyMy45IDkgMzYuNiA3LjMgMTEuMy01LjkgMTkuMy0xNi42IDIxLjktMjkuMWwxNDYuMy03MjYuNmM1LjItMTYuMi0uOC0zMy44LTE0LjctNDMuNWwtLjMtLjN6IiBmaWxsPSIjZmZmIiBkYXRhLXNwbS1hbmNob3ItaWQ9ImEzMTN4LnNlYXJjaF9pbmRleC4wLmkxNS43Yzg1M2E4MUQ0T2VKMiIgY2xhc3M9InNlbGVjdGVkIi8+PC9zdmc+',
	title: '导航'
};
const deletex = {
	type: 'delete',
	icon: 'data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTIyNi42NSA4NTAuMTQ3YzAgNTkuNDQxIDQ3Ljg4NiAxMTAuMDYyIDEwNi45NzggMTEwLjA2MmgzNTYuNjU2YzU5LjA5MiAwIDEwNi45NzktNTAuNjIgMTA2Ljk3OS0xMTAuMDYybDcxLjM0OS01NzYuMzQ1SDE1NS4zbDcxLjM1IDU3Ni4zNDV6bTM5Ny42Ny00NjQuNTU1aDY5Ljk5MXY0NjIuODI3aC02OS45OTJWMzg1LjU5MnptLTE1NC42NDggMGg4NC42NTV2NDYyLjgyN2gtODQuNjU1VjM4NS41OTJ6bS0xMzkuOTg0IDBoNjkuOTkydjQ2Mi44MjdoLTY5Ljk5MlYzODUuNTkyem01MjEuMTA3LTI1MS43ODlINjE4Ljk3OHMtMTUuOTc2LTcwLjAxLTM1LjY3NC03MC4wMUg0NDAuNjUxYy0xOS42OTggMC0zNS42NzQgNzAuMDEtMzUuNjc0IDcwLjAxSDE3My4xNmMtMjkuNTQ2IDAtNTMuNDkgMjUuODI1LTUzLjQ5IDU1LjU0NXY1Ni4yNDVoNzg0LjY2di01Ni4yNDVjMC0yOS43Mi0yMy45ODktNTUuNTQ1LTUzLjUzNS01NS41NDV6IiBkYXRhLXNwbS1hbmNob3ItaWQ9ImEzMTN4LnNlYXJjaF9pbmRleC4wLmkxMi40YTYzM2E4MUVCRTRucSIgY2xhc3M9InNlbGVjdGVkIiBmaWxsPSIjZmZmIi8+PC9zdmc+',
	title: '删除'
};

const add_emoji = {
	type: 'add_emoji',
	icon: 'data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwNzggMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTMyOS44MzYgNjUyLjEyNnoiIGZpbGw9IiMyNzI2MzUiLz48cGF0aCBkPSJNMjg4Ljg3NiA2OTkuNTU0czU0Ljk3MiAxMTIuMSAyMjMuMTI0IDExMi4xYzM4LjgwNCAwIDczLjI5Ny02LjQ2NyAxMDIuNC0xNS4wOSAwLTUuMzktMS4wNzgtMTEuODU3LTEuMDc4LTE3LjI0NiAwLTE5LjQwMiAyLjE1Ni0zOC44MDQgNi40NjctNTcuMTI5LTMwLjE4IDE1LjA5MS02Ni44MjkgMjUuODctMTA4Ljg2NyAyNS44Ny0xMjEuODAyIDAtMTgyLjE2NC05NS45MzMtMTgyLjE2NC05NS45MzMtNDIuMDM4IDAtMzkuODgyIDQ3LjQyOC0zOS44ODIgNDcuNDI4eiIgZmlsbD0iI2ZmZiIgZGF0YS1zcG0tYW5jaG9yLWlkPSJhMzEzeC5zZWFyY2hfaW5kZXguMC5pMTcuNTllMjNhODFBS2tIN3oiIGNsYXNzPSJzZWxlY3RlZCIvPjxwYXRoIGQ9Ik02NjYuMTM5IDkzMC4yMjNDNjE3LjYzNCA5NDguNTQ3IDU2NC44MTcgOTU3LjE3MSA1MTIgOTU3LjE3MWMtMTE4LjU2OCAwLTIzMC42Ny00Ni4zNS0zMTQuNzQ1LTEzMC40MjZDMTEzLjE3OSA3NDIuNjcgNjYuODI5IDYzMS42NDYgNjYuODI5IDUxMmMwLTExOC41NjggNDYuMzUtMjMwLjY3IDEzMC40MjYtMzE0Ljc0NUMyODEuMzMgMTEzLjE3OSAzOTMuNDMyIDY2LjgyOSA1MTIgNjYuODI5YzExOC41NjggMCAyMzAuNjcgNDYuMzUgMzE0Ljc0NSAxMzAuNDI2IDk3LjAxIDk3LjAxIDE0MC4xMjcgMjI4LjUxMyAxMjguMjcgMzU1LjcwNSAyMi42MzYgOS43MDEgNDQuMTkzIDIyLjYzNiA2Mi41MTggMzguODA0IDI0Ljc5MS0xNTYuMjk1LTIzLjcxNC0zMjEuMjEyLTE0My4zNi00NDEuOTM3Qzc3Ny4xNjMgNTIuODE3IDY0OC44OTMgMCA1MTIgMFMyNDYuODM4IDUyLjgxNyAxNDkuODI3IDE0OS44MjdDNTIuODE3IDI0Ni44MzcgMCAzNzUuMTA3IDAgNTEyczUyLjgxNyAyNjUuMTYyIDE0OS44MjcgMzYyLjE3M0MyNDYuODM3IDk3MS4xODMgMzc1LjEwNyAxMDI0IDUxMiAxMDI0YzcyLjIxOSAwIDE0My4zNi0xNS4wOSAyMDguMDM0LTQ0LjE5NC0yMC40OC0xMi45MzQtMzguODA1LTMwLjE4LTUzLjg5NS00OS41ODN6IiBmaWxsPSIjZmZmIiBkYXRhLXNwbS1hbmNob3ItaWQ9ImEzMTN4LnNlYXJjaF9pbmRleC4wLmkxNi41OWUyM2E4MUFLa0g3eiIgY2xhc3M9InNlbGVjdGVkIi8+PHBhdGggZD0iTTM2My4yNSA0NzMuMTk2YzM0LjQ5MyAwIDYyLjUxOC0yOC4wMjUgNjIuNTE4LTYyLjUxOHMtMjguMDI1LTYyLjUxOC02Mi41MTctNjIuNTE4Yy0zNC40OTMgMC02Mi41MTggMjguMDI1LTYyLjUxOCA2Mi41MThzMjguMDI1IDYyLjUxOCA2Mi41MTggNjIuNTE4eiIgZmlsbD0iI2ZmZiIgZGF0YS1zcG0tYW5jaG9yLWlkPSJhMzEzeC5zZWFyY2hfaW5kZXguMC5pMTguNTllMjNhODFBS2tIN3oiIGNsYXNzPSJzZWxlY3RlZCIvPjxwYXRoIGQ9Ik02ODQuNDYzIDM0Ny4wODJjLTM0LjQ5MiAwLTYyLjUxOCAyOC4wMjUtNjIuNTE4IDYyLjUxOHMyOC4wMjYgNjIuNTE4IDYyLjUxOCA2Mi41MThjMzQuNDkzIDAgNjIuNTE4LTI4LjAyNSA2Mi41MTgtNjIuNTE4cy0yOC4wMjUtNjIuNTE4LTYyLjUxOC02Mi41MTh6IiBmaWxsPSIjZmZmIiBkYXRhLXNwbS1hbmNob3ItaWQ9ImEzMTN4LnNlYXJjaF9pbmRleC4wLmkxOS41OWUyM2E4MUFLa0g3eiIgY2xhc3M9InNlbGVjdGVkIi8+PHBhdGggZD0iTTg1OS4wODIgNTY1Ljg5NWMtMTE3LjQ5IDAtMjEyLjM0NSA5NS45MzItMjEyLjM0NSAyMTMuNDIzIDAgMTE3LjQ5IDk0Ljg1NSAyMTIuMzQ1IDIxMi4zNDUgMjEyLjM0NXMyMTMuNDIzLTk0Ljg1NSAyMTMuNDIzLTIxMy40MjNjMC0xMTYuNDEzLTk1LjkzMi0yMTIuMzQ1LTIxMy40MjMtMjEyLjM0NXptMTIxLjgwMiAyMzEuNzQ3aC0xMDIuNHYxMDIuNGMwIDEwLjc4LTguNjIzIDE4LjMyNC0xOC4zMjQgMTguMzI0cy0xOS40MDItNy41NDUtMTkuNDAyLTE4LjMyNHYtMTAyLjRoLTEwMi40Yy0xMC43OCAwLTE4LjMyNC04LjYyMy0xOC4zMjQtMTguMzI0IDAtMTAuNzggOC42MjMtMTguMzI0IDE4LjMyNC0xOC4zMjRoMTAyLjRWNjU3LjUxNmMwLTEwLjc4IDguNjIzLTE4LjMyNCAxOC4zMjQtMTguMzI0czE4LjMyNCA4LjYyMyAxOC4zMjQgMTguMzI0djEwMi40aDEwMy40NzhjMTAuNzggMCAxOC4zMjQgOC42MjMgMTguMzI0IDE4LjMyNCAwIDEwLjc3OS03LjU0NSAxOS40MDItMTguMzI0IDE5LjQwMnoiIGZpbGw9IiNmZmYiIGRhdGEtc3BtLWFuY2hvci1pZD0iYTMxM3guc2VhcmNoX2luZGV4LjAuaTE1LjU5ZTIzYTgxQUtrSDd6IiBjbGFzcz0ic2VsZWN0ZWQiLz48L3N2Zz4=',
	title: '添加'
};

export default {
	data() {
		return {
			show: false,
			item: {},
			list: [],
			style: {},
			styleStr: {}
		};
	},
	computed: {
		Style() {
			const style = this.style;
			return style;
		},
		StyleStr() {
			const style = this.styleStr;
			style.transition = 'all 0.2s';
			return style;
		},
		// 是否本人isMy
		isSelf() {
			const { member_id = '' } = 自己的信息;
			return this.item.senderId === `${member_id}`;
		}
	},
	methods: {
		open(item, e) {
			this.item = item;
			this.init(item);
			let top = e.top;
			let title = this.list[this.list.length - 1].title;
			let length = this.list.length;
			if (!title) {
				length = length - 1;
			}
			if (length >= 5) {
				top = e.top - uni.upx2px(100);
			}
			this.style = {
				top: `${top - uni.upx2px(160)}px`
			};
			const value = (e.right - e.left) / 2 + uni.upx2px(122);
			this.styleStr = {
				top: `${e.top - uni.upx2px(31)}px`,
				left: `${value + uni.upx2px(122)}px`
			};
			if (this.isSelf) {
				this.styleStr = {
					top: `${e.top - uni.upx2px(31)}px`,
					right: `${value}px`
				};
			} else {
				this.styleStr = {
					top: `${e.top - uni.upx2px(31)}px`,
					left: `${value}px`
				};
			}
			this.show = true;
		},
		init(item) {
			let retractx = {
				type: 'retractx',
				icon: 'data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTMyOS4wNDUgMTM3LjY4NWEzMiAzMiAwIDAgMSA0OC4xMjggNDEuOTg0bC0yLjg1OCAzLjI4Ni0xNTguNDIyIDE1OC4zNzggMTU4LjQyMiAxNTguMzc5YTMyIDMyIDAgMCAxIDIuODU4IDQxLjk4NGwtMi44NTggMy4yODVhMzIgMzIgMCAwIDEtNDEuOTg0IDIuODU5bC0zLjI4Ni0yLjg1OS0xODAuOTkyLTE4MS4wMzRhMzIgMzIgMCAwIDEtMi44NTgtNDEuOTg0bDIuODU4LTMuMjQzIDE4MC45OTItMTgxLjAzNXoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNNjQwIDMwOS4zMzNhMjQ1LjMzMyAyNDUuMzMzIDAgMCAxIDkuMzg3IDQ5MC40OTZMNjQwIDgwMEgxNzAuNjY3YTMyIDMyIDAgMCAxLTQuMzUyLTYzLjcwMWw0LjM1Mi0uMjk5SDY0MGExODEuMzMzIDE4MS4zMzMgMCAwIDAgOC43OS0zNjIuNDUzbC04Ljc5LS4yMTRIMTcwLjY2N2EzMiAzMiAwIDAgMS00LjM1Mi02My43MDFsNC4zNTItLjI5OUg2NDB6IiBmaWxsPSIjZmZmIi8+PC9zdmc+',
				title: '撤回'
			};
			const MAX_RECALLABLE_TIME = 5 * 60 * 1000; //3分钟以内的消息才可以撤回;最长只能撤回4小时内的消息。
			if (Date.now() - item.timestamp < MAX_RECALLABLE_TIME) {
				const { member_id = '' } = 自己的信息;
				if (item.status === 'success' && item.senderId === `${member_id}`) {
					// 可撤回
				} else {
					retractx = {};
				}
			} else {
				retractx = {};
			}
			let list = [quote, hide, deletex];
			if (item.type === 'text' || item.type === 'text_quote') {
				list.unshift(copy);
			} else if (item.type === 'red_envelope') {
				list.unshift(thank);
			} else if (item.type === 'map') {
				list.unshift(map);
			} else if (item.type === 'emoji_pack') {
				list.unshift(add_emoji);
			}
			// 语音和红包不可转发
			if (item.type !== 'audio' && item.type !== 'red_envelope') {
				list.unshift(transmit);
			}
			// 红包不能撤回
			if (item.type != 'red_envelope') {
				list.push(retractx);
			}
			this.list = list;
		},
		close() {
			if (!this.show) return;
			this.show = false;
		},
		onClick(item) {
			switch (item.type) {
				case 'copy':
					// 复制
					uni.setClipboardData({
						data: this.item.payload.text,
						showToast: true,
						success: () => {}
					});
					break;
				case 'hide':
					// 删除/隐藏
					this.item.isHide = 1;
					break;
				case 'quote':
					// 引用
					this.quote();
					break;

				case 'retractx':
					// 撤回
					this.recallMessage();
					break;
				case 'thank':
					// 引用
					this.$emit('thank', this.item);
					break;
				case 'map':
					// 导航
					getLocation({
						name: this.item.payload.title,
						address: this.item.payload.address,
						latitude: this.item.payload.latitude,
						longitude: this.item.payload.longitude
					});
					break;
				case 'add_emoji':
					// 添加为表情包
					this.add_emoji();
					break;
				case 'delete':
					this.deleteMessage();
					break;
				case 'transmit':
					this.$emit('transmit', this.item);
					break;

				default:
					break;
			}
			this.close();
		},
		// 添加为表情包
		async add_emoji() {
			const { url, path = '' } = this.item.payload;
			const res = await this.API_collectEmoji(url, path);
			if (res) {
				uni.$emit('collectionEmoji', { url, path });
				uni.$off('collectionEmoji');
			}
		},
		// 引用
		quote() {
			this.$emit('quote', this.item);
		},
		// 撤回
		recallMessage() {
			console.log(this.item);
			uni.showModal({
				content: '撤回该条信息？',
				success: (res) => {
					if (res.confirm) {
						this.item.recalled = true
					} else if (res.cancel) {
					}
				}
			});
		},
		// 删除
		deleteMessage() {
			uni.showModal({
				content: '删除该条信息？不可恢复！',
				success: (res) => {
					if (res.confirm) {
						this.item.isHide = 1;
					} else if (res.cancel) {
					}
				}
			});
		},
		API_collectEmoji(url, path) {
			return new Promise((res) => {
				http.get(
					'Emoji/collectEmoji',
					{
						url,
						path
					},
					true,
					(r) => {
						if (r.data.code == 0) return res(r);
						return show(r.data.msg), res(false);
					}
				);
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.operate-box {
	position: fixed;
	z-index: 9;
	left: 122rpx;
	width: calc(100vw - 244rpx);
	transition: all 0.2s;
}
.operate_box {
	flex-direction: row-reverse;
}
.operate {
	position: relative;
	box-sizing: border-box;
	padding: 20rpx;
	border-radius: 14rpx;
	background-color: #4c4c4c;
	max-width: 440rpx;
	box-shadow: rgba(76, 76, 76, 0.3) 0rpx 2rpx 20rpx;
	flex-wrap: wrap;
	.operate-item-icon {
		width: 40rpx;
		height: 40rpx;
		margin-bottom: 6rpx;
	}
	.operate-item {
		width: 100rpx;
		height: 100rpx;
	}
}
.operate-str {
	position: fixed;
	width: 18rpx;
	height: 18rpx;
	border-radius: 2px;
	transform: rotate(45deg);
	background-color: #4c4c4c;
	transition: all 0.2s;
}
</style>
