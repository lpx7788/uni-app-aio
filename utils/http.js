import fetch from './uniRequest.js'

/**
 * 此js 根据fetch.js 封装了一些http请求的方法
 */
class httpClient {
  /**
   * post请求
   * @param {*} postUrl
   * @param {*} param 参数
   * @return 请求结果
   */
  static requestPost (postUrl, param) {
    let headers = {}
    headers['X-Requested-With'] = 'XMLHttpRequest'
    headers['access_token'] = uni.getStorageSync('access_token')?uni.getStorageSync('access_token'):''
    // if (param.token !== undefined) {
    //   headers['access_token'] = param.token
    // }
    return new Promise((resolve, reject) => {
      fetch({
        url: postUrl,
        method: 'post',
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
}

export default httpClient

