export const openimg = (index,item,attributes='') => {
	if(item) {
		// 数组对象请况
		if (attributes) {
			let arr = []
			item.forEach((item,ix)=>{
				if (item[attributes] ) {
					arr.push(item[attributes])
				}
			})
			uni.previewImage({
				urls: arr,
				current: arr[index]
			});
		} else {// 数组请况
			uni.previewImage({
				urls: item,
				current: item[index]
			});
		}
	} else if(!item) {//传入单张照片
		let arr = []
		arr.push(index)
		uni.previewImage({
			urls: arr,
			current: arr[1]
		});
	}
}
