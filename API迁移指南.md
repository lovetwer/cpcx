# API接口迁移指南

## 概述

本指南基于新的API接口文档，已完成所有页面的API调用更新。新的API接口遵循RESTful规范，提供了更清晰、更标准的接口设计。

## 新旧接口对照表

### 彩票管理接口

| 旧接口 | 新接口 | 说明 |
|--------|--------|------|
| `/addCp` | `POST /api/lottery` | 添加彩票记录 |
| `/findCp` | `POST /api/lottery/search` | 条件查询彩票 |
| `/findCpByUser` | `GET /api/lottery/user/{user}` | 查询用户彩票记录 |
| `/delCp` | `DELETE /api/lottery/{id}` | 删除彩票记录 |
| `/openPrizeInfo` | `POST /api/lottery/check-prize` | 开奖检查 |

### 用户管理接口

| 旧接口 | 新接口 | 说明 |
|--------|--------|------|
| `/register` | `POST /api/user/register` | 用户注册 |
| `/login` | `POST /api/user/login` | 用户登录 |
| `/findUserByName` | `GET /api/user/{username}` | 查询用户信息 |
| `/updateUser` | `PUT /api/user/{username}` | 更新用户信息 |

### AI相关接口

| 旧接口 | 新接口 | 说明 |
|--------|--------|------|
| `/aiGuess` | `GET /api/ai/calculate` | AI计算中奖概率 |
| `/aiChance` | `GET /api/ai/generate` | AI智能选号 |

### 文件上传接口

| 旧接口 | 新接口 | 说明 |
|--------|--------|------|
| `/upload` | `POST /upload/lottery` | 上传彩票图片识别 |
| `/upload/status` | `GET /upload/status` | 获取上传状态 |

## 新接口特性

### 1. RESTful设计规范
- 使用标准HTTP方法：GET、POST、PUT、DELETE
- 资源导向的URL设计
- 清晰的状态码和响应格式

### 2. 参数传递优化
- GET请求参数通过URL查询参数传递
- POST/PUT请求参数通过请求体传递
- 路径参数用于标识资源

### 3. 新增接口
- `POST /api/lottery/batch` - 批量添加彩票
- `PUT /api/lottery/{id}/status` - 更新彩票状态

## 页面更新详情

### ✅ 已完成的页面

1. **首页 (index.vue)**
   - 更新导入：`addLottery`, `getLotteryByUser`, `deleteLottery`, `generateNumbers`, `calculateWinProbability`, `uploadLotteryImage`
   - 保持向后兼容：使用别名导入

2. **我的彩票 (lottery.vue)**
   - 更新导入：`checkPrize`, `getLotteryByUser`
   - 优化参数传递：使用路径参数

3. **个人中心 (mine.vue)**
   - 更新导入：`updateUserInfo`, `getUserInfo`
   - 改进参数结构：使用RESTful路径

4. **登录注册 (login.vue)**
   - 更新导入：`registerUser`, `loginUser`
   - 保持功能不变

## 向后兼容性

为了平滑迁移，在`api.js`中保留了所有旧接口作为兼容层：

```javascript
// 兼容旧接口（逐步废弃）
export const addCp = addLottery;
export const findCpByUser = (data) => getLotteryByUser(data.user, data);
export const delCp = (data) => deleteLottery(data.id);
// ... 其他兼容接口
```

## 使用建议

### 新开发
建议使用新接口，享受更好的设计和更清晰的结构。

### 现有代码
可以继续使用旧接口，系统会自动映射到新接口。建议在下次功能更新时逐步迁移。

### 迁移步骤
1. 更新导入语句（已完成）
2. 调整参数传递方式
3. 测试功能正常性
4. 逐步移除兼容层

## 测试验证

所有页面已完成API调用更新，建议进行以下测试：
- 添加彩票记录
- 查询用户彩票
- 用户注册登录
- 个人信息修改
- AI选号功能
- 图片上传功能