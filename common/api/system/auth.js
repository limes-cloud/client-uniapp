import repuest from "@/common/request.js"
import {
	rsaEncode
} from "../../../library/utils/rsa"

export const loginImageCaptcha = () => {
	return repuest({
		url: "/user-center/client/v1/login/image-captcha",
		method: "get"
	})
}

export const bindImageCaptcha = () => {
	return repuest({
		url: "/user-center/client/v1/bind/image-captcha",
		method: "get"
	})
}

export const loginByPassword = (params) => {
	params.password = rsaEncode({
		password: params.password,
		time: new Date().getTime()
	})
	return repuest({
		url: "/user-center/client/v1/login/password",
		method: "post",
		params
	})
}

export const bindByPassword = (params) => {
	return repuest({
		url: "/user-center/client/v1/bind/password",
		method: "post",
		params
	})
}

export const loginEmailCaptcha = (email) => {
	return repuest({
		url: "/user-center/client/v1/login/email-captcha",
		method: "post",
		params: {
			email: email
		}
	})
}

export const bindEmailCaptcha = (email) => {
	return repuest({
		url: "/user-center/client/v1/bind/email-captcha",
		method: "post",
		params: {
			email: email
		}
	})
}

export const loginByEmail = (params) => {
	return repuest({
		url: "/user-center/client/v1/login/email",
		method: "post",
		params
	})
}

export const bindByEmail = (params) => {
	return repuest({
		url: "/user-center/client/v1/bind/email",
		method: "post",
		params
	})
}


export const refreshToken = (params) => {
	return repuest({
		url: "/user-center/client/v1/refresh_token",
		method: "post",
		params
	})
}

export const registerImageCaptcha = () => {
	return repuest({
		url: "/user-center/client/v1/register/image-captcha",
		method: "get"
	})
}

export const registerEmailCaptcha = (email) => {
	return repuest({
		url: "/user-center/client/v1/register/email-captcha",
		method: "post",
		params: {
			email
		}
	})
}

export const registerUsernameCheck = (username) => {
	return repuest({
		url: "/user-center/client/v1/register/username/check",
		method: "get",
		params: {
			username
		}
	})
}

export const registerByPassword = (params) => {
	params.password = rsaEncode({
		password: params.password,
		time: new Date().getTime()
	})
	return repuest({
		url: "/user-center/client/v1/register/password",
		method: "post",
		params
	})
}

export const registerByEmail = (params) => {
	return repuest({
		url: "/user-center/client/v1/register/email",
		method: "post",
		params
	})
}