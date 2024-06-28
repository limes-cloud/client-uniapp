import resource from "./resource.js"
import logo from '@/static/logo.png';

import {
	formatTime,
	parseTime
} from "./time.js"


const global = {
	$rurl: resource,
	$ft: formatTime,
	$pt: parseTime,
	$back: () => {
		uni.navigateBack()
	},
	$to: (path) => {
		uni.navigateTo({
			url: path
		});
	},
	$logo: logo
}


export default (app) => {
	uni.$global = {}
	const keys = Object.keys(global)
	keys.forEach(key => {
		app.config.globalProperties[key] = global[key]
		uni.$global[key] = global[key]
	})
}