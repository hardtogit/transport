/**
 * 网络请求
 * 仅仅只做请求和返回
 */

export default class RequestContext {
  static create = (config) => {
    return new RequestContext(config);
  }
  constructor(config) {
    this.config = config || {
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    }
  }
  request(url, method = 'POST', data) {
    // console.log(this);
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        method,
        data,
        ...this.config,
        success(response, statusCode, header) {
          resolve({
            ...response.data,
            reject,
            wxhttp: {
              statusCode,
              header
            }
          })
        },
        fail() {
          reject();
        }
      });
    })
  }
  uploadFile(url, filePath, data, callback){
    console.log(url, filePath, data);
    return new Promise((resolve, reject)=>{
      const task =  wx.uploadFile({
         url,
         name: 'file',
         filePath,
         formData: data,
         success({response}){
            resolve(typeof response ==='string' ? JSON.parse(response) : response);
         },
         fail(err){
           reject(err);
         }
      });
     callback &&  callback(task)
    })
  }
  post(url, data){
    return this.request(url,'POST', data);
  }
  get(url, data){
    return this.request(url,'GET', data);
  }
}
