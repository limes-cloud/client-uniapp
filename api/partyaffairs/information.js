import repuest from "@/library/request"

export const ListInformationClassify = (params) => {
	return repuest({
		url: "/partyaffairs/client/v1/information/classifies",
		method: "get",
		params
	})
}

export const ListInformation = (params) => {
	return repuest({
		url: "/partyaffairs/client/v1/informations",
		method: "get",
		params
	})
}

export const GetInformation = (params) => {
	return repuest({
		url: "/partyaffairs/client/v1/information",
		method: "get",
		params
	})
}