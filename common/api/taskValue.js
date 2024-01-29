import repuest from "../request.js"


export const getTaskValue = (params) => {
	return repuest({
		url: "/party-affairs/client/v1/task/value",
		method: "get",
		params
	})
}

export const addTaskValue = (params) => {
	return repuest({
		url: "/party-affairs/client/v1/task/value",
		method: "post",
		params
	})
}

export const updateTaskValue = (params) => {
	return repuest({
		url: "/party-affairs/client/v1/task/value",
		method: "put",
		params
	})
}