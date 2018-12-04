//index.js
const helper = require('../../utils/util');
const app = getApp()

Page({
  data: {
    src: ''
  },
  onLoad: function () {
   
  },
  //选取图片
  async select(){
      let that = this;
      const img = await helper.chooseImage();//得到图片路径
      console.log(img[0])
      if(img != false){
          const temp = await helper.compressImage(img[0],50);//图片压缩
          console.log(temp)
          const base = temp != false ? await helper.base(temp) : helper.showModal();
          console.log(base)
          that.setData({
              src: base //数据传输长度为 4320079 已经超过最大长度 1048576 如果图片过大记得压缩哦
          })
      }
  },
  
})
