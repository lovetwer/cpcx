<template>
    <view class="container">
        <view class="verify-card">
            <view class="card-header">
                <text class="title">手动验奖</text>
                <text class="subtitle">输入号码验证中奖情况</text>
            </view>
            
            <view class="form-content">
                <view class="input-group">
                    <view class="input-label">彩票类型</view>
                    <view class="type-tabs">
                        <view 
                            class="type-tab" 
                            :class="{ active: formData.type === 'ssq' }"
                            @click="formData.type = 'ssq'"
                        >
                            双色球
                        </view>
                        <view 
                            class="type-tab" 
                            :class="{ active: formData.type === 'dlt' }"
                            @click="formData.type = 'dlt'"
                        >
                            大乐透
                        </view>
                    </view>
                </view>
                
                <view class="input-group">
                    <view class="input-label">投注类型</view>
                    <view class="type-tabs">
                        <view 
                            class="type-tab small" 
                            :class="{ active: formData.betType === 'single' }"
                            @click="formData.betType = 'single'"
                        >
                            单式
                        </view>
                        <view 
                            class="type-tab small" 
                            :class="{ active: formData.betType === 'complex' }"
                            @click="formData.betType = 'complex'"
                        >
                            复式
                        </view>
                        <view 
                            class="type-tab small" 
                            :class="{ active: formData.betType === 'dantuo' }"
                            @click="formData.betType = 'dantuo'"
                        >
                            胆拖
                        </view>
                    </view>
                </view>
                
                <!-- 单式/复式模式 -->
                <template v-if="formData.betType !== 'dantuo'">
                    <view class="input-group">
                        <view class="input-label">红球号码</view>
                        <u-input 
                            v-model="formData.redBall"
                            :placeholder="redPlaceholder"
                            :customStyle="inputStyle"
                            border="none"
                        ></u-input>
                        <text class="input-tip">{{ redTip }}，例如：01,02,03,04,05,06</text>
                    </view>
                    
                    <view class="input-group">
                        <view class="input-label">蓝球号码</view>
                        <u-input 
                            v-model="formData.blueBall"
                            :placeholder="bluePlaceholder"
                            :customStyle="inputStyle"
                            border="none"
                        ></u-input>
                        <text class="input-tip">{{ blueTip }}，例如：{{ formData.type === 'ssq' ? '01' : '01,02' }}</text>
                    </view>
                </template>
                
                <!-- 胆拖模式 -->
                <template v-else>
                    <view class="input-group">
                        <view class="input-label">红球胆码</view>
                        <u-input 
                            v-model="formData.danRedBall"
                            placeholder="请输入红球胆码"
                            :customStyle="inputStyle"
                            border="none"
                        ></u-input>
                        <text class="input-tip">胆码必中，例如：01,02</text>
                    </view>
                    
                    <view class="input-group">
                        <view class="input-label">红球拖码</view>
                        <u-input 
                            v-model="formData.tuoRedBall"
                            placeholder="请输入红球拖码"
                            :customStyle="inputStyle"
                            border="none"
                        ></u-input>
                        <text class="input-tip">拖码组合，例如：03,04,05,06,07</text>
                    </view>
                    
                    <view class="input-group">
                        <view class="input-label">蓝球号码</view>
                        <u-input 
                            v-model="formData.blueBall"
                            :placeholder="bluePlaceholder"
                            :customStyle="inputStyle"
                            border="none"
                        ></u-input>
                        <text class="input-tip">{{ blueTip }}，例如：{{ formData.type === 'ssq' ? '01' : '01,02' }}</text>
                    </view>
                </template>
                
                <view class="verify-btn">
                    <u-button type="primary" @click="verify" :customStyle="buttonStyle" :loading="loading">
                        开始验奖
                    </u-button>
                </view>
            </view>
        </view>
        
        <!-- 验奖结果 -->
        <view class="result-card" v-if="result">
            <view class="result-header">
                <text class="result-title">验奖结果</text>
            </view>
            <view class="result-content">
                <view class="result-item" :class="{ win: result.totalPrizeAmount > 0 }">
                    <text class="result-label">中奖状态</text>
                    <text class="result-value">{{ result.totalPrizeAmount > 0 ? '恭喜中奖！' : '未中奖' }}</text>
                </view>
                <view class="result-item" v-if="result.bestPrize">
                    <text class="result-label">最高奖项</text>
                    <text class="result-value highlight">{{ getPrizeLevelText(result.bestPrize) }}</text>
                </view>
                <view class="result-item" v-if="result.totalPrizeAmount > 0">
                    <text class="result-label">奖金金额</text>
                    <text class="result-value highlight big">{{ result.totalPrizeAmount }}元</text>
                </view>
                <view class="result-item" v-if="result.totalBets">
                    <text class="result-label">总注数</text>
                    <text class="result-value">{{ result.totalBets }}注</text>
                </view>
                <view class="result-detail" v-if="result.winningCombinations && result.winningCombinations.length > 0">
                    <text class="detail-title">中奖组合</text>
                    <view class="combination-list">
                        <view class="combination-item" v-for="(item, idx) in result.winningCombinations" :key="idx">
                            <view class="ball-row">
                                <text class="ball-label">红球：</text>
                                <text class="ball-text red">{{ item.redBallStr }}</text>
                            </view>
                            <view class="ball-row">
                                <text class="ball-label">蓝球：</text>
                                <text class="ball-text blue">{{ item.blueBallStr }}</text>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="result-detail" v-if="result.lotteryData">
                    <text class="detail-title">开奖信息</text>
                    <view class="lottery-info">
                        <text class="info-text">期号：{{ result.lotteryData.lotteryNo }}</text>
                        <text class="info-text">开奖日期：{{ result.lotteryData.openTime }}</text>
                        <view class="ball-row">
                            <text class="ball-label">开奖红球：</text>
                            <text class="ball-text red">{{ result.lotteryData.redBall }}</text>
                        </view>
                        <view class="ball-row">
                            <text class="ball-label">开奖蓝球：</text>
                            <text class="ball-text blue">{{ result.lotteryData.blueBall }}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
    import { ref, computed, reactive } from 'vue'
    import { checkSinglePrize } from '@/http/api.js'
    
    const loading = ref(false)
    const result = ref(null)
    
    const formData = reactive({
        type: 'ssq',
        betType: 'single',
        redBall: '',
        blueBall: '',
        danRedBall: '',
        tuoRedBall: '',
        danBlueBall: '',
        tuoBlueBall: ''
    })
    
    const inputStyle = {
        background: '#f8f9fa',
        borderRadius: '12px',
        padding: '14px 16px',
        height: '44px'
    }
    
    const buttonStyle = {
        background: 'linear-gradient(135deg, #FF3030 0%, #FF6B6B 100%)',
        borderRadius: '12px',
        height: '48px',
        border: 'none'
    }
    
    const redPlaceholder = computed(() => {
        if (formData.betType === 'single') {
            return formData.type === 'ssq' ? '请输入6个红球，用逗号分隔' : '请输入5个红球，用逗号分隔'
        }
        return '请输入红球号码，用逗号分隔'
    })
    
    const bluePlaceholder = computed(() => {
        if (formData.betType === 'single') {
            return formData.type === 'ssq' ? '请输入1个蓝球' : '请输入2个蓝球，用逗号分隔'
        }
        return '请输入蓝球号码，用逗号分隔'
    })
    
    const redTip = computed(() => {
        if (formData.type === 'ssq') {
            return formData.betType === 'single' ? '红球范围：01-33，选择6个' : '红球范围：01-33，至少选择6个'
        }
        return formData.betType === 'single' ? '红球范围：01-35，选择5个' : '红球范围：01-35，至少选择5个'
    })
    
    const blueTip = computed(() => {
        if (formData.type === 'ssq') {
            return formData.betType === 'single' ? '蓝球范围：01-16，选择1个' : '蓝球范围：01-16，至少选择1个'
        }
        return formData.betType === 'single' ? '蓝球范围：01-12，选择2个' : '蓝球范围：01-12，至少选择2个'
    })
    
    const getPrizeLevelText = (level) => {
        const levels = {
            1: '一等奖',
            2: '二等奖',
            3: '三等奖',
            4: '四等奖',
            5: '五等奖',
            6: '六等奖'
        }
        return levels[level] || `${level}等奖`
    }
    
    const verify = async () => {
        // 验证输入
        if (formData.betType !== 'dantuo') {
            if (!formData.redBall) {
                uni.showToast({ title: '请输入红球号码', icon: 'none' })
                return
            }
            if (!formData.blueBall) {
                uni.showToast({ title: '请输入蓝球号码', icon: 'none' })
                return
            }
        } else {
            if (!formData.danRedBall && !formData.tuoRedBall) {
                uni.showToast({ title: '请输入红球胆码或拖码', icon: 'none' })
                return
            }
            if (!formData.blueBall) {
                uni.showToast({ title: '请输入蓝球号码', icon: 'none' })
                return
            }
        }
        
        loading.value = true
        
        try {
            const params = {
                type: formData.type,
                betType: formData.betType
            }
            
            if (formData.betType === 'dantuo') {
                params.danRedBall = formData.danRedBall
                params.tuoRedBall = formData.tuoRedBall
                params.blueBall = formData.blueBall
            } else {
                params.redBall = formData.redBall
                params.blueBall = formData.blueBall
            }
            
            const res = await checkSinglePrize(params)
            
            if (res.code === 200 || res.code === 20000) {
                result.value = res.data || {}
            } else {
                uni.showToast({ title: res.message || '验奖失败', icon: 'none' })
            }
        } catch (err) {
            console.error('验奖失败:', err)
            uni.showToast({ title: '网络错误，请重试', icon: 'none' })
        } finally {
            loading.value = false
        }
    }
</script>

<style scoped>
    .container {
        min-height: 100vh;
        background: #f5f7fa;
        padding: 20px;
    }

    .verify-card, .result-card {
        background: #fff;
        border-radius: 20px;
        padding: 24px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
        margin-bottom: 20px;
    }

    .card-header, .result-header {
        margin-bottom: 20px;
    }

    .title, .result-title {
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

    .input-tip {
        font-size: 12px;
        color: #999;
        margin-top: 6px;
    }

    .type-tabs {
        display: flex;
        gap: 10px;
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

    .type-tab.small {
        padding: 10px;
        font-size: 14px;
    }

    .type-tab.active {
        background: linear-gradient(135deg, #FF3030 0%, #FF6B6B 100%);
        color: #fff;
    }

    .verify-btn {
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

    .result-item.win {
        background: linear-gradient(135deg, rgba(82, 196, 26, 0.1) 0%, rgba(82, 196, 26, 0.05) 100%);
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

    .result-detail {
        padding: 16px;
        background: #f8f9fa;
        border-radius: 10px;
    }

    .detail-title {
        font-size: 14px;
        color: #333;
        font-weight: 500;
        margin-bottom: 12px;
    }

    .match-info {
        display: flex;
        gap: 20px;
    }

    .match-text {
        font-size: 13px;
        color: #666;
    }

    .combination-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .combination-item {
        padding: 12px;
        background: #fff;
        border-radius: 8px;
    }

    .ball-row {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
    }

    .ball-row:last-child {
        margin-bottom: 0;
    }

    .ball-label {
        font-size: 13px;
        color: #666;
        width: 60px;
    }

    .ball-text {
        font-size: 14px;
        font-weight: 500;
    }

    .ball-text.red {
        color: #ff4d4f;
    }

    .ball-text.blue {
        color: #1890ff;
    }

    .lottery-info {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .info-text {
        font-size: 13px;
        color: #666;
    }
</style>
