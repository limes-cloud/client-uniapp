import repuest from "@/library/request"
import config from "@/config"

export const ListNotice = (params) => {
	return repuest({
		url: "/poverty/client/v1/notices",
		method: "get",
		params: {
			page: 1,
			pageSize: 5,
			order: 'desc',
			orderBy: 'is_top',
			status: true,
			...params,
		}
	})
}


export const GetNotice = (id) => {
	return repuest({
		url: "/poverty/client/v1/notice",
		method: "get",
		params: {
			id
		}
	})
}