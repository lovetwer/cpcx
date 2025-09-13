// 彩票系统 API 接口 - 基于RESTful规范重构

import request, { uploadFile } from './request';

// 获取基础URL
const BASE_URL = uni.getStorageSync('baseUrl') || 'http://101.126.90.167';

// ===== 彩票管理相关接口 =====

/**
 * 添加彩票记录
 * @param {Object} data - 彩票数据
 * @param {string} data.user - 用户名
 * @param {string} data.redBall - 红球号码，逗号分隔
 * @param {string} data.blueBall - 蓝球号码，逗号分隔
 * @param {string} data.type - 彩票类型: ssq(双色球)/dlt(大乐透)
 * @param {number} [data.multiple=1] - 倍数
 * @param {number} [data.money=2] - 金额
 * @param {string} [data.openTime] - 开奖时间
 */
export const addLottery = (data) => {
  return request('/api/lottery', 'POST', data);
};

/**
 * 批量添加彩票
 * @param {Array} data - 彩票数据数组
 */
export const addLotteryBatch = (data) => {
  return request('/api/lottery/batch', 'POST', data);
};

/**
 * 查询用户彩票记录
 * @param {string} user - 用户名
 * @param {Object} [params] - 可选参数
 * @param {string} [params.type] - 彩票类型
 * @param {string} [params.status] - 状态
 * @param {string} [params.startTime] - 开始时间
 * @param {string} [params.endTime] - 结束时间
 */
export const getLotteryByUser = (user, params = {}) => {
  return request(`/api/lottery/user/${user}`, 'GET', params);
};

/**
 * 条件查询彩票记录
 * @param {Object} params - 查询条件
 */
export const searchLottery = (params) => {
  return request('/api/lottery/search', 'POST', params);
};

/**
 * 删除彩票记录
 * @param {number|string} id - 记录ID
 */
export const deleteLottery = (id) => {
  return request(`/api/lottery/${id}`, 'DELETE');
};

/**
 * 更新彩票状态
 * @param {number|string} id - 记录ID
 * @param {string} status - 状态
 * @param {string} [winChance] - 中奖信息
 */
export const updateLotteryStatus = (id, status, winChance) => {
  return request(`/api/lottery/${id}/status`, 'PUT', { status, winChance });
};

/**
 * 开奖检查
 */
export const checkPrize = () => {
  return request('/api/lottery/check-prize', 'POST');
};

/**
 * 生成彩票记录分享链接
 * @param {Object} record - 彩票记录对象
 * @returns {string} - 分享链接
 */
export const generateShareLink = (record) => {
  // 创建一个包含必要信息的对象
  const shareData = {
    id: record.id,
    type: record.type,
    redBall: record.redBall,
    blueBall: record.blueBall,
    openTime: record.openTime,
    status: record.status,
    user: record.user
  };
  
  // 将对象转换为Base64编码的字符串
  const encodedData = encodeURIComponent(btoa(JSON.stringify(shareData)));
  
  // 获取当前应用的域名或基础路径
  let baseUrl;
  
  // 根据平台确定基础URL和路径格式
  let shareUrl;
  
  // #ifdef H5
  // H5环境使用相对路径，使用hash路由格式
  shareUrl = `${window.location.origin}/#/pages/share/lottery?data=${encodedData}`;
  // #endif
  
  // #ifdef APP-PLUS
  // App环境使用完整URL，确保使用HTTP协议和80端口，使用hash路由格式
  let appBaseUrl = BASE_URL.replace(/:\d+/, ':80'); // 替换任何端口为80
  // 确保使用HTTP协议
  appBaseUrl = appBaseUrl.replace(/^https:/i, 'http:');
  if (!appBaseUrl.startsWith('http')) {
    shareUrl = `http://${appBaseUrl}/#/pages/share/lottery?data=${encodedData}`;
  } else {
    shareUrl = `${appBaseUrl}/#/pages/share/lottery?data=${encodedData}`;
  }
  // #endif
  
  // #ifndef H5 || APP-PLUS
  // 其他环境，使用hash路由格式
  let otherBaseUrl = BASE_URL.replace(/:\d+/, ':80'); // 替换任何端口为80
  // 确保使用HTTP协议
  otherBaseUrl = otherBaseUrl.replace(/^https:/i, 'http:');
  if (!otherBaseUrl.startsWith('http')) {
    shareUrl = `http://${otherBaseUrl}/#/pages/share/lottery?data=${encodedData}`;
  } else {
    shareUrl = `${otherBaseUrl}/#/pages/share/lottery?data=${encodedData}`;
  }
  // #endif
  
  // 返回分享链接
  return shareUrl;
};

// ===== 用户相关接口 =====

/**
 * 用户注册
 * @param {Object} data - 用户信息
 * @param {string} data.username - 用户名
 * @param {string} data.password - 密码
 * @param {string} [data.email] - 邮箱
 * @param {string} [data.phone] - 手机号
 */
export const registerUser = (data) => {
  return request('/api/user/register', 'POST', data);
};

/**
 * 用户登录
 * @param {Object} data - 登录信息
 * @param {string} data.username - 用户名
 * @param {string} data.password - 密码
 */
export const loginUser = (data) => {
  return request('/api/user/login', 'POST', data);
};

/**
 * 查询用户信息
 * @param {string} username - 用户名
 */
export const getUserInfo = (username) => {
  return request(`/api/user/${username}`, 'GET');
};

/**
 * 更新用户信息
 * @param {string} username - 用户名
 * @param {Object} data - 更新数据
 */
export const updateUserInfo = (username, data) => {
  return request(`/api/user/updateUser`, 'POST', data);
};

// ===== AI相关接口 =====

/**
 * AI计算中奖概率
 * @param {Object} params - 计算参数
 * @param {string} params.number - 号码组合
 * @param {string} params.type - 彩票类型
 */
export const calculateWinProbability = (params) => {
  return request('/api/lottery/probability', 'GET', params);
};

/**
 * AI智能选号
 * @param {Object} params - 选号参数
 * @param {string} params.type - 彩票类型
 * @param {number} [params.count=1] - 生成数量
 */
export const generateNumbers = (params) => {
  return request('/api/lottery/aiChance', 'GET', params);
};

// ===== 文件上传相关接口 =====

/**
 * 上传彩票图片识别
 * @param {string} filePath - 图片文件路径
 * @param {Object} formData - 附加数据
 * @param {string} [formData.user] - 用户名
 */
export const uploadLotteryImage = (filePath, formData = {}) => {
  return uploadFile('/upload', filePath, formData);
};

/**
 * 获取上传状态
 * @param {string} uploadBatchId - 上传批次ID
 */
export const getUploadStatus = (uploadBatchId) => {
  return request('/upload/status', 'GET', { uploadBatchId });
};

// // ===== 兼容旧接口（逐步废弃）=====

// // 以下接口为兼容旧版本，建议逐步迁移到新接口
// export const addCp = addLottery;
// export const findCpByUser = (data) => getLotteryByUser(data.user, data);
// export const delCp = (data) => deleteLottery(data.id);
// export const findCp = searchLottery;
// export const register = registerUser;
// export const login = loginUser;
// export const findUserByName = getUserInfo;
// export const updateUser = (data) => updateUserInfo(data.username, data);

// // AI相关兼容接口
// export const aiGuess = calculateWinProbability;
// export const aiChance = generateNumbers;

// // 文件上传兼容接口
// export const uploadImage = uploadLotteryImage;

	