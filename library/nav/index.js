export const nav = {
	home: () => {
		uni.switchTab({
			url: '/pages/index/index'
		});
	},
	login: () => {
		uni.redirectTo({
			url: "/pages/user/login/index"
		})
	},
	bind: () => {
		uni.redirectTo({
			url: "/pages/user/login/index?bind=true"
		})
	},
	register: () => {
		uni.navigateTo({
			url: '/pages/user/register/index'
		});
	},
	error: (text) => {
		uni.redirectTo({
			url: "/pages/error/index?text=" + text
		})
	},
	notice: (id) => {
		uni.navigateTo({
			url: "/pages/app/notice/index"
		})
	},
	noticeContent: (id) => {
		uni.navigateTo({
			url: "/pages/app/notice/content?id=" + id
		})
	},
	news: () => {
		uni.navigateTo({
			url: "/pages/app/news/index"
		})
	},
	newsContent: (id) => {
		uni.navigateTo({
			url: "/pages/app/news/content?id=" + id
		})
	},
	resource: () => {
		uni.navigateTo({
			url: "/pages/app/resource/index"
		})
	},
	task: () => {
		uni.navigateTo({
			url: "/pages/app/task/index"
		})
	},
	taskContent: (id) => {
		uni.navigateTo({
			url: "/pages/app/task/content?id=" + id
		})
	},
	video: () => {
		uni.navigateTo({
			url: "/pages/app/video/index"
		})
	},
	videoContent: (id) => {
		uni.navigateTo({
			url: "/pages/app/video/content?id=" + id
		})
	},
	open: (path) => {
		if (path.indexOf("http") === 0) {
			uni.navigateTo({
				url: "/pages/app/webview/index?src=" + path
			})
		} else {
			uni.navigateTo({
				url: path
			})
		}
	}
}