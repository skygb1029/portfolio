/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA_MEASUREMENT_ID: string
  readonly VITE_CLARITY_PROJECT_ID: string
  readonly VITE_WAITLIST_FORM_ACTION: string
  readonly VITE_WAITLIST_ENTRY_NAME: string
  readonly VITE_WAITLIST_ENTRY_EMAIL: string
  readonly VITE_WAITLIST_ENTRY_PRODUCT: string
  readonly VITE_ADMIN_API_SECRET: string
  readonly VITE_API_BASE: string
  readonly VITE_STOCK_API_URL: string
  readonly VITE_WAITLIST_SHEET_CSV_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
