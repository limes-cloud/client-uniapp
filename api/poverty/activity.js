import repuest from "@/library/request"
import config from "@/config"



export const ListActivity = (params) => {
	return repuest({
		url: "/poverty/client/v1/activities",
		url: "/poverty/client/v1/activities",
		method: "get",
		params: {
			page: 1,
			pageSize: 9,
			order: 'desc',
			orderBy: 'is_top',
			status: true,
			...params,
		}
	})
}