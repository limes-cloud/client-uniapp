import repuest from "../request.js"

export const allNewsClassify = (params) => {
	return repuest({
		url: "/party-affairs/client/v1/news/classify",
		method: "get",
		params
	})
}

export const pageNewsContent = (params) => {
	return repuest({
		url: "/party-affairs/client/v1/news/contents",
		method: "get",
		params
	})
}

export const getNewsContent = (params) => {
	return repuest({
		url: "/party-affairs/client/v1/news/content",
		method: "get",
		params
	})
}

export const addNewsComment = (params) => {
	return repuest({
		url: "/party-affairs/client/v1/news/comment",
		method: "post",
		params
	})
}

export const deleteNewsComment = (params) => {
	return repuest({
		url: "/party-affairs/client/v1/news/comment",
		method: "delete",
		params
	})
}