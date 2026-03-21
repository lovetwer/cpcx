<template>
  <view class="push-settings">
    <view class="settings-card">
      <view class="card-header">
        <text class="card-title">📱 推送设置</text>
        <text class="card-subtitle">每日定时推送中奖信息</text>
      </view>
      
      <view class="settings-list">
        <!-- 推送开关 -->
        <view class="setting-item">
          <view class="setting-info">
            <text class="setting-label">启用推送</text>
            <text class="setting-desc">每日定时推送选号统计</text>
          </view>
          <u-switch 
            v-model="settings.enabled" 
            @change="onPushToggle"
            activeColor="#1890ff"
            size="24"
          />
        </view>
        
        <!-- 推送时间显示 -->
        <view class="setting-item" v-if="settings.enabled">
          <view class="setting-info">
            <text class="setting-label">推送时间</text>
            <text class="setting-desc">系统自动推送时间</text>
          </view>
          <view class="time-display">
            <text class="time-list">多时间点推送</text>
          </view>
        </view>
        
        <!-- 推送时间详情 -->
        <view class="push-times-detail" v-if="settings.enabled">
          <view class="detail-header">
            <text class="detail-title">推送时间安排</text>
          </view>
          <view class="time-list">
            <view 
              v-for="(time, index) in pushTimes" 
              :key="index"
              class="time-item"
            >
              <view class="time-info">
                <text class="time-text">{{ formatTime(time) }}</text>
                <text class="time-desc">{{ time.label }}</text>
              </view>
              <view class="time-type" :class="getTypeClass(time.type)">
                <text class="type-text">{{ getTypeLabel(time.type) }}</text>
              </view>
            </view>
          </view>
        </view>
        
        <!-- 推送状态 -->
        <view class="setting-item" v-if="settings.enabled">
          <view class="setting-info">
            <text class="setting-label">推送状态</text>
            <text class="setting-desc">{{ pushStatus.isInitialized ? '正常' : '未初始化' }}</text>
          </view>
          <view class="status-indicator" :class="{ active: pushStatus.isInitialized }">
            <text class="status-text">{{ pushStatus.isInitialized ? '正常' : '异常' }}</text>
          </view>
        </view>
        
        <!-- 测试推送 -->
        <view class="setting-item" v-if="settings.enabled">
          <view class="setting-info">
            <text class="setting-label">测试推送</text>
            <text class="setting-desc">发送一条测试推送消息</text>
          </view>
          <u-button 
            type="primary" 
            size="mini"
            @click="sendTestPush"
            :loading="testing"
            :customStyle="{ width: '120rpx' }"
          >
            {{ testing ? '发送中' : '测试' }}
          </u-button>
        </view>
      </view>
    </view>
    

  </view>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import pushService from '@/utils/push-service.js'
import { PUSH_CONFIG, getPushSettings, savePushSettings } from '@/utils/push-config.js'

// 响应式数据
const settings = reactive({
  enabled: true
})

const pushStatus = reactive({
  isInitialized: false,
  clientId: '',
  isEnabled: false
})

const testing = ref(false)
const pushTimes = ref(PUSH_CONFIG.PUSH_TIMES)

// 格式化时间显示
const formatTime = (time) => {
  const hour = String(time.hour).padStart(2, '0')
  const minute = String(time.minute).padStart(2, '0')
  return `${hour}:${minute}`
}

// 获取推送类型标签
const getTypeLabel = (type) => {
  switch (type) {
    case 'buy_reminder':
      return '买票提醒'
    case 'lottery_check':
      return '中奖检查'
    default:
      return '未知类型'
  }
}

// 获取推送类型样式类
const getTypeClass = (type) => {
  switch (type) {
    case 'buy_reminder':
      return 'type-reminder'
    case 'lottery_check':
      return 'type-check'
    default:
      return 'type-default'
  }
}

// 推送开关切换
const onPushToggle = (enabled) => {
  settings.enabled = enabled
  savePushSettings({ enabled })
  
  // 启用或禁用推送服务
  pushService.togglePush(enabled)
  
  // 更新状态
  updatePushStatus()
  
  uni.showToast({
    title: enabled ? '推送已启用' : '推送已禁用',
    icon: 'success'
  })
}



// 发送测试推送
const sendTestPush = async () => {
  if (testing.value) return
  
  testing.value = true
  
  try {
    await pushService.sendTestPush()
  } catch (error) {
    console.error('测试推送失败:', error)
    uni.showToast({
      title: '测试推送失败',
      icon: 'error'
    })
  } finally {
    testing.value = false
  }
}

// 更新推送状态
const updatePushStatus = () => {
  const status = pushService.getPushStatus()
  Object.assign(pushStatus, status)
}

// 初始化设置
const initSettings = () => {
  const savedSettings = getPushSettings()
  settings.enabled = savedSettings.enabled
  
  // 如果推送已启用，确保推送服务也启用
  if (settings.enabled) {
    pushService.togglePush(true)
  }
}

onMounted(() => {
  initSettings()
  updatePushStatus()
})

// 暴露给父组件的方法
defineExpose({
  updatePushStatus,
  initSettings
})
</script>

<style lang="scss" scoped>
.push-settings {
  padding: 20rpx;
}

.settings-card {
  background: linear-gradient(145deg, #ffffff, #f9fafc);
  border-radius: 28rpx;
  padding: 30rpx;
  box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.08);
  border: 1rpx solid rgba(255, 255, 255, 0.8);
}

.card-header {
  margin-bottom: 30rpx;
  padding-bottom: 20rpx;
  border-bottom: 1rpx solid rgba(0, 0, 0, 0.05);
}

.card-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #1a1a1a;
  display: block;
  margin-bottom: 8rpx;
}

.card-subtitle {
  font-size: 24rpx;
  color: #666;
}

.settings-list {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 0;
}

.setting-info {
  flex: 1;
}

.setting-label {
  font-size: 28rpx;
  font-weight: 500;
  color: #1a1a1a;
  display: block;
  margin-bottom: 4rpx;
}

.setting-desc {
  font-size: 24rpx;
  color: #666;
}

.time-display {
  display: flex;
  align-items: center;
  padding: 12rpx 20rpx;
  background: rgba(24, 144, 255, 0.1);
  border-radius: 20rpx;
  border: 1rpx solid rgba(24, 144, 255, 0.2);
}

.time-list {
  font-size: 26rpx;
  color: #1890ff;
  font-weight: 500;
}

/* 推送时间详情 */
.push-times-detail {
  margin-top: 20rpx;
  padding: 20rpx;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 16rpx;
  border: 1rpx solid rgba(0, 0, 0, 0.05);
}

.detail-header {
  margin-bottom: 16rpx;
}

.detail-title {
  font-size: 26rpx;
  font-weight: 600;
  color: #1a1a1a;
}

.time-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12rpx 0;
  border-bottom: 1rpx solid rgba(0, 0, 0, 0.05);
}

.time-item:last-child {
  border-bottom: none;
}

.time-info {
  flex: 1;
}

.time-text {
  font-size: 28rpx;
  font-weight: 600;
  color: #1a1a1a;
  display: block;
  margin-bottom: 4rpx;
}

.time-desc {
  font-size: 24rpx;
  color: #666;
}

.time-type {
  padding: 6rpx 12rpx;
  border-radius: 12rpx;
  font-size: 22rpx;
}

.type-reminder {
  background: rgba(250, 173, 20, 0.1);
  border: 1rpx solid rgba(250, 173, 20, 0.2);
}

.type-reminder .type-text {
  color: #faad14;
}

.type-check {
  background: rgba(82, 196, 26, 0.1);
  border: 1rpx solid rgba(82, 196, 26, 0.2);
}

.type-check .type-text {
  color: #52c41a;
}

.type-default {
  background: rgba(102, 102, 102, 0.1);
  border: 1rpx solid rgba(102, 102, 102, 0.2);
}

.type-default .type-text {
  color: #666;
}

.type-text {
  font-weight: 500;
}

.status-indicator {
  padding: 8rpx 16rpx;
  border-radius: 16rpx;
  background: rgba(255, 77, 79, 0.1);
  border: 1rpx solid rgba(255, 77, 79, 0.2);
  
  &.active {
    background: rgba(82, 196, 26, 0.1);
    border-color: rgba(82, 196, 26, 0.2);
    
    .status-text {
      color: #52c41a;
    }
  }
}

.status-text {
  font-size: 24rpx;
  color: #ff4d4f;
  font-weight: 500;
}
</style>