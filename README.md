# AI-ESG Rating System demo
An online platform for ESG rating system based on AI
ESG 报告上传与可视化平台（Demo-ready）
> 本仓库为团队前端代码骨架，目标是在 2025-08-30 前完成可运行的前端平台：支持文件上传、mock API、结果展示面板与基础可视化。

---

## 主要特性（当前 Demo 目标）
- 使用 Vite + React 快速开发
- 文件上传 UI（支持 PDF / DOCX / DOC，前端校验）
- Mock 后端（json-server）用于开发与联调
- Dashboard：展示 E / S / G 三项得分与证据列表
- 图表交互（hover / click）、证据联动、JSON 导出

---

### 日志
#### 8.20 Day 1 
- ##### 学习收获：
  如何用 Vite 初始化项目、如何在 GitHub 建仓并 push。
- ##### 产出：
  远程仓库（含 .gitignore、README）、能运行的前端骨架。
  
#### 8.21 Day 2
##### 学习收获：
- 掌握了项目根目录执行 npm / git 命令的方法  
- 理解了 `npm run dev → 浏览器访问 localhost:5173` 的运行流程  
- 学会了 React Router 的基本用法（`Routes`、`Route`、`Link`）  

#### 产出
- 成功运行 Vite 默认页面并改成 **Hello ESG 🚀**  
- 新建 `Home.jsx`、`UploadPage.jsx`、`DashboardPage.jsx` 三个页面  
- 在 `App.jsx` 中接入导航，可在浏览器中跳转：  
  - `/` → 首页  
  - `/upload` → 上传页  
  - `/dashboard` → 仪表盘页  
