import repuest from "../request.js"

export const allResourceClassify = (params) => {
	return repuest({
		url: "/party-affairs/client/v1/resource_classify",
		method: "get",
		params
	})
}

export const pageResource = (params) => {
	return repuest({
		url: "/party-affairs/client/v1/resource/page",
		method: "get",
		params
	})
}

export const getResource = (params) => {
	return repuest({
		url: "/party-affairs/client/v1/resource",
		method: "get",
		params
	})
}