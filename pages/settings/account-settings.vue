<template>
  <view class="container">
    <view class="settings-card">
      <!-- <view class="card-header">
        <text class="card-title">👤 账户管理</text>
        <text class="card-subtitle">管理您的账户安全设置</text>
      </view> -->
      
      <view class="settings-list">
        <!-- 账户信息展示 -->
        <view class="setting-section">
          <view class="section-title">
            <text class="section-label">账户信息</text>
          </view>
          
          <view class="info-display-item">
            <view class="info-label">用户名</view>
            <view class="info-value">{{ user.userName || '未设置' }}</view>
          </view>
          
          <view class="info-display-item">
            <view class="info-label">邮箱</view>
            <view class="info-value">{{ user.email || '未设置' }}</view>
          </view>
          
          <view class="info-display-item">
            <view class="info-label">注册时间</view>
            <view class="info-value">{{ formatDate(user.createTime) || '未知' }}</view>
          </view>
        </view>
        
        <!-- 危险操作区域 -->
        <view class="setting-section danger-section">
          <view class="section-title">
            <text class="section-label">危险操作</text>
          </view>
          
          <view class="danger-item" @click="showDeleteAccountModal">
            <view class="danger-info">
              <text class="danger-label">注销账号</text>
              <text class="danger-desc">永久删除账号及所有相关数据，此操作不可恢复</text>
            </view>
            <view class="danger-arrow">
              <text class="arrow-text">></text>
            </view>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 注销账号确认弹窗 -->
    <view v-if="showDeleteConfirm" class="modal-overlay" @click="closeDeleteModal">
      <view class="modal-content" @click.stop>
        <view class="modal-header">
          <text class="modal-title">确认注销账号</text>
        </view>
        <view class="modal-body">
          <text class="modal-message">
            注销账号将会：
          </text>
          <view class="warning-list">
            <text class="warning-item">• 永久删除您的个人信息</text>
            <text class="warning-item">• 清除所有购彩记录</text>
            <text class="warning-item">• 删除推送设置</text>
            <text class="warning-item">• 此操作无法撤销</text>
          </view>
          <text class="confirm-text">
            请输入您的用户名 "{{ user.userName }}" 确认注销：
          </text>
          <u-input 
            v-model="confirmUserName"
            placeholder="请输入用户名确认"
            :customStyle="confirmInputStyle"
            border="surround"
          />
        </view>
        <view class="modal-footer">
          <u-button 
            type="default" 
            :customStyle="cancelButtonStyle"
            @click="closeDeleteModal"
          >
            取消
          </u-button>
          <u-button 
            type="error" 
            :customStyle="deleteButtonStyle"
            @click="confirmDeleteAccount"
            :disabled="confirmUserName !== user.userName"
          >
            确认注销
          </u-button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getUserInfo, deleteUserAccount } from '@/http/api.js'

// 响应式数据
const user = ref({
  id: uni.getStorageSync('userId') || null,
  userName: uni.getStorageSync('userName'),
  email: uni.getStorageSync('email') || null,
  phone: null,
  createTime: null,
  status: '0'
})

const showDeleteConfirm = ref(false)
const confirmUserName = ref('')

// 样式配置
const confirmInputStyle = {
  background: '#fff',
  borderRadius: '8px',
  padding: '12px 16px',
  height: '40px',
  marginTop: '12px',
  border: '1px solid #ff4d4f'
}

const cancelButtonStyle = {
  width: '100px',
  height: '40px',
  marginRight: '12px',
  borderRadius: '8px'
}

const deleteButtonStyle = {
  width: '100px',
  height: '40px',
  borderRadius: '8px'
}

// 方法
const formatDate = (dateString) => {
  if (!dateString) return '未知'
  
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return '未知'
    
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  } catch (error) {
    return '未知'
  }
}

const showDeleteAccountModal = () => {
  showDeleteConfirm.value = true
  confirmUserName.value = ''
}

const closeDeleteModal = () => {
  showDeleteConfirm.value = false
  confirmUserName.value = ''
}

const confirmDeleteAccount = async () => {
  if (confirmUserName.value !== user.value.userName) {
    uni.showToast({
      title: '用户名输入不正确',
      icon: 'error',
      duration: 2000
    })
    return
  }
  
  // 检查用户名是否存在
  if (!user.value.userName) {
    uni.showToast({
      title: '用户信息获取失败，请刷新页面重试',
      icon: 'error',
      duration: 2000
    })
    return
  }
  
  uni.showModal({
    title: '最后确认',
    content: '您确定要永久注销账号吗？此操作无法撤销！',
    confirmText: '确认注销',
    confirmColor: '#ff4d4f',
    success: async (res) => {
      if (res.confirm) {
        await performDeleteAccount()
      }
    }
  })
}

const performDeleteAccount = async () => {
  try {
    uni.showLoading({
      title: '注销中...'
    })
    console.log('用户名:', user.value)
    // 调用注销账号API
    const response = await deleteUserAccount(user.value.userName)
    
    uni.hideLoading()
    
    if (response.code === 200 || response.code === 20000) {
      // 清除本地存储
      uni.removeStorageSync('token')
      uni.removeStorageSync('userName')
      uni.removeStorageSync('email')
      uni.removeStorageSync('pushSettings')
      uni.removeStorageSync('userInfo')
      
      uni.showToast({
        title: '账号已注销',
        icon: 'success',
        duration: 2000
      })
      
      // 延迟跳转到登录页
      setTimeout(() => {
        uni.reLaunch({
          url: '/pages/login/login'
        })
      }, 2000)
    } else {
      uni.showToast({
        title: response.message || '注销失败',
        icon: 'error',
        duration: 2000
      })
    }
  } catch (error) {
    uni.hideLoading()
    console.error('注销账号失败:', error)
    
    uni.showModal({
      title: '注销失败',
      content: error.message || '网络错误，请稍后重试',
      showCancel: false
    })
  }
}

// 生命周期
onMounted(() => {
  console.log('开始获取用户信息，用户名:', user.value.userName)
  
  if (!user.value.userName) {
    console.error('用户名为空，无法获取用户信息')
    uni.showToast({
      title: '用户信息获取失败',
      icon: 'error'
    })
    return
  }
  
  getUserInfo(user.value.userName).then(res => {
    console.log('获取用户信息响应:', res)
    
    if (res.code === 200 && res.data && res.data.user) {
      user.value = {
        ...user.value,
        ...res.data.user
      }
      console.log('用户信息更新成功 (200):', user.value)
    } else if (res.code === 20000 && res.data) {
      user.value = {
        ...user.value,
        ...res.data
      }
      console.log('用户信息更新成功 (20000):', user.value)
    } else {
      console.error('用户信息响应格式异常:', res)
      uni.showToast({
        title: '用户信息获取失败',
        icon: 'error'
      })
    }
  }).catch(err => {
    console.error('获取用户信息失败:', err)
    uni.showToast({
      title: '网络错误，请重试',
      icon: 'error'
    })
  })
})
</script>

<style scoped>
.container {
  min-height: 100vh;
  background: #f5f7fa;
  padding: 20px;
}

.settings-card {
  background: #fff;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.card-header {
  margin-bottom: 32px;
  text-align: center;
}

.card-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  display: block;
  margin-bottom: 8px;
}

.card-subtitle {
  font-size: 14px;
  color: #666;
  display: block;
}

.settings-list {
  width: 100%;
}

.setting-section {
  margin-bottom: 32px;
}

.section-title {
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
}

.section-label {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

/* 账户信息展示样式 */
.info-display-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f8f9fa;
}

.info-display-item:last-child {
  border-bottom: none;
}

.info-label {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

.info-value {
  font-size: 14px;
  color: #333;
  font-weight: 500;
  max-width: 60%;
  text-align: right;
  word-break: break-all;
}

/* 危险操作区域样式 */
.danger-section {
  background: #fff2f0;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #ffccc7;
}

.danger-section .section-title {
  border-bottom: 1px solid #ffccc7;
}

.danger-section .section-label {
  color: #ff4d4f;
}

.danger-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.danger-item:active {
  background-color: #ffe7e6;
  border-radius: 8px;
  margin: 0 -12px;
  padding: 16px 12px;
}

.danger-info {
  flex: 1;
}

.danger-label {
  font-size: 16px;
  color: #ff4d4f;
  font-weight: 600;
  display: block;
  margin-bottom: 4px;
}

.danger-desc {
  font-size: 12px;
  color: #ff7875;
  display: block;
  line-height: 1.4;
}

.danger-arrow {
  margin-left: 12px;
}

.arrow-text {
  font-size: 16px;
  color: #ff7875;
  font-weight: bold;
}

/* 弹窗样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  width: 85%;
  max-width: 360px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  animation: modalSlideIn 0.3s ease-out;
}

.modal-header {
  text-align: center;
  margin-bottom: 20px;
}

.modal-title {
  font-size: 18px;
  font-weight: 600;
  color: #ff4d4f;
}

.modal-body {
  margin-bottom: 24px;
}

.modal-message {
  font-size: 14px;
  color: #333;
  line-height: 1.5;
  margin-bottom: 12px;
  display: block;
}

.warning-list {
  background: #fff2f0;
  border-radius: 8px;
  padding: 12px;
  margin: 12px 0;
}

.warning-item {
  font-size: 12px;
  color: #ff4d4f;
  line-height: 1.6;
  display: block;
  margin-bottom: 4px;
}

.warning-item:last-child {
  margin-bottom: 0;
}

.confirm-text {
  font-size: 13px;
  color: #666;
  line-height: 1.5;
  margin: 16px 0 8px 0;
  display: block;
}

.modal-footer {
  display: flex;
  justify-content: center;
  gap: 12px;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* 动画效果 */
.settings-card {
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>