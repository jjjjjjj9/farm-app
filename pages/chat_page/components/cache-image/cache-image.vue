<template>
	<image class="img" :src="img_url" :style="mstyle" mode="aspectFill"></image>
</template>

<script>
export default {
	name: 'cache-image',
	props: {
		src: {
			type: String,
			default: ''
		},
		mstyle: {
			type: String,
			default: ''
		},
		ext: {
			type: String,
			default: 'gif'
		}
	},
	data() {
		return {
			img_url: ''
		};
	},
	watch: {
		src: {
			handler: async function (n) {
				if (!n) return;
				let isCache = await this.isCache(this.filename);
				if (isCache) {
					this.img_url = this.filename;
				} else {
					this.img_url = n;
					this.createDownload();
				}
			},
			immediate: true
		}
	},
	computed: {
		filename() {
			let filename = `_doc/IM_emoji_pack/${this.src.replace(/\./g, '_').replace(/\//g, '_')}.${this.ext}`;
			return filename;
		}
	},
	methods: {
		// 判断是否已经缓存
		isCache(filePath) {
			return new Promise((r) => {
				uni.getFileInfo({
					filePath,
					success: (res) => {
						if (res.errMsg === 'getFileInfo:ok') {
							return r(true);
						}
						return r(false);
					},
					fail: (e) => {
						return r(false);
					}
				});
			});
		},
		// 下载存储
		createDownload() {
			let dtask = plus.downloader.createDownload(
				this.src,
				{
					filename: this.filename
				},
				//
				(download, status) => {
					if (status == 200) {
						let image = download.options.filename; //设置的名字
						// this.image = download.filename; //实际生成的名字
						// 将本地URL路径转换成平台绝对路径
						this.img_url = plus.io.convertLocalFileSystemURL(image);
					} else {
						this.img_url = src;
					}
				}
			);
			dtask.start();
			// 下载进度
			// dtask.addEventListener('statechanged', function (task, status) {});
		}
	}
};
</script>
