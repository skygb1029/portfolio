# AI 股票秘書 — Portfolio 對接方式

UI 已搬至 `src/products/stock/`；後端維持獨立 repo `ai-stock-secretary`（LINE Bot、API、Scheduler、Fact Layer）。

`ai-stock-secretary/web-widget/` 僅作**參考實作**，不再作為正式部署前端。

## 架構

```
Product Hub (portfolio)          ai-stock-secretary (後端)
├── /app/stock                   ├── GET  /api/web/version
├── src/products/stock/    ───►  ├── GET  /api/web/morning
│   └── services/stockApi.ts     ├── GET  /api/web/fact-readiness
                                 ├── GET  /api/web/morning-validation
                                 └── POST /api/web/chat
```

## 前端環境變數

`.env`（擇一設定）：

```env
# 建議：完整 Public API base（與 web-widget 相同）
VITE_API_BASE=http://localhost:3002/api/web

# 正式
# VITE_API_BASE=https://stock-api.jrjim.ai/api/web
```

舊版相容（自動補 `/api/web`）：

```env
VITE_STOCK_API_URL=http://localhost:3002
```

## 驗證 API 連線

```bash
# 確認契約版本
curl http://localhost:3002/api/web/version
```

預期回應含 `version`（契約 semver，如 `1.0.0`）與 `buildVersion`。

啟動後端（在 ai-stock-secretary 目錄）：

```bash
pnpm dev:webhook
```

啟動 Hub：

```bash
cd portfolio
pnpm dev
```

開啟 `http://localhost:5173/app/stock`，頁首應顯示 API base 與版本號。

## 定期驗證前後端解耦

在 **ai-stock-secretary** repo 執行（非 portfolio）：

```bash
pnpm run job:web-widget-audit
```

此 job 確認 Widget 僅依賴公開 API 路徑，不依賴後端內部模組。Portfolio 的 `stockApi.ts` 應維持相同端點清單。

## 使用者路徑

```
首頁 → AI 股票秘書「立即體驗」
  或 /product/stock-secretary →「立即使用」
    → /app/stock
```

## 公開 API 端點

| 方法 | 路徑 | 用途 |
|------|------|------|
| GET | `/version` | API 契約與 build 版本 |
| GET | `/morning` | 今日晨報 |
| GET | `/fact-readiness` | Fact 就緒狀態 |
| GET | `/morning-validation` | 晨報驗證 |
| POST | `/chat` | AI 對話 `{ "message": "..." }` |

完整契約見 `ai-stock-secretary/knowledge/api/STOCK_PUBLIC_API.md`。
