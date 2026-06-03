# Jr Jim AI Product Hub

Frontend Engineer × AI Product Builder — 產品入口網站。

## 技術棧

- Vue 3 + TypeScript
- Vite
- Vue Router
- Pinia
- Tailwind CSS v4
- @vueuse/core（Intersection Observer 滾動動畫）

## 開發

本專案使用 [pnpm](https://pnpm.io/)。若尚未安裝：`corepack enable` 或 `npm install -g pnpm`。

```bash
pnpm install
pnpm dev
```

## 建置

```bash
pnpm build
pnpm preview
```

## 部署

正式網址：`https://portfolio.vercel.app`（詳見 [DEPLOY.md](./DEPLOY.md)）

```bash
git push origin main   # 觸發 GitHub Actions + Vercel 自動部署
```

## 部署前設定

1. 綁定自訂網域後，更新 `index.html`、`public/sitemap.xml`、`public/robots.txt`、`src/config/site.ts` 中的網址。
2. 將 LINE QR Code 圖片放在 `public/line-qr.png`，並在 `ContactSection.vue` 中替換佔位區塊。

## V2 功能（單頁）

- 專案詳情 Modal（背景、問題、技術架構、開發心得）
- Hero 下方 Metrics 數字動畫
- GitHub API 即時資料
- AI 專案 SVG 流程圖、成長 Timeline、Blog Mock、評價預留區
- Contact 四格 CTA、右下角 FAB
- Schema.org JSON-LD（Person / Organization / SoftwareApplication）

## 專案結構

```
src/
├── components/     # UI 與區塊元件
├── composables/    # 滾動動畫、GitHub、Counter
├── data/           # 技能、專案詳情、部落格 Mock
├── stores/         # 主題、專案 Modal
├── config/site.ts  # Email、GitHub 等設定
└── views/
```
