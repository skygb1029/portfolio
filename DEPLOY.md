# 部署與 CI/CD 指南

## 正式網址

預設 Vercel 網址：`https://portfolio.vercel.app`

綁定自訂網域後，請同步更新：

- `index.html`（canonical、og:url、JSON-LD）
- `public/sitemap.xml`
- `public/robots.txt`
- `src/config/site.ts` 的 `siteUrl`

---

## 第一次上線

### 1. Git 初始化（若尚未執行）

```bash
git init
git add .
git commit -m "Initial portfolio website"
```

### 2. 建立 GitHub Repository

1. 前往 https://github.com/new
2. Repository name：`portfolio`
3. 選擇 **Public**
4. 不要勾選 README（本地已有專案）

```bash
git remote add origin https://github.com/skygb1029/portfolio.git
git branch -M main
git push -u origin main
```

### 3. Vercel 部署

1. 登入 https://vercel.com（使用 GitHub 帳號）
2. **Add New Project** → Import `skygb1029/portfolio`
3. 設定（通常會自動偵測）：
   - Framework: **Vite**
   - Install Command: `pnpm install`
   - Build Command: `pnpm run build`
   - Output Directory: `dist`
   - Node.js Version: **22**

專案已包含 `vercel.json`，Vercel 會自動套用上述設定。

### 4. 自訂網域（選用）

Vercel → Project → **Settings** → **Domains**

可綁定例如：`xzhijun.com`、`skygb.dev`、`xzhijun.dev`

---

## CI/CD 流程

| 觸發 | 行為 |
|------|------|
| Push / PR 到 `main` | GitHub Actions 執行 `pnpm install` + `pnpm build` |
| Push 到 `main`（已連結 Vercel） | Vercel 自動建置並部署 |

### 日常更新

```bash
git add .
git commit -m "update"
git push
```

---

## 驗證清單

- [ ] GitHub Actions `Portfolio CI` 顯示綠色
- [ ] Vercel Deployment 成功
- [ ] 網站 HTTPS 可開啟
- [ ] 修改內容 push 後網站自動更新
