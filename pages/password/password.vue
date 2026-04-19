<template>
    <view class="container">
        <view class="password-card">
            <view class="card-header">
                <text class="title">修改密码</text>
                <text class="subtitle">请输入您的新密码</text>
            </view>
            
            <view class="form-content">
                <view class="input-group">
                    <view class="input-label">当前密码</view>
                    <u-input 
                        v-model="formData.oldPassword"
                        type="password"
                        placeholder="请输入当前密码"
                        prefixIcon="lock"
                        :customStyle="inputStyle"
                        :placeholderStyle="placeholderStyle"
                        border="none"
                    ></u-input>
                </view>
                
                <view class="input-group">
                    <view class="input-label">新密码</view>
                    <u-input 
                        v-model="formData.newPassword"
                        type="password"
                        placeholder="请输入新密码（至少6位）"
                        prefixIcon="lock"
                        :customStyle="inputStyle"
                        :placeholderStyle="placeholderStyle"
                        border="none"
                    ></u-input>
                </view>
                
                <view class="input-group">
                    <view class="input-label">确认密码</view>
                    <u-input 
                        v-model="formData.confirmPassword"
                        type="password"
                        placeholder="请再次输入新密码"
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
                        @click="submitPassword"
                        :loading="submitting"
                    >
                        确认修改
                    </u-button>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
    import { ref, reactive } from 'vue'
    import { updateUserInfo } from '@/http/api.js'
    import { saveButtonStyle } from '@/utils/button-styles.js'
    
    const formData = reactive({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    
    const submitting = ref(false)
    
    const inputStyle = {
        background: '#f8f9fa',
        borderRadius: '12px',
        padding: '16px 20px',
        height: '48px',
        marginTop: '8px'
    }
    
    const placeholderStyle = { color: '#999' }
    
    const submitPassword = () => {
        if (!formData.oldPassword) {
            uni.showToast({ title: '请输入当前密码', icon: 'none' })
            return
        }
        if (!formData.newPassword || formData.newPassword.length < 6) {
            uni.showToast({ title: '新密码至少6位', icon: 'none' })
            return
        }
        if (formData.newPassword !== formData.confirmPassword) {
            uni.showToast({ title: '两次密码不一致', icon: 'none' })
            return
        }
        
        submitting.value = true
        const userName = uni.getStorageSync('userName')
        
        updateUserInfo(userName, { password: formData.newPassword })
            .then(res => {
                if (res.code === 200 || res.code === 20000) {
                    uni.showToast({ title: '密码修改成功', icon: 'success' })
                    setTimeout(() => uni.navigateBack(), 1500)
                } else {
                    uni.showToast({ title: res.message || '修改失败', icon: 'none' })
                }
            })
            .catch(err => {
                console.error('修改密码失败:', err)
                uni.showToast({ title: '网络错误', icon: 'none' })
            })
            .finally(() => submitting.value = false)
    }
</script>

<style scoped>
    .container {
        min-height: 100vh;
        background: #f5f7fa;
        padding: 20px;
    }

    .password-card {
        background: #fff;
        border-radius: 20px;
        padding: 30px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
    }

    .card-header {
        margin-bottom: 24px;
    }

    .title {
        font-size: 22px;
        font-weight: 600;
        color: #333;
        display: block;
        margin-bottom: 6px;
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

    .button-group {
        margin-top: 24px;
    }
</style>
