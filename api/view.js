const {
	postJsonRequest,
	getRequest,
	postRequest
} = require("@/api/axios.js");

import {
	v4 as uuidv4
} from 'uuid'; // 引入 uuid 库
// 生成一个 UUID


export function getViews() {
	return getRequest("/system/view/userView")
}

export function getProject(id) {
	return getRequest('/system/project/' + id)
}