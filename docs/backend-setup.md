# 机器人评估系统后端设置指南

本文档说明如何设置和配置机器人评估系统的后端服务。

## 1. Cloudflare Workers 后端设置

我们使用 Cloudflare Workers 作为后端服务，它提供了一个简单的键值存储系统来跟踪每个机器人的评估次数。

### 1.1 创建 Cloudflare Workers

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 导航到 Workers & Pages
3. 点击 "Create Application"
4. 选择 "Create Worker"
5. 命名您的 Worker (例如 `robot-assessment-api`)
6. 将 `workers/worker.js` 文件的内容复制到 Worker 编辑器中

### 1.2 创建和绑定 KV 命名空间

1. 在 Cloudflare Dashboard 中，转到 Workers & Pages
2. 选择您刚创建的 Worker
3. 转到 "Settings" > "Variables"
4. 在 "KV Namespace Bindings" 部分，点击 "Add binding"
5. 变量名设置为: `ROBOT_COUNTS`
6. 如果您还没有 KV 命名空间，点击 "Create new namespace" 并创建一个
7. 选择您的 KV 命名空间并保存绑定
8. 保存并部署您的 Worker

## 2. 修改配置

### 2.1 前端配置

前端配置主要在以下文件中:

#### API 服务配置 (`src/lib/api-service.ts`)

```typescript
// 后端API服务地址 - 更改为您的 Cloudflare Worker URL
const API_URL = 'https://your-worker-url.workers.dev';

// 最大评估次数限制
export const MAX_ASSESSMENT_COUNT = 15; // 可根据需要修改
```

#### 机器人配置 (`src/config/robots.ts`)

```typescript
// 每次评估需要的机器人数量
export const ROBOTS_PER_ASSESSMENT = 5; // 可根据需要修改

// 要保留的机器人ID列表
export const SELECTED_ROBOT_IDS = [
  // 可根据需要添加或删除机器人ID
  'robot001', 'robot002', ...
];
```

### 2.2 后端配置

在 `workers/worker.js` 文件中:

```javascript
// 设置最大评估次数 - 应与前端配置一致
const MAX_ASSESSMENT_COUNT = 15;
```

## 3. 常见问题排查

### 3.1 访问后端 API 失败

如果前端无法访问后端 API，请检查:

1. Cloudflare Worker 是否正确部署
2. API_URL 是否正确设置
3. CORS 头是否正确设置

您可以通过直接访问 Worker URL 检查 API 是否正常运行。

### 3.2 评估计数不更新

如果评估计数不更新，请检查:

1. KV 命名空间是否正确绑定
2. Worker 是否有足够的权限访问 KV
3. 确保在完成评估时调用了 `RobotCountService.updateRobotCounts()`

## 4. 调整评估次数限制

如果您想更改每个机器人的最大评估次数，需要在三个地方进行修改:

1. `src/lib/api-service.ts` 中的 `MAX_ASSESSMENT_COUNT`
2. `workers/worker.js` 中的 `MAX_ASSESSMENT_COUNT`

确保两处的值保持一致。

## 5. 添加或移除机器人

要添加或移除可用的机器人，只需编辑 `src/config/robots.ts` 文件中的 `SELECTED_ROBOT_IDS` 数组。

## 6. 完全重置评估计数

如果需要重置所有机器人的评估计数:

1. 访问 Cloudflare Dashboard
2. 转到 Workers & Pages > KV
3. 选择您的 KV 命名空间
4. 选择并删除所有键值对，或者创建一个新的 KV 命名空间并更新绑定 