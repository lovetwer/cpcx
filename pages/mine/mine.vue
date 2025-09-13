<template>
    <view class="container">
        <view class="profile-card">
            <view class="card-header">
                <view class="header-content">
                    <view>
                        <text class="title">个人信息</text>
                        <text class="subtitle">更新您的个人资料</text>
                    </view>
                    <u-button 
                        type="primary" 
                        :customStyle="userLogoutButtonStyle"
                        @click="openLogoutModal"
                        class="logout-btn"
                    >
                        退出登录
                    </u-button>
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
                    <u-input 
                        v-model="user.email"
                        placeholder="请填写邮箱"
                        prefixIcon="email"
                        :customStyle="inputStyle"
                        :placeholderStyle="placeholderStyle"
                        border="none"
                    ></u-input>
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
        
        <!-- 自定义退出登录弹窗 -->
        <view v-if="showLogoutModal" class="modal-overlay" @click="closeLogoutModal">
            <view class="modal-content" @click.stop>
                <view class="modal-header">
                    <text class="modal-title">确认退出</text>
                </view>
                <view class="modal-body">
                    <CustomModal
                        v-model="showLogoutModal"
                        :title="'确认退出'"
                        :cancelText="'取消'"
                        :confirmText="'确定退出'"
                        @cancel="closeLogoutModal"
                        @confirm="confirmLogout"
                    >
                        <text class="modal-message">确定要退出登录吗？</text>
                    </CustomModal>
                </view>
                <view class="modal-footer">
                    <u-button 
                        type="default" 
                        :customStyle="cancelButtonStyle"
                        @click="closeLogoutModal"
                    >
                        取消
                    </u-button>
                    <u-button 
                        type="primary" 
                        :customStyle="confirmButtonStyle"
                        @click="confirmLogout"
                    >
                        确定退出
                    </u-button>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
    import { reactive, ref } from 'vue'
    import { updateUserInfo, getUserInfo } from '@/http/api.js'
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
    
    const showLogoutModal = ref(false)
    
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
    
    const userLogoutButtonStyle = {
        ...logoutButtonStyle,
        width: '90px',
        height: '36px',
        fontSize: '14px',
        marginTop: '0',
        marginRight: '0'
    }
    
    // 弹窗按钮样式
    const cancelButtonStyle = {
        width: '100px',
        height: '40px',
        marginRight: '12px',
        borderRadius: '8px'
    }
    
    const confirmButtonStyle = {
        width: '100px',
        height: '40px',
        borderRadius: '8px'
    }
    
    const openLogoutModal = () => {
        showLogoutModal.value = true
    }
    
    const closeLogoutModal = () => {
        showLogoutModal.value = false
    }
    
    const confirmLogout = () => {
        uni.removeStorageSync('token')
        uni.removeStorageSync('userName')
        uni.removeStorageSync('email')
        uni.reLaunch({
            url: '/pages/login/login'
        })
    }
    
    const logout = () => {
        uni.showModal({
            title: '提示',
            content: '确定要退出登录吗？',
            success: function (res) {
                if (res.confirm) {
                    uni.removeStorageSync('token')
                    uni.removeStorageSync('userName')
                    uni.removeStorageSync('email')
                    uni.reLaunch({
                        url: '/pages/login/login'
                    })
                }
            }
        })
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



    .logout-btn {
        margin: 0 !important;
        flex-shrink: 0;
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

    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }
    
    .modal-content {
        background: #fff;
        border-radius: 16px;
        padding: 24px;
        width: 75%;
        max-width: 280px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        animation: modalSlideIn 0.3s ease-out;
    }
    
    .modal-header {
        text-align: center;
        margin-bottom: 16px;
    }
    
    .modal-title {
        font-size: 18px;
        font-weight: 600;
        color: #333;
    }
    
    .modal-body {
        text-align: center;
        margin-bottom: 24px;
    }
    
    .modal-message {
        font-size: 14px;
        color: #666;
        line-height: 1.4;
    }
    
    .modal-footer {
        display: flex;
        justify-content: center;
        gap: 10px;
    }
    
    @keyframes modalSlideIn {
        from {
            opacity: 0;
            transform: translateY(-50px) scale(0.9);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
</style>