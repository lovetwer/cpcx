<template>
  <view v-if="visible" class="modal-overlay" @click="handleOverlayClick">
    <view class="modal-content" @click.stop>
      <view class="modal-header" v-if="title">
        <text class="modal-title">{{ title }}</text>
      </view>
      <view class="modal-body">
        <slot></slot>
      </view>
      <view class="modal-footer" v-if="showFooter">
        <u-button 
          v-if="showCancelButton" 
          type="default" 
          :customStyle="cancelButtonStyle" 
          @click="handleCancel"
        >
          {{ cancelText }}
        </u-button>
        <u-button 
          v-if="showConfirmButton" 
          type="primary" 
          :customStyle="confirmButtonStyle" 
          @click="handleConfirm"
        >
          {{ confirmText }}
        </u-button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, watch, toRefs } from 'vue';

const props = defineProps({
  visible: Boolean,
  title: String,
  cancelText: {
    type: String,
    default: '取消'
  },
  confirmText: {
    type: String,
    default: '确定'
  },
  showFooter: {
    type: Boolean,
    default: true
  },
  showCancelButton: {
    type: Boolean,
    default: true
  },
  showConfirmButton: {
    type: Boolean,
    default: true
  },
  cancelButtonStyle: {
    type: Object,
    default: () => ({
      width: '100px',
      height: '40px',
      marginRight: '12px',
      borderRadius: '8px'
    })
  },
  confirmButtonStyle: {
    type: Object,
    default: () => ({
      width: '100px',
      height: '40px',
      borderRadius: '8px'
    })
  }
});

const emit = defineEmits(['update:visible', 'cancel', 'confirm']);

const handleOverlayClick = () => {
  emit('update:visible', false);
};

const handleCancel = () => {
  emit('cancel');
  emit('update:visible', false);
};

const handleConfirm = () => {
  emit('confirm');
  emit('update:visible', false);
};
</script>

<style scoped>
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