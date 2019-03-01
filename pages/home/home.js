// 引入SDK核心类
var QQMapWX = require('../../qqmap-wx-jssdk1.0/qqmap-wx-jssdk.js');

// 实例化API核心类
var demo = new QQMapWX({
  key: 'C2BBZ-CHUKD-3U54E-PXWGI-HHTA5-3TFQO' 
});

Page({
  //页面初始数据
  data: {
    city: "获取中",
    // 轮播图
    swiperArr: [],
    // 导航栏
    navArr: [],
    //拼团
    bookArr: [],
    advArr: [],
    likeArr: []
  },
  // 获取地理位置
  getLocation() {
    let page = this;
    // 1 先通过微信小程序的api获取当前的经纬度
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        // console.log(res);
        const latitude = res.latitude;
        const longitude = res.longitude;
        // 2 把经纬度转成广州 北京。。 要通过腾讯地图来实现
        // 调用接口
        demo.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function (ret) {
            // console.log(ret);
            if (ret.status == 0) {
              let city = ret.result.address_component.city;
              page.setData({
                city: city
              })
            }
          },
          fail: function (ret) {
            console.log(ret);
          },
          complete: function (ret) {
            // console.log(res);
          }
        });
        page.getLikeArr(latitude,longitude)
      }
    })

  },
  //获取轮播图
  getSwiperArr(){
    let page = this;
    //发送请求数据
    wx.request({
      url: 'http://api.meituan.com/index/swiper',
      success(res) {
        if (res.statusCode == 200) {
          page.setData({
            swiperArr: res.data
          });
        }
      }

    })
  },
  //获取导航
  getNavArr() {
    let page = this;
    //发送请求数据
    wx.request({
      url: 'http://api.meituan.com/index/entry',
      success(res) {
        // console.log(res);
        if (res.statusCode == 200) {
          page.setData({
            navArr: res.data
          });
        }
      }

    })
  },
  // 获取拼团
  getBookArr() {
    let page = this;
    // 发送请求获取数据 
    wx.request({
      url: "http://api.meituan.com/index/pingtuan",
      success(res) {
        // console.log(res);
        if (res.statusCode == 200) {
          page.setData({
            bookArr: res.data
          });
        }
      }
    })
  },
  // 获取广告
  getAdvArr() {
    let page = this;
    // 发送请求获取数据 
    wx.request({
      url: "http://api.meituan.com/index/ad",
      success(res) {
        console.log(res);
        if (res.statusCode == 200) {
          page.setData({
            advArr: res.data
          });
        }
      }
    })
  },
  // 获取猜你喜欢
  getLikeArr(latitude, longitude) {
    let page = this;
    // 发送请求获取数据 
    wx.request({
      url: "http://api.meituan.com/index/like",
      success(res) {
        console.log(res);
        if (res.statusCode == 200) {
          // page.setData({
          //   likeArr: res.data
          // });
          // 添加一个新的属性 距离 dis = 人和商店的距离
          //获取经纬度数组 从 likeArr 获取
          let disArr = res.data.map((v)=>{
            return {latitude: v.distance.lat, longitude: v.distance.lng,}
          });
          // 调用腾讯地图的接口 来计算距离
          demo.calculateDistance({
            to: disArr,
            from: {
              latitude: latitude,
              longitude: longitude
            },
            success: function (result) {//调用成功后的函数
              if (result.status == 0) {
                // guessArr 进行处理
                let guessArr = res.data.map((v, i) => {
                  v.dis = result.result.elements[i].distance;//将返回数据存入dis数组，
                  return v;
                });
                page.setData({
                  likeArr: res.data
                });
              }
            },
            fail: function (error) {
              console.error(error);
            },
          }
          )
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLocation();
    this.getSwiperArr();
    this.getNavArr();
    this.getBookArr();
    this.getAdvArr();
    // this.getLikeArr()
  },
  relaunch() {
    wx.reLaunch({
      url: '/pages/router/food/food',
    })
  }
})
