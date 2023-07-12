// 此vm参数为页面的实例，可以通过它引用vuex中的变量
module.exports = (vm) => {
    // 初始化请求配置
    uni.$u.http.setConfig((config) => {
        /* config 为默认全局配置*/
        // config.baseURL = 'https://mini.red-packet.cn'; /* 前环境 */
        config.baseURL = 'http://4122604mt1.51vip.biz:18726'; /* 新开发环境 */
        return config
    })
	
	// 请求拦截
	uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
	    // 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
	    config.data = config.data || {}
	    // 根据custom参数中配置的是否需要token，添加对应的请求头
	    if(config?.custom?.auth) {
	    	// 可以在此通过vm引用vuex中的变量，具体值在vm.$store.state
	    	const tokenuser = uni.getStorageSync('token');
	    	console.log("后台查token：",tokenuser)
	    	config.header.Authorization = "Bearer "+tokenuser
	    }
	    return config 
	}, config => { // 可使用async await 做异步操作
	    return Promise.reject(config)
	})
	
	// 响应拦截
	uni.$u.http.interceptors.response.use((response) => { /* 对响应成功做点什么 可使用async await 做异步操作*/
		/* 对响应成功做点什么 可使用async await 做异步操作*/
		if (response.data.code == 401) {
		   uni.showToast({
			icon: 'none',
			mask: true,
			title: '登录已过期,请重新登录',
			duration: 1500
		   });
		   uni.removeStorageSync('user')
		   setTimeout(function() {
			uni.reLaunch({
			 url:'/subpages/login/login'
			})
		   }, 2000);
		   return;
		}
		return response
		// if (response.config.custom.verification) { // 演示自定义参数的作用
		//   	return response.data
		// }
		// console.log("后台返回",response)
	}, (response) => { 
		// 对响应错误做点什么 （statusCode !== 200）
		console.log(response)
		return Promise.reject(response)
	})
}