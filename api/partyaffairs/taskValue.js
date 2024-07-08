import repuest from "@/library/request"


export const getTaskValue = (params) => {
	return repuest({
		url: "/partyaffairs/client/v1/task/value",
		method: "get",
		params
	})
}

export const addTaskValue = (params) => {
	return repuest({
		url: "/partyaffairs/client/v1/task/value",
		method: "post",
		params
	})
}

export const updateTaskValue = (params) => {
	return repuest({
		url: "/partyaffairs/client/v1/task/value",
		method: "put",
		params
	})
}