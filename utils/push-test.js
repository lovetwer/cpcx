/**
 * 推送功能测试工具
 * 用于快速测试和调试推送功能
 */

import pushService from './push-service.js'

class PushTest {
  constructor() {
    this.testResults = []
  }

  /**
   * 运行完整的推送测试
   */
  async runFullTest() {
    console.log('🧪 开始推送功能完整测试...')
    
    const tests = [
      { name: '推送模块检查', test: this.testPushModule },
      { name: '推送服务初始化', test: this.testPushInit },
      { name: '推送权限检查', test: this.testPushPermission },
      { name: '发送测试推送', test: this.testSendPush },
      { name: '推送状态检查', test: this.testPushStatus }
    ]

    for (const testCase of tests) {
      try {
        console.log(`\n📋 测试: ${testCase.name}`)
        const result = await testCase.test.call(this)
        this.testResults.push({
          name: testCase.name,
          status: 'success',
          result
        })
        console.log(`✅ ${testCase.name} - 通过`)
      } catch (error) {
        this.testResults.push({
          name: testCase.name,
          status: 'failed',
          error: error.message
        })
        console.error(`❌ ${testCase.name} - 失败:`, error.message)
      }
    }

    this.printTestSummary()
    return this.testResults
  }

  /**
   * 测试推送模块是否可用
   */
  async testPushModule() {
    // #ifdef APP-PLUS
    if (!plus || !plus.push) {
      throw new Error('推送模块不可用，请检查 manifest.json 配置')
    }
    
    const clientInfo = plus.push.getClientInfo()
    if (!clientInfo || !clientInfo.clientid) {
      throw new Error('无法获取推送客户端ID')
    }
    
    return {
      clientId: clientInfo.clientid,
      appId: clientInfo.appid
    }
    // #endif
    
    // #ifndef APP-PLUS
    throw new Error('当前平台不支持推送功能')
    // #endif
  }

  /**
   * 测试推送服务初始化
   */
  async testPushInit() {
    const initResult = await pushService.init()
    if (!initResult) {
      throw new Error('推送服务初始化失败')
    }
    
    const status = pushService.getPushStatus()
    if (!status.isInitialized) {
      throw new Error('推送服务未正确初始化')
    }
    
    return status
  }

  /**
   * 测试推送权限
   */
  async testPushPermission() {
    // #ifdef APP-PLUS
    return new Promise((resolve, reject) => {
      plus.push.getClientInfo((info) => {
        resolve({
          hasPermission: true,
          clientId: info.clientid
        })
      }, (error) => {
        reject(new Error(`推送权限检查失败: ${error.message}`))
      })
    })
    // #endif
    
    // #ifndef APP-PLUS
    throw new Error('当前平台不支持推送权限检查')
    // #endif
  }

  /**
   * 测试发送推送
   */
  async testSendPush() {
    try {
      await pushService.sendTestPush()
      return { message: '测试推送发送成功' }
    } catch (error) {
      throw new Error(`测试推送发送失败: ${error.message}`)
    }
  }

  /**
   * 测试推送状态
   */
  async testPushStatus() {
    const status = pushService.getPushStatus()
    
    if (!status.isInitialized) {
      throw new Error('推送服务未初始化')
    }
    
    if (!status.isEnabled) {
      throw new Error('推送服务未启用')
    }
    
    return status
  }

  /**
   * 快速推送测试
   */
  async quickTest() {
    console.log('🚀 快速推送测试...')
    
    try {
      // 检查推送模块
      await this.testPushModule()
      console.log('✅ 推送模块正常')
      
      // 发送测试推送
      await this.testSendPush()
      console.log('✅ 测试推送发送成功')
      
      uni.showToast({
        title: '推送测试通过',
        icon: 'success'
      })
      
      return true
    } catch (error) {
      console.error('❌ 快速测试失败:', error.message)
      
      uni.showModal({
        title: '推送测试失败',
        content: error.message,
        showCancel: false
      })
      
      return false
    }
  }

  /**
   * 测试特定时间的推送逻辑
   */
  async testTimeBasedPush(hour, minute) {
    console.log(`🕐 测试 ${hour}:${minute} 时间点推送逻辑...`)
    
    const userName = uni.getStorageSync('userName')
    if (!userName) {
      throw new Error('用户未登录，无法测试推送逻辑')
    }
    
    // 模拟时间点推送
    if (hour === 17 || hour === 21) {
      // 买票提醒时间
      await pushService.sendBuyReminderPush()
      return { type: 'buy_reminder', message: '买票提醒推送测试完成' }
    } else if (hour === 22 || hour === 23) {
      // 中奖检查时间
      await pushService.sendLotteryCheckPush()
      return { type: 'lottery_check', message: '中奖检查推送测试完成' }
    } else {
      throw new Error('不是有效的推送时间点')
    }
  }

  /**
   * 打印测试摘要
   */
  printTestSummary() {
    console.log('\n📊 推送测试摘要:')
    console.log('==================')
    
    const successCount = this.testResults.filter(r => r.status === 'success').length
    const failedCount = this.testResults.filter(r => r.status === 'failed').length
    
    console.log(`✅ 成功: ${successCount}`)
    console.log(`❌ 失败: ${failedCount}`)
    console.log(`📋 总计: ${this.testResults.length}`)
    
    if (failedCount > 0) {
      console.log('\n❌ 失败的测试:')
      this.testResults
        .filter(r => r.status === 'failed')
        .forEach(r => {
          console.log(`  - ${r.name}: ${r.error}`)
        })
    }
    
    console.log('==================')
  }

  /**
   * 获取推送诊断信息
   */
  getDiagnosticInfo() {
    const info = {
      platform: uni.getSystemInfoSync().platform,
      pushService: pushService.getPushStatus(),
      userLogin: !!uni.getStorageSync('userName'),
      timestamp: new Date().toISOString()
    }
    
    // #ifdef APP-PLUS
    if (plus && plus.push) {
      try {
        info.clientInfo = plus.push.getClientInfo()
      } catch (error) {
        info.clientInfoError = error.message
      }
    }
    // #endif
    
    return info
  }
}

// 创建测试实例
const pushTest = new PushTest()

export default pushTest