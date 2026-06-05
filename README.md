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

## V4 產品入口（多頁）

| 路徑 | 說明 |
|------|------|
| `/product/stock-secretary` | AI 股票秘書 Landing |
| `/product/parenting-assistant` | AI 育兒助手 Landing |
| `/product/sales-assistant` | AI 客服業務小能手 Landing |
| `/app/stock` | AI 股票秘書完整 App（見 [docs/STOCK_INTEGRATION.md](./docs/STOCK_INTEGRATION.md)） |
| `/demo` | Demo Center（接真實 API） |
| `/admin/waitlist` | 等待名單 + 產品數據 Dashboard |
| `/admin/ops` | SaaS 營運監控（健康度、版本、Supabase、GitHub） |

## Multi-Product Registry

所有 AI 產品定義於 [`src/data/products.ts`](./src/data/products.ts)（`id`、`websiteUrl`、`apiUrl` 等）。

平台層預留（尚未實作）：[`src/platform/`](./src/platform/) — SSO、Auth Center、Subscription、Billing、Usage Dashboard。

產品 Landing 若 Registry 有 `websiteUrl` 顯示「立即使用」；有 `apiUrl` 可開啟「產品預覽模式」直連產品 API（失敗時改 Hub 備援）。

**AI 股票秘書對接：** 設定 `VITE_API_BASE`（例 `http://localhost:3002/api/web`），驗證 `curl .../api/web/version`；後端 repo 執行 `pnpm run job:web-widget-audit` 確認解耦。

## Product First — API 與後端

| API | 說明 |
|-----|------|
| `POST /api/demo/stock` | `{ symbol }` → 方向、上漲機率、原因、風險 |
| `POST /api/demo/parenting` | `{ input }` → 解析、紀錄、提醒 |
| `POST /api/demo/customer-service` | `{ input }` → AI 回覆 |
| `POST /api/waitlist` | 寫入 Supabase `waitlist` 表 |
| `GET /api/waitlist` | Admin 讀取名單（Bearer `ADMIN_API_SECRET`） |
| `POST/GET /api/feedback` | 用戶回饋 |
| `POST/GET /api/analytics` | 事件與 Dashboard 指標 |
| `GET /api/github/product-progress` | GitHub Releases / Tags |
| `GET /api/ops` | 營運快照（需 `ADMIN_API_SECRET`） |

1. 在 Supabase 執行 [`supabase/schema.sql`](./supabase/schema.sql)
2. Vercel 設定 `SUPABASE_URL`、`SUPABASE_SERVICE_ROLE_KEY`、`ADMIN_API_SECRET`
3. 前端 `.env` 設定 `VITE_ADMIN_API_SECRET`（與上相同，供 Admin 頁）
4. 影片放 `public/videos/*.mp4`（見 [`public/videos/README.md`](./public/videos/README.md)）

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
