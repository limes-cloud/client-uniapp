// 引入配置
import config from '@/common/config'
// 引入请求拦截
import request from './request.js'
// 引入响应拦截
import response from './response.js'
// 初始化请求配置

export default () => {
	uni.$uv.http.setConfig((defaultConfig) => {
		/* defaultConfig 为默认全局配置 */
		defaultConfig.baseURL = config.baseUrl /* 根域名 */
		defaultConfig.custom = {
			toast: true,
			catch: true
		}
		defaultConfig.validateStatus = (statusCode) => { // statusCode 必存在。此处示例为全局默认配置
			return statusCode >= 200 && statusCode <= 600
		}
		return defaultConfig
	})
	request();
	response();
}