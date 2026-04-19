<template>
  <view class="share-page">
    <!-- 背景装饰 -->
    <view class="bg-glow bg-glow--top"></view>
    <view class="bg-glow bg-glow--bottom"></view>

    <!-- 数据加载失败时显示 -->
    <view v-if="loadError" class="error-state">
      <text class="error-icon">!</text>
      <text class="error-title">链接无效或已过期</text>
      <text class="error-desc">请确认分享链接是否完整</text>
    </view>

    <!-- 正常内容（仅在有有效数据时渲染） -->
    <template v-else-if="hasData">
      <!-- 头部品牌区 -->
      <view class="brand-header">
        <text class="brand-text">CP</text>
        <text class="brand-sub">彩票记录</text>
      </view>

      <!-- 批量分享模式 -->
      <view v-if="isBatchMode" class="batch-mode">
        <view class="batch-badge">
          <text class="badge-icon">BATCH</text>
          <text class="badge-count">{{ lotteryData.records.length }} 条投注</text>
        </view>

        <view class="batch-list">
          <view
            class="ticket-card"
            v-for="(record, index) in lotteryData.records"
            :key="record.id || index"
            :class="[record.type || 'ssq']"
            :style="{ animationDelay: (index * 80) + 'ms' }"
          >
            <view class="ticket-left-bar"></view>
            <view class="ticket-body">
              <view class="ticket-meta">
                <text class="ticket-type">{{ record.type === 'dlt' ? '大乐透' : '双色球' }}</text>
                <text class="ticket-date">{{ record.openTime || '' }}</text>
              </view>
              <view class="ticket-balls">
                <view class="ball-row red-row" v-if="record.redBall">
                  <text class="num-ball red-ball" v-for="(ball, bi) in record.redBall.split(',')" :key="'r'+bi">{{ ball }}</text>
                </view>
                <view class="ball-row blue-row" v-if="record.blueBall">
                  <text class="num-ball blue-ball" v-for="(ball, bi) in record.blueBall.split(',')" :key="'b'+bi">{{ ball }}</text>
                </view>
              </view>
              <view class="ticket-footer-line"></view>
              <view class="ticket-status-row">
                <text class="status-dot" :class="getStatusClass(record.status)"></text>
                <text class="status-label" :class="getStatusClass(record.status)">{{ getStatusText(record.status) }}</text>
              </view>
            </view>
            <view class="ticket-index">
              <text>{{ String(index + 1).padStart(2, '0') }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 单条分享模式 -->
      <view v-else class="single-mode">
        <view class="ticket-main" :class="lotteryData.type || 'ssq'">
          <view class="ticket-decoration">
            <view class="deco-circle deco-circle--1"></view>
            <view class="deco-circle deco-circle--2"></view>
            <view class="deco-circle deco-circle--3"></view>
          </view>

          <view class="ticket-content">
            <view class="ticket-top">
              <text class="lottery-kind">{{ lotteryData.type === 'dlt' ? '大乐透' : '双色球' }}</text>
              <text class="lottery-period">{{ lotteryData.openTime || '' }} 期</text>
            </view>

            <view class="balls-display">
              <view class="red-zone">
                <view class="zone-label">RED</view>
                <view class="balls-wrap">
                  <text class="ball-item red" v-for="(ball, idx) in redBalls" :key="'r'+idx" :style="{ animationDelay: idx * 80 + 'ms' }">{{ ball }}</text>
                </view>
              </view>
              <view class="divider-v"></view>
              <view class="blue-zone">
                <view class="zone-label">BLUE</view>
                <view class="balls-wrap">
                  <text class="ball-item blue" v-for="(ball, idx) in blueBalls" :key="'b'+idx" :style="{ animationDelay: (redBalls.length + idx) * 80 + 'ms' }">{{ ball }}</text>
                </view>
              </view>
            </view>

            <view class="result-bar">
              <view class="status-indicator" :class="getStatusClass(lotteryData.status)">
                <view class="pulse-ring" v-if="!lotteryData.status || String(lotteryData.status).trim() === '' || String(lotteryData.status) === 'null' || String(lotteryData.status) === 'undefined'"></view>
                <text>{{ getStatusText(lotteryData.status) }}</text>
              </view>
            </view>
          </view>

          <view class="ticket-border-dash"></view>
        </view>
      </view>

      <!-- 底部推广 -->
      <view class="promo-section">
        <view class="promo-card">
          <view class="promo-icon-wrap">
            <text class="promo-icon">*</text>
          </view>
          <text class="promo-title">CP 彩票助手</text>
          <text class="promo-desc">拍照识号 / AI智能选号 / 开奖提醒</text>
          <button class="promo-btn" @click="downloadApp">立即下载</button>
        </view>
      </view>

      <!-- 页脚 -->
      <view class="page-footer">
        <text class="footer-text">cpcx.800820882.xyz</text>
      </view>
    </template>
  </view>
</template>

<script>
// 纯前端页面，不引入任何API模块
export default {
  data() {
    return {
      lotteryData: {
        id: '',
        type: '',
        redBall: '',
        blueBall: '',
        openTime: '',
        status: null,
        user: '',
        records: []
      },
      redBalls: [],
      blueBalls: [],
      isBatchMode: false,
      hasData: false,
      loadError: false
    }
  },

  onLoad(options) {
    // 纯本地解析，不发起任何网络请求
    if (!options.data) {
      this.loadError = true
      return
    }

    try {
      const decodedData = decodeURIComponent(options.data)
      const jsonData = JSON.parse(decodeURIComponent(atob(decodedData)))

      // 基本校验：必须有type字段才算有效数据
      if (!jsonData && !jsonData.records) {
        this.loadError = true
        return
      }

      // 防止注入非预期的响应结构（如 { code: 401, message: ... }）
      if (jsonData.code !== undefined && typeof jsonData.code === 'number') {
        this.loadError = true
        return
      }

      this.lotteryData = jsonData
      this.isBatchMode = jsonData.type === 'batch' && Array.isArray(jsonData.records) && jsonData.records.length > 0

      if (!this.isBatchMode) {
        if (this.lotteryData.redBall) {
          this.redBalls = this.lotteryData.redBall.split(',')
        }
        if (this.lotteryData.blueBall) {
          this.blueBalls = this.lotteryData.blueBall.split(',')
        }
      }

      this.hasData = true
      console.log('分享数据解析成功:', jsonData)
    } catch (error) {
      console.error('数据解析失败:', error)
      this.loadError = true
    }
  },

  methods: {
    getStatusText(status) {
      const map = {
        'pending': '待开奖',
        'null': '待开奖',
        'undefined': '待开奖',
        '': '待开奖',
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
      const s = String(status == null ? '' : status).trim()
      if (!s || s === 'null' || s === 'undefined') return '待开奖'
      return map[s] || '待开奖'
    },

    getStatusClass(status) {
      const s = String(status == null ? '' : status).trim()
      if (!s || s === 'null' || s === 'undefined') return 'status-pending'
      if (s === 'won' || s === '1' || s === '2' || s === '3') return 'status-won'
      if (s === 'lost' || (parseInt(s) > 3 && !isNaN(parseInt(s)))) return 'status-lost'
      return 'status-pending'
    },

    downloadApp() {
      const apkUrl = 'https://jyqwwftobbtmiccsccjd.supabase.co/storage/v1/object/public/apk/cpcxapp.apk'

      // #ifdef H5
      window.location.href = apkUrl
      // #endif

      // #ifndef H5
      uni.showLoading({ title: '下载中...' })
      uni.downloadFile({
        url: apkUrl,
        success: (res) => {
          uni.hideLoading()
          if (res.statusCode === 200) {
            uni.showToast({ title: '下载成功', icon: 'success' })
            uni.openDocument({ filePath: res.tempFilePath, showMenu: true })
          } else {
            uni.showToast({ title: '下载失败', icon: 'none' })
          }
        },
        fail: () => {
          uni.hideLoading()
          uni.showToast({ title: '下载失败', icon: 'none' })
        }
      })
      // #endif
    },

    shareAgain() {
      let title, summary

      if (this.isBatchMode) {
        title = '我的彩票投注记录'
        summary = `共 ${this.lotteryData.records.length} 条`
      } else {
        const type = this.lotteryData.type === 'dlt' ? '大乐透' : '双色球'
        title = `我的${type}投注记录`
        summary = `${this.lotteryData.openTime} | ${this.getStatusText(this.lotteryData.status)}`
      }

      // #ifdef H5
      let link = ''
      try {
        link = window.location.href || ''
      } catch(e) {
        link = ''
      }
      // #endif

      // #ifndef H5
      let link = ''
      // #endif

      uni.setClipboardData({
        data: `${title}\n${summary}\n查看：${link}`,
        success: () => {
          uni.showModal({
            title: '已复制',
            content: '打开微信粘贴发送给好友',
            showCancel: false
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/* ===== 变量 ===== */
$bg-primary: #f4f6fb;
$bg-secondary: #ebedf5;
$card-bg: #ffffff;
$card-border: rgba(0,0,0,0.06);
$text-primary: #1a1a2e;
$text-secondary: #5a607a;
$text-muted: #9ca3b8;

$red-primary: #e74c3c;
$red-light: #ff6b6b;
$blue-primary: #3498db;
$blue-light: #5dade2;
$gold: #e8a817;
$green-won: #27ae60;

/* ===== 页面容器 ===== */
.share-page {
  min-height: 100vh;
  background: $bg-primary;
  background-image:
    radial-gradient(ellipse at 50% 0%, rgba(52,152,219,0.06) 0%, transparent 60%),
    radial-gradient(ellipse at 80% 100%, rgba(231,76,60,0.04) 0%, transparent 50%);
  padding: 32rpx;
  padding-top: 60rpx;
  position: relative;
  overflow: hidden;
}

.bg-glow {
  position: fixed;
  border-radius: 50%;
  pointer-events: none; z-index: 0;
  &--top { width: 400rpx; height: 400rpx; top: -100rpx; right: -100rpx; background: radial-gradient(circle, rgba(52,152,219,0.08), transparent 70%); }
  &--bottom { width: 350rpx; height: 350rpx; bottom: 10%; left: -80rpx; background: radial-gradient(circle, rgba(231,76,60,0.06), transparent 70%); }
}

/* ===== 错误状态 ===== */
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 200rpx;
  position: relative; z-index: 1;
}
.error-icon {
  font-size: 72rpx;
  font-weight: 800;
  color: $red-primary;
  width: 120rpx; height: 120rpx; line-height: 120rpx;
  border-radius: 50%;
  background: rgba($red-primary, 0.08);
  margin-bottom: 28rpx;
}
.error-title { font-size: 34rpx; font-weight: 700; color: $text-primary; margin-bottom: 12rpx; }
.error-desc { font-size: 26rpx; color: $text-muted; }

/* ===== 品牌 ===== */
.brand-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
  margin-bottom: 48rpx;
  position: relative; z-index: 1;
}
.brand-text {
  font-size: 40rpx; font-weight: 800; color: $text-primary;
  letter-spacing: 4rpx; font-family: Georgia, serif;
}
.brand-sub { font-size: 24rpx; color: $text-muted; letter-spacing: 6rpx; text-transform: uppercase; }

/* ===== 批量模式 ===== */
.batch-mode { position: relative; z-index: 1; }
.batch-badge {
  display: flex; align-items: center; gap: 16rpx;
  margin-bottom: 28rpx; justify-content: center;
}
.badge-icon {
  font-size: 22rpx; font-weight: 700; color: $gold;
  background: rgba($gold, 0.1); padding: 6rpx 18rpx; border-radius: 20rpx; letter-spacing: 3rpx;
}
.badge-count { font-size: 26rpx; color: $text-secondary; }
.batch-list { display: flex; flex-direction: column; gap: 24rpx; }

.ticket-card {
  display: flex; align-items: stretch;
  background: $card-bg;
  border-radius: 16rpx; overflow: hidden;
  box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.05);
  border: 1rpx solid $card-border;
  animation: slideUp 0.4s ease both;

  &.ssq .ticket-left-bar { background: linear-gradient(180deg, $red-primary, darken($red-primary, 8%)); }
  &.dlt .ticket-left-bar { background: linear-gradient(180deg, $blue-primary, darken($blue-primary, 8%)); }
}

.ticket-left-bar { width: 8rpx; flex-shrink: 0; }
.ticket-body { flex: 1; padding: 24rpx 24rpx 20rpx; }
.ticket-meta { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16rpx; }
.ticket-type { font-size: 26rpx; font-weight: 700; color: $text-primary; }
.ticket-date { font-size: 22rpx; color: $text-muted; }
.ticket-balls { margin-bottom: 16rpx; }
.ball-row { display: flex; flex-wrap: wrap; gap: 10rpx; margin-bottom: 8rpx; &:last-child{margin-bottom:0;} }
.num-ball {
  width: 48rpx; height: 48rpx; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 22rpx; font-weight: 700; color: #fff;
  &.red-ball { background: linear-gradient(135deg, $red-primary, darken($red-primary, 15%)); box-shadow: 0 2rpx 8rpx rgba($red-primary, 0.35); }
  &.blue-ball { background: linear-gradient(135deg, $blue-primary, darken($blue-primary, 15%)); box-shadow: 0 2rpx 8rpx rgba($blue-primary, 0.35); }
}
.ticket-footer-line { height: 1rpx; background: linear-gradient(90deg, transparent, $card-border, transparent); margin-bottom: 14rpx; }

.status-dot {
  width: 12rpx; height: 12rpx; border-radius: 50%;
  &.status-pending { background: $gold; animation: blink 1.6s ease-in-out infinite; }
  &.status-won   { background: $green-won; }
  &.status-lost  { background: $text-muted; }
}

.status-label {
  font-size: 24rpx; font-weight: 600;
  &.status-pending { color: $gold; }
  &.status-won     { color: $green-won; }
  &.status-lost    { color: $text-muted; }
}

.ticket-index {
  width: 56rpx; display: flex; align-items: center; justify-content: center;
  background: rgba(0,0,0,0.03);
  text { font-size: 28rpx; font-weight: 800; color: rgba(0,0,0,0.1); font-family: Georgia, serif; }
}

/* ===== 单条模式 ===== */
.single-mode { position: relative; z-index: 1; display: flex; justify-content: center; }

.ticket-main {
  width: 100%; max-width: 650rpx;
  background: $card-bg;
  border-radius: 24rpx; overflow: hidden;
  position: relative;
  box-shadow: 0 8rpx 40rpx rgba(0,0,0,0.07);
  border: 1rpx solid $card-border;
  animation: fadeInScale 0.5s ease both;

  &.ssq { --accent: #{$red-primary}; --accent-shadow: #{rgba($red-primary, 0.2)}; .ticket-border-dash { border-color: rgba($red-primary, 0.15); } }
  &.dlt { --accent: #{$blue-primary}; --accent-shadow: #{rgba($blue-primary, 0.2)}; .ticket-border-dash { border-color: rgba($blue-primary, 0.15); } }
}

.ticket-decoration { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.deco-circle { position: absolute; border-radius: 50%; opacity: 0.05;
  &--1 { width: 200rpx; height: 200rpx; top: -60rpx; right: -40rpx; background: var(--accent); }
  &--2 { width: 120rpx; height: 120rpx; bottom: 30%; left: -40rpx; background: var(--accent); }
  &--3 { width: 80rpx; height: 80rpx; bottom: -20rpx; right: 20%; background: var(--accent); }
}

.ticket-content { padding: 36rpx 32rpx 32rpx; position: relative; z-index: 1; }
.ticket-top { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 32rpx; padding-bottom: 20rpx; border-bottom: 1rpx solid $card-border; }
.lottery-kind { font-size: 38rpx; font-weight: 800; color: $text-primary; letter-spacing: 2rpx; }
.lottery-period { font-size: 24rpx; color: $text-muted; }

.balls-display { display: flex; align-items: stretch; gap: 24rpx; margin-bottom: 28rpx; }
.red-zone, .blue-zone { flex: 1; }
.zone-label { font-size: 20rpx; font-weight: 700; color: $text-muted; letter-spacing: 3rpx; margin-bottom: 16rpx; text-transform: uppercase; }
.balls-wrap { display: flex; flex-wrap: wrap; gap: 12rpx; }

.ball-item {
  width: 68rpx; height: 68rpx; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 28rpx; font-weight: 700; color: #fff;
  animation: ballPop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  &.red { background: linear-gradient(145deg, $red-primary, darken($red-primary, 18%)); box-shadow: 0 4rpx 16rpx var(--accent-shadow), inset 0 2rpx 4rpx rgba(255,255,255,0.2); }
  &.blue { background: linear-gradient(145deg, $blue-primary, darken($blue-primary, 18%)); box-shadow: 0 4rpx 16rpx var(--accent-shadow), inset 0 2rpx 4rpx rgba(255,255,255,0.2); }
}

.divider-v { width: 1rpx; background: linear-gradient(180deg, transparent, $card-border, transparent); }
.result-bar { display: flex; justify-content: center; padding-top: 20rpx; border-top: 1rpx solid $card-border; }

.status-indicator {
  display: flex; align-items: center; gap: 12rpx;
  padding: 12rpx 32rpx; border-radius: 30rpx;
  font-size: 26rpx; font-weight: 600; position: relative;

  &.status-pending { background: rgba($gold, 0.08); color: $gold; border: 1rpx solid rgba($gold, 0.15); }
  &.status-won     { background: rgba($green-won, 0.08); color: $green-won; border: 1rpx solid rgba($green-won, 0.15); }
  &.status-lost    { background: rgba(0,0,0,0.03); color: $text-muted; border: 1rpx solid $card-border; }
}
.pulse-ring {
  width: 12rpx; height: 12rpx; border-radius: 50%;
  background: $gold; position: absolute; left: 14rpx;
  animation: pulseRing 1.6s ease-out infinite;
}

.ticket-border-dash {
  position: absolute; inset: 8rpx;
  border: 1rpx dashed rgba(255,255,255,0.08);
  border-radius: 20rpx; pointer-events: none;
}

/* ===== 操作按钮 ===== */
.action-area { display: flex; justify-content: center; margin-top: 44rpx; position: relative; z-index: 1; }
.action-btn {
  display: flex; align-items: center; justify-content: center; gap: 12rpx;
  min-width: 360rpx; height: 84rpx; border-radius: 42rpx;
  font-size: 30rpx; font-weight: 600; border: none; letter-spacing: 2rpx;
  &.primary-btn {
    background: linear-gradient(135deg, #FF3030, #FF6B6B); color: #fff;
    box-shadow: 0 8rpx 32rpx rgba(102,126,234,0.35);
    &:active { transform: scale(0.97); opacity: 0.9; }
  }
}
.btn-icon { font-size: 32rpx; }

/* ===== 推广 ===== */
.promo-section { margin-top: 60rpx; display: flex; justify-content: center; position: relative; z-index: 1; }
.promo-card {
  width: 90%; max-width: 600rpx;
  background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
  border-radius: 20rpx; padding: 36rpx 28rpx;
  display: flex; flex-direction: column; align-items: center;
  border: 1rpx solid $card-border; backdrop-filter: blur(8px);
}
.promo-icon-wrap { width: 72rpx; height: 72rpx; border-radius: 50%; background: linear-gradient(135deg, #FF3030, #FF6B6B); display: flex; align-items: center; justify-content: center; margin-bottom: 16rpx; }
.promo-icon { font-size: 34rpx; color: #fff; }
.promo-title { font-size: 30rpx; font-weight: 700; color: $text-primary; margin-bottom: 8rpx; }
.promo-desc { font-size: 24rpx; color: $text-secondary; margin-bottom: 24rpx; text-align: center; }
.promo-btn {
  background: rgba(255,255,255,0.1); color: $text-primary;
  border: 1rpx solid rgba(255,255,255,0.15);
  border-radius: 30rpx; padding: 14rpx 48rpx; font-size: 26rpx; font-weight: 600;
  &:active { background: rgba(255,255,255,0.15); }
}

/* ===== 页脚 ===== */
.page-footer { text-align: center; padding: 40rpx 0 60rpx; position: relative; z-index: 1; }
.footer-text { font-size: 20rpx; color: rgba(139,149,165,0.4); letter-spacing: 1rpx; }

/* ===== 动画 ===== */
@keyframes slideUp { from { opacity:0; transform: translateY(24rpx); } to { opacity:1; transform: translateY(0); } }
@keyframes fadeInScale { from { opacity:0; transform: scale(0.96); } to { opacity:1; transform: scale(1); } }
@keyframes ballPop { from { opacity:0; transform: scale(0.3); } to { opacity:1; transform: scale(1); } }
@keyframes blink { 0%, 100%{opacity:1;} 50%{opacity:0.3;} }
@keyframes pulseRing { 0%{transform:scale(1); opacity:0.6;} 100%{transform:scale(2.5); opacity:0;} }
</style>
