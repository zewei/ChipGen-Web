在本地部署和运行你的 Vite + React 项目非常简单。下面是详细步骤：

---

## 1. 安装依赖

如果你还没有安装依赖，请在项目根目录下运行：

```sh
pnpm install
```
或者使用 npm：
```sh
npm install
```

---

## 2. 启动开发服务器

在项目根目录下运行：

```sh
pnpm run dev
```
或者使用 npm：
```sh
npm run dev
```

---

## 3. 访问本地网站

终端会输出一个本地地址，通常是：

```
http://localhost:5173/
```

用浏览器打开这个地址即可访问你的本地网站。

---

## 4. 其他常用命令

- **构建生产包**（生成 `dist` 文件夹）：
  ```sh
  pnpm run build
  ```
- **本地预览生产包**（模拟线上环境）：
  ```sh
  pnpm run preview
  ```
  终端会输出一个本地预览地址，通常是 `http://localhost:4173/`。

---

如遇到任何报错或页面无法访问，请把报错信息发给我，我会帮你排查！


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
