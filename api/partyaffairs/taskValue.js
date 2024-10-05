import repuest from "@/library/request"


export const GetTaskValue = (params) => {
	return repuest({
		url: "/partyaffairs/client/v1/task/value",
		method: "get",
		params
	})
}

export const AddTaskValue = (params) => {
	return repuest({
		url: "/partyaffairs/client/v1/task/value",
		method: "post",
		params
	})
}

export const UpdateTaskValue = (params) => {
	return repuest({
		url: "/partyaffairs/client/v1/task/value",
		method: "put",
		params
	})
}