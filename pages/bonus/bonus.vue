<template>
    <view class="container">
        <view class="bonus-card">
            <view class="card-header">
                <text class="title">奖金计算</text>
                <text class="subtitle">计算您的中奖金额</text>
            </view>
            
            <view class="form-content">
                <view class="input-group">
                    <view class="input-label">彩票类型</view>
                    <view class="type-tabs">
                        <view 
                            class="type-tab" 
                            :class="{ active: lotteryType === 'ssq' }"
                            @click="lotteryType = 'ssq'"
                        >
                            双色球
                        </view>
                        <view 
                            class="type-tab" 
                            :class="{ active: lotteryType === 'dlt' }"
                            @click="lotteryType = 'dlt'"
                        >
                            大乐透
                        </view>
                    </view>
                </view>
                
                <view class="input-group">
                    <view class="input-label">中奖等级</view>
                    <picker :value="prizeLevel" :range="prizeLevels" @change="onPrizeChange">
                        <view class="picker-value">
                            {{ prizeLevels[prizeLevel] }}
                            <text class="picker-arrow">▼</text>
                        </view>
                    </picker>
                </view>
                
                <view class="input-group">
                    <view class="input-label">注数</view>
                    <u-input 
                        v-model="betCount"
                        type="number"
                        placeholder="请输入注数"
                        :customStyle="inputStyle"
                        :placeholderStyle="placeholderStyle"
                        border="none"
                    ></u-input>
                </view>
                
                <view class="calculate-btn">
                    <u-button type="primary" @click="calculate" :customStyle="saveButtonStyle">
                        计算奖金
                    </u-button>
                </view>
            </view>
        </view>
        
        <!-- 计算结果 -->
        <view class="result-card" v-if="result">
            <view class="result-header">
                <text class="result-title">计算结果</text>
            </view>
            <view class="result-content">
                <view class="result-item">
                    <text class="result-label">中奖等级</text>
                    <text class="result-value">{{ result.level }}</text>
                </view>
                <view class="result-item">
                    <text class="result-label">单注奖金</text>
                    <text class="result-value highlight">{{ result.singlePrize }}</text>
                </view>
                <view class="result-item">
                    <text class="result-label">注数</text>
                    <text class="result-value">{{ result.bets }} 注</text>
                </view>
                <view class="result-item total">
                    <text class="result-label">总奖金</text>
                    <text class="result-value highlight big">{{ result.totalPrize }}</text>
                </view>
            </view>
        </view>
        
        <!-- 奖金规则 -->
        <view class="rules-card">
            <view class="rules-header">
                <text class="rules-title">{{ lotteryType === 'ssq' ? '双色球' : '大乐透' }}奖金规则</text>
            </view>
            <view class="rules-list">
                <view class="rule-item" v-for="(rule, idx) in currentRules" :key="idx">
                    <text class="rule-level">{{ rule.level }}</text>
                    <text class="rule-condition">{{ rule.condition }}</text>
                    <text class="rule-prize">{{ rule.prize }}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
    import { ref, computed } from 'vue'
    import { saveButtonStyle } from '@/utils/button-styles.js'
    
    const lotteryType = ref('ssq')
    const prizeLevel = ref(0)
    const betCount = ref(1)
    const result = ref(null)
    
    const prizeLevels = ['一等奖', '二等奖', '三等奖', '四等奖', '五等奖', '六等奖']
    
    const ssqRules = [
        { level: '一等奖', condition: '6红+1蓝', prize: '500万-1000万' },
        { level: '二等奖', condition: '6红', prize: '100万-500万' },
        { level: '三等奖', condition: '5红+1蓝', prize: '3000元' },
        { level: '四等奖', condition: '5红/4红+1蓝', prize: '200元' },
        { level: '五等奖', condition: '4红/3红+1蓝', prize: '10元' },
        { level: '六等奖', condition: '3红/1蓝', prize: '5元' }
    ]
    
    const dltRules = [
        { level: '一等奖', condition: '5红+2蓝', prize: '500万-1000万' },
        { level: '二等奖', condition: '5红+1蓝', prize: '10万-100万' },
        { level: '三等奖', condition: '5红', prize: '10000元' },
        { level: '四等奖', condition: '4红+2蓝', prize: '3000元' },
        { level: '五等奖', condition: '4红+1蓝/3红+2蓝', prize: '300元' },
        { level: '六等奖', condition: '4红/3红+1蓝/2红+2蓝', prize: '200元' }
    ]
    
    const currentRules = computed(() => lotteryType.value === 'ssq' ? ssqRules : dltRules)
    
    const inputStyle = {
        background: '#f8f9fa',
        borderRadius: '12px',
        padding: '16px 20px',
        height: '48px',
        marginTop: '8px'
    }
    
    const placeholderStyle = { color: '#999' }
    
    const onPrizeChange = (e) => {
        prizeLevel.value = e.detail.value
    }
    
    const calculate = () => {
        const prizes = lotteryType.value === 'ssq' 
            ? [5000000, 100000, 3000, 200, 10, 5]
            : [5000000, 100000, 10000, 3000, 300, 200]
        
        const singlePrize = prizes[prizeLevel.value]
        const bets = parseInt(betCount.value) || 1
        const total = singlePrize * bets
        
        result.value = {
            level: prizeLevels[prizeLevel.value],
            singlePrize: formatMoney(singlePrize),
            bets: bets,
            totalPrize: formatMoney(total)
        }
    }
    
    const formatMoney = (num) => {
        if (num >= 10000) {
            return (num / 10000).toFixed(1) + '万元'
        }
        return num.toLocaleString() + '元'
    }
</script>

<style scoped>
    .container {
        min-height: 100vh;
        background: #f5f7fa;
        padding: 20px;
    }

    .bonus-card, .result-card, .rules-card {
        background: #fff;
        border-radius: 20px;
        padding: 24px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
        margin-bottom: 20px;
    }

    .card-header, .result-header, .rules-header {
        margin-bottom: 20px;
    }

    .title, .result-title, .rules-title {
        font-size: 20px;
        font-weight: 600;
        color: #333;
        display: block;
        margin-bottom: 4px;
    }

    .subtitle {
        font-size: 14px;
        color: #666;
    }

    .input-group {
        margin-bottom: 20px;
    }

    .input-label {
        font-size: 14px;
        color: #333;
        font-weight: 500;
        margin-bottom: 8px;
    }

    .type-tabs {
        display: flex;
        gap: 12px;
    }

    .type-tab {
        flex: 1;
        padding: 12px;
        text-align: center;
        background: #f5f7fa;
        border-radius: 10px;
        font-size: 15px;
        color: #666;
        transition: all 0.3s;
    }

    .type-tab.active {
        background: linear-gradient(135deg, #FF3030 0%, #FF6B6B 100%);
        color: #fff;
    }

    .picker-value {
        background: #f8f9fa;
        border-radius: 12px;
        padding: 16px 20px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 15px;
        color: #333;
    }

    .picker-arrow {
        font-size: 12px;
        color: #999;
    }

    .calculate-btn {
        margin-top: 24px;
    }

    .result-content {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .result-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
        background: #f8f9fa;
        border-radius: 10px;
    }

    .result-item.total {
        background: linear-gradient(135deg, #FF3030 0%, #FF6B6B 100%);
    }

    .result-item.total .result-label,
    .result-item.total .result-value {
        color: #fff;
    }

    .result-label {
        font-size: 14px;
        color: #666;
    }

    .result-value {
        font-size: 15px;
        color: #333;
        font-weight: 500;
    }

    .result-value.highlight {
        color: #ff4d4f;
    }

    .result-value.big {
        font-size: 20px;
        font-weight: 700;
    }

    .rules-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .rule-item {
        display: flex;
        align-items: center;
        padding: 12px;
        background: #f8f9fa;
        border-radius: 8px;
    }

    .rule-level {
        width: 60px;
        font-size: 13px;
        font-weight: 600;
        color: #FF3030;
    }

    .rule-condition {
        flex: 1;
        font-size: 13px;
        color: #666;
    }

    .rule-prize {
        font-size: 13px;
        color: #ff4d4f;
        font-weight: 500;
    }
</style>
