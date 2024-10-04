import repuest from "@/library/request"

export const allResourceClassify = (params) => {
	return repuest({
		url: "/partyaffairs/client/v1/resource/classifies",
		method: "get",
		params
	})
}

export const pageResource = (params) => {
	return repuest({
		url: "/partyaffairs/client/v1/resources",
		method: "get",
		params
	})
}

export const getResource = (params) => {
	return repuest({
		url: "/partyaffairs/client/v1/resource",
		method: "get",
		params
	})
}