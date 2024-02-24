import repuest from "../request.js"

export const pageVideoClassify = (params) => {
	return repuest({
		url: "/party-affairs/client/v1/video/classify",
		method: "get",
		params
	})
}

export const pageVideoContent = (params) => {
	return repuest({
		url: "/party-affairs/client/v1/video/contents",
		method: "get",
		params
	})
}


export const reportProcess = (params) => {
	return repuest({
		url: "/party-affairs/client/v1/video/process",
		method: "post",
		params
	})
}