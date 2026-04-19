/**
 * 统一的小清新按钮样式
 * 用于整个项目的按钮样式统一
 */

// 主要按钮样式 - 红黄渐变
export const primaryButtonStyle = {
    backgroundColor: '#28a745', // 绿色
    color: '#fff',
    borderRadius: '8px',
    padding: '8px 16px',
    fontSize: '14px',
    height: '36px',
    lineHeight: '36px'
};

export const secondaryButtonStyle = {
    backgroundColor: '#fff', // 白色
    color: '#28a745',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 16px',
    fontSize: '14px',
    height: '36px',
    lineHeight: '36px'
};
export const dangerButtonStyle = {
  width: '100%',
  height: '88rpx',
  borderRadius: '44rpx',
  background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%)',
  border: 'none',
  color: '#ffffff',
  fontWeight: '600',
  fontSize: '30rpx',
  letterSpacing: '2rpx',
  boxShadow: '0 8rpx 20rpx rgba(255, 107, 107, 0.3)',
  transition: 'all 0.3s ease'
}

// AI按钮样式 - 红色渐变
export const aiButtonStyle = {
    background: 'linear-gradient(135deg, #FF3030 0%, #FF6B6B 100%)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 20px',
    fontSize: '14px',
    height: '40px',
    minWidth: '100px',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 4px 15px rgba(255, 48, 48, 0.4)',
    ':hover': {
        background: 'linear-gradient(135deg, #FF4545 0%, #FF8080 100%)',
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 25px rgba(255, 48, 48, 0.6)'
    },
    ':active': {
        transform: 'translateY(0) scale(0.98)',
        boxShadow: '0 2px 10px rgba(255, 48, 48, 0.4)'
    },
    ':before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
        transition: 'left 0.5s ease'
    },
    ':hover:before': {
        left: '100%'
    }
};
export const smallButtonStyle = {
  height: '60rpx',
  borderRadius: '30rpx',
  background: 'linear-gradient(135deg, #ffd1d1 0%, #fff0b3 100%)',
  border: 'none',
  color: '#4a5568',
  fontWeight: '500',
  fontSize: '24rpx',
  letterSpacing: '1rpx',
  boxShadow: '0 4rpx 10rpx rgba(255, 209, 209, 0.3)',
  transition: 'all 0.3s ease',
  padding: '0 30rpx'
}

// 迷你按钮样式 - 用于删除等操作
export const miniButtonStyle = {
  height: '48rpx',
  borderRadius: '24rpx',
  background: 'linear-gradient(135deg, #ffe8cc 0%, #ffcccb 100%)',
  border: 'none',
  color: '#4a5568',
  fontWeight: '500',
  fontSize: '22rpx',
  letterSpacing: '1rpx',
  boxShadow: '0 4rpx 10rpx rgba(255, 232, 204, 0.3)',
  transition: 'all 0.3s ease',
  padding: '0 20rpx'
}

// 登出按钮样式
export const logoutButtonStyle = {
    background: '#ffffff',
    color: '#989898',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 16px',
    fontSize: '14px',
    height: '36px',
    minWidth: '80px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ':hover': {
        background: '#dc2626'
    },
    ':active': {
        background: '#b91c1c',
        transform: 'scale(0.95)'
    }
};

// 禁用状态样式
export const disabledButtonStyle = {
  background: 'linear-gradient(135deg, #e0e0e0 0%, #cccccc 100%)',
  color: '#999999',
  boxShadow: 'none'
}
export const saveButtonStyle = {
    backgroundColor: '#ff7777',
    color: '#fff',
    borderRadius: '8px',
    padding: '8px 16px',
    fontSize: '14px',
    height: '36px',
    lineHeight: '36px',
    border: 'none'
};