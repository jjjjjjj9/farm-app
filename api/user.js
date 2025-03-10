const {
	postJsonRequest,
	getRequest,
	postRequest
} = require("@/api/axios.js");

import {
	v4 as uuidv4
} from 'uuid'; // 引入 uuid 库
// 生成一个 UUID
export function login(username, password, code) {
	const uuid = uuidv4();
	const data = {
		username,
		password,
		code,
		uuid
	}
	console.log("data", data)
	return postJsonRequest('/login', data)
}

export function loginByWeChat(datas){
	const data = {
		wechatId:datas.wechatId
	}
	return postJsonRequest('/loginByWeChat',data)
}

export function register(username, password, code) {
	const uuid = uuidv4();
	const data = {
		username,
		password,
		code,
		uuid,
		type: 1
	}
	console.log("data", data)
	return postJsonRequest('/register', data)
}

export function getProductList() {
	return getRequest("/system/project/list")
}

export function getInfo() {
	return getRequest("/getInfo")
}

export function updateUser(user) {
	return postJsonRequest("/user/update", user)
}
export function getRole(user) {
	return getRequest("/user/getRole", user)
}