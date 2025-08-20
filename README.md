# frontend-esg
An online platform for ESG rating system based on AI
前端：ESG 报告上传与可视化平台（Demo-ready）
> 本仓库为团队前端代码骨架，目标是在 2025-08-30 前完成可运行的前端平台：支持文件上传、mock API、结果展示面板与基础可视化。

---

## 主要特性（当前 Demo 目标）
- 使用 Vite + React 快速开发
- 文件上传 UI（支持 PDF / DOCX / DOC，前端校验）
- Mock 后端（json-server）用于开发与联调
- Dashboard：展示 E / S / G 三项得分与证据列表
- 图表交互（hover / click）、证据联动、JSON 导出

---

## 快速启动（开发环境）

1.1）克隆仓库（或直接在仓库目录下运行）
```bash
git clone https://github.com/Jzenako/frontend-esg.git
cd frontend-esg
# frontend-esg
2）安装依赖
```bash
npm install

2.本地开发
```bash
npm run dev
# 打开 http://localhost:5173

3.打包
```bash
npm run build
