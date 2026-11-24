<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { content, visibleNews } from '@/utils/showcaseContent'

const route = useRoute()
const deposits = [
  { id: 'TOPUP-DEMO-003', member: '展示會員 03', date: '2025-01-03', amount: 200, status: '完成' },
  { id: 'TOPUP-DEMO-002', member: '展示會員 02', date: '2025-01-02', amount: 100, status: '待確認' },
  { id: 'TOPUP-DEMO-001', member: '展示會員 01', date: '2025-01-01', amount: 300, status: '完成' },
]
const stats = computed(() => [
  { label: '前台公告', total: visibleNews().length, link: '/admin/news' },
  { label: '前台問答', total: content.value.faq.filter(item => item.visible).length, link: '/admin/faq' },
  { label: '儲值紀錄', total: deposits.length, link: '/admin/deposits' },
])
</script>

<template>
  <section class="overview">
    <template v-if="route.path === '/admin/dashboard'">
      <h1>系統概覽</h1>
      <p>查看前台已顯示的內容，或直接進入設定頁編輯。</p>
      <div class="tiles">
        <RouterLink v-for="stat in stats" :key="stat.link" :to="stat.link">
          <span>{{ stat.label }}</span><strong>{{ stat.total }}</strong>
        </RouterLink>
      </div>
      <div class="panel">
        <h2>最近顯示的公告</h2>
        <ul v-if="visibleNews().length">
          <li v-for="item in visibleNews().slice(0, 4)" :key="item.id">
            <RouterLink :to="'/news/' + item.id">{{ item.title }}</RouterLink>
            <time :datetime="item.date">{{ item.date }}</time>
          </li>
        </ul>
        <p v-else>目前沒有顯示中的公告。</p>
        <RouterLink to="/admin/ads">調整首頁消息與輪播 →</RouterLink>
      </div>
    </template>
    <template v-else>
      <h1>儲值紀錄</h1>
      <p>交易紀錄可依日期與狀態查閱。</p>
      <div class="panel table-panel">
        <table>
          <thead><tr><th>交易編號</th><th>會員</th><th>日期</th><th>金額</th><th>狀態</th></tr></thead>
          <tbody><tr v-for="item in deposits" :key="item.id"><td>{{ item.id }}</td><td>{{ item.member }}</td><td>{{ item.date }}</td><td>NT$ {{ item.amount }}</td><td>{{ item.status }}</td></tr></tbody>
        </table>
      </div>
    </template>
  </section>
</template>

<style scoped>
.overview { padding: clamp(1rem, 2vw, 2rem); max-width: 85rem; }
.overview h1 { font-size: 1.6rem; font-weight: 750; }
.overview h2 { font-size: 1.1rem; font-weight: 700; margin-bottom: .75rem; }
.overview p, time { color: #4b566a; }
.tiles { display: grid; gap: .8rem; grid-template-columns: repeat(auto-fit, minmax(min(100%, 11rem), 1fr)); margin: 1rem 0; }
.tiles a, .panel { background: #fff; border: 1px solid #dfe3e9; border-radius: .85rem; padding: 1rem; }
.tiles a { display: grid; }
.tiles a:hover { border-color: #a00061; background: #fff5fa; }
.tiles strong { font-size: 1.8rem; }
.panel li { display: flex; flex-wrap: wrap; justify-content: space-between; gap: .3rem 1rem; padding: .55rem 0; border-bottom: 1px solid #e2e6eb; }
.panel > a { display: inline-block; margin-top: 1rem; }
.panel a { color: #930057; text-decoration: underline; }
.table-panel { overflow-x: auto; margin-top: 1rem; }
table { width: 100%; text-align: left; white-space: nowrap; }
th, td { padding: .6rem; border-bottom: 1px solid #e2e6eb; }
</style>
