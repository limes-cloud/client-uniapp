import repuest from "@/library/request"

export const ListNotice = (params) => {
	return repuest({
		url: "/partyaffairs/client/v1/notices",
		method: "get",
		params
	})
}

export const getNotice = (params) => {
	return repuest({
		url: "/partyaffairs/client/v1/notice",
		method: "get",
		params
	})
}

export const readNotice = (params) => {
	return repuest({
		url: "/partyaffairs/client/v1/notice/read",
		method: "get",
		params
	})
}