import axios from 'axios'

axios.defaults.timeout = 5000;

export const base_url = "http://localhost/dev-api"



uni.addInterceptor('request', {
	success: function(config) {
		if (uni.getStorageSync('token') && config.data.statusCode === "600") {
			uni.removeStorageSync('token');
			return config;
		}
		return config
	},
	fail: function(error) {
		// if (error.code == 401) {
		// 	uni.navigateTo({
		// 		url: '/pages/public/login'
		// 	})
		// }
		return Promise.reject(error);
	}
});

uni.addInterceptor('response', {
	success: function(res) {
		// 在这里可以统一处理响应数据
		if (res.data.code === "401") {
			uni.navigateTo({
				url: '/pages/public/login'
			});
			return Promise.reject(res.data);
		}
		return res;
	},
	fail: function(error) {
		return Promise.reject(error);
	}
});



export function getRequest(url, params) {
	return new Promise((resolve, reject) => {
		const token = uni.getStorageSync("token")
		uni.request({
			method: 'GET',
			url: base_url + url,
			data: params,
			params: params,
			header: {
				'Authorization': 'Bearer ' + token,
				'Content-Type': 'application/json;charset=utf-8'
			},
			success: res => {
				if (res.data.code == "401") {
					uni.navigateTo({
						url: '/pages/public/login'
					})
				}
				if (res.data.code != "200") {
					console.log(res)
					reject(res.data);
				}
				resolve(res)
			},
			fail: err => {
				if (err.code == 401) {
					uni.navigateTo({
						url: '/pages/public/login'
					})
				}
				reject(err)
			}
		})
	})
}

export function postRequest(url, params) {
	return new Promise((resolve, reject) => {
		const token = uni.getStorageSync("token")
		uni.request({
			method: 'POST',
			url: base_url + url,
			data: params,
			header: {
				'Authorization': 'Bearer ' + token,
				'Content-Type': 'application/json;charset=utf-8'
			},
			success: res => {
				if (res.data.code == "401") {
					uni.navigateTo({
						url: '/pages/public/login'
					})
				}
				if (res.data.code != "200") {
					reject(res.data);
				}
				resolve(res)
			},
			fail: err => {
				console.log(err)
				if (err.code == 401) {
					uni.navigateTo({
						url: '/pages/public/login'
					})
				}
				reject(err)
			}
		})
	})
}


export function postJsonRequest(url, params) {
	return new Promise((resolve, reject) => {
		const token = uni.getStorageSync("token")
		uni.request({
			method: 'POST',
			url: base_url + url,
			data: params,
			header: {
				'Authorization': 'Bearer ' + token,
				'Content-Type': 'application/json;charset=utf-8'
			},
			success: res => {
				if (res.data.code == "401") {
					uni.navigateTo({
						url: '/pages/public/login'
					})
				}
				console.log("res.data.code", res.data.code != "200")
				if (res.data.code != "200") {
					reject(res.data);
				}
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}
export function putJsonRequest(url, params) {
	return new Promise((resolve, reject) => {
		const token = uni.getStorageSync("token")
		uni.request({
			method: 'PUT',
			url: base_url + url,
			data: params,
			header: {
				'Authorization': 'Bearer ' + token,
				'Content-Type': 'application/json;charset=utf-8'
			},
			success: res => {
				if (res.data.code == "401") {
					uni.navigateTo({
						url: '/pages/public/login'
					})
				}
				console.log("res.data.code", res.data.code != "200")
				if (res.data.code != "200") {
					reject(res.data);
				}
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}