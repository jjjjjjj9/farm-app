// 节流函数
let timer;
let flag;
export const throttle = (func, wait = 500, immediate = true) => {
	if (immediate) {
		if (!flag) {
			flag = true
			// 如果是立即执行，则在wait毫秒内开始时执行
			typeof func === 'function' && func()
			timer = setTimeout(() => {
				flag = false
			}, wait)
		}
	} else if (!flag) {
		flag = true
		// 如果是非立即执行，则在wait毫秒内的结束处执行
		timer = setTimeout(() => {
			flag = false
			typeof func === 'function' && func()
		}, wait)
	}
}
