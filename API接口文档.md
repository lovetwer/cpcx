# 彩票系统 API 接口文档

## 基础信息
- **Base URL**: `http://localhost:8080`
- **Content-Type**: `application/json`
- **编码**: UTF-8

---

## 彩票管理接口

### 1. 添加彩票记录
```
POST /api/lottery
```

**请求参数**:
```json
{
  "user": "用户名",
  "redBall": "01,02,03,04,05,06",
  "blueBall": "07",
  "type": "ssq",
  "multiple": 1,
  "money": 2
}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1,
    "user": "用户名",
    "redBall": "01,02,03,04,05,06",
    "blueBall": "07",
    "type": "ssq",
    "multiple": 1,
    "money": 2,
    "status": "pending",
    "createTime": "2024-01-01T12:00:00"
  }
}
```

---

### 2. 批量添加彩票
```
POST /api/lottery/batch
```

**请求参数**:
```json
[
  {
    "user": "用户名1",
    "redBall": "01,02,03,04,05,06",
    "blueBall": "07",
    "type": "ssq"
  },
  {
    "user": "用户名2", 
    "redBall": "11,12,13,14,15,16",
    "blueBall": "08",
    "type": "dlt"
  }
]
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": 1,
      "user": "用户名1",
      "redBall": "01,02,03,04,05,06",
      "blueBall": "07",
      "type": "ssq",
      "status": "pending"
    },
    {
      "id": 2,
      "user": "用户名2",
      "redBall": "11,12,13,14,15,16",
      "blueBall": "08",
      "type": "dlt",
      "status": "pending"
    }
  ]
}
```

---

### 3. 查询用户彩票记录
```
GET /api/lottery/user/{user}
```

**示例**:
```
GET /api/lottery/user/张三
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": 1,
      "user": "张三",
      "redBall": "01,02,03,04,05,06",
      "blueBall": "07",
      "type": "ssq",
      "status": "pending",
      "winChance": "0.0000056%",
      "createTime": "2024-01-01T12:00:00"
    }
  ]
}
```

---

### 4. 条件查询彩票记录
```
POST /api/lottery/search
```

**请求参数** (支持任意组合):
```json
{
  "user": "用户名",
  "type": "ssq",
  "status": "pending",
  "startTime": "2024-01-01T00:00:00",
  "endTime": "2024-12-31T23:59:59"
}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": 1,
      "user": "用户名",
      "redBall": "01,02,03,04,05,06",
      "blueBall": "07",
      "type": "ssq",
      "status": "pending",
      "createTime": "2024-01-01T12:00:00"
    }
  ]
}
```

---

### 5. 删除彩票记录
```
DELETE /api/lottery/{id}
```

**示例**:
```
DELETE /api/lottery/123
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

---

### 6. 更新彩票状态
```
PUT /api/lottery/{id}/status
```

**请求参数**:
```
PUT /api/lottery/123/status?status=win&winChance=一等奖
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

---

### 7. 开奖检查
```
POST /api/lottery/check-prize
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

---

## 文件上传接口

### 8. 上传彩票图片识别
```
POST /upload/lottery
```

**Content-Type**: `multipart/form-data`

**请求参数**:
- `file`: 图片文件 (jpg, png, jpeg)
- `user`: 用户名 (可选)

**响应示例**:
```json
{
  "success": true,
  "message": "识别成功",
  "data": {
    "redBalls": ["01","02","03","04","05","06"],
    "blueBalls": ["07"],
    "type": "ssq",
    "period": "2024001"
  }
}
```

---

## 数据模型

### 彩票对象 (Cp)
```json
{
  "id": 1,                    // 主键ID
  "user": "用户名",            // 用户名称
  "redBall": "01,02,03,04,05,06",  // 红球号码
  "blueBall": "07",           // 蓝球号码
  "type": "ssq",             // 彩票类型: ssq(双色球)/dlt(大乐透)
  "multiple": 1,             // 倍数
  "money": 2,                // 金额
  "status": "pending",        // 状态: pending(待开奖)/win(中奖)/lose(未中奖)
  "winChance": "0.0000056%",  // 中奖概率
  "createTime": "2024-01-01T12:00:00",  // 创建时间
  "openTime": "2024-01-03"     // 开奖时间 (yyyy-MM-dd)
}
```

---

## 响应状态码

| 状态码 | 说明 |
|--------|------|
| 200    | 成功 |
| 400    | 参数错误 |
| 404    | 资源不存在 |
| 500    | 服务器内部错误 |

---

## 快速开始示例

### 前端调用示例 (Axios)
```javascript
// 添加彩票
axios.post('/api/lottery', {
  user: '张三',
  redBall: '01,02,03,04,05,06',
  blueBall: '07',
  type: 'ssq'
})

// 查询用户彩票
axios.get('/api/lottery/user/张三')

// 上传图片识别
const formData = new FormData()
formData.append('file', imageFile)
formData.append('user', '张三')
axios.post('/upload/lottery', formData, {
  headers: {'Content-Type': 'multipart/form-data'}
})
```

---

## 使用提示
1. 所有时间格式为 ISO 8601 标准格式
2. 号码格式要求：红球用逗号分隔，如"01,02,03,04,05,06"
3. 支持双色球(ssq)和大乐透(dlt)两种类型
4. 图片上传支持 jpg、png、jpeg 格式，最大10MB