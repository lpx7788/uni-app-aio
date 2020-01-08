
import uniRequest from 'uni-request';
import config from './config.js'
uniRequest.defaults.baseURL = config.ApiUrl;
uniRequest.defaults.headers.post['Content-Type'] = 'application/json';
// uniRequest.defaults.headers.common['Authorization'] = '';
// uni.setStorageSync('access_token', '92587a2bfe824c0381889ae55a704fcb_763d00032f204df0990354e582d55b56');
// uniRequest.defaults.headers.access_token = '92587a2bfe824c0381889ae55a704fcb_763d00032f204df0990354e582d55b56'

// 请求拦截
uniRequest.interceptors.request.use(
    request => {
		// console.log(request)
		// let token = uni.getStorageSync('access_token')
		// console.log(uniRequest.defaults.headers)
		// uniRequest.defaults.headers.access_token = token
		// uniRequest.defaults.headers.common['Authorization'] = '';
		// uniRequest.defaults.headers.common['access_token'] = token
		// return Promise.resolve(res); 
        return request; 
    },
    err => {
        // console.log('请求失败');
        return Promise.reject(err);
    });

// 响应拦截
uniRequest.interceptors.response.use(function(response) {
	if(response.data.errorCode==='0000'){
		return Promise.resolve(response);
	}else{
		uni.showToast({
			title: response.data.errorMsg,
			icon:'none',
		});
	}
}, function(error) {
    // console.log('返回进入拦截失败')
    return Promise.reject(error);
});

export default uniRequest;