<template>
  <view class="share-container">
    <!-- 批量分享模式 -->
    <view v-if="isBatchMode" class="batch-container">
      <view class="batch-header">
        <text class="batch-title">分享的彩票记录</text>
        <text class="batch-count">共 {{ lotteryData.records.length }} 条</text>
      </view>
      
      <view class="batch-records">
        <view class="record-item" v-for="(record, index) in lotteryData.records" :key="record.id" :class="record.type">
          <view class="record-header">
            <text class="record-index">{{ index + 1 }}.</text>
            <text class="lottery-type">{{ record.type === 'dlt' ? '大乐透' : '双色球' }}</text>
            <text class="record-date">{{ record.openTime }}</text>
          </view>
          
          <view class="record-balls">
            <view class="ball-group">
              <text class="ball-label">红球:</text>
              <text class="ball red small" v-for="ball in record.redBall.split(',')" :key="ball">{{ ball }}</text>
            </view>
            <view class="ball-group">
              <text class="ball-label">蓝球:</text>
              <text class="ball blue small" v-for="ball in record.blueBall.split(',')" :key="ball">{{ ball }}</text>
            </view>
          </view>
          
          <view class="record-status">
            <text class="status-label">状态:</text>
            <text class="status-value" :class="getStatusClass(record.status)">{{ getStatusText(record.status) }}</text>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 单条分享模式 -->
    <view v-else class="single-container">
      <view class="lottery-card" :class="lotteryData.type">
        <view class="lottery-header">
          <text class="lottery-name">{{ lotteryData.type === 'ssq' ? '双色球' : '大乐透' }}</text>
          <text class="draw-date">{{ lotteryData.openTime }}</text>
        </view>
        
        <view class="lottery-content">
          <view class="ball-container">
            <view class="section-title">红球</view>
            <view class="red-balls">
              <text class="ball red" v-for="(ball, idx) in redBalls" :key="idx">{{ ball }}</text>
            </view>
          </view>
          
          <view class="ball-container">
            <view class="section-title">蓝球</view>
            <view class="blue-balls">
              <text class="ball blue" v-for="(ball, idx) in blueBalls" :key="idx">{{ ball }}</text>
            </view>
          </view>
        </view>
        
        <view class="lottery-status">
          <text class="status-label">开奖结果:</text>
          <text class="status-value" :class="getStatusClass(lotteryData.status)">{{ getStatusText(lotteryData.status) }}</text>
        </view>
      </view>
    </view>
    
    <button class="share-button" @click="shareAgain">再次分享</button>
    
    <!-- 下载APP区域 -->
    <view class="download-section">
      <text class="download-title">想要更多功能？</text>
      <text class="download-desc">下载APP体验拍照识号、AI选号等更多功能</text>
      <button class="download-button" @click="downloadApp">立即下载APP</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      lotteryData: {
        id: '',
        type: '',
        redBall: '',
        blueBall: '',
        openTime: '',
        status: '',
        user: '',
        records: []
      },
      redBalls: [],
      blueBalls: [],
      isBatchMode: false
    }
  },
  
  onLoad(options) {
    // 从URL参数中获取彩票数据
    if (options.data) {
      try {
        // 解码并解析数据
        const decodedData = decodeURIComponent(options.data);
        const jsonData = JSON.parse(decodeURIComponent(atob(decodedData)));
        
        // 更新组件数据
        this.lotteryData = jsonData;
        
        // 检查是否为批量模式
        this.isBatchMode = jsonData.type === 'batch' && jsonData.records && jsonData.records.length > 0;
        
        // 处理球号（单条模式）
        if (!this.isBatchMode) {
          if (this.lotteryData.redBall) {
            this.redBalls = this.lotteryData.redBall.split(',');
          }
          
          if (this.lotteryData.blueBall) {
            this.blueBalls = this.lotteryData.blueBall.split(',');
          }
        }
        
        // 调试信息
        console.log('分享页面加载数据:', jsonData);
        console.log('是否为批量模式:', this.isBatchMode);
      } catch (error) {
        console.error('数据解析错误:', error);
        uni.showToast({
          title: '数据解析错误',
          icon: 'none'
        });
      }
    } else {
      uni.showToast({
        title: '无效的分享链接',
        icon: 'none'
      });
    }
  },
  
  methods: {
    // 获取状态文本
    getStatusText(status) {
      const statusMap = {
        'pending': '待开奖',
        '0': '未中奖',
        '1': '一等奖',
        '2': '二等奖',
        '3': '三等奖',
        '4': '四等奖',
        '5': '五等奖',
        '6': '六等奖',
        '7': '七等奖',
        '8': '八等奖',
        '9': '九等奖',
      };
      
      return statusMap[status] || '未知状态';
    },
    
    // 获取状态样式类
    getStatusClass(status) {
      if (status === 'won' || status === '1') {
        return 'won';
      } else if (status === 'lost' || status === '2') {
        return 'lost';
      } else {
        return 'pending';
      }
    },
    
    // 下载APP
    downloadApp() {
      const apkUrl = 'https://jyqwwftobbtmiccsccjd.supabase.co/storage/v1/object/public/apk/cpcxapp.apk';
      
      // #ifdef H5
      // H5环境直接下载
      window.location.href = apkUrl;
      // #endif
      
      // #ifndef H5
      // 其他环境使用uni.downloadFile
      uni.showLoading({ title: '下载中...' });
      uni.downloadFile({
        url: apkUrl,
        success: (res) => {
          uni.hideLoading();
          if (res.statusCode === 200) {
            uni.showToast({
              title: '下载成功',
              icon: 'success'
            });
            // 打开文件
            uni.openDocument({
              filePath: res.tempFilePath,
              showMenu: true
            });
          } else {
            uni.showToast({
              title: '下载失败',
              icon: 'none'
            });
          }
        },
        fail: () => {
          uni.hideLoading();
          uni.showToast({
            title: '下载失败',
            icon: 'none'
          });
        }
      });
      // #endif
    },
    
    // 再次分享
    shareAgain() {
      // 构建分享内容
      let shareTitle, shareSummary;
      
      if (this.isBatchMode) {
        shareTitle = `我的彩票投注记录`;
        shareSummary = `共分享了 ${this.lotteryData.records.length} 条记录`;
      } else {
        const lotteryType = this.lotteryData.type === 'dlt' ? '大乐透' : '双色球';
        const status = this.getStatusText(this.lotteryData.status);
        shareTitle = `我的${lotteryType}投注记录`;
        shareSummary = `开奖日期：${this.lotteryData.openTime} | 状态：${status}`;
      }
      
      // 使用当前页面URL作为分享链接（已经是Netlify域名）
      const shareLink = window.location.href;
      
      // 复制到剪贴板
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
    }
  }
}
</script>

<style lang="scss" scoped>
.share-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #E8F6F3 0%, #D4E6F1 100%);
  padding: 40rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.batch-container {
  width: 100%;
  max-width: 600rpx;
}

.batch-header {
  text-align: center;
  margin-bottom: 40rpx;
}

.batch-title {
  font-size: 40rpx;
  font-weight: bold;
  color: #333333;
  margin-bottom: 10rpx;
}

.batch-count {
  font-size: 28rpx;
  color: #666666;
}

.batch-records {
  width: 100%;
}

.record-item {
  background: white;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
  
  &.ssq {
    border-left: 6rpx solid #E74C3C;
  }
  
  &.dlt {
    border-left: 6rpx solid #3498DB;
  }
}

.record-header {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
  gap: 15rpx;
}

.record-index {
  font-size: 32rpx;
  font-weight: bold;
  color: #5A7D9A;
}

.record-date {
  font-size: 24rpx;
  color: #666666;
  margin-left: auto;
}

.record-balls {
  margin-bottom: 20rpx;
}

.ball-group {
  display: flex;
  align-items: center;
  margin-bottom: 10rpx;
  gap: 15rpx;
}

.ball-label {
  font-size: 28rpx;
  color: #666666;
  min-width: 60rpx;
}

.ball.small {
  width: 50rpx;
  height: 50rpx;
  font-size: 24rpx;
  margin-right: 5rpx;
}

.single-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lottery-card {
  width: 90%;
  background-color: #FFFFFF;
  border-radius: 20rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
  padding: 30rpx;
  margin-bottom: 40rpx;
  
  &.ssq {
    border-top: 10rpx solid #E74C3C;
  }
  
  &.dlt {
    border-top: 10rpx solid #3498DB;
  }
}

.lottery-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30rpx;
  padding-bottom: 20rpx;
  border-bottom: 1px solid #EEEEEE;
}

.lottery-name {
  font-size: 36rpx;
  font-weight: bold;
  color: #333333;
}

.draw-date {
  font-size: 28rpx;
  color: #666666;
}

.lottery-content {
  margin-bottom: 30rpx;
}

.ball-container {
  margin-bottom: 20rpx;
}

.section-title {
  font-size: 28rpx;
  color: #666666;
  margin-bottom: 10rpx;
}

.red-balls, .blue-balls {
  display: flex;
  flex-wrap: wrap;
  gap: 15rpx;
}

.ball {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28rpx;
  font-weight: bold;
  color: #FFFFFF;
  
  &.red {
    background-color: #E74C3C;
  }
  
  &.blue {
    background-color: #3498DB;
  }
}

.lottery-status {
  display: flex;
  align-items: center;
  padding-top: 20rpx;
  border-top: 1px solid #EEEEEE;
}

.status-label {
  font-size: 28rpx;
  color: #666666;
  margin-right: 10rpx;
}

.status-value {
  font-size: 32rpx;
  font-weight: bold;
  
  &.won {
    color: #E74C3C;
  }
  
  &.lost {
    color: #7F8C8D;
  }
  
  &.pending {
    color: #F39C12;
  }
}

.share-button {
  width: 80%;
  height: 80rpx;
  background-color: #3498DB;
  color: #FFFFFF;
  border-radius: 40rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32rpx;
  margin-top: 40rpx;
}

.download-section {
  width: 90%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20rpx;
  padding: 40rpx 30rpx;
  margin-top: 60rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 8rpx 30rpx rgba(102, 126, 234, 0.3);
}

.download-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #FFFFFF;
  margin-bottom: 16rpx;
}

.download-desc {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  margin-bottom: 30rpx;
  line-height: 1.5;
}

.download-button {
  width: 70%;
  height: 76rpx;
  background-color: #FFFFFF;
  color: #667eea;
  border-radius: 38rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30rpx;
  font-weight: bold;
  border: none;
  box-shadow: 0 4rpx 15rpx rgba(0, 0, 0, 0.2);
}
</style>