<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { siteConfig } from '@/config/site'
import { careerTimeline } from '@/data/career'
import { skillGroups } from '@/data/skills'

const experience = [...careerTimeline].reverse()
const additionalTools = [
  { title: '架構與狀態管理', items: 'Composition API、Vue Router、Vuex、React Router、Webpack' },
  { title: '介面設計與串接', items: 'Figma、Bootstrap、Axios、AJAX、第三方 API 整合' },
  { title: '部署與開發流程', items: 'Git Flow、npm、Yarn、pnpm、LINE Messaging API、Telegram Bot API' },
  { title: '設計與文書工具', items: 'Photoshop、Illustrator、AutoCAD、Excel、Word、PowerPoint' },
]
const projects = [
  {
    title: 'i郵箱郵件寄送網站',
    period: '2024/08 – 2025/10',
    detail: '開發 GS1 OAuth 登入、包裹寄送與物流查詢。擔任主要技術窗口，與客戶及第三方廠商逐項確認儲值、金流、折扣與回饋的業務流程和介接規格。',
    approach: '將開發中遇到的問題整理成討論事項，與客戶、後端工程師及第三方廠商逐項確認，協助釐清業務流程與功能規格，再落實前端功能和 API 整合。',
    path: '/works/iboxpost',
  },
  {
    title: 'AI 醫療語音互動系統',
    period: '2025/04 – 2025/10',
    detail: '使用 WebSocket 接收即時語音與 AI 情緒分數，控制 Live2D 表情與嘴型。為改善收音截斷，加入前端音訊緩衝，並與後端共同測試不同語速和停頓情境。',
    approach: '將後端情緒分析資料對應到眉毛、眼睛及其他表情參數，配合 AI 語音回覆調整嘴型動畫。針對收音起訖時機，與後端一起調整即時資料傳輸和音訊緩衝。',
  },
  {
    title: 'AI 股票秘書',
    period: '2026/06 – 開發中',
    detail: '獨立規劃與部署股票資訊助理，整合台股、ETF 和 AI 模型。負責 LINE Webhook、指令解析、資料庫及前後端開發。',
    approach: '透過 LINE Messaging API 接收自然語言查詢，串接股票資料與 OpenAI API，支援自選股及市場資訊。以 Vue、Node.js、TypeScript、PostgreSQL 開發，使用 Railway 與 Vercel 部署。',
    path: '/product/stock-secretary',
  },
]
</script>

<template>
  <div class="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
    <header class="rounded-3xl border border-zinc-200 bg-gradient-to-br from-indigo-50 to-white p-7 sm:p-12 dark:border-zinc-800 dark:from-indigo-950/60 dark:to-zinc-900">
      <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">許智鈞 <span class="text-2xl sm:text-3xl">{{ siteConfig.name }}</span></h1>
      <p class="mt-3 text-lg font-medium text-indigo-700 dark:text-indigo-300">{{ siteConfig.title }}</p>
      <div class="mt-6 max-w-3xl space-y-4 text-lg leading-8 text-zinc-700 sm:text-xl sm:leading-9 dark:text-zinc-300">
        <p>我有約 7 年前端開發經驗，主要使用 Vue、JavaScript 與 TypeScript。曾參與醫療影像、物流會員與排班系統，也做過電商、房地產及企業內部系統。</p>
        <p>我負責介面開發、API 整合與既有系統重構，並與客戶、後端工程師及第三方廠商一起確認需求和介接規格。</p>
        <p>在中小型開發團隊，我也負責需求分析、功能整合、系統維護與新人指導。遇到跨系統的問題時，我會先確認資料從哪裡來、有哪些人需要使用，再和團隊釐清介接方式與業務流程。</p>
      </div>
      <div class="mt-7 flex flex-wrap gap-3">
        <RouterLink to="/contact" class="rounded-full bg-indigo-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-800">聯絡合作</RouterLink>
        <a id="resume-github" :href="siteConfig.githubUrl" class="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-semibold hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">GitHub</a>
      </div>
    </header>

    <div class="mx-auto mt-9 max-w-5xl space-y-8">
      <div class="space-y-8">
        <section aria-labelledby="resume-experience" class="rounded-2xl border border-zinc-200 p-5 sm:p-9 dark:border-zinc-800">
          <h2 id="resume-experience" class="text-2xl font-bold sm:text-3xl">工作經歷</h2>
          <ol class="mt-4 divide-y divide-zinc-200 dark:divide-zinc-800">
            <li v-for="entry in experience" :id="'career-' + entry.id" :key="entry.id" class="scroll-mt-24 py-6 last:pb-0">
              <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 class="text-lg font-bold sm:text-xl">{{ entry.company }} · {{ entry.role }}</h3>
                <span class="text-base text-zinc-600 dark:text-zinc-300">{{ entry.period }}</span>
              </div>
              <ul v-if="entry.highlights?.length" class="mt-3 max-w-3xl list-disc space-y-2 pl-5 text-base leading-7 text-zinc-700 sm:text-lg sm:leading-8 dark:text-zinc-300">
                <li v-for="highlight in entry.highlights" :key="highlight">{{ highlight }}</li>
              </ul>
              <p v-if="entry.tech?.length" class="mt-3 text-base leading-7 text-zinc-600 dark:text-zinc-300">{{ entry.tech.join(' · ') }}</p>
              <div v-if="entry.projects?.length" class="mt-5 max-w-3xl">
                <h4 class="font-bold text-indigo-700 dark:text-indigo-300">參與專案</h4>
                <ul class="mt-3 grid gap-3 sm:grid-cols-2">
                  <li v-for="project in entry.projects" :key="project.title" class="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
                    <p class="font-semibold">{{ project.title }}</p>
                    <p class="mt-2 leading-7 text-zinc-700 dark:text-zinc-300">{{ project.description }}</p>
                  </li>
                </ul>
              </div>
              <RouterLink v-if="entry.id === 'moonen'" :to="{ path: '/resume', hash: '#resume-projects' }" class="mt-3 inline-block font-semibold text-indigo-700 underline dark:text-indigo-300">查看 i郵箱與醫療語音專案</RouterLink>
            </li>
          </ol>
        </section>

        <section aria-labelledby="resume-projects" class="rounded-2xl border border-zinc-200 p-6 sm:p-8 dark:border-zinc-800">
          <h2 id="resume-projects" class="text-2xl font-bold sm:text-3xl">代表專案</h2>
          <ul class="mt-4 divide-y divide-zinc-200 dark:divide-zinc-800">
            <li v-for="project in projects" :key="project.title" class="py-4 first:pt-0">
              <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 class="text-lg font-bold sm:text-xl">{{ project.title }}</h3>
                <span class="text-base text-zinc-600 dark:text-zinc-300">{{ project.period }}</span>
              </div>
              <p class="mt-3 max-w-3xl text-base leading-7 text-zinc-700 sm:text-lg sm:leading-8 dark:text-zinc-300">{{ project.detail }}</p>
              <p class="mt-3 max-w-3xl text-base leading-7 text-zinc-700 sm:text-lg sm:leading-8 dark:text-zinc-300"><strong>實作與問題處理</strong><br>{{ project.approach }}</p>
              <RouterLink v-if="project.path" :to="project.path" class="mt-2 inline-block text-base text-indigo-700 underline dark:text-indigo-300">查看{{ project.title }}</RouterLink>
            </li>
          </ul>
          <RouterLink :to="{ path: '/', hash: '#enterprise' }" class="mt-4 inline-block text-sm font-semibold text-indigo-700 underline dark:text-indigo-300">查看企業專案</RouterLink>
        </section>
        <section aria-labelledby="resume-languages" class="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
          <h2 id="resume-languages" class="text-2xl font-bold">語言能力</h2>
          <dl class="mt-4 space-y-4 text-base leading-7">
            <div><dt class="font-semibold">英文</dt><dd class="text-zinc-600 dark:text-zinc-300">聽、說、讀、寫皆為中等</dd></div>
            <div><dt class="font-semibold">台語</dt><dd class="text-zinc-600 dark:text-zinc-300">中等</dd></div>
          </dl>
        </section>
      </div>

      <aside class="grid items-start gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <section aria-labelledby="resume-skills" class="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
          <h2 id="resume-skills" class="text-2xl font-bold">專業技能</h2>
          <div v-for="group in skillGroups" :key="group.id" class="mt-5">
            <h3 class="mb-3 text-lg font-semibold">{{ group.title }}</h3>
            <ul class="flex flex-wrap gap-2">
              <li v-for="skill in group.skills" :key="skill" class="rounded-full bg-zinc-100 px-3 py-1.5 text-base text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">{{ skill }}</li>
            </ul>
          </div>
          <dl class="mt-6 space-y-4 border-t border-zinc-200 pt-5 leading-7 dark:border-zinc-800">
            <div v-for="group in additionalTools" :key="group.title">
              <dt class="font-semibold">{{ group.title }}</dt>
              <dd class="text-zinc-700 dark:text-zinc-300">{{ group.items }}</dd>
            </div>
          </dl>
        </section>
        <section aria-labelledby="resume-education" class="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
          <h2 id="resume-education" class="text-2xl font-bold">學歷與進修</h2>
          <dl class="mt-4 space-y-5 text-base leading-7">
            <div><dt class="font-semibold">大安高工 · 電機科</dt><dd class="mt-1 text-zinc-600 dark:text-zinc-400">2008/08 – 2011/05 · 畢業</dd></div>
            <div><dt class="font-semibold">卡內基課程 · 溝通管理</dt><dd class="mt-1 text-zinc-600 dark:text-zinc-400">2016/05 – 2018/05</dd></div>
          </dl>
        </section>
      </aside>
    </div>
  </div>
</template>
