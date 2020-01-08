
import uniRequest from 'uni-request';
import config from './config.js'
uniRequest.defaults.baseURL = config.ApiUrl;
uniRequest.defaults.headers.post['Content-Type'] = 'application/json';

// 请求拦截
uniRequest.interceptors.request.use(
    request => {
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