import store from '@/store/index.js';
export const getStatusBar = () => {
	return new Promise((success, fail) => {
		uni.getSystemInfo({
			success: (e) => {
				// 获取手机状态栏高度
				let statusBar = e.statusBarHeight
				let customBar
				// #ifndef MP
				customBar = statusBar + (e.platform == 'android' ? 50 : 45)
				// #endif
				// #ifdef MP-WEIXIN
				// 获取胶囊按钮的布局位置信息
				let menu = wx.getMenuButtonBoundingClientRect()
				// 导航栏高度 = 胶囊下距离 + 胶囊上距离 - 状态栏高度
				customBar = menu.bottom + menu.top - statusBar
				// #endif
				// #ifdef MP-ALIPAY
				customBar = statusBar + e.titleBarHeight
				// #endif
				const compensateHeight = 10; //非刘海屏状态栏高度偏低，补充10
				store.commit('SET_STATUSBAR', {
					statusBar: statusBar + compensateHeight,
					customBar: customBar + compensateHeight,
					// #ifdef MP
					statusBar: statusBar + compensateHeight + 10,
					customBar: customBar + compensateHeight + 10
					// #endif
				});
				success({
					statusBar,
					customBar
				})
			}
		})


	})

}