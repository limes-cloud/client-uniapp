import resource from "./resource.js"
import {
	formatTime,
	parseTime
} from "./time.js"

export default (app) => {
	app.config.globalProperties.$rurl = resource;
	app.config.globalProperties.$ft = formatTime;
	app.config.globalProperties.$pt = parseTime;
}