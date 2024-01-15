import repuest from "../request.js"


export const pageTask = (params) => {
	return repuest({
		url: "/party_affairs/client/v1/tasks",
		method: "get",
		params
	})
}

export const getTask = (params) => {
	return repuest({
		url: "/party_affairs/client/v1/task",
		method: "get",
		params
	})
}

export const addTaskContent = (params) => {
	return repuest({
		url: "/party_affairs/client/v1/task_content",
		method: "post",
		params
	})
}

export const getTaskContent = (params) => {
	return repuest({
		url: "/party_affairs/client/v1/task_content",
		method: "get",
		params
	})
}