import repuest from "@/common/request.js"
import config from "@/common/config.js"
import {
	rsaEncode
} from "@/library/utils/rsa"

export const oAuthLogin = (params) => {
	return repuest({
		url: "/user-center/client/v1/login/oauth",
		method: "post",
		params: {
			...params,
			app: config.name
		}
	})
}

export const oAuthBindByCaptcha = () => {
	return repuest({
		url: "/user-center/client/v1/bind/oauth/captcha",
		method: "get"
	})
}

export const oAuthBindByPassword = (params) => {
	params.password = rsaEncode({
		password: params.password,
		time: new Date().getTime()
	})
	return repuest({
		url: "/user-center/client/v1/bind/oauth/password",
		method: "post",
		params
	})
}

export const oAuthBindImage = () => {
	return repuest({
		url: "/user-center/client/v1/bind/oauth/image-captcha",
		method: "get"
	})
}

export const oAuthBindEmail = () => {
	return repuest({
		url: "/user-center/client/v1/bind/oauth/email-captcha",
		method: "get"
	})
}

export const passwordLogin = (params) => {
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

export const passwordLoginCaptcha = () => {
	return repuest({
		url: "/user-center/client/v1/login/password/image-captcha",
		method: "get"
	})
}

export const passwordRegister = (params) => {
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

export const passwordRegisterCheck = (username) => {
	return repuest({
		url: "/user-center/client/v1/register/password/check",
		method: "get",
		params: {
			username
		}
	})
}

export const passwordRegisterCaptcha = () => {
	return repuest({
		url: "/user-center/client/v1/register/password/image-captcha",
		method: "get"
	})
}


export const captchaLogin = (params) => {
	return repuest({
		url: "/user-center/client/v1/login/captcha",
		method: "post",
		params
	})
}

export const captchaLoginEmail = (email) => {
	return repuest({
		url: "/user-center/client/v1/login/captcha/email-captcha?email=" + email,
		method: "get"
	})
}

export const captchaRegister = (params) => {
	return repuest({
		url: "/user-center/client/v1/register/captcha",
		method: "post",
		params
	})
}


export const captchaRegisterEmail = (email) => {
	return repuest({
		url: "/user-center/client/v1/register/captcha/email-captcha?email=" + email,
		method: "get"
	})
}


export const refreshToken = (params) => {
	return repuest({
		url: "/user-center/client/v1/token/refresh",
		method: "post",
		params
	})
}