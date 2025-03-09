// str 文案
// time 时间
// icon 图标
// mask is防止触摸穿透
export const show = (title = "文案", duration = 2000, icon = 'none', mask = true) => {
	uni.showToast({
		title,
		duration,
		icon,
		mask,
	});
	return new Promise((r, e) => {
		setTimeout(() => {
			r()
		}, duration)
	})
}
// icon：
// success		显示成功图标，此时 title 文本在小程序平台最多显示 7 个汉字长度
// error		显示错误图标，此时 title 文本在小程序平台最多显示 7 个汉字长度。	
// fail	 		显示对号图标，此时 title 文本无长度显示。	
// exception	显示异常图标，此时 title 文本无长度显示。	
// loading		显示加载图标，此时 title 文本在小程序平台最多显示 7 个汉字长度。
// none			不显示图标，此时 title 文本在小程序最多可显示两行，App仅支持单行显示