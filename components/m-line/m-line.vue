<template>
	<view
	    class="u-line"
	    :style="[lineStyle]"
	>
	</view>
</template>
<!-- <m-line color="#B8B8B8" length="186rpx" :hairline="true"></m-line> -->
<script>
	export default {
		name: 'm-line',
		props: {
		    color: {
		        type: String,
		        default: "#BBBBBB"
		    },
		    // 长度，竖向时表现为高度，横向时表现为长度，可以为百分比，带px单位的值等
		    length: {
		        type: [String, Number],
		        default: "100%"
		    },
		    // 线条方向，col-竖向，row-横向
		    direction: {
		        type: String,
		        default: "row"
		    },
		    // 是否显示细边框
		    hairline: {
		        type: Boolean,
		        default: true
		    },
		    // 线条与上下左右元素的间距，字符串形式，如"30px"、"20px 30px"
		    margin: {
		        type: [String, Number],
		        default: "0px"
		    },
			marginTop:{
				type: [String, Number],
				default: "0px"
			},
		    // 是否虚线，true-实线，false-虚线
		    dashed: {
		        type: Boolean,
		        default: false
		    }
		},
		computed: {
			lineStyle() {
				const style = {}
				style.marginTop = this.marginTop
				style.margin = this.margin
				// 如果是水平线条，边框高度为1px，再通过transform缩小一半，就是0.5px了
				if (this.direction === 'row') {
					// 此处采用兼容分开写，兼容nvue的写法
					style.borderBottomWidth = '1px'
					style.borderBottomStyle = this.dashed ? 'dashed' : 'solid'
					style.width = this.length
					if (this.hairline) style.transform = 'scaleY(0.5)'
				} else {
					// 如果是竖向线条，边框宽度为1px，再通过transform缩小一半，就是0.5px了
					style.borderLeftWidth = '1px'
					style.borderLeftStyle = this.dashed ? 'dashed' : 'solid'
					style.height = this.length
					if (this.hairline) style.transform = 'scaleX(0.5)'
				}
				style.borderColor = this.color
				return style;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-line {
		/* #ifndef APP-NVUE */
		vertical-align: middle;
		/* #endif */
	}
</style>
