let vibrateShortFn = () => {
	console.log('短震动')
}
// #ifdef APP
if (plus.os.name == 'iOS') {
	vibrateShortFn = () => {
		try {
			var UIImpactFeedbackGenerator = plus.ios.importClass('UIImpactFeedbackGenerator');
			try {
				var impact = new UIImpactFeedbackGenerator();
				impact.prepare();
				impact.init(1);
				impact.impactOccurred();
			} catch (e) {
				//TODO handle the exception
			}
		} catch (e) {
			//TODO handle the exception
		}
	}
} else {
	vibrateShortFn = () => {
		try {
			uni.vibrateShort();
		} catch (e) {
			//TODO handle the exception
		}
	}
}
// #endif
export const vibrateShort = vibrateShortFn