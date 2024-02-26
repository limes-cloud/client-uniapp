import {
	ref
} from "vue"
const isRedirectToLogin = ref(false);

export const nav = {
	home: () => {
		uni.switchTab({
			url: '/pages/index/index'
		});
	},
	login: () => {
		if (!isRedirectToLogin.value) {
			isRedirectToLogin.value = true
			uni.redirectTo({
				url: "/pages/user/login/index"
			})
			setTimeout(() => {
				isRedirectToLogin.value = false
			}, 500)
		}

	},
	readAgreement(id) {
		uni.navigateTo({
			url: '/pages/user/agreement/index?id=' + id
		});
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