export const getAppInfo = () => {
	return new Promise((reslove, reject) => {
		const res = {
			name: "青柠校园",
			logo: "https://ask.dcloud.net.cn/uploads/avatar/000/07/05/34_avatar_max.jpg?=0",
			desc: "即将开启你的全新校园生活",
			version: "1.0"
		}
		setTimeout(() => {
			reslove(res)
		}, 1000)
	})
}