const {
	postJsonRequest,
	getRequest,
	postRequest,
	putJsonRequest
} = require("@/api/axios.js");

import {
	v4 as uuidv4
} from 'uuid'; // 引入 uuid 库
// 生成一个 UUID


export function createOrder(data) {
	return postJsonRequest("/system/order/createOrder", data)
}

export function getOrderList(status) {
	const data = {
		orderStatus: status
	}
	return getRequest('/system/order/orderList', data)
}


export function pay(id) {
	return putJsonRequest('/system/order/payOrder', {
		id
	})
}


export function cancel(id) {
	return putJsonRequest('/system/order/cancelOrder', {
		id
	})
}

export function refund(id) {
	return putJsonRequest('/system/order/refundOrder', {
		id
	})
}

export function confirm(id) {
	return putJsonRequest('/system/order/confirmOrder', {
		id
	})
}
export function payOrder(id) {
	return putJsonRequest('/system/order/payOrder', {
		id
	})
}