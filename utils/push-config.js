/**
 * UniPush 推送配置文件
 * 配置推送相关的常量和设置
 */

// 推送配置
export const PUSH_CONFIG = {
  // 多个推送时间点
  PUSH_TIMES: [
    { hour: 18, minute: 22, type: 'buy_reminder', label: '下午5点 - 买票提醒' },
    { hour: 21, minute: 0, type: 'buy_reminder', label: '晚上9点 - 买票提醒' },
    { hour: 22, minute: 0, type: 'lottery_check', label: '晚上10点 - 中奖检查' },
    { hour: 23, minute: 0, type: 'lottery_check', label: '晚上11点 - 中奖检查' }
  ],
  
  // 推送消息类型
  MESSAGE_TYPES: {
    BUY_REMINDER: 'buy_reminder',        // 买票提醒
    LOTTERY_CHECK: 'lottery_check',      // 中奖检查
    WINNING_NOTIFICATION: 'winning_notification', // 中奖通知
    ENCOURAGEMENT: 'encouragement',      // 再接再厉
    LOTTERY_RESULT: 'lottery_result',    // 中奖信息推送（兼容）
    DAILY_REMINDER: 'daily_reminder',    // 每日提醒（兼容）
    TEST: 'test'                         // 测试推送
  },
  
  // 推送图标和声音配置
  NOTIFICATION_CONFIG: {
    icon: '/static/1756360024.png',
    sound: 'system',
    vibrate: true
  },
  
  // 推送消息模板
  MESSAGE_TEMPLATES: {
    // 买票提醒推送模板
    BUY_REMINDER: {
      title: '🎫 买票提醒',
      content: '今日还未选号，快来选择您的幸运号码吧！\n点击进入选号页面'
    },
    
    // 中奖通知推送模板
    WINNING_NOTIFICATION: {
      title: '🎉 恭喜中奖！',
      getContent: (data) => {
        const { winCount, ssqWins, dltWins } = data
        let content = `您有 ${winCount} 注号码中奖了！`
        
        if (ssqWins > 0 && dltWins > 0) {
          content += `\n双色球 ${ssqWins} 注，大乐透 ${dltWins} 注`
        } else if (ssqWins > 0) {
          content += `\n双色球 ${ssqWins} 注中奖`
        } else if (dltWins > 0) {
          content += `\n大乐透 ${dltWins} 注中奖`
        }
        
        content += '\n点击查看详情，恭喜发财！💰'
        return content
      }
    },
    
    // 再接再厉推送模板
    ENCOURAGEMENT: {
      title: '💪 再接再厉',
      getContent: (data) => {
        const { totalCount } = data
        const encouragements = [
          '再接再厉，好运就在下一次！',
          '坚持就是胜利，继续加油！',
          '每一次尝试都是成功的开始！',
          '幸运女神正在向您招手！',
          '下次一定会有好运气！'
        ]
        const randomEncouragement = encouragements[Math.floor(Math.random() * encouragements.length)]
        
        let content = `今日已选 ${totalCount} 注号码，虽然这次没有中奖，但不要灰心！`
        content += '\n明天继续努力，好运一定会来的！🍀'
        content += '\n点击查看详情'
        return content
      }
    },
    
    // 中奖信息推送模板（兼容）
    LOTTERY_RESULT: {
      title: '🎯 今日选号统计',
      getContent: (data) => {
        const { count, ssqCount, dltCount, avgProbability } = data
        let content = `已选 ${count} 注号码`
        
        if (ssqCount > 0 && dltCount > 0) {
          content += `（双色球 ${ssqCount} 注，大乐透 ${dltCount} 注）`
        } else if (ssqCount > 0) {
          content += `（双色球 ${ssqCount} 注）`
        } else if (dltCount > 0) {
          content += `（大乐透 ${dltCount} 注）`
        }
        
        if (avgProbability > 0) {
          content += `\n平均中奖概率：${avgProbability.toFixed(1)}%`
        }
        
        content += '\n点击查看详情，祝您好运！🍀'
        return content
      }
    },
    
    // 选号提醒推送模板（兼容）
    DAILY_REMINDER: {
      title: '🎲 彩票选号提醒',
      content: '今日还未选号，快来试试AI智能选号吧！\n点击进入选号页面'
    },
    
    // 测试推送模板
    TEST: {
      title: '🧪 测试推送',
      content: '这是一条测试推送消息，推送功能正常工作！'
    }
  }
}

// 推送权限检查
export const checkPushPermission = () => {
  return new Promise((resolve) => {
    // #ifdef APP-PLUS
    if (plus.push) {
      // 检查推送权限
      plus.push.getClientInfo((info) => {
        resolve({
          hasPermission: true,
          clientId: info.clientid,
          appId: info.appid
        })
      }, (error) => {
        console.error('获取推送信息失败:', error)
        resolve({
          hasPermission: false,
          error: error.message
        })
      })
    } else {
      resolve({
        hasPermission: false,
        error: '推送模块不可用'
      })
    }
    // #endif
    
    // #ifndef APP-PLUS
    resolve({
      hasPermission: false,
      error: '当前平台不支持推送'
    })
    // #endif
  })
}

// 请求推送权限
export const requestPushPermission = () => {
  return new Promise((resolve) => {
    // #ifdef APP-PLUS
    // Android 平台请求通知权限
    if (uni.getSystemInfoSync().platform === 'android') {
      plus.android.requestPermissions(
        ['android.permission.WRITE_EXTERNAL_STORAGE'],
        (result) => {
          console.log('权限请求结果:', result)
          resolve(true)
        },
        (error) => {
          console.error('权限请求失败:', error)
          resolve(false)
        }
      )
    } else {
      resolve(true)
    }
    // #endif
    
    // #ifndef APP-PLUS
    resolve(false)
    // #endif
  })
}

// 推送设置存储键名
export const STORAGE_KEYS = {
  PUSH_ENABLED: 'push_enabled',           // 推送开关
  PUSH_TIME: 'push_time',                 // 推送时间（兼容）
  LAST_PUSH_DATE: 'last_push_date'        // 最后推送日期
}

// 获取推送设置
export const getPushSettings = () => {
  return {
    enabled: uni.getStorageSync(STORAGE_KEYS.PUSH_ENABLED) !== false, // 默认开启
    pushTimes: PUSH_CONFIG.PUSH_TIMES, // 使用配置的推送时间
    lastPushDate: uni.getStorageSync(STORAGE_KEYS.LAST_PUSH_DATE) || ''
  }
}

// 保存推送设置
export const savePushSettings = (settings) => {
  if (settings.enabled !== undefined) {
    uni.setStorageSync(STORAGE_KEYS.PUSH_ENABLED, settings.enabled)
  }
  if (settings.lastPushDate) {
    uni.setStorageSync(STORAGE_KEYS.LAST_PUSH_DATE, settings.lastPushDate)
  }
}