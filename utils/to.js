function isObj(obj) {
	let array = Object.keys(obj);
	if (array.length === 0) { //如果数组array的长度为0 ，则返回为true，说明data对象为空
		return false;
	}
	return true;
};

export const to = (url = "", data = {}, type = 'navigateTo', oNexit = "/pages/home/index") => {
	if (!url) {
		let pages = getCurrentPages(); // 获取当前页面栈的实例
		if (pages.length === 1) {
			// 没有上一页就跳转oNexit
			uni.reLaunch({
				url: oNexit
			})
			return;
		}
		uni.navigateBack()
		return;
	};
	if (isObj(data)) {
		// #ifdef MP
		const route_data = encodeURIComponent(JSON.stringify(data))
		// #endif
		// #ifndef MP
		const route_data = JSON.stringify(data)
		// #endif
		if (type === 'navigateTo') {
			uni.navigateTo({
				url: `${url}?data=${route_data}`
			})
		} else if (type === 'redirectTo') {
			uni.redirectTo({
				url: `${url}?data=${route_data}`
			})
		} else {
			uni.reLaunch({
				url: `${url}?data=${route_data}`
			})
		}
	} else {
		if (type === 'navigateTo') {
			uni.navigateTo({
				url: `${url}`
			})
		} else if (type === 'redirectTo') {
			uni.redirectTo({
				url: `${url}`
			})
		} else {
			uni.reLaunch({
				url: `${url}`
			})
		}
	}
}