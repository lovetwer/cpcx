<template>
  <view class="lottery-container">
    <!-- 顶部导航 -->
    <view class="nav-header">
      <u-subsection
        :list="list"
        :current="current"
        @change="changeType"
        activeColor="#1a1a1a"
        inactiveColor="#666666"
        bgColor="#ffffff"
      />
    </view>

    <!-- 主要内容区 -->
    <view class="main-content">
      <!-- 选球卡片 -->
      <view class="selection-card">
        <!-- 玩法选择器 -->
        <view class="play-mode-section">
          <view class="play-mode-header">
            <text class="play-mode-title">选择玩法</text>
          </view>
          <view class="play-mode-tabs">
            <view 
              class="mode-tab" 
              :class="{ active: playMode === 'single' }"
              @click="changePlayMode('single')"
            >
              <text class="mode-text">单式</text>
              <text class="mode-desc">{{ playModeDesc.single }}</text>
            </view>
            <view 
              class="mode-tab" 
              :class="{ active: playMode === 'multiple' }"
              @click="changePlayMode('multiple')"
            >
              <text class="mode-text">复式</text>
              <text class="mode-desc">{{ playModeDesc.multiple }}</text>
            </view>
            <view 
              class="mode-tab" 
              :class="{ active: playMode === 'dantuo' }"
              @click="changePlayMode('dantuo')"
            >
              <text class="mode-text">胆拖</text>
              <text class="mode-desc">{{ playModeDesc.dantuo }}</text>
            </view>
          </view>
        </view>

        <!-- AI选号按钮 -->
        <view class="ai-section" v-if="playMode === 'single'">
          <u-button
            type="primary"
            @click="aiSelectNumbers"
            :loading="aiLoading"
            :customStyle="aiButtonStyle"
          >
            {{ aiLoading ? 'AI计算中...' : 'AI智能选号' }}
          </u-button>
        </view>

        <!-- 单式/复式模式 - 红球选择区 -->
        <view class="ball-section" v-if="playMode !== 'dantuo'">
          <view class="section-header">
            <view class="title-wrapper">
              <text class="section-title">红球</text>
              <text class="ball-count">已选 {{ checkRedBoxValue.length }} 个{{ playMode === 'multiple' ? '（复式）' : '' }}</text>
            </view>
          </view>
          <view class="ball-grid">
            <u-checkbox-group placement="row" @change="redBoxChange" v-model="checkRedBoxValue">
              <u-checkbox
                v-for="(item, index) in redBallArr"
                :key="index"
                :label="item.name"
                :name="item.name"
                :customStyle="{
                  margin: '6rpx',
                  boxShadow: checkRedBoxValue.includes(item.name)
                    ? '0 4rpx 12rpx rgba(255,77,79,0.3)'
                    : 'none',
                  transition: 'all 0.3s ease'
                }"
                labelColor="#ff4d4f"
                activeColor="#ff4d4f"
                iconColor="#ffffff"
                inactiveColor="#ff4d4f"
                size="26"
                shape="circle"
              />
            </u-checkbox-group>
          </view>
        </view>

        <!-- 胆拖模式 - 红球胆码选择区 -->
        <view class="ball-section" v-if="playMode === 'dantuo'">
          <view class="section-header">
            <view class="title-wrapper">
              <text class="section-title dan-title">红球胆码</text>
              <text class="ball-count">已选 {{ redDanValue.length }} 个（必中）</text>
            </view>
          </view>
          <view class="ball-grid">
            <u-checkbox-group placement="row" @change="redDanChange" v-model="redDanValue">
              <u-checkbox
                v-for="(item, index) in redBallArr"
                :key="index"
                :label="item.name"
                :name="item.name"
                :disabled="redTuoValue.includes(item.name)"
                :customStyle="{
                  margin: '6rpx',
                  boxShadow: redDanValue.includes(item.name)
                    ? '0 4rpx 12rpx rgba(255,77,79,0.3)'
                    : 'none',
                  transition: 'all 0.3s ease'
                }"
                labelColor="#ff4d4f"
                activeColor="#ff4d4f"
                iconColor="#ffffff"
                inactiveColor="#ff4d4f"
                size="26"
                shape="circle"
              />
            </u-checkbox-group>
          </view>
        </view>

        <!-- 胆拖模式 - 红球拖码选择区 -->
        <view class="ball-section" v-if="playMode === 'dantuo'">
          <view class="section-header">
            <view class="title-wrapper">
              <text class="section-title tuo-title">红球拖码</text>
              <text class="ball-count">已选 {{ redTuoValue.length }} 个（选1个）</text>
            </view>
          </view>
          <view class="ball-grid">
            <u-checkbox-group placement="row" @change="redTuoChange" v-model="redTuoValue">
              <u-checkbox
                v-for="(item, index) in redBallArr"
                :key="index"
                :label="item.name"
                :name="item.name"
                :disabled="redDanValue.includes(item.name)"
                :customStyle="{
                  margin: '6rpx',
                  boxShadow: redTuoValue.includes(item.name)
                    ? '0 4rpx 12rpx rgba(255,165,0,0.3)'
                    : 'none',
                  transition: 'all 0.3s ease'
                }"
                labelColor="#ffa500"
                activeColor="#ffa500"
                iconColor="#ffffff"
                inactiveColor="#ffa500"
                size="26"
                shape="circle"
              />
            </u-checkbox-group>
          </view>
        </view>

        <!-- 单式/复式模式 - 蓝球选择区 -->
        <view class="ball-section" v-if="playMode !== 'dantuo'">
          <view class="section-header">
            <view class="title-wrapper">
              <text class="section-title blue-title">蓝球</text>
              <text class="ball-count">已选 {{ checkBlueBoxValue.length }} 个{{ playMode === 'multiple' ? '（复式）' : '' }}</text>
            </view>
          </view>
          <view class="ball-grid">
            <u-checkbox-group placement="row" @change="blueBoxChange" v-model="checkBlueBoxValue">
              <u-checkbox
                v-for="(item, index) in blueBallArr"
                :key="index"
                :label="item.name"
                :name="item.name"
                :customStyle="{
                  margin: '6rpx',
                  boxShadow: checkBlueBoxValue.includes(item.name)
                    ? '0 4rpx 12rpx rgba(24,144,255,0.3)'
                    : 'none',
                  transition: 'all 0.3s ease'
                }"
                labelColor="#1890ff"
                activeColor="#1890ff"
                iconColor="#ffffff"
                inactiveColor="#1890ff"
                size="26"
                shape="circle"
              />
            </u-checkbox-group>
          </view>
        </view>

        <!-- 胆拖模式 - 蓝球选择区（普通选择，非胆拖） -->
        <view class="ball-section" v-if="playMode === 'dantuo'">
          <view class="section-header">
            <view class="title-wrapper">
              <text class="section-title blue-title">蓝球</text>
              <text class="ball-count">已选 {{ checkBlueBoxValue.length }} 个</text>
            </view>
          </view>
          <view class="ball-grid">
            <u-checkbox-group placement="row" @change="blueBoxChangeDantuo" v-model="checkBlueBoxValue">
              <u-checkbox
                v-for="(item, index) in blueBallArr"
                :key="index"
                :label="item.name"
                :name="item.name"
                :customStyle="{
                  margin: '6rpx',
                  boxShadow: checkBlueBoxValue.includes(item.name)
                    ? '0 4rpx 12rpx rgba(24,144,255,0.3)'
                    : 'none',
                  transition: 'all 0.3s ease'
                }"
                labelColor="#1890ff"
                activeColor="#1890ff"
                iconColor="#ffffff"
                inactiveColor="#1890ff"
                size="26"
                shape="circle"
              />
            </u-checkbox-group>
          </view>
        </view>

        <!-- 日期选择 -->
        <view class="date-section">
          <u-calendar
            :show="show"
            @confirm="selectDate"
            @close="show = false"
            :minDate="minDate"
            color="#1a1a1a"
          />
          <view class="date-picker" @click="show = true">
            <text class="date-label">开奖日期</text>
            <view class="date-value-wrapper">
              <text class="date-value">{{ cpForm.openTime || '请选择' }}</text>
              <u-icon name="arrow-right" color="#666666" size="24" />
            </view>
          </view>
        </view>

        <!-- 实时选号区 -->
        <view class="realtime-selection" v-if="cpForm.redBall || cpForm.blueBall">
          <view class="realtime-header">
            <text class="realtime-title">当前选号</text>
            <view class="bet-info" v-if="betCount > 0">
              <text class="bet-count">{{ playMode === 'single' ? '单式' : playMode === 'multiple' ? '复式' : '胆拖' }} {{ betCount }}注</text>
            </view>
          </view>

          <!-- 胆拖模式显示胆码和拖码 -->
          <view class="realtime-numbers" v-if="playMode === 'dantuo'">
            <view v-if="redDanValue.length" class="realtime-group">
              <text class="group-label dan-label">红胆:</text>
              <view class="number-list">
                <text v-for="(num, idx) in redDanValue" :key="idx" class="realtime-number red-number dan-ball">{{ num }}</text>
              </view>
            </view>
            <view v-if="redTuoValue.length" class="realtime-group">
              <text class="group-label tuo-label">红拖:</text>
              <view class="number-list">
                <text v-for="(num, idx) in redTuoValue" :key="idx" class="realtime-number red-number">{{ num }}</text>
              </view>
            </view>
            <view v-if="cpForm.blueBall && cpForm.blueBall.length" class="realtime-group">
              <text class="group-label">蓝球:</text>
              <view class="number-list">
                <text v-for="(num, idx) in cpForm.blueBall.split(',')" :key="idx" class="realtime-number blue-number">{{ num }}</text>
              </view>
            </view>
          </view>

          <!-- 单式/复式模式显示 -->
          <view class="realtime-numbers" v-else>
            <view v-if="cpForm.redBall && cpForm.redBall.length" class="realtime-group">
              <text class="group-label">红球:</text>
              <view class="number-list">
                <text v-for="(num, idx) in cpForm.redBall.split(',')" :key="idx" class="realtime-number red-number">{{ num }}</text>
              </view>
            </view>
            <view v-if="cpForm.blueBall && cpForm.blueBall.length" class="realtime-group">
              <text class="group-label">蓝球:</text>
              <view class="number-list">
                <text v-for="(num, idx) in cpForm.blueBall.split(',')" :key="idx" class="realtime-number blue-number">{{ num }}</text>
              </view>
            </view>
          </view>
        </view>

        <!-- 提交按钮 -->
        <view class="submit-section">
          <view class="button-group">
            <u-button
              type="primary"
              @click="submitNum"
              :customStyle="{...primaryButtonStyle, flex: 1, marginRight: '20rpx'}"
              :loading="submitting"
            >
              确认选择
            </u-button>

            <u-button
              type="default"
              @click="rest"
              :customStyle="{...secondaryButtonStyle, flex: 1}"
            >
              重置
            </u-button>
          </view>
        </view>

        <!-- 已选号码展示区域 -->
        <view class="selected-numbers-section">
          <view class="section-header">
            <text class="section-title">已选号码</text>
            <view class="header-actions">

              <u-icon name="reload" color="#1890ff" size="24" @click="refreshData" style="margin-right: 20rpx;"></u-icon>
              <view class="upload-button" @click="chooseImage">
                <u-icon name="camera-fill" color="#1890ff" size="24"></u-icon>
                <text class="upload-text">拍照添加</text>
              </view>
            </view>
          </view>

          <view class="data-list" v-if="latestData.length">
            <view
              v-for="(item, idx) in latestData"
              :key="item._id || item.id"
              class="data-item"
            >
              <view class="data-info">
                <view class="data-type">
                  {{ item.type === 'ssq' ? '双色球' : '大乐透' }}
                </view>
                <view class="data-date">{{ item.openTime }}</view>
                <view class="data-numbers">
                  <text class="red-balls">红: {{ item.redBall }}</text>
                  <text class="blue-balls">蓝: {{ item.blueBall }}</text>
                </view>
              </view>
              <view class="data-actions">
                <u-button
                  type="error"
                  @click="confirmDelete(item)"
                  :customStyle="{...miniButtonStyle, background: dangerButtonStyle.background}"
                  size="mini"
                >
                  删除
                </u-button>
              </view>
            </view>
          </view>

          <view v-else-if="loadingLatestData" class="loading-text">
            正在加载数据…
          </view>

          <view v-else class="empty-text">
            今日暂无已选号码
          </view>
        </view>
      </view>
    </view>


  </view>
</template>

<script setup>

import { 
  addLottery, 
  getLotteryByUser, 
  deleteLottery, 
  generateNumbers, 
  uploadLotteryImage, 
  getUploadStatus 
} from '@/http/api.js'
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import {
  ssqBallRed,
  ssqBallBlue,
  dltBallRed,
  dltBallBlue
} from '../../utils/data.js'
import { timeFormat } from '@/uni_modules/uview-plus'
import {
  primaryButtonStyle,
  secondaryButtonStyle,
  dangerButtonStyle,
  aiButtonStyle,
  smallButtonStyle,
  miniButtonStyle
} from '@/utils/button-styles.js'
import pushService from '@/utils/push-service.js'

// 响应式状态
const date = ref('')
const current = ref(0)
const show = ref(false)
const checkRedBoxValue = ref([])
const checkBlueBoxValue = ref([])
const submitting = ref(false)
const latestData = ref([])
const loadingLatestData = ref(false)
const aiLoading = ref(false)
const uploading = ref(false)

// 玩法模式：single(单式), multiple(复式), dantuo(胆拖)
const playMode = ref('single')
const playModeDesc = reactive({
  single: '固定号码',
  multiple: '多号组合',
  dantuo: '胆码+拖码'
})

// 胆拖模式专用
const redDanValue = ref([])  // 红球胆码
const redTuoValue = ref([])  // 红球拖码
const blueDanValue = ref([]) // 蓝球胆码
const blueTuoValue = ref([]) // 蓝球拖码

// 注数计算
const betCount = ref(1)


// 常量
const list = reactive(['双色球', '大乐透'])
const minDate = new Date().getTime()

// 表单数据
const cpForm = ref({
  user: uni.getStorageSync('userName'),
  redBall: '',
  blueBall: '',
  openTime: '',
  type: 'ssq',
  playMode: 'normal',
  betType: 'single'
})

// 球数据
const redBallArr = ref(ssqBallRed)
const blueBallArr = ref(ssqBallBlue)

// 函数
const rest = () => {
  checkRedBoxValue.value = []
  checkBlueBoxValue.value = []
  redDanValue.value = []
  redTuoValue.value = []
  blueDanValue.value = []
  blueTuoValue.value = []
  cpForm.value.redBall = ''
  cpForm.value.blueBall = ''
  cpForm.value.openTime = timeFormat(new Date(), 'yyyy-mm-dd')
  cpForm.value.type = 'ssq'
  cpForm.value.betType = 'single'
  playMode.value = 'single'
  redBallArr.value = ssqBallRed
  blueBallArr.value = ssqBallBlue
  betCount.value = 1
}

// 切换玩法模式
const changePlayMode = (mode) => {
  playMode.value = mode
  // 映射 betType: single -> single, multiple -> complex, dantuo -> dantuo
  const betTypeMap = {
    'single': 'single',
    'multiple': 'complex',
    'dantuo': 'dantuo'
  }
  cpForm.value.betType = betTypeMap[mode] || 'single'
  // 清空所有选择
  checkRedBoxValue.value = []
  checkBlueBoxValue.value = []
  redDanValue.value = []
  redTuoValue.value = []
  blueDanValue.value = []
  blueTuoValue.value = []
  cpForm.value.redBall = ''
  cpForm.value.blueBall = ''
  betCount.value = 1
}

// 蓝球选择变化（用于胆拖模式）
const blueBoxChangeDantuo = (arr) => {
  checkBlueBoxValue.value = arr
  updateFormFromDantuo()
  calculateBetCount()
}

// 计算组合数 C(n, m)
const combination = (n, m) => {
  if (m > n || m < 0) return 0
  if (m === 0 || m === n) return 1
  let result = 1
  for (let i = 0; i < m; i++) {
    result = result * (n - i) / (i + 1)
  }
  return Math.round(result)
}

// 计算注数
const calculateBetCount = () => {
  const isSSQ = cpForm.value.type === 'ssq'
  const requiredRed = isSSQ ? 6 : 5
  const requiredBlue = isSSQ ? 1 : 2

  if (playMode.value === 'single') {
    // 单式：固定数量
    const redCount = checkRedBoxValue.value.length
    const blueCount = checkBlueBoxValue.value.length
    if (redCount === requiredRed && blueCount === requiredBlue) {
      betCount.value = 1
    } else {
      betCount.value = 0
    }
  } else if (playMode.value === 'multiple') {
    // 复式：组合计算
    const redCount = checkRedBoxValue.value.length
    const blueCount = checkBlueBoxValue.value.length
    if (redCount >= requiredRed && blueCount >= requiredBlue) {
      const redComb = combination(redCount, requiredRed)
      const blueComb = combination(blueCount, requiredBlue)
      betCount.value = redComb * blueComb
    } else {
      betCount.value = 0
    }
  } else if (playMode.value === 'dantuo') {
    // 胆拖：红球胆码+拖码，蓝球普通选择
    const redDanCount = redDanValue.value.length
    const redTuoCount = redTuoValue.value.length
    const blueCount = checkBlueBoxValue.value.length

    // 红球需要选够：胆码 + 拖码组合 = requiredRed
    // 拖码至少需要选 requiredRed - redDanCount 个
    const needRedTuo = requiredRed - redDanCount

    if (redDanCount >= 0 && redDanCount < requiredRed && 
        redTuoCount >= needRedTuo && redTuoCount > 0 &&
        blueCount >= requiredBlue) {
      const redComb = combination(redTuoCount, needRedTuo)
      const blueComb = combination(blueCount, requiredBlue)
      betCount.value = redComb * blueComb
    } else {
      betCount.value = 0
    }
  }

  return betCount.value
}

// 胆拖模式 - 红球胆码变化
const redDanChange = (arr) => {
  redDanValue.value = arr
  updateFormFromDantuo()
  calculateBetCount()
}

// 胆拖模式 - 红球拖码变化
const redTuoChange = (arr) => {
  redTuoValue.value = arr
  updateFormFromDantuo()
  calculateBetCount()
}

// 胆拖模式 - 蓝球胆码变化
const blueDanChange = (arr) => {
  blueDanValue.value = arr
  updateFormFromDantuo()
  calculateBetCount()
}

// 胆拖模式 - 蓝球拖码变化
const blueTuoChange = (arr) => {
  blueTuoValue.value = arr
  updateFormFromDantuo()
  calculateBetCount()
}

// 从胆拖数据更新表单
const updateFormFromDantuo = () => {
  // 红球：胆码 + 拖码
  const allRed = [...redDanValue.value, ...redTuoValue.value].sort((a, b) => parseInt(a) - parseInt(b))
  cpForm.value.redBall = allRed.join(',')
  
  // 蓝球：普通选择（非胆拖）
  const allBlue = [...checkBlueBoxValue.value].sort((a, b) => parseInt(a) - parseInt(b))
  cpForm.value.blueBall = allBlue.join(',')
}

const selectDate = arr => {
  const d = arr[0]
  date.value = d
  cpForm.value.openTime = d
  show.value = false
}

const redBoxChange = arr => {
  checkRedBoxValue.value = arr
  cpForm.value.redBall = arr.join(',')
  calculateBetCount()
}

const blueBoxChange = arr => {
  checkBlueBoxValue.value = arr
  cpForm.value.blueBall = arr.join(',')
  calculateBetCount()
}

const changeType = idx => {
  current.value = idx
  playMode.value = 'single'  // 重置玩法模式
  rest()
  
  if (idx === 0) {
    redBallArr.value = ssqBallRed
    blueBallArr.value = ssqBallBlue
    cpForm.value.type = 'ssq'
  } else {
    redBallArr.value = dltBallRed
    blueBallArr.value = dltBallBlue
    cpForm.value.type = 'dlt'
  }
  loadLatestData()
}

const aiSelectNumbers = () => {
  if (aiLoading.value) return
  
  aiLoading.value = true
  
  // 显示加载提示
  uni.showLoading({
    title: 'AI智能选号中...',
    mask: true
  })
  
  generateNumbers({ type: cpForm.value.type })
    .then(res => {
      // 隐藏加载提示
      uni.hideLoading()
      
      if ((res.code === 20000 || res.code === 200) && res.data) {
        // 适配新的数据格式 - recommendations数组
        let redBallsArray = []
        let blueBallsArray = []
        let analysisText = ''
        
        // 处理 aiResponse 字符串格式
        if (res.data.aiResponse && typeof res.data.aiResponse === 'string') {
          try {
            // 提取 JSON 字符串（去掉 ```json 和 ```）
            let jsonStr = res.data.aiResponse
            if (jsonStr.includes('```json')) {
              jsonStr = jsonStr.replace(/```json\n?/g, '').replace(/```\n?/g, '')
            }
            const aiData = JSON.parse(jsonStr)
            if (aiData.recommendations && Array.isArray(aiData.recommendations) && aiData.recommendations.length > 0) {
              const recommendation = aiData.recommendations[0]
              // 处理 redBalls 可能是字符串 "03,05,06,22,25,33" 的情况
              if (recommendation.redBalls) {
                if (typeof recommendation.redBalls === 'string') {
                  redBallsArray = recommendation.redBalls.split(',')
                } else if (Array.isArray(recommendation.redBalls)) {
                  redBallsArray = recommendation.redBalls
                }
              }
              // 处理 blueBalls 可能是字符串 "08" 的情况
              if (recommendation.blueBalls) {
                if (typeof recommendation.blueBalls === 'string') {
                  blueBallsArray = recommendation.blueBalls.split(',')
                } else if (Array.isArray(recommendation.blueBalls)) {
                  blueBallsArray = recommendation.blueBalls
                }
              }
              if (recommendation.analysis) {
                analysisText = recommendation.analysis
              }
            }
          } catch (e) {
            console.error('解析 aiResponse 失败:', e)
          }
        }
        // 新格式：data.recommendations[0].redBalls/blueBalls
        else if (res.data.recommendations && Array.isArray(res.data.recommendations) && res.data.recommendations.length > 0) {
          const recommendation = res.data.recommendations[0]
          if (recommendation.redBalls && Array.isArray(recommendation.redBalls)) {
            redBallsArray = recommendation.redBalls
          }
          if (recommendation.blueBalls && Array.isArray(recommendation.blueBalls)) {
            blueBallsArray = recommendation.blueBalls
          }
          if (recommendation.analysis) {
            analysisText = recommendation.analysis
          }
        }
        // 兼容旧格式
        else if (res.data.redBalls && Array.isArray(res.data.redBalls)) {
          redBallsArray = res.data.redBalls
        }
        if (res.data.blueBalls && Array.isArray(res.data.blueBalls)) {
          blueBallsArray = res.data.blueBalls
        }
        
        console.log('API返回的红球:', redBallsArray)
        console.log('API返回的蓝球:', blueBallsArray)
        
        // 确保数据格式一致
        const formattedRedBalls = redBallsArray.map(ball => {
          if (typeof ball === 'number') {
            return String(ball).padStart(2, '0')
          }
          return String(ball).padStart(2, '0')
        })
        
        const formattedBlueBalls = blueBallsArray.map(ball => {
          if (typeof ball === 'number') {
            return String(ball).padStart(2, '0')
          }
          return String(ball).padStart(2, '0')
        })
        
        console.log('格式化后的红球:', formattedRedBalls)
        console.log('格式化后的蓝球:', formattedBlueBalls)
        
        // 清空当前选择
        checkRedBoxValue.value = [...formattedRedBalls]
        checkBlueBoxValue.value = [...formattedBlueBalls]
        
        cpForm.value.redBall = formattedRedBalls.join(',')
        cpForm.value.blueBall = formattedBlueBalls.join(',')
        
        // 显示AI分析（如果有）
        if (analysisText) {
          uni.showModal({
            title: 'AI选号分析',
            content: analysisText,
            showCancel: false,
            confirmText: '知道了'
          })
        } else {
          uni.showToast({ 
            title: 'AI选号成功', 
            icon: 'success',
            duration: 2000
          })
        }
      } else {
        console.error('AI选号接口返回错误:', res)
        uni.showToast({ 
          title: res.message || `AI选号失败(${res.code || '未知错误'})`, 
          icon: 'none',
          duration: 2000
        })
      }
    })
    .catch(err => {
      // 隐藏加载提示
      uni.hideLoading()
      
      console.error('AI选号失败', err)
      uni.showToast({ 
        title: 'AI选号失败，请稍后再试', 
        icon: 'none',
        duration: 2000
      })
    })
    .finally(() => {
      aiLoading.value = false
    })
}

const submitNum = () => {
  const isSSQ = cpForm.value.type === 'ssq'
  const requiredRed = isSSQ ? 6 : 5
  const requiredBlue = isSSQ ? 1 : 2

  // 根据玩法模式验证
  if (playMode.value === 'single') {
    // 单式：固定数量
    const redCount = checkRedBoxValue.value.length
    const blueCount = checkBlueBoxValue.value.length
    if (redCount !== requiredRed) {
      uni.showToast({ title: `红球必须选择${requiredRed}个`, icon: 'none' })
      return
    }
    if (blueCount !== requiredBlue) {
      uni.showToast({ title: `蓝球必须选择${requiredBlue}个`, icon: 'none' })
      return
    }
  } else if (playMode.value === 'multiple') {
    // 复式：至少固定数量
    const redCount = checkRedBoxValue.value.length
    const blueCount = checkBlueBoxValue.value.length
    if (redCount < requiredRed) {
      uni.showToast({ title: `红球至少选择${requiredRed}个`, icon: 'none' })
      return
    }
    if (blueCount < requiredBlue) {
      uni.showToast({ title: `蓝球至少选择${requiredBlue}个`, icon: 'none' })
      return
    }
    if (betCount.value === 0) {
      uni.showToast({ title: '请选择有效的号码组合', icon: 'none' })
      return
    }
  } else if (playMode.value === 'dantuo') {
    // 胆拖：红球胆码+拖码，蓝球普通选择
    const redDanCount = redDanValue.value.length
    const redTuoCount = redTuoValue.value.length
    const blueCount = checkBlueBoxValue.value.length

    if (redDanCount >= requiredRed) {
      uni.showToast({ title: `红球胆码最多${requiredRed - 1}个`, icon: 'none' })
      return
    }
    if (redDanCount + redTuoCount < requiredRed) {
      uni.showToast({ title: `红球胆码+拖码至少${requiredRed}个`, icon: 'none' })
      return
    }
    if (redTuoCount < 1) {
      uni.showToast({ title: '红球拖码至少1个', icon: 'none' })
      return
    }
    if (blueCount < requiredBlue) {
      uni.showToast({ title: `蓝球至少选择${requiredBlue}个`, icon: 'none' })
      return
    }
    if (betCount.value === 0) {
      uni.showToast({ title: '请选择有效的号码组合', icon: 'none' })
      return
    }
  }

  if (!cpForm.value.openTime) {
    uni.showToast({ title: '请选择开奖时间', icon: 'none' })
    return
  }

  submitting.value = true
  addLottery(cpForm.value)
    .then(res => {
      if (res.code === 20000 || res.code === 200) {
        uni.showToast({ title:  '添加成功', icon: 'success' })
        
        // 直接使用返回的数据渲染，避免重新调用API
        if (res.data) {
          const today = timeFormat(new Date(), 'yyyy-mm-dd')
          
          // 如果返回的是数组，直接过滤今天及以后的数据
          if (Array.isArray(res.data)) {
            latestData.value = res.data.filter(it => it.openTime >= today)
          } 
          // 如果返回的是单条记录，添加到现有数据
          else if (typeof res.data === 'object' && res.data.openTime >= today) {
            latestData.value = [res.data, ...latestData.value]
          }
          
          rest()
        } else {
          // 如果返回数据为空，再调用loadLatestData
          loadLatestData()
        }
      } else {
        uni.showToast({ title: res.message || '添加失败', icon: 'error' })
      }
    })
    .finally(() => (submitting.value = false))
}

const loadLatestData = () => {
  if (!cpForm.value.user) return

  loadingLatestData.value = true
  const today = timeFormat(new Date(), 'yyyy-mm-dd')

  getLotteryByUser(cpForm.value.user)
    .then(res => {
      if (res.code === 20000 || res.code === 200) {
        latestData.value = (res.data || []).filter(it => it.openTime >= today)
      }
      loadingLatestData.value = false
    })
    .catch(err => {
      console.error('获取列表失败', err)
      uni.showToast({ title: '加载数据失败', icon: 'none' })
      loadingLatestData.value = false
    })
}

const confirmDelete = item => {
  uni.showModal({
    title: '确认删除',
    content: '确定要删除这条记录吗？',
    success(res) {
      if (res.confirm) deleteData(item)
    }
  })
}

const deleteData = item => {
  deleteLottery(item.id)
    .then(res => {
      if (res.code === 200) {
        uni.showToast({ title: '删除成功', icon: 'success' })
        loadLatestData()
      } else {
        uni.showToast({ title: res.message || '删除失败', icon: 'error' })
      }
    })
    .catch(err => {
      console.error('删除失败', err)
      uni.showToast({ title: '删除失败', icon: 'error' })
    })
}

onMounted(async () => {
  cpForm.value.openTime = timeFormat(new Date(), 'yyyy-mm-dd')
  cpForm.value.user = uni.getStorageSync('userName') || ''

  if (!cpForm.value.user) {
    uni.showToast({ title: '请先登录', icon: 'none', duration: 2000 })
    uni.navigateTo({ url: '/pages/login/login' })
  } else {
    loadLatestData()
    
    // 初始化推送服务
    // #ifdef APP-PLUS
    try {
      await pushService.init()
      console.log('推送服务初始化完成')
    } catch (error) {
      console.error('推送服务初始化失败:', error)
    }
    // #endif
  }
})

// 选择图片并上传
const chooseImage = () => {
  if (uploading.value) return
  
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['camera', 'album'],
    success: (res) => {
      const tempFilePath = res.tempFilePaths[0]
      uploadFile(tempFilePath)
    },
    fail: (err) => {
      console.error('选择图片失败', err)
      uni.showToast({
        title: '选择图片失败',
        icon: 'none'
      })
    }
  })
}

// 刷新数据按钮
const refreshData = () => {
  loadLatestData()
}



// 上传图片
const uploadFile = (filePath) => {
  uploading.value = true
  
  uni.showLoading({
    title: '上传中...',
    mask: true
  })
  
  // 准备表单数据 - 只传userName和type，后台完成所有处理
  const formData = {
    userName: cpForm.value.user,
    type: cpForm.value.type
  }
  
  // 设置超时时间（60秒，给后台足够处理时间）
  const uploadPromise = uploadLotteryImage(filePath, formData)
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('上传超时，请检查网络')), 60000)
  })
  
  Promise.race([uploadPromise, timeoutPromise])
    .then(res => {
      uni.hideLoading() // 上传完成后立即关闭loading

      if (res.code === 200) {
        const resultData = res.data || {}
        const successCount = resultData.successCount || 0
        const failCount = resultData.failCount || 0
        const details = resultData.details || []
        const message = resultData.message || ''

        if (failCount > 0 && successCount === 0) {
          uni.showToast({
            title: message || '上传处理失败',
            icon: 'none',
            duration: 2000
          })
        } else {
          uni.showToast({
            title: '上传成功',
            icon: 'success',
            duration: 2000
          })

          // 如果返回了详情数据，将其转换为当前列表格式并添加
          if (details && details.length > 0) {
            const formattedDetails = details.map(item => {
              const isSSQ = cpForm.value.type === 'ssq'
              const blueCount = isSSQ ? 1 : 2
              const blueBallsArray = item.blueBalls ? item.blueBalls.split(',') : []

              return {
                id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                type: cpForm.value.type,
                redBall: item.redBalls,
                blueBall: item.blueBalls,
                openTime: item.openTime
              }
            })

            // 将新数据添加到列表前面
            latestData.value = [...formattedDetails, ...latestData.value]
          }

          // 上传成功后刷新数据确保一致性
          setTimeout(() => {
            loadLatestData()
          }, 1500)
        }
      } else {
        console.error('服务器返回错误:', res)
        uni.showToast({
          title: res.message || `上传失败(${res.code || '未知错误'})`,
          icon: 'none'
        })
      }
    })
    .catch(err => {
      uni.hideLoading() // 出错时也关闭loading
      console.error('上传失败详情:', err)
      let errormessage = err.message || '上传失败，请稍后再试'
      
      // 提供重试选项
      uni.showModal({
        title: '上传失败',
        content: errormessage + '\n是否重新尝试？',
        showCancel: true,
        cancelText: '取消',
        confirmText: '重试',
        success: (res) => {
          if (res.confirm) {
            // 用户选择重试
            uploadFile(filePath)
          } else {
            uni.showToast({
              title: '已取消上传',
              icon: 'none'
            })
          }
        }
      })
    })
    .finally(() => {
      uploading.value = false
    })
}

onUnmounted(() => {
})
</script>

<style lang="scss" scoped>
/* 基础样式 ------------------------------------------------ */

.section-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}

.upload-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #f0f9ff;
  padding: 8rpx 16rpx;
  border-radius: 30rpx;
  border: 1px solid #d6e8fa;
}

.upload-text {
  font-size: 24rpx;
  color: #1890ff;
  margin-left: 8rpx;
}
.lottery-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #eef2f7 100%);
  padding-bottom: 20rpx;
}
.nav-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 20rpx 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
}
.main-content {
  padding: 30rpx 20rpx;
  max-width: 1200rpx;
  margin: 0 auto;
}

// 玩法选择器样式
.play-mode-section {
  margin-bottom: 30rpx;
  position: relative;
  z-index: 1;
}
.play-mode-header {
  margin-bottom: 16rpx;
}
.play-mode-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #333;
}
.play-mode-tabs {
  display: flex;
  gap: 16rpx;
}
.mode-tab {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20rpx 16rpx;
  background: #f5f7fa;
  border-radius: 16rpx;
  border: 2rpx solid transparent;
  transition: all 0.3s ease;
  &.active {
    background: linear-gradient(135deg, #FF3030 0%, #FF6B6B 100%);
    border-color: #FF3030;
    .mode-text, .mode-desc {
      color: #fff;
    }
  }
}
.mode-text {
  font-size: 28rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 6rpx;
}
.mode-desc {
  font-size: 20rpx;
  color: #999;
}

// 胆码拖码标题样式
.dan-title {
  color: #ff4d4f !important;
}
.tuo-title {
  color: #ffa500 !important;
}
.blue-title {
  &::before {
    background: linear-gradient(to bottom, #1890ff, #40a9ff) !important;
  }
}

.selection-card {
  background: linear-gradient(145deg, #ffffff, #f9fafc);
  border-radius: 28rpx;
  padding: 30rpx 30rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.08),
    0 1rpx 3rpx rgba(0, 0, 0, 0.03);
  border: 1rpx solid rgba(255, 255, 255, 0.8);
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: -10rpx;
    right: -10rpx;
    width: 200rpx;
    height: 200rpx;
    background: linear-gradient(135deg,
        rgba(255, 77, 79, 0.05),
        rgba(24, 144, 255, 0.05));
    border-radius: 50%;
    z-index: 0;
  }
}
.ai-section {
  margin-bottom: 30rpx;
  padding: 0 10rpx;
}

.ball-section {
  margin-bottom: 30rpx;
  &:last-child { margin-bottom: 0; }
}
.section-header {
  margin-bottom: 20rpx;
  .title-wrapper { display: flex; justify-content: space-between; align-items: center; }
  .section-title {
    font-size: 30rpx;
    font-weight: 600;
    color: #1a1a1a;
    position: relative;
    padding-left: 16rpx;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 8rpx;
      height: 32rpx;
      background: linear-gradient(to bottom, #ff4d4f, #ff7875);
      border-radius: 4rpx;
    }
  }
  .ball-count {
    font-size: 24rpx;
    color: #666;
    background: rgba(0, 0, 0, 0.03);
    padding: 4rpx 12rpx;
    border-radius: 16rpx;
  }
}
.ball-grid { display: flex; flex-wrap: wrap; gap: 12rpx; padding: 5rpx 0; }

.date-section { margin: 30rpx 0; }
.date-picker {
  display: flex; justify-content: space-between; align-items: center;
  padding: 28rpx 32rpx;
  background: linear-gradient(145deg, #f8f9fa, #f0f2f5);
  border-radius: 20rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,.04);
  border: 1rpx solid rgba(255,255,255,.8);
  transition: all .3s ease;
  &:active { transform: scale(.98); box-shadow: 0 2rpx 8rpx rgba(0,0,0,.03); }
  .date-label { font-size: 30rpx; color: #333; font-weight: 500; }
  .date-value-wrapper { display: flex; align-items: center; }
  .date-value { font-size: 30rpx; color: #1a1a1a; margin-right: 16rpx; font-weight: 500; }
}

.realtime-selection {
  margin: 25rpx 0;
  padding: 20rpx;
  background: linear-gradient(145deg, #f8f9fa, #f0f2f5);
  border-radius: 20rpx;
  box-shadow: 0 4rpx 16rpx rgba(0,0,0,.04);
  border: 1rpx solid rgba(255,255,255,.8);
  .realtime-header { 
    margin-bottom: 20rpx; 
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .realtime-title {
    font-size: 28rpx; font-weight: 600; color: #1a1a1a;
    position: relative; padding-left: 16rpx;
    &::before {
      content: ''; position: absolute; left: 0; top: 50%; transform: translateY(-50%);
      width: 6rpx; height: 24rpx;
      background: linear-gradient(to bottom,#333,#666);
      border-radius: 3rpx;
    }
  }
  .bet-info {
    background: linear-gradient(135deg, #FF3030 0%, #FF6B6B 100%);
    padding: 8rpx 20rpx;
    border-radius: 20rpx;
  }
  .bet-count {
    font-size: 24rpx;
    color: #fff;
    font-weight: 500;
  }
  .realtime-numbers { display: flex; flex-direction: column; gap: 16rpx; }
  .realtime-group { display: flex; align-items: center; }
  .group-label { font-size: 26rpx; color: #666; margin-right: 16rpx; min-width: 70rpx; }
  .dan-label { color: #ff4d4f !important; font-weight: 600; }
  .tuo-label { color: #ffa500 !important; font-weight: 600; }
  .number-list { display: flex; flex-wrap: wrap; gap: 12rpx; }
  .realtime-number {
    width: 48rpx; height: 48rpx; line-height: 48rpx; text-align: center;
    border-radius: 50%; font-size: 24rpx; font-weight: 600;
    position: relative; overflow: hidden;
    &::after {
      content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 40%;
      background: rgba(255,255,255,.3); border-radius: 48rpx 48rpx 0 0;
    }
    &.red-number { background: linear-gradient(135deg,#ff4d4f,#ff7875); color: #fff; }
    &.blue-number { background: linear-gradient(135deg,#1890ff,#40a9ff); color: #fff; }
    &.dan-ball { 
      box-shadow: 0 0 0 3rpx rgba(255,215,0,0.6);
      &::before {
        content: '胆'; position: absolute; top: -4rpx; right: -4rpx;
        font-size: 16rpx; background: #ffd700; color: #333;
        width: 24rpx; height: 24rpx; line-height: 24rpx;
        border-radius: 50%; z-index: 1;
      }
    }
  }
}

/* loading / empty */

/* 按钮组 ------------------------------------------------ */
.submit-section { margin-top: 30rpx; }
.button-group { display: flex; gap: 20rpx; align-items: center; }

/* 已选号码列表 ------------------------------------------------ */
.selected-numbers-section {
  margin-top: 40rpx;
  padding: 30rpx;
  background: linear-gradient(145deg,#fff,#f9fafc);
  border-radius: 28rpx;
  box-shadow: 0 10rpx 30rpx rgba(0,0,0,.08),
    0 1rpx 3rpx rgba(0,0,0,.03);
  border: 1rpx solid rgba(255,255,255,.8);
}
.selected-numbers-section .section-header {
  margin-bottom: 30rpx;
  padding-bottom: 20rpx;
  border-bottom: 1rpx solid rgba(0,0,0,.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.selected-numbers-section .section-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #1a1a1a;
}
.header-actions {
  display: flex;
  align-items: center;
}

.data-list { display: flex; flex-direction: column; gap: 20rpx; }
.data-item {
  display: flex; justify-content: space-between; align-items: center;
  padding: 24rpx;
  background: linear-gradient(145deg,#f8f9fa,#f0f2f5);
  border-radius: 20rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,.04);
  border: 1rpx solid rgba(255,255,255,.8);
  transition: all .3s ease;
  &:active { transform: scale(.98); }
}
.data-info { flex: 1; }
.data-type { font-size: 28rpx; font-weight: 600; color: #1a1a1a; margin-bottom: 8rpx; }
.data-date { font-size: 24rpx; color: #666; margin-bottom: 12rpx; }
.data-numbers { display: flex; flex-direction: column; gap: 4rpx; }
.red-balls, .blue-balls { font-size: 24rpx; font-weight: 500; }
.red-balls { color: #ff4d4f; }
.blue-balls { color: #1890ff; }
.data-actions { margin-left: 20rpx; }

/* loading / empty */
.loading-text, .empty-text {
  text-align: center;
  color: #666;
  font-size: 28rpx;
  padding: 20rpx 0;
}

/* 推送设置弹窗样式 */
.push-modal {
  background: #fff;
  border-radius: 20rpx 20rpx 0 0;
  padding: 30rpx;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
  padding-bottom: 20rpx;
  border-bottom: 1rpx solid rgba(0, 0, 0, 0.05);
}

.modal-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #1a1a1a;
}
</style>