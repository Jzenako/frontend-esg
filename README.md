# frontend-esg
An online platform for ESG rating system based on AI

# AI-ESG评级系统开发日志

## 2025-08-20（Day 1）— 初始化与项目骨架

### 学习内容
- 掌握了使用 Vite 创建 React 项目的流程
- 学习了 Git 仓库初始化与基本操作
- 了解了项目基本结构和 npm 命令

### 今日成果
✅ 成功创建并初始化了 Vite React 项目
```bash
npm create vite@latest frontend-esg -- --template react
cd frontend-esg
npm install
```

✅ 完成了 Git 初始化并提交了初始代码
```bash
git init
git add .
git commit -m "chore: init vite react project"
git branch -M main
git remote add origin <远程仓库>
git push -u origin main
```

✅ 创建了项目文档和开发环境配置
- 编写了 README.md 包含项目运行说明
- 创建了 `.vscode` 工作区设置文件夹
- 可选创建了 `.github` 文件夹

**验收结果**：项目可在浏览器中打开 http://localhost:5173 并显示 Vite 欢迎页面，README 包含启动说明，代码已成功推送至远程仓库。

---

## 2025-08-21（Day 2）— 项目基础依赖与代码风格

### 学习内容
- 学习了添加项目常用依赖库（路由、HTTP 客户端）
- 掌握了代码质量工具（ESLint、Prettier）的配置
- 熟悉了 React 项目目录结构约定

### 今日成果
✅ 安装了项目所需依赖
```bash
npm install react-router-dom axios
npm install -D eslint prettier eslint-plugin-react eslint-config-prettier
```

✅ 创建了标准化的目录结构
```
src/
  components/
  pages/
  api/
  assets/
  styles/
  mock/
```

✅ 配置了代码质量工具
- 创建了 ESLint 配置文件 (.eslintrc.cjs)
- 创建了 Prettier 配置文件 (.prettierrc)

✅ 设置了基本路由结构
- 在 src/main.jsx 中配置了 React Router
- 创建了三个基本路由：/（首页）、/upload（上传页）、/dashboard（仪表板）

**验收结果**：项目使用 `npm run dev` 可正常运行无错误，代码风格配置文件已就位，路由可以在地址栏中切换到不同页面（目前为占位页）。

---

## 2025-08-22（Day 3）— 样式与基础页面骨架

### 学习内容
- 实现了页面基础布局和组件结构
- 学习了全局样式管理和 CSS 变量使用
- 掌握了组件化开发的基本模式

### 今日成果
✅ 创建了可复用的布局组件
- 开发了 Header 组件 (src/components/Header.jsx)
- 开发了 Footer 组件
- 创建了全局样式文件 (src/styles/global.css) 包含重置样式和 CSS 变量

✅ 实现了主要页面骨架
- 创建了上传页面 (src/pages/UploadPage.jsx)
    - 包含文件输入框 `<input type="file">`
    - 包含上传按钮
    - 包含文件列表占位区
- 创建了仪表板页面 (src/pages/DashboardPage.jsx)
    - 包含图表占位区

✅ 添加了项目资源并完善了导航
- 添加了 logo 图片 (src/assets/logo.png)
- 在 App.jsx 中添加了导航链接
- 更新了 index.html 中的页面元数据

✅ 提交了功能分支
```bash
git checkout -b feature/layout
git add .
git commit -m "feat: add basic layout with header, footer and page skeletons"
# 后续需要推送到远程仓库
```

**验收结果**：页面样式稳定，可以清晰看到上传区域和仪表板占位区，导航功能正常工作，提交记录清晰明确。 

## Day 4（2025-08-23）— 上传组件（前端）实现（本地 mock）
### 学习内容
- 掌握了组件拆分原则（容器组件与展示组件）
- 学会了前端文件校验的实现方法（扩展名、大小限制）
-  理解了状态管理在文件上传场景中的应用
- 熟悉了父子组件间的数据传递与事件通信

### 产出成果
1. 创建了上传组件结构
2. 实现了 Upload.jsx 容器组件
3. 实现了 UploadItem.jsx 展示组件
4. 功能验收结果:

✅ 选择文件后正确显示文件卡片（含文件名、大小信息）

✅ 错误文件（格式不符或大小超限）会弹出提示且不加入列表

✅ 点击❌按钮可以删除对应文件

✅ 上传按钮点击后生成模拟fileId并弹出提示
6. 代码提交
- 创建了功能分支：feature/upload-component
- 提交信息：feat(upload): add Upload & UploadItem components with local mock flow
在PR中记录了未来API需求：
* POST /files: 上传文件接口
  参数: { name: string, size: number, type: string }
  返回: { id: number, name: string, size: number, status: string }
* DELETE /files/:id: 删除文件接口

## Day 5（2025-08-24）— 搭建 mock API 并联调上传
### 学习内容
- 掌握了使用 json-server 搭建模拟后端的方法
- 学会了使用 axios 发送 HTTP 请求
- 理解了前后端数据交互的基本流程
- 实现了完整的上传功能闭环
### 产出成果
1. 安装并配置了 json-server
2. 创建了 mock 数据文件
3. 修改了 Upload.jsx 实现真实 API 调用
4. 功能验收结果:

✅ 运行 npm run mock:start 成功启动本地 mock 服务器（端口4000）

✅ 前端上传文件时，db.json 中正确新增文件记录

✅ 文件记录包含完整字段：id（自动递增）、name、size、status

✅ 页面显示上传成功消息，并显示服务器返回的真实 fileId

✅ 多次上传测试，db.json 中的 id 字段正确自动递增

5. 代码提交
创建了功能分支：feature/mock-server




