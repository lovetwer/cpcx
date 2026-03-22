<template>
    <view class="container">
        <view class="profile-card">
            <view class="card-header">
                <view class="header-content">
                    <view>
                        <text class="title">个人信息</text>
                        <text class="subtitle">更新您的个人资料</text>
                    </view>
                    <u-icon 
                        name="setting" 
                        color="#828282" 
                        size="28" 
                        @click="goToSettings"
                        class="settings-icon"
                    ></u-icon>
                </view>
            </view>
            
            <view class="form-content">
                <view class="input-group">
                    <view class="input-label">用户名</view>
                    <u-input 
                        v-model="user.userName"
                        prefixIcon="account"
                        :customStyle="inputStyle"
                        :placeholderStyle="placeholderStyle"
                        border="none"
                    ></u-input>
                </view>
                
                <view class="input-group">
                    <view class="input-label">邮箱</view>
                    <view class="email-input-wrapper">
                        <u-input 
                            v-model="user.email"
                            placeholder="请填写邮箱"
                            prefixIcon="email"
                            :customStyle="{...inputStyle, flex: 1}"
                            :placeholderStyle="placeholderStyle"
                            border="none"
                        ></u-input>
                        <u-button 
                            type="primary" 
                            size="small"
                            :customStyle="testEmailButtonStyle"
                            :loading="testingEmail"
                            @click="testSendEmail"
                        >
                            测试
                        </u-button>
                    </view>
                </view>
                
                <view class="input-group">
                    <view class="input-label">密码</view>
                    <u-input 
                        v-model="user.password"
                        type="password"
                        placeholder="请输入新密码"
                        prefixIcon="lock"
                        :customStyle="inputStyle"
                        :placeholderStyle="placeholderStyle"
                        border="none"
                    ></u-input>
                </view>
                
                <view class="button-group">
                    <u-button 
                        type="primary" 
                        :customStyle="saveButtonStyle"
                        @click="update"
                    >
                        保存修改
                    </u-button>
                </view>
            </view>
        </view>
        

    </view>
</template>

<script setup>
    import { reactive, ref } from 'vue'
    import { updateUserInfo, getUserInfo, testSendEmail as sendTestEmail } from '@/http/api.js'
    import { onLoad } from '@dcloudio/uni-app'
    import {
        primaryButtonStyle,
        logoutButtonStyle,
        saveButtonStyle 
    } from '@/utils/button-styles.js'
    import CustomModal from '@/components/custom-modal/CustomModal.vue';
    const user = ref({
        id: null,
        userName: uni.getStorageSync('userName'),
        email: null,
        password: null,
        phone: null,
        deviceId: null,
        status: '0'
    })
    

    
    // 样式配置
    const inputStyle = {
        background: '#f8f9fa',
        borderRadius: '12px',
        padding: '16px 20px',
        height: '48px',
        marginTop: '8px'
    }
    
    const placeholderStyle = {
        color: '#999'
    }
    
    const userSettingsButtonStyle = {
        ...primaryButtonStyle,
        width: '70px',
        height: '36px',
        fontSize: '14px',
        marginTop: '0',
        marginRight: '0'
    }

    const testEmailButtonStyle = {
        width: '70px',
        height: '40px',
        fontSize: '14px',
        marginLeft: '12px',
        marginTop: '8px',
        background: '#ffffff',
        color: '#fa8c16',
        borderRadius: '8px',
        border: '1px solid #fa8c16'
    }

    const testingEmail = ref(false)
    

    
    const testSendEmail = async () => {
        if (!user.value.email || user.value.email.trim() === '') {
            uni.showToast({
                title: '请先填写邮箱',
                icon: 'none',
                duration: 2000
            })
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(user.value.email)) {
            uni.showToast({
                title: '请输入有效的邮箱地址',
                icon: 'none',
                duration: 2000
            })
            return
        }

        testingEmail.value = true
        uni.showLoading({ title: '发送中...' })

        try {
            const res = await sendTestEmail(user.value.email)
            uni.hideLoading()

            if (res.code === 200) {
                uni.showToast({
                    title: res.message || '邮件发送成功',
                    icon: 'success',
                    duration: 2000
                })
            } else {
                uni.showToast({
                    title: res.message || '邮件发送失败',
                    icon: 'none',
                    duration: 2000
                })
            }
        } catch (err) {
            uni.hideLoading()
            console.error('测试邮件发送失败:', err)
            uni.showToast({
                title: '发送失败，请检查网络',
                icon: 'none',
                duration: 2000
            })
        } finally {
            testingEmail.value = false
        }
    }

    const goToSettings = () => {
        // 检测当前运行环境
        // #ifdef H5
        // 浏览器环境，显示下载APP提醒
        uni.showModal({
            title: '下载APP体验更多功能',
            content: '为了获得更好的体验和完整功能，建议您下载我们的APP。',
            confirmText: '立即下载',
            cancelText: '稍后再说',
            success: (res) => {
                if (res.confirm) {
                    // 跳转到下载链接
                    window.open('https://jyqwwftobbtmiccsccjd.supabase.co/storage/v1/object/public/apk/cpcxapp.apk', '_blank')
                }
            }
        })
        // #endif
        
        // #ifndef H5
        // 非浏览器环境，正常跳转到设置页面
        uni.navigateTo({
            url: '/pages/settings/settings'
        })
        // #endif
    }
    
    const update = () => {
        const originalUserName = uni.getStorageSync('userName')
        const originalEmail = uni.getStorageSync('email')
        
        // 检查是否有实际修改
        if (user.value.userName === originalUserName && 
            user.value.email === originalEmail && 
            !user.value.password) {
            uni.showToast({
                title: '请修改信息后再保存',
                icon: 'none',
                duration: 2000
            })
            return
        }
        
        // 验证用户名
        if (!user.value.userName || user.value.userName.trim() === '') {
            uni.showToast({
                title: '用户名不能为空',
                icon: 'error',
                duration: 2000
            })
            return
        }
        
        // 验证邮箱
        if (!user.value.email || user.value.email.trim() === '') {
            uni.showToast({
                title: '邮箱不能为空',
                icon: 'error',
                duration: 2000
            })
            return
        }
        
        // 验证邮箱格式
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(user.value.email)) {
            uni.showToast({
                title: '请输入有效的邮箱地址',
                icon: 'error',
                duration: 2000
            })
            return
        }
        
        // 验证用户名是否重复（如果修改了用户名）
        if (user.value.userName !== originalUserName) {
            // 这里可以添加检查用户名是否已存在的逻辑
        }
        
        const updateData = {
            id: Number(user.value.id),
            userName: user.value.userName,
            email: user.value.email
        }
        
        // 如果有新密码才包含密码字段
        if (user.value.password && user.value.password.trim() !== '') {
            if (user.value.password.length < 6) {
                uni.showToast({
                    title: '密码长度至少6位',
                    icon: 'error',
                    duration: 2000
                })
                return
            }
            updateData.password = user.value.password
        }
        
        uni.showLoading({
            title: '保存中...'
        })
        
        updateUserInfo(user.value.userName, updateData).then(res => {
            uni.hideLoading()
            if (res.code === 200 || res.code === 20000) {
                uni.showToast({
                    title: res.message || '修改成功',
                    icon: 'success',
                    duration: 2000
                })
                user.value = res.data
                uni.setStorageSync('userName', res.data.userName)
                uni.setStorageSync('email', res.data.email)

                // 清空密码输入框
                user.value.password = null

                // 延迟刷新页面数据
                setTimeout(() => {
                    getUserInfo(res.data.userName).then(refreshRes => {
                        if (refreshRes.code === 200 && refreshRes.data && refreshRes.data.user) {
                            user.value = {
                                ...user.value,
                                ...refreshRes.data.user
                            }
                        } else if (refreshRes.code === 20000 && refreshRes.data) {
                            user.value = {
                                ...user.value,
                                ...refreshRes.data
                            }
                        }
                    }).catch(err => {
                        console.error('刷新用户信息失败:', err)
                    })
                }, 1000)

                return
            }
            uni.showToast({
                title: res.message || '修改失败',
                icon: 'error',
                duration: 2000
            })
        }).catch(err => {
            uni.hideLoading()
            console.error('更新用户信息失败:', err)
            uni.showToast({
                title: '网络错误，请重试',
                icon: 'error',
                duration: 2000
            })
        })
    }
    
    onLoad(() => {
        getUserInfo(user.value.userName).then(res => {
            if (res.code === 200 && res.data && res.data.user) {
                user.value = {
                    ...user.value,
                    ...res.data.user
                }
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



    .settings-icon {
        margin: 0 !important;
        flex-shrink: 0;
        padding: 8px;
        cursor: pointer;
        transition: transform 0.2s ease;
    }
    
    .settings-icon:hover {
        transform: rotate(90deg);
    }

    .profile-card {
        background: #fff;
        border-radius: 20px;
        padding: 30px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
        margin-bottom: 20px;
        flex: 1;
    }

    .card-header {
        margin-bottom: 30px;
    }
    
    .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .title {
        font-size: 24px;
        font-weight: 600;
        color: #333;
        display: block;
        margin-bottom: 8px;
    }

    .subtitle {
        font-size: 14px;
        color: #666;
        display: block;
    }

    .form-content {
        width: 100%;
    }

    .input-group {
        margin-bottom: 20px;
    }

    .email-input-wrapper {
        display: flex;
        align-items: center;
    }

    .input-label {
        font-size: 14px;
        color: #333;
        font-weight: 500;
        margin-bottom: 8px;
    }

    .button-group {
        margin-top: 20px;
    }



    /* 动画效果 */
    .profile-card {
        animation: slideUp 0.3s ease-out;
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

    /* 按钮点击效果 */
    .up-button {
        transition: all 0.3s ease;
    }

    .up-button:active {
        transform: scale(0.98);
    }


</style>