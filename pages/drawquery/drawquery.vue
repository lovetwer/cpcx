<template>
    <view class="container">
        <view class="query-card">
            <view class="card-header">
                <text class="title">开奖查询</text>
                <text class="subtitle">查看历史开奖记录</text>
            </view>
            
            <view class="form-content">
                <view class="input-group">
                    <view class="input-label">彩票类型</view>
                    <view class="type-tabs">
                        <view 
                            class="type-tab" 
                            :class="{ active: lotteryType === 'ssq' }"
                            @click="changeType('ssq')"
                        >
                            双色球
                        </view>
                        <view 
                            class="type-tab" 
                            :class="{ active: lotteryType === 'dlt' }"
                            @click="changeType('dlt')"
                        >
                            大乐透
                        </view>
                    </view>
                </view>
            </view>
        </view>
        
        <!-- 最新开奖 -->
        <view class="latest-card" v-if="latestDraw">
            <view class="latest-header">
                <text class="latest-title">最新开奖</text>
                <text class="latest-date">{{ latestDraw.openTime }}</text>
            </view>
            <view class="latest-content">
                <view class="ball-section">
                    <text class="ball-label">红球</text>
                    <view class="balls">
                        <text class="ball red" v-for="(ball, idx) in latestDraw.redBalls" :key="idx">{{ ball }}</text>
                    </view>
                </view>
                <view class="ball-section">
                    <text class="ball-label">蓝球</text>
                    <view class="balls">
                        <text class="ball blue" v-for="(ball, idx) in latestDraw.blueBalls" :key="idx">{{ ball }}</text>
                    </view>
                </view>
            </view>
        </view>
        
        <!-- 历史记录 -->
        <view class="history-card">
            <view class="history-header">
                <text class="history-title">历史开奖</text>
            </view>
            
            <view class="history-list" v-if="historyList.length">
                <view class="history-item" v-for="(item, idx) in historyList" :key="idx">
                    <view class="item-header">
                        <text class="item-period" v-if="item.lotteryNo">第{{ item.lotteryNo }}期</text>
                        <text class="item-date">{{ item.openTime }}</text>
                    </view>
                    <view class="item-balls">
                        <text class="ball red small" v-for="(ball, i) in item.redBalls" :key="i">{{ ball }}</text>
                        <text class="ball blue small" v-for="(ball, i) in item.blueBalls" :key="i">{{ ball }}</text>
                    </view>
                </view>
            </view>
            
            <view class="empty" v-else>
                <text class="empty-text">暂无开奖记录</text>
            </view>
        </view>
    </view>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import { checkPrize, getLotteryHistory } from '@/http/api.js'
    
    const lotteryType = ref('ssq')
    const latestDraw = ref(null)
    const historyList = ref([])
    const loading = ref(false)
    
    const changeType = (type) => {
        lotteryType.value = type
        loadData()
    }
    
    const loadData = async () => {
        loading.value = true
        try {
            // 并行获取最新开奖和历史数据
            const [prizeRes, historyRes] = await Promise.all([
                checkPrize(),
                getLotteryHistory(lotteryType.value)
            ])
            
            // 处理最新开奖数据
            if (prizeRes.code === 200 && prizeRes.data) {
                const data = lotteryType.value === 'ssq' ? prizeRes.data.ssq : prizeRes.data.dlt
                if (data) {
                    latestDraw.value = {
                        openTime: data.openTime || '',
                        redBalls: data.redBall ? data.redBall.split(',') : [],
                        blueBalls: data.blueBall ? data.blueBall.split(',') : []
                    }
                }
            }
            
            // 处理历史数据
            if (historyRes.code === 200 && historyRes.data) {
                const historyData = Array.isArray(historyRes.data) ? historyRes.data : []
                historyList.value = historyData.map(item => ({
                    openTime: item.openTime || '',
                    lotteryNo: item.lotteryNo || '',
                    redBalls: item.redBall ? item.redBall.split(',') : [],
                    blueBalls: item.blueBall ? item.blueBall.split(',') : []
                }))
            } else {
                historyList.value = []
            }
        } catch (err) {
            console.error('获取开奖数据失败:', err)
        } finally {
            loading.value = false
        }
    }
    
    onMounted(() => {
        loadData()
    })
</script>

<style scoped>
    .container {
        min-height: 100vh;
        background: #f5f7fa;
        padding: 20px;
    }

    .query-card, .latest-card, .history-card {
        background: #fff;
        border-radius: 20px;
        padding: 24px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
        margin-bottom: 20px;
    }

    .card-header, .latest-header, .history-header {
        margin-bottom: 20px;
    }

    .title, .latest-title, .history-title {
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
        margin-bottom: 16px;
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

    .latest-date {
        font-size: 14px;
        color: #999;
    }

    .latest-content {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .ball-section {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .ball-label {
        font-size: 14px;
        color: #666;
        width: 50px;
    }

    .balls {
        display: flex;
        gap: 4px;
        flex-wrap: nowrap;
    }

    .ball {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: 600;
        color: #fff;
        flex-shrink: 0;
    }

    .ball.red {
        background: linear-gradient(135deg, #ff4d4f, #ff7875);
    }

    .ball.blue {
        background: linear-gradient(135deg, #1890ff, #40a9ff);
    }

    .ball.small {
        width: 24px;
        height: 24px;
        font-size: 11px;
    }

    .history-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .history-item {
        padding: 16px;
        background: #f8f9fa;
        border-radius: 12px;
    }

    .item-header {
        margin-bottom: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .item-period {
        font-size: 14px;
        color: #333;
        font-weight: 500;
    }

    .item-date {
        font-size: 13px;
        color: #999;
    }

    .item-balls {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
    }

    .empty {
        padding: 40px;
        text-align: center;
    }

    .empty-text {
        font-size: 14px;
        color: #999;
    }
</style>
