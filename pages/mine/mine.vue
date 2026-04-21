<template>
    <view class="container">
        <!-- 个人信息卡片 -->
        <view class="profile-card">
            <view class="avatar-section">
                <view class="avatar">
                    <text class="avatar-text">{{ avatarText }}</text>
                </view>
                <view class="user-info">
                    <text class="user-name">{{ user.userName || '用户' }}</text>
                    <text class="user-email">{{ user.email || '未设置邮箱' }}</text>
                </view>
            </view>
        </view>
        
        <!-- 通知设置卡片 -->
        <view class="email-card">
            <view class="card-header">
                <text class="title">通知设置</text>
                <u-button 
                    size="small"
                    :customStyle="saveButtonStyle"
                    :loading="savingEmail"
                    @click="saveEmail"
                >
                    保存
                </u-button>
            </view>
            <view class="email-form">
                <u-input 
                    v-model="user.email"
                    placeholder="请输入邮箱地址"
                    prefixIcon="email"
                    :customStyle="inputStyle"
                    border="none"
                ></u-input>
                <u-button 
                    size="small"
                    :customStyle="testButtonStyle"
                    :loading="testingEmail"
                    @click="testSendEmail"
                >
                    测试
                </u-button>
            </view>
        </view>
        
        <!-- 功能卡片 -->
        <view class="feature-card">
            <view class="card-header">
                <text class="title">更多功能</text>
            </view>
            
            <view class="feature-grid">
                <view class="feature-item" @click="goToPage('/pages/password/password')">
                    <view class="feature-icon">
                        <u-icon name="lock" color="#FF3030" size="24"></u-icon>
                    </view>
                    <text class="feature-name">修改密码</text>
                </view>
                
                <view class="feature-item" @click="goToPage('/pages/bonus/bonus')">
                    <view class="feature-icon">
                        <u-icon name="rmb-circle" color="#f5576c" size="24"></u-icon>
                    </view>
                    <text class="feature-name">奖金计算</text>
                </view>
                
                <view class="feature-item" @click="goToPage('/pages/drawquery/drawquery')">
                    <view class="feature-icon">
                        <u-icon name="search" color="#4facfe" size="24"></u-icon>
                    </view>
                    <text class="feature-name">开奖查询</text>
                </view>
                
                <view class="feature-item" @click="goToPage('/pages/verify/verify')">
                    <view class="feature-icon">
                        <u-icon name="checkmark-circle" color="#52c41a" size="24"></u-icon>
                    </view>
                    <text class="feature-name">手动验奖</text>
                </view>
                
                <view class="feature-item" @click="goToPage('/pages/settings/settings')">
                    <view class="feature-icon">
                        <u-icon name="setting" color="#666" size="24"></u-icon>
                    </view>
                    <text class="feature-name">设置</text>
                </view>
                
                <!-- H5环境下显示下载APP -->
                <view class="feature-item" v-if="isH5" @click="downloadApp">
                    <view class="feature-icon">
                        <u-icon name="download" color="#1890ff" size="24"></u-icon>
                    </view>
                    <text class="feature-name">下载APP</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
    import { ref, computed } from 'vue'
    import { getUserInfo, updateUserInfo, testSendEmail as sendTestEmail } from '@/http/api.js'
    import { onLoad } from '@dcloudio/uni-app'
    
    const user = ref({
        id: null,
        userName: uni.getStorageSync('userName'),
        email: null
    })
    
    const avatarText = computed(() => {
        const name = user.value.userName || '用'
        return name.charAt(0).toUpperCase()
    })
    
    const inputStyle = {
        background: '#f8f9fa',
        borderRadius: '10px',
        padding: '12px 14px',
        height: '40px',
        fontSize: '14px'
    }
    
    const testButtonStyle = {
        width: '60px',
        height: '32px',
        fontSize: '13px',
        background: '#fff',
        color: '#fa8c16',
        borderRadius: '6px',
        border: 'none'
    }
    
    const saveButtonStyle = {
        width: '60px',
        height: '32px',
        fontSize: '13px',
        background: 'linear-gradient(135deg, #FF3030 0%, #FF6B6B 100%)',
        color: '#fff',
        borderRadius: '6px',
        border: 'none',
        margin: '0'
    }
    
    const testingEmail = ref(false)
    const savingEmail = ref(false)
    
    const testSendEmail = async () => {
        if (!user.value.email || user.value.email.trim() === '') {
            uni.showToast({ title: '请先填写邮箱', icon: 'none' })
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(user.value.email)) {
            uni.showToast({ title: '请输入有效的邮箱地址', icon: 'none' })
            return
        }

        testingEmail.value = true
        uni.showLoading({ title: '发送中...' })

        try {
            const res = await sendTestEmail(user.value.email)
            uni.hideLoading()

            if (res.code === 200) {
                uni.showToast({ title: res.message || '邮件发送成功', icon: 'success' })
            } else {
                uni.showToast({ title: res.message || '邮件发送失败', icon: 'none' })
            }
        } catch (err) {
            uni.hideLoading()
            console.error('测试邮件发送失败:', err)
            uni.showToast({ title: '发送失败，请检查网络', icon: 'none' })
        } finally {
            testingEmail.value = false
        }
    }
    
    const saveEmail = async () => {
        if (!user.value.email || user.value.email.trim() === '') {
            uni.showToast({ title: '请输入邮箱地址', icon: 'none' })
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(user.value.email)) {
            uni.showToast({ title: '请输入有效的邮箱地址', icon: 'none' })
            return
        }

        savingEmail.value = true
        uni.showLoading({ title: '保存中...' })

        try {
            const updateData = {
                id: Number(user.value.id),
                userName: user.value.userName,
                email: user.value.email
            }
            
            const res = await updateUserInfo(user.value.userName, updateData)
            uni.hideLoading()

            if (res.code === 200 || res.code === 20000) {
                uni.showToast({ title: '保存成功', icon: 'success' })
                uni.setStorageSync('email', user.value.email)
            } else {
                uni.showToast({ title: res.message || '保存失败', icon: 'none' })
            }
        } catch (err) {
            uni.hideLoading()
            console.error('保存邮箱失败:', err)
            uni.showToast({ title: '网络错误，请重试', icon: 'none' })
        } finally {
            savingEmail.value = false
        }
    }
    
    const goToPage = (url) => {
        uni.navigateTo({ url })
    }
    
    // 判断是否为H5环境
    const isH5 = ref(false)
    
    // 下载APP
    const downloadApp = () => {
        const apkUrl = 'https://jyqwwftobbtmiccsccjd.supabase.co/storage/v1/object/public/apk/cpcxapp.apk'
        // #ifdef H5
        window.location.href = apkUrl
        // #endif
        // #ifndef H5
        uni.showToast({ title: '请在浏览器中打开下载', icon: 'none' })
        // #endif
    }
    
    onLoad(() => {
        // #ifdef H5
        isH5.value = true
        // #endif
        getUserInfo(user.value.userName).then(res => {
            if (res.code === 200 && res.data && res.data.user) {
                user.value = { ...user.value, ...res.data.user }
            } else if (res.code === 20000 && res.data) {
                user.value = { ...user.value, ...res.data }
            }
        }).catch(err => {
            console.error('获取用户信息失败:', err)
        })
    })
</script>

<style scoped>
    .container {
        min-height: 100vh;
        background: #f5f7fa;
        padding: 20px;
    }

    .profile-card {
        background: transparent;
        padding: 0;
        margin-bottom: 20px;
    }

    .avatar-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 30px 0;
    }

    .avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: linear-gradient(135deg, #e0e0e0 0%, #c0c0c0 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 16px;
    }

    .avatar-text {
        font-size: 32px;
        font-weight: 600;
        color: #666;
    }

    .user-info {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .user-name {
        font-size: 20px;
        font-weight: 600;
        color: #333;
        margin-bottom: 6px;
    }

    .user-email {
        font-size: 14px;
        color: #999;
    }

    .email-card {
        background: #fff;
        border-radius: 16px;
        padding: 16px 20px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
        margin-top: 16px;
    }

    .email-card .card-header {
        margin-bottom: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .email-card .title {
        font-size: 16px;
    }

    .header-actions {
        display: flex;
        align-items: center;
    }

    .email-form {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
    }

    .email-form .u-input {
        flex: 1;
    }

    .feature-card {
        background: #fff;
        border-radius: 20px;
        padding: 20px 24px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
        margin-top: 16px;
    }

    .card-header {
        margin-bottom: 16px;
    }

    .title {
        font-size: 18px;
        font-weight: 600;
        color: #333;
    }

    .feature-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
    }

    .feature-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 16px 0;
        background: transparent;
        transition: all 0.2s ease;
    }

    .feature-item:active {
        opacity: 0.7;
    }

    .feature-icon {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: #f8f9fa;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 8px;
    }

    .feature-name {
        font-size: 12px;
        color: #333;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
    }

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
