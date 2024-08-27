import repuest from "@/library/request"
import config from "@/config"

export const ListComment = () => {
	return repuest({
		url: "/poverty/client/v1/comments",
		method: "get",
		params: {
			page: 1,
			pageSize: 10,
			order: 'desc',
			orderBy: 'created_at',
		}
	})
}

export const CreateComment = (content) => {
	return repuest({
		url: "/poverty/client/v1/comment",
		method: "post",
		params: {
			content,
		}
	})
}