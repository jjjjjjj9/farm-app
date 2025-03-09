<template>
	<view>
		<view class="bottom-operation-box" @tap.stop="onBottom">
			<!-- <view class="flex_r line-break" v-if="keyboardHeight"> -->
			<view class="flex_r line-break" v-show="keyboardHeight">
				<view class="icon_ text_28 color__ line-break-box" @click="lineBreak">
					<view class="icon_ line-break-icon">
						<image
							class="img"
							src="data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTAgMGgxMDI0djEwMjRIMHoiIGZpbGw9IiMyYzJjMmMiIGZpbGwtb3BhY2l0eT0iLjAxIi8+PHBhdGggZD0iTTY4Mi42NjcgMTI4YTI5OC42NjcgMjk4LjY2NyAwIDAgMSAxMC4yNCA1OTcuMTYzbC0xMC4yNC4xN2gtNTEyYTQyLjY2NyA0Mi42NjcgMCAwIDEtNC45OTItODUuMDM0bDQuOTkyLS4yOTloNTEyYTIxMy4zMzMgMjEzLjMzMyAwIDAgMCA5LjI1OC00MjYuNDUzbC05LjI1OC0uMjE0aC01MTJhNDIuNjY3IDQyLjY2NyAwIDAgMS00Ljk5Mi04NS4wMzRsNC45OTItLjI5OWg1MTJ6IiBmaWxsPSIjMmMyYzJjIi8+PHBhdGggZD0iTTI0Ny4xNjggNDYwLjUwMWE0Mi42NjcgNDIuNjY3IDAgMCAxIDYzLjg3MiA1Ni4zMmwtMy41NDEgNC4wMTEtMTYwIDE2MCAxNTguMTY1IDE0MC42M2E0Mi42NjcgNDIuNjY3IDAgMCAxIDYuODI3IDU1Ljk3OGwtMy4yODYgNC4yNjdhNDIuNjY3IDQyLjY2NyAwIDAgMS01NS45NzggNi44MjZsLTQuMjY3LTMuMzI4LTE5Mi0xNzAuNjY2YTQyLjY2NyA0Mi42NjcgMCAwIDEtNS4yNDgtNTguMTU1bDMuNDEzLTMuODgzIDE5Mi0xOTJ6IiBmaWxsPSIjMmMyYzJjIi8+PC9zdmc+"
							mode="aspectFill"
						></image>
					</view>
					换行
				</view>
			</view>
			<view class="flex_r bottom-operation">
				<!-- @click="onKeyboard" -->
				<view class="icon_ bottom-operation-icon">
					<image class="img" :src="isKeyboard ? a_b : a_b" mode="aspectFill"></image>
				</view>
				<view style="width: 10rpx"></view>
				<view class="flex_c_c flex1">
					<view class="bottom-operation-input" v-if="isKeyboard">
						<textarea
							class="input"
							auto-height="true"
							confirm-type="send"
							type="text"
							:focus="isFocus"
							:maxlength="-1"
							:adjust-position="false"
							v-model="text"
							confirm-hold
							:show-confirm-bar="false"
							@input="input"
							@confirm="sendingText"
							@focus="focus"
							@blur="isFocus = false"
							@keyboardheightchange="keyboardheightchange"
						/>
					</view>
					<!-- inputmode="none" -->
					<!-- <view class="icon_ text_32 bold_ bottom-operation-input" @touchend="touchend" @touchmove="touchmove" @touchstart="touchstart" v-else>
						<view>按住</view>
						<view style="width: 10rpx"></view>
						<view>说话</view>
					</view> -->

					<view class="icon_ text_26 quote" v-if="isQuote">
						<view class="flex1 quote-row">
							<view class="" v-if="quoteSource.type === 'image' || quoteSource.type === 'image_transmit'">
								<m-image :value="quoteSource"></m-image>
							</view>
							<view class="" v-else-if="quoteSource.type === 'audio'">
								<m-audio :value="quoteSource"></m-audio>
							</view>
							<view class="" v-else-if="quoteSource.type === 'text' || quoteSource.type === 'text_quote'">
								<m-text :value="quoteSource"></m-text>
							</view>
							<view class="" v-else>
								<m-other :value="quoteSource"></m-other>
							</view>
						</view>
						<view class="quote-icon" @click="cancelQuote">
							<image
								class="img"
								src="data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTg5NS4xIDUxMi40Yy0uNi0xMDIuMy00MS0xOTguNC0xMTMuOC0yNzAuNy03Mi44LTcyLjMtMTY5LjItMTEyLTI3MS41LTExMS45LTEwMi4zLjItMTk4LjMgNDAuMi0yNzAuMyAxMTIuN1MxMjguMiA0MTEuMyAxMjguOCA1MTMuNmMuNiAxMDIuMyA0MSAxOTguNCAxMTMuOCAyNzAuN3MxNjkuMiAxMTIgMjcxLjUgMTExLjhjMTAyLjQtLjEgMTk4LjUtNDAuMSAyNzAuNC0xMTIuNiA3Mi03Mi41IDExMS4zLTE2OC43IDExMC42LTI3MS4xek02MjkgNjY3LjhsLTExNi44LTExNi0xMTYgMTE2LjhjLTEwLjcgMTAuOC0yOCAxMC44LTM4LjguMS0xMC43LTEwLjctMTAuOC0yOC0uMS0zOC44bDExNS45LTExNi44LTExNi44LTExNS45Yy0xMC43LTEwLjctMTAuOC0yOC0uMS0zOC44IDEwLjctMTAuNyAyOC0xMC44IDM4LjgtLjFsMTE2LjggMTE1LjkgMTE1LjktMTE2LjhjMTAuNy0xMC43IDI4LTEwLjggMzguOC0uMSAxMC43IDEwLjcgMTAuOCAyOCAuMSAzOC44TDU1MC44IDUxMi45bDExNi44IDExNS45YzEwLjggMTAuNyAxMC44IDI4IC4xIDM4LjgtMTAuNiAxMC44LTI4IDEwLjgtMzguNy4yem0wIDAiIGRhdGEtc3BtLWFuY2hvci1pZD0iYTMxM3guc2VhcmNoX2luZGV4LjAuaTExLjFkYjQzYTgxVE1Sd1EyIiBjbGFzcz0ic2VsZWN0ZWQiIGZpbGw9IiNhMWExYTEiLz48L3N2Zz4="
								mode="aspectFill"
							></image>
						</view>
					</view>
				</view>
				<view style="width: 10rpx"></view>
				<view class="icon_ bottom-operation-icon" @click="tapEmoji">
					<image class="img" :src="b" mode="aspectFill"></image>
				</view>
				<!-- <view class="icon_ bottom-operation-icon" @click="tapMore">
					<image class="img" :src="c" mode="aspectFill"></image>
				</view> -->
			</view>
			<view>
				<emoji v-model="isEmoji" @onEmoji="onEmoji" @deleteFn="deleteFn" @sendingText="sendingText" @sendingEmojiPack="sendingEmojiPack"></emoji>
			</view>
			<view>
				<more v-model="isMore" @onMore="onMore"></more>
			</view>
			<!-- 键盘高度 -->
			<view class="keyboard" :style="{ height: keyboardHeight + 'px' }"></view>
			<view v-if="keyboardHeight === 0">
				<m-bottom-paceholder></m-bottom-paceholder>
			</view>
			<!-- 语音输入 -->
			<m-recorder v-model="isRecorder" :isCancel="isCancel" @recorderTop="recorderTop" @touchend="touchend"></m-recorder>
		</view>
		<!-- <member-selection-loading title="选择提醒的人" ref="memberSelectionLoadingRef" :group_id="to.id" @itemclick="itemclick"></member-selection-loading> -->
	</view>
</template>

<script>
// import { 自己的信息 } from '@/TEST/index';

import { show, to as tofn, throttle, vibrateShortFn } from '@/utils/index.js';
import emoji from './emoji.vue';
import more from './more.vue';
import mRecorder from './m-recorder.vue';
// import memberSelectionLoading from '../../../components/memberSelectionLoading/index.vue';
import mText from '../item/quoteType/m-text.vue';
import mImage from '../item/quoteType/m-image.vue';
import mAudio from '../item/quoteType/m-audio.vue';
import mOther from '../item/quoteType/m-other.vue';

const recorderManager = uni.getRecorderManager();
//录音时长
let startTime = 0;
//
let inputValue = '';
let getSelectedTextRangeSetInterval = null;
let cursor = 0; //输入框光标
export default {
	components: {
		emoji,
		more,
		mRecorder,
		// memberSelection,
		// memberSelectionLoading,
		mText,
		mImage,
		mAudio,
		mOther
	},
	props: {
		to: {
			type: Object,
			default: {}
		},
		userList: {
			type: Array,
			default: () => {
				return [];
			}
		},
		isPrivate: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			a: 'data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkYXRhLXNwbS1hbmNob3ItaWQ9ImEzMTN4LmNvbGxlY3Rpb25zX2RldGFpbC4wLmkxLjQ0MjMzYTgxRURKTEhBIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTUxMyA5NTkuNWMtNTguMSAwLTExNC44LTExLTE2OC40LTMyLjgtNTUuNS0yMi41LTEwNS4zLTU1LjYtMTQ4LjEtOTguMy00Mi43LTQyLjctNzUuOC05Mi41LTk4LjMtMTQ4Qzc2LjUgNjI2LjggNjUuNSA1NzAuMSA2NS41IDUxMmMwLTU4LjEgMTEtMTE0LjggMzIuOC0xNjguNCAyMi41LTU1LjUgNTUuNi0xMDUuMyA5OC4zLTE0OCA0Mi43LTQyLjcgOTIuNS03NS44IDE0OC05OC4zQzM5OC4yIDc1LjUgNDU0LjkgNjQuNSA1MTMgNjQuNXMxMTQuOCAxMSAxNjguNCAzMi44YzU1LjUgMjIuNSAxMDUuMyA1NS42IDE0OCA5OC4zIDQyLjcgNDIuNyA3NS44IDkyLjUgOTguMyAxNDggMjEuNyA1My42IDMyLjggMTEwLjMgMzIuOCAxNjguNCAwIDU4LjEtMTEgMTE0LjgtMzIuOCAxNjguNC0yMi41IDU1LjUtNTUuNiAxMDUuMy05OC4zIDE0OC00Mi43IDQyLjctOTIuNSA3NS44LTE0OCA5OC4zLTUzLjcgMjEuOC0xMTAuMyAzMi44LTE2OC40IDMyLjh6bTAtODM5Yy01MC45IDAtMTAwLjQgOS42LTE0Ny4zIDI4LjctNDguNSAxOS43LTkyLjEgNDguNi0xMjkuNSA4Ni0zNy40IDM3LjQtNjYuMyA4MC45LTg2IDEyOS41LTE5IDQ2LjktMjguNyA5Ni41LTI4LjcgMTQ3LjMgMCA1MC45IDkuNiAxMDAuNCAyOC43IDE0Ny4zIDE5LjcgNDguNSA0OC42IDkyLjEgODYgMTI5LjUgMzcuNCAzNy40IDgwLjkgNjYuMyAxMjkuNSA4NiA0Ni45IDE5IDk2LjUgMjguNyAxNDcuMyAyOC43IDUwLjkgMCAxMDAuNC05LjYgMTQ3LjMtMjguNyA0OC41LTE5LjcgOTIuMS00OC42IDEyOS41LTg2IDM3LjQtMzcuNCA2Ni4zLTgxIDg2LTEyOS41IDE5LTQ2LjkgMjguNy05Ni41IDI4LjctMTQ3LjNzLTkuNi0xMDAuNC0yOC43LTE0Ny4zYy0xOS43LTQ4LjUtNDguNi05Mi4xLTg2LTEyOS41LTM3LjQtMzcuNC04MC45LTY2LjMtMTI5LjUtODYtNDYuOS0xOS05Ni41LTI4LjctMTQ3LjMtMjguN3oiIGRhdGEtc3BtLWFuY2hvci1pZD0iYTMxM3guY29sbGVjdGlvbnNfZGV0YWlsLjAuaTAuNDQyMzNhODFFREpMSEEiIGNsYXNzPSJzZWxlY3RlZCIvPjxwYXRoIGQ9Ik01NjkuMSA3NjRjLTEwLjUtMTAuMi0xMS40LTI2LjctMi4xLTM4IDQ5LjgtNjAuMSA3Ny0xMzUuMiA3Ny0yMTQgMC03OC44LTI3LjItMTUzLjktNzctMjE0LTkuMy0xMS4zLTguNS0yNy44IDIuMS0zOCAxMS43LTExLjMgMzAuNi0xMC4zIDQxIDIuMkM2NjguMyAzMzIuNCA3MDAgNDIwIDcwMCA1MTJzLTMxLjcgMTc5LjYtODkuOSAyNDkuOGMtMTAuNCAxMi41LTI5LjMgMTMuNi00MSAyLjJ6TTQ1MC43IDY0OS43Yy0xMC05LjctMTEuNS0yNS4zLTMuMy0zNi41IDIxLjMtMjkuMiAzMi44LTY0LjQgMzIuOC0xMDEuMnMtMTEuNS03MS45LTMyLjgtMTAxLjJjLTguMi0xMS4yLTYuNy0yNi44IDMuMy0zNi41IDEyLjItMTEuOCAzMi4xLTEwLjEgNDIgMy42IDI4LjMgMzguOCA0My41IDg1LjQgNDMuNSAxMzQuMSAwIDQ4LjctMTUuMyA5NS4zLTQzLjUgMTM0LjEtMTAgMTMuNy0yOS44IDE1LjQtNDIgMy42em0tMTAxLjQtOTcuOWMtNy44LTcuNS0xMC40LTE4LjctNy4xLTI5IDEuMS0zLjQgMS43LTcuMSAxLjctMTAuOCAwLTMuNy0uNi03LjMtMS43LTEwLjgtMy4zLTEwLjMtLjYtMjEuNSA3LjEtMjkgMTQuOS0xNC40IDM5LjctOC4yIDQ2LjEgMTEuNCAyLjkgOSA0LjQgMTguNiA0LjQgMjguM3MtMS41IDE5LjMtNC40IDI4LjNjLTYuNCAxOS44LTMxLjIgMjUuOS00Ni4xIDExLjZ6IiBkYXRhLXNwbS1hbmNob3ItaWQ9ImEzMTN4LmNvbGxlY3Rpb25zX2RldGFpbC4wLmk2LjQ0MjMzYTgxRURKTEhBIiBjbGFzcz0ic2VsZWN0ZWQiLz48L3N2Zz4=',
			a_b: 'data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTUxMS43IDk2MC42Yy01OC4xIDAtMTE0LjgtMTEtMTY4LjQtMzIuOC01NS41LTIyLjUtMTA1LjMtNTUuNi0xNDgtOTguMy00Mi43LTQyLjctNzUuOC05Mi41LTk4LjMtMTQ4LTIxLjctNTMuNi0zMi44LTExMC4zLTMyLjgtMTY4LjQgMC01OC4xIDExLTExNC44IDMyLjgtMTY4LjQgMjIuNS01NS41IDU1LjYtMTA1LjMgOTguMy0xNDggMzkuNC0zOS40IDg0LjYtNzAuNCAxMzQuNy05Mi43IDE0LjgtNi42IDMyLjEuOCAzNy42IDE2IDUuMSAxMy45LTEuNiAyOS4zLTE1LjEgMzUuMy00My44IDE5LjQtODMuMyA0Ni42LTExNy43IDgxLTM3LjQgMzcuNC02Ni4zIDgwLjktODYgMTI5LjUtMTkgNDYuOS0yOC43IDk2LjUtMjguNyAxNDcuM3M5LjYgMTAwLjQgMjguNyAxNDcuM2MxOS43IDQ4LjUgNDguNiA5Mi4xIDg2IDEyOS41IDM3LjQgMzcuNCA4MC45IDY2LjMgMTI5LjUgODYgNDYuOSAxOSA5Ni41IDI4LjcgMTQ3LjMgMjguNyA1MC45IDAgMTAwLjQtOS42IDE0Ny4zLTI4LjcgNDguNS0xOS43IDkyLjEtNDguNiAxMjkuNS04NiAzNy40LTM3LjQgNjYuMy04MSA4Ni0xMjkuNSAxOS00Ni45IDI4LjctOTYuNSAyOC43LTE0Ny4zcy05LjYtMTAwLjQtMjguNy0xNDcuM2MtMTkuNy00OC41LTQ4LjYtOTIuMS04Ni0xMjkuNS0zNC41LTM0LjUtNzQuMS02MS43LTExOC04MS4xLTEzLjUtNi0yMC4yLTIxLjQtMTUuMS0zNS4zIDUuNi0xNS4yIDIyLjgtMjIuNiAzNy42LTE2IDUwLjMgMjIuMiA5NS42IDUzLjQgMTM1IDkyLjggNDIuNyA0Mi43IDc1LjggOTIuNSA5OC4zIDE0OEM5NDcuOSAzOTguMyA5NTkgNDU1IDk1OSA1MTMuMWMwIDU4LjEtMTEgMTE0LjgtMzIuOCAxNjguNC0yMi41IDU1LjUtNTUuNiAxMDUuMy05OC4zIDE0OC00Mi43IDQyLjctOTIuNSA3NS44LTE0OC4xIDk4LjMtNTMuNCAyMS44LTExMCAzMi44LTE2OC4xIDMyLjh6Ii8+PHBhdGggZD0iTTc2OC4xIDM1OC41Yy0xNS41IDAtMjggMTIuNS0yOCAyOHYyMjUuMkgyODMuM2MtMTUuNSAwLTI4IDEyLjUtMjggMjhzMTIuNSAyOCAyOCAyOGg0ODQuOHYtLjFjMTUuNi0xIDI4LTE0IDI4LTI5LjlWMzg2LjVjMC0xNS40LTEyLjYtMjgtMjgtMjh6Ii8+PHBhdGggZD0iTTI4My4zIDU1MS45aDEyNS45YzE1LjUgMCAyOC0xMi41IDI4LTI4cy0xMi41LTI4LTI4LTI4SDI4My4zYy0xNS41IDAtMjggMTIuNS0yOCAyOHMxMi41IDI4IDI4IDI4em0yMjEuMS0yOGMwIDE1LjUgMTIuNSAyOCAyOCAyOGgxMjUuOWMxNS41IDAgMjgtMTIuNSAyOC0yOHMtMTIuNS0yOC0yOC0yOEg1MzIuNGMtMTUuNCAwLTI4IDEyLjYtMjggMjh6bS0yMjEuMS04Ni43SDM0MGMxNS41IDAgMjgtMTIuNSAyOC0yOHMtMTIuNS0yOC0yOC0yOGgtNTYuN2MtMTUuNSAwLTI4IDEyLjUtMjggMjggMCAxNS40IDEyLjUgMjggMjggMjh6bTMxOC40IDBoNTYuN2MxNS41IDAgMjgtMTIuNSAyOC0yOHMtMTIuNS0yOC0yOC0yOGgtNTYuN2MtMTUuNSAwLTI4IDEyLjUtMjggMjggMCAxNS40IDEyLjUgMjggMjggMjh6bS0xNTkuMiAwaDU2LjdjMTUuNSAwIDI4LTEyLjUgMjgtMjhzLTEyLjUtMjgtMjgtMjhoLTU2LjdjLTE1LjUgMC0yOCAxMi41LTI4IDI4IDAgMTUuNCAxMi41IDI4IDI4IDI4ek01MTguOCA2N2w4Ni4xIDg4LjNjNi4yIDYuMyAxLjcgMTctNy4yIDE3SDQyNS41Yy04LjggMC0xMy4zLTEwLjYtNy4yLTE3TDUwNC41IDY3YzMuOS00IDEwLjQtNCAxNC4zIDB6Ii8+PC9zdmc+',
			b: 'data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTUxMyA5NTljLTYwLjQgMC0xMTguOS0xMS44LTE3NC4xLTM1LjItNTMuMy0yMi41LTEwMS4xLTU0LjgtMTQyLjEtOTUuOC00MS4xLTQxLjEtNzMuMy04OC45LTk1LjgtMTQyLjEtMjMuMy01NS4yLTM1LjItMTEzLjctMzUuMi0xNzQuMVM3Ny42IDM5Mi45IDEwMSAzMzcuN2MyMi41LTUzLjMgNTQuOC0xMDEuMSA5NS44LTE0Mi4xIDQxLjEtNDEuMSA4OC45LTczLjMgMTQyLjEtOTUuOEMzOTQuMSA3Ni40IDQ1Mi42IDY0LjYgNTEzIDY0LjZzMTE4LjkgMTEuOCAxNzQuMSAzNS4yYzUzLjMgMjIuNSAxMDEuMSA1NC44IDE0Mi4xIDk1LjggNDEuMSA0MS4xIDczLjMgODguOSA5NS44IDE0Mi4xIDIzLjMgNTUuMiAzNS4yIDExMy43IDM1LjIgMTc0LjFTOTQ4LjQgNjMwLjcgOTI1IDY4NS45QzkwMi41IDczOS4xIDg3MC4zIDc4NyA4MjkuMiA4MjhjLTQxLjEgNDEuMS04OC45IDczLjMtMTQyLjEgOTUuOEM2MzEuOSA5NDcuMiA1NzMuNCA5NTkgNTEzIDk1OXptMC04MzguNGMtNTIuOCAwLTEwNC4xIDEwLjMtMTUyLjMgMzAuNy00Ni42IDE5LjctODguNCA0Ny45LTEyNC40IDgzLjktMzUuOSAzNS45LTY0LjIgNzcuOC04My45IDEyNC40LTIwLjQgNDguMi0zMC43IDk5LjQtMzAuNyAxNTIuM1MxMzIgNjE2IDE1Mi40IDY2NC4yYzE5LjcgNDYuNiA0Ny45IDg4LjQgODMuOSAxMjQuNCAzNS45IDM1LjkgNzcuOCA2NC4yIDEyNC40IDgzLjlDNDA4LjkgODkyLjcgNDYwLjIgOTAzIDUxMyA5MDNzMTA0LjEtMTAuMyAxNTIuMy0zMC43YzQ2LjYtMTkuNyA4OC40LTQ3LjkgMTI0LjQtODMuOSAzNS45LTM1LjkgNjQuMi03Ny44IDgzLjktMTI0LjQgMjAuNC00OC4yIDMwLjctOTkuNCAzMC43LTE1Mi4zUzg5NCA0MDcuNiA4NzMuNiAzNTkuNGMtMTkuNy00Ni42LTQ3LjktODguNC04My45LTEyNC40LTM1LjktMzUuOS03Ny44LTY0LjItMTI0LjQtODMuOS00OC4yLTIwLjItOTkuNS0zMC41LTE1Mi4zLTMwLjV6IiBkYXRhLXNwbS1hbmNob3ItaWQ9ImEzMTN4LmNvbGxlY3Rpb25zX2RldGFpbC4wLmkxMS40NDIzM2E4MUVESkxIQSIgY2xhc3M9InNlbGVjdGVkIi8+PHBhdGggZD0iTTU4My45IDM5OC4zYTQ2LjcgNDYuNyAwIDEgMCA5My40IDAgNDYuNyA0Ni43IDAgMSAwLTkzLjQgMHpNMzQ3IDM5OC4zYTQ2LjcgNDYuNyAwIDEgMCA5My40IDAgNDYuNyA0Ni43IDAgMSAwLTkzLjQgMHpNNTEzIDc5MGMtNTUuMiAwLTExMC0xOC40LTE1NC4zLTUxLjgtNDIuNC0zMS45LTcyLjUtNzQuOS04NC45LTEyMC45LTQuNy0xNy40LTEtMzUuNiAxMC01MCAxMS4xLTE0LjUgMjcuOS0yMi44IDQ2LjEtMjIuOGwzNjYuMy0uMWMxOC4yIDAgMzUgOC4zIDQ2LjEgMjIuNyAxMSAxNC40IDE0LjcgMzIuNiAxMCA1MC0xMi4zIDQ2LTQyLjUgODktODQuOSAxMjAuOS00NC40IDMzLjYtOTkuMiA1Mi0xNTQuNCA1MnptMTgzLjEtMTg5LjZsLTM2Ni4zLjFjLS4zIDAtMSAwLTEuNy44LS41LjctLjQgMS4yLS4zIDEuNCA5IDMzLjUgMzIuNSA2Ni41IDY0LjUgOTAuNkM0MjcuMSA3MTkuNiA0NjkuOSA3MzQgNTEzIDczNGM0My4xIDAgODUuOS0xNC40IDEyMC43LTQwLjYgMzItMjQuMSA1NS41LTU3LjIgNjQuNS05MC43LjEtLjMuMi0uNy0uMy0xLjQtLjctLjktMS41LS45LTEuOC0uOXoiLz48L3N2Zz4=',
			c: 'data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTUxMS4zIDk1OS43Yy02MC40IDAtMTE5LTExLjgtMTc0LjItMzUuMi01My4zLTIyLjUtMTAxLjEtNTQuOC0xNDIuMi05NS45LTQxLjEtNDEuMS03My40LTg4LjktOTUuOS0xNDIuMi0yMy4zLTU1LjItMzUuMi0xMTMuOC0zNS4yLTE3NC4yUzc1LjYgMzkzLjEgOTkgMzM4YzIyLjUtNTMuMyA1NC44LTEwMS4xIDk1LjktMTQyLjIgNDEuMS00MS4xIDg4LjktNzMuNCAxNDIuMi05NS45IDU1LjItMjMuMyAxMTMuOC0zNS4yIDE3NC4yLTM1LjIgNjAuNCAwIDExOSAxMS44IDE3NC4yIDM1LjIgNTMuMyAyMi41IDEwMS4xIDU0LjggMTQyLjIgOTUuOSA0MS4xIDQxLjEgNzMuNCA4OC45IDk1LjkgMTQyLjIgMjMuMyA1NS4yIDM1LjIgMTEzLjggMzUuMiAxNzQuMnMtMTEuOCAxMTktMzUuMiAxNzQuMmMtMjIuNSA1My4zLTU0LjggMTAxLjEtOTUuOSAxNDIuMi00MS4xIDQxLjEtODguOSA3My40LTE0Mi4yIDk1LjktNTUuMiAyMy4zLTExMy44IDM1LjItMTc0LjIgMzUuMnptMC04MzljLTUyLjkgMC0xMDQuMSAxMC4zLTE1Mi40IDMwLjgtNDYuNiAxOS43LTg4LjUgNDcuOS0xMjQuNSA4My45LTM2IDM2LTY0LjIgNzcuOC04My45IDEyNC41LTIwLjQgNDguMi0zMC44IDk5LjUtMzAuOCAxNTIuNHMxMC4zIDEwNC4xIDMwLjggMTUyLjRjMTkuNyA0Ni42IDQ3LjkgODguNSA4My45IDEyNC41IDM2IDM2IDc3LjggNjQuMiAxMjQuNSA4My45IDQ4LjIgMjAuNCA5OS41IDMwLjggMTUyLjQgMzAuOCA1Mi45IDAgMTA0LjEtMTAuMyAxNTIuNC0zMC44IDQ2LjYtMTkuNyA4OC41LTQ3LjkgMTI0LjUtODMuOXM2NC4yLTc3LjggODMuOS0xMjQuNWMyMC40LTQ4LjIgMzAuOC05OS41IDMwLjgtMTUyLjRTODkyLjQgNDA4IDg3MiAzNTkuOGMtMTkuNy00Ni42LTQ3LjktODguNS04My45LTEyNC41cy03Ny44LTY0LjItMTI0LjUtODMuOWMtNDguMi0yMC40LTk5LjUtMzAuNy0xNTIuMy0zMC43eiIvPjxwYXRoIGQ9Ik03MzcuMyA0ODQuMmgtMTk4di0xOThjMC0xNS41LTEyLjUtMjgtMjgtMjhzLTI4IDEyLjUtMjggMjh2MTk4aC0xOThjLTE1LjUgMC0yOCAxMi41LTI4IDI4czEyLjUgMjggMjggMjhoMTk4djE5OGMwIDE1LjUgMTIuNSAyOCAyOCAyOHMyOC0xMi41IDI4LTI4di0xOThoMTk4YzE1LjUgMCAyOC0xMi41IDI4LTI4cy0xMi42LTI4LTI4LTI4eiIvPjwvc3ZnPg==',
			isFocus: false, //键盘焦点
			isKeyboard: true,
			isEmoji: false,
			isMore: false,
			isRecorder: false,
			isCancel: false, //是否滑动到取消
			text: '',
			keyboardHeight: 0,
			isQuote: false, //是否引用
			quoteSource: {} //引用的源
		};
	},
	created() {
		this.initRecorderListeners();
		// 监听设置群公告
		uni.$off('getNoticeSendMessage', this.sendMessage);
		uni.$on('getNoticeSendMessage', this.sendMessage);

		// 监听修改群明
		uni.$off('getGroupNameMessage', this.sendMessage);
		uni.$on('getGroupNameMessage', this.sendMessage);
	},
	beforeDestroy() {
		uni.$off('getNoticeSendMessage', this.sendMessage);
		uni.$off('getGroupNameMessage', this.sendMessage);
		cursor = 0;
		clearInterval(getSelectedTextRangeSetInterval);
	},
	methods: {
		setCursor() {
			getSelectedTextRangeSetInterval = setInterval(() => {
				uni.getSelectedTextRange({
					success: (res) => {
						cursor = res.start;
					},
					fail: () => {
						clearInterval(getSelectedTextRangeSetInterval);
					}
				});
			}, 800);
		},
		// 滚动到底部
		backToBottom() {
			this.$emit('backToBottom');
		},
		// 关闭全部弹出/输入框/表情包
		closeAll() {
			this.isMore = false;
			this.isEmoji = false;
			this.isFocus = false;
		},

		onBottom() {
			this.$emit('onBottom');
		},
		// 重新编辑
		recalledEdit(item) {
			this.text = item.payload.text;
			this.$nextTick(() => {
				this.isFocus = true;
			});
		},
		// 关闭
		close() {
			this.isMore = false;
			this.isEmoji = false;
		},
		// 切换语音输入
		onKeyboard() {
			this.isKeyboard = !this.isKeyboard;
			this.isMore = false;
			this.isEmoji = false;
		},
		keyboardheightchange(e) {
			if (e.detail.duration > 0) {
				this.backToBottom();
			}
			// #ifdef APP || H5
			this.keyboardHeight = e.detail.height;
			this.isMore = false;
			this.isEmoji = false;
			// #endif

			// #ifdef MP
			if (e.detail.duration > 0) {
				throttle(() => {
					this.keyboardHeight = e.detail.height;
					this.isMore = false;
					this.isEmoji = false;
				}, 300);
			}
			// #endif
		},
		tapEmoji() {
			this.backToBottom();
			this.isEmoji = !this.isEmoji;
			if (this.isEmoji) {
				this.isKeyboard = true;
			}
			this.isMore = false;
			// #ifdef H5
			this.keyboardHeight = 0;
			// #endif
		},
		tapMore() {
			this.backToBottom();
			this.isMore = !this.isMore;
			this.isEmoji = false;
			// #ifdef H5
			this.keyboardHeight = 0;
			// #endif
		},
		onEmoji(key) {
			const text = `${this.text.slice(0, cursor)}${key}${this.text.slice(cursor)}`;
			this.text = text;
		},
		// ===========================
		// 获取焦点
		focus(e) {
			this.$emit('focus');
			this.isFocus = true;
			this.isEmoji = false;
			this.isMore = false;
			// #ifdef H5
			this.keyboardHeight = 300;
			this.backToBottom();
			// #endif
			clearInterval(getSelectedTextRangeSetInterval);
			this.setCursor();
		},
		// 监听输入
		input() {
			if (inputValue.length > this.text.length) {
			} else {
				const str = this.text.charAt(this.text.length - 1);
				if (str === '@') {
					if (this.isFocus === false) return;
					this.$refs.memberSelectionLoadingRef.open();
					this.$nextTick(() => {
						this.isFocus = false;
					});
				}
			}
			inputValue = this.text;
		},
		// 插入换行符合
		lineBreak() {
			console.log('回车');
			console.log(cursor);
			const text = `${this.text.slice(0, cursor)}\n${this.text.slice(cursor)}`;
			this.text = text;
			// this.text = `${this.text}\r\n`;
			this.$nextTick(() => {
				this.isFocus = true;
			});
		},
		// 输入@某个成员
		itemclick(item) {
			if (item) {
				this.text = `${this.text}${item.name} `;
			}
			this.$nextTick(() => {
				this.isFocus = true;
			});
		},
		// 删除表情
		deleteFn() {
			const str = this.text.charAt(this.text.length - 1);
			if (str === ']') {
				let metaChars = /\[.*?(\u4e00*\u597d*)\]/g;
				let xstr = '';
				this.text.replace(metaChars, (match) => {
					xstr = match;
				});
				var text = this.text;
				function del(str) {
					return text.slice(0, text.length - str.length);
				}
				this.text = del(xstr);
			} else {
				this.text = this.text.substring(0, this.text.length - 1);
			}
		},
		// 引用
		quote(item) {
			// 删除嵌套引用
			const itemx = JSON.parse(JSON.stringify(item));
			itemx.payload['quoteSource'] = {};
			this.isQuote = true;
			this.quoteSource = itemx;
			this.$nextTick(() => {
				this.isFocus = true;
			});
		},
		//谢谢红包
		thank(item) {
			this.text = '[彩带][玫瑰]谢谢红包！';
			this.sendingText();
		},
		//长按@某人
		mention(item) {
			this.text = `${this.text}@${item.senderData.name} `;
			this.$nextTick(() => {
				setTimeout(() => {
					this.isFocus = true;
				}, 500);
			});
			try {
				vibrateShortFn();
			} catch (e) {
				//TODO handle the exception
			}
		},
		cancelQuote() {
			this.isQuote = false;
		},

		// 录音相关===============
		recorderTop(e) {
			this.recorderTopValue = e?.top;
		},
		initRecorderListeners() {
			// 监听录音开始
			recorderManager.onStart(() => {
				// console.log('开始录音');
				startTime = Date.now();
			});
			//录音结束后，发送
			recorderManager.onStop((res) => {
				this.isRecorder = false;
				if (this.isCancel) return console.log('取消发送'); //取消发送
				let endTime = Date.now();
				let duration = endTime - startTime;
				if (duration < 1000) return show('录音时间太短', 1000, 'error');
				res.duration = duration;
				// 创建信息
				this.sendingRecorder(res);
			});
			// 监听录音报错
			recorderManager.onError((res) => {
				this.isRecorder = false;
				recorderManager.stop();
				show('请检查麦克风权限');
			});
		},
		// 按下
		touchstart() {
			this.isRecorder = true;
			this.isCancel = false;
			try {
				recorderManager.start();
			} catch (e) {
				show('H5不支持');
			}
		},
		// 拖拽中
		touchmove(e) {
			let touch = e.touches[0]; //滑动过程中，手指滑动的坐标信息 返回的是Objcet对象
			if (touch.clientY <= this.recorderTopValue) {
				// 取消发送
				this.isCancel = true;
			} else {
				this.isCancel = false;
			}
		},
		// 松手
		touchend() {
			try {
				recorderManager.stop();
			} catch (e) {
				console.log('e:', e);
			}
			this.isRecorder = false;
		},
		// ===================
		// 更多操作相关===============
		onMore(item) {
			switch (item.type) {
				// 拍摄
				case 'shot':
					this.openShot();
					break;
				case 'img':
					this.sendImageMessage();
					break;
				case 'video':
					this.sendVideoMessage();
					break;
				case 'red_envelope':
					// 发红包
					uni.$off('send_red_envelope', this.sendMessage);
					uni.$on('send_red_envelope', this.sendMessage);

					// 是否是单聊
					if (this.isPrivate) {
						tofn('/pagesGoEasy/envelope_sending/index-private', { ...this.to });
					} else {
						tofn('/pagesGoEasy/envelope_sending/index', { ...this.to });
					}
					break;
				case 'mutualism':
					// 蝌蚪互转
					tofn('/pagesThree/tadpoleChange/index?type=1');
					break;
				case 'map':
					// 位置
					uni.chooseLocation({
						success: async (res) => {
							console.log(res);
							uni.showLoading({
								title: '发送中'
							});
							if (res2) {
								this.createCustomMessageMap(res, 'http://xxxxxxxx/map/staticMap?location=116.459044,39.918732&size=300*170');
							}
							uni.hideLoading();
						},
						fail(e) {
							console.log(e);
						}
					});
					break;
				default:
					break;
			}
		},
		openShot() {
			show('这个用的是原生插件，Html5App-CameraView');
			return;

			const plug = uni.requireNativePlugin('Html5App-CameraView');
			plug.open({ setMaxduration: 30, SpeedColor: '#05c160', ratio: '9/16' }, (retult) => {
				const { type, mp4 = '', duration = '', size = '', image } = retult;
				if (type == 'video') {
					const file = {
						errMsg: 'chooseVideo:ok',
						tempFilePath: mp4,
						size: Number(size) * 1000,
						duration: duration, //视频时间
						width: 360,
						height: 640
					};
					this.createVideoMessage(file);
				} else if (type == 'image') {
					this.createImageMessage({
						size: Number(size) * 1000,
						path: image
					});
				}
				//用户取消拍摄
				if (retult.retult == 'cancel') {
				}
			});
		},
		// =====================
		// 创建发送输入框内容
		sendingText() {
			if (this.text === '')
				return uni.showModal({
					showCancel: false,
					content: '不能发送空白信息',
					success: function (res) {}
				});
			let body = this.text;
			if (this.text.length >= 50) {
				body = this.text.substring(0, 30) + '...';
			}
			if (this.isQuote) {
				this.createCustomMessageText(body);
				return;
			}

			this.sendMessage({
				payload: {
					text: this.text
				},
				type: 'text'
			});

			this.text = '';
		},

		// 发送位置信息
		createCustomMessageMap(res, image) {
			const { latitude, longitude, address, name } = res;
			this.sendMessage({
				payload: {
					latitude,
					longitude,
					title: name,
					address,
					image //使用高德api生成图片
				},

				type: 'map'
			});
		},

		// 引用并发送文本
		createCustomMessageText(body) {
			this.sendMessage({
				payload: {
					text: this.text,
					//引用源
					quoteSource: {
						...this.quoteSource
					}
				},
				type: 'text_quote'
			});

			this.text = '';
		},

		// 创建发送照片内容
		sendImageMessage() {
			uni.chooseImage({
				count: 9,
				success: async (res) => {
					res.tempFiles.forEach((file) => {
						console.log(file);
						this.createImageMessage(file);
					});
				}
			});
		},
		// 创建发送照片内容
		createImageMessage(file) {
			this.sendMessage({
				payload: {
					contentType: 'image/png',
					name: 'uni-image.png',
					size: 82942,
					url: file.path,
					width: 2732,
					height: 2732,
					thumbnail: file.path
				},
				type: 'image'
			});
		},
		// 创建发送视频内容
		sendVideoMessage() {
			uni.chooseVideo({
				success: async (res) => {
					console.log(res);
					this.createVideoMessage(res);
				}
			});
		},
		createVideoMessage(file) {
			this.sendMessage({
				payload: {
					video: {
						name: '3003009356267921_uni-video.mp4',
						url: file.tempFilePath,
						width: 640,
						height: 352,
						contentType: 'video/mp4',
						size: 501774,
						duration: 8.32
					},
					thumbnail: {
						name: 'uni-thumbnail.jpg',
						url: '封面路径',
						width: 364,
						height: 200,
						contentType: 'image/jpg'
					}
				},
				type: 'video'
			});
		},
		// 创建语音内容
		sendingRecorder(file) {
			this.sendMessage({
				payload: {
					contentType: 'audio/mp3',
					name: 'uni-audio.mp3',
					size: 2357,
					url: file.tempFilePath,
					duration: 1.148
				},
				type: 'audio'
			});
		},

		// 创建自定义表情包
		sendingEmojiPack(e) {
			this.sendMessage({
				payload: {
					ext: e.ext,
					url: e.url,
					path: e.path,
					text: e.text || '[表情包]'
				},
				type: 'emoji_pack'
			});
		},

		// 最终提交发送
		sendMessage({ payload, type }) {
			const message = {
				payload: payload,
				timestamp: Date.now(),
				type: type,
				recalled: false,
				status: 'success',
				isHide: 0
			};
			this.$emit('sendMessage', message);
			this.isQuote = false;
			this.quoteSource = {};
		}
	}
};
</script>

<style lang="scss" scoped>
.bottom-operation-box {
	position: relative;
	z-index: 9999;
	width: 100vw;
	background-color: #f6f6f6;
	.line-break {
		position: absolute;
		z-index: 99;
		left: 0;
		top: -58rpx;
		width: 100%;
		height: 60rpx;
		flex-direction: row-reverse;
		.line-break-box {
			position: relative;
			width: 160rpx;
			height: 100%;
			color: #2c2c2c;
			border-radius: 20rpx 0 0 0;
			background-color: #f6f6f6;
			.line-break-icon {
				width: 36rpx;
				height: 36rpx;
				margin-right: 10rpx;
			}
		}
		.line-break-box::before {
			position: absolute;
			left: -60rpx;
			top: 0;
			content: '';
			width: 60rpx;
			height: 60rpx;
			display: block;
			text-align: center;
			background-image: radial-gradient(240rpx at 2rpx 0px, rgba(168, 195, 59, 0) 60rpx, #f6f6f6 60rpx);
		}
	}
}
.bottom-operation {
	box-sizing: border-box;
	padding: 14rpx 10rpx;
	width: 100%;
	align-items: flex-end;
	.bottom-operation-icon {
		width: 80rpx;
		height: 80rpx;
		.img {
			width: 80%;
			height: 80%;
		}
	}
	.bottom-operation-input {
		width: 100%;
		box-sizing: border-box;
		padding: 10rpx 14rpx;
		min-height: 84rpx;
		max-height: 300rpx;
		overflow: auto;
		border-radius: 10rpx;
		background-color: #fff;
		.input {
			width: 100%;
			margin: 10rpx 0;
		}
	}
}
.keyboard {
	transition: all 0.2s;
}

// 引用
.quote {
	box-sizing: border-box;
	padding: 0 20rpx;
	width: 100%;
	height: 50rpx;
	margin-top: 8rpx;
	border-radius: 10rpx;
	background-color: #eaeaea;
	color: #686868;
	.quote-row {
		width: 200rpx;
		text-overflow: ellipsis;
		overflow: auto;
		white-space: nowrap;
		::v-deep .quote-box {
			width: 100%;
			box-sizing: border-box;
			padding: 0;
			border-radius: 0;
			margin-top: 0;
			background-color: #eaeaea;
			color: #6b6b6b;
			.quote-name {
			}

			.m-image {
				border-radius: 6rpx;
				overflow: hidden;
				.img {
					width: 40rpx;
					height: 40rpx;
					border-radius: 6rpx;
					overflow: hidden;
					background-color: #fff;
				}
			}
		}
	}

	.quote-icon {
		width: 40rpx;
		height: 40rpx;
	}
}
</style>