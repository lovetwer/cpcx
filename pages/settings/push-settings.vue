<template>
  <view class="container">
    <view class="settings-card">
      <!-- <view class="card-header">
        <text class="card-title">📱 推送通知</text>
        <text class="card-subtitle">管理您的推送提醒设置</text>
      </view> -->
      
      <view class="settings-list">
        <!-- 推送总开关 -->
        <view class="setting-item">
          <view class="setting-info">
            <text class="setting-label">启用推送通知</text>
            <text class="setting-desc">接收买票提醒和开奖通知</text>
          </view>
          <u-switch 
            v-model="settings.pushEnabled" 
            @change="onPushToggle"
            activeColor="#1890ff"
            size="24"
          />
        </view>
        
        <!-- 买票提醒设置 -->
        <view class="setting-section" v-if="settings.pushEnabled">
          <!-- <view class="section-title">
            <text class="section-label">🎫 买票提醒</text>
          </view> -->
          
          <view class="setting-item">
            <view class="setting-info">
              <text class="setting-label">启用买票提醒</text>
              <text class="setting-desc">每日提醒您选号购买彩票</text>
            </view>
            <u-switch 
              v-model="settings.buyReminderEnabled" 
              @change="onBuyReminderToggle"
              activeColor="#52c41a"
              size="20"
            />
          </view>
          
          <!-- 买票提醒时间列表 -->
          <view class="time-list" v-if="settings.buyReminderEnabled">
            <view class="time-item" v-for="(time, index) in settings.buyReminderTimes" :key="index">
              <view class="time-info">
                <text class="time-label">提醒时间 {{ index + 1 }}</text>
                <text class="time-value">{{ formatTime(time) }}</text>
              </view>
              <view class="time-actions">
                <u-button 
                  type="primary" 
                  size="mini"
                  :customStyle="timeButtonStyle"
                  @click="showTimePicker('buyReminder', index)"
                >
                  修改
                </u-button>
                <u-button 
                  type="error" 
                  size="mini"
                  :customStyle="deleteButtonStyle"
                  @click="removeBuyReminderTime(index)"
                  v-if="settings.buyReminderTimes.length > 1"
                >
                  删除
                </u-button>
              </view>
            </view>
            
            <view class="add-time-btn" v-if="settings.buyReminderTimes.length < 4">
              <u-button 
                type="default" 
                size="small"
                :customStyle="addButtonStyle"
                @click="addBuyReminderTime"
              >
                + 添加提醒时间
              </u-button>
            </view>
          </view>
        </view>
        
        <!-- 开奖提醒设置 -->
        <view class="setting-section" v-if="settings.pushEnabled">
          <!-- <view class="section-title">
            <text class="section-label">🎉 开奖提醒</text>
          </view> -->
          
          <view class="setting-item">
            <view class="setting-info">
              <text class="setting-label">启用开奖提醒</text>
              <text class="setting-desc">开奖后推送中奖结果</text>
            </view>
            <u-switch 
              v-model="settings.lotteryReminderEnabled" 
              @change="onLotteryReminderToggle"
              activeColor="#ff7875"
              size="20"
            />
          </view>
          
          <!-- 开奖提醒时间列表 -->
          <view class="time-list" v-if="settings.lotteryReminderEnabled">
            <view class="time-item" v-for="(time, index) in settings.lotteryReminderTimes" :key="index">
              <view class="time-info">
                <text class="time-label">开奖提醒 {{ index + 1 }}</text>
                <text class="time-value">{{ formatTime(time) }}</text>
              </view>
              <view class="time-actions">
                <u-button 
                  type="primary" 
                  size="mini"
                  :customStyle="timeButtonStyle"
                  @click="showTimePicker('lotteryReminder', index)"
                >
                  修改
                </u-button>
                <u-button 
                  type="error" 
                  size="mini"
                  :customStyle="deleteButtonStyle"
                  @click="removeLotteryReminderTime(index)"
                  v-if="settings.lotteryReminderTimes.length > 1"
                >
                  删除
                </u-button>
              </view>
            </view>
            
            <view class="add-time-btn" v-if="settings.lotteryReminderTimes.length < 4">
              <u-button 
                type="default" 
                size="small"
                :customStyle="addButtonStyle"
                @click="addLotteryReminderTime"
              >
                + 添加开奖提醒
              </u-button>
            </view>
          </view>
        </view>
        
        <!-- 推送测试 -->
        <view class="setting-section" v-if="settings.pushEnabled">
          <view class="section-title">
            <text class="section-label">🧪 功能测试</text>
          </view>
          
          <view class="setting-item">
            <view class="setting-info">
              <text class="setting-label">推送测试</text>
              <text class="setting-desc">测试推送功能是否正常工作</text>
            </view>
            <u-button 
              type="warning" 
              size="small"
              :customStyle="testButtonStyle"
              @click="testPush"
            >
              发送测试
            </u-button>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 时间选择器 -->
    <u-datetime-picker
      ref="datetimePicker"
      v-model="tempTime"
      mode="time"
      :show="showTimePickerModal"
      @close="closeTimePicker"
      @confirm="confirmTime"
      title="选择时间"
    />
  </view>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import pushService from '@/utils/push-service.js'
import pushTest from '@/utils/push-test.js'

// 响应式数据
const settings = reactive({
  pushEnabled: true,
  buyReminderEnabled: true,
  buyReminderTimes: [
    { hour: 17, minute: 0 }, // 下午5点
    { hour: 21, minute: 0 }  // 晚上9点
  ],
  lotteryReminderEnabled: true,
  lotteryReminderTimes: [
    { hour: 22, minute: 0 }, // 晚上10点
    { hour: 23, minute: 0 }  // 晚上11点
  ]
})

const showTimePickerModal = ref(false)
const tempTime = ref(new Date())
const currentTimeType = ref('')
const currentTimeIndex = ref(0)

// 样式配置
const timeButtonStyle = {
  width: '60px',
  height: '32px',
  fontSize: '12px',
  marginRight: '8px'
}

const deleteButtonStyle = {
  width: '60px',
  height: '32px',
  fontSize: '12px'
}

const addButtonStyle = {
  width: '140px',
  height: '36px',
  fontSize: '14px',
  marginTop: '12px'
}

const testButtonStyle = {
  width: '80px',
  height: '32px',
  fontSize: '12px'
}

// 方法
const formatTime = (time) => {
  // 安全的时间格式化，防止 NaN
  if (!time || typeof time.hour !== 'number' || typeof time.minute !== 'number') {
    return '00:00'
  }
  
  const hour = Math.max(0, Math.min(23, Math.floor(time.hour)))
  const minute = Math.max(0, Math.min(59, Math.floor(time.minute)))
  
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
}

const onPushToggle = (value) => {
  settings.pushEnabled = value
  saveSettings()
  
  if (value) {
    pushService.init()
    uni.showToast({
      title: '推送已启用',
      icon: 'success'
    })
  } else {
    uni.showToast({
      title: '推送已关闭',
      icon: 'none'
    })
  }
}

const onBuyReminderToggle = (value) => {
  settings.buyReminderEnabled = value
  saveSettings()
}

const onLotteryReminderToggle = (value) => {
  settings.lotteryReminderEnabled = value
  saveSettings()
}

const showTimePicker = (type, index) => {
  currentTimeType.value = type
  currentTimeIndex.value = index
  
  let currentTime
  if (type === 'buyReminder') {
    currentTime = settings.buyReminderTimes[index]
  } else {
    currentTime = settings.lotteryReminderTimes[index]
  }
  
  // 确保时间数据有效
  const hour = parseInt(currentTime?.hour) || 0
  const minute = parseInt(currentTime?.minute) || 0
  
  console.log('打开时间选择器:', { type, index, currentTime, hour, minute })
  
  const date = new Date()
  date.setHours(hour, minute, 0, 0)
  tempTime.value = date
  
  showTimePickerModal.value = true
}

const closeTimePicker = () => {
  showTimePickerModal.value = false
}

const confirmTime = (value) => {
  console.log('确认时间选择:', value)
  
  let hour, minute
  
  // 处理不同格式的时间数据
  if (value && typeof value === 'object' && value.value) {
    // uView时间选择器返回格式: {value: "HH:MM", mode: "time"}
    const timeStr = value.value
    const timeParts = timeStr.split(':')
    hour = parseInt(timeParts[0]) || 0
    minute = parseInt(timeParts[1]) || 0
  } else if (value instanceof Date) {
    // Date对象格式
    hour = value.getHours()
    minute = value.getMinutes()
  } else if (typeof value === 'string') {
    // 字符串格式 "HH:MM"
    const timeParts = value.split(':')
    hour = parseInt(timeParts[0]) || 0
    minute = parseInt(timeParts[1]) || 0
  } else {
    console.error('未知的时间格式:', value)
    uni.showToast({
      title: '时间格式错误',
      icon: 'error'
    })
    return
  }
  
  console.log('解析的时间:', { hour, minute })
  
  // 确保时间数据有效
  if (isNaN(hour) || isNaN(minute) || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
    console.error('时间数据无效:', { hour, minute })
    uni.showToast({
      title: '时间格式错误',
      icon: 'error'
    })
    return
  }
  
  if (currentTimeType.value === 'buyReminder') {
    settings.buyReminderTimes[currentTimeIndex.value] = { hour, minute }
  } else {
    settings.lotteryReminderTimes[currentTimeIndex.value] = { hour, minute }
  }
  
  console.log('更新后的设置:', settings)
  
  saveSettings()
  showTimePickerModal.value = false
  
  uni.showToast({
    title: '时间已更新',
    icon: 'success'
  })
}

const addBuyReminderTime = () => {
  if (settings.buyReminderTimes.length < 4) {
    settings.buyReminderTimes.push({ hour: 12, minute: 0 })
    saveSettings()
  }
}

const removeBuyReminderTime = (index) => {
  if (settings.buyReminderTimes.length > 1) {
    settings.buyReminderTimes.splice(index, 1)
    saveSettings()
  }
}

const addLotteryReminderTime = () => {
  if (settings.lotteryReminderTimes.length < 4) {
    settings.lotteryReminderTimes.push({ hour: 20, minute: 0 })
    saveSettings()
  }
}

const removeLotteryReminderTime = (index) => {
  if (settings.lotteryReminderTimes.length > 1) {
    settings.lotteryReminderTimes.splice(index, 1)
    saveSettings()
  }
}

const testPush = async () => {
  try {
    uni.showLoading({ title: '发送测试推送...' })
    
    const result = await pushTest.quickTest()
    
    uni.hideLoading()
    
    if (result) {
      uni.showToast({
        title: '测试推送发送成功',
        icon: 'success'
      })
    }
  } catch (error) {
    uni.hideLoading()
    console.error('测试推送失败:', error)
    
    uni.showModal({
      title: '测试失败',
      content: error.message || '推送测试失败，请检查推送配置',
      showCancel: false
    })
  }
}

const saveSettings = () => {
  // 确保保存前数据格式正确
  const settingsToSave = {
    ...settings,
    buyReminderTimes: settings.buyReminderTimes.map(time => ({
      hour: parseInt(time.hour) || 0,
      minute: parseInt(time.minute) || 0
    })),
    lotteryReminderTimes: settings.lotteryReminderTimes.map(time => ({
      hour: parseInt(time.hour) || 0,
      minute: parseInt(time.minute) || 0
    }))
  }
  
  uni.setStorageSync('pushSettings', JSON.stringify(settingsToSave))
  console.log('设置已保存:', settingsToSave)
  
  // 更新推送服务配置
  if (settings.pushEnabled) {
    pushService.updateSettings({
      buyReminderEnabled: settings.buyReminderEnabled,
      buyReminderTimes: settingsToSave.buyReminderTimes,
      lotteryReminderEnabled: settings.lotteryReminderEnabled,
      lotteryReminderTimes: settingsToSave.lotteryReminderTimes
    })
  }
}

const loadSettings = () => {
  try {
    const savedSettings = uni.getStorageSync('pushSettings')
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings)
      
      // 确保时间数据格式正确
      if (parsed.buyReminderTimes) {
        parsed.buyReminderTimes = parsed.buyReminderTimes.map(time => ({
          hour: parseInt(time.hour) || 0,
          minute: parseInt(time.minute) || 0
        }))
      }
      
      if (parsed.lotteryReminderTimes) {
        parsed.lotteryReminderTimes = parsed.lotteryReminderTimes.map(time => ({
          hour: parseInt(time.hour) || 0,
          minute: parseInt(time.minute) || 0
        }))
      }
      
      Object.assign(settings, parsed)
      console.log('设置加载成功:', settings)
    }
  } catch (error) {
    console.error('加载设置失败:', error)
    // 如果加载失败，重置为默认设置
    settings.buyReminderTimes = [
      { hour: 17, minute: 0 },
      { hour: 21, minute: 0 }
    ]
    settings.lotteryReminderTimes = [
      { hour: 22, minute: 0 },
      { hour: 23, minute: 0 }
    ]
  }
}

// 生命周期
onMounted(() => {
  loadSettings()
  
  // 如果是首次访问，保存默认设置
  const savedSettings = uni.getStorageSync('pushSettings')
  if (!savedSettings) {
    console.log('首次访问，保存默认推送设置')
    saveSettings()
  }
  
  // 初始化推送服务
  if (settings.pushEnabled) {
    pushService.init()
  }
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

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f8f9fa;
}

.setting-item:last-child {
  border-bottom: none;
}

.setting-info {
  flex: 1;
}

.setting-label {
  font-size: 16px;
  color: #333;
  font-weight: 500;
  display: block;
  margin-bottom: 4px;
}

.setting-desc {
  font-size: 12px;
  color: #999;
  display: block;
}

.time-list {
  margin-left: 16px;
  padding-left: 16px;
  border-left: 2px solid #f0f0f0;
}

.time-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f8f9fa;
}

.time-info {
  flex: 1;
}

.time-label {
  font-size: 14px;
  color: #666;
  display: block;
  margin-bottom: 4px;
}

.time-value {
  font-size: 16px;
  color: #1890ff;
  font-weight: 600;
  display: block;
}

.time-actions {
  display: flex;
  align-items: center;
}

.add-time-btn {
  text-align: center;
  padding: 16px 0;
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