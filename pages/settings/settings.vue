<template>
  <view class="container">
    <view class="settings-card">
      <!-- <view class="card-header">
        <text class="card-title">⚙️ 设置</text>
        <text class="card-subtitle">管理您的应用偏好设置</text>
      </view> -->
      
      <view class="settings-list">
        <!-- 推送通知设置 -->
        <view class="setting-item" @click="goToPushSettings">
          <view class="setting-left">
            <view class="setting-info">
              <text class="setting-label">推送通知</text>
              <text class="setting-desc">管理买票提醒和开奖通知</text>
            </view>
          </view>
          <view class="setting-right">
            <view class="setting-status">
              <text class="status-text">{{ pushStatus }}</text>
            </view>
          </view>
        </view>
        
        <!-- 账户管理 -->
        <view class="setting-item" @click="goToAccountSettings">
          <view class="setting-left">
            <view class="setting-info">
              <text class="setting-label">账户管理</text>
              <text class="setting-desc">个人信息和安全设置</text>
            </view>
          </view>
          <view class="setting-right">
            <view class="setting-status">
              <text class="status-text">{{ currentUser }}</text>
            </view>
          </view>
        </view>
        
        <!-- 关于应用 -->
        <view class="setting-item" @click="goToAbout">
          <view class="setting-left">
            <view class="setting-info">
              <text class="setting-label">关于应用</text>
              <text class="setting-desc">版本信息和帮助</text>
            </view>
          </view>
          <view class="setting-right">
            <view class="setting-status">
              <text class="status-text">v1.0.0</text>
            </view>
          </view>
        </view>
        
        <!-- 退出登录 -->
        <view class="setting-item logout-item" @click="showLogoutModal">
          <view class="setting-left">
            <view class="setting-info">
              <text class="setting-label logout-label">退出登录</text>
              <text class="setting-desc">退出当前账户</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 退出登录确认弹窗 -->
    <view v-if="showLogoutConfirm" class="modal-overlay" @click="closeLogoutModal">
      <view class="modal-content" @click.stop>
        <view class="modal-header">
          <text class="modal-title">确认退出</text>
        </view>
        <view class="modal-body">
          <text class="modal-message">确定要退出登录吗？退出后需要重新登录。</text>
        </view>
        <view class="modal-footer">
          <u-button 
            type="default" 
            :customStyle="cancelButtonStyle"
            @click="closeLogoutModal"
          >
            取消
          </u-button>
          <u-button 
            type="error" 
            :customStyle="confirmButtonStyle"
            @click="confirmLogout"
          >
            确定退出
          </u-button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// 响应式数据
const showLogoutConfirm = ref(false)
const pushSettingsData = ref(null)

// 计算属性
const currentUser = computed(() => {
  return uni.getStorageSync('userName') || '未登录'
})

const pushStatus = computed(() => {
  try {
    // 先尝试从响应式数据获取
    if (pushSettingsData.value) {
      return pushSettingsData.value.pushEnabled ? '已开启' : '已关闭'
    }
    
    // 再从本地存储获取
    const settings = uni.getStorageSync('pushSettings')
    if (settings) {
      const parsed = JSON.parse(settings)
      pushSettingsData.value = parsed
      return parsed.pushEnabled ? '已开启' : '已关闭'
    }
    return '未设置'
  } catch (error) {
    console.error('获取推送设置失败:', error)
    return '未设置'
  }
})

// 样式配置
const cancelButtonStyle = {
  width: '100px',
  height: '40px',
  marginRight: '12px',
  borderRadius: '8px'
}

const confirmButtonStyle = {
  width: '100px',
  height: '40px',
  borderRadius: '8px'
}

// 方法
const goToPushSettings = () => {
    console.log('go to push settings')
  uni.navigateTo({
    url: '/pages/settings/push-settings'
  })
}

const goToAccountSettings = () => {
  uni.navigateTo({
    url: '/pages/settings/account-settings'
  })
}

const goToAbout = () => {
  uni.navigateTo({
    url: '/pages/settings/about'
  })
}

const showLogoutModal = () => {
  showLogoutConfirm.value = true
}

const closeLogoutModal = () => {
  showLogoutConfirm.value = false
}

const confirmLogout = () => {
  uni.removeStorageSync('token')
  uni.removeStorageSync('userName')
  uni.removeStorageSync('email')
  uni.removeStorageSync('pushSettings')
  
  uni.showToast({
    title: '已退出登录',
    icon: 'success'
  })
  
  setTimeout(() => {
    uni.reLaunch({
      url: '/pages/login/login'
    })
  }, 1000)
}

// 生命周期
onMounted(() => {
  // 页面加载时刷新推送设置状态
  refreshPushStatus()
})

// 刷新推送设置状态
const refreshPushStatus = () => {
  try {
    const settings = uni.getStorageSync('pushSettings')
    if (settings) {
      pushSettingsData.value = JSON.parse(settings)
    } else {
      // 如果没有设置，设置默认值并保存
      const defaultSettings = {
        pushEnabled: true,
        buyReminderEnabled: true,
        buyReminderTimes: [
          { hour: 17, minute: 0 },
          { hour: 21, minute: 0 }
        ],
        lotteryReminderEnabled: true,
        lotteryReminderTimes: [
          { hour: 22, minute: 0 },
          { hour: 23, minute: 0 }
        ]
      }
      uni.setStorageSync('pushSettings', JSON.stringify(defaultSettings))
      pushSettingsData.value = defaultSettings
      console.log('初始化默认推送设置:', defaultSettings)
    }
  } catch (error) {
    console.error('刷新推送设置失败:', error)
  }
}
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

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #f8f9fa;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.setting-item:last-child {
  border-bottom: none;
}

.setting-item:active {
  background-color: #f8f9fa;
  border-radius: 12px;
  margin: 0 -16px;
  padding: 20px 16px;
}

.setting-left {
  display: flex;
  align-items: center;
  flex: 1;
}

.setting-icon { display: none; }

.icon-text { display: none; }

.setting-info {
  flex: 1;
  min-width: 0;
}

.setting-label {
  font-size: 16px;
  color: #333;
  font-weight: 500;
  display: block;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.setting-desc {
  font-size: 12px;
  color: #999;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.setting-right {
  display: flex;
  align-items: center;
  gap: 8px;
  max-width: 40%;
  justify-content: flex-end;
}

.setting-status {
  text-align: right;
}

.status-text {
  font-size: 12px;
  color: #666;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 退出登录特殊样式 */
.logout-item {
  background: #fff2f0;
  border-radius: 12px;
  padding: 20px 16px;
  margin-top: 16px;
  border: 1px solid #ffccc7;
}

.logout-icon {
  background: #fff2f0 !important;
}

.logout-label {
  color: #ff4d4f !important;
}

/* 弹窗样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  width: 80%;
  max-width: 320px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  animation: modalSlideIn 0.3s ease-out;
}

.modal-header {
  text-align: center;
  margin-bottom: 16px;
}

.modal-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.modal-body {
  text-align: center;
  margin-bottom: 24px;
}

.modal-message {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.modal-footer {
  display: flex;
  justify-content: center;
  gap: 10px;
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