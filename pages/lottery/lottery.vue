<template>
  <view class="lottery-container">
    <!-- 最新开奖轮播 -->
    <view class="latest-drawings">
      <view class="section-title">
        <text class="title-text">最新开奖</text>
      </view>
      
      <swiper class="drawings-swiper" :indicator-dots="false" :autoplay="true" :interval="3000" :duration="500">
        <swiper-item v-for="(item, index) in latestDrawings" :key="index">
          <view class="drawing-card" :class="item.type">
            <view class="lottery-header-card">
              <text class="lottery-name">{{ item.type === 'ssq' ? '双色球' : '大乐透' }}</text>
              <text class="draw-date">{{ item.openTime }}</text>
            </view>
            <view class="ball-container">
              <view class="red-balls">
                <text class="ball red" v-for="(ball, idx) in (item.redBall || '').split(',')" :key="idx">{{ ball }}</text>
              </view>
              <view class="blue-balls">
                <text class="ball blue" v-for="(ball, idx) in (item.blueBall || '').split(',')" :key="idx">{{ ball }}</text>
              </view>
            </view>
          </view>
        </swiper-item>
      </swiper>
    </view>
    
    <!-- 我的彩票记录 -->
    <view class="my-records">
      <view class="section-title">
        <text class="title-text">我的投注记录</text>
        <view class="section-actions">
          <text v-if="!selectMode" class="win-stats">{{ winStats.won }}/{{ winStats.total }}</text>
          <view v-if="selectMode" class="select-actions">
            <text class="cancel-select" @tap="cancelSelect">取消</text>
            <text class="share-selected" :class="{ disabled: selectedRecords.length === 0 }" @tap="shareSelected">分享</text>
          </view>
        </view>
      </view>
      
      <scroll-view class="records-list" scroll-y="true" @scrolltolower="loadMoreRecords">
        <view class="record-card" :class="[getRecordCardClass(record.status), { 'selected': selectMode && selectedRecords.includes(record.id) }]" v-for="(record, index) in myRecords" :key="index" @longpress="enterSelectMode(record)" @tap="toggleSelect(record)">
          <view class="record-header">
            <view class="select-checkbox" v-if="selectMode">
              <view class="checkbox" :class="{ 'checked': selectedRecords.includes(record.id) }">
                <text v-if="selectedRecords.includes(record.id)" class="check-icon">✓</text>
              </view>
            </view>
            <view class="lottery-info">
              <text class="lottery-type">{{ record.type === 'dlt' ? '大乐透' : '双色球' }}</text>
              <text class="record-time">{{ record.openTime }}</text>
            </view>
            <text class="record-status" :class="getStatusClass(record.status)">{{ getStatusText(record.status, record.winChance) }}</text>
          </view>
          
          <view class="number-display">
            <view class="number-section">
              <text class="label">红球</text>
              <view class="balls">
                <text class="ball red small" v-for="(ball, idx) in record.redBall.split(',')" :key="idx">{{ ball }}</text>
              </view>
            </view>
            <view class="number-section">
              <text class="label">蓝球</text>
              <view class="balls">
                <text class="ball blue small" v-for="(ball, idx) in record.blueBall.split(',')" :key="idx">{{ ball }}</text>
              </view>
            </view>
          </view>
          
          <view class="record-footer">
            <text class="user-name">{{ record.user }}</text>
          </view>
        </view>
        
        <view class="loading-more" v-if="loading">
          <view class="loading-spinner"></view>
          <text>正在加载更多...</text>
        </view>
        
        <view class="no-more" v-if="!hasMore && myRecords.length > 0">
          <text>已经到底啦~</text>
        </view>
        
        <view class="empty-records" v-if="myRecords.length === 0 && !loading">
          <view class="empty-icon">🎱</view>
          <text class="empty-text">暂无投注记录</text>
          <text class="empty-subtext" v-if="!currentUser">请先登录账号</text>
          <text class="empty-subtext" v-else>开始你的第一次投注吧！</text>
          <u-button v-if="!currentUser" type="primary" size="small" @click="toLogin" customStyle="margin-top: 20px;">去登录</u-button>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import { checkPrize, getLotteryByUser, generateShareLink } from '@/http/api.js'

export default {
  data() {
    return {
      latestDrawings: [],
      myRecords: [],
      loading: false,
      loadingDrawings: false,
      hasMore: true,
      page: 1,
      pageSize: 10,
      currentUser: null,
      selectMode: false,
      selectedRecords: []
    }
  },
  
  onLoad() {
    this.refreshData()
  },
  
  onShow() {
    // 页面显示时刷新数据，避免重复调用
    this.currentUser = uni.getStorageSync('userName')
    this.refreshData()
  },
  
  methods: {
    // 刷新数据
    refreshData() {
      this.page = 1
      this.hasMore = true
      this.loadLatestDrawings()
      this.loadMyRecords()
    },
    // 加载最新开奖
    async loadLatestDrawings() {
      // 防止重复调用
      if (this.loadingDrawings) return
      this.loadingDrawings = true
      
      try {
        const res = await checkPrize()
        
        const drawings = []
        
        if (res.code === 200 && res.data) {
          // 处理双色球数据
          if (res.data.ssq) {
            drawings.push({
              type: 'ssq',
              redBall: res.data.ssq.redBall || '',
              blueBall: res.data.ssq.blueBall || '',
              openTime: res.data.ssq.openTime || ''
            })
          }
          
          // 处理大乐透数据
          if (res.data.dlt) {
            drawings.push({
              type: 'dlt',
              redBall: res.data.dlt.redBall || '',
              blueBall: res.data.dlt.blueBall || '',
              openTime: res.data.dlt.openTime || ''
            })
          }
        }
        
        this.latestDrawings = drawings
      } catch (error) {
        console.error('加载最新开奖失败:', error)
        uni.showToast({
          title: '加载开奖信息失败',
          icon: 'none'
        })
      } finally {
        this.loadingDrawings = false
      }
    },
    
    // 加载我的彩票记录
    async loadMyRecords(isLoadMore = false) {
      if (this.loading) return
      
      this.loading = true
      
      const userName = uni.getStorageSync('userName')
      console.log('当前用户名:', userName)
      
      if (!userName) {
        console.log('未登录，清空记录')
        this.myRecords = []
        this.loading = false
        return
      }
      
      try {
        const res = await getLotteryByUser(userName, {
          page: this.page,
          pageSize: this.pageSize      
        })

        console.log('API响应:', res)
        let records = []
        
        // 处理不同的响应格式
        if (res.code === 200 && res.data && res.data.records) {
          records = Array.isArray(res.data.records) ? res.data.records : []
        } else if (res.code === 200 && Array.isArray(res.data)) {
          records = res.data
        } else if (res.code === 20000 && res.data) {
          records = Array.isArray(res.data) ? res.data : []
        } else {
          console.log('API响应格式异常:', res)
        }
        
        console.log('获取到记录数量:', records.length)

        if (isLoadMore) {
          this.myRecords = [...this.myRecords, ...records]
        } else {
          this.myRecords = records  
        }

        // 检查是否有更多数据
        this.hasMore = records.length >= this.pageSize
        if (isLoadMore) this.page++ 
        
        // 如果没有任何记录，显示空状态
        if (records.length === 0 && !isLoadMore) {
          this.myRecords = []
        }
        
      } catch (error) {
        console.error('加载彩票记录失败:', error)
        uni.showToast({
          title: '加载记录失败',
          icon: 'none'
        })
      } finally {
        this.loading = false
      }
    },
    
    // 加载更多记录
    loadMoreRecords() {
      if (this.hasMore && !this.loading) {
        this.loadMyRecords(true)
      }
    },
    
    // 获取状态文本
    getStatusText(status, winChance) {
      if (status === null || status === undefined || status === 'pending') {
        return winChance ? `${winChance}` : '未开奖'
      }
      const statusMap = {
        '0': '未中奖',
        '1': '一等奖',
        '2': '二等奖',
        '3': '三等奖',
        '4': '四等奖',
        '5': '五等奖',
        '6': '六等奖',
        '7': '七等奖',
        '8': '八等奖',
        '9': '九等奖'
      }
      return statusMap[status] || '未开奖'
    },

    getStatusClass(status) {
      if (status === null || status === undefined || status === 'pending') {
        return 'pending'
      }
      const classMap = {
        '0': 'lost',
        '1': 'won',
        '2': 'won',
        '3': 'won',
        '4': 'won',
        '5': 'won',
        '6': 'won',
        '7': 'won',
        '8': 'won',
        '9': 'won'
      }
      return classMap[status] || 'lost'
    },

    getRecordCardClass(status) {
      if (status === null || status === undefined || status === 'pending') {
        return 'pending-record'
      }
      if (status && status !== '0') {
        return 'winning-record'
      }
      return ''
    },
    
    // 跳转到登录页面
    toLogin() {
      uni.navigateTo({
        url: '/pages/login/login'
      })
    },

    // 多选模式相关方法
    enterSelectMode(record) {
      this.selectMode = true;
      this.toggleSelect(record);
    },
    
    toggleSelect(record) {
      if (!this.selectMode) return;
      
      const index = this.selectedRecords.indexOf(record.id);
      if (index > -1) {
        this.selectedRecords.splice(index, 1);
      } else {
        this.selectedRecords.push(record.id);
      }
    },
    
    cancelSelect() {
      this.selectMode = false;
      this.selectedRecords = [];
    },
    
    shareSelected() {
      if (this.selectedRecords.length === 0) {
        uni.showToast({
          title: '请先选择要分享的记录',
          icon: 'none'
        });
        return;
      }
      
      const selectedData = this.myRecords.filter(record => 
        this.selectedRecords.includes(record.id)
      );
      
      this.shareMultipleRecords(selectedData);
    },
    
    // 分享多条记录
    shareMultipleRecords(records) {
      if (!records || records.length === 0) return;
      
      // 生成多条记录的分享内容
      let shareContent = `我分享了 ${records.length} 条彩票投注记录：\n\n`;
      
      records.forEach((record, index) => {
        const lotteryType = record.type === 'dlt' ? '大乐透' : '双色球';
        const status = this.getStatusText(record.status, record.winChance);
        shareContent += `${index + 1}. ${lotteryType} - ${record.openTime}\n`;
        shareContent += `   红球: ${record.redBall}\n`;
        shareContent += `   蓝球: ${record.blueBall}\n`;
        shareContent += `   状态: ${status}\n\n`;
      });
      
      // 生成批量分享链接 - 使用配置的基础URL
      const shareData = {
        type: 'batch',
        records: records.map(r => ({
          id: r.id,
          type: r.type,
          redBall: r.redBall,
          blueBall: r.blueBall,
          openTime: r.openTime,
          status: r.status,
          user: r.user
        }))
      };
      
      // 分享基础URL - 仅用于分享链接
      const SHARE_BASE_URL = 'https://cpcx.gopc.top';
      
      // 直接构建分享URL
      const encodedData = encodeURIComponent(btoa(JSON.stringify(shareData)));
      let shareLink;
      
      // 统一使用Netlify域名
      shareLink = `${SHARE_BASE_URL}/#/pages/share/lottery?data=${encodedData}`;
      
      shareContent += `查看详情：${shareLink}`;
      
      // 显示分享操作菜单
      // #ifdef APP-PLUS
      if (uni.canIUse('shareWithSystem')) {
        uni.shareWithSystem({
          type: 'text',
          summary: shareContent,
          fail() {
            uni.showToast({
              title: '分享失败',
              icon: 'none'
            });
          }
        });
      } else {
        uni.share({
          provider: 'weixin',
          scene: 'WXSceneSession',
          type: 3,
          href: shareLink,
          title: `分享了${records.length}条彩票记录`,
          summary: shareContent.substring(0, 100) + '...',
          imageUrl: '',
          fail: function() {
            uni.showToast({
              title: '分享失败',
              icon: 'none'
            });
          }
        });
      }
      // #endif
      
      // #ifdef H5
      uni.setClipboardData({
        data: shareContent,
        success: () => {
          uni.showModal({
            title: '分享提示',
            content: '多条记录链接已复制到剪贴板，请打开微信粘贴发送',
            showCancel: false
          });
        }
      });
      // #endif
      
      // #ifndef APP-PLUS || H5
      uni.setClipboardData({
        data: shareContent,
        success: () => {
          uni.showModal({
            title: '分享提示',
            content: '多条记录链接已复制到剪贴板，请打开微信粘贴发送',
            showCancel: false
          });
        }
      });
      // #endif
      
      // 分享后取消选择
      this.cancelSelect();
    },
    
    // 分享单条记录（原方法）
    shareToWechat(record) {
      if (this.selectMode) {
        this.toggleSelect(record);
        return;
      }
      
      // 添加震动反馈
      if (uni.vibrateShort) {
        uni.vibrateShort();
      }
      
      // 生成分享链接 - 使用Netlify域名
      const shareData = {
        id: record.id,
        type: record.type,
        redBall: record.redBall,
        blueBall: record.blueBall,
        openTime: record.openTime,
        status: record.status,
        user: record.user
      };

      const encodedData = encodeURIComponent(btoa(JSON.stringify(shareData)));
      const shareLink = `https://cpcx.netlify.app/#/pages/share/lottery?data=${encodedData}`;
      
      // 构建分享内容
      const lotteryType = record.type === 'dlt' ? '大乐透' : '双色球';
      const status = this.getStatusText(record.status, record.winChance);
      
      // 分享内容
      const shareTitle = `我的${lotteryType}投注记录`;
      const shareSummary = `开奖日期：${record.openTime} | 状态：${status}`;
      
      // 显示分享操作菜单
      // #ifdef APP-PLUS
      // App 端使用系统分享功能
      if (uni.canIUse('shareWithSystem')) {
        // 使用系统分享菜单
        uni.shareWithSystem({
          type: 'text',
          summary: `${shareTitle}\n${shareSummary}\n查看详情：${shareLink}`,
          fail() {
            uni.showToast({
              title: '分享失败',
              icon: 'none'
            });
          }
        });
      } else {
        // 如果不支持系统分享，尝试使用uni.share
        uni.share({
          provider: 'weixin',
          scene: 'WXSceneSession',
          type: 3, // 网页类型
          href: shareLink,
          title: shareTitle,
          summary: shareSummary,
          imageUrl: '',
          fail: function() {
            uni.showToast({
              title: '分享失败',
              icon: 'none'
            });
          }
        });
      }
      // #endif
      
      // #ifdef H5
      // H5端使用复制链接的方式
      uni.setClipboardData({
        data: `${shareTitle}\n${shareSummary}\n查看详情：${shareLink}`,
        success: () => {
          uni.showModal({
            title: '分享提示',
            content: '链接已复制到剪贴板，请打开微信粘贴发送',
            showCancel: false
          });
        }
      });
      // #endif
      
      // #ifndef APP-PLUS || H5
      // 其他平台使用复制链接的方式
      uni.setClipboardData({
        data: `${shareTitle}\n${shareSummary}\n查看详情：${shareLink}`,
        success: () => {
          uni.showModal({
            title: '分享提示',
            content: '链接已复制到剪贴板，请打开微信粘贴发送',
            showCancel: false
          });
        }
      });
      // #endif
    }
  },
  
  computed: {
    // 计算中奖统计
    winStats() {
      const total = this.myRecords.length
      const won = this.myRecords.filter(record => 
        record.status && 
        record.status != 0 && 
        record.status !== 'pending' && 
        record.status !== null
      ).length
      return {
        total,
        won,
        lost: total - won
      }
    }
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.page = 1
    this.hasMore = true
    Promise.all([
      this.loadLatestDrawings(),
      this.loadMyRecords()
    ]).finally(() => {
      uni.stopPullDownRefresh()
    })
  }
}
</script>

<style lang="scss" scoped>
.lottery-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #E8F6F3 0%, #D4E6F1 100%);
  padding: 20rpx;
}

.section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30rpx;
  padding: 0 10rpx;
}

.section-actions {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.title-text {
  font-size: 36rpx;
  color: #5A7D9A;
  font-weight: bold;
}

.select-actions {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.select-count {
  font-size: 28rpx;
  color: #5A7D9A;
}

.cancel-select, .share-selected {
  font-size: 28rpx;
  padding: 10rpx 20rpx;
  border-radius: 20rpx;
}

.cancel-select {
  color: #8B9DC3;
  background: rgba(255,255,255,0.5);
}

.share-selected {
  color: white;
  background: #5A7D9A;
}

.more-text {
  font-size: 28rpx;
  color: rgba(255,255,255,0.8);
}

.latest-drawings {
  margin-bottom: 40rpx;
}

.drawings-swiper {
  height: 200rpx;
  margin: 0 20rpx;
}

.drawing-card {
  border-radius: 24rpx;
  padding: 20rpx;
  min-width: 300rpx;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10rpx;
  backdrop-filter: blur(10rpx);
  box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.05);
  
  &.ssq {
    background: linear-gradient(135deg, #FFE5E5, #FFB6C1);
  }
  
  &.dlt {
    background: linear-gradient(135deg, #E0FFFF, #B0E0E6);
  }
}

.lottery-header-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.lottery-name {
  font-size: 36rpx;
  color: #5A7D9A;
  font-weight: bold;
}

.draw-date {
  font-size: 26rpx;
  color: #8B9DC3;
}

.ball-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20rpx;
  padding: 20rpx;
}

.red-balls, .blue-balls {
  display: flex;
  gap: 15rpx;
  justify-content: center;
}

.ball {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
  font-weight: bold;
  color: #fff;
  box-shadow: 0 2rpx 4rpx rgba(0,0,0,0.1);
  
  &.red {
    background: linear-gradient(135deg, #FF9999, #FF6666);
  }
  
  &.blue {
    background: linear-gradient(135deg, #87CEEB, #4682B4);
  }
  
  &.small {
    width: 48rpx;
    height: 48rpx;
    font-size: 24rpx;
  }
}

.my-records {
  background: rgba(255,255,255,0.8);
  border-radius: 24rpx;
  padding: 30rpx;
  backdrop-filter: blur(10rpx);
  box-shadow: 0 8rpx 16rpx rgba(0,0,0,0.05);
}

.records-list {
}

.record-card {
  background: rgba(255,255,255,0.9);
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.1);
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
  
  &:active {
    transform: scale(0.98);
  }
  
  &.selected {
    border: 2rpx solid #5A7D9A;
    background: rgba(90, 125, 154, 0.05);
    transform: scale(0.98);
  }
  
  &.winning-record {
    background: linear-gradient(135deg, #FFF9E6, #FFF5BA);
    border: 3rpx solid #FFD700;
    box-shadow: 0 8rpx 32rpx rgba(255, 215, 0, 0.4);
    transform: scale(1.02);
  }
  
  &.pending-record {
    background: linear-gradient(135deg, #E6F7FF, #B3E5FC);
    border: 3rpx solid #00BCD4;
    box-shadow: 0 8rpx 32rpx rgba(0, 188, 212, 0.3);
    position: relative;
    overflow: hidden;
  }
  
  &.pending-record::before {
    content: '⏰ 等待开奖';
    position: absolute;
    top: 10rpx;
    right: 35%;
    font-size: 28rpx;
    font-weight: bold;
    color: #eff1f1;
    background: linear-gradient(135deg, #00BCD4, #0097A7);
    padding: 4rpx 12rpx;
    border-radius: 16rpx;
    animation: pulse 2s ease-in-out infinite;
  }
  
  &.pending-record::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(0, 188, 212, 0.1) 50%, transparent 70%);
    animation: shimmer 3s ease-in-out infinite;
    pointer-events: none;
  }
  
  &:not(.winning-record):not(.pending-record) {
    background: linear-gradient(135deg, #FAFAFA, #F0F0F0);
    border: 1rpx solid #E0E0E0;
    opacity: 0.8;
  }
  
  &.winning-record::before {
    content: '🏆 中奖啦！';
    position: absolute;
    top: 10rpx;
    right: 35%;
    font-size: 32rpx;
    font-weight: bold;
    color: #f2f0ef;
    background: linear-gradient(135deg, #FFD700, #FFA500);
    padding: 4rpx 12rpx;
    border-radius: 16rpx;
    animation: bounce 1s ease-in-out infinite;
  }
  
  &.winning-record::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255, 215, 0, 0.1) 50%, transparent 70%);
    animation: shimmer 2s ease-in-out infinite;
    pointer-events: none;
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-8rpx);
    }
    60% {
      transform: translateY(-4rpx);
    }
  }
  
  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.8;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
}

.record-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.select-checkbox {
  margin-right: 20rpx;
}

.checkbox {
  width: 40rpx;
  height: 40rpx;
  border: 2rpx solid #D9D9D9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &.checked {
    background: #5A7D9A;
    border-color: #5A7D9A;
  }
}

.check-icon {
  color: white;
  font-size: 24rpx;
  font-weight: bold;
}

.lottery-info {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.lottery-type {
  font-size: 32rpx;
  font-weight: bold;
  color: #5A7D9A;
}

.record-time {
  font-size: 26rpx;
  color: #666;
}

.record-status {
  padding: 8rpx 20rpx;
  border-radius: 20rpx;
  font-size: 24rpx;
  font-weight: bold;
  
  &.pending {
    background: linear-gradient(135deg, #00BCD4, #0097A7);
    color: #fff;
    box-shadow: 0 0 20rpx rgba(0, 188, 212, 0.6);
    animation: pulse-glow 2s ease-in-out infinite alternate;
    min-width: 80rpx;
    text-align: center;
  }
  
  &.won {
    background: linear-gradient(135deg, #FFD700, #FFA500);
    color: #fff;
    box-shadow: 0 0 20rpx rgba(255, 215, 0, 0.6);
    animation: glow 2s ease-in-out infinite alternate;
  }
  
  @keyframes glow {
    from {
      box-shadow: 0 0 20rpx rgba(255, 215, 0, 0.6);
    }
    to {
      box-shadow: 0 0 30rpx rgba(255, 215, 0, 0.9), 0 0 40rpx rgba(255, 215, 0, 0.4);
    }
  }
  
  @keyframes pulse-glow {
    from {
      box-shadow: 0 0 20rpx rgba(0, 188, 212, 0.6);
    }
    to {
      box-shadow: 0 0 30rpx rgba(0, 188, 212, 0.9), 0 0 40rpx rgba(0, 188, 212, 0.4);
    }
  }
  
  &.lost {
    background: linear-gradient(135deg, #F0F0F0, #E8E8E8);
    color: #999;
  }
}

.number-display {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  margin-bottom: 20rpx;
}

.number-section {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.label {
  font-size: 26rpx;
  color: #666;
  font-weight: bold;
  min-width: 60rpx;
}

.balls {
  display: flex;
  gap: 12rpx;
  flex-wrap: wrap;
}

.record-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.user-name {
  font-size: 24rpx;
  color: #A7C5EB;
  background: rgba(0,0,0,0.05);
  padding: 6rpx 16rpx;
  border-radius: 16rpx;
}



.loading-more {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20rpx;
  padding: 40rpx;
  color: rgba(255,255,255,0.8);
  font-size: 28rpx;
}

.loading-spinner {
  width: 40rpx;
  height: 40rpx;
  border: 4rpx solid rgba(255,255,255,0.3);
  border-top: 4rpx solid #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.no-more {
  text-align: center;
  padding: 40rpx;
  color: rgba(255,255,255,0.8);
  font-size: 28rpx;
}

.empty-records {
  text-align: center;
  padding: 80rpx 40rpx;
  color: rgba(255,255,255,0.8);
}

.empty-icon {
  font-size: 80rpx;
  margin-bottom: 20rpx;
}

.empty-text {
  font-size: 32rpx;
  margin-bottom: 10rpx;
  display: block;
}

.empty-subtext {
  font-size: 26rpx;
  opacity: 0.7;
}



.win-stats {
  font-size: 28rpx;
  color: #FF6B6B;
  font-weight: bold;
  background: rgba(255, 107, 107, 0.1);
  padding: 8rpx 16rpx;
  border-radius: 20rpx;
  border: 2rpx solid rgba(255, 107, 107, 0.3);
}

.select-actions {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.cancel-select {
  font-size: 26rpx;
  color: #666;
  padding: 8rpx 16rpx;
  border-radius: 20rpx;
  background: rgba(255, 255, 255, 0.2);
  border: 1rpx solid rgba(255, 255, 255, 0.3);
}

.share-selected {
  font-size: 26rpx;
  color: white;
  padding: 8rpx 20rpx;
  border-radius: 20rpx;
  background: linear-gradient(135deg, #5A7D9A, #A7C5EB);
  box-shadow: 0 2rpx 10rpx rgba(90, 125, 154, 0.3);
}

.share-selected.disabled {
  background: rgba(200, 200, 200, 0.3);
  color: #999;
  box-shadow: none;
}
</style>