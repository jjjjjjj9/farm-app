import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: {},
		// 文字大小
		page_font_size: uni.getStorageSync('page_font_size') || 'page_font_size',
		// 导航栏高度
		StatusBar: {
			statusBar: 0,
			customBar: 0,
		},
	},
	mutations: {
		login(state, provider) {

			state.hasLogin = true;
			state.userInfo = provider;
			uni.setStorage({//缓存用户登陆状态
			    key: 'userInfo',  
			    data: provider  
			}) 
			console.log(state.userInfo);
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({  
                key: 'userInfo'  
            })
		},
		// 设置导航栏高度
		SET_STATUSBAR(state, value) {
			state.StatusBar = value
		},
		SET_page_font_size(state, value) {
			state.page_font_size = value
			uni.setStorage({
				key: 'page_font_size',
				data: value,
				success: function() {}
			});
		}
	},
	actions: {
	
	}
})

export default store
