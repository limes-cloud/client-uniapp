import repuest from "../request.js"

export const allNewsClassify = (params) => {
	return repuest({
		url: "/party-affairs/client/v1/news/classify",
		method: "get",
		params
	})
}

export const pageNews = (params) => {
	return repuest({
		url: "/party-affairs/client/v1/news/contents",
		method: "get",
		params
	})
}

export const getNews = (params) => {
	return repuest({
		url: "/party-affairs/client/v1/news/content",
		method: "get",
		params
	})
}