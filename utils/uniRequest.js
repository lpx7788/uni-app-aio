
import uniRequest from 'uni-request';
import config from './config.js'
uniRequest.defaults.baseURL = config.ApiUrl;

// 请求拦截
uniRequest.interceptors.request.use(
    request => { 
        return request; 
    },
    err => {
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
    return Promise.reject(error);
});

export default uniRequest;