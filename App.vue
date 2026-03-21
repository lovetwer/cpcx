<script>
import pushService from '@/utils/push-service.js'

export default {
  onLaunch: function() {
    console.log('App Launch')
    
    // 初始化推送服务
    // #ifdef APP-PLUS
    this.initPushService()
    // #endif
  },
  
  onShow: function() {
    console.log('App Show')
  },
  
  onHide: function() {
    console.log('App Hide')
  },
  
  methods: {
    // #ifdef APP-PLUS
    async initPushService() {
      try {
        // 等待应用完全启动后再初始化推送
        setTimeout(async () => {
          const success = await pushService.init()
          if (success) {
            console.log('应用级推送服务初始化成功')
          } else {
            console.warn('应用级推送服务初始化失败')
          }
        }, 1000)
      } catch (error) {
        console.error('应用级推送服务初始化异常:', error)
      }
    }
    // #endif
  }
}
</script>

<style lang="scss">
/*每个页面公共css */
@import '@/uni_modules/uview-plus/index.scss';

/* 全局样式 */
page {
  background-color: #f5f7fa;
}

/* 通用按钮样式 */
.btn-primary {
  background: linear-gradient(135deg, #1890ff, #40a9ff);
  border: none;
  border-radius: 24rpx;
  color: #ffffff;
  font-weight: 500;
  box-shadow: 0 4rpx 12rpx rgba(24, 144, 255, 0.3);
}

.btn-secondary {
  background: linear-gradient(135deg, #f0f2f5, #e6e8eb);
  border: 1rpx solid #d9d9d9;
  border-radius: 24rpx;
  color: #666666;
  font-weight: 500;
}

.btn-danger {
  background: linear-gradient(135deg, #ff4d4f, #ff7875);
  border: none;
  border-radius: 24rpx;
  color: #ffffff;
  font-weight: 500;
  box-shadow: 0 4rpx 12rpx rgba(255, 77, 79, 0.3);
}

/* 通用卡片样式 */
.card {
  background: linear-gradient(145deg, #ffffff, #f9fafc);
  border-radius: 28rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.08);
  border: 1rpx solid rgba(255, 255, 255, 0.8);
}

/* 通用文本样式 */
.text-primary {
  color: #1890ff;
}

.text-success {
  color: #52c41a;
}

.text-warning {
  color: #faad14;
}

.text-danger {
  color: #ff4d4f;
}

.text-muted {
  color: #666666;
}

/* 通用间距 */
.mt-10 { margin-top: 10rpx; }
.mt-20 { margin-top: 20rpx; }
.mt-30 { margin-top: 30rpx; }
.mb-10 { margin-bottom: 10rpx; }
.mb-20 { margin-bottom: 20rpx; }
.mb-30 { margin-bottom: 30rpx; }
.ml-10 { margin-left: 10rpx; }
.ml-20 { margin-left: 20rpx; }
.mr-10 { margin-right: 10rpx; }
.mr-20 { margin-right: 20rpx; }

.p-10 { padding: 10rpx; }
.p-20 { padding: 20rpx; }
.p-30 { padding: 30rpx; }
.pt-10 { padding-top: 10rpx; }
.pt-20 { padding-top: 20rpx; }
.pb-10 { padding-bottom: 10rpx; }
.pb-20 { padding-bottom: 20rpx; }
.pl-10 { padding-left: 10rpx; }
.pl-20 { padding-left: 20rpx; }
.pr-10 { padding-right: 10rpx; }
.pr-20 { padding-right: 20rpx; }

/* 通用布局 */
.flex {
  display: flex;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flex-1 {
  flex: 1;
}

/* 通用圆角 */
.rounded {
  border-radius: 12rpx;
}

.rounded-lg {
  border-radius: 20rpx;
}

.rounded-xl {
  border-radius: 28rpx;
}

/* 通用阴影 */
.shadow {
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
}

.shadow-lg {
  box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.12);
}
</style>