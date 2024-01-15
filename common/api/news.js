import repuest from "../request.js"

export const allNewsClassify = (params) => {
	return repuest({
		url: "/party_affairs/client/v1/news_classify",
		method: "get",
		params
	})
}

export const pageNews = (params) => {
	return repuest({
		url: "/party_affairs/client/v1/news/page",
		method: "get",
		params
	})
}

export const getNews = (params) => {
	return repuest({
		url: "/party_affairs/client/v1/news",
		method: "get",
		params
	})
}