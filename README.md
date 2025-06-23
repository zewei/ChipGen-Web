

---

# ChipGen-Web

## 项目简介

**ChipGen-Web** 是一个基于 Vite + React + TypeScript 的网页应用，旨在为芯片设计、知识管理和团队协作提供便捷的前端界面。  
本项目支持本地开发、生产构建以及一键部署到 GitHub Pages。

---

## 目录结构

```
ChipGen-Web/
├── public/           # 静态资源
├── src/              # 源代码
│   ├── components/   # 组件
│   ├── contexts/     # 上下文
│   ├── hooks/        # 自定义Hook
│   ├── lib/          # 工具库
│   ├── pages/        # 页面
│   └── ...           # 其他
├── dist/             # 构建产物
├── package.json      # 项目依赖脚本
├── vite.config.ts    # Vite配置
└── ...
```

---

## 本地开发

1. **安装依赖**

   ```sh
   pnpm install
   # 或
   npm install
   ```

2. **启动开发服务器**

   ```sh
   pnpm run dev
   # 或
   npm run dev
   ```

   启动后访问 [http://localhost:5173/](http://localhost:5173/) 查看效果。

---

## 生产构建与本地预览

1. **构建生产包**

   ```sh
   pnpm run build
   # 或
   npm run build
   ```

2. **本地预览生产包**

   ```sh
   pnpm run preview
   # 或
   npm run preview
   ```

   预览地址通常为 [http://localhost:4173/](http://localhost:4173/)

---

## 部署到 GitHub Pages

1. **配置 `vite.config.ts`**

   ```ts
   export default defineConfig({
     base: '/ChipGen-Web/', // 仓库名
     plugins: [react()],
   })
   ```

2. **安装 gh-pages**

   ```sh
   pnpm add -D gh-pages
   # 或
   npm install --save-dev gh-pages
   ```

3. **在 `package.json` 添加脚本**

   ```json
   "predeploy": "pnpm run build",
   "deploy": "gh-pages -d dist"
   ```

4. **部署**

   ```sh
   pnpm run deploy
   # 或
   npm run deploy
   ```

5. **在 GitHub 仓库设置 Pages，选择 `gh-pages` 分支作为发布源。**

---

## 常见问题

- **页面资源 404 或空白？**  
  检查 `vite.config.ts` 的 `base` 字段是否为 `/ChipGen-Web/`。

- **依赖安装失败？**  
  请确保已安装 [Node.js](https://nodejs.org/) 和 [pnpm](https://pnpm.io/) 或 npm。

- **样式不生效？**  
  检查 `tailwind.config.js` 和 `postcss.config.js` 配置。

---

## 贡献指南

1. Fork 本仓库并克隆到本地
2. 新建分支进行开发
3. 提交 PR

---

## 联系方式

如有问题或建议，请在 [GitHub Issues](https://github.com/你的用户名/ChipGen-Web/issues) 提出。

---

