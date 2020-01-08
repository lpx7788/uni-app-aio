import fetch from './uniRequest.js'

/**
 * 此js 根据fetch.js 封装了一些http请求的方法
 */
  /**
   * post请求
   * @param {*} postUrl
   * @param {*} param 参数
   * @return 请求结果
   */
  function httpClient(postUrl, param,method) {
    let headers = {}
    headers['X-Requested-With'] = 'XMLHttpRequest'
    headers['Content-Type'] = 'application/json'
    headers['access_token'] = uni.getStorageSync('access_token')?uni.getStorageSync('access_token'):''
    return new Promise((resolve, reject) => {
      fetch({
        url: postUrl,
        method: method?method:'POST',
        data: param,
        headers: headers
      }).then(response => {
        resolve(response)
      }, err => {
        reject(err)
      }).catch((error) => {
        reject(error)
      })
    })
  }


export default {
	httpClient
}

