export const nav = {
	home: () => {
		uni.switchTab({
			url: '/pages/index/index'
		});
	},
	login: () => {
		uni.redirectTo({
			url: "/pages/login/index"
		})
	},
	error: (text) => {
		uni.redirectTo({
			url: "/pages/error/index?text=" + text
		})
	}
}