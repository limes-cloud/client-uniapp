import repuest from "@/library/request"
import config from "@/config"

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

export const GetFileBySha = (sha) => {
	return repuest({
		url: "/resource/client/v1/file",
		method: "get",
		params: {
			sha: sha
		}
	})
}