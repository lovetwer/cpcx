/**
 * UniPush 推送服务工具类
 * 实现每日定时推送中奖信息功能
 */

import { getLotteryByUser } from '@/http/api.js'
import { timeFormat } from '@/uni_modules/uview-plus'

class PushService {
  constructor() {
    this.clientId = '' // 推送客户端ID
    this.isInitialized = false
    this.pushTimer = null
    // 多个推送时间点
    this.pushTimes = [
      { hour: 20, minute: 12, type: 'buy_reminder' },    // 下午5点 - 买票提醒
      { hour: 21, minute: 0, type: 'buy_reminder' },    // 晚上9点 - 买票提醒
      { hour: 22, minute: 0, type: 'lottery_check' },   // 晚上10点 - 中奖检查
      { hour: 23, minute: 0, type: 'lottery_check' }    // 晚上11点 - 中奖检查
    ]
    this.lastPushDates = {} // 记录每种类型的最后推送日期，避免重复推送
  }

  /**
   * 初始化推送服务
   */
  async init() {
    try {
      // 检查推送模块是否可用
      if (!plus.push) {
        console.warn('推送模块不可用')
        return false
      }

      // 获取客户端推送标识
      this.clientId = plus.push.getClientInfo().clientid
      console.log('推送客户端ID:', this.clientId)

      // 监听推送消息
      this.setupPushListeners()

      // 设置定时推送
      this.setupDailyPush()

      this.isInitialized = true
      console.log('推送服务初始化成功')
      return true
    } catch (error) {
      console.error('推送服务初始化失败:', error)
      return false
    }
  }

  /**
   * 设置推送消息监听器
   */
  setupPushListeners() {
    // 监听推送消息点击事件
    plus.push.addEventListener('click', (message) => {
      console.log('推送消息被点击:', message)
      this.handlePushClick(message)
    }, false)

    // 监听推送消息接收事件
    plus.push.addEventListener('receive', (message) => {
      console.log('收到推送消息:', message)
      this.handlePushReceive(message)
    }, false)
  }

  /**
   * 处理推送消息点击
   */
  handlePushClick(message) {
    try {
      const payload = JSON.parse(message.payload || '{}')
      
      // 根据推送类型跳转到相应页面
      switch (payload.type) {
        case 'buy_reminder':
        case 'lottery_check':
        case 'winning_notification':
        case 'encouragement':
        case 'lottery_result':
        case 'daily_reminder':
          // 跳转到首页
          uni.switchTab({
            url: '/pages/index/index'
          })
          break
        default:
          console.log('未知推送类型:', payload.type)
      }
    } catch (error) {
      console.error('处理推送点击失败:', error)
    }
  }

  /**
   * 处理推送消息接收
   */
  handlePushReceive(message) {
    try {
      // 显示推送消息
      uni.showToast({
        title: message.title || '收到新消息',
        icon: 'none',
        duration: 3000
      })
    } catch (error) {
      console.error('处理推送接收失败:', error)
    }
  }

  /**
   * 设置每日定时推送
   */
  setupDailyPush() {
    // 清除之前的定时器
    if (this.pushTimer) {
      clearInterval(this.pushTimer)
    }

    // 每分钟检查一次是否到达推送时间
    this.pushTimer = setInterval(() => {
      this.checkDailyPushTime()
    }, 60000) // 每分钟检查一次

    console.log('每日推送定时器已设置')
  }

  /**
   * 检查是否到达推送时间
   */
  async checkDailyPushTime() {
    const now = new Date()
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()
    const today = now.toDateString()

    // 检查所有推送时间点
    for (const pushTime of this.pushTimes) {
      if (currentHour === pushTime.hour && currentMinute === pushTime.minute) {
        const pushKey = `${pushTime.type}_${pushTime.hour}_${today}`
        
        // 检查今天这个时间点是否已经推送过
        if (!this.lastPushDates[pushKey]) {
          console.log(`到达推送时间 ${pushTime.hour}:${pushTime.minute}，类型: ${pushTime.type}`)
          
          if (pushTime.type === 'buy_reminder') {
            await this.sendBuyReminderPush()
          } else if (pushTime.type === 'lottery_check') {
            await this.sendLotteryCheckPush()
          }
          
          // 记录已推送
          this.lastPushDates[pushKey] = true
        }
      }
    }
  }

  /**
   * 发送买票提醒推送（下午5点和晚上9点）
   */
  async sendBuyReminderPush() {
    try {
      const userName = uni.getStorageSync('userName')
      if (!userName) {
        console.log('用户未登录，跳过推送')
        return
      }

      // 获取用户今日的彩票记录
      const today = timeFormat(new Date(), 'yyyy-mm-dd')
      const response = await getLotteryByUser(userName)
      
      if (response.code === 20000 || response.code === 200) {
        const todayLotteries = (response.data || []).filter(item => 
          item.openTime >= today
        )

        // 如果今日没有选号记录，发送买票提醒
        if (todayLotteries.length === 0) {
          const message = {
            title: '🎫 买票提醒',
            content: '今日还未选号，快来选择您的幸运号码吧！\n点击进入选号页面',
            type: 'buy_reminder'
          }
          
          this.sendLocalNotification(message)
          console.log('买票提醒推送发送成功')
        } else {
          console.log('用户今日已选号，跳过买票提醒')
        }
      }
    } catch (error) {
      console.error('发送买票提醒推送失败:', error)
    }
  }

  /**
   * 发送中奖检查推送（晚上10点和11点）
   */
  async sendLotteryCheckPush() {
    try {
      const userName = uni.getStorageSync('userName')
      if (!userName) {
        console.log('用户未登录，跳过推送')
        return
      }

      // 获取用户今日的彩票记录
      const today = timeFormat(new Date(), 'yyyy-mm-dd')
      const response = await getLotteryByUser(userName)
      
      if (response.code === 20000 || response.code === 200) {
        const todayLotteries = (response.data || []).filter(item => 
          item.openTime >= today
        )

        if (todayLotteries.length > 0) {
          // 检查是否有中奖记录
          const winningLotteries = todayLotteries.filter(item => 
            item.status === 'won' || item.winChance > 80 // 假设中奖概率>80%为中奖
          )

          if (winningLotteries.length > 0) {
            // 发送中奖祝贺推送
            const message = this.buildWinningMessage(winningLotteries, todayLotteries.length)
            this.sendLocalNotification(message)
            console.log('中奖祝贺推送发送成功')
          } else {
            // 发送再接再厉推送
            const message = this.buildEncouragementMessage(todayLotteries.length)
            this.sendLocalNotification(message)
            console.log('再接再厉推送发送成功')
          }
        } else {
          console.log('用户今日无选号记录，跳过中奖检查')
        }
      }
    } catch (error) {
      console.error('发送中奖检查推送失败:', error)
    }
  }

  /**
   * 构建中奖祝贺推送消息
   */
  buildWinningMessage(winningLotteries, totalCount) {
    const winCount = winningLotteries.length
    let title = `🎉 恭喜中奖！`
    let content = ''

    if (winCount === 1) {
      content = `您有 1 注号码中奖了！`
    } else {
      content = `您有 ${winCount} 注号码中奖了！`
    }

    // 统计中奖类型
    const ssqWins = winningLotteries.filter(item => item.type === 'ssq').length
    const dltWins = winningLotteries.filter(item => item.type === 'dlt').length

    if (ssqWins > 0 && dltWins > 0) {
      content += `\n双色球 ${ssqWins} 注，大乐透 ${dltWins} 注`
    } else if (ssqWins > 0) {
      content += `\n双色球 ${ssqWins} 注中奖`
    } else if (dltWins > 0) {
      content += `\n大乐透 ${dltWins} 注中奖`
    }

    content += '\n点击查看详情，恭喜发财！💰'

    return {
      title,
      content,
      type: 'winning_notification',
      data: { winCount, totalCount, ssqWins, dltWins }
    }
  }

  /**
   * 构建再接再厉推送消息
   */
  buildEncouragementMessage(totalCount) {
    const encouragements = [
      '再接再厉，好运就在下一次！',
      '坚持就是胜利，继续加油！',
      '每一次尝试都是成功的开始！',
      '幸运女神正在向您招手！',
      '下次一定会有好运气！'
    ]
    
    const randomEncouragement = encouragements[Math.floor(Math.random() * encouragements.length)]
    
    let title = `💪 ${randomEncouragement}`
    let content = `今日已选 ${totalCount} 注号码，虽然这次没有中奖，但不要灰心！`
    content += '\n明天继续努力，好运一定会来的！🍀'
    content += '\n点击查看详情'

    return {
      title,
      content,
      type: 'encouragement',
      data: { totalCount }
    }
  }

  /**
   * 构建中奖信息推送消息（保留原方法用于兼容）
   */
  buildLotteryMessage(lotteries) {
    const count = lotteries.length
    let title = `🎯 今日已选 ${count} 注号码`
    let content = ''

    // 统计不同类型的彩票
    const ssqCount = lotteries.filter(item => item.type === 'ssq').length
    const dltCount = lotteries.filter(item => item.type === 'dlt').length

    if (ssqCount > 0 && dltCount > 0) {
      content = `双色球 ${ssqCount} 注，大乐透 ${dltCount} 注`
    } else if (ssqCount > 0) {
      content = `双色球 ${ssqCount} 注`
    } else if (dltCount > 0) {
      content = `大乐透 ${dltCount} 注`
    }

    // 添加中奖概率信息
    const avgProbability = lotteries.reduce((sum, item) => sum + (item.winChance || 0), 0) / count
    if (avgProbability > 0) {
      content += `，平均中奖概率 ${avgProbability.toFixed(1)}%`
    }

    content += '\n点击查看详情，祝您好运！🍀'

    return {
      title,
      content,
      type: 'lottery_result',
      data: { count, ssqCount, dltCount, avgProbability }
    }
  }

  /**
   * 发送本地推送通知
   */
  sendLocalNotification(message) {
    try {
      // 创建本地推送消息
      const notification = {
        title: message.title,
        content: message.content,
        payload: JSON.stringify({
          type: message.type,
          data: message.data,
          timestamp: Date.now()
        })
      }

      // 发送本地推送
      plus.push.createMessage(
        notification.content,
        notification.payload,
        {
          title: notification.title,
          icon: '/static/1756360024.png', // 推送图标
          sound: 'system', // 系统提示音
          vibrate: true // 震动
        }
      )

      console.log('本地推送发送成功:', notification)
    } catch (error) {
      console.error('发送本地推送失败:', error)
    }
  }

  /**
   * 发送选号提醒推送
   */
  sendReminderNotification() {
    try {
      const message = {
        title: '🎲 彩票选号提醒',
        content: '今日还未选号，快来试试AI智能选号吧！\n点击进入选号页面',
        type: 'daily_reminder'
      }

      this.sendLocalNotification(message)
      console.log('选号提醒推送发送成功')
    } catch (error) {
      console.error('发送选号提醒推送失败:', error)
    }
  }

  /**
   * 手动发送测试推送
   */
  async sendTestPush() {
    try {
      const testMessage = {
        title: '🧪 测试推送',
        content: '这是一条测试推送消息，推送功能正常工作！',
        type: 'test'
      }

      this.sendLocalNotification(testMessage)
      
      uni.showToast({
        title: '测试推送已发送',
        icon: 'success'
      })
    } catch (error) {
      console.error('发送测试推送失败:', error)
      uni.showToast({
        title: '测试推送发送失败',
        icon: 'error'
      })
    }
  }

  /**
   * 设置推送时间（保留原方法用于兼容）
   */
  setPushTime(hour, minute) {
    console.log(`推送时间设置请求: ${hour}:${minute}`)
    console.log('当前使用多时间点推送，该方法仅用于兼容')
  }

  /**
   * 启用/禁用推送
   */
  togglePush(enabled) {
    if (enabled) {
      if (!this.pushTimer) {
        this.setupDailyPush()
      }
      console.log('推送已启用')
    } else {
      if (this.pushTimer) {
        clearInterval(this.pushTimer)
        this.pushTimer = null
      }
      console.log('推送已禁用')
    }
  }

  /**
   * 获取推送状态
   */
  getPushStatus() {
    return {
      isInitialized: this.isInitialized,
      clientId: this.clientId,
      pushTimes: this.pushTimes,
      isEnabled: !!this.pushTimer
    }
  }

  /**
   * 清理过期的推送记录（每天清理一次）
   */
  cleanupPushRecords() {
    const now = new Date()
    const today = now.toDateString()
    
    // 清理非今天的推送记录
    Object.keys(this.lastPushDates).forEach(key => {
      if (!key.includes(today)) {
        delete this.lastPushDates[key]
      }
    })
    
    console.log('推送记录清理完成')
  }

  /**
   * 更新推送设置
   */
  updateSettings(newSettings) {
    console.log('更新推送设置:', newSettings)
    
    // 更新推送时间配置
    this.pushTimes = []
    
    // 添加买票提醒时间
    if (newSettings.buyReminderEnabled && newSettings.buyReminderTimes) {
      newSettings.buyReminderTimes.forEach(time => {
        const hour = parseInt(time.hour)
        const minute = parseInt(time.minute)
        
        if (!isNaN(hour) && !isNaN(minute)) {
          this.pushTimes.push({
            hour: hour,
            minute: minute,
            type: 'buy_reminder'
          })
        }
      })
    }
    
    // 添加开奖提醒时间
    if (newSettings.lotteryReminderEnabled && newSettings.lotteryReminderTimes) {
      newSettings.lotteryReminderTimes.forEach(time => {
        const hour = parseInt(time.hour)
        const minute = parseInt(time.minute)
        
        if (!isNaN(hour) && !isNaN(minute)) {
          this.pushTimes.push({
            hour: hour,
            minute: minute,
            type: 'lottery_check'
          })
        }
      })
    }
    
    console.log('推送时间已更新:', this.pushTimes)
    
    // 重新设置定时器
    this.setupDailyPush()
  }

  /**
   * 销毁推送服务
   */
  destroy() {
    if (this.pushTimer) {
      clearInterval(this.pushTimer)
      this.pushTimer = null
    }
    
    this.isInitialized = false
    console.log('推送服务已销毁')
  }
}

// 创建推送服务单例
const pushService = new PushService()

export default pushService