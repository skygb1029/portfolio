<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { siteConfig } from '@/config/site'
import { careerTimeline } from '@/data/career'
import { skillGroups } from '@/data/skills'

const experience = [...careerTimeline].reverse()
const projects = [
  {
    title: 'i郵箱郵件寄送網站',
    period: '2024/08 – 2025/10',
    detail: '開發 GS1 OAuth 登入、包裹寄送與物流查詢。擔任主要技術窗口，與客戶及第三方廠商逐項確認儲值、金流、折扣與回饋的業務流程和介接規格。',
    path: '/works/iboxpost',
  },
  {
    title: 'AI 醫療語音互動系統',
    period: '2025/04 – 2025/10',
    detail: '使用 WebSocket 接收即時語音與 AI 情緒分數，控制 Live2D 表情與嘴型。為改善收音截斷，加入前端音訊緩衝，並與後端共同測試不同語速和停頓情境。',
  },
  {
    title: 'AI 股票秘書',
    period: '2026/06 – 開發中',
    detail: '獨立規劃與部署股票資訊助理，整合台股、ETF 和 AI 模型。負責 LINE Webhook、指令解析、資料庫及前後端開發。',
    path: '/product/stock-secretary',
  },
]
</script>

<template>
  <div class="section-padding mx-auto max-w-6xl pb-24 pt-28">
    <header class="rounded-3xl border border-zinc-200 bg-gradient-to-br from-indigo-50 to-white p-7 sm:p-12 dark:border-zinc-800 dark:from-indigo-950/60 dark:to-zinc-900">
      <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">許智鈞 <span class="text-2xl sm:text-3xl">{{ siteConfig.name }}</span></h1>
      <p class="mt-3 text-lg font-medium text-indigo-700 dark:text-indigo-300">{{ siteConfig.title }}</p>
      <p class="mt-5 max-w-2xl leading-7 text-zinc-700 dark:text-zinc-300">
        我有約 7 年前端開發經驗，主要使用 Vue、JavaScript 和 TypeScript，曾參與醫療科技、
        電商、物流、房地產及企業內部系統。除了開發介面，也負責 API 整合、系統重構，
        以及與客戶、後端工程師和第三方廠商確認需求及介接規格。
      </p>
      <div class="mt-7 flex flex-wrap gap-3">
        <a :href="`mailto:${siteConfig.email}`" class="rounded-full bg-indigo-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-800">Email 聯絡</a>
        <a :href="siteConfig.githubUrl" class="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-semibold hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">GitHub</a>
      </div>
    </header>

    <div class="mt-9 grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <div class="space-y-8">
        <section aria-labelledby="resume-experience" class="rounded-2xl border border-zinc-200 p-6 sm:p-8 dark:border-zinc-800">
          <h2 id="resume-experience" class="text-xl font-bold">工作經歷</h2>
          <ol class="mt-4 divide-y divide-zinc-200 dark:divide-zinc-800">
            <li v-for="entry in experience" :key="entry.id" class="py-5 last:pb-0">
              <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 class="font-semibold">{{ entry.role }} · {{ entry.company }}</h3>
                <span class="text-sm text-zinc-600 dark:text-zinc-400">{{ entry.period }}</span>
              </div>
              <ul v-if="entry.highlights?.length" class="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                <li v-for="highlight in entry.highlights" :key="highlight">{{ highlight }}</li>
              </ul>
              <p v-if="entry.tech?.length" class="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{{ entry.tech.join(' · ') }}</p>
            </li>
          </ol>
        </section>

        <section aria-labelledby="resume-projects" class="rounded-2xl border border-zinc-200 p-6 sm:p-8 dark:border-zinc-800">
          <h2 id="resume-projects" class="text-xl font-bold">代表專案</h2>
          <ul class="mt-4 divide-y divide-zinc-200 dark:divide-zinc-800">
            <li v-for="project in projects" :key="project.title" class="py-4 first:pt-0">
              <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 class="font-semibold">{{ project.title }}</h3>
                <span class="text-sm text-zinc-600 dark:text-zinc-400">{{ project.period }}</span>
              </div>
              <p class="mt-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">{{ project.detail }}</p>
              <RouterLink v-if="project.path" :to="project.path" class="mt-2 inline-block text-sm text-indigo-700 underline dark:text-indigo-300">查看{{ project.title }}</RouterLink>
            </li>
          </ul>
          <RouterLink :to="{ path: '/', hash: '#enterprise' }" class="mt-4 inline-block text-sm font-semibold text-indigo-700 underline dark:text-indigo-300">查看企業專案</RouterLink>
        </section>
      </div>

      <aside class="space-y-8">
        <section aria-labelledby="resume-skills" class="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
          <h2 id="resume-skills" class="text-xl font-bold">專業技能</h2>
          <div v-for="group in skillGroups" :key="group.id" class="mt-5">
            <h3 class="mb-2 text-sm font-semibold">{{ group.title }}</h3>
            <ul class="flex flex-wrap gap-2">
              <li v-for="skill in group.skills" :key="skill" class="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">{{ skill }}</li>
            </ul>
          </div>
        </section>
        <section aria-labelledby="resume-education" class="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
          <h2 id="resume-education" class="text-xl font-bold">學歷與進修</h2>
          <dl class="mt-4 space-y-4 text-sm">
            <div><dt class="font-semibold">大安高工 · 電機科</dt><dd class="mt-1 text-zinc-600 dark:text-zinc-400">2008/08 – 2011/05 · 畢業</dd></div>
            <div><dt class="font-semibold">卡內基課程 · 溝通管理</dt><dd class="mt-1 text-zinc-600 dark:text-zinc-400">2016/05 – 2018/05</dd></div>
          </dl>
        </section>
      </aside>
    </div>
  </div>
</template>
