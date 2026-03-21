<template>
  <view class="container">
    <view class="about-card">
      <view class="card-header">
        <image class="app-logo" src="/static/1756360024.png" mode="aspectFit"></image>
        <text class="app-name">彩票助手</text>
        <text class="app-version">版本 {{ appVersion }}</text>
      </view>
      
      <view class="info-list">
        <!-- 应用信息 -->
        <view class="info-section">
          <view class="section-title">
            <text class="section-label">应用信息</text>
          </view>
          
          <view class="info-item">
            <text class="info-label">应用名称</text>
            <text class="info-value">cpcx</text>
          </view>
          
          <view class="info-item">
            <text class="info-label">当前版本</text>
            <text class="info-value">{{ appVersion }}</text>
          </view>
          
          <view class="info-item">
            <text class="info-label">发布日期</text>
            <text class="info-value">{{ releaseDate }}</text>
          </view>
          
          <view class="info-item">
            <text class="info-label">开发者</text>
            <text class="info-value">lovetwer</text>
          </view>
        </view>
        
        <!-- 功能介绍 -->
        <view class="info-section">
          <view class="section-title">
            <text class="section-label">主要功能</text>
          </view>
          
          <view class="feature-list">
            <view class="feature-item">
              <view class="feature-icon">
                <u-icon name="star" color="#1890ff" size="24"></u-icon>
              </view>
              <view class="feature-info">
                <text class="feature-title">智能选号</text>
                <text class="feature-desc">支持双色球、大乐透智能选号</text>
              </view>
            </view>
            
            <view class="feature-item">
              <view class="feature-icon">
                <u-icon name="search" color="#52c41a" size="24"></u-icon>
              </view>
              <view class="feature-info">
                <text class="feature-title">开奖查询</text>
                <text class="feature-desc">实时查询最新开奖结果</text>
              </view>
            </view>
            
            <view class="feature-item">
              <view class="feature-icon">
                <u-icon name="bell" color="#faad14" size="24"></u-icon>
              </view>
              <view class="feature-info">
                <text class="feature-title">推送提醒</text>
                <text class="feature-desc">买票提醒和开奖通知</text>
              </view>
            </view>
            
            <view class="feature-item">
              <view class="feature-icon">
                <u-icon name="setting" color="#722ed1" size="24"></u-icon>
              </view>
              <view class="feature-info">
                <text class="feature-title">便捷管理</text>
                <text class="feature-desc">个人信息和设置管理</text>
              </view>
            </view>
          </view>
        </view>
        
        <!-- 联系我们 -->
        <view class="info-section">
          <view class="section-title">
            <text class="section-label">联系我们</text>
          </view>
          
          <view class="contact-list">
            <view class="contact-item">
              <view class="contact-icon">
                <u-icon name="email" color="#1890ff" size="20"></u-icon>
              </view>
              <view class="contact-info">
                <text class="contact-title">邮箱反馈</text>
                <text class="contact-desc">kmoim33356@2925.com</text>
              </view>
            </view>
            
            <view class="contact-item" @click="checkUpdate">
              <view class="contact-icon">
                <u-icon name="reload" color="#52c41a" size="20"></u-icon>
              </view>
              <view class="contact-info">
                <text class="contact-title">检查更新</text>
                <text class="contact-desc">查看是否有新版本</text>
              </view>
              <u-icon name="arrow-right" color="#c8c9cc" size="16"></u-icon>
            </view>
          </view>
        </view>
        
        <!-- 版权信息 -->
        <view class="copyright">
          <text class="copyright-text">© 2024 彩票助手. 保留所有权利.</text>
          <text class="copyright-desc">本应用仅供娱乐，请理性购彩</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 响应式数据
const appVersion = ref('1.0.0')
const releaseDate = ref('2024-01-15')

// 方法
const checkUpdate = () => {
  uni.showLoading({
    title: '检查中...'
  })
  
  // 模拟检查更新
  setTimeout(() => {
    uni.hideLoading()
    uni.showModal({
      title: '检查更新',
      content: '当前已是最新版本',
      showCancel: false,
      confirmText: '确定'
    })
  }, 1500)
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background: #f5f7fa;
  padding: 20px;
}

.about-card {
  background: #fff;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.card-header {
  text-align: center;
  margin-bottom: 32px;
  padding: 24px 0;
}

.app-logo {
  width: 80px;
  height: 80px;
  border-radius: 16px;
  margin-bottom: 16px;
}

.app-name {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  display: block;
  margin-bottom: 8px;
}

.app-version {
  font-size: 14px;
  color: #666;
  display: block;
}

.info-list {
  width: 100%;
}

.info-section {
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

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f8f9fa;
}

.info-item:last-child {
  border-bottom: none;
}

.info-label {
  font-size: 14px;
  color: #666;
}

.info-value {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.feature-list {
  margin-top: 8px;
}

.feature-item {
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f8f9fa;
}

.feature-item:last-child {
  border-bottom: none;
}

.feature-icon {
  margin-right: 16px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-info {
  flex: 1;
}

.feature-title {
  font-size: 16px;
  color: #333;
  font-weight: 500;
  display: block;
  margin-bottom: 4px;
}

.feature-desc {
  font-size: 12px;
  color: #999;
  display: block;
}

.contact-list {
  margin-top: 8px;
}

.contact-item {
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f8f9fa;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.contact-item:last-child {
  border-bottom: none;
}

.contact-item:active {
  background-color: #f8f9fa;
  border-radius: 8px;
  margin: 0 -12px;
  padding: 16px 12px;
}

.contact-icon {
  margin-right: 16px;
  width: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-info {
  flex: 1;
}

.contact-title {
  font-size: 16px;
  color: #333;
  font-weight: 500;
  display: block;
  margin-bottom: 4px;
}

.contact-desc {
  font-size: 12px;
  color: #999;
  display: block;
}

.copyright {
  text-align: center;
  padding: 24px 0;
  border-top: 1px solid #f0f0f0;
  margin-top: 24px;
}

.copyright-text {
  font-size: 12px;
  color: #999;
  display: block;
  margin-bottom: 8px;
}

.copyright-desc {
  font-size: 11px;
  color: #ccc;
  display: block;
}

/* 动画效果 */
.about-card {
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