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
		return Promise.reject(error);
	}
});



export function getRequest(url, params) {
	return new Promise((resolve, reject) => {
		const token = uni.getStorageSync("token")
		console.log(base_url + url)
		uni.request({
			method: 'GET',
			url: base_url + url,
			data: params,
			params: params,
			header: {
				"token": token
			},
			success: res => {
				if (res.data.statusCode !== "200") {
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

export function postRequest(url, params) {
	return new Promise((resolve, reject) => {
		const token = uni.getStorageSync("token")
		uni.request({
			method: 'POST',
			url: base_url + url,
			data: params,
			header: {
				'Content-Type': 'application/x-www-form-urlencoded',
				"token": token
			},
			success: res => {
				if (res.data.statusCode !== "200") {
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


export function postJsonRequest(url, params) {
	return new Promise((resolve, reject) => {
		const token = uni.getStorageSync("token")
		uni.request({
			method: 'POST',
			url: base_url + url,
			data: params,
			header: {
				'Content-Type': 'application/json',
				"token": token
			},
			success: res => {
				if (res.data.statusCode !== "200") {
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