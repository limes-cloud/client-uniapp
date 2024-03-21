import App from './App'
import uvUI from '@/uni_modules/uv-ui-tools'
import requestInterceptors from '@/library/request'
import mounteGlobal from '@/library/global'
import setting from '@/library/setting';
import "@/library/auth/interceptor.js"
import * as Pinia from 'pinia';
import Vconsole from 'vconsole'

import {
	createSSRApp
} from 'vue'

export function createApp() {
	const app = createSSRApp(App)
	app.use(Pinia.createPinia());
	// app.use(new Vconsole())
	// 挂载全局对象
	mounteGlobal(app)

	// 引入请求封装
	requestInterceptors(app)

	app.use(uvUI, {
		mpShare: true
	})

	setting();

	return {
		app,
		Pinia,
	}
}