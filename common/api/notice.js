import repuest from "../request.js"

export const pageNotice = (params) => {
	return repuest({
		url: "/party-affairs/client/v1/notices",
		method: "get",
		params
	})
}

export const getNotice = (params) => {
	return repuest({
		url: "/party-affairs/client/v1/notice",
		method: "get",
		params
	})
}

export const readNotice = (params) => {
	return repuest({
		url: "/party-affairs/client/v1/notice/read",
		method: "get",
		params
	})
}