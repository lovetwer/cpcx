<template>
    <view class="container">
        <view class="settings-card">
            <view class="card-header">
                <text class="title">设置</text>
                <text class="subtitle">应用设置和账户管理</text>
            </view>
            
            <view class="settings-list">
                <view class="settings-item" @click="clearCache">
                    <view class="item-left">
                        <u-icon name="trash" color="#999" size="20"></u-icon>
                        <text class="item-name">清除缓存</text>
                    </view>
                    <view class="item-right">
                        <text class="item-value">{{ cacheSize }}</text>
                        <u-icon name="arrow-right" color="#ccc" size="16"></u-icon>
                    </view>
                </view>
                
                <view class="settings-item" @click="checkUpdate">
                    <view class="item-left">
                        <u-icon name="reload" color="#999" size="20"></u-icon>
                        <text class="item-name">检查更新</text>
                    </view>
                    <view class="item-right">
                        <text class="item-value">当前版本 {{ version }}</text>
                        <u-icon name="arrow-right" color="#ccc" size="16"></u-icon>
                    </view>
                </view>
                
                <view class="settings-item" @click="goToPage('/pages/help/help')">
                    <view class="item-left">
                        <u-icon name="question-circle" color="#999" size="20"></u-icon>
                        <text class="item-name">使用帮助</text>
                    </view>
                    <view class="item-right">
                        <u-icon name="arrow-right" color="#ccc" size="16"></u-icon>
                    </view>
                </view>
                
                <view class="settings-item" @click="goToPage('/pages/share/share')">
                    <view class="item-left">
                        <u-icon name="share" color="#999" size="20"></u-icon>
                        <text class="item-name">分享应用</text>
                    </view>
                    <view class="item-right">
                        <u-icon name="arrow-right" color="#ccc" size="16"></u-icon>
                    </view>
                </view>
            </view>
        </view>
        
        <view class="logout-section">
            <u-button 
                type="primary" 
                @click="logout" 
                :customStyle="logoutButtonStyle"
            >
                退出登录
            </u-button>
        </view>
    </view>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import { logoutButtonStyle } from '@/utils/button-styles.js'
    
    const cacheSize = ref('0KB')
    const version = ref('1.0.0')
    
    onMounted(() => {
        // 获取缓存大小
        getCacheSize()
        // 获取版本号
        getVersion()
    })
    
    const getCacheSize = () => {
        // 模拟获取缓存大小
        cacheSize.value = '2.5MB'
    }
    
    const getVersion = () => {
        // 从manifest或其他方式获取版本号
        const appVersion = uni.getAppBaseInfo?.()?.appVersion
        if (appVersion) {
            version.value = appVersion
        }
    }
    
    const goToPage = (url) => {
        uni.navigateTo({ url })
    }
    
    const clearCache = () => {
        uni.showModal({
            title: '提示',
            content: '确定要清除缓存吗？',
            success: (res) => {
                if (res.confirm) {
                    // 清除缓存逻辑
                    uni.clearStorage()
                    uni.showToast({ title: '缓存已清除', icon: 'success' })
                    cacheSize.value = '0KB'
                }
            }
        })
    }
    
    const checkUpdate = () => {
        uni.showLoading({ title: '检查中...' })
        setTimeout(() => {
            uni.hideLoading()
            uni.showToast({ title: '已是最新版本', icon: 'none' })
        }, 1000)
    }
    
    const logout = () => {
        uni.showModal({
            title: '提示',
            content: '确定要退出登录吗？',
            success: (res) => {
                if (res.confirm) {
                    // 清除登录信息
                    uni.removeStorageSync('token')
                    uni.removeStorageSync('userName')
                    uni.removeStorageSync('userInfo')
                    
                    uni.showToast({ title: '已退出登录', icon: 'success' })
                    
                    // 跳转到登录页
                    setTimeout(() => {
                        uni.reLaunch({
                            url: '/pages/login/login'
                        })
                    }, 1000)
                }
            }
        })
    }
</script>

<style scoped>
    .container {
        min-height: 100vh;
        background: #f5f7fa;
        padding: 20px;
    }

    .settings-card {
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

    .settings-list {
        display: flex;
        flex-direction: column;
    }

    .settings-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 0;
        border-bottom: 1px solid #f5f5f5;
        transition: all 0.2s ease;
    }

    .settings-item:last-child {
        border-bottom: none;
    }

    .settings-item:active {
        opacity: 0.7;
    }

    .item-left {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .item-name {
        font-size: 15px;
        color: #333;
    }

    .item-right {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .item-value {
        font-size: 14px;
        color: #999;
    }

    .logout-section {
        margin-top: 40px;
        padding: 0 20px;
    }
</style>
