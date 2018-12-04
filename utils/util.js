/*
 * @Author: wmf
 * @Date: 2018-12-03 16:25:16 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-12-04 09:57:07
 */

module.exports = {
    /** 
     * 图片转base64
     * @method base 
     * @param {string} String src 上传图片路径
     * @param 成功失败都返回一个对象 具体参考小程序文档
     */
    base(src){
        let FSM = wx.getFileSystemManager();
        return new Promise(function(resolve){
             //图片转base64
            FSM.readFile({
                filePath: src,
                encoding: "base64",
                complete: function (res) {
                    console.log(res)
                    resolve(`data:image/jpg;base64,${res.data}`)
                }
            });
        });
    },
    /** 
     * 
     * 只上传图片base64
     * @method img base64图片 字段为img 如需请修改
     * @param {string} String url 接口地址
     * @param {string} String src 上传图片路径
     * @param {Object} Object  data 需要上传的数据
     * @param 成功失败都返回一个对象 具体参考小程序文档
     */
    img(url, src, data) {
        let FSM = wx.getFileSystemManager();
        return new Promise(function(resolve){
             //图片转base64
            FSM.readFile({
                filePath: src,
                encoding: "base64",
                success: function (base) {
                    wx.request({
                        url: url,
                        method: 'POST',
                        data: Object.assign(data,{img: 'data:image/jpg;base64,'+ base.data}),
                        dataType: 'json',
                        complete: res =>{
                            resolve(res);
                           // that.hideLoading();
                        }
                    });
                }
            });
        });
    },
    /** 
     * 
     * 选取图片
     * @method chooseImage
     * @param 成功返回图片地址，失败返回false
     */
    chooseImage(){
        return new Promise((resolve) => {
            wx.chooseImage({
                count: 1,
                sizeType: ['original', 'compressed'],
                sourceType: ['album', 'camera'],
                complete: res =>{
                    if(res.errMsg != 'chooseImage:ok'){
                        resolve(false)
                    }else{
                        resolve(res.tempFilePaths)
                    }
                }
              })
        })
    },
    /**  
     * 压缩图片
     * @method compressImage
     * @param {String} src 图片路径 可以是相对路径、临时文件路径、存储文件路径	
     * @param {Number} num 压缩质量，范围0～100，数值越小，质量越低，压缩率越高（仅对jpg有效）。
     * @param 成功返回图片地址，失败返回false
     */
    compressImage(src,num){
        return new Promise((resolve) => {
            wx.compressImage({
                src: src,
                quality: num,
                complete: res =>{
                    if(res.errMsg != 'compressImage:ok'){
                        resolve(false)
                    }else{
                        resolve(res.tempFilePath)
                    }
                }
              })
        })
    },
     /**  
     * 弱提示
     * @method showModal
     */
    showModal(){
        return wx.showModal({title: '温馨提示',content: '请真机测试',showCancel: false})
    }
}