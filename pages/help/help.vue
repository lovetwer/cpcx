<template>
    <view class="container">
        <view class="help-card">
            <view class="card-header">
                <text class="title">使用帮助</text>
                <text class="subtitle">了解如何使用各项功能</text>
            </view>
            
            <view class="help-list">
                <view class="help-section">
                    <view class="section-title">
                        <u-icon name="home" color="#FF3030" size="20"></u-icon>
                        <text>首页选号</text>
                    </view>
                    <view class="section-content">
                        <text class="help-text">1. 选择彩票类型：双色球或大乐透</text>
                        <text class="help-text">2. 选择玩法：单式、复式或胆拖</text>
                        <text class="help-text">3. 单式：红球选6个，蓝球选1个（双色球）</text>
                        <text class="help-text">4. 复式：红球至少6个，蓝球至少1个</text>
                        <text class="help-text">5. 胆拖：红球选胆码+拖码，蓝球普通选择</text>
                        <text class="help-text">6. 点击"AI智能选号"可自动推荐号码</text>
                    </view>
                </view>
                
                <view class="help-section">
                    <view class="section-title">
                        <u-icon name="checkmark-circle" color="#52c41a" size="20"></u-icon>
                        <text>手动验奖</text>
                    </view>
                    <view class="section-content">
                        <text class="help-text">1. 输入您购买的彩票号码</text>
                        <text class="help-text">2. 选择对应的彩票类型和玩法</text>
                        <text class="help-text">3. 点击"开始验奖"查看中奖结果</text>
                        <text class="help-text">4. 系统会自动匹配最新开奖号码</text>
                    </view>
                </view>
                
                <view class="help-section">
                    <view class="section-title">
                        <u-icon name="search" color="#4facfe" size="20"></u-icon>
                        <text>开奖查询</text>
                    </view>
                    <view class="section-content">
                        <text class="help-text">1. 查看最新一期开奖号码</text>
                        <text class="help-text">2. 浏览历史开奖记录</text>
                        <text class="help-text">3. 支持双色球和大乐透切换</text>
                    </view>
                </view>
                
                <view class="help-section">
                    <view class="section-title">
                        <u-icon name="rmb-circle" color="#f5576c" size="20"></u-icon>
                        <text>奖金计算</text>
                    </view>
                    <view class="section-content">
                        <text class="help-text">1. 选择中奖等级</text>
                        <text class="help-text">2. 输入中奖注数</text>
                        <text class="help-text">3. 查看奖金计算结果</text>
                        <text class="help-text">4. 了解各等级中奖条件</text>
                    </view>
                </view>
                
                <view class="help-section">
                    <view class="section-title">
                        <u-icon name="bell" color="#faad14" size="20"></u-icon>
                        <text>邮件通知</text>
                    </view>
                    <view class="section-content">
                        <text class="help-text">1. 在"我的"页面设置邮箱</text>
                        <text class="help-text">2. 点击"测试"验证邮箱可用</text>
                        <text class="help-text">3. 点击"保存"保存邮箱设置</text>
                        <text class="help-text">4. 中奖后系统会自动发送邮件通知</text>
                    </view>
                </view>
                
                <view class="help-section">
                    <view class="section-title">
                        <u-icon name="share" color="#722ed1" size="20"></u-icon>
                        <text>分享功能</text>
                    </view>
                    <view class="section-content">
                        <text class="help-text">1. 在首页点击分享按钮</text>
                        <text class="help-text">2. 复制分享链接给朋友</text>
                        <text class="help-text">3. 朋友可通过链接查看您的选号</text>
                    </view>
                </view>
            </view>
        </view>
        
        <view class="tips-card">
            <view class="tips-header">
                <u-icon name="info-circle" color="#1890ff" size="18"></u-icon>
                <text class="tips-title">温馨提示</text>
            </view>
            <view class="tips-content">
                <text class="tips-text">• 请确保填写的邮箱地址正确，以便接收中奖通知</text>
                <text class="tips-text">• 彩票有风险，投注需谨慎</text>
                <text class="tips-text">• 本应用仅供娱乐，不构成投注建议</text>
            </view>
        </view>
    </view>
</template>

<script setup>
    // 帮助页面无需特殊逻辑
</script>

<style scoped>
    .container {
        min-height: 100vh;
        background: #f5f7fa;
        padding: 20px;
    }

    .help-card, .tips-card {
        background: #fff;
        border-radius: 20px;
        padding: 24px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
        margin-bottom: 20px;
    }

    .card-header {
        margin-bottom: 20px;
    }

    .title {
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

    .help-list {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .help-section {
        background: #f8f9fa;
        border-radius: 12px;
        padding: 16px;
    }

    .section-title {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 12px;
        font-size: 16px;
        font-weight: 600;
        color: #333;
    }

    .section-content {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding-left: 28px;
    }

    .help-text {
        font-size: 14px;
        color: #666;
        line-height: 1.6;
    }

    .tips-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 12px;
    }

    .tips-title {
        font-size: 16px;
        font-weight: 600;
        color: #333;
    }

    .tips-content {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .tips-text {
        font-size: 14px;
        color: #666;
        line-height: 1.6;
    }
</style>
