<template>
    <view class="container">
        <view class="login-card">
            <view class="header">
                <image class="logo" src="/static/1756360024.png" mode="aspectFit"></image>
                <text class="title">欢迎回来</text>
                <text class="subtitle">请登录您的账号</text>
            </view>
            
            <view class="form-area">
                <view class="input-item">
                    <u-input 
                        v-model="form.userName"
                        placeholder="用户名"
                        :customStyle="inputStyle"
                        :placeholderStyle="placeholderStyle"
                        prefixIcon="account"
                        prefixIconStyle="color: #909399; font-size: 20px;"
                    ></u-input>
                </view>
                
                <view class="input-item">
                    <u-input 
                        v-model="form.password"
                        type="password"
                        placeholder="密码"
                        :customStyle="inputStyle"
                        :placeholderStyle="placeholderStyle"
                        prefixIcon="lock"
                        prefixIconStyle="color: #909399; font-size: 20px;"
                    ></u-input>
                </view>
            </view>
            
            <view class="action-area">
                <u-button 
                    type="primary" 
                    :customStyle="primaryButtonStyle"
                    @click="toLogin"
                >
                    登录
                </u-button>
                
                <view class="quick-login">
                    <view class="divider">
                        <text class="divider-text">快速登录</text>
                    </view>
                    <u-button 
                        type="primary" 
                        :customStyle="secondaryButtonStyle"
                        @click="oneRegister"
                    >
                        一键登录
                    </u-button>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
    import {
        reactive,
        ref
    } from 'vue'
    import {
        registerUser as register,
        loginUser as login
    } from '@/http/api.js'
    import {
        primaryButtonStyle,
        secondaryButtonStyle
    } from '@/utils/button-styles.js'
    
    const form = reactive({
        userName: '',
        password: '',
    })
    
    const deviceModel = ref('')
    
    // 样式配置
    const inputStyle = {
        background: '#f8f9fa',
        borderRadius: '12px',
        padding: '16px 20px',
        border: 'none',
        height: '50px'
    }
    
    const placeholderStyle = {
        color: '#999'
    }
    
    // 使用导入的按钮样式并添加额外属性
    const loginButtonStyle = {
        ...primaryButtonStyle,
        marginTop: '30px',
        height: '48px'
    }
    
    const quickLoginButtonStyle = {
        ...secondaryButtonStyle,
        marginTop: '20px',
        height: '48px'
    }
    
    uni.getSystemInfo({
        success: (res) => {
            form.deviceId = res.deviceId
            deviceModel.value = res.deviceModel
        }
    })
    
    const toLogin = () => {
        login(form).then(res => {
            if (res.code == 200) {
                uni.setStorageSync('userName', res.data.user.userName)
                uni.setStorageSync('email', res.data.user.email)
                uni.setStorageSync('token', res.data.token)
                
                // 显示登录成功提示
                uni.showToast({
                    title: '登录成功',
                    icon: 'success',
                    duration: 2000
                })
                
                // 延迟跳转，让用户看到提示
                setTimeout(() => {
                    res.data.user.status === '0' ? 
                        uni.switchTab({ url: '/pages/mine/mine' }) : 
                        uni.switchTab({ url: '/pages/index/index' })
                }, 1500)
                return
            }
            uni.showToast({
                title: res.msg || '登录失败',
                icon: 'error',
                duration: 2000
            })
        })
    }
    
    const oneRegister = () => {
        form.userName = deviceModel.value + new Date().getTime()
        form.password = '123456'
        register(form).then(res => {
            if (res.code == 200) {
                uni.setStorageSync('userName', res.data.user.userName)
                uni.setStorageSync('email', res.data.user.email)
                uni.setStorageSync('token',res.data.token)
                
                // 显示注册成功提示
                uni.showToast({
                    title: '注册成功',
                    icon: 'success',
                    duration: 2000
                })
                
                // 延迟跳转，让用户看到提示
                setTimeout(() => {
                    res.data.user.status === '0' ? 
                        uni.switchTab({ url: '/pages/mine/mine' }) : 
                        uni.switchTab({ url: '/pages/index/index' })
                }, 1500)
                return
            }
            uni.showToast({
                title: res.msg || '注册失败',
                icon: 'error',
                duration: 2000
            })
        })
    }
</script>

<style scoped>
    .container {
        min-height: 100vh;
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    }

    .login-card {
        width: 100%;
        max-width: 380px;
        background: #fff;
        border-radius: 20px;
        padding: 40px 30px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    .header {
        text-align: center;
        margin-bottom: 40px;
    }

    .logo {
        width: 80px;
        height: 80px;
        border-radius: 40px;;
        margin-bottom: 20px;
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

    .form-area {
        margin-bottom: 20px;
    }

    .input-item {
        margin-bottom: 16px;
    }

    .action-area {
        margin-top: 20px;
    }

    .quick-login {
        margin-top: 30px;
    }

    .divider {
        position: relative;
        text-align: center;
        margin: 20px 0;
    }

    .divider::before,
    .divider::after {
        content: '';
        position: absolute;
        top: 50%;
        width: 35%;
        height: 1px;
        background: #e0e0e0;
    }

    .divider::before {
        left: 0;
    }

    .divider::after {
        right: 0;
    }

    .divider-text {
        color: #999;
        font-size: 14px;
        background: #fff;
        padding: 0 10px;
    }

    /* 点击效果 */
    .up-button {
        transition: all 0.3s ease;
    }

    .up-button:active {
        transform: scale(0.98);
    }
</style>