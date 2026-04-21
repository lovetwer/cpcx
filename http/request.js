// src/utils/request.js
//'http://192.168.31.86:8080'
//'http://localhost:8080'
// 'http://120.77.0.32:8080'
//'http://101.126.90.167:8080'
 //const BASE_URL = 'http://192.168.31.86:8080'
//const BASE_URL = 'https://lhbkkueeculj.ap-northeast-1.clawcloudrun.com'
const BASE_URL = 'https://cpcxapi.800820882.xyz'
// 保存BASE_URL到本地存储，供其他地方使用
uni.setStorageSync('baseUrl', BASE_URL);

const request = (url, method, data = {}, header = {}, timeout = 300000) => {
  return new Promise((resolve, reject) => {
    // 获取当前页面路径
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const currentPath = currentPage ? currentPage.route : '';
    
    // 检查是否是分享页面，分享页面不需要token验证
    const isSharePage = currentPath.includes('pages/share/');
    
    // 同时检测 token 和用户名，放行登录注册接口和分享页面
    const token = uni.getStorageSync('token');
    const userName = uni.getStorageSync('userName');
    const isAuthApi = url.includes('/api/user/register') || url.includes('/api/user/login');
    
    if (!token && !userName && !isAuthApi && !isSharePage) {
      uni.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000,
      });
      uni.navigateTo({
        url: '/pages/login/login',
      });
      return;
    }
    
    // 如果有 token，添加到请求头
    const authHeader = token ? { 'Authorization': `Bearer ${token}` } : {};
    
    uni.request({
      url: `${BASE_URL}${url}`,
      method,
      data,
      timeout,
      header: {
        ...header,
        ...authHeader,
        'Content-Type': 'application/json',
      },
      success: (res) => {
        resolve(res.data);
      },
      fail: (err) => {
        uni.showToast({
          title: '请求失败',
          icon: 'none',
        });
        reject(err);
      },
    });
  });
};

// 文件上传请求函数
const uploadFile = (url, filePath, formData = {}, timeout = 60000) => {
  return new Promise((resolve, reject) => {
    // 获取当前页面路径
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const currentPath = currentPage ? currentPage.route : '';
    
    // 检查是否是分享页面，分享页面不需要token验证
    const isSharePage = currentPath.includes('pages/share/');
    
    if(!uni.getStorageSync('userName') && url !== '/register' && url !== '/login' && !isSharePage){
      uni.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000,
      })
      uni.navigateTo({
        url: '/pages/login/login',
      })
      return
    }
    
    uni.uploadFile({
      url: `${BASE_URL}${url}`,
      filePath: filePath,
      name: 'file',
      formData: formData,
      success: (uploadRes) => {
        // 解析返回的JSON字符串
        const result = JSON.parse(uploadRes.data);
        resolve(result);
      },
      fail: (err) => {
        uni.showToast({
          title: '上传失败',
          icon: 'none',
        });
        reject(err);
      }
    });
  });
};

export { request as default, uploadFile };
