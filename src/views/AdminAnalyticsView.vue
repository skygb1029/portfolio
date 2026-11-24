<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'
import { analyticsClientId, analyticsConsole, analyticsScope, getAnalyticsReport, loadGoogleOAuth } from '@/utils/gaReports'

const periods = [7, 28, 90]
const days = ref(28)
const report = shallowRef<Awaited<ReturnType<typeof getAnalyticsReport>>>()
const client = shallowRef<ReturnType<Awaited<ReturnType<typeof loadGoogleOAuth>>['initTokenClient']>>()
const busy = ref(false)
const connected = ref(false)
const error = ref('')
const updated = ref('')
const metricLabels = ['活躍使用者', '工作階段', '頁面瀏覽', '事件總數']
const number = new Intl.NumberFormat('zh-TW')
let token = ''
let controller: AbortController | undefined
let disposed = false
const sections = computed(() => report.value ? [
  { title: '熱門頁面', unit: '瀏覽', rows: report.value.pages },
  { title: '流量來源', unit: '工作階段', rows: report.value.channels },
  { title: '事件回傳', unit: '次', rows: report.value.events },
  { title: '近 30 分鐘的事件', unit: '次', rows: report.value.realtime },
] : [])

async function refresh() {
  if (!token) return
  controller?.abort()
  const request = new AbortController()
  controller = request
  error.value = ''
  busy.value = true
  try {
    report.value = await getAnalyticsReport(token, days.value, request.signal)
    updated.value = new Intl.DateTimeFormat('zh-TW', { dateStyle: 'short', timeStyle: 'short' }).format(new Date())
  } catch (cause) {
    if (!request.signal.aborted) error.value = cause instanceof Error ? cause.message : '載入失敗。'
  } finally {
    if (!request.signal.aborted) busy.value = false
  }
}

function connect() {
  if (!client.value) return
  error.value = ''
  client.value.requestAccessToken({ prompt: 'select_account' })
}

function disconnect() {
  controller?.abort()
  token = ''
  connected.value = false
  busy.value = false
  error.value = ''
  report.value = undefined
  updated.value = ''
}

onMounted(async () => {
  if (!analyticsClientId) return
  try {
    const oauth = await loadGoogleOAuth()
    if (disposed) return
    client.value = oauth.initTokenClient({
      client_id: analyticsClientId, scope: analyticsScope, include_granted_scopes: false,
      callback: response => {
        if (disposed) return
        if (!response.access_token) { error.value = 'Google 未授予讀取權限。'; return }
        token = response.access_token
        connected.value = true
        void refresh()
      },
      error_callback: () => { error.value = 'Google 授權視窗未完成，請再試一次。' },
    })
  } catch (cause) {
    error.value = cause instanceof Error ? cause.message : 'Google 授權工具載入失敗。'
  }
})

onBeforeUnmount(() => {
  disposed = true
  controller?.abort()
  token = ''
})
</script>

<template>
  <main class="ga-shell">
    <div class="ga-top">
      <div>
        <RouterLink class="ga-back" to="/admin/ops">← 營運監控</RouterLink>
        <h1>Portfolio 流量報表</h1>
        <p>Google Analytics 4 · Portfolio 網頁串流</p>
      </div>
      <a class="ga-button" :href="analyticsConsole" target="_blank" rel="noopener noreferrer">開啟 Google Analytics ↗</a>
    </div>

    <section v-if="!connected" class="ga-panel ga-connect" aria-labelledby="ga-connect">
      <h2 id="ga-connect">連線 Google Analytics</h2>
      <p v-if="analyticsClientId">使用建立這個報表連線的 Google 帳戶登入。</p>
      <p v-else>站內報表等待 Google OAuth 設定。你可以先從上方開啟 Google Analytics 查看數據。</p>
      <p v-if="analyticsClientId">連線後只會讀取 Portfolio 串流的彙總報表。<RouterLink class="ga-back" to="/privacy">GA4 報表隱私權政策</RouterLink></p>
      <button v-if="analyticsClientId" class="ga-button ga-primary" type="button" :disabled="!client" @click="connect">使用 Google 帳戶連線</button>
    </section>

    <section v-else aria-label="流量報表" :aria-busy="busy">
      <div class="ga-toolbar">
        <label>統計區間
          <select v-model.number="days" :disabled="busy" @change="report = undefined; refresh()">
            <option v-for="period in periods" :key="period" :value="period">最近 {{ period }} 天</option>
          </select>
        </label>
        <div class="ga-actions">
          <button class="ga-button" type="button" :disabled="busy" @click="refresh">重新整理</button>
          <button v-if="error" class="ga-button" type="button" :disabled="busy" @click="connect">重新連線</button>
          <button class="ga-button" type="button" @click="disconnect">中斷連線</button>
        </div>
      </div>
      <p v-if="busy" role="status">正在讀取 GA4 報表…</p>
      <div v-if="report" class="ga-metrics">
        <div v-for="(label, index) in metricLabels" :key="label" class="ga-panel">
          <p>{{ label }}</p>
          <strong>{{ number.format(report.metrics[index] ?? 0) }}</strong>
        </div>
      </div>
      <div class="ga-grid">
        <section v-for="section in sections" :key="section.title" class="ga-panel">
          <h2>{{ section.title }}</h2>
          <p v-if="!section.rows.length">這段期間沒有資料。</p>
          <ol v-else class="ga-rows">
            <li v-for="row in section.rows" :key="row.label">
              <span>{{ row.label }}</span><strong>{{ number.format(row.count) }} {{ section.unit }}</strong>
            </li>
          </ol>
        </section>
      </div>
      <p v-if="updated">更新時間 {{ updated }}。區間統計依 GA4 報表處理進度更新。</p>
    </section>
    <p v-if="error" class="ga-error" role="alert">{{ error }}</p>
  </main>
</template>

<style scoped>
.ga-shell { max-width: 76rem; margin: auto; min-height: 75vh; padding: 6.5rem 1.25rem 4rem; }
.ga-top, .ga-toolbar, .ga-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 1rem; }
.ga-top, .ga-toolbar { justify-content: space-between; margin-bottom: 1.5rem; }
.ga-top h1 { font-size: clamp(2rem, 6vw, 3.4rem); font-weight: 750; line-height: 1.15; margin: .65rem 0; }
.ga-back { text-decoration: underline; text-underline-offset: .25rem; }
.ga-panel { border: 1px solid color-mix(in srgb, currentColor 18%, transparent); border-radius: 1.1rem; padding: clamp(1rem, 3vw, 1.6rem); background: color-mix(in srgb, currentColor 4%, transparent); }
.ga-panel h2 { margin-bottom: .6rem; font-size: 1.2rem; font-weight: 700; }
.ga-connect { padding-block: 2rem; }
.ga-connect .ga-button { margin-top: 1rem; }
.ga-button, .ga-toolbar select { border: 1px solid color-mix(in srgb, currentColor 25%, transparent); border-radius: .55rem; padding: .6rem .85rem; }
.ga-button:hover:not(:disabled) { background: color-mix(in srgb, currentColor 12%, transparent); }
.ga-button:disabled { opacity: .55; }
.ga-button.ga-primary { background: #4939ca; color: white; }
.ga-toolbar select { margin-left: .5rem; }
.ga-metrics, .ga-grid { display: grid; gap: 1rem; margin-block: 1rem; }
.ga-metrics { grid-template-columns: repeat(auto-fit, minmax(min(100%, 12rem), 1fr)); }
.ga-grid { grid-template-columns: repeat(auto-fit, minmax(min(100%, 25rem), 1fr)); }
.ga-metrics strong { font-size: 2rem; font-variant-numeric: tabular-nums; }
.ga-rows li { display: flex; justify-content: space-between; gap: 1rem; padding: .55rem 0; border-bottom: 1px solid color-mix(in srgb, currentColor 12%, transparent); }
.ga-rows span { overflow-wrap: anywhere; }
.ga-rows strong { flex-shrink: 0; }
.ga-error { margin-top: 1rem; border-inline-start: 3px solid #dc6565; padding: .55rem .8rem; }
</style>
