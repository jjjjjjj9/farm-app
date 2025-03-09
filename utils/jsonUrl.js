function isObj(obj) {
	let array = Object.keys(obj);
	if (array.length === 0) { //如果数组array的长度为0 ，则返回为true，说明data对象为空
		return false;
	}
	return true;
};
// 配合to方法使用
export const jsonUrl = (e) => {
	// #ifdef MP
	if (e.data) {
		e.data = decodeURIComponent(e.data)
	}
	// #endif
	if (isObj(e)) {
		if (e.data) {
			var data = JSON.parse(e.data)
		} else {
			return e;
		}
		return data;
	} else {
		uni.showToast({
			title: '参数错误',
			duration: 1000,
			icon: 'none',
			mask: true,
		});
	}
}