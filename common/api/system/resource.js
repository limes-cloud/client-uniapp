import repuest from "@/common/request.js"
import config from "@/common/config.js"

export const PrepareUpload = (params) => {
	return repuest({
		url: "/resource/client/v1/file/prepare_upload",
		method: "post",
		params
	})
}

export const Upload = (file, params) => {
	console.log(params)
	return repuest({
		url: "/resource/client/v1/upload",
		method: "upload",
		file,
		params,
		header: {
			'Content-Type': 'multipart/form-data'
		}
	})
}

// export const getBySha = (sha) => {
// 	return repuest({
// 		url: "/resource/client/v1/file/sha",
// 		method: "get",
// 		params: {
// 			sha: sha
// 		}
// 	})
// }