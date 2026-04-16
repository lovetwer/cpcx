// 彩票系统 API 接口 - 基于RESTful规范重构

import request, { uploadFile } from './request';

// 获取基础URL（API接口）
const BASE_URL = uni.getStorageSync('baseUrl') || 'https://lhbkkueeculj.ap-northeast-1.clawcloudrun.com';

// 分享链接域名（前端页面）
const SHARE_DOMAIN = 'https://cpcx.800820882.xyz';

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
 */
export const updateLotteryStatus = (id, status) => {
  return request(`/api/lottery/${id}/status`, 'PUT', { status });
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
  
  // 根据平台确定分享链接域名
  // #ifdef H5
  // H5环境优先用当前访问域名，确保页面能正常打开
  let shareOrigin = window.location.origin;
  // 如果当前不是分享域名（比如本地开发），则使用分享域名
  if (!shareOrigin.includes('cpcx.')) {
    shareOrigin = SHARE_DOMAIN;
  }
  // #endif

  // #ifndef H5
  // 非H5环境直接使用分享域名
  let shareOrigin = SHARE_DOMAIN;
  // #endif

  return `${shareOrigin}/#/pages/share/lottery?data=${encodedData}`;
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

/**
 * 注销用户账号
 * @param {string} userName - 用户名
 */
export const deleteUserAccount = (userName) => {
  return request(`/api/user/delete?userName=${encodeURIComponent(userName)}`, 'POST');
};

// ===== 测试邮件接口 =====

/**
 * 测试发送邮件
 * @param {string} to - 收件人邮箱地址
 * @param {number} [prize=1] - 中奖等级
 */
export const testSendEmail = (to, prize = 1) => {
  return request(`/api/test/send-email?to=${encodeURIComponent(to)}&prize=${prize}`, 'GET');
};

// ===== AI智能选号接口 =====

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
  return uploadFile('/api/upload', filePath, formData);
};

/**
 * 获取上传状态
 * @param {string} uploadBatchId - 上传批次ID
 */
export const getUploadStatus = (uploadBatchId) => {
  return request('/api/upload/status', 'GET', { uploadBatchId });
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

// // 文件上传兼容接口
// export const uploadImage = uploadLotteryImage;

	